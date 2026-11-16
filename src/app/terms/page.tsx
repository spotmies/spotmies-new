"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import BackButton from "@/components/ui/back-button";

export default function TermsAndConditions() {
    const phone = process.env.NEXT_PUBLIC_PRIVACY_NUMBER || "+91 94405 65539";

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
                            Terms & Conditions
                        </h1>
                        <p className="text-neutral-400 leading-relaxed text-lg">
                            These Terms and Conditions (“Terms”) govern your access to and use of the Spotmies (“we,” “our,” or “us”) website and the services we provide. By accessing our website or engaging our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, please do not use our website or services.
                        </p>
                    </div>

                    <Section title="Use of Our Website">
                        <p className="text-neutral-400 mb-4">When using our website, you agree to:</p>
                        <ListPoint title="1. Lawful Use">
                            Use the website only for lawful purposes and in a manner that does not infringe the rights of, or restrict the use of the website by, any third party.
                        </ListPoint>
                        <ListPoint title="2. No Misuse">
                            Not attempt to gain unauthorized access to our systems, introduce malicious code, or interfere with the proper functioning of the website.
                        </ListPoint>
                        <ListPoint title="3. Accurate Information">
                            Provide accurate and complete information when submitting forms, booking consultations, or otherwise contacting us.
                        </ListPoint>
                    </Section>

                    <Section title="Our Services">
                        <p className="text-neutral-400 leading-relaxed">
                            Spotmies provides software development, design, and related technology services. The specific scope, deliverables, timelines, and fees for any engagement will be defined in a separate proposal, statement of work, or agreement between you and Spotmies. In the event of any conflict between these Terms and such an agreement, the terms of the signed agreement will prevail.
                        </p>
                    </Section>

                    <Section title="Payments">
                        <ListPoint title="1. Fees">
                            Fees for our services are as agreed in the applicable proposal or agreement. Unless otherwise stated, all fees are exclusive of applicable taxes.
                        </ListPoint>
                        <ListPoint title="2. Invoicing">
                            Invoices are payable within the period specified in the agreement. We reserve the right to pause work on overdue accounts until payment is received.
                        </ListPoint>
                    </Section>

                    <Section title="Intellectual Property">
                        <ListPoint title="1. Website Content">
                            All content on this website, including text, graphics, logos, images, animations, and code, is the property of Spotmies or its licensors and is protected by applicable intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our prior written consent.
                        </ListPoint>
                        <ListPoint title="2. Client Deliverables">
                            Ownership of work created for clients is governed by the applicable agreement. Unless otherwise agreed, ownership of final deliverables transfers to the client upon full payment, while Spotmies retains ownership of its pre-existing tools, frameworks, and know-how.
                        </ListPoint>
                        <ListPoint title="3. Portfolio Use">
                            Unless otherwise agreed in writing, we may reference completed projects in our portfolio and marketing materials, excluding any confidential information.
                        </ListPoint>
                    </Section>

                    <Section title="Confidentiality">
                        <p className="text-neutral-400 leading-relaxed">
                            We treat all non-public information shared with us during an engagement as confidential and will not disclose it to third parties except as required to deliver our services or as required by law. Additional confidentiality obligations may be set out in a separate non-disclosure agreement.
                        </p>
                    </Section>

                    <Section title="Third-Party Links and Services">
                        <p className="text-neutral-400 leading-relaxed">
                            Our website may contain links to third-party websites or services, such as scheduling tools, that are not owned or controlled by Spotmies. We are not responsible for the content, policies, or practices of any third-party websites or services, and your use of them is at your own risk.
                        </p>
                    </Section>

                    <Section title="Disclaimer of Warranties">
                        <p className="text-neutral-400 leading-relaxed">
                            Our website and its content are provided on an “as is” and “as available” basis. While we strive to keep information accurate and up to date, we make no warranties or representations of any kind, express or implied, regarding the completeness, accuracy, reliability, or availability of the website or its content.
                        </p>
                    </Section>

                    <Section title="Limitation of Liability">
                        <p className="text-neutral-400 leading-relaxed">
                            To the fullest extent permitted by law, Spotmies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, data, or business opportunities, arising out of or related to your use of the website or our services. Our total liability for any claim relating to our services shall not exceed the amount paid by you to Spotmies for the services giving rise to the claim.
                        </p>
                    </Section>

                    <Section title="Privacy">
                        <p className="text-neutral-400 leading-relaxed">
                            Your use of our website is also governed by our{" "}
                            <Link href="/privacy-policy" className="text-[#00d3f3] hover:underline">
                                Privacy Policy
                            </Link>
                            , which explains how we collect, use, and protect your personal information.
                        </p>
                    </Section>

                    <Section title="Termination">
                        <p className="text-neutral-400 leading-relaxed">
                            We may suspend or restrict your access to our website at any time, without notice, if we believe you have violated these Terms. Termination of service engagements is governed by the applicable agreement.
                        </p>
                    </Section>

                    <Section title="Governing Law">
                        <p className="text-neutral-400 leading-relaxed">
                            These Terms are governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in India.
                        </p>
                    </Section>

                    <Section title="Changes to these Terms">
                        <p className="text-neutral-400 leading-relaxed">
                            We may revise these Terms from time to time. Any changes will be posted on this page, and your continued use of the website or services after such changes constitutes your acceptance of the revised Terms.
                        </p>
                    </Section>

                    <Section title="Contact Us">
                        <p className="text-neutral-400 leading-relaxed mb-4">
                            If you have any questions about these Terms and Conditions, please contact us at:
                        </p>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-2">
                            <a href="mailto:info@spotmies.com" className="text-[#00d3f3] hover:underline">info@spotmies.com</a>
                            <a href={`tel:${phone.replace(/\s+/g, "")}`} className="text-neutral-300 hover:text-white transition-colors">{phone}</a>
                            <a href="https://www.spotmies.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-white transition-colors">www.spotmies.com</a>
                        </div>
                        <p className="text-neutral-500 text-sm mt-6 italic">
                            By using our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{title}</h2>
        <div className="text-lg">{children}</div>
    </section>
);

const ListPoint = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-4 last:mb-0">
        <span className="block text-white font-semibold mb-1">{title}</span>
        <span className="text-neutral-400 leading-relaxed">{children}</span>
    </div>
);
