"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Mail, Phone } from "lucide-react";
import { SprintForm } from "@/components/expertise/sprint-form";
import { Container, Headline, PillEyebrow } from "@/components/expertise/primitives";
import type { ExpertisePage } from "@/data/expertise";

const CALL_US_NUMBER = process.env.NEXT_PUBLIC_CALL_US_NUMBER || "+91 7416498484";

// Laid out like the home contact section: pitch on the left, glass form on the right
export function StartSection({ page }: { page: ExpertisePage }) {
    const { start } = page;
    return (
        <section id="start" className="relative w-full py-24 px-0 md:py-32 overflow-hidden bg-[#0a0a0a]">
            <Container className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col"
                >
                    <PillEyebrow className="mb-6 w-fit">{start.eyebrow}</PillEyebrow>
                    <Headline title={start.title} className="text-4xl md:text-6xl leading-tight" />
                    <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-md">{start.body}</p>

                    <ul className="mt-10 space-y-4">
                        {start.promises.map((promise) => (
                            <li key={promise} className="flex items-center gap-4 text-white">
                                <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#00d3f3]/10 border border-[#00d3f3]/30 text-[#00d3f3] shrink-0">
                                    <Check className="w-4 h-4" />
                                </span>
                                <span className="text-base md:text-lg">{promise}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap gap-x-10 gap-y-5">
                        <ContactLink icon={<Mail className="w-5 h-5" />} label="Email us" value="info@spotmies.com" href="mailto:info@spotmies.com" />
                        <ContactLink icon={<Phone className="w-5 h-5" />} label="Call us" value={CALL_US_NUMBER} href={`tel:${CALL_US_NUMBER.replace(/\s+/g, "")}`} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-6 md:p-10 lg:p-14 shadow-xl">
                        <SprintForm source={`expertise-${page.slug}`} ctaLabel={page.ctaLabel} />
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}

function ContactLink({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href: string }) {
    return (
        <a href={href} className="flex items-center gap-4 group">
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white group-hover:border-[#00d3f3] group-hover:text-[#00d3f3] transition-all duration-300">
                {icon}
            </span>
            <span>
                <span className="block text-sm text-zinc-500">{label}</span>
                <span className="block text-white font-medium group-hover:text-[#00d3f3] transition-colors">{value}</span>
            </span>
        </a>
    );
}
