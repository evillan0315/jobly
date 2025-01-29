"use client";

import { Box, Stack, Typography } from "@mui/material";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiPhp,
  SiPrisma,
  SiDocker,
  SiKubernetes,
  SiGithub,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiGraphql,
  SiAmazondynamodb,
  SiOpenai,
  SiGooglegemini,
  SiTensorflow,
  SiMui,
} from "react-icons/si";
import {
  TbAi,
  TbApi,
  TbBrandJavascript,
  TbBrandOauth,
  TbBrandPython,
  TbBrandTypescript,
} from "react-icons/tb";

import { FaAws, FaCcPaypal, FaStripe } from "react-icons/fa6";
import { RiNextjsLine } from "react-icons/ri";
export const iconMap: { [key: string]: React.JSX.Element } = {
  SiNextdotjs: <RiNextjsLine />,
  SiReact: <SiReact />,
  SiJavascript: <TbBrandJavascript />,
  SiMaterialui: <SiMui />,
  SiTailwindcss: <SiTailwindcss />,
  SiPython: <TbBrandPython />,
  SiNodedotjs: <SiNodedotjs />,
  SiTypescript: <TbBrandTypescript />,
  SiPhp: <SiPhp />,
  SiPrisma: <SiPrisma />,
  SiAmazonaws: <FaAws />,
  SiDocker: <SiDocker />,
  SiKubernetes: <SiKubernetes />,
  SiGithub: <SiGithub />,
  SiPostgresql: <SiPostgresql />,
  SiMongodb: <SiMongodb />,
  SiMysql: <SiMysql />,
  SiGraphql: <SiGraphql />,
  SiAmazondynamodb: <SiAmazondynamodb />,
  MdApi: <TbApi />,
  TbBrandOauth: <TbBrandOauth />,
  SiPaypal: <FaCcPaypal />,
  SiStripe: <FaStripe />,
  TbAi: <TbAi />,
  SiOpenai: <SiOpenai />,
  SiGooglegemini: <SiGooglegemini />,
  SiTensorflow: <SiTensorflow />,
};
export const InfiniteMovingCards = ({
  skills,
  direction = "left",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  skills: {
    title: string;
    items: {}[];
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  });
  const [start, setStart] = useState(true);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-2 py-4 w-max flex-nowrap justify-center",
          start && "animate-scroll mx-auto",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {skills.map((group, idx) => (
          <li
            className="w-[200px] max-w-full relative light:text-black dark:text-white  text-center justify-center px-4 py-6 md:w-[350px]"
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
            }}
            key={idx}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ fontSize: "1rem", fontWeight: 300 }}
              >
                {group?.title}
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                gap={2}
                justifyContent={"center"}
              >
                {group.items.map((item: any, idx: number) => (
                  <Box key={idx}>
                    <Typography variant="h3" sx={{ fontSize: "2rem", mt: 3 }}>
                      {iconMap[item.icon]}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </li>
        ))}
      </ul>
    </div>
  );
};
