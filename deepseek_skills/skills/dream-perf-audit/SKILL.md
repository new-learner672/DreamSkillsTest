---
name: dream-perf-audit
description: 当变更涉及性能敏感路径（列表页、首屏、接口、大数据渲染）或发布前需要性能保障时使用。先测基线再优化再复测，指标用 Lighthouse 性能分、Core Web Vitals（LCP/INP/CLS）与接口时延，不达标或负向变更视为 FAIL 证据，优化手段从高 ROI 开始。触发场景："性能审计"、"优化性能"、"页面卡顿"、"首屏太慢"、"Lighthouse 检查"、"性能退化"。
---

# 性能审计护栏（dream-perf-audit）

> 定位：验证层的性能证据源。性能是质量门的一部分，不达标或负向变更 = FAIL。
> 吸收思想：performance-audit-skill（Lighthouse/CWV 指标化）+ Speed-Guardrails（强制验证后再交付的质量门理念）。

## 何时使用（触发条件）

- 性能敏感变更：列表页、首屏、接口、大数据渲染；
- 发布前（rigorous 档每次交付必测）；
- 用户报告性能问题（卡顿、首屏慢）。

不适用：纯文档/文案变更；light 模式跳过（豁免需在 .dreamspec/SKILLS.md 记录）。

## 核心原则

1. **先测基线，再优化，再复测**：没有基线就没有"变好"的结论。
2. **指标可度量**：Lighthouse 性能分 + CWV（LCP/INP/CLS）+ 接口时延，全部留数值。
3. **不达标或负向变更 = FAIL 证据**：性能门不过，验证门不过。
4. **优化从高 ROI 开始**：图片 → 缓存 → 懒加载 → 分包，逐项验证收益。
5. **结果写文件**：达标或显式列入性能债务（rigorous 档不允许债务）。

## 工作流程

### 步骤 1：测基线（优化前必做）

- 对目标页面/接口跑 Lighthouse 与接口时延测量，记录数值快照（性能分、LCP/INP/CLS、时延）。

### 步骤 2：定位瓶颈

- 按 references/cwv-thresholds.md 的诊断对照表，把超标指标映射到常见原因。

### 步骤 3：实施优化

- 按 ROI 顺序：图片压缩/格式（WebP/AVIF）→ 缓存策略（HTTP 缓存/CDN）→ 懒加载/虚拟列表 → 代码分包/预加载；
- 每步复测单项指标，验证收益。

### 步骤 4：复测对比

- 重跑基线测量，记录 delta；负向变更（指标变差）须回滚或说明原因。

### 步骤 5：输出报告

- 写入 `.dreamspec/changes/<id>/perf-report.md`：基线/复测数值对比 + 结论（达标 / 债务），作为 dream-verify 的 E4 证据。

## 验收标准

- [ ] 有基线测量记录（数值快照）
- [ ] 指标达标（Lighthouse ≥90、CWV 绿区、接口时延在约定内）或明确列入性能债务
- [ ] 负向变更已回滚或有书面原因
- [ ] perf-report.md 已写入提案目录

## 与其他技能的衔接

- 上游：dream-spec-implement / dream-execute（实施产出）
- 下游：dream-verify（提供 E4 性能证据）
- 场景配方：perf-audit（基线）→ plan → execute → perf-audit（复测）→ verify
- 强度模式：rigorous 每次交付 / balanced 性能敏感变更 / light 跳过（记录豁免）

## 进阶资料

- references/cwv-thresholds.md：CWV 阈值表与诊断对照（指标超标→常见原因→修复手段，审计时加载）
