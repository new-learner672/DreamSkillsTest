---
name: dream-security-check
description: 当变更涉及用户输入、权限、数据或认证，或交付前需要安全确认时使用。按 OWASP 清单核对注入、XSS、CSRF、越权、敏感信息泄露、依赖漏洞等风险，高危项必须清零否则验证门 FAIL，可结合 semgrep 等工具扫描。触发场景："安全检查"、"安全审查"、"有没有漏洞"、"渗透自检"、"涉敏感数据"、"安全加固"。
---

# 安全审查（dream-security-check）

> 定位：验证层的安全证据源。安全是质量门的硬约束，高危项不清零不允许交付。
> 吸收思想：semgrep guardian（安全左移：写码时实时反馈）+ anthropics 官方 code-review 的安全维度。

## 何时使用（触发条件）

- 变更涉及用户输入、权限、数据或认证（balanced 档必做）；
- 交付前（rigorous 档每次交付）；
- 涉支付、个人数据、认证令牌等敏感域。

不适用：纯静态文案变更；light 模式高危目测即可（记录豁免）。

## 核心原则

1. **安全左移**：写码时就考虑安全，交付前强制核对（不靠事后渗透）。
2. **按 OWASP 清单核对**：逐类检查（references/owasp-top10.md），不跳类。
3. **高危必须清零**：任一高危存在 = dream-verify FAIL。
4. **工具辅助、人工结论**：可运行 semgrep 等扫描器，但最终以人工核对结论为准。
5. **修复优先**：高危修复优先级高于一切功能优化。

## 工作流程

### 步骤 1：确定审查范围

- 梳理变更的输入点、权限边界、数据流、认证/会话路径。

### 步骤 2：逐类核对

- 按 references/owasp-top10.md 逐类检查（注入/XSS/CSRF/越权/敏感信息/依赖漏洞等）；
- 可运行 semgrep（`semgrep scan`）等扫描器辅助，输出记录在案。

### 步骤 3：问题分级

- 高危（必须清零）：可被利用的注入、越权、敏感数据泄露、认证绕过；
- 中危/低危：记录处置方式（修复或豁免+理由）。

### 步骤 4：修复高危

- 高危回到 dream-spec-implement / dream-debug 修复，修复后重跑本技能复核。

### 步骤 5：输出结论

- 写入 `.dreamspec/changes/<id>/security-report.md`：逐类结论 + 高危清零确认，作为 dream-verify 的 E5 证据。

## 验收标准

- [ ] 按 OWASP 清单逐类核对（无跳类）
- [ ] 高危项清零（未清零则验证门 FAIL）
- [ ] 中低危已记录处置（修复或豁免理由）
- [ ] security-report.md 已写入提案目录

## 与其他技能的衔接

- 上游：dream-spec-implement / dream-execute（实施产出）
- 下游：dream-verify（提供 E5 安全证据）
- 场景配方：安全加固 security-check → plan → execute → review → verify
- 强度模式：rigorous 每次交付全清单 / balanced 涉输入/权限/数据时 / light 高危目测

## 进阶资料

- references/owasp-top10.md：OWASP Top 10 风险清单（每类：是什么/怎么查/常见修复，核对时加载）
