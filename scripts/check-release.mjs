#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(fs.readFileSync(path.join(root, '.codex-plugin/plugin.json'), 'utf8'))
const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8')
const tag = process.argv[2]
const version = manifest.version
const semver = /^\d+\.\d+\.\d+$/
const expectedHeading = `## [${version}] - `
const errors = []

if (!semver.test(version)) errors.push(`manifest version is not semantic versioning: ${version}`)
if (!changelog.includes(expectedHeading)) errors.push(`CHANGELOG.md has no section beginning with ${expectedHeading}`)
if (tag && tag !== `v${version}`) errors.push(`tag ${tag} does not match manifest version v${version}`)

if (errors.length) {
  console.error(errors.map((error) => `FAIL: ${error}`).join('\n'))
  process.exit(1)
}

console.log(`PASS: version ${version} has a matching changelog entry${tag ? ` and tag ${tag}` : ''}`)
