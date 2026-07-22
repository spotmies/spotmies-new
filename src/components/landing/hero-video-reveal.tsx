"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { PerspectiveMarqueePlayer } from "@/components/ui/perspective-marquee";

const NOTCH_H = 80; // 5rem
const CURVE_R = 24; // corner / flare radius

const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

// The notch width will now be calculated via framer-motion useTransform
// to guarantee SSR and client hydration match perfectly.

/**
 * Builds a rounded-rect path with a concave "dynamic island" style notch
 * cut into the top edge. All arcs are computed in real pixel space, so
 * the shape never seams or distorts, unlike stacked mask-image gradients.
 */
function buildNotchPath(width: number, height: number, radius: number, notchWidth: number, isMobile: boolean = false) {
    if (width <= 0 || height <= 0) return "";

    const r = Math.max(0, Math.min(radius, height / 2, width / 2));
    const cx = width / 2;

    if (isMobile) {
        const gap = 24;
        const pillH = 60;
        const pr = pillH / 2;
        const nw = Math.max(0, notchWidth / 2 - pr);

        const outer = [
            `M ${r} 0`,
            `L ${width - r} 0`,
            `A ${r} ${r} 0 0 1 ${width} ${r}`,
            `L ${width} ${height - r}`,
            `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
            `L ${r} ${height}`,
            `A ${r} ${r} 0 0 1 0 ${height - r}`,
            `L 0 ${r}`,
            `A ${r} ${r} 0 0 1 ${r} 0`,
            "Z",
        ].join(" ");

        const inner = [
            `M ${cx - nw} ${gap}`,
            `A ${pr} ${pr} 0 0 0 ${cx - nw} ${gap + 2 * pr}`,
            `L ${cx + nw} ${gap + 2 * pr}`,
            `A ${pr} ${pr} 0 0 0 ${cx + nw} ${gap}`,
            "Z"
        ].join(" ");

        return `${outer} ${inner}`;
    }

    const nw = Math.min(notchWidth / 2, width / 2 - r);
    const nh = Math.min(NOTCH_H, height / 2);
    const nr = Math.min(CURVE_R, nh, nw);

    return [
        `M ${r} 0`,
        `L ${cx - nw - nr} 0`,
        // flare down into the notch (concave, sweep=1)
        `A ${nr} ${nr} 0 0 1 ${cx - nw} ${nr}`,
        `L ${cx - nw} ${nh - nr}`,
        // round the notch's bottom-left corner (sweep=0)
        `A ${nr} ${nr} 0 0 0 ${cx - nw + nr} ${nh}`,
        `L ${cx + nw - nr} ${nh}`,
        // round the notch's bottom-right corner (sweep=0)
        `A ${nr} ${nr} 0 0 0 ${cx + nw} ${nh - nr}`,
        `L ${cx + nw} ${nr}`,
        // flare back up out of the notch (concave, sweep=1)
        `A ${nr} ${nr} 0 0 1 ${cx + nw + nr} 0`,
        `L ${width - r} 0`,
        // outer rounded corners (convex, sweep=1)
        `A ${r} ${r} 0 0 1 ${width} ${r}`,
        `L ${width} ${height - r}`,
        `A ${r} ${r} 0 0 1 ${width - r} ${height}`,
        `L ${r} ${height}`,
        `A ${r} ${r} 0 0 1 0 ${height - r}`,
        `L 0 ${r}`,
        `A ${r} ${r} 0 0 1 ${r} 0`,
        "Z",
    ].join(" ");
}

export const HeroVideoReveal = ({ children }: { children: React.ReactNode }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth the scroll progress to eliminate mouse wheel stutter
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 25,
        stiffness: 100,
        restDelta: 0.001
    });

    const isContainerInView = useInView(containerRef);

    const videos = [
        "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3iVkvCKwGbtro0xYShRpEzMyFOLuf7c8eCGVqT",
        "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3iKoFnG85WTx7bFMEnAO58qUL6iuIVRmQzkN9Y",
        "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3iBttBB0ExxH8PRt7TM2LOspFIy0U5EJv3AeYk",
        "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3it9fvGSlUx52NqWcVG736rAjlbaDeOMXsL8dw",
        "https://o3xxyf2839.ufs.sh/f/z2WZxvQexo3ieTqBXafMf3Tj5ICFamSKdR2HWEQsw4uLhBOz"
    ];
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [isHovering, setIsHovering] = useState(false);

    // Mute video when container scrolls out of view
    useEffect(() => {
        if (!isContainerInView && !isMuted) {
            setIsMuted(true);
        }
    }, [isContainerInView, isMuted]);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        cursorX.jump(e.clientX);
        cursorY.jump(e.clientY);
        cursorXSpring.jump(e.clientX);
        cursorYSpring.jump(e.clientY);
        setIsHovering(true);
    };
    const handleMouseLeave = () => setIsHovering(false);

    const toggleMute = () => {
        setIsMuted(prev => !prev);
    };

    const handleVideoEnded = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;
            if (index === currentVideoIndex) {
                video.currentTime = 0;
                video.play().catch((e) => console.error("Video playback failed:", e));
            } else {
                video.pause();
            }
        });
    }, [currentVideoIndex]);

    // Initialize with fixed SSR fallback values to prevent hydration mismatches.
    // The actual viewport size is set immediately after hydration inside the useEffect below.
    const vw = useMotionValue(1440);
    const vh = useMotionValue(900);

    useEffect(() => {
        const update = () => {
            vw.set(window.innerWidth);
            vh.set(window.innerHeight);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [vw, vh]);

    // Pixel-based size interpolation (0.85 -> 1 of viewport width, 0.25 -> 1 of viewport height)
    const widthPx = useTransform([smoothProgress, vw], (latest) => {
        const [t, viewportW] = latest as number[];
        return lerp(viewportW * 0.85, viewportW, t);
    });
    const heightPx = useTransform([smoothProgress, vh], (latest) => {
        const [t, viewportH] = latest as number[];
        return lerp(viewportH * 0.25, viewportH, t);
    });
    const borderRadius = useTransform(smoothProgress, [0, 1], [32, 0]);
    const marginBottom = useTransform(smoothProgress, [0, 1], [-10, 0]);
    const fadeOpacity = useTransform(smoothProgress, [0.7, 1], [0, 1]);
    const textOverlayOpacity = useTransform(smoothProgress, [0.4, 0.8], [0, 1]);
    const textOverlayY = useTransform(smoothProgress, [0.4, 0.8], [30, 0]);

    const notchWidth = useTransform(vw, (w) => (w >= 768 ? 560 : 280) as number);

    // The single source of truth for the notch shape, shared by the
    // clip-path (cuts the video) and the border path (traces the same edge).
    const pathD = useTransform([widthPx, heightPx, borderRadius, notchWidth, vw], (latest: any) => {
        const [w, h, r, nw, currentVw] = latest as number[];
        return buildNotchPath(w, h, r, nw, currentVw < 768);
    });
    const clipPathValue = useTransform(pathD, (d: any) => (d ? `path('${d}')` : "none"));

    return (
        <div ref={containerRef} className="relative" style={{ height: "250vh" }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col items-center justify-end">
                {/* Hero Content Background */}
                <div className="absolute inset-0 z-0">{children}</div>

                {/* Sizing / shadow container — NOT clipped, but uses drop-shadow so the shadow perfectly follows the inner clipped video shape */}
                <motion.div
                    style={{
                        width: widthPx,
                        height: heightPx,
                        marginBottom,
                        // drop-shadow follows the exact painted shape (including the notch cutout)
                        filter: "drop-shadow(0 0 40px rgba(0,0,0,0.8))",
                        willChange: "transform, width, height, filter"
                    }}
                    className="relative z-[100] isolate"
                >
                    {/* Clipped video layer — the notch is a true cutout, revealing the hero content behind it */}
                    <motion.div
                        className="absolute inset-0 bg-neutral-900 overflow-hidden cursor-none z-10"
                        style={{ clipPath: clipPathValue, WebkitClipPath: clipPathValue }}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={toggleMute}
                    >
                        {/* Aggressively preload the first video into the browser cache */}
                        <link rel="preload" as="video" href={videos[0]} fetchPriority="high" />
                        
                        {videos.map((src, index) => {
                            const isCurrent = index === currentVideoIndex;
                            const isNext = index === (currentVideoIndex + 1) % videos.length;
                            
                            return (
                                <motion.video
                                    key={src}
                                    ref={(el) => {
                                        videoRefs.current[index] = el;
                                    }}
                                    src={src}
                                    muted={isMuted}
                                    playsInline
                                    poster={index === 0 ? "/video-thumbnail.jpg" : undefined}
                                    preload={isCurrent ? "auto" : isNext ? "metadata" : "none"}
                                    {...({ fetchPriority: index === 0 ? "high" : "low" } as any)}
                                    onEnded={isCurrent ? handleVideoEnded : undefined}
                                    className="w-full h-full object-cover absolute inset-0"
                                    initial={false}
                                    animate={{
                                        opacity: isCurrent ? 1 : 0,
                                        scale: isCurrent ? 1 : 1.05,
                                        filter: isCurrent ? "blur(0px)" : "blur(10px)"
                                    }}
                                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                                />
                            );
                        })}

                        {/* Subtle white overlay for cinematic blending (from inverted-text.html) */}
                        <div className="absolute inset-0 bg-white mix-blend-overlay opacity-15 pointer-events-none z-0" />

                        {/* Inner Bottom Fade Overlay to blend the video while keeping text on top */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-full h-32 md:h-64 pointer-events-none z-[5]"
                            style={{
                                background: "linear-gradient(to bottom, transparent, black)",
                                opacity: fadeOpacity,
                            }}
                        />

                        {/* Title & Description Overlay */}
                        <motion.div
                            className="absolute bottom-10 left-6 md:bottom-16 md:left-16 max-w-[375px] md:max-w-4xl z-10 pointer-events-none"
                            style={{ opacity: textOverlayOpacity, y: textOverlayY }}
                        >
                            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-[1.3] md:leading-[1.2]">
                                <span className="mix-blend-difference block mb-4">
                                    Generative AI filmmaking
                                </span>
                            </h3>
                            <p className="text-base md:text-xl text-white font-light leading-relaxed mix-blend-difference max-w-3xl">
                                Transform your creative vision into reality with our state-of-the-art AI video services. <br /> We blend advanced machine learning with cinematic storytelling to produce stunning, high-fidelity visual narratives—scaling your production capabilities instantly.
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* 3D Perspective Marquee positioned exactly inside the transparent notch area on desktop, and as a floating pill on mobile */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center pointer-events-none overflow-hidden top-6 md:top-0 h-[60px] md:h-[80px] w-[240px] min-[375px]:w-[280px] md:w-[560px] rounded-full md:rounded-none md:rounded-b-[24px]">
                        <PerspectiveMarqueePlayer />
                    </div>

                    {/* Border traced along the exact same path — no seams, no separate corner divs */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none z-[4]"
                        style={{ overflow: "visible" }}
                    >
                        <motion.path d={pathD} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth={1} />
                    </svg>
                </motion.div>

                {/* Bottom Fade Overlay to blend smoothly into the next section */}
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-32 md:h-64 z-[5] pointer-events-none"
                    style={{
                        background: "linear-gradient(to bottom, transparent, black)",
                        opacity: fadeOpacity,
                    }}
                />
            </div>

            {/* Custom Cursor Overlay */}
            <AnimatePresence>
                {isHovering && (
                    <motion.div
                        className="fixed px-6 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex items-center justify-center text-black text-sm font-bold tracking-wide pointer-events-none z-[9999]"
                        style={{
                            left: cursorXSpring,
                            top: cursorYSpring,
                            x: "-50%",
                            y: "-50%",
                        }}
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 400,
                            mass: 0.6
                        }}
                    >
                        {isMuted ? "Unmute" : "Mute"}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
