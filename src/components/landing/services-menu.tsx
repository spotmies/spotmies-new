"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICONS } from "@/components/expertise/primitives";
import { EXPERTISE_SERVICES, getServiceHref } from "@/data/expertise";

const CALENDLY_URL = "https://calendly.com/spotmies/30min";
// Grace period before closing, so moving the cursor across the gap to the panel doesn't shut it
const CLOSE_DELAY_MS = 150;

const PANEL_TRANSITION = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as const };
// The glass fades in by strengthening its blur and tint, never by opacity
const GLASS_HIDDEN = {
    backdropFilter: "blur(0px) saturate(100%)",
    WebkitBackdropFilter: "blur(0px) saturate(100%)",
    backgroundColor: "rgba(10,10,10,0)",
    borderColor: "rgba(255,255,255,0)",
    boxShadow: "0 30px 80px -20px rgba(0,0,0,0)",
};
const GLASS_SHOWN = {
    backdropFilter: "blur(40px) saturate(150%)",
    WebkitBackdropFilter: "blur(40px) saturate(150%)",
    backgroundColor: "rgba(10,10,10,0.55)",
    borderColor: "rgba(255,255,255,0.1)",
    boxShadow: "0 30px 80px -20px rgba(0,0,0,0.9)",
};

const rgb = (c: number[]) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;

// One service: icon tile tinted in the service's colour on hover, name and a one-line description
function ServiceLink({ service, onNavigate, active }: { service: (typeof EXPERTISE_SERVICES)[number]; onNavigate: () => void; active: boolean }) {
    const Icon = ICONS[service.icon];
    const color = rgb(service.colors[0]);
    return (
        <Link
            href={getServiceHref(service.slug)}
            onClick={onNavigate}
            style={{ "--svc": color } as React.CSSProperties}
            className={cn(
                "group/svc flex items-center gap-3.5 rounded-2xl p-3 transition-colors duration-200 hover:bg-white/[0.06] focus-visible:bg-white/[0.06] outline-none",
                active && "bg-white/[0.06]"
            )}
        >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neutral-400 transition-colors duration-200 group-hover/svc:border-white/20 group-hover/svc:text-[var(--svc)] group-focus-visible/svc:text-[var(--svc)]">
                <Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
                <span className={cn("block text-sm font-semibold transition-colors", active ? "text-[#00d3f3]" : "text-white")}>{service.name}</span>
                <span className="block truncate text-xs text-neutral-500 group-hover/svc:text-neutral-400 transition-colors">{service.short}</span>
            </span>
        </Link>
    );
}

// Desktop: "Services" in the navbar opens a panel of every service page on hover or keyboard focus.
// The label itself still links to the home services section.
export function ServicesMenu({ active, pathname, onSectionLink }: { active: boolean; pathname: string; onSectionLink: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
    const [open, setOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const wrapRef = useRef<HTMLDivElement>(null);
    // Where the panel hangs: centred under the navbar. Null until first opened, so nothing portals during SSR.
    const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

    const measure = () => {
        const nav = wrapRef.current?.closest("nav");
        if (!nav) return;
        const rect = nav.getBoundingClientRect();
        setPos({ top: rect.bottom, left: rect.left + rect.width / 2 });
    };

    const show = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        measure();
        setOpen(true);
    };
    const hide = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
    };

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKey);
        window.addEventListener("resize", measure);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("resize", measure);
        };
    }, [open]);

    useEffect(() => () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
    }, []);

    return (
        <div
            ref={wrapRef}
            className="static"
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={(e) => {
                if (!wrapRef.current?.contains(e.relatedTarget as Node)) hide();
            }}
        >
            <Link
                href="/#services"
                onClick={(e) => {
                    setOpen(false);
                    onSectionLink(e);
                }}
                aria-haspopup="true"
                aria-expanded={open}
                className={cn(
                    "text-sm font-medium transition-colors relative group py-2 inline-flex items-center gap-1",
                    active || open ? "text-[#00d3f3]" : "text-gray-300 hover:text-white"
                )}
            >
                Services
                <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
                <span className={cn("absolute bottom-0 left-0 h-[1.5px] rounded-full bg-[#00d3f3] transition-all duration-300 ease-out", active ? "w-full" : "w-0 group-hover:w-full")} />
            </Link>

            {/* Portalled to <body>: the navbar has its own backdrop blur, and a blurred parent stops a child's blur from
                reaching the page behind it, which left the panel looking merely see-through */}
            {pos && createPortal(
            <AnimatePresence>
                {open && (
                    // No opacity on this wrapper or the glass: Chrome skips backdrop blur on anything mid-fade, which showed
                    // a flat tint first and the blur only once the fade ended. The glass animates its blur instead.
                    <motion.div
                        initial={{ y: -6, scale: 0.98 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: -6, scale: 0.98 }}
                        transition={PANEL_TRANSITION}
                        onMouseEnter={show}
                        onMouseLeave={hide}
                        style={{ top: pos.top, left: pos.left }}
                        className="fixed z-[110] w-[min(680px,calc(100vw-3rem))] -translate-x-1/2 pt-3 origin-top"
                    >
                        <div className="relative rounded-3xl p-2">
                            <motion.div
                                aria-hidden="true"
                                initial={GLASS_HIDDEN}
                                animate={GLASS_SHOWN}
                                exit={GLASS_HIDDEN}
                                transition={PANEL_TRANSITION}
                                className="absolute inset-0 rounded-3xl border"
                            />
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={PANEL_TRANSITION} className="relative">
                            <ul className="grid grid-cols-2 gap-1 p-1">
                                {EXPERTISE_SERVICES.map((service) => (
                                    <li key={service.slug}>
                                        <ServiceLink service={service} active={pathname === getServiceHref(service.slug)} onNavigate={() => setOpen(false)} />
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-1 flex items-center justify-between gap-4 rounded-2xl bg-white/[0.03] px-4 py-3">
                                <p className="text-xs text-neutral-500">
                                    Not sure where to start?{" "}
                                    <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-white hover:text-[#00d3f3] transition-colors">
                                        Schedule a call
                                    </a>
                                </p>
                                <Link
                                    href="/#services"
                                    onClick={(e) => {
                                        setOpen(false);
                                        onSectionLink(e);
                                    }}
                                    className="group/all inline-flex items-center gap-1.5 text-xs font-medium text-neutral-400 hover:text-[#00d3f3] transition-colors"
                                >
                                    All services
                                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/all:translate-x-0.5" />
                                </Link>
                            </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>,
            document.body
            )}
        </div>
    );
}

// Mobile: the services list expands under "Services" in the full-screen menu
export function MobileServicesList({ pathname, onNavigate }: { pathname: string; onNavigate: () => void }) {
    return (
        <ul className="grid grid-cols-1 gap-1 pb-3">
            {EXPERTISE_SERVICES.map((service) => (
                <li key={service.slug}>
                    <ServiceLink service={service} active={pathname === getServiceHref(service.slug)} onNavigate={onNavigate} />
                </li>
            ))}
        </ul>
    );
}
