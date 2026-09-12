---
name: sdlc-architect
description: "Guide application development through iterative SDLC phases, UML diagrams, and anti-slop quality gates for grounded, usable interfaces."
---

# SDLC Architect

Use this skill when the user wants to plan, design, document, build, test, or evolve an application using a traceable SDLC workflow and UML/Mermaid diagrams. It applies to existing repositories and new applications, regardless of language, framework, database, or domain.

## Operating contract

- Treat the work as iterative Agile by default. Deliver a small coherent increment, validate it, and update the affected artifacts before expanding scope.
- Inspect the repository, existing documentation, build scripts, tests, and conventions before proposing new structure. Preserve working conventions unless the user asks to replace them.
- Keep requirement → design decision → implementation → test traceable. Use stable IDs when the project already has them; otherwise introduce concise IDs only when traceability would otherwise be unclear.
- Write artifacts in the repository's established documentation location. If none exists, propose a minimal location and naming scheme before creating a large documentation set.
- Ask before proceeding when an unresolved choice can materially affect architecture, security, privacy, data integrity, compatibility, cost, or deployment. For low-impact gaps, make a clearly labeled assumption and continue.
- Do not invent users, metrics, integrations, compliance claims, domain rules, or completed work. Mark unknowns, assumptions, and decisions distinctly.
- Mermaid diagrams must explain a real requirement, interaction, structure, or operational concern. Keep them consistent with the surrounding text and update them when the model changes.
- Only make code, configuration, or documentation changes that belong to the requested phase or increment. Confirm before broad refactors, destructive migrations, production actions, or changes outside the project.
- Apply the anti-slop gate whenever the increment touches a UI, user-facing copy, responsive layout, accessibility, visual asset, or code comments. The gate is a quality filter, not a substitute for product direction or functional testing.

## Phase routing

Identify the current phase from the user's request and repository state. Do not force the entire lifecycle when the user asks for a focused artifact.

1. **Discovery:** establish the problem, actors, goals, constraints, non-goals, and success signals.
2. **Requirements:** turn validated needs into use cases, acceptance criteria, backlog items, quality attributes, and open decisions.
3. **Architecture:** choose boundaries, responsibilities, data ownership, integrations, deployment shape, and important trade-offs.
4. **Technical design:** refine the selected increment into interfaces, data models, flows, failure behavior, and implementation tasks.
5. **Implementation:** change code/configuration in a bounded increment, preserving the agreed behavior and conventions.
6. **Verification:** run or add proportionate tests, review traceability, validate diagrams and documentation, and report remaining risk.
7. **Delivery and maintenance:** document release steps, observability, rollback or recovery expectations, and follow-up work.

For a new request, first report the discovered context, the proposed increment, assumptions, and the acceptance criteria. Then produce or update only the artifacts needed to move that increment forward. At the end, summarize changed files, verification evidence, unresolved risks, and the next smallest useful increment.

## Artifact and diagram routing

Read [references/sdlc-workflow.md](references/sdlc-workflow.md) when planning a lifecycle, defining artifacts, establishing gates, or handling an existing project with incomplete requirements.

Read [references/uml-mermaid.md](references/uml-mermaid.md) when selecting, creating, reviewing, or updating UML/Mermaid diagrams. Use the smallest set of diagrams that makes the decision or behavior understandable; do not generate every diagram by default.

Read [references/antislop-integration.md](references/antislop-integration.md) before any UI, copy, responsive, accessibility, visual-asset, or code-comment work. It defines when to load the available antislop core and optional concern skills, how to handle missing design direction, and the delivery gate to report.

Prefer these artifact relationships:

- problem and goals → requirements/use cases → acceptance criteria;
- use cases and quality attributes → architecture decisions and boundaries;
- boundaries and flows → interfaces, data model, and implementation tasks;
- acceptance criteria → automated or manual verification evidence;
- deployment concerns → release, observability, rollback, and maintenance notes.

## Working with ambiguity and change

When a requirement is incomplete, state the exact missing decision and its impact. Ask a focused question if the impact is material. If work can safely continue, record the assumption next to the affected artifact and make it easy to revise.

When requirements change, identify affected requirements, diagrams, decisions, code, and tests before editing them. Update the smallest consistent set and call out stale or conflicting artifacts rather than silently leaving contradictions.

## Completion standard

An increment is complete only when its acceptance criteria are addressed, relevant tests or checks have evidence, diagrams match the implemented or explicitly planned behavior, and known risks or follow-ups are visible. Do not claim a phase is complete solely because a document or diagram was created.
