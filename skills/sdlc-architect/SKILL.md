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
- Start each task with a concise context snapshot: repository state, stack and entry points, current SDLC phase, scope, assumptions, risks, acceptance criteria, and affected artifacts.
- Use the Definition of Ready before implementation and the Definition of Done before delivery. Read [references/quality-gates.md](references/quality-gates.md) for the checklists and impact analysis protocol.
- Use [references/artifact-templates.md](references/artifact-templates.md) when a new brief, requirement, ADR, contract, data change, test plan, or release note is needed. Adapt templates to existing project conventions.
- Maintain traceability from requirement to decision, diagram, implementation, test, and operational evidence. Read [references/project-governance.md](references/project-governance.md) for ID conventions, phase transitions, risk levels, project baselines, test selection, ADR lifecycle, and maintenance rules.

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

Use the phase entry and exit criteria in `references/project-governance.md`. A phase may be revisited when evidence changes; never advance only because a document was produced.

## Work modes

Choose one mode from the request and state it in the context snapshot:

- **Plan:** inspect and design the increment, produce or update artifacts, and do not change application code unless the user explicitly asks for implementation.
- **Build:** implement one Ready increment, update tests and affected artifacts, then verify it against the Done checklist.
- **Audit:** inspect an existing implementation or artifact set, produce findings with severity and evidence, and change only findings the user authorizes.

Do not silently continue from Plan into Build. If the user asks to “build” without enough information for a Ready increment, identify the missing decision and ask before mutating the project.

## Artifact and diagram routing

Read [references/sdlc-workflow.md](references/sdlc-workflow.md) when planning a lifecycle, defining artifacts, establishing gates, or handling an existing project with incomplete requirements.

Read [references/uml-mermaid.md](references/uml-mermaid.md) when selecting, creating, reviewing, or updating UML/Mermaid diagrams. Use the smallest set of diagrams that makes the decision or behavior understandable; do not generate every diagram by default.

Read [references/antislop-integration.md](references/antislop-integration.md) before any UI, copy, responsive, accessibility, visual-asset, or code-comment work. It defines when to load the available antislop core and optional concern skills, how to handle missing design direction, and the delivery gate to report.

Read [references/quality-gates.md](references/quality-gates.md) for context snapshots, Definition of Ready, Definition of Done, security/data review, quality attributes, requirement-change impact analysis, and observability expectations.

Read [references/artifact-templates.md](references/artifact-templates.md) when creating a new SDLC artifact rather than extending an existing project template.

Read [references/project-governance.md](references/project-governance.md) when the work involves traceability, a phase transition, risk classification, an existing project baseline, test-level selection, architecture decisions, monorepo or multi-service boundaries, handoff, maintenance, or stale artifacts.

Prefer these artifact relationships:

- problem and goals → requirements/use cases → acceptance criteria;
- use cases and quality attributes → architecture decisions and boundaries;
- boundaries and flows → interfaces, data model, and implementation tasks;
- acceptance criteria → automated or manual verification evidence;
- deployment concerns → release, observability, rollback, and maintenance notes.

## Working with ambiguity and change

When a requirement is incomplete, state the exact missing decision and its impact. Ask a focused question if the impact is material. If work can safely continue, record the assumption next to the affected artifact and make it easy to revise.

When requirements change, identify affected requirements, diagrams, decisions, code, and tests before editing them. Update the smallest consistent set and call out stale or conflicting artifacts rather than silently leaving contradictions.

Use the impact analysis in `references/quality-gates.md` for any change affecting public interfaces, persisted data, permissions, security, deployment, or compatibility. A change is not Ready until its migration, rollback, regression, and communication implications are understood.

For requirement status changes, mark items as `Active`, `Superseded`, `Rejected`, or `Done` and update the traceability matrix. Do not delete a requirement, test, ADR, or diagram merely because it is no longer current; preserve the decision history and mark the artifact's current status.

## Language and terminology

- Use the user's language for conversation unless the project clearly uses another language.
- Follow the repository's existing language for committed artifacts and preserve established domain terms.
- Do not translate identifiers, API fields, table names, or domain terms casually. If a terminology change is needed, document the old and new terms and update all affected artifacts together.
- Use the same term for the same concept across requirements, code, tests, diagrams, and release notes.

## Completion standard

An increment is complete only when it passes the Definition of Done and has the final report shape defined in `references/project-governance.md`. That includes acceptance criteria, relevant tests or checks, diagram and artifact consistency, security/data review, observability and recovery implications, and visible remaining risks or follow-ups. Do not claim a phase is complete solely because a document or diagram was created.
