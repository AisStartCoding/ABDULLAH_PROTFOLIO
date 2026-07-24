"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { CommandCard } from "@/components/ui/CommandCard";
import { submitContactMessage } from "@/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      subject: String(data.get("subject") ?? "").trim(),
      message: String(data.get("message") ?? "").trim()
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setFieldErrors({ detail: ["Name, email, and message are required."] });
      return;
    }

    const result = await submitContactMessage(payload);
    if (result.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setFieldErrors(result.errors);
    }
  }

  const errorMessages = Object.values(fieldErrors).flat();

  return (
    <CommandCard>
      {status === "success" ? (
        <div className="flex flex-col items-center gap-3 py-8 text-center">
          <CheckCircle2 className="h-10 w-10 text-green-400" />
          <p className="text-lg font-semibold text-slate-50">Message sent</p>
          <p className="text-sm text-slate-400">I&apos;ll get back to you as soon as I can.</p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-2 text-sm font-semibold text-blue-400 hover:text-blue-300"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-md border border-slate-700/60 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-electric-blue"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-md border border-slate-700/60 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-electric-blue"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Project or opportunity
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              placeholder="e.g. Backend rebuild, full-time role, contract work"
              className="w-full rounded-md border border-slate-700/60 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-electric-blue"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className="w-full resize-none rounded-md border border-slate-700/60 bg-slate-900 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-electric-blue"
            />
          </div>

          {status === "error" && errorMessages.length > 0 ? (
            <div role="alert" className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <ul className="space-y-0.5">
                {errorMessages.map((msg) => <li key={msg}>{msg}</li>)}
              </ul>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-md border border-green-600 bg-green-600 px-5 text-sm font-semibold text-slate-950 shadow-[0_14px_34px_rgba(34,197,94,.25)] transition hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </CommandCard>
  );
}
