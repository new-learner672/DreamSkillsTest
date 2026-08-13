---
name: dream-write-skill
description: Meta-skill for creating new skills. Use when the user wants to extend Dreamskills, write a new skill, or codify a workflow for an AI coding assistant. Triggers on "写一个新技能/扩展技能/沉淀工作流/创建 SKILL".
license: MIT
metadata:
  author: dreamskills
  version: "1.0.0"
  upstream: Superpowers writing-skills + Anthropic Agent Skills spec
---

# dream-write-skill：技能自扩展（元技能）

**核心思想**：技能是"可重复的做事方式"的沉淀。好技能 = 单一职责 + 精准触发词 + 短主体 + 渐进披露。

## 创建流程

### 1. 四问（任一否 → 不立项）

1. **单一职责？** 技能只解决一件事（拆成多个而非合并）
2. **触发词精准？** 用户会用什么话说出这个需求？（写进 description）
3. **主体 ≤200 行？** 超出即细节未下沉
4. **细节下沉？** 清单/模板/阈值表进 `references/`，按需加载

### 2. 结构规范

```
skills/<skill-name>/
├── SKILL.md              # 唯一必需文件，≤200 行
├── references/           # 细节（检查清单、阈值表、模板、反模式）
├── scripts/              # 可执行脚本（可选，须幂等、可测试）
└── assets/               # 静态资源（可选）
```

### 3. Frontmatter 规范（遵循 Anthropic Agent Skills）

```yaml
---
name: kebab-case 名称
description: 一段话：何时用 + 做什么 + 触发词（"Use when... Triggers on...")
license: MIT
metadata:
  author: ...
  version: "1.0.0"
---
```

description 是**唯一被宿主用于语义匹配的字段**，必须包含：任务场景 + 明确动词 + 常见触发短语。

### 4. 主体写法

- 开头一句"核心思想"（一句话说清理念）
- 工作流用编号步骤；硬约束写"红线"小节
- 用"必须/禁止"句式，避免"建议"（技能是纪律不是鸡汤）
- 不写通用废话（如"仔细分析需求"）；每条指令都要可执行、可检查

### 5. 注册

- 在 README 映射表登记新技能与上游来源
- 版本写入 frontmatter；变更走语义化版本

## 红线

- 禁止 >200 行的 SKILL.md 主体
- 禁止 description 缺触发词
- 禁止一个技能干多件事
- 禁止把细节全塞进主体（渐进披露是规范要求）
