import { useState, useRef } from "react";
import { Reveal } from "./ui";

const ContactDetails = () => {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

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
                  I'm available for freelance projects, collaborations and full app builds. Tell me what you're working on - I'll reply as soon as I can.
                </p>

                <div className="mt-7 space-y-2.5">
                  <a
                    href="mailto:pyc0453@gmail.com"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
                  >
                    <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center">
                      M
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        Email
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] text-[#d8dce7]">
                        pyc0453@gmail.com
                      </span>
                    </span>
                  </a>

                  <a
                    href="https://wa.me/+918299132255"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition duration-300 hover:border-mint/30 hover:bg-white/[0.04]"
                  >
                    <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center">
                      W
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        WhatsApp
                      </span>
                      <span className="mt-0.5 block text-[13px] text-[#d8dce7]">
                        +91 82991 32255
                      </span>
                    </span>
                  </a>

                  <a
                    href="https://github.com/SanskarDeveloper"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
                  >
                    <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center">
                      G
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        GitHub
                      </span>
                    </span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/sanskar-pandey-ba9359360/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition duration-300 hover:border-mint/30 hover:bg-white/[0.04]"
                  >
                    <span className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.02] flex items-center justify-center">
                      L
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        LinkedIn
                      </span>
                    </span>
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5">
                    Location
                    West Bengal, India
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    Open to work
                  </span>
                </div>
              </div>

              <div className="relative border-t border-white/10 bg-[#0a0d14] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <p className="text-center font-mono text-[9px] leading-5 text-faint">
                  Your details stay private. No spam, ever.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactDetails;