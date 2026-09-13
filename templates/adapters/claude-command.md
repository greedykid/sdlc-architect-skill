---
description: Execute SDLC Architect lifecycle workflow, UML diagrams, quality gates, and anti-slop audits
argument_hint: "<plan|build|audit|gate|adr|diagram|antislop|threat-model> [parameters]"
---

# SDLC Architect Slash Command Router

You are executing the **SDLC Architect** workflow for the user input:

**Command Arguments**: `$ARGUMENTS`

## Operating Protocol

1. **Parse Subcommand**:
   Determine the target action from `$ARGUMENTS`:
   - `plan <feature>`: Explore context, specify requirements, design architecture with grounded Mermaid diagrams, and produce Ready tasks without modifying application source code.
   - `build <feature>`: Verify Definition of Ready, implement the increment, run test suite, and check Definition of Done.
   - `audit [target]`: Inspect architecture, test coverage, and code quality. Produce prioritized findings with concrete evidence.
   - `gate ready`: Audit pending increment against the 10-point Definition of Ready checklist.
   - `gate done`: Audit branch/changes against the 10-point Definition of Done and anti-slop rules.
   - `adr <title>`: Scaffold numbered Architecture Decision Record in `docs/adr/000X-<slug>.md`.
   - `diagram <type>`: Generate syntactically valid, grounded Mermaid diagram (`sequence`, `flowchart`, `component`, `class`, `state`).
   - `antislop [scope]`: Audit UI, copy, comments, and accessibility contrast against anti-slop rules.
   - `threat-model`: Perform STRIDE and OWASP Top 10 for LLM security threat modeling.
   - *(no argument)*: Read `docs/project-state.md` and report current SDLC status, active increment, and next steps.

2. **Context Snapshot**:
   - Read `docs/project-state.md` if available.
   - Emit standard snapshot: Mode, Phase, Increment, Scope, Non-goals, Assumptions, Risks, Acceptance Criteria.

3. **Execution & Quality Gates**:
   - Follow detailed rules in `skills/sdlc-architect/references/slash-commands.md` and `skills/sdlc-architect/references/quality-gates.md`.
   - Ground all diagrams in real code entities; ensure Mermaid syntax is valid.
   - Apply anti-slop filters to any user-facing UI, copywriting, and code comments.

4. **Completion & State Sync**:
   - Update `docs/project-state.md` if present.
   - Provide summary of changed files, test/verification output, and next increment.
