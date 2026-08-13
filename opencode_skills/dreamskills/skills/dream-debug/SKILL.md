---
name: dream-debug
description: Systematic debugging. Use when the user reports errors, failing tests, unexpected behavior, or a bug that must be root-caused. Triggers on "报错/不工作/调试/测试失败/行为异常".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Superpowers systematic-debugging
---

# dream-debug：系统化调试

**核心思想**：根因确认后才准动手。调试是证据链的构建过程，不是试错改代码。

## 四阶段

### 阶段 1：复现（Reproduce）
- 获取最小复现步骤（能稳定触发的输入/操作）
- 记录现象：实际行为 vs 期望行为（引用错误信息原文）

### 阶段 2：定位（Locate）
- 形成假设 → 用证据验证假设 → 缩小范围（二分法：日志、断点、git bisect、最小化用例）
- 禁止"感觉是这里"就动手；每个假设必须被观察证实
- 定位到**根因**（最上游的缺陷），不是症状（最明显的表象）

### 阶段 3：修复（Fix）
- 最小改动修复根因；先写回归测试（失败→修复→变绿）
- 修复期间不重构无关代码、不顺手改风格

### 阶段 4：验证（Verify）
- 回归测试通过 + 手动复现原场景确认消失
- 输出证据链：`现象 → 根因 → 修复 → 验证`（写入报告）

## 常见 AI 调试陷阱（必须规避）

- 无证据猜测根因，直接改代码碰运气
- 修症状不修根因（如吞掉异常而不是修复来源）
- 一次改 5 处"可能的修复"（无法归因）
- 放弃最小复现，直接读全量代码找问题

## 红线

- 根因未确认前禁止修改任何代码
- 禁止通过吞异常/降级断言来"让测试通过"
- 修复必须附带回归测试
