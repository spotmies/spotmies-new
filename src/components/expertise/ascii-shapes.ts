// Point-cloud shapes for the hero ASCII field (ascii-morph.tsx). Plain data, no React, so they can be previewed on their own.
// Each generator returns exactly n points spanning roughly -1..1 on every axis, so any shape can morph into any other.

import type { AsciiShape } from "@/data/expertise";

// How a point is drawn
export const SURFACE = 0; // shaded by its normal against the light
export const LINE = 1; // drawn as - / | \ along its direction
export const DOT = 2; // a faint speck

export interface Shape {
    pos: Float32Array; // x, y, z, roughly within -1..1
    // Surface normal for SURFACE points, direction of travel for LINE points
    vec: Float32Array;
    kind: Uint8Array;
    // Drawn in brand cyan
    accent: Uint8Array;
    // Extra darkening for SURFACE points (brain grooves), 1 = none
    tone: Float32Array;
}

// Seeded so every visitor sees the same shapes
export function seeded(seed: number) {
    let s = seed;
    return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

function gaussian(r: () => number) {
    return Math.sqrt(-2 * Math.log(r() + 1e-9)) * Math.cos(2 * Math.PI * r());
}

export function sphereDir(r: () => number): [number, number, number] {
    const u = r() * 2 - 1;
    const t = r() * Math.PI * 2;
    const k = Math.sqrt(1 - u * u);
    return [k * Math.cos(t), u, k * Math.sin(t)];
}

function norm(v: number[]) {
    const m = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / m, v[1] / m, v[2] / m];
}

// Collects points for one shape
function builder(n: number) {
    const s: Shape = {
        pos: new Float32Array(n * 3),
        vec: new Float32Array(n * 3),
        kind: new Uint8Array(n),
        accent: new Uint8Array(n),
        tone: new Float32Array(n).fill(1),
    };
    let i = 0;
    const add = (p: number[], v: number[], kind: number, accent = false, tone = 1) => {
        if (i >= n) return;
        s.pos.set(p, i * 3);
        s.vec.set(norm(v), i * 3);
        s.kind[i] = kind;
        s.accent[i] = accent ? 1 : 0;
        s.tone[i] = tone;
        i++;
    };
    return { s, add };
}

// A point on an ellipsoid with its true surface normal
function ellipsoidPoint(r: () => number, c: number[], rad: number[]) {
    const [dx, dy, dz] = sphereDir(r);
    return {
        p: [c[0] + dx * rad[0], c[1] + dy * rad[1], c[2] + dz * rad[2]],
        n: [dx / rad[0], dy / rad[1], dz / rad[2]],
        d: [dx, dy, dz],
    };
}

// --- SHAPES ---------------------------------------------------------------

function brain(n: number, r: () => number): Shape {
    const { s, add } = builder(n);
    const cerebellum = Math.floor(n * 0.1);
    const stem = Math.floor(n * 0.04);
    const cortex = n - cerebellum - stem;
    for (let i = 0; i < cortex; i++) {
        const side = i % 2 ? 1 : -1;
        let e = ellipsoidPoint(r, [side * 0.3, 0.12, 0], [0.4, 0.58, 0.88]);
        // Skip the flat inner faces so a fissure shows between the hemispheres
        while (e.d[0] * side < -0.55) e = ellipsoidPoint(r, [side * 0.3, 0.12, 0], [0.4, 0.58, 0.88]);
        // Winding grooves: points near the zero line of this field are darkened into sulci
        const f = Math.sin(e.d[2] * 11 + e.d[1] * 7 + side * 0.7) + 0.8 * Math.cos(e.d[1] * 9 - e.d[0] * 5 + e.d[2] * 4);
        const groove = Math.abs(f) < 0.28 ? 0.25 : 1;
        add(e.p, e.n, SURFACE, false, groove);
    }
    for (let i = 0; i < cerebellum; i++) {
        const side = i % 2 ? 1 : -1;
        const e = ellipsoidPoint(r, [side * 0.18, -0.38, 0.55], [0.24, 0.17, 0.22]);
        // Fine horizontal ridges, the cerebellum's signature texture
        const groove = Math.abs(Math.sin(e.d[1] * 18)) < 0.3 ? 0.35 : 1;
        add(e.p, e.n, SURFACE, false, groove);
    }
    for (let i = 0; i < stem; i++) {
        const t = r();
        const a = r() * Math.PI * 2;
        add([Math.cos(a) * 0.08, -0.3 - t * 0.55, 0.32 + Math.sin(a) * 0.08 - t * 0.1], [Math.cos(a), 0, Math.sin(a)], SURFACE);
    }
    return s;
}

function neuralNet(n: number, r: () => number): Shape {
    const { s, add } = builder(n);
    // Each layer is a ring of nodes in the y-z plane, layers spaced along x
    const layers = [
        { count: 4, x: -1.05, radius: 0.42 },
        { count: 6, x: -0.35, radius: 0.7 },
        { count: 6, x: 0.35, radius: 0.7 },
        { count: 3, x: 1.05, radius: 0.34 },
    ];
    const nodes = layers.map((l, li) =>
        Array.from({ length: l.count }, (_, k) => {
            const a = (k / l.count) * Math.PI * 2 + li * 0.45;
            return [l.x, Math.cos(a) * l.radius, Math.sin(a) * l.radius];
        })
    );
    const flat = nodes.flat();
    const edges: number[][][] = [];
    for (let li = 0; li < nodes.length - 1; li++) {
        for (const a of nodes[li]) for (const b of nodes[li + 1]) edges.push([a, b]);
    }
    const nodePts = Math.floor(n * 0.45);
    for (let i = 0; i < nodePts; i++) {
        const e = ellipsoidPoint(r, flat[i % flat.length], [0.1, 0.1, 0.1]);
        add(e.p, e.n, SURFACE, true);
    }
    for (let i = nodePts; i < n; i++) {
        const [a, b] = edges[Math.floor(r() * edges.length)];
        const t = 0.1 + r() * 0.8;
        add([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t], [b[0] - a[0], b[1] - a[1], b[2] - a[2]], LINE);
    }
    return s;
}

