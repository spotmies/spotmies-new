"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    Search,
    PenTool,
    Code2,
    Rocket,
    ArrowUpRight
} from "lucide-react";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { IndustriesGrid } from "@/components/landing/industries-grid";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { cdn } from "@/lib/cdn";

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

export function ProcessSection() {
    return (
        <div id="process" className="relative bg-[#050505] text-white font-sans selection:bg-brand-cyan/30 overflow-hidden">
            <NoiseOverlay />
            <AmbientBackground intensity="medium" className="z-0" />

            {/* 1. THE PROCESS */}
            <section className="max-w-[1400px] mx-auto min-h-[50vh] flex flex-col justify-center py-24 relative px-6 md:px-10 z-10">

                {/* --- HEADER --- */}
                <div className="mb-24 relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium tracking-wide text-neutral-300 mb-8 mx-auto"
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d3f3] opacity-100"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d3f3]"></span>
                        </span>
                        <span className="leading-none pt-[1px]">HOW WE WORK</span>
                    </motion.div>

                    <motion.h2
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    >
                        The Process
                    </motion.h2>

                    <motion.p
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUpVariant}
                        className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl"
                    >
                        We strip away complexity to deliver robust, scalable, and beautiful digital solutions that drive real growth.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                    <ProcessStep
                        index={0}
                        number="01"
                        title="Analyze"
                        desc="We dive deep into your requirements, stripping away complexity to find the core solution."
                        icon={Search}
                    />
                    <ProcessStep
                        index={1}
                        number="02"
                        title="Design"
                        desc="Architecture meets aesthetics. We craft pixel-perfect interfaces designed for human interaction."
                        icon={PenTool}
                    />
                    <ProcessStep
                        index={2}
                        number="03"
                        title="Develop"
                        desc="Writing clean, scalable code that turns concepts into high-performance realities."
                        icon={Code2}
                    />
                    <ProcessStep
                        index={3}
                        number="04"
                        title="Deliver"
                        desc="Rigorous testing and smooth deployment to ensure your product launches flawlessly."
                        icon={Rocket}
                    />
                </div>
            </section>

            {/* 2. PARALLAX BANNER */}
            <section
                className="w-full h-[100vh] relative border-y border-white/10 overflow-hidden flex items-center justify-center bg-fixed bg-cover bg-center z-10"
                style={{ backgroundImage: `url(${cdn("old-data/spotmies_site_SixthFolder_OurDesginsPic.webp")})` }}
            >
                <div className="absolute inset-0 bg-[#050505]/60 backdrop-blur-[0px]"></div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    viewport={{ once: true }}
                    className="relative z-10 text-center"
                >
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-10 drop-shadow-2xl">
                        Our designs
                    </h2>

                    <a
                        href="/work"
                        className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 bg-white/5 hover:bg-white hover:text-black backdrop-blur-md transition-all uppercase tracking-widest text-xs font-bold rounded-full"
                    >
                        Show More
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                </motion.div>
            </section>

            {/* 3. INDUSTRIES GRID */}
            <section className="max-w-[1400px] mx-auto py-24 px-6 md:px-10 z-10 relative">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUpVariant}
                        className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    >
                        Our Industries
                    </motion.h2>
                </div>

                <IndustriesGrid />
            </section>
        </div>
    );
}

const ProcessStep = ({ number, title, desc, icon: Icon, index }: any) => (
    <motion.div
        custom={index + 3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUpVariant}
        // Only the hover colour transitions in CSS; transition-all also chased Framer's fade-in and made the cards flicker on load
        className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors duration-500 relative overflow-hidden flex flex-col"
    >
        <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 text-8xl font-bold text-white select-none">
            {number}
        </div>

        <div className="mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-[#00eef9] group-hover:text-black transition-all duration-300 shadow-lg border border-white/5 group-hover:border-[#00eef9]">
            <Icon className="w-8 h-8" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#00eef9] transition-colors duration-300">{title}</h3>
        <p className="text-neutral-400 text-base md:text-lg leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">{desc}</p>
    </motion.div>
);
