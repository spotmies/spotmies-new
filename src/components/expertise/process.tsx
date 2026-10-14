"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { Container, FadeUp, Headline, ICONS, PillEyebrow, fadeUpVariant } from "@/components/expertise/primitives";
import type { ExpertisePage } from "@/data/expertise";

const RAIL = "bg-[#00d3f3] shadow-[0_0_10px_rgba(0,211,243,0.6)]";
// The links between cards draw themselves once, one after another, when the steps come into view
const STEP_DELAY = 0.45;
const SEGMENT_DURATION = 0.4;
const ease = [0.16, 1, 0.3, 1] as const;

// When the link into a card finishes, in seconds; the first card is lit from the start
const arrival = (i: number) => (i === 0 ? 0 : 0.2 + (i - 1) * STEP_DELAY + SEGMENT_DURATION);

// Bridges the gap to the next card, level with the icon centre: across on wide screens, down when the cards stack.
// A dot sits where it meets each card's edge, so it reads as attached rather than floating behind the cards.
function Connector({ index, drawn }: { index: number; drawn: boolean }) {
    const transition = { duration: SEGMENT_DURATION, delay: 0.2 + index * STEP_DELAY, ease };
    const dot = "absolute h-1.5 w-1.5 rounded-full transition-colors duration-300";
    const dotColor = drawn ? "bg-[#00d3f3]" : "bg-white/20";
    const endDelay = { transitionDelay: drawn ? `${Math.round(arrival(index + 1) * 1000)}ms` : "0ms" };
    return (
        <>
            {/* Stacked (phones): straight down from this card's icon to the next */}
            <div aria-hidden="true" className="md:hidden absolute top-full left-[65px] z-10 h-6 w-px -translate-x-1/2 bg-white/10">
                <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: drawn ? 1 : 0 }} transition={transition} style={{ transformOrigin: "top" }} className={cn("h-full w-full", RAIL)} />
                <span className={cn(dot, dotColor, "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2")} />
                <span style={endDelay} className={cn(dot, dotColor, "left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2")} />
            </div>
            {/* One row (desktop): across the gap at icon height */}
            <div aria-hidden="true" className="hidden lg:block absolute left-full top-[73px] z-10 h-px w-6 -translate-y-1/2 bg-white/10">
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: drawn ? 1 : 0 }} transition={transition} style={{ transformOrigin: "left" }} className={cn("h-full w-full", RAIL)} />
                <span className={cn(dot, dotColor, "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2")} />
                <span style={endDelay} className={cn(dot, dotColor, "top-1/2 right-0 translate-x-1/2 -translate-y-1/2")} />
            </div>
        </>
    );
}

export function ProcessSection({ page }: { page: ExpertisePage }) {
    const { process } = page;
    const count = process.steps.length;

    const stepsRef = useRef<HTMLOListElement>(null);
    const drawn = useInView(stepsRef, { once: true, margin: "0px 0px -20% 0px" });

    return (
        <section id="process" className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden">
            <NoiseOverlay />
            <Container>
                <div className="mb-20 md:mb-24 flex flex-col items-center text-center max-w-3xl mx-auto">
                    <FadeUp><PillEyebrow className="mb-8">How we build it</PillEyebrow></FadeUp>
                    <FadeUp index={1}>
                        <Headline title={process.title} className="text-4xl md:text-6xl mb-6" />
                    </FadeUp>
                    <FadeUp index={2}>
                        <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-2xl">{process.intro}</p>
                    </FadeUp>
                </div>

                <ol ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {process.steps.map((step, i) => {
                        const Icon = ICONS[step.icon];
                        // A card lights up as the link reaches it
                        const litDelay = { transitionDelay: drawn ? `${Math.round(arrival(i) * 1000)}ms` : "0ms" };
                        return (
                            <motion.li
                                key={step.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUpVariant}
                                className="relative"
                            >
                                {i < count - 1 && <Connector index={i} drawn={drawn} />}

                                <div
                                    style={litDelay}
                                    className={cn(
                                        "group relative flex h-full flex-col p-8 md:p-10 rounded-3xl border bg-gradient-to-b from-[#121212] to-[#0a0a0a] hover:from-[#161616] hover:to-[#0e0e0e] transition-colors duration-500 overflow-hidden",
                                        drawn ? "border-[#00d3f3]/20" : "border-white/[0.06]"
                                    )}
                                >
                                    {/* Soft light along the top edge instead of a hard outline */}
                                    <div aria-hidden="true" className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                                    <div className="absolute top-0 right-0 p-6 text-8xl font-bold text-white opacity-[0.04] group-hover:opacity-10 transition-opacity duration-500 select-none">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>

                                    <div
                                        style={litDelay}
                                        className={cn(
                                            "relative mb-8 p-4 w-fit rounded-2xl border shadow-lg transition-all duration-300 group-hover:bg-[#00eef9] group-hover:text-black group-hover:border-[#00eef9]",
                                            drawn ? "bg-[#00eef9]/10 text-[#00eef9] border-[#00eef9]/30" : "bg-white/5 border-white/5 text-white"
                                        )}
                                    >
                                        <Icon className="w-8 h-8" />
                                    </div>

                                    <span className="mb-3 block font-mono text-xs tracking-widest text-neutral-500 uppercase">
                                        {step.kicker ? `${String(i + 1).padStart(2, "0")} · ${step.kicker}` : `Step ${String(i + 1).padStart(2, "0")}`}
                                    </span>

                                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white group-hover:text-[#00eef9] transition-colors duration-300">{step.title}</h3>
                                    <p className="text-neutral-400 text-base md:text-lg leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">{step.body}</p>
                                </div>
                            </motion.li>
                        );
                    })}
                </ol>
            </Container>
        </section>
    );
}
