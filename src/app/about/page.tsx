"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { GlowDivider } from "@/components/ui/glow-divider";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { CheckCircle2, Heart, Lightbulb, Shield, Users, TrendingUp, ChevronLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import CountUp from "@/components/ui/count-up";
import { FoundersSection } from "@/components/landing/founders-section";
import BackButton from "@/components/ui/back-button";
import { cdn } from "@/lib/cdn";

// --- ANIMATION VARIANTS ---
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.1,
            ease: [0.22, 1, 0.36, 1] as const
        }
    })
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AboutPage() {
    const router = useRouter();

    return (
        <main className="bg-[#050505] min-h-screen w-full selection:bg-[#00d3f3]/30 overflow-x-hidden">
            <Navbar />

            {/* 1. HERO SECTION */}
            <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
                <AmbientBackground intensity="subtle" />

                {/* UPDATED: max-w-[1320px] */}
                <div className="max-w-[1320px] mx-auto text-center relative z-10">

                    {/* BACK BUTTON */}
                    <div className="absolute left-0 top-[-60px] md:-top-10 flex w-full justify-start pointer-events-auto">
                        <BackButton />
                    </div>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="flex flex-col items-center mt-8 md:mt-0"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold uppercase tracking-wider text-cyan-100 mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-[#00d3f3] animate-pulse" />
                            Established 2019
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-[5.5rem] font-outfit font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 pb-2">
                            We Are <br className="md:hidden" />
                            <span className="relative inline-block mx-2">
                                <PointerHighlight
                                    rectangleClassName="bg-[#00d3f3]/10 border-[#00d3f3]/30"
                                    pointerClassName="text-[#00d3f3]"
                                    highlightColor="#00d3f3"
                                >
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d3f3] to-blue-500 italic pr-2">Creative</span>
                                </PointerHighlight>
                            </span>
                            <br className="hidden md:block" />
                            Tech Company
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light mt-6">
                            Discover the limitless possibilities where technology meets creativity.
                            Our journey of innovation and progress is filled with exceptional outcomes.
                            Join us to explore and be a part of something extraordinary.
                        </motion.p>
                    </motion.div>

                    {/* STATS GRID */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-3 gap-2 md:gap-12 mt-20 max-w-4xl mx-auto"
                    >
                        {[
                            { val: 50, label: "Projects Completed", suffix: "+" },
                            { val: 5, label: "Blockchain Projects", suffix: "+" },
                            { val: 4, label: "AI Projects", suffix: "+" }
                        ].map((stat, idx) => (
                            <div key={idx} className="p-2 md:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors group flex flex-col items-center justify-center">
                                <h3 className="text-xl sm:text-2xl md:text-5xl font-bold text-white mb-1 md:mb-2 group-hover:text-[#00d3f3] transition-colors flex items-center justify-center">
                                    <CountUp to={stat.val} duration={2.5} />
                                    {stat.suffix}
                                </h3>
                                <p className="text-[9px] sm:text-xs md:text-base text-neutral-500 font-medium uppercase tracking-wider text-center leading-tight">
                                    {stat.label.replace(" ", "\n")}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {/* 2. MISSION SECTION */}
            <section className="py-24 px-6 relative">
                {/* UPDATED: max-w-[1320px] */}
                <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="sticky top-32"
                    >
                        <motion.span variants={fadeInUp} className="text-[#00d3f3] font-semibold tracking-wider uppercase text-sm mb-4 block">Our Mission</motion.span>

                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-outfit font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-8 leading-tight pb-1">
                            Making Quality Services <br />
                            <span className="text-neutral-500">Accessible to Everyone</span>
                        </motion.h2>

                        <motion.div variants={fadeInUp} className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 group mt-8">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#00d3f3]/20 to-purple-500/20 opacity-50 group-hover:opacity-70 transition-opacity" />
                            <Image
                                src="/about.png"
                                alt="Our Mission"
                                fill
                                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-6 text-lg text-neutral-400 font-light leading-relaxed pt-2"
                    >
                        <motion.p variants={fadeInUp}>
                            At our software development company, our mission is to make quality services accessible to everyone. We believe that quality of service is essential for building customer trust and loyalty, and we go above and beyond to consistently deliver exceptional service with attention to detail and open communication.
                        </motion.p>
                        <motion.p variants={fadeInUp}>
                            We understand that our client&apos;s success depends on our ability to deliver services that meet their needs and exceed their expectations. That&apos;s why we prioritize meeting customer needs in all aspects of our work. We work closely with our clients to understand their unique business needs and develop custom solutions that align with their goals and vision.
                        </motion.p>
                        <motion.p variants={fadeInUp}>
                            Our team is dedicated to providing exceptional service and support to our clients throughout the entire software development process, from ideation to launch and beyond. We believe in open communication and transparency, keeping our clients informed every step of the way.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="p-6 bg-white/5 border border-white/10 rounded-2xl mt-8">
                            <p className="text-white font-medium italic">
                                &quot;We strive to make our services accessible to everyone, regardless of their size or budget. We work with businesses of all sizes, from small startups to large corporations.&quot;
                            </p>
                        </motion.div>
                        <motion.p variants={fadeInUp}>
                            At our organization, we believe that our client&apos;s success is our success, and we are committed to building long-term relationships with each and every one of them.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* 3. FOUNDERS SECTION (Container width is handled inside the component) */}
            <FoundersSection />

            {/* 4. VALUES SECTION */}
            <section className="py-24 px-6 bg-white/[0.02]">
                {/* UPDATED: max-w-[1320px] */}
                <div className="max-w-[1320px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <motion.h2 className="text-3xl md:text-5xl font-outfit font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-4 pb-1">
                            Our Core Values
                        </motion.h2>
                        <p className="text-neutral-400">The principles that drive every decision we make.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Quality Driven", icon: <CheckCircle2 />, desc: "Quality is of the utmost importance. We ensure all products are built to last and meet the highest standards." },
                            { title: "Result Oriented", icon: <TrendingUp />, desc: "We are a result-driven team. Your success is our success, and we focus on delivering tangible outcomes." },
                            { title: "Customer Trust", icon: <Heart />, desc: "We prioritize meeting customer needs to build long-term relationships based on trust and loyalty." },
                            { title: "Transparency", icon: <Shield />, desc: "We believe in open communication, keeping you informed every step of the way." },
                            { title: "Innovation", icon: <Lightbulb />, desc: "We use cutting-edge technologies to create custom solutions that align with your unique vision." },
                            { title: "Collaboration", icon: <Users />, desc: "We work closely with you to ensure you are fully satisfied with the final product." },
                        ].map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 rounded-2xl bg-neutral-900/50 border border-white/5 hover:border-[#00d3f3]/30 hover:bg-neutral-900 transition-all group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#00d3f3]/10 flex items-center justify-center text-[#00d3f3] mb-6 group-hover:scale-110 transition-transform">
                                    {React.cloneElement(value.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-neutral-400 text-sm leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. TEAM SECTION */}
            <section className="py-24 px-6">
                {/* UPDATED: max-w-[1320px] */}
                <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row gap-16">
                    {/* Left: Text Content */}
                    <div className="w-full md:w-1/3 sticky top-32 h-fit">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <motion.div variants={fadeInUp} className="text-[#00d3f3] font-semibold tracking-wider uppercase mb-4 text-sm">
                                Our Team
                            </motion.div>

                            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-outfit font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 pb-1">
                                We Are A <br /> Result Driven Team
                            </motion.h2>

                            <motion.p variants={fadeInUp} className="text-neutral-400 mb-6 leading-relaxed">
                                At our software development company, we are a result-driven team that prioritizes quality in all aspects of our work. We take great pride in our work and are committed to delivering the best possible experience to our customers.
                            </motion.p>

                            <motion.button
                                variants={fadeInUp}
                                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
                                onClick={() => window.open("https://linkedin.com/company/spotmies", "_blank")}
                            >
                                Join our team
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right: Photo Grid */}
                    <div className="w-full md:w-2/3">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { src: cdn("old-data/spotmies_site_SeventhFolder_ourteam1.webp"), span: "col-span-1 row-span-1" },
                                { src: cdn("old-data/spotmies_site_SeventhFolder_ourteam3.webp"), span: "col-span-1 row-span-2" },
                                { src: cdn("old-data/spotmies_site_SeventhFolder_ourteam3.webp"), span: "col-span-1 row-span-1" },
                                { src: cdn("old-data/group.webp"), span: "col-span-1 row-span-1" },
                                { src: cdn("spotmiespublic/img.webp"), span: "col-span-1 row-span-1" },
                                { src: cdn("old-data/spotmies_site_SeventhFolder_ourteam3.webp"), span: "col-span-1 row-span-1" },
                                { src: cdn("spotmiespublic/img.webp"), span: "col-span-2 md:col-span-1 row-span-1" },
                            ].map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`relative rounded-2xl overflow-hidden bg-neutral-800 border border-white/5 group ${img.span} min-h-[200px]`}
                                >
                                    <Image
                                        src={img.src}
                                        alt="Team Member"
                                        fill
                                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}