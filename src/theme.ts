"use client";

import localFont from "next/font/local";
import { createTheme } from "@mui/material/styles";
import { red, blueGrey, cyan } from "@mui/material/colors";
import { green } from "./shared-theme/themePrimitives";

const primary = blueGrey[500];
const secondary = blueGrey[200]; // #ff4081

export const Montserrat = localFont({
  src: [
    {
      path: "../public/fonts/Montserrat/static/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat/static/Montserrat-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat/static/Montserrat-ExtraLight.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat/static/Montserrat-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat/static/Montserrat-ExtraBold.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/Montserrat/static/Montserrat-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Montserrat/static/Montserrat-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],

  preload: true, // Preload for optimized performance
  display: "swap", // Use the font with "swap" display strategy
  variable: "--font-montserrat", // Optional CSS variable for the font
});

export const Roboto = localFont({
  src: [
    {
      path: "../public/fonts/Roboto/static/Roboto-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto/static/Roboto-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Roboto/static/Roboto-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Roboto/static/Roboto-BoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],

  preload: true, // Preload for optimized performance
  display: "swap", // Use the font with "swap" display strategy
  variable: "--font-roboto", // Optional CSS variable for the font
});

export const DM_Sans = localFont({
  src: [
    {
      path: "../public/fonts/DM_Sans/DMSans-Italic-VariableFont_opsz,wght.ttf",
      style: "italic",
    },
    {
      path: "../public/fonts/DM_Sans/DMSans-VariableFont_opsz,wght.ttf",
      weight: "700",
      style: "normal",
    },
  ],

  preload: true, // Preload for optimized performance
  display: "swap", // Use the font with "swap" display strategy
  variable: "--font-dmsans", // Optional CSS variable for the font
});
export const Caveat = localFont({
  src: [
    {
      path: "../public/fonts/Caveat/Caveat-VariableFont_wght.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Caveat/Caveat-VariableFont_wght.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  preload: true, // Preload for optimized performance
  display: "swap", // Use the font with "swap" display strategy
  variable: "--font-caveat", // Optional CSS variable for the font
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
    fontFamily: `${Montserrat.style.fontFamily}, ${DM_Sans.style.fontFamily}}, sans-serif`,
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
