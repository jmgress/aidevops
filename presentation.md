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
3. **Phase 3: AI-Augmented DevOps** (Predictive analytics, AI code assistants, minutes lead time)
4. **Phase 4: Agentic & Autonomous DevOps** (Self-healing systems, autonomous remediation, continuous evolution)

<div class="highlight-box">

💡 **Key Premise:** AI is not replacing DevOps—it is expanding human capability, reducing cognitive load, and transforming reactive troubleshooting into proactive delivery.
</div>

Note:
To set the baseline: DevOps has always been about reducing friction between development and operations.
We moved from manual tickets to automated scripts and Infrastructure as Code.
Now, AI is ushering in Phase 3 and Phase 4. We are moving beyond static rules and YAML scripts toward systems that reason, predict, and auto-correct.

---

# Three Lenses on AI in DevOps

### This talk looks at the same shift from three angles

<div class="grid-2">
<div class="card">

### 🛠️ Lens 1: AI *Building* DevOps
AI as a tool that helps us author the pipelines, IaC, tests, and runbooks that make up our automation.
</div>

<div class="card">

### 🤝 Lens 2: AI *Inside* the Pipeline
DevOps process and AI agents woven directly into the delivery pipeline itself—reviewing, testing, deploying, and operating.
</div>
</div>

<div class="card" style="margin-top: 0.75em;">

### 🧭 Lens 3: DevOps *For* AI-Native Products
What DevOps must become now that the applications we ship have AI embedded in them—prompt quality, AI-specific security, and new observability.
</div>

<div class="highlight-box">

💡 **Key Premise:** These are three different jobs. Conflating them leads teams to assume that adopting Copilot (Lens 1) also covers securing and operating an AI product in production (Lens 3)—it does not.
</div>

Note:
Before we go further, let's set up the mental model for the rest of the talk. There are really three distinct conversations happening under the banner of "AI in DevOps," and they get conflated constantly.
Lens 1 is about using AI as a tool to help us build our automation—pipelines, IaC, tests, runbooks.
Lens 2 is about embedding AI agents and AI-driven decisions directly into the DevOps process itself—code review, deployment risk, incident response.
Lens 3 is the one people forget: once the products we ship have AI/LLMs embedded in them, DevOps itself needs new practices—because a prompt change or a model swap can break things the same way a bad commit can, but our existing tools don't see it.
We'll walk through all three, then close with the risks, governance, and a roadmap that spans all three lenses.

---

# Why AI in DevOps NOW?

The convergence of four major industry forces:

<div class="grid-2">
<div class="card">

### 1. Data & Telemetry Explosion
Modern cloud-native apps generate petabytes of logs, metrics, and traces—far exceeding human processing capacity.
</div>

<div class="card">

### 2. Generative AI Breakthroughs
LLMs understand code context, natural language specifications, and complex system architectures.
</div>

<div class="card">

### 3. System Complexity
Microservices, multi-cloud, and serverless create non-linear failure modes that static rules miss.
</div>

<div class="card">

### 4. Demand for Velocity & Reliability
Businesses require higher release frequencies without sacrificing uptime or security compliance.
</div>
</div>

Note:
Why now? Four convergence drivers:
1. Telemetry overload: Humans can't scan millions of log lines during an outage.
2. GenAI capabilities: LLMs can analyze code, write tests, and summarize incidents.
3. System complexity: Cloud-native environments have too many moving parts for manual correlation.
4. Business urgency: Teams need to release continuously while keeping MTTR near zero.

---

# Traditional DevOps vs. AI-Augmented DevOps

| Dimension | Traditional DevOps | AI-Augmented DevOps |
| :--- | :--- | :--- |
| **Automation Basis** | Static, rule-based scripts (YAML, Bash) | Dynamic, pattern-driven AI models |
| **Code Creation** | Manual authoring + templates | AI Pair Programmers + Auto-refactoring |
| **Testing** | Pre-scripted test suites | AI-generated tests & self-healing UI tests |
| **Deployment Risk** | Manual gate checks & static thresholds | Predictive ML risk scoring & auto-canary |
| **Monitoring & Incidents** | Static alert thresholds (e.g., CPU > 80%) | Anomaly detection & Automated Root Cause Analysis |
| **Security** | Scheduled SAST/DAST scans | Real-time AI auto-remediation & context guardrails |

