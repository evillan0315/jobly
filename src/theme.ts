"use client";
import { Roboto, DM_Sans } from "next/font/google";

import { createTheme } from "@mui/material/styles";

import { red, blueGrey, cyan } from "@mui/material/colors";
import { green } from "./shared-theme/themePrimitives";

const primary = blueGrey[500];

const secondary = blueGrey[200]; // #ff4081

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: true, // Preload for optimized performance
  variable: "--font-roboto",
});
export const dmSans = DM_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  preload: true, // Preload for optimized performance
  display: "swap",
  variable: "--font-dmsans",
});

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: { light: true, dark: true },
  palette: {
    mode: "dark",
    primary: {
      main: primary,
      light: "cyan",
      dark: "#004ba0",
      contrastText: "#fff",
    },
    secondary: {
      main: secondary,
      light: "#ff5c8d",
      dark: "#9a0036",
      contrastText: "#fff",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: cyan.A700,
    },
    success: {
      main: green[700],
    },
    text: {
      primary: "#333",
      secondary: "#666",
    },
  },
  typography: {
    fontFamily: `${roboto.style.fontFamily}, ${dmSans.style.fontFamily}}, sans-serif`,
    h1: {
      fontSize: "2.5rem",
      fontWeight: 500,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: ".9rem",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
    },
  },
  spacing: 8, // Default spacing unit is 8px
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {},
    MuiAppBar: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          //marginBottom: "16px", // Add global margin bottom for all TextField components
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          // marginBottom: "16px", // Add global margin bottom for all FormControl components
        },
      },
    },
  },
});
export default theme;
