---
name: dream-review
description: 当变更（代码/配置/文档）实现完成后、进入验证门之前需要把关时使用。按多维 checklist 审查变更的正确性、安全性、可维护性、性能与规格一致性，问题分级为阻断（必须修复）与建议（记录即可）两级，输出审查报告写入提案目录。触发场景："审查这次变更"、"code review"、"检查代码"、"提交前把关"、"review 一下"。
---

# 变更代码审查（dream-review）

> 定位：验证门的前置把关。变更完成 → 审查 → 阻断清零 → 才允许进入 dream-verify。
> 吸收思想：superpowers 的 code-review（问题分级）+ anthropics 官方 code-review（多维 checklist 审查）。

## 何时使用（触发条件）

- 变更（代码/配置/文档）实现完成、进入 dream-verify 之前；
- 任何将被归档、合并或交付的变更；
- 重构、安全加固、跨模块改动等高影响变更（强制）。

不适用：纯探索性原型（light 模式可简化为对照 spec 抽查）；尚未完成的中间代码（先完成再审查）。

## 核心原则

1. **审查是交付前的最后一道人工级把关**：不是找茬，是防"假完成"的第一道闸。
2. **多维审查**：正确性 / 安全 / 可维护性 / 性能 / 与 spec 一致性，逐维过检。
3. **问题两级**：阻断（必须修复，否则不进入验证门）/ 建议（记录即可，不阻塞）。
4. **对照 spec 审查**：逐条核对 spec-delta 的 GWT 是否被真实实现且可观测。
5. **审查结果写文件**：报告入提案目录，成为 dream-verify 的前置输入。

## 工作流程

### 步骤 1：收集上下文

- 读取提案：`.dreamspec/changes/<id>/proposal.md`、`spec-delta.md`（GWT 清单）、`tasks.md`（完成情况）；
- 收集本次变更的 diff / 新增文件清单。

### 步骤 2：逐维审查

- 按 references/checklist.md 的五维度清单逐项检查（正确性/安全/可维护性/性能/spec 一致性）；
- 每项记录：通过 / 发现问题（附文件与行号）。

### 步骤 3：问题分级

- **阻断**：功能错误、安全漏洞、spec 违约、破坏性回归——必须修复；
- **建议**：风格、可读性、潜在优化——记录即可。

### 步骤 4：输出审查报告

- 写入 `.dreamspec/changes/<id>/review.md`：问题清单（分级）+ 修复要求。

### 步骤 5：处理阻断项

- 回到对应技能（dream-spec-implement / dream-execute / dream-debug）修复；
- 修复后重跑本技能复核；阻断项清零后才可进入 dream-verify。

## 验收标准

- [ ] 审查报告已写入提案目录（review.md）
- [ ] 五维度全部过检（含与 spec-delta GWT 逐条对照）
- [ ] 阻断项清零（或明确豁免原因并记录）
- [ ] 建议项已记录（不阻塞交付）

## 与其他技能的衔接

- 上游：dream-spec-implement / dream-execute（实施产出）、dream-tdd（测试证据）、dream-debug（修复）
- 下游：dream-verify（验证门收口，仅阻断项清零后进入）
- 强度模式：rigorous 逐维全检 / balanced 全维度但建议项从简 / light 对照 spec 抽查 + 只查阻断级问题

## 进阶资料

- references/checklist.md：五维度完整审查清单（含检查点与示例，审查时加载）
