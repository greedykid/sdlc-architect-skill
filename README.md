<p align="center">
  <img src="./assets/sdlc-architect-wordmark.svg" alt="SDLC Architect" width="720" />
</p>

<p align="center">
  <strong>Iterative software delivery with grounded UML and anti-slop quality gates.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/sdlc-architect"><img src="https://img.shields.io/npm/v/sdlc-architect.svg" alt="npm version" /></a>
  <a href="https://github.com/greedykid/sdlc-architect-skill/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT" /></a>
</p>

<h1 align="center">SDLC Architect</h1>

An agent skill for developing applications through an iterative SDLC workflow with repo-native documentation, Mermaid UML diagrams, and anti-slop quality gates.

## Repository layout

```text
skills/sdlc-architect/
├── SKILL.md
├── agents/openai.yaml
└── references/
    ├── antislop-integration.md
    ├── artifact-templates.md
    ├── api-dependency-lifecycle.md
    ├── commands.md
    ├── evidence.md
    ├── execution-protocol.md
    ├── forward-testing.md
    ├── iteration.md
    ├── migration.md
    ├── quality-gates.md
    ├── project-governance.md
    ├── project-state.md
    ├── security-threat-model.md
    ├── sdlc-workflow.md
    └── uml-mermaid.md
```

The root plugin manifests make the skill discoverable as a Codex plugin. The antislop bundle is available beside it under `skills/antislop*`. `skills/antislop-human/` also includes the contrast checker and its MCP launcher. The SDLC skill can also be copied from `skills/sdlc-architect/` into an Agent Skills-compatible skills directory.

## Installation & Quickstart

You can quickly initialize or install this skill into any repository or agent workspace using `npx`:

```bash
# 1. Full interactive/automated setup (skills + Cursor adapter + state + ADRs)
npx sdlc-architect init --all --platform cursor --state --adr

# 2. Or install sdlc-architect skills only (default to ./skills)
npx sdlc-architect
npx sdlc-architect --all

# 3. Generate platform-specific rules for your AI coding assistant
npx sdlc-architect adapter cursor    # creates .cursor/rules/sdlc-architect.mdc
npx sdlc-architect adapter claude    # creates CLAUDE.md
npx sdlc-architect adapter copilot   # creates .github/copilot-instructions.md
npx sdlc-architect adapter windsurf  # creates .windsurfrules
npx sdlc-architect adapter github    # creates .github/pull_request_template.md and issue templates
npx sdlc-architect adapter all       # generates all adapters

# 4. Scaffold a new Architecture Decision Record (ADR)
npx sdlc-architect adr "use-redis-for-session-caching"

# 5. Validate Mermaid diagrams in your Markdown docs (prevent broken diagrams in CI)
npx sdlc-architect check-mermaid ./docs

# 6. Run repository health check or quality gate audit
npx sdlc-architect doctor
npx sdlc-architect gate ready   # audit Definition of Ready before building
npx sdlc-architect gate done    # audit Definition of Done and test suite

# 7. Update installed skills to the latest package version
npx sdlc-architect update
npx sdlc-architect update --adapters   # also refresh agent rules
```

### CLI Reference

| Command / Option | Alias | Description |
|---|---|---|
| `install [dir]` | | Install skill(s) to destination directory (default: `./skills`) |
| `update, upgrade [dir]` | | Update installed skill(s) to latest package version |
| `init [options]` | | Full initialization: copies skills, configures agent rules, state, and ADRs |
| `adapter <platform>` | | Generate agent adapter (`cursor`, `claude`, `copilot`, `windsurf`, `github`, `all`) |
| `adr <title>` | | Scaffold a numbered ADR in `docs/adr/000X-<slug>.md` |
| `gate [ready\|done]` | | Quality Gate: audit Definition of Ready or Definition of Done |
| `check-mermaid [path]` | | Validate Mermaid diagram syntax and fences in Markdown files |
| `doctor`, `check` | | Health check: validates skills, project state, ADRs, and Mermaid diagrams |
| `list` | | List bundled skills and descriptions |
| `--dest <path>` | `-d` | Destination directory for skills |
| `--all` | `-a` | Install/update `sdlc-architect` and all bundled antislop concern skills |
| `--skill <name>` | `-s` | Install or update a specific skill (e.g. `antislop-ui`) |
| `--platform <name>` | `-p` | Specify agent platform adapter (`cursor`, `claude`, `copilot`, `windsurf`, `github`, `all`) |
| `--adapters` | | Also update agent platform adapters during `update` |
| `--state` | | Generate initial `docs/project-state.md` |
| `--adr` | | Initialize `docs/adr/` with `0001-record-architecture-decisions.md` |
| `--github` | | Initialize `.github/` with pull request and issue templates |
| `--templates` | `-t` | Also copy artifact templates |
| `--force` | `-f` | Overwrite existing files if destination already exists |

