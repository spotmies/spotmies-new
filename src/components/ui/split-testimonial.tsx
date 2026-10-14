"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSplit({
    items = TESTIMONIALS,
    title = "What our clients say",
}: { items?: typeof TESTIMONIALS; title?: string } = {}) {
    const testimonials = items;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const active = testimonials[activeIndex];

    const nextTestimonial = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    // Auto-play functionality
    useEffect(() => {
        if (isHovering) return; // Pause on hover

        const interval = setInterval(() => {
            nextTestimonial();
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [isHovering, nextTestimonial, activeIndex]); // Added activeIndex dependence to reset timer on manual click

    return (
        <section className="w-full bg-[#050505] text-white overflow-hidden">
            <div className="w-full max-w-[1362px] mx-auto px-4 md:px-6 py-24">

                {/* Header Section */}
                <div className="mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    >
                        {title}
                    </motion.h2>
                </div>

                <div
                    /* CHANGED: Reduced gap from gap-12 lg:gap-24 to gap-6 lg:gap-10 */
                    className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 lg:gap-10 items-start cursor-pointer group"
                    onClick={nextTestimonial}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Left: Quote Content */}
                    <div className="space-y-8 relative z-10 pt-4">
                        {/* Company Tag */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.company}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="inline-flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] uppercase text-zinc-400"
                            >
                                <span className="w-8 h-px bg-zinc-600" />
                                {active.company}
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                                <span className="text-zinc-500">{active.time}</span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Quote */}
                        {/* CHANGED: Changed max-w-3xl to w-full and added pr-10 to fill space better */}
                        <div className="relative overflow-hidden min-h-[160px] md:min-h-[140px] w-full pr-0 md:pr-10">
                            <AnimatePresence mode="wait">
                                <motion.blockquote
                                    key={active.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-xl md:text-2xl lg:text-3xl font-light leading-relaxed text-white/90"
                                >
                                    &quot;{active.quote}&quot;
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>

                        {/* Progress Navigation Dots */}
                        <div className="flex gap-2 pt-4 items-center">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveIndex(index);
                                    }}
                                    className="relative flex items-center justify-center w-8 h-8 group/dot"
                                >
                                    {/* The Inner Dot */}
                                    <span
                                        className={`relative z-10 block w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === activeIndex
                                            ? "bg-white scale-110"
                                            : "bg-zinc-700 group-hover/dot:bg-zinc-500"
                                            }`}
                                    />

                                    {/* The Animated Progress Ring (Only for Active Index) */}
                                    {index === activeIndex && (
                                        <div className="absolute inset-0">
                                            <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                                                {/* Background Track */}
                                                <circle
                                                    cx="16"
                                                    cy="16"
                                                    r="14"
                                                    className="stroke-white/10 fill-none"
                                                    strokeWidth="1.5" />
                                                {/* Filling Progress */}
                                                {!isHovering && (
                                                    <motion.circle
                                                        cx="16"
                                                        cy="16"
                                                        r="14"
                                                        className="stroke-[#00d3f3] fill-none"
                                                        strokeWidth="1.5"
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 5, ease: "linear" }} />
                                                )}
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Visual Element & Author Info */}
                    <div className="flex flex-row md:flex-col items-center md:items-start gap-5 md:gap-6 mx-0 w-full md:w-auto">

                        {/* Image Container */}
                        {/* CHANGED: Reduced width from md:w-64 to md:w-48 */}
                        <div className="relative w-[100px] h-[133px] md:w-48 md:h-auto md:aspect-[3/4] flex-shrink-0">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                                    animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                    exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="absolute inset-0"
                                >
                                    <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={active.image}
                                            alt={active.name}
                                            className="w-full h-full object-cover transition-all duration-500"
                                        />
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Author Info */}
                        <div className="w-full pl-0 md:pl-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active.name}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    className="text-left"
                                >
                                    <p className="text-lg md:text-base font-medium text-white">{active.name}</p>
                                    <p className="text-sm text-zinc-500">
                                        {active.role}
                                        {active.company && active.company !== "Content Creator" && (
                                            <>
                                                <span className="mx-1.5 opacity-50">|</span>
                                                {active.company}
                                            </>
                                        )}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}