"use client";
import * as React from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
//import prisma from "@/lib/prisma";

//import BentoGridProject from "@/components/BentoGridProject";
import prisma from "@/lib/prisma";
import AnimatedModal from "@/components/AnimatedModal";
import { ModalProvider, ModalTrigger } from "@/components/ui/animated-modal";
import HeroSection from "@/components/HeroSection";
import { Container } from "@mui/material";
import BentoGridProject from "@/components/BentoGridProject";
//import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const AniModal = () => {
  return (
    <ModalProvider>
      <ModalTrigger>Get In Touch</ModalTrigger>

      <AnimatedModal />
    </ModalProvider>
  );
};
const HomePage = ({
  props,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(props);
  return (
    <Container className="relative z-10 h-screen">
      <HeroSection
        title={"Create.Read.Update.Delete."}
        subtitle={"hello"}
        Component={AniModal}
      />
      <BentoGridProject />
    </Container>
  );
};

export default HomePage;
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
