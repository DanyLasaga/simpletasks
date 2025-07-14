import { Task } from "./Task";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-2 flex items-center">
      <input type="checkbox" className="mr-4" />
      <span>{task.text}</span>
    </div>
  );
};

export default TaskItem;
