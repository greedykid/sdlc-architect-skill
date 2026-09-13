# Execution Protocol Reference

Use this reference to continue SDLC work reliably across sessions and repositories. It defines lightweight state, backlog selection, evidence language, requirement interviews, command discovery, migration safety, and forward evaluation.

## Project state

Store the current state in the repository's existing project documentation location. If none exists, use `docs/sdlc/project-state.md`. Do not put secrets, tokens, customer data, or transient logs in the state file.

Update the state when the active increment, phase, risk, open decision, verification result, or next action changes. Do not rewrite it for every small code edit.

Minimum state shape:

```markdown
# SDLC Project State

State version: 1
Updated: <ISO date and timezone>
Mode: Plan | Build | Audit
Phase: Discovery | Requirements | Architecture | Technical design | Implementation | Verification | Delivery | Maintenance
Project classification: Greenfield | Documented existing | Undocumented existing | Unhealthy baseline
Iteration: <iteration or increment identifier>
Active outcome: <one user or system outcome>

## Baseline
- Repository and stack: <facts>
- Entry points and commands: <facts>
- Pre-existing failures: <facts or none found>

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
- Evidence grade: Verified | Inferred | Assumed | Unknown
- Result: <outcome and remaining gap>

## Next action
<smallest useful action and its mode>
```

The state file is a navigation aid, not the source of truth for implementation. Link to the requirement, ADR, test, or runbook that contains the durable detail.

## Backlog and iteration protocol

Use an existing issue tracker or backlog format when present. Otherwise keep a small repo-native backlog with these statuses:

`Candidate` → `Ready` → `In Progress` → `Verification` → `Done`

An item may also be `Blocked`, `Superseded`, or `Rejected`. A blocked item must name the blocking decision, owner, and next unblock action.

Select the next item in this order:

1. unblock a dependency that prevents a committed outcome;
2. address a high-risk decision before adding dependent implementation;
3. complete an in-progress item before starting unrelated work;
4. choose the smallest Ready item that delivers user or operational value;
5. prefer work that reduces uncertainty when two items have similar value.

Do not use priority labels alone as a reason to start work. Check dependency, risk, readiness, and available verification evidence.

Keep one primary increment in Build mode. Split an item when it crosses independent outcomes, boundaries, migration steps, or verification strategies. Link split items to the original requirement rather than copying it without status.

At iteration close, update the state file, traceability matrix, completed item evidence, carried risks, and the next candidate. A partially completed item stays `In Progress` or `Blocked`, never `Done`.

## Evidence grading

Use one of these labels for important facts and decisions:

| Grade | Meaning | Acceptable basis |
| --- | --- | --- |
| `Verified` | Directly checked | Code, test output, command result, rendered diagram, runtime observation, or named source |
| `Inferred` | Strong conclusion from available evidence | Multiple code paths, conventions, or artifacts agree, but no direct check exists |
| `Assumed` | Temporary premise used to continue | User has not confirmed it and its impact is recorded |
| `Unknown` | Information is unavailable | No reliable basis exists yet |

Use the grade in context snapshots, audits, risk records, and handoff reports when it changes how much confidence a reader should have. “Probably works” is not `Verified`. Promote an item only after new evidence is collected.

## Requirement interview protocol

Ask only questions that change scope, risk, architecture, acceptance criteria, or verification. Follow this order:

1. **Outcome and actor:** who needs what result, and what triggers it?
2. **Behavior:** what is the normal flow, alternate flow, and important failure behavior?
3. **Data and authority:** what data is created or changed, who may access it, and who owns it?
4. **Constraints:** what must remain compatible, fast, available, private, accessible, or reversible?
5. **Evidence:** how will success be observed, tested, or measured?

Stop asking when the increment passes Definition of Ready. If several independent low-risk gaps remain, ask one compact batch. If a single high-risk decision blocks progress, ask that one decision first. Never ask a long questionnaire when repository evidence can answer the question.

## Command adapter

Discover commands from repository evidence in this order:

1. project documentation and contribution guides;
2. CI workflows and task runners;
3. package manifests and scripts (`package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, `Makefile`, and equivalents);
4. container, compose, migration, and deployment configuration;
5. framework defaults only when no project command exists.

Record the exact command, purpose, scope, and whether it was run. Prefer the project's declared package manager and tool versions. If multiple commands are plausible, use the documented or CI command and name the ambiguity.

Before running a command, classify it as read-only, local build/test, local state-changing, or external/production. Ask before destructive migrations, production deployment, sending external messages, or commands that may overwrite user data. A failed command becomes baseline evidence with its output and suspected cause. Do not replace it with a guessed command and claim verification.

## Migration and rollback playbook

For persisted data, public contracts, or independently deployed services, prefer:

```text
expand compatible schema or contract
  → migrate or backfill safely
  → verify data and compatibility
  → switch readers/writers or traffic
  → observe and stabilize
  → contract old field or behavior
```

For each step, record owner, order, idempotency, duration or limit, backup/recovery point, rollback trigger, and verification. Use dual-read or dual-write only when its consistency and cleanup behavior are understood.

Rollback is not always “run the old deploy.” Check whether data, events, external side effects, caches, or irreversible migrations can be reversed. If rollback is impossible, define forward recovery, feature disablement, replay, or manual repair and state the limit before implementation.

High-risk migrations require a rehearsal, representative backup/restore check, or an explicit limitation accepted by the owner. Never call a migration safe only because the forward SQL or code compiles.

## Forward-test evaluation

Use `tests/behavioral-scenarios.md` as the scenario catalog. Run evaluations in an isolated temporary project with the skill package available and no access to a live production system.

For each scenario:

1. give the evaluator the scenario prompt, skill package, and only the minimum raw project artifacts;
2. do not include the expected behavior or suspected failure in the evaluator prompt;
3. capture the response, changed files, generated artifacts, commands, and evidence grades;
4. compare behavior against the scenario acceptance, not exact wording;
5. record pass, fail, or inconclusive with a concrete reason;
6. change the skill only for a demonstrated failure or ambiguity.

The shell checks in this repository validate scenario coverage and packaging. They do not simulate an LLM. An actual behavioral run requires an evaluator agent or supported harness and must be reported separately from static checks.