Note:
This table highlights the fundamental contrast.
In traditional DevOps, every rule must be explicitly programmed by a human.
In AI-Augmented DevOps, models learn normal behavior from data, predict anomalies before outages happen, and assist developers in writing safer code faster.

---

# Lens 1: AI Building DevOps Automation

<!-- .slide: class="lead" -->

### Using AI as a tool to author our pipelines, tests, and infrastructure

Note:
We start with Lens 1: using AI *as a tool* to help us build the automation that DevOps runs on—pipeline YAML, Terraform modules, test suites, runbooks. This is the most familiar lens; most teams are already here.

---

# AI Across the DevOps Lifecycle

```
 +-----------------------------------------------------------------------+
 |                        PLAN & DESIGN                                 |
 |  AI Spec Generation | User Story Elaboration | Architecture Mapping   |
 +-----------------------------------+-----------------------------------+
                                     |
 +-----------------------------------v-----------------------------------+
 |                        CODE & BUILD                                  |
 |  AI Coding Assistants | Auto Code Reviews | Tech Debt Remediation     |
 +-----------------------------------+-----------------------------------+
                                     |
 +-----------------------------------v-----------------------------------+
 |                        TEST & QA                                     |
 |  Smart Test Selection | Self-Healing Tests | Synthetic Data Gen        |
 +-----------------------------------+-----------------------------------+
                                     |
 +-----------------------------------v-----------------------------------+
 |                       RELEASE & DEPLOY                                |
 |  Deployment Risk Scoring | Auto-Canary | Predictive Rollback         |
 +-----------------------------------+-----------------------------------+
                                     |
 +-----------------------------------v-----------------------------------+
 |                       OPERATE & MONITOR                              |
 |  AIOps | Anomaly Detection | Automated RCA | Self-Healing Infra      |
 +-----------------------------------------------------------------------+
```

Note:
AI impacts every single phase of the DevOps lifecycle loop.
It isn't just about code generation—it extends from initial planning down to monitoring and security operations.
Let's walk through each stage to see how AI transforms real workflows.

---

# Phase 1: AI in Planning & Requirements

### From Vague Ideas to Executable Architecture

* **Automated User Story Refinement:** AI analyzes high-level feature requests and generates detailed acceptance criteria, edge cases, and test scenarios.
* **Architecture & Dependency Risk Mapping:** AI models evaluate proposed code changes against existing service dependencies to flag architectural bottlenecks early.
* **Effort & Risk Estimation:** Machine learning models trained on historical sprint telemetry provide objective effort estimates and identify high-risk modules.

<div class="highlight-box">

🎯 **Impact:** Reduces ambiguity early in the lifecycle, preventing costly rework during development and deployment phases.
</div>

Note:
In the Planning phase, AI helps product and engineering teams bridge the gap between intent and implementation.
Instead of vague ticket descriptions leading to broken specs, AI generates edge cases and flags dependency risks before a single line of code is written.

---

# Phase 2: AI in Code & Build

### Augmenting Developer Velocity & Quality

* **AI Coding Assistants:** Real-time code completions, boilerplate generation, and context-aware suggestions (e.g., GitHub Copilot, Cursor).
* **Automated PR Summaries & Code Reviews:** AI generates comprehensive pull request descriptions, diff summaries, and instant code style & bug detection.
* **Automated Tech Debt & Refactoring:** AI agents identify dead code, outdated libraries, and refactor legacy codebases safely.

<div class="grid-2">
<div class="card">

📈 **Developer Speed:** Up to **55% faster** task completion for routine coding tasks.
</div>
<div class="card">

🛡️ **Quality Guardrails:** Early bug detection directly in the IDE before PR submission.
</div>
</div>

Note:
In the Code & Build phase, AI assistants act as co-pilots.
Studies consistently show developers complete tasks up to 55% faster with AI assistants.
Beyond typing code, AI summarizes complex PR diffs, reviews changes for security anti-patterns, and automates tedious refactoring.

---

# Phase 3: AI in Testing & Quality Assurance

### Intelligent & Adaptive Quality Engineering

* **Automated Test Generation:** AI creates unit, integration, and API test suites directly from source code and requirements specs.
* **Self-Healing Test Automation:** When UI element selectors or API endpoints change, AI dynamically updates test scripts, eliminating fragile test failures.
* **Smart Test Selection (Impact Analysis):** AI analyzes PR diffs and runs *only* the affected tests, reducing test execution times from hours to minutes.
* **Flaky Test Detection:** Machine learning identifies non-deterministic test patterns and automatically flags or isolates them.

