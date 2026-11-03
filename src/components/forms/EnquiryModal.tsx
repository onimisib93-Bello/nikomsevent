"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, type InputHTMLAttributes } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { packageFilters } from "@/content/packages";
import { site } from "@/content/site";
import { enquirySchema, type EnquiryData, type EnquiryInput } from "@/lib/schemas";

type Props = { open: boolean; onClose: () => void; occasion?: string; packageName?: string };

export function EnquiryModal({ open, onClose, occasion, packageName }: Props) {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryInput, unknown, EnquiryData>({ resolver: zodResolver(enquirySchema) });

  useEffect(() => {
    if (!open) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- start each opening fresh
    setStatus("idle");
    reset({ occasion: occasion ?? "", message: packageName ? `I'm interested in the ${packageName} package.` : "" });
  }, [open, occasion, packageName, reset]);

  const onSubmit = handleSubmit(async (data) => {
    const res = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setStatus(res.ok ? "sent" : "error");
  });

  return (
    <Modal open={open} onClose={onClose} title={status === "sent" ? "Enquiry sent" : "Check a date"} description={status === "sent" ? undefined : "Tell us the basics. The events desk replies within one working day."} size="lg">
      {status === "sent" ? (
        <div className="py-6">
          <p className="max-w-md text-lg">Thanks. The events desk will call or email you within one working day to confirm availability.</p>
          <p className="mt-3 text-stone">Need an answer sooner? Call {site.phone}.</p>
          <Button className="mt-8" onClick={onClose}>Close</Button>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
          <Field label="Your name" error={errors.name?.message} reg={register("name")} autoComplete="name" first />
          <Field label="Phone" type="tel" error={errors.phone?.message} reg={register("phone")} autoComplete="tel" />
          <Field label="Email" type="email" error={errors.email?.message} reg={register("email")} autoComplete="email" />
          <div>
            <label htmlFor="enq-occasion" className="mb-1.5 block text-sm text-stone">Kind of event</label>
            <select id="enq-occasion" {...register("occasion")} aria-invalid={!!errors.occasion} className="min-h-12 w-full border-b border-ink/20 bg-transparent py-2 outline-none focus:border-plum">
              <option value="">Choose one</option>
              {packageFilters.occasion.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {errors.occasion && <p className="mt-1.5 text-sm text-[#a3262a]">{errors.occasion.message}</p>}
          </div>
          <Field label="Preferred date" type="date" error={errors.date?.message} reg={register("date")} />
          <Field label="Number of guests" type="number" inputMode="numeric" error={errors.guests?.message} reg={register("guests")} />
          <div className="sm:col-span-2">
            <label htmlFor="enq-message" className="mb-1.5 block text-sm text-stone">Anything else (optional)</label>
            <textarea id="enq-message" rows={3} {...register("message")} className="w-full resize-none border-b border-ink/20 bg-transparent py-2 outline-none focus:border-plum" />
          </div>
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-stone" role="status">
              {status === "error" ? "That didn't send. Check your connection and try again, or call us." : `Or call ${site.phone}`}
            </p>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending…" : "Send enquiry"}</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

type FieldProps = { label: string; error?: string; reg: UseFormRegisterReturn; type?: string; first?: boolean } & Omit<InputHTMLAttributes<HTMLInputElement>, keyof UseFormRegisterReturn>;

function Field({ label, error, reg, type = "text", first, ...rest }: FieldProps) {
  const id = `enq-${reg.name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-stone">{label}</label>
      <input
        id={id}
        type={type}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
        data-autofocus={first || undefined}
        {...rest}
        {...reg}
        className="min-h-12 w-full border-b border-ink/20 bg-transparent py-2 outline-none transition-colors focus:border-plum aria-[invalid=true]:border-[#a3262a]"
      />
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm text-[#a3262a]">{error}</p>}
    </div>
  );
}
