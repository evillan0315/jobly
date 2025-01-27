"use client";

import React, { useState } from "react";
import AceEditor from "react-ace";

// Import languages and themes as needed
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
interface AceCodeEditorProps {
  initialCode: string;
  mode?: string;
  // eslint-disable-next-line no-unused-vars
  onSave: (code: string) => void;
}
const AceCodeEditor: React.FC<AceCodeEditorProps> = ({
  initialCode,
  mode,
  onSave,
}) => {
  const [code, setCode] = useState(initialCode); // State to track the editor's content

  // Handle change in editor content
  const handleChange = (newCode: string) => {
    setCode(newCode);
    onSave(newCode);
  };

  // Handle save
  /*   const handleSave = () => {
    onSave(code); // Trigger the save callback with the current code
    alert("Code saved!");
  }; */
  return (
    <>
      <AceEditor
        mode={mode || "javascript"}
        theme="monokai"
        name="ace-editor"
        height="200px"
        width="100%"
        value={code}
        onChange={handleChange}
        editorProps={{ $blockScrolling: true }}
      />
    </>
  );
};

export default AceCodeEditor;
