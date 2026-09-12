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
