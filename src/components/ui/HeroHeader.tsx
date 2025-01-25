"use client";
import { Typography } from "@mui/material";
import React from "react";

type Props = {
  title: string;
  subtitle?: string;
  sx?: any;
  hasComponent?: boolean;
};

function HeroHeader({ title, subtitle, sx, hasComponent }: Props) {
  return (
    <div>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        className={
          "px-5 md:px-12 mx-auto max-w-7xl bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-300 to-neutral-400 dark:from-neutral-500 dark:to-white font-sans relative z-20 tracking-tight font-normal md:font-medium"
        }
        sx={{
          fontSize: {
            xs: hasComponent ? "2em" : "2.2em",
            sm: hasComponent ? "2em" : "2.3em", // For medim screens and above
            md: hasComponent ? "2.6em" : "4em",
            lg: hasComponent ? "3em" : "5em",
          },
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        component="p"
        gutterBottom
        className="px-5 md:px-12 mx-auto leading-normal max-w-2xl md:max-w-3xl lg:max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-white-400 dark:to-zinc-500 font-sans elative z-20 font-light tracking-tight pb-6 text-center line-clamp-3"
        sx={{
          fontSize: {
            xs: hasComponent ? "1em" : "1.2em",
            sm: hasComponent ? "1.3em" : "1.5em",
          },
        }}
      >
        {subtitle}
      </Typography>
    </div>
  );
}

export default HeroHeader;
