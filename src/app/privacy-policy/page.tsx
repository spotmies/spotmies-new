"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import BackButton from "@/components/ui/back-button";

export default function PrivacyPolicy() {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-[#00d3f3]/30">
            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00d3f3]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20">

                {/* Top Go Back Button */}
                <div className="mb-12">
                    <BackButton label="Go Back" />
                </div>

                {/* Content Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="space-y-12"
                >
                    {/* Header */}
                    <div className="border-b border-white/10 pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Privacy Policy
                        </h1>
                        <p className="text-neutral-400 leading-relaxed text-lg">
                            Spotmies ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information when you use our website or engage with our services. By accessing or using our website and services, you consent to the practices described in this Privacy Policy.
                        </p>
                    </div>

                    {/* Sections */}
                    <Section title="Information We Collect">
                        <ListPoint title="1. Personal Information">
                            We may collect personal information, such as your name, email address, phone number, and postal address, when you voluntarily provide it to us through forms, emails, or other means.
                        </ListPoint>
                        <ListPoint title="2. Usage Information">
                            We may collect non-personal information about how you interact with our website, including your IP address, browser type, operating system, referring URLs, and pages visited. We use this information for analytics and to improve our website's functionality.
                        </ListPoint>
                    </Section>

                    <Section title="How We Use Your Information">
                        <p className="text-neutral-400 mb-4">We may use your personal and non-personal information for the following purposes:</p>
                        <ListPoint title="1. Communication">
                            To respond to your inquiries, provide information, and communicate with you about our services.
                        </ListPoint>
                        <ListPoint title="2. Service Improvement">
                            To analyze user preferences and behavior to enhance our website and services.
                        </ListPoint>
                        <ListPoint title="3. Marketing">
                            To send you updates, newsletters, and promotional materials about our services. You can opt out of these communications at any time.
                        </ListPoint>
                        <ListPoint title="4. Legal Compliance">
                            To comply with applicable laws, regulations, or legal processes.
                        </ListPoint>
                    </Section>

                    <Section title="Information Sharing">
                        <p className="text-neutral-400 leading-relaxed">
                            We do not sell, rent, or trade your personal information to third parties. However, we may share your information with trusted service providers who assist us in operating our website and delivering our services. These service providers are contractually obligated to protect your information. We may also disclose your information if required by law or in response to valid legal requests, such as a court order or government investigation.
                        </p>
                    </Section>

                    <Section title="Data Security">
                        <p className="text-neutral-400 leading-relaxed">
                            We employ reasonable administrative, technical, and physical safeguards to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.
                        </p>
                    </Section>

                    <Section title="Your Choices">
                        <ListPoint title="1. Access">
                            You can request access to your personal information and ask for it to be corrected, updated, or deleted.
                        </ListPoint>
                        <ListPoint title="2. Opt-out">
                            You can opt out of receiving marketing communications from us.
                        </ListPoint>
                        <ListPoint title="3. Cookies">
                            You can manage your cookie preferences through your browser settings.
                        </ListPoint>
                    </Section>

                    <Section title="Children's Privacy">
                        <p className="text-neutral-400 leading-relaxed">
                            Spotmies welcomes users of all ages, including children, to access and use our services. We are committed to providing a safe and enjoyable online environment for children, and we do not knowingly collect personal information from children under the age of 13. Our services are designed to be child-friendly, and we take steps to ensure that children can use our website without encountering any issues.
                        </p>
                    </Section>

                    <Section title="Changes to this Privacy Policy">
                        <p className="text-neutral-400 leading-relaxed">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting a notice on our website or by other means.
                        </p>
                    </Section>

                    <Section title="Contact Us">
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            If you have any questions, concerns, or requests regarding this Privacy Policy or the way we handle your personal information, please contact us at:
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
                            <a href="mailto:info@spotmies.com" className="text-[#00d3f3] hover:underline">info@spotmies.com</a>
                            <a href={`tel:${(process.env.NEXT_PUBLIC_PRIVACY_NUMBER || "+91 7416498484").replace(/\s+/g, '')}`} className="text-neutral-300 hover:text-white transition-colors">{process.env.NEXT_PUBLIC_PRIVACY_NUMBER || "+91 8341980196"}</a>
                            <a href="https://www.spotmies.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">www.spotmies.com</a>
                        </div>
                        <p className="text-neutral-500 text-sm mt-6 italic">
                            By using our website and services, you agree to this Privacy Policy. If you do not agree with our practices, please do not use our website or services.
                        </p>
                    </Section>
                </motion.div>

                {/* Bottom Go Back Button */}
                <div className="mt-20 pt-10 border-t border-white/10 flex justify-center">
                    <BackButton label="Go Back" />
                </div>
            </main>
        </div>
    );
}

// Helper Components for cleaner code
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        <div className="text-lg">{children}</div>
    </section>
);

const ListPoint = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-4 last:mb-0">
        <span className="block text-white font-semibold mb-1">{title}</span>
        <span className="text-neutral-400 leading-relaxed">{children}</span>
    </div>
);