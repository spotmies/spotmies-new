"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { MobileServicesList, ServicesMenu } from "@/components/landing/services-menu";

// --- CUSTOM HOOK: SCROLL SPY ---
// Tracks which section is currently in the middle of the viewport
function useScrollSpy(ids: string[]) {
    const [activeId, setActiveId] = useState<string | null>(null);

    useEffect(() => {
        // Options: The rootMargin "-45% 0px -45% 0px" defines a thin strip 
        // in the middle of the screen (10% height). 
        // A section is only "active" if it intersects this strip.
        const observerOptions = {
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Section entered the middle strip: Set it as active
                    setActiveId(entry.target.id);
                } else {
                    // Section left the middle strip: 
                    // If it was the active one, clear the highlight.
                    setActiveId((prev) => (prev === entry.target.id ? null : prev));
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        ids.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [ids]);

    return activeId;
}

export default function Navbar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

    // 1. Define IDs to track for scroll highlighting
    const sectionIds = ["services", "portfolio", "process", "contact"];
    const activeSection = useScrollSpy(sectionIds);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    // Navigation Items Configuration
    const navItems = [
        { name: "Services", href: "/#services", id: "services" },
        { name: "Portfolio", href: "/#portfolio", id: "portfolio" },
        { name: "Process", href: "/#process", id: "process" },
        { name: "Careers", href: "/careers", id: "careers" },
        { name: "About Us", href: "/about", id: "about" },
        { name: "Blogs", href: "/blog", id: "blog" },
        { name: "Contact Us", href: "/#contact", id: "contact" },
    ];

    // Handle smooth scrolling for anchor links
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        // Only handle if it's an anchor link
        if (href.includes("#")) {
            const targetId = href.split("#")[1];
            const elem = document.getElementById(targetId);

            if (elem) {
                e.preventDefault();
                elem.scrollIntoView({ behavior: "smooth", block: "start" });
                // Update URL without reload
                window.history.pushState(null, "", href);
                setMobileMenuOpen(false);
            } else if (pathname !== "/") {
                // If we are on another page (e.g. /about) and click a home anchor, 
                // allow default behavior to route us to home
                setMobileMenuOpen(false);
                return;
            }
        } else {
            setMobileMenuOpen(false);
        }
    };

    const scheduleMeeting = (e: React.MouseEvent) => {
        e.preventDefault();
        window.open("https://calendly.com/spotmies/30min", "_blank");
        setMobileMenuOpen(false);
    };

    // Helper to determine active state
    const isItemActive = (item: typeof navItems[0]) => {
        // 1. Home page section highlight (Only if tracked by Observer)
        if (pathname === "/" && activeSection === item.id) return true;

        // Every service page counts as being in Services
        if (item.id === "services" && pathname.startsWith("/expertise/")) return true;

        // 2. Exact page match (e.g., /about)
        if (pathname === item.href) return true;

        // 3. Nested route match (e.g., /blog/post-1 keeps /blog active)
        if (item.href !== "/" && !item.href.includes("#") && pathname.startsWith(`${item.href}/`)) {
            return true;
        }

        return false;
    };

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
                {/* LOGO */}
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

                {/* DESKTOP MENU */}
                <div className="hidden md:flex items-center gap-5 lg:gap-8">
                    {navItems.map((item) => {
                        const isActive = isItemActive(item);

                        if (item.id === "services") {
                            return <ServicesMenu key={item.name} active={isActive} pathname={pathname} onSectionLink={(e) => handleScroll(e, item.href)} />;
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleScroll(e, item.href)}
                                className={cn(
                                    "text-sm font-medium transition-colors relative group py-2",
                                    isActive ? "text-[#00d3f3]" : "text-gray-300 hover:text-white"
                                )}
                            >
                                {item.name}
                                <span className={cn(
                                    "absolute bottom-0 left-0 h-[1.5px] rounded-full bg-[#00d3f3] transition-all duration-300 ease-out",
                                    isActive ? "w-full" : "w-0 group-hover:w-full"
                                )} />
                            </Link>
                        );
                    })}
                </div>

                {/* CTA BUTTON */}
                <button
                    onClick={scheduleMeeting}
                    className="hidden md:flex group items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#00d3f3] hover:bg-[#00d3f3]/5 hover:shadow-[0_0_20px_rgba(0,211,243,0.15)] text-sm font-medium text-white/90"
                >
                    <span className="group-hover:text-[#00d3f3] transition-colors duration-300">Schedule a Call</span>
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00d3f3]/20 transition-all duration-300">
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#00d3f3] group-hover:-rotate-45 transition-all duration-300" />
                    </div>
                </button>

                {/* MOBILE MENU TOGGLE */}
                <button
                    className="md:hidden text-white p-2 z-[102] relative outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            {/* MOBILE MENU DROPDOWN */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed inset-0 bg-[#050505] z-[90] flex flex-col pt-32 px-6 pb-6 md:hidden pointer-events-auto overflow-y-auto"
                    >
                        <div className="flex flex-col w-full max-w-lg mx-auto min-h-full justify-between gap-6">
                            <div className="flex flex-col gap-1">
                                {navItems.map((item, i) => {
                                    const isActive = isItemActive(item);
                                    if (item.id === "services") {
                                        return (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, x: -30 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                                                className="border-b border-white/5"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => setMobileServicesOpen((o) => !o)}
                                                    aria-expanded={mobileServicesOpen}
                                                    className="group flex items-center justify-between py-4 w-full active:opacity-70"
                                                >
                                                    <span className={cn(
                                                        "text-2xl font-bold transition-colors",
                                                        isActive || mobileServicesOpen ? "text-[#00d3f3]" : "text-white/90 group-hover:text-[#00d3f3]"
                                                    )}>
                                                        {item.name}
                                                    </span>
                                                    <ChevronDown className={cn(
                                                        "w-5 h-5 transition-all duration-300",
                                                        mobileServicesOpen ? "rotate-180 text-[#00d3f3]" : "text-white/30"
                                                    )} />
                                                </button>
                                                <AnimatePresence initial={false}>
                                                    {mobileServicesOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                                            className="overflow-hidden"
                                                        >
                                                            <MobileServicesList
                                                                pathname={pathname}
                                                                onNavigate={() => {
                                                                    setMobileMenuOpen(false);
                                                                    setMobileServicesOpen(false);
                                                                }}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    }
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
                                                onClick={(e) => handleScroll(e, item.href)}
                                                className="group flex items-center justify-between py-4 w-full active:opacity-70"
                                            >
                                                <span className={cn(
                                                    "text-2xl font-bold transition-colors",
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
                                className="w-full py-4 rounded-full border border-white/10 bg-white/5 text-white font-bold text-lg hover:border-[#00d3f3] hover:bg-[#00d3f3]/5 hover:shadow-[0_0_20px_rgba(0,211,243,0.15)] active:scale-95 transition-all flex items-center justify-center gap-3 group"
                            >
                                <span className="group-hover:text-[#00d3f3] transition-colors">Schedule a Call</span>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#00d3f3]/20 transition-all">
                                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-[#00d3f3] group-hover:-rotate-45 transition-all" />
                                </div>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}