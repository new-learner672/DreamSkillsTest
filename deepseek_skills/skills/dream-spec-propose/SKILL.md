---
name: dream-spec-propose
description: 当有新的功能需求、行为变更或跨模块重构需要落地时使用。将需求写成结构化变更提案（proposal.md、tasks.md、spec-delta.md），spec-delta 强制 Given-When-Then 可验证语句，经用户确认后进入实施。触发场景："先写 spec"、"提出变更提案"、"propose 一个需求"、"新增功能前先定规格"。
---

# 规格变更提案（dream-spec-propose）

> 定位：规格驱动（SDD）的入口。任何非平凡变更必须先提案后实施——spec 是人与 AI 的共同契约。
> 吸收思想：OpenSpec 的 propose 生命周期 + spec-kit 的规格可校验 + spec 即事实源。

## 何时使用（触发条件）

- 新功能、行为变更、跨模块重构、API/数据模型变更；
- 需求含糊时：先调用 dream-brainstorm 澄清，再回本流程。

不适用：纯拼写/格式/注释修复、一次性脚本（light 模式可跳过，在 dream-plan 中一句话说明即可）。

## 核心原则

1. **Spec as Source of Truth**：规格与代码同仓演进，定稿后的 `specs/` 是唯一事实源。
2. **变更即文档**：每次提案可评审、可追溯、可回滚（ADR 思想的落地）。
3. **小而可验**：spec-delta.md 每条必须含 Given-When-Then；验收动词必须可观测。
4. **先澄清后提案**：需求未澄清就提案是本技能的反模式。

## 工作流程

### 步骤 1：澄清需求（按需）

- 若需求有歧义（边界、规则、范围不明），先挂载 dream-brainstorm 澄清，把结论写入提案背景。

### 步骤 2：创建提案目录

`.dreamspec/changes/<id>-<slug>/`（可用 CLI：`node <dreamskills>/scripts/dream.mjs propose "标题"`）下三份文件：

| 文件 | 内容 |
|---|---|
| proposal.md | 背景、目标、非目标（本期不做）、影响面、确认状态 |
| tasks.md | 分块任务草稿（详细分块由 dream-plan 完成，此处先列粗粒度） |
| spec-delta.md | 规格增量：ADDED / MODIFIED / REMOVED，每条 GWT |

### 步骤 3：评审确认（不可跳过）

- 向用户呈现提案摘要（目标、非目标、关键 GWT、影响面）；
- 明确询问："是否确认该提案？确认后才进入实施。"
- 未确认不进入 dream-spec-implement；确认后在 proposal.md 勾选确认状态。

### 步骤 4：登记

- 更新 `.dreamspec/changes/INDEX.md`：状态 = proposed（CLI propose 自动登记）。

## 验收标准

- [ ] 三份文件齐全且符合模板（见 references/proposal-template.md）
- [ ] spec-delta.md 每条含 GWT，验收动词可观测
- [ ] 非目标已明确（防止范围蔓延）
- [ ] 用户已确认提案

## 与其他技能的衔接

- 上游：dream-bootstrap（目录初始化）、dream-brainstorm（需求澄清）
- 下游：dream-plan（分块计划）、dream-spec-implement（实施与归档）
- 强度模式：light 模式可跳过本技能，改为 dream-plan 中一句话说明需求

## 进阶资料

- references/proposal-template.md：三份文件的完整模板与示例
