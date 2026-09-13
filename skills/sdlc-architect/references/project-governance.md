# Project Governance Reference

Use this reference to make the SDLC workflow traceable and risk-proportionate across new projects, existing repositories, monorepos, and multi-service systems. Preserve project-specific conventions when they already exist.

Use [references/execution-protocol.md](execution-protocol.md) for cross-session state, backlog iteration, evidence grading, interview protocol, command discovery, migration sequencing, and forward-test execution.

## Traceability model

Use stable IDs when the project has them. Otherwise use concise prefixes:

| Prefix | Meaning |
| --- | --- |
| `REQ-###` | Functional or quality requirement |
| `UC-###` | Use case or user journey |
| `ADR-###` | Architecture decision |
| `API-###` | API, event, or integration contract |
| `DATA-###` | Schema, migration, or data lifecycle change |
| `TEST-###` | Verification case or regression check |
| `OPS-###` | Deployment, observability, recovery, or runbook item |
| `UI-###` | User interface behavior or state when it needs independent traceability |

Do not create IDs for every sentence. Create them for items that must be reviewed, changed, tested, or referenced by another artifact.

Maintain a matrix for each material increment:

| Requirement | Decision/design | Diagram or contract | Implementation | Verification | Operations | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `REQ-001` | `ADR-001` | `SEQ-001`, `API-001` | `src/...` | `TEST-001` | `OPS-001` | Active |

Rules:

- Every Ready requirement has acceptance criteria and at least one verification reference.
- Architecture, data, security, or compatibility decisions link back to the requirements they serve.
- A diagram is linked only when it explains the behavior or boundary under review.
- Implementation references can be a file, module, migration, endpoint, component, or commit when the project uses that convention.
- Status changes propagate through the matrix. Mark obsolete artifacts `Superseded` or `Rejected` instead of silently deleting history.
- A missing link is either a real gap to fix or an explicit “not applicable” decision with a reason.

## Phase transition rules

Use these entry and exit conditions. The workflow remains iterative, so a failed exit returns the increment to the phase that owns the missing decision.

| Transition | Entry condition | Exit evidence |
| --- | --- | --- |
| Discovery → Requirements | Problem, audience, constraints, and outcome are understood | Scope, actors, non-goals, success signals, and initial risks are recorded |
| Requirements → Architecture | Behavior and quality attributes are testable | Requirements, acceptance criteria, boundaries, data ownership, and open decisions are linked |
| Architecture → Technical design | Material trade-offs are accepted or explicitly pending | ADRs, component boundaries, contracts, data changes, and failure behavior are defined |
| Technical design → Build | Increment passes Definition of Ready | Implementation tasks, affected artifacts, test strategy, and recovery concerns are named |
| Build → Verification | Bounded code/configuration change is complete | Code and tests are changed together, with no unreviewed scope expansion |
| Verification → Delivery | Acceptance criteria and risk checks have evidence | Definition of Done, release notes, observability, rollback, and remaining risks are complete |
| Delivery → Maintenance | Change is deployed or handed off | Ownership, feedback signals, incident path, and follow-up backlog are visible |

Do not use the presence of an artifact as exit evidence by itself. Evidence must show that the artifact answers the phase's decision.

## Risk-based workflow

Classify an increment before choosing the depth of review. Use the highest applicable level.

### Low risk

Examples: isolated copy, styling, local refactor, test-only improvement, or documentation correction with no behavior change.

Minimum: context snapshot, acceptance check, focused verification, and artifact consistency review.

### Medium risk

Examples: new user flow, endpoint, integration, dependency, permission rule, background job, or non-breaking schema addition.

Minimum: traceability matrix, relevant design or contract artifact, failure-path test, compatibility review, and targeted regression checks.

### High risk

Examples: authentication or authorization, payment, sensitive data, public API break, destructive migration, cross-service boundary, production deployment, or recovery-sensitive behavior.

Required: ADR, security/data gate, explicit compatibility and rollback plan, migration or rollout strategy, owner and observability signals, regression evidence, and user confirmation for unresolved material decisions.

If risk cannot be classified confidently, treat it as the higher level until evidence reduces the uncertainty. Record why the selected level is appropriate.

## Existing-project baseline

Before proposing changes to an existing project, capture the smallest baseline that affects the increment:

- repository shape, package or service boundaries, stack versions, and entry points;
- build, test, lint, type, migration, and deployment commands;
- current branch or working-tree state and user-owned changes;
- existing docs, ADRs, requirement IDs, diagrams, and project conventions;
- known failing checks, flaky tests, generated files, and environment limitations;
- integration contracts, data stores, auth boundaries, and operational ownership.

Classify the project as one of:

- **Greenfield:** no meaningful implementation or contract exists;
- **Documented existing:** current behavior and decisions are reasonably recorded;
- **Undocumented existing:** behavior must be inferred from code, tests, and runtime evidence;
- **Unhealthy baseline:** build or verification already fails before the requested change.

For an unhealthy baseline, record pre-existing failures separately. Do not attribute them to the increment or hide them behind a new change.