## Automated Shorthand Slash Commands

Shorthand slash commands automatically trigger and route to the corresponding SDLC phase across AI coding assistants:
- **Claude Code**: Natively registered via `.claude/commands/sdlc.md` (supports auto-complete and argument passing).
- **Cursor**: Intercepted via `.cursor/rules/sdlc-architect.mdc` using high-priority regex pattern matching.
- **Codex / Antigravity / Gemini CLI**: Automatically activated via semantic skill trigger matching in `SKILL.md` frontmatter.
- **GitHub Copilot & Windsurf**: Guided by `.github/copilot-instructions.md` and `.windsurfrules`.

| Command | Phase / Mode | What the Agent Does |
|---|---|---|
| `/sdlc plan <feature>` | Discovery → Technical Design | Inspects repo, specifies requirements, designs architecture & grounded Mermaid diagrams without modifying code. |
| `/sdlc build <feature>` | Implementation → Verification | Checks Definition of Ready, implements increment, adds tests, verifies against Done checklist. |
| `/sdlc audit [target]` | Audit / Governance | Inspects existing code, architecture, or documentation. Produces prioritized findings with evidence. |
| `/sdlc gate ready` | Quality Gate | Audits pending task/backlog item against the **Definition of Ready** checklist. |
| `/sdlc gate done` | Quality Gate | Audits changes against the **Definition of Done** checklist, tests, and anti-slop rules. |
| `/sdlc adr <title>` | Architecture | Scaffolds a new Architecture Decision Record in `docs/adr/`. |
| `/sdlc diagram <type>` | UML / Mermaid | Generates a grounded Mermaid diagram (`use-case`, `activity`, `sequence`, `domain`, `component`, `deployment`). |
| `/sdlc antislop [scope]` | Anti-slop Gate | Audits UI, copy, accessibility contrast, responsive layouts, or code comments. |
| `/sdlc threat-model` | Security Gate | Performs STRIDE and AI/LLM safety threat analysis for high-risk changes. |

## Antislop reference

The bundled antislop core and concern skills take their structure and anti-slop principles from the upstream [miqdadbadjuber/anti-slop](https://github.com/miqdadbadjuber/anti-slop) repository.

This package vendors the core, UI, copywriting, human, responsive layout, and code-comment skills so the SDLC workflow remains reproducible. Check the upstream repository for the latest antislop rules and releases.

## What it covers

- Agile SDLC from discovery through delivery and maintenance.
- Traceability between requirements, design decisions, implementation, and tests.
- Use case, activity, sequence, class/domain, component, and deployment diagrams in Mermaid.
- Anti-slop routing for UI, copy, accessibility, responsive layout, visual assets, and code comments.
- Vendored antislop core plus UI, copywriting, human, mobile, and code-comment concern skills.
- Definition of Ready and Done, security/data review, change impact analysis, and operational delivery gates.
- Increment sizing standards (S/M/L/XL) and automatic task-splitting protocol to prevent scope creep.
- Architecture drift detection and layer boundary validation against accepted ADRs.
- Zero-downtime database migration playbooks (Expand-Contract) and rollback decision matrix.
- Production Readiness Review (PRR) & Observability blueprint covering the Four Golden Signals, `/healthz`, `/readyz`, and structured logging.
- GitHub Pull Request and Issue templates for end-to-end requirement-to-PR traceability.
- Reusable artifact templates and behavioral forward-test scenarios.
- Traceability IDs and matrix, phase transitions, risk levels, project baselines, test selection, ADR lifecycle, monorepo boundaries, and maintenance governance.
- Cross-session project state, backlog iteration, evidence grading, command discovery, migration rollback, and isolated forward-test evaluation.
- API and dependency lifecycle, STRIDE threat modeling, prompt-injection boundaries, and project-state schema validation.
- Versioned releases with [CHANGELOG.md](CHANGELOG.md) and the [release process](RELEASING.md).

## Validation

Run the repository guardrail check:

```bash
node scripts/check-repo.mjs
node scripts/check-mermaid.mjs
node scripts/check-scenarios.mjs
node scripts/check-governance.mjs
node scripts/check-forward-tests.mjs
node scripts/check-project-state.mjs templates/project-state.md
node scripts/check-release.mjs
```

The skill itself can also be validated with the Codex skill validator:

```bash
python3 /path/to/skill-creator/scripts/quick_validate.py skills/sdlc-architect
```
