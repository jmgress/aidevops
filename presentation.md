---
customTheme: css/theme
highlightTheme: monokai
revealOptions:
  width: 1280
  height: 720
  margin: 0.04
  center: false
  hash: true
  slideNumber: 'c/t'
---

# DevOps in the Age of AI

<!-- .slide: class="lead intro" -->

<img class="avatar" src="https://jmgress.github.io/usegenai/img/00-jamesgress.png" alt="James Gress">

## James Gress

### AI Director, Accenture

[LinkedIn: jamesgress](https://linkedin.com/in/jamesgress/) · [GitHub: jmgress](https://github.com/jmgress)

[Tampa Bay Generative AI Meetup](https://www.meetup.com/tampa-bay-generative-ai-meetup/)

Note:
Welcome everyone. Today we are diving into one of the most transformative shifts in software engineering: "DevOps in the Age of AI".

---

# Executive Summary: The Paradigm Shift

### The Evolution of Software Delivery

1. **Phase 1: Manual Operations** (Siloed teams, ticket-driven deployments, days/weeks lead time)
2. **Phase 2: Infrastructure as Code & CI/CD** (Automated build pipelines, programmatic infra, hours lead time)
3. **Phase 3: DevOps at the Speed of Agile** (Pipelines, test gates, and IaC tuned to move *deterministic code* from commit to production fast and safely)
4. **Phase 4: DevOps at the Speed of AI** (The product itself now ships prompts, models, and agents—*probabilistic* artifacts our pipelines were never designed to handle)

<div class="highlight-box">

💡 **Key Premise:** We built DevOps to keep up with Agile. Now the thing we ship has changed—so DevOps has to be rebuilt for the speed *and* the non-determinism of AI.
</div>

Note:
To set the baseline: DevOps has always been about reducing friction between development and operations.
We moved from manual tickets to automated scripts and Infrastructure as Code, and we tuned all of it for the speed of Agile—fast, safe releases of deterministic code.
The shift now isn't that we use AI to build pipelines. It's that the applications we ship have AI embedded in them. That changes the artifact, and it forces us to rebuild every DevOps stage.

---

# From the Speed of Agile to the Speed of AI

### Why our DevOps toolchain suddenly feels inadequate

<div class="grid-2">
<div class="card">

### Built for Agile
We designed CI/CD, IaC, and test gates to move **deterministic code** from commit to production fast and safely. Same input, same output—every time.
</div>

<div class="card">

### Now We Build for AI
Our products embed **prompts, models, and agents**. The same input can produce different outputs, and a dependency we don't control can change behavior overnight.
</div>
</div>

<div class="card" style="margin-top: 0.75em;">

### The artifact changed
A prompt edit or a model swap can alter production behavior as much as a code change—yet source control, build, test, security, and release were never designed to *see* them.
</div>

<div class="highlight-box">

💡 **Key Premise:** We built DevOps at the speed of Agile. AI-embedded products force us to rebuild every DevOps stage for the speed—and the non-determinism—of AI.
</div>

Note:
This is the spine of the whole talk. When we built DevOps, we built it for Agile: get deterministic code through the pipeline quickly and safely. Every gate we have—diffs, tests, scans, canaries—assumes the same input gives the same output.
AI-embedded products break that assumption. The behavior that defines quality now lives in prompts and model versions, the model is a dependency on someone else's release schedule, and outputs are non-deterministic.
So the rest of this talk walks the DevOps lifecycle stage by stage and asks: what does each stage have to become when the product ships AI?

---

# Why Rebuild DevOps for AI Now?

### Four forces making AI-embedded delivery a first-class DevOps problem

<div class="grid-2">
<div class="card">

### 1. AI Is Now in the Product
LLMs, prompts, and agents ship to users. The behavior that defines quality lives in artifacts our pipelines don't version or test.
</div>

<div class="card">

### 2. Non-Determinism in Production
The same input can legitimately produce different outputs. "It worked in my testing" no longer guarantees correctness.
</div>

<div class="card">

### 3. Models Are Dependencies You Don't Control
Providers update, deprecate, and silently drift on *their* schedule—not yours.
</div>

<div class="card">

### 4. Velocity + Reliability Still Required
Teams must ship AI features continuously without new outages, security holes, or runaway cost.
</div>
</div>

Note:
Why now? Because the AI moved from our toolchain into the product.
1. The thing that determines quality—the prompt and the model—now ships to customers.
2. Behavior is non-deterministic, so old "assert exact output" testing breaks.
3. The model is an external dependency that can change without a commit from us.
4. And none of the old expectations went away—we still have to be fast and reliable.

---

# Code-Centric DevOps vs. AI-Embedded DevOps

| Dimension | Code-Centric (Agile speed) | AI-Embedded (AI speed) |
| :--- | :--- | :--- |
| **Primary artifact** | Source code, config, containers | + Prompts, model pins, datasets, agent tools |
| **Determinism** | Same input → same output | Same input → outputs may differ |
| **Version control** | Code diffs in Git | + Prompt / model / dataset versioning |
| **Testing** | Assert exact outputs | Eval scores & semantic assertions |
| **Security** | SAST/DAST, dependency scanning | + Prompt injection, jailbreak, model provenance |
| **Release risk** | A bad commit | + A prompt edit or silent model drift |
| **Observability** | CPU, latency, error rate | + Hallucination, drift, token cost |

Note:
This is the contrast that drives the rest of the deck. Everything on the left still applies—we don't throw out DevOps. But each row grows a new right-hand column the moment the product embeds AI. The rest of the talk is a walk down these rows, stage by stage.

---

# The DevOps Lifecycle, Rebuilt for AI

### Every stage gains a new artifact and a new failure mode

```
 SOURCE CONTROL    -> prompts, model pins, datasets & RAG sources are versioned artifacts
 BUILD & PACKAGE   -> model weights, embeddings & prompt bundles pinned for reproducibility
 CODE QUALITY      -> eval suites & LLM-as-judge replace "does it compile + lint?"
 UNIT TESTING      -> golden-set regression instead of exact-match asserts
 INTEGRATION / E2E -> semantic & agent-flow tests tolerate non-determinism
 SECURITY SCAN     -> prompt injection, jailbreak & red-teaming beyond SAST/DAST
 DEPENDENCY SCAN   -> model provenance & an SBOM for weights and data
 RELEASE & DEPLOY  -> prompt/model version pinning; canary on a model swap
 OBSERVABILITY     -> hallucination rate, drift & token cost as SLOs
```

Note:
Here's the roadmap for the next section. Take the DevOps lifecycle you already run, and overlay what changes when the product ships AI. Notice the pattern in every line: the left side is the familiar stage, the right side is the new AI artifact and the new way it can fail. We'll take these one at a time.

---

# The New Surface Area: What Ships With the App?

### A prompt, a model version, and a tool config are now production artifacts

* **Prompts are code, but they don't look like code:** A one-line prompt edit can change behavior as much as a major refactor—yet it rarely goes through a diff review with the same scrutiny.
* **The model is a dependency you don't control:** Provider model updates, deprecations, and silent behavior drift happen on *their* release schedule, not yours.
* **Non-determinism is now a first-class production concern:** The same input can legitimately produce different outputs; "it worked in my testing" means less than it used to.

<div class="highlight-box">

🧭 **Reframe:** DevOps must now track and gate prompts, model versions, and tool/agent permissions with the same discipline it applies to code and infrastructure.
</div>

Note:
Traditionally our pipeline artifacts were code, containers, and config. Now add: prompt templates, system prompts, model version pins, retrieval sources, and agent tool permissions. Each of these can change application behavior in production without a traditional "code change" ever happening—so our existing change-management and CI gates often don't even see them. That's the gap the next nine stages close.

---

# Stage 1 · Source & Version Control

### Prompts, model pins, and data are first-class, reviewed artifacts

* **Prompts live in the repo:** System prompts and templates are versioned files with owners and PR review—not strings buried in app code or edited live in a CMS.
* **Pin the model, not just the library:** Record exact model IDs and snapshot versions so a build is reproducible and a model swap shows up as an explicit diff.
* **Version the data too:** Datasets, few-shot examples, and RAG source snapshots are checked in or content-addressed, so retrieval behavior is traceable.
* **Meaningful diffs:** A one-line prompt change should surface in review with the same visibility as a code change.

<div class="highlight-box">

🎯 **Rule:** If it can change production behavior, it belongs in version control—with an owner and a reviewable diff.
</div>

Note:
Start at the very front of the pipeline. The single highest-leverage move for an AI-embedded app is to get prompts, model version pins, and data out of ad-hoc config and into source control with real review. If a prompt tweak can change behavior like a refactor, it deserves a diff and an approver like a refactor.

---

# Stage 2 · Build & Packaging

### Reproducible builds when part of the "binary" is a model

* **Pin every probabilistic input:** Model version, decoding params (temperature, top-p), prompt bundle, and embedding model are locked into the build manifest.
* **Package prompts as artifacts:** Prompt bundles are versioned and shipped like any other build output, tagged to a specific release.
* **Rebuild embeddings deliberately:** Changing the embedding model invalidates your vector index—treat re-embedding as an explicit build step, not an afterthought.
* **Provenance baked in:** Each build records exactly which model, prompts, and data snapshot it was assembled from.

<div class="highlight-box">

⚙️ **Goal:** Given a release tag, you can reconstruct the exact prompts, model, and data that produced its behavior.
</div>

Note:
Reproducibility is harder when part of what you ship is a model and a set of prompts. A build isn't reproducible if "latest" model floats or the prompt bundle isn't pinned. Bake the model version, decoding parameters, prompt bundle, and embedding model into the build manifest, and remember that swapping the embedding model silently invalidates every vector you've already indexed.

---

# Stage 3 · Code Quality

### Prompt quality is the new code quality

* **Eval suites are the new lint:** Automated evaluators—rubric scoring, LLM-as-judge—score outputs for correctness, tone, and policy adherence at PR time.
* **Prompt linting:** Static checks for missing guardrail instructions, ambiguous grounding, or unbounded output length before the prompt ever reaches a model.
* **Score thresholds gate merges:** A drop in eval score fails the build, exactly like a test-coverage regression.
* **Human-reviewed diffs:** Prompt and rubric changes go through code review with clear owners—not ad-hoc edits in a config file.

<div class="highlight-box">

🎯 **Equivalent:** Eval suite ≈ static analysis. Prompt diff review ≈ code review. Eval score regression ≈ failed CI build.
</div>

Note:
This answers "what's the equivalent of code quality for a prompt?" It's an evaluation pipeline: representative inputs with expected or acceptable outputs, automated scoring—often another LLM acting as judge, plus graded human samples—and a required threshold to merge, just like a coverage gate. Prompt linting catches the obvious stuff before you even spend a token: missing guardrails, unbounded output, vague grounding.

---

# Stage 4 · Unit Testing

### Golden-set regression replaces exact-match asserts

* **Golden sets are unit tests:** Curated input / expected-behavior pairs run on every prompt or model change to catch regressions before release.
* **Assert on properties, not strings:** Check for required facts, correct format, refusal behavior, and forbidden content instead of a byte-for-byte match.
* **Deterministic where you can:** Pin temperature to 0 and seed where supported so tests are stable; tolerate variance only where it is genuinely expected.
* **Fast and local:** Run a representative golden subset on every PR and the full set nightly.

<div class="highlight-box">

⚡ **Result:** Regressions in model behavior get caught at PR time—not by users in production.
</div>

Note:
The unit-test equivalent for AI is the golden set: a curated collection of inputs paired with the behavior you expect. You can't assert exact strings against a non-deterministic model, so you assert on properties—did it include the required fact, use the right format, refuse when it should, avoid forbidden content. Pin temperature to zero where you can to keep the tests stable.

---

# Stage 5 · Integration & E2E Testing

### Testing whole AI flows under non-determinism

* **Semantic assertions:** Validate meaning with embeddings or an LLM judge rather than exact output equality.
* **Test the agent, not just the model:** Exercise tool calls, retrieval, and multi-step reasoning end to end—including failure and retry paths.
* **Adversarial and edge inputs:** Include ambiguous, empty, and hostile inputs to verify graceful degradation.
* **Flake budgets:** Accept a measured variance band and alert when pass rates drift below it, rather than chasing every non-deterministic blip.

<div class="highlight-box">

🔁 **Shift:** From "assert the exact output" to "assert acceptable behavior within a tolerance."
</div>

Note:
At the integration level you're testing the whole flow: retrieval, tool calls, multi-step reasoning. Exact-match assertions don't survive here, so you validate meaning—embedding similarity or an LLM judge—and you test the agent's behavior including how it recovers from a failed tool call. Set a flake budget: expect some variance, and alert when the pass rate drifts out of band.

---

# Stage 6 · Security Scanning

### The threat model expands beyond SAST/DAST

* **Prompt injection & jailbreaks:** Treat every external input—user text, retrieved documents, tool output—as adversarial and test for instruction hijacking.
* **Output DLP:** Scan model outputs for leaked secrets, PII, or other users' data, the same way we scan logs and commits.
* **Agent permission scoping:** An agent with tool access is a privileged identity—apply least-privilege credentials and human approval for destructive actions.
* **Continuous red-teaming:** Adversarial prompt testing becomes a recurring pipeline stage, not a one-time pen test.

<div class="warning-box">

🔒 **New scans:** Prompt-injection suites and red-team runs join SAST/DAST in the pipeline.
</div>

Note:
Security gets new categories that don't map onto traditional SAST/DAST. Prompt injection arrives through untrusted content—user input, retrieved documents, tool results—so treat all of it as adversarial. Outputs need DLP scanning because models can regurgitate secrets or PII. And any agent that holds credentials and can take actions is a new privileged identity that needs least-privilege scoping and human approval on destructive calls.

---

# Stage 7 · Dependency Scanning

### The model and its data are dependencies too

* **SBOM for models:** Track model source, version, license, and fine-tuning lineage alongside your library SBOM.
* **Provenance & integrity:** Verify where weights came from—an unreviewed model or embedding update is a supply-chain risk.
* **Watch for drift & deprecation:** Alert on provider model updates and end-of-life notices the way you alert on CVEs.
* **Third-party prompt & tool risk:** Community prompts, plugins, and MCP tools are untrusted dependencies—review before adoption.

<div class="warning-box">

🔒 **Extend the supply chain:** Models, embeddings, datasets, and agent tools all need provenance and review.
</div>

Note:
Your dependency graph now includes the model and its data. Track model source, version, license, and fine-tuning lineage like an SBOM. Provider model updates and deprecations should page you the way a CVE does, because a silent model change is a behavior change you didn't ship. And treat community prompts, plugins, and MCP tools as untrusted third-party dependencies.

---

# Stage 8 · Release & Deployment

### Prompts and model versions ship under change control

* **Version pinning:** Releases pin an exact prompt bundle and model version—no silent "latest" in production.
* **Canary a model swap:** Roll a new model or prompt to a fraction of traffic and compare eval scores, cost, and latency before full rollout.
* **Fast rollback:** Roll back a prompt or model pin as quickly and confidently as a code rollback.
* **Change control for prompts:** A prompt edit goes through the same review, eval gate, and approval as a code deploy.

```
 [Prompt/Model Change] ──> [Eval Gate] ──> Pass ──> [Canary] ──> [Full Rollout]
                                      └──> Fail ──> [Block & Review]
```

Note:
Releasing an AI-embedded app means releasing a specific prompt bundle and a specific model version—pinned, never floating "latest." A model swap is a deploy, so canary it: send a slice of traffic to the new model and compare eval score, latency, and cost before you promote. And make prompt and model rollback exactly as fast as a code rollback, because you'll need it.

---

# Stage 9 · Observability & SLOs

### Monitoring beyond CPU, latency, and error rate

* **Groundedness & hallucination rate:** Sample production outputs against source-of-truth data to measure how often the model fabricates or contradicts facts.
* **Cost & token/latency budgets:** Treat token spend and response latency as SLOs—an unbounded prompt or runaway agent loop is the new "resource leak."
* **Drift detection:** Watch for silent behavior change after provider model updates, prompt edits, or shifts in the input distribution.
* **Human feedback loops:** Capture thumbs-up/down and escalation signals as telemetry that feeds back into the eval / golden-set pipeline.

<div class="highlight-box">

📈 **New dashboard rows:** Hallucination rate, eval score trend, and cost-per-interaction—right beside CPU, latency, and error rate.
</div>

Note:
Traditional observability won't tell you the model started hallucinating more after a silent provider update, or that a prompt change tripled token cost. You need eval-driven production sampling, drift alerts tied to prompt and model version changes, and human feedback captured as first-class telemetry that flows back into your golden set. Hallucination rate, eval trend, and cost-per-interaction become standard dashboard rows.

---

# Does This Still Move the DORA Needle?

| DORA Metric | Risk in AI-Embedded Apps | How the rebuilt stages help |
| :--- | :--- | :--- |
| **Deployment Frequency** | Fear of shipping prompt/model changes | Eval gates + canary give confidence to ship often |
| **Lead Time for Changes** | Manual prompt QA is slow | Automated eval suites shorten the feedback loop |
| **Change Failure Rate** | Silent model drift breaks prod | Version pinning + golden-set regression catch it early |
| **MTTR** | AI failures are hard to see | Hallucination/drift/cost SLOs + fast prompt rollback |

<div class="highlight-box">

📊 **Bottom line:** The same DORA discipline still applies—AI just adds new artifacts and failure modes that each stage now has to cover.
</div>

Note:
DORA doesn't get thrown out; it gets a new column of risks. The fear of shipping a prompt change hurts deployment frequency—eval gates and canaries fix that. Silent model drift drives change-failure rate—pinning and golden sets catch it. And you can't restore what you can't see, so the new SLOs plus fast prompt rollback are what keep MTTR low.

---

# The Horizon: When the Product Becomes an Agent

### Embedded agents raise the stakes for every stage

<div class="grid-2">
<div class="card">

### Today: Assistive AI in the Product
A model generates text or answers a question; a human decides what to do with it. The failure mode is **a bad answer**.
</div>

<div class="card">

### Emerging: Agentic Products
The product plans, calls tools, and takes actions on the user's behalf. The failure mode is **a bad action**.
</div>
</div>

### What agentic products demand from the stages we just walked:
1. **Scoped tool permissions & approval gates** — security stage becomes non-negotiable.
2. **E2E tests over multi-step tool flows** — integration testing must cover the whole plan-act-observe loop.
3. **Action-level audit & fast rollback** — release and observability must trace *what the agent did*, not just what it said.

Note:
Look ahead one step. Today most embedded AI is assistive—it produces an answer and a human acts. The emerging shift is agentic products that take actions themselves. When the failure mode moves from "bad answer" to "bad action," the stages we just walked stop being nice-to-have. Scoped permissions, end-to-end flow tests, and action-level audit with fast rollback become the difference between a helpful agent and an incident.

---

# Key Challenges, Risks & Mitigation

While AI-embedded delivery unlocks huge value, teams must manage new risks:

<div class="grid-2">
<div class="card">

### 1. Hallucinations & Non-Determinism
* **Risk:** Fabricated or inconsistent output reaches users.
* **Mitigation:** Golden-set gates, semantic assertions, groundedness SLOs.
</div>

<div class="card">

### 2. Silent Model Drift
* **Risk:** A provider update changes behavior overnight.
* **Mitigation:** Model version pinning, drift detection, fast rollback.
</div>

<div class="card">

### 3. Prompt Injection & Agent Misuse
* **Risk:** Untrusted input hijacks the model or its tools.
* **Mitigation:** Input sanitization, output DLP, scoped tool permissions, red-teaming.
</div>

<div class="card">

### 4. Runaway Cost
* **Risk:** Unbounded prompts or agent loops blow the budget.
* **Mitigation:** Token/latency SLOs and hard limits.
</div>
</div>

<div class="card" style="margin-top: 0.75em;">

### 5. Prompt & Model Change Sprawl
* **Risk:** Behavior-changing edits bypass review entirely.
* **Mitigation:** Version everything, eval-gate every change, require reviewed diffs with owners.
</div>

Note:
Be clear-eyed about the risks that come with the new artifacts.
1. Non-determinism means fabricated or inconsistent output—gate on golden sets and measure groundedness.
2. Model drift can break you without a commit—pin versions and detect drift.
3. Prompt injection is a real, exploitable attack surface—sanitize input, DLP the output, scope the tools.
4. Cost is a reliability concern now—treat tokens like a resource leak.
5. And the quiet one: behavior-changing prompt edits that never went through review. Version everything and eval-gate every change.

---

# Governance, Safety & Responsible AI

### Principles for shipping AI-embedded products safely

1. **Human-in-the-Loop (HITL):** High-impact actions—especially agent tool calls—require explicit human sign-off.
2. **Least Privilege for AI Agents:** Any agent with tool access runs under scoped IAM roles and access tokens.
3. **Auditability & Provenance:** Log prompt version, model version, and every agent action with clear attribution.
4. **Prompt & Model Change Control:** Prompts and model pins go through review, eval gates, and rollback with the same discipline as code.
5. **Eval-Gated Release:** No prompt or model reaches production without passing its eval suite.

<div class="warning-box">

🛡️ **Rule of Thumb:** Trust AI for intelligence and speed; rely on deterministic gates for verification and enforcement.
</div>

Note:
Governance is what keeps the speed safe.
- Keep a human on high-impact actions, especially anything an agent can execute.
- Give agents least-privilege credentials, never standing admin.
- Log prompt version, model version, and agent actions so every behavior is attributable.
- Put prompt and model changes under the same change control as code, and let nothing ship without passing its eval suite.

---

# Practical Adoption Roadmap: Crawl, Walk, Run

```
+-------------------------------------------------------------------------+
|  CRAWL: Make AI Artifacts Visible                                       |
|  • Move prompts and system messages into version control               |
|  • Pin exact model versions—no floating "latest" in production          |
|  • Stand up a first golden-set + eval check in CI                       |
+------------------------------------+------------------------------------+
                                     |
+------------------------------------v------------------------------------+
|  WALK: Gate and Observe                                                 |
|  • Eval-score merge gates and prompt linting on every PR                 |
|  • Prompt-injection and red-team scans in the pipeline                  |
|  • Hallucination / drift / cost SLOs on the dashboard                   |
|  • Canary model and prompt swaps before full rollout                    |
+------------------------------------+------------------------------------+
                                     |
+------------------------------------v------------------------------------+
|  RUN: Full AI-Native Delivery                                           |
|  • Model SBOM, provenance, and supply-chain review                     |
|  • Automated drift detection with fast prompt/model rollback            |
|  • Scoped-permission agent flows with action-level audit               |
+-------------------------------------------------------------------------+
```

Note:
How do you get there? Crawl, walk, run.
Crawl is pure visibility: get prompts into git, pin your model versions, and add one golden-set check in CI. Most teams can do this in a sprint.
Walk adds gates and observation: eval gates on merge, security scans for injection, and hallucination/cost SLOs, plus canarying model swaps.
Run is full AI-native delivery: model SBOMs, automated drift detection with fast rollback, and agent flows with scoped permissions and action audit.

---

# Key Takeaways

1. **The artifact changed:** Products now ship prompts, models, and agents—behavior lives in things Git and CI never used to see.
2. **Every stage needs a rebuild:** Source control, build, code quality, testing, security, dependencies, release, and observability each gain a new AI artifact and a new failure mode.
3. **Determinism gives way to evaluation:** Exact-match asserts become eval scores, golden sets, and semantic assertions.
4. **Verification over trust:** Pair AI speed with deterministic gates, version pinning, and fast rollback.

<div class="highlight-box">

🚀 **The through-line:** We built DevOps at the speed of Agile. Now we rebuild it—stage by stage—for the speed of AI. Pick the stage with your biggest gap and start there.
</div>

Note:
To close on the theme we opened with: we built DevOps for the speed of Agile, tuned to move deterministic code safely and fast. AI-embedded products changed the artifact, so we rebuild the pipeline stage by stage—version the prompts and models, evaluate instead of exact-match, extend security and the supply chain, pin and canary releases, and add AI-specific SLOs.
Determinism gives way to evaluation, and verification beats trust. Pick the one stage where your gap is biggest and start there.
Thank you! Let's open the floor for questions.
