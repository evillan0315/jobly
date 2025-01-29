"use client";
import * as React from "react";
//import prisma from "@/lib/prisma";
import BentoGridProject from "@/components/BentoGridProject";
import { InfiniteMovingCards } from "@/components/InfiniMovingCards";
import { SkillsComponentData } from "@/lib/components";
import HeroSectionBackground from "@/components/HeroSectionBackground";
import TechnologySkillSpec from "@/components/portfolio/TechnologySkills";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
const HomePage = () => {
  return (
    <Container className="relative z-10 h-screen w-full">
      <Box sx={{ py: 6 }}>
        <HeroSectionBackground />
      </Box>
      <Divider />
      <Box sx={{ py: 6 }}>
        <TechnologySkillSpec />
        <InfiniteMovingCards
          skills={SkillsComponentData.props}
          direction="left"
          speed="slow"
        />
      </Box>

      <BentoGridProject />
    </Container>
  );
};
HomePage.requireAuth = false;
export default HomePage;
/* export async function getServerSideProps() {
  const data = await prisma.page.findFirst({
    where: {
      default: true,
    },
  });

  await prisma.$disconnect();
  if (!data) {
    console.log(data);
  }
  const serialize = { ...data, createdOn: data?.createdOn.toISOString() };
  return {
    props: {
      page: serialize,
    },
  };
} */
