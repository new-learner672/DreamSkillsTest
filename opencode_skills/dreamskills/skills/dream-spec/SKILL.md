---
name: dream-spec
description: Spec-driven change management. Use when the user wants to create a change proposal, add/modify requirements, start a new feature, archive a completed change, or run spec-driven development. Triggers on "创建变更/新功能/提案/需求/归档/规格".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: OpenSpec delta format + Spec-Kit constitution ideas
---

# dream-spec：规格驱动的变更管理

**核心思想**：规格是单一事实来源（代码服务于规格）；变更是提案（人先审后写代码）；格式用 delta（ADDED/MODIFIED/REMOVED），天然支持演进与 diff 评审。

## 目录结构

```
specs/                      # 现状规格（系统的真实状态）
  constitution.md           # 项目宪法（轻量 6 条）
  adr/                      # 架构决策记录（dream-architect 产出）
changes/                    # 进行中的变更提案
  <change-name>/
    proposal.md             # 意图层：为什么做、改什么、影响范围（含 AC/SM 持久 ID）
    specs/                  # delta 规格（相对现状的差异）
      <capability>/spec.md
    tasks.md                # 实施任务清单（dream-plan 细化）
archive/                    # 已归档变更（YYYY-MM-DD-<name>/）
research/                   # 调研产出（dream-research 落盘）
brainstorm/                 # 意图简报（dream-brainstorm 落盘）
```

## 工作流

### 1. 初始化（首次使用）

创建上述目录；写入 `specs/constitution.md`，默认 6 条（可随项目修订，修订须注明理由）：
1. 测试先行（先写失败测试，经用户批准后再实现）
2. 库优先（可复用逻辑先做成独立模块，再被调用）
3. 反抽象（抽象 ≤3 层；新增抽象必须书面说明必要性）
4. 证据优于断言（完成声明必须附带可验证证据）
5. 最小实现（不过度设计，不为假设的未来需求写代码）
6. 集成优先（真实环境验证优先于 mock）

### 2. 创建变更（propose）

1. 需求不清晰时，先走 dream-brainstorm 产出意图简报；有简报则直接引用
2. 确定 change 名称（kebab-case，动词开头，如 `add-dark-mode`）
3. 写 `proposal.md`（意图层，spec_revision 从 1 起，意图实质变化才递增）：
   - **Problem**：谁在什么场景遇到什么痛点
   - **Hypothesis**：我们相信做什么会带来什么结果
   - **What Changes**：改动清单
   - **Scope**：In（本期做）/ Out（明确不做）/ Cut（以后可能做）
   - **Acceptance Criteria**：`AC-1` 起持久编号（终身不变，证据挂到 ID 上）
   - **Success Metrics**：`SM-1` 起，target 标 committed/provisional（provisional 必须写 target_owner）
   - **Impact**：影响范围与风险
4. 写 delta specs，格式：

```markdown
## ADDED Requirements
### Requirement: Theme selection
#### Scenario: User toggles dark mode
- **WHEN** 用户点击主题切换按钮
- **THEN** 界面切换为暗色并持久化选择
```

5. 只写 WHAT/WHY，不写 HOW（技术方案属于 dream-plan 与 dream-architect）
6. 任何歧义必须写 `[NEEDS CLARIFICATION: 问题描述]`，**禁止猜测**
7. 生成初步 `tasks.md`（粗粒度，由 dream-plan 细化）

### 2b. 意图防漂移

- 实施中意图若变：更新 proposal.md 并递增 spec_revision，旧证据（测试/评审）标注对应版本
- 完成声明前 check：`AC-x` 全部有证据？`SM-x` 有测量？spec 自提案后是否已变（变了须按新版本重新核对）？

### 3. 人审门（CONFIRM）

向用户展示提案摘要，**必须获得明确确认后才进入实施**。用户否决则根据反馈修订 proposal 与 delta specs。

### 4. 实施（apply）

交给 dream-plan + dream-tdd 执行；过程中需求变更时同步更新 delta specs。

### 5. 归档（archive）

变更完成后：
1. 将 delta 合并进 `specs/`（ADDED 追加、MODIFIED 替换、REMOVED 删除）
2. 移动变更目录到 `archive/YYYY-MM-DD-<name>/`
3. 确认 `specs/` 始终反映系统**当前真实状态**
4. 关联产物（ADR、research）保留在各自目录，proposal 中互相引用

## 红线

- 禁止跳过人审门直接写代码
- 禁止在 spec 里写技术实现细节
- 禁止猜测需求（歧义必须标记）
- `specs/` 与代码不一致时，以 spec 为准并修正代码
- 意图实质变化禁止不改 spec_revision
- 无 AC 证据、无 SM 测量的变更禁止归档