function embeddings(n: number, r: () => number): Shape {
    const { s, add } = builder(n);
    const clusters = [
        { c: [-0.6, 0.38, 0.2], r: 0.24, accent: false },
        { c: [0.55, 0.5, -0.25], r: 0.2, accent: false },
        { c: [0.15, -0.5, 0.5], r: 0.26, accent: false },
        { c: [-0.5, -0.45, -0.5], r: 0.18, accent: false },
        { c: [0.68, -0.2, 0.55], r: 0.15, accent: false },
        { c: [0.05, 0.12, -0.72], r: 0.22, accent: true },
    ];
    const specks = Math.floor(n * 0.12);
    // Larger clusters get more points so every sphere is equally solid
    const area = clusters.reduce((sum, k) => sum + k.r * k.r, 0);
    for (const k of clusters) {
        const count = Math.floor(((n - specks) * k.r * k.r) / area);
        for (let i = 0; i < count; i++) {
            const e = ellipsoidPoint(r, k.c, [k.r, k.r, k.r]);
            add(e.p, e.n, SURFACE, k.accent);
        }
    }
    // Loose points scattered around each cluster, like the tail of a distribution; also tops up rounding gaps
    for (let i = 0; i < n; i++) {
        const k = clusters[i % clusters.length];
        add([k.c[0] + gaussian(r) * k.r * 1.2, k.c[1] + gaussian(r) * k.r * 1.2, k.c[2] + gaussian(r) * k.r * 1.2], [0, 0, -1], DOT);
    }
    return s;
}

function lossHeight(x: number, z: number) {
    return 1.6 * (
        -0.6 * Math.exp(-((x - 0.25) ** 2 + (z + 0.2) ** 2) * 2.4) +
        0.12 * Math.sin(3 * x) * Math.cos(3 * z) +
        0.18 * (x * x + z * z)
    );
}

function lossSurface(n: number, r: () => number): Shape {
    const { s, add } = builder(n);
    const trail = Math.floor(n * 0.1);
    const h = 0.01;
    for (let i = 0; i < n - trail; i++) {
        const x = r() * 2.3 - 1.15;
        const z = r() * 2.3 - 1.15;
        const dx = (lossHeight(x + h, z) - lossHeight(x - h, z)) / (2 * h);
        const dz = (lossHeight(x, z + h) - lossHeight(x, z - h)) / (2 * h);
        add([x, lossHeight(x, z) - 0.1, z], [-dx, 1, -dz], SURFACE);
    }
    // Gradient descent: a spiralling path from the rim down into the minimum
    const path = (t: number) => {
        const x = -0.95 + 1.2 * t + 0.28 * Math.sin(t * 10) * (1 - t);
        const z = 0.95 - 1.15 * t + 0.28 * Math.cos(t * 10) * (1 - t);
        return [x, lossHeight(x, z) - 0.04, z];
    };
    for (let i = 0; i < trail; i++) {
        const t = i / trail;
        const a = path(t);
        const b = path(Math.min(1, t + 0.01));
        // A little sideways jitter gives the trail some thickness
        const j = [(r() - 0.5) * 0.04, (r() - 0.5) * 0.02, (r() - 0.5) * 0.04];
        add([a[0] + j[0], a[1] + j[1], a[2] + j[2]], [b[0] - a[0], b[1] - a[1], b[2] - a[2]], LINE, true);
    }
    return s;
}

function tensor(n: number, r: () => number): Shape {
    const { s, add } = builder(n);
    // A 3x3x3 block of cubes; the main diagonal is lit up as the "active" values
    // Small cubes on a wide pitch, so cubes further back don't fill the gaps between the front ones
    const step = 0.52;
    const half = 0.085;
    const cubes: { c: number[]; accent: boolean }[] = [];
    for (const x of [-1, 0, 1]) for (const y of [-1, 0, 1]) for (const z of [-1, 0, 1]) {
        cubes.push({ c: [x * step, y * step, z * step], accent: x === y && y === z });
    }
    const faces = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    for (let i = 0; i < n; i++) {
        const cube = cubes[i % cubes.length];
        const f = faces[Math.floor(r() * faces.length)];
        const u = r() * 2 - 1, v = r() * 2 - 1;
        const p = f[0] !== 0 ? [f[0], u, v] : f[1] !== 0 ? [u, f[1], v] : [u, v, f[2]];
        add([cube.c[0] + p[0] * half, cube.c[1] + p[1] * half, cube.c[2] + p[2] * half], f, SURFACE, cube.accent);
    }
    return s;
}

// --- GEOMETRY HELPERS (service shapes) ---------------------------------------

type Vec = number[];
type Sample = { p: Vec; n: Vec };
type Rand = () => number;

const add3 = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub3 = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale3 = (a: Vec, k: number): Vec => [a[0] * k, a[1] * k, a[2] * k];
const lerp3 = (a: Vec, b: Vec, t: number): Vec => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

// Rotates about x, then y, then z (radians)
function rot(v: Vec, ax: number, ay = 0, az = 0): Vec {
    let [x, y, z] = v;
    let c = Math.cos(ax), s = Math.sin(ax);
    [y, z] = [y * c - z * s, y * s + z * c];
    c = Math.cos(ay); s = Math.sin(ay);
    [x, z] = [x * c + z * s, -x * s + z * c];
    c = Math.cos(az); s = Math.sin(az);
    [x, y] = [x * c - y * s, x * s + y * c];
    return [x, y, z];
}

// Moves and rotates a sample as one piece
function place(sm: Sample, at: Vec, ax = 0, ay = 0, az = 0): Sample {
    return { p: add3(rot(sm.p, ax, ay, az), at), n: rot(sm.n, ax, ay, az) };
}

// Splits n points across parts by weight; the last part takes the rounding remainder so exactly n are produced
function parts(n: number, list: [number, () => void][]) {
    const total = list.reduce((sum, [w]) => sum + w, 0);
    let used = 0;
    list.forEach(([w, f], k) => {
        const count = k === list.length - 1 ? n - used : Math.floor((n * w) / total);
        for (let i = 0; i < count; i++) f();
        used += count;
    });
}

// A point on the surface of an axis-aligned box, faces picked by area
function boxPoint(r: Rand, c: Vec, h: Vec): Sample {
    const areas = [h[1] * h[2], h[0] * h[2], h[0] * h[1]];
    const t = r() * (areas[0] + areas[1] + areas[2]);
    const axis = t < areas[0] ? 0 : t < areas[0] + areas[1] ? 1 : 2;
    const sign = r() < 0.5 ? -1 : 1;
    const p = [(r() * 2 - 1) * h[0], (r() * 2 - 1) * h[1], (r() * 2 - 1) * h[2]];
    p[axis] = sign * h[axis];
    const n = [0, 0, 0];
    n[axis] = sign;
    return { p: add3(c, p), n };
}

function spherePoint(r: Rand, c: Vec, rad: number): Sample {
    const d = sphereDir(r);
    return { p: add3(c, scale3(d, rad)), n: d };
}

// A point along a segment; the direction doubles as the stroke direction for LINE points
function segPoint(r: Rand, a: Vec, b: Vec): Sample {
    return { p: lerp3(a, b, r()), n: sub3(b, a) };
}

// A point along a polyline, segments picked by length
function polylinePoint(r: Rand, pts: Vec[]): Sample {
    const lens = pts.slice(1).map((p, i) => Math.hypot(...sub3(p, pts[i])));
    let t = r() * lens.reduce((a, b) => a + b, 0);
    for (let i = 0; i < lens.length; i++) {
        if (t <= lens[i] || i === lens.length - 1) return segPoint(r, pts[i], pts[i + 1]);
        t -= lens[i];
    }
    return segPoint(r, pts[0], pts[1]);
}

// A circle (or arc from a0 to a1) in the xy plane, as a LINE stroke
function arcPoint(r: Rand, c: Vec, rad: number, a0 = 0, a1 = Math.PI * 2): Sample {
    const a = a0 + r() * (a1 - a0);
    return { p: [c[0] + Math.cos(a) * rad, c[1] + Math.sin(a) * rad, c[2]], n: [-Math.sin(a), Math.cos(a), 0] };
}

// Ring around the y axis, optionally only part of the way round
function torusPoint(r: Rand, R: number, tube: number, u0 = 0, u1 = Math.PI * 2): Sample {
    const u = u0 + r() * (u1 - u0);
    const v = r() * Math.PI * 2;
    const d = [Math.cos(v) * Math.cos(u), Math.sin(v), Math.cos(v) * Math.sin(u)];
    return { p: [(R + tube * Math.cos(v)) * Math.cos(u), tube * Math.sin(v), (R + tube * Math.cos(v)) * Math.sin(u)], n: d };
}

// Cylinder along the y axis; `hole` rejects cap points (used for reel cut-outs)
function cylinderPoint(r: Rand, R: number, hh: number, caps = true, hole?: (x: number, z: number) => boolean): Sample {
    const side = 2 * Math.PI * R * 2 * hh;
    const cap = caps ? 2 * Math.PI * R * R : 0;
    if (r() * (side + cap) < side) {
        const a = r() * Math.PI * 2;
        return { p: [Math.cos(a) * R, (r() * 2 - 1) * hh, Math.sin(a) * R], n: [Math.cos(a), 0, Math.sin(a)] };
    }
    for (;;) {
        const a = r() * Math.PI * 2;
        const d = Math.sqrt(r()) * R;
        const x = Math.cos(a) * d, z = Math.sin(a) * d;
        if (hole && hole(x, z)) continue;
        const sign = r() < 0.5 ? -1 : 1;
        return { p: [x, sign * hh, z], n: [0, sign, 0] };
    }
}

function inPoly(poly: number[][], x: number, y: number) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i], [xj, yj] = poly[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
}

// A flat outline in the xy plane extruded through z (half-depth hd): returns a sampler over faces and side walls
function makePrism(poly: number[][], hd: number) {
    let signed = 0;
    const edges = poly.map((p, i) => {
        const q = poly[(i + 1) % poly.length];
        signed += p[0] * q[1] - q[0] * p[1];
        return { p, q, len: Math.hypot(q[0] - p[0], q[1] - p[1]) };
    });
    const area = Math.abs(signed) / 2;
    const ccw = signed > 0;
    const perim = edges.reduce((s, e) => s + e.len, 0);
    const xs = poly.map((p) => p[0]), ys = poly.map((p) => p[1]);
    const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
    return (r: Rand, faceOnly = false): Sample => {
        if (faceOnly || r() * (2 * area + perim * 2 * hd) < 2 * area) {
            for (;;) {
                const x = minX + r() * (maxX - minX), y = minY + r() * (maxY - minY);
                if (!inPoly(poly, x, y)) continue;
                const sign = faceOnly ? -1 : r() < 0.5 ? -1 : 1;
                return { p: [x, y, sign * hd], n: [0, 0, sign] };
            }
        }
        let t = r() * perim;
        let e = edges[0];
        for (const edge of edges) {
            e = edge;
            if (t <= edge.len) break;
            t -= edge.len;
        }
        const k = e.len ? t / e.len : 0;
        const dx = e.q[0] - e.p[0], dy = e.q[1] - e.p[1];
        const nrm = ccw ? [dy, -dx, 0] : [-dy, dx, 0];
        return { p: [e.p[0] + dx * k, e.p[1] + dy * k, (r() * 2 - 1) * hd], n: nrm };
    };
}

// Rounded rectangle outline centred on the origin
function roundedRect(w: number, h: number, rad: number, seg = 6): number[][] {
    const pts: number[][] = [];
    const corners = [[w / 2 - rad, h / 2 - rad, 0], [-w / 2 + rad, h / 2 - rad, 90], [-w / 2 + rad, -h / 2 + rad, 180], [w / 2 - rad, -h / 2 + rad, 270]];
    for (const [cx, cy, start] of corners) {
        for (let i = 0; i <= seg; i++) {
            const a = ((start + (90 * i) / seg) * Math.PI) / 180;
            pts.push([cx + Math.cos(a) * rad, cy + Math.sin(a) * rad]);
        }
    }
    return pts;
}

// Rectangle outline in the xy plane at depth z, as LINE strokes
function rectOutline(r: Rand, x0: number, y0: number, x1: number, y1: number, z: number): Sample {
    return polylinePoint(r, [[x0, y0, z], [x1, y0, z], [x1, y1, z], [x0, y1, z], [x0, y0, z]]);
}

// --- PRODUCT DESIGN ---------------------------------------------------------

function cursor(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const arrow = makePrism([[-0.42, 0.95], [-0.42, -0.45], [-0.13, -0.17], [0.1, -0.72], [0.31, -0.63], [0.08, -0.08], [0.47, -0.08]], 0.11);
    const shift: Vec = [0.05, -0.1, 0];
    const tip: Vec = [-0.42, 0.95, 0];
    parts(n, [
        [0.82, () => { const m = arrow(r); add(add3(m.p, shift), m.n, SURFACE); }],
        // Click ripples around the tip
        [0.18, () => {
            const rad = r() < 0.5 ? 0.2 : 0.34;
            const m = arcPoint(r, add3(tip, shift), rad, Math.PI * 0.05, Math.PI * 1.45);
            add(m.p, m.n, LINE, true);
        }],
    ]);
    return s;
}

function bezier(p0: Vec, c1: Vec, c2: Vec, p3: Vec, t: number): Vec {
    const u = 1 - t;
    return [0, 1, 2].map((k) => u * u * u * p0[k] + 3 * u * u * t * c1[k] + 3 * u * t * t * c2[k] + t * t * t * p3[k]);
}

function penTool(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const p0: Vec = [-0.95, -0.7, 0], c1: Vec = [-0.75, 0.4, 0], c2: Vec = [-0.05, -0.9, 0], p3: Vec = [0.05, -0.15, 0];
    // The pen, nib first, its tip resting on the end of the curve it is drawing
    const nib = makePrism([[0, -0.5], [0.24, -0.12], [0.2, 0.3], [0.13, 0.3], [0.13, 0.85], [-0.13, 0.85], [-0.13, 0.3], [-0.2, 0.3], [-0.24, -0.12]], 0.09);
    const slit = makePrism([[-0.015, -0.45], [0.015, -0.45], [0.015, -0.1], [-0.015, -0.1]], 0.1);
    const tilt = -0.6;
    const penAt = add3(p3, scale3(rot([0, 0.5, 0], 0, 0, tilt), 1));
    parts(n, [
        [0.3, () => { const t = r(); const a = bezier(p0, c1, c2, p3, t), b = bezier(p0, c1, c2, p3, Math.min(1, t + 0.01)); add(a, sub3(b, a), LINE); }],
        [0.12, () => { const m = r() < 0.5 ? segPoint(r, p0, c1) : segPoint(r, p3, c2); add(m.p, m.n, LINE, true); }],
        [0.1, () => { const at = [p0, c1, c2][Math.floor(r() * 3)]; const m = boxPoint(r, at, [0.06, 0.06, 0.06]); add(m.p, m.n, SURFACE, true); }],
        [0.43, () => { const m = place(nib(r), penAt, 0, 0, tilt); add(m.p, m.n, SURFACE); }],
        [0.05, () => { const m = place(slit(r), penAt, 0, 0, tilt); add(m.p, m.n, SURFACE, false, 0.2); }],
    ]);
    return s;
}

function layers(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const plate = makePrism(roundedRect(1.05, 1.05, 0.12), 0.035);
    parts(n, [0.58, 0, -0.58].map((y, i) => [1, () => {
        const m = place(plate(r), [0, y, 0], Math.PI / 2 - 0.6, Math.PI / 4);
        add(m.p, m.n, SURFACE, i === 0);
    }] as [number, () => void]));
    return s;
}

function wireframe(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const z = 0;
    parts(n, [
        [0.2, () => { const m = rectOutline(r, -0.95, -0.7, 0.95, 0.72, z); add(m.p, m.n, LINE); }],
        [0.06, () => { const m = segPoint(r, [-0.95, 0.52, z], [0.95, 0.52, z]); add(m.p, m.n, LINE); }],
        [0.04, () => { const m = spherePoint(r, [-0.85 + 0.09 * Math.floor(r() * 3), 0.62, z], 0.03); add(m.p, m.n, SURFACE); }],
        // Image placeholder: a box with a cross through it
        [0.24, () => {
            const k = r();
            const m = k < 0.55 ? rectOutline(r, -0.82, -0.3, -0.05, 0.4, z) : k < 0.78 ? segPoint(r, [-0.82, -0.3, z], [-0.05, 0.4, z]) : segPoint(r, [-0.82, 0.4, z], [-0.05, -0.3, z]);
            add(m.p, m.n, LINE);
        }],
        [0.16, () => { const y = [0.33, 0.2, 0.07][Math.floor(r() * 3)]; const m = segPoint(r, [0.1, y, z], [y > 0.3 ? 0.8 : 0.62, y, z]); add(m.p, m.n, LINE); }],
        [0.12, () => { const m = boxPoint(r, [0.33, -0.17, z], [0.23, 0.07, 0.03]); add(m.p, m.n, SURFACE, true); }],
        [0.18, () => { const k = Math.floor(r() * 3); const x0 = -0.82 + k * 0.56; const m = rectOutline(r, x0, -0.6, x0 + 0.48, -0.42, z); add(m.p, m.n, LINE); }],
    ]);
    return s;
}

// --- GENERATIVE AI FILM -----------------------------------------------------

function clapperboard(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    // Diagonal black and white stripes, the clapper's signature
    const stripe = (x: number, y: number) => (Math.floor((x - y) / 0.18) % 2 === 0 ? 1 : 0.22);
    parts(n, [
        [0.5, () => { const m = boxPoint(r, [0, -0.28, 0], [0.8, 0.52, 0.06]); add(m.p, m.n, SURFACE); }],
        [0.12, () => { const m = boxPoint(r, [0, 0.33, 0], [0.8, 0.09, 0.06]); add(m.p, m.n, SURFACE, false, stripe(m.p[0], m.p[1])); }],
        // The hinged arm, swung open
        [0.2, () => {
            const local = boxPoint(r, [0.8, 0.09, 0], [0.8, 0.09, 0.06]);
            const tone = stripe(local.p[0], local.p[1]);
            const m = place(local, [-0.8, 0.43, 0], 0, 0, 0.32);
            add(m.p, m.n, SURFACE, false, tone);
        }],
        [0.18, () => {
            const row = Math.floor(r() * 3);
            const y = -0.02 - row * 0.2;
            const m = r() < 0.3 ? segPoint(r, [-0.03, y + 0.07, -0.07], [-0.03, y - 0.1, -0.07]) : segPoint(r, [-0.68, y, -0.07], [row === 2 ? 0.2 : 0.68, y, -0.07]);
            add(m.p, m.n, LINE, true);
        }],
    ]);
    return s;
}

function filmReel(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const holes = Array.from({ length: 6 }, (_, k) => [Math.cos((k * Math.PI) / 3) * 0.44, Math.sin((k * Math.PI) / 3) * 0.44]);
    const hole = (x: number, z: number) => Math.hypot(x, z) < 0.07 || holes.some(([hx, hz]) => Math.hypot(x - hx, z - hz) < 0.17);
    parts(n, [
        [0.72, () => { const m = place(cylinderPoint(r, 0.78, 0.07, true, hole), [0, 0.12, 0], Math.PI / 2); add(m.p, m.n, SURFACE); }],
        [0.08, () => { const m = place(torusPoint(r, 0.12, 0.03), [0, 0.12, -0.08], Math.PI / 2); add(m.p, m.n, SURFACE, true); }],
        // A strip of film unspooling from the bottom
        [0.2, () => {
            const t = r();
            const base = lerp3([0.35, -0.6, 0], [1.0, -0.95, 0], t);
            const w = (r() * 2 - 1) * 0.11;
            const p = add3(base, [0.47 * w, 0.88 * w, 0]);
            const sprocket = Math.abs(Math.abs(w) - 0.085) < 0.02 && Math.floor(t * 14) % 2 === 0;
            add(p, [0, 0, -1], SURFACE, !sprocket, sprocket ? 0.15 : 1);
        }],
    ]);
    return s;
}

