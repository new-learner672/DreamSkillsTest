---
name: dream-review
description: Code review before merge. Use when the user wants a review of a change, pre-merge check, or quality assessment of finished work. Triggers on "评审/review/合并前检查/检查代码".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Superpowers two-phase review + Waza fresh-context adversarial review
---

# dream-review：两阶段对抗式代码评审

**核心思想**：评审者用**全新上下文**启动——不读实现者的自我总结，避免自我确认偏差；评审分两阶段：先问"做对了吗"，再问"做得好吗"。

## 硬约束

- 全新上下文：仅以「diff + delta specs + 任务清单」为输入，不看实现过程的任何自述
- 每个问题必须给出**证据位置**（文件:行号），禁止"感觉不好"
- 评审结论只有三种：通过 / 需修改（列出问题）/ 拒绝（方向性错误，回 dream-spec）

## 阶段一：规格符合性（Spec Compliance）

逐条对照 delta specs 的 Scenario：
- 每条 Requirement 是否有对应实现与测试？
- 每个 Scenario 的 WHEN/THEN 是否被真实满足（运行验证，而非读代码推断）？
- 是否有规格外行为（scope creep）混入？

## 阶段二：代码质量（Code Quality）

- SOLID：单一职责、依赖方向是否正确
- 复杂度：嵌套 ≤3 层、函数 ≤50 行（合理例外须说明）
- 命名：是否揭示意图（而非实现细节）
- 边界：空值/并发/错误路径/超大输入是否处理
- 测试质量：测试是否断言实质行为（对照 dream-tdd 反模式）
- 安全：注入、越权、敏感信息（对照 dream-verify 清单）

## 接收评审（被评审方行为规范）

当本变更被评审时：
1. 逐条回复评审意见：同意并修改 / 不同意并说明理由（给证据）
2. 不同意时先复述对方观点再反驳，禁止直接辩护
3. 修改后用最小 diff 呈现，方便复审者定位
4. 评审通过后由 dream-git 执行分支收尾（评审者不自己合并）

## 输出

```markdown
## 评审结论：需修改
### 规格符合性
- [ ] Scenario: User toggles dark mode —— 实现缺失"跟随系统偏好"分支（src/theme.tsx:34）
### 代码质量
- [ ] ThemeProvider 混合了存储与状态职责（src/theme.tsx:12）
- [ ] 测试断言只检查类名未验证持久化（src/__tests__/theme.test.ts:22）
```

修改完成后由**同一评审者复查**（上下文延续），直至通过。

## 红线

- 禁止评审者与实现者为同一上下文（必须先开新上下文再评审）
- 禁止无证据位置的评审意见
- 禁止因"改起来麻烦"放行红灯问题
