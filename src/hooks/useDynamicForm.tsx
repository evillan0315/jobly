import { DynamicFormResponse } from "@/types/form";
import { useState, useEffect } from "react";

export default function useDynamicForm(model: string) {
  const [form, setForm] = useState<DynamicFormResponse | null>(null);

  useEffect(() => {
    async function fetchForm() {
      const res = await fetch(`/api/${model}`);
      const data = await res.json();
      setForm(data);
    }
    fetchForm();
  }, [model]);

  // If form is loaded, return the methods to handle form changes, reset, and get values
  const handleChange = (name: string, value: string) => {
    // Check if form is not null before updating
    if (form) {
      setForm({
        ...form,
        sections: form.sections.map((section) => ({
          ...section,
          fields: section.fields.map((field) =>
            field.name === name ? { ...field, value } : field
          ),
        })),
      });
    }
  };

  const resetForm = () => {
    // Check if form is not null before updating
    if (form) {
      setForm({
        ...form,
        sections: form.sections.map((section) => ({
          ...section,
          fields: section.fields.map((field) => ({
            ...field,
            value: field.value || "",
          })),
        })),
      });
    }
  };

  const getFieldValues = () => {
    // If form is not null, retrieve field values
    if (form) {
      const fieldValues: Record<string, string> = {};
      form.sections.forEach((section) => {
        section.fields.forEach((field) => {
          fieldValues[field.name] = field.value;
        });
      });
      return fieldValues;
    }
    return (
      form || {
        sections: [],
        handleChange: () => {},
        resetForm: () => {},
        getFieldValues: () => ({}),
      }
    ); // Return an empty object if form is not loaded
  };

  // If form is loaded, return the methods to handle form changes, reset, and get values
  if (form) {
    return { sections: form.sections, handleChange, resetForm, getFieldValues };
  }

  // Return null or loading state if form is not loaded yet
  return null;
}
