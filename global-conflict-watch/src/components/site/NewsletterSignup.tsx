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
  heading = "The daily briefing, by email",
  description = "One briefing each morning: cyber threats, the private-security market, and defence-industry technology. Sources and a confidence rating on every story.",
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
    <section className={`soft-panel newsletter-band p-6 sm:p-8 ${className}`} aria-labelledby={`${fieldId}-heading`}>
      <p className="eyebrow eyebrow-signal">Daily email</p>
      <h2 id={`${fieldId}-heading`} className="headline-section mt-2">
        {heading}
      </h2>
      <p className="standfirst-sm mt-3 max-w-[56ch]">{description}</p>

      {status === "done" ? (
        <div className="soft-panel panel-note mt-6 p-5" role="status">
          <p className="text-[15px] font-semibold text-ink">Address captured in this page only.</p>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            This is an interface demonstration. Nothing was transmitted, stored, or shared — the value you entered lives in browser
            memory and disappears when you reload. Subscription delivery is not connected yet.
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail("");
              setStatus("idle");
            }}
            className="btn mt-4"
          >
            Enter another address
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-6">
          <label htmlFor={fieldId} className="block text-[13px] font-medium text-muted">
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
              className="field min-w-0 flex-1 px-4 py-2.5 text-[15px]"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Sign up
            </button>
          </div>
          {status === "error" ? (
            <p role="alert" className="mt-2 text-[13px] text-flag">
              Enter an email address in the form name@example.com.
            </p>
          ) : null}
          <p id={noteId} className="mt-3 text-[12px] leading-relaxed text-faint">
            Demonstration form. No data is transmitted or stored — there is no mailing backend connected.
          </p>
        </form>
      )}
    </section>
  );
}
