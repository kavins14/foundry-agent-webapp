# LLM-as-a-Judge: Holy Grail Reference

> Source: [hamel.dev/blog/posts/llm-judge](https://hamel.dev/blog/posts/llm-judge/)

---

## The Core Problem

Most teams building AI systems make these evaluation mistakes:

1. Creating too many metrics simultaneously
2. Using arbitrary scoring systems (1–5 scales) without calibration
3. Ignoring domain expertise during evaluation
4. Deploying metrics that don't reflect actual user/business value

The fix is **"Critique Shadowing"** — a principal domain expert evaluates AI outputs with **pass/fail judgments + detailed written critiques**.

---

## The 7-Step Process

### Step 1: Identify the Principal Domain Expert

- This person sets evaluation standards and owns AI quality
- They surface unspoken expectations through the review process
- **One or two experts beat consensus** — stakeholders have conflicting preferences, so pick the person whose judgment matters most

### Step 2: Create a Diverse Dataset

Structure examples across three dimensions:

| Dimension | Purpose |
|-----------|---------|
| **Features** | Specific product capabilities |
| **Scenarios** | Edge cases: no matches, ambiguous requests, errors, missing info |
| **Personas** | New users, experts, non-native speakers, elderly, technophobes |

**Data generation:**
1. Sample real user interactions where available
2. Generate synthetic inputs via LLM prompts covering feature/scenario/persona combos
3. Run through your AI system and capture full interaction traces

**Quantity:** Start with ~30 examples, keep adding until no new failure modes appear.

### Step 3: Domain Expert Reviews — Pass/Fail + Critiques

**The judgment structure:**
- Binary **pass or fail only** (no scales)
- Paired with a **detailed written critique** explaining the reasoning

**Why pass/fail only?**
- Forces clarity on what actually matters
- Scales (1–5) obscure meaning — adjacent scores are hard to distinguish, inter-rater agreement is poor
- Creates actionable, unambiguous signal

**What makes a good critique:**
- Detailed enough for a new employee to understand
- Explains *why* the outcome received its judgment
- Acknowledges concerns while still justifying the pass/fail
- Highlights improvement opportunities without invalidating the decision
- Includes all relevant external context (user metadata, system state, reference data)

**Example — Pass with concerns:**
> "The AI completed the cancellation and confirmed it, meeting the primary goal. However, it should have asked for confirmation first to prevent accidents. Despite this oversight, it fulfilled the core need, so it passes."

**Example — Fail with reasoning:**
> "The system gave a generic solution without checking for account lockout and provided no empathetic support. It failed to personalize assistance, creating a poor user experience."

**Making reviews frictionless:**
- Show all context on a single screen
- Build a simple web app if spreadsheets become unwieldy
- Give the expert easy access to reference materials

### Step 4: Fix Obvious Errors First

Before building a judge, fix pervasive systemic issues the expert surfaces. Write regression tests. Repeat Step 3 until the system stabilizes. Don't wait for a judge to catch basic problems.

### Step 5: Build the LLM Judge Iteratively

**Key insight — "Criteria Drift":** You cannot fully define evaluation standards before analyzing real examples. The act of grading clarifies what standards should be.

**Few-shot prompt structure:**

```
<example-1>
<input>[user query or system input]</input>
<output>[AI response]</output>
<critique>
{
  "reasoning": "[detailed explanation]",
  "outcome": "pass|fail"
}
</critique>
</example-1>
```

**Critical elements:**
- 3–5 strong, diverse examples to start
- Include edge cases
- Provide the same external context used in manual review
- Write detailed critiques — not terse summaries
- Use identical structure to the target evaluation format

**Iteration loop:**
1. Create initial judge prompt from 3–5 expert examples
2. Run judge against the expert's full evaluation set
3. Compare outputs — measure agreement, precision, and recall separately (important with imbalanced data)
4. Identify failure patterns
5. Refine the prompt
6. Repeat until **90%+ agreement** is achieved

**Tips:**
- Manual hand-crafted adjustments outperform prompt optimizers
- Dynamic example selection (continual in-context learning) improves performance
- Use the most powerful model your budget allows — judge budgets often differ from production budgets

### Step 6: Perform Error Analysis

Once the judge agrees with the expert at an acceptable rate, calculate failure rates across dimensions:

| Feature | Scenario | Persona | Examples | Failure Rate |
|---------|----------|---------|----------|--------------|
| Order Tracking | No Matches | New User | 20 | 75.0% |
| Order Tracking | Multiple Matches | New User | 42 | 24.3% |

**Root cause classification:**
1. Manually examine failed interactions
2. Classify each by root cause (e.g., missing user education, poor context handling, bad error messages)
3. Tally distribution
4. Prioritize by frequency and impact
5. Write test cases for each category

### Step 7: Create Specialized Judges (if needed)

After error analysis reveals patterns:
- Build targeted judges for specific failure modes
- Some errors may be better caught by code-based assertions than LLM judges
- **Don't jump here before understanding the problem space**

---

## Key Principles

### The Real Value Is Looking at Your Data

> "The real value comes from looking at your data. Creating an LLM judge is a 'hack' to trick people into carefully examining their data."

The judge is secondary. The systematic data review is primary. **Never skip looking at your data — this is where most teams fail.**

### Why Binary Over Scales

| Pass/Fail | 1–5 Scales |
|-----------|------------|
| Forces clarity | Obscures meaning |
| High inter-rater agreement | Poor inter-rater agreement |
| Actionable | Ambiguous |
| Prevents metric sprawl | Encourages false precision |

---

## Common Mistakes to Avoid

1. **Metric sprawl** — Multiple 1–5 scales without clear meaning
2. **Skipping domain expert involvement** — Using convenient proxies instead
3. **Terse critiques** — Not enough detail to reuse in prompts
4. **Premature specialization** — Building specialized judges before understanding the problem
5. **Missing external context** — Not giving the judge the same info used in manual review
6. **Insufficient example diversity** — Not covering edge cases and varied personas
7. **Underpowered judge model** — Using a less capable model than the task warrants

---

## Implementation Checklist

- [ ] Identify principal domain expert
- [ ] Define dataset dimensions (features, scenarios, personas)
- [ ] Generate or collect diverse examples (~30 to start)
- [ ] Build data review interface (spreadsheet or simple web app)
- [ ] Domain expert reviews with pass/fail + critiques
- [ ] Fix systemic errors; write regression tests
- [ ] Create initial judge prompt (3–5 examples)
- [ ] Run judge against expert judgments; measure agreement
- [ ] Iterate prompt until 90%+ agreement
- [ ] Calculate error rates by dimension
- [ ] Classify root causes for failures
- [ ] Build specialized judges for priority failure modes
- [ ] Establish periodic re-evaluation schedule (after model updates, major changes)

---

## FAQ

**What model should I use for the judge?**
The most powerful model your cost/latency budget allows.

**Should I fine-tune a judge?**
Generally no. Fine-tune the primary AI system instead. Use judges to curate fine-tuning data, not as the thing to fine-tune.

**Can I use off-the-shelf judges?**
No inherent problem, but validate them on your actual data first. Apply discipline — don't trust them blindly.

**What if the judge can't reach 90% agreement?**
The AI system is likely overscoped (promises too much), steps were skipped, or expectations are unrealistic. Address scope or expectations rather than forcing alignment.

**Do domain experts need to review everything?**
No — only representative samples. Efficient sampling maintains statistical reliability without requiring full reviews indefinitely.
