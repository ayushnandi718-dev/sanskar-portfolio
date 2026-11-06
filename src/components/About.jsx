import { ArrowRight, Code2, Layout, MapPin, Rocket } from "lucide-react";
import { facts, profile } from "../data/portfolio";
import { Reveal, SectionHead } from "./ui";
import { GithubIcon, LinkedinIcon } from "./icons";

const pillars = [
  { icon: Layout, label: "Design", text: "User-first interfaces" },
  { icon: Code2, label: "Build", text: "Clean, scalable code" },
  { icon: Rocket, label: "Ship", text: "Live, working products" },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <SectionHead
            index="01"
            label="About"
            title={
              <>
                Developer by craft,
                <br />
                <span className="text-faint">problem-solver by default.</span>
              </>
            }
            lead="I care about the details that make software feel effortless - and the fundamentals that keep it reliable."
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <Reveal delay={0.05}>
            <div>
              <p className="max-w-2xl font-display text-xl leading-relaxed tracking-[-0.015em] text-[#d9dee9] sm:text-[22px]">
                I'm Sanskar, an app and software developer focused on building practical
                digital products for businesses and individuals.
              </p>

              <div className="mt-5 max-w-2xl space-y-5 text-sm leading-7 text-mist">
                <p>
                  My work spans Android, iOS, Flutter and web development, with a strong
                  focus on user-friendly interfaces, scalable architecture and reliable
                  delivery. I enjoy taking an idea from a rough concept to a polished
                  product people can actually use.
                </p>
                <p>
                  So far I've shipped three applications to the Google Play Store,
                  integrated backends and APIs, and collaborated with a development team
                  on real-world projects. I care about clean implementation, fast load
                  times and the small details that make an app feel effortless.
                </p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {pillars.map(({ icon: Icon, label, text }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/10 bg-white/[0.025] p-4 transition duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
                  >
                    <Icon className="h-[18px] w-[18px] text-mint" aria-hidden="true" />
                    <p className="mt-3 text-[13px] font-semibold">{label}</p>
                    <p className="mt-0.5 text-[11.5px] text-faint">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  <LinkedinIcon className="h-4 w-4" />
                  LinkedIn
                </a>
                <span className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-faint sm:flex">
                  <MapPin className="h-3 w-3" aria-hidden="true" />
                  {profile.location}
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              />
              <div
                aria-hidden="true"
                className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-accent/10 blur-3xl"
              />

              <div className="relative flex items-center gap-4 border-b border-white/10 pb-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 to-mint/10 font-mono text-base font-semibold tracking-wider text-accent-2">
                  {profile.monogram}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-[15px] font-semibold">
                    {profile.name}
                  </p>
                  <p className="mt-0.5 text-xs text-faint">{profile.role}</p>
                  <p className="mt-1.5 inline-flex items-center gap-1.5 font-mono text-[10px] text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#35e0d0]" />
                    Open to freelance
                  </p>
                </div>
              </div>

              <dl className="relative divide-y divide-white/[0.06]">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 py-3.5"
                  >
                    <dt className="shrink-0 font-mono text-[9.5px] uppercase tracking-[0.12em] text-faint">
                      {fact.label}
                    </dt>
                    <dd className="text-right text-[12.5px] text-[#c2c9d7]">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <a
                href="#contact"
                className="group relative mt-5 flex items-center justify-between gap-3 rounded-xl border border-accent/20 bg-accent/[0.07] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-accent-2 transition hover:border-mint/30 hover:bg-mint/[0.06] hover:text-mint"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
