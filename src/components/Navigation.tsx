"use client";
import React from "react";

import {
  FaUserCircle,
  FaLaptopCode,
  FaStar,
  FaQuoteRight,
} from "react-icons/fa";

// Define the interface for navigation items
interface NavigationItem {
  name: string;
  link: string;
  icon: React.ReactNode; // This accommodates any React node, including icons
}

// Create an array of navigation items
const navigationItems: NavigationItem[] = [
  {
    name: "About Me",
    link: "/about",
    icon: <FaUserCircle />,
  },
  {
    name: "Projects",
    link: "/projects",
    icon: <FaLaptopCode />,
  },
  {
    name: "Highlights",
    link: "/highlights",
    icon: <FaStar />,
  },
  {
    name: "Testimonials",
    link: "/testimonials",
    icon: <FaQuoteRight />,
  },
  /* Uncomment if needed
  {
    name: "Blogs",
    link: "/blogs",
    icon: <FaBlog />,
  },
  {
    name: "Resume",
    link: "/resume",
    icon: <FaFileAlt />,
  },
  */
];

export default navigationItems;

// Example: You can map over `navigationItems` in a navigation component
