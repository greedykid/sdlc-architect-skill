#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const requiredFiles = [
  'plugin.json',
  '.codex-plugin/plugin.json',
  '.agents/plugins/marketplace.json',
  'skills/sdlc-architect/SKILL.md',
  'skills/sdlc-architect/agents/openai.yaml',
  'skills/sdlc-architect/references/antislop-integration.md',
  'skills/sdlc-architect/references/sdlc-workflow.md',
  'skills/sdlc-architect/references/uml-mermaid.md',
]

const errors = []
const exists = (file) => fs.existsSync(path.join(root, file))
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')

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

if (exists('skills/sdlc-architect/SKILL.md')) {
  const skill = read('skills/sdlc-architect/SKILL.md')
  const frontmatter = skill.split('---')[1] ?? ''
  if (!/^name:\s*\S+/m.test(frontmatter)) errors.push('SKILL.md has no name in frontmatter')
  if (!/^description:\s*\S+/m.test(frontmatter)) errors.push('SKILL.md has no description in frontmatter')
  for (const reference of skill.matchAll(/references\/([\w-]+\.md)/g)) {
    const file = `skills/sdlc-architect/references/${reference[1]}`
    if (!exists(file)) errors.push(`SKILL.md references missing file: ${file}`)
  }
  if (/\[TODO:|\[PLACEHOLDER\]/.test(skill)) errors.push('SKILL.md contains an unfinished scaffold placeholder')
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL: ${error}`).join('\n'))
  process.exit(1)
}

console.log('PASS: plugin manifests, skill frontmatter, references, and repository layout are valid')
