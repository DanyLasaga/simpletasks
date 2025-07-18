import { Task } from "../hooks/useTasks";
import { parseText } from "../utils/parseText";

const STORAGE_KEY = "tasks";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getTasks(): Promise<Task[]> {
  await delay(300);
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  const raw = JSON.parse(stored) as Omit<Task, "parsedElements">[];
  return raw.map((task) => ({ ...task, parsedElements: parseText(task.text) }));
}

export async function addTask(text: string): Promise<Task> {
  await delay(300);
  const stored = localStorage.getItem(STORAGE_KEY);
  const tasks: Omit<Task, "parsedElements">[] = stored
    ? JSON.parse(stored)
    : [];
  const newTask: Task = {
    id: crypto.randomUUID(),
    text,
    completed: false,
    parsedElements: parseText(text),
  };
  tasks.push({
    id: newTask.id,
    text: newTask.text,
    completed: newTask.completed,
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return newTask;
}

export async function updateTask(
  id: string,
  newText: string,
): Promise<Task | null> {
  await delay(300);
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const tasks: Omit<Task, "parsedElements">[] = JSON.parse(stored);
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx].text = newText;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return { ...tasks[idx], parsedElements: parseText(newText) };
}

export async function removeTask(id: string): Promise<boolean> {
  await delay(300);
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;
  const tasks: Omit<Task, "parsedElements">[] = JSON.parse(stored);
  const filtered = tasks.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export async function toggleTask(id: string): Promise<Task | null> {
  await delay(300);
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const tasks: Omit<Task, "parsedElements">[] = JSON.parse(stored);
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx].completed = !tasks[idx].completed;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  return { ...tasks[idx], parsedElements: parseText(tasks[idx].text) };
}
