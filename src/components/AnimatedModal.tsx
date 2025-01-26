"use client";
import React, { useState } from "react";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  useModal,
} from "./ui/animated-modal";
import { TextField, Typography, Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Contact } from "../types/models";
import { DiReact } from "react-icons/di";
import { RiNextjsLine } from "react-icons/ri";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

type AnimatedModalProps = {
  triggerText?: string;
};
const AnimatedModal: React.FC<AnimatedModalProps> = ({ triggerText }) => {
  const d = {
    name: "",
    email: "",
    message: "",
    error: undefined,
  };
  console.log(triggerText);
  const [formData, setFormData] = useState<Contact>(d);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setOpen } = useModal();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/inquiry`, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 201) {
        toast.success(data.message || "Message sent successfully!");
        setFormData(d);
        setErrors({}); // Clear errors
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(data.error || "Failed to send message");
      }
    } catch (error: any) {
      toast.error(error || "Error");
    } finally {
      setLoading(false);
    }
  };
  const FooterComponent = ({
    loading,
    handleButtonSubmit,
  }: {
    loading: boolean;
    handleButtonSubmit: () => Promise<void>;
  }) => {
    const { setOpen } = useModal(); // Get the `setOpen` function from the modal context

    return (
      <Stack direction={"row"} spacing={2} gap={2}>
        <HoverBorderGradient>
          <button
            onClick={() => setOpen(false)} // Close the modal on "Cancel"
          >
            Cancel
          </button>
        </HoverBorderGradient>
        <HoverBorderGradient>
          <button
            onClick={() => handleButtonSubmit()} // Pass the event to the handler
            disabled={loading} // Disable button while loading
          >
            Send
          </button>
        </HoverBorderGradient>
      </Stack>
    );
  };

  return (
    <div>
      <ToastContainer />

      <ModalBody className="flex items-center justify-start w-full">
        <ModalContent>
          {loading && <Typography>loading...</Typography>}
          <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
            Hire me now
          </h4>
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactName"
              label="Name"
              name="name"
              value={formData.name}
              autoComplete="name"
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactEmail"
              label="Email"
              name="email"
              value={formData.email}
              autoComplete="email"
              error={!!errors.email}
              helperText={errors.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="contactMessage"
              label="Message"
              name="message"
              value={formData.message}
              error={!!errors.message}
              helperText={errors.message}
              onChange={handleChange}
              multiline
              sx={{
                pb: 2,
              }}
            />
          </form>
          <div className="py-10 flex flex-wrap gap-x-4 gap-y-6 items-start justify-start max-w-sm mx-auto">
            <div className="flex  items-center justify-center">
              <DiReact className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                React.js
              </span>
            </div>
            <div className="flex items-center justify-center">
              <RiNextjsLine className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
              <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                Next.js
              </span>
            </div>
          </div>
        </ModalContent>
        <ModalFooter className="w-full">
          <FooterComponent
            loading={loading}
            handleButtonSubmit={handleSubmit}
          />
        </ModalFooter>
      </ModalBody>
    </div>
  );
};
export default AnimatedModal;
