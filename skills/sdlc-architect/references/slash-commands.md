# Slash Commands Dispatcher Reference

Use this reference to deterministically route and execute shorthand slash commands issued by users or agents. When a prompt starts with `/sdlc` or an equivalent trigger, the agent must immediately identify the target command, load repository context, emit a context snapshot, execute the phase boundaries, and report the completion evidence.

---

## Command Routing Matrix

| Command | Target Phase | Mode | Direct Mutation Allowed | Primary Artifact Output |
|---|---|---|---|---|
| `/sdlc plan <feature>` | Discovery → Technical Design | Plan | No (artifacts only) | Requirements, ADR, Mermaid diagrams, Ready tasks |
| `/sdlc build <feature>` | Implementation → Verification | Build | Yes (code + tests) | Code changes, tests, updated state, PR notes |
| `/sdlc audit [target]` | Verification / Governance | Audit | No (unless authorized) | Prioritized audit findings, evidence, remediation plan |
| `/sdlc gate ready` | Quality Gate | Audit | No | Definition of Ready checklist & decision verdict |
| `/sdlc gate done` | Quality Gate | Audit | No | Definition of Done checklist & release readiness |
| `/sdlc adr <title>` | Architecture | Plan | Yes (`docs/adr/`) | Numbered ADR in `docs/adr/000X-<slug>.md` |
| `/sdlc diagram <type>` | Architecture / Design | Plan | Yes (doc/diagram files) | Syntactically valid, grounded Mermaid diagram |
| `/sdlc antislop [scope]`| Anti-slop Gate | Audit | No (or bounded fix) | Anti-slop checklist (UI, copy, comments, contrast) |
| `/sdlc threat-model` | Security Gate | Plan/Audit| No (report only) | STRIDE matrix, OWASP LLM assessment, mitigations |

---

## Common Execution Protocol (All Commands)

Every slash command execution must follow these 5 automated stages:

1. **Context Ingestion**:
   - Check for `docs/project-state.md`. If present, read current phase, active increment, and recent decisions.
   - Inspect repository structure, stack, entry points, and test framework.
2. **Context Snapshot**:
   - Emit standard snapshot: Mode, Phase, Increment, Scope, Non-goals, Assumptions, Risks, and Acceptance Criteria.
3. **Execution**:
   - Execute the specific command protocol defined below.
   - Adhere strictly to the requested mode (do NOT mutate application source code during `plan`, `audit`, or `gate` commands).
4. **Gate Evaluation**:
   - Check Definition of Ready before building; check Definition of Done before finishing.
5. **State & Artifact Sync**:
   - Update `docs/project-state.md` if state tracking is enabled in the repository.
   - Report changed files, verification results, and recommended next increment.

---

## Detailed Command Protocols

### 1. `/sdlc plan <feature>`
- **Input**: `<feature>` description or ticket reference.
- **Prerequisites**: Repository inspection without modifying source code.
- **Action Steps**:
  1. Break down the user story into concrete actors, goals, constraints, and non-goals.
  2. Define testable Acceptance Criteria (Given/When/Then or checklist).
  3. Formulate architectural decisions and scaffold an ADR if boundaries, data models, or third-party integrations change.
  4. Generate a grounded Mermaid diagram (sequence, component, or state diagram) clarifying the design.
  5. Deconstruct work into small, testable tasks marked with Ready status.
- **Output**: Detailed plan artifact or documentation update. State explicitly: *"Planning phase complete. Ready for implementation via `/sdlc build`."*

### 2. `/sdlc build <feature>`
- **Input**: Feature name or pending increment.
- **Prerequisites**: Verify Definition of Ready. If blocking gaps exist, halt and ask the user.
- **Action Steps**:
  1. Validate baseline tests and environment before making changes.
  2. Implement code incrementally in alignment with agreed design and architectural boundaries.
  3. Write or update unit, integration, or contract tests matching the acceptance criteria.
  4. Run repository test suite and linters to verify zero regression.
  5. Apply anti-slop rules on any modified UI, copy, or code comments.
