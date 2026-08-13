'use strict';
const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
const { platformInfo, skillSourceRoot, detectHosts } = require('./detect');
const { listSkills } = require('./install');

function which(cmd) {
  const r = spawnSync(process.platform === 'win32' ? 'where' : 'which', [cmd], { stdio: 'ignore' });
  return r.status === 0;
}

function doctor() {
  const info = platformInfo();
  const lines = [];
  lines.push(`OS/架构     : ${info.platformName} / ${info.archName}${info.supported ? '' : '（未验证，尽力支持）'}`);
  lines.push(`Node        : ${process.version} (${process.platform} ${process.arch})`);
  lines.push(`技能源      : ${skillSourceRoot() || '未找到'}`);
  lines.push(`Python(可选): ${which('python') || which('python3') ? '可用（dream-ui 检索脚本可跑）' : '不可用（dream-ui 走 CSV 直读降级路径）'}`);
  lines.push(`Git         : ${which('git') ? '可用' : '不可用（dream-git 受影响）'}`);
  const hosts = detectHosts();
  lines.push('');
  lines.push('宿主检测：');
  for (const [key, h] of Object.entries(hosts)) {
    const g = h.global.installed ? '13 技能已装' : '未装';
    const p = h.project.installed ? '13 技能已装' : '未装';
    lines.push(`  ${h.label.padEnd(12)} 全局 ${g} | 项目 ${p}`);
    lines.push(`    全局目录: ${h.global.path}`);
  }
  const skills = listSkills();
  lines.push('');
  lines.push(`技能清单（${skills.length} 个）：`);
  for (const s of skills) lines.push(`  ${s.name.padEnd(20)} ${s.desc}`);
  return lines.join('\n');
}

function init(cwd = process.cwd()) {
  const dirs = ['specs', 'specs/adr', 'changes', 'archive', 'research', 'brainstorm', '.dreamskills'];
  for (const d of dirs) fs.mkdirSync(path.join(cwd, d), { recursive: true });
  const con = path.join(cwd, 'specs', 'constitution.md');
  if (!fs.existsSync(con)) {
    fs.writeFileSync(con, [
      '# 项目宪法',
      '1. 测试先行',
      '2. 库优先',
      '3. 反抽象（≤3 层，新增须书面理由）',
      '4. 证据优于断言',
      '5. 最小实现',
      '6. 集成优先',
      '---',
      '修订记录：'
    ].join('\n') + '\n');
  }
  return `已初始化 Dreamskills 项目结构:\n${dirs.map((d) => `  ${d}/`).join('\n')}\n  specs/constitution.md`;
}

module.exports = { doctor, init, which };
