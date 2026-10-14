"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { AsciiShape } from "@/data/expertise";
import { LINE, SHAPE_INFO, SURFACE, buildShape, seeded, sphereDir } from "@/components/expertise/ascii-shapes";

// Surface shading ramp, dark to lit (the classic spinning-donut ramp)
const SHADES = ".,-~:;=!*#$@";
const MORPH_MS = 2400;
const HOLD_MS = 4500;
// Share of the morph each particle may wait before leaving, so the shape dissolves instead of moving as one block
const MAX_DELAY = 0.2;
// Clickable area around the resting shape, in multiples of its scale (shapes span roughly -1..1)
const HIT_RADIUS = 1.25;
// Cursor pushes nearby particles aside: how far it reaches, in pixels, and what share of that gap it opens
const REPEL_RADIUS = 80;
const REPEL_STRENGTH = 0.3;
// Clicks on these keep their own behaviour instead of switching the shape
const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";
// Light direction in camera space: from the upper left, toward the viewer
const LIGHT = (() => {
    const v = [-0.4, 0.6, -0.7];
    const m = Math.hypot(v[0], v[1], v[2]);
    return v.map((c) => c / m);
})();

// Tooltip size and its gap from the cursor, in pixels
const TIP_WIDTH = 288;
const TIP_OFFSET = 18;
// Share of a morph after which the tooltip switches to the new shape: about when the new shape becomes recognisable
const TIP_SWAP_AT = 0.55;

// Sine ease: softer start and finish than a cubic, so the hand-off between shapes never snaps
const easeInOut = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

// Picks the ASCII stroke that best matches a direction on screen (y pointing down)
function lineChar(sx: number, sy: number) {
    if (Math.hypot(sx, sy) < 0.35) return ".";
    const a = ((Math.atan2(sy, sx) % Math.PI) + Math.PI) % Math.PI;
    if (a < Math.PI / 8 || a >= (7 * Math.PI) / 8) return "-";
    if (a < (3 * Math.PI) / 8) return "\\";
    if (a < (5 * Math.PI) / 8) return "|";
    return "/";
}

// --- COMPONENT ------------------------------------------------------------

