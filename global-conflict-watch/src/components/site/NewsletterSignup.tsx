"use client";

import { useId, useState } from "react";

interface NewsletterSignupProps {
  heading?: string;
  description?: string;
  className?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Front-end only. The address is held in component state for the lifetime of the
 * page and never sent anywhere — there is no subscription backend yet.
 */
export function NewsletterSignup({
  heading = "Get the Daily Intelligence Digest",
  description = "One briefing each morning: cyber threats, the private-security market, and defence-industry technology, with sources and confidence ratings attached.",
  className = "",
}: NewsletterSignupProps) {
  const fieldId = useId();
  const noteId = `${fieldId}-note`;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(EMAIL_PATTERN.test(email.trim()) ? "done" : "error");
  }

  return (
    <section className={`soft-panel p-6 sm:p-8 ${className}`} aria-labelledby={`${fieldId}-heading`}>
      <p className="eyebrow">Daily email</p>
      <h2 id={`${fieldId}-heading`} className="mt-2 text-balance text-[22px] font-semibold tracking-[-0.02em] text-slate-50 sm:text-[26px]">
        {heading}
      </h2>
      <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-slate-400">{description}</p>

      {status === "done" ? (
        <div className="mt-6 rounded-none border border-cyan-300/20 bg-cyan-400/[0.07] p-5" role="status">
          <p className="text-[15px] font-semibold text-cyan-100">Address captured in this page only.</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-400">
            This is an interface demonstration. Nothing was transmitted, stored, or shared — the value you entered lives in browser
            memory and disappears when you reload. Subscription delivery is not connected yet.
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail("");
              setStatus("idle");
            }}
            className="mt-4 rounded-none border border-white/10 px-4 py-2 text-[13px] text-slate-300 transition-colors hover:bg-white/5 hover:text-slate-100"
          >
            Enter another address
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <label htmlFor={fieldId} className="block text-[13px] font-medium text-slate-300">
            Email address
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id={fieldId}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-describedby={noteId}
              aria-invalid={status === "error"}
              className="min-w-0 flex-1 rounded-none border border-white/10 bg-white/[0.04] px-4 py-2.5 text-[15px] text-slate-100 placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="shrink-0 rounded-none border border-cyan-300/25 bg-cyan-400/10 px-5 py-2.5 text-[14px] font-semibold text-cyan-100 transition-colors hover:bg-cyan-400/15"
            >
              Sign up
            </button>
          </div>
          {status === "error" ? (
            <p role="alert" className="mt-2 text-[13px] text-amber-200">
              Enter an email address in the form name@example.com.
            </p>
          ) : null}
          <p id={noteId} className="mt-3 text-[12px] leading-relaxed text-slate-500">
            Demonstration form. No data is transmitted or stored — there is no mailing backend connected.
          </p>
        </form>
      )}
    </section>
  );
}
