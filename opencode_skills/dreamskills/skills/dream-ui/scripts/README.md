# dream-ui 检索脚本（整合自 UI UX Pro Max scripts/）

来源：nextlevelbuilder/ui-ux-pro-max-skill（MIT），Python 3 标准库实现，零第三方依赖。

## 文件

| 文件 | 功能 |
|---|---|
| search.py | CLI 入口：单域检索 + 设计系统生成 + 持久化 |
| core.py | BM25 检索核心（同义词归一、停用词、IDF 打分、领域自动检测、结果 token 优化输出） |
| design_system.py | 设计系统管线（五域并行检索 + ui-reasoning 规则匹配 + 暗色解析 + MASTER/Overrides） |
| validate_data.py | CSV 数据校验 |

## 用法

```bash
# 设计系统（推荐主流程）
python scripts/search.py "ecommerce fashion minimal" --design-system -p "my-shop" --persist --output-dir .

# 带滑杆与格式
python scripts/search.py "saas dashboard" --design-system --variance 8 --motion 5 --density 9 -f markdown

# 单域检索
python scripts/search.py "dark mode" --domain color -n 3
python scripts/search.py "chart comparison" --domain chart
python scripts/search.py "scroll animation" --domain gsap
python scripts/search.py "form validation" --domain ux

# 技术栈指南
python scripts/search.py "responsive" --stack nextjs
```

Windows 依次尝试 `python` / `python3` / `py -3`。

## 无 Python 降级路径

opencode/codex 等宿主若未安装 Python，AI 直接按 `data/README.md` 的映射 grep/读取 CSV（首列行号 + 全字段明文，模型可直接理解），等效检索由模型语义匹配完成。

## 输出字段说明

- 结果头部：`## UI Pro Max Search Results` + Domain/Query/Source/Found
- 每条 `### Result i` 为 `- **key:** value` 列表（token 优化）
- 长字段截断 300 字符，但代码示例/实现清单/设计系统变量/GSAP 片段等永不截断
- 0 命中输出明确提示 + 最接近术语建议
