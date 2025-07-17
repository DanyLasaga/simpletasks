import { Task } from "./Task";

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  return (
    <div className="bg-white rounded-lg p-4 mt-2 flex items-center text-gray-700">
      <input type="checkbox" className="mr-3 ml-4 size-5" />
      <span>{task.text}</span>
    </div>
  );
};

export default TaskItem;
