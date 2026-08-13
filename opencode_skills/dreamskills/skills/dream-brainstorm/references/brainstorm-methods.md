# 需求探索方法库（dream-brainstorm 用）

## 意图简报模板（brainstorm/<slug>-brief.md）

```markdown
# Intent Brief: <slug>
- spec_revision: 1（意图实质变化时递增）

## Problem
<谁、在什么场景、遇到什么痛点；一句话能说清>

## Hypothesis
<我们相信：做什么 → 会带来什么结果 → 用什么指标验证>

## Scope
- In:  <本期做>
- Out: <明确不做>
- Cut: <以后可能做，现在砍掉>

## Acceptance Criteria（持久 ID，编号终身不变）
- AC-1: <可验证标准>
- AC-2: ...

## Success Metrics（持久 ID）
- SM-1: <指标> target: <数值>（committed / provisional: target_owner=<负责修订者>）

## Open Questions
- OQ-1: <待确认问题，指定由谁在何时前回答>

## Decision Trace
- <日期> <决策内容> <决策人> <原因>
```

## 问题框架画布（problem-framing-canvas）

1. **Look Inward**：我们已有什么能力/资产？与哪些现有功能重叠？
2. **Look Outward**：用户当前用什么替代方案？他们的环境约束是什么？
3. **Reframe**：把问题换个表述再看——"用户要更快"可能实际是"用户要少做重复操作"

## press-release 法（Amazon Working Backwards）

写一篇产品发布新闻稿（≤300 字）：
- 标题：一句话宣布产品（"<产品> 让 <人群> 终于可以 <核心收益>"）
- 引言段：问题 + 解决方案 + 一句话价值
- 用户证言（虚构）：一句具体、有场景的引用——写不出来说明价值不清晰
- 倒逼检查：写完问"读者会想买吗？"，不清晰就回炉

## 5 Whys

连续问 5 次"为什么"，直到触及根因（或确认无法再深）。规则：每层回答必须基于事实或合理推断并标注。

## 反方案（Anti-solution）

花 5 分钟为"什么都不做"辩护：维持现状的成本是多少？问题会不会自己消失？如果辩护成功，需求不成立。

## Adaptive Decision Ladder 问题库

| 缺口 | 问题示例 |
|---|---|
| 用户 | "谁在用？他们现在怎么解决这个问题？" |
| 价值 | "这个功能交付后，用户多做了什么/少做了什么？" |
| 范围 | "如果只能做一件事，哪件事价值最高？" |
| 风险 | "最坏情况下这个想法会浪费什么？" |
| 成功 | "发布 30 天后，什么数据能证明它成功了？" |
