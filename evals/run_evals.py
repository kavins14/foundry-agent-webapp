#!/usr/bin/env python3
"""
Run eval queries through the Nureva Console Sense AI agent and populate a dataset file.

Prerequisites:
    - Backend running at http://localhost:8080 (SKIP_AUTH=true in dev)
    - pip install requests

Usage:
    cd foundry-agent-webapp
    python evals/run_evals.py                          # runs dataset.md (single-turn)
    python evals/run_evals.py dataset_clarifying.md    # runs a specific dataset (auto-detects multi-turn)

Re-running is safe — already-filled examples are skipped automatically.
"""

import json
import re
import sys
import time
from pathlib import Path

import requests

BASE_URL = "http://localhost:8080"
STREAM_ENDPOINT = f"{BASE_URL}/api/chat/stream"

_default_dataset = "dataset.md"
_dataset_filename = sys.argv[1] if len(sys.argv) > 1 else _default_dataset
DATASET_PATH = Path(__file__).parent / _dataset_filename
RESPONSE_PLACEHOLDER = "> _[paste agent response here]_"
DELAY_BETWEEN_EXAMPLES = 2  # seconds


# ---------------------------------------------------------------------------
# Format detection
# ---------------------------------------------------------------------------

def is_multi_turn(content: str) -> bool:
    return "**Turn 1 — User:**" in content


# ---------------------------------------------------------------------------
# Parsing — single-turn
# ---------------------------------------------------------------------------

def parse_single_turn(content: str) -> list[dict]:
    parts = re.split(r"(?=^## Example \d+)", content, flags=re.MULTILINE)
    examples = []
    for part in parts:
        m = re.match(r"^## Example (\d+)", part)
        if not m:
            continue
        example_id = int(m.group(1))
        query = _extract_blockquote(part, r"\*\*User Query:\*\*")
        already_filled = RESPONSE_PLACEHOLDER not in part
        examples.append({"id": example_id, "query": query, "already_filled": already_filled})
    return examples


# ---------------------------------------------------------------------------
# Parsing — multi-turn
# ---------------------------------------------------------------------------

def parse_multi_turn(content: str) -> list[dict]:
    parts = re.split(r"(?=^## Example \d+)", content, flags=re.MULTILINE)
    examples = []
    for part in parts:
        m = re.match(r"^## Example (\d+)", part)
        if not m:
            continue
        example_id = int(m.group(1))
        turn1_user = _extract_blockquote(part, r"\*\*Turn 1 — User:\*\*")
        turn2_user = _extract_blockquote(part, r"\*\*Turn 2 — User:\*\*")
        placeholders = part.count(RESPONSE_PLACEHOLDER)
        already_filled = placeholders == 0
        turn1_filled = placeholders < 2  # first placeholder already replaced
        examples.append({
            "id": example_id,
            "turn1_user": turn1_user,
            "turn2_user": turn2_user,
            "turn1_filled": turn1_filled,
            "already_filled": already_filled,
        })
    return examples


def _extract_blockquote(section: str, label_pattern: str) -> str | None:
    """Extract text from the blockquote immediately following a bold label."""
    match = re.search(label_pattern + r"\s*\n((?:>.*\n?)+)", section)
    if not match:
        return None
    lines = [line.lstrip("> ").strip() for line in match.group(1).strip().splitlines()]
    return " ".join(lines).strip('"')


# ---------------------------------------------------------------------------
# Streaming
# ---------------------------------------------------------------------------

def stream_query(query: str, conversation_id: str | None = None) -> tuple[str, str | None]:
    """
    Send a query to the agent and return (response_text, conversation_id).
    Pass conversation_id to continue an existing conversation (multi-turn).
    """
    full_text = ""
    returned_conversation_id = conversation_id

    def _do_stream(payload: dict) -> None:
        nonlocal full_text, returned_conversation_id

        with requests.post(
            STREAM_ENDPOINT,
            json=payload,
            headers={"Content-Type": "application/json"},
            stream=True,
            timeout=120,
        ) as resp:
            resp.raise_for_status()

            for raw_line in resp.iter_lines():
                if not raw_line:
                    continue
                line = raw_line.decode() if isinstance(raw_line, bytes) else raw_line
                if not line.startswith("data: "):
                    continue

                try:
                    event = json.loads(line[6:])
                except json.JSONDecodeError:
                    continue

                event_type = event.get("type")

                if event_type == "conversationId":
                    returned_conversation_id = event.get("conversationId")

                elif event_type == "chunk":
                    full_text += event.get("content", "")

                elif event_type == "toolUse":
                    print(f" [{event.get('toolName', 'tool')}]", end="", flush=True)

                elif event_type == "mcpApprovalRequest":
                    ar = event["approvalRequest"]
                    print(f"\n    [auto-approving MCP: {ar['toolName']}]")
                    _do_stream({
                        "message": query,
                        "conversationId": returned_conversation_id,
                        "imageDataUris": [],
                        "fileDataUris": [],
                        "previousResponseId": ar.get("previousResponseId"),
                        "mcpApproval": {"approvalRequestId": ar["id"], "approved": True},
                    })
                    return

                elif event_type == "done":
                    return

                elif event_type == "error":
                    raise RuntimeError(event.get("message", "Unknown agent error"))

    _do_stream({
        "message": query,
        "conversationId": conversation_id,
        "imageDataUris": [],
        "fileDataUris": [],
    })

    return full_text.strip(), returned_conversation_id


