'use strict';
const fs = require('fs');
const path = require('path');
const { skillSourceRoot, skillsRootFor, commandsRootFor } = require('./detect');

const SKILL_DESC = {
  'dream-brainstorm': '需求探索与澄清（Adaptive Decision Ladder + 意图简报）',
  'dream-spec': '规格驱动变更管理（意图层 + delta specs + 宪法）',
  'dream-research': '调研与技术选型（防幻觉证据纪律）',
  'dream-architect': '架构设计与决策记录（ADR + 复杂度门）',
  'dream-plan': '任务拆解（2-5 分钟粒度 + 三文件持久化）',
  'dream-tdd': '测试驱动开发（RED-GREEN-REFACTOR + 反模式）',
  'dream-debug': '系统化调试（4 阶段根因定位）',
  'dream-ui': 'UI/UX 全谱系设计（数据资产 + 反 slop + 审计）',
  'dream-verify': '验证与质量门禁（V 模型 + CWV 阈值 + guard）',
  'dream-review': '两阶段对抗式代码评审',
  'dream-git': 'Git 纪律（worktree + Conventional Commits）',
  'dream-context': '上下文持久化（三文件计划 + 纠正记忆）',
  'dream-write-skill': '元技能（技能自扩展）'
};

function listSkills() {
  const root = skillSourceRoot();
  if (!root) throw new Error('未找到技能源目录（dreamskills/skills）');
  const names = fs.readdirSync(root).filter((n) => n.startsWith('dream-') && fs.statSync(path.join(root, n)).isDirectory());
  return names.map((n) => ({ name: n, desc: SKILL_DESC[n] || '' }));
}

function install({ targets = ['all'], global = false, skill = null, force = false, cwd = process.cwd(), log = console.log }) {
  const root = skillSourceRoot();
  if (!root) throw new Error('未找到技能源目录（dreamskills/skills），请从 opencodeskills 仓库运行或设置 DREAMSKILLS_HOME');

  const names = skill ? [skill] : listSkills().map((s) => s.name);
  if (skill && !names.length) throw new Error(`技能不存在: ${skill}`);
  const targetsResolved = targets.includes('all') ? Object.keys(require('./detect').HOSTS) : targets;

  const report = [];
  for (const t of targetsResolved) {
    const skillRoot = skillsRootFor(t, { global, cwd });
    const cmdRoot = commandsRootFor(t, { global, cwd });
    if (!skillRoot) { report.push({ target: t, error: '未知宿主' }); continue; }
    fs.mkdirSync(skillRoot, { recursive: true });

    for (const name of names) {
      const src = path.join(root, name);
      const dest = path.join(skillRoot, name);
      if (fs.existsSync(dest)) {
        if (!force) {
          log(`[跳过] ${t} 已存在: ${dest}`);
          report.push({ target: t, name, action: 'skip' });
          continue;
        }
        fs.rmSync(dest, { recursive: true, force: true });
      }
      copyRecursive(src, dest);
      log(`[安装] ${t} <- ${dest}`);
      report.push({ target: t, name, action: 'installed' });
    }

    if (!skill) {
      fs.mkdirSync(cmdRoot, { recursive: true });
      const srcCmds = path.join(path.dirname(root), 'commands');
      if (fs.existsSync(srcCmds)) {
        for (const f of fs.readdirSync(srcCmds)) {
          fs.copyFileSync(path.join(srcCmds, f), path.join(cmdRoot, f));
        }
        log(`[安装] ${t} commands <- ${cmdRoot}`);
      }
      const srcHooks = path.join(path.dirname(root), 'hooks');
      const hooksRoot = cmdRoot.replace(/commands$/, 'hooks');
      if (fs.existsSync(srcHooks) && !global) {
        fs.mkdirSync(hooksRoot, { recursive: true });
        for (const f of fs.readdirSync(srcHooks)) {
          fs.copyFileSync(path.join(srcHooks, f), path.join(hooksRoot, f));
        }
        log(`[安装] ${t} hooks <- ${hooksRoot}`);
      }
    }
  }
  return report;
}

function uninstall({ targets = ['all'], global = false, skill = null, cwd = process.cwd(), log = console.log }) {
  const targetsResolved = targets.includes('all') ? Object.keys(require('./detect').HOSTS) : targets;
  const names = skill ? [skill] : listSkills().map((s) => s.name);
  for (const t of targetsResolved) {
    const skillRoot = skillsRootFor(t, { global, cwd });
    if (!skillRoot || !fs.existsSync(skillRoot)) continue;
    for (const name of names) {
      const dest = path.join(skillRoot, name);
      if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
        log(`[卸载] ${t} ${name}`);
      }
    }
  }
}

function copyRecursive(src, dest) {
  const st = fs.statSync(src);
  if (st.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const e of fs.readdirSync(src)) copyRecursive(path.join(src, e), path.join(dest, e));
  } else {
    fs.copyFileSync(src, dest);
  }
}

module.exports = { listSkills, install, uninstall };
