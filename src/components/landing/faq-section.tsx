"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";

const DEFAULT_FAQS = [
    {
        question: "What services do you offer?",
        answer: "We provide end-to-end digital solutions including UI/UX design, full-stack web development, mobile app creation, and enterprise software. We specialize in building scalable, future-proof products using modern tech stacks."
    },
    {
        question: "What is your typical project timeline?",
        answer: "Timelines vary based on complexity. A standard marketing site typically takes 2-4 weeks, while a custom web application or MVP can range from 8-12 weeks. We work in agile sprints to ensure steady progress and transparency."
    },
    {
        question: "How do you handle pricing?",
        answer: "We offer flexible engagement models tailored to your needs. This includes fixed-price contracts for well-defined scopes and time-and-materials (hourly) for ongoing or evolving projects. Contact us for a custom quote."
    },
    {
        question: "Do you provide post-launch support?",
        answer: "Yes! We don't just launch and leave. We offer comprehensive maintenance packages that include server monitoring, security updates, bug fixes, and feature enhancements to keep your product running smoothly."
    },
    {
        question: "Can you work with our existing team?",
        answer: "Absolutely. We often collaborate with internal teams as an extension of your workforce. Whether you need specialized skills or extra hands on deck, we integrate seamlessly into your existing workflows."
    },
    {
        question: "Do you sign an NDA?",
        answer: "Yes, confidentiality is paramount. We are happy to sign a Non-Disclosure Agreement (NDA) before discussing any sensitive details of your project to ensure your intellectual property is safe."
    }
];

interface FaqSectionProps {
    faqs?: { question: string; answer: string }[];
    eyebrow?: string;
    title?: string;
    titleMuted?: string;
    intro?: string;
    ctaLabel?: string;
    // id of the section the button scrolls to
    ctaTarget?: string;
}

export const FaqSection = ({
    faqs = DEFAULT_FAQS,
    eyebrow = "Support",
    title = "Common",
    titleMuted = "questions.",
    intro = "Everything you need to know about our product and billing. Can’t find the answer you’re looking for?",
    ctaLabel = "Contact our team",
    ctaTarget = "contact",
}: FaqSectionProps = {}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Function to handle smooth scrolling
    const scrollToContact = () => {
        const contactSection = document.getElementById(ctaTarget);
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section className="relative w-full py-24 lg:py-32 bg-black text-white overflow-hidden" id="faq">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen opacity-30" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen opacity-30" />
            </div>

            <div className="relative z-10 max-w-[1362px] mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">

                    {/* LEFT COLUMN: Sticky Header */}
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-medium tracking-wider uppercase mb-6"
                            >
                                {eyebrow}
                            </motion.span>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-space tracking-tight leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                            >
                                {title} <br className="hidden lg:block" />
                                <span className="text-white/50">{titleMuted}</span>
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-lg text-neutral-400 leading-relaxed mb-8 max-w-md"
                            >
                                {intro}
                            </motion.p>

                            {/* Button with Scroll Handler */}
                            <motion.button
                                onClick={scrollToContact}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                className="flex items-center gap-3 px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-neutral-200 transition-colors group cursor-pointer"
                            >
                                <Mail className="w-4 h-4" />
                                <span>{ctaLabel}</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: FAQ List */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => setOpenIndex(isOpen ? null : index)}
                                    className={cn(
                                        "group cursor-pointer overflow-hidden relative transition-colors duration-500",
                                        "rounded-[24px] border border-white/[0.08]",
                                        isOpen
                                            ? "bg-[#161616]"
                                            : "bg-[#0A0A0A] hover:bg-[#121212]"
                                    )}
                                >
                                    <div className="flex items-start justify-between p-6 md:p-8 gap-4">
                                        <span className={cn(
                                            "text-lg md:text-xl font-medium tracking-tight transition-colors duration-300",
                                            isOpen ? "text-white" : "text-white/80 group-hover:text-white"
                                        )}>
                                            {faq.question}
                                        </span>

                                        <div className={cn(
                                            "relative flex items-center justify-center w-8 h-8 rounded-full border shrink-0 transition-all duration-500",
                                            isOpen
                                                ? "bg-white border-white"
                                                : "bg-transparent border-white/20 group-hover:border-white/50"
                                        )}>
                                            <motion.div
                                                animate={{ rotate: isOpen ? 135 : 0 }}
                                                transition={{ duration: 0.4, ease: "backOut" }}
                                                className="relative w-full h-full flex items-center justify-center"
                                            >
                                                <div className={cn(
                                                    "absolute w-3 h-[1.5px] rounded-full transition-colors duration-300",
                                                    isOpen ? "bg-black" : "bg-white"
                                                )} />
                                                <div className={cn(
                                                    "absolute h-3 w-[1.5px] rounded-full transition-colors duration-300",
                                                    isOpen ? "bg-black" : "bg-white"
                                                )} />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                                            >
                                                <div className="px-6 md:px-8 pb-8 pt-0">
                                                    <motion.p
                                                        initial={{ y: 10, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 0.7 }}
                                                        exit={{ y: 10, opacity: 0 }}
                                                        className="text-base md:text-lg leading-relaxed text-white font-light"
                                                    >
                                                        {faq.answer}
                                                    </motion.p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};