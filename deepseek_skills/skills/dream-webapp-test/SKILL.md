---
name: dream-webapp-test
description: 当变更含 UI 交互、需要验证真实浏览器行为，或用户要求"浏览器验证"时使用。用 Playwright 或浏览器工具打开真实应用（而非只看代码），测试用例从 spec-delta 的 Given-When-Then 派生，覆盖关键流程与错误路径，记录通过数/失败数及失败截图。触发场景："浏览器验证"、"E2E 测试"、"打开应用看看"、"验证页面功能"、"前端测试"。
---

# 真实浏览器功能验证（dream-webapp-test）

> 定位：验证层的浏览器证据源。把 spec-delta 的 GWT 变成真实浏览器里的可观测行为。
> 吸收思想：anthropics 的 webapp-testing（打开应用本身验证）+ vibetest（在真实环境验证，而非只看代码）。

## 何时使用（触发条件）

- 含 UI/交互的变更（balanced 档关键流程必做）；
- 表单、导航、状态流转、权限页面等可交互场景；
- 用户要求"打开应用看看 / 浏览器验证"。

不适用：纯后端无 UI 变更（由单元/接口测试覆盖）；light 模式冒烟即可（启动+首页可达）。

## 核心原则

1. **打开应用本身验证**：用真实浏览器驱动，不靠读代码推断行为。
2. **用例从 GWT 派生**：一条 spec-delta 的 Given-When-Then ≈ 至少一条 E2E 用例。
3. **关键流程 + 错误路径都覆盖**：happy path 全绿不算完，失败/异常路径必须测。
4. **结果必须可追溯**：通过数/失败数 + 失败截图 + 失败原因。
5. **失败回到实现修复**：不掩盖失败，回到 dream-spec-implement / dream-debug 修复后重测。

## 工作流程

### 步骤 1：派生用例清单

- 读取 spec-delta.md，逐条 GWT 映射为 E2E 用例；
- 补充错误路径：必填缺失、格式错误、越权访问、会话过期、网络失败；
- 无 spec 的小任务（light）：按用户描述的关键路径列冒烟用例。

### 步骤 2：启动真实环境

- 启动应用（dev server 或已部署环境），确认可访问 URL。

### 步骤 3：逐用例执行

- 用 Playwright（片段见 references/playwright-snippets.md）或浏览器工具操作与断言；
- 失败即截图，记录步骤与期望/实际。

### 步骤 4：汇总结果

- 统计：总用例 / 通过 / 失败；失败逐条附原因。

### 步骤 5：输出报告

- 写入 `.dreamspec/changes/<id>/e2e-report.md`，作为 dream-verify 的 E3 证据。

## 验收标准

- [ ] 用例覆盖 spec-delta 全部关键 GWT（含错误路径）
- [ ] 在真实浏览器中执行（非静态代码检查）
- [ ] 记录通过数/失败数，失败含截图与原因
- [ ] e2e-report.md 已写入提案目录

## 与其他技能的衔接

- 上游：dream-spec-propose（GWT 来源）、dream-spec-implement（可运行产物）、dream-tdd（单元层先过）
- 下游：dream-verify（提供 E3 浏览器 E2E 证据）
- 强度模式：rigorous 全量关键+边界 / balanced 关键流程 / light 冒烟（启动+首页）

## 进阶资料

- references/playwright-snippets.md：常用 Playwright 代码片段（启动/断言/等待/截图/移动端视口，编写用例时加载）
