"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/leads";

const STAGES = ["Idea", "Prototype", "Live product"];

// Same field styling as the home contact form
const inputClass =
    "w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all duration-300";

export function SprintForm({ source, ctaLabel }: { source: string; ctaLabel: string }) {
    const [form, setForm] = useState({ name: "", email: "", idea: "", stage: STAGES[0], timeline: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    const update = (field: keyof typeof form) =>
        (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
            setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");
        try {
            await submitLead({
                name: form.name,
                email: form.email,
                phone: "",
                message: `${ctaLabel} request\nIdea: ${form.idea}\nStage: ${form.stage}\nTimeline: ${form.timeline}`,
                source,
            });
            setStatus("sent");
        } catch (error) {
            console.error("Error sending sprint request:", error);
            setStatus("error");
        }
    };

    if (status === "sent") {
        return (
            <div className="flex flex-col items-start gap-4 py-8">
                <CheckCircle2 className="w-12 h-12 text-brand-cyan" />
                <h3 className="text-2xl font-bold text-white">Thanks, {form.name.split(" ")[0] || "we got it"}.</h3>
                <p className="text-neutral-400">We will review your idea and come back to {form.email} with a plan.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Name" htmlFor="sprint-name">
                    <input id="sprint-name" required autoComplete="name" value={form.name} onChange={update("name")} placeholder="Your name" className={inputClass} />
                </Field>
                <Field label="Email" htmlFor="sprint-email">
                    <input id="sprint-email" type="email" required autoComplete="email" value={form.email} onChange={update("email")} placeholder="you@company.com" className={inputClass} />
                </Field>
            </div>
            <Field label="Your idea" htmlFor="sprint-idea">
                <textarea id="sprint-idea" required rows={3} value={form.idea} onChange={update("idea")} placeholder="What do you want to build?" className={cn(inputClass, "resize-none")} />
            </Field>
            <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-zinc-400 ml-1 mb-2">Stage</legend>
                <div className="flex flex-wrap gap-2">
                    {STAGES.map((stage) => {
                        const active = form.stage === stage;
                        return (
                            <button
                                key={stage}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setForm((prev) => ({ ...prev, stage }))}
                                className={cn(
                                    "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300",
                                    active
                                        ? "bg-white text-black border-white"
                                        : "bg-zinc-800/50 text-neutral-300 border-white/10 hover:border-white/30"
                                )}
                            >
                                {stage}
                            </button>
                        );
                    })}
                </div>
            </fieldset>
            <Field label="Timeline" htmlFor="sprint-timeline">
                <input id="sprint-timeline" value={form.timeline} onChange={update("timeline")} placeholder="When do you want to launch?" className={inputClass} />
            </Field>

            {status === "error" && (
                <p className="text-sm text-red-400">Something went wrong. Please try again or email us directly.</p>
            )}

            <button
                type="submit"
                disabled={status === "sending"}
                className="group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-black bg-white hover:bg-neutral-200 shadow-lg hover:shadow-white/10 transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
            >
                {status === "sending" ? <span className="animate-pulse">Sending...</span> : <>{ctaLabel}<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /></>}
            </button>
        </form>
    );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <label htmlFor={htmlFor} className="text-sm font-medium text-zinc-400 ml-1">{label}</label>
            {children}
        </div>
    );
}
