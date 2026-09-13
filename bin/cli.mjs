#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const cwd = process.cwd();

// Read package info
const pkg = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));

const args = process.argv.slice(2);

const MERMAID_DECLARATIONS = /^(flowchart\b|graph\b|sequenceDiagram\b|classDiagram\b|stateDiagram(?:-v2)?\b|erDiagram\b|journey\b|gantt\b|pie\b|mindmap\b|timeline\b|gitGraph\b|C4(?:Context|Container|Component|Dynamic|Deployment)\b|quadrantChart\b|requirementDiagram\b|sankey-beta\b|block-beta\b|packet-beta\b|architecture-beta\b|xychart-beta\b)/;

function printHelp() {
  console.log(`
\x1b[1mSDLC Architect CLI\x1b[0m (v${pkg.version})
Iterative software delivery with grounded UML and anti-slop quality gates.

\x1b[1mUsage:\x1b[0m
  npx sdlc-architect [command] [options]

\x1b[1mCommands:\x1b[0m
  \x1b[36minstall [target-dir]\x1b[0m   Install skill(s) to target directory (default: ./skills)
  \x1b[36mupdate, upgrade [dir]\x1b[0m  Update installed skill(s) to the latest package version
  \x1b[36minit [options]\x1b[0m         Scaffold full SDLC setup (skills, adapters, project-state, ADRs)
  \x1b[36madapter <platform>\x1b[0m     Generate agent rules (cursor, claude, copilot, windsurf, github, all)
  \x1b[36madr <title>\x1b[0m            Scaffold a new numbered Architecture Decision Record
  \x1b[36mgate [ready|done]\x1b[0m      Audit Definition of Ready or Done quality gates
  \x1b[36mcheck-mermaid [path]\x1b[0m   Validate Mermaid diagram fences in Markdown files
  \x1b[36mdoctor, check\x1b[0m          Run complete SDLC repository health check
  \x1b[36mlist\x1b[0m                   List bundled skills available to install
  \x1b[36mversion\x1b[0m                Show CLI version
  \x1b[36mhelp\x1b[0m                   Show this help message

\x1b[1mOptions:\x1b[0m
  -d, --dest <path>      Destination directory for skills (default: ./skills)
  -a, --all              Install/update sdlc-architect and all antislop concern skills
  -p, --platform <name>  Agent platform adapter (cursor, claude, copilot, windsurf, github, all)
  -s, --skill <name>     Target specific skill (default: sdlc-architect)
  -t, --templates        Also copy/update artifact templates (templates/project-state.md)
  --adapters             Also update agent platform adapters during update
  --state                Generate initial docs/project-state.md during init
  --adr                  Initialize docs/adr/ directory with ADR-0001
  --github               Initialize .github/ pull request and issue templates
  -f, --force            Overwrite existing files without prompting
  -h, --help             Show help
  -v, --version          Show version

\x1b[1mExamples:\x1b[0m
  npx sdlc-architect
  npx sdlc-architect --all
  npx sdlc-architect init --all --platform cursor --state --adr
  npx sdlc-architect adapter claude
  npx sdlc-architect adr "use-postgresql-for-audit-log"
  npx sdlc-architect check-mermaid ./docs
  npx sdlc-architect doctor
`);
}

