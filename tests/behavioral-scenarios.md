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
