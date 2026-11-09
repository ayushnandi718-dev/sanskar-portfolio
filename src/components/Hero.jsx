import { ArrowDown, ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { profile, roles, stats } from "../data/portfolio";
import { Counter, Magnetic, Reveal, Typewriter } from "./ui";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";
import DevCard from "./DevCard";
import Marquee from "./Marquee";

const socials = [
  { href: profile.github, label: "GitHub", Icon: GithubIcon },
  { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  { href: profile.whatsapp, label: "WhatsApp", Icon: WhatsappIcon },
  { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate overflow-x-clip pt-28 sm:pt-32 lg:pt-36"
    >
      <div className="shell relative grid min-w-0 grid-cols-1 items-center gap-14 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-28">
        <div className="relative z-10 mx-auto w-full max-w-2xl lg:mx-0">
          <Reveal>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/[0.05] px-3.5 py-1.5 font-mono text-[10.5px] text-[#a9f0dc] transition hover:border-mint/40 hover:bg-mint/[0.08]"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
              </span>
              {profile.availability}
              <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-[clamp(3.2rem,8.4vw,5.7rem)] font-bold leading-[0.92] tracking-[-0.05em]">
              <span className="block">Sanskar</span>
              <span className="block">
                <span className="text-shine">Pandey</span>
                <span className="text-mint">.</span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist sm:text-[11.5px]">
              <span className="h-px w-8 bg-gradient-to-r from-mint to-transparent" />
              <Typewriter words={roles} className="text-[#d8dce7]" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mist sm:text-base">
              I design and build Android, iOS, Flutter and web applications that turn
              real-world problems into simple, reliable digital experiences - from the
              first screen to a Play Store release.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a href="#work" className="btn btn-primary">
                  Explore my work
                  <ArrowDown aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic strength={0.18}>
                <a href="#contact" className="btn btn-ghost">
                  Let's talk
                  <MessageCircle aria-hidden="true" />
                </a>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-faint">
                Find me
              </span>
              <span className="h-px w-6 bg-white/10" />
              <div className="flex items-center gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.025] text-mist transition duration-300 hover:-translate-y-0.5 hover:border-mint/30 hover:bg-mint/[0.06] hover:text-mint"
                  >
                    <Icon className="h-[15px] w-[15px]" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-10 grid grid-cols-3 gap-5 border-t border-white/10 pt-7 sm:gap-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-mono text-2xl font-medium tracking-tight text-white sm:text-[28px]">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1 text-[10.5px] leading-snug text-faint sm:text-[11.5px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={0.15}
          className="relative z-10 mx-auto w-full min-w-0 max-w-[620px]"
        >
          <DevCard />
        </Reveal>
      </div>

      <Marquee />
    </section>
  );
}
