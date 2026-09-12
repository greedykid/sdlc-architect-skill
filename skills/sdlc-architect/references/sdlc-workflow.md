# SDLC Workflow Reference

Use this reference for phase planning and artifact selection. It is a decision aid, not a mandatory folder layout.

## Increment shape

Start each increment with a short brief:

- outcome and user or system value;
- in-scope behavior and explicit non-goals;
- actors, external systems, and constraints;
- acceptance criteria and relevant quality attributes;
- assumptions, open decisions, and risks;
- affected existing artifacts and the intended verification approach.

Keep the increment small enough to review as one coherent change. If the request spans multiple independent outcomes, split it into increments and establish their dependency order.

## Phase outputs

### Discovery

Capture the problem, users or operators, current pain, desired outcome, constraints, and measurable success signals. Record non-goals so later design choices do not silently expand scope.

Useful outputs include a problem brief, stakeholder map, context summary, and initial risks. Do not turn guesses into requirements.

### Requirements

Represent behavior as use cases, user stories, or equivalent requirements that can be verified. Each meaningful item should state:

- actor or initiating condition;
- desired behavior and important alternate or failure paths;
- acceptance criteria;
- data, permission, performance, availability, or compliance constraints when known.

Separate functional requirements from quality attributes. Make dependencies and unresolved decisions visible. A backlog item is ready for implementation only when its behavior and verification intent are sufficiently clear.

### Architecture

Document only decisions that matter to the system's boundaries or long-term behavior. For each significant decision, capture the context, chosen option, alternatives considered when relevant, consequences, and reversal cost.

Define ownership of responsibilities and data, trust boundaries, integration contracts, persistence choices, deployment assumptions, and operational concerns. Prefer an architecture that can support the current increment without speculative infrastructure.

### Technical design

Turn the increment into implementation-sized tasks. Specify interfaces, inputs and outputs, validation, state transitions, error behavior, idempotency or transaction expectations where relevant, and data changes. Link each task to requirements and tests.

Use UML diagrams to clarify behavior or structure that prose alone would make ambiguous. A diagram is supporting evidence, not a substitute for decisions or contracts.

### Implementation

Implement the agreed increment using existing project patterns. Keep unrelated cleanup separate. Add or update tests with the behavior, not merely the internal implementation, as the primary target. Update documentation and diagrams when implementation changes the model.

### Verification

Use the lowest-cost checks that provide sufficient confidence, increasing depth for higher-risk changes. Consider:

- unit and component behavior;
- API or contract compatibility;
- integration with real boundaries or representative doubles;
- authorization, validation, and sensitive-data handling;
- migration, retry, timeout, and failure paths;
- build, lint, type, static analysis, and packaging checks;
- acceptance criteria and diagram/document consistency.

Report commands or checks run, their outcomes, and any checks that could not run. A failure is evidence to address or disclose, not a reason to claim success.

### Delivery and maintenance

Record the release or deployment path, configuration and migration requirements, observability signals, rollback or recovery strategy, and ownership of follow-up work. Keep operational guidance proportional to the system and change risk.

## Decision gates

Use these gates to decide whether to move forward:

1. **Problem gate:** outcome, users, scope, and non-goals are understood.
2. **Requirement gate:** the increment has verifiable behavior and known constraints.
3. **Design gate:** boundaries, data ownership, and material trade-offs are explicit.
4. **Implementation gate:** code changes map to the increment and preserve compatibility expectations.
5. **Verification gate:** acceptance criteria have evidence and remaining risks are named.
6. **Delivery gate:** release, recovery, and maintenance implications are understood.

Do not treat gates as a waterfall sequence. A later discovery can send an increment back to an earlier gate; update the affected artifacts and explain the change.

## Requirement-change checklist

When a requirement changes, inspect and update as applicable:

- requirement IDs, use cases, backlog items, and acceptance criteria;
- actors, permissions, data ownership, and external contracts;
- activity, sequence, state, class/domain, component, and deployment diagrams;
- architecture decisions and migration or compatibility notes;
- implementation, fixtures, tests, and release/rollback steps.

If an artifact is intentionally not changed, explain why it remains valid.
