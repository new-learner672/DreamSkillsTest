'use strict';
const os = require('os');
const path = require('path');
const fs = require('fs');

const SUPPORTED = {
  platforms: { win32: 'Windows', darwin: 'macOS', linux: 'Linux' },
  archs: { x64: 'x86_64', arm64: 'arm64/aarch64' }
};

function platformInfo() {
  const p = os.platform();
  const a = os.arch();
  return {
    platform: p,
    platformName: SUPPORTED.platforms[p] || p,
    arch: a,
    archName: SUPPORTED.archs[a] || a,
    supported: Boolean(SUPPORTED.platforms[p])
  };
}

function home() {
  return os.homedir();
}

function configHome() {
  if (process.platform === 'win32') {
    return process.env.APPDATA || path.join(home(), 'AppData', 'Roaming');
  }
  return process.env.XDG_CONFIG_HOME || path.join(home(), '.config');
}

function skillSourceRoot() {
  if (process.env.DREAMSKILLS_HOME) {
    return path.join(process.env.DREAMSKILLS_HOME, 'skills');
  }
  const candidates = [
    path.join(__dirname, '..', '..', 'dreamskills', 'skills'),
    path.join(__dirname, '..', 'dreamskills', 'skills'),
    path.join(__dirname, 'assets', 'skills')
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

const HOSTS = {
  opencode: {
    label: 'opencode',
    global: () => path.join(configHome(), 'opencode', 'skills'),
    project: (cwd) => path.join(cwd, '.opencode', 'skills'),
    cmdsGlobal: () => path.join(configHome(), 'opencode', 'commands'),
    cmdsProject: (cwd) => path.join(cwd, '.opencode', 'commands')
  },
  codex: {
    label: 'codex',
    global: () => path.join(home(), '.codex', 'skills'),
    project: (cwd) => path.join(cwd, '.codex', 'skills'),
    cmdsGlobal: () => path.join(home(), '.codex', 'commands'),
    cmdsProject: (cwd) => path.join(cwd, '.codex', 'commands')
  },
  claude: {
    label: 'claude code',
    global: () => path.join(home(), '.claude', 'skills'),
    project: (cwd) => path.join(cwd, '.claude', 'skills'),
    cmdsGlobal: () => path.join(home(), '.claude', 'commands'),
    cmdsProject: (cwd) => path.join(cwd, '.claude', 'commands')
  }
};

function skillsRootFor(target, { global = false, cwd = process.cwd() } = {}) {
  const h = HOSTS[target];
  if (!h) return null;
  return global ? h.global() : h.project(cwd);
}

function commandsRootFor(target, { global = false, cwd = process.cwd() } = {}) {
  const h = HOSTS[target];
  if (!h) return null;
  return global ? h.cmdsGlobal() : h.cmdsProject(cwd);
}

function detectHosts() {
  const found = {};
  for (const [key, h] of Object.entries(HOSTS)) {
    const g = h.global();
    const p = h.project(process.cwd());
    found[key] = {
      label: h.label,
      global: { path: g, installed: fs.existsSync(path.join(g, 'dream-spec', 'SKILL.md')) },
      project: { path: p, installed: fs.existsSync(path.join(p, 'dream-spec', 'SKILL.md')) }
    };
  }
  return found;
}

module.exports = { platformInfo, home, configHome, skillSourceRoot, HOSTS, skillsRootFor, commandsRootFor, detectHosts };