# ---------------------------------------------------------------------------
# Writing back
# ---------------------------------------------------------------------------

def format_as_blockquote(text: str) -> str:
    lines = text.splitlines()
    return "\n".join(f"> {line}" if line.strip() else ">" for line in lines)


def update_example(content: str, example_id: int, response: str, occurrence: int = 1) -> str:
    """
    Replace the Nth occurrence (1-indexed) of the placeholder within the target example section.
    occurrence=1 fills Turn 1 Agent, occurrence=2 fills Turn 2 Agent.
    """
    parts = re.split(r"(?=^## Example \d+)", content, flags=re.MULTILINE)
    updated = []
    for part in parts:
        m = re.match(r"^## Example (\d+)", part)
        if m and int(m.group(1)) == example_id:
            blockquote = format_as_blockquote(response) if response else "> (no response returned)"
            # Replace only the Nth occurrence
            count = 0
            def replacer(match):
                nonlocal count
                count += 1
                return blockquote if count == occurrence else match.group(0)
            part = re.sub(re.escape(RESPONSE_PLACEHOLDER), replacer, part)
        updated.append(part)
    return "".join(updated)


# ---------------------------------------------------------------------------
# Runners
# ---------------------------------------------------------------------------

def run_single_turn(examples: list[dict]) -> None:
    total = len(examples)
    pending = [e for e in examples if not e["already_filled"]]
    print(f"Dataset: {total} examples — {total - len(pending)} already filled, {len(pending)} to run.\n")

    if not pending:
        print("Nothing to do.")
        return

    for i, ex in enumerate(pending, 1):
        print(f"[{ex['id']:02d}/{total:02d}] Querying... ", end="", flush=True)
        try:
            response, _ = stream_query(ex["query"])
            print(" done.")
            content = DATASET_PATH.read_text(encoding="utf-8")
            content = update_example(content, ex["id"], response, occurrence=1)
            DATASET_PATH.write_text(content, encoding="utf-8")
        except Exception as e:
            print(f"\n  ERROR: {e}")
        if i < len(pending):
            time.sleep(DELAY_BETWEEN_EXAMPLES)


def run_multi_turn(examples: list[dict]) -> None:
    total = len(examples)
    pending = [e for e in examples if not e["already_filled"]]
    print(f"Dataset: {total} examples — {total - len(pending)} already filled, {len(pending)} to run.\n")

    if not pending:
        print("Nothing to do.")
        return

    for i, ex in enumerate(pending, 1):
        ex_id = ex["id"]
        print(f"[{ex_id:02d}/{total:02d}] ", end="", flush=True)
        try:
            conversation_id = None

            if not ex["turn1_filled"]:
                print("Turn 1... ", end="", flush=True)
                turn1_response, conversation_id = stream_query(ex["turn1_user"])
                print("done. ", end="", flush=True)
                content = DATASET_PATH.read_text(encoding="utf-8")
                content = update_example(content, ex_id, turn1_response, occurrence=1)
                DATASET_PATH.write_text(content, encoding="utf-8")
                time.sleep(1)

            print("Turn 2... ", end="", flush=True)
            turn2_response, _ = stream_query(ex["turn2_user"], conversation_id=conversation_id)
            print("done.")
            content = DATASET_PATH.read_text(encoding="utf-8")
            content = update_example(content, ex_id, turn2_response, occurrence=2)
            DATASET_PATH.write_text(content, encoding="utf-8")

        except Exception as e:
            print(f"\n  ERROR on example {ex_id}: {e}")

        if i < len(pending):
            time.sleep(DELAY_BETWEEN_EXAMPLES)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def check_backend() -> None:
    try:
        requests.get(f"{BASE_URL}/api/agent", timeout=5)
    except requests.ConnectionError:
        print(f"ERROR: Cannot connect to backend at {BASE_URL}")
        print("Start it with:  cd backend/WebApp.Api && dotnet run")
        sys.exit(1)


def main() -> None:
    check_backend()

    content = DATASET_PATH.read_text(encoding="utf-8")

    if is_multi_turn(content):
        print(f"Format: multi-turn  |  File: {DATASET_PATH.name}\n")
        examples = parse_multi_turn(content)
        run_multi_turn(examples)
    else:
        print(f"Format: single-turn  |  File: {DATASET_PATH.name}\n")
        examples = parse_single_turn(content)
        run_single_turn(examples)

    print(f"\nDone. Open evals/{DATASET_PATH.name} to review responses.")


if __name__ == "__main__":
    main()
