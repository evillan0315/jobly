"use client";
import React from "react";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  projectLink?: string;
  contactLink?: string;
  image?: string;
  reverse?: boolean;
  Component?: React.ElementType;
}
const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "100%",
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.cssVariables || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.cssVariables || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundImage: `url(${
    process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
  }/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
    backgroundImage: `url(${
      process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
    }/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.cssVariables || theme).palette.grey[700],
  }),
}));
const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  Component,
}) => {
  const spTitle = title.split(".");
  return (
    <div className="z-10 relative">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",

          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "80%" }, my: 2 }}
        >
          {spTitle.map((t, i) => (
            <div key={i}>
              <Typography variant="h1">{t}</Typography>
            </div>
          ))}
        </Stack>
        <Typography variant="body1">{subtitle}</Typography>
        {Component ? <Component /> : <StyledBox />}
      </Container>
    </div>
  );
};

export default HeroSection;
