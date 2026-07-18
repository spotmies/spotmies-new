"use client";

import * as React from "react";

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
  { name: "Reaidy", src: "https://www.reaidy.io/assets/logo_dark-DMRlJ8_-.png" },
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: itemWidth,
                  height: "100%",
                  paddingRight: 16,
                  transform: "translateY(-7px)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.name}
                  style={{
                    maxHeight: "36px",
                    width: "auto",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
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
