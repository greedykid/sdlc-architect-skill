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

- `/sdlc plan <feature>`: Inspect and design increment without modifying source code.
- `/sdlc build <feature>`: Implement a Ready increment, write tests, verify against Done checklist.
- `/sdlc gate ready`: Audit scope and acceptance criteria before implementation.
- `/sdlc gate done`: Audit changes against test coverage, documentation, and anti-slop rules.
- `/sdlc adr <title>`: Scaffold a new Architecture Decision Record in `docs/adr/`.
- `/sdlc antislop`: Audit UI, copy, accessibility, and code comments.
