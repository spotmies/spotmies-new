"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    BrainCircuit, Boxes, Smartphone, Cloud, Layers, Clapperboard, ShieldCheck,
    Users, MessagesSquare, AudioLines, ScanEye, Dna, HeartHandshake,
    Search, Code2, Handshake, TrendingUp,
    Palette, MousePointerClick, PenTool, Eye, Zap, Map as MapIcon, Film, Video, Megaphone, Languages, Sparkles, Scissors,
    BarChart3, CreditCard, LayoutDashboard, Database, Rocket, Wallet, Link2, Lock, Coins, Image as ImageIcon,
    Activity, Gift, BellRing, Bug, Gauge, ListChecks, FileSearch, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ExpertiseIcon, Headline as HeadlineContent } from "@/data/expertise";

export const ICONS: Record<ExpertiseIcon, LucideIcon> = {
    brain: BrainCircuit,
    blocks: Boxes,
    smartphone: Smartphone,
    cloud: Cloud,
    layers: Layers,
    clapperboard: Clapperboard,
    shield: ShieldCheck,
    users: Users,
    messages: MessagesSquare,
    mic: AudioLines,
    scan: ScanEye,
    dna: Dna,
    "heart-handshake": HeartHandshake,
    search: Search,
    code: Code2,
    handshake: Handshake,
    "trending-up": TrendingUp,
    palette: Palette,
    pointer: MousePointerClick,
    pen: PenTool,
    eye: Eye,
    zap: Zap,
    map: MapIcon,
    film: Film,
    video: Video,
    megaphone: Megaphone,
    languages: Languages,
    sparkles: Sparkles,
    scissors: Scissors,
    chart: BarChart3,
    "credit-card": CreditCard,
    layout: LayoutDashboard,
    database: Database,
    rocket: Rocket,
    wallet: Wallet,
    link: Link2,
    lock: Lock,
    coins: Coins,
    image: ImageIcon,
    activity: Activity,
    gift: Gift,
    bell: BellRing,
    bug: Bug,
    gauge: Gauge,
    "list-checks": ListChecks,
    "file-search": FileSearch,
};

// Same entrance as the landing sections: fade up, staggered by `custom`
export const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.1 * i,
            ease: [0.22, 1, 0.36, 1] as const,
        },
    }),
};

export function FadeUp({ children, className, index = 0 }: { children: React.ReactNode; className?: string; index?: number }) {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpVariant}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("relative z-10 max-w-[1362px] mx-auto px-6", className)}>{children}</div>;
}

// The "HOW WE WORK" pill from the process section, with its pinging cyan dot
export function PillEyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={cn("inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium uppercase tracking-wide text-neutral-300", className)}>
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d3f3] opacity-100" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d3f3]" />
            </span>
            <span className="leading-none pt-[1px]">{children}</span>
        </span>
    );
}

// Section heading in the landing style: gradient lead, dimmer tail
export function Headline({ title, className, as: Tag = "h2" }: { title: HeadlineContent; className?: string; as?: "h1" | "h2" }) {
    return (
        <Tag className={cn("font-bold tracking-tight leading-[1.1] pb-1 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400", className)}>
            {title.lead}
            {title.muted && <> <span className="text-neutral-500">{title.muted}</span></>}
        </Tag>
    );
}

export function scrollToId(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}
