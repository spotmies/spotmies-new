"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AmbientBackground } from "@/components/ui/ambient-background";
import Image from "next/image";
import Link from "next/link";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { FOUNDERS } from "@/data/team";

// --- ANIMATION VARIANTS ---
const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.1 * i,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

export function FoundersSection() {
    return (
        <section id="founders" className="relative w-full bg-[#050505] py-24 px-6 md:px-6 overflow-visible">
            <AmbientBackground intensity="subtle" />

            <div className="relative z-10 max-w-[1320px] mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">

                    {/* Left Side: Visuals */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex-1 min-w-[300px] flex flex-col w-full items-start lg:items-start"
                    >
                        {/* Image Stack */}
                        <div className="w-full flex items-center justify-center lg:justify-start mb-12">
                            <AnimatedTooltip items={FOUNDERS} />
                        </div>

                        <motion.div
                            variants={fadeUpVariant}
                            custom={4}
                            className="flex flex-col gap-3 pl-2 items-start lg:items-start"
                        >
                            <span className="text-sm font-medium tracking-[0.2em] text-neutral-400 uppercase mb-1">
                                Founders of
                            </span>

                            {/* --- BRAND BLOCK LAYOUT --- */}
                            <div className="flex items-center gap-5">
                                {/* Logo */}
                                <div className="relative h-10 w-48 md:h-12 md:w-56">
                                    <Image
                                        src="/spotmies_banner.png"
                                        alt="Spotmies Logo"
                                        fill
                                        className="object-contain object-left drop-shadow-[0_0_15px_rgba(0,238,249,0.25)]"
                                    />
                                </div>

                                {/* Vertical Divider */}
                                <div className="h-8 w-px bg-white/10" />

                                {/* EST 2019 */}
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest leading-none mb-1">
                                        EST
                                    </span>
                                    <span className="text-sm font-bold text-[#00eef9] tracking-[0.2em] leading-none shadow-[#00eef9]/20 drop-shadow-sm">
                                        2019
                                    </span>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        // FIX: Changed "text-center lg:text-left" to "text-left"
                        className="flex-[1.2] text-left"
                    >
                        <motion.h2
                            variants={fadeUpVariant}
                            custom={1}
                            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] mb-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                        >
                            We help business elevate their value through custom software development, product design, QA and consulting services.
                        </motion.h2>

                        <motion.div
                            variants={fadeUpVariant}
                            custom={2}
                        >
                            <Link href="/about" className="inline-flex items-center gap-3 bg-[#00eef9] text-black px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:bg-[#5ff6fc] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,238,249,0.4)] shadow-[0_0_20px_rgba(0,238,249,0.2)]">
                                More About Us
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}