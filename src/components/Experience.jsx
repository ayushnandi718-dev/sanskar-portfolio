import { ArrowRight } from "lucide-react";
import { experience } from "../data/portfolio";
import { Reveal } from "./ui";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">
            <span className="text-mint">05</span>
            Experience
          </p>
          <h2 className="mt-5 font-display text-[clamp(1.95rem,4.4vw,3.3rem)] font-bold leading-[1.05] tracking-[-0.04em]">
            Learning by building,
            <br />
            <span className="text-faint">shipping what matters.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-mist">
            My experience comes from real products - designing, developing and
            maintaining applications that are live in production and used every day.
          </p>

          <a href="#contact" className="btn btn-ghost btn-sm mt-6">
            Work with me
            <ArrowRight aria-hidden="true" />
          </a>

          <div className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-4 font-mono text-[10.5px] leading-6">
            <p>
              <span className="text-mint">$</span>{" "}
              <span className="text-mist">git log --oneline -3</span>
            </p>
            <div className="mt-1.5 space-y-0.5 text-faint">
              <p>a1f9c2e ship: 3 apps live on Play Store</p>
              <p>7b2d1a4 feat: backend + API integrations</p>
              <p>e5c83f1 init: first line of code</p>
            </div>
          </div>
        </Reveal>

        <ol className="relative">
          <span
            aria-hidden="true"
            className="timeline-line absolute bottom-4 left-[4px] top-2 w-px"
          />

          {experience.map((item, index) => (
            <li key={item.title} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute left-0 top-[7px] h-[9px] w-[9px] rounded-full border-2 border-ink bg-mint shadow-[0_0_0_1px_rgba(53,224,208,0.35),0_0_14px_rgba(53,224,208,0.5)]"
              />
              <Reveal delay={index * 0.08}>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-mint">
                  {item.period}
                </p>
                <h3 className="mt-1.5 text-[17px] font-semibold tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-[11.5px] text-faint">{item.place}</p>
                <p className="mt-2.5 max-w-xl text-[13px] leading-6 text-mist">
                  {item.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