function getAvailableSkills() {
  const skillsDir = path.join(packageRoot, 'skills');
  if (!fs.existsSync(skillsDir)) return [];
  return fs.readdirSync(skillsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function listSkills() {
  const skills = getAvailableSkills();
  console.log(`\nAvailable skills in sdlc-architect (v${pkg.version}):\n`);
  for (const skill of skills) {
    const skillMd = path.join(packageRoot, 'skills', skill, 'SKILL.md');
    let desc = '';
    if (fs.existsSync(skillMd)) {
      const content = fs.readFileSync(skillMd, 'utf8');
      const match = content.match(/^description:\s*(.+)$/m);
      if (match) desc = match[1].trim();
    }
    console.log(`  • \x1b[1m${skill}\x1b[0m`);
    if (desc) {
      console.log(`    \x1b[2m${desc}\x1b[0m`);
    }
  }
  console.log('');
}

function copyDir(src, dest, force) {
  if (fs.existsSync(dest) && !force) {
    throw new Error(`Destination directory already exists: ${dest}\nUse --force to overwrite.`);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.cpSync(src, dest, { recursive: true, force: true });
}

function runInstall(options) {
  const available = getAvailableSkills();
  const baseTarget = path.resolve(cwd, options.dest);

  let skillsToInstall = [];
  if (options.all) {
    skillsToInstall = available;
  } else {
    if (!available.includes(options.skill)) {
      console.error(`\x1b[31mError:\x1b[0m Skill "${options.skill}" not found.`);
      console.error(`Available skills: ${available.join(', ')}`);
      process.exit(1);
    }
    skillsToInstall = [options.skill];
  }

  console.log(`\n\x1b[1mSDLC Architect Installer\x1b[0m (v${pkg.version})`);
  console.log(`Installing into: \x1b[36m${baseTarget}\x1b[0m\n`);

  for (const skill of skillsToInstall) {
    const src = path.join(packageRoot, 'skills', skill);
    const dest = path.join(baseTarget, skill);

    try {
      copyDir(src, dest, options.force);
      console.log(`  \x1b[32m✔\x1b[0m Installed \x1b[1m${skill}\x1b[0m -> ${path.relative(cwd, dest)}`);
    } catch (err) {
      console.error(`  \x1b[31m✖\x1b[0m Failed to install ${skill}: ${err.message}`);
      process.exit(1);
    }
  }

  if (options.templates || options.all) {
    const templatesSrc = path.join(packageRoot, 'templates');
    const templatesDest = path.resolve(cwd, 'templates');
    if (fs.existsSync(templatesSrc) && path.resolve(templatesSrc) !== path.resolve(templatesDest)) {
      try {
        fs.mkdirSync(templatesDest, { recursive: true });
        fs.cpSync(templatesSrc, templatesDest, { recursive: true, force: options.force });
        console.log(`  \x1b[32m✔\x1b[0m Copied templates -> ${path.relative(cwd, templatesDest)}`);
      } catch (err) {
        console.warn(`  \x1b[33m!\x1b[0m Skipping templates: ${err.message}`);
      }
    }
  }

  console.log('\n\x1b[32mInstallation complete!\x1b[0m');
  console.log('\nQuick Start:');
  console.log(`  1. Review the skill documentation at \x1b[34m${path.join(options.dest, 'sdlc-architect', 'SKILL.md')}\x1b[0m`);
  console.log('  2. Configure your AI agent workspace (Codex, Claude Code, Cursor, etc.) to include the skills path.');
  console.log('  3. In your prompt, trigger the SDLC architect workflow for your project lifecycle.\n');
}

function runUpdate(options) {
  const available = getAvailableSkills();
  console.log(`\n\x1b[1mSDLC Architect Skill Updater\x1b[0m (v${pkg.version})`);

  // Detect destination directory
  let targetBase = null;
  const candidateDirs = [
    options.dest,
    './skills',
    './.agents/skills',
    './.claude/skills',
  ];

  if (options.dest && options.dest !== './skills') {
    targetBase = path.resolve(cwd, options.dest);
  } else {
    for (const cand of candidateDirs) {
      if (!cand) continue;
      const fullPath = path.resolve(cwd, cand);
      if (fs.existsSync(path.join(fullPath, 'sdlc-architect', 'SKILL.md'))) {
        targetBase = fullPath;
        break;
      }
    }
    if (!targetBase) {
      targetBase = path.resolve(cwd, options.dest || './skills');
    }
  }

  console.log(`Target directory: \x1b[36m${targetBase}\x1b[0m\n`);

  // Determine which skills to update
  let skillsToUpdate = [];
  if (options.all) {
    skillsToUpdate = available;
  } else if (options.skill && options.skill !== 'sdlc-architect') {
    skillsToUpdate = [options.skill];
  } else {
    // Auto-detect which skills currently exist in targetBase
    skillsToUpdate = available.filter(skill => {
      const skillPath = path.join(targetBase, skill);
      return fs.existsSync(skillPath);
    });

    if (skillsToUpdate.length === 0) {
      console.log(`  \x1b[33m!\x1b[0m No existing skills found in ${targetBase}. Installing \x1b[1msdlc-architect\x1b[0m...`);
      skillsToUpdate = ['sdlc-architect'];
    }
  }

  let updatedCount = 0;
  for (const skill of skillsToUpdate) {
    const src = path.join(packageRoot, 'skills', skill);
    const dest = path.join(targetBase, skill);

    try {
      copyDir(src, dest, true); // force overwrite
      console.log(`  \x1b[32m✔\x1b[0m Updated \x1b[1m${skill}\x1b[0m -> ${path.relative(cwd, dest)}`);
      updatedCount++;
    } catch (err) {
      console.error(`  \x1b[31m✖\x1b[0m Failed to update ${skill}: ${err.message}`);
    }
  }

  // If templates exist in current project, update them
  const templatesDest = path.resolve(cwd, 'templates');
  const templatesSrc = path.join(packageRoot, 'templates');
  if (options.templates || fs.existsSync(templatesDest)) {
    if (path.resolve(templatesSrc) !== path.resolve(templatesDest)) {
      try {
        fs.cpSync(templatesSrc, templatesDest, { recursive: true, force: true });
        console.log(`  \x1b[32m✔\x1b[0m Updated templates -> ${path.relative(cwd, templatesDest)}`);
      } catch (err) {
        console.warn(`  \x1b[33m!\x1b[0m Skipping templates update: ${err.message}`);
      }
    }
  }

  // Update adapters if requested
  if (options.adapters) {
    runAdapter('all', true);
  }

  console.log(`\n\x1b[32mSuccessfully updated ${updatedCount} skill(s) to v${pkg.version}!\x1b[0m\n`);
}

function runAdapter(platform, force) {
  const validPlatforms = ['cursor', 'claude', 'copilot', 'windsurf', 'github', 'all'];
  const p = (platform || 'all').toLowerCase();

  if (!validPlatforms.includes(p)) {
    console.error(`\x1b[31mError:\x1b[0m Unknown platform "${platform}". Valid: ${validPlatforms.join(', ')}`);
    process.exit(1);
  }

  const platformsToApply = p === 'all' ? ['cursor', 'claude', 'copilot', 'windsurf', 'github'] : [p];
  console.log(`\n\x1b[1mGenerating Agent Adapters\x1b[0m...\n`);

  for (const item of platformsToApply) {
    if (item === 'github') {
      const prDest = path.resolve(cwd, '.github/pull_request_template.md');
      const prSrc = path.join(packageRoot, 'templates/github/pull_request_template.md');
      const issuesDest = path.resolve(cwd, '.github/ISSUE_TEMPLATE');
      const issuesSrc = path.join(packageRoot, 'templates/github/ISSUE_TEMPLATE');

      try {
        fs.mkdirSync(path.dirname(prDest), { recursive: true });
        if (!fs.existsSync(prDest) || force) {
          fs.copyFileSync(prSrc, prDest);
          console.log(`  \x1b[32m✔\x1b[0m Generated \x1b[1mgithub\x1b[0m PR template -> .github/pull_request_template.md`);
        }
        if (!fs.existsSync(issuesDest) || force) {
          fs.mkdirSync(issuesDest, { recursive: true });
          fs.cpSync(issuesSrc, issuesDest, { recursive: true, force: true });
          console.log(`  \x1b[32m✔\x1b[0m Generated \x1b[1mgithub\x1b[0m issue templates -> .github/ISSUE_TEMPLATE/`);
        }
      } catch (err) {
        console.error(`  \x1b[31m✖\x1b[0m Failed generating github templates: ${err.message}`);
      }
      continue;
    }

    let destRelative = '';
    let srcFile = '';

    if (item === 'cursor') {
      destRelative = '.cursor/rules/sdlc-architect.mdc';
      srcFile = path.join(packageRoot, 'templates/adapters/cursor.mdc');
    } else if (item === 'claude') {
      destRelative = 'CLAUDE.md';
      srcFile = path.join(packageRoot, 'templates/adapters/claude.md');
    } else if (item === 'copilot') {
      destRelative = '.github/copilot-instructions.md';
      srcFile = path.join(packageRoot, 'templates/adapters/copilot.md');
    } else if (item === 'windsurf') {
      destRelative = '.windsurfrules';
      srcFile = path.join(packageRoot, 'templates/adapters/windsurf.md');
    }

    const destPath = path.resolve(cwd, destRelative);

    if (fs.existsSync(destPath) && !force) {
      console.log(`  \x1b[33m!\x1b[0m Skipped \x1b[1m${item}\x1b[0m (${destRelative} already exists, use --force to overwrite)`);
      continue;
    }

    try {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcFile, destPath);
      console.log(`  \x1b[32m✔\x1b[0m Generated \x1b[1m${item}\x1b[0m adapter -> ${destRelative}`);

      if (item === 'claude') {
        const cmdDest = path.resolve(cwd, '.claude/commands/sdlc.md');
        const cmdSrc = path.join(packageRoot, 'templates/adapters/claude-command.md');
        fs.mkdirSync(path.dirname(cmdDest), { recursive: true });
        if (!fs.existsSync(cmdDest) || force) {
          fs.copyFileSync(cmdSrc, cmdDest);
          console.log(`  \x1b[32m✔\x1b[0m Generated \x1b[1mclaude\x1b[0m native slash command -> .claude/commands/sdlc.md`);
        }
      }
    } catch (err) {
      console.error(`  \x1b[31m✖\x1b[0m Failed generating ${item} adapter: ${err.message}`);
    }
  }
  console.log('');
}

function runAdr(title) {
  if (!title || !title.trim()) {
    console.error('\x1b[31mError:\x1b[0m ADR title is required. Example: npx sdlc-architect adr "use-postgresql"');
    process.exit(1);
  }

  const adrDir = path.resolve(cwd, 'docs/adr');
  fs.mkdirSync(adrDir, { recursive: true });

  // Scan existing ADR files to determine next index
  const files = fs.readdirSync(adrDir);
  let maxIndex = 0;
  for (const file of files) {
    const match = file.match(/^(\d{4})-/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxIndex) maxIndex = num;
    }
  }

  const nextIndex = String(maxIndex + 1).padStart(4, '0');
  const slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const fileName = `${nextIndex}-${slug}.md`;
  const destPath = path.join(adrDir, fileName);

  const templatePath = path.join(packageRoot, 'templates/adr-template.md');
  let content = fs.readFileSync(templatePath, 'utf8');

  const today = new Date().toISOString().split('T')[0];
  content = content
    .replace(/\{NUMBER\}/g, nextIndex)
    .replace(/\{TITLE\}/g, title.trim())
    .replace(/\{YYYY-MM-DD\}/g, today);

  fs.writeFileSync(destPath, content, 'utf8');
  console.log(`\n\x1b[32m✔\x1b[0m Created ADR \x1b[1m${nextIndex}\x1b[0m -> docs/adr/${fileName}\n`);
}

function runGate(type) {
  const mode = (type || 'ready').toLowerCase();
  if (mode !== 'ready' && mode !== 'done') {
    console.error(`\x1b[31mError:\x1b[0m Invalid gate "${type}". Valid options: ready, done`);
    process.exit(1);
  }

  console.log(`\n\x1b[1mSDLC Architect Quality Gate: \x1b[36m${mode.toUpperCase()}\x1b[0m (v${pkg.version})\n`);
  let issues = 0;

  if (mode === 'ready') {
    // 1. Check project state file
    const stateFile = path.resolve(cwd, 'docs/project-state.md');
    if (fs.existsSync(stateFile)) {
      console.log(`  \x1b[32m✔\x1b[0m Project state file exists (docs/project-state.md)`);
      const content = fs.readFileSync(stateFile, 'utf8');
      if (content.includes('[TODO') || content.includes('[PLACEHOLDER')) {
        console.log(`  \x1b[33m!\x1b[0m Project state contains unresolved placeholders`);
        issues++;
      } else {
        console.log(`  \x1b[32m✔\x1b[0m Project state has no unresolved placeholders`);
      }
    } else {
      console.log(`  \x1b[33m!\x1b[0m No docs/project-state.md found (initialize with: npx sdlc-architect init --state)`);
      issues++;
    }

    // 2. Check ADRs
    const adrDir = path.resolve(cwd, 'docs/adr');
    if (fs.existsSync(adrDir)) {
      const adrs = fs.readdirSync(adrDir).filter(f => f.endsWith('.md'));
      if (adrs.length > 0) {
        console.log(`  \x1b[32m✔\x1b[0m Architecture Decision Records present (${adrs.length} record(s))`);
      } else {
        console.log(`  \x1b[33m!\x1b[0m docs/adr/ directory is empty`);
      }
    } else {
      console.log(`  \x1b[33m!\x1b[0m No docs/adr/ directory found`);
    }

    // 3. Validate Mermaid diagrams in docs/
    const docsDir = path.resolve(cwd, 'docs');
    if (fs.existsSync(docsDir)) {
      const valid = checkMermaidInPath('docs');
      if (!valid) issues++;
    }

    console.log('\n\x1b[1m--- Definition of Ready Verdict ---\x1b[0m');
    if (issues === 0) {
      console.log(`\x1b[32m[READY] The increment meets quality criteria and is ready to build!\x1b[0m\n`);
    } else {
      console.log(`\x1b[33m[BLOCKED] Found ${issues} item(s) to resolve before starting implementation.\x1b[0m\n`);
    }
  } else {
    // Mode: done
    // 1. Run tests if configured in package.json
    const pkgJsonPath = path.resolve(cwd, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
      try {
        const localPkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
        if (localPkg.scripts && localPkg.scripts.test) {
          console.log(`  \x1b[36mℹ\x1b[0m Executing test suite (npm test)...`);
          try {
            execSync('npm test', { cwd, stdio: 'pipe' });
            console.log(`  \x1b[32m✔\x1b[0m Tests passed successfully`);
          } catch (err) {
            console.log(`  \x1b[31m✖\x1b[0m Tests failed: ${err.message}`);
            issues++;
          }
        }
      } catch {}
    }

    // 2. Validate Mermaid diagrams across project docs
    const docsDir = path.resolve(cwd, 'docs');
    if (fs.existsSync(docsDir)) {
      const valid = checkMermaidInPath('docs');
      if (!valid) issues++;
    }

    // 3. Check project state for Done status
    const stateFile = path.resolve(cwd, 'docs/project-state.md');
    if (fs.existsSync(stateFile)) {
      console.log(`  \x1b[32m✔\x1b[0m Project state file exists (docs/project-state.md)`);
    }

    console.log('\n\x1b[1m--- Definition of Done Verdict ---\x1b[0m');
    if (issues === 0) {
      console.log(`\x1b[32m[DONE] Changes meet all Definition of Done criteria and are ready to merge/ship!\x1b[0m\n`);
    } else {
      console.log(`\x1b[31m[ACTION REQUIRED] Found ${issues} issue(s) before increment can be marked Done.\x1b[0m\n`);
    }
  }
}

function checkMermaidInPath(targetPath) {
  const scanTarget = path.resolve(cwd, targetPath || '.');
  const mdFiles = [];
  const errors = [];

  function walk(directory) {
    if (!fs.existsSync(directory)) return;
    const stat = fs.statSync(directory);
    if (stat.isFile() && directory.endsWith('.md')) {
      mdFiles.push(directory);
      return;
    }
    if (!stat.isDirectory()) return;

    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist') continue;
      const full = path.join(directory, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && full.endsWith('.md')) mdFiles.push(full);
    }
  }

  walk(scanTarget);

  for (const file of mdFiles) {
    const rel = path.relative(cwd, file);
    const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
    let inside = false;
    let startLine = 0;
    let body = [];

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      if (/^\s*```mermaid\s*$/.test(line)) {
        if (inside) errors.push(`${rel}:${lineNum}: Nested Mermaid fence detected`);
        inside = true;
        startLine = lineNum;
        body = [];
        return;
      }

      if (inside && /^\s*```\s*$/.test(line)) {
        const first = body.find(item => item.trim())?.trim() ?? '';
        if (!first) {
          errors.push(`${rel}:${startLine}: Mermaid block is empty`);
        } else if (!MERMAID_DECLARATIONS.test(first)) {
          errors.push(`${rel}:${startLine}: Unknown Mermaid declaration: "${first}"`);
        }
        inside = false;
        body = [];
        return;
      }

      if (inside) body.push(line);
    });

    if (inside) {
      errors.push(`${rel}:${startLine}: Mermaid fence was opened but never closed`);
    }
  }

  console.log(`\n\x1b[1mMermaid Diagram Validation\x1b[0m`);
  console.log(`Scanned ${mdFiles.length} Markdown file(s) in \x1b[36m${path.relative(cwd, scanTarget) || '.'}\x1b[0m\n`);

  if (errors.length > 0) {
    console.error(errors.map(err => `  \x1b[31m✖\x1b[0m ${err}`).join('\n'));
    console.log(`\n\x1b[31mFAIL:\x1b[0m Found ${errors.length} Mermaid diagram error(s).\n`);
    return false;
  }

  console.log(`  \x1b[32m✔\x1b[0m All Mermaid fences and declarations are structurally valid!\n`);
  return true;
}

