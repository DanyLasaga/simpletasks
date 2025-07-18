"use client";

import Image from "next/image";
import EditableInput from "./EditableInput";

interface AddTaskProps {
  newTask: string;
  setNewTask: (value: string) => void;
  handleAddTask: () => void;
  cancelTask: () => void;
  isEditing?: boolean;
  onDelete?: () => void;
}

const AddTask = ({
  newTask,
  setNewTask,
  handleAddTask,
  cancelTask,
  isEditing,
  onDelete,
}: AddTaskProps) => {
  return (
    <div className="flex flex-col shadow-lg shadow-gray-200 rounded-sm">
      <div className="flex flex-row items-start rounded-t-sm border-gray-200 border pb-1">
        <Image
          src="/icons/plus-square.svg"
          alt="plus-square"
          className="mx-3 pt-2.5"
          width={24}
          height={24}
        />
        <EditableInput
          value={newTask}
          onChange={setNewTask}
          placeholder="Type to add new task"
        />
        <Image
          src="/images/avatar.webp"
          alt="avatar"
          className={`rounded-full m-2 ${
            !newTask.trim()
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer opacity-100"
          }`}
          width={26}
          height={26}
        />
      </div>
      <div className="bg-gray-100 rounded-b-sm flex justify-between items-center border border-gray-200 p-2">
        <div className="flex flex-row items-start">
          <div className="flex flex-row gap-2 mr-2 min-[1230px]:mr-4">
            <button
              className={`px-4 max-sm:px-2 py-2 text-xs font-semibold text-gray-800 bg-slate-200 rounded-sm flex flex-row items-center gap-2 ${
                !newTask.trim()
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer opacity-100"
              }`}
              disabled={!newTask.trim()}
            >
              <Image
                src="/icons/maximize-2.svg"
                alt="plus-square"
                className=""
                width={20}
                height={20}
              />
              <span className="max-[1230px]:hidden">Open</span>
            </button>
          </div>
          <div className="flex flex-row gap-2">
            <button
              className={`px-4 max-sm:px-2 py-2 text-sm text-gray-600 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                !newTask.trim()
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer opacity-70"
              }`}
              disabled={!newTask.trim()}
            >
              <Image
                src="/icons/calendar.svg"
                alt="plus-square"
                className=""
                width={20}
                height={20}
              />
              <span className="max-[1230px]:hidden">Today</span>
            </button>
            <button
              className={`px-4 max-sm:px-2 py-2 text-sm text-gray-600 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                !newTask.trim()
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer opacity-70"
              }`}
              disabled={!newTask.trim()}
            >
              <Image
                src="/icons/unlock.svg"
                alt="plus-square"
                className=""
                width={20}
                height={20}
              />
              <span className="max-[1230px]:hidden">Public</span>
            </button>
            <button
              className={`px-4 max-sm:px-2 py-2 text-sm text-gray-600 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                !newTask.trim()
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer opacity-70"
              }`}
              disabled={!newTask.trim()}
            >
              <Image
                src="/icons/north-star.svg"
                alt="plus-square"
                className=""
                width={20}
                height={20}
              />
              <span className="max-[1230px]:hidden">Normal</span>
            </button>
            <button
              className={`px-4 max-sm:px-2 py-2 text-sm text-gray-600 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                !newTask.trim()
                  ? "cursor-not-allowed opacity-40"
                  : "cursor-pointer opacity-70"
              }`}
              disabled={!newTask.trim()}
            >
              <Image
                src="/icons/ZeroCircle.svg"
                alt="plus-square"
                className=""
                width={20}
                height={20}
              />
              <span className="max-[1230px]:hidden">Estimation</span>
            </button>
            {isEditing && (
              <button
                className={`px-4 max-sm:px-2 py-2 text-sm text-gray-700 bg-transparent border border-gray-600 rounded-sm flex flex-row items-center gap-2 ${
                  !newTask.trim()
                    ? "cursor-not-allowed opacity-40"
                    : "cursor-pointer opacity-70"
                }`}
                disabled={!newTask.trim()}
                onClick={onDelete}
              >
                <Image
                  src="/icons/trash.svg"
                  alt="delete"
                  className=""
                  width={20}
                  height={20}
                />
                <span className="max-[1230px]:hidden">Delete</span>
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2 max-[1230px]:hidden">
          <button
            onClick={cancelTask}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className={`px-4 py-2 text-sm text-white rounded-sm bg-blue-800 cursor-pointer`}
          >
            {isEditing
              ? newTask.trim()
                ? "Save"
                : "Ok"
              : newTask.trim()
              ? "Add"
              : "Ok"}
          </button>
        </div>
        <div className="flex gap-2 min-[1230px]:hidden">
          <button
            className="px-4 max-sm:px-2 py-2 text-sm bg-blue-800 text-white rounded-sm cursor-pointer"
            onClick={() => {
              if (isEditing) {
                if (newTask.trim()) {
                  handleAddTask();
                } else {
                  cancelTask();
                }
              } else {
                if (newTask.trim()) {
                  handleAddTask();
                } else {
                  cancelTask();
                }
              }
            }}
          >
            {isEditing ? (
              newTask.trim() ? (
                <Image
                  src="/icons/save.svg"
                  alt="save"
                  className=""
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src="/icons/x.svg"
                  alt="x"
                  className=""
                  width={20}
                  height={20}
                />
              )
            ) : newTask.trim() ? (
              <Image
                src="/icons/plus.svg"
                alt="plus"
                className=""
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/icons/x.svg"
                alt="x"
                className=""
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
