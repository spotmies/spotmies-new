"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowDown } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RocketIcon, type RocketIconHandle } from "@/components/ui/rocket-icon";
import { PillEyebrow, scrollToId } from "@/components/expertise/primitives";
import { AsciiMorph } from "@/components/expertise/ascii-morph";
import type { ExpertisePage } from "@/data/expertise";

export function ExpertiseHero({ page }: { page: ExpertisePage }) {
    const { hero } = page;
    // Launches when the whole button is hovered, not only the icon
    const rocketRef = useRef<RocketIconHandle>(null);
    // Second button jumps to the work on show; a page with no work to show yet points at how we work instead
    // Longer headlines get a smaller size, so a two-part title stays within about four lines
    const titleLength = hero.title.lead.length + (hero.title.muted?.length ?? 0);
    const titleSize =
        titleLength > 80 ? "text-[clamp(34px,4vw,58px)]" : titleLength > 50 ? "text-[clamp(38px,4.6vw,70px)]" : "text-[clamp(42px,5.6vw,84px)]";
    const showcase = page.ownProducts.items.length ? "built" : page.clientWork.items.length ? "work" : null;

    return (
        <section className="relative w-full min-h-[100svh] overflow-hidden bg-black text-white selection:bg-cyan-500/30 flex items-center">
            {/* ASCII particle field across the whole hero, behind the text. The shape rests on the right
                (a dimmed, off-centre backdrop on phones). */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.3 }}
                className="absolute inset-0 z-0"
            >
                <AsciiMorph shapes={hero.ascii} className="absolute inset-0" />
            </motion.div>

            <div className="relative z-30 w-full max-w-[1362px] mx-auto px-6 pt-36 md:pt-44 pb-44 lg:pb-24 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center pointer-events-none">
                <div className="flex flex-col items-start text-left pointer-events-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <PillEyebrow className="mb-8">{hero.eyebrow}</PillEyebrow>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className={cn("font-normal leading-[0.98] tracking-[-0.04em]", titleSize)}
                    >
                        {/* On phones the two parts flow as one sentence, so a lead too wide for one line
                            doesn't leave its last word stranded on a line of its own */}
                        <span className="sm:block text-white">{hero.title.lead}</span>
                        {hero.title.muted && (
                            <>
                                {" "}
                                <span className="sm:block pb-[0.1em] bg-clip-text text-transparent bg-[linear-gradient(180deg,#6f6f6f_0%,#3d3d3d_100%)] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]">
                                    {hero.title.muted}
                                </span>
                            </>
                        )}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-8 max-w-xl text-base sm:text-lg text-neutral-400 font-light tracking-wide leading-relaxed"
                    >
                        {hero.subtitle}
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="mt-3 text-sm sm:text-base font-medium text-white/90"
                    >
                        {hero.tagline}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-10 flex flex-col sm:flex-row gap-3 w-full sm:w-auto items-center"
                    >
                        <MagneticButton
                            onClick={() => scrollToId("start")}
                            onMouseEnter={() => rocketRef.current?.startAnimation()}
                            className="w-full sm:w-auto px-7 py-3.5 bg-white text-black rounded-full font-bold text-sm tracking-wide shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.6)] overflow-hidden transition-shadow flex items-center justify-center gap-3"
                        >
                            <span className="relative z-10 whitespace-nowrap">{page.ctaLabel}</span>
                            <span className="relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-black text-white">
                                <RocketIcon ref={rocketRef} size={13} />
                            </span>
                            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent z-0" />
                        </MagneticButton>
                        <MagneticButton
                            onClick={() => scrollToId(showcase ?? "process")}
                            className="w-full sm:w-auto px-7 py-3.5 text-white/90 rounded-full font-medium text-sm tracking-wide border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all flex items-center justify-center gap-3"
                        >
                            <span className="whitespace-nowrap">{showcase ? hero.exploreLabel ?? "See what we have built" : "See how we work"}</span>
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                                <ArrowDown className="w-3 h-3" />
                            </span>
                        </MagneticButton>
                    </motion.div>
                </div>
            </div>

        </section>
    );
}
