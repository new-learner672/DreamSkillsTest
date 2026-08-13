---
name: dream-verify
description: Verification, quality gates, and testing. Use when the user wants to check performance, accessibility, quality, test coverage, or validate work before merging. Triggers on "检查质量/性能/可访问性/验收/测试覆盖率/门禁".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Web-Quality-Skills thresholds + Guard-Skills second pass + Waza V-model
---

# dream-verify：验证与质量门禁

**核心思想**：验证者不评审自己。用可量化阈值替代"感觉不错"，用第二遍审查拦截 AI 特有失效模式。

## 四层验证（V 模型）

| 层 | 内容 | 执行方式 |
|---|---|---|
| L1 静态 | 格式/类型/lint/安全扫描 | 宿主工具链 |
| L2 单元 | 逻辑正确性、边界 | dream-tdd 已产出 |
| L3 集成 | 模块协作、真实依赖 | 集成测试（优先真实环境） |
| L4 E2E | 用户旅程端到端 | 关键路径手测/自动化 |

## 数值门禁（Web 质量，详见 references/quality-thresholds.md）

| 项 | 阈值 |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |
| JS 包 | < 300KB（首屏） |
| 总页面 | < 1.5MB |
| 对比度 | ≥ 4.5:1（正文） |
| 可访问性 | WCAG 2.2 四原则抽查通过 |

性能优化按优先级：关键渲染路径 → 分包/懒加载 → 图片（格式/尺寸/lazy）→ 字体（font-display）→ 缓存。

## Guard 第二遍审查（AI 特有失效模式）

对本次变更的 diff 逐项排查（详见 references/ai-failure-patterns.md）：
1. 幻觉 API（不存在的库函数/参数）—— 逐条核对真实签名
2. 硬编码假成功（写死返回值、吞异常返回 true）
3. 复制粘贴测试（测试复读实现，永远通过）
4. 注释污染（注释与代码矛盾、无意义注释）
5. 过早抽象（为一次性需求建了 3 层抽象）
6. 安全：SQL 注入、XSS 未转义、密钥入代码/入 state

## 输出：门禁报告

```markdown
## 验证报告
- [x] L1 静态：tsc + eslint 0 error（附输出摘要）
- [x] L2 单元：42/42 通过，覆盖率 87%
- [x] L3 集成：API 契约测试通过
- [ ] L4 E2E：暗色切换跨页持久化 —— 手测通过
- [x] 性能门：LCP 1.8s / INP 120ms / CLS 0.02
- [ ] Guard 复查：无失效模式（逐项勾选）
```

任一红灯 → 阻断合入，交回实现层修复。

## 红线

- 禁止验证者评审自己刚写的代码（必须独立复核 diff）
- 禁止用"感觉流畅"替代数值测量
- 禁止红灯未处理就进入 review/归档
