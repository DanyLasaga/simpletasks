import { useState, useEffect } from "react";
import { parseText, ParsedElement } from "../utils/parseText";
import * as taskService from "../services/taskService";

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  parsedElements: ParsedElement[];
}

const STORAGE_KEY = "tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const updateTask = (id: string, newText: string) => {
    taskService.updateTask(id, newText).then((updated) => {
      if (!updated) return;
      setTasks((prev) => prev.map(task =>
        task.id === id ? updated : task
      ));
    });
  };


  const removeTask = (id: string) => {
    taskService.removeTask(id).then((ok) => {
      if (!ok) return;
      setTasks((prev) => prev.filter(task => task.id !== id));
    });
  };



  useEffect(() => {
    taskService.getTasks().then(setTasks);
  }, []);

  const addTask = (text: string) => {
    taskService.addTask(text).then((newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });
  };


  const toggleTask = (id: string) => {
    taskService.toggleTask(id).then((updated) => {
      if (!updated) return;
      setTasks((prev) => prev.map((task) =>
        task.id === id ? updated : task
      ));
    });
  };


  return {
    tasks,
    addTask,
    removeTask,
    toggleTask,
    updateTask,
  };
};

export default useTasks;
