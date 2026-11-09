import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Check, Copy, Flame, Sparkles } from "lucide-react";
import { codeFiles } from "../data/portfolio";
import { CodeBlock, Typewriter } from "./ui";
import { PlayStoreIcon } from "./icons";

const terminals = [
  "npm run build",
  "flutter build apk --release",
  "firebase deploy --only functions",
  "git push origin main",
];

export default function DevCard() {
  const [tab, setTab] = useState(codeFiles[0].id);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();
  const timer = useRef(null);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  // Reduced rotation ranges so the character stays centered & doesn't fly off-screen
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [3, -3]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 180,
    damping: 20,
  });

  const active = codeFiles.find((file) => file.id === tab) || codeFiles[0];

  function handleMove(event) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(active.copyText);
    } catch {
      const area = document.createElement("textarea");
      area.value = active.copyText;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }

    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="relative isolate mx-auto w-full min-w-0 max-w-[620px]"
      style={{ perspective: "1200px" }}
    >
      {/* Ambient lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 z-0 rounded-[40px] bg-[radial-gradient(ellipse_at_center,rgba(139,124,255,0.18),rgba(53,224,208,0.06)_45%,transparent_72%)] blur-2xl"
      />

      {/* Decorative frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px z-0 rounded-[19px] border border-white/[0.07]"
      />

      <motion.div
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, transformOrigin: "center", transformStyle: "preserve-3d" }
        }
        className="code-window relative z-10 w-full min-w-0 overflow-hidden rounded-2xl border border-white/[0.14] shadow-[0_30px_100px_-35px_rgba(0,0,0,0.95),0_0_45px_-25px_rgba(139,124,255,0.35)]"
      >
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.02] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/90" />

          <div
            role="tablist"
            aria-label="Developer profile files"
            className="ml-2 flex items-center gap-0.5 overflow-x-auto"
          >
            {codeFiles.map((file) => (
              <button
                key={file.id}
                type="button"
                role="tab"
                aria-selected={tab === file.id}
                onClick={() => setTab(file.id)}
                className={`relative shrink-0 rounded-md px-2.5 py-1.5 font-mono text-[10px] transition-colors ${
                  tab === file.id ? "text-white" : "text-faint hover:text-mist"
                }`}
              >
                {tab === file.id ? (
                  <motion.span
                    layoutId="devcard-tab"
                    className="absolute inset-0 rounded-md bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <span className="relative z-10">{file.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={copyCode}
            aria-label={copied ? "Code copied" : "Copy code"}
            className="ml-auto grid h-7 w-7 shrink-0 place-items-center rounded-md border border-white/10 text-faint transition hover:border-white/20 hover:text-white"
          >
            {copied ? (
              <Check size={13} className="text-mint" aria-hidden="true" />
            ) : (
              <Copy size={13} aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="min-h-[272px] px-4 py-5 sm:px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              <CodeBlock code={active.copyText} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1.5 border-t border-white/10 bg-white/[0.015] px-4 py-3 font-mono text-[10.5px]">
          <span className="shrink-0 text-mint">sanskar@portfolio</span>
          <span className="text-faint">:</span>
          <span className="shrink-0 text-accent-2">~</span>
          <span className="shrink-0 text-faint">$</span>
          <Typewriter words={terminals} className="min-w-0 truncate text-mist" />
          <span className="ml-auto hidden shrink-0 items-center gap-1.5 text-[9px] uppercase tracking-wider text-faint sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#35e0d0]" />
            online
          </span>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-3 -top-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-[#0e121b]/90 px-3 py-2 font-mono text-[10px] text-[#cbd2e0] shadow-xl backdrop-blur-md sm:-right-5"
      >
        <PlayStoreIcon className="h-3 w-3 text-mint" />
        3 apps live
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, 9, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: -2.5 }}
        className="absolute -left-4 bottom-24 z-10 hidden items-center gap-2 rounded-full border border-white/15 bg-[#0e121b]/90 px-3 py-2 font-mono text-[10px] text-[#cbd2e0] shadow-xl backdrop-blur-md sm:-left-6 sm:flex"
      >
        <Flame className="h-3 w-3 text-amber" />
        Firebase
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: -1.2 }}
        className="absolute -bottom-5 right-8 z-10 hidden items-center gap-2 rounded-full border border-white/15 bg-[#0e121b]/90 px-3 py-2 font-mono text-[10px] text-[#cbd2e0] shadow-xl backdrop-blur-md md:flex"
      >
        <Sparkles className="h-3 w-3 text-accent-2" />
        Kotlin + Compose
      </motion.div>
    </div>
  );
}
