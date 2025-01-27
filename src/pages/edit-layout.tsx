"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import ColorModeSelect from "@/shared-theme/ColorModeSelect";

const EditLayoutScreen = () => {
  const [idata, setData] = useState<any>(null);
  const [layout, setLayout] = useState<any>(null); // Holds the fetched layout JSON
  const [loading, setLoading] = useState(true); // Loading state
  const [saving, setSaving] = useState(false); // Saving state

  // Fetch layout from API
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch(
          "/api/layout?id=75beccb6-5a7d-405b-8d38-60eef9cad455"
        ); // Replace with your API endpoint
        const data = await response.json();
        console.log(data.layout.layout);
        setData(data);
        setLayout(data.layout);
      } catch (error) {
        console.error("Failed to fetch layout:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLayout();
  }, []);

  // Handle field change
  const handleFieldChange = (
    sectionId: number,
    field: string,
    value: string
  ) => {
    const updatedSections = layout.sections.map((section: any) =>
      section.id === sectionId
        ? { ...section, content: { ...section.content, [field]: value } }
        : section
    );
    setLayout({ ...layout, sections: updatedSections });
  };

  // Handle saving the updated layout
  const handleSave = async () => {
    setSaving(true);
    const ddata = {
      id: idata.id,
      layout: layout,
    };
    try {
      await axios.put("/api/layout", ddata); // Replace with your save endpoint
      alert("Layout saved successfully!");
    } catch (error) {
      console.error("Failed to save layout:", error);
      alert("Failed to save layout.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Typography>Loading layout...</Typography>;
  }

  return (
    <Container className="relative z-10 h-screen">
      <ColorModeSelect />
      <Box sx={{ padding: 4 }} component={"form"}>
        <Typography variant="h4" gutterBottom>
          Edit Layout
        </Typography>

        {/* Header Section */}
        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6">Header</Typography>
            <TextField
              id="header-title"
              label="Title"
              value={layout.header.title}
              onChange={(e) =>
                setLayout({
                  ...layout,
                  header: { ...layout.header, title: e.target.value },
                })
              }
            />
            <TextField
              fullWidth
              label="Title"
              value={layout.header.title}
              onChange={(e) =>
                setLayout({
                  ...layout,
                  header: { ...layout.header, title: e.target.value },
                })
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Subtitle"
              value={layout.header.subtitle}
              onChange={(e) =>
                setLayout({
                  ...layout,
                  header: { ...layout.header, subtitle: e.target.value },
                })
              }
            />
          </CardContent>
        </Card>
        {/* Dynamic Sections */}
        <Grid container direction={"row"} spacing={2}>
          {layout.sections.map((section: any) => (
            <>
              <Grid size={6}>
                <Card key={section.id} sx={{ marginBottom: 2, height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6">
                      {section.type.toUpperCase()}
                    </Typography>

                    {/* Render fields dynamically based on section type */}
                    {section.type === "hero" && (
                      <>
                        <TextField
                          fullWidth
                          label="Headline"
                          value={section.content.headline}
                          onChange={(e) =>
                            handleFieldChange(
                              section.id,
                              "headline",
                              e.target.value
                            )
                          }
                          sx={{ marginBottom: 2 }}
                        />
                        <TextField
                          fullWidth
                          label="Description"
                          value={section.content.description}
                          multiline
                          sx={{
                            height: "100%",
                          }}
                          variant="outlined"
                          rows={4}
                          onChange={(e) =>
                            handleFieldChange(
                              section.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </>
                    )}

                    {section.type === "features" &&
                      section.content.items.map((item: any, index: number) => (
                        <Box key={item.id} sx={{ marginBottom: 2 }}>
                          <TextField
                            fullWidth
                            label={`Feature ${index + 1} Title`}
                            value={item.title}
                            onChange={(e) => {
                              const updatedItems = section.content.items.map(
                                (i: any) =>
                                  i.id === item.id
                                    ? { ...i, title: e.target.value }
                                    : i
                              );
                              handleFieldChange(
                                section.id,
                                "items",
                                updatedItems
                              );
                            }}
                            sx={{ marginBottom: 1 }}
                          />
                          <TextField
                            fullWidth
                            label={`Feature ${index + 1} Description`}
                            value={item.description}
                            multiline
                            rows={4}
                            defaultValue="Default Value"
                            onChange={(e) => {
                              const updatedItems = section.content.items.map(
                                (i: any) =>
                                  i.id === item.id
                                    ? { ...i, description: e.target.value }
                                    : i
                              );
                              handleFieldChange(
                                section.id,
                                "items",
                                updatedItems
                              );
                            }}
                          />
                        </Box>
                      ))}
                  </CardContent>
                </Card>
              </Grid>
            </>
          ))}
        </Grid>
        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={saving}
          sx={{ marginTop: 2 }}
        >
          {saving ? "Saving..." : "Save Layout"}
        </Button>
      </Box>
    </Container>
  );
};
EditLayoutScreen.getDefaultLayout = (page: React.ReactNode) => page;
EditLayoutScreen.requireAuth = true;
export default EditLayoutScreen;
