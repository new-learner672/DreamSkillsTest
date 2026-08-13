# Dreamskills — 一体化 Vibe Coding 技能体系

> 取百家之长，成一家之言。Dreamskills 整合了 GitHub 上星数最高的 vibecoding skills 的核心优势：
> **OpenSpec**（规格层 Git）· **Spec-Kit**（宪法与门禁）· **Superpowers**（开发纪律）·
> **BMAD**（敏捷方法论）· **UI UX Pro Max**（设计数据库）· **Taste-Skill**（可调品味）·
> **Hallmark**（反 AI 味质量门）· **Web-Quality Skills**（工程标准）· **Guard-Skills**（第二遍审查）·
> **Microsoft Waza**（度量验证闭环）· **Anthropic Skills**（格式标准）

## 一、它是什么

Dreamskills 是一套遵循 **Anthropic Agent Skills 官方规范**（SKILL.md + frontmatter + 渐进式披露）的综合技能包，
用一个统一的"Dream 流水线"把软件开发的完整生命周期串起来：

```
需求探索(dream-brainstorm) → 规格驱动(dream-spec) → 调研(dream-research) → 架构设计(dream-architect)
     → 计划拆解(dream-plan) → TDD 开发(dream-tdd) → 系统化调试(dream-debug) → UI 全谱系(dream-ui)
     → 验证测试(dream-verify) → 代码评审(dream-review) → Git 收尾(dream-git)
     ↻ 全程由 上下文持久化(dream-context) 护航 → 技能自扩展(dream-write-skill)
```

## 二、目录结构

```
opencodeskills/
├── README.md                          # 本文档
├── docs/
│   ├── 01-设计思路与架构.md           # 整合矩阵、架构理念、设计决策
│   ├── 02-安装部署.md                 # 多宿主安装部署
│   └── 03-使用操作说明.md             # 工作流与命令详解
└── dreamskills/                       # 技能本体（符合 Claude Code 插件标准）
    ├── .claude-plugin/plugin.json     # 插件清单
    ├── commands/                      # 斜杠命令入口（dream-*）
    ├── hooks/                         # 会话钩子（启动注入元规则）
    ├── agents/                        # 4 个子代理（planner/reviewer/verifier/design-reviewer）
    └── skills/                        # 13 个核心技能
        ├── dream-brainstorm/          # 需求探索（Adaptive Decision Ladder + 意图简报）
        ├── dream-spec/                # 规格驱动（意图层 + delta 变更 + 轻量宪法）
        ├── dream-research/            # 调研与技术选型（防幻觉证据纪律）
        ├── dream-architect/           # 架构设计（决策显式化 + 复杂度门）
        ├── dream-plan/                # 计划拆解（2-5 分钟任务粒度 + 三文件持久化）
        ├── dream-tdd/                 # 测试驱动开发（RED-GREEN-REFACTOR）
        ├── dream-debug/               # 系统化调试（4 阶段根因定位）
        ├── dream-ui/                  # UI/UX 全谱系（UI UX Pro Max 全量数据资产 + 反 slop 门）
        │   ├── data/                  # 13 个设计 CSV + stacks/ 22 技术栈（约 1.4MB）
        │   ├── references/            # 路由/品牌/token/技术栈/审计/40 门清单
        │   └── scripts/               # BM25 检索 + 设计系统生成（Python 标准库）
        ├── dream-verify/              # 验证测试（四层 V 模型 + CWV/性能预算/guard 复查）
        ├── dream-review/              # 代码评审（两阶段 + 新上下文对抗 + 接收评审礼仪）
        ├── dream-git/                 # Git 纪律（worktree/Conventional Commits/分支收尾）
        ├── dream-context/             # 上下文持久化（三文件计划/会话恢复/纠正记忆）
        └── dream-write-skill/         # 元技能（教 AI 扩展新技能）
```

## 三、核心设计理念

