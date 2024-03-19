import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  useAddTaskMutation,
  useGetBoardTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../redux/api";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";

const defaultCols: Column[] = [
  {
    id: "to do",
    title: "Todo",
  },
  {
    id: "in progress",
    title: "Work in progress",
  },
  {
    id: "done",
    title: "Done",
  },
];

interface Props {
  boardId: string;
}

const KanbanBoard: React.FC<Props> = ({ boardId }) => {
  const { data } = useGetBoardTasksQuery(boardId);
  const [createTaskMutation] = useAddTaskMutation();
  const [updateTaskMutation] = useUpdateTaskMutation();
  const [deleteTaskMutation] = useDeleteTaskMutation();

  const [columns, setColumns] = useState<Column[]>(defaultCols);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  useEffect(() => {
    console.log(data);
    if (data) {
      setTasks(data);
    }
  }, [boardId, data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <div className="mx-auto mt-10 flex w-full items-center overflow-x-auto overflow-y-hidden px-10">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="mx-auto flex gap-4">
          <SortableContext items={columnsId}>
            {columns.map((col) => (
              <ColumnContainer
                key={col.id}
                column={col}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter((task) => task.columnId === col.id)}
              />
            ))}
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
                updateColumn={updateColumn}
                createTask={createTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                tasks={tasks.filter(
                  (task) => task.columnId === activeColumn.id
                )}
              />
            )}
            {activeTask && (
              <TaskCard
                task={activeTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  async function createTask(columnId: Id) {
    const newTask = {
      columnId,
      status: columnId.toString(),
      title: `Task ${tasks.length + 1}`,
    };
    const result = await createTaskMutation({ id: boardId, body: newTask });
    if ("data" in result) {
      const { data } = result;
      if (data) {
        setTasks([...tasks, data]);
      }
    }
  }

  async function deleteTask(id: Id) {
    const result = await deleteTaskMutation({ id });
    console.log(result);
    if (result) {
      const newTasks = tasks.filter((task) => task._id !== id);
      setTasks(newTasks);
    }
  }

  async function updateTask(id: Id, title: string) {
    const newTasks = tasks.map((task) => {
      if (task._id !== id) return task;
      return { ...task, title };
    });

    const result = await updateTaskMutation({ id, body: { title: title } });
    if (result) {
      setTasks(newTasks);
    }
  }

  function deleteColumn(id: Id) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);

    const newTasks = tasks.filter((t) => t.columnId !== id);
    setTasks(newTasks);
  }

  function updateColumn(id: Id, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id) return col;
      return { ...col, title };
    });

    setColumns(newColumns);
  }

  function onDragStart(event: DragStartEvent) {
    console.log(event);
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

    console.log("DRAG END");

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

      const overColumnIndex = columns.findIndex((col) => col.id === overId);

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  async function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;
    if (isActiveATask && isOverATask) {
      const overIndex = tasks.findIndex((t) => t._id === overId); // Оголошуємо overIndex тут
      const result = await updateTaskMutation({
        id: active.id,
        body: { columnId: tasks[overIndex].columnId },
      });
      if (result) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t._id === activeId);
          console.log(tasks[activeIndex].columnId);

          if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
            const updatedTask = {
              ...tasks[activeIndex],
              columnId: tasks[overIndex].columnId,
            };
            const updatedTasks = [...tasks];
            updatedTasks[activeIndex] = updatedTask;

            return arrayMove(updatedTasks, activeIndex, overIndex - 1);
          }

          return arrayMove(tasks, activeIndex, overIndex);
        });
      }
    } else if (isActiveATask && !isOverATask) {
      const result = await updateTaskMutation({
        id: active.id,
        body: { columnId: overId },
      });
      if (result) {
        setTasks((tasks) => {
          const activeIndex = tasks.findIndex((t) => t._id === activeId);
          console.log("DROPPING TASK OVER COLUMN", { activeIndex });

          const updatedTasks = [...tasks];
          updatedTasks[activeIndex] = {
            ...updatedTasks[activeIndex],
            columnId: overId,
          };

          return arrayMove(updatedTasks, activeIndex, activeIndex);
        });
      }
    }
  }
};

export default KanbanBoard;
