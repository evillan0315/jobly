"use client";
import * as React from "react";
import { CssBaseline, Divider } from "@mui/material";
import BackgroundLinesSection from "@/components/BackgroundLinesSection";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
//import prisma from "@/lib/prisma";
import AppTheme from "@/shared-theme/AppTheme";
import FloatingNav from "@/components/ui/FloatingNav";
import navigationItems from "@/components/Navigation";
import BentoGridProject from "@/components/BentoGridProject";
import prisma from "@/lib/prisma";
import AnimatedModal from "@/components/AnimatedModal";
import { ModalProvider, ModalTrigger } from "@/components/ui/animated-modal";
import HeroSection from "@/components/HeroSection";

const AniModal = () => {
  return (
    <ModalProvider>
      <ModalTrigger>Get In Touch</ModalTrigger>

      <AnimatedModal />
    </ModalProvider>
  );
};
const AdminPage = ({
  props,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(props);
  return (
    <AppTheme disableCustomTheme={false}>
      <CssBaseline enableColorScheme />
      <FloatingNav navItems={navigationItems} />
      <BackgroundLinesSection />
      <div className="relative z-10 h-screen">
        <HeroSection
          title={"Create.Read.Update.Delete."}
          subtitle={"hello"}
          Component={AniModal}
        />
        <BentoGridProject />
        <Divider />
      </div>
    </AppTheme>
  );
};

export default AdminPage;
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await prisma.component.findUnique({
    where: {
      id: "80dd7458-95e0-4f06-98b3-6d1dd7c8465d",
    },
  });
  console.log();
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
