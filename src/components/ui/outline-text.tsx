import React from "react";
import { cn } from "@/lib/utils";

// Large outlined display text with a top-to-bottom gradient fill.
//
// A plain -webkit-text-stroke on our variable font also outlines the overlapping contours inside glyphs, leaving
// stray lines (a star where the "2"'s diagonal meets its base). So the text is drawn twice: a stroked copy behind,
// and a filled copy on top that covers those inner lines and the inner half of the stroke, leaving a clean outer edge.
// The fill has to be opaque to cover them, so pass `from`/`to` already mixed against the background behind the text.
export function OutlineText({
    children,
    from,
    to,
    stroke = "rgba(255,255,255,0.2)",
    className,
}: {
    children: React.ReactNode;
    from: string;
    to: string;
    stroke?: string;
    className?: string;
}) {
    return (
        <span className={cn("relative inline-block", className)}>
            <span
                aria-hidden="true"
                className="absolute left-0 top-0"
                style={{ WebkitTextFillColor: "transparent", WebkitTextStroke: `2px ${stroke}` }}
            >
                {children}
            </span>
            <span
                className="relative"
                style={{
                    background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                {children}
            </span>
        </span>
    );
}
