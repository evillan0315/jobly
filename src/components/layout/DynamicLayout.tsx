// components/Layout.tsx
import renderComponent from "@/lib/renderComponent";
// components/Layout.tsx
import React, { ReactNode, useEffect, useState } from "react";

import AppTheme from "@/shared-theme/AppTheme";

import BackgroundLinesSection from "../BackgroundLinesSection";

import FooterComponent from "../FooterComponent";
import CssBaseline from "@mui/material/CssBaseline";
//import { AppProvider } from "@toolpad/core/AppProvider";
//import createTheme from "@mui/material/styles/createTheme";
import LinearProgress from "@mui/material/LinearProgress";

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
    <AppTheme>
      <CssBaseline enableColorScheme />
      <main className="relative h-screen overflow-hidden">
        <BackgroundLinesSection />
        <div className="w-full relative overflow-auto">{children}</div>
        <FooterComponent />
        {renderComponent(layoutData.layout.footer)}
      </main>
    </AppTheme>
  );
};
export default DynamicLayout;
