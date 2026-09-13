#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const file = path.join(root, 'skills/sdlc-architect/references/project-governance.md')
const text = fs.readFileSync(file, 'utf8')
const requiredSections = [
  '## Traceability model',
  '## Phase transition rules',
  '## Risk-based workflow',
  '## Existing-project baseline',
  '## Test-level selection',
  '## ADR lifecycle',
  '## Monorepo and multi-service boundaries',
  '## Final handoff report',
  '## Maintenance loop',
  '## Stale-artifact review',
]
const errors = requiredSections.filter((section) => !text.includes(section))

if (errors.length) {
  console.error(errors.map((error) => `FAIL: missing governance section: ${error}`).join('\n'))
  process.exit(1)
}

console.log(`PASS: governance reference covers ${requiredSections.length} operating areas`)
