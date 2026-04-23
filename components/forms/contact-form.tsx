"use client";

import * as React from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/ui/form-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactSchema } from "@/lib/validation/booking";
import { track, EVENTS } from "@/lib/analytics/events";

type Topic = "sales" | "service" | "partnership" | "press" | "other";

export function ContactForm() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [topic, setTopic] = React.useState<Topic>("sales");
  const [message, setMessage] = React.useState("");
  const [consent, setConsent] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [reference, setReference] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse({
      name,
      phone,
      email,
      topic,
      message,
      consent,
    });
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? "Invalid"]),
        ),
      );
      return;
    }
    setSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ _: data.error ?? "Something went wrong." });
        return;
      }
      setReference(data.reference);
      track(EVENTS.CONTACT_SUBMITTED, { topic });
    } catch {
      setErrors({ _: "Network error. Try WhatsApp or call us instead." });
    } finally {
      setSubmitting(false);
    }
  };

  if (reference) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[var(--color-brand-soft)] text-[var(--color-brand)] mb-5">
          <Check className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="text-h2 mb-2">Got it — we'll be in touch.</h2>
        <p className="text-[var(--color-text-muted)] mb-3">
          Your reference:{" "}
          <span className="font-mono font-semibold text-[var(--color-text)]">
            {reference}
          </span>
        </p>
        <Button asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {errors._ && (
        <p
          role="alert"
          className="rounded-lg bg-[var(--color-danger-soft)] text-[var(--color-danger)] px-4 py-3 text-sm"
        >
          {errors._}
        </p>
      )}

      <FormField id="c-name" label="Your name" required error={errors.name}>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormField>

      <div className="grid md:grid-cols-2 gap-4">
        <FormField id="c-phone" label="Mobile number" required error={errors.phone}>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            inputMode="numeric"
          />
        </FormField>
        <FormField id="c-email" label="Email" required error={errors.email}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </FormField>
      </div>

      <FormField id="c-topic" label="I'm asking about" required>
        <Select value={topic} onValueChange={(v) => setTopic(v as Topic)}>
          <SelectTrigger id="c-topic">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sales">Buying a scooter</SelectItem>
            <SelectItem value="service">Service / warranty</SelectItem>
            <SelectItem value="partnership">Partnerships / dealership</SelectItem>
            <SelectItem value="press">Press / media</SelectItem>
            <SelectItem value="other">Something else</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField id="c-message" label="How can we help?" required error={errors.message}>
        <textarea
          id="c-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-[var(--color-border-strong)] bg-white px-3.5 py-2.5 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
          placeholder="Share any context so we can help faster — which model, which city, any specific question"
        />
      </FormField>

      <label className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[var(--color-border-strong)]"
        />
        <span className="text-sm text-[var(--color-text-muted)]">
          I agree to be contacted about my enquiry and accept ElectricPe's{" "}
          <Link href="/privacy" className="text-[var(--color-brand)] underline">
            privacy policy
          </Link>
          .
        </span>
      </label>
      {errors.consent && (
        <p className="text-xs text-[var(--color-danger)]" role="alert">
          {errors.consent}
        </p>
      )}

      <Button type="submit" loading={submitting} size="lg" fullWidth>
        Send message
      </Button>
    </form>
  );
}