function movieCamera(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    parts(n, [
        [0.42, () => { const m = boxPoint(r, [-0.15, -0.3, 0], [0.55, 0.32, 0.26]); add(m.p, m.n, SURFACE); }],
        // Lens out front, its glass ring in cyan
        [0.16, () => { const m = place(cylinderPoint(r, 0.19, 0.17, false), [0.57, -0.3, 0], 0, 0, Math.PI / 2); add(m.p, m.n, SURFACE); }],
        [0.07, () => { const m = place(cylinderPoint(r, 0.15, 0.01), [0.75, -0.3, 0], 0, 0, Math.PI / 2); add(m.p, m.n, SURFACE, true); }],
        // Two film reels on top
        [0.3, () => {
            const big = r() < 0.55;
            const m = place(cylinderPoint(r, big ? 0.32 : 0.26, 0.06), big ? [-0.42, 0.35, 0] : [0.2, 0.28, 0], Math.PI / 2);
            add(m.p, m.n, SURFACE, false, Math.hypot(m.p[0] - (big ? -0.42 : 0.2), m.p[1] - (big ? 0.35 : 0.28)) < 0.08 ? 0.3 : 1);
        }],
        [0.05, () => { const m = boxPoint(r, [-0.78, -0.18, 0], [0.08, 0.1, 0.1]); add(m.p, m.n, SURFACE); }],
    ]);
    return s;
}

function playButton(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const tri = makePrism([[-0.28, 0.42], [-0.28, -0.42], [0.45, 0]], 0.1);
    parts(n, [
        [0.45, () => { const m = tri(r); add(m.p, m.n, SURFACE, true); }],
        [0.55, () => { const m = place(torusPoint(r, 0.82, 0.07), [0, 0, 0], Math.PI / 2); add(m.p, m.n, SURFACE); }],
    ]);
    return s;
}

// --- SAAS -------------------------------------------------------------------

function cloud(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const balls: [Vec, number][] = [[[-0.5, 0.05, 0], 0.36], [[0.02, 0.3, 0], 0.48], [[0.52, 0.08, 0], 0.38], [[-0.85, -0.08, 0], 0.22], [[0.88, -0.06, 0], 0.22]];
    const base = -0.18;
    const area = balls.reduce((sum, [, rad]) => sum + rad * rad, 0);
    parts(n, [
        [0.82, () => {
            for (;;) {
                let t = r() * area;
                let ball = balls[0];
                for (const b of balls) { ball = b; if (t <= b[1] * b[1]) break; t -= b[1] * b[1]; }
                const m = spherePoint(r, ball[0], ball[1]);
                if (m.p[1] < base) continue;
                if (balls.some(([c, rad]) => c !== ball[0] && Math.hypot(...sub3(m.p, c)) < rad)) continue;
                add(m.p, m.n, SURFACE);
                return;
            }
        }],
        // Data syncing up and down beneath it
        [0.18, () => {
            const up = r() < 0.5;
            const x = up ? -0.22 : 0.22;
            const tipY = up ? -0.32 : -0.95;
            const k = r();
            const m = k < 0.6 ? segPoint(r, [x, -0.32, 0], [x, -0.95, 0]) : segPoint(r, [x, tipY, 0], [x + (k < 0.8 ? -0.12 : 0.12), tipY + (up ? -0.14 : 0.14), 0]);
            add(m.p, m.n, LINE, true);
        }],
    ]);
    return s;
}

function serverRack(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const ys = [0.56, 0, -0.56];
    parts(n, [
        [0.78, () => { const y = ys[Math.floor(r() * 3)]; const m = boxPoint(r, [0, y, 0], [0.75, 0.17, 0.5]); add(m.p, m.n, SURFACE); }],
        [0.12, () => { const y = ys[Math.floor(r() * 3)]; const m = segPoint(r, [-0.62, y - 0.06 + 0.06 * Math.floor(r() * 3), -0.52], [-0.05, y - 0.06 + 0.06 * Math.floor(r() * 3), -0.52]); add(m.p, m.n, LINE); }],
        [0.1, () => { const y = ys[Math.floor(r() * 3)]; const m = spherePoint(r, [0.42 + 0.14 * Math.floor(r() * 2), y, -0.52], 0.04); add(m.p, m.n, SURFACE, true); }],
    ]);
    return s;
}

function barChart(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const heights = [0.4, 0.65, 0.55, 0.95, 1.3];
    const x = (i: number) => -0.72 + i * 0.36;
    const bottom = -0.75;
    parts(n, [
        [0.12, () => { const m = boxPoint(r, [0, bottom - 0.03, 0], [0.98, 0.03, 0.35]); add(m.p, m.n, SURFACE); }],
        [0.7, () => {
            const i = Math.floor(r() * heights.length);
            const h = heights[i] / 2;
            const m = boxPoint(r, [x(i), bottom + h, 0], [0.12, h, 0.14]);
            add(m.p, m.n, SURFACE, i === heights.length - 1);
        }],
        // Trend line over the bars, ending in an arrow
        [0.18, () => {
            const pts: Vec[] = heights.map((h, i) => [x(i), bottom + h + 0.18, -0.15]);
            const tip = pts[pts.length - 1];
            const k = r();
            const m = k < 0.8 ? polylinePoint(r, pts) : segPoint(r, tip, add3(tip, k < 0.9 ? [-0.14, -0.02, 0] : [-0.04, -0.14, 0]));
            add(m.p, m.n, LINE, true);
        }],
    ]);
    return s;
}

function globe(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const R = 0.85;
    const nodes = Array.from({ length: 7 }, () => scale3(sphereDir(r), R));
    const slerp = (a: Vec, b: Vec, t: number) => {
        const m = lerp3(a, b, t);
        const len = Math.hypot(...m) || 1;
        // Arcs lift off the surface in the middle, like flight paths
        return scale3(m, (R / len) * (1 + 0.18 * Math.sin(Math.PI * t)));
    };
    parts(n, [
        [0.3, () => { const m = spherePoint(r, [0, 0, 0], R); add(m.p, m.n, SURFACE, false, 0.55); }],
        [0.32, () => {
            if (r() < 0.5) {
                const lon = (Math.floor(r() * 6) * Math.PI) / 6;
                const a = r() * Math.PI * 2;
                const p = [Math.cos(a) * Math.cos(lon) * R, Math.sin(a) * R, Math.cos(a) * Math.sin(lon) * R];
                add(p, [-Math.sin(a) * Math.cos(lon), Math.cos(a), -Math.sin(a) * Math.sin(lon)], LINE);
            } else {
                const lat = [-0.6, -0.25, 0.25, 0.6][Math.floor(r() * 4)];
                const a = r() * Math.PI * 2;
                const rr = Math.cos(lat) * R;
                add([Math.cos(a) * rr, Math.sin(lat) * R, Math.sin(a) * rr], [-Math.sin(a), 0, Math.cos(a)], LINE);
            }
        }],
        [0.26, () => {
            const i = Math.floor(r() * nodes.length);
            const a = nodes[i], b = nodes[(i + 2) % nodes.length];
            const t = r();
            const p = slerp(a, b, t);
            add(p, sub3(slerp(a, b, Math.min(1, t + 0.02)), p), LINE, true);
        }],
        [0.12, () => { const m = spherePoint(r, nodes[Math.floor(r() * nodes.length)], 0.05); add(m.p, m.n, SURFACE, true); }],
    ]);
    return s;
}

