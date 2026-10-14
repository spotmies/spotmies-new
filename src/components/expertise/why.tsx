"use client";

import React from "react";
import { motion } from "framer-motion";
import { OutlineText } from "@/components/ui/outline-text";
import { Container, FadeUp, Headline, PillEyebrow } from "@/components/expertise/primitives";
import type { ExpertisePage } from "@/data/expertise";

// Bordered cells like the home "Our Industries" grid, with the outlined numerals from the expertise cards
export function WhySection({ page }: { page: ExpertisePage }) {
    const { why } = page;
    return (
        <section id="why" className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden">
            <Container>
                <div className="mb-14 md:mb-20">
                    <FadeUp><PillEyebrow className="mb-6">Why Spotmies</PillEyebrow></FadeUp>
                    <FadeUp index={1}>
                        <Headline title={why.title} className="text-4xl md:text-6xl lg:text-7xl max-w-4xl" />
                    </FadeUp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 border-l border-t border-white/10 bg-black/40 backdrop-blur-sm">
                    {why.points.map((point, i) => (
                        <motion.div
                            key={point.title}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative flex flex-col justify-end min-h-[22rem] p-8 md:p-10 border-r border-b border-white/10 hover:bg-white/5 transition-colors cursor-crosshair overflow-hidden"
                        >
                            {/* Gradient is white 40% to 4%, pre-mixed over the cell background */}
                            <OutlineText
                                from="#686868"
                                to="#0d0d0d"
                                className="absolute top-4 right-6 text-[8rem] md:text-[9.5rem] font-bold leading-none tracking-tighter select-none transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:-translate-y-1"
                            >
                                {String(i + 1).padStart(2, "0")}
                            </OutlineText>
                            <h3 className="relative text-2xl md:text-[1.7rem] font-bold text-white leading-tight mb-4 group-hover:text-[#00eef9] transition-colors">{point.title}</h3>
                            <p className="relative text-neutral-400 text-base md:text-lg leading-relaxed group-hover:text-neutral-300 transition-colors">{point.body}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}
