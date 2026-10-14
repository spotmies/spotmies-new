"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Container, FadeUp, Headline, ICONS, PillEyebrow, fadeUpVariant } from "@/components/expertise/primitives";
import { EXPERTISE_SERVICES, getServiceHref } from "@/data/expertise";

// Same spotlight cards as the home "Our Expertise In" grid, one per other service
export function OtherServicesSection({ currentSlug }: { currentSlug: string }) {
    const services = EXPERTISE_SERVICES.filter((s) => s.slug !== currentSlug);

    return (
        <section id="services" className="relative w-full bg-black py-24 md:py-32 overflow-hidden">
            <Container>
                <div className="mb-14 md:mb-20 text-center">
                    <FadeUp><PillEyebrow className="mb-8">What else we offer</PillEyebrow></FadeUp>
                    <FadeUp index={1}>
                        <Headline title={{ lead: "Everything your product", muted: "needs to grow" }} className="text-4xl md:text-6xl" />
                    </FadeUp>
                    <FadeUp index={2}>
                        <p className="mt-6 text-neutral-300 max-w-2xl mx-auto text-lg">Our team and process stay consistent. Choose the services that best fit your product&apos;s needs.</p>
                    </FadeUp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, i) => {
                        const Icon = ICONS[service.icon];
                        const [r, g, b] = service.colors[0];
                        return (
                            <motion.div
                                key={service.slug}
                                custom={i % 3}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={fadeUpVariant}
                            >
                                <Link href={getServiceHref(service.slug)} className="block h-full">
                                    <CardSpotlight
                                        className="h-full min-h-[20rem] rounded-[2rem] p-0 bg-neutral-900/50 border-white/5 overflow-hidden"
                                        canvasColors={service.colors}
                                        canvasDotSize={3}
                                        canvasAnimationSpeed={3}
                                    >
                                        {service.image && (
                                            <div className="absolute -bottom-10 -right-10 z-0 pointer-events-none">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={service.image}
                                                    alt=""
                                                    className="w-48 h-auto object-contain grayscale brightness-75 contrast-125 opacity-25 origin-bottom-right transition-all duration-500 group-hover/spotlight:opacity-100 group-hover/spotlight:grayscale-0 group-hover/spotlight:brightness-100 group-hover/spotlight:scale-75 group-hover/spotlight:-translate-x-6 group-hover/spotlight:-translate-y-6"
                                                />
                                            </div>
                                        )}
                                        <div className="relative z-10 h-full flex flex-col p-8 md:p-10">
                                            <div className="mb-5 p-3 bg-white/5 rounded-xl w-fit backdrop-blur-sm border border-white/10" style={{ color: `rgb(${r}, ${g}, ${b})` }}>
                                                <Icon className="w-8 h-8" />
                                            </div>
                                            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500 mb-2">{service.category}</span>
                                            <h3 className="text-2xl font-bold text-white mb-3">{service.name}</h3>
                                            <p className="text-neutral-400 leading-relaxed max-w-[90%]">{service.blurb}</p>
                                            <span className="mt-auto pt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">
                                                Explore
                                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/spotlight:translate-x-1" />
                                            </span>
                                        </div>
                                    </CardSpotlight>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
}
