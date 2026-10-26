"use client";

import React, { useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Briefcase, ChevronLeft, Home, Layers, LayoutGrid, Mail, Newspaper, Users } from "lucide-react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { GlowDivider } from "@/components/ui/glow-divider";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { Lockers } from "@/components/not-found/lockers";
import { EXPERTISE_PAGES, EXPERTISE_SERVICES } from "@/data/expertise";
import { STATIC_BLOG_DATA } from "@/data/blog-data";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

const QUICK_LINKS = [
    { name: "Services", description: "What we build", href: "/#services", icon: Layers },
    { name: "Our Work", description: "Products we've shipped", href: "/work", icon: LayoutGrid },
    { name: "About Us", description: "The team behind Spotmies", href: "/about", icon: Users },
    { name: "Careers", description: "Open roles", href: "/careers", icon: Briefcase },
    { name: "Blog", description: "Notes from the team", href: "/blog", icon: Newspaper },
    { name: "Contact Us", description: "Start a project", href: "/#contact", icon: Mail },
];

// Every real route, used to guess where a mistyped URL was meant to go
const KNOWN_ROUTES: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/careers", label: "Careers" },
    { href: "/work", label: "Our Work" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    ...EXPERTISE_SERVICES.filter((s) => EXPERTISE_PAGES[s.slug]).map((s) => ({
        href: `/expertise/${s.slug}`,
        label: s.name,
    })),
    ...STATIC_BLOG_DATA.map((post) => ({ href: `/blog/${post.slug}`, label: post.title })),
];

function levenshtein(a: string, b: string) {
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
        let prev = row[0];
        row[0] = i;
        for (let j = 1; j <= b.length; j++) {
            const temp = row[j];
            row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
            prev = temp;
        }
    }
    return row[b.length];
}

function findClosestRoute(path: string) {
    const target = path.toLowerCase().replace(/\/+$/, "");
    if (!target) return null;

    let best: { href: string; label: string } | null = null;
    let bestScore = Infinity;

    for (const route of KNOWN_ROUTES) {
        if (route.href === "/") continue;
        // Compare both the full path and the last segment, so "/expertis/saas" and "/saas-platform" both match
        const lastSegment = route.href.split("/").pop() ?? "";
        const score = Math.min(
            levenshtein(target, route.href),
            levenshtein(target.split("/").pop() ?? "", lastSegment) + 1,
        );
        if (score < bestScore) {
            bestScore = score;
            best = route;
        }
    }

    const threshold = Math.max(3, Math.floor(target.length * 0.35));
    return best && bestScore <= threshold ? best : null;
}

function decodePath(path: string) {
    try {
        return decodeURIComponent(path);
    } catch {
        return path;
    }
}

type Gtag = (...args: unknown[]) => void;

// Report the broken URL to GA4. The gtag script loads lazily, so wait for it briefly.
function useTrackNotFound(path: string) {
    useEffect(() => {
        let attempts = 0;
        const timer = window.setInterval(() => {
            const gtag = (window as unknown as { gtag?: Gtag }).gtag;
            if (gtag) {
                gtag("event", "page_not_found", {
                    page_path: path,
                    page_location: window.location.href,
                    page_referrer: document.referrer || "(direct)",
                });
                window.clearInterval(timer);
            } else if (++attempts > 40) {
                window.clearInterval(timer);
            }
        }, 250);
        return () => window.clearInterval(timer);
    }, [path]);
}