## Test-level selection

Choose the cheapest test level that can prove the behavior, then add deeper tests at boundaries or higher risk:

| Concern | Preferred evidence |
| --- | --- |
| Pure business rule or transformation | Unit test |
| Component state, validation, or local boundary | Component test |
| API, event, or schema compatibility | Contract test |
| Database, queue, filesystem, or external service behavior | Integration test |
| Critical user journey across deployed boundaries | End-to-end test |
| Visual, keyboard, responsive, or copy behavior | Browser/manual check plus code or accessibility inspection |
| Migration, retry, timeout, recovery, or incident behavior | Migration/integration test plus recovery exercise or documented limitation |

Do not add a unit test when only an end-to-end or contract test can prove the boundary. Do not rely on end-to-end tests to cover every internal business rule. Link selected tests to requirement IDs in the traceability matrix.

## ADR lifecycle

Create or update an ADR when a decision has meaningful consequences, alternatives, or reversal cost. This includes database choice, service boundary, public contract, auth model, migration strategy, dependency with broad reach, and performance/cost trade-off.

Use these statuses:

- `Proposed`: under review and not a stable implementation baseline;
- `Accepted`: current decision to implement or preserve;
- `Superseded`: replaced by a newer ADR, with a link to it;
- `Rejected`: considered and not selected, with the reason preserved.

When implementation contradicts an Accepted ADR, stop and decide whether the code or ADR is stale. Never let architecture drift silently.

## Monorepo and multi-service boundaries

For a monorepo or multi-service project:

- identify the owning package or service before editing;
- map dependency direction and public contracts between packages;
- keep requirement, test, and documentation links scoped to the affected package while linking cross-boundary contracts;
- run focused checks for affected packages plus contract or integration checks at each changed boundary;
- do not change shared packages, generated clients, or deployment manifests as incidental cleanup;
- record versioning, rollout order, and compatibility when services may deploy independently.

If ownership or dependency direction is unknown, treat it as a design decision, not as permission to edit broadly.

## Final handoff report

Use this shape at the end of Plan, Build, or Audit mode:

```text
Mode and phase: <Plan | Build | Audit; current phase>
Increment or audit scope: <what was handled>
Context and baseline: <relevant repository facts and pre-existing failures>
Changes or findings: <files, artifacts, or numbered findings>
Traceability: <requirement IDs and linked decisions, tests, diagrams, operations>
Verification: <commands, test levels, manual checks, and outcomes>
Security/data/operations: <review, signals, rollback, and ownership>
Risks and open decisions: <what remains and impact>
Next increment: <smallest useful follow-up>
```

In Audit mode, “Changes or findings” must distinguish verified defects from risks or missing evidence. In Plan mode, do not report implementation as completed.

## Maintenance loop

After delivery, use operational or user evidence to create the next bounded increment:

```text
signal or feedback
  → triage and impact
  → root cause or validated hypothesis
  → corrective requirement
  → implementation and regression test
  → updated ADR, diagram, runbook, or alert
```

Keep incident fixes linked to the signal, root cause, requirement, regression test, and operational change. Do not treat an incident workaround as a permanent design decision without review.

## Stale-artifact review

During verification and maintenance, look for artifacts that no longer match the project:

- requirements with no implementation or test reference;
- diagrams that contradict code, contracts, or current ADRs;
- ADRs marked Accepted while implementation follows another decision;
- tests covering removed behavior or missing current failure paths;
- runbooks, alerts, or release notes naming retired services or fields;
- generated docs or clients that are older than their source contract.

Mark each item `Current`, `Needs update`, `Superseded`, or `Unknown`. Update, archive, or explicitly assign the item. Do not silently delete a stale artifact when it explains why an earlier decision was made.

## Architecture drift detection

Architectural drift occurs when implementation diverges from accepted ADRs, domain models, or Mermaid diagrams without an explicit architectural decision.

During Audit and Verification modes, audit for these drift patterns:

1. **Layer Boundary Violations**:
   - UI/Presentation layer calling database repositories directly.
   - Controllers implementing core domain logic instead of delegating to domain services.
   - Circular imports between modules or packages.
2. **Undeclared Dependencies**:
   - New external libraries or cloud services added without evaluation against the ADR lifecycle.
   - Bypassing declared internal gateway contracts to reach internal microservices.
3. **Data & Contract Divergence**:
   - New tables, foreign keys, or enum variants present in code/migrations but missing from ER/Domain Mermaid diagrams.
   - Public endpoint response schemas returning undocumented fields.

### Drift Remediation Protocol

- **Intentional Evolution**: If the code reflects an agreed change in requirements, update the corresponding Mermaid diagram and document an ADR update in the same increment.
- **Accidental Drift**: If the deviation is an architectural violation (e.g. shortcut, leaky abstraction), reject or refactor the code to respect system boundaries before marking Done.
- **Reporting**: Report all detected drift in the Verification snapshot under `Architectural Alignment: Verified | Drift Remedied | Technical Debt Recorded`.
