"use client";

import type { ComponentProps, CSSProperties } from "react";
import * as Hairline from "@lucasmarkes/hairline/react";

// The Lockers figure from @lucasmarkes/hairline in the site's dark palette: a bank of twelve
// lockers where the one under the pointer opens. The plate colour has to match the page
// background, since plates are filled to hide the strokes behind them.
// Docs: https://hairline.lucasmarkes.com
const palette = {
    "--hairline-plate": "#050505",
    "--hairline-hi": "#00d3f3",
    "--hairline-edge": "#a3a3a3",
    "--hairline-mid": "#525252",
    "--hairline-lo": "#262626",
} as CSSProperties;

export function Lockers({ style, ...props }: ComponentProps<typeof Hairline.Lockers>) {
    return <Hairline.Lockers theme="dark" style={{ ...palette, ...style }} {...props} />;
}

export default Lockers;
