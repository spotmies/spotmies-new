"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BrainCircuit, Boxes, Smartphone, Cloud, Layers, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AmbientBackground } from "@/components/ui/ambient-background";

interface Step {
    title: string;
    // Expertise page the "Know more" button opens (/expertise/<slug>)
    slug: string;
    description: string;
    icon: React.ReactNode;
    colors: number[][];
    span: string;
    dotSize: number;
    speed: number;
    image: string;
    content: string;
}

const fadeUpVariant = {
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

export const TechStack = () => {
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedStep) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedStep]);

    // Leaving for a service page: drop the popup's scroll lock now, so the new page can start at the top
    const closeForNavigation = () => {
        document.body.style.overflow = "";
        setSelectedStep(null);
    };

    const steps: Step[] = [
        {
            title: "AI & Machine Learning",
            slug: "ai-machine-learning",
            description: "Production-ready AI products, engineered by a team that operates its own AI platforms.",
            icon: <BrainCircuit className="w-10 h-10 text-cyan-400" />,
            colors: [[0, 255, 255], [0, 200, 255]],
            span: "md:col-span-2",
            dotSize: 4,
            speed: 4,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-LfpfRdF2BugZEEpTgPQNhXOgbpJBMo.png&w=1000&q=75",
            content: `Production-ready AI products, engineered by a team that operates its own AI platforms. From first prototype to a live product, we build the AI, the product around it and the launch.\n\nEvery AI engagement starts the same way: proving the idea works on your data before you spend on the build. We identify the right AI opportunity, assess your data and validate the idea, and we tell you when a simpler approach wins.\n\nThen we build: data pipelines, trained or integrated models, the interface, and a way to measure answer quality. After launch we monitor real-world performance and keep improving the AI as your business grows.\n\nOur AI work includes automated interviews and screening with Reaidy.io, support agents trained on a company's own website with Workewhere, multilingual Gen-AI voice agents with Farm Vaidya, and early detection from images and sensor data with OROLEXA and SafeGuard Air.`,
        },
        {
            title: "Blockchain & Web3",
            slug: "blockchain-web3",
            description: "Blockchain and Web3 products, built with security at every step.",
            icon: <Boxes className="w-10 h-10 text-purple-400" />,
            colors: [[168, 85, 247], [192, 132, 252]],
            span: "md:col-span-1",
            dotSize: 3,
            speed: 4,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-2ojjAp7s2KeO3J9shvCPNH9nuhz3zi.png&w=1000&q=75",
            content: `Blockchain and Web3 products built with security at every step, from architecture and smart contracts to a live product.\n\nWe start by checking that a blockchain is the right tool for your idea, and which chain fits. Then we design the system architecture, smart contract structure and user experience together, and build decentralized applications, smart contracts and Web3 integrations with a focus on security and reliability.\n\nOur work includes Amero X, a non-custodial exchange with swaps, futures, copy trading and peer-to-peer trades; Cypher-B, which verifies academic records on-chain with gasless transactions for non-crypto users; and NFT collections such as Indie Skull Syndicate, minted on Ethereum.\n\nProducts we have built work with major wallets such as MetaMask, Phantom and WalletConnect, so your users can start with the wallet they already have.`,
        },
        {
            title: "Android & iOS Applications",
            slug: "android-ios-apps",
            description: "Mobile applications designed to be opened every day.",
            icon: <Smartphone className="w-10 h-10 text-emerald-400" />,
            colors: [[52, 211, 153], [110, 231, 183]],
            span: "md:col-span-1",
            dotSize: 3,
            speed: 3,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-AEQHfiKbM10ybAm0ZP6jzvu5hNwzEB.png&w=1000&q=75",
            content: `Mobile applications designed to be opened every day. One product team handles design, development, store launch on Google Play and the App Store, and ongoing updates.\n\nWe start with your goals and your audience, design the flows and screens for the moments people reach for their phone, then build responsive, secure apps with the backend behind them.\n\nOur apps work with real hardware: Vitals Care Pro streams vitals from a wearable and alerts caregivers, and OROLEXA pairs a smart toothbrush camera with AI analysis. We have also built route matching with live tracking for Commuter, instant TV-ad rewards for CGRUM, and one system for farmers, stores and customers for Nandikrushi.\n\nAfter launch, we keep your app updated as your users and the platforms change.`,
        },
        {
            title: "SaaS Platforms",
            slug: "saas-platforms",
            description: "SaaS products built for growth, backed by our own platforms in operation.",
            icon: <Cloud className="w-10 h-10 text-blue-400" />,
            colors: [[59, 130, 246], [96, 165, 250]],
            span: "md:col-span-1",
            dotSize: 3,
            speed: 3,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-b4opFtjTkc0AjPR6H9fuB42Qm0lnE4.png&w=1000&q=75",
            content: `SaaS products built for growth, backed by our own platforms in operation. Architecture, billing, onboarding and analytics, from MVP to paying customers.\n\nA custom web app or MVP typically takes 8 to 12 weeks, built in agile sprints. We start with the smallest product your first customers will pay for, then grow it with what your analytics show.\n\nWe run SaaS products of our own, including OpenPlan AI and Reaidy.io, so we plan for hosting, upkeep and support, not just the launch.\n\nPlatforms we have built include Workewhere, where businesses deploy chatbots trained on their own website data; EduMoon, serving over 15,000 engineering students from one admin panel; and a custom publishing panel with built-in analytics for Mobile Masala.`,
        },
        {
            title: "Product Design",
            slug: "product-design",
            description: "Design leadership for products that people adopt and keep using.",
            icon: <Layers className="w-10 h-10 text-orange-400" />,
            colors: [[249, 115, 22], [251, 146, 60]],
            span: "md:col-span-1",
            dotSize: 3,
            speed: 3,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-zKoxdD3l5QDuQDFQGP45fqO0EuaKqP.png&w=1000&q=75",
            content: `Design leadership for products that people adopt and keep using: user research, UX and interface design, built together with the engineers who ship it.\n\nWe understand your users, business goals and challenges, map user journeys into a focused design direction, and create intuitive interfaces, interactive prototypes and consistent design systems. Then we refine every detail with real user needs in mind.\n\nBecause design and build happen under one roof, there is no hand-off gap, and what launches matches the design. Our work includes fluid EV booking for Vihaan Electrix, conversation-first profiles for Boom Boom Talk, and a geometric art style for Mad Angles.`,
        },
    ];

    return (
        <section id="services" className="relative z-20 py-40 bg-black overflow-hidden">
            <AmbientBackground intensity="subtle" />

            {/* UPDATED: Changed max-w-7xl (1280px) to max-w-[1362px] and standardized padding */}
            <div className="relative z-10 max-w-[1362px] mx-auto px-6">
                <div className="mb-12 text-center">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUpVariant}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-4"
                    >
                        Our Expertise In
                    </motion.h2>
                    <motion.p
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUpVariant}
                        className="mt-4 text-neutral-300 max-w-2xl mx-auto text-lg"
                    >
                        We build with the latest and most robust technologies to deliver scalable digital solutions.
                    </motion.p>
                </div>

                {/* --- MOBILE VIEW: VERTICAL BENTO GRID --- */}
                <div className="grid grid-cols-1 gap-6 md:hidden">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={`mobile-grid-${idx}`}
                            className="col-span-1 cursor-pointer group/card h-full"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            onClick={() => setSelectedStep(step)}
                        >
                            <CardSpotlight
                                className="flex flex-col justify-between min-h-[18rem] rounded-[2rem] relative bg-neutral-900/50 border-white/5 overflow-hidden"
                                color={undefined}
                                canvasColors={step.colors}
                                canvasDotSize={step.dotSize}
                                canvasAnimationSpeed={step.speed}
                            >
                                <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                                    <div className="relative z-10 p-8 flex flex-col justify-between h-full">
                                        <div>
                                            <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit backdrop-blur-sm border border-white/10">
                                                {step.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-sm text-neutral-300 line-clamp-3">{step.description}</p>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-6 -right-6 z-0 pointer-events-none opacity-20">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={step.image} alt={step.title} className="w-40 h-auto object-contain grayscale brightness-75 contrast-125" />
                                    </div>
                                </div>
                            </CardSpotlight>
                        </motion.div>
                    ))}
                </div>

                {/* --- DESKTOP VIEW: GRID CARDS --- */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            className={`${step.span} cursor-pointer group/card`}
                            custom={idx + 2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUpVariant}
                            onClick={() => setSelectedStep(step)}
                        >
                            <CardSpotlight
                                className={`flex flex-col justify-between min-h-[20rem] md:min-h-[22rem] h-full rounded-[2rem] relative bg-neutral-900/50 border-white/5`}
                                color={undefined}
                                canvasColors={step.colors}
                                canvasDotSize={step.dotSize}
                                canvasAnimationSpeed={step.speed}
                            >
                                <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                                    <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                                        <div>
                                            <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit backdrop-blur-sm border border-white/10">
                                                {step.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-neutral-300">{step.description}</p>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-10 -right-10 z-0 pointer-events-none transition-opacity duration-300 group-hover/spotlight:opacity-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={step.image} alt={step.title} className="w-56 h-auto object-contain grayscale brightness-75 contrast-125 opacity-30 origin-bottom-right transition-all duration-300" />
                                    </div>
                                </div>
                                <div className="absolute -bottom-10 -right-10 z-20 pointer-events-none">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={step.image} alt={step.title} className="w-56 h-auto object-contain grayscale brightness-75 contrast-125 opacity-0 transition-all duration-300 ease-in-out origin-bottom-right group-hover/spotlight:opacity-100 group-hover/spotlight:grayscale-0 group-hover/spotlight:brightness-100 group-hover/spotlight:contrast-100 group-hover/spotlight:scale-50 group-hover/spotlight:-translate-x-10 group-hover/spotlight:-translate-y-10" />
                                </div>
                            </CardSpotlight>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- UPDATED MODERN MODAL --- */}
            {mounted && createPortal(
                <AnimatePresence>
                    {selectedStep && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/40 backdrop-blur-2xl p-0 md:p-6"
                            onClick={() => setSelectedStep(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                                animate={{ scale: 1, y: 0, opacity: 1 }}
                                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="relative w-full max-w-4xl h-full md:max-h-[85vh] flex flex-col bg-[#0a0a0a]/75 backdrop-blur-2xl border border-white/10 md:rounded-3xl shadow-[0_0_80px_rgba(0,0,0,0.6)] overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Floating Close Button */}
                                <div className="absolute top-0 right-0 z-50 p-6 pointer-events-none">
                                    <button
                                        onClick={() => setSelectedStep(null)}
                                        className="pointer-events-auto p-3 bg-black/50 hover:bg-white text-white hover:text-black rounded-full border border-white/10 transition-all duration-300 backdrop-blur-md group shadow-xl"
                                    >
                                        <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                    </button>
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 overflow-y-auto relative scrollbar-hide">
                                    <div className="max-w-3xl mx-auto pt-16 md:pt-20 pb-20 px-6 md:px-12">
                                        
                                        {/* Header */}
                                        <div className="flex flex-wrap items-center gap-6 mb-10 border-b border-white/10 pb-8">
                                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shrink-0 shadow-lg shadow-white/5">
                                                <div className="scale-125 origin-center">
                                                    {selectedStep.icon}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                                                    {selectedStep.title}
                                                </h3>
                                                <p className="text-neutral-400 text-lg font-light">
                                                    Expertise Overview
                                                </p>
                                            </div>
                                            {/* At the end of the header row, so it doesn't push the title out of line with the icon */}
                                            <Link
                                                href={`/expertise/${selectedStep.slug}`}
                                                onClick={closeForNavigation}
                                                className="group/more sm:ml-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors duration-300 hover:bg-[#00eef9]"
                                            >
                                                Know more
                                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/more:translate-x-0.5" />
                                            </Link>
                                        </div>

                                        {/* Body Text */}
                                        <div className="space-y-6">
                                            {selectedStep.content ? selectedStep.content.split('\n\n').map((paragraph, index) => (
                                                <p key={index} className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light text-justify">
                                                    {paragraph}
                                                </p>
                                            )) : <p className="text-neutral-500 italic">Content coming soon...</p>}
                                        </div>

                                        {/* Footer / CTA (Optional) */}
                                        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col items-center gap-5">
                                            <Link
                                                href={`/expertise/${selectedStep.slug}`}
                                                onClick={closeForNavigation}
                                                className="group/more inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition-colors duration-300 hover:bg-[#00eef9]"
                                            >
                                                Know more about {selectedStep.title}
                                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/more:translate-x-0.5" />
                                            </Link>
                                            <p className="text-neutral-500 text-sm">
                                                Want to build something like this? <a href="/contact" className="text-[#00eef9] hover:underline">Contact us</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};