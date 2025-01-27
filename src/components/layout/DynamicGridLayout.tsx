"use client";

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { gridLayoutType } from "@/types/types";
const gridData = {
  type: "grid",
  columns: [
    {
      column: 1,
      rows: [{ row: 1, content: "Row 1 Content", type: "cell" }],
    },
    {
      column: 2,
      rows: [
        { row: 1, content: "Row 1 Content", type: "cell" },
        { row: 2, content: "Row 2 Content", type: "cell" },
        { row: 3, content: "Row 3 Content", type: "cell" },
        { row: 4, content: "Row 4 Content", type: "cell" },
      ],
    },
    {
      column: 3,
      rows: [
        { row: 1, content: "Row 1 Content", type: "cell" },
        { row: 2, content: "Row 2 Content", type: "cell" },
      ],
    },
    {
      column: 4,
      sw: { borderRadius: 1, flexGrow: 1 },
      rows: [
        { row: 1, content: "Row 1 Content", type: "cell" },
        { row: 2, content: "Row 2 Content", type: "cell" },
        {
          row: 3,
          content: "Row 3 Content",
          type: "cell",
        },
      ],
    },
  ],
};

interface DynamicGridLayoutProps {
  data?: gridLayoutType;
}
const DynamicGridLayout: React.FC<DynamicGridLayoutProps> = ({ data }) => {
  console.log(data);
  const [grid, setGrid] = useState<gridLayoutType>(gridData);
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch(`/api/layout}`);
        const datares = await response.json();
        console.log(datares);
        //if (!data)
        setGrid(gridData);
        //setGrid(data);
      } catch (error) {
        console.error("Failed to fetch layout:", error);
      }
    };
    fetchLayout();
  }, []);
  return (
    <Grid
      container
      direction="column"
      spacing={2}
      sx={{
        padding: 2,
        height: "100vh",
      }}
    >
      {grid?.columns.map((column, colIndex) => (
        <Box key={`column-${colIndex}`} component="div" width="100%">
          <Grid container spacing={2} direction="row" sx={{}}>
            {column.rows.map((row, rowIndex) => (
              <Grid
                key={`column-${colIndex}-row-${rowIndex}`}
                sx={{ display: "flex", justifyContent: "center", flex: 1 }}
              >
                <Box width="100%">
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={100}
                    sx={row?.sw}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Grid>
  );
};

export default DynamicGridLayout;
