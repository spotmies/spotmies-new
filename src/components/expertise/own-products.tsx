"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { CaseStudyModal } from "@/components/ui/case-study-modal";
import { OutlineText } from "@/components/ui/outline-text";
import { Container, FadeUp, Headline, PillEyebrow } from "@/components/expertise/primitives";
import { getProject } from "@/lib/projects";
import type { ExpertisePage } from "@/data/expertise";
import type { Project } from "@/types/types";

type Item = ExpertisePage["ownProducts"]["items"][number];

function ProductShowcase({ item, flip, onOpenCaseStudy }: { item: Item; flip: boolean; onOpenCaseStudy: (project: Project) => void }) {
    const project = getProject(item.project);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 120 });
    // Screenshot and the outlined name drift against each other for depth
    const imageY = useTransform(smooth, [0, 1], [60, -60]);
    const wordX = useTransform(smooth, [0, 1], flip ? ["-10%", "5%"] : ["5%", "-10%"]);

    return (
        <div ref={ref} className="relative py-10 md:py-16">
            <motion.span
                aria-hidden="true"
                style={{ x: wordX }}
                className="pointer-events-none select-none absolute -top-6 left-0 whitespace-nowrap text-[18vw] font-bold leading-none tracking-tighter"
            >
                {/* White 12% to 0%, pre-mixed over the black section */}
                <OutlineText from="#1f1f1f" to="#000000" stroke="rgba(255,255,255,0.08)">{project.title}</OutlineText>
            </motion.span>

            <div className={`relative grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-16 items-center ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <motion.div style={{ y: imageY }} className="relative">
                    <div className="rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-[0_40px_120px_-30px_rgba(0,211,243,0.25)]">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.03]">
                            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                            <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
                        </div>
                        <div className="relative aspect-[16/10]">
                            <Image src={project.image} alt={`${project.title} screenshot`} fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover object-top" />
                        </div>
                    </div>
                </motion.div>

                <FadeUp index={1}>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{project.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-[#00d3f3]/10 border border-[#00d3f3]/30 text-xs font-semibold text-[#00d3f3]">Our product</span>
                    </div>
                    <span className="block mb-10 text-xs font-bold uppercase tracking-widest text-neutral-500">{item.sector}</span>

                    <dl className="space-y-8">
                        <div className="pl-5 border-l-2 border-[#00d3f3]">
                            <dt className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">The problem it solves</dt>
                            <dd className="text-lg md:text-xl text-neutral-200 leading-relaxed">{item.problem}</dd>
                        </div>
                        {item.lesson && (
                            <div className="pl-5 border-l-2 border-white/20">
                                <dt className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Lesson we apply to your product</dt>
                                <dd className="text-lg md:text-xl text-neutral-200 leading-relaxed">{item.lesson}</dd>
                            </div>
                        )}
                    </dl>

                    <div className="mt-10 flex flex-wrap items-center gap-3">
                        <button
                            type="button"
                            onClick={() => onOpenCaseStudy(project)}
                            className="group inline-flex items-center gap-3 px-8 py-4 border border-white bg-white text-black hover:bg-[#00eef9] hover:border-[#00eef9] transition-all uppercase tracking-widest text-xs font-bold rounded-full"
                        >
                            Read case study
                            <BookOpen className="w-4 h-4" />
                        </button>
                        {project.link && (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 bg-white/5 hover:bg-white hover:text-black backdrop-blur-md transition-all uppercase tracking-widest text-xs font-bold rounded-full"
                            >
                                Visit {project.title}
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        )}
                    </div>
                </FadeUp>
            </div>
        </div>
    );
}

export function OwnProductsSection({ page }: { page: ExpertisePage }) {
    const { ownProducts } = page;
    const [selected, setSelected] = useState<Project | null>(null);
    return (
        <section id="built" className="relative w-full bg-black border-y border-white/10 py-24 md:py-32 overflow-hidden">
            <Container>
                <div className="mb-10 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <FadeUp><PillEyebrow className="mb-6">Built by Spotmies</PillEyebrow></FadeUp>
                        <FadeUp index={1}>
                            <Headline title={ownProducts.title} className="text-4xl md:text-6xl lg:text-7xl tracking-tighter" />
                        </FadeUp>
                    </div>
                    <FadeUp index={2}>
                        <p className="text-neutral-400 text-lg max-w-sm md:text-right">{ownProducts.intro}</p>
                    </FadeUp>
                </div>
                {ownProducts.items.map((item, i) => (
                    <ProductShowcase key={item.project} item={item} flip={i % 2 === 1} onOpenCaseStudy={setSelected} />
                ))}
            </Container>

            <CaseStudyModal project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
        </section>
    );
}
