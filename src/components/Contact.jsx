import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Copy,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { profile, projectTypes } from "../data/portfolio";
import { Reveal } from "./ui";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "./icons";

const emptyForm = {
  name: "",
  email: "",
  project: "",
  message: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values) {
  const next = {};
  if (values.name.trim().length < 2) next.name = "Please enter your name.";
  if (!EMAIL_RE.test(values.email.trim())) next.email = "Enter a valid email address.";
  if (values.message.trim().length < 10) {
    next.message = "Tell me a little more (at least 10 characters).";
  }
  return next;
}

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [sentTo, setSentTo] = useState("");
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef(null);

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (status === "error") {
      setStatus("idle");
      setMessage("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validation = validate(form);
    setErrors(validation);

    if (Object.keys(validation).length) return;

    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (data.errors) setErrors(data.errors);
        setMessage(data.message || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setSentTo(form.email.trim());
      setForm(emptyForm);
      setStatus("success");
    } catch {
      setMessage(
        `Couldn't reach the server. You can email me directly at ${profile.email}.`
      );
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const area = document.createElement("textarea");
      area.value = profile.email;
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

  const busy = status === "sending";

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
                  I'm available for freelance projects, collaborations and full app
                  builds. Tell me what you're working on - I'll reply as soon as I can.
                </p>

                <div className="mt-7 space-y-2.5">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-accent/20 bg-accent/[0.08] text-accent-2">
                      <Mail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        Email
                      </span>
                      <span className="mt-0.5 block truncate text-[13px] text-[#d8dce7]">
                        {profile.email}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" aria-hidden="true" />
                  </a>

                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition duration-300 hover:border-mint/30 hover:bg-white/[0.04]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-mint/20 bg-mint/[0.06] text-mint">
                      <WhatsappIcon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        WhatsApp
                      </span>
                      <span className="mt-0.5 block text-[13px] text-[#d8dce7]">
                        {profile.phone}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" aria-hidden="true" />
                  </a>

                  <a
                    href={profile.phoneHref}
                    className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5 transition duration-300 hover:border-accent/30 hover:bg-white/[0.04]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-mist">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        Phone
                      </span>
                      <span className="mt-0.5 block text-[13px] text-[#d8dce7]">
                        {profile.phone}
                      </span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-mint" aria-hidden="true" />
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
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

                  {[
                    { href: profile.github, label: "GitHub", Icon: GithubIcon },
                    { href: profile.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/10 bg-white/[0.025] text-mist transition duration-300 hover:-translate-y-0.5 hover:border-mint/30 hover:text-mint"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-faint">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" aria-hidden="true" />
                    {profile.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#35e0d0]" />
                    Open to work
                  </span>
                </div>
              </div>

              <div className="relative border-t border-white/10 bg-[#0a0d14] p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                      className="grid h-16 w-16 place-items-center rounded-full border border-mint/30 bg-mint/10 text-mint shadow-[0_0_40px_-10px_rgba(53,224,208,0.5)]"
                    >
                      <Check className="h-7 w-7" aria-hidden="true" />
                    </motion.span>
                    <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.03em]">
                      Message sent.
                    </h3>
                    <p className="mt-2 max-w-sm text-[13px] leading-6 text-mist">
                      Thanks for reaching out. I'll get back to you at{" "}
                      <span className="text-white">{sentTo}</span> as soon as I can.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setStatus("idle");
                        setForm(emptyForm);
                      }}
                      className="btn btn-ghost btn-sm mt-6"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">
                        Tell me about your project
                      </h3>
                      <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-mint">
                        <span className="h-1.5 w-1.5 rounded-full bg-mint shadow-[0_0_8px_#35e0d0]" />
                        Accepting work
                      </span>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label className="field-label" htmlFor="name">
                            Your name
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Jane Doe"
                            value={form.name}
                            onChange={(event) => update("name", event.target.value)}
                            aria-invalid={Boolean(errors.name)}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={`field ${errors.name ? "field-error" : ""}`}
                          />
                          {errors.name ? (
                            <p id="name-error" className="field-message">
                              {errors.name}
                            </p>
                          ) : null}
                        </div>

                        <div>
                          <label className="field-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="jane@company.com"
                            value={form.email}
                            onChange={(event) => update("email", event.target.value)}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={errors.email ? "email-error" : undefined}
                            className={`field ${errors.email ? "field-error" : ""}`}
                          />
                          {errors.email ? (
                            <p id="email-error" className="field-message">
                              {errors.email}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <label className="field-label" htmlFor="project">
                          What do you need?
                        </label>
                        <select
                          id="project"
                          name="project"
                          value={form.project}
                          onChange={(event) => update("project", event.target.value)}
                          className="field"
                        >
                          <option value="">Select a service (optional)</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <label className="field-label" htmlFor="message">
                            Project details
                          </label>
                          <span className="mb-2 font-mono text-[9px] text-faint">
                            {form.message.length}/4000
                          </span>
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="A few lines about what you want to build, who it's for, and any timeline..."
                          value={form.message}
                          onChange={(event) => update("message", event.target.value)}
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={errors.message ? "message-error" : undefined}
                          className={`field resize-none ${errors.message ? "field-error" : ""}`}
                        />
                        {errors.message ? (
                          <p id="message-error" className="field-message">
                            {errors.message}
                          </p>
                        ) : null}
                      </div>

                      <div aria-hidden="true" className="absolute -left-[9999px] top-0">
                        <label htmlFor="website">Website</label>
                        <input
                          id="website"
                          name="website"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={form.website}
                          onChange={(event) => update("website", event.target.value)}
                        />
                      </div>

                      {status === "error" && message ? (
                        <div
                          role="alert"
                          className="rounded-xl border border-pink/20 bg-pink/[0.06] px-4 py-3 text-[12px] leading-5 text-[#ffc1cd]"
                        >
                          {message}{" "}
                          <a
                            href={`mailto:${profile.email}`}
                            className="underline decoration-pink/40 underline-offset-2 hover:text-white"
                          >
                            Email me instead
                          </a>
                        </div>
                      ) : null}

                      <button
                        type="submit"
                        disabled={busy}
                        className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {busy ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send message
                            <Send aria-hidden="true" />
                          </>
                        )}
                      </button>

                      <p className="text-center font-mono text-[9px] leading-5 text-faint">
                        Your details stay private. No spam, ever.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
