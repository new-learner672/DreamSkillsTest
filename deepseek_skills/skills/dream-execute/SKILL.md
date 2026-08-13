---
name: dream-execute
description: 当计划已确认（tasks.md 已落盘）需要逐块执行时使用；也用于无 spec 的小任务。逐块执行、块级验证、进度勾选 tasks.md；按需挂载护航技能（逻辑→dream-tdd；UI→dream-design-system/dream-ui-polish；出错→dream-debug；完成→dream-git）；可选子代理委派模式——复杂块可拆给角色子代理（frontend/backend/tester）由主代理编排整合，默认单代理顺序执行以节省 token、避免角色僵化。触发场景："执行计划"、"开始实施"、"逐块执行"、"execute 计划"、"跑一下 tasks"。
---

# 计划执行与子代理委派（dream-execute）

> 定位：把已确认的计划逐块落地为代码，块级验证、逐块勾选——执行层的默认路径（无 spec 的小任务也走这里）。
> 吸收思想：superpowers 的 executing-plans（按计划执行）+ subagent-driven development（委派）+ wshobson 角色委派（可选化，规避"角色僵硬、token 贵"）。

## 何时使用（触发条件）

- tasks.md 计划已确认，用户说"执行计划""开始实施""逐块执行"；
- 无 spec 的一次性小任务（light 模式：一句话计划 → 本技能 → dream-verify 冒烟）；
- 计划中途被中断后恢复（从上次勾选处继续）。

不适用：有提案的实施（走 dream-spec-implement，本技能是其无 spec 变体）；计划尚未确认（先 dream-plan）。

## 核心原则

1. **逐块执行、不跳块**：严格按 tasks.md 顺序推进；每块完成后勾选并记录验证结果。
2. **块级验证**：每块做完必须验证（相关测试/构建/运行），验证通过才算完成该块。
3. **护航技能按需挂载**：逻辑→dream-tdd；UI→dream-design-system + dream-ui-polish；出错→dream-debug；完成→dream-git。
4. **默认单代理顺序执行**：节省 token、避免角色僵化；子代理委派是**可选**增强，不是默认（规避 wshobson"来回移交低效"）。
5. **进度即证据**：tasks.md 的勾选与验证记录就是进度报告，不依赖对话记忆。

## 工作流程

### 步骤 1：读取计划（输入）

- 读取 tasks.md（块、任务、验收点、依赖顺序）；
- 读取 `.dreamspec/SKILLS.md` 确定强度模式。

### 步骤 2：逐块执行（循环，动作）

对每个未完成块：

1. **读块**：明确输入、期望产物、验收点；
2. **挂载护航技能**（同 dream-spec-implement 的挂载规则）；
3. **实现**：完成本块代码/配置/测试；
4. **块级验证**：执行相关测试/构建/冒烟，确认验收点达成；失败则挂 dream-debug；
5. **原子提交**：dream-git（提交信息含块号）；
6. **勾选 tasks.md** 并附验证结果。

### 步骤 3：委派模式（可选，动作）

- 当块满足"复杂/跨领域/可并行"时（详见 references/subagent-patterns.md），可启用委派：
  1. 主代理把块拆给角色子代理（frontend/backend/tester 等）；
  2. 子代理产回结果（代码/测试/报告），主代理**验证并整合**；
  3. 整合后仍走块级验证与原子提交。
- 不满足条件时**不要委派**：单代理顺序执行更快更省。

### 步骤 4：收尾（产物）

- 全部块勾选完成后，输出执行摘要（完成块数、验证结果、遗留问题）；
- 交给 dream-review 审查 → dream-verify 验证门（无 spec 小任务按 light 冒烟即可）。

## 验收标准

- [ ] tasks.md 全部块已勾选，无跳块
- [ ] 每块通过块级验证（验证结果已记录）
- [ ] 每块完成原子提交（信息含块号）
- [ ] 委派模式（若启用）由主代理完成验证与整合，无"甩锅式"交付
- [ ] 执行摘要已输出，遗留问题已列出

## 与其他技能的衔接

- 上游：dream-plan（tasks.md）、dream-brainstorm（澄清结论）
- 护航：dream-tdd、dream-design-system、dream-ui-polish、dream-debug、dream-git
- 下游：dream-review（审查）→ dream-verify（验证门）
- 并行：dream-spec-implement（有提案时替代本技能）；委派模式参考 references/subagent-patterns.md
- 强度模式：light 仅冒烟验证（构建+运行）；balanced 逐块核心验证；rigorous 全量验证并严格记录证据

## 进阶资料

- references/subagent-patterns.md：委派模式、角色模板、适用/不适用场景（何时加载：判断是否委派时）
