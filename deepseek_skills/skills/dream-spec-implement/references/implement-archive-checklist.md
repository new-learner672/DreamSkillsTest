# 实施与归档检查清单（references）

> 本文件由 dream-spec-implement 按需加载。它把"逐块实施 + spec 合并 + 归档"的细节固化为可勾选的清单。

## 1. 逐块实施检查清单（每块循环）

```
□ 读块：明确 输入 / 期望产物 / 验收点（来自 tasks.md）
□ 类型判定并挂载护航技能：
    ├─ 含逻辑/算法/接口 → dream-tdd（先写失败测试）
    ├─ 含 UI → dream-design-system（DESIGN.md tokens）+ dream-ui-polish（反 slop 自检）
    ├─ 涉及数据/权限 → 结束后提示 dream-security-check（按强度模式）
    └─ 遇到异常行为 → dream-debug（复现→根因→修复）
□ 实现本块（最小、只做本块事，不顺手改别处）
□ 块级验证：本块相关测试通过 + 构建无破坏
□ 原子提交：dream-git，信息含块号与意图
□ 勾选 tasks.md 本块，附验证结果（命令输出/测试数）
```

## 2. spec-delta 合并规则（写入 .dreamspec/specs/）

| 标记 | 合并动作 | 示例 |
|---|---|---|
| ADDED | 在对应主题规格文件新增需求条目（保留 GWT 与验收观测点） | `specs/auth.md` 新增"密码登录"条目 |
| MODIFIED | 更新原条目：标注原行为→新行为（GWT），必要时记迁移影响 | `specs/auth.md` 修改"会话过期"时长 30→60 分钟 |
| REMOVED | 删除或标记废弃（建议保留一行"已废弃（提案 00X）"以便追溯） | `specs/auth.md` 移除"短信登录" |

合并规则：
1. 按**主题**合并：specs/ 一主题一文件（如 auth.md、payment.md），与提案 id 无关；
2. 保留 GWT 原文，可在其后补充"验收观测点"；
3. 每条合并处标注来源提案编号（如 `> 来源：提案 001`），保证 ADR 式可追溯；
4. 若 specs/ 尚无该主题文件，新建并遵循 `# 主题` → `## 需求` 的分节结构。

## 3. 归档核对表

```
□ 验证门（dream-verify）输出 PASS，证据齐全
□ spec-delta 已按上表合并进 specs/（全部 ADDED/MODIFIED/REMOVED 处理完毕）
□ 运行：node <dreamskills>/scripts/dream.mjs archive <id>
□ INDEX.md 状态已变为 archived
□ archive/<id>-<slug>/ 下三份文件完整（proposal/tasks/spec-delta）
```

> 注意：CLI 的 archive 只负责移动目录与改状态；**spec 合并是 agent 的职责**（CLI 输出也会提醒这一点）。

## 4. 常见反模式

- ❌ 跳过块级验证直接提交——"先提交后面再修"是技术债源头；
- ❌ 发现规格不合理却"将错就错"实现——必须暂停回 propose 修订；
- ❌ 一次提交塞入多个块——违背原子提交，无法单独回滚；
- ❌ 未过验证门就归档——归档意味着"规格已定稿"，之后改动要开新提案；
- ✅ 每一块结束都留下可复现的验证证据（命令 + 输出），dream-verify 直接复用。
