import { useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
} from "lucide-react";
import { profile } from "../data/portfolio";
import { Reveal } from "./ui";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";

/* Real values live here so a missing field in data/portfolio can never
   leave a row blank again. */
const CONTACT = {
  email: profile?.email || "pyc0453@gmail.com",
  phone: profile?.phone || "+91 82991 32255",
  whatsapp: profile?.whatsapp || "https://wa.me/918299132255",
  github: profile?.github || "https://github.com/SanskarDeveloper",
  githubHandle: "SanskarDeveloper",
  linkedin:
    profile?.linkedin || "https://www.linkedin.com/in/sanskar-pandey-ba9359360/",
  linkedinHandle: "sanskar-pandey",
  location: profile?.location || "West Bengal, India",
};

const STEPS = [
  {
    title: "Share the idea",
    body: "Email or WhatsApp with what you want to build, who it's for, and your timeline.",
  },
  {
    title: "Get a plan",
    body: "I reply with scope, milestones and a clear quote. No obligation, no pressure.",
  },
  {
    title: "Build & ship",
    body: "Regular updates, tested builds, and a store-ready release at the end.",
  },
];

const FITS = [
  "Android or Flutter app from scratch",
  "New features for an existing app",
  "Backend, API or Firebase work",
  "A product or portfolio website",
];

const MAIL_BODY = [
  "Hi Sanskar,",
  "",
  "I'd like to build:",
  "",
  "Who it's for:",
  "",
  "Timeline:",
  "",
  "Thanks!",
].join("\n");

const MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
  "Project enquiry — Sanskar"
)}&body=${encodeURIComponent(MAIL_BODY)}`;

const WHATSAPP = `${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hi Sanskar, I'd like to talk about a project."
)}`;

function ContactRow({ href, external, label, value, icon, tone = "accent" }) {
  const hover =
    tone === "mint" ? "hover:border-mint/30" : "hover:border-accent/30";
  const iconTone =
    tone === "mint"
      ? "border-mint/20 bg-mint/[0.06] text-mint"
      : "border-accent/20 bg-accent/[0.08] text-accent-2";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition duration-300 ${hover} hover:bg-white/[0.04]`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg border ${iconTone}`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-[13px] text-[#d8dce7]">
          {value}
        </span>
      </span>
      <ArrowUpRight
        className="h-4 w-4 shrink-0 text-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint"
        aria-hidden="true"
      />
    </a>
  );
}

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
    } catch {
      const area = document.createElement("textarea");
      area.value = CONTACT.email;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }

    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2200);
  }

  return (
    <section id="contact" className="scroll-mt-24 py-24 sm:py-28 lg:py-32">
      <div className="shell">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/70">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-32 h-80 w-80 rounded-full bg-accent/15 blur-[90px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-mint/10 blur-[90px]"
            />

            <div className="relative grid lg:grid-cols-[0.92fr_1.08fr]">
              {/* ---------- Left: details ---------- */}
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="eyebrow">
                  <span className="text-mint">06</span>
                  Contact
                </p>

                <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-bold leading-[1.04] tracking-[-0.04em]">
                  Have an app in mind?
                  <br />
                  <span className="text-gradient">Let's build it.</span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-mist">
                  I'm available for freelance projects, collaborations and full app
                  builds. Tell me what you're working on - I'll reply as soon as I can.
                </p>

                <div className="mt-7 space-y-2.5">
                  <ContactRow
                    href={`mailto:${CONTACT.email}`}
                    label="Email"
                    value={CONTACT.email}
                    icon={<Mail className="h-4 w-4" aria-hidden="true" />}
                  />
                  <ContactRow
                    href={CONTACT.whatsapp}
                    external
                    tone="mint"
                    label="WhatsApp"
                    value={CONTACT.phone}
                    icon={<WhatsappIcon className="h-4 w-4" />}
                  />
                  <ContactRow
                    href={CONTACT.github}
                    external
                    label="GitHub"
                    value={`@${CONTACT.githubHandle}`}
                    icon={<GithubIcon className="h-4 w-4" />}
                  />
                  <ContactRow
                    href={CONTACT.linkedin}
                    external
                    tone="mint"
                    label="LinkedIn"
                    value={CONTACT.linkedinHandle}
                    icon={<LinkedinIcon className="h-4 w-4" />}
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="btn btn-ghost btn-sm"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-mint" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copied ? "Copied!" : "Copy email"}
                  </button>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {CONTACT.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-mint">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#35e0d0]" />
                    </span>
                    Open to work
                  </span>
                </div>
              </div>

              {/* ---------- Right: start a project ---------- */}
              <div className="relative border-t border-white/10 bg-[#0a0d14] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">
                    Start a project
                  </h3>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-mint">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#35e0d0]" />
                    Accepting work
                  </span>
                </div>

                <p className="mt-3 max-w-md text-[13px] leading-6 text-mist">
                  No forms. Tell me what you're building and I'll reply with the
                  next step.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-pink/70" />
                    <span className="h-2 w-2 rounded-full bg-accent/70" />
                    <span className="h-2 w-2 rounded-full bg-mint/70" />
                    <span className="ml-2 font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                      sanskar — zsh
                    </span>
                  </div>
                  <div className="space-y-1 px-4 py-4 font-mono text-[11.5px] leading-6 text-mist">
                    <p>
                      <span className="text-mint">$</span> whoami
                    </p>
                    <p className="pl-3 text-white">
                      sanskar-pandey · app &amp; software developer
                    </p>
                    <p>
                      <span className="text-mint">$</span> status
                    </p>
                    <p className="pl-3 text-white">{profile.availability}</p>
                    <p>
                      <span className="text-mint">$</span> location
                    </p>
                    <p className="pl-3 text-white">{CONTACT.location}</p>
                    <p>
                      <span className="text-mint">$</span>{" "}
                      <span className="inline-block h-3.5 w-1.5 animate-pulse bg-mint align-middle" />
                    </p>
                  </div>
                </div>

                <div className="mt-7">
                  <p className="eyebrow">How it works</p>
                  <ol className="mt-4 space-y-4">
                    {STEPS.map((step, index) => (
                      <li key={step.title} className="flex gap-3">
                        <span className="mt-0.5 font-mono text-[10px] text-mint">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span>
                          <span className="block text-[13px] font-semibold text-white">
                            {step.title}
                          </span>
                          <span className="mt-0.5 block text-[12px] leading-5 text-mist">
                            {step.body}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-7">
                  <p className="eyebrow">Good fit if you need</p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {FITS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-[12px] leading-5 text-mist"
                      >
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href={MAILTO} className="btn btn-primary flex-1">
                    Email me
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost flex-1"
                  >
                    <WhatsappIcon className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>

                <p className="mt-3 text-center font-mono text-[9px] leading-5 text-faint">
                  No forms, no spam — just a direct reply.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
