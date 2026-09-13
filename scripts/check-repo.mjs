#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const requiredFiles = [
  'antislop.md',
  'plugin.json',
  '.codex-plugin/plugin.json',
  '.agents/plugins/marketplace.json',
  'skills/antislop/SKILL.md',
  'skills/antislop-ui/SKILL.md',
  'skills/antislop-copywriting/SKILL.md',
  'skills/antislop-human/SKILL.md',
  'skills/antislop-human/contrast-check.py',
  'skills/antislop-human/contrast-mcp.py',
  'skills/antislop-layoutmobile/SKILL.md',
  'skills/antislop-code/SKILL.md',
  'skills/sdlc-architect/SKILL.md',
  'skills/sdlc-architect/agents/openai.yaml',
  'skills/sdlc-architect/references/antislop-integration.md',
  'skills/sdlc-architect/references/artifact-templates.md',
  'skills/sdlc-architect/references/quality-gates.md',
  'skills/sdlc-architect/references/project-governance.md',
  'skills/sdlc-architect/references/sdlc-workflow.md',
  'skills/sdlc-architect/references/uml-mermaid.md',
  'scripts/check-mermaid.mjs',
  'scripts/check-scenarios.mjs',
  'tests/behavioral-scenarios.md',
  'tests/forward-test-plan.md',
  'scripts/check-governance.mjs',
  'scripts/check-forward-tests.mjs',
]

const errors = []
const exists = (file) => fs.existsSync(path.join(root, file))
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const skillFiles = requiredFiles.filter((file) => file.startsWith('skills/') && file.endsWith('/SKILL.md'))

for (const file of requiredFiles) {
  if (!exists(file)) errors.push(`missing required file: ${file}`)
}

for (const file of ['plugin.json', '.codex-plugin/plugin.json', '.agents/plugins/marketplace.json']) {
  if (!exists(file)) continue
  try {
    JSON.parse(read(file))
  } catch (error) {
    errors.push(`${file} is not valid JSON: ${error.message}`)
  }
}

for (const skillFile of skillFiles) {
  if (!exists(skillFile)) continue
  const skill = read(skillFile)
  const frontmatter = skill.split('---')[1] ?? ''
  if (!/^name:\s*\S+/m.test(frontmatter)) errors.push(`${skillFile} has no name in frontmatter`)
  if (!/^description:\s*\S+/m.test(frontmatter)) errors.push(`${skillFile} has no description in frontmatter`)
  if (/\[TODO:|\[PLACEHOLDER\]/.test(skill)) errors.push(`${skillFile} contains an unfinished scaffold placeholder`)
}

if (exists('antislop.md') && exists('skills/antislop/SKILL.md') && read('antislop.md') !== read('skills/antislop/SKILL.md')) {
  errors.push('antislop.md and skills/antislop/SKILL.md are out of sync')
}

if (exists('skills/sdlc-architect/SKILL.md')) {
  const skill = read('skills/sdlc-architect/SKILL.md')
  for (const reference of skill.matchAll(/references\/([\w-]+\.md)/g)) {
    const file = `skills/sdlc-architect/references/${reference[1]}`
    if (!exists(file)) errors.push(`SKILL.md references missing file: ${file}`)
  }
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL: ${error}`).join('\n'))
  process.exit(1)
}

console.log('PASS: plugin manifests, skill frontmatter, references, and repository layout are valid')