<div class="highlight-box">

⚡ **Result:** Faster CI pipeline runs, higher test coverage, and dramatic reduction in false-positive build failures.
</div>

Note:
Test suites are often the biggest bottleneck in CI/CD pipelines.
AI solves three major pain points:
1. Writing tests automatically.
2. Self-healing UI test selectors when layouts change.
3. Smart test selection—running only the 5% of tests impacted by a code commit rather than the full 10,000-test suite.

---

# Phase 4: AI in Release & Deployment

### Predictive & Risk-Aware Continuous Delivery

* **Deployment Risk Scoring:** ML models analyze git diff complexity, author history, test coverage, and timing to calculate a deployment risk score.
* **Automated Canary Analysis:** AI evaluates real-time metric deviations (error rate, latency, CPU) during canary rollouts and determines safe progression.
* **Predictive Rollback Engines:** Automatically initiates rollbacks *before* user-impacting outages peak, based on early micro-anomaly signals.

```
 [Code Commit] ──> [AI Risk Assessment] ──> Low Risk ──> [Auto-Deploy]
                                       └──> High Risk ──> [Gate & Review]
```

Note:
Deployments should not be heart-stopping events.
With AI, every release receives a risk score based on historical commit data and test signals.
During canary releases, AI monitors micro-anomalies and triggers an automated rollback within seconds if metrics degrade, long before customer complaints arrive.

---

# Lens 2: DevOps Process & Agents in the Pipeline

<!-- .slide: class="lead" -->

### Moving from AI-assisted steps to AI agents that participate in the pipeline itself

Note:
Now Lens 2: instead of AI just helping a human author automation, AI agents become participants *in* the DevOps process—triaging incidents, gating deployments, remediating vulnerabilities. This is where "agentic DevOps" lives.

---

# Phase 5: AI in Operations & Observability (AIOps)

### Next-Generation Incident Management & Self-Healing

* **Noise Reduction & Event Correlation:** Groups thousands of raw alerts into single, actionable incident contexts.
* **Dynamic Anomaly Detection:** Replaces static alert rules with ML baselines that adjust for time of day, seasonality, and traffic spikes.
* **Automated Root Cause Analysis (RCA):** LLMs scan correlated logs, metrics, and recent deployment events to pinpoint root causes in seconds.
* **MTTR Reduction:** Cuts Mean Time to Resolution by **50% to 70%** through instant triage and recommended runbooks.

<div class="highlight-box">

🔍 **Shift:** Moving from "Alert Fatigue" to "Instant Contextual Root Cause".
</div>

Note:
AIOps is revolutionizing operations.
Traditional monitoring suffers from alert fatigue—hundreds of pages during a major outage.
AIOps correlates alerts across services, suppresses noise, isolates the root cause (e.g., "Commit X updated config Y 3 minutes ago"), and suggests exact remediation steps.

---

# Phase 6: AI in DevSecOps & Compliance

### Proactive Security & Continuous Compliance

* **AI-Powered Static & Dynamic Analysis (SAST/DAST):** Intelligent vulnerability scanning with significantly lower false-positive rates.
* **Automated Security Remediation:** AI generates verified patch suggestions for detected CVEs directly in pull requests.
* **Real-time Secret & Data Leak Prevention:** Models detect obfuscated secrets, API keys, and sensitive PII before commits reach remote repos.
* **Continuous Compliance Mapping:** AI continuously monitors infrastructure configurations against frameworks like SOC 2, ISO 27001, HIPAA, and GDPR.

<div class="warning-box">

🔒 **Security First:** AI enables true "Shift-Left Security" by catching and fixing vulnerabilities at the moment of authoring.
</div>

Note:
DevSecOps often struggles because security scans block builds with false positives.
AI understands context: it filters out non-exploitable warnings and provides actionable code patches for real vulnerabilities, enabling developers to remediate issues immediately.

---

# The Next Horizon: Agentic AI & Autonomous DevOps

### From AI Assistants to Autonomous AI Agents

<div class="grid-2">
<div class="card">

### Copilot Era (Current)
* Human initiates task
* AI suggests code / command
* Human reviews & executes
* **Mode:** Human-in-the-lead
</div>

<div class="card">

