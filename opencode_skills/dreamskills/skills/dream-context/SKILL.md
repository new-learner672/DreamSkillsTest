---
name: dream-context
description: Persistent context, session recovery, and correction memory. Use when the user wants to survive context clearing, resume a long task, save lessons learned, or prevent the agent from losing the plan. Triggers on "上下文丢失/恢复会话/继续上次/记住教训/纠正沉淀/防遗忘".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: planning-with-files three-file plan + pro-workflow correction memory + caveman output economy
---

# dream-context：持久化上下文与纠正记忆

**核心思想**：Context Window = RAM（易失、有限），Filesystem = Disk（持久、无限）。重要状态永远写盘；每轮从磁盘重读关键状态，防腐化、防压缩丢失、防重复犯错。

## 1. 三文件计划（复杂任务必建）

任务 ≥3 步或预计跨多轮时，创建于项目根（或 `.planning/YYYY-MM-DD-slug/`）：

| 文件 | 职责 | 更新时机 |
|---|---|---|
| `task_plan.md` | 阶段 + 复选框进度（恢复锚点） | 每完成一步立即更新 |
| `findings.md` | 研究笔记、决策与理由（追加式） | 每次决策/发现 |
| `progress.md` | 会话日志、测试结果、错误记录 | 每轮结束前 flush |

铁律：`/clear` 或压缩前**必须 flush 三文件**；新会话先读三文件再动手。

## 2. 每轮重注入（防上下文腐化）

每轮开始（或收到新指令后）读回 `task_plan.md` 的浓缩块：
- 当前目标（一句话）
- 下一步动作（一个）
- 当前阶段 + 进行中阶段全文
- 最近 3 条决策/发现

长任务后期这是对抗"早期指令被挤出注意力"的唯一手段。

## 3. 会话恢复流程

新会话进入目录且检测到三文件时：
1. 读 task_plan.md → 定位最后完成项
2. 读 progress.md → 提取其后未完成的工作与错误
3. 输出 catchup 摘要（≤10 行）请用户确认后继续
4. 无三文件但目录有未提交改动 → 先 `git status` 从 diff 推断状态

## 4. 纠正沉淀（自纠正记忆）

- 用户每次纠正，问一句"要不要把这条规则沉淀到 `.dreamskills/learnings.md`？"
- 格式：`## R-NN: <规则名>` + 触发场景 + 规则内容 + 首次纠正日期
- 每轮开始时**自动加载 learnings.md** 中与当前任务相关的规则
- 规则冲突时以最新为准并更新旧条目

## 5. 输出经济（token 纪律）

- 结论先行，删除重复解释；代码/命令/报错保持逐字节精确
- 不主动总结刚做完的事（除非用户要求）；用勾选列表替代长段落
- 信息冗余时用表格；删除"好的，我来……"式开场白

## 红线

- 禁止把关键状态只存在对话里不写盘
- 禁止跳过 catchup 摘要直接"凭感觉继续"
- 禁止重复犯 learnings.md 已记录的错
- 禁止 /clear 前不 flush 三文件
