import { DynamicFormResponse } from "@/types/form";

export function validateDynamicForm(
  data: Record<string, any>,
  schema: DynamicFormResponse
): boolean {
  return schema.sections.every((section) =>
    section.fields.every((field) => {
      if (field.required && !data[field.name]) {
        return false;
      }
      return true;
    })
  );
}

const validateForm = (
  formData: Record<string, any>
): Record<string, string> => {
  const errors: Record<string, string> = {};
  Object.keys(formData).map((e) => {
    if (!formData[e]) {
      errors.email = `${e} is required`;
    }
    if (!formData["email"]) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData["email"])) {
      errors.email = "Invalid email format";
    }
  });

  return errors;
};
export default validateForm;
