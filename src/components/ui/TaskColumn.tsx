"use client";
import Image from "next/image";
import TaskCard from "./TaskCard";
import { TaskColumnProps, Tasks } from "@/types/taskdata";
import { useEffect, useRef } from "react";
import { useDrop } from "react-dnd";
import { filterTasks } from "@/utils/filterTasks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateStatus } from "@/lib/features/taskSlice";

function TaskColumn({ title, tasks }: { title: string; tasks: Tasks[] }) {
  let taskList: Tasks[];
  const dispatch = useAppDispatch();
  const { tasksToDo, tasksFinished, tasksInProgress, tasksUnderReview } =
    filterTasks(tasks);
  const dropRef = useRef<HTMLDivElement | null>(null);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number; mvFrom: string }) =>
      updateTaskStatus(item.id, item.mvFrom, tasks),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  drop(dropRef);
  function updateTaskStatus(id: number, mvFrom: string, data: Tasks[]) {
    if (mvFrom !== title) {
      dispatch(updateStatus({ id, changeStatusTo: title }));
    }
  }
  if (title === "to do") {
    taskList = tasksToDo;
  } else if (title === "under review") {
    taskList = tasksUnderReview;
  } else if (title === "in progress") {
    taskList = tasksInProgress;
  } else {
    taskList = tasksFinished;
  }
  return (
    <div ref={dropRef} className="w-full bg-red-300">
      <div className="flex justify-between items-center my-2">
        <h4 className="text-lg text-[#555555] capitalize">{title}</h4>

        <Image
          src="/horizontal-bar.png"
          width={0}
          height={0}
          alt="To do"
          className="w-5 h-5 object-cover"
          unoptimized
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {taskList?.map((task, index) => {
            return <TaskCard key={task.id} task={task} index={index} />;
          })}
        </div>
        <button className="bg-gradient-to-t from-[#202020] to-[#3A3A3A] text-[#E3E1E1] w-full p-2  rounded-md flex justify-between items-center my-2">
          Add new <span className="text-2xl ">+</span>
        </button>
      </div>
    </div>
  );
}
export default TaskColumn;
