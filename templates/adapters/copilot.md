# GitHub Copilot Instructions - SDLC Architect

Apply these engineering standards to all generated code and documentation:

- **Incremental Delivery**: Produce minimal, testable increments matching user acceptance criteria.
- **Traceability**: Reference existing requirements, issues, or ADRs when implementing architectural decisions.
- **Anti-Slop Quality**:
  - Do not add redundant comments explaining syntax or obvious logic.
  - Adhere to accessible UI patterns (contrast, focus states, responsive layouts).
  - Write concise, direct error messages and UI text.
- **Diagramming**: When requested to explain architecture or flows, use valid, grounded Mermaid syntax.
- **Gates**: Ensure code adheres to the Definition of Ready before building, and passes tests and linting before marking as Done.

## Automated Slash Commands

When prompts start with `/sdlc`, automatically execute the corresponding SDLC Architect workflow:
- `/sdlc plan <feature>`: Design increment without mutating code.
- `/sdlc build <feature>`: Implement Ready increment with tests.
- `/sdlc audit [target]`: Inspect code/architecture for anti-patterns and evidence.
- `/sdlc gate ready` / `/sdlc gate done`: Run quality gate audits.
- `/sdlc adr <title>`: Record architecture decisions in `docs/adr/`.
- `/sdlc diagram <type>`: Generate grounded Mermaid UML diagrams.
- `/sdlc antislop [scope]`: Run anti-slop audit on UI, copy, comments.
- `/sdlc threat-model`: Perform STRIDE and AI safety analysis.

Read `skills/sdlc-architect/references/slash-commands.md` for execution rules.
