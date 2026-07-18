"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {

    // Smooth scroll helper
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith("/#")) {
            const targetId = href.substring(2);
            // If we are already on the home page
            if (window.location.pathname === "/") {
                e.preventDefault();
                const elem = document.getElementById(targetId);
                if (elem) {
                    elem.scrollIntoView({ behavior: "smooth", block: "start" });
                    window.history.pushState(null, "", href);
                }
            }
        }
    };

    return (
        <footer className="w-full bg-[#050505] text-gray-400 pt-16 pb-8 font-sans">
            <div className="max-w-[1320px] mx-auto px-6 md:px-10">

                {/* --- MAIN CONTENT GRID --- */}
                <div className="flex flex-wrap justify-between mb-12 gap-y-10 lg:gap-x-12">

                    {/* 1. Company Info */}
                    <div className="w-full md:w-5/12 lg:w-4/12">
                        {/* UPDATED: Matches Navbar logo size (w-32 on mobile, w-40 on desktop) */}
                        <div className="relative w-32 h-8 md:w-40 md:h-8 mb-6">
                            <Image
                                src="/spotmies_banner.png"
                                alt="Spotmies Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-justify text-sm leading-relaxed opacity-70">
                            Spotmies is a technology-driven product studio that helps businesses plan, design, build, and deliver impactful digital products. We specialize in cutting-edge technologies like Blockchain, AI & ML, and modern web platforms, transforming ideas into scalable, real-world solutions with precision and purpose.
                        </p>
                    </div>

                    {/* 2. Useful Links */}
                    <div className="w-full md:w-auto">
                        <h2 className="text-white text-base font-bold mb-5 uppercase tracking-wider">Useful Links</h2>
                        <ul className="space-y-3 text-sm">
                            {['Home', 'About Us', 'Services', 'Blog', 'Careers'].map((item) => {
                                let href = "/";
                                if (item === "Home") href = "/#hero";
                                else if (item === "About Us") href = "/about";
                                else if (item === "Careers") href = "/careers";
                                else if (item === "Blog") href = "/blog";
                                else href = `/#${item.toLowerCase()}`;

                                return (
                                    <li key={item}>
                                        <Link
                                            href={href}
                                            onClick={(e) => href.startsWith("/#") ? handleScroll(e, href) : null}
                                            className="hover:text-[#00eef9] transition-colors"
                                        >
                                            {item}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* 3. More Links */}
                    <div className="w-full md:w-auto">
                        <h2 className="text-white text-base font-bold mb-5 uppercase tracking-wider">More</h2>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="/#faq" onClick={(e) => handleScroll(e, "/#faq")} className="hover:text-[#00eef9] transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="/#contact" onClick={(e) => handleScroll(e, "/#contact")} className="hover:text-[#00eef9] transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li><Link href="/privacy-policy" className="hover:text-[#00eef9] transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-[#00eef9] transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* 4. Recognized By */}
                    <div className="w-full md:w-auto">
                        <h2 className="text-white text-base font-bold mb-5 uppercase tracking-wider">Recognized By</h2>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_last image_startupindia.png"
                            alt="Recognized by Startup India"
                            className="w-[160px] grayscale hover:grayscale-0 transition-all duration-500 ease-in-out cursor-pointer opacity-70 hover:opacity-100"
                        />
                    </div>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 mt-4">
                    <div className="text-sm text-gray-600">
                        © 2026 Spotmies LLP. All Rights Reserved.
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <SocialIcon
                            label="Instagram"
                            href="https://www.instagram.com/spotmies"
                            path="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z"
                            viewBox="0 0 1024 1024"
                        />
                        <SocialIcon
                            label="LinkedIn"
                            href="https://www.linkedin.com/company/spotmies"
                            path="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
                            viewBox="0 0 448 512"
                        />
                        <SocialIcon
                            label="YouTube"
                            href="https://youtube.com/@spotmies"
                            path="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                            viewBox="0 0 576 512"
                        />
                        <SocialIcon
                            label="X"
                            href="https://twitter.com/spotmies"
                            path="M389.2 48h70.6L305.6 222.5 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM365.7 414.1h39.1L121.1 88.1h-42.1l286.7 326z"
                            viewBox="0 0 512 512"
                        />
                    </div>
                </div>

            </div>
        </footer>
    );
}

// Helper for Social Icons
function SocialIcon({ path, viewBox, label, href }: { path: string; viewBox: string; label: string, href?: string }) {
    return (
        <a
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-gray-500 hover:text-white transition-colors cursor-pointer transform hover:scale-110 duration-300"
        >
            <svg
                fill="currentColor"
                viewBox={viewBox}
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={path}></path>
            </svg>
        </a>
    );
}