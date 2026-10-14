"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { CaseStudyModal } from "@/components/ui/case-study-modal";
import { Container, FadeUp, Headline, ICONS, PillEyebrow, fadeUpVariant, scrollToId } from "@/components/expertise/primitives";
import { getProject } from "@/lib/projects";
import type { ExpertisePage } from "@/data/expertise";
import type { Project } from "@/types/types";

// Bento rhythm across three columns: wide, narrow / narrow, wide / wide, narrow
const SPANS = [2, 1, 1, 2, 2, 1];
const SPAN_CLASS: Record<number, string> = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" };

// Column spans for n cards; the last card stretches to close any gap left in its row
function spansFor(n: number) {
    const spans = Array.from({ length: n }, (_, i) => SPANS[i % SPANS.length]);
    const used = spans.reduce((a, b) => a + b, 0) % 3;
    if (n > 0 && used !== 0) spans[n - 1] += 3 - used;
    return spans;
}

export function OutcomesSection({ page }: { page: ExpertisePage }) {
    const { outcomes } = page;
    const [selected, setSelected] = useState<Project | null>(null);
    const router = useRouter();
    const spans = spansFor(outcomes.items.length);

    return (
        <section id="outcomes" className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-14 md:mb-20">
                    <div>
                        <FadeUp><PillEyebrow className="mb-6">Outcomes</PillEyebrow></FadeUp>
                        <FadeUp index={1}>
                            <Headline title={outcomes.title} className="text-4xl md:text-6xl max-w-2xl" />
                        </FadeUp>
                    </div>
                    <FadeUp index={2} className="flex flex-col md:items-end gap-4">
                        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm md:text-right">{outcomes.intro}</p>
                        <button
                            type="button"
                            onClick={() => scrollToId("start")}
                            className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-[#00d3f3]"
                        >
                            Discuss your project
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </FadeUp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {outcomes.items.map((item, i) => {
                        const project = item.project ? getProject(item.project) : null;
                        const Icon = ICONS[item.icon];
                        const wide = spans[i] >= 2;
                        // A project opens its case study; otherwise the card can point at a page or a section of this one
                        const open = project
                            ? () => setSelected(project)
                            : item.href
                                ? () => (item.href!.startsWith("#") ? scrollToId(item.href!.slice(1)) : router.push(item.href!))
                                : undefined;
                        return (
                            <motion.div
                                key={item.text}
                                custom={i % 3}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUpVariant}
                                className={cn(open && "cursor-pointer", SPAN_CLASS[spans[i]])}
                                onClick={open}
                            >
                                <CardSpotlight
                                    className="h-full min-h-[20rem] md:min-h-[22rem] rounded-[2rem] p-0 bg-neutral-900/50 border-white/5 overflow-hidden"
                                    canvasColors={[[0, 255, 255], [0, 200, 255]]}
                                    canvasDotSize={3}
                                    canvasAnimationSpeed={4}
                                >
                                    {/* Product screenshot drifts in from the corner on hover */}
                                    {project && (
                                    <div
                                        className={cn(
                                            "absolute z-0 pointer-events-none rounded-xl overflow-hidden border border-white/10 shadow-2xl",
                                            "opacity-20 grayscale rotate-[-6deg] translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                            "group-hover/spotlight:opacity-100 group-hover/spotlight:grayscale-0 group-hover/spotlight:rotate-[-3deg] group-hover/spotlight:translate-y-0",
                                            wide ? "w-[52%] -right-8 -bottom-10 aspect-[16/10]" : "w-[78%] -right-10 -bottom-14 aspect-[16/10]"
                                        )}
                                    >
                                        <Image src={project.image} alt="" fill sizes="400px" className="object-cover object-top" />
                                    </div>
                                    )}

                                    <div className={cn("relative z-10 h-full flex flex-col p-8 md:p-10", wide ? "md:max-w-[55%]" : "")}>
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="p-3 bg-white/5 rounded-xl w-fit backdrop-blur-sm border border-white/10 text-cyan-400 transition-colors group-hover/spotlight:bg-[#00eef9] group-hover/spotlight:text-black group-hover/spotlight:border-[#00eef9]">
                                                <Icon className="w-7 h-7" />
                                            </div>
                                            <span className="text-5xl font-bold text-white/[0.06] select-none leading-none">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-semibold text-white leading-snug tracking-tight">{item.text}</h3>
                                        {item.proof && (
                                        <div className="mt-auto pt-8">
                                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md text-xs font-medium text-neutral-300 transition-colors group-hover/spotlight:border-[#00d3f3]/50 group-hover/spotlight:text-[#00d3f3]">
                                                {item.proof}
                                                <ArrowUpRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>
                                        )}
                                    </div>
                                </CardSpotlight>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>

            <CaseStudyModal project={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
        </section>
    );
}
