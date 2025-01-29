"use client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { iconMap } from "../InfiniMovingCards";

const TechnologySkillSpec = () => {
  return (
    <Grid
      container
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" className="text-center pt-4">
        I work and specialize in these technologies
      </Typography>
      <Stack
        direction="row"
        gap={"8"}
        spacing="2"
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ color: "white", mt: 3, textAlign: "center" }}
      >
        <Box className="text-4xl p-4 text-orange-300">
          {iconMap["SiNodedotjs"]}
          <Typography variant="body1" className="text-center">
            <b>Node.JS</b>
          </Typography>
        </Box>

        <Box className="text-4xl p-4 text-pink-300">
          {iconMap["SiTypescript"]}
          <Typography variant="body1" className="text-center">
            Typescript
          </Typography>
        </Box>

        <Box className="text-4xl p-4 text-red-300">
          {iconMap["SiPython"]}
          <Typography variant="body1" className="text-center">
            Python
          </Typography>
        </Box>

        <Box className="text-4xl p-4 text-purple-300">
          {iconMap["SiReact"]}
          <Typography variant="body1" className="text-center">
            <b>React</b>
          </Typography>
        </Box>

        <Box className="text-4xl p-4 text-yellow-300">
          {iconMap["SiNextdotjs"]}
          <Typography variant="body1" className="text-center">
            Next.JS
          </Typography>
        </Box>

        <Box className="text-4xl p-4 text-cyan-300">
          {iconMap["SiMaterialui"]}
          <Typography variant="body1" className="text-center">
            Material-UI
          </Typography>
        </Box>

        <Box className="text-4xl p-4 text-blue-300">
          {iconMap["SiAmazonaws"]}
          <Typography variant="body1" className="text-center">
            AWS
          </Typography>
        </Box>

        <Box className="text-4xl p-4 text-green-300">
          {iconMap["SiPostgresql"]}
          <Typography variant="body1" className="text-center">
            <b>PostgreSQL</b>
          </Typography>
        </Box>

        <Box className="text-4xl p-4 text-maroon-300">
          {iconMap["SiPrisma"]}
          <Typography variant="body1" className="text-center">
            Prisma
          </Typography>
        </Box>
      </Stack>

      <Typography variant="body2" className="text-center">
        Proficient in Node.js, Typescript, Python, and React, with a proven
        ability to deliver robust and scalable solutions.
      </Typography>
    </Grid>
  );
};

export default TechnologySkillSpec;
