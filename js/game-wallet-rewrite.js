let body = $response.body || "";

console.log("[GameWalletGet] start url=" + $request.url);
console.log("[GameWalletGet] before body=" + body);

function replaceZero(value) {
  if (typeof value === "number" && value === 0) {
    return 999;
  }

  if (Array.isArray(value)) {
    return value.map(replaceZero);
  }

  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      value[key] = replaceZero(value[key]);
    }
    return value;
  }

  return value;
}

try {
  const data = JSON.parse(body);
  const rewritten = replaceZero(data);
  const newBody = JSON.stringify(rewritten);

  console.log("[GameWalletGet] after body=" + newBody);

  $done({
    body: newBody
  });
} catch (e) {
  console.log("[GameWalletGet] JSON parse failed: " + e.message);

  const zeroNumberReg = /([:\[,]\s*)0(?:\.0+)?(\s*[,}\]])/g;
  body = body.replace(zeroNumberReg, function (_, left, right) {
    return left + "999" + right;
  });

  console.log("[GameWalletGet] after fallback body=" + body);

  $done({
    body: body
  });
}
