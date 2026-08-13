# 验证门证据矩阵（dream-verify 的 references）

> 与 CLI `node scripts/dream.mjs verify` 打印的验证门清单一致；强度模式读 `.dreamspec/SKILLS.md`。
> 判定规则：PASS = 证据可追溯（命令输出/数值/截图）且达标；证据缺失或不可追溯一律判 FAIL。

## 三档证据矩阵总表

| 证据项 | rigorous（全套证据） | balanced（测试+构建+E2E） | light（构建+运行） |
|---|---|---|---|
| E1 单元/集成测试 | 全量跑通 + 覆盖率报告 | 核心路径跑通 | 可选（运行不报错） |
| E2 构建 | 生产构建成功 | 构建成功 | 构建/启动成功 |
| E3 浏览器 E2E（dream-webapp-test） | 关键流程 + 边界 | 关键流程 | 冒烟（启动 + 首页可达） |
| E4 性能（dream-perf-audit） | 每次交付：Lighthouse ≥90 + CWV 绿区 | 仅性能敏感变更时 | 跳过（豁免需记录） |
| E5 安全（dream-security-check） | 每次交付：全清单 + 高危清零 | 仅涉输入/权限/数据时 | 高危目测 |
| E6 lint/格式 | 全量通过 | 通过 | 可选 |

## 各证据项：获取方式与通过标准

### E1 单元/集成测试
- 获取：`npm test` / `pytest` 等，贴出结果行（通过数/失败数）
- 通过：0 失败；rigorous 要求覆盖率报告（核心模块 ≥80%）

### E2 构建
- 获取：`npm run build` / `docker build` 等，贴出成功输出
- 通过：exit 0，无 error 级日志

### E3 浏览器 E2E（由 dream-webapp-test 产出 e2e-report.md）
- 获取：Playwright 运行记录：用例清单 + 通过数/失败数 + 失败截图路径
- 通过：关键流程用例 100% 通过；失败含截图与原因

### E4 性能（由 dream-perf-audit 产出 perf-report.md）
- 获取：Lighthouse 性能分 + LCP/INP/CLS 数值 + 接口时延
- 通过：性能分 ≥90 且 CWV 全绿区；或明确列入性能债务（rigorous 不允许债务）

### E5 安全（由 dream-security-check 产出 security-report.md）
- 获取：OWASP 清单核对结论 + 工具扫描输出（如有）
- 通过：高危项清零；中低危已记录处置

### E6 lint/格式
- 获取：`npm run lint` 输出
- 通过：0 error（warning 可豁免并记录）

## 判决模板（写入 changes/<id>/verification.md）

```markdown
# 验证门判决 <id>
- 强度模式：<rigorous / balanced / light>
- 判决：✅ PASS / ❌ FAIL

## 证据摘要
| 证据项 | 结果 | 证据（命令输出/数值/截图） |
|---|---|---|
| E1 单元测试 | PASS | `npm test` → 14/14 通过 |
| E2 构建 | PASS | `npm run build` → exit 0 |
| E3 E2E | PASS | 登录成功/失败/会话过期 3/3（截图见 e2e-report.md） |
| E4 性能 | PASS | LCP 1.8s / INP 120ms / CLS 0.02，性能分 94 |
| E5 安全 | PASS | OWASP 全检，高危 0 |

## FAIL 缺口清单（仅 FAIL 时）
1. <缺口> → 回到 <技能> 修复
2. ...

## 归档判定
- 允许归档：是 / 否
```