function runDoctor() {
  console.log(`\n\x1b[1mRunning SDLC Architect Doctor\x1b[0m (v${pkg.version})...\n`);
  let issues = 0;

  // 1. Check skill installation
  const skillPaths = [
    'skills/sdlc-architect',
    '.agents/skills/sdlc-architect',
    '.claude/skills/sdlc-architect',
  ];
  const foundSkill = skillPaths.find(p => fs.existsSync(path.resolve(cwd, p, 'SKILL.md')));
  if (foundSkill) {
    console.log(`  \x1b[32m✔\x1b[0m SDLC Architect Skill detected at: \x1b[1m${foundSkill}\x1b[0m`);
  } else {
    console.log(`  \x1b[33m!\x1b[0m No local SDLC Architect skill found in skills/ (run: npx sdlc-architect install)`);
  }

  // 2. Check Project State
  const statePath = path.resolve(cwd, 'docs/project-state.md');
  const altStatePath = path.resolve(cwd, 'templates/project-state.md');
  if (fs.existsSync(statePath)) {
    console.log(`  \x1b[32m✔\x1b[0m Project state file found at: \x1b[1mdocs/project-state.md\x1b[0m`);
  } else if (fs.existsSync(altStatePath)) {
    console.log(`  \x1b[32m✔\x1b[0m Project state template found at: \x1b[1mtemplates/project-state.md\x1b[0m`);
  } else {
    console.log(`  \x1b[33m!\x1b[0m No docs/project-state.md found (run: npx sdlc-architect init --state)`);
  }

  // 3. Check ADR Directory
  const adrDir = path.resolve(cwd, 'docs/adr');
  if (fs.existsSync(adrDir)) {
    const count = fs.readdirSync(adrDir).filter(f => f.endsWith('.md')).length;
    console.log(`  \x1b[32m✔\x1b[0m ADR directory detected with \x1b[1m${count}\x1b[0m record(s)`);
  } else {
    console.log(`  \x1b[33m!\x1b[0m No docs/adr/ directory found (run: npx sdlc-architect adr <title>)`);
  }

  // 4. Validate Mermaid in current repo
  console.log(`\n  Checking Mermaid syntax across repository...`);
  const mermaidOk = checkMermaidInPath('.');
  if (!mermaidOk) issues++;

  if (issues === 0) {
    console.log(`\x1b[32m✔ Doctor check passed without critical issues!\x1b[0m\n`);
  } else {
    console.log(`\x1b[31m✖ Doctor found ${issues} issue(s) that need attention.\x1b[0m\n`);
    process.exit(1);
  }
}

