const API = "http://127.0.0.1:9222";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getPageTarget() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const targets = await (await fetch(`${API}/json/list`)).json();
      const page = targets.find(
        (target) => target.type === "page" && target.url.includes("localhost:8787")
      );
      if (page) return page;
      const anyPage = targets.find((target) => target.type === "page");
      if (anyPage) return anyPage;
    } catch {
      /* retry */
    }
    await sleep(250);
  }
  throw new Error("No Chrome page target found");
}

const target = await getPageTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
const pending = new Map();
const consoleErrors = [];
const exceptions = [];
let nextId = 0;

const opened = new Promise((resolve, reject) => {
  ws.onopen = resolve;
  ws.onerror = reject;
});
await opened;

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  if (message.id) {
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(message.error.message));
    else entry.resolve(message.result);
    return;
  }

  if (message.method === "Runtime.exceptionThrown") {
    exceptions.push(message.params.exceptionDetails.text || "exception");
  }
  if (message.method === "Runtime.consoleAPICalled" && message.params.type === "error") {
    consoleErrors.push(
      message.params.args.map((arg) => arg.value ?? arg.description ?? "").join(" ")
    );
  }
  if (message.method === "Log.entryAdded" && message.params.entry.level === "error") {
    consoleErrors.push(message.params.entry.text);
  }
};

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
    userGesture: true,
  });
  if (result.exceptionDetails) {
    throw new Error(
      result.exceptionDetails.exception?.description || result.exceptionDetails.text
    );
  }
  return result.result.value;
}

async function waitReady() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const state = await evaluate("document.readyState");
    if (state === "complete") return;
    await sleep(150);
  }
  throw new Error("Page did not finish loading");
}

await send("Runtime.enable");
await send("Log.enable");
await send("Page.enable");
await waitReady();
await sleep(1200);

const snapshot = () =>
  evaluate(`(() => {
    const style = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const cs = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return {
        display: cs.display,
        color: cs.color,
        backgroundColor: cs.backgroundColor,
        borderColor: cs.borderColor,
        borderRadius: cs.borderRadius,
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        opacity: cs.opacity,
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        top: Math.round(rect.top),
        text: (el.textContent || "").trim().slice(0, 80),
      };
    };

    const overflow = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const cs = getComputedStyle(el);
        if (cs.position === "fixed") return false;
        const rect = el.getBoundingClientRect();
        return rect.right > window.innerWidth + 2 || rect.left < -2;
      })
      .slice(0, 8)
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 70),
        right: Math.round(el.getBoundingClientRect().right),
        left: Math.round(el.getBoundingClientRect().left),
      }));

    const isClipped = (el) => {
      let node = el.parentElement;
      while (node && node !== document.documentElement) {
        const cs = getComputedStyle(node);
        if (["hidden", "clip", "auto", "scroll"].includes(cs.overflowX)) return true;
        node = node.parentElement;
      }
      return false;
    };

    const unclippedOverflow = [...document.querySelectorAll("body *")]
      .map((el) => ({ el, rect: el.getBoundingClientRect(), cs: getComputedStyle(el) }))
      .filter(
        ({ rect, cs }) =>
          cs.position !== "fixed" &&
          rect.width > 0 &&
          (rect.right > document.documentElement.clientWidth + 1 || rect.left < -1)
      )
      .filter(({ el }) => !isClipped(el))
      .sort((a, b) => b.rect.right - a.rect.right)
      .slice(0, 10)
      .map(({ el, rect }) => ({
        tag: el.tagName.toLowerCase(),
        cls: String(el.className).slice(0, 80),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      }));

    return {
      viewport: { width: innerWidth, height: innerHeight },
      scrollWidth: document.documentElement.scrollWidth,
      body: style("body"),
      h1: style("h1"),
      heroCode: style(".code-window"),
      projectCard: style(".project-card"),
      projectVisual: style(".project-visual"),
      phone: style(".phone"),
      nav: style("header nav"),
      menuButton: style("button[aria-controls='mobile-nav']"),
      footerCredit: (() => {
        const link = [...document.querySelectorAll("a")].find((a) =>
          a.textContent.includes("AUX STUDIO")
        );
        return link ? { href: link.href, target: link.target, text: link.textContent.trim().replace(/\\s+/g, " ") } : null;
      })(),
      sections: [...document.querySelectorAll("main > section")].map((section) => ({
        id: section.id,
        height: Math.round(section.getBoundingClientRect().height),
      })),
      projectCount: document.querySelectorAll(".project-card").length,
      phoneCount: document.querySelectorAll(".phone").length,
      marqueeAnim: getComputedStyle(document.querySelector(".marquee-track")).animationName,
      extra: (() => {
        const card = document.querySelector(".project-card");
        const cardStyle = card ? getComputedStyle(card) : null;
        return {
          documentClientWidth: document.documentElement.clientWidth,
          visualViewportWidth: Math.round(window.visualViewport?.width || 0),
          mediaSm: matchMedia("(min-width: 640px)").matches,
          mediaLg: matchMedia("(min-width: 1024px)").matches,
          cardAccent: cardStyle?.getPropertyValue("--p-rgb").trim() || null,
          cardRotation: cardStyle?.getPropertyValue("--rot").trim() || null,
        };
      })(),
      overflow,
      unclippedOverflow,
    };
  })()`);

async function setViewport(width, height, mobile) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
  });
  await send("Page.reload", { ignoreCache: true });
  await sleep(300);
  await waitReady();
  await sleep(1400);
}

const report = { desktop: null, mobile: null, modal: null, contact: null, errors: null };

/* Desktop ---------------------------------------------------------------- */
await setViewport(1440, 900, false);
report.desktop = await snapshot();

/* Project modal --------------------------------------------------------- */
report.modal = await evaluate(`(async () => {
  document.querySelector(".project-card").click();
  await new Promise((r) => setTimeout(r, 700));
  const dialog = document.querySelector("[role=dialog]");
  if (!dialog) return { opened: false };
  const title = document.querySelector("#project-modal-title");
  const phone = dialog.querySelector(".phone");
  const rect = dialog.getBoundingClientRect();
  const phoneRect = phone ? phone.getBoundingClientRect() : null;
  return {
    opened: true,
    title: title ? title.textContent.trim().slice(0, 40) : null,
    width: Math.round(rect.width),
    height: Math.round(rect.height),
    fullyVisible: rect.top >= 0 && rect.bottom <= innerHeight + 1,
    phoneVisible: phoneRect ? phoneRect.width > 50 && phoneRect.height > 100 : false,
    playLink: dialog.querySelector("a[href*='play.google.com']")?.href || null,
    bodyLocked: getComputedStyle(document.body).overflow,
  };
})()`);

await send("Input.dispatchKeyEvent", {
  type: "keyDown",
  key: "ArrowRight",
  code: "ArrowRight",
  windowsVirtualKeyCode: 39,
  nativeVirtualKeyCode: 39,
});
await send("Input.dispatchKeyEvent", {
  type: "keyUp",
  key: "ArrowRight",
  code: "ArrowRight",
  windowsVirtualKeyCode: 39,
  nativeVirtualKeyCode: 39,
});
await sleep(800);
report.modal.nextTitle = await evaluate(
  `document.querySelector("#project-modal-title")?.textContent.trim().slice(0, 40) || null`
);

await send("Input.dispatchKeyEvent", {
  type: "keyDown",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
  nativeVirtualKeyCode: 27,
});
await send("Input.dispatchKeyEvent", {
  type: "keyUp",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
  nativeVirtualKeyCode: 27,
});
await sleep(1200);
report.modal.closed = await evaluate(`!document.querySelector("[role=dialog]")`);

/* Contact form ---------------------------------------------------------- */
report.contact = await evaluate(`(async () => {
  const setValue = (el, value) => {
    const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
    el.dispatchEvent(new Event("input", { bubbles: true }));
  };
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");
  setValue(name, "Browser Check");
  setValue(email, "browser@example.com");
  setValue(message, "Automated browser check of the contact form success state.");
  await new Promise((r) => setTimeout(r, 150));
  document.querySelector("form button[type=submit]").click();
  await new Promise((r) => setTimeout(r, 1800));
  const heading = [...document.querySelectorAll("h3")].find((el) =>
    el.textContent.includes("Message sent")
  );
  return {
    success: Boolean(heading),
    text: heading ? heading.textContent.trim() : null,
    errorVisible: Boolean(document.querySelector("[role=alert]")),
  };
})()`);

/* Mobile ---------------------------------------------------------------- */
await setViewport(390, 844, false);
report.mobile = await snapshot();

report.mobileMenu = await evaluate(`(async () => {
  const button = document.querySelector("button[aria-controls='mobile-nav']");
  const visible = button ? getComputedStyle(button).display !== "none" : false;
  button?.click();
  await new Promise((r) => setTimeout(r, 600));
  const overlay = document.querySelector("#mobile-nav");
  return {
    buttonVisible: visible,
    overlayOpened: Boolean(overlay),
    overlayDisplay: overlay ? getComputedStyle(overlay).display : null,
    bodyLocked: getComputedStyle(document.body).overflow,
  };
})()`);

await send("Input.dispatchKeyEvent", {
  type: "keyDown",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
  nativeVirtualKeyCode: 27,
});
await send("Input.dispatchKeyEvent", {
  type: "keyUp",
  key: "Escape",
  code: "Escape",
  windowsVirtualKeyCode: 27,
  nativeVirtualKeyCode: 27,
});
await sleep(1200);
report.mobileMenu.overlayClosed = await evaluate(`!document.querySelector("#mobile-nav")`);
report.mobileMenu.bodyUnlocked = await evaluate(`getComputedStyle(document.body).overflow`);

report.errors = { console: consoleErrors, exceptions };
console.log(JSON.stringify(report, null, 2));
ws.close();
