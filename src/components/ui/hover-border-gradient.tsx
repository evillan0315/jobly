"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
  clockwise?: boolean;
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false);

  // Stable Direction Rotation Logic
  const rotateDirection = useCallback(
    (currentDirection: Direction): Direction => {
      const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    },
    [clockwise] // Depend on the `clockwise` prop
  );

  // Handle gradient rotation effect
  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        // Simulate rotation for visual effect (state removed)
        rotateDirection("TOP");
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, rotateDirection]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex items-center justify-center rounded-full border bg-zinc/20 hover:bg-zinc/10 transition duration-500 dark:bg-white/20 overflow-visible w-fit p-px",
        containerClassName
      )}
      {...props}
    >
      {/* Content Container */}
      <div
        className={cn(
          "relative z-10 bg-zinc-950 px-4 py-2 rounded-[inherit] text-white",
          className
        )}
      >
        {children}
      </div>

      {/* Motion Gradient Border */}
      <motion.div
        className="absolute inset-0 z-0 rounded-[inherit] overflow-hidden"
        style={{ filter: "blur(2px)" }}
        initial={{ background: "none" }}
        animate={{
          background: hovered
            ? [
                "none",
                "radial-gradient(75% 181.2% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)",
              ]
            : "none",
        }}
        transition={{ ease: "linear", duration }}
      />

      {/* Background Layer */}
      <div className="absolute inset-[2px] z-[1] rounded-full bg-zinc-950" />
    </Tag>
  );
}
