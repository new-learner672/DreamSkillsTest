#!/usr/bin/env node
/**
 * Dreamskills 卸载脚本 —— 移除已安装的技能与斜杠命令
 *
 * 用法：
 *   node uninstall.mjs                         全局卸载（默认 --target all，三平台）
 *   node uninstall.mjs --target opencode       只卸载 OpenCode
 *   node uninstall.mjs --project               卸载当前项目级（.claude/.opencode/.codex/skills）
 *   node uninstall.mjs --commands              同时移除项目级 /dream-* 斜杠命令（.claude/commands、.opencode/commands）
 *   node uninstall.mjs --purge-dreamspec       同时移除 .dreamspec 治理目录（慎重：含全部提案/规格）
 *   node uninstall.mjs --force                 永久删除（默认是"备份式移除"，可恢复）
 *   node uninstall.mjs --dir <路径>            卸载单个自定义目录中的 dream-* 技能
 *   node uninstall.mjs --dry-run               只预览将移除的内容
 *
 * 安全设计：
 * - 默认"备份式移除"：把技能/命令/治理目录移动到 .dreamskills-uninstalled-<时间戳>/（同级目录），可手工恢复；
 * - 只有显式 --force 才永久删除；
 * - 卸载范围默认与安装范围对齐（全局），--project 对应项目级；
 * - 不会触碰任何非 dream-* 文件。
 *
 * 零依赖，纯 Node（≥16.7）。
 */
import { existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { join, dirname, basename, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

const has = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

if (has('--help') || has('-h')) {
  console.log(`Dreamskills 卸载脚本
用法:
  node uninstall.mjs [--target claude|opencode|codex|all] [--project] [--commands] [--purge-dreamspec] [--force] [--dir <路径>] [--dry-run]
  --target           选择平台（默认 all）
  --project          卸载当前项目级（默认卸载全局）
  --commands         同时移除项目级 /dream-* 斜杠命令
  --purge-dreamspec  同时移除 .dreamspec 治理目录（慎重）
  --force            永久删除（默认备份式移除，可恢复）
  --dir              卸载单个自定义目录中的 dream-* 技能
  --dry-run          只预览，不写文件`);
  process.exit(0);
}

const dryRun = has('--dry-run');
const force = has('--force');
const useProject = has('--project');
const withCommands = has('--commands');
const purgeDreamspec = has('--purge-dreamspec');
const customDir = val('--dir');
const targetArg = val('--target') || 'all';
if (!['claude', 'opencode', 'codex', 'all'].includes(targetArg)) {
  console.error(`错误：--target 必须是 claude|opencode|codex|all（收到 ${targetArg}）`);
  process.exit(1);
}
if (has('--dir') && !customDir) {
  console.error('错误：--dir 需要路径参数');
  process.exit(1);
}

// ── 平台目录映射（与 install.mjs 保持一致） ───────────────
const OPENCODE_CONFIG_DIR = process.env.OPENCODE_CONFIG_DIR || join(homedir(), '.config', 'opencode');
const CODEX_HOME = process.env.CODEX_HOME || join(homedir(), '.codex');
const TARGETS = {
  claude: { label: 'Claude Code', global: join(homedir(), '.claude', 'skills'), project: join('.claude', 'skills') },
  opencode: { label: 'OpenCode', global: join(OPENCODE_CONFIG_DIR, 'skills'), project: join('.opencode', 'skills') },
  codex: { label: 'Codex CLI', global: join(CODEX_HOME, 'skills'), project: join('.codex', 'skills') },
};
const selected = targetArg === 'all' ? Object.keys(TARGETS) : [targetArg];

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const cwd = process.cwd();
const results = [];

/** 备份式移除：移动到 .dreamskills-uninstalled-<ts>/<容器名>/<名称> */
function backupMove(src, backupDir, container) {
  const dst = join(backupDir, container, basename(src));
  mkdirSync(join(backupDir, container), { recursive: true });
  renameSync(src, dst);
}

/** 处理一个"容器目录"（skills 目录或 commands 目录）：移除其中 dream-* 项 */
function sweepContainer(containerDir, containerName, label) {
  if (!existsSync(containerDir)) return;
  const entries = readdirSync(containerDir).filter((e) => e.startsWith('dream-'));
  if (entries.length === 0) return;
  const backupDir = join(dirname(containerDir), `.dreamskills-uninstalled-${ts}`);
  const kind = containerName.endsWith('commands') ? '命令' : '技能';
  results.push({ label, containerDir, kind, entries });
  if (dryRun) return;
  for (const e of entries) {
    const src = join(containerDir, e);
    if (force) {
      const st = statSync(src);
      if (st.isDirectory()) rmSync(src, { recursive: true, force: true });
      else rmSync(src, { force: true });
    } else {
      backupMove(src, backupDir, containerName);
    }
  }
}

// ── 1) 技能目录 ──────────────────────────────────────────
if (customDir) {
  const dir = isAbsolute(customDir) ? customDir : join(cwd, customDir);
  sweepContainer(dir, basename(dir) || 'skills', '自定义目录');
} else {
  for (const key of selected) {
    const t = TARGETS[key];
    const baseDir = useProject ? join(cwd, t.project) : t.global;
    sweepContainer(baseDir, basename(baseDir), t.label);
  }
}

// ── 2) 斜杠命令（仅项目级存在） ──────────────────────────
if (withCommands && !customDir) {
  sweepContainer(join(cwd, '.claude', 'commands'), '.claude-commands', 'Claude Code');
  sweepContainer(join(cwd, '.opencode', 'commands'), '.opencode-commands', 'OpenCode');
}

// ── 3) .dreamspec 治理目录（显式 --purge-dreamspec 才处理） ──
if (purgeDreamspec) {
  const g = join(cwd, '.dreamspec');
  if (existsSync(g)) {
    results.push({ label: '治理目录', containerDir: g, kind: '目录', entries: ['.dreamspec'] });
    if (!dryRun) {
      if (force) rmSync(g, { recursive: true, force: true });
      else backupMove(g, join(cwd, `.dreamskills-uninstalled-${ts}`), 'project');
    }
  }
}

// ── 报告 ──────────────────────────────────────────────────
console.log(dryRun ? '（dry-run 预览，未写文件）' : '');
if (results.length === 0) {
  console.log('未发现已安装的 Dreamskills（技能/命令/治理目录均不存在）——无需卸载 ✅');
  console.log('提示：默认卸载范围是全局；卸载项目级请加 --project；卸载斜杠命令请加 --commands。');
} else {
  for (const r of results) {
    console.log(`[${r.label}] ${r.kind} ${r.entries.length} 项 → ${r.containerDir}${dryRun ? '  [预览]' : (force ? '  已永久删除 🗑️' : '  已备份移除（可恢复）✅')}`);
    if (!dryRun) for (const e of r.entries) console.log(`  - ${e}`);
  }
  if (!force && !dryRun) {
    console.log('');
    console.log(`ℹ️  备份位置：各目标目录旁的 .dreamskills-uninstalled-${ts}/（确认无误后可手动删除；恢复只需移回原处）`);
    console.log('ℹ️  如确认永久删除，可重跑并加 --force。');
  }
  console.log('');
  console.log('提示：CLAUDE.md / AGENTS.md / DESIGN.md 中的 Dreamskills 工作流引用仍保留（属项目文件，按需手工移除）；');
  console.log('     重新安装：dreamskills install（或 node scripts/install.mjs）。');
}
