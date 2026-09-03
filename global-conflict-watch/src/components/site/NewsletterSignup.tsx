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
    <section className={`newsletter-band p-8 sm:p-10 ${className}`} aria-labelledby={`${fieldId}-heading`}>
      <h2 id={`${fieldId}-heading`} className="type-heading">
        {heading}
      </h2>
      <p className="type-body mt-3 max-w-[56ch] text-muted">{description}</p>

      {status === "done" ? (
        <div className="mt-8 border-t border-rule pt-5" role="status">
          <p className="type-body font-semibold text-ink">Address captured in this page only.</p>
          <p className="type-body mt-2 max-w-[62ch] text-muted">
            This is an interface demonstration. Nothing was transmitted, stored, or shared — the value you entered lives in browser
            memory and disappears when you reload. Subscription delivery is not connected yet.
          </p>
          <button
            type="button"
            onClick={() => {
              setEmail("");
              setStatus("idle");
            }}
            className="btn mt-5"
          >
            Enter another address
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="mt-8">
          <label htmlFor={fieldId} className="type-meta block">
            Email address
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:max-w-[36rem]">
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
              className="field type-body min-w-0 flex-1 px-4 py-2.5"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Sign up
            </button>
          </div>
          {status === "error" ? (
            <p role="alert" className="type-body mt-2 text-flag">
              Enter an email address in the form name@example.com.
            </p>
          ) : null}
          <p id={noteId} className="type-body mt-3 max-w-[62ch] text-muted">
            Demonstration form. No data is transmitted or stored — there is no mailing backend connected.
          </p>
        </form>
      )}
    </section>
  );
}
