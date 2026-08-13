# 提案模板与示例（references）

> 本文件由 dream-spec-propose 按需加载。

## 1. proposal.md 模板

```markdown
# <标题>（提案 <编号>）

## 背景
（为什么做？当前痛点/机会，附澄清结论）

## 目标
- （可验证的目标，与 spec-delta 的 GWT 对应）

## 非目标（本期不做）
- （显式排除项，防范围蔓延）

## 影响面
- 涉及模块/文件：
- 风险点与缓解：

## 状态
- [ ] 已确认（确认后进入 dream-spec-implement）
```

## 2. spec-delta.md 模板

```markdown
# <标题> —— 规格增量（提案 <编号>）

> 每条必须含 Given-When-Then；标记 ADDED / MODIFIED / REMOVED。

## ADDED
### 需求：<名称>
- Given：（前置条件）
- When：（动作）
- Then：（可验证的预期结果）
- 验收观测点：（命令/页面/接口——如何验证这条）

## MODIFIED
### 需求：<名称>
- 原行为：
- 新行为（GWT）：
- 迁移影响：

## REMOVED
### 需求：<名称>
- 移除理由：
- 影响范围与回退方案：
```

## 3. 示例（用户登录，节选）

```markdown
## ADDED
### 需求：密码登录
- Given：用户已注册，邮箱与密码正确
- When：点击"登录"
- Then：跳转首页，导航栏显示用户名
- 验收观测点：E2E 用例 login-success；登录接口返回 200 + 会话 Cookie

### 需求：错误提示
- Given：密码错误
- When：点击"登录"
- Then：表单下方显示"邮箱或密码错误"，输入框红色描边，不跳转
- 验收观测点：E2E 用例 login-failure；接口返回 401

### 需求：会话过期
- Given：已登录且会话超过 30 分钟未活动
- When：发起任意受保护请求
- Then：返回 401，前端跳转登录页并提示"会话已过期"
- 验收观测点：E2E 用例 session-expiry（可注入过期 Cookie）
```

## 4. 常见反模式

- ❌ "Then：用户体验良好"——不可观测，必须改为可验证表述；
- ❌ 提案含"顺便修一下 XX"——无关变更拆新提案；
- ❌ 非目标留空——范围蔓延是 vibe coding 的头号杀手；
- ✅ 每条 GWT 对应一个明确的验收观测点，验证门（dream-verify）据此取证。
