"use client";
import * as React from "react";

//import prisma from "@/lib/prisma";

//import BentoGridProject from "@/components/BentoGridProject";
import prisma from "@/lib/prisma";
import AnimatedModal from "@/components/AnimatedModal";
import { ModalProvider, ModalTrigger } from "@/components/ui/animated-modal";
import HeroSection from "@/components/HeroSection";
import { Container } from "@mui/material";
import BentoGridProject from "@/components/BentoGridProject";
import { AppProvider } from "@toolpad/core/AppProvider";
import { Page } from "@/types/types";
import PageSection from "@/components/PageSection";
import DynamicGridLayout from "@/components/layout/DynamicGridLayout";

//import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const AniModal = () => {
  return (
    <ModalProvider>
      <ModalTrigger>Get In Touch</ModalTrigger>

      <AnimatedModal />
    </ModalProvider>
  );
};
const HomePage = ({ page }: { page: Page }) => {
  console.log(page.id, "test");

  return (
    <AppProvider>
      <Container className="relative z-10 h-screen">
        <DynamicGridLayout />
        <PageSection pageId={page.id} />

        <HeroSection
          title={page?.name}
          subtitle={page?.content}
          Component={AniModal}
        />
        <BentoGridProject />
      </Container>
    </AppProvider>
  );
};

export default HomePage;
export async function getServerSideProps() {
  const data = await prisma.page.findFirst({
    where: {
      default: true,
    },
    include: {
      //Section: true,
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
}
