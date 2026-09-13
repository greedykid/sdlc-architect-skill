# Behavioral Forward-Test Scenarios

These scenarios are an independent evaluation catalog for `sdlc-architect`. They test observable decisions and artifacts, not exact wording. Run them in an isolated temporary project with the skill loaded. Do not provide the expected outcome to the evaluating agent.

## SCN-001: New application request

Prompt shape: “Build a new application for <real user/problem>.”

Expected behavior:

- Inspect the empty or starter repository before proposing structure.
- Select Plan mode unless the user clearly authorizes implementation.
- Produce a context snapshot, increment, scope, assumptions, acceptance criteria, and next decision.
- Do not invent domain facts, integrations, metrics, or compliance claims.

Acceptance: the response identifies the current phase and does not jump directly into a full application scaffold without a bounded increment.

## SCN-002: Existing project with incomplete requirements

Prompt shape: “Add this feature” with an existing repository but no clear acceptance criteria.

Expected behavior:

- Inspect conventions, entry points, tests, and relevant artifacts.
- Identify the exact missing decisions and their impact.
- Ask before proceeding if the gap affects security, data, compatibility, cost, or deployment.
- Record low-risk assumptions instead of hiding them.

Acceptance: no implementation begins while the increment is not Ready.

## SCN-003: Requirement changes persisted data

Prompt shape: “Rename or change the meaning of a field used by existing clients.”

Expected behavior:

- Run requirement-change impact analysis.
- Identify API compatibility, migration order, backfill, rollback, backup, and regression checks.
- Update affected diagrams, contracts, code, fixtures, and tests together.
- Flag a breaking change instead of silently changing the contract.

Acceptance: the output contains an explicit compatibility and recovery decision.

## SCN-004: UI request without design direction

Prompt shape: “Build the dashboard UI” with no `DESIGN.md` or visual direction.

Expected behavior:

- Ask whether antislop applies During or After.
- Ask for direction, or label the result `draft without direction` with `ENERGY 1 / RHYTHM 1 / MOTION 1` if the user chooses to proceed.
- Address real navigation, interaction, loading, empty, error, keyboard, contrast, and mobile states.
- Do not fabricate logos, users, statistics, testimonials, or ghost links.

Acceptance: the UI is not presented as a final deliverable without direction.

## SCN-005: Requirement conflict

Prompt shape: two requirements demand incompatible behavior or data ownership.

Expected behavior:

- Stop at the conflict and explain the concrete impact.
- Present the smallest decision needed from the user.
- Avoid implementing a hidden precedence rule.
- Keep the unresolved item visible in the context snapshot.

Acceptance: no code or architecture baseline is changed based on an undisclosed guess.

## SCN-006: Audit existing artifacts

Prompt shape: “Review this project and tell me what is wrong.”

Expected behavior:

- Select Audit mode.
- Produce findings with severity, evidence, affected artifacts, and recommended correction.
- Separate verified defects from risks, assumptions, and missing evidence.
- Do not modify the project unless the user authorizes selected findings.

Acceptance: the audit is actionable and does not silently mix diagnosis with implementation.

## SCN-007: Traceability after a requirement change

Prompt shape: “Change the behavior of an existing requirement and keep the project consistent.”

Expected behavior:

- Assign or preserve stable requirement, decision, diagram, implementation, test, and operations IDs.
- Update the traceability matrix and mark superseded or rejected artifacts without deleting decision history.
- Identify links that are intentionally unchanged and explain why.
- Run targeted regression checks based on the affected boundaries.

Acceptance: no material requirement is left without a decision, implementation, verification, or explicit status.

## SCN-008: High-risk security change

Prompt shape: “Add authentication or authorization to an existing application.”

Expected behavior:

- Classify the increment as high risk.
- Require an ADR, security/data review, threat or abuse cases, rollout and rollback plan, and safe observability.
- Ask before proceeding if identity, session, permission, or data-ownership decisions are unresolved.
- Select tests at unit, integration, contract, and end-to-end levels where each boundary requires them.

Acceptance: the plan does not treat authentication as an ordinary low-risk feature or claim security completion without evidence.

## SCN-009: Monorepo or multi-service change

Prompt shape: “Change a shared API used by several packages or services.”

Expected behavior:

- Identify owning packages, dependency direction, public contracts, independent deployment order, and generated clients.
- Limit implementation changes to affected boundaries and run focused plus contract/integration checks.
- Record compatibility, versioning, rollout, and rollback expectations.
- Avoid incidental cleanup in unrelated packages.

Acceptance: the output names every changed boundary and the compatibility strategy for existing consumers.

## SCN-010: Maintenance and stale artifacts

Prompt shape: “A production signal or user report suggests the documented behavior is wrong.”

Expected behavior:

- Start from the signal, triage impact, and distinguish verified defect from hypothesis.
- Trace the issue into the requirement, code, regression test, ADR, diagram, runbook, and observability artifacts.
- Mark stale artifacts `Needs update`, `Superseded`, or `Unknown` instead of silently deleting them.
- Produce a handoff report with owner, recovery implications, and the next bounded increment.

Acceptance: the maintenance action leaves a linked regression path and does not create an undocumented workaround.
