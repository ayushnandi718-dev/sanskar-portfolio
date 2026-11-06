import { ArrowUpRight, Mail } from "lucide-react";
import { navItems, profile } from "../data/portfolio";
import { GithubIcon, LinkedinIcon, PlayStoreIcon, WhatsappIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 py-12 sm:py-14">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-[1.5fr_0.8fr_0.8fr]">
          <div>
            <a href="#top" className="group inline-flex items-center gap-2.5" aria-label="Sanskar Pandey - back to top">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-accent/30 bg-accent/10 font-mono text-[11px] font-semibold tracking-wider text-accent-2 transition duration-300 group-hover:-rotate-6 group-hover:border-mint/40 group-hover:text-mint">
                {profile.monogram}
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight">
                Sanskar<span className="text-mint">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[12.5px] leading-6 text-mist">
              Building practical Android, Flutter and web products that solve real
              problems - one release at a time.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { href: profile.github, label: "GitHub", Icon: GithubIcon },
                { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                { href: profile.whatsapp, label: "WhatsApp", Icon: WhatsappIcon },
                { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.025] text-mist transition duration-300 hover:-translate-y-0.5 hover:border-mint/30 hover:text-mint"
                >
                  <Icon className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
              Navigate
            </p>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[12.5px] text-mist transition hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
              Get in touch
            </p>
            <ul className="mt-4 space-y-2.5 text-[12.5px] text-mist">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 transition hover:text-mint"
                >
                  {profile.email}
                  <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href={profile.phoneHref} className="transition hover:text-mint">
                  {profile.phone}
                </a>
              </li>
              <li className="flex items-center gap-1.5 pt-1 text-faint">
                <PlayStoreIcon className="h-3.5 w-3.5 text-mint" />
                3 live apps on Google Play
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-faint">
            © {year} Sanskar Pandey. All rights reserved.
          </p>

          <p className="flex flex-wrap items-center gap-2 text-[11px] text-faint">
            Made by
            <a
              href="https://aux-studio.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-mist transition hover:text-mint"
            >
              AUX STUDIO
              <ArrowUpRight
                className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
