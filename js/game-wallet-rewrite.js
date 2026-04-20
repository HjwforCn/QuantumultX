let body = $response.body || "";

console.log("[GameWalletGet] script start");
console.log("[GameWalletGet] url: " + $request.url);
console.log("[GameWalletGet] body exists: " + Boolean($response.body));
console.log("[GameWalletGet] body length before: " + body.length);
console.log("[GameWalletGet] body before preview: " + body.slice(0, 500));

const zeroMatches = body.match(/([:\[,]\s*)0(\s*[,}\]])/g);
console.log("[GameWalletGet] numeric zero matches before: " + (zeroMatches ? zeroMatches.length : 0));

body = body.replace(/([:\[,]\s*)0(\s*[,}\]])/g, function (_, left, right) {
  return left + "999" + right;
});

const nineMatches = body.match(/([:\[,]\s*)999(\s*[,}\]])/g);
console.log("[GameWalletGet] numeric 999 matches after: " + (nineMatches ? nineMatches.length : 0));
console.log("[GameWalletGet] body length after: " + body.length);
console.log("[GameWalletGet] body after preview: " + body.slice(0, 500));
console.log("[GameWalletGet] script done");

$done({
  body: body
});
