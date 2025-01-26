// components/Layout.tsx
import renderComponent from "@/lib/renderComponent";
// components/Layout.tsx
import React, { ReactNode, useEffect, useState } from "react";

import AppTheme from "@/shared-theme/AppTheme";

import BackgroundLinesSection from "../BackgroundLinesSection";

import SEOHead from "../SEOHead";
import { AppProvider } from "@toolpad/core/AppProvider";
import type { Navigation } from "@toolpad/core/AppProvider";
import theme from "@/theme";
import { signIn, signOut, useSession } from "next-auth/react";
import FooterComponent from "../FooterComponent";
import CssBaseline from "@mui/material/CssBaseline";
import {
  FaLaptopCode,
  FaQuoteRight,
  FaStar,
  FaUserCircle,
} from "react-icons/fa";

const DynamicLayout = ({ children }: { children?: ReactNode }) => {
  const [layoutData, setLayoutData] = useState<any>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch(
          "/api/layout?id=75beccb6-5a7d-405b-8d38-60eef9cad455"
        );
        const data = await response.json();
        setLayoutData(data);
      } catch (error) {
        console.error("Failed to fetch layout:", error);
      }
    };

    fetchLayout();
  }, []);

  if (!layoutData) {
    return <div>Loading layout...</div>; // Loading fallback
  }
  const NAVIGATION: Navigation = [
    {
      kind: "header",
      title: "Navigation",
    },
    {
      title: "About Me",
      segment: "/about",
      icon: <FaUserCircle />,
    },
    {
      title: "Projects",
      segment: "/projects",
      icon: <FaLaptopCode />,
    },
    {
      title: "Highlights",
      segment: "/highlights",
      icon: <FaStar />,
    },
    {
      title: "Testimonials",
      segment: "/testimonials",
      icon: <FaQuoteRight />,
    },
  ];

  const BRANDING = {
    title: "Eddie's Workspace",
    // logo: <Logo width={30} height={30} />,
  };

  const AUTHENTICATION = {
    signIn,
    signOut,
    error: "/auth/error", // Error code passed in query string as ?error=
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
  };
  return (
    <React.Fragment>
      <SEOHead />
      <AppProvider
        theme={theme}
        navigation={NAVIGATION}
        branding={BRANDING}
        session={session}
        authentication={AUTHENTICATION}
      >
        <AppTheme disableCustomTheme={false}>
          <CssBaseline enableColorScheme />
          <main className="relative h-screen overflow-hidden">
            <BackgroundLinesSection />
            <div className="w-full relative overflow-auto">{children}</div>
            <FooterComponent />
            {renderComponent(layoutData.layout.footer)}
          </main>
        </AppTheme>
      </AppProvider>
    </React.Fragment>
  );
};
export default DynamicLayout;
