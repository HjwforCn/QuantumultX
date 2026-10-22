# QuantumultX
QuantumultX 脚本

## Surge：Claude AI 分流

[规则文件](surge/claude.list)包含 28 条 Claude / Anthropic 分流规则，保留原始 2026-04-10 版本的匹配范围、顺序和 IP 规则的 `no-resolve` 参数。使用 Surge 原生规则集即可远程订阅。

在 Surge 当前配置的 `[Rule]` 段开头、通用分流规则之前添加：

```ini
RULE-SET,https://raw.githubusercontent.com/HjwforCn/QuantumultX/main/surge/claude.list,"US APP"
```

`US APP` 必须是当前配置中已有的代理或策略组；如果名称不同，将它替换为实际名称，例如 `AI Suite`。策略组名称只在这一行指定，规则文件中不固定策略。

如果已经手动加入同一组 28 条规则，可用上面这一行替换对应规则块，避免重复配置。Surge 会下载并缓存远程规则集；自动更新行为见 [Surge 官方说明](https://manual.nssurge.com/rules/ruleset.html)。

注意：这是 **Surge 格式**，不能直接作为 Quantumult X 分流文件导入。规则保留了 `storage.googleapis.com`、`sentry.io` 等共享服务，以及 `sift`、`datadoghq` 等宽泛关键字；其他应用访问这些地址时也会匹配此策略。该规则集只决定分流，不能保证节点能访问 Claude，也不会绕过网站验证或账号限制。
