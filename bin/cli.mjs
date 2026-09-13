#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');
const cwd = process.cwd();

// Read package info
const pkg = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
SDLC Architect CLI (${pkg.version})
Iterative software delivery with grounded UML and anti-slop quality gates.

Usage:
  npx sdlc-architect [command] [options]

Commands:
  install [target-dir]   Install skill(s) to target directory (default command)
  list                   List bundled skills available to install
  help                   Show this help message
  version                Show CLI version

Options:
  -d, --dest <path>      Destination directory (default: ./skills)
  -a, --all              Install sdlc-architect and all antislop concern skills
  -s, --skill <name>     Install specific skill (default: sdlc-architect)
  -t, --templates        Also copy artifact templates (templates/project-state.md)
  -f, --force            Overwrite existing files if destination already exists
  -h, --help             Show help
  -v, --version          Show version

Examples:
  npx sdlc-architect
  npx sdlc-architect --all
  npx sdlc-architect install .agents/skills --all
  npx sdlc-architect install .claude/skills
  npx sdlc-architect --skill antislop-ui --dest ./skills
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

function parseArgs() {
  const options = {
    command: 'install',
    dest: './skills',
    all: false,
    skill: 'sdlc-architect',
    templates: false,
    force: false,
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
    if (arg === 'install' || arg === 'init') {
      options.command = 'install';
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
    if ((arg === '-d' || arg === '--dest') && i + 1 < args.length) {
      options.dest = args[++i];
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

  if (positional.length > 0) {
    options.dest = positional[0];
  }

  return options;
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
    case 'install':
      runInstall(options);
      break;
    default:
      printHelp();
      break;
  }
}

main();
