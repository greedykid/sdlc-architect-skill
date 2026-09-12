#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const scanRoot = path.join(root, 'skills')
const files = []
const errors = []
const declarations = /^(flowchart\b|graph\b|sequenceDiagram\b|classDiagram\b|stateDiagram(?:-v2)?\b|erDiagram\b|journey\b|gantt\b|pie\b|mindmap\b|timeline\b|gitGraph\b|C4(?:Context|Container|Component|Dynamic|Deployment)\b|quadrantChart\b|requirementDiagram\b|sankey-beta\b|block-beta\b|packet-beta\b|architecture-beta\b|xychart-beta\b)/

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name)
    if (entry.isDirectory()) walk(full)
    else if (entry.isFile() && full.endsWith('.md')) files.push(full)
  }
}

function checkFile(file) {
  const relative = path.relative(root, file)
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/)
  let inside = false
  let start = 0
  let body = []

  lines.forEach((line, index) => {
    const number = index + 1
    if (/^\s*```mermaid\s*$/.test(line)) {
      if (inside) errors.push(`${relative}:${number}: nested Mermaid fence`)
      inside = true
      start = number
      body = []
      return
    }

    if (inside && /^\s*```\s*$/.test(line)) {
      const first = body.find((item) => item.trim())?.trim() ?? ''
      if (!first) errors.push(`${relative}:${start}: Mermaid block is empty`)
      else if (!declarations.test(first)) errors.push(`${relative}:${start}: unknown Mermaid declaration: ${first}`)
      inside = false
      body = []
      return
    }

    if (inside) body.push(line)
  })

  if (inside) errors.push(`${relative}:${start}: Mermaid fence is not closed`)
}

if (fs.existsSync(scanRoot)) {
  walk(scanRoot)
  files.forEach(checkFile)
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL: ${error}`).join('\n'))
  process.exit(1)
}

console.log(`PASS: Mermaid fences are structurally valid (${files.length} Markdown files scanned)`)
