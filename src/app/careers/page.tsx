"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, MapPin, Clock, Briefcase,
    LayoutGrid, List as ListIcon, ChevronLeft, ChevronRight,
    Zap, Globe, Target
} from "lucide-react";
import { AmbientBackground } from "@/components/ui/ambient-background";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { getJobs } from "@/lib/api";
import { Job } from "@/types/types";
import { cn } from "@/lib/utils";
import BackButton from "@/components/ui/back-button";

// --- TechLogos (unchanged) ---
const TechLogos = {
    React: () => (
        <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 md:w-16 md:h-16 text-[#61DAFB]"><circle cx="0" cy="0" r="2" fill="currentColor"></circle><g stroke="currentColor" strokeWidth="1" fill="none"><ellipse rx="10" ry="4.5"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse><ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse></g></svg>
    ),
    Next: () => (
        <svg viewBox="0 0 180 180" className="w-12 h-12 md:w-16 md:h-16"><mask height="180" id="mask0_next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}><circle cx="90" cy="90" fill="black" r="90"></circle></mask><g mask="url(#mask0_next)"><circle cx="90" cy="90" data-circle="true" fill="black" r="90"></circle><path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_next)"></path><rect fill="url(#paint1_linear_next)" height="72" width="12" x="115" y="54"></rect></g><defs><linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_next" x1="109" x2="144.5" y1="116.5" y2="160.5"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_next" x1="121" x2="120.799" y1="54" y2="106.875"><stop stopColor="white"></stop><stop offset="1" stopColor="white" stopOpacity="0"></stop></linearGradient></defs></svg>
    ),
    TypeScript: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1280px-Typescript.svg.png" alt="TypeScript" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
    ),
    Node: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1280px-Node.js_logo.svg.png" alt="Node.js" className="h-8 md:h-12 w-auto object-contain" />
    ),
    Tailwind: () => (
        <svg viewBox="0 0 167 21" fill="none" className="h-6 md:h-8 w-auto text-white"><path fill="#38BDF8" d="M17.183 0C12.6 0 9.737 2.291 8.59 6.873c1.719-2.29 3.723-3.15 6.014-2.577 1.307.326 2.242 1.274 3.275 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.291 8.591-6.872-1.718 2.29-3.723 3.15-6.013 2.576-1.308-.326-2.243-1.274-3.276-2.324C23.39 1.98 21.44 0 17.183 0ZM8.59 10.309C4.01 10.309 1.145 12.6 0 17.182c1.718-2.291 3.723-3.15 6.013-2.577 1.308.326 2.243 1.274 3.276 2.324 1.685 1.71 3.635 3.689 7.894 3.689 4.582 0 7.445-2.29 8.59-6.872-1.718 2.29-3.722 3.15-6.013 2.577-1.307-.327-2.242-1.276-3.276-2.325-1.684-1.71-3.634-3.689-7.893-3.689Z"></path><path fill="currentColor" d="M51.547 8.688h-3v5.803c0 1.548 1.016 1.524 3 1.427v2.346c-4.015.483-5.611-.629-5.611-3.773V8.688H43.71V6.172h2.225V2.925l2.612-.774v4.021h2.998v2.516Zm11.43-2.516h2.61v12.092h-2.61v-1.741c-.92 1.28-2.346 2.055-4.233 2.055-3.288 0-6.021-2.78-6.021-6.36 0-3.603 2.733-6.36 6.021-6.36 1.886 0 3.313.774 4.233 2.032V6.172Zm-3.821 9.915c2.176 0 3.82-1.62 3.82-3.87 0-2.248-1.644-3.868-3.82-3.868-2.177 0-3.821 1.62-3.821 3.869s1.644 3.87 3.82 3.87ZM69.94 4.36a1.687 1.687 0 0 1-1.668-1.669c.002-.443.179-.868.491-1.18a1.662 1.662 0 0 1 2.354 0c.312.312.49.737.491 1.18 0 .895-.75 1.669-1.668 1.669Zm-1.306 13.905V6.172h2.612v12.092h-2.612Zm5.635 0V.609h2.611v17.654H74.27ZM93.834 6.172h2.757l-3.797 12.092h-2.563l-2.516-8.15-2.539 8.15h-2.563L78.816 6.172h2.757l2.346 8.343 2.54-8.343h2.49l2.514 8.343 2.37-8.343ZM99.83 4.36c-.92 0-1.669-.774-1.669-1.669.002-.443.18-.868.492-1.18a1.661 1.661 0 0 1 2.354 0c.313.312.49.737.492 1.18 0 .895-.75 1.669-1.669 1.669Zm-1.306 13.905V6.172h2.612v12.092h-2.612ZM110.52 5.858c2.708 0 4.643 1.838 4.643 4.982v7.423h-2.612v-7.158c0-1.838-1.064-2.804-2.708-2.804-1.717 0-3.071 1.015-3.071 3.482v6.48h-2.612V6.174h2.612V7.72c.798-1.257 2.103-1.862 3.748-1.862Zm17.024-4.522h2.612v16.927h-2.612v-1.741c-.918 1.282-2.345 2.055-4.231 2.055-3.289 0-6.022-2.78-6.022-6.36 0-3.603 2.733-6.36 6.022-6.36 1.886 0 3.313.774 4.231 2.032V1.336Zm-3.821 14.751c2.177 0 3.821-1.62 3.821-3.87 0-2.248-1.644-3.868-3.821-3.868-2.176 0-3.82 1.62-3.82 3.869s1.644 3.87 3.82 3.87Zm15.187 2.49c-3.651 0-6.384-2.78-6.384-6.36 0-3.602 2.733-6.359 6.384-6.359 2.37 0 4.426 1.233 5.393 3.12l-2.249 1.306c-.532-1.137-1.717-1.863-3.168-1.863-2.128 0-3.748 1.62-3.748 3.797 0 2.176 1.62 3.797 3.748 3.797 1.451 0 2.636-.75 3.216-1.863l2.249 1.282c-1.015 1.91-3.071 3.144-5.441 3.144Zm9.746-9.068c0 2.201 6.505.87 6.505 5.345 0 2.419-2.104 3.724-4.716 3.724-2.418 0-4.159-1.089-4.933-2.83l2.249-1.305c.387 1.088 1.355 1.74 2.684 1.74 1.161 0 2.056-.386 2.056-1.354 0-2.151-6.505-.942-6.505-5.27 0-2.274 1.959-3.701 4.425-3.701 1.983 0 3.628.92 4.474 2.515l-2.2 1.233c-.436-.943-1.283-1.378-2.274-1.378-.943 0-1.765.41-1.765 1.281Zm11.148 0c0 2.201 6.505.87 6.505 5.345 0 2.419-2.104 3.724-4.716 3.724-2.418 0-4.158-1.089-4.933-2.83l2.249-1.305c.387 1.088 1.354 1.74 2.684 1.74 1.161 0 2.056-.386 2.056-1.354 0-2.151-6.505-.942-6.505-5.27 0-2.274 1.959-3.701 4.426-3.701 1.982 0 3.627.92 4.473 2.515l-2.2 1.233c-.435-.943-1.282-1.378-2.273-1.378-.944 0-1.766.41-1.766 1.281Z"></path></svg>
    ),
    Python: () => (
        <img src="https://www.python.org/static/img/python-logo.png" alt="Python" className="h-8 md:h-12 w-auto object-contain" />
    ),
    AWS: () => (
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png" alt="AWS" className="h-8 md:h-12 w-auto object-contain" />
    ),
    Docker: () => (
        <img src="https://brandlogos.net/wp-content/uploads/2025/10/docker_mark-logo_brandlogos.net_yetav.png" alt="Docker" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
    ),
    Figma: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="480" height="720" fill="none" viewBox="0 0 480 720" aria-label="Homepage" className="w-8 h-12 md:w-10 md:h-16"><path fill="#24CB71" d="M0 600c0-66.274 53.726-120 120-120h120v120c0 66.274-53.726 120-120 120S0 666.274 0 600"></path><path fill="#FF7237" d="M240 0v240h120c66.274 0 120-53.726 120-120S426.274 0 360 0z"></path><circle cx="359" cy="360" r="120" fill="#00B6FF"></circle><path fill="#FF3737" d="M0 120c0 66.274 53.726 120 120 120h120V0H120C53.726 0 0 53.726 0 120"></path><path fill="#874FFF" d="M0 360c0 66.274 53.726 120 120 120h120V240H120C53.726 240 0 293.726 0 360"></path></svg>
    ),
    Three: () => (
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhUyPLMCrdBvL7byu5KkMnOssbQigrkiRxZw&s" alt="Three.js" className="w-12 h-12 md:w-16 md:h-16 object-contain rounded-full" />
    )
};

