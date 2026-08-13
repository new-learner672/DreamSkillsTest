---
name: dream-plan
description: Task planning and decomposition. Use when the user wants to break work into executable tasks, plan implementation steps, or turn a spec/proposal into an ordered task list. Triggers on "拆任务/做计划/规划实现/任务清单".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Superpowers writing-plans + Task-Master PRD decomposition
---

# dream-plan：计划与任务拆解

**核心思想**：任务粒度决定 AI 执行质量——2-5 分钟粒度、可独立验证、依赖显式、可并行标记。

## 工作流

### 1. 输入

读取变更的 delta specs（或用户需求），明确每个 Requirement/Scenario 的验收标准。

### 2. 拆解规则

- **粒度**：每个任务 2-5 分钟可完成、产出可独立验证（测试/运行/视觉检查）
- **排序**：测试与契约先行（契约 → 测试 → 实现），参照 V 模型分层
- **依赖**：显式声明依赖链；无依赖任务标 `[P]`（可并行）
- **任务描述格式**：动词开头 + 明确产出物 + 验收标准

### 3. 输出格式（写入 tasks.md）

```markdown
## Tasks
- [ ] [P] 1. 定义 ThemeContext 类型与单测
      - 验收：类型通过编译，单测覆盖 context 默认值
- [ ] [P] 2. 实现 useTheme hook（依赖 1）
- [ ] 3. 接入切换按钮（依赖 1,2）
      - 验收：点击按钮界面即时切换
- [ ] 4. 持久化到 localStorage（依赖 3）
      - 验收：刷新后主题保持；跟随系统偏好
```

### 4. 状态管理

- 纯文件状态（不依赖 MCP/外部工具）：勾选 `[x]` 即完成
- **持久化与防腐化**：任务 ≥3 步时按 dream-context 建三文件（task_plan.md/findings.md/progress.md）同步进度；每轮开始重读计划浓缩块（目标/下一步/当前阶段/最近 3 条决策）；`/clear` 前 flush
- 每完成一个任务向用户报告：完成内容 + 验证证据
- 计划可随实施调整，但调整须说明理由并同步更新 tasks.md 与三文件

## 红线

- 禁止单个任务超过 5 分钟粒度（太大 → 继续拆）
- 禁止任务无验收标准
- 禁止"顺便做"计划外的事（scope 纪律）
- 依赖链必须无环
