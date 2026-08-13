---
name: dream-bootstrap
description: 在新建项目或为存量项目引入 Dreamskills 治理体系时使用。初始化 .dreamspec 规格目录、DESIGN.md 设计规范、CLAUDE.md 项目记忆与 SKILLS.md 强度模式配置，产出项目治理骨架。触发场景：新项目第一步、"初始化 dreamskills"、"bootstrap 项目"、"引入治理骨架"。
---

# 项目初始化（dream-bootstrap）

> 定位：Dreamskills 的入口技能。为项目铺设"规格 + 设计 + 流程"三大治理地基。
> 吸收思想：OpenSpec 的同仓规格目录 + spec-kit 的渐进采纳 + anthropics 的"文件即技能"。

## 何时使用（触发条件）

- 新建项目的第一步（在写任何功能代码之前）；
- 为存量项目引入 Dreamskills 治理；
- 治理文件（.dreamspec/、DESIGN.md、CLAUDE.md）缺失或需要重建。

不适用：一次性脚本/临时实验（直接用 light 模式最小链路即可）。

## 核心原则

1. **治理先行**：先有骨架后有代码，避免"先写一堆代码再补规范"。
2. **最小侵入**：存量项目只增不改；已存在的 DESIGN.md / CLAUDE.md 只合并、不覆盖。
3. **工件即记忆**：生成的每个文件都是后续技能的外部记忆（不依赖上下文窗口）。

## 工作流程

### 步骤 1：创建规格目录

创建 `.dreamspec/` 三目录（可用 CLI：`node <dreamskills>/scripts/dream.mjs init`）：

```
.dreamspec/
├── specs/          # 已定稿规格（唯一事实源）
├── changes/        # 进行中的变更提案
├── archive/        # 已归档变更
└── SKILLS.md       # 强度模式与启用技能声明
```

### 步骤 2：生成 DESIGN.md（UI 项目必做）

- 若无 DESIGN.md：从 Dreamskills 的 DESIGN.md.example 复制，引导用户填写品牌关键词、色彩/字体/间距 tokens。
- 若已有：合并缺失的 token 章节，不覆盖用户内容。

### 步骤 3：生成/合并 CLAUDE.md 与 AGENTS.md（按目标平台）

- Claude Code 读取 CLAUDE.md；OpenCode / Codex 读取 AGENTS.md。按项目使用的代理平台选用其一，或两者都放（内容保持一致、互不冲突）。
- 若无：分别从 CLAUDE.md.example / AGENTS.md.example 复制，填写项目事实（技术栈、常用命令、目录约定）。
- 若已有：在文件末尾追加"Dreamskills 工作流约定"一节，保留原有内容；两文件并存时保持约定部分一致。

### 步骤 4：生成 .dreamspec/SKILLS.md

声明三档强度模式之一（默认 **balanced**）：

| 模式 | 适用 | 裁剪 |
|---|---|---|
| rigorous | 大型/多人/合规 | 全流程全产物，验证门全开 |
| balanced | 常规项目 | spec 仅功能/行为变更；TDD 核心路径；E2E 关键流程 |
| light | 原型/脚本 | 可跳过 spec；TDD 可选；验证门=构建+冒烟 |

询问用户选择；若无回复默认 balanced。记录豁免与冲突声明（如"本项目以团队既有 ESLint 规范为准"）。

### 步骤 5：验证安装与技能可发现（收尾必做）

- 运行 `node <dreamskills>/cli.mjs doctor`（或 `dreamskills doctor`）确认环境与技能完整性；
- 按目标代理平台验证技能可被发现（见 docs/multi-platform.md 第 5 节）：
  - Claude Code / OpenCode：`/dream-propose` 命令存在（若已生成斜杠命令）；
  - Codex：说"列出可用技能"应含 dream-* 技能；
- 验证失败时回到安装步骤（`node <dreamskills>/scripts/install.mjs --target all`），勿带病开工。

## 验收标准

- [ ] `.dreamspec/{specs,changes,archive}` 三目录存在
- [ ] `.dreamspec/SKILLS.md` 记录了强度模式与启用技能
- [ ] DESIGN.md 存在且含完整 tokens（UI 项目）
- [ ] CLAUDE.md 与/或 AGENTS.md（按平台）含项目事实与 Dreamskills 工作流引用
- [ ] 变更索引 `.dreamspec/changes/INDEX.md` 已初始化
- [ ] 已运行 doctor 自检且技能可被目标代理发现

## 与其他技能的衔接

- 下游：dream-spec-propose（第一个变更）、dream-brainstorm（需求澄清）、dream-plan（计划）
- 全局：所有技能的"强度模式"裁剪依据均读取 .dreamspec/SKILLS.md

## 进阶资料

- references/governance-layout.md：目录与文件约定详解（何时用）
