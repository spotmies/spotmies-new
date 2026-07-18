"use client";

import React, { useRef } from "react";
import { MessageSquareQuote } from "lucide-react";
import { motion, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import { PixelAnimation } from "@/components/ui/pixel-animation";
import { cn } from "@/lib/utils";
import { Project } from "@/types/types";

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.1);
        y.set((clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            onClick={onClick}
            className={cn("relative group", className)}
        >
            {children}
        </motion.button>
    );
};

export function HeroSection({ projects }: { projects: Project[] }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const scheduleMeeting = () => {
        const calendlyLink = "https://calendly.com/spotmies/30min";
        window.open(calendlyLink, "_blank");
    };

    const handleGetQuote = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="hero" onMouseMove={handleMouseMove} className="relative w-full min-h-[100vh] flex flex-col justify-center items-center overflow-hidden bg-black text-white selection:bg-cyan-500/30">
            {/* Pixel Animation Layer */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
                <PixelAnimation
                    containerWidth="100%"
                    containerHeight="100%"
                    pixelGap={12}
                    maxPixelSize={5}
                    animationSpeed={0.4}
                    showHint={false}
                />
            </div>
            {/* LAYER 0: Ambient Color Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-cyan/20 rounded-full blur-[80px] md:blur-[100px] animate-blob-bounce mix-blend-screen" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-blue/20 rounded-full blur-[100px] md:blur-[120px] animate-blob-bounce animation-delay-2000 mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[20%] w-[400px] md:w-[600px] h-[300px] md:h-[500px] bg-brand-teal/15 rounded-full blur-[100px] md:blur-[120px] animate-blob-bounce animation-delay-4000 mix-blend-screen" />
            </div>

            {/* LAYER 1: Spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 opacity-50 transition duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(34, 211, 238, 0.1),
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* LAYER 2: Text Content */}
            <div className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center mb-8">

                {/* Headline Group */}
                <style dangerouslySetInnerHTML={{
                    __html: `
        .hero-text {
            font-size: clamp(44px, 9vw, 105px);
            font-weight: 400;
            letter-spacing: -0.04em;
            line-height: 0.85;
            z-index: 40;
            position: relative;
            text-align: center;
        }

        .hero-text .dark-gradient {
            background: linear-gradient(180deg, #6f6f6f 0%, #3d3d3d 100%);
            background-size: 100% 100%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            padding-bottom: 0.1em;
            margin-bottom: -0.1em;
        }

        .hero-text .light {
            color: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: clamp(8px, 2vw, 16px);
            margin-top: 5px;
            flex-wrap: wrap;
        }

        @keyframes drawOnSymbol {
            0% { clip-path: inset(100% -50% -50% -50%); transform: scale(0.9); }
            100% { clip-path: inset(-50% -50% -50% -50%); transform: scale(1); }
        }

        .icon-fingerprint {
            width: clamp(34px, 5.5vw, 68px);
            height: clamp(34px, 5.5vw, 68px);
            color: #00d3f3;
            overflow: visible;
            animation: drawOnSymbol 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            margin-top: 0.15em;
        }

        @keyframes variableColorWave {
            0%, 10% { opacity: 0.2; filter: drop-shadow(0 0 0 transparent); }
            40%, 60% { opacity: 1; filter: drop-shadow(0 0 12px #00d3f3); }
            90%, 100% { opacity: 0.2; filter: drop-shadow(0 0 0 transparent); }
        }

        .icon-fingerprint path {
            opacity: 0.2;
            animation: variableColorWave 2.5s infinite ease-in-out;
            animation-delay: 1.2s;
        }
        .icon-fingerprint path:nth-of-type(1) { animation-delay: calc(1.2s + 0.0s); }
        .icon-fingerprint path:nth-of-type(2) { animation-delay: calc(1.2s + 0.1s); }
        .icon-fingerprint path:nth-of-type(3) { animation-delay: calc(1.2s + 0.2s); }
        .icon-fingerprint path:nth-of-type(4) { animation-delay: calc(1.2s + 0.3s); }
        .icon-fingerprint path:nth-of-type(5) { animation-delay: calc(1.2s + 0.4s); }
        .icon-fingerprint path:nth-of-type(6) { animation-delay: calc(1.2s + 0.5s); }

        @keyframes floatAndGlow {
            0% { transform: translateY(4px) rotate(45deg) scale(0.95); }
            50% { transform: translateY(-8px) rotate(53deg) scale(1.05); }
            100% { transform: translateY(4px) rotate(45deg) scale(0.95); }
        }

        .icon-sparkle-container {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            animation: floatAndGlow 4s ease-in-out infinite;
            position: relative;
            width: clamp(40px, 6.5vw, 85px);
            height: clamp(40px, 6.5vw, 85px);
        }

        .sparkle-body {
            position: absolute;
            width: 95%;
            height: 95%;
            z-index: 1;
            overflow: visible;
            filter: drop-shadow(0 0 15px rgba(0, 211, 243, 0.6)) drop-shadow(0 0 30px rgba(0, 180, 216, 0.4));
        }

        .sparkle-core {
            position: absolute;
            width: 45%;
            height: 45%;
            z-index: 2;
            overflow: visible;
            filter: blur(2px) drop-shadow(0 0 10px #ffffff);
        }

        .particle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 14px;
            height: 14px;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 25 25' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12.2754 24.5215C12.7246 24.5215 13.0664 24.209 13.1348 23.7402C14.1797 15.0879 15.2539 13.9941 23.7305 13.125C24.1992 13.0762 24.541 12.7148 24.541 12.2656C24.541 11.8066 24.1992 11.4453 23.7305 11.4062C15.2539 10.5273 14.1797 9.44336 13.1348 0.791016C13.0664 0.3125 12.7246 0 12.2754 0C11.8359 0 11.4844 0.3125 11.4062 0.791016C10.3711 9.44336 9.28711 10.5273 0.820312 11.4062C0.341797 11.4453 0 11.8066 0 12.2656C0 12.7148 0.341797 13.0664 0.820312 13.125C9.26758 14.209 10.293 15.0781 11.4062 23.7402C11.4844 24.209 11.8359 24.5215 12.2754 24.5215Z' fill='%2300d3f3'/%3E%3C/svg%3E");
            background-size: contain;
            background-repeat: no-repeat;
            pointer-events: none;
            opacity: 0;
            z-index: 3;
            mix-blend-mode: screen;
        }

        @keyframes twinkle {
            0% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; filter: hue-rotate(var(--hue, 0deg)) brightness(1); }
            50% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(var(--s)); opacity: 1; filter: hue-rotate(var(--hue, 0deg)) brightness(1.5) drop-shadow(0 0 4px rgba(255, 255, 255, 0.8)); }
            100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(0); opacity: 0; filter: hue-rotate(var(--hue, 0deg)) brightness(1); }
        }

        .p1 { --tx: 0px; --ty: -18px; --s: 1.2; animation: twinkle 1.5s infinite ease-in-out 0.1s; }
        .p2 { --tx: 18px; --ty: 0px; --s: 0.9; animation: twinkle 2s infinite ease-in-out 0.5s; --hue: 35deg; }
        .p3 { --tx: -12px; --ty: -12px; --s: 0.7; animation: twinkle 1.8s infinite ease-in-out 0.2s; --hue: -20deg; }
        .p4 { --tx: 15px; --ty: 15px; --s: 1.1; animation: twinkle 1.6s infinite ease-in-out 0.7s; }
        .p5 { --tx: -15px; --ty: 15px; --s: 0.8; animation: twinkle 2.1s infinite ease-in-out 0.3s; --hue: 45deg; }
        .p6 { --tx: 25px; --ty: -10px; --s: 0.6; animation: twinkle 1.4s infinite ease-in-out 0.8s; }
        .p7 { --tx: -20px; --ty: 5px; --s: 1; animation: twinkle 1.9s infinite ease-in-out 0.4s; --hue: -40deg; }
        .p8 { --tx: 5px; --ty: 20px; --s: 0.9; animation: twinkle 1.7s infinite ease-in-out 0.9s; --hue: 20deg; }
        .p9 { --tx: -8px; --ty: 25px; --s: 0.7; animation: twinkle 2.2s infinite ease-in-out 0.6s; --hue: 15deg; }
        .p10 { --tx: 22px; --ty: 10px; --s: 0.8; animation: twinkle 1.5s infinite ease-in-out 0.2s; --hue: -10deg; }
                `}} />
                <h1 className="hero-text mb-4 md:mb-6 font-outfit font-normal">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-[0.9em]"
                    >
                        <div className="dark-gradient">The future</div>
                        <div className="dark-gradient">of development</div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="light"
                    >
                        <span className="dark-gradient">is</span>

                        <svg className="icon-fingerprint" viewBox="0 0 27.7298 26.9629">
                            <g>
                                <path
                                    d="M1.32586 17.6367C1.64813 17.5391 1.81414 17.207 1.71648 16.7969C1.39422 15.5664 1.2282 14.0918 1.27703 12.3828C1.2868 11.9824 1.05242 11.748 0.720391 11.7285C0.290704 11.6992 0.0563286 11.9727 0.0270317 12.3145C-0.0608589 13.7598 0.0563286 15.5176 0.515313 17.1582C0.622735 17.5586 0.974297 17.7441 1.32586 17.6367ZM0.827813 10.2148C1.15008 10.332 1.56023 10.2051 1.71648 9.77539C3.71844 4.05273 8.59148 1.25977 13.5134 1.25977C15.8376 1.25977 17.6247 1.76758 19.07 2.62695C19.4411 2.85156 19.8708 2.82227 20.027 2.46094C20.2028 2.07031 19.9977 1.81641 19.7145 1.64062C17.9274 0.498047 15.9841 0 13.5134 0C7.93719 0 2.76141 2.99805 0.505547 9.16016C0.300469 9.70703 0.505547 10.0879 0.827813 10.2148ZM26.7848 14.6582C27.1462 14.6582 27.4098 14.3652 27.3708 13.9746C26.8434 9.01367 25.1052 5.69336 22.2536 3.23242C21.9411 2.95898 21.5407 3.01758 21.3454 3.24219C21.1208 3.48633 21.1013 3.85742 21.4333 4.16016C23.9626 6.48438 25.7399 9.50195 26.1598 13.9941C26.1989 14.3652 26.4235 14.6582 26.7848 14.6582Z"
                                    fill="currentColor" />
                                <path
                                    d="M2.86883 21.2793C3.07391 21.582 3.50359 21.6504 3.81609 21.377C4.70477 20.6348 5.15398 19.4043 5.14422 18.1934C5.13445 16.4355 4.3825 15.5859 4.3825 13.3691C4.3825 8.48633 8.49383 4.375 13.3864 4.375C19.4216 4.375 23.2204 9.25781 23.2497 16.377C23.2497 19.082 22.82 21.0938 22.322 22.373C22.1657 22.7344 22.3122 23.1055 22.6052 23.2422C22.9079 23.3789 23.3376 23.2617 23.4743 22.8906C24.0016 21.4355 24.4899 19.248 24.4899 16.3672C24.4899 8.52539 20.1833 3.13477 13.3864 3.13477C7.81023 3.13477 3.14227 7.80273 3.14227 13.3691C3.14227 15.4492 3.91375 16.8555 3.93328 18.1836C3.93328 19.0332 3.60125 19.873 2.99578 20.4004C2.73211 20.625 2.68328 21.0156 2.86883 21.2793Z"
                                    fill="currentColor" />
                                <path
                                    d="M8.36688 16.9336C8.02508 16.0449 7.52703 14.8926 7.52703 13.5059C7.52703 10.0781 10.0954 7.50977 13.5134 7.50977C14.7731 7.50977 15.3395 7.69531 16.404 8.25195C16.7555 8.42773 17.0778 8.32031 17.2048 8.07617C17.3708 7.77344 17.3122 7.39258 16.902 7.14844C16.0231 6.61133 14.7634 6.25 13.5134 6.25C9.40203 6.25 6.26727 9.38477 6.26727 13.5059C6.26727 14.9512 6.66766 16.2402 7.14617 17.4121C7.31219 17.793 7.65398 17.959 8.03484 17.8027C8.36688 17.666 8.49383 17.3047 8.36688 16.9336Z"
                                    fill="currentColor" />
                                <path
                                    d="M5.71063 23.5938C6.63836 23.1152 7.90789 21.4941 8.24969 20.1758C8.33758 19.8438 8.18133 19.4824 7.83953 19.3652C7.51727 19.2676 7.18523 19.4434 7.06805 19.8145C6.72625 20.9863 6.06219 21.8359 5.14422 22.4707C4.74383 22.7441 4.695 23.1055 4.82195 23.3691C4.95867 23.6426 5.31023 23.7988 5.71063 23.5938ZM18.3278 9.90234C19.5388 11.6797 20.1345 14.1797 20.1345 17.0898C20.1345 20.1953 19.2848 23.1641 17.8981 24.9512C17.693 25.2246 17.654 25.6055 17.9079 25.8496C18.1716 26.1133 18.6305 26.1035 18.8649 25.8008C20.4079 23.7012 21.3747 20.4492 21.3747 17.0508C21.3747 13.457 20.5934 11.084 19.4313 9.24805C19.197 8.86719 18.8063 8.76953 18.4938 8.93555C18.1716 9.11133 18.0739 9.52148 18.3278 9.90234Z"
                                    fill="currentColor" />
                                <path
                                    d="M8.33758 25.2344C10.3591 23.6035 11.4821 21.0059 11.4626 18.1152C11.443 15.9375 10.6716 14.5801 10.6716 13.3496C10.6716 11.7285 11.8141 10.6445 13.4548 10.6445C15.945 10.6445 16.863 13.3691 16.9216 16.9336C17.0192 20.8887 15.5837 24.1602 13.7282 25.8105C13.4645 26.0449 13.4059 26.3965 13.5915 26.6602C13.7966 26.9629 14.236 27.0215 14.529 26.748C16.5114 24.9512 18.1227 21.084 18.1032 16.8555C18.0837 12.5488 16.8239 9.4043 13.4548 9.4043C11.1794 9.4043 9.44109 10.9375 9.44109 13.2422C9.44109 14.6289 10.193 16.3574 10.2028 18.1152C10.2223 20.6152 9.27508 22.8418 7.55633 24.248C7.24383 24.502 7.20477 24.8633 7.39031 25.1465C7.61492 25.459 8.02508 25.498 8.33758 25.2344Z"
                                    fill="currentColor" />
                                <path
                                    d="M11.2282 26.25C12.2243 25.5176 13.4059 23.9746 13.9528 22.2461C14.0309 21.9824 13.9723 21.5723 13.6208 21.4551C13.2497 21.3281 12.9177 21.5039 12.8102 21.8066C12.1462 23.5645 11.3259 24.5801 10.4665 25.2344C10.1833 25.459 10.0954 25.8398 10.2907 26.123C10.4763 26.4355 10.9059 26.4844 11.2282 26.25ZM14.6559 19.4238C15.027 17.7734 14.8708 15.5371 14.2263 13.7207C14.0798 13.291 13.7477 13.1348 13.4059 13.252C13.0739 13.3496 12.8884 13.6719 13.0055 14.0527C13.611 15.8203 13.7477 17.7148 13.4255 19.248C13.3571 19.5898 13.4938 19.9121 13.8747 19.9805C14.2458 20.0488 14.5778 19.834 14.6559 19.4238Z"
                                    fill="currentColor" />
                            </g>
                        </svg>
                        human +
                        <span className="icon-sparkle-container">
                            <svg className="sparkle-body" viewBox="0 0 24.9023 24.541">
                                <defs>
                                    <radialGradient id="volumetric-glow" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="25%" stopColor="#00d3f3" />
                                        <stop offset="60%" stopColor="#0077b6" />
                                        <stop offset="100%" stopColor="#023e8a" />
                                    </radialGradient>
                                </defs>
                                <path
                                    d="M12.2754 24.5215C12.7246 24.5215 13.0664 24.209 13.1348 23.7402C14.1797 15.0879 15.2539 13.9941 23.7305 13.125C24.1992 13.0762 24.541 12.7148 24.541 12.2656C24.541 11.8066 24.1992 11.4453 23.7305 11.4062C15.2539 10.5273 14.1797 9.44336 13.1348 0.791016C13.0664 0.3125 12.7246 0 12.2754 0C11.8359 0 11.4844 0.3125 11.4062 0.791016C10.3711 9.44336 9.28711 10.5273 0.820312 11.4062C0.341797 11.4453 0 11.8066 0 12.2656C0 12.7148 0.341797 13.0664 0.820312 13.125C9.26758 14.209 10.293 15.0781 11.4062 23.7402C11.4844 24.209 11.8359 24.5215 12.2754 24.5215Z"
                                    fill="url(#volumetric-glow)" />
                                <path
                                    d="M12.2754 24.5215C12.7246 24.5215 13.0664 24.209 13.1348 23.7402C14.1797 15.0879 15.2539 13.9941 23.7305 13.125C24.1992 13.0762 24.541 12.7148 24.541 12.2656C24.541 11.8066 24.1992 11.4453 23.7305 11.4062C15.2539 10.5273 14.1797 9.44336 13.1348 0.791016C13.0664 0.3125 12.7246 0 12.2754 0C11.8359 0 11.4844 0.3125 11.4062 0.791016C10.3711 9.44336 9.28711 10.5273 0.820312 11.4062C0.341797 11.4453 0 11.8066 0 12.2656C0 12.7148 0.341797 13.0664 0.820312 13.125C9.26758 14.209 10.293 15.0781 11.4062 23.7402C11.4844 24.209 11.8359 24.5215 12.2754 24.5215Z"
                                    fill="none" stroke="#00b4d8" strokeWidth="0.3" opacity="0.6" />
                            </svg>

                            <svg className="sparkle-core" viewBox="0 0 24.9023 24.541">
                                <path
                                    d="M12.2754 24.5215C12.7246 24.5215 13.0664 24.209 13.1348 23.7402C14.1797 15.0879 15.2539 13.9941 23.7305 13.125C24.1992 13.0762 24.541 12.7148 24.541 12.2656C24.541 11.8066 24.1992 11.4453 23.7305 11.4062C15.2539 10.5273 14.1797 9.44336 13.1348 0.791016C13.0664 0.3125 12.7246 0 12.2754 0C11.8359 0 11.4844 0.3125 11.4062 0.791016C10.3711 9.44336 9.28711 10.5273 0.820312 11.4062C0.341797 11.4453 0 11.8066 0 12.2656C0 12.7148 0.341797 13.0664 0.820312 13.125C9.26758 14.209 10.293 15.0781 11.4062 23.7402C11.4844 24.209 11.8359 24.5215 12.2754 24.5215Z"
                                    fill="#ffffff" />
                            </svg>

                            <span className="particle p1"></span>
                            <span className="particle p2"></span>
                            <span className="particle p3"></span>
                            <span className="particle p4"></span>
                            <span className="particle p5"></span>
                            <span className="particle p6"></span>
                            <span className="particle p7"></span>
                            <span className="particle p8"></span>
                            <span className="particle p9"></span>
                            <span className="particle p10"></span>
                        </span>

                        <span className="dark-gradient">AI</span>
                    </motion.div>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-sm sm:text-lg text-neutral-400 mb-8 md:mb-10 leading-relaxed max-w-xl font-light tracking-wide mx-auto mt-2 md:mt-3 font-outfit px-4"
                >
                    Professional services that deliver exceptional quality, reliability, and customer service to exceed your expectations.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex flex-row gap-3 w-full sm:w-auto items-center justify-center px-4"
                >
                    <MagneticButton
                        onClick={scheduleMeeting}
                        className="flex-1 sm:flex-none w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2.5 bg-white text-black rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.6)] overflow-hidden transition-shadow"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                            Schedule a call
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent z-0" />
                    </MagneticButton>

                    <MagneticButton
                        onClick={handleGetQuote}
                        className="flex-1 sm:flex-none w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2.5 text-white/90 rounded-full font-medium text-xs sm:text-sm tracking-wide border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all flex items-center justify-center gap-2 sm:gap-3"
                    >
                        <span className="whitespace-nowrap">Get Quote</span>
                        <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                            <MessageSquareQuote className="w-3 h-3" />
                        </div>
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Bottom Progressive Blur */}
            <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 md:h-32 z-40 backdrop-blur-[20px]"
                style={{
                    maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)"
                }}
            />
        </section>
    );
}