import { TrashIcon } from "@radix-ui/react-icons";
import check from '../assets/check.svg';
import checked from '../assets/checked.svg';
import { TaskType } from "../@types/Task";
import { useState } from "react";

interface TaskProps {
  task: TaskType;
  onDeleteTask(taskToDelete: TaskType): void;
  onCheckTask(id: string): void;
}

export function Task({ task, onDeleteTask, onCheckTask }: TaskProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  function handleDelete() {
    onDeleteTask(task);
  }

  function handleCheck() {
    setIsChecked(prevState => !prevState);
    onCheckTask(task.id);
  }

  return (
    <div className="flex justify-between bg-gray-500 border border-gray-400 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <button onClick={handleCheck}>
          <img src={isChecked ? checked : check} />
        </button>
        <span 
          data-checked={isChecked}
          className="text-gray-100 text-sm data-[checked=true]:line-through data-[checked=true]:text-gray-300"
        >
          {task.content}
        </span>
      </div>
      <button 
        onClick={handleDelete}
        className="text-gray-300 w-6 h-6"
      >
        <TrashIcon className="h-6 w-6" />
      </button>
    </div>
  );
}