# Nureva Console Sense AI — Eval Framework

> Built on the LLM-as-a-Judge methodology. See `llm-judge-guide.md` for the full process reference.

---

## Agent Overview

**Nureva Console Sense AI** is a public-facing support chatbot and expert agent over Nureva's support documentation. It serves a wide range of users across business, education, government, and healthcare — from IT admins and AV integrators to teachers, developers, resellers, and non-technical facilities managers. It answers questions about Nureva's audio conferencing hardware (HDL series), software (Nureva Console, Nureva App), integrations, and troubleshooting.

---

## Principal Domain Expert

The ideal reviewer is someone who:
- Knows the Nureva product line deeply (HDL200, HDL300, HDL310, HDL410, CV30)
- Understands Nureva Console and the Nureva App
- Has handled real customer support cases
- Understands common IT/AV deployment contexts (MTR rooms, Zoom Rooms, Crestron systems)

**For this project:** The builder (you) is acting as the domain expert, given deep familiarity with the support documentation and the agent's behavior.

---

## Dataset Dimensions

### Features (what the agent must know)

| # | Feature Area |
|---|---|
| F1 | HDL200 — installation, setup, getting started |
| F2 | HDL300 — installation, setup, single and dual configuration |
| F3 | HDL310 — installation, setup, getting started |
| F4 | HDL410 — installation, setup, getting started |
| F5 | Microphone Mist technology — how it works, calibration, acoustic check |
| F6 | Nureva Console — device management, camera tracking, firmware updates |
| F7 | Nureva App — setup, presets, troubleshooting |
| F8 | Camera integration (AVer, Sony, CV30, INOGENI CAM230) |
| F9 | Third-party integrations (Crestron, Microsoft Teams, Zoom, Logitech) |
| F10 | Nureva Pro subscription — what it includes, licensing |
| F11 | Developer Toolkit / API usage |
| F12 | Audio conferencing presets and acoustic optimization |

### Scenarios (situations the agent must handle)

| # | Scenario |
|---|---|
| S1 | Straightforward how-to question with a clear doc answer |
| S2 | Troubleshooting — something isn't working as expected |
| S3 | Comparison question — "what's the difference between X and Y?" |
| S4 | Out-of-scope question — product Nureva doesn't make, or unsupported feature |
| S5 | Ambiguous question — unclear which product or use case the user means |
| S6 | Multi-step question — requires chaining multiple doc sections |
| S7 | Question where the answer is "not supported" or "not documented" |
| S8 | Repeated or rephrased question — user didn't understand the first answer |
| S9 | Integration question involving a third-party system |
| S10 | Question about a newly released or upcoming product (HDX series) |

### Personas (types of users)

| # | Persona | Vertical |
|---|---|---|
| P1 | IT admin managing a fleet of Nureva devices across a campus or office | All |
| P2 | AV integrator doing a first-time installation or troubleshooting a deployment | All |
| P3 | Teacher or instructor confused by audio behavior in a classroom | Education |
| P4 | Corporate meeting participant or hybrid worker experiencing audio issues | Business |
| P5 | IT/AV manager in a government agency evaluating or deploying the system | Government |
| P6 | Clinical IT or collaboration lead in a healthcare facility | Healthcare |
| P7 | School or university administrator making procurement decisions | Education |
| P8 | Developer integrating via the Nureva Developer Toolkit/API | All |
| P9 | Nureva reseller or channel partner supporting a customer deployment | All |
| P10 | Non-technical facilities or office manager who owns the room but not the tech | Business |

---

## Pass/Fail Criteria

An agent response **passes** if it:

- [ ] **Correctly answers the question** based on what the support docs say
- [ ] **Does not hallucinate** — no invented specs, steps, or capabilities
- [ ] **Acknowledges gaps honestly** — says "this isn't covered in the documentation" rather than guessing
- [ ] **Is appropriately scoped** — doesn't over-answer or drag in irrelevant product details
- [ ] **Uses clear, accessible language** matched to the user's apparent technical level
- [ ] **Provides actionable next steps** — e.g. links to relevant docs, specific steps, or who to contact

An agent response **fails** if it:

- Confidently states something incorrect or unsupported by the docs
- Gives a vague non-answer when a clear answer exists in the docs
- Ignores the actual question and gives a generic response
- Confuses products (e.g., applies HDL310 steps to an HDL200)
- Fails to acknowledge when a question is out of scope

---

## Example Critiques

### Example 1 — Pass (straightforward)

**Input:** "How do I run an acoustic check on my HDL310?"

**Output:** *(agent correctly describes opening the Nureva App, navigating to the acoustic check feature, and running it)*

**Critique:**
```json
{
  "reasoning": "The agent correctly identified the Nureva App as the right tool and described the acoustic check flow accurately. The steps matched the documented process. Language was clear and appropriate for a non-expert user. No hallucinations detected.",
  "outcome": "pass"
}
```

---

### Example 2 — Fail (hallucination)

**Input:** "Can the HDL200 connect directly to a Crestron control system?"

**Output:** *(agent says "Yes, the HDL200 supports native Crestron integration via the Crestron module" — but this integration is only documented for the HDL410)*

**Critique:**
```json
{
  "reasoning": "The agent incorrectly attributed Crestron integration support to the HDL200. The support docs document Crestron sound tracking module usage specifically in context of other HDL systems, not the HDL200. This is a factual hallucination that could cause a customer to purchase or configure hardware incorrectly. Hard fail.",
  "outcome": "fail"
}
```

---

### Example 3 — Pass (honest gap acknowledgment)

**Input:** "What's the API endpoint for muting all microphones on a HDL310?"

**Output:** *(agent says it can confirm the Developer Toolkit exists and links to the developer docs, but doesn't have the specific endpoint details indexed and recommends visiting the Developer Toolkit documentation directly)*

**Critique:**
```json
{
  "reasoning": "The agent correctly recognized the limits of its indexed knowledge and directed the user to the authoritative source rather than guessing. This is the right behavior for S7-type questions. The response was honest, concise, and still actionable.",
  "outcome": "pass"
}
```

---

### Example 4 — Fail (wrong product scope)

**Input:** "I'm setting up a dual HDL300 configuration — what do I need to know?"

**Output:** *(agent gives standard HDL300 single-unit setup steps, makes no mention of dual configuration specifics)*

**Critique:**
```json
{
  "reasoning": "The user explicitly asked about dual HDL300 configuration, which has its own documented setup process. The agent defaulted to standard single-unit setup steps, missing the point entirely. This would send an integrator down the wrong path. Fail — the agent needs to recognize dual configuration as a distinct feature area (F10).",
  "outcome": "fail"
}
```

---

### Example 5 — Pass with concern (ambiguous input)

**Input:** "My audio isn't working."

**Output:** *(agent asks a clarifying question: which product, and what specifically isn't working — no audio at all, poor pickup, echo, etc.)*

**Critique:**
```json
{
  "reasoning": "The question was maximally ambiguous (S5). The agent correctly chose to clarify rather than guess, which prevents it from giving irrelevant troubleshooting steps. The clarifying questions were well-chosen and targeted. Minor concern: the agent could have also briefly listed what it can help with to orient the user. Still passes — core behavior is correct.",
  "outcome": "pass"
}
```

---

## Judge Prompt Template

Use this as the starting structure for the LLM judge prompt:

```
You are evaluating responses from Nureva Console Sense AI, a support agent trained on Nureva's documentation.

Your job is to determine whether the agent's response passes or fails based on accuracy, honesty, helpfulness, and scope.

A response PASSES if it:
- Correctly answers the question based on Nureva support documentation
- Does not hallucinate specs, steps, or capabilities
- Acknowledges documentation gaps honestly rather than guessing
- Is appropriately scoped to the question asked
- Provides actionable next steps

A response FAILS if it:
- States something factually incorrect or unsupported by the docs
- Gives a vague answer when a clear answer exists
- Confuses products or applies wrong-product instructions
- Ignores the actual question

<example-1>
[paste example critique here]
</example-1>

<example-2>
[paste example critique here]
</example-2>

Now evaluate:

<input>[user question]</input>
<output>[agent response]</output>

Return:
{
  "reasoning": "[detailed explanation]",
  "outcome": "pass|fail"
}
```

---

## Error Analysis Dimensions

Track failures across this matrix as you accumulate eval results:

| Feature | Scenario | Persona | # Examples | Failure Rate |
|---------|----------|---------|------------|--------------|
| F2 (Microphone Mist) | S2 (Troubleshooting) | P3 (End user) | — | — |
| F3 (Console) | S6 (Multi-step) | P1 (IT admin) | — | — |
| F5 (Camera integration) | S9 (Third-party) | P2 (AV integrator) | — | — |
| F1 (Installation) | S5 (Ambiguous) | P6 (Non-technical) | — | — |

Populate this table as you run evals. Common root causes to watch for:
- **Wrong product scope** — agent applies steps from the wrong HDL model
- **Hallucinated specs** — invented numbers, unsupported feature claims
- **Missing escalation** — agent doesn't tell users to contact support when appropriate
- **Tone mismatch** — technical jargon used with non-technical personas
- **Out-of-scope overreach** — agent speculates about HDX or unannounced features

---

## Implementation Checklist

- [ ] Identify principal domain expert (Nureva support engineer or senior AV integrator)
- [ ] Build dataset: target 30+ examples across F/S/P dimensions above
- [ ] Collect real queries from Nureva Console support logs if available
- [ ] Generate synthetic queries for uncovered dimension combos
- [ ] Run domain expert reviews — pass/fail + written critique per example
- [ ] Fix any systemic agent errors uncovered during review
- [ ] Build initial judge prompt with 3–5 strong example critiques
- [ ] Run judge against full expert-reviewed set; measure agreement
- [ ] Iterate until 90%+ agreement with domain expert
- [ ] Populate error analysis matrix
- [ ] Build specialized judges for top failure modes (e.g., hallucination detector, product-scope checker)
- [ ] Re-run evals after any major doc updates or model changes
