"use client";

import React, { ReactNode } from "react";
import AppTheme from "@/shared-theme/AppTheme";
import FooterComponent from "../FooterComponent";
import CssBaseline from "@mui/material/CssBaseline";
//import LinearProgress from "@mui/material/LinearProgress";
import { Spotlight } from "../ui/spotlightv2";

import BackgroundLinesSection from "../BackgroundLinesSection";
import Box from "@mui/material/Box";
import { ModeSwitcher } from "@/pages/_app";

//import useDrawer from "@/hooks/useDrawer";

const DynamicLayout = ({
  children,
}: {
  children?: ReactNode;
  drawer?: any;
}) => {
  //const [layoutData, setLayoutData] = useState<any>(null);

  /* useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch(
          "/api/layout?id=75beccb6-5a7d-405b-8d38-60eef9cad455"
        );
        const data = await response.json();
        //handleOpenDrawer();
        setLayoutData(data);
      } catch (error) {
        console.error("Failed to fetch layout:", error);
      }
    };

    fetchLayout();
  }, [setLayoutData]); */

  /*   if (!layoutData) {
    return <LinearProgress />;
  } */

  return (
    <AppTheme disableCustomTheme={false}>
      <CssBaseline enableColorScheme />
      <Box component="header" className="w-full fixed h-30 top-0 left-0 z-60">
        <ModeSwitcher />
      </Box>
      <Box
        component="div"
        className="h-screen w-full  bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden"
      >
        <Box component="div" className=" z-20 w-full  h-screen overflow-auto">
          <Spotlight />
          <BackgroundLinesSection />
          {children}
        </Box>
      </Box>
      <Box component="footer" className="fixed bottom-0 right-0 left-o mx-auto">
        <FooterComponent />
      </Box>
    </AppTheme>
  );
};
export default DynamicLayout;
