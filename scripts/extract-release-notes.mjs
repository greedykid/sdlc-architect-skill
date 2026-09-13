#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8')
const requested = process.argv[2] ?? ''
const version = requested.replace(/^v/, '')
const heading = `## [${version}]`
const start = changelog.indexOf(heading)
const next = changelog.indexOf('\n## [', start + heading.length)

if (start === -1) {
  console.error(`No changelog section found for ${version}`)
  process.exit(1)
}

const section = changelog.slice(start, next === -1 ? changelog.length : next)
process.stdout.write(section.slice(section.indexOf('\n') + 1).trim() + '\n')
