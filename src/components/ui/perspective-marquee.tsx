"use client";

import * as React from "react";
import { ALL_COMPANIES, LOGO_TONE_FILTER, type LogoTone } from "@/data/companies";

export interface MarqueeItem {
  name: string;
  src: string;
  tone?: LogoTone;
}

export interface PerspectiveMarqueeProps {
  items?: MarqueeItem[];
  itemWidth?: number;
  pixelsPerFrame?: number;
  fadeColor?: string;
  background?: string;
  speed?: number;
  className?: string;
}

// Every client logo, from the shared list so each keeps its own light-on-dark treatment
const DEFAULT_ITEMS: MarqueeItem[] = ALL_COMPANIES;

export function PerspectiveMarqueePlayer(props: PerspectiveMarqueeProps & { isDark?: boolean }) {
  const isDark = props.isDark ?? true;
  const items = props.items ?? DEFAULT_ITEMS;
  const itemWidth = props.itemWidth ?? 140;

  const fadeColor = props.fadeColor ?? (isDark ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)");
  const background = props.background ?? "transparent";

  // Calculate duration based on the number of items for a smooth standard speed.
  // We duplicate the items once, so 38 items * 2 = 76 items.
  const durationInSeconds = items.length * 3; // Approx 3 seconds per item width traversal

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center relative">
      <style suppressHydrationWarning>{`
        @keyframes perspective-marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .perspective-marquee-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: perspective-marquee-scroll ${durationInSeconds}s linear infinite;
        }
      `}</style>

      <div
        className={props.className}
        style={{
          position: "absolute",
          inset: 0,
          background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <div className="perspective-marquee-track">
            {/* Render items twice for infinite loop */}
            {[...items, ...items].map((item, i) => (
              <div
                key={i}
                className="w-[90px] md:w-[140px]"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  paddingRight: 8,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.name}
                  className="max-h-[24px] md:max-h-[36px]"
                  style={{
                    width: "auto",
                    objectFit: "contain",
                    filter: LOGO_TONE_FILTER[item.tone ?? "mono"],
                    opacity: 0.9
                  }}
                />
              </div>
            ))}
          </div>
        </div>



        {/* Fade Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 15%, transparent 85%, ${fadeColor} 100%)`,
          }}
        />
      </div>
    </div>
  );
}