1. **单一事实来源**：规格即现状（`specs/`），变更是提案（`changes/`），代码服务于规格（Spec-Kit 权力反转）
2. **证据优于断言**：一切完成声明必须附带测试通过、评审通过等可验证证据（Superpowers）
3. **第二遍不信任**：AI 的第一次产出必经 guard/评审/门禁复查，评审用全新上下文（Guard-Skills / Waza）
4. **渐进式披露**：SKILL.md 主体 ≤ 200 行，细节按需下沉到 `references/`（Anthropic 官方规范）
5. **品味可调**：UI 输出用 1-10 旋钮 + 硬性反 slop 检查清单约束（Taste-Skill / Hallmark）
6. **可量化验证**：性能、可访问性、SEO 全部绑定 Lighthouse/CWV/WCAG 数值阈值（Web-Quality Skills）
7. **上下文=RAM，文件系统=磁盘**：计划永远写盘、每轮重注入，/clear 与压缩不再是致命伤（planning-with-files）
8. **先澄清后动手**：需求模糊先过意图层（problem/hypothesis/AC 持久 ID），漂移靠 spec_revision 追踪（ProductSpec / Product-Manager-Skills）

## 四、快速开始

```bash
# 1. 终端部署（参考 OpenSpec 模式；Windows/Linux/macOS × x64/arm64 通用，详见 docs/02-安装部署.md）
npx dreamskills-cli install          # 一键安装到 opencode/codex/claude code（自动检测）
npx dreamskills-cli doctor           # 环境体检（OS/架构/宿主/依赖）
# 备选：本地脚本 powershell install.ps1 或 ./install.sh
# 备选：/plugin install dreamskills@<本地路径>

# 2. 进入你的项目并初始化（创建 specs/ 目录与项目宪法）
npx dreamskills-cli init

# 3. 开始一个特性
/dream-brainstorm <想法>    # 需求模糊先澄清（意图简报）
/dream-spec <特性名>        # 提出变更提案 → 人审 → 实施 → 归档
/dream-build                # 计划 + TDD 实现 + 验证 + 评审一条龙

# 卸载（详见 docs/02-安装部署.md 第 5 节）
npx dreamskills-cli uninstall            # CLI 卸载（跨平台）
powershell install.ps1 -Uninstall        # Windows 脚本卸载
./install.sh --uninstall                 # Linux/macOS 脚本卸载
# 项目数据（specs/、changes/ 等）默认保留，可手动删除
```

## 五、与上游项目的映射关系

| Dreamskills 组件 | 取长的上游项目 | 补短的设计调整 |
|---|---|---|
| dream-brainstorm | Superpowers（brainstorming）、Product-Manager-Skills（Adaptive Decision Ladder/problem-framing） | 问 3-5 问收敛为意图简报，与 spec 层解耦 |
| dream-spec | OpenSpec（delta 变更）、Spec-Kit（宪法）、ProductSpec（意图层） | 去掉 Python 依赖与刚性门禁；AC/SM 持久 ID + spec_revision 防漂移 |
| dream-research | BMAD（研究代理）、Spec-Kit（research.md） | 六阶段 + 防幻觉证据纪律，产出供 ADR 消费 |
| dream-architect | Spec-Kit（Simplicity Gate）、BMAD（决策显式化） | ADR 决策记录模板化，人类保留最终判断权 |
| dream-plan | Superpowers（writing-plans）、Task-Master（PRD 拆解）、planning-with-files（三文件） | 2-5 分钟粒度 + [P] 并行标记 + 计划持久化防腐化 |
| dream-tdd | Superpowers（RED-GREEN-REFACTOR） | 附带 12 条反模式清单，测试先行强制 |
| dream-debug | Superpowers（4 阶段调试） | 根因确认后才准动手，证据链记录 |
| dream-ui | UI UX Pro Max（**全量整合**：84 风格/192 产品/192 配色/74 字体/161 推理规则/98 UX 指南/22 技术栈数据资产 + 8 子能力 + 检索脚本）、Taste（旋钮）、Hallmark（40 门） | 数据资产本地化 + 纯提示词降级路径，零运行时依赖 |
| dream-verify | Web-Quality（CWV 阈值）、Guard（第二遍审查）、Waza（V 模型） | 数值阈值 + 审查分离，验证不含自我评审 |
| dream-review | Superpowers（两阶段评审）、Waza（新上下文） | 强制全新上下文评审 + 接收评审礼仪 |
| dream-git | Superpowers（worktrees/分支收尾）、Conventional Commits | 提交前自检清单 + 门禁后才合并 |
| dream-context | planning-with-files（三文件+重注入）、pro-workflow（纠正记忆）、caveman（输出经济） | 纯文件实现（无 SQLite 依赖）+ 会话恢复 catchup 流程 |
| dream-write-skill | Superpowers（writing-skills）、Anthropic（规范） | 严格遵循 SKILL.md 规范与 200 行上限 |
