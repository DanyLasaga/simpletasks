"use client";

import React, { useEffect, useRef } from "react";
import DOMPurify from "dompurify";
import { highlightText } from "../utils/highlightUtils";

interface EditableInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

const EditableInput: React.FC<EditableInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && value !== contentRef.current.innerText) {
      contentRef.current.innerText = value;
    }
  }, [value]);

  const getHighlightedHtml = (text: string) => {
    const sanitized = DOMPurify.sanitize(text);
    return highlightText(sanitized);
  };

  const handleInput = () => {
    const text = contentRef.current?.textContent || "";
    onChange(text);
  };

  return (
    <div className="relative w-full overflow-y-scroll">
      {(!value || value.length === 0) && placeholder && (
        <div
          className="absolute inset-0 p-2 text-gray-400 pointer-events-none select-none"
          style={{ zIndex: 1 }}
        >
          {placeholder}
        </div>
      )}
      <div
        className="absolute inset-0 whitespace-pre-wrap break-words text-gray-800 p-2 pointer-events-none"
        dangerouslySetInnerHTML={{
          __html: getHighlightedHtml(value) + "\u200B",
        }}
        style={{ zIndex: 2 }}
      />
      <div
        ref={contentRef}
        contentEditable
        onInput={handleInput}
        className="relative z-10 bg-transparent border p-2 w-full h-14 overflow-auto resize-none focus:outline-none text-transparent caret-black"
        spellCheck={false}
      />
    </div>
  );
};

export default EditableInput;