### Agentic Era (Emerging)
* Goal defined by human ("Fix CVE-2026-1234")
* AI Agent investigates, writes fix, runs tests & opens PR
* Human approves outcome
* **Mode:** Human-on-the-loop
</div>
</div>

### Key Capabilities of Autonomous DevOps Agents:
1. **Multi-Step Reasoning:** Planning multi-file changes across complex repos.
2. **Tool Use & Execution:** Executing terminal commands, running tests, reading logs.
3. **Self-Correction:** Evaluating test failures and adjusting code iteratively.

Note:
We are transitioning from the "Copilot Era" to the "Agentic Era".
A Copilot auto-completes what you are typing.
An AI Agent accepts a high-level objective—such as "Upgrade library X and fix breaking changes"—and autonomously researches the codebase, makes changes, verifies tests, and submits a PR.
Notice that human oversight remains key: Human-on-the-loop.

---

# Quantifiable Business Impact & DORA Metrics

AI directly accelerates all four core DORA metrics:

| DORA Metric | Traditional Baseline | AI-Augmented Target | Driver |
| :--- | :--- | :--- | :--- |
| **Deployment Frequency** | Weekly / Monthly | Multiple times per day | AI deployment risk scoring & auto-testing |
| **Lead Time for Changes** | Days / Weeks | < 1 Hour | AI code assistants & automated reviews |
| **Mean Time to Restore (MTTR)** | Hours / Days | < 15 Minutes | AIOps automated RCA & self-healing |
| **Change Failure Rate** | 15% - 30% | < 5% | Automated test generation & canary engines |

<div class="highlight-box">

📊 **Bottom Line:** 3x to 5x increase in engineering throughput with higher reliability.
</div>

Note:
How do we measure ROI? Look at the DORA metrics.
AI impacts every single one:
Lead time drops because code and PR reviews are faster.
Deployment frequency increases because risk scoring gives confidence.
MTTR plummets because AIOps identifies root causes in seconds.
Change failure rate drops due to comprehensive AI test coverage.

---

# Lens 3: DevOps for AI-Embedded Applications

<!-- .slide: class="lead" -->

### The applications we ship now contain prompts and models—what does DevOps owe them?

Note:
The first two lenses were about using AI to run DevOps better. Lens 3 flips the question: our *products* now ship with LLMs, prompts, and agents embedded in them. That changes what "quality," "security," and "operations" mean for the DevOps org supporting them—regardless of whether we use AI to build our pipelines at all.

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
Traditionally our pipeline artifacts were code, containers, and config. Now add: prompt templates, system prompts, model version pins, retrieval sources, and agent tool permissions. Each of these can change application behavior in production without a traditional "code change" ever happening—so our existing change-management and CI gates often don't even see them.

---

# Prompt Quality Is the New Code Quality

### Applying SDLC rigor to prompts, not just code

* **Prompt version control:** Treat prompts/system messages as versioned artifacts with owners, PR review, and changelogs—not inline strings buried in application code.
* **Golden-set regression testing:** Maintain curated input/output test sets (the prompt equivalent of unit tests) and run them on every prompt or model change to catch regressions before release.
* **LLM-as-judge & rubric scoring:** Automated evaluators score outputs for correctness, tone, and policy adherence at PR time, similar to a linter or static analysis gate.
* **Prompt linting:** Static checks for missing guardrail instructions, ambiguous grounding, or unbounded output length—before the prompt ever reaches a model.

<div class="highlight-box">

🎯 **Equivalent:** Eval suite ≈ test suite. Prompt diff review ≈ code review. Eval score regression ≈ failed CI build.
</div>

Note:
This directly answers "what's the equivalent of code quality for prompts?" It's an evaluation pipeline: golden datasets of representative inputs with expected/acceptable outputs, automated scoring (often another LLM acting as judge, or human-graded samples), and a required score threshold to merge—exactly like a test coverage gate. Prompts should live in version control with real review, not be edited ad hoc in a config file or CMS.

---

# Securing AI-Embedded Applications

### The threat model expands beyond traditional AppSec

