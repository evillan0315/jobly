import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const typeMapping: Record<string, string> = {
  string: "text",
  date: "date",
  email: "email",
  enum: "select",
  file: "file",
  array: "array",
};

interface FormField {
  name: string;
  type: string;
  label: string;
  required: boolean;
  options?: string[];
  fields?: FormField[];
}

interface FormSection {
  section: string;
  fields: FormField[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function transformFields(fields: any[]): FormSection[] {
  const sections: Record<string, FormField[]> = {};

  fields.forEach((field) => {
    const { name, type, label, required, options, section } = field;

    const formattedField: FormField = {
      name,
      type: typeMapping[type] || type,
      label,
      required,
    };

    if (options) {
      formattedField.options = options.split(","); // Convert options to an array
    }

    if (!sections[section]) {
      sections[section] = [];
    }

    sections[section].push(formattedField);
  });

  return Object.entries(sections).map(([sectionName, fields]) => ({
    section: sectionName,
    fields,
  }));
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Fetch data from Prisma
    const fields = await prisma.field.findMany();

    // Transform fields into React-compatible format
    const transformedData = transformFields(fields);

    return {
      props: {
        formStructure: transformedData,
      },
    };
  } catch (error) {
    console.error("Error fetching form fields:", error);
    return {
      props: {
        formStructure: [],
      },
    };
  }
};

const DynamicForm = ({ formStructure }: { formStructure: FormSection[] }) => {
  return (
    <form>
      {formStructure.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          <h3>{section.section}</h3>
          {section.fields.map((field, fieldIndex) => (
            <div key={fieldIndex}>
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === "select" ? (
                <select id={field.name} name={field.name}>
                  {field.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
