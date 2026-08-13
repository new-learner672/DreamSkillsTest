#!/usr/bin/env node
/**
 * Dreamskills 斜杠命令生成器 —— 为 Claude Code 与 OpenCode 生成技能入口命令
 *
 * 用法：
 *   node build-commands.mjs --target all        # 默认：Claude + OpenCode（当前目录项目级）
 *   node build-commands.mjs --target claude     # 只生成 .claude/commands/
 *   node build-commands.mjs --target opencode   # 只生成 .opencode/commands/
 *   node build-commands.mjs --dir <路径>        # 输出到指定目录（覆盖 --project 默认行为）
 *
 * 设计（依据 docs/multi-platform.md）：
 * - Claude Code：.claude/commands/<name>.md，frontmatter 支持 description + argument-hint
 * - OpenCode：.opencode/commands/<name>.md，frontmatter 仅 description（安全 schema）
 * - Codex CLI 无斜杠命令机制（v0.117.0 起 /prompts 已移除、技能仅作为模型工具），故不生成
 * - 命令只是薄入口：正文指示模型完整读取对应技能并按其流程执行；参数经 $ARGUMENTS 透传
 *
 * 零依赖，纯 Node（≥16.7）。
 */
import { existsSync, mkdirSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, '..', 'skills');
const args = process.argv.slice(2);

const has = (f) => args.includes(f);
const val = (f) => { const i = args.indexOf(f); return i >= 0 ? args[i + 1] : undefined; };

if (has('--help') || has('-h')) {
  console.log(`Dreamskills 斜杠命令生成器
用法:
  node build-commands.mjs [--target claude|opencode|all] [--dir <路径>]
  --target  生成到哪个平台（默认 all；Codex 无斜杠命令，自动跳过）`);
  process.exit(0);
}

const targetArg = val('--target') || 'all';
if (!['claude', 'opencode', 'all'].includes(targetArg)) {
  console.error('错误：--target 必须是 claude|opencode|all');
  process.exit(1);
}
const baseDir = val('--dir')
  ? (isAbsolute(val('--dir')) ? val('--dir') : join(process.cwd(), val('--dir')))
  : process.cwd();

// ── 20 个技能的入口命令元数据（描述 + 参数提示） ───────────
const COMMANDS = {
  'dream-bootstrap':     ['初始化项目治理骨架（.dreamspec/DESIGN.md/CLAUDE.md/SKILLS.md）', '（可选）项目路径或说明'],
  'dream-spec-propose':  ['提出规格变更提案（proposal/tasks/spec-delta，GWT 可验证）', '变更标题或需求描述'],
  'dream-spec-implement':['按已确认规格逐块实施并归档（挂载 TDD/设计/调试护航技能）', '提案编号（如 001）'],
  'dream-brainstorm':    ['需求澄清头脑风暴（边界/规则/异常/优先级/非目标连环追问）', '待澄清的需求'],
  'dream-plan':          ['写分块实施计划（≤半天/块、带验收点、工件落盘 tasks.md）', '提案编号或任务说明'],
  'dream-execute':       ['按计划逐块执行（块级验证、可选子代理委派）', '计划文件或任务说明'],
  'dream-tdd':           ['测试驱动开发（红-绿-重构，先写失败测试）', '待实现的功能/逻辑'],
  'dream-debug':         ['系统化调试（复现→二分→根因→修复→回归）', 'bug 现象描述'],
  'dream-git':           ['原子提交（块号+意图+摘要，一个逻辑块一次提交）', '变更摘要'],
  'dream-design-system': ['设计系统契约（DESIGN.md tokens 先行、组件从 tokens 派生）', '待设计的模块/页面'],
  'dream-ui-polish':     ['界面渐进打磨与反 slop 门控自检', '待打磨的页面/组件'],
  'dream-style-library': ['风格/配色/字体组合推荐（50 风格 × 21 配色 × 50 字体原创库，关键词检索，选定写入 DESIGN.md）', '产品类型或目标气质'],
  'dream-slide-design':  ['幻灯片/演示文稿设计（16:9 网格、页型模式库、图表化、演讲者备注）', '主题与页数（如：产品发布 12 页）'],
  'dream-banner-design': ['横幅/营销视觉设计（媒介尺寸、单一焦点、一个 CTA、多尺寸适配）', '媒介与卖点（如：社媒 1:1 新品上市）'],
  'dream-review':        ['变更代码审查（五维清单、问题分级阻断/建议）', '待审查的变更/提案编号'],
  'dream-verify':        ['交付前验证门（判决式 PASS/FAIL，必须附证据，收口全流水线）', '待验证的提案编号'],
  'dream-webapp-test':   ['真实浏览器功能验证（用例从 GWT 派生，Playwright）', '待测功能/流程'],
  'dream-perf-audit':    ['性能审计护栏（Lighthouse/CWV 基线→优化→复测）', '待审计页面/接口'],
  'dream-security-check':['安全审查（OWASP 清单，高危清零否则 FAIL）', '待审查变更'],
  'dream-skill-creator': ['元技能：创建或改进技能（官方格式+统一骨架+自检）', '技能主题或待改进技能名'],
};

// ── 生成 ──────────────────────────────────────────────────
if (!existsSync(SRC)) {
  console.error('错误：未找到 skills/ 目录，请在仓库根目录运行');
  process.exit(1);
}
const skills = readdirSync(SRC).filter((d) => statSync(join(SRC, d)).isDirectory()).sort();
const missing = skills.filter((s) => !COMMANDS[s]);
if (missing.length > 0) {
  console.error(`错误：以下技能缺少命令元数据：${missing.join(', ')}`);
  process.exit(1);
}

const platforms = targetArg === 'all' ? ['claude', 'opencode'] : [targetArg];
const OUT = {
  claude: { label: 'Claude Code', dir: join(baseDir, '.claude', 'commands') },
  opencode: { label: 'OpenCode', dir: join(baseDir, '.opencode', 'commands') },
};

for (const key of platforms) {
  const { label, dir } = OUT[key];
  mkdirSync(dir, { recursive: true });
  let n = 0;
  for (const skill of skills) {
    const [desc, hint] = COMMANDS[skill];
    const body = `遵循 Dreamskills 技能 \`${skill}\` 执行：完整读取 skills/${skill}/SKILL.md（含其中"进阶资料"引用的 references/ 文件），然后严格按该技能的工作流程与验收标准执行。

输入（$ARGUMENTS）：${hint}
（无输入时，按 SKILL.md 的触发条件向用户澄清后再执行。）`;
    const fm = key === 'claude'
      ? `---\ndescription: ${desc}\nargument-hint: ${hint}\n---\n`
      : `---\ndescription: ${desc}\n---\n`;
    writeFileSync(join(dir, `${skill}.md`), fm + '\n' + body + '\n', 'utf8');
    n++;
  }
  console.log(`[${label}] ${n} 个命令 → ${dir}`);
}

console.log('');
console.log('使用方式：');
console.log('  Claude Code：/dream-propose 用户登录功能');
console.log('  OpenCode   ：/dream-propose 用户登录功能');
console.log('  （Codex CLI 无斜杠命令；直接说"用 dream-spec-propose 提出…"即可触发技能）');
