import React from "react";
import { TypewriterEffect } from "./ui/typewriter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TextGenerateEffect } from "./ui/text-generate";
import { iconMap } from "./InfiniMovingCards";

export function HeroSectionBackground() {
  const words = [
    {
      text: "Build",
      className: "text-red-700 dark:text-orange-500",
    },
    {
      text: "awesome",
    },
    {
      text: "applications",
    },
    {
      text: "with",
    },
    {
      text: "Eddie!",
      className: "text-cyan-700 dark:text-cyan-500",
    },
  ];
  const wordsGen = `Eddie Villanueva, a seasoned software engineer with over 12 years of experience in full-stack development, cloud engineering, and DevOps, is seeking to establish a professional online portfolio. 
 Dedicated to driving innovation, streamlining workflows, and mentoring teams to exceed business objectives.

`;
  return (
    <>
      <Box component="section" sx={{ my: 8, py: 8, px: 6 }}>
        <TypewriterEffect words={words} />
        <Box>
          <TextGenerateEffect words={wordsGen} />
        </Box>
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          direction="row"
          gap={2}
          justifyContent={"center"}
          sx={{ mt: 6, w: "100%" }}
        >
          <Button className="w-40 h-10 rounded-xl bg-cyan-700 border dark:border-white border-transparent text-white text-lg font-bold">
            View Projects
          </Button>
          <Button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-lg">
            Get in Touch
          </Button>
        </Grid>
        <Stack
          direction="row"
          gap={"8"}
          spacing="2"
          alignItems={"center"}
          justifyContent={"center"}
          sx={{ color: "white", mt: 6 }}
        >
          <Box className="text-7xl p-4 text-orange-300">
            {iconMap["SiNodedotjs"]}
          </Box>
          <Box className="text-7xl p-4  text-pink-300">
            {iconMap["SiTypescript"]}
          </Box>
          <Box className="text-7xl p-4 text-red-300">{iconMap["SiPython"]}</Box>
          <Box className="text-7xl p-4 text-purple-300">
            {iconMap["SiReact"]}
          </Box>
        </Stack>
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          justifyItems={"center"}
          textAlign={"center"}
          sx={{ color: "white", width: "100%" }}
        >
          <Typography variant="h5" className="text-center">
            Proficient in Node.JS, Typescript, Python, and React
          </Typography>
        </Box>
      </Box>
    </>
  );
}
