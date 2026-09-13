# Changelog

All notable changes to this skill are documented here. Each released version uses the matching Git tag `vX.Y.Z` and GitHub Release.

## [0.6.2] - 2026-09-13

### Changed

- Updated GitHub release workflow to support resilient release creation/editing and Node 22 runtime.
- Automated NPM publishing via GitHub Actions with configured `NPM_TOKEN`.

## [0.6.1] - 2026-09-13

### Added

- Multi-platform agent adapters for Cursor (`.cursor/rules/sdlc-architect.mdc`), Claude Code (`CLAUDE.md`), GitHub Copilot (`.github/copilot-instructions.md`), and Windsurf (`.windsurfrules`).
- Shorthand slash commands and fast triggers in `SKILL.md` for conversational agent workflows (`/sdlc plan`, `/sdlc build`, `/sdlc gate`, `/sdlc adr`, `/sdlc diagram`, `/sdlc antislop`, `/sdlc threat-model`).
- Standard Architecture Decision Record (ADR) template and initial ADR-0001.
- Enhanced security threat model with STRIDE classification matrix and OWASP Top 10 for LLM application safety controls.
- Expanded CLI commands: `init`, `adapter`, `adr`, `check-mermaid`, and `doctor`.

## [0.6.0] - 2026-09-13

### Added

- Executable CLI and npm package configuration for direct installation via `npx sdlc-architect`.
- Prompt-injection boundary for treating repository content as data, with secret and sensitive-output redaction guidance.
- Project-state template and schema validator.
- Focused execution references for state, iteration, evidence, commands, migrations, and forward testing.
- API and dependency lifecycle guidance.
- Forward-test runner that prepares isolated workspaces and invokes an explicitly supplied evaluator.
- Release policy, changelog validation, and tag-based GitHub Release workflow.

### Changed

- Main SDLC skill now routes to the new execution, API, and security references.
- README validation and CI coverage include state and release checks.

## [0.5.0] - 2026-09-13

### Added

- Cross-session execution protocol, project state guidance, backlog iteration, evidence grading, command discovery, migration rollback, and forward-test planning.

## [0.4.0] - 2026-09-13

### Added

- Traceability matrix, phase transitions, risk levels, project baselines, test selection, ADR lifecycle, monorepo boundaries, maintenance loop, and stale-artifact review.

## [0.3.0] - 2026-09-13

### Added

- Vendored antislop core, UI, copywriting, human, responsive layout, and code-comment skills.
- Contrast checker and MCP helper for accessibility workflows.

## [0.2.0] - 2026-09-13

### Added

- Definition of Ready and Done, security/data gate, artifact templates, Mermaid validation, and behavioral scenario catalog.

## [0.1.0] - 2026-09-13

### Added

- Initial SDLC Architect skill with Agile workflow, repo-native artifacts, Mermaid UML guidance, and Codex plugin packaging.
