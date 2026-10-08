"use client";

import { useState } from "react";
import Script from "next/script";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { RECAPTCHA_CONTACT_ACTION } from "@/lib/recaptcha-actions";
import { getServiceOptions } from "@/lib/services";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

const SERVICE_OPTIONS = getServiceOptions();

declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

function waitForGrecaptcha(timeoutMs = 6000): Promise<NonNullable<Window["grecaptcha"]>> {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      if (window.grecaptcha?.enterprise) {
        resolve(window.grecaptcha);
        return;
      }
      if (Date.now() - start > timeoutMs) {
        reject(new Error("reCAPTCHA did not load in time."));
        return;
      }
      window.setTimeout(check, 150);
    };

    check();
  });
}

async function getRecaptchaToken(siteKey: string): Promise<string> {
  const grecaptcha = await waitForGrecaptcha();

  return new Promise((resolve, reject) => {
    grecaptcha.enterprise.ready(async () => {
      try {
        const token = await grecaptcha.enterprise.execute(siteKey, {
          action: RECAPTCHA_CONTACT_ACTION,
        });
        resolve(token);
      } catch (err) {
        reject(err);
      }
    });
  });
}

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ defaultService }: { defaultService?: string }) {
  const initialService = SERVICE_OPTIONS.some((option) => option.value === defaultService)
    ? (defaultService as string)
    : "";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(initialService);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    let recaptchaToken: string | undefined;

    if (RECAPTCHA_SITE_KEY) {
      try {
        recaptchaToken = await getRecaptchaToken(RECAPTCHA_SITE_KEY);
      } catch {
        setStatus("error");
        setErrorMessage("We couldn't confirm you're human. Please refresh the page and try again.");
        return;
      }
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, service, message, recaptchaToken }),
      });

      const data = (await response.json()) as { success: boolean; message?: string };

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.message || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 py-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-accent text-accent">
          <HugeiconsIcon icon={Tick02Icon} className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="text-lg font-semibold text-foreground">Message sent.</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Thanks{name ? `, ${name}` : ""} — I&apos;ll get back to you within a couple of days.
        </p>
      </div>
    );
  }

  return (
    <>
      {RECAPTCHA_SITE_KEY ? (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${RECAPTCHA_SITE_KEY}`}
          strategy="afterInteractive"
        />
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-4 text-xl leading-relaxed text-foreground sm:text-2xl lg:text-3xl">
          <span>My name is</span>
          <label htmlFor="contact-name" className="sr-only">
            Your name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe"
            className="w-40 border-b-2 border-border bg-transparent px-1 pb-1 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none sm:w-56"
          />

          <span>and I need help with</span>
          <label htmlFor="contact-service" className="sr-only">
            Service
          </label>
          {/* Wrapped so the full stop sits flush against the select instead of taking a flex gap. */}
          <span className="inline-flex items-baseline">
            <select
              id="contact-service"
              name="service"
              required
              value={service}
              onChange={(event) => setService(event.target.value)}
              className="border-b-2 border-border bg-transparent px-1 pb-1 text-foreground focus:border-accent focus:outline-none"
            >
              <option value="" disabled>
                choose one
              </option>
              {SERVICE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <span>.</span>
          </span>

          <span>You can reach me at</span>
          <label htmlFor="contact-email" className="sr-only">
            Your email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className="w-48 border-b-2 border-border bg-transparent px-1 pb-1 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none sm:w-64"
          />

          <span>to get things started.</span>
        </div>

        <div className="mt-10">
          <label
            htmlFor="contact-message"
            className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase"
          >
            Tell me a bit more
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="What are you trying to build or solve?"
            className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
        </div>

        {errorMessage ? (
          <p className="mt-4 text-sm font-medium text-red-600 dark:text-red-400">{errorMessage}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-5">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Send message"}
            <HugeiconsIcon icon={ArrowUpRight01Icon} className="h-4 w-4" aria-hidden="true" />
          </button>

          {RECAPTCHA_SITE_KEY ? (
            <p className="max-w-xs text-xs text-muted-foreground">
              This site is protected by reCAPTCHA Enterprise and the Google{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noreferrer"
                className="underline transition-colors hover:text-accent"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://policies.google.com/terms"
                target="_blank"
                rel="noreferrer"
                className="underline transition-colors hover:text-accent"
              >
                Terms of Service
              </a>{" "}
              apply.
            </p>
          ) : null}
        </div>
      </form>
    </>
  );
}
