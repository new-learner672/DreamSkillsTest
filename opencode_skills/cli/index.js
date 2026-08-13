#!/usr/bin/env node
'use strict';
const { install, uninstall } = require('./lib/install');
const { doctor, init } = require('./lib/doctor');
const { platformInfo } = require('./lib/detect');

const USAGE = `
Dreamskills — 一体化 vibecoding 技能终端部署工具（13 技能）

用法:
  dreamskills install [选项]    安装技能到 AI 宿主
  dreamskills init [目录]       初始化项目（specs/ + constitution.md）
  dreamskills list              列出技能清单
  dreamskills doctor            环境体检（OS/架构/宿主/依赖）
  dreamskills uninstall [选项]  卸载技能

install/uninstall 选项:
  -t, --target <host>           opencode | codex | claude | all（默认 all）
  -g, --global                  安装到全局目录（默认项目级，当前目录）
  -s, --skill <name>            只安装单个技能（如 dream-ui）
  -f, --force                   覆盖已安装技能
  -d, --dir <path>              指定项目目录（默认当前目录）

支持矩阵: Windows / Linux / macOS × x86_64 / arm64（纯 Node 脚本，架构无关）
示例:
  npx dreamskills-cli install
  npx dreamskills-cli install --target codex --global
  npx dreamskills-cli install --skill dream-ui --force
  npx dreamskills-cli doctor
`;

function parseArgv(argv) {
  const opts = { targets: ['all'], global: false, skill: null, force: false, cwd: process.cwd(), _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '-t' || a === '--target') opts.targets = (argv[++i] || '').split(',');
    else if (a === '-g' || a === '--global') opts.global = true;
    else if (a === '-s' || a === '--skill') opts.skill = argv[++i];
    else if (a === '-f' || a === '--force') opts.force = true;
    else if (a === '-d' || a === '--dir') opts.cwd = argv[++i];
    else if (a === '-h' || a === '--help') { console.log(USAGE); process.exit(0); }
    else if (!a.startsWith('-')) opts._.push(a);
    else { console.error(`未知参数: ${a}\n${USAGE}`); process.exit(1); }
  }
  return opts;
}

function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  if (!cmd) { console.log(USAGE); process.exit(0); }
  const opts = parseArgv(rest);
  const log = console.log;
  const info = platformInfo();
  log(`Dreamskills CLI · ${info.platformName}/${info.archName} · Node ${process.version}`);

  try {
    switch (cmd) {
      case 'install':
        if (opts._.length) opts.cwd = opts._[0];
        install({ targets: opts.targets, global: opts.global, skill: opts.skill, force: opts.force, cwd: opts.cwd, log });
        log('\n完成。验证：在宿主会话中问 AI『你有哪些 dreamskills 技能可用』');
        break;
      case 'uninstall':
        if (opts._.length) opts.cwd = opts._[0];
        uninstall({ targets: opts.targets, global: opts.global, skill: opts.skill, cwd: opts.cwd, log });
        break;
      case 'list': {
        const { listSkills } = require('./lib/install');
        for (const s of listSkills()) log(`  ${s.name.padEnd(20)} ${s.desc}`);
        break;
      }
      case 'doctor':
        log(doctor());
        break;
      case 'init':
        log(init(opts._[0] || process.cwd()));
        break;
      default:
        console.error(`未知命令: ${cmd}\n${USAGE}`);
        process.exit(1);
    }
  } catch (e) {
    console.error(`错误: ${e.message}`);
    process.exit(1);
  }
}

main();
