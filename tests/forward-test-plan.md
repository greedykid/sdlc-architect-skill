# Forward-Test Execution Plan

This plan evaluates the behavior of `sdlc-architect` with an independent evaluator agent. It is separate from static repository checks because a shell script cannot simulate an LLM deciding which phase, question, artifact, or mutation is appropriate.

## Setup

1. Create an isolated temporary workspace for each scenario.
2. Provide the evaluator the packaged skill under `skills/sdlc-architect/`, the relevant references, and only the minimum project fixture needed by the scenario.
3. Do not provide the expected behavior, suspected failure, or previous evaluation result in the evaluator prompt.
4. Disable access to live production systems and external side effects. Use fixtures, local services, or dry-run commands.
5. Record the skill version, scenario ID, fixture hash or description, evaluator model, and date.

## Execution record

For each `SCN-*` scenario in [behavioral-scenarios.md](behavioral-scenarios.md), capture:

```markdown
Scenario: SCN-###
Skill version: <plugin version or commit>
Fixture: <isolated workspace description>
Evaluator: <agent/model and configuration>
Prompt: <exact prompt used>
Observed mode and phase: <what the evaluator selected>
Artifacts and mutations: <files created or changed>
Commands and evidence: <exact commands and outputs>
Result: PASS | FAIL | INCONCLUSIVE
Reason: <acceptance evidence or failure>
Follow-up: <minimal skill correction, if any>
```

## Review rules

- Evaluate decisions and evidence, not exact prose.
- A PASS requires the scenario acceptance and no hidden mutation outside scope.
- A FAIL must cite the observed behavior and the relevant skill rule or reference.
- INCONCLUSIVE means the fixture or environment prevented a reliable judgment. Do not turn it into a PASS.
- Change the skill only for a demonstrated failure, ambiguity, or missing routing rule. Re-run the affected scenario and a neighboring scenario after a fix.

## Coverage

The catalog covers these scenario IDs:

`SCN-001`, `SCN-002`, `SCN-003`, `SCN-004`, `SCN-005`, `SCN-006`, `SCN-007`, `SCN-008`, `SCN-009`, `SCN-010`, `SCN-011`, `SCN-012`, `SCN-013`, `SCN-014`, `SCN-015`, `SCN-016`.

Their subjects are new projects, incomplete requirements, persisted-data changes, UI direction, conflicts, audits, traceability, high-risk security, monorepos, stale artifacts, project state, backlog selection, evidence grading, interviewing, command discovery, and migration rollback.
