import React, { useState } from "react";
import { Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import IconComponent from "../IconComponent";
const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to toggle the drawer */}
      <Button variant="outlined" color="primary" onClick={toggleDrawer}>
        {isOpen
          ? `${(<IconComponent iconName="close" size={20} />)}`
          : `${(<IconComponent iconName="open" size={20} />)}`}
      </Button>

      {/* Drawer with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }} // Start off-screen
            animate={{ x: 0 }} // Animate to visible
            exit={{ x: "-100%" }} // Animate back off-screen
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "450px",
              height: "100vh",
              background: "#ffffff",
              boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
              padding: "1rem",
            }}
          >
            {/* Drawer Content */}
            <h3>Drawer Menu</h3>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close the drawer when clicking outside */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
          onClick={toggleDrawer}
        ></motion.div>
      )}
    </div>
  );
};

export default Drawer;