function runInit(options) {
  console.log(`\n\x1b[1mInitializing SDLC Architect Environment\x1b[0m\n`);

  // 1. Install skills
  runInstall(options);

  // 2. Generate platform adapters if requested
  if (options.platform) {
    runAdapter(options.platform, options.force);
  }

  // 3. Generate project state if requested
  if (options.state) {
    const docsDir = path.resolve(cwd, 'docs');
    const destState = path.join(docsDir, 'project-state.md');
    const srcState = path.join(packageRoot, 'templates/project-state.md');

    if (!fs.existsSync(destState) || options.force) {
      fs.mkdirSync(docsDir, { recursive: true });
      fs.copyFileSync(srcState, destState);
      console.log(`  \x1b[32m✔\x1b[0m Initialized project state -> docs/project-state.md`);
    } else {
      console.log(`  \x1b[33m!\x1b[0m docs/project-state.md already exists (skipped)`);
    }
  }

  // 4. Initialize ADR if requested
  if (options.adr) {
    const adrDir = path.resolve(cwd, 'docs/adr');
    const adr0001 = path.join(adrDir, '0001-record-architecture-decisions.md');
    const src0001 = path.join(packageRoot, 'templates/adr/0001-record-architecture-decisions.md');

    if (!fs.existsSync(adr0001) || options.force) {
      fs.mkdirSync(adrDir, { recursive: true });
      fs.copyFileSync(src0001, adr0001);
      console.log(`  \x1b[32m✔\x1b[0m Initialized ADR directory -> docs/adr/0001-record-architecture-decisions.md`);
    } else {
      console.log(`  \x1b[33m!\x1b[0m docs/adr/0001 already exists (skipped)`);
    }
  }

  // 5. Initialize GitHub templates if requested
  if (options.github) {
    runAdapter('github', options.force);
  }

  console.log('\n\x1b[32mInitialization complete!\x1b[0m Your repository is ready for traceable SDLC workflows.\n');
}

