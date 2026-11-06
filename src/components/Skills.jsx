import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe2, Server, Smartphone, Wrench } from "lucide-react";
import { skillGroups } from "../data/portfolio";
import { Reveal, SectionHead } from "./ui";

const icons = {
  smartphone: Smartphone,
  globe: Globe2,
  server: Server,
  wrench: Wrench,
};

export default function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((group) => group.id === activeId) || skillGroups[0];
  const ActiveIcon = icons[active.icon] || Smartphone;

  return (
    <section id="skills" className="scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            index="03"
            label="Toolkit"
            title={
              <>
                The stack behind
                <br />
                <span className="text-faint">the things I build.</span>
              </>
            }
            lead="A practical toolkit for taking products from an empty folder to a published release."
          />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          <Reveal delay={0.05} className="min-w-0">
            <div
              role="tablist"
              aria-label="Skill categories"
              className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {skillGroups.map((group) => {
                const Icon = icons[group.icon] || Smartphone;
                const isActive = group.id === activeId;

                return (
                  <button
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(group.id)}
                    className={`relative flex min-w-[150px] items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition duration-300 lg:min-w-0 ${
                      isActive
                        ? "border-accent/30 text-white"
                        : "border-white/10 text-mist hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="skill-tab"
                        className="absolute inset-0 rounded-xl bg-accent/[0.09]"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    ) : null}
                    <Icon
                      className={`relative z-10 h-[17px] w-[17px] ${
                        isActive ? "text-mint" : "text-faint"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="relative z-10 flex-1 text-[13px] font-medium">
                      {group.label}
                    </span>
                    <span className="relative z-10 font-mono text-[9px] text-faint">
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="min-w-0">
            <div className="relative min-h-[290px] overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 sm:p-8">
              <div
                aria-hidden="true"
                className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
              />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-mint/20 bg-mint/[0.06] text-mint">
                      <ActiveIcon className="h-[22px] w-[22px]" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-[-0.02em]">
                        {active.label}
                      </h3>
                      <p className="mt-1 max-w-md text-[13px] leading-6 text-mist">
                        {active.blurb}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {active.items.map((item, index) => (
                      <motion.span
                        key={item}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.035, duration: 0.3 }}
                        className="chip"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5 font-mono text-[10px] text-faint">
                    <span className="text-mint">$</span>
                    <span className="text-mist">
                      currently exploring:
                    </span>
                    <span className="text-[#c2c9d7]">AI-powered mobile features</span>
                    <span className="caret" aria-hidden="true" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
