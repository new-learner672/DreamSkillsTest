---
name: dream-research
description: Research and technical investigation. Use when the user wants to research a technology, compare libraries, investigate options, or gather evidence before a decision. Triggers on "调研/研究/技术选型/对比库/查资料/评估方案".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: BMAD research agent + Spec-Kit research.md + anti-hallucination source discipline
---

# dream-research：调研与技术选型

**核心思想**：调研的价值在证据，不在篇幅。每个结论必须挂来源；查不到就明说，禁止编造。

## 六阶段流程

1. **定义问题**：要回答什么问题？写 2-5 个具体研究问题（RQ-1...）
2. **收集**：官方文档 > 源码 > 权威文章 > 社区实测；多源交叉验证
3. **筛选**：优先一手资料；二手资料标注来源；过时信息标注时间并核实
4. **分析**：对比矩阵（功能/性能/维护活跃度/许可/社区/学习成本）
5. **合成**：回答每个 RQ，一句话结论 + 证据链接
6. **落盘**：写入 `research/<slug>.md`，供 dream-architect 的 ADR 引用

## 防幻觉纪律（硬规则）

- 每条事实性结论附来源（URL + 关键引用句）
- 不确定的信息标注 `[未证实]`；查不到的信息标注 `[未找到]`
- **禁止**凭记忆编造 API 签名、版本号、benchmark 数据——必须查到原文
- 多源冲突时并列呈现，不选边站（决策是 dream-architect 的事）

## 技术选型评估矩阵模板

| 维度 | 权重 | 方案A | 方案B | 方案C |
|---|---|---|---|---|
| 功能覆盖 | | | | |
| 维护活跃度（stars/commit 频率/issue 响应） | | | | |
| 许可协议 | | | | |
| 性能/资源占用 | | | | |
| 学习成本/团队熟悉度 | | | | |
| 生态与工具链 | | | | |

评分 1-5 + 依据；总分供 dream-architect 决策参考（调研不决策）。

## 输出格式

```markdown
# Research: <主题>
## RQ-1: <问题>
- 结论: <一句话>
- 证据: <来源1（URL+引用）> <来源2>
## RQ-2: ...
## 对比矩阵
## 未决问题（留给 ADR）
```

## 红线

- 禁止无来源的事实结论
- 禁止编造 benchmark/API/版本号
- 禁止调研直接替用户决策（产出供决策的选项与证据）
- 禁止用"很多人说/大家都知道"替代具体来源
