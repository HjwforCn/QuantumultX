# QuantumultX
QuantumultX 脚本

## Quantumult X：Claude AI 分流

[规则文件](filter/claude.list)保留 Surge 版的全部 28 条匹配条件，转换为 Quantumult X 原生分流格式，包含域名、关键字、IPv4、IPv6 和 ASN 规则。

在 Quantumult X 当前配置的 `[filter_remote]` 段添加：

```ini
https://raw.githubusercontent.com/HjwforCn/QuantumultX/main/filter/claude.list, tag=Claude AI, force-policy=proxy, enabled=true
```

默认使用内置 `proxy` 策略。如果需要指定策略组，将 `force-policy=proxy` 中的 `proxy` 替换为 Quantumult X 中已有的策略组名称，例如 `AI Suite`。也可以将此链接添加到远程分流资源，并在资源设置中指定策略。

规则类型与订阅参数按 [Quantumult X 官方配置示例](https://github.com/crossutility/Quantumult-X/blob/master/sample.conf)编写：`DOMAIN`、`DOMAIN-SUFFIX`、`DOMAIN-KEYWORD` 分别转换为 `host`、`host-suffix`、`host-keyword`，IPv6 使用 `ip6-cidr`，ASN 使用 `ip-asn`。IP 规则采用官方示例中的三列格式，不带 Surge 的 `no-resolve` 参数；DNS 处理遵循 Quantumult X 自身配置，不保证与 Surge 的解析行为完全相同。

共享服务域名和宽泛关键字的匹配范围与 Surge 版一致，也会影响其他应用访问对应地址。已核对 28 条规则的转换结果；尚未在 Quantumult X 客户端实测。

## Surge：Claude AI 分流

[规则文件](surge/claude.list)包含 28 条 Claude / Anthropic 分流规则，保留原始 2026-04-10 版本的匹配范围、顺序和 IP 规则的 `no-resolve` 参数。使用 Surge 原生规则集即可远程订阅。

在 Surge 当前配置的 `[Rule]` 段开头、通用分流规则之前添加：

```ini
RULE-SET,https://raw.githubusercontent.com/HjwforCn/QuantumultX/main/surge/claude.list,"US APP"
```

`US APP` 必须是当前配置中已有的代理或策略组；如果名称不同，将它替换为实际名称，例如 `AI Suite`。策略组名称只在这一行指定，规则文件中不固定策略。

如果已经手动加入同一组 28 条规则，可用上面这一行替换对应规则块，避免重复配置。Surge 会下载并缓存远程规则集；自动更新行为见 [Surge 官方说明](https://manual.nssurge.com/rules/ruleset.html)。

注意：这是 **Surge 格式**，不能直接作为 Quantumult X 分流文件导入。规则保留了 `storage.googleapis.com`、`sentry.io` 等共享服务，以及 `sift`、`datadoghq` 等宽泛关键字；其他应用访问这些地址时也会匹配此策略。该规则集只决定分流，不能保证节点能访问 Claude，也不会绕过网站验证或账号限制。
