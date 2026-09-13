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
