---
name: dream-verify
description: 当任何工作宣称完成、准备归档/交付/合并之前（强制收口）使用。按强度模式收集可追溯的验证证据（测试结果、构建结果、浏览器 E2E、性能指标、安全结论），输出结构化 PASS/FAIL 判决；FAIL 必须附缺口清单并回到对应技能修复，归档提案前必须 PASS。触发场景："宣称完成前"、"走验证门"、"验证一下"、"verify"、"交付前检查"。
---

# 交付前验证门（dream-verify）

> 定位：Dreamskills 全流水线的收口。交付 = 证据通过；无证据不宣称完成。
> 吸收思想：superpowers 的 verification-before-completion（完成前必须验证）+ sentinel 判决式 QA（改进：判决必须附证据，人只仲裁）。

## 何时使用（触发条件）

- 任何"宣称完成"之前（强制收口，不可跳过）；
- 归档提案（dream-spec-implement 的 archive 步骤）之前必须 PASS；
- 用户或 CI 要求验证证据时。

不适用：无——本技能是收口；纯讨论/规划阶段（尚未宣称完成）不需要。

## 核心原则

1. **信任但验证**：AI 宣称完成 ≠ 完成；证据是唯一通行证。
2. **判决必须附证据**：每个 PASS 项附可追溯证据（命令输出、指标数值、截图），人只做仲裁。
3. **证据按强度模式收集**：读 `.dreamspec/SKILLS.md` 确定矩阵——rigorous 全套 / balanced 测试+构建+E2E / light 构建+运行。
4. **FAIL 不宣称完成**：附缺口清单 + 明确"回到哪个技能修复"。
5. **归档前必须 PASS**：无 PASS 判决不归档、不交付。

## 工作流程

### 步骤 1：确定证据矩阵

- 读取 `.dreamspec/SKILLS.md` 的强度模式；
- 按 references/verification-matrix.md 确定本档证据项清单。

### 步骤 2：收集证据

- 逐证据项执行并记录原始输出（测试命令输出、构建日志、E2E 报告、性能报告、安全结论）；
- 可调用证据技能产出：dream-webapp-test / dream-perf-audit / dream-security-check；
- 测试与构建直接执行，贴出关键输出行。

### 步骤 3：逐项判定

- 每项：PASS（附证据摘要）/ FAIL（附缺口）；
- 证据不可追溯（无命令输出、无数值）= 视为未提供，判 FAIL。

### 步骤 4：汇总判决

- 全部 PASS → **✅ PASS**：附证据摘要清单；
- 任一 FAIL → **❌ FAIL**：附缺口清单 + 每个缺口应回到哪个技能（实现/TDD/浏览器测试/性能/安全）。

### 步骤 5：输出判决文件

- 写入 `.dreamspec/changes/<id>/verification.md`；
- PASS → 通知可执行归档（dream-spec-implement）；FAIL → 修复后重跑本技能（回归对比）。

## 验收标准

- [ ] 判决为结构化 PASS/FAIL，且附证据摘要（命令输出/数值/截图）
- [ ] 证据项与强度模式矩阵一致（rigorous 全套 / balanced 测试+构建+E2E / light 构建+运行）
- [ ] PASS 才允许归档；FAIL 附缺口清单与回修技能
- [ ] 判决文件已写入提案目录（verification.md）

## 与其他技能的衔接

- 上游：dream-review（阻断项清零后才进入）、dream-webapp-test / dream-perf-audit / dream-security-check（证据提供者）、dream-tdd（测试证据）
- 下游：dream-spec-implement（archive 步骤，仅 PASS 后）、dream-git（提交）
- 强度模式：light 只收集构建+运行证据（冒烟）

## 进阶资料

- references/verification-matrix.md：三档强度模式的证据矩阵（每档每证据项的获取方式与通过标准）
