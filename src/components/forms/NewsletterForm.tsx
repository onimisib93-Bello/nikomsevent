"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@/components/ui/Icon";
import { newsletterSchema, type NewsletterInput } from "@/lib/schemas";

/** Inline email capture. `tone` sets colours for dark or light grounds. */
export function NewsletterForm({ tone = "dark", label = "Email address", cta = "Send me open dates" }: { tone?: "dark" | "light"; label?: string; cta?: string }) {
  const id = useId();
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = handleSubmit(async (data) => {
    setFailed(false);
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) setSent(true);
    else setFailed(true);
  });

  const dark = tone === "dark";
  const line = dark ? "border-paper/40 focus-within:border-paper" : "border-ink/25 focus-within:border-ink";
  const message = errors.email?.message ?? (failed ? "That didn't go through. Try again in a moment." : null);

  if (sent) {
    return <p role="status" className={dark ? "text-paper" : "text-ink"}>You&apos;re on the list. Open dates arrive on the first of each month.</p>;
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <label htmlFor={id} className={`mb-2 block text-sm ${dark ? "text-paper/70" : "text-stone"}`}>{label}</label>
      <div className={`flex items-center border-b transition-colors ${line}`}>
        <input
          id={id}
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          aria-invalid={!!errors.email}
          aria-describedby={message ? `${id}-msg` : undefined}
          {...register("email")}
          className={`min-h-12 w-full bg-transparent outline-none ${dark ? "text-paper placeholder:text-paper/40" : "text-ink placeholder:text-stone/60"}`}
        />
        <button type="submit" disabled={isSubmitting} className={`group/nl flex min-h-12 shrink-0 items-center gap-2 pl-4 font-medium ${dark ? "text-paper" : "text-ink"}`}>
          <span>{isSubmitting ? "Sending…" : cta}</span>
          <Icon name="arrowRight" className="transition-transform duration-300 group-hover/nl:translate-x-1" />
        </button>
      </div>
      {message && <p id={`${id}-msg`} className={`mt-2 text-sm ${dark ? "text-gold-soft" : "text-[#a3262a]"}`}>{message}</p>}
    </form>
  );
}
