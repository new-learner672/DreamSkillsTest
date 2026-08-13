#!/usr/bin/env node
/**
 * Dreamskills 统一 CLI 入口（dreamskills / dream）
 *
 * 参考 openspec 的终端部署体验：一个全局命令管理安装、项目治理与自检。
 * 纯 JS 实现（零依赖、无原生模块）→ 天然跨 OS（Windows/Linux/macOS）与跨架构（x64/arm64/x86）。
 *
 * 命令：
 *   dreamskills install [--target claude|opencode|codex|all] [--project] [--dir <路径>] [--dry-run]
 *   dreamskills update   同 install（幂等：自动备份旧技能）
 *   dreamskills uninstall [--target ...] [--project] [--commands] [--purge-dreamspec] [--force] [--dir <路径>] [--dry-run]
 *   dreamskills commands [--target claude|opencode|all] [--dir <路径>]   生成 /dream-* 斜杠命令
 *   dreamskills init | propose <标题> | status | validate <编号> | archive <编号> | verify
 *   dreamskills doctor   环境与安装自检（OS/架构/Node/技能完整性/代理检测）
 *   dreamskills version
 */
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, existsSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRIPTS = join(__dirname, 'scripts');
const PKG = join(__dirname, 'package.json');

const USAGE = `Dreamskills CLI（v${pkgVersion()}）
用法:
  dreamskills install    [--target claude|opencode|codex|all] [--project] [--dir <路径>] [--dry-run]
  dreamskills update     同 install（幂等，自动备份旧技能）
  dreamskills uninstall  [--target claude|opencode|codex|all] [--project] [--commands] [--purge-dreamspec] [--force] [--dir <路径>] [--dry-run]
  dreamskills commands   [--target claude|opencode|all] [--dir <路径>]
  dreamskills init
  dreamskills propose "标题"
  dreamskills status
  dreamskills validate <编号>
  dreamskills archive <编号>
  dreamskills verify
  dreamskills doctor
  dreamskills version`;

function pkgVersion() {
  try {
    return JSON.parse(readFileSync(PKG, 'utf8')).version;
  } catch {
    return 'unknown';
  }
}

/** 以 stdio:inherit 调用子脚本（不捕获输出 → 兼容受限管道环境） */
function run(script, args) {
  if (!existsSync(join(SCRIPTS, script))) {
    console.error(`错误：脚本不存在 scripts/${script}`);
    return 1;
  }
  const r = spawnSync(process.execPath, [join(SCRIPTS, script), ...args], { stdio: 'inherit' });
  return r.status === null ? 1 : r.status;
}

const [, , cmd, ...args] = process.argv;

switch (cmd) {
  case 'install':
  case 'update':
    process.exit(run('install.mjs', args));
    break;
  case 'uninstall':
    process.exit(run('uninstall.mjs', args));
    break;
  case 'commands':
    process.exit(run('build-commands.mjs', args));
    break;
  case 'init':
  case 'propose':
  case 'status':
  case 'validate':
  case 'archive':
  case 'verify':
    process.exit(run('dream.mjs', [cmd, ...args]));
    break;
  case 'doctor':
    process.exit(run('doctor.mjs', args));
    break;
  case 'version':
  case '--version':
  case '-v':
    console.log(pkgVersion());
    process.exit(0);
    break;
  case 'help':
  case '--help':
  case '-h':
  default:
    console.log(USAGE);
    process.exit(cmd ? 0 : 0);
}
