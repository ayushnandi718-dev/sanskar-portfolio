import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, profile } from "../data/portfolio";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });

        let current = "";
        sections.forEach((section) => {
          if (visible.has(section.id)) current = section.id;
        });

        if (current) setActive(current);
        else if (window.scrollY < 220) setActive("");
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    function onKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-white/10 bg-ink/75 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div
          className={`shell flex items-center justify-between gap-4 transition-all duration-500 ${
            scrolled ? "h-[66px]" : "h-[80px]"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5" aria-label="Sanskar Pandey - home">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-accent/30 bg-accent/10 font-mono text-[11px] font-semibold tracking-wider text-accent-2 transition duration-300 group-hover:-rotate-6 group-hover:border-mint/40 group-hover:text-mint">
              {profile.monogram}
            </span>
            <span className="font-display text-[15px] font-bold tracking-tight">
              Sanskar<span className="text-mint">.</span>
            </span>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-1 backdrop-blur lg:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[12.5px] font-medium transition-colors ${
                  active === item.id ? "text-white" : "text-mist hover:text-white"
                }`}
              >
                {active === item.id ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.08]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" className="btn btn-primary btn-sm hidden sm:inline-flex">
              Let's talk
              <ArrowUpRight aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white transition hover:bg-white/[0.07] lg:hidden"
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink/[0.98] pt-24 backdrop-blur-xl lg:hidden"
          >
            <div className="shell flex flex-1 flex-col justify-between pb-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + index * 0.045, duration: 0.4 }}
                    className="flex items-baseline gap-4 border-b border-white/10 py-4 text-2xl font-semibold tracking-tight transition-colors hover:text-mint"
                  >
                    <span className="font-mono text-[10px] font-normal text-faint">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.32 }}
                className="mt-10 space-y-5"
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="font-mono text-sm text-mint transition hover:text-white"
                >
                  {profile.email}
                </a>
                <div className="flex items-center gap-3">
                  {[
                    { href: profile.github, label: "GitHub", Icon: GithubIcon },
                    { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                    { href: profile.whatsapp, label: "WhatsApp", Icon: WhatsappIcon },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-mist transition hover:border-mint/30 hover:text-mint"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
