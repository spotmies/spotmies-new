"use client";

import * as React from "react";
import { useCurrentFrame } from "remotion";
import { Player } from "@remotion/player";

export interface MarqueeItem {
  name: string;
  src: string;
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

const DEFAULT_ITEMS: MarqueeItem[] = [
  { name: "Zin in Thuiswerken", src: "https://spotmiesstorage.blob.core.windows.net/media/comp1.png" },
  { name: "A Square GoKarting", src: "https://spotmiesstorage.blob.core.windows.net/media/comp2.png" },
  { name: "SMARTFALCON", src: "https://spotmiesstorage.blob.core.windows.net/media/comp3.png" },
  { name: "Credit Report", src: "https://spotmiesstorage.blob.core.windows.net/media/comp4.png" },
  { name: "Andhra University Incubation Center", src: "https://spotmiesstorage.blob.core.windows.net/media/comp5.png" },
  { name: "Schemax Tech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp6.png" },
  { name: "Sweken IT Solutions", src: "https://spotmiesstorage.blob.core.windows.net/media/comp7.png" },
  { name: "Vihaan Electrix", src: "https://spotmiesstorage.blob.core.windows.net/media/comp8.png" },
  { name: "DecenTrialz", src: "https://spotmiesstorage.blob.core.windows.net/media/comp9.png" },
  { name: "ADVAIT LABS", src: "https://spotmiesstorage.blob.core.windows.net/media/comp10.png" },
  { name: "Chalo Ride", src: "https://spotmiesstorage.blob.core.windows.net/media/comp11.png" },
  { name: "Mr Bikes", src: "https://spotmiesstorage.blob.core.windows.net/media/comp12.png" },
  { name: "IOX Academy", src: "https://spotmiesstorage.blob.core.windows.net/media/comp13.png" },
  { name: "ID No Drafts", src: "https://spotmiesstorage.blob.core.windows.net/media/comp14.png" },
  { name: "CGRUM", src: "https://spotmiesstorage.blob.core.windows.net/media/comp15.png" },
  { name: "Nandikrushi", src: "https://spotmiesstorage.blob.core.windows.net/media/comp16.png" },
  { name: "HRDInc", src: "https://spotmiesstorage.blob.core.windows.net/media/comp17.png" },
  { name: "ADVON", src: "https://spotmiesstorage.blob.core.windows.net/media/comp18.png" },
  { name: "INDIESKULL-SYNDICATE", src: "https://spotmiesstorage.blob.core.windows.net/media/comp19.png" },
  { name: "My Body Qode", src: "https://spotmiesstorage.blob.core.windows.net/media/comp20.png" },
  { name: "SafeGuard air", src: "https://spotmiesstorage.blob.core.windows.net/media/comp21.png" },
  { name: "Orfus", src: "https://spotmiesstorage.blob.core.windows.net/media/comp22.png" },
  { name: "Vitals", src: "https://spotmiesstorage.blob.core.windows.net/media/comp23.png" },
  { name: "VarunMotors", src: "https://spotmiesstorage.blob.core.windows.net/media/comp24.png" },
  { name: "Reaidy", src: "https://www.reaidy.io/assets/logo_dark-DMRlJ8_-.png" },
  { name: "Awaken", src: "https://spotmiesstorage.blob.core.windows.net/media/awaken0.png" },
  { name: "Amero X", src: "https://spotmiesstorage.blob.core.windows.net/media/amero0.png" },
  { name: "BoomBoomTalk", src: "https://spotmiesstorage.blob.core.windows.net/media/boomboomtalk0.png" },
  { name: "Commuter", src: "https://spotmiesstorage.blob.core.windows.net/media/commuter0.png" },
  { name: "EduMoon", src: "https://spotmiesstorage.blob.core.windows.net/media/edumoon0.png" },
  { name: "Farm Vaidya", src: "https://spotmiesstorage.blob.core.windows.net/media/farmvidya0.png" },
  { name: "Mobile Masala", src: "https://spotmiesstorage.blob.core.windows.net/media/mobile-masala0.png" },
  { name: "OROLEXA", src: "https://spotmiesstorage.blob.core.windows.net/media/orelexa0.png" },
  { name: "TheReachX", src: "https://spotmiesstorage.blob.core.windows.net/media/reachx0.png" },
  { name: "Referral Bazaar", src: "https://spotmiesstorage.blob.core.windows.net/media/referalbazaar0.png" },
  { name: "Stoory", src: "https://spotmiesstorage.blob.core.windows.net/media/stoory0.png" },
  { name: "Teckybot", src: "https://spotmiesstorage.blob.core.windows.net/media/teckybot0.png" },
  { name: "WingDent", src: "https://spotmiesstorage.blob.core.windows.net/media/wingdent0.png" }
];

export function PerspectiveMarquee({
  items = DEFAULT_ITEMS,
  itemWidth = 180, // Approximate width per item including padding
  pixelsPerFrame = 2,
  fadeColor = "rgba(0,0,0,1)",
  background = "transparent",
  speed = 1,
  className,
}: PerspectiveMarqueeProps) {
  const frame = useCurrentFrame() * speed;

  const approxItemWidth = items.length * itemWidth;

  const offset = -((frame * pixelsPerFrame) % approxItemWidth);
  const rendered = [...items, ...items, ...items];

  return (
    <div
      className={className}
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            whiteSpace: "nowrap",
            transform: `translateX(${offset}px)`,
          }}
        >
          {rendered.map((item, i) => {
            // Apply depth-of-field blur based on horizontal position from center
            const itemCenter = i * itemWidth + itemWidth / 2 + offset;
            const norm = (itemCenter - 640) / 640;
            const distance = Math.min(1, Math.abs(norm));
            const blurPx = distance * 4; // Slight blur at the edges
            const opacity = Math.max(0.2, 1 - distance * 0.5);

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: itemWidth,
                  height: "100%",
                  paddingRight: 40,
                  filter: `blur(${blurPx}px)`,
                  opacity,
                  transform: "translateY(-16px)", // Visually shift logos up
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.name}
                  style={{
                    maxHeight: "120px", // Pushed to the absolute max height of the 80px notch
                    width: "auto",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                    opacity: 0.8
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `linear-gradient(90deg, ${fadeColor} 0%, transparent 15%, transparent 85%, ${fadeColor} 100%)`,
        }}
      />
    </div>
  );
}

export function PerspectiveMarqueePlayer(props: PerspectiveMarqueeProps & { isDark?: boolean }) {
  const isDark = props.isDark ?? true;

  const items = props.items ?? DEFAULT_ITEMS;
  const itemWidth = props.itemWidth ?? 350;
  const targetPixelsPerFrame = props.pixelsPerFrame ?? 1.5;

  const approxItemWidth = items.length * itemWidth;
  const durationInFrames = Math.max(1, Math.round(approxItemWidth / targetPixelsPerFrame));
  const actualPixelsPerFrame = approxItemWidth / durationInFrames;

  return (
    <div className="w-full h-full overflow-hidden flex items-center justify-center relative">
      <Player
        component={PerspectiveMarquee}
        inputProps={{
          items: items,
          pixelsPerFrame: actualPixelsPerFrame,
          background: props.background ?? "transparent",
          fadeColor: props.fadeColor ?? (isDark ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)"),
          itemWidth: itemWidth,
        }}
        durationInFrames={durationInFrames}
        fps={30}
        compositionWidth={1280}
        compositionHeight={160}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        controls={false}
        autoPlay
        loop
        clickToPlay={false}
        acknowledgeRemotionLicense={true}
      />
    </div>
  );
}
