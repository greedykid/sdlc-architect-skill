#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const relative = process.argv[2] ?? 'templates/project-state.md'
const file = path.resolve(root, relative)
const template = path.resolve(root, 'templates/project-state.md')
const text = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
const errors = []
const required = ['# SDLC Project State', '## Baseline', '## Active traceability', '## Open decisions and risks', '## Last verification', '## Next action']

if (!text) errors.push(`state file does not exist: ${relative}`)
for (const section of required) if (text && !text.includes(section)) errors.push(`${relative} is missing ${section}`)

if (text && file !== template) {
  const fields = {
    'State version': /^State version:\s*(\d+)\s*$/m,
    Updated: /^Updated:\s*\S+\s*$/m,
    Mode: /^Mode:\s*(Plan|Build|Audit)\s*$/m,
    Phase: /^Phase:\s*(Discovery|Requirements|Architecture|Technical design|Implementation|Verification|Delivery|Maintenance)\s*$/m,
    'Project classification': /^Project classification:\s*(Greenfield|Documented existing|Undocumented existing|Unhealthy baseline)\s*$/m,
    Iteration: /^Iteration:\s*\S.+$/m,
    'Active outcome': /^Active outcome:\s*\S.+$/m,
  }
  for (const [name, pattern] of Object.entries(fields)) if (!pattern.test(text)) errors.push(`${relative} has an invalid or missing ${name}`)
  if (!/^\s*- Evidence grade:\s*(Verified|Inferred|Assumed|Unknown)\s*$/m.test(text)) errors.push(`${relative} has an invalid or missing Evidence grade`)
  const next = text.split('## Next action')[1]?.trim() ?? ''
  if (!next || /^<.*>$/.test(next)) errors.push(`${relative} must contain a concrete Next action`)
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL: ${error}`).join('\n'))
  process.exit(1)
}

console.log(`PASS: project state schema is valid (${relative})`)
