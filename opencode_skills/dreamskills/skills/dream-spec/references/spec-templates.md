# 规格文件模板（dream-spec 用）

## proposal.md 模板

```markdown
# Change: <名称>

## Why
<背景与动机：解决什么问题，一句话能说清>

## What Changes
- <改动点 1>
- <改动点 2>

## Impact
- 受影响规格：<capability 列表>
- 受影响代码：<大致模块>
- 风险与回滚：<风险点及缓解>
```

## delta spec 模板

```markdown
## ADDED Requirements
### Requirement: <能力名>
#### Scenario: <场景名>
- **WHEN** <触发条件>
- **THEN** <期望结果>

## MODIFIED Requirements
### Requirement: <已有能力名>
#### Scenario: <变化的场景>
- **WHEN** ...
- **THEN** ...（原行为 → 新行为）

## REMOVED Requirements
### Requirement: <移除的能力名>
```

## constitution.md 默认模板

```markdown
# 项目宪法
1. 测试先行
2. 库优先
3. 反抽象（≤3 层，新增须书面理由）
4. 证据优于断言
5. 最小实现
6. 集成优先
---
修订记录：
- <日期> 修订条款 N：<理由>（评审人：xxx，向后兼容评估：xxx）
```

## tasks.md 模板

```markdown
## Tasks
- [ ] [P] 1. <动词开头任务名>
      - 依赖：无
      - 验收：<可验证标准>
- [ ] 2. <任务名>
      - 依赖：1
      - 验收：<可验证标准>
```
