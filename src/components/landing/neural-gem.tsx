"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<string>("");

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection("");
            return;
        }

        const sectionIds = ["hero", "services", "portfolio", "process", "contact"];
        const observerOptions = {
            root: null,
            rootMargin: "-40% 0px -40% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === "hero") {
                        setActiveSection("");
                    } else {
                        setActiveSection(id);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [pathname]);

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith("#") || (pathname === "/" && href.startsWith("/#"))) {
            const targetId = href.includes("#") ? href.split("#")[1] : "";
            const elem = document.getElementById(targetId);
            if (elem) {
                e.preventDefault();
                elem.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.pushState(null, "", href);
                setMobileMenuOpen(false);
            }
        }
    };

    const scheduleMeeting = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://calendly.com/anjali-spotmies/30min", "_blank");
        setMobileMenuOpen(false);
    };

    const navItems = [
        { name: "Services", href: "/#services", id: "services" },
        { name: "Portfolio", href: "/#portfolio", id: "portfolio" },
        { name: "Process", href: "/#process", id: "process" },
        { name: "Careers", href: "/careers", id: "careers" },
        { name: "About Us", href: "/about", id: "about" },
        { name: "Blogs", href: "/blogs", id: "blogs" },
        { name: "Contact Us", href: "/#contact", id: "contact" },
    ];

    return (
        <div className="fixed top-0 w-full flex justify-center z-[100] p-4 md:p-6 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative flex items-center justify-between w-full max-w-[1320px] rounded-full px-6 py-3 transition-all duration-300 z-[101] pointer-events-auto",
                    scrolled || mobileMenuOpen
                        ? "bg-black/80 backdrop-blur-md border border-white/10 shadow-lg"
                        : "bg-black/50 backdrop-blur-sm border border-white/5"
                )}
            >
                <Link
                    href="/"
                    className="flex items-center gap-2 cursor-pointer z-[102]"
                    onClick={() => {
                        if (pathname === "/") {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                        setMobileMenuOpen(false);
                    }}
                >
                    <div className="relative w-32 h-8 md:w-40 md:h-8">
                        <Image src="/spotmies_banner.png" alt="Spotmies" fill className="object-contain" priority />
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-5 lg:gap-8">
                    {navItems.map((item) => {
                        const isActive =
                            (pathname === "/" && activeSection === item.id) ||
                            (pathname === item.href);

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => item.href.includes("#") ? handleScroll(e, item.href) : null}
                                className={cn(
                                    "text-sm font-medium transition-colors relative group",
                                    isActive ? "text-[#00d3f3]" : "text-gray-300 hover:text-white"
                                )}
                            >
                                {item.name}
                                <span className={cn(
                                    "absolute -bottom-1 left-0 h-0.5 bg-[#00d3f3] transition-all duration-300",
                                    isActive ? "w-full" : "w-0 group-hover:w-full"
                                )} />
                            </Link>
                        );
                    })}
                </div>

                <button
                    onClick={scheduleMeeting}
                    className="hidden md:flex group relative items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white text-xs md:text-sm font-medium transition-all cursor-pointer"
                >
                    <span>Schedule a Call</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                    className="md:hidden text-white p-2 z-[102] relative outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        // Responsive Fixes: h-dvh, overflow-y-auto, reduced top padding
                        className="fixed inset-0 bg-[#050505] z-[90] flex flex-col pt-24 px-6 pb-6 md:hidden pointer-events-auto h-dvh overflow-y-auto"
                    >
                        <div className="flex flex-col w-full max-w-lg mx-auto min-h-full justify-between gap-8">
                            <div className="flex flex-col gap-1">
                                {navItems.map((item, i) => {
                                    const isActive = (pathname === "/" && activeSection === item.id) || (pathname === item.href);
                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                                            className="border-b border-white/5 last:border-none"
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={(e) => item.href.includes("#") ? handleScroll(e, item.href) : setMobileMenuOpen(false)}
                                                className="group flex items-center justify-between py-4 w-full active:opacity-70"
                                            >
                                                <span className={cn(
                                                    "text-xl font-bold transition-colors", // Reduced font size slightly for mobile
                                                    isActive ? "text-[#00d3f3]" : "text-white/90 group-hover:text-[#00d3f3]"
                                                )}>
                                                    {item.name}
                                                </span>
                                                <ArrowRight className={cn(
                                                    "w-5 h-5 transition-all duration-300",
                                                    isActive ? "text-[#00d3f3] translate-x-2" : "text-white/30 group-hover:text-[#00d3f3]"
                                                )} />
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                            <button
                                onClick={scheduleMeeting}
                                className="w-full py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-neutral-200 active:scale-95 transition-all flex items-center justify-center gap-2 mt-auto"
                            >
                                Schedule a Call
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}