# 治理目录与文件约定详解（references）

> 本文件由 dream-bootstrap 按需加载。它定义了 Dreamskills 全部技能共享的文件契约。

## 1. .dreamspec/ 目录约定

| 路径 | 含义 | 写入者 | 读取者 |
|---|---|---|---|
| `specs/*.md` | 已定稿规格（唯一事实源），一主题一文件 | dream-spec-implement（archive 时合并） | 所有技能 |
| `changes/INDEX.md` | 提案索引（编号/标题/状态：proposed → implementing → archived） | propose/implement | status 查看 |
| `changes/<id>-<slug>/proposal.md` | 变更提案：背景/目标/非目标/影响面 | dream-spec-propose | plan/implement |
| `changes/<id>-<slug>/tasks.md` | 分块实施计划（≤半天/块、带验收点） | dream-plan | dream-execute/implement |
| `changes/<id>-<slug>/spec-delta.md` | 规格增量：ADDED/MODIFIED/REMOVED + Given-When-Then | dream-spec-propose | implement/verify |
| `archive/<id>-<slug>/` | 已归档变更（历史与审计） | dream-spec-implement | review/追溯 |
| `SKILLS.md` | 强度模式 + 启用技能 + 豁免声明 | dream-bootstrap | 所有技能裁剪 |

## 2. 编号规则

- 三位数字递增（001、002、…），CLI 自动分配；
- slug 为标题的小写连字符化（中文标题转拼音或英文均可）；
- 归档后编号不复用——保证审计可追溯。

## 3. Given-When-Then（GWT）写法要求

每条规格增量必须可验证（这是 spec-kit"机器可校验"思想的轻量实现）：

```
### 需求：用户登录
- Given：用户已注册且输入正确邮箱+密码
- When：点击"登录"
- Then：跳转首页，导航栏显示用户名，会话写入 HttpOnly Cookie
```

验收动词必须可观测（跳转/显示/写入/返回/不出现），禁止"体验良好"等不可验证表述。

## 4. 强度模式声明格式（.dreamspec/SKILLS.md）

```markdown
- 强度模式：**balanced**
- 启用技能：（逗号分隔的完整技能名清单）
- 豁免/冲突声明：本项目以团队既有 lint 规范为准
```

所有技能读取该文件决定裁剪；模式切换需在提案中说明（走 dream-spec-propose 流程）。

## 5. 与 CLAUDE.md 的分工

- CLAUDE.md：项目事实 + 工作流引用（常驻注入，随项目进 git）；
- .dreamspec/：规格与提案（有状态、有生命周期，由技能与 CLI 管理）；
- DESIGN.md：设计契约（tokens，供设计层技能执行）。
三者不重复：事实进 CLAUDE.md，变更进 .dreamspec，审美进 DESIGN.md。
