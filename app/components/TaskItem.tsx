import { Task } from "./Task";
import { ParsedElement } from "../utils/parseText";
import React from "react";
import ChipList from "../containers/ChipList";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit?: (task: Task) => void;
  isEditing?: boolean;
}

const handleChipClick = (element: ParsedElement) => {
  switch (element.type) {
    case "url": {
      let url = element.content;
      if (!url.startsWith("http")) {
        url = "https://" + url;
      }
      window.open(url, "_blank");
      break;
    }
    case "email":
      window.open(`mailto:${element.content}`, "_blank");
      break;
    case "mention":
      alert(`Mentioned: ${element.content}`);
      break;
    case "hashtag":
      alert(`Hashtag: ${element.content}`);
      break;
    default:
      break;
  }
};

const TaskItem = ({ task, onToggle, onEdit, isEditing }: TaskItemProps) => {
  return (
    <div
      className={`bg-white rounded-lg p-4 mt-2 flex items-center text-gray-700 ${
        task.completed ? "opacity-60 line-through" : ""
      }`}
      onClick={() => {
        if (onEdit && !isEditing) onEdit(task);
      }}
      style={{ cursor: onEdit && !isEditing ? "pointer" : "default" }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mr-3 ml-4 size-5 accent-green-500"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="flex flex-wrap gap-2">
        {task.parsedElements && task.parsedElements.length > 0 ? (
          <ChipList
            elements={task.parsedElements}
            onChipClick={handleChipClick}
          />
        ) : (
          <span>{task.text}</span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