* **Prompt injection & jailbreaks:** Untrusted content (user input, retrieved documents, tool outputs) can hijack model instructions—treat every external input as adversarial, the same way we treat untrusted HTTP input.
* **Data leakage through outputs:** Models can regurgitate secrets, PII, or other users' data from context or training; outputs need the same DLP scanning we apply to logs and commits.
* **Agent permission scoping:** An AI agent with tool access is a new privileged identity—apply least-privilege, scoped credentials, and human-approval gates for any destructive or high-impact tool call.
* **Model & supply-chain provenance:** Track model source, version, and fine-tuning lineage like an SBOM; unreviewed model or embedding updates are a supply-chain risk.
* **Continuous red-teaming:** Adversarial prompt testing becomes a recurring pipeline stage, not a one-time pen test.

<div class="warning-box">

🔒 **Shift:** Security now has to review prompts, retrieval sources, and agent tool permissions—not just code and infrastructure.
</div>

Note:
Security for AI-embedded apps needs new categories that don't map cleanly onto traditional SAST/DAST: prompt injection via retrieved documents or tool results, data exfiltration through model outputs, and agents that hold real credentials and can take real actions. Least-privilege scoping for agent tool calls and mandatory human approval for destructive actions are becoming as standard as IAM policies are for services today.

---

# Observability & SLOs for AI Systems

### Extending monitoring beyond CPU, latency, and error rate

* **Groundedness & hallucination rate:** Sample production outputs against source-of-truth data to measure how often the model fabricates or contradicts facts.
* **Cost & token/latency budgets:** Treat token spend and response latency as SLOs—an unbounded prompt or runaway agent loop is the new "resource leak."
* **Drift detection:** Monitor for silent behavior changes after provider model updates, prompt edits, or shifts in the input distribution.
* **Human feedback loops:** Capture thumbs-up/down and escalation signals as production telemetry, feeding back into the eval/golden-set pipeline.
* **Fast rollback for prompts & model versions:** Pin and roll back prompt/model versions with the same speed and confidence as a code rollback.

<div class="highlight-box">

📈 **New dashboard row:** Alongside CPU/latency/error-rate, add hallucination rate, eval score trend, and cost-per-interaction.
</div>

Note:
Traditional observability doesn't tell you a model started hallucinating more after a silent provider update, or that a prompt change tripled token cost. Teams need eval-driven production sampling, drift alerts tied to prompt/model version changes, and rollback paths for prompts and model pins that are just as fast as a code rollback.

---

# Key Challenges, Risks & Mitigation

While AI offers immense advantages, DevOps teams must manage crucial risks:

<div class="grid-2">
<div class="card">

### 1. Hallucinations & Non-Determinism
* **Risk:** Incorrect code or operational commands.
* **Mitigation:** Strict CI/CD test gates & deterministic execution sandboxes.
</div>

<div class="card">

### 2. Data Privacy & IP Security
* **Risk:** Sensitive code/credentials leaking to public models.
* **Mitigation:** Self-hosted models, enterprise privacy agreements, local sanitization.
</div>

<div class="card">

### 3. Over-Reliance & Skill Atrophy
* **Risk:** Engineers losing deep system understanding.
* **Mitigation:** Mandatory code understanding, architectural reviews, mentoring.
</div>

<div class="card">

### 4. Tool Sprawl & Integration Costs
* **Risk:** Fragmented AI point solutions.
* **Mitigation:** Unified developer platform integration & standard APIs.
</div>
</div>

<div class="card" style="margin-top: 0.75em;">

### 5. Prompt Injection & AI-Native Attack Surface (Lens 3)
* **Risk:** Untrusted inputs hijacking embedded model/agent behavior in production.
* **Mitigation:** Input sanitization, output DLP scanning, scoped agent tool permissions, continuous red-teaming.
</div>

Note:
We must be clear-eyed about the challenges.
1. Hallucinations: AI models can output plausible-sounding incorrect code. Never auto-deploy without automated testing.
2. Privacy: Ensure your code isn't used for public model training.
3. Skill atrophy: Junior engineers must still learn underlying concepts, not just accept AI output blindly.
4. Tool sprawl: consolidate on a unified platform rather than a dozen disconnected point tools.
5. This last one is the Lens 3 risk: once your product embeds a model, prompt injection and agent tool misuse are new attack classes that traditional AppSec scanning does not catch.

---

# Governance, Safety & Responsible AI Framework

### Principles for Safe AI Adoption in DevOps

