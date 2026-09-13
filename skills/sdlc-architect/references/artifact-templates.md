# Artifact Templates

Use the smallest applicable template and adapt it to the repository's existing conventions. These are starting shapes, not mandatory filenames or folder locations.

## Increment brief

```markdown
# <Increment name>

## Outcome
<User or system value>

## Scope
- In scope: <behavior and artifacts>
- Out of scope: <explicit non-goals>

## Context
- Actors: <users, operators, services>
- Constraints: <technical, business, regulatory, operational>
- Dependencies: <systems, decisions, prior work>

## Acceptance criteria
- [ ] <observable behavior>
- [ ] <failure or edge behavior>

## Assumptions and open decisions
- Assumption: <statement and impact>
- Decision needed: <question, impact, owner>

## Verification
<checks and evidence>
```

## Requirement or use case

```markdown
## REQ-<id>: <short name>

Actor or trigger: <who or what starts it>
Preconditions: <required state>
Main flow:
1. <step>
2. <step>

Alternate and failure flows:
- <condition>: <behavior>

Acceptance criteria:
- [ ] <observable result>

Data and permissions: <relevant constraints>
Related diagrams, decisions, code, and tests: <links or IDs>
```

## Architecture decision record

```markdown
# ADR-<id>: <decision>

Status: Proposed | Accepted | Superseded | Rejected
Context: <problem and constraints>
Decision: <chosen option>
Alternatives: <relevant options and why they were not chosen>
Consequences: <benefits, costs, risks, and reversal cost>
Related requirements and diagrams: <links or IDs>
```

## API or integration contract

```markdown
## <Method or event> <resource or name>

Purpose: <business behavior>
Authentication and authorization: <requirements>
Request or input: <schema, limits, and validation>
Success response or output: <schema and compatibility promise>
Failure responses: <status or error, cause, safe message, retry behavior>
Idempotency and consistency: <rules>
Timeouts, rate limits, and dependency behavior: <limits>
Examples: <real or clearly labeled placeholder>
```

## Data change

```markdown
Change: <schema, ownership, or data lifecycle change>
Owner and classification: <system, sensitivity, retention>
Migration order: <expand, migrate, contract or equivalent>
Backfill and dual-read/write behavior: <if applicable>
Compatibility: <old clients and running versions>
Backup and rollback: <recovery point, reversal, and limits>
Verification: <constraints, data quality, performance, and recovery checks>
```

## Test strategy

```markdown
Scope: <increment and requirement IDs>
Unit/component: <cases>
Integration/contract: <boundaries and compatibility>
End-to-end/manual: <user-visible flows>
Security/accessibility/responsive: <applicable checks>
Failure and recovery: <timeouts, retries, migrations, rollback>
Evidence: <commands, results, or links>
Known gaps: <limitations and follow-up>
```

## Release note

```markdown
Change: <user or operator impact>
Prerequisites: <config, secret, migration, dependency>
Rollout: <order, flag, or staged release>
Observe: <logs, metrics, traces, alerts, owner>
Rollback/recovery: <procedure and limits>
Compatibility and communication: <clients, docs, support>
```

## Traceability matrix

```markdown
| Requirement | Decision/design | Diagram or contract | Implementation | Verification | Operations | Status |
| --- | --- | --- | --- | --- | --- | --- |
| REQ-001 | ADR-001 | SEQ-001, API-001 | src/... | TEST-001 | OPS-001 | Active |
```

## Existing-project baseline

```markdown
Project classification: Greenfield | Documented existing | Undocumented existing | Unhealthy baseline
Repository shape and boundaries: <packages, services, entry points>
Commands: <build, test, lint, type, migration, deploy>
Pre-existing failures: <command, output, impact>
Existing conventions and artifacts: <docs, IDs, ADRs, diagrams>
Environment limitations: <missing tools, services, or credentials>
Ownership and integrations: <teams, services, data stores>
```

## Final handoff report

```markdown
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

## Project state

```markdown
# SDLC Project State

State version: 1
Updated: <ISO date and timezone>
Mode: Plan | Build | Audit
Phase: <current phase>
Project classification: <classification>
Iteration: <identifier>
Active outcome: <one outcome>

## Baseline
- Repository and stack: <facts>
- Entry points and commands: <facts>
- Pre-existing failures: <facts or none>

## Active traceability
- Requirements: <REQ IDs>
- Decisions: <ADR IDs>
- Diagrams/contracts: <IDs>
- Tests: <TEST IDs>
- Operations: <OPS IDs>

## Open decisions and risks
| ID | Decision or risk | Impact | Owner | Status |
| --- | --- | --- | --- | --- |

## Last verification
- Checks: <commands or manual checks>
- Evidence grade: <Verified | Inferred | Assumed | Unknown>
- Result: <outcome and gap>

## Next action
<smallest useful action and its mode>
```

## Iteration backlog item

```markdown
## <REQ or increment ID>: <short name>

Status: Candidate | Ready | In Progress | Blocked | Verification | Done | Superseded | Rejected
Outcome: <user or system value>
Dependencies: <IDs or none>
Risk: Low | Medium | High
Scope: <in and out>
Acceptance criteria: <observable outcomes>
Verification: <test level and evidence>
Blocker or next action: <owner and action, if applicable>
```

## Evidence record

```markdown
Evidence grade: Verified | Inferred | Assumed | Unknown
Statement: <fact, decision, or claim>
Basis: <command, file, test, runtime observation, source, or missing information>
Impact: <what changes if this is wrong>
Next check: <how to promote confidence, or why no check is needed>
```

## Migration and rollback record

```markdown
Change: <data, contract, or deployment change>
Risk: <classification and reason>
Expand: <compatible schema or contract step>
Migrate/backfill: <order, idempotency, limits>
Verify: <data, compatibility, and recovery checks>
Switch: <reader, writer, traffic, or feature flag change>
Contract: <old behavior removal and timing>
Rollback trigger: <observable condition>
Rollback or forward recovery: <procedure and irreversible limits>
Owner and evidence: <person/team, rehearsal, backup/restore, or accepted limitation>
```
