import {
  Apple,
  Code2,
  Flame,
  Globe2,
  Layers,
  Smartphone,
} from "lucide-react";
import { services } from "../data/portfolio";
import { Reveal, SectionHead, SpotlightCard } from "./ui";

const icons = {
  smartphone: Smartphone,
  apple: Apple,
  layers: Layers,
  globe: Globe2,
  code: Code2,
  flame: Flame,
};

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            index="02"
            label="Services"
            title={
              <>
                Everything needed to
                <br />
                <span className="text-faint">ship a working product.</span>
              </>
            }
            lead="From the first wireframe to the final release - design implementation, development, integrations and deployment."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[service.icon] || Code2;

            return (
              <Reveal key={service.id} delay={index * 0.05}>
                <SpotlightCard
                  as="article"
                  className="hover-lift group h-full overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-accent/20 bg-accent/[0.08] text-accent-2 transition duration-300 group-hover:border-mint/30 group-hover:bg-mint/[0.07] group-hover:text-mint">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.12em] text-[#394153]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-5 max-w-[22ch] text-[16.5px] font-semibold leading-snug tracking-[-0.015em]">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-6 text-mist">
                    {service.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint transition-colors group-hover:text-mint">
                    <span className="h-1 w-1 rounded-full bg-current" />
                    Available
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