// --- BLOCKCHAIN & WEB3 ------------------------------------------------------

function blockchain(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const blocks: Vec[] = [[-0.78, -0.42, 0.15], [0, 0, 0], [0.78, 0.42, -0.15]];
    const h = 0.23;
    parts(n, [
        [0.78, () => {
            const i = Math.floor(r() * 3);
            const m = boxPoint(r, blocks[i], [h, h, h]);
            // A few dark rows on each face, like the data each block carries
            const groove = Math.abs((m.p[1] - blocks[i][1]) % 0.12) < 0.02 && Math.abs(m.p[0] - blocks[i][0]) < h * 0.7 ? 0.35 : 1;
            add(m.p, m.n, SURFACE, i === 2, groove);
        }],
        // Links from each block to the next
        [0.22, () => {
            const i = Math.floor(r() * 2);
            const off = (Math.floor(r() * 3) - 1) * 0.04;
            const a = add3(blocks[i], [h, off, 0]), b = add3(blocks[i + 1], [-h, off, 0]);
            const m = segPoint(r, a, b);
            add(m.p, m.n, LINE, true);
        }],
    ]);
    return s;
}

function coin(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    parts(n, [
        [0.68, () => {
            const m = place(cylinderPoint(r, 0.82, 0.08), [0, 0, 0], Math.PI / 2);
            // Milled edge: fine ridges round the rim
            const rim = Math.hypot(m.p[0], m.p[1]) > 0.81 && Math.floor((Math.atan2(m.p[1], m.p[0]) + Math.PI) / 0.07) % 2 === 0 ? 0.4 : 1;
            add(m.p, m.n, SURFACE, false, rim);
        }],
        [0.12, () => { const m = place(torusPoint(r, 0.66, 0.025), [0, 0, -0.09], Math.PI / 2); add(m.p, m.n, SURFACE); }],
        // Raised diamond mark in the middle
        [0.2, () => {
            const d = sphereDir(r);
            const k = [0.26, 0.42, 0.08];
            const l1 = Math.abs(d[0]) / k[0] + Math.abs(d[1]) / k[1] + Math.abs(d[2]) / k[2];
            const p = [d[0] / l1, d[1] / l1, d[2] / l1 - 0.12];
            add(p, [Math.sign(d[0]) / k[0], Math.sign(d[1]) / k[1], Math.sign(d[2]) / k[2]], SURFACE, true, Math.abs(p[1]) < 0.025 ? 0.3 : 1);
        }],
    ]);
    return s;
}

function chainLinks(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const straight = 0.22, R = 0.22, tube = 0.085;
    const perim = 4 * straight + 2 * Math.PI * R;
    // A point on one stadium-shaped link lying in the xy plane
    const link = (): Sample => {
        let t = r() * perim;
        let c: number[], nn: number[];
        if (t < 2 * straight) { c = [-straight + t, R]; nn = [0, 1]; }
        else if ((t -= 2 * straight) < Math.PI * R) { const a = Math.PI / 2 - t / R; c = [straight + Math.cos(a) * R, Math.sin(a) * R]; nn = [Math.cos(a), Math.sin(a)]; }
        else if ((t -= Math.PI * R) < 2 * straight) { c = [straight - t, -R]; nn = [0, -1]; }
        else { t -= 2 * straight; const a = -Math.PI / 2 - t / R; c = [-straight + Math.cos(a) * R, Math.sin(a) * R]; nn = [Math.cos(a), Math.sin(a)]; }
        const v = r() * Math.PI * 2;
        const d = [Math.cos(v) * nn[0], Math.cos(v) * nn[1], Math.sin(v)];
        return { p: [c[0] + tube * d[0], c[1] + tube * d[1], tube * d[2]], n: d };
    };
    parts(n, [-0.6, 0, 0.6].map((x, i) => [1, () => {
        const m = place(link(), [x, x * 0.35, 0], i === 1 ? Math.PI / 2 : 0, 0, 0.33);
        add(m.p, m.n, SURFACE, i === 1);
    }] as [number, () => void]));
    return s;
}

function p2pNetwork(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const nodes: Vec[] = [];
    for (let q = -3; q <= 3; q++) for (let k = -3; k <= 3; k++) {
        const p = [0.34 * (q + k / 2), 0.34 * k * 0.866, (r() - 0.5) * 0.3];
        if (Math.hypot(p[0], p[1]) < 0.95) nodes.push(p);
    }
    const edges: [Vec, Vec][] = [];
    nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => { if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.36) edges.push([a, b]); }));
    const lit = (p: Vec) => (Math.round(p[0] * 10) + Math.round(p[1] * 10)) % 3 === 0;
    parts(n, [
        [0.45, () => { const p = nodes[Math.floor(r() * nodes.length)]; const m = spherePoint(r, p, 0.065); add(m.p, m.n, SURFACE, lit(p)); }],
        [0.55, () => { const [a, b] = edges[Math.floor(r() * edges.length)]; const m = segPoint(r, a, b); add(m.p, m.n, LINE, lit(a) && lit(b)); }],
    ]);
    return s;
}

// --- MOBILE -----------------------------------------------------------------

function phone(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const body = makePrism(roundedRect(0.98, 1.9, 0.17), 0.06);
    parts(n, [
        [0.66, () => {
            const m = body(r);
            // Screen front, darker than the bezel, with the camera notch left in
            const onScreen = m.p[2] < 0 && m.n[2] < 0 && Math.abs(m.p[0]) < 0.42 && Math.abs(m.p[1]) < 0.86 && !(Math.abs(m.p[0]) < 0.12 && m.p[1] > 0.78);
            add(m.p, m.n, SURFACE, false, onScreen ? 0.3 : 1);
        }],
        [0.28, () => {
            const col = Math.floor(r() * 3), row = Math.floor(r() * 4);
            const m = boxPoint(r, [-0.25 + col * 0.25, 0.5 - row * 0.27, -0.075], [0.075, 0.075, 0.012]);
            add(m.p, m.n, SURFACE, (col + row) % 3 === 0);
        }],
        [0.06, () => { const m = segPoint(r, [-0.16, -0.76, -0.07], [0.16, -0.76, -0.07]); add(m.p, m.n, LINE); }],
    ]);
    return s;
}