const TECH_STACK = [
    { icon: <TechLogos.React /> },
    { icon: <TechLogos.Next /> },
    { icon: <TechLogos.TypeScript /> },
    { icon: <TechLogos.Node /> },
    { icon: <TechLogos.Tailwind /> },
    { icon: <TechLogos.Python /> },
    { icon: <TechLogos.AWS /> },
    { icon: <TechLogos.Docker /> },
    { icon: <TechLogos.Figma /> },
    { icon: <TechLogos.Three /> },
];

export default function CareersPage() {
    const router = useRouter(); 
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const [totalJobs, setTotalJobs] = useState(0);
    const JOBS_PER_PAGE = 6;

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const { jobs, total } = await getJobs(currentPage, JOBS_PER_PAGE);
                setJobs(jobs);
                setTotalJobs(total);
            } catch (error) {
                console.error("Failed to load jobs", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

        if (currentPage > 1) {
            document.getElementById("openings")?.scrollIntoView({ behavior: "smooth" });
        }
    }, [currentPage]);

    const totalPages = Math.ceil(totalJobs / JOBS_PER_PAGE);

    const handleApply = (jobId: string) => {
        window.open(`https://www.reaidy.io/jobs/${jobId}`, "_blank");
    };

    const stripHtml = (html: string) => {
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    return (
        <main className="min-h-screen bg-[#050505] selection:bg-[#00d3f3]/30">
            <Navbar />

            <div className="relative overflow-hidden pt-32 pb-20">
                <AmbientBackground intensity="subtle" className="opacity-50" />

                {/* --- Hero Section --- */}
                <section className="relative px-6 z-10 mb-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <BackButton />
                        </div>

                        <div className="text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00d3f3]/10 border border-[#00d3f3]/20 text-sm text-[#00d3f3] font-medium mb-8 backdrop-blur-md"
                            >
                                <span className="relative flex h-2.5 w-2.5 mr-1">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d3f3] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00d3f3]"></span>
                                </span>
                                We are hiring
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white"
                            >
                                Build the future <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-500">with </span>{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d3f3] to-cyan-600">Spotmies.</span>
                            </motion.h1>
                        </div>
                    </div>
                </section>

                {/* --- Values Section --- */}
                <section className="py-10 px-6 relative z-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { t: "Result Driven", d: "We focus on impact.", icon: <Target className="w-6 h-6" /> },
                            { t: "Continuous Learning", d: "We evolve with tech.", icon: <Zap className="w-6 h-6" /> },
                            { t: "Global Impact", d: "Projects that matter.", icon: <Globe className="w-6 h-6" /> }
                        ].map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-[#00d3f3]/30 transition-all duration-300"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-[#00d3f3]/10 flex items-center justify-center text-[#00d3f3] mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {v.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{v.t}</h3>
                                <p className="text-zinc-400 text-lg leading-relaxed">{v.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* --- 🚀 TECH STACK INFINITE SCROLL --- */}
                <section className="py-16 relative z-10 overflow-hidden border-y border-white/5 bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
                        <span className="text-sm font-medium text-zinc-500 uppercase tracking-widest">Our Technology Stack</span>
                    </div>

                    <div className="flex w-full overflow-hidden mask-linear-fade">
                        <motion.div
                            className="flex gap-16 items-center shrink-0 pr-16"
                            animate={{ x: "-50%" }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                        >
                            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                                <div key={i} className="flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity cursor-default group grayscale hover:grayscale-0 duration-300">
                                    {tech.icon}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* --- Job Listings Section --- */}
                <section className="py-32 px-6 relative z-10" id="openings">
                    <div className="max-w-7xl mx-auto">

                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-6 gap-6">
                            <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-4 mb-3">
                                        <Briefcase className="text-[#00d3f3] w-8 h-8 md:w-10 md:h-10" /> Open Positions
                                    </h2>
                                </div>

                                {/* ALIGNED CONTAINER: Showing X of Y roles + Switcher */}
                                <div className="flex items-center gap-6">
                                    <p className="text-zinc-400 text-lg whitespace-nowrap">
                                        Showing <span className="text-white font-bold">{jobs.length}</span> of <span className="text-white font-bold">{totalJobs}</span> roles
                                    </p>

                                    {/* PILL SWITCHER - Hidden on Mobile */}
                                    <div className="relative hidden md:flex items-center bg-white/5 p-1 rounded-full border border-white/10">
                                        {/* Animated Background Pill */}
                                        <motion.div
                                            className="absolute top-1 bottom-1 bg-[#00d3f3] rounded-full shadow-lg shadow-[#00d3f3]/20"
                                            initial={false}
                                            animate={{
                                                x: viewMode === "grid" ? 0 : "100%",
                                                width: "50%"
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />

                                        {/* Grid Button */}
                                        <button
                                            onClick={() => setViewMode("grid")}
                                            className={cn(
                                                "relative z-10 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition-colors duration-300",
                                                viewMode === "grid" ? "text-black" : "text-zinc-400 hover:text-white"
                                            )}
                                        >
                                            <LayoutGrid className="w-4 h-4" />
                                            <span className="hidden sm:inline">Grid</span>
                                        </button>

                                        {/* List Button */}
                                        <button
                                            onClick={() => setViewMode("list")}
                                            className={cn(
                                                "relative z-10 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition-colors duration-300",
                                                viewMode === "list" ? "text-black" : "text-zinc-400 hover:text-white"
                                            )}
                                        >
                                            <ListIcon className="w-4 h-4" />
                                            <span className="hidden sm:inline">List</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-96 rounded-[2rem] bg-white/5 border border-white/10" />
                                ))}
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="text-center py-32 bg-white/5 rounded-[2.5rem] border border-white/10">
                                <p className="text-zinc-400 text-xl">No open positions found at this time.</p>
                            </div>
                        ) : (
                            <div className={cn(
                                "grid gap-8",
                                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                            )}>
                                <AnimatePresence mode="popLayout">
                                    {jobs.map((job, i) => (
                                        <motion.div
                                            key={job._id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.3, delay: i * 0.05 }}
                                            className={cn(
                                                "group relative rounded-[2rem] border border-white/10 bg-zinc-900/40 backdrop-blur-md hover:border-[#00d3f3]/50 transition-all duration-300",
                                                viewMode === "list" ? "p-8 md:p-10 flex flex-col md:flex-row gap-10 md:items-center" : "p-8 md:p-10 flex flex-col"
                                            )}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-[#00d3f3]/0 via-[#00d3f3]/5 to-[#00d3f3]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />

                                            <div className="flex-1 space-y-6">
                                                <div>
                                                    <div className="flex items-start justify-between gap-4">
                                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#00d3f3] transition-colors leading-tight">
                                                            {job.jobTitle}
                                                        </h3>
                                                        {/* REMOVED: External Link Icon Button */}
                                                    </div>

                                                    <div className="flex flex-wrap gap-3 mt-4 text-sm text-zinc-400">
                                                        <span className="flex items-center gap-2 capitalize bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                                                            <MapPin className="w-4 h-4 text-[#00d3f3]" /> {job.locations?.[0] || "Remote"}
                                                        </span>
                                                        <span className="flex items-center gap-2 capitalize bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
                                                            <Clock className="w-4 h-4 text-[#00d3f3]" /> {job.jobMode}
                                                        </span>
                                                    </div>
                                                </div>

                                                <p className={cn(
                                                    "text-zinc-400 text-base leading-relaxed",
                                                    viewMode === "grid" ? "line-clamp-4" : "line-clamp-3 md:line-clamp-2"
                                                )}>
                                                    {stripHtml(job.jobDescription)}
                                                </p>

                                                <div className="flex gap-2 flex-wrap pt-2">
                                                    {job.requiredSkills.slice(0, viewMode === "grid" ? 3 : 6).map((req, j) => (
                                                        <span key={j} className="text-xs font-semibold px-3 py-1.5 rounded-md bg-white/5 text-zinc-300 border border-white/10 uppercase tracking-wide">
                                                            {req}
                                                        </span>
                                                    ))}
                                                    {job.requiredSkills.length > (viewMode === "grid" ? 3 : 6) && (
                                                        <span className="text-xs px-3 py-1.5 rounded-md text-zinc-500 border border-white/5">
                                                            +{job.requiredSkills.length - (viewMode === "grid" ? 3 : 6)} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className={cn("shrink-0", viewMode === "grid" ? "mt-8 pt-8 border-t border-white/5" : "")}>
                                                <button
                                                    onClick={() => handleApply(job._id)}
                                                    className={cn(
                                                        "rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn text-lg",
                                                        viewMode === "grid"
                                                            ? "w-full py-4 bg-white text-black hover:bg-[#00d3f3]"
                                                            : "w-full md:w-auto px-8 py-4 bg-white text-black hover:bg-[#00d3f3] shadow-lg hover:shadow-[#00d3f3]/20"
                                                    )}
                                                >
                                                    Apply Now
                                                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {!loading && totalPages > 1 && (
                            <div className="flex items-center justify-center gap-6 mt-20">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all group"
                                >
                                    <ChevronLeft className="w-6 h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
                                </button>

                                <div className="flex items-center gap-3">
                                    {Array.from({ length: totalPages }).map((_, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setCurrentPage(idx + 1)}
                                            className={cn(
                                                "w-12 h-12 rounded-full flex items-center justify-center text-base font-bold transition-all",
                                                currentPage === idx + 1
                                                    ? "bg-[#00d3f3] text-black scale-110 shadow-[0_0_20px_rgba(0,211,243,0.4)]"
                                                    : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                                            )}
                                        >
                                            {idx + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all group"
                                >
                                    <ChevronRight className="w-6 h-6 text-white group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
            <Footer />
        </main>
    );
}