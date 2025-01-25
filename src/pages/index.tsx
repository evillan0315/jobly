"use client";
import * as React from "react";
import { Container, CssBaseline, Divider } from "@mui/material";

import BackgroundLinesSection from "@/components/BackgroundLinesSection";

import { GetServerSideProps } from "next";
//import prisma from "@/lib/prisma";
import AppTheme from "@/shared-theme/AppTheme";
import FloatingNav from "@/components/ui/FloatingNav";
import navigationItems from "@/components/Navigation";
import BentoGridProject from "@/components/BentoGridProject";
import prisma from "@/lib/prisma";

const HomePage = () => {
  return (
    <AppTheme disableCustomTheme={false}>
      <CssBaseline enableColorScheme />
      <FloatingNav navItems={navigationItems} />

      <BackgroundLinesSection title={""} subtitle={""} />
      <Container>
        <h1>User Profile</h1>
      </Container>
      <BentoGridProject />

      <Divider
        sx={{
          pt: { xs: 4, sm: 8 },
          borderColor: "divider",
        }}
      />
    </AppTheme>
  );
};
HomePage.getLayout = (page: React.ReactNode) => page;
HomePage.requireAuth = false;

export default HomePage;
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.component.findUnique({
    where: {
      id: "80dd7458-95e0-4f06-98b3-6d1dd7c8465d",
    },
  });

  await prisma.$disconnect();

  // Serialize dates to ISO strings for JSON compatibility
  /*   const serializedProjects = projects.map((project) => ({
    ...project,
    startDate: project.startDate.toISOString(),
    endDate: project.endDate.toISOString(),
  })); */

  return {
    props: {
      components: data?.props,
    },
  };
};
