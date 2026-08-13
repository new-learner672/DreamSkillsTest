#!/usr/bin/env node
/**
 * Dreamskills CLI —— 规格生命周期管理辅助工具
 *
 * 设计原则：
 * - 零依赖、纯 Node（≥18）Esm，跨平台（Windows/macOS/Linux）
 * - 只做文件生命周期管理（创建/移动/登记）；验证执行由 agent 按 SKILL.md 完成
 * - 规格目录为纯 Markdown，不绑架任何工具链（OpenSpec 之轻 + spec-kit 之严）
 *
 * 用法：
 *   node dream.mjs init                 初始化 .dreamspec 治理骨架
 *   node dream.mjs propose "标题"       创建变更提案（编号自动递增）
 *   node dream.mjs status               查看提案状态
 *   node dream.mjs archive <编号>       归档已完成的变更（验证通过后）
 *   node dream.mjs verify               打印当前强度模式下的验证门清单
 */
import { existsSync, mkdirSync, readdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { renameSync } from 'node:fs';

const cwd = process.cwd();
const ROOT = join(cwd, '.dreamspec');
const SPECS = join(ROOT, 'specs');
const CHANGES = join(ROOT, 'changes');
const ARCHIVE = join(ROOT, 'archive');
const INDEX = join(CHANGES, 'INDEX.md');
const SKILLS_MD = join(ROOT, 'SKILLS.md');

const log = (...a) => console.log(...a);
const warn = (...a) => console.warn(...a);

function slugify(title) {
  const s = String(title).toLowerCase().trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
  return s.slice(0, 40) || 'change';
}

function ensureDirs() {
  for (const d of [ROOT, SPECS, CHANGES, ARCHIVE]) {
    if (!existsSync(d)) mkdirSync(d, { recursive: true });
  }
}

function nextId() {
  if (!existsSync(CHANGES)) return '001';
  const max = readdirSync(CHANGES)
    .filter((e) => /^\d{3}-/.test(e))
    .reduce((m, e) => Math.max(m, parseInt(e, 10) || 0), 0);
  return String(max + 1).padStart(3, '0');
}

function readMode() {
  try {
    const txt = readFileSync(SKILLS_MD, 'utf8');
    const m = txt.match(/强度模式[:：]\s*\*?\*?(rigorous|balanced|light)/i);
    return m ? m[1].toLowerCase() : 'balanced';
  } catch {
    return 'balanced';
  }
}

function ensureIndex() {
  if (!existsSync(INDEX)) {
    writeFileSync(INDEX, '# 变更提案索引\n\n| 编号 | 标题 | 状态 |\n|---|---|---|\n');
  }
}

function appendIndex(line) {
  ensureIndex();
  const old = readFileSync(INDEX, 'utf8');
  writeFileSync(INDEX, old + line + '\n');
}

function updateIndexStatus(id, status) {
  if (!existsSync(INDEX)) return;
  const lines = readFileSync(INDEX, 'utf8').split('\n');
  const out = lines.map((l) => {
    if (l.startsWith(`| ${id} `)) {
      const cells = l.split('|');
      if (cells.length >= 4) cells[3] = ` ${status} `;
      return cells.join('|');
    }
    return l;
  });
  writeFileSync(INDEX, out.join('\n'));
}

const [, , cmd, ...args] = process.argv;

switch (cmd) {
  case 'init': {
    ensureDirs();
    log('✅ 已创建 .dreamspec/{specs,changes,archive}');
    if (!existsSync(SKILLS_MD)) {
      writeFileSync(SKILLS_MD, [
        '# Dreamskills 项目配置',
        '',
        '- 强度模式：**balanced**（可选 rigorous / light，裁剪规则见 Dreamskills 文档）',
        '- 启用技能：dream-spec-propose, dream-spec-implement, dream-brainstorm, dream-plan, dream-execute, dream-tdd, dream-debug, dream-git, dream-design-system, dream-ui-polish, dream-style-library, dream-review, dream-verify, dream-webapp-test, dream-perf-audit, dream-security-check, dream-skill-creator',
        '- 豁免/冲突声明：（如有，按项目既有规范填写）',
        '',
      ].join('\n'));
      log('✅ 已生成 .dreamspec/SKILLS.md（默认 balanced 模式）');
    }
    if (!existsSync(join(cwd, 'DESIGN.md'))) {
      log('⚠️  未发现 DESIGN.md —— 请从 Dreamskills 的 DESIGN.md.example 复制并填写设计 tokens（UI 项目必做）');
    }
    if (!existsSync(join(cwd, 'CLAUDE.md')) && !existsSync(join(cwd, 'AGENTS.md'))) {
      log('⚠️  未发现 CLAUDE.md —— 请从 Dreamskills 的 CLAUDE.md.example 复制并填写项目事实');
    }
    ensureIndex();
    break;
  }

  case 'propose': {
    const title = args.join(' ').trim();
    if (!title) { warn('用法: node dream.mjs propose "变更标题"'); process.exit(1); }
    ensureDirs();
    const id = nextId();
    const dir = join(CHANGES, `${id}-${slugify(title)}`);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'proposal.md'), [
      `# ${title}（提案 ${id}）`,
      '',
      '## 背景',
      '（为什么做这个变更？当前痛点/机会）',
      '',
      '## 目标',
      '- ',
      '',
      '## 非目标（本期不做）',
      '- ',
      '',
      '## 影响面',
      '- 涉及模块/文件：',
      '- 风险点：',
      '',
      '## 状态',
      '- [ ] 已确认（确认后进入 dream-spec-implement）',
      '',
    ].join('\n'));
    writeFileSync(join(dir, 'tasks.md'), [
      `# ${title} —— 实施任务（提案 ${id}）`,
      '',
      '> 分块规则（dream-plan）：每块 ≤ 半天工作量、带验收点；逐块执行、每块完成做原子提交。',
      '',
      '## 块 1：',
      '- [ ] 任务',
      '- 验收点：',
      '',
    ].join('\n'));
    writeFileSync(join(dir, 'spec-delta.md'), [
      `# ${title} —— 规格增量（提案 ${id}）`,
      '',
      '> 每条必须含 Given-When-Then（机器可验语句）；标记 ADDED / MODIFIED / REMOVED。',
      '',
      '## ADDED',
      '### 需求 X',
      '- Given：（前置条件）',
      '- When：（动作）',
      '- Then：（可验证的预期结果）',
      '',
    ].join('\n'));
    appendIndex(`| ${id} | ${title} | proposed |`);
    log(`✅ 已创建提案 ${id}：${dir}`);
    log('   三份文件：proposal.md / tasks.md / spec-delta.md —— 请用 dream-spec-propose 技能流程评审确认');
    break;
  }

  case 'status': {
    if (!existsSync(CHANGES)) { warn('尚未初始化，请先运行: node dream.mjs init'); process.exit(1); }
    log('进行中的变更提案：');
    const dirs = readdirSync(CHANGES).filter((e) => /^\d{3}-/.test(e)).sort();
    if (dirs.length === 0) log('  （无）');
    for (const d of dirs) {
      const p = join(CHANGES, d, 'proposal.md');
      const title = existsSync(p) ? readFileSync(p, 'utf8').split('\n')[0].replace(/^#\s*/, '') : d;
      log(`  ${d}  ${title}`);
    }
    log(`已归档：${existsSync(ARCHIVE) ? readdirSync(ARCHIVE).filter((e) => /^\d{3}-/.test(e)).length : 0} 项`);
    break;
  }

  case 'validate': {
    const name = args[0] || '';
    ensureDirs();
    const match = readdirSync(CHANGES).find((e) => e === name || e.startsWith(name + '-'));
    if (!match) { warn(`未找到提案: ${name}（先运行 dreamskills status 查看）`); process.exit(1); }
    const dir = join(CHANGES, match);
    const issues = [];
    for (const f of ['proposal.md', 'tasks.md', 'spec-delta.md']) {
      if (!existsSync(join(dir, f))) issues.push(`缺少文件 ${f}`);
    }
    const sdPath = join(dir, 'spec-delta.md');
    if (existsSync(sdPath)) {
      const sd = readFileSync(sdPath, 'utf8');
      const blocks = (sd.match(/### 需求[：:]/g) || []).length;
      const gwts = (sd.match(/- (Given|When|Then)[：:]/g) || []).length;
      if (blocks === 0) issues.push('spec-delta.md 没有任何「### 需求」条目');
      else if (gwts < blocks * 3) issues.push(`GWT 语句不完整：${blocks} 个需求仅 ${gwts} 条 GWT（每条需 Given/When/Then 三要素）`);
      if (/体验良好|好用|美观|流畅|友好/.test(sd)) issues.push('存在不可观测的验收表述（如"体验良好/好用/美观"），请改为可验证语句');
    }
    if (issues.length === 0) {
      log(`✅ 提案 ${match} 校验通过（结构完整、GWT 可验证）`);
    } else {
      warn(`❌ 提案 ${match} 校验未通过：`);
      issues.forEach((i) => warn(`  - ${i}`));
      process.exit(1);
    }
    break;
  }

  case 'archive': {
    const name = args[0] || '';
    ensureDirs();
    const match = readdirSync(CHANGES).find((e) => e === name || e.startsWith(name + '-'));
    if (!match) { warn(`未找到提案: ${name}（先运行 node dream.mjs status 查看）`); process.exit(1); }
    const src = join(CHANGES, match);
    const dst = join(ARCHIVE, match);
    renameSync(src, dst);
    updateIndexStatus(match.slice(0, 3), 'archived');
    log(`✅ 已归档 ${match} → archive/`);
    log('   提醒：请确认 spec-delta.md 的 ADDED/MODIFIED 已合并进 .dreamspec/specs/（由 dream-spec-implement 完成）');
    break;
  }

  case 'verify': {
    const mode = readMode();
    log(`当前强度模式：${mode} —— 交付前验证门清单：`);
    const gates = {
      rigorous: ['单元/集成测试全量通过', '构建成功', '真实浏览器 E2E（关键+边界流程）', '性能指标达标（Lighthouse/CWV）', '安全清单无高危', '变更提案已归档'],
      balanced: ['单元/集成测试（核心路径）通过', '构建成功', '真实浏览器 E2E（关键流程）', '性能敏感时：性能指标达标', '涉输入/权限/数据时：安全清单通过', '变更提案已归档'],
      light: ['构建/运行成功', '冒烟验证通过'],
    }[mode];
    gates.forEach((g, i) => log(`  ${i + 1}. ${g}`));
    log('（本命令仅提醒；验证执行与 PASS/FAIL 判决由 dream-verify 技能完成）');
    break;
  }

  case 'help':
  default:
    log(`Dreamskills CLI 用法：
  node dream.mjs init                  初始化 .dreamspec 治理骨架
  node dream.mjs propose "标题"        创建变更提案（编号自动递增）
  node dream.mjs status                查看提案状态
  node dream.mjs validate <编号>       校验提案（结构 + Given-When-Then 可验证性）
  node dream.mjs archive <编号>        归档已完成的变更
  node dream.mjs verify                打印当前强度模式的验证门清单`);
}
