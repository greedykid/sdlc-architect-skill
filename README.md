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

## Installation

You can quickly install this skill into any repository or agent workspace using `npx`:

```bash
# Install sdlc-architect to ./skills/sdlc-architect
npx sdlc-architect

# Or install sdlc-architect along with all bundled antislop concern skills
npx sdlc-architect --all

# Or specify a custom target directory (e.g. for Codex, Claude Code, or Cursor)
npx sdlc-architect install .agents/skills --all
npx sdlc-architect install .claude/skills

# Also copy artifact templates (templates/project-state.md)
npx sdlc-architect --templates

# Overwrite existing destination files
npx sdlc-architect --force

# List available bundled skills
npx sdlc-architect list
```

### CLI Options

| Option | Alias | Description |
|---|---|---|
| `--dest <path>` | `-d` | Destination directory (default: `./skills`) |
| `--all` | `-a` | Install `sdlc-architect` and all bundled antislop concern skills |
| `--skill <name>` | `-s` | Install a specific skill (e.g. `antislop-ui`) |
| `--templates` | `-t` | Also copy artifact templates (`templates/project-state.md`) |
| `--force` | `-f` | Overwrite existing files if destination already exists |
| `list`, `--list` | | List bundled skills available to install |
| `--help` | `-h` | Show CLI help |
| `--version` | `-v` | Show CLI version |

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
- Reusable artifact templates and behavioral forward-test scenarios.
- Traceability IDs and matrix, phase transitions, risk levels, project baselines, test selection, ADR lifecycle, monorepo boundaries, and maintenance governance.
- Cross-session project state, backlog iteration, evidence grading, command discovery, migration rollback, and isolated forward-test evaluation.
- API and dependency lifecycle, lightweight threat modeling, prompt-injection boundaries, and project-state schema validation.
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
