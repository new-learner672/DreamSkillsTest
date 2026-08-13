---
name: dream-plan
description: 当提案确认后、实施前需要把需求拆成可执行计划时使用。计划必须写入文件（tasks.md，工件即记忆、不依赖上下文窗口）；从 spec-delta 的 Given-When-Then 派生任务块；分块规则为每块≤半天工作量、带验收点、按依赖排序；按强度模式裁剪计划粒度（rigorous 详细步骤 / balanced 常规 / light 一句话清单）；计划经用户确认后才进入执行。触发场景："写实施计划"、"plan 一下"、"制定计划"、"拆分任务"、"把提案拆成任务"。
---

# 计划先行与落盘（dream-plan）

> 定位：把已确认的需求/提案拆成分块实施计划并写入 tasks.md——先想清楚再动手，计划是执行的唯一依据。
> 吸收思想：superpowers 的 writing-plans/executing-plans（plan 必须写文件、工件即记忆）+ 分块改进（控制 token、只加载当前块）。

## 何时使用（触发条件）

- 提案已确认（dream-spec-propose 之后）、实施（dream-execute / dream-spec-implement）之前；
- 用户说"写实施计划""plan 一下""制定计划"；
- 无 spec 的小任务：light 模式也用本技能产出一句话计划（写进 tasks.md 或直接在对话中说明）。

不适用：已有一个可执行、已确认的分块计划（无需重复制定）；纯探索阶段（先 brainstorm 想清楚再计划）。

## 核心原则

1. **计划必须落盘**：写入 `.dreamspec/changes/<id>-<slug>/tasks.md`（无提案时写入项目内约定的计划文件）；对话里的计划不算数——工件即记忆，不依赖上下文窗口。
2. **从 GWT 派生任务块**：spec-delta 的每条 Given-When-Then 至少对应一个可验证任务，保证"计划覆盖规格"。
3. **分块规则**：每块 ≤ 半天工作量；每块带**验收点**（可验证的完成标志）；块间按依赖排序（被依赖的块在前）。
4. **按强度模式裁剪粒度**：rigorous 每块含具体步骤与涉及文件；balanced 每块含任务+验收点；light 一句话任务清单。
5. **计划确认后才执行**：向用户呈现计划摘要，用户确认前不进入执行（防止方向错误白做）。

## 工作流程

### 步骤 1：读取输入（输入）

- 读取 proposal.md（目标/非目标）、spec-delta.md（GWT）、tasks.md 草稿（若 propose 已生成粗粒度任务）、brainstorm 澄清结论；
- 读取 `.dreamspec/SKILLS.md` 确定强度模式。

### 步骤 2：从 GWT 派生任务（动作）

- 逐条 GWT → 生成可验证任务（如"实现密码登录接口"对应 GWT"当输入正确密码→登录成功"）；
- 合并同模块任务、拆分跨层任务（数据层/接口层/UI 层分离）；
- 无 GWT 的小任务：按功能意图直接列任务。

### 步骤 3：分块与排序（动作）

- 应用分块规则：每块 ≤ 半天、含验收点、依赖排序（详见 references/chunking.md）；
- 每块标注类型（逻辑/UI/数据/配置），便于执行时挂载护航技能（tdd/design/debug）。

### 步骤 4：写入 tasks.md（产物）

- 采用块结构：`## 块 N：<标题>` → `- [ ] 任务` → `- 验收点：<可验证描述>`；
- 块号贯穿实施与提交（dream-git 提交信息含块号）。

### 步骤 5：确认（动作）

- 向用户呈现计划摘要（块数、依赖顺序、每块验收点、light 说明裁剪内容）；
- 询问"是否确认该计划？"；确认后计划生效，进入 dream-execute 或 dream-spec-implement。

## 验收标准

- [ ] tasks.md 已落盘（非仅对话）
- [ ] 每条 spec-delta GWT 至少对应一个任务（无遗漏）
- [ ] 每块 ≤ 半天工作量、带可验证验收点、依赖已排序
- [ ] 粒度符合强度模式（rigorous 详细 / balanced 常规 / light 一句话）
- [ ] 用户已确认计划

## 与其他技能的衔接

- 上游：dream-spec-propose（spec-delta）、dream-brainstorm（澄清结论）
- 下游：dream-spec-implement（有提案的实施）、dream-execute（小任务/无 spec 实施）
- 回环：计划中发现需求缺口 → 回 dream-brainstorm 补问或 dream-spec-propose 修订
- 强度模式：light 只产出一句话计划并跳过确认步骤；rigorous 计划需覆盖全部 GWT 且逐块有详细步骤

## 进阶资料

- references/chunking.md：分块策略详解与示例（何时加载：开始分块前）
