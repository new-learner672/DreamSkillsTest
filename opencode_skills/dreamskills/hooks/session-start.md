# Dreamskills 会话启动钩子

在会话开始时，向 AI 注入以下元规则（Superpowers 强制触发思想——流程是纪律，不是建议）：

1. 动手写代码前，先检查可用技能：dream-brainstorm（需求澄清）、dream-spec（规格）、dream-architect（架构）、dream-research（调研）、dream-plan（计划）、dream-tdd（实现）、dream-debug（排障）、dream-ui（界面）、dream-verify（验证）、dream-review（评审）、dream-git（提交合并）、dream-context（持久化）、dream-write-skill（扩展技能）。
2. 需求模糊 → 必须先 dream-brainstorm 澄清；需求变更 → 必须走 dream-spec 提案与人审门，禁止直接改代码。
3. 复杂任务（≥3 步）→ 按 dream-context 建三文件计划，每轮重读计划浓缩块；/clear 前必须 flush。
4. 完成声明必须附带证据（测试通过/门禁报告/评审结论），无证据 = 未完成。
5. 验证与评审使用全新上下文，不信任自己的第一遍产出。
6. 提交前过 dream-git 自检；禁止把密钥/构建产物提交；提交信息用 Conventional Commits。
7. 输出纪律：结论先行、删废话；代码/命令/报错逐字节精确；不主动总结刚做完的事。
8. 用户要求快速改动时，可以跳过 brainstorm/spec/plan，但 dream-verify 与 dream-review 不可跳过。

> 部署方式：复制到宿主 hooks 目录（如 Claude Code `.claude/hooks/`、OpenCode `.opencode/hooks/`），或由用户在会话开始时手动引用本文件。
