/**
 * @name oneDown
 * @version 1.2.0
 * @description 动态替换下载请求中的 Token
 * 
 * [rewrite_local]
 * ^https?:\/\/(api|jmtp)(.*-uat)?\.\w+\.com\/v2.5\/(vip\/download) url script-request-header https://raw.githubusercontent.com/HjwforCn/QuantumultX/refs/heads/main/js/oneDown.js
 */

const targetUrl = "https://raw.githubusercontent.com/Yu9191/Rewrite/main/onetoken1222.txt";

$task.fetch({ url: targetUrl }).then(response => {
    try {
        const body = response.body;
        // 解析远程返回的 JSON, 结构预期为 { "token": "..." }
        const obj = JSON.parse(body);
        const newToken = obj.token;

        if (newToken) {
            // 获取当前请求的 Headers
            // 注意: $request.headers 是引用，直接修改可能生效，但推荐传回 modify 后的对象
            const headers = $request.headers || {};

            // 查找并替换 token 字段，处理可能的大小写情况
            let replaced = false;
            for (const key in headers) {
                if (key.toLowerCase() === 'token') {
                    headers[key] = newToken;
                    replaced = true;
                    break;
                }
            }

            // 如果未找到现有 token 字段，则强制添加一个小写的 token
            if (!replaced) {
                headers['token'] = newToken;
            }

            console.log("oneDown: Token 替换成功");

            // 返回修改后的 headers，Quantumult X 会使用新 headers 继续请求
            $done({ headers: headers });
        } else {
            console.log("oneDown: 获取到的 JSON 中缺失 token 字段");
            $done({}); // 保持原样放行
        }
    } catch (e) {
        console.log("oneDown: 脚本执行异常: " + e);
        $done({}); // 发生异常时保持原样放行，避免阻断请求
    }
}, reason => {
    console.log("oneDown: 获取远程 Token 失败: " + reason.error);
    $done({}); // 网络错误时保持原样放行
});
