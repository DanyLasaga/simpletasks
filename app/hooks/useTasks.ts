// hooks/useTasks.ts
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
    setTasks((prev) => prev.map(task =>
      task.id === id
        ? { ...task, text: newText, parsedElements: parseText(newText) }
        : task
    ));
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter(task => task.id !== id));
  };


  // Leer tareas del localStorage al cargar
  useEffect(() => {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    if (storedTasks) {
      const raw: Omit<Task, "parsedElements">[] = JSON.parse(storedTasks);
      const parsed = raw.map((task) => ({
        ...task,
        parsedElements: parseText(task.text),
      }));
      setTasks(parsed);
    }
  }, []);

  // Guardar tareas en localStorage (sin parsedElements)
  useEffect(() => {
    const toStore = tasks.map(({ id, text, completed }) => ({
      id,
      text,
      completed,
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      parsedElements: parseText(text),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Ya definido arriba, no es necesario redefinir removeTask aquí.

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              // Vuelve a parsear el texto en caso de que quieras resaltar diferente si está completado
              parsedElements: parseText(task.text),
            }
          : task
      )
    );
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
