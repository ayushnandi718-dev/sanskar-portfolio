const targets = await (await fetch("http://127.0.0.1:9222/json/list")).json();
const page = targets.find((t) => t.type === "page" && t.url.includes("8787"));
const ws = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let id = 0;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
await send("Emulation.setDeviceMetricsOverride", {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: false,
});
await send("Page.reload", { ignoreCache: true });
await sleep(2200);

const measure = () =>
  evaluate(`({
    innerWidth,
    clientWidth: document.documentElement.clientWidth,
    htmlScrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    bodyClientWidth: document.body.clientWidth,
    rootRect: (() => { const r = document.querySelector("#root").getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }; })(),
    bodyRect: (() => { const r = document.body.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }; })(),
    directChildren: [...document.body.children].map((el) => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 40), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), position: getComputedStyle(el).position };
    }),
    fixedOverflow: [...document.querySelectorAll("body *")].filter((el) => {
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      return cs.position === "fixed" && r.width > 0 && (r.right > innerWidth + 1 || r.left < -1);
    }).slice(0, 10).map((el) => ({ cls: String(el.className).slice(0, 60), ...(() => { const r = el.getBoundingClientRect(); return { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }; })() })),
    internalOverflow: [...document.querySelectorAll("body *")].map((el) => ({ el, sw: el.scrollWidth, cw: el.clientWidth, cs: getComputedStyle(el) })).filter(({ el, sw, cw }) => sw > cw + 2 && el !== document.documentElement && el !== document.body).sort((a, b) => b.sw - a.sw).slice(0, 10).map(({ el, sw, cw, cs }) => ({ tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 60), scrollWidth: sw, clientWidth: cw, overflowX: cs.overflowX })),
  })`);

const base = await measure();

const selectors = [".marquee", "header", "footer", "#top", "#about", "#services", "#skills", "#work", "#experience", "#contact", ".code-window", ".grain"];
const hideTests = {};
for (const selector of selectors) {
  hideTests[selector] = await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const prev = el.style.display;
    el.style.display = "none";
    const width = document.documentElement.scrollWidth;
    el.style.display = prev;
    return width;
  })()`);
}

const clipTests = {};
for (const [name, css] of Object.entries({
  bodyVisible: "document.body.style.overflowX='visible'",
  htmlHidden: "document.documentElement.style.overflowX='hidden'",
  rootHidden: "document.querySelector('#root').style.overflowX='hidden'",
  marqueeHidden: "document.querySelector('.marquee').style.overflow='hidden'",
})) {
  clipTests[name] = await evaluate(`(() => { ${css}; const w = document.documentElement.scrollWidth; document.body.style.overflowX='clip'; document.documentElement.style.overflowX=''; document.querySelector('#root').style.overflowX=''; return w; })()`);
}

console.log(JSON.stringify({ base, hideTests, clipTests }, null, 2));
ws.close();
