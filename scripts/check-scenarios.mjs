#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const file = path.join(root, 'tests/behavioral-scenarios.md')
const text = fs.readFileSync(file, 'utf8')
const scenarios = [...text.matchAll(/^## (SCN-\d{3}): .+$/gm)].map((match) => match[1])
const errors = []

if (scenarios.length < 16) errors.push(`expected at least 16 scenarios, found ${scenarios.length}`)
if (new Set(scenarios).size !== scenarios.length) errors.push('scenario IDs must be unique')
for (const id of scenarios) {
  const start = text.indexOf(`## ${id}:`)
  const next = text.indexOf('\n## SCN-', start + 1)
  const section = text.slice(start, next === -1 ? text.length : next)
  for (const heading of ['Expected behavior:', 'Acceptance:']) {
    if (!section.includes(heading)) errors.push(`${id} is missing ${heading}`)
  }
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL: ${error}`).join('\n'))
  process.exit(1)
}

console.log(`PASS: behavioral scenario catalog is complete (${scenarios.length} scenarios)`)
