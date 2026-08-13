# 三文件计划模板（dream-context 用）

## task_plan.md 模板

```markdown
# Task Plan: <任务名>
> 最后更新: <时间> | 状态: <进行中/完成>

## Goal
<一句话目标>

## Phases
- [ ] Phase 1: <阶段名>
  - [ ] 1.1 <步骤> （验收: <标准>）
  - [x] 1.2 <步骤>
- [ ] Phase 2: ...
  - [ ] 2.1 <步骤>

## Next Action
<下一个要做的动作，只写一个>

## Recent Decisions
- <时间> <决策> <理由>

## Known Errors
- <错误> <根因> <是否已解决>
```

## findings.md 模板（追加式）

```markdown
# Findings

## <时间> <主题>
- 发现: <事实或结论>
- 依据: <来源/证据>
- 影响: <对计划的影响>
```

## progress.md 模板

```markdown
# Progress Log

## <时间> 轮次 N
- 完成: <内容>
- 测试: <命令 + 结果>
- 错误: <记录或"无">
- 下一步: <计划>
```

## learnings.md 模板

```markdown
# Learnings（纠正沉淀）

## R-01: <规则名>
- 触发: <什么场景会犯>
- 规则: <应该怎么做>
- 首次纠正: <日期>
- 更新: <日期> <修订内容>
```

## 检查清单（每轮结束时）

- [ ] task_plan.md 的复选框与实际进度一致？
- [ ] Next Action 只有一个且明确？
- [ ] 有新发现/决策已追加 findings.md？
- [ ] 有新错误已记录 progress.md？
- [ ] 用户纠正过且值得沉淀的已问是否入 learnings.md？