function parseArgs() {
  const options = {
    command: 'install',
    dest: './skills',
    all: false,
    skill: 'sdlc-architect',
    templates: false,
    force: false,
    platform: null,
    state: false,
    adr: false,
    github: false,
    param: null,
  };

  const positional = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '-h' || arg === '--help' || arg === 'help') {
      options.command = 'help';
      return options;
    }
    if (arg === '-v' || arg === '--version' || arg === 'version') {
      options.command = 'version';
      return options;
    }
    if (arg === 'list' || arg === '--list') {
      options.command = 'list';
      return options;
    }
    if (arg === 'doctor' || arg === 'check') {
      options.command = 'doctor';
      return options;
    }
    if (arg === 'check-mermaid') {
      options.command = 'check-mermaid';
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.param = args[++i];
      }
      return options;
    }
    if (arg === 'adr') {
      options.command = 'adr';
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.param = args[++i];
      }
      return options;
    }
    if (arg === 'adapter') {
      options.command = 'adapter';
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.platform = args[++i];
      }
      return options;
    }
    if (arg === 'init') {
      options.command = 'init';
      continue;
    }
    if (arg === 'install') {
      options.command = 'install';
      continue;
    }
    if (arg === 'gate') {
      options.command = 'gate';
      if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
        options.param = args[++i];
      }
      continue;
    }
    if (arg === 'update' || arg === 'upgrade') {
      options.command = 'update';
      continue;
    }
    if (arg === '--adapters') {
      options.adapters = true;
      continue;
    }
    if (arg === '-a' || arg === '--all') {
      options.all = true;
      continue;
    }
    if (arg === '-f' || arg === '--force') {
      options.force = true;
      continue;
    }
    if (arg === '-t' || arg === '--templates') {
      options.templates = true;
      continue;
    }
    if (arg === '--state') {
      options.state = true;
      continue;
    }
    if (arg === '--adr') {
      options.adr = true;
      continue;
    }
    if (arg === '--github') {
      options.github = true;
      continue;
    }
    if ((arg === '-d' || arg === '--dest') && i + 1 < args.length) {
      options.dest = args[++i];
      continue;
    }
    if ((arg === '-p' || arg === '--platform') && i + 1 < args.length) {
      options.platform = args[++i];
      continue;
    }
    if ((arg === '-s' || arg === '--skill') && i + 1 < args.length) {
      options.skill = args[++i];
      continue;
    }
    if (!arg.startsWith('-')) {
      positional.push(arg);
    }
  }

  if (positional.length > 0 && (options.command === 'install' || options.command === 'update')) {
    options.dest = positional[0];
  }

  return options;
}

function main() {
  const options = parseArgs();

  switch (options.command) {
    case 'help':
      printHelp();
      break;
    case 'version':
      console.log(`v${pkg.version}`);
      break;
    case 'list':
      listSkills();
      break;
    case 'adapter':
      runAdapter(options.platform || 'all', options.force);
      break;
    case 'adr':
      runAdr(options.param);
      break;
    case 'gate':
      runGate(options.param || 'ready');
      break;
    case 'check-mermaid':
      checkMermaidInPath(options.param);
      break;
    case 'doctor':
      runDoctor();
      break;
    case 'init':
      runInit(options);
      break;
    case 'install':
      runInstall(options);
      break;
    case 'update':
      runUpdate(options);
      break;
    default:
      printHelp();
      break;
  }
}

main();
