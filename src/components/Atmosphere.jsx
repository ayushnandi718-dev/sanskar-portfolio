import { useEffect } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(1100px_560px_at_50%_-12%,rgba(139,124,255,0.12),transparent_70%)]" />
      <div
        className="aurora-blob -top-48 right-[-12%] h-[620px] w-[620px] bg-[radial-gradient(circle,rgba(53,224,208,0.16),transparent_65%)]"
        style={{ animationDelay: "-4s" }}
      />
      <div
        className="aurora-blob bottom-[-24%] left-[-16%] h-[660px] w-[660px] bg-[radial-gradient(circle,rgba(139,124,255,0.18),transparent_65%)]"
        style={{ animationDelay: "-12s" }}
      />
      <div className="absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,107,138,0.06),transparent_65%)] blur-3xl" />
    </div>
  );
}

export function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const springX = useSpring(x, { stiffness: 90, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 90, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    function handleMove(event) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    return () => window.removeEventListener("pointermove", handleMove);
  }, [reduce, x, y]);

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[460px] w-[460px] rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        marginLeft: -230,
        marginTop: -230,
        background: "radial-gradient(circle, rgba(139,124,255,0.075), transparent 65%)",
        filter: "blur(18px)",
      }}
    />
  );
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
