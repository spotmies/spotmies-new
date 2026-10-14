"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HeartPulseIcon } from "@/components/ui/heart-pulse-icon";
import { TruckIcon } from "@/components/ui/truck-icon";
import { ClapIcon } from "@/components/ui/clap-icon";
import { AirplaneIcon } from "@/components/ui/airplane-icon";
import { UsersIcon } from "@/components/ui/users-icon";
import { CartIcon } from "@/components/ui/cart-icon";
import { GraduationCapIcon } from "@/components/ui/graduation-cap-icon";
import { BitcoinIcon } from "@/components/ui/bitcoin-icon";
import { LandmarkIcon } from "@/components/ui/landmark-icon";
import { SproutIcon } from "@/components/ui/sprout-icon";
import { ALL_COMPANIES, logoToneClass } from "@/data/companies";

// Logos shown in an open tile; any more become a "+N" pill
const MAX_ORBIT_LOGOS = 4;
const MAX_ROW_LOGOS = 2;

type Industry = {
    name: string;
    // Industry tags in data/companies.ts ("desc") whose clients belong to this tile
    tags: string[];
    // Clients that fit this tile though tagged under another industry
    alsoIncludes?: string[];
    // Animated icon (Lucide Animated style) that plays while the tile is open
    animated: AnimatedIcon;
};

// The animated icons share one shape: started and stopped through a ref while the tile is open
type AnimatedIconHandle = { startAnimation: () => void; stopAnimation: () => void };
type AnimatedIcon = React.ForwardRefExoticComponent<
    { size?: number; className?: string } & React.RefAttributes<AnimatedIconHandle>
>;

const INDUSTRIES: Industry[] = [
    { name: "Healthcare", tags: ["Healthcare"], animated: HeartPulseIcon },
    // The pillars squash and the roof settles back down on them
    { name: "Fintech", tags: ["Fintech", "Blockchain & Fintech"], animated: LandmarkIcon },
    // The sprout dips and springs up, and its leaf sways
    { name: "AgriTech", tags: ["AgriTech"], animated: SproutIcon },
    // The Bitcoin mark redraws itself stroke by stroke, with a few sparks
    { name: "Crypto", tags: ["Blockchain", "Blockchain & Fintech", "NFTs"], animated: BitcoinIcon },
    // Climbs away with speed lines trailing
    { name: "Travel", tags: ["Travel"], animated: AirplaneIcon },
    // The clapper snaps shut
    { name: "Entertainment", tags: ["Entertainment"], animated: ClapIcon },
    {
        name: "Logistics & Supply Chain", tags: [], alsoIncludes: ["Nandikrushi"],
        // Wheels spin, the cab bounces and speed lines trail behind while the tile is open
        animated: TruckIcon,
    },
    // The second person steps in beside the first
    { name: "HRTech", tags: ["HRTech"], animated: UsersIcon },
    // The cap tips and its tassel swings
    { name: "EdTech", tags: ["EdTech", "Edtech"], animated: GraduationCapIcon },
    // The cart hops
    { name: "Retail", tags: ["Retail"], animated: CartIcon },
];

const clientsFor = (industry: Industry) =>
    ALL_COMPANIES.filter((c) => industry.tags.includes(c.desc) || industry.alsoIncludes?.includes(c.name));

function IndustryIcon({ industry, active }: { industry: Industry; active: boolean }) {
    const animatedRef = useRef<AnimatedIconHandle>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!animatedRef.current || reduceMotion) return;
        if (active) animatedRef.current.startAnimation();
        else animatedRef.current.stopAnimation();
    }, [active, reduceMotion]);

    const Animated = industry.animated;
    return <Animated ref={animatedRef} size={32} className="flex items-center justify-center" />;
}

// Points on the orbit, as % of the tile (tiles are square), starting at the top and going clockwise.
// The orbit sits a little above the middle with a modest radius, so wherever the slow turn carries a pill it stays inside
// the tile and keeps a clear gap above the name at the bottom.
const ORBIT_CENTER_Y = 44;
const ORBIT_RADIUS = 30;
function orbitPoint(i: number, count: number) {
    const angle = -Math.PI / 2 + (i / count) * Math.PI * 2;
    return { left: 50 + Math.cos(angle) * ORBIT_RADIUS, top: ORBIT_CENTER_Y + Math.sin(angle) * ORBIT_RADIUS };
}

const ease = [0.16, 1, 0.3, 1] as const;

