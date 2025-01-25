"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalProvider,
  ModalTrigger,
  useModal,
} from "./ui/animated-modal";
import { TextField, Button, Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { Contact } from "../types/models";
import { DiReact } from "react-icons/di";
import { RiNextjsLine } from "react-icons/ri";

type AnimatedModalProps = object;
const AnimatedModal: React.FC<AnimatedModalProps> = ({}) => {
  const d = {
    name: "",
    email: "",
    message: "",
    error: false || undefined,
  };
  const [formData, setFormData] = useState<Contact>(d);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Validate form data
    /*  const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    } */
    try {
      const res = await fetch(`/api/inquiry/create`, {
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
        setIsOpen(false);
        setLoading(false);
      } else {
        toast.error(data.error || "Failed to send message");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };
  const FooterComponent = () => {
    const { open, setOpen } = useModal();
    setIsOpen(open);
    return (
      <ModalProvider>
        <Button fullWidth variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          loading={loading}
          fullWidth
          variant="contained"
          onClick={handleSubmit}
        >
          Send me a message
        </Button>
      </ModalProvider>
    );
  };
  return (
    <div className="flex items-center space-x-2">
      <ToastContainer />

      <Modal>
        <ModalTrigger className="w-full">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{ pt: 2, width: { xs: "100%", sm: "350px" } }}
          >
            {/* <ButtonHoverBorderGradient
              icon={"project"}
              label="See My Work"
              className="flex items-center space-x-2"
            />
            <ButtonHoverBorderGradient
              icon={"email"}
              label="Hire me now"
              className="flex items-center space-x-2"
            /> */}
            Send me a message
          </Stack>
        </ModalTrigger>
        <ModalBody className="flex items-center justify-start w-full">
          <ModalContent>
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
              {/* <div className="flex items-center justify-center">
                  <VacationIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    69 visiting spots
                  </span>
                </div>
                <div className="flex  items-center justify-center">
                  <FoodIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Good food everyday
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <MicIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Open Mic
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <ParachuteIcon className="mr-1 text-neutral-700 dark:text-neutral-300 h-4 w-4" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Paragliding
                  </span>
                </div> */}
            </div>
          </ModalContent>
          <ModalFooter className="w-full my-3">
            <FooterComponent />
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
};
export default AnimatedModal;
