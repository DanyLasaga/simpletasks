import { Task } from "./Task";
import { ParsedElement } from "../utils/parseText";
import React from "react";
interface TaskItemProps {
  task: Task;
}

import ChipList from "../containers/ChipList";

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
