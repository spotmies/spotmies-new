"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "@/components/ui/count-up";
import { Container } from "@/components/expertise/primitives";

const STATS = [
    { value: 2019, label: "Established", plain: true },
    { value: 50, suffix: "+", label: "Projects completed" },
    { value: 10, label: "Industries served" },
];

// Credibility strip in the bordered-cell style of the home "Our Industries" grid
export function StatsStrip() {
    return (
        <section className="w-full bg-black py-10 md:py-16">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-white/10 bg-black/40">
                    {STATS.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group flex flex-col items-center justify-center gap-2 px-4 py-10 md:py-12 border-r border-b border-white/10 hover:bg-white/5 transition-colors"
                        >
                            <span className="text-4xl md:text-6xl font-normal tracking-[-0.04em] text-white tabular-nums">
                                {stat.plain ? stat.value : <CountUp to={stat.value} duration={1.6} />}
                                {stat.suffix && <span className="text-[#00eef9]">{stat.suffix}</span>}
                            </span>
                            <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors text-center">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.24 }}
                        className="group flex flex-col items-center justify-center gap-3 px-4 py-10 md:py-12 border-r border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_last%20image_startupindia.png"
                            alt="Startup India"
                            className="h-9 md:h-12 w-auto grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                        />
                        <span className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-neutral-500 group-hover:text-white transition-colors text-center">
                            Recognized by
                        </span>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