// Fills its parent. The shape rests at an anchor point (right of centre on wide screens, a dimmed off-centre backdrop on narrow ones),
// and the canvas spans its whole parent so particles pushed by the cursor are never clipped. Clicking the shape morphs to the next one.
export function AsciiMorph({ shapes, className }: { shapes: AsciiShape[]; className?: string }) {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const tipRef = useRef<HTMLDivElement>(null);
    const tipNameRef = useRef<HTMLSpanElement>(null);
    const tipAboutRef = useRef<HTMLSpanElement>(null);
    const tipInfoRef = useRef<HTMLSpanElement>(null);
    const tipCardRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const isSmall = window.innerWidth < 768;
        const N = isSmall ? 3500 : 7000;
        const targets = shapes.map((s, i) => buildShape(s, N, 1234 + i * 97));
        const first = targets[0];
        const pos = Float32Array.from(first.pos);
        const vec = Float32Array.from(first.vec);
        const kind = Uint8Array.from(first.kind);
        const accent = Uint8Array.from(first.accent);
        const tone = Float32Array.from(first.tone);
        const fromPos = new Float32Array(N * 3);
        const fromVec = new Float32Array(N * 3);
        const fromKind = new Uint8Array(N);
        const fromAccent = new Uint8Array(N);
        const fromTone = new Float32Array(N);
        const r = seeded(42);
        const delays = Float32Array.from({ length: N }, () => r() * MAX_DELAY);
        // Each particle's own gentle drift between shapes: a random direction, at most about a third of the shape's size
        const scatter = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
            const [dx, dy, dz] = sphereDir(r);
            const reach = 0.08 + 0.27 * r();
            scatter.set([dx * reach, dy * reach, dz * reach], i * 3);
        }

        let current = 0;
        let morphStart = -1;

        // Tooltip naming the shape under the cursor; written directly to the DOM so hovering never re-renders
        const tip = tipRef.current;
        // Follows the shape on screen, not the morph target: while a morph runs the old text dims, and the new
        // text fades in once the new shape has mostly formed
        let shownInfo = -1;
        const showInfo = (i: number) => {
            shownInfo = i;
            const info = SHAPE_INFO[shapes[i]];
            if (tipNameRef.current) tipNameRef.current.textContent = info.name;
            if (tipAboutRef.current) tipAboutRef.current.textContent = info.about;
            if (tipInfoRef.current) tipInfoRef.current.style.opacity = "1";
        };
        const dimInfo = () => {
            if (tipInfoRef.current) tipInfoRef.current.style.opacity = "0.3";
        };
        showInfo(0);
        let lastSettled = performance.now();

        // Character grid
        const fontSize = isSmall ? 9 : 10;
        const cellW = fontSize * 0.62;
        const cellH = fontSize * 1.15;
        let width = 0, height = 0, cols = 0, rows = 0;
        // Where the shape rests on the canvas and how big it is, in pixels
        let anchorX = 0, anchorY = 0, shapeScale = 0;
        // Overall brightness; lowered on narrow screens where the field sits behind the text
        let fade = 1;
        let zbuf = new Float32Array(0);
        let glyph: string[] = [];
        let shade = new Float32Array(0);
        let cyan = new Uint8Array(0);
        // Cells grouped by colour and brightness so fillStyle changes stay few
        const BANDS = 8;
        const buckets: number[][] = Array.from({ length: BANDS * 2 }, () => []);

        const resize = () => {
            const rect = wrap.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
            ctx.textBaseline = "top";
            cols = Math.floor(width / cellW);
            rows = Math.floor(height / cellH);
            zbuf = new Float32Array(cols * rows);
            glyph = new Array(cols * rows);
            shade = new Float32Array(cols * rows);
            cyan = new Uint8Array(cols * rows);
            if (width >= 1024) {
                anchorX = Math.min(width * 0.74, width / 2 + 400);
                anchorY = height * 0.5;
                shapeScale = Math.min(width * 0.42, height * 0.8) * 0.42;
                fade = 1;
            } else {
                // Behind the text as a backdrop: pushed right and partly off-screen, larger, and dimmed
                anchorX = width * 0.72;
                anchorY = height * 0.42;
                shapeScale = Math.min(width * 1.15, height * 0.62) * 0.42;
                fade = 0.4;
            }
        };

        // Cursor anywhere over the canvas: its offset from the shape tilts the camera, and nearby particles get pushed away.
        // Tracked on the window because the canvas sits underneath the page content and never receives pointer events.
        const mouse = { x: 0, y: 0, tx: 0, ty: 0, px: -9999, py: -9999, inside: false };
        // The same window-level tracking decides clicks: a press over the shape (not on a link or button) switches it,
        // and the pointer cursor shows while hovering it.
        const overShape = (e: MouseEvent) => {
            if (e.target instanceof Element && e.target.closest(INTERACTIVE)) return false;
            const rect = wrap.getBoundingClientRect();
            return Math.hypot(e.clientX - rect.left - anchorX, e.clientY - rect.top - anchorY) < shapeScale * HIT_RADIUS;
        };
        let hovering = false;
        const setHovering = (on: boolean) => {
            if (on === hovering) return;
            hovering = on;
            document.documentElement.style.cursor = on ? "pointer" : "";
            const card = tipCardRef.current;
            if (card) {
                card.style.opacity = on ? "1" : "0";
                card.style.transform = on ? "translateY(0) scale(1)" : "translateY(6px) scale(0.96)";
            }
            // Appear right at the cursor rather than gliding in from wherever it was last hidden
            if (on) tipPos.snap = true;
        };
        // Beside the cursor, flipped to its left near the right edge so it never runs off the hero.
        // The draw loop eases it toward this spot, so it trails the cursor slightly instead of jittering with it.
        const tipPos = { x: 0, y: 0, tx: 0, ty: 0, snap: true };
        const applyTip = () => {
            if (tip) tip.style.transform = `translate(${tipPos.x}px, ${tipPos.y}px)`;
        };
        const placeTip = () => {
            if (!tip) return;
            const flip = mouse.px + TIP_OFFSET + TIP_WIDTH > width;
            const x = flip ? mouse.px - TIP_OFFSET - TIP_WIDTH : mouse.px + TIP_OFFSET;
            tipPos.tx = Math.max(8, x);
            tipPos.ty = mouse.py + TIP_OFFSET;
            if (tipPos.snap || reduceMotion) {
                tipPos.x = tipPos.tx;
                tipPos.y = tipPos.ty;
                tipPos.snap = false;
                applyTip();
            }
        };
        const onMove = (e: PointerEvent) => {
            const rect = wrap.getBoundingClientRect();
            mouse.px = e.clientX - rect.left;
            mouse.py = e.clientY - rect.top;
            mouse.inside = mouse.px >= 0 && mouse.py >= 0 && mouse.px <= rect.width && mouse.py <= rect.height;
            if (mouse.inside) {
                mouse.tx = Math.max(-1, Math.min(1, (mouse.px - anchorX) / (rect.width / 2)));
                mouse.ty = Math.max(-1, Math.min(1, (mouse.py - anchorY) / (rect.height / 2)));
            } else {
                mouse.tx = 0;
                mouse.ty = 0;
            }
            setHovering(mouse.inside && overShape(e));
            if (hovering) placeTip();
        };
        const onLeave = () => {
            mouse.inside = false;
            mouse.tx = 0;
            mouse.ty = 0;
            setHovering(false);
        };
        const onClick = (e: MouseEvent) => {
            if (overShape(e)) morphTo((current + 1) % targets.length);
        };

        const draw = (now: number) => {
            // Advance the morph
            if (morphStart >= 0) {
                const p = (now - morphStart) / MORPH_MS;
                if (p >= TIP_SWAP_AT && shownInfo !== current) showInfo(current);
                const to = targets[current];
                for (let i = 0; i < N; i++) {
                    const local = Math.min(1, Math.max(0, (p - delays[i]) / (1 - MAX_DELAY)));
                    const e = easeInOut(local);
                    // Mid-flight each particle drifts a little along its own path, then lands in the new shape
                    const flight = Math.sin(Math.PI * e);
                    for (let k = 0; k < 3; k++) {
                        const idx = i * 3 + k;
                        pos[idx] = fromPos[idx] + (to.pos[idx] - fromPos[idx]) * e + scatter[idx] * flight;
                        vec[idx] = fromVec[idx] + (to.vec[idx] - fromVec[idx]) * e;
                    }
                    const late = e > 0.5;
                    kind[i] = late ? to.kind[i] : fromKind[i];
                    accent[i] = late ? to.accent[i] : fromAccent[i];
                    tone[i] = fromTone[i] + (to.tone[i] - fromTone[i]) * e;
                }
                if (p >= 1) {
                    morphStart = -1;
                    lastSettled = now;
                }
            } else if (!reduceMotion && now - lastSettled > HOLD_MS) {
                morphTo((current + 1) % targets.length);
            }

            if (hovering && (Math.abs(tipPos.tx - tipPos.x) > 0.1 || Math.abs(tipPos.ty - tipPos.y) > 0.1)) {
                tipPos.x += (tipPos.tx - tipPos.x) * 0.22;
                tipPos.y += (tipPos.ty - tipPos.y) * 0.22;
                applyTip();
            }

            // Camera
            mouse.x += (mouse.tx - mouse.x) * 0.05;
            mouse.y += (mouse.ty - mouse.y) * 0.05;
            const yaw = (reduceMotion ? 0.6 : now * 0.00016) + mouse.x * 0.6;
            const pitch = 0.3 + mouse.y * 0.35;
            const cyw = Math.cos(yaw), syw = Math.sin(yaw), cp = Math.cos(pitch), sp = Math.sin(pitch);
            const scale = shapeScale;
            const cx = anchorX, cyScreen = anchorY;
            const D = 3.2;

            zbuf.fill(Infinity);
            for (let i = 0; i < N; i++) {
                const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
                const x1 = x * cyw - z * syw;
                const z1 = x * syw + z * cyw;
                const y2 = y * cp - z1 * sp;
                const z2 = y * sp + z1 * cp;
                const persp = D / (D + z2);
                let sx = cx + x1 * scale * persp;
                let sy = cyScreen - y2 * scale * persp;
                if (mouse.inside) {
                    const dx = sx - mouse.px, dy = sy - mouse.py;
                    const d = Math.hypot(dx, dy);
                    if (d < REPEL_RADIUS && d > 0.01) {
                        const push = (REPEL_RADIUS - d) * REPEL_STRENGTH;
                        sx += (dx / d) * push;
                        sy += (dy / d) * push;
                    }
                }
                const col = (sx / cellW) | 0;
                const row = (sy / cellH) | 0;
                if (col < 0 || row < 0 || col >= cols || row >= rows) continue;
                const c = row * cols + col;
                // Depth test: only the nearest point in each cell is drawn, so the back of a shape never shows through
                if (z2 >= zbuf[c]) continue;
                zbuf[c] = z2;

                // Rotate the point's normal or direction the same way as the point
                const vx = vec[i * 3], vy = vec[i * 3 + 1], vz = vec[i * 3 + 2];
                const vx1 = vx * cyw - vz * syw;
                const vz1 = vx * syw + vz * cyw;
                const vy2 = vy * cp - vz1 * sp;
                const vz2 = vy * sp + vz1 * cp;
                // Farther points fade a little, for depth
                const fog = 0.55 + 0.45 * Math.min(1, Math.max(0, (1.3 - z2) / 2.6));

                if (kind[i] === SURFACE) {
                    const m = Math.hypot(vx1, vy2, vz2) || 1;
                    const lit = Math.max(0, (vx1 * LIGHT[0] + vy2 * LIGHT[1] + vz2 * LIGHT[2]) / m);
                    const lum = (0.12 + 0.88 * lit) * tone[i];
                    glyph[c] = SHADES[Math.min(SHADES.length - 1, Math.floor(lum * SHADES.length))];
                    shade[c] = (0.25 + 0.75 * lum) * fog;
                } else if (kind[i] === LINE) {
                    glyph[c] = lineChar(vx1, -vy2);
                    shade[c] = 0.55 * fog;
                } else {
                    glyph[c] = ".";
                    shade[c] = 0.3 * fog;
                }
                cyan[c] = accent[i];
            }

            for (const b of buckets) b.length = 0;
            for (let c = 0; c < zbuf.length; c++) {
                // A bad point (NaN shade) would index a bucket that does not exist; skip it rather than stop the animation
                if (zbuf[c] === Infinity || !(shade[c] >= 0)) continue;
                const band = Math.min(BANDS - 1, Math.floor(shade[c] * BANDS));
                buckets[band + (cyan[c] ? BANDS : 0)].push(c);
            }

            ctx.clearRect(0, 0, width, height);
            for (let b = 0; b < buckets.length; b++) {
                const cells = buckets[b];
                if (!cells.length) continue;
                const a = ((b % BANDS) + 1) / BANDS;
                ctx.fillStyle = b >= BANDS ? `rgba(0,211,243,${(0.35 + a * 0.65) * fade})` : `rgba(255,255,255,${(0.1 + a * 0.85) * fade})`;
                for (const c of cells) ctx.fillText(glyph[c], (c % cols) * cellW, ((c / cols) | 0) * cellH);
            }
        };

        const morphTo = (i: number) => {
            if (i === current) return;
            fromPos.set(pos);
            fromVec.set(vec);
            fromKind.set(kind);
            fromAccent.set(accent);
            fromTone.set(tone);
            current = i;
            dimInfo();
            morphStart = performance.now();
            if (reduceMotion) {
                const t = targets[i];
                pos.set(t.pos);
                vec.set(t.vec);
                kind.set(t.kind);
                accent.set(t.accent);
                tone.set(t.tone);
                morphStart = -1;
                showInfo(i);
                draw(performance.now());
            }
        };

        resize();
        const ro = new ResizeObserver(() => {
            resize();
            draw(performance.now());
        });
        ro.observe(wrap);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("click", onClick);
        document.documentElement.addEventListener("pointerleave", onLeave);

        // Only animate while on screen
        let raf = 0;
        let running = false;
        const loop = (now: number) => {
            draw(now);
            raf = requestAnimationFrame(loop);
        };
        const io = new IntersectionObserver(([entry]) => {
            const visible = entry.isIntersecting;
            if (visible && !running && !reduceMotion) {
                running = true;
                lastSettled = performance.now();
                raf = requestAnimationFrame(loop);
            } else if (!visible && running) {
                running = false;
                cancelAnimationFrame(raf);
            }
        });
        io.observe(wrap);
        draw(performance.now());

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            ro.disconnect();
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("click", onClick);
            document.documentElement.removeEventListener("pointerleave", onLeave);
            setHovering(false);
        };
    }, [shapes, reduceMotion]);

    return (
        <div className={cn("pointer-events-none", className)}>
            <div ref={wrapRef} className="absolute inset-0" aria-hidden="true">
                <canvas ref={canvasRef} className="absolute inset-0" />
            </div>
            {/* Shape tooltip: the outer box follows the cursor, the card inside pops in and out */}
            <div ref={tipRef} role="tooltip" style={{ width: TIP_WIDTH }} className="absolute left-0 top-0 z-40 pointer-events-none">
                <div
                    ref={tipCardRef}
                    style={{ opacity: 0, transform: "translateY(6px) scale(0.96)" }}
                    className="origin-top-left rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl backdrop-saturate-150 transition-[opacity,transform] duration-200 ease-out"
                >
                    <span ref={tipInfoRef} className="block transition-opacity duration-300">
                        <span className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00d3f3] shadow-[0_0_8px_#00d3f3]" />
                            <span ref={tipNameRef} className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white" />
                        </span>
                        <span ref={tipAboutRef} className="mt-2.5 block text-[13px] leading-relaxed text-neutral-200" />
                    </span>
                    <span className="mt-3 block text-[11px] text-neutral-400">Click to see the next one</span>
                </div>
            </div>
        </div>
    );
}
