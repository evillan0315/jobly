"use client";

import React, { ReactNode, useEffect, useState } from "react";
import AppTheme from "@/shared-theme/AppTheme";
import FooterComponent from "../FooterComponent";
import CssBaseline from "@mui/material/CssBaseline";
import LinearProgress from "@mui/material/LinearProgress";
import { Spotlight } from "../ui/spotlightv2";

const DynamicLayout = ({ children }: { children?: ReactNode }) => {
  const [layoutData, setLayoutData] = useState<any>(null);

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
    return <LinearProgress />;
  }

  return (
    <AppTheme disableCustomTheme={false}>
      <CssBaseline enableColorScheme />
      <main className="h-screen w-full  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
        {/*     <BackgroundLinesSection /> */}
        <Spotlight />

        <div className=" z-20 w-full overflow-auto">{children}</div>
        <FooterComponent />
      </main>
    </AppTheme>
  );
};
export default DynamicLayout;
