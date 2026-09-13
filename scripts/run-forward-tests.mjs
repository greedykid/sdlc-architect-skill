#!/usr/bin/env node
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const catalogPath = path.join(root, 'tests/behavioral-scenarios.md')
const catalog = fs.readFileSync(catalogPath, 'utf8')

function value(flag, fallback = undefined) {
  const index = process.argv.indexOf(flag)
  return index === -1 ? fallback : process.argv[index + 1]
}

if (process.argv.includes('--help')) {
  console.log('Usage: node scripts/run-forward-tests.mjs --evaluator <executable> [--scenario SCN-001|all] [--fixture <dir>] [--output <dir>] [--dry-run]')
  console.log('The evaluator receives --prompt-file, --workspace, --output-dir, and --skill-dir. It must not receive expected behavior.')
  process.exit(0)
}

const selected = value('--scenario', 'all')
const evaluator = value('--evaluator')
const fixture = value('--fixture')
const outputRoot = value('--output', path.join(root, 'artifacts/forward-tests'))
const dryRun = process.argv.includes('--dry-run')
const timeoutMs = Number(value('--timeout-ms', '120000'))

const sections = [...catalog.matchAll(/^## (SCN-\d{3}): (.+)$/gm)].map((match, index, all) => {
  const start = match.index
  const end = all[index + 1]?.index ?? catalog.length
  const section = catalog.slice(start, end)
  const prompt = section.match(/^Prompt shape: (.+)$/m)?.[1]
  return { id: match[1], title: match[2], prompt }
})
const scenarios = selected === 'all' ? sections : sections.filter(({ id }) => id === selected)

if (!scenarios.length) {
  console.error(`No scenario found for ${selected}`)
  process.exit(1)
}
if (!dryRun && !evaluator) {
  console.error('--evaluator is required unless --dry-run is used')
  process.exit(1)
}
if (fixture && !fs.existsSync(fixture)) {
  console.error(`Fixture does not exist: ${fixture}`)
  process.exit(1)
}

function run(command, args, options) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { ...options, shell: false })
    let stdout = ''
    let stderr = ''
    child.stdout?.on('data', (chunk) => { stdout += chunk })
    child.stderr?.on('data', (chunk) => { stderr += chunk })
    const timer = setTimeout(() => child.kill('SIGTERM'), timeoutMs)
    child.on('error', reject)
    child.on('close', (code, signal) => {
      clearTimeout(timer)
      resolve({ code, signal, stdout, stderr })
    })
  })
}

fs.mkdirSync(outputRoot, { recursive: true })
const results = []

for (const scenario of scenarios) {
  const runRoot = fs.mkdtempSync(path.join(os.tmpdir(), `sdlc-forward-${scenario.id}-`))
  const workspace = path.join(runRoot, 'workspace')
  const skillDir = path.join(workspace, '.codex', 'skills', 'sdlc-architect')
  const outputDir = path.join(outputRoot, scenario.id)
  const promptFile = path.join(runRoot, 'prompt.txt')

  fs.mkdirSync(workspace, { recursive: true })
  fs.mkdirSync(path.dirname(skillDir), { recursive: true })
  fs.cpSync(path.join(root, 'skills'), path.join(workspace, '.codex', 'skills'), { recursive: true })
  if (fixture) fs.cpSync(fixture, workspace, { recursive: true })
  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(promptFile, `${scenario.prompt}\n`, 'utf8')
  fs.writeFileSync(path.join(outputDir, 'metadata.json'), JSON.stringify({
    scenario: scenario.id,
    title: scenario.title,
    promptFile,
    workspace,
    skillDir,
    evaluator: evaluator ?? null,
  }, null, 2) + '\n')

  if (dryRun) {
    console.log(`PREPARED ${scenario.id}: ${outputDir}`)
    continue
  }

  const result = await run(evaluator, [
    '--prompt-file', promptFile,
    '--workspace', workspace,
    '--output-dir', outputDir,
    '--skill-dir', skillDir,
  ], { cwd: workspace, env: { ...process.env, SDLC_SCENARIO_ID: scenario.id } })
  fs.writeFileSync(path.join(outputDir, 'evaluator.stdout'), result.stdout, 'utf8')
  fs.writeFileSync(path.join(outputDir, 'evaluator.stderr'), result.stderr, 'utf8')
  const record = { scenario: scenario.id, exitCode: result.code, signal: result.signal, outputDir }
  fs.writeFileSync(path.join(outputDir, 'result.json'), JSON.stringify(record, null, 2) + '\n')
  results.push(record)
  console.log(`${result.code === 0 ? 'COMPLETED' : 'FAILED'} ${scenario.id}: ${outputDir}`)
}

if (!dryRun && results.some((result) => result.exitCode !== 0)) process.exitCode = 1
