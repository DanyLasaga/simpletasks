import React from "react";
import { ParsedElement } from "../utils/parseText";
import { ContentType } from "../utils/textPatterns";
import Image from "next/image";

interface ChipProps {
  element: ParsedElement;
  onClick?: (element: ParsedElement) => void;
}

const getChipStyle = (type: ContentType | "text") => {
  switch (type) {
    case "url":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200";
    case "email":
      return "bg-orange-100 text-orange-800 hover:bg-orange-200 border-orange-200";
    case "mention":
      return "bg-green-100 text-green-800 hover:bg-green-200 border-green-200";
    case "hashtag":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200 border-purple-200";
    default:
      return "text-gray-800";
  }
};

const Chip: React.FC<ChipProps> = ({ element, onClick }) => {
  const clickable = ["url", "email", "mention", "hashtag"].includes(
    element.type as string
  );
  return (
    <span
      key={element.id}
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getChipStyle(
        element.type
      )} ${clickable ? "cursor-pointer transition-colors" : ""}`}
      onClick={clickable && onClick ? () => onClick(element) : undefined}
    >
      {element.type === "email" && (
        <Image
          src="/icons/mail.svg"
          alt="email"
          className="w-4 h-4"
          width={20}
          height={20}
        />
      )}
      {element.type === "mention" && (
        <Image
          src="/images/avatar2.webp"
          alt="mention"
          className="w-4 h-4 rounded-full"
          width={20}
          height={20}
        />
      )}
      {element.type === "url" && (
        <Image
          src="/icons/link.svg"
          alt="link"
          className="w-4 h-4"
          width={20}
          height={20}
        />
      )}
      {element.content}
    </span>
  );
};

export default Chip;