- **Output**: Summary of modified files, test execution output, Definition of Done checklist, and PR readiness summary.

### 3. `/sdlc audit [target]`
- **Input**: Optional target path, component, or system scope. If omitted, audit current branch or recent changes.
- **Prerequisites**: Read-only inspection.
- **Action Steps**:
  1. Inspect code architecture, design consistency, test coverage, and documentation.
  2. Identify anti-patterns, drift from existing ADRs, security vulnerabilities, or anti-slop violations.
  3. Classify each finding with Severity (`High`, `Medium`, `Low`, `Informational`), Concrete Evidence (file paths, lines, snippets), and Recommended Remediation.
- **Output**: Structured audit report with prioritized recommendations.

### 4. `/sdlc gate ready`
- **Input**: Optional backlog item or feature title.
- **Action Steps**:
  1. Evaluate the proposed increment against the 10-point Definition of Ready checklist in `references/quality-gates.md`.
  2. Highlight any missing requirements, unaddressed security/privacy concerns, or unverified assumptions.
- **Output**: Clear verdict: `[READY]` (proceed to build) or `[BLOCKED]` (itemized missing prerequisites).

### 5. `/sdlc gate done`
- **Input**: Current working branch or staged increment.
- **Action Steps**:
  1. Evaluate current changes against the 10-point Definition of Done checklist in `references/quality-gates.md`.
  2. Verify automated test pass status, linting, migration safety, and anti-slop compliance.
  3. Check that documentation, diagrams, and `project-state.md` reflect the implementation.
- **Output**: Clear verdict: `[DONE]` (ready for release/merge) or `[ACTION REQUIRED]` (itemized gaps).

### 6. `/sdlc adr <title>`
- **Input**: Decision title/slug (e.g. `use-postgresql-for-audit-log`).
- **Action Steps**:
  1. Scan `docs/adr/` for the next sequential index (e.g. `0002`).
  2. Scaffold `docs/adr/000X-<slug>.md` using `templates/adr-template.md`.
  3. Populate Context, Decision, Consequences, Compliance, and Alternatives based on the conversation context.
- **Output**: Path to the created ADR and a brief executive summary of the decision.

### 7. `/sdlc diagram <type>`
- **Input**: Diagram type (`sequence`, `flowchart`, `class`, `component`, `state`, `er`, `deployment`, `use-case`).
- **Action Steps**:
  1. Ground diagram symbols strictly in real code classes, database tables, modules, or network endpoints.
  2. Generate syntactically valid Mermaid code fenced with ` ```mermaid `.
  3. Verify diagram structure against `references/uml-mermaid.md` (no syntax errors, proper quoting for special characters).
- **Output**: Rendered Mermaid diagram with concise accompanying narrative.

### 8. `/sdlc antislop [scope]`
- **Input**: Optional scope (`ui`, `copy`, `comments`, `contrast`, `responsive`, `all`). Default: `all`.
- **Action Steps**:
  1. UI: Verify semantic layout, consistent spacing, no broken responsive breakpoints.
  2. Contrast: Check WCAG AA compliance (4.5:1 for normal text, 3:1 for large text).
  3. Copywriting: Strip AI hype words ("delve", "seamless", "elevate", "robust").
  4. Comments: Ensure comments explain *why*, not narrating obvious *what*.
- **Output**: Anti-slop pass/fail score with line-level diffs for remediation.

### 9. `/sdlc threat-model`
- **Input**: Target feature, architecture change, or full application.
- **Action Steps**:
  1. Identify trust boundaries, data flows, and external interfaces.
  2. Analyze threats using STRIDE (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege).
  3. For AI/LLM components, evaluate OWASP Top 10 for LLMs (prompt injection, sensitive data leakage, supply chain).
- **Output**: Threat classification table with corresponding mitigation controls and residual risk ratings.
