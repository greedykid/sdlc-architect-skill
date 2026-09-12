# Quality Gates Reference

Use these gates to make SDLC work repeatable without turning Agile work into a rigid waterfall process. A later discovery may send an increment back to an earlier gate.

## Context snapshot

Start a task with a compact snapshot. Use the repository's format if one exists; otherwise use this shape:

```text
Mode: Plan | Build | Audit
Phase: Discovery | Requirements | Architecture | Technical design | Implementation | Verification | Delivery
Repository: <state, stack, entry points, relevant commands>
Increment: <one outcome and its user/system value>
In scope: <behaviors and artifacts included>
Out of scope: <explicit non-goals>
Actors and boundaries: <users, services, external systems, trust boundaries>
Assumptions: <only assumptions needed to proceed>
Risks and open decisions: <decision, impact, owner or question>
Acceptance criteria: <observable outcomes>
Affected artifacts: <requirements, diagrams, code, tests, operations>
Verification: <checks, test levels, and evidence expected>
```

Do not report a generic repository summary as a context snapshot. It must identify the current increment and what will change.

## Definition of Ready

An increment is Ready for implementation when all applicable items are true:

- the outcome, actor, trigger, scope, and non-goals are clear;
- normal, alternate, and important failure behavior is described;
- acceptance criteria are observable and testable;
- dependencies, external contracts, permissions, and data ownership are known or explicitly open;
- quality attributes have a target or an explicit reason they are not applicable;
- architecture and material trade-offs are recorded;
- data changes, migrations, compatibility, and rollback concerns are identified;
- affected diagrams and artifacts are named;
- the verification approach is feasible in the current environment;
- no unresolved decision materially threatens security, privacy, data integrity, compatibility, cost, or deployment safety.

If an item is not Ready, do not start implementation. Ask the smallest question that resolves the blocking decision or split the increment.

## Definition of Done

An increment is Done when all applicable items are evidenced:

- acceptance criteria pass for normal and important failure paths;
- code, configuration, tests, migrations, and documentation match the agreed design;
- public interfaces remain compatible or the breaking change is explicitly managed;
- security, privacy, authorization, sensitive data, and dependency concerns were reviewed;
- database changes have migration, backup, rollback, or recovery evidence appropriate to their risk;
- diagrams and requirement links reflect the implemented behavior;
- build, lint, type, static, unit, integration, or manual checks are recorded with results;
- observability, alerting, ownership, and operational recovery are addressed;
- user-facing UI passes applicable antislop and accessibility gates;
- unresolved risks, limitations, and follow-ups are visible;
- release notes or deployment instructions are updated when the increment changes delivery behavior.

Never mark an item Done because the happy path works while a known failure or recovery path is unaddressed.

## Security and data gate

Review the following before implementation for changes that touch identity, data, external input, or deployment:

| Concern | Minimum decision or evidence |
| --- | --- |
| Identity | Authentication mechanism, session/token lifetime, account recovery, and trust assumptions |
| Authorization | Resource ownership, role or policy checks, default deny behavior, and abuse cases |
| Input | Validation, normalization, size limits, injection risks, and error disclosure |
| Sensitive data | Classification, minimization, encryption in transit/at rest, masking, retention, deletion, and access logging |
| Secrets | Source, storage, rotation, redaction, and failure behavior when unavailable |
| External boundaries | Contract validation, timeouts, retries, idempotency, rate limits, and dependency failure behavior |
| Persistence | Ownership, constraints, transactions, migration order, backup, rollback, and recovery point expectations |
| Observability | Safe logs, correlation IDs, metrics, traces, alerts, and no secret or sensitive-data leakage |
| Supply chain | Dependency provenance, versions, licenses, update policy, and known vulnerability handling |

Treat “not applicable” as a decision with a reason, not as an empty field. Do not invent compliance certification or security claims.

## Quality attribute matrix

For each quality attribute that materially affects the increment, record:

```text
Attribute: <security | performance | availability | reliability | accessibility | maintainability | compatibility>
Target: <measurable target or bounded expectation>
Scope: <operation, endpoint, screen, or component>
Verification: <test, inspection, measurement, or review>
Failure response: <fallback, limit, alert, or user-visible behavior>
```

If no target can be set yet, record the missing decision, its impact, and who must resolve it before the affected increment becomes Ready.

## Requirement-change impact analysis

For a changed requirement, do this before editing implementation:

1. Identify the changed behavior and classify the change as additive, corrective, incompatible, data-affecting, security-affecting, or operational.
2. Trace affected requirement IDs, actors, permissions, API/event contracts, data models, migrations, diagrams, code paths, fixtures, tests, documentation, and deployment steps.
3. Check compatibility for existing clients, stored data, jobs, integrations, and rollback paths.
4. Update acceptance criteria and failure behavior before updating code.
5. Decide migration order, backfill strategy, feature flag or rollout strategy, backup/recovery needs, and communication requirements when applicable.
6. Run targeted regression checks and report artifacts intentionally left unchanged with a reason.

Use this compact record when the change is material:

```text
Change: <what changed and why>
Impact class: <classification>
Affected: <requirements, contracts, data, diagrams, code, tests, operations>
Compatibility: <preserved, versioned, migrated, or intentionally broken>
Migration and rollback: <order, recovery, and limits>
Verification: <targeted and regression checks>
Decision: <approved, blocked, or needs clarification>
```

## Observability and delivery gate

For a service, background job, integration, or data-affecting UI flow, define only the signals needed to operate the increment:

- structured log events and fields, with secrets and sensitive values excluded;
- metrics for success, failure, latency, saturation, queue depth, or business outcome when useful;
- correlation or request IDs across boundaries;
- traces for multi-service or slow operations when the project supports them;
- health or readiness signals where deployment depends on them;
- alert threshold, owner, and expected response for material failures;
- rollback, retry, replay, or manual recovery procedure;
- release notes describing configuration, migration, and monitoring changes.

The Delivery gate must state which signals were added or verified, who owns them, and what happens when they indicate failure. Do not add dashboards or alerts merely to fill a checklist.
