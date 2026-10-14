"use client";

import React from "react";
import { motion } from "framer-motion";
import { ALL_COMPANIES, logoToneClass } from "@/data/companies";
import { cn } from "@/lib/utils";
import { Container, FadeUp } from "@/components/expertise/primitives";

// One client per industry, to show the range, plus our own OpenPlan AI
const FEATURED = [
    "Andhra University Incubation Center",
    "Reaidy",
    "OpenPlan AI",
    "SMARTFALCON",
    "Credit Report",
    "DecenTrialz",
    "IOX Academy",
    "Nandikrushi",
    "Chalo Ride",
    "A Square GoKarting",
    "TheReachX",
    "Referral Bazaar",
    "BoomBoomTalk",
];

// Client logos in a borderless, centred wall. Hovering one turns its cell white and shows the logo in its
// own colours (most are made for light backgrounds), along with its industry.
export function LogoStrip() {
    const logos = FEATURED.map((name) => ALL_COMPANIES.find((c) => c.name === name)).filter((c) => c !== undefined);
    return (
        <section className="relative w-full bg-black py-12 md:py-16">
            <Container>
                <FadeUp>
                    <p className="mb-8 text-center text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                        Trusted by founders and teams across industries
                    </p>
                </FadeUp>
                {/* Borderless and centred: rows wrap at a fixed width per logo (7 a row on desktop, so 13 logos sit 7 over 6),
                    and a short last row centres under the full one */}
                <div className="flex flex-wrap justify-center gap-y-2">
                    {logos.map((logo, i) => (
                        <motion.div
                            key={logo.name}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: (i % 7) * 0.05 }}
                            className="group relative flex h-24 md:h-28 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/7 items-center justify-center px-3"
                        >
                            {/* Every hover change is an opacity or transform fade. Animating the filter itself passes through a flat
                                grey halfway, which flashed when moving quickly between logos. */}
                            <div aria-hidden="true" className="absolute inset-1 rounded-2xl bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative grid place-items-center w-full transition-transform duration-300 group-hover:-translate-y-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={logo.src}
                                    alt={logo.name}
                                    loading="lazy"
                                    className={cn("col-start-1 row-start-1 max-h-9 md:max-h-10 w-auto max-w-[80%] object-contain opacity-50 transition-opacity duration-300 group-hover:opacity-0", logoToneClass(logo))}
                                />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={logo.src}
                                    alt=""
                                    loading="lazy"
                                    className="col-start-1 row-start-1 max-h-9 md:max-h-10 w-auto max-w-[80%] object-contain opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </div>
                            <span className="pointer-events-none absolute bottom-2.5 md:bottom-3 inset-x-2 text-center text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-neutral-500 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                {logo.desc}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
