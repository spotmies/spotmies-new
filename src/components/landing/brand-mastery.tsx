"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

// --- CONFIGURATION ---
const PILLS = {
    // WHITE PILLS (Primary) -> CENTER CLUSTER (Honeycomb Layout)
    inner: [
        {
            label: "Design Systems", icon: "pentagon",
            top: "32%", left: "51%",
            mobileTop: "40%", mobileLeft: "30%",
            delay: 0.1, videoSrc: "/Art Galleries Web Design.mp4"
        },
        {
            label: "Product Branding", icon: "circle",
            top: "43%", left: "44%",
            mobileTop: "43%", mobileLeft: "70%",
            delay: 0.2, videoSrc: "/Art Galleries Web Design.mp4"
        },
        {
            label: "Mobile Apps", icon: "portrait",
            top: "43%", left: "61%",
            mobileTop: "52%", mobileLeft: "20%",
            delay: 0.2, videoSrc: "/Art Galleries Web Design.mp4"
        },
        {
            label: "UI/UX Design", icon: "play",
            top: "53%", left: "54%",
            mobileTop: "55%", mobileLeft: "80%",
            delay: 0.0, videoSrc: "/Art Galleries Web Design.mp4"
        },
        {
            label: "Web Platforms", icon: "globe",
            top: "64%", left: "44%",
            mobileTop: "65%", mobileLeft: "32%",
            delay: 0.3, videoSrc: "/Art Galleries Web Design.mp4"
        },
        {
            label: "SaaS Dev", icon: "landscape",
            top: "64%", left: "59%",
            mobileTop: "66%", mobileLeft: "65%",
            delay: 0.3, videoSrc: "/Art Galleries Web Design.mp4"
        },
        {
            label: "Brand Strategy", icon: "heart",
            top: "53%", left: "38%",
            mobileTop: "53%", mobileLeft: "50%",
            delay: 0.3, videoSrc: "/Art Galleries Web Design.mp4"
        },
    ],
    // DARK PILLS (Secondary) -> ARRANGED IN "ARCS"
    outer: [
        {
            label: "Smart Contracts",
            top: "31%", left: "29%",
            mobileTop: "12%", mobileLeft: "50%",
            delay: 0.4
        },
        {
            label: "Motion Design",
            top: "42%", left: "25%",
            mobileTop: "16%", mobileLeft: "28%",
            delay: 0.5
        },
        {
            label: "Growth Hacking",
            top: "53%", left: "19%",
            mobileTop: "26%", mobileLeft: "15%",
            delay: 0.6
        },
        {
            label: "AI Integration",
            top: "64%", left: "25%",
            mobileTop: "20%", mobileLeft: "77%",
            delay: 0.5
        },
        {
            label: "Data Science",
            top: "31%", left: "70%",
            mobileTop: "75%", mobileLeft: "15%",
            delay: 0.4
        },
        {
            label: "Product Strategy",
            top: "42%", left: "76%",
            mobileTop: "76%", mobileLeft: "85%",
            delay: 0.5
        },
        {
            label: "GTM Strategy",
            top: "53%", left: "68%",
            mobileTop: "86%", mobileLeft: "75%",
            delay: 0.6
        },
        {
            label: "Community",
            top: "53%", left: "80%",
            mobileTop: "90%", mobileLeft: "50%",
            delay: 0.5
        },
        {
            label: "Tech Docs",
            top: "64%", left: "77%",
            mobileTop: "85%", mobileLeft: "30%",
            delay: 0.4
        },
    ],
};

