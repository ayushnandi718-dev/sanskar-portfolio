import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 700);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-[#0c1018]/85 text-mist shadow-xl backdrop-blur-md transition hover:border-mint/30 hover:text-mint sm:bottom-6 sm:right-6"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
