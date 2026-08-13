---
name: dream-git
description: Git workflow discipline. Use when the user wants to create branches, worktrees, commit changes, craft commit messages, merge, or finish a development branch safely. Triggers on "提交/commit/分支/branch/worktree/合并/merge/提交信息".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Superpowers git-worktrees + finishing-a-development-branch + conventional commits
---

# dream-git：Git 工作流纪律

**核心思想**：一次变更一个分支，隔离实验保护主干；提交是可追溯的规格单元；合并前必须过门禁。

## 工作流

### 1. 分支策略

- 每个变更（dream-spec 的 change）一个分支：`feat/<change-name>`、`fix/<change-name>`、`refactor/<change-name>`
- 分支从最新 main/master 切出；保持分支短命（尽量 ≤1-2 天）

### 2. Worktree 隔离（并行任务用）

多个变更并行时，每个变更一个 worktree，互不污染：

```bash
git worktree add ../<repo>-<change> -b feat/<change>
# 完成后
git worktree remove ../<repo>-<change>
```

### 3. 提交规范（Conventional Commits）

```
<type>(<scope>): <subject>

<body: 为什么改（动机与上下文），可选>

<footer: 关联变更/关闭项，可选>
```

- type：feat / fix / refactor / test / docs / chore / perf / build / ci
- subject ≤50 字符（中文 ≤25 字），动词开头，不加句号；禁止 "update code" 类废话
- 一个提交做一件事；**禁止混合**：改功能 + 修格式 + 重构拆成三个提交
- 提交信息说明**为什么**，不是复读 diff（diff 本身可见）

### 4. 提交前自检（每次 commit 前）

1. `git status` 确认无意外文件（密钥、构建产物、.env、临时文件）
2. `git diff --check`（空白错误）
3. 只暂存本变更相关文件，无关改动不混入
4. 提交后 `git log --oneline -1` 确认信息正确

### 5. 分支收尾

合并前顺序执行：dream-verify 门禁 → dream-review 评审 → 收尾：
1. 本地测试全绿（含新写的测试）
2. 变基到最新主干：`git fetch; git rebase origin/main`
3. 合并后删除远程与本地分支
4. 确认主干 `git status` 干净

## 红线

- 禁止 commit 前不跑 git status/diff
- 禁止把密钥、.env、构建产物提交
- 禁止一个提交塞多个不相关改动
- 禁止未过 verify/review 门禁就合并
- 禁止在多人共享分支上 force push
