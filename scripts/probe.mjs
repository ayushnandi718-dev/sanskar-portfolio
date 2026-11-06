const targets = await (await fetch("http://127.0.0.1:9222/json/list")).json();
const page = targets.find((t) => t.type === "page" && t.url.includes("8787"));
const ws = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;
await new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const entry = pending.get(message.id);
  if (!entry) return;
  pending.delete(message.id);
  message.error ? entry.reject(new Error(message.error.message)) : entry.resolve(message.result);
};
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const next = ++id;
    pending.set(next, { resolve, reject });
    ws.send(JSON.stringify({ id: next, method, params }));
  });
const evaluate = async (expression) => {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
};

await send("Runtime.enable");

const result = await evaluate(`(() => {
  const vw = document.documentElement.clientWidth;
  const clipped = (el) => {
    let node = el.parentElement;
    while (node && node !== document.documentElement) {
      const cs = getComputedStyle(node);
      if (["hidden", "clip", "auto", "scroll"].includes(cs.overflowX)) return true;
      node = node.parentElement;
    }
    return false;
  };
  const all = [...document.querySelectorAll("body *")];
  const rows = all
    .map((el) => ({ el, rect: el.getBoundingClientRect(), cs: getComputedStyle(el) }))
    .filter(({ rect, cs }) => cs.position !== "fixed" && rect.width > 0 && (rect.right > vw + 1 || rect.left < -1))
    .filter(({ el }) => !clipped(el))
    .sort((a, b) => b.rect.right - a.rect.right)
    .slice(0, 20)
    .map(({ el, rect, cs }) => ({
      tag: el.tagName.toLowerCase(),
      cls: String(el.className).slice(0, 90),
      left: Math.round(rect.left),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
      position: cs.position,
      overflowX: cs.overflowX,
    }));

  return {
    innerWidth,
    clientWidth: vw,
    htmlScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    htmlOverflowX: getComputedStyle(document.documentElement).overflowX,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
    rows,
  };
})()`);

console.log(JSON.stringify(result, null, 2));
ws.close();
