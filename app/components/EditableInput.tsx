"use client";

import React, { useEffect, useRef } from "react";
import DOMPurify from "dompurify";

const HIGHLIGHT_PATTERNS = [
  {
    regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
    className: "text-green-600",
  }, // Email (prioridad alta)
  {
    regex: /\bhttps?:\/\/[^\s]+/g,
    className: "text-orange-500",
  }, // URL completa
  {
    regex: /\bwww\.[^\s]+/g,
    className: "text-orange-400",
  }, // www links (opcional)
  {
    // Solo detecta menciones si el '@' no está precedido por letras, números, punto, guion bajo, etc.
    regex: /(?<![a-zA-Z0-9._%+-])@[a-zA-Z0-9_-]+/g,
    className: "text-blue-600",
  }, // Mención
  {
    regex: /#([\w-]+)/g,
    className: "text-purple-600",
  }, // Hashtag
];

interface EditableInputProps {
  value: string;
  onChange: (val: string) => void;
}

const EditableInput: React.FC<EditableInputProps> = ({ value, onChange }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current && value !== contentRef.current.innerText) {
      contentRef.current.innerText = value;
      highlightText(value);
    }
  }, [value]);

  const highlightText = (text: string) => {
    let sanitized = DOMPurify.sanitize(text);
    for (const { regex, className } of HIGHLIGHT_PATTERNS) {
      sanitized = sanitized.replace(
        regex,
        (match: string) => `<span class="${className}">${match}</span>`
      );
    }
    return sanitized;
  };

  const handleInput = () => {
    const text = contentRef.current?.textContent || "";
    onChange(text);
  };

  return (
    <div className="relative w-full">
      <div
        className="absolute inset-0 whitespace-pre-wrap break-words text-gray-800 p-2 pointer-events-none"
        dangerouslySetInnerHTML={{ __html: highlightText(value) + "\u200B" }}
      />
      <div
        ref={contentRef}
        contentEditable
        onInput={handleInput}
        className="relative z-10 bg-transparent border p-2 w-full h-20 overflow-auto resize-none focus:outline-none text-transparent caret-black"
        spellCheck={false}
      />
    </div>
  );
};

export default EditableInput;
