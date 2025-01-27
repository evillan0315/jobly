import { Section } from "@/types/types";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { IconPencilPlus } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import {
  ModalContent,
  ModalProvider,
  ModalTrigger,
  ModalBody,
  ModalFooter,
} from "./ui/animated-modal";
import { toast, ToastContainer } from "react-toastify";
//import CodeEditor from "./codeMirror";
import AceCodeEditor from "./codeMirror";

type Props = {
  pageId: string;
};
const PageSection: React.FC<Props> = ({ pageId }) => {
  const d = {
    id: "",
    name: "",
    props: {},
    pageId: pageId,
  };
  const [formData, setFormData] = useState<Section>(d);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  console.log(errors);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSave = (code: string) => {
    console.log("Saved Code:", code); // You can send this code to your API or database
    setFormData({
      ...formData,
      props: code,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(`/api/section`, {
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
        toast.success(data.message || "Section added successfully!");
        setFormData(d);
        setErrors({}); // Clear errors

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
  useEffect(() => {
    const fetchLayout = async () => {
      try {
        const response = await fetch(`/api/section?pageId=${pageId}`);
        const data = await response.json();
        console.log(data, "result pagesection");
        setPageData(data);
      } catch (error) {
        console.error("Failed to fetch layout:", error);
      }
    };

    fetchLayout();
  }, [pageId]);

  if (!pageData) {
    return <LinearProgress />;
  }
  function openModal(section: Section) {
    if (section.props) {
      console.log(JSON.parse(section.props as any), "section");
    }
  }
  const FormModal = () => {
    return (
      <>
        <ModalTrigger>
          <IconPencilPlus />
        </ModalTrigger>
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
                id="sectionName"
                label="Section Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              <AceCodeEditor
                initialCode={`${formData.props}`}
                mode={"json"}
                onSave={handleSave}
              />
              {/* <TextField
                margin="normal"
                required
                fullWidth
                id="sectionProps"
                label="Props"
                name="props"
                value={formData.props}
                onChange={handleChange}
              /> */}
            </form>
          </ModalContent>
          <ModalFooter className="w-full">
            <Button loading={loading} onClick={(e) => handleSubmit(e)}>
              Add
            </Button>
          </ModalFooter>
        </ModalBody>
      </>
    );
  };
  return (
    <Container className="py-10">
      <ToastContainer />
      <ModalProvider>
        <FormModal />
        <Stack direction={"row"} spacing={2}>
          {pageData?.map((section: Section, i: number) => (
            <>
              <Box component="div" key={i}>
                {section.name}
              </Box>

              <Button onClick={() => openModal(section)}>
                <IconPencilPlus />
              </Button>
            </>
          ))}
        </Stack>
      </ModalProvider>
    </Container>
  );
};

export default PageSection;