export default function BrandMastery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // SCROLL TRIGGER
    // Starts once 45% of the section is on screen, so the opening plays where people can see it
    const isInView = useInView(containerRef, {
        amount: 0.45,
        once: false
    });

    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        setIsExpanded(isInView);
    }, [isInView]);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // --- PHYSICS CONFIG ---
    const bezierEase: [number, number, number, number] = [0.77, 0, 0.175, 1];
    // Eased, no overshoot: the old spring bounced each pill past full size and back
    const pillTransition = { type: "tween", duration: 0.7, ease: [0.16, 1, 0.3, 1] };

    // --- DYNAMIC DISTANCES ---
    // UPDATED: Set to 570 as requested
    const expandDist = 565; 
    const mobileExpandDistX = 140;
    const mobileExpandDistY = 270;

    const labelOffset = 60;
    const mobileTextYOffset = 30;

    const blobInitialX = 50;
    const barWidth = isMobile ? 500 : expandDist * 2;
    const textInitialX = 90;

    return (
        <section
            id="brand"
            ref={containerRef}
            className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden font-sans pt-16 pb-24 md:pt-24 md:pb-32"
        >
            {/* --- 1. HEADER SECTION --- */}
            <div className="relative z-50 w-full max-w-[1362px] mx-auto px-6 mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-left bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    At the intersection of<br />
                    product and brand
                </h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xl text-left md:text-right"
                >
                    With over 7 years of experience in the industry, our offerings have evolved into a set of services that complement each other and allow us to design, develop, implement, maintain, and extend a consistent experience across all touchpoints.
                </motion.p>
            </div>

            {/* --- 2. ANIMATION CANVAS --- */}
            <div className="relative w-full max-w-[1362px] h-[600px] md:h-[600px] flex items-center justify-center">

                {/* STRUCTURE LAYER (Orbits & Lines) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center"
                >
                    {/* Inner Orbit */}
                    <div className="absolute w-[80vw] h-[80vw] md:w-[380px] md:h-[380px] border border-dashed border-[#00d3f3]/20 rounded-full" />
                    
                    {/* Outer Orbit - UPDATED: Size set to 1140px (570 * 2) */}
                    <div className="absolute w-[130vw] h-[130vw] md:w-[800px] md:h-[800px] border border-dashed border-[#00d3f3]/20 rounded-full" />

                    {/* DIAGONAL LINE (STATIC CONNECTOR) */}
                    <motion.div
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                        }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        style={{
                            width: isMobile ? "610px" : "1140px",
                            rotate: isMobile ? "62.6deg" : "0deg",
                            maxWidth: isMobile ? "none" : "1200px"
                        }}
                        className="absolute h-px border-t border-dashed border-[#00d3f3]/20 opacity-30 origin-center z-20"
                    />
                </motion.div>

                {/* LIQUID LAYER
                    Goo made from CSS filters, which run on the GPU: the layer is blurred, then high contrast snaps the blurred
                    edges back to crisp shapes that merge where they overlap, and lets the shrinking end blobs melt away.
                    (The old SVG filter was redrawn on the CPU every frame and made the opening stutter.) The black fill
                    gives contrast a base. */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center bg-black"
                    style={{ filter: "blur(10px) contrast(20)" }}
                >
                    {/* Starts as an 80px-wide bead between the blobs and stretches to full width. Drawn at full size and
                        scaled, so the browser only moves pixels instead of re-laying out the bar each frame. */}
                    <motion.div
                        initial={{ scaleX: 80 / barWidth, scaleY: 1, opacity: 1 }}
                        animate={{
                            scaleX: isExpanded ? 1 : 80 / barWidth,
                            scaleY: isExpanded ? 0 : 1,
                            opacity: isExpanded ? 0 : 1,
                        }}
                        transition={{
                            scaleX: { duration: 1.2, ease: bezierEase },
                            scaleY: { duration: 0.4, delay: isExpanded ? 1.0 : 0, ease: "easeOut" },
                            opacity: { duration: 0.2, delay: isExpanded ? 1.1 : 0, ease: "easeOut" },
                        }}
                        style={{ width: barWidth, height: 90, rotate: isMobile ? 63 : 0 }}
                        className="absolute bg-white rounded-full will-change-transform"
                    />

                    {/* Blob 1: Top-Left (North-West) */}
                    <motion.div
                        initial={{ x: -blobInitialX, y: 0, scale: 1 }}
                        animate={{
                            x: isExpanded ? (isMobile ? -mobileExpandDistX : -expandDist) : -blobInitialX,
                            y: isExpanded ? (isMobile ? -mobileExpandDistY : 0) : 0,
                            scale: isExpanded ? 0.12 : 1,
                        }}
                        transition={{ duration: 1.4, ease: bezierEase }}
                        className="absolute w-40 h-40 bg-white rounded-full will-change-transform"
                    />

                    {/* Blob 2: Bottom-Right (South-East) */}
                    <motion.div
                        initial={{ x: blobInitialX, y: 0, scale: 1 }}
                        animate={{
                            x: isExpanded ? (isMobile ? mobileExpandDistX : expandDist) : blobInitialX,
                            y: isExpanded ? (isMobile ? mobileExpandDistY : 0) : 0,
                            scale: isExpanded ? 0.12 : 1,
                        }}
                        transition={{ duration: 1.4, ease: bezierEase }}
                        className="absolute w-40 h-40 bg-white rounded-full will-change-transform"
                    />
                </div>

                {/* CLEAN DOTS LAYER */}
                <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
                    {/* BRAND DOT (Top-Left) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            x: isMobile ? -mobileExpandDistX : -expandDist,
                            y: isMobile ? -mobileExpandDistY : 0
                        }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="absolute w-[8px] h-[8px] bg-white rounded-full"
                    />
                    {/* PRODUCT DOT (Bottom-Right) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isExpanded ? 1 : 0,
                            x: isMobile ? mobileExpandDistX : expandDist,
                            y: isMobile ? mobileExpandDistY : 0
                        }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                        className="absolute w-[8px] h-[8px] bg-white rounded-full"
                    />
                </div>

                {/* TEXT LAYER */}
                <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
                    {/* CENTER TEXT */}
                    <motion.div
                        initial={{ y: 0, color: "#000000" }}
                        animate={{
                            y: isExpanded ? (isMobile ? 0 : -282) : 0,
                            opacity: isExpanded && isMobile ? 0 : 1,
                            color: isExpanded ? "#ffffff" : "#000000",
                        }}
                        transition={{ duration: 1.4, ease: bezierEase }}
                        className="absolute text-center font-bold text-lg md:text-xl z-30 leading-tight"
                    >
                        Mastery<br />Area
                    </motion.div>

                    {/* BRAND TEXT */}
                    <motion.div
                        initial={{ x: -textInitialX, y: 0 }}
                        animate={{
                            x: isExpanded ? (isMobile ? -mobileExpandDistX : -(expandDist + labelOffset)) : -textInitialX,
                            y: isExpanded ? (isMobile ? -(mobileExpandDistY + mobileTextYOffset) : 0) : 0,
                            color: isExpanded ? "#ffffff" : "#000000",
                        }}
                        transition={{ duration: 1.2, ease: bezierEase }}
                        className="absolute font-semibold whitespace-nowrap text-base md:text-lg z-30"
                    >
                        Brand
                    </motion.div>

                    {/* PRODUCT TEXT */}
                    <motion.div
                        initial={{ x: textInitialX, y: 0 }}
                        animate={{
                            x: isExpanded ? (isMobile ? mobileExpandDistX : (expandDist + labelOffset)) : textInitialX,
                            y: isExpanded ? (isMobile ? (mobileExpandDistY + mobileTextYOffset) : 0) : 0,
                            color: isExpanded ? "#ffffff" : "#000000",
                        }}
                        transition={{ duration: 1.2, ease: bezierEase }}
                        className="absolute font-semibold whitespace-nowrap text-base md:text-lg z-30"
                    >
                        Product
                    </motion.div>
                </div>

                {/* PILLS LAYER */}
                <div className="absolute inset-0 z-50">
                    {PILLS.inner.map((pill, i) => (
                        <Pill
                            key={`inner-${i}`}
                            {...pill}
                            isExpanded={isExpanded}
                            isMobile={isMobile}
                            variant="inverted-dark"
                            transition={pillTransition}
                            baseDelay={1.0}
                        />
                    ))}

                    {PILLS.outer.map((pill, i) => (
                        <Pill
                            key={`outer-${i}`}
                            {...pill}
                            isExpanded={isExpanded}
                            isMobile={isMobile}
                            variant="inverted-light"
                            transition={pillTransition}
                            baseDelay={1.4}
                        />
                    ))}
                </div>
            </div>

            {/* Styles for shapes */}
            <style jsx global>{`
        .icon { display: inline-block; width: 10px; height: 10px; }
        .shape-pentagon { 
          background: linear-gradient(135deg, #F2C94C, #F2994A); 
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%); 
        }
        .shape-circle { 
          background: linear-gradient(135deg, #56CCF2, #2F80ED); 
          border-radius: 50%; 
        }
        .shape-heart { 
          background: linear-gradient(135deg, #FF7675, #D63031); 
          clip-path: path('M5 9 L1 5 A2.5 2.5 0 1 1 5 2.5 A2.5 2.5 0 1 1 9 5 L5 9 Z'); 
        }
        .shape-play { 
          background: linear-gradient(135deg, #55EFC4, #00B894); 
          clip-path: polygon(25% 0%, 25% 100%, 90% 50%); 
        }
        .shape-portrait { 
          width: 8px; height: 12px; border-radius: 2px; 
          background: linear-gradient(135deg, #C084FC, #7E22CE); 
        }
        .shape-landscape { 
          width: 14px; height: 9px; border-radius: 2px; 
          background: linear-gradient(135deg, #818CF8, #4F46E5); 
        }
        .shape-globe {
          width: 12px; height: 12px; background: linear-gradient(135deg, #00b09b, #96c93d);
          mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M2 12h20'/%3E%3Cpath d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z'/%3E%3C/svg%3E");
          -webkit-mask-size: cover; mask-size: cover;
        }
        @media (max-width: 768px) {
           .pill-text { font-size: 10px; }
        }
      `}</style>
        </section>
    );
}

