"use client";
import React, { Component } from "react";
import { BackgroundLines } from "./ui/Background-lines";
import { Grid2, Button, Typography, Box } from "@mui/material";
import HeroHeader from "./ui/HeroHeader";
import HeroSection from "./HeroSection";
interface BackgroundLinesSectionProps {
  title: string;
  subtitle: string;
  projectLink?: string;
  contactLink?: string;
  image?: string;
}
const BackgroundLinesSection: React.FC<BackgroundLinesSectionProps> = ({
  title,
  subtitle,
  projectLink,
  contactLink,
  image,
}) => {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col">
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        backgroundRepeat: "no-repeat",
        backgroundImage:
          "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)",
        ...theme.applyStyles("dark", {
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)",
        }),
      })}
    >
      <HeroSection
        title={title}
        subtitle={subtitle}
      />
</Box>
    </BackgroundLines>
  );
};
export default BackgroundLinesSection;
