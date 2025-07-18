"use client";

import { useState, useMemo, useCallback } from "react";
import useTasks, { Task as StorageTask } from "../hooks/useTasks";
import TaskItem from "./TaskItem";
import AddTask from "./AddTask";
import Image from "next/image";
import { ParsedElement } from "../utils/parseText";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  parsedElements: ParsedElement[];
}

export const Task = () => {
  const {
    tasks: storageTasks,
    addTask: addStorageTask,
    toggleTask,
    updateTask,
    removeTask,
  } = useTasks();
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<StorageTask | null>(null);

  const handleEditTask = useCallback((task: StorageTask) => {
    setEditingTask(task);
    setNewTask(task.text);
    setIsAdding(false);
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      addStorageTask(newTask);
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

  const taskList = useMemo(() => {
    return storageTasks.map((task) => (
      <TaskItem
        key={task.id}
        task={task}
        onToggle={toggleTask}
        onEdit={handleEditTask}
        isEditing={editingTask?.id === task.id}
      />
    ));
  }, [storageTasks, editingTask, toggleTask, handleEditTask]);

  return (
    <div className="w-full">
      <div className="bg-white p-4">
        {editingTask ? (
          <AddTask
            newTask={newTask}
            setNewTask={setNewTask}
            handleAddTask={() => {
              if (editingTask && newTask.trim()) {
                updateTask(editingTask.id, newTask);
              }
              setEditingTask(null);
              setNewTask("");
            }}
            cancelTask={() => {
              setEditingTask(null);
              setNewTask("");
            }}
            isEditing={true}
            onDelete={() => {
              if (editingTask) {
                removeTask(editingTask.id);
              }
              setEditingTask(null);
              setNewTask("");
            }}
          />
        ) : !isAdding ? (
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
            isEditing={false}
          />
        )}
      </div>
      <div className="mt-4">{taskList}</div>
    </div>
  );
};
