"use client";

import React, { useRef } from "react";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    type MotionValue
} from "framer-motion";
import { Brain, Cuboid, Smartphone, Cloud, PenTool } from "lucide-react";
import { OutlineText } from "@/components/ui/outline-text";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- UTILS ---
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// --- PROPS ---
interface CardProps {
    index: number;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    image: string;
    number: string;
}

const Card3D = ({ index, title, description, icon: Icon, image, number }: CardProps) => {
    const ref = useRef<HTMLDivElement>(null);

    // 1. MOUSE TRACKING
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // 2. PHYSICS (THE "VISCOUS" FEEL)
    // We use a softer stiffness (100) and higher damping (20) to match the HTML's 'heavy' feel
    const springConfig = { damping: 20, stiffness: 100, mass: 1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    // 3. TRANSFORMATIONS (Exact mapping from HTML)
    // Rotation: Max 8 degrees (from HTML: "rotateX * 8")
    const rotateX = useTransform<number, string>(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform<number, string>(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

    // Parallax: Text Box (Moves slightly with mouse - 5px range)
    const textX = useTransform<number, string>(springX, [-0.5, 0.5], ["-5px", "5px"]);
    const textY = useTransform<number, string>(springY, [-0.5, 0.5], ["-5px", "5px"]);

    // Parallax: Number (Moves opposite - 25px range)
    const numX = useTransform<number, string>(springX, [-0.5, 0.5], ["-25px", "25px"]);
    const numY = useTransform<number, string>(springY, [-0.5, 0.5], ["-10px", "10px"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Normalized coordinates -0.5 to 0.5
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            // ENTRANCE ANIMATION: Matches "deepBlurSlide" (1.4s duration, specific bezier)
            initial={{ opacity: 0, y: 80, filter: "blur(20px) brightness(0.5) scale(0.9)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px) brightness(1) scale(1)" }}
            transition={{
                type: "tween",
                duration: 1.4,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] as const
            }}
            viewport={{ once: true, margin: "-50px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d", // CRITICAL: Enables true 3D nesting
                perspective: "1000px"
            }}
            className={cn(
                "relative flex flex-col w-full group isolate", // 'isolate' helps with stacking contexts
                index % 2 !== 0 ? "md:mt-24" : ""
            )}
        >
            {/* --- LAYER 0: THE BIG NUMBER (Deepest Z) --- */}
            <motion.div
                style={{
                    x: numX,
                    y: numY,
                    transform: "translateZ(-50px)" // Pushed back
                }}
                className="absolute -top-[90px] -right-[15px] z-0 pointer-events-none select-none transition-all duration-500 ease-out group-hover:opacity-100 opacity-90"
            >
                {/* White 40% to 5%, pre-mixed over the #050505 section */}
                <OutlineText from="#696969" to="#121212" stroke="rgba(255,255,255,0.25)" className="text-[9.5rem] font-bold leading-none font-sans tracking-tighter">
                    {number}
                </OutlineText>
            </motion.div>

            {/* --- LAYER 1: CARD CONTAINER (Middle Z) --- */}
            <div
                className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#111] border border-white/5 shadow-2xl transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                style={{ transform: "translateZ(0px)" }} // Base plane
            >
                {/* IMAGE LAYER */}
                <div className="absolute inset-0 w-full h-full bg-[#111]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[30%] contrast-110 group-hover:grayscale-0"
                    />
                </div>

                {/* --- LAYER 2: OBSIDIAN GLASS TEXT BOX (Highest Z) --- */}
                <motion.div
                    style={{
                        x: textX, // Independent Parallax X
                        y: textY, // Independent Parallax Y
                        transform: "translateZ(40px)" // Initial Z Lift
                    }}
                    className="absolute bottom-5 left-5 right-5 p-6 rounded-xl backdrop-blur-2xl transition-all duration-300 group-hover:translate-z-[70px] group-hover:-translate-y-1"
                >
                    {/* Glass Styles applied via class to allow hover state to override z-translate cleanly if needed */}
                    <div
                        className="absolute inset-0 rounded-xl bg-[rgba(15,15,15,0.65)] border border-white/10 border-t-white/20 border-b-black/40 shadow-[0_10px_40px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:bg-[rgba(30,30,30,0.75)] group-hover:border-white/30"
                    />

                    {/* Content inside Glass */}
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold font-sans text-white leading-tight tracking-tight drop-shadow-md">
                                {title}
                            </h3>

                            <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5 transition-all duration-300 group-hover:bg-white group-hover:rotate-[-45deg] group-hover:scale-110 shadow-[0_0_15px_rgba(255,255,255,0.0)] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]">
                                <Icon className="w-3.5 h-3.5 text-white/80 group-hover:text-black transition-colors duration-300" strokeWidth={2.5} />
                            </div>
                        </div>

                        <p className="text-sm text-white/60 font-medium leading-relaxed group-hover:text-white/95 transition-colors duration-300">
                            {description}
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export function ExpertiseSection() {
    const cards = [
        { title: "AI & Machine Learning", desc: "Realize your vision with our expert AI & ML product design services.", icon: Brain, image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1000&auto=format&fit=crop", num: "01" },
        { title: "Blockchain & Web3", desc: "Empower your business with the transformative potential of blockchain.", icon: Cuboid, image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop", num: "02" },
        { title: "Mobile Applications", desc: "Experience the future with our advanced neural network solutions.", icon: Smartphone, image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1000&auto=format&fit=crop", num: "03" },
        { title: "SaaS Platforms", desc: "Elevate your business with our cutting-edge SaaS solutions.", icon: Cloud, image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop", num: "04" },
        { title: "Product Design", desc: "Transform your ideas into reality with our expert design services.", icon: PenTool, image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop", num: "05" },
    ];

    return (
        <section className="relative w-full py-32 bg-[#050505] text-white overflow-hidden perspective-2500">

            {/* Background Ambience */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="relative max-w-7xl mx-auto px-6 mb-32 text-center z-10">
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-white/60 font-medium uppercase tracking-[0.2em] text-sm mb-4 block"
                >
                    Our Expertise In
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="text-4xl md:text-7xl font-sans font-bold text-white tracking-tight"
                >
                    Crafting Digital Excellence
                </motion.h2>
            </div>

            {/* Card Grid */}
            <div className="max-w-[1800px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12">
                    {cards.map((card, i) => (
                        <Card3D
                            key={i}
                            index={i}
                            title={card.title}
                            description={card.desc}
                            icon={card.icon}
                            image={card.image}
                            number={card.num}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}