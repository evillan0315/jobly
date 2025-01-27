import React from "react";
import { TypewriterEffect } from "./ui/typewriter";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { TextGenerateEffect } from "./ui/text-generate";
import { iconMap } from "./InfiniMovingCards";
import { Caveat, DM_Sans } from "@/theme";

export function HeroSectionBackground() {
  const words = [
    {
      text: "Build",
      className: `${Caveat.className} text-maroon-900 dark:text-maroon-500 text-2xl sm:text-4xl md:text-7xl`,
    },
    {
      text: "awesome",
      className: "font-light",
    },
    {
      text: "applications",
      className: `${DM_Sans.className} text-orange-700 dark:text-maroon-500`,
    },
    {
      text: "with",
      className: "font-light",
    },
    {
      text: "Eddie!",
      className: `${Caveat.className} text-maroon-900 dark:text-maroon-500 text-2xl sm:text-4xl md:text-7xl`,
    },
  ];
  const wordsGen = `Eddie Villanueva, a seasoned software engineer with over 12 years of experience in full-stack development, cloud engineering, and DevOps, is seeking to establish a professional online portfolio. 
 Dedicated to driving innovation, streamlining workflows, and mentoring teams to exceed business objectives.
`;
  return (
    <>
      <Box
        component="section"
        sx={{
          my: 4,
          py: 4,
          px: 3,
          md: {
            my: 8,
            py: 8,
            px: 6,
          },
        }}
      >
        <TypewriterEffect className="md:text-4xl" words={words} />
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
          <Button
            color={"primary"}
            className={`${DM_Sans.className} text-lg rounded-xl  text-white font-bold shadow shadow-neutral-950`}
          >
            View Projects
          </Button>
          <Button
            variant="outlined"
            className={`${DM_Sans.className} text-lg rounded-xl  text-white font-bold shadow shadow-neutral-950`}
          >
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
          <Box className="text-5xl p-4 text-orange-300">
            {iconMap["SiNodedotjs"]}
          </Box>
          <Box className="text-5xl p-4  text-pink-300">
            {iconMap["SiTypescript"]}
          </Box>
          <Box className="text-5xl p-4 text-red-300">{iconMap["SiPython"]}</Box>
          <Box className="text-5xl p-4 text-purple-300">
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
          <Typography variant="body1" className="text-center">
            Proficient in <b>Node.JS</b>, Typescript, Python, and React
          </Typography>
        </Box>
      </Box>
    </>
  );
}
