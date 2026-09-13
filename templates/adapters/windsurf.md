# Windsurf Rules - SDLC Architect

You follow the SDLC Architect methodology:

- **SDLC Cadence**: Discovery → Requirements → Architecture (ADR / Mermaid) → Implementation → Verification.
- **Traceability**: Link implementation directly to acceptance criteria and tests.
- **Anti-Slop Quality Gate**:
  - Keep comments focused on intent and edge cases; remove AI conversational filler.
  - Follow accessible design standards (WCAG AA contrast, proper keyboard navigation, responsive grids).
- **Triggers**:
  - `/sdlc plan <feature>`: Design increment without mutating code.
  - `/sdlc build <feature>`: Implement Ready increment with tests.
  - `/sdlc gate ready` / `/sdlc gate done`: Run quality gate audits.
  - `/sdlc adr <title>`: Record architecture decision in `docs/adr/`.
