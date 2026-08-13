#!/usr/bin/env node
/**
 * Dreamskills 安装脚本 v2 —— 多平台安装（Claude Code / OpenCode / Codex CLI）
 *
 * 用法：
 *   node install.mjs                         安装到全局（默认 --target all：三平台全装）
 *   node install.mjs --target claude         只装 Claude Code
 *   node install.mjs --target opencode       只装 OpenCode
 *   node install.mjs --target codex          只装 Codex CLI
 *   node install.mjs --target all --project  安装到当前项目级（三平台项目目录）
 *   node install.mjs --dir <路径>            安装到单个自定义目录（不分平台）
 *   node install.mjs --dry-run               预览将执行的操作，不写文件
 *
 * 兼容性原则（依据 docs/multi-platform.md 的调研结论）：
 * - 真实拷贝，禁用符号链接（Codex 不识别文件级 symlink，issue #9365 等）
 * - frontmatter 保持 name + description 三平台安全集，不做任何改写
 * - 已存在的同名技能自动备份，不覆盖不删除
 *
 * 零依赖，纯 Node（≥16.7，cpSync 需要 16.7+）。
 */
import { existsSync, mkdirSync, readdirSync, renameSync, cpSync, statSync, rmSync } from 'node:fs';
import { join, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'skills');
const args = process.argv.slice(2);

// ── 参数解析 ──────────────────────────────────────────────
const has = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

if (has('--help') || has('-h')) {
  console.log(`Dreamskills 多平台安装脚本 v2
用法:
  node install.mjs [--target claude|opencode|codex|all] [--project] [--dir <路径>] [--dry-run]
  --target    选择平台（默认 all）
  --project   安装到当前项目级（.claude/skills、.opencode/skills、.codex/skills）
  --dir       安装到单个自定义目录（忽略 --target/--project）
  --dry-run   只预览，不写文件`);
  process.exit(0);
}

const dryRun = has('--dry-run');
const useProject = has('--project');
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

// ── 平台目录映射（调研结论，见 docs/multi-platform.md） ──────
const OPENCODE_CONFIG_DIR = process.env.OPENCODE_CONFIG_DIR
  || join(homedir(), '.config', 'opencode');   // XDG 规范；env 可整体覆盖
const CODEX_HOME = process.env.CODEX_HOME || join(homedir(), '.codex');

const TARGETS = {
  claude: {
    label: 'Claude Code',
    global: join(homedir(), '.claude', 'skills'),
    project: join('.claude', 'skills'),
  },
  opencode: {
    label: 'OpenCode',
    global: join(OPENCODE_CONFIG_DIR, 'skills'), // 复数 skills/（单数 skill/ 不会被发现）
    project: join('.opencode', 'skills'),
  },
  codex: {
    label: 'Codex CLI',
    global: join(CODEX_HOME, 'skills'),
    project: join('.codex', 'skills'),
  },
};

const selected = targetArg === 'all' ? Object.keys(TARGETS) : [targetArg];

// ── 收集技能 ──────────────────────────────────────────────
if (!existsSync(SRC)) {
  console.error('错误：未找到 skills/ 目录，请在仓库根目录运行');
  process.exit(1);
}
const skills = readdirSync(SRC).filter((d) => statSync(join(SRC, d)).isDirectory()).sort();
if (skills.length === 0) {
  console.error('错误：skills/ 下没有技能目录');
  process.exit(1);
}

// ── 执行 ──────────────────────────────────────────────────
const ts = new Date().toISOString().replace(/[:.]/g, '-');
const results = [];

function installTo(baseDir, label) {
  const backupDir = join(dirname(baseDir), `.dreamskills-backup-${ts}`);
  let backedUp = 0, installed = 0;
  for (const name of skills) {
    const src = join(SRC, name);
    const dst = join(baseDir, name);
    if (!dryRun) mkdirSync(baseDir, { recursive: true });
    if (existsSync(dst)) {
      if (!dryRun) {
        mkdirSync(backupDir, { recursive: true });
        renameSync(dst, join(backupDir, name));
      }
      backedUp++;
    }
    if (!dryRun) cpSync(src, dst, { recursive: true }); // 真实拷贝，不用符号链接
    installed++;
  }
  results.push({ label, baseDir, installed, backedUp, backupDir });
}

if (customDir) {
  installTo(isAbsolute(customDir) ? customDir : join(process.cwd(), customDir), '自定义目录');
} else {
  for (const key of selected) {
    const t = TARGETS[key];
    const baseDir = useProject ? join(process.cwd(), t.project) : t.global;
    installTo(baseDir, t.label);
  }
}

// ── 报告 ──────────────────────────────────────────────────
const OS_NAME = { win32: 'Windows', darwin: 'macOS', linux: 'Linux' };
const ARCH_NAME = { x64: 'x64 (x86_64)', arm64: 'arm64 (aarch64)', ia32: 'x86 (32-bit)' };
console.log(`Dreamskills 安装器 · ${OS_NAME[process.platform] || process.platform} / ${ARCH_NAME[process.arch] || process.arch} · Node ${process.version}`);
console.log(`（纯 JS 零原生依赖：任何受 Node 支持的 OS/架构均可运行）`);
console.log(dryRun ? '（dry-run 预览，未写文件）' : '');
for (const r of results) {
  console.log(`[${r.label}] ${r.installed} 个技能 → ${r.baseDir}${dryRun ? '  [预览]' : '  ✅'}`);
  if (r.backedUp > 0) console.log(`    ⚠️  备份了 ${r.backedUp} 个同名旧技能 → ${r.backupDir}`);
}
console.log('');
console.log(`技能清单（${skills.length} 个）：`);
console.log('  ' + skills.join(', '));
console.log('');
console.log('下一步：');
console.log('  1) 目标项目目录执行: node scripts/dream.mjs init（初始化 .dreamspec 治理骨架）');
console.log('  2) 生成斜杠命令（Claude/OpenCode）: node scripts/build-commands.mjs --target all');
console.log('  3) 验证技能被发现：在 Claude Code/OpenCode/Codex 中问"列出可用技能"');
console.log('  4) 详细说明见 README.md 与 docs/multi-platform.md');
