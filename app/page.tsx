import { Task } from "./components/Task";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-16 max-sm:p-4 bg-white">
      <Task />
    </main>
  );
}
