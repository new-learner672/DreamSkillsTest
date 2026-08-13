---
name: dream-spec-implement
description: 当变更提案已确认、tasks.md 分块计划已就绪、需要把规格落成代码时使用。按 tasks.md 逐块实施（不跳块），每块挂载护航技能（逻辑→dream-tdd；UI→dream-design-system/dream-ui-polish；出错→dream-debug），每块完成做原子提交（dream-git）；全部完成且验证通过后，把 spec-delta 合并进 .dreamspec/specs/ 并归档（node dream.mjs archive <id>）。实施中发现规格不合理时暂停并回 dream-spec-propose 修订（变更闭环）。触发场景："实施这个提案"、"按规格实施"、"implement 提案"、"开始开发"。
---

# 按规格实施与归档（dream-spec-implement）

> 定位：把已确认的规格（spec-delta）逐块变成代码与测试，并在验证通过后合并归档——实施过程的唯一入口。
> 吸收思想：OpenSpec 的 implement/archive 生命周期 + spec-kit 的"按 spec 实施"。

## 何时使用（触发条件）

- 提案已确认（proposal.md 状态勾选"已确认"）、tasks.md 已分块；
- 用户说"实施这个提案""按规格实施"；
- 上一流程（dream-plan）已产出可执行的分块计划。

不适用：无提案的一次性小任务（走 light 模式 dream-plan → dream-execute → dream-verify 最小链路）；提案未确认时严禁实施。

## 核心原则

1. **按 spec 实施，不自由发挥**：代码必须对得上 spec-delta 的 GWT；发现规格本身不合理，是规格的问题，不是凑合实现的理由。
2. **逐块实施，绝不跳块**：严格按 tasks.md 顺序推进，每块有独立验收点。
3. **护航技能按块挂载**：逻辑→dream-tdd；UI→dream-design-system + dream-ui-polish；出错→dream-debug；完成→dream-git。
4. **归档是终点不是起点**：只有验证门（dream-verify）通过后，才能合并 spec 并归档。
5. **变更闭环**：规格与实现冲突时，暂停回 dream-spec-propose 修订，而不是悄悄改代码。

## 工作流程

### 步骤 1：前置检查（输入）

- [ ] proposal.md 已确认、spec-delta.md GWT 完整、tasks.md 已分块（每块≤半天、带验收点）。
- [ ] 读取 `.dreamspec/SKILLS.md` 确定强度模式（rigorous 全量 / balanced 默认 / light 轻量）。

### 步骤 2：逐块实施（循环，动作）

对 tasks.md 中每一块（按顺序，不跳块）：

1. **读块**：明确本块的输入、期望产物、验收点。
2. **挂载护航技能**：
   - 含逻辑/算法/接口 → 先挂 dream-tdd（先写失败测试）；
   - 含 UI → 挂 dream-design-system（遵循 DESIGN.md tokens）+ dream-ui-polish（完成后反 slop 自检）；
   - 遇到行为异常 → 挂 dream-debug（复现→根因→修复）。
3. **实现**：按护航技能流程完成本块代码与测试。
4. **块级验证**：跑本块相关测试/构建，确认验收点达成。
5. **原子提交**：挂 dream-git，提交信息含块号（如 `001 块2: 登录页面 UI`）。
6. **勾选 tasks.md**：标记本块完成并附验证结果。

### 步骤 3：规格冲突处理（动作）

- 实现中发现 spec-delta 与真实需求/技术现实冲突：
  1. **暂停实施**，不继续硬做；
  2. 回 dream-spec-propose 提出修订（MODIFIED 或 REMOVED）；
  3. 用户确认修订后，更新 tasks.md 对应块，再继续实施。

### 步骤 4：全量验证（动作）

- 全部块完成后，交给 dream-review 审查、dream-verify 走验证门（证据：测试/构建/E2E/性能/安全，按强度模式取集）。
- FAIL 时回到对应步骤修复，不得进入归档。

### 步骤 5：合并与归档（产物）

- 验证 PASS 后，把 spec-delta.md 的 ADDED / MODIFIED / REMOVED **合并进 `.dreamspec/specs/`**（一主题一文件，保持 GWT 语句）；
- 运行 `node <dreamskills>/scripts/dream.mjs archive <id>` 归档提案到 `archive/`；
- 确认 INDEX.md 状态变为 archived。

## 验收标准

- [ ] tasks.md 全部块已勾选，且每块附块级验证结果
- [ ] 每块完成一次原子提交，提交信息含块号
- [ ] 验证门 PASS（判决附证据）；FAIL 已回到对应环节修复
- [ ] spec-delta 已合并进 .dreamspec/specs/，归档完成（INDEX 状态 archived）
- [ ] 实施期间无"跳过规格、自由发挥"的变更

## 与其他技能的衔接

- 上游：dream-spec-propose（已确认提案）、dream-plan（分块计划）、dream-brainstorm（澄清结论）
- 护航（按块挂载）：dream-tdd、dream-design-system、dream-ui-polish、dream-debug、dream-git
- 下游：dream-review（审查）→ dream-verify（验证门，通过后才可归档）
- 回环：规格冲突时回 dream-spec-propose 修订
- 强度模式：light 模式不经过本技能（改用 dream-execute）；balanced 为常规路径；rigorous 增加归档前全量证据核对

## 进阶资料

- references/implement-archive-checklist.md：逐块实施检查清单、spec-delta 合并规则与归档核对表（实施前加载）