1. **Human-in-the-Loop (HITL):** Critical production changes and infrastructure modifications require explicit human sign-off.
2. **Least Privilege for AI Agents:** AI execution environments must operate under restricted IAM roles and scoped access tokens.
3. **Auditability & Provenance:** Every AI-generated commit, PR, or remediation action must be logged with clear attribution tags.
4. **Sandboxed Verification:** All AI-suggested operational commands must be validated in isolated environment sandboxes prior to production execution.
5. **Prompt & Model Change Control (Lens 3):** Prompts and model version pins go through the same review, eval-gate, and rollback discipline as code.

<div class="warning-box">

🛡️ **Rule of Thumb:** Trust AI for intelligence and speed; rely on deterministic pipelines for verification and enforcement.
</div>

Note:
Governance is essential.
Establish clear guardrails:
- Never give an AI agent unrestricted production admin rights.
- Always log AI actions for audit trail purposes.
- Treat AI code as un-trusted input until validated by tests.

---

# Practical Adoption Roadmap: Crawl, Walk, Run

```
+-------------------------------------------------------------------------+
|  CRAWL: Developer Enablement & Baseline Intelligence                    |
|  • Roll out AI Code Assistants (e.g. Copilot)                           |
|  • Enable AI PR summarization & basic static code analysis              |
|  • Implement basic log anomaly detection in staging                     |
+------------------------------------+------------------------------------+
                                     |
+------------------------------------v------------------------------------+
|  WALK: Automated Quality & Intelligent Delivery                         |
|  • Implement AI test generation & impact-based smart test selection      |
|  • Introduce ML deployment risk scoring & automated canary analysis      |
|  • Deploy AIOps for event correlation and root cause analysis          |
|  • Stand up a prompt eval/golden-set pipeline for any AI-embedded app    |
+------------------------------------+------------------------------------+
                                     |
+------------------------------------v------------------------------------+
|  RUN: Agentic DevOps & Autonomous Operations                            |
|  • Deploy autonomous AI agents for dependency management & CVE patching  |
|  • Enable self-healing infrastructure runbooks                          |
|  • Continuous, intent-driven pipeline optimization                      |
|  • Full Lens 3 maturity: prompt/model change control, AI red-teaming,   |
|    and hallucination/cost SLOs in production dashboards                 |
+-------------------------------------------------------------------------+
```

Note:
How do you implement this in your organization? Follow a phased Crawl-Walk-Run roadmap.
Start with developer enablement—tools like Copilot that provide immediate productivity wins.
Move to Walk—introducing AI test generation, deployment risk scoring, AIOps, and a first prompt evaluation pipeline (Lens 3).
Finally Run—adopting autonomous agents for routine patching and self-healing systems, plus full Lens 3 maturity: prompt/model version control, continuous AI red-teaming, and hallucination/cost SLOs as standard dashboard rows.

---

# Key Takeaways

1. **Lens 1 — AI Builds the Automation:** AI shifts pipeline/IaC/test authoring from manual rule scripting to intent-driven generation.
2. **Lens 2 — AI Joins the Pipeline:** Agents move from suggesting changes to participating in review, deployment, and incident response—under human governance.
3. **Lens 3 — DevOps for AI-Native Apps:** Prompts and model versions need the same rigor as code: eval-gated review, AI-specific security, and hallucination/cost SLOs.
4. **Verification over Trust:** Across all three lenses, pair AI speed with strict, deterministic validation gates and robust governance.

<div class="highlight-box">

🚀 **Action for Today:** Pick one lens where you have the biggest gap—likely Lens 3 if your product embeds AI—and identify your first high-ROI integration point!
</div>

Note:
To summarize with the three-lens framing:
Lens 1: AI is a productivity tool for building our automation—pipelines, IaC, tests.
Lens 2: AI agents become active participants inside the DevOps process itself, under human governance.
Lens 3: once our products embed AI, DevOps must extend to cover prompt quality, AI-specific security, and AI observability—this is the lens most teams haven't started yet.
Focus on systemic lifecycle integration, maintain robust verification guardrails across all three lenses, and empower your engineers to do their best strategic work.
Thank you! Let's open the floor for questions.

---

# Questions & Discussion

<!-- .slide: class="lead" -->

### DevOps in the Age of AI
**Thank You for Attending!**

*Explore the Repository & Presentation Deck Resources:*
`https://github.com/jmgress/aidevops`

Note:
Thank the audience and open up for Q&A.
Common questions to anticipate:
- How do we handle AI hallucinations in production?
- What is the cost model for enterprise AI tools?
- How do we upscale current DevOps engineers for AI workflows?
