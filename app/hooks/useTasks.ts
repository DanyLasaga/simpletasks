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



  // Leer tareas usando el servicio mockeado al cargar
  useEffect(() => {
    taskService.getTasks().then(setTasks);
  }, []);

  // Ya no es necesario guardar manualmente en localStorage, el servicio lo hace.
  // Si quieres mantener sincronía con otros tabs, puedes escuchar storage events aquí.

  const addTask = (text: string) => {
    taskService.addTask(text).then((newTask) => {
      setTasks((prev) => [...prev, newTask]);
    });
  };

  // Ya definido arriba, no es necesario redefinir removeTask aquí.
  // La función removeTask expuesta abajo ahora usa el servicio.


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
