"use client";

import React, { useRef } from "react";
import { useSpring, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Button that drifts toward the cursor. Used for the primary hero calls to action.
export const MagneticButton = ({
    children,
    className,
    onClick,
    onMouseEnter,
}: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onMouseEnter?: () => void;
}) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.1);
        y.set((clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={onMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            onClick={onClick}
            className={cn("relative group", className)}
        >
            {children}
        </motion.button>
    );
};
