"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";
import Image from "next/image";
import EditableInput from "./EditableInput";
import { ParsedElement, parseText } from "./parseText";

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
          <div className="flex flex-col shadow-lg shadow-gray-200 rounded-sm">
            <div className="flex flex-row items-start rounded-t-sm border-gray-200 border pb-1">
              <Image
                src="/icons/plus-square.svg"
                alt="plus-square"
                className="mx-3 pt-2.5"
                width={24}
                height={24}
              />

              <EditableInput
                value={newTask}
                onChange={setNewTask}
                placeholder="Type to add new task"
              />

              <Image
                src="/images/avatar.webp"
                alt="avatar"
                className={`rounded-full m-2 ${
                  !newTask.trim()
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer opacity-100"
                }`}
                width={26}
                height={26}
              />
            </div>
            <div className="bg-gray-100 rounded-b-sm flex justify-between items-center border border-gray-200 p-2">
              <div className="flex flex-row gap-2">
                <button
                  className={`px-4 py-2 text-xs font-semibold text-gray-800 bg-slate-200 rounded-sm flex flex-row items-center gap-2 ${
                    !newTask.trim()
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer opacity-100"
                  }`}
                  disabled={!newTask.trim()}
                >
                  <Image
                    src="/icons/maximize-2.svg"
                    alt="plus-square"
                    className=""
                    width={20}
                    height={20}
                  />
                  Open
                </button>
                <button
                  className={`px-4 py-2 text-sm text-gray-600 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                    !newTask.trim()
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer opacity-70"
                  }`}
                  disabled={!newTask.trim()}
                >
                  <Image
                    src="/icons/calendar.svg"
                    alt="plus-square"
                    className=""
                    width={20}
                    height={20}
                  />
                  Today
                </button>
                <button
                  className={`px-4 py-2 text-sm text-gray-600 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                    !newTask.trim()
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer opacity-70"
                  }`}
                  disabled={!newTask.trim()}
                >
                  <Image
                    src="/icons/unlock.svg"
                    alt="plus-square"
                    className=""
                    width={20}
                    height={20}
                  />
                  Public
                </button>
                <button
                  className={`px-4 py-2 text-sm text-gray-600 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                    !newTask.trim()
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer opacity-70"
                  }`}
                  disabled={!newTask.trim()}
                >
                  <Image
                    src="/icons/north-star.svg"
                    alt="plus-square"
                    className=""
                    width={20}
                    height={20}
                  />
                  Normal
                </button>
                <button
                  className={`px-4 py-2 text-sm text-gray-600 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                    !newTask.trim()
                      ? "cursor-not-allowed opacity-40"
                      : "cursor-pointer opacity-70"
                  }`}
                  disabled={!newTask.trim()}
                >
                  <Image
                    src="/icons/ZeroCircle.svg"
                    alt="plus-square"
                    className=""
                    width={20}
                    height={20}
                  />
                  Estimation
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={cancelTask}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className={`px-4 py-2 text-sm text-white rounded-sm bg-blue-800 cursor-pointer`}
                >
                  {newTask.trim() ? "Add" : "Ok"}
                </button>
              </div>
            </div>
          </div>
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
