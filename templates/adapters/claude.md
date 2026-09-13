# SDLC Architect Guidelines for Claude Code

When working in this repository, apply the **SDLC Architect** workflow:

## Core Principles

- **Iterative Agile Increments**: Break down tasks into bounded increments. Define problem → requirements → design/diagram → implementation → verification.
- **Traceability**: Keep requirements, architectural decisions (ADRs in `docs/adr/`), implementation, and tests traceable.
- **Grounded Mermaid**: Use valid Mermaid UML diagrams (flowchart, sequence, class, component) to clarify real flows or domain boundaries.
- **Anti-Slop Gates**:
  - UI/Styles: Grounded visual hierarchy, accessible contrast (WCAG AA), responsive mobile-first behavior.
  - Code Comments: Explain *why*, never narrate *what* the code visibly does.
  - Copywriting: Clear, human, direct communication without generic AI prose.
- **Security & Data**: Apply threat modeling on authentication, data mutations, external input, and sensitive credentials.

## Shorthand Triggers

Claude Code natively executes `/sdlc` via `.claude/commands/sdlc.md`. You can issue:

- `/sdlc plan <feature>`: Inspect and design increment without modifying source code.
- `/sdlc build <feature>`: Implement a Ready increment, write tests, verify against Done checklist.
- `/sdlc audit [target]`: Inspect code, architecture, or documentation. Produce prioritized findings.
- `/sdlc gate ready`: Audit scope and acceptance criteria against Definition of Ready before implementation.
- `/sdlc gate done`: Audit changes against Definition of Done, test coverage, documentation, and anti-slop rules.
- `/sdlc adr <title>`: Scaffold a new Architecture Decision Record in `docs/adr/`.
- `/sdlc diagram <type>`: Generate grounded Mermaid UML diagrams (`sequence`, `flowchart`, `component`, etc.).
- `/sdlc antislop [scope]`: Audit UI, copy, accessibility contrast, and code comments.
- `/sdlc threat-model`: Perform STRIDE and AI safety analysis for high-risk changes.

Read `skills/sdlc-architect/references/slash-commands.md` for the full automated execution protocol.