function appGrid(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const tile = makePrism(roundedRect(0.42, 0.42, 0.11), 0.06);
    parts(n, [
        [1, () => {
            const col = Math.floor(r() * 3), row = Math.floor(r() * 3);
            const at = [(col - 1) * 0.58, (1 - row) * 0.58, Math.sin(col * 1.3 + row) * 0.18];
            const m = place(tile(r), at, 0.15 * (row - 1), 0.15 * (col - 1));
            add(m.p, m.n, SURFACE, col === 1 && row === 1);
        }],
    ]);
    return s;
}

function bell(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const top = 0.5, lip = -0.55;
    // Bell profile: narrow under the dome, then a curve that flares out at the mouth
    const prof = (y: number) => {
        const t = Math.min(1, Math.max(0, (top - y) / (top - lip)));
        return 0.24 + 0.1 * t + 0.34 * t * t * t;
    };
    const mouth = prof(lip);
    parts(n, [
        [0.56, () => {
            const y = top - r() * (top - lip);
            const rad = prof(y);
            const slope = (prof(y + 0.01) - prof(y - 0.01)) / 0.02;
            const a = r() * Math.PI * 2;
            add([Math.cos(a) * rad, y, Math.sin(a) * rad], [Math.cos(a), -slope, Math.sin(a)], SURFACE);
        }],
        // Rounded crown
        [0.14, () => {
            const d = sphereDir(r);
            if (d[1] < 0) d[1] = -d[1];
            add([d[0] * 0.24, top + d[1] * 0.2, d[2] * 0.24], [d[0] / 0.24, d[1] / 0.2, d[2] / 0.24], SURFACE);
        }],
        [0.04, () => { const m = place(torusPoint(r, 0.06, 0.025), [0, top + 0.25, 0], Math.PI / 2); add(m.p, m.n, SURFACE); }],
        [0.08, () => { const m = place(torusPoint(r, mouth, 0.04), [0, lip, 0]); add(m.p, m.n, SURFACE); }],
        [0.07, () => { const m = spherePoint(r, [0, lip - 0.14, 0], 0.11); add(m.p, m.n, SURFACE, true); }],
        // Unread badge, sitting on the shoulder so it turns with the bell
        [0.11, () => { const m = spherePoint(r, [0.3, top + 0.06, -0.12], 0.13); add(m.p, m.n, SURFACE, true); }],
    ]);
    return s;
}

function signal(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const c: Vec = [0, -0.6, 0];
    parts(n, [
        [0.14, () => { const m = spherePoint(r, c, 0.13); add(m.p, m.n, SURFACE, true); }],
        [0.86, () => {
            const k = Math.floor(r() * 3);
            const rad = 0.42 + k * 0.33;
            const m = place(torusPoint(r, rad, 0.055, Math.PI * 0.22, Math.PI * 0.78), c, -Math.PI / 2);
            add(m.p, m.n, SURFACE, k === 0);
        }],
    ]);
    return s;
}

// --- QA & CONSULTING --------------------------------------------------------

function shield(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const body = makePrism([[-0.72, 0.72], [0, 0.95], [0.72, 0.72], [0.72, 0.1], [0.52, -0.45], [0, -0.95], [-0.52, -0.45], [-0.72, 0.1]], 0.08);
    // Curved back at the sides like a real shield
    const bend = (m: Sample): Sample => ({ p: [m.p[0], m.p[1], m.p[2] + 0.28 * m.p[0] * m.p[0]], n: [m.n[0] - 0.56 * m.p[0] * m.n[2], m.n[1], m.n[2]] });
    parts(n, [
        [0.75, () => { const m = bend(body(r)); add(m.p, m.n, SURFACE); }],
        [0.25, () => {
            const off = (r() - 0.5) * 0.09;
            const m = polylinePoint(r, [[-0.36, 0.02 + off, 0], [-0.08, -0.28 + off, 0], [0.4, 0.36 + off, 0]]);
            add([m.p[0], m.p[1], -0.1 + 0.28 * m.p[0] * m.p[0]], m.n, LINE, true);
        }],
    ]);
    return s;
}

function magnifier(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const c: Vec = [-0.22, 0.22, 0];
    const dir = [Math.cos(-Math.PI / 4), Math.sin(-Math.PI / 4)];
    parts(n, [
        [0.42, () => { const m = place(torusPoint(r, 0.55, 0.09), c, Math.PI / 2); add(m.p, m.n, SURFACE); }],
        [0.12, () => { const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.5; add([c[0] + Math.cos(a) * d, c[1] + Math.sin(a) * d, 0], [0, 0, -1], DOT); }],
        // Glint on the glass
        [0.08, () => { const m = arcPoint(r, add3(c, [0, 0, -0.02]), 0.36, Math.PI * 0.55, Math.PI * 0.95); add(m.p, m.n, LINE, true); }],
        [0.38, () => {
            const start = add3(c, [dir[0] * 0.64, dir[1] * 0.64, 0]);
            const m = place(cylinderPoint(r, 0.1, 0.32), add3(start, [dir[0] * 0.32, dir[1] * 0.32, 0]), 0, 0, Math.PI / 4);
            add(m.p, m.n, SURFACE, true);
        }],
    ]);
    return s;
}

function bug(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    parts(n, [
        [0.5, () => {
            const e = ellipsoidPoint(r, [0, -0.18, 0], [0.4, 0.55, 0.3]);
            // The split between the wing cases
            add(e.p, e.n, SURFACE, false, Math.abs(e.p[0]) < 0.025 && e.p[2] < 0 ? 0.2 : 1);
        }],
        [0.12, () => { const m = spherePoint(r, [0, 0.48, -0.02], 0.2); add(m.p, m.n, SURFACE); }],
        [0.06, () => { const m = spherePoint(r, [(r() < 0.5 ? -1 : 1) * 0.16, -0.05 - 0.3 * Math.floor(r() * 2), -0.28], 0.06); add(m.p, m.n, SURFACE, true); }],
        [0.26, () => {
            const side = r() < 0.5 ? -1 : 1;
            const y = [0.12, -0.2, -0.52][Math.floor(r() * 3)];
            const m = polylinePoint(r, [[side * 0.36, y, 0], [side * 0.72, y + 0.14, 0], [side * 0.86, y - 0.16, 0]]);
            add(m.p, m.n, LINE);
        }],
        [0.06, () => { const side = r() < 0.5 ? -1 : 1; const m = polylinePoint(r, [[side * 0.08, 0.64, 0], [side * 0.2, 0.86, 0], [side * 0.36, 0.95, 0]]); add(m.p, m.n, LINE); }],
    ]);
    return s;
}

