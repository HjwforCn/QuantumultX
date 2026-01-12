/**
 * @name oneDown
 * @version 1.2.0
 * @description 动态替换下载请求中的 Token
 * 

[rewrite_local]
# 下载
^https?:\/\/(api|jmtp)(.*-uat)?\.\w+\.com\/v2.5\/(vip\/download) url script-request-header https://raw.githubusercontent.com/HjwforCn/QuantumultX/refs/heads/main/js/oneDown.js

[mitm]
hostname = api.apubis.com, api.pjq6he.com, api.zbdk8ws.com, api.f38khx.com, api.deyhhc3.com, api.68f4deb.com, api.3459381.com, api.61c76a0.com, api.87735d5.com, api.afe9a49.com, api.c6dd5cc.com, api.2b37894.com, api.35a46dd.com, api.43b8477.com, api.5ce3771.com, api.632d809.com, api.b675211.com, api.a9a2bc4.com, api.8eb269a.com, api.4c86d03.com, api.979bb9e.com, api.988068b.com, api.9cbd862.com, api.c2e777b.com, api.b676039.com, api.ab1e7ee.com, api.5ed249d.com, api.2b1daea.com, api.4934430.com, api.645fb8d.com, api.53cuk7g.com, api.5ebd5d.com, api.em1oifd0.com, api*-uat.*.com, jmtp.*.com, api.k55n2r.com, api.zbdk8ws.com, api.26bb4xt.com, api.vf5x3hv.com, api.fexsqz.com, api.ec53y2t.com, api.j7y675.com, api.pjq6he.com, qqcapi.*.com, www.nj5byj6j.com, api.f38khx.com, api.3459381.com, api.61c76a0.com, api.87735d5.com, api.afe9a49.com, api.c6dd5cc.com, api.2b37894.com, api.35a46dd.com, api.43b8477.com, api.5ce3771.com, api.632d809.com, api.b675211.com, api.a9a2bc4.com, api.8eb269a.com, api.4c86d03.com, api.979bb9e.com, api.988068b.com, api.9cbd862.com, api.c2e777b.com, api.b676039.com, api.ab1e7ee.com, api.5ed249d.com, api.2b1daea.com, api.4934430.com, api.645fb8d.com, api.53cuk7g.com, api.5ebd5d.com, api.em1oifd0.com, api*-uat.*.com, jmtp.*.com, api.k55n2r.com, api.zbdk8ws.com, api.26bb4xt.com, api.vf5x3hv.com

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
