"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseStudyModal } from "@/components/ui/case-study-modal";
import { Container, FadeUp, Headline, PillEyebrow, fadeUpVariant, scrollToId } from "@/components/expertise/primitives";
import { getProject } from "@/lib/projects";
import type { ExpertisePage } from "@/data/expertise";
import type { Project } from "@/types/types";

// The "your product" window, one row per line, each split into runs that share a tone
type AsciiTone = "dim" | "mid" | "hi" | "accent" | "cta" | "caret";
const ASCII_TONES: Record<AsciiTone, string> = {
    dim: "text-white/20",
    mid: "text-white/40",
    hi: "text-white/65",
    accent: "text-[#00d3f3]/45 transition-colors duration-500 group-hover/next:text-[#00d3f3]/80",
    cta: "text-[#00d3f3]/60 transition-colors duration-500 group-hover/next:text-[#00d3f3]",
    caret: "text-[#00d3f3] animate-caret",
};
const ASCII_PRODUCT: [string, AsciiTone][][] = [
    [["(o) ", "accent"], ["your-product", "mid"], ["      ----  ----  ----", "dim"]],
    [],
    [["########################", "hi"]],
    [["##############", "hi"], ["::::::", "mid"], ["_", "caret"]],
    [[".:-=-:.:-=-:.:-=-:.:-=-:.", "dim"]],
    [["-:.:-=-:.:-=-:.", "dim"]],
    [],
    [["[ launch -> ]", "cta"]],
    [],
    [["+----------+ +----------+ ", "dim"], ["+- - - - - +", "accent"]],
    [["|  .:::.   | |  .:::.   | ", "dim"], [":          :", "accent"]],
    [["|  ':::'   | |  ':::'   | ", "dim"], [":    ??    :", "accent"]],
    [["| ------   | | ------   | ", "dim"], [":          :", "accent"]],
    [["+----------+ +----------+ ", "dim"], ["+- - - - - +", "accent"]],
];

export function ClientWorkSection({ page }: { page: ExpertisePage }) {
    const { clientWork } = page;
    const [selected, setSelected] = useState<Project | null>(null);

    return (
        <section id="work" className="relative w-full bg-black py-24 md:py-32 overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-20">
                    <div>
                        <FadeUp><PillEyebrow className="mb-6">Built for clients</PillEyebrow></FadeUp>
                        <FadeUp index={1}>
                            <Headline title={clientWork.title} className="text-4xl md:text-6xl max-w-3xl" />
                        </FadeUp>
                        <FadeUp index={2}>
                            <p className="mt-5 text-neutral-400 text-lg max-w-xl">{clientWork.intro}</p>
                        </FadeUp>
                    </div>
                    <FadeUp index={2}>
                        <Link href="/work" className="group flex w-fit items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#00d3f3] hover:bg-[#00d3f3]/5 hover:shadow-[0_0_20px_rgba(0,211,243,0.15)]">
                            <span className="text-sm md:text-base font-medium text-neutral-300 group-hover:text-[#00d3f3] transition-colors duration-300">See All Works</span>
                            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00d3f3]/20 transition-all duration-300">
                                <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#00d3f3] group-hover:translate-x-0.5 transition-all duration-300" />
                            </span>
                        </Link>
                    </FadeUp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                    {clientWork.items.map((item, i) => {
                        const project = getProject(item.projects[0]);
                        return (
                            <motion.button
                                key={item.name}
                                type="button"
                                custom={i % 3}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUpVariant}
                                onClick={() => setSelected(project)}
                                className="group/card text-left"
                            >
                                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 bg-neutral-900 border border-white/10 shadow-2xl">
                                    <Image
                                        src={project.image}
                                        alt={`${item.name} screenshot`}
                                        fill
                                        sizes="(min-width: 1024px) 420px, (min-width: 768px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-1000 group-hover/card:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/30 transition-colors duration-500" />
                                    <span className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold opacity-0 translate-y-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                                        Read case study
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                                <span className="block mb-2 text-[11px] font-bold uppercase tracking-widest text-[#00d3f3]">{item.tag}</span>
                                <h3 className="text-xl md:text-3xl font-bold text-white group-hover/card:text-[#00eef9] transition-colors">{item.name}</h3>
                                <p className="mt-2 text-neutral-500 text-sm md:text-base font-medium leading-relaxed">{item.body}</p>
                            </motion.button>
                        );
                    })}

                    {/* "Your product" tile: an unfinished product drawn in ASCII as the card's background, with the pitch over it.
                        Stretches to the row's height so it lines up with the project cards beside it. */}
                    <motion.button
                        type="button"
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={fadeUpVariant}
                        onClick={() => scrollToId("start")}
                        className="group/next flex text-left"
                    >
                        <div className="relative flex w-full min-h-[22rem] flex-col justify-end rounded-2xl overflow-hidden border border-white/10 bg-[radial-gradient(120%_90%_at_50%_0%,rgba(0,211,243,0.14),transparent_60%),#0a0a0a] shadow-2xl transition-colors duration-500 group-hover/next:border-[#00d3f3]/40">
                            {/* Product window, drawn in ASCII like the hero: chrome, a nav, a half-typed hero and three cards, the last one still empty */}
                            <div
                                aria-hidden="true"
                                className="@container absolute left-[7%] right-[7%] top-[7%] -bottom-6 rounded-t-xl border border-white/10 bg-neutral-950/80 font-mono opacity-70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/next:-translate-y-2 group-hover/next:opacity-100"
                            >
                                <div className="flex items-center gap-[1.5em] px-[4%] py-[1.2em] border-b border-white/10 text-[3.2cqw] leading-none">
                                    <span className="text-white/25 tracking-[0.3em]">ooo</span>
                                    <span className="text-white/20">https://your-product.app</span>
                                </div>
                                <pre className="px-[5%] pt-[4%] text-[3.4cqw] leading-[1.3] select-none">
                                    {ASCII_PRODUCT.map((line, i) => (
                                        <div key={i}>
                                            {line.length === 0 ? " " : line.map(([text, tone], j) => (
                                                <span key={j} className={ASCII_TONES[tone]}>{text}</span>
                                            ))}
                                        </div>
                                    ))}
                                </pre>
                            </div>

                            {/* Darkens the lower part of the art so the text over it stays readable */}
                            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-45% to-transparent" />

                            <div className="relative p-6 md:p-8">
                                <span className="block mb-2 text-[11px] font-bold uppercase tracking-widest text-[#00d3f3]">Your product</span>
                                <h3 className="text-xl md:text-3xl font-bold text-white group-hover/next:text-[#00eef9] transition-colors">Could be the next one</h3>
                                <p className="mt-2 text-neutral-400 text-sm md:text-base font-medium leading-relaxed">Tell us your idea and we will tell you what to build first.</p>
                                <span className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold transition-colors duration-300 group-hover/next:bg-[#00eef9]">
                                    {page.ctaLabel}
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/next:translate-x-0.5" />
                                </span>
                            </div>
                        </div>
                    </motion.button>
                </div>
            </Container>

            <CaseStudyModal project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
        </section>
    );
}
