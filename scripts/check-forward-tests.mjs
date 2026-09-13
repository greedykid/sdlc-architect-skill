#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const catalog = fs.readFileSync(path.join(root, 'tests/behavioral-scenarios.md'), 'utf8')
const plan = fs.readFileSync(path.join(root, 'tests/forward-test-plan.md'), 'utf8')
const ids = [...catalog.matchAll(/^## (SCN-\d{3}):/gm)].map((match) => match[1])
const errors = []

for (const id of ids) {
  if (!plan.includes(id)) errors.push(`forward-test plan does not cover ${id}`)
}
for (const required of ['isolated temporary workspace', 'expected behavior', 'PASS | FAIL | INCONCLUSIVE', 'minimal skill correction']) {
  if (!plan.toLowerCase().includes(required.toLowerCase())) errors.push(`forward-test plan is missing: ${required}`)
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL: ${error}`).join('\n'))
  process.exit(1)
}

console.log(`PASS: forward-test plan covers ${ids.length} behavioral scenarios`)
