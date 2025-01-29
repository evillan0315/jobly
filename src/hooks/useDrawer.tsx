import { DrawerProps } from "@mui/material";
import { useState, useCallback } from "react";

const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<DrawerProps>();

  const openDrawer = useCallback(() => setIsOpen(true), []);
  const closeDrawer = useCallback(() => setIsOpen(false), []);
  const toggleDrawer = useCallback(() => setIsOpen((prev) => !prev), []);

  const updateContent = useCallback((newContent: DrawerProps) => {
    setContent(newContent);
    setIsOpen(true); // Open drawer automatically with new content
  }, []);

  return {
    isOpen,
    content,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    updateContent,
  };
};

export default useDrawer;