function IndustryTile({ industry, index }: { industry: Industry; index: number }) {
    const [active, setActive] = useState(false);
    const clients = clientsFor(industry);

    // Large screens: up to 4 logos orbit the icon, plus a "+N" pill for the rest
    const orbitLogos = clients.slice(0, MAX_ORBIT_LOGOS);
    const orbitMore = clients.length - orbitLogos.length;
    const orbitCount = orbitLogos.length + (orbitMore > 0 ? 1 : 0);
    // Smaller screens: the orbit has no room, so 2 logos sit in a row
    const rowLogos = clients.slice(0, MAX_ROW_LOGOS);
    const rowMore = clients.length - rowLogos.length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            tabIndex={0}
            role="button"
            aria-expanded={active}
            aria-label={`${industry.name}: ${clients.map((c) => c.name).join(", ")}`}
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            // Touch screens have no hover, so a tap opens and closes the tile (a mouse already opened it on hover)
            onPointerUp={(e) => {
                if (e.pointerType !== "mouse") setActive((a) => !a);
            }}
            className={cn(
                "relative aspect-square border-r border-b border-white/10 cursor-pointer overflow-hidden outline-none transition-colors",
                active ? "bg-white/[0.04]" : "hover:bg-white/5"
            )}
        >
            {/* Icon: sits a little above centre at rest; when open it moves to the exact centre of the orbit (large screens)
                or lifts to make room for the row of logos (smaller screens) */}
            <div
                className={cn(
                    "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-[top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active ? "top-[34%] xl:top-[44%]" : "top-[42%]"
                )}
            >
                <div
                    className={cn(
                        "w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-colors duration-300",
                        active ? "bg-[#00eef9]/10 text-[#00eef9]" : "bg-white/5 text-neutral-400"
                    )}
                >
                    <IndustryIcon industry={industry} active={active} />
                </div>
            </div>

            {/* Name: under the icon at rest; when open it drops to the bottom edge, clear of the orbit */}
            <span
                className={cn(
                    "absolute inset-x-2 -translate-y-1/2 text-center text-xs md:text-sm font-bold uppercase tracking-widest transition-[top,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active ? "top-[58%] xl:top-[91%] text-white" : "top-[66%] text-neutral-500"
                )}
            >
                {industry.name}
            </span>

            {/* Orbit (large screens). Separate pills with no ring or lines between them, so each reads as its own client.
                The layer turns slowly and each pill turns back the other way to stay upright; hovering a pill pauses both. */}
            <div
                className="group/orbit pointer-events-none absolute inset-0 hidden xl:block motion-safe:animate-orbit hover:[animation-play-state:paused]"
                style={{ transformOrigin: `50% ${ORBIT_CENTER_Y}%` }}
                aria-hidden="true"
            >
                {Array.from({ length: orbitCount }).map((_, i) => {
                    const at = orbitPoint(i, orbitCount);
                    const client = orbitLogos[i];
                    return (
                        <motion.div
                            key={client?.name ?? "more"}
                            initial={false}
                            animate={
                                active
                                    ? { left: `${at.left}%`, top: `${at.top}%`, scale: 1, opacity: 1 }
                                    : { left: "50%", top: `${ORBIT_CENTER_Y}%`, scale: 0.3, opacity: 0 }
                            }
                            transition={{ duration: 0.5, delay: active ? 0.05 + i * 0.06 : 0, ease }}
                            // Only the pills take the pointer, so hovering one (not the whole tile) pauses the drift
                            className="pointer-events-auto absolute w-[27%] -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="motion-safe:animate-orbit-reverse group-hover/orbit:[animation-play-state:paused] flex h-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-2.5 backdrop-blur-md">
                                {client ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={client.src} alt="" loading="lazy" className={cn("max-h-4 max-w-full object-contain opacity-90", logoToneClass(client))} />
                                ) : (
                                    <span className="text-xs font-semibold text-neutral-300">+{orbitMore}</span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Row (smaller screens) */}
            <div className="absolute inset-x-2 bottom-4 md:bottom-6 flex items-center justify-center gap-2 xl:hidden" aria-hidden="true">
                {rowLogos.map((client, i) => (
                    <motion.img
                        key={client.name}
                        src={client.src}
                        alt=""
                        loading="lazy"
                        initial={false}
                        animate={active ? { opacity: 0.85, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, delay: active ? 0.08 + i * 0.07 : 0, ease }}
                        className={cn("h-3.5 md:h-4 w-auto max-w-[38%] object-contain", logoToneClass(client))}
                    />
                ))}
                {rowMore > 0 && (
                    <motion.span
                        initial={false}
                        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, delay: active ? 0.08 + rowLogos.length * 0.07 : 0 }}
                        className="shrink-0 rounded-full border border-white/15 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-300"
                    >
                        +{rowMore}
                    </motion.span>
                )}
            </div>
        </motion.div>
    );
}

// "Our Industries": each tile opens on hover, focus or tap to show the clients we have built for in that industry
export function IndustriesGrid() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-5 border-l border-t border-white/10 bg-black/40 backdrop-blur-sm">
            {INDUSTRIES.map((industry, i) => (
                <IndustryTile key={industry.name} industry={industry} index={i} />
            ))}
        </div>
    );
}
