"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";
import Image from "next/image";
import { ParsedElement, parseText } from "../utils/parseText";

export interface Task {
  id: number;
  text: string;
  parsedElements: ParsedElement[];
}
export const Task = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: newTask,
          parsedElements: parseText(newTask),
        },
      ]);
      setNewTask("");
      setIsAdding(false);
    } else if (newTask.trim() === "") {
      setIsAdding(false);
    }
  };

  const cancelTask = () => {
    setIsAdding(false);
    setNewTask("");
  };

  return (
    <div className="w-full">
      <div className="bg-white p-4">
        {!isAdding ? (
          <div
            className="flex items-center cursor-pointer text-gray-500"
            onClick={() => setIsAdding(true)}
          >
            <Image
              src="/icons/plus-square.svg"
              alt="plus-square"
              className="mx-3"
              width={24}
              height={24}
            />
            <span>Type to add new task</span>
          </div>
        ) : (
          <AddTask
            newTask={newTask}
            setNewTask={setNewTask}
            handleAddTask={handleAddTask}
            cancelTask={cancelTask}
          />
        )}
      </div>
      <div className="mt-4">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
