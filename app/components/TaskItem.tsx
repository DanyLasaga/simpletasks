import { Task } from "./Task";
import { ParsedElement, ContentType } from "./parseText";
import React from "react";
interface TaskItemProps {
  task: Task;
}

const getChipStyle = (type: ContentType) => {
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
      // No action for plain text
      break;
  }
};

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className="bg-white rounded-lg p-4 mt-2 flex items-center text-gray-700">
      <input type="checkbox" className="mr-3 ml-4 size-5" />
      <div className="flex flex-wrap gap-2">
        {task.parsedElements && task.parsedElements.length > 0 ? (
          task.parsedElements.map((element) => (
            <span
              key={element.id}
              className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${getChipStyle(
                element.type
              )} ${
                ["url", "email", "mention", "hashtag"].includes(element.type)
                  ? "cursor-pointer transition-colors"
                  : ""
              }`}
              onClick={() =>
                ["url", "email", "mention", "hashtag"].includes(element.type)
                  ? handleChipClick(element)
                  : undefined
              }
            >
              {element.content}
            </span>
          ))
        ) : (
          <span>{task.text}</span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
