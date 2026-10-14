"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Container, FadeUp, Headline, PillEyebrow } from "@/components/expertise/primitives";
import { FOUNDERS } from "@/data/team";
import type { ExpertisePage } from "@/data/expertise";

const CALENDLY_URL = "https://calendly.com/spotmies/30min";
const HIRING_NUMBER = process.env.NEXT_PUBLIC_HIRING_NUMBER || "+91 7207333883";

const VALUES = [
    { title: "Result Driven", body: "We focus on impact." },
    { title: "Continuous Learning", body: "We evolve with tech." },
    { title: "Global Impact", body: "Projects that matter." },
];

export function TeamSection({ page }: { page: ExpertisePage }) {
    const { team } = page;
    return (
        <section id="who" className="relative w-full bg-[#050505] py-24 md:py-32 overflow-visible">
            <Container>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-16 lg:gap-24 mb-20 md:mb-28">
                    {/* Left: the founders */}
                    <FadeUp className="flex-1 min-w-[300px] w-full">
                        <PillEyebrow className="mb-12">Who builds it</PillEyebrow>
                        <div className="w-full flex items-center justify-start mb-12 pl-2">
                            <AnimatedTooltip items={FOUNDERS} />
                        </div>
                        <div className="flex flex-col gap-3 pl-2">
                            <span className="text-sm font-medium tracking-[0.2em] text-neutral-400 uppercase mb-1">Founders of</span>
                            <div className="flex items-center gap-5">
                                <div className="relative h-10 w-48 md:h-12 md:w-56">
                                    <Image src="/spotmies_banner.png" alt="Spotmies" fill className="object-contain object-left drop-shadow-[0_0_15px_rgba(0,238,249,0.25)]" />
                                </div>
                                <div className="h-8 w-px bg-white/10" />
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] text-neutral-500 font-medium uppercase tracking-widest leading-none mb-1">EST</span>
                                    <span className="text-sm font-bold text-[#00eef9] tracking-[0.2em] leading-none">2019</span>
                                </div>
                            </div>
                        </div>
                    </FadeUp>

                    {/* Right: who the team is */}
                    <div className="flex-[1.2] w-full">
                        <FadeUp index={1}>
                            <Headline title={team.title} className="text-3xl md:text-4xl lg:text-5xl leading-[1.2] mb-6" />
                        </FadeUp>
                        <FadeUp index={2}>
                            <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">{team.intro}</p>
                        </FadeUp>
                    </div>
                </div>

                {/* Partners and careers */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <FadeUp className="h-full">
                        <CardSpotlight className="h-full rounded-[2rem] p-0 bg-neutral-900/50 border-white/5" canvasColors={[[0, 255, 255], [0, 200, 255]]} canvasDotSize={3}>
                            <div className="relative z-10 h-full flex flex-col gap-6 p-8 md:p-12">
                                <span className="text-xs font-bold uppercase tracking-widest text-[#00d3f3]">Partners & investors</span>
                                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">Build the next one <span className="text-neutral-500">with us</span></h3>
                                <p className="text-neutral-300 leading-relaxed">
                                    Recognized by Startup India, with the Andhra University Incubation Center among our clients, we&apos;ve completed 50+ projects and run two products of our own. If you&apos;re backing, partnering on or co-building a product, talk to the founders directly.
                                </p>
                                <div className="mt-auto pt-2">
                                    <a
                                        href={CALENDLY_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-[#00eef9] text-black px-8 py-4 rounded-full font-bold text-base transition-all duration-300 hover:bg-[#5ff6fc] hover:scale-105 hover:shadow-[0_0_40px_rgba(0,238,249,0.4)] shadow-[0_0_20px_rgba(0,238,249,0.2)]"
                                    >
                                        Talk to the founders
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </CardSpotlight>
                    </FadeUp>
                    <FadeUp index={1} className="h-full">
                        <CardSpotlight className="h-full rounded-[2rem] p-0 bg-neutral-900/50 border-white/5" canvasColors={[[255, 255, 255], [160, 160, 160]]} canvasDotSize={2}>
                            <div className="relative z-10 h-full flex flex-col gap-6 p-8 md:p-12">
                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Careers</span>
                                <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-[1.1]">Build the future <span className="text-neutral-500">with Spotmies</span></h3>
                                <ul className="flex flex-col gap-3">
                                    {VALUES.map((v) => (
                                        <li key={v.title} className="flex items-center gap-3 text-neutral-300">
                                            <span className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00eef9]"><Plus className="w-3.5 h-3.5" /></span>
                                            <span><strong className="text-white font-semibold">{v.title}</strong> — {v.body}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto pt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
                                    <Link href="/careers" className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors">
                                        See open roles
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                    <a href={`tel:${HIRING_NUMBER.replace(/\s+/g, "")}`} className="text-sm text-neutral-500 hover:text-white transition-colors">
                                        Hiring: {HIRING_NUMBER}
                                    </a>
                                </div>
                            </div>
                        </CardSpotlight>
                    </FadeUp>
                </div>
            </Container>
        </section>
    );
}