export default function NotFoundView() {
    const router = useRouter();
    const pathname = usePathname() ?? "/";
    const requestedPath = decodePath(pathname);
    const suggestion = useMemo(() => findClosestRoute(requestedPath), [requestedPath]);

    useTrackNotFound(pathname);

    const handleBack = () => {
        // Visitors who landed here directly have no history to go back to
        if (window.history.length > 1) router.back();
        else router.push("/");
    };

    return (
        <main className="bg-[#050505] min-h-screen w-full selection:bg-[#00d3f3]/30 overflow-x-hidden">
            <Navbar />

            <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 px-6 overflow-hidden">
                <NoiseOverlay />
                {/* Soft cyan glow behind the number */}
                <div className="pointer-events-none absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 w-[620px] h-[420px] max-w-full bg-[#00d3f3]/10 rounded-full blur-[120px]" />

                <div className="relative z-10 max-w-[1320px] mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="w-[260px] sm:w-[320px] md:w-[380px]"
                    >
                        <Lockers play intensity={0.6} label="A bank of lockers, searched one by one for the missing page" />
                    </motion.div>

                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        variants={fadeInUp}
                        className="mt-4 font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-6xl font-semibold tracking-tight text-white"
                    >
                        This page drifted{" "}
                        <span className="bg-gradient-to-r from-[#00d3f3] to-[#0077b6] bg-clip-text text-transparent">
                            off the map.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        variants={fadeInUp}
                        className="mt-5 max-w-xl text-base md:text-lg text-neutral-400 leading-relaxed"
                    >
                        The link may be broken, or the page may have moved. We&apos;ve checked every locker, and it
                        isn&apos;t in any of them. Pick a way back below.
                    </motion.p>

                    {/* The address the visitor asked for, plus the closest real page when there is one */}
                    <motion.p
                        initial="hidden"
                        animate="visible"
                        custom={3}
                        variants={fadeInUp}
                        className="mt-6 max-w-xl text-sm text-neutral-500 leading-relaxed break-words"
                    >
                        Nothing lives at{" "}
                        <span className="font-mono text-neutral-300 break-all">{requestedPath}</span>.
                        {suggestion && (
                            <>
                                {" "}Were you looking for{" "}
                                <Link
                                    href={suggestion.href}
                                    className="group inline-flex items-center gap-0.5 text-[#00d3f3] underline decoration-[#00d3f3]/30 underline-offset-4 hover:decoration-[#00d3f3] transition-colors"
                                >
                                    {suggestion.label}
                                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                                ?
                            </>
                        )}
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={4}
                        variants={fadeInUp}
                        className="mt-8 flex w-full sm:w-auto flex-col sm:flex-row items-center gap-3"
                    >
                        <Link
                            href="/"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm tracking-wide shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.6)] transition-shadow"
                        >
                            <Home className="w-4 h-4" />
                            Back to home
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <button
                            onClick={handleBack}
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3 text-white/90 rounded-full font-medium text-sm tracking-wide border border-white/10 bg-white/5 hover:border-[#00d3f3] hover:bg-[#00d3f3]/5 hover:shadow-[0_0_20px_rgba(0,211,243,0.15)] backdrop-blur-sm transition-all"
                        >
                            <span className="p-1 rounded-full bg-white/10 group-hover:bg-[#00d3f3]/20 group-hover:text-[#00d3f3] transition-colors">
                                <ChevronLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
                            </span>
                            <span className="group-hover:text-[#00d3f3] transition-colors">Go back</span>
                        </button>
                    </motion.div>
                </div>
            </section>

            <GlowDivider />

            <section className="relative px-6 py-20 md:py-24">
                <div className="max-w-[1320px] mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeInUp}
                        className="mb-10 text-center md:text-left"
                    >
                        <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#00d3f3]">Popular destinations</p>
                        <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-2xl md:text-4xl font-semibold text-white">
                            Here&apos;s where people usually head
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {QUICK_LINKS.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                custom={i}
                                variants={fadeInUp}
                            >
                                <Link
                                    href={link.href}
                                    className="group relative flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-[#00d3f3]/40 hover:bg-[#00d3f3]/[0.04] hover:shadow-[0_0_30px_-10px_rgba(0,211,243,0.35)] transition-all duration-300"
                                >
                                    <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-neutral-300 group-hover:text-[#00d3f3] group-hover:border-[#00d3f3]/30 transition-colors">
                                        <link.icon className="w-5 h-5" />
                                    </span>
                                    <span className="flex-1 min-w-0">
                                        <span className="block text-white font-medium">{link.name}</span>
                                        <span className="block text-sm text-neutral-500">{link.description}</span>
                                    </span>
                                    <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-[#00d3f3] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
