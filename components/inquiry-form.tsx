"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""), // honeypot
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong — please try emailing me directly.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMessage("Something went wrong — please try emailing me directly.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-2 py-6 text-center"
      >
        <CheckCircle2 className="size-8 text-green-500" />
        <p className="font-medium">Thanks — got it.</p>
        <p className="text-sm text-muted-foreground">
          I&apos;ll reply within a day, usually much sooner.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="inquiry-name">Name</FieldLabel>
          <FieldContent>
            <Input id="inquiry-name" name="name" placeholder="Your name" required maxLength={100} />
          </FieldContent>
        </Field>
        <Field>
          <FieldLabel htmlFor="inquiry-email">Email</FieldLabel>
          <FieldContent>
            <Input id="inquiry-email" name="email" type="email" placeholder="you@company.com" required maxLength={254} />
          </FieldContent>
        </Field>
      </div>

      <Field>
        <FieldLabel htmlFor="inquiry-message">Message</FieldLabel>
        <FieldContent>
          <Textarea
            id="inquiry-message"
            name="message"
            placeholder="What are you building, and what do you need help with?"
            required
            maxLength={5000}
            className="min-h-28"
          />
        </FieldContent>
      </Field>

      {status === "error" && (
        <div className="flex items-start gap-2 rounded-xl bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span>
            {errorMessage}{" "}
            <a href="mailto:James@dimonaco.co.uk" className="underline underline-offset-4">
              Email me instead
            </a>
            .
          </span>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={status === "submitting"}
        className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full sm:w-auto")}
      >
        {status === "submitting" ? (
          <>Sending…</>
        ) : (
          <>
            <Send className="size-4" />
            Send Inquiry
          </>
        )}
      </motion.button>
      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Mail className="size-3" />
        Prefer email? <a href="mailto:James@dimonaco.co.uk" className="underline underline-offset-4 hover:text-foreground">James@dimonaco.co.uk</a>
      </p>
    </form>
  );
}
