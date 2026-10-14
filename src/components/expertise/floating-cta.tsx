"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { RocketIcon, type RocketIconHandle } from "@/components/ui/rocket-icon";
import { scrollToId } from "@/components/expertise/primitives";

const ease = [0.16, 1, 0.3, 1] as const;
// How often the rocket button launches and sends out a ripple
const PULSE_MS = 2500;

// Pinned call to action. The full pill shows on the hero, shrinks to a rocket button once the hero is behind you,
// and steps aside while the form itself is on screen.
export function FloatingCta({ label }: { label: string }) {
    const { scrollY } = useScroll();
    const [compact, setCompact] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    const rocketRef = useRef<RocketIconHandle>(null);
    const reduceMotion = useReducedMotion();
    // Bumped on every beat; each value mounts a fresh ripple
    const [pulse, setPulse] = useState(0);

    // The hero fills the first screen; shrink once most of it has scrolled away
    useMotionValueEvent(scrollY, "change", (y) => setCompact(y > window.innerHeight * 0.75));

    useEffect(() => {
        const target = document.getElementById("start");
        if (!target) return;
        const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.2 });
        observer.observe(target);
        return () => observer.disconnect();
    }, []);

    // While shrunk: launch the rocket and send out a ripple together, first as it lands, then on every beat
    useEffect(() => {
        if (!compact || formVisible || reduceMotion) return;
        const beat = () => {
            rocketRef.current?.startAnimation();
            setPulse((n) => n + 1);
        };
        const first = setTimeout(beat, 350);
        const loop = setInterval(beat, PULSE_MS);
        return () => {
            clearTimeout(first);
            clearInterval(loop);
        };
    }, [compact, formVisible, reduceMotion]);

    return (
        <AnimatePresence>
            {!formVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.9 }}
                    transition={{ duration: 0.4, ease }}
                    className="fixed right-5 bottom-5 md:right-8 md:bottom-8 z-[90]"
                >
                    {/* Round ripple for the rocket button, one per beat */}
                    {compact && pulse > 0 && (
                        <motion.span
                            key={pulse}
                            aria-hidden="true"
                            initial={{ scale: 1, opacity: 0.5 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            className="absolute inset-0 rounded-full bg-white/40 pointer-events-none"
                        />
                    )}
                    {/* Pulse rings around the full pill; their stretch is tuned to its shape and turns oval around the circle */}
                    {!compact && (
                        <>
                            <span className="absolute inset-0 rounded-full bg-white/40 motion-safe:animate-fab-ring pointer-events-none" aria-hidden="true" />
                            <span className="absolute inset-0 rounded-full bg-white/40 motion-safe:animate-fab-ring [animation-delay:1.2s] pointer-events-none" aria-hidden="true" />
                        </>
                    )}
                    <motion.button
                        layout
                        type="button"
                        onClick={() => scrollToId("start")}
                        onMouseEnter={() => rocketRef.current?.startAnimation()}
                        aria-label={label}
                        transition={{ layout: { duration: 0.45, ease } }}
                        // Radius set here so it stays round while the layout animation scales the button
                        style={{ borderRadius: 9999 }}
                        className={
                            compact
                                ? "relative flex h-16 w-16 md:h-[4.5rem] md:w-[4.5rem] items-center justify-center bg-white text-black shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)] transition-shadow hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.7)]"
                                : "group relative inline-flex items-center gap-3 min-h-14 pl-6 pr-2 max-sm:pl-2 bg-white text-black font-bold text-sm shadow-[0_0_50px_-10px_rgba(255,255,255,0.5)] transition-shadow hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.7)]"
                        }
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {compact ? (
                                <motion.span
                                    key="rocket"
                                    layout="position"
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    transition={{ duration: 0.25 }}
                                    className="flex"
                                >
                                    <RocketIcon ref={rocketRef} size={28} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="pill"
                                    layout="position"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="inline-flex items-center gap-3"
                                >
                                    <span className="hidden sm:inline whitespace-nowrap">{label}</span>
                                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white transition-transform duration-300 group-hover:-rotate-45">
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
