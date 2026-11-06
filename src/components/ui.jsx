import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/* --------------------------------------------------------------------------
   Scroll reveal
   -------------------------------------------------------------------------- */
export function Reveal({ children, delay = 0, y = 26, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   Magnetic wrapper - buttons drift toward the cursor
   -------------------------------------------------------------------------- */
export function Magnetic({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 240, damping: 18, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 240, damping: 18, mass: 0.35 });

  function handleMove(event) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-flex ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------------------------------------------------
   Card with a cursor-following spotlight
   -------------------------------------------------------------------------- */
export function SpotlightCard({ children, className = "", as = "div", ...props }) {
  const ref = useRef(null);
  const Tag = as;

  function handleMove(event) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    ref.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag ref={ref} onPointerMove={handleMove} className={`spotlight ${className}`} {...props}>
      {children}
    </Tag>
  );
}

/* --------------------------------------------------------------------------
   Animated number counter
   -------------------------------------------------------------------------- */
export function Counter({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setValue(to);
      return;
    }

    let frame = 0;
    const start = performance.now();
    const duration = 1400;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(to * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}

/* --------------------------------------------------------------------------
   Typewriter
   -------------------------------------------------------------------------- */
export function Typewriter({
  words,
  typeSpeed = 65,
  deleteSpeed = 30,
  pause = 1700,
  className = "",
}) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(reduce ? words[0] : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) {
      setText(words[0]);
      return;
    }

    const word = words[index % words.length];

    if (!deleting && text === word) {
      const timer = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(timer);
    }

    if (deleting && text === "") {
      setDeleting(false);
      setIndex((current) => (current + 1) % words.length);
      return;
    }

    const timer = setTimeout(
      () => {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      },
      deleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, pause, reduce]);

  return (
    <span className={className}>
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  );
}

/* --------------------------------------------------------------------------
   Section heading
   -------------------------------------------------------------------------- */
export function SectionHead({ index, label, title, lead, className = "", center = false }) {
  return (
    <div
      className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${
        center ? "text-center md:flex-col md:items-center" : ""
      } ${className}`}
    >
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        <p className={`eyebrow ${center ? "justify-center" : ""}`}>
          <span className="text-mint">{index}</span>
          {label}
        </p>
        <h2 className="mt-5 font-display text-[clamp(1.95rem,4.4vw,3.3rem)] font-bold leading-[1.05] tracking-[-0.04em]">
          {title}
        </h2>
      </div>
      {lead ? (
        <p className="max-w-sm text-sm leading-relaxed text-mist md:pb-2">{lead}</p>
      ) : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Syntax highlighted code block
   -------------------------------------------------------------------------- */
const TOKEN_RE =
  /(\/\/[^\n]*|#[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\b(const|let|var|true|false|null|import|from|export|return|await|async|new)\b|([A-Za-z_$][\w$]*)(?=\s*:)|(\b\d+\b)/g;

function highlightLine(line) {
  if (!line.trim()) return "\u00A0";

  const nodes = [];
  let last = 0;
  let match;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(line)) !== null) {
    if (match.index > last) nodes.push(line.slice(last, match.index));

    const className = match[1]
      ? "tok-com"
      : match[2]
        ? "tok-str"
        : match[3]
          ? "tok-kw"
          : match[4]
            ? "tok-key"
            : "tok-num";

    nodes.push(
      <span className={className} key={`${match.index}-${match[0].length}`}>
        {match[0]}
      </span>
    );
    last = match.index + match[0].length;
  }

  if (last < line.length) nodes.push(line.slice(last));
  return nodes;
}

export function CodeBlock({ code, showLineNumbers = true, className = "" }) {
  const lines = code.split("\n");

  return (
    <div className={`code-scroll overflow-x-auto ${className}`}>
      <div className="flex min-w-max gap-4">
        {showLineNumbers ? (
          <div
            aria-hidden="true"
            className="shrink-0 select-none text-right font-mono text-[12px] leading-[25px] text-[#394153]"
          >
            {lines.map((_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>
        ) : null}
        <pre className="code">
          <code>
            {lines.map((line, index) => (
              <div key={index}>{highlightLine(line)}</div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
