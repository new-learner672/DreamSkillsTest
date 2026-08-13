---
name: dream-tdd
description: Test-driven development. Use when the user wants to implement features, write code, fix bugs, or refactor with safety. Triggers on "实现功能/写代码/修复/TDD/测试".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Superpowers test-driven-development + Guard-Skills test-guard
---

# dream-tdd：测试驱动开发

**核心思想**：测试是执行的规格。RED-GREEN-REFACTOR 循环强制每个行为先有可失败的验证，再写最小实现。

## 铁律循环

1. **RED**：为当前任务写一个失败测试（明确断言期望行为）
2. **确认失败**：运行测试，亲眼看到它因**正确的原因**失败
3. **GREEN**：写最小实现让测试通过（禁止顺手优化/扩展）
4. **REFACTOR**：测试保护下清理代码（保持绿色）

## 测试编写规则

- 一个测试验证一个行为；测试名描述行为而非实现
- 只在系统边界 mock（数据库、网络、文件系统）；**禁止 mock 被测对象自身**
- 优先真实环境验证（宪法第 6 条）；集成测试优先于堆 mock 的单元测试
- 参数化测试替代复制粘贴；每个分支都有对应测试
- 不写"抓不到任何东西"的测试（永远通过/不断言实质行为）

## 反模式清单（12 条，触发即停）

详见 `references/tdd-antipatterns.md`，高频项：
1. 测试复读实现逻辑（copy-paste 实现代码进测试）
2. 硬编码"成功"返回的假测试
3. mock 被测对象自己的方法
4. 只测 happy path，无边界/失败用例
5. 一个测试塞 10 个断言验证 10 个行为

## 与流水线的关系

- 任务粒度来自 dream-plan（2-5 分钟任务 ↔ 一个 RED-GREEN-REFACTOR 循环）
- 测试失败且根因不明 → 交给 dream-debug
- 完成标志：`test pass` + 覆盖率达标（见 dream-verify）

## 红线

- 禁止先写实现后补测试
- 禁止跳过"确认失败"步骤（未见过红色，不知道测试有没有用）
- 禁止在一个循环里修两个问题
