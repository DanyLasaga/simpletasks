"use client";

import { useState } from "react";
import TaskItem from "./TaskItem";

export interface Task {
  id: number;
  text: string;
}
export const Task = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white p-4">
        {!isAdding ? (
          <div
            className="flex items-center cursor-pointer text-gray-500"
            onClick={() => setIsAdding(true)}
          >
            <span className="text-2xl mr-2">+</span>
            <span>Type to add new task</span>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Type to add new task"
              className="w-full p-2 border rounded-md"
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md cursor-pointer"
                  disabled={!newTask.trim()}
                >
                  Open
                </button>
                <button
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md cursor-pointer"
                  disabled={!newTask.trim()}
                >
                  Today
                </button>
                <button
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md cursor-pointer"
                  disabled={!newTask.trim()}
                >
                  Public
                </button>
                <button
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md cursor-pointer"
                  disabled={!newTask.trim()}
                >
                  Normal
                </button>
                <button
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md cursor-pointer"
                  disabled={!newTask.trim()}
                >
                  Estimation
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className={`px-4 py-2 text-sm text-white rounded-md bg-blue-500 cursor-pointer`}
                  disabled={!newTask.trim()}
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
