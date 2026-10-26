"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Particle {
    // Home position (where the particle sits inside the "404" glyphs)
    hx: number;
    hy: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
}

interface Glitch {
    top: number;
    bottom: number;
    offset: number;
    ttl: number;
}

const CYAN = "0, 211, 243";
const REPEL_RADIUS = 110;
const SPRING = 0.055;
const FRICTION = 0.84;

// "404" rendered as a field of cyan particles. They assemble on load, scatter away from
// the cursor (or finger), spring back, and glitch every few seconds like a lost signal.
export function Particle404({ text = "404", className }: { text?: string; className?: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pointer = { x: -9999, y: -9999 };
        let particles: Particle[] = [];
        let glitch: Glitch | null = null;
        let width = 0;
        let height = 0;
        let frame = 0;
        let rafId = 0;
        let disposed = false;

        // Resolve the real family name behind next/font's CSS variable so the canvas matches the site type
        const fontFamily =
            getComputedStyle(document.body).getPropertyValue("--font-space-grotesk").trim() || "sans-serif";

        const build = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            if (!width || !height) return;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            // Draw the text once off-screen, then sample its pixels for particle home positions
            const sampler = document.createElement("canvas");
            sampler.width = width;
            sampler.height = height;
            const sctx = sampler.getContext("2d");
            if (!sctx) return;

            const fontSize = Math.min(height * 0.95, width * 0.4);
            sctx.font = `700 ${fontSize}px ${fontFamily}`;
            sctx.textAlign = "center";
            sctx.textBaseline = "middle";
            sctx.fillStyle = "#fff";
            sctx.fillText(text, width / 2, height / 2 + fontSize * 0.04);

            const data = sctx.getImageData(0, 0, width, height).data;
            const step = Math.max(4, Math.round(fontSize / 42));
            const next: Particle[] = [];

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    if (data[(y * width + x) * 4 + 3] < 128) continue;
                    next.push({
                        hx: x,
                        hy: y,
                        // Start scattered so the number assembles itself on first paint
                        x: reduceMotion ? x : Math.random() * width,
                        y: reduceMotion ? y : Math.random() * height,
                        vx: 0,
                        vy: 0,
                        size: step * (0.45 + Math.random() * 0.25),
                    });
                }
            }
            particles = next;
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            for (const p of particles) {
                const dx = p.x - p.hx;
                const dy = p.y - p.hy;
                // Particles pushed away from home glow brighter, settled ones sit in brand cyan
                const displaced = Math.min(Math.sqrt(dx * dx + dy * dy) / 60, 1);
                const shift = glitch && p.hy >= glitch.top && p.hy <= glitch.bottom ? glitch.offset : 0;

                ctx.fillStyle = displaced > 0.15
                    ? `rgba(255, 255, 255, ${0.55 + displaced * 0.45})`
                    : `rgba(${CYAN}, 0.9)`;
                ctx.fillRect(p.x + shift, p.y, p.size, p.size);
            }
        };

        const tick = () => {
            if (disposed) return;
            frame++;

            for (const p of particles) {
                const dx = p.x - pointer.x;
                const dy = p.y - pointer.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < REPEL_RADIUS * REPEL_RADIUS) {
                    const dist = Math.sqrt(distSq) || 1;
                    const force = (REPEL_RADIUS - dist) / REPEL_RADIUS;
                    p.vx += (dx / dist) * force * 6;
                    p.vy += (dy / dist) * force * 6;
                }

                p.vx = (p.vx + (p.hx - p.x) * SPRING) * FRICTION;
                p.vy = (p.vy + (p.hy - p.y) * SPRING) * FRICTION;
                p.x += p.vx;
                p.y += p.vy;
            }

            // Every few seconds, slice a horizontal band out of alignment for a few frames
            if (glitch) {
                glitch.ttl--;
                if (glitch.ttl <= 0) glitch = null;
            } else if (frame > 120 && Math.random() < 0.008) {
                const band = height * (0.06 + Math.random() * 0.12);
                const top = Math.random() * (height - band);
                glitch = {
                    top,
                    bottom: top + band,
                    offset: (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 18),
                    ttl: 6 + Math.floor(Math.random() * 8),
                };
            }

            draw();
            rafId = requestAnimationFrame(tick);
        };

        const onPointerMove = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer.x = e.clientX - rect.left;
            pointer.y = e.clientY - rect.top;
        };
        const onPointerLeave = () => {
            pointer.x = -9999;
            pointer.y = -9999;
        };

        const start = () => {
            if (disposed) return;
            build();
            if (reduceMotion) {
                draw();
                return;
            }
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(tick);
        };

        // Wait for web fonts so the sampled glyphs use Space Grotesk, not the fallback
        document.fonts.ready.then(start);

        const resizeObserver = new ResizeObserver(() => {
            build();
            if (reduceMotion) draw();
        });
        resizeObserver.observe(container);

        if (!reduceMotion) {
            window.addEventListener("pointermove", onPointerMove, { passive: true });
            document.addEventListener("pointerleave", onPointerLeave);
            window.addEventListener("pointerup", onPointerLeave);
        }

        return () => {
            disposed = true;
            cancelAnimationFrame(rafId);
            resizeObserver.disconnect();
            window.removeEventListener("pointermove", onPointerMove);
            document.removeEventListener("pointerleave", onPointerLeave);
            window.removeEventListener("pointerup", onPointerLeave);
        };
    }, [text]);

    return (
        <div ref={containerRef} className={cn("relative w-full", className)}>
            <canvas ref={canvasRef} className="absolute inset-0" role="img" aria-label={text} />
        </div>
    );
}
