import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import { PlayStoreIcon } from "./icons";

export default function ProjectModal({ project, index, total, onClose, onNavigate }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 80);

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowRight") {
        onNavigate(1);
        return;
      }

      if (event.key === "ArrowLeft") {
        onNavigate(-1);
        return;
      }

      if (event.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocus && typeof previousFocus.focus === "function") {
        previousFocus.focus();
      }
    };
  }, [onClose, onNavigate]);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto modal-scroll"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="backdrop fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative flex min-h-full items-center justify-center p-4 sm:p-6">
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
          initial={{ opacity: 0, y: 26, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-[#090c12] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)]"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#090c12]/80 text-mist backdrop-blur-md transition hover:border-white/30 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="grid md:grid-cols-[0.88fr_1.12fr]">
            <div
              className="project-visual relative min-h-[330px] md:min-h-full md:border-r md:border-white/10"
              style={{
                "--p-rgb": project.accent,
                "--p-1": project.accentSolid,
                "--p-2": project.accent2,
              }}
            >
              <div className="modal-visual absolute inset-0">
                <PhoneMockup variant={project.variant} />
              </div>
              <span className="absolute left-5 top-5 z-[2] rounded-full border border-white/15 bg-[#090b10]/65 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[#c2c9d7] backdrop-blur-md">
                {project.type}
              </span>
              <span className="absolute bottom-4 right-5 z-[2] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#090b10]/75 px-3 py-1.5 font-mono text-[9px] text-[#c2c9d7] backdrop-blur-md">
                <PlayStoreIcon className="h-3 w-3 text-mint" />
                Live on Google Play
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mint">
                Case study {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </p>

              <h3
                id="project-modal-title"
                className="mt-3 pr-8 font-display text-[clamp(1.6rem,3.5vw,2.15rem)] font-bold leading-tight tracking-[-0.03em]"
              >
                {project.name}
                <span className="ml-2 text-[0.62em] font-medium text-faint">
                  {project.subtitle}
                </span>
              </h3>

              <p className="mt-3 text-[13px] leading-6 text-mist">{project.description}</p>

              <div className="mt-5 grid gap-2.5">
                <div className="rounded-xl border border-pink/15 bg-pink/[0.04] p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-pink">
                    Problem
                  </p>
                  <p className="mt-1.5 text-[12px] leading-6 text-[#c2c9d7]">
                    {project.problem}
                  </p>
                </div>
                <div className="rounded-xl border border-mint/15 bg-mint/[0.04] p-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-mint">
                    Solution
                  </p>
                  <p className="mt-1.5 text-[12px] leading-6 text-[#c2c9d7]">
                    {project.solution}
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" aria-hidden="true" />
                    <span className="text-[12px] leading-5 text-mist">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.025] px-2 py-1 font-mono text-[9.5px] text-[#c2c9d7]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2.5">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm flex-1"
                >
                  <PlayStoreIcon className="h-4 w-4" />
                  Open on Play Store
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onNavigate(-1)}
                    aria-label="Previous project"
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-mist transition hover:border-white/25 hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate(1)}
                    aria-label="Next project"
                    className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-mist transition hover:border-white/25 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                  Use ← → to browse
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>,
    document.body
  );
}
