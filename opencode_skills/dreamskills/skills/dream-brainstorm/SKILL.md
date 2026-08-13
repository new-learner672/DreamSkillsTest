---
name: dream-brainstorm
description: Requirements exploration and clarification. Use when the user has a vague idea, wants to think through a problem, clarify what to build, or explore options before any spec or code exists. Triggers on "需求澄清/头脑风暴/想法不清晰/要不要做/探索方案/需求分析".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Superpowers brainstorming + Product-Manager-Skills Adaptive Decision Ladder + problem-framing
---

# dream-brainstorm：需求探索与澄清

**核心思想**：先解决正确的问题，再正确地解决问题。需求模糊时禁止直接写 spec 或代码——先做苏格拉底式追问，把模糊想法澄清为可签字的意图。

## 适用与不适用

- 适用：想法模糊、需求冲突、目标不清、"帮我看看这个想法"、新技术立项
- 不适用：需求已明确（直接走 dream-spec）、纯实现任务（走 dream-plan）

## 工作流

### 1. 倾听与复述

先让用户完整表达想法，然后**用自己的话复述**核心诉求，请用户确认或纠正。禁止在复述前提建议。

### 2. Adaptive Decision Ladder（问 3-5 个定向问题）

按当前缺口选问题，一次只问 3-5 个（不搞问卷轰炸）：
- 问题框架：解决谁的什么问题？（不是"做什么功能"而是"什么 JTBD"）
- 范围：不做会怎样？最小可用是什么？
- 约束：时间/成本/兼容性/风险偏好
- 成功标准：怎么算做成了？（可量化优先）
- 反证：如果这个想法是错的，最可能错在哪？

### 3. 给出带理由的编号选项

把方向整理成 2-4 个**编号方案**，每个附"何时选它"的理由，让用户选路径。禁止只给一个方案或直接开干。

### 4. 收敛为意图简报

产出 `brainstorm/<slug>-brief.md`（见 `references/brainstorm-methods.md` 模板）：问题陈述、假设、范围（in/out/cut 三段）、验收标准草稿（AC-1 起持久编号）、成功指标（SM-1 起）、开放问题（OQ-1 起）。此简报是 dream-spec 的直接输入。

## 方法库（按场景选用，详见 references/brainstorm-methods.md）

- **问题框架画布**：Look Inward（我们有什么）/ Look Outward（用户在什么环境）/ Reframe（换个框看）
- **press-release**：先写产品发布新闻稿（标题+引言+用户证言），倒逼价值清晰
- **5 Whys**：连续追问根因，防表面需求
- **反方案**：为"什么都不做"辩护，找出必须做的理由

## 红线

- 禁止跳过追问直接写 spec/代码
- 禁止只给一个方案
- 禁止替用户做价值判断（AI 提议、人决策）
- 禁止把"实现细节"当需求问（那是 dream-plan 的事）
