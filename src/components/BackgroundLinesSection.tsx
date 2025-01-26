"use client";
import React from "react";
import { BackgroundLines } from "./ui/Background-lines";
import { Box } from "@mui/material";

interface BackgroundLinesSectionProps {}

const BackgroundLinesSection: React.FC<BackgroundLinesSectionProps> = () => {
  return (
    <>
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
        ></Box>
      </BackgroundLines>
    </>
  );
};
export default BackgroundLinesSection;
