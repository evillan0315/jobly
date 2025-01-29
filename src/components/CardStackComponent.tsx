"use client";
import React from "react";
import { CardStack } from "@/components/ui/card-stack";
import Box from "@mui/material/Box";
import { cn } from "@/lib/utils";

export function CardStackComponent() {
  return (
    <Box
      component="section"
      className="h-[50rem] flex items-start justify-center w-full"
    >
      <CardStack items={CARDS} />
    </Box>
  );
}

// Small utility to highlight the content of a specific section of testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Automating E-commerce",
    designation: "Lead Software Development",
    image: "e-commerce-dashboard-home_klgrvx",
    link: "",
    technologies: "",
    content: (
      <p>
        To streamline the software delivery process for an{" "}
        <Highlight>e-commerce platform</Highlight> by automating the build,
        test, and deployment phases.
      </p>
    ),
  },
  {
    id: 1,
    name: "Real-time Video Chat",
    designation: "Software Engineer at Dashboard Hosting",
    image: "live-video",
    link: "",
    technologies: "",
    content: (
      <p>
        Developed a scalable and{" "}
        <Highlight>feature-rich real-time video streaming chat</Highlight>{" "}
        platform designed for seamless video conferencing and instant messaging.
      </p>
    ),
  },
  {
    id: 2,
    name: "Text Processing API with Themes",
    designation: "Fullstack Developer",
    image: "luca-bravo-XJXWbfSo2f0-unsplash_qlurcx",
    link: "",
    technologies: "",
    content: (
      <p>
        Developed a robust <Highlight>Node.js-based REST API</Highlight> for
        processing and analyzing <Highlight>textual data</Highlight>, designed
        to identify keywords and associate them with predefined themes.
      </p>
    ),
  },
];
