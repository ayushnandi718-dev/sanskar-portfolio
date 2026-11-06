import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/portfolio";
import { Reveal, SectionHead } from "./ui";
import PhoneMockup from "./PhoneMockup";
import { PlayStoreIcon } from "./icons";

function ProjectCard({ project, index, onOpen }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4, -4]), {
    stiffness: 170,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 170,
    damping: 20,
  });

  // Map project variant to WebP filename in public/
  const webpFile = {
    nmj: "nmj",
    food: "apna food",
    applyz: "applyz",
  }[project.variant] || "nmj";

  // Google Play screenshot URL for ApplyZ case study
  const playScreenshot = project.variant === "applyz"
    ? "https://play-lh.googleusercontent.com/oGZwcD5PXe1LxCy8JFaGc4sYkyHqjUGFMRTA_XdL6bqQfPlbvw8Eim4dt2Q71hxGLTOW2jx7x33QDurRnPqFgg=w1052-h592-rw"
    : null;

  function handleMove(event) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function open() {
    onOpen(index);
  }

  return (
    <div style={{ perspective: 1200 }} className="h-full">
      <motion.article
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.name} case study`}
        onClick={open}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            open();
          }
        }}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{
          "--p-rgb": project.accent,
          "--p-1": project.accentSolid,
          "--p-2": project.accent2,
          "--rot": project.rotation,
          ...(reduce ? {} : { rotateX, rotateY }),
        }}
        className="project-card group flex h-full cursor-pointer flex-col overflow-hidden rounded-[22px] border border-white/10 bg-surface"
      >
        <div className={`project-visual h-[286px] shrink-0 border-b border-white/10 ${project.variant === "applyz" ? "bg-applyz" : project.variant === "food" ? "bg-food" : "bg-nmj"}`}>
          <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:-translate-y-2">
            <PhoneMockup variant={project.variant} />
          </div>

          <span className="absolute bottom-3.5 right-4 z-[2] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#090b10]/75 px-2.5 py-1.5 font-mono text-[9px] text-[#c2c9d7] backdrop-blur-md">
            <PlayStoreIcon className="h-2.5 w-2.5 text-mint" />
            Play Store
          </span>

          <span className="absolute left-4 top-4 z-[2] rounded-full border border-white/10 bg-[#090b10]/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-faint backdrop-blur-md">
            {project.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center justify-between gap-3 font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
            <span>{project.subtitle}</span>
            <span className="inline-flex items-center gap-1.5 text-mint">
              <span className="h-1 w-1 rounded-full bg-mint shadow-[0_0_6px_#35e0d0]" />
              {project.status}
            </span>
          </div>

          <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em]">
            {project.name}
            <span className="ml-1.5 text-[0.8em] font-medium text-faint">
              {project.subtitle}
            </span>
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-mist">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-white/10 bg-white/[0.025] px-2 py-1 font-mono text-[9.5px] text-[#c2c9d7]"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 ? (
              <span className="rounded-md border border-white/10 bg-white/[0.025] px-2 py-1 font-mono text-[9.5px] text-faint">
                +{project.tags.length - 3}
              </span>
            ) : null}
          </div>

          <div className="mt-auto pt-5">
            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <span className="text-[12px] font-semibold text-[#dfe4ee] transition-colors group-hover:text-mint">
                View case study
              </span>
              <span className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-mist transition duration-300 group-hover:border-mint/30 group-hover:text-mint">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects({ onOpen }) {
  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            index="04"
            label="Selected Work"
            title={
              <>
                Apps in the wild,
                <br />
                <span className="text-faint">used by real people.</span>
              </>
            }
            lead="Three production applications published on Google Play - each one started with a specific problem worth solving."
          />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-2xl gap-5 lg:max-w-none lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.08}>
              <ProjectCard project={project} index={index} onOpen={onOpen} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center">
            <p className="flex items-center gap-2.5 text-[12.5px] text-mist">
              <PlayStoreIcon className="h-4 w-4 text-mint" />
              All three apps are live and available on Google Play.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-mist transition hover:text-mint"
            >
              Need something similar?
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
