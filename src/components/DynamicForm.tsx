import React from "react";
import useDynamicForm from "@/hooks/useDynamicForm";

interface DynamicFormProps {
  fields?: string;
}
const DynamicForm: React.FC<DynamicFormProps> = () => {
  // Example form configuration or model name
  const form = useDynamicForm("exampleModel");

  if (!form) {
    return <div>Loading...</div>; // Render a loading state while the form is null
  }

  const { sections, handleChange, resetForm, getFieldValues } = form;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(getFieldValues());
  };

  return (
    <form onSubmit={handleSubmit}>
      {sections.map((section) => (
        <div key={section.name}>
          <h2>{section.name}</h2>
          {section.fields.map((field) => {
            switch (field.type) {
              case "text":
              case "email":
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={field.value as string}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  </div>
                );
              case "select":
                return (
                  <div key={field.name}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.value as string}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    >
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              case "checkbox":
                return (
                  <div key={field.name}>
                    <label>
                      <input
                        type="checkbox"
                        name={field.name}
                        checked={field.value as unknown as boolean}
                        onChange={(e) =>
                          handleChange(field.name, String(e.target.checked))
                        }
                      />
                      {field.label}
                    </label>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      ))}
      <button type="submit">Submit</button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
};

export default DynamicForm;
