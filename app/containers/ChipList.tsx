import React from "react";
import { ParsedElement } from "../utils/parseText";
import Chip from "../components/Chip";

interface ChipListProps {
  elements: ParsedElement[];
  onChipClick?: (element: ParsedElement) => void;
}

const ChipList: React.FC<ChipListProps> = ({ elements, onChipClick }) => {
  if (!elements || elements.length === 0) return null;
  return (
    <>
      {elements.map((element) => (
        <Chip key={element.id} element={element} onClick={onChipClick} />
      ))}
    </>
  );
};

export default ChipList;