function checklist(n: number, r: Rand): Shape {
    const { s, add } = builder(n);
    const board = makePrism(roundedRect(1.3, 1.8, 0.1), 0.05);
    const rows = [0.45, 0.1, -0.25, -0.6];
    const z = -0.06;
    parts(n, [
        [0.5, () => { const m = board(r); add([m.p[0], m.p[1] - 0.05, m.p[2]], m.n, SURFACE); }],
        [0.08, () => { const m = boxPoint(r, [0, 0.86, 0], [0.24, 0.08, 0.08]); add(m.p, m.n, SURFACE); }],
        [0.14, () => { const y = rows[Math.floor(r() * 4)]; const m = rectOutline(r, -0.5, y - 0.1, -0.3, y + 0.1, z); add(m.p, m.n, LINE); }],
        [0.14, () => { const y = rows[Math.floor(r() * 3)]; const m = polylinePoint(r, [[-0.47, y, z], [-0.41, y - 0.08, z], [-0.27, y + 0.14, z]]); add(m.p, m.n, LINE, true); }],
        [0.14, () => { const k = Math.floor(r() * 4); const y = rows[k]; const m = segPoint(r, [-0.15, y, z], [k === 3 ? 0.2 : 0.45, y, z]); add(m.p, m.n, LINE); }],
    ]);
    return s;
}

const GENERATORS: Record<AsciiShape, (n: number, r: () => number) => Shape> = {
    brain,
    neural_net: neuralNet,
    embeddings,
    loss_surface: lossSurface,
    tensor,
    cursor,
    pen_tool: penTool,
    layers,
    wireframe,
    clapperboard,
    film_reel: filmReel,
    movie_camera: movieCamera,
    play_button: playButton,
    cloud,
    server_rack: serverRack,
    bar_chart: barChart,
    globe,
    blockchain,
    coin,
    chain_links: chainLinks,
    p2p_network: p2pNetwork,
    phone,
    app_grid: appGrid,
    bell,
    signal,
    shield,
    magnifier,
    bug,
    checklist,
};

// What each shape stands for, shown in a tooltip while hovering it, for visitors who don't recognise the art
export const SHAPE_INFO: Record<AsciiShape, { name: string; about: string }> = {
    brain: { name: "Brain", about: "The original intelligence, and what neural networks are loosely modelled on." },
    neural_net: { name: "Neural network", about: "Layers of connected neurons. Each connection learns how much one signal matters to the next." },
    embeddings: { name: "Embeddings", about: "Meaning turned into points in space. Similar ideas cluster together, which is how AI search finds related things." },
    loss_surface: { name: "Loss surface", about: "How wrong a model is, drawn as a landscape. Training is the path rolling down to the lowest point." },
    tensor: { name: "Tensor", about: "A block of numbers. Every input, weight and output in a model is stored as one." },
    cursor: { name: "Cursor", about: "Every click is a decision. Good design makes the right one feel obvious." },
    pen_tool: { name: "Pen tool", about: "Where interfaces start: curves and anchor points shaped by hand before anything is built." },
    layers: { name: "Layers", about: "A design is built in layers, from structure at the bottom to the polish people see on top." },
    wireframe: { name: "Wireframe", about: "The plan of a screen before any colour: what goes where, and what matters most." },
    clapperboard: { name: "Clapperboard", about: "Marks the start of every take. Our films are still directed shot by shot, even when AI produces them." },
    film_reel: { name: "Film reel", about: "Storytelling on a reel. The craft of film, now made faster with generative AI." },
    movie_camera: { name: "Movie camera", about: "The shots a camera crew would take, now generated with AI and directed by people." },
    play_button: { name: "Play", about: "The finished cut, ready for your site, your ads and your social channels." },
    cloud: { name: "Cloud", about: "Where SaaS lives: your product running online, syncing for every customer at once." },
    server_rack: { name: "Servers", about: "The infrastructure under a SaaS product, built to keep running as customers grow." },
    bar_chart: { name: "Growth", about: "Analytics built in from day one, so you can see what is working." },
    globe: { name: "Global reach", about: "One product serving customers anywhere, connected over the internet." },
    blockchain: { name: "Blockchain", about: "Blocks of records, each linked to the one before, so no one can quietly change the past." },
    coin: { name: "Token", about: "Digital value that moves on-chain, from payments to trading." },
    chain_links: { name: "Chain", about: "Every block is linked to the last. Break one link and the whole chain shows it." },
    p2p_network: { name: "Peer-to-peer network", about: "No single server in charge. Many nodes keep the same shared record." },
    phone: { name: "Smartphone", about: "Where your users spend their day. We build apps they open every day." },
    app_grid: { name: "App icons", about: "One spot on the home screen. The goal is to be the app people tap first." },
    bell: { name: "Notifications", about: "The nudge that brings users back, when it is timely and useful." },
    signal: { name: "Real-time sync", about: "Apps that stay connected, from live tracking to devices that report as they go." },
    shield: { name: "Shield", about: "Protection for a product you already run: security and reliability checked before users find the gaps." },
    magnifier: { name: "Magnifier", about: "A close look at your product, its code and its costs, so you know what to fix first." },
    bug: { name: "Bug", about: "What testing is for: finding problems before your users do." },
    checklist: { name: "Checklist", about: "A clear, ordered list of what to fix, most important first." },
};
// Shuffling the point order means particles fly across the field between shapes rather than sliding along neighbours
export function buildShape(shape: AsciiShape, n: number, seed: number): Shape {
    const r = seeded(seed);
    const s = GENERATORS[shape](n, r);
    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        for (let k = 0; k < 3; k++) {
            [s.pos[i * 3 + k], s.pos[j * 3 + k]] = [s.pos[j * 3 + k], s.pos[i * 3 + k]];
            [s.vec[i * 3 + k], s.vec[j * 3 + k]] = [s.vec[j * 3 + k], s.vec[i * 3 + k]];
        }
        [s.kind[i], s.kind[j]] = [s.kind[j], s.kind[i]];
        [s.accent[i], s.accent[j]] = [s.accent[j], s.accent[i]];
        [s.tone[i], s.tone[j]] = [s.tone[j], s.tone[i]];
    }
    return s;
}

