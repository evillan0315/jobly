// lib/renderComponent.tsx
import React from "react";
import { Box, Typography, AppBar, Toolbar, Button } from "@mui/material";
//import CustomComponent from "@/components/CustomComponent";

const renderComponent = (component: any) => {
  console.log(component);
  if (!component) return null;

  switch (component.type) {
    case "box":
      return (
        <Box className={component.className}>
          {component.children?.map((child: any) => renderComponent(child))}
        </Box>
      );
    case "typography":
      return (
        <Typography variant={component.variant} className={component.className}>
          {component.text}
        </Typography>
      );
    case "appbar":
      return (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">{component.title}</Typography>
            {component.buttons?.map((button: any, index: number) => (
              <Button key={index} onClick={() => console.log(button.action)}>
                {button.text}
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      );

    default:
      return null;
  }
};

export default renderComponent;