// --- SUB-COMPONENT: PILL WITH CLICK NAVIGATION ---
function Pill({ label, icon, top, left, mobileTop, mobileLeft, delay, isExpanded, isMobile, variant, transition, baseDelay, videoSrc }: any) {
    const router = useRouter(); // UPDATED: Router hook
    const isPrimary = variant === "inverted-dark"; 
    const [isHovered, setIsHovered] = useState(false);

    // Dynamic Position Selection
    const finalTop = isMobile && mobileTop ? mobileTop : top;
    const finalLeft = isMobile && mobileLeft ? mobileLeft : left;

    // UPDATED: Handle click to navigate to work page with filter
    const handleClick = () => {
        if (isPrimary) {
            router.push(`/work?category=${encodeURIComponent(label)}`, { scroll: true });
        }
    };

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{
                scale: isExpanded ? (isMobile ? 0.9 : 1) : 0,
                opacity: isExpanded ? 1 : 0,
            }}
            whileHover={isPrimary ? undefined : { scale: 1.1, transition: { duration: 0.25 } }}
            transition={{
                ...transition,
                delay: isExpanded ? baseDelay + delay : 0,
            }}
            // Centring comes from the -translate classes (the CSS translate property), which Framer's scale leaves alone
            style={{ top: finalTop, left: finalLeft, zIndex: isHovered ? 100 : 10 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick} // UPDATED: Added click handler
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium whitespace-nowrap cursor-pointer pointer-events-auto will-change-transform transition-[box-shadow,color,border-color] duration-300
                ${isPrimary
                    ? "bg-white text-black shadow-lg shadow-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95"
                    : "bg-neutral-900 border border-white/20 text-gray-400 hover:text-white hover:border-white/40"
                }
            `}
        >
            <div className="relative flex items-center gap-2 overflow-hidden h-5">
                {/* Left Icon */}
                {icon && (
                    <motion.div
                        initial={{ x: 0, opacity: 1, width: "auto" }}
                        animate={isPrimary ? {
                            x: isHovered ? -20 : 0,
                            opacity: isHovered ? 0 : 1,
                            width: isHovered ? 0 : "auto"
                        } : {}}
                        className="flex items-center justify-center"
                    >
                        <span className={`icon shape-${icon}`} />
                    </motion.div>
                )}

                <span className="pill-text">{label}</span>

                {/* Right Arrow */}
                {isPrimary && (
                    <motion.div
                        initial={{ x: 20, opacity: 0, width: 0 }}
                        animate={{
                            x: isHovered ? 0 : 20,
                            opacity: isHovered ? 1 : 0,
                            width: isHovered ? "auto" : 0
                        }}
                        className="flex items-center justify-center"
                    >
                        <ArrowRight className="w-3.5 h-3.5 text-black" strokeWidth={3} />
                    </motion.div>
                )}
            </div>

            {/* --- VIDEO POPUP (Desktop Only) --- */}
            <AnimatePresence>
                {isHovered && isPrimary && videoSrc && !isMobile && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 12 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="absolute bottom-full left-1/2 -translate-x-1/2 w-[80%] bg-gradient-to-t from-white/30 to-transparent blur-sm pointer-events-none z-40"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10, x: "-50%" }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: -20,
                                x: "-50%",
                                transition: { type: "spring", stiffness: 300, damping: 20 }
                            }}
                            exit={{ opacity: 0, scale: 0.8, y: -10, x: "-50%", transition: { duration: 0.15 } }}
                            className="absolute bottom-full left-1/2 w-48 md:w-64 aspect-video z-50 pointer-events-none"
                        >
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-full h-full rounded-xl overflow-hidden bg-black border border-white/20 shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                            >
                                <video
                                    src={videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 rounded-xl border border-white/10 ring-1 ring-white/20" />
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}