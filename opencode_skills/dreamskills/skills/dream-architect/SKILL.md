---
name: dream-architect
description: Architecture design and decision-making. Use when the user asks about tech stack selection, system design, refactoring strategy, module boundaries, or when an architecture decision must be recorded. Triggers on "架构/技术选型/系统设计/重构方案/模块划分".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Spec-Kit Simplicity Gate + BMAD explicit decision-making
---

# dream-architect：架构设计与决策显式化

**核心思想**：把隐含假设变成显式决策，并作为 ADR 传递给后续所有工作；人类保留最终判断权（AI 提议、人决策）。

## 适用场景

技术选型、系统设计、重构方案、模块边界、依赖方向、数据模型设计。

## 工作流

### 1. 需求澄清

- 收集约束：现有技术栈、团队能力、规模预期、非功能需求
- 歧义同样标记 `[NEEDS CLARIFICATION: ...]`

### 2. 方案探索（≥2 个备选）

对每个备选给出：思路、优点、缺点、风险、与项目宪法的符合度。
禁止只给一个方案（无对比即无决策）。

### 3. 复杂度门（Simplicity Gate）

引入任何新抽象/新依赖/新层级前，必须书面回答：
- 为什么现在需要它？（未发生的需求不算理由）
- 有没有更简单的现有方案？
- 它的成本（学习/维护/性能）是否低于收益？

答不上来 → 拒绝引入。默认选择"今天能工作的最简单方案"。

### 4. 决策记录（ADR）

写入 `specs/adr/NNNN-标题.md`：

```markdown
# ADR-NNNN: 标题
- 状态：提议（待人确认）/ 已采纳
- 背景：要解决什么问题
- 选项：方案A / 方案B（各自优缺点）
- 决策：选定方案及理由
- 后果：正面影响 / 负面影响 / 未来需回看的假设
```

### 5. 人类确认

呈现决策摘要，请求用户确认。**架构决策必须人拍板**，AI 不自动放行。

## 宪法约束速查

| 条款 | 含义 |
|---|---|
| 库优先 | 可复用逻辑先做成独立模块 |
| 反抽象 | 抽象 ≤3 层，每层须有书面理由 |
| 最小实现 | 不为假设的未来需求设计 |
| 集成优先 | 验证走真实环境，不堆 mock |

## 红线

- 禁止无对比的单方案决策
- 禁止为"未来可能的需求"引入复杂度
- 禁止在未获用户确认前实施架构级改动
