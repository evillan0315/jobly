type FieldType =
  | "string"
  | "date"
  | "email"
  | "enum"
  | "file"
  | "array"
  | "object";

interface Field {
  required: boolean;
  type: FieldType;
  label: string;
  options?: string[]; // Only for "enum" fields
  items?: Field; // For nested structures (e.g., arrays or objects)
}

interface Section {
  [fieldName: string]: Field;
}

interface InputJson {
  [sectionName: string]: Section;
}

interface ConvertedField {
  name: string;
  type: string; // React-compatible input type
  label: string;
  required: boolean;
  options?: string[]; // For "select" fields
  fields?: ConvertedField[]; // For nested fields
}

interface ConvertedSection {
  section: string;
  fields: ConvertedField[];
}

export const inputJson: InputJson = {
  personal_information: {
    first_name: { required: true, type: "string", label: "First Name" },
    last_name: { required: true, type: "string", label: "Last Name" },
    middle_name: { required: false, type: "string", label: "Middle Name" },
    date_of_birth: { required: true, type: "date", label: "Date of Birth" },
    gender: {
      required: true,
      type: "enum",
      label: "Gender",
      options: ["Male", "Female", "Other", "Prefer Not to Say"],
    },
    contact_number: { required: true, type: "string", label: "Contact Number" },
    email: { required: true, type: "email", label: "Email Address" },
    address: { required: true, type: "string", label: "Address" },
  },
};

// Mapping of input types to React-compatible field types
const typeMapping: Record<FieldType, string> = {
  string: "text",
  date: "date",
  email: "email",
  enum: "select",
  file: "file",
  array: "array",
  object: "object",
};

// Function to convert the JSON
export function convertJson(input: InputJson): ConvertedSection[] {
  const result: ConvertedSection[] = [];
  for (const [section, fields] of Object.entries(input)) {
    const sectionData: ConvertedSection = { section, fields: [] };

    for (const [name, field] of Object.entries(fields)) {
      const convertedField: ConvertedField = {
        name,
        type: typeMapping[field.type] || field.type,
        label: field.label,
        required: field.required,
      };

      // Add options for "select" fields
      if (field.options) {
        convertedField.options = field.options;
      }

      // Handle nested fields (e.g., arrays or objects)
      if (field.items) {
        convertedField.fields = convertJson({
          items: { items: field.items },
        })[0].fields;
      }

      sectionData.fields.push(convertedField);
    }

    result.push(sectionData);
  }
  return result;
}

// Perform the conversion
//const convertedJson = convertJson(inputJson);

// Output the result
//console.log(JSON.stringify(convertedJson, null, 2));
