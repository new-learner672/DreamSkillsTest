#!/usr/bin/env node
/**
 * Dreamskills doctor —— 环境与安装自检
 *
 * 检查项：
 *  1. 操作系统 / CPU 架构 / Node 版本（纯 JS 零原生依赖 → 任何架构均可运行）
 *  2. 技能源完整性（20 个 SKILL.md、三平台安全字段集、references 存在）
 *  3. 代理检测（Claude Code / OpenCode / Codex 的全局与项目级技能目录）
 *  4. 项目治理文件（.dreamspec / CLAUDE.md / AGENTS.md / DESIGN.md）
 *
 * 退出码：0 = 全部通过；1 = 存在错误项。
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC = join(ROOT, 'skills');
const cwd = process.cwd();

let errors = 0;
let warnings = 0;
const ok = (m) => console.log(`  ✅ ${m}`);
const err = (m) => { console.log(`  ❌ ${m}`); errors++; };
const warn = (m) => { console.log(`  ⚠️  ${m}`); warnings++; };

const ARCH_NAME = {
  x64: 'x64 (x86_64 / AMD64)',
  arm64: 'arm64 (aarch64 / Apple Silicon)',
  ia32: 'x86 (32-bit)',
};
const OS_NAME = { win32: 'Windows', darwin: 'macOS', linux: 'Linux' };

console.log('════ Dreamskills doctor ════');

// ── 1. 环境 ──────────────────────────────────────────────
console.log('\n[1] 运行环境');
console.log(`  · 操作系统：${OS_NAME[process.platform] || process.platform}`);
console.log(`  · CPU 架构：${ARCH_NAME[process.arch] || process.arch}`);
console.log(`  · Node.js ：${process.version}`);
console.log(`  · 纯 JS 零原生依赖 → 架构无关；任何受 Node 支持的 OS/架构均可运行 ✅`);

// ── 2. 技能源完整性 ──────────────────────────────────────
console.log('\n[2] 技能源完整性（skills/）');
if (!existsSync(SRC)) { err('技能源目录不存在'); }
else {
  const skills = readdirSync(SRC).filter((d) => statSync(join(SRC, d)).isDirectory()).sort();
  ok(`技能数量：${skills.length}`);
  for (const s of skills) {
    const sk = join(SRC, s, 'SKILL.md');
    if (!existsSync(sk)) { err(`${s}：缺少 SKILL.md`); continue; }
    const raw = readFileSync(sk, 'utf8');
    const m = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
    if (!m) { err(`${s}：frontmatter 缺失`); continue; }
    const fm = m[1];
    const keys = [...fm.matchAll(/^([a-zA-Z-]+):/gm)].map((x) => x[1]);
    const bad = keys.filter((k) => !['name', 'description'].includes(k));
    if (bad.length > 0) err(`${s}：高危 frontmatter 字段 [${bad.join(', ')}]（三平台安全集 = name+description）`);
    const desc = (fm.match(/description:\s*(.+)/) || [])[1] || '';
    if (desc.length > 1024) err(`${s}：description 超 1024 字符`);
    const refs = [...raw.matchAll(/references\/([\w-]+\.md)/g)].map((x) => x[1]);
    for (const r of new Set(refs)) {
      const local = existsSync(join(SRC, s, 'references', r));
      const cross = ['dream-design-system', 'dream-style-library'].some((o) => existsSync(join(SRC, o, 'references', r)));
      if (!local && !cross) err(`${s}：引用的 references 不存在 [${r}]`);
    }
  }
  if (errors === 0) ok('全部技能通过安全字段集与 references 校验');
}

// ── 3. 代理检测 ──────────────────────────────────────────
console.log('\n[3] 编码代理检测');
const OPENCODE_CONFIG_DIR = process.env.OPENCODE_CONFIG_DIR || join(homedir(), '.config', 'opencode');
const CODEX_HOME = process.env.CODEX_HOME || join(homedir(), '.codex');
const agents = [
  { name: 'Claude Code', global: join(homedir(), '.claude', 'skills'), project: join(cwd, '.claude', 'skills') },
  { name: 'OpenCode', global: join(OPENCODE_CONFIG_DIR, 'skills'), project: join(cwd, '.opencode', 'skills') },
  { name: 'Codex CLI', global: join(CODEX_HOME, 'skills'), project: join(cwd, '.codex', 'skills') },
];
let installedAny = 0;
for (const a of agents) {
  const g = existsSync(a.global) ? readdirSync(a.global).filter((d) => d.startsWith('dream-')).length : 0;
  const p = existsSync(a.project) ? readdirSync(a.project).filter((d) => d.startsWith('dream-')).length : 0;
  if (g === 0 && p === 0) {
    warn(`${a.name}：未检测到已安装的 Dreamskills 技能（全局 ${a.global} / 项目 ${a.project}）`);
  } else {
    ok(`${a.name}：全局 ${g} 个 / 项目级 ${p} 个 Dreamskills 技能`);
    installedAny++;
  }
}
if (installedAny === 0) warn('尚未安装到任何代理 —— 运行 dreamskills install（或 --target 指定平台）');

// ── 4. 项目治理文件（仅当处于项目目录时提示） ──────────────
console.log('\n[4] 项目治理文件（当前目录）');
const gov = [
  ['.dreamspec', '规格治理目录'],
  ['CLAUDE.md', 'Claude Code 项目记忆'],
  ['AGENTS.md', 'OpenCode/Codex 项目记忆'],
  ['DESIGN.md', '设计 tokens 契约'],
];
let govCount = 0;
for (const [f, label] of gov) {
  if (existsSync(join(cwd, f))) { ok(`${f}（${label}）`); govCount++; }
}
if (govCount === 0) warn('当前目录未初始化项目治理 —— 在项目目录运行 dreamskills init（或用 dream-bootstrap 技能）');

// ── 汇总 ─────────────────────────────────────────────────
console.log('\n════ 汇总 ════');
if (errors === 0) {
  console.log(`✅ 无错误项${warnings > 0 ? `，${warnings} 个警告` : ''}。`);
  console.log('下一步：在目标项目执行 dreamskills init；或对代理说"用 dream-bootstrap 初始化本项目"。');
  process.exit(0);
} else {
  console.log(`❌ ${errors} 个错误项，${warnings} 个警告。请修复后重跑 dreamskills doctor。`);
  process.exit(1);
}
