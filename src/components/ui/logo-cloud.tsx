"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

interface LogoCloudProps {
    logos: string[];
    className?: string;
}

export const LogoCloud = ({ logos, className }: LogoCloudProps) => {
    return (
        <div className={cn("relative w-full overflow-hidden py-10", className)}>
            {/* - duration: controls speed (lower = faster)
                - gap: controls space between items (replaces the old mx-8) 
            */}
            <InfiniteSlider duration={40} gap={60} pauseOnHover={true}>
                {logos.map((logo, idx) => (
                    <div
                        key={`${idx}`}
                        className="h-20 w-32 flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-110 px-4 group/logo"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={logo}
                            alt="client logo"
                            className="h-10 w-auto object-contain brightness-0 invert opacity-70 transition-all duration-300 group-hover/logo:brightness-100 group-hover/logo:invert-0 group-hover/logo:opacity-100"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                    </div>
                ))}
            </InfiniteSlider>

            {/* Left Fade */}
            <ProgressiveBlur
                className="pointer-events-none absolute left-0 top-0 h-full w-24"
                position="top"
                blurAmount="4px"
            />

            {/* Right Fade */}
            <ProgressiveBlur
                className="pointer-events-none absolute right-0 top-0 h-full w-24"
                position="top"
                blurAmount="4px"
            />
        </div>
    );
};