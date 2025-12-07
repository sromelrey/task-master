'use client';
import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TaskColumn from './TaskColumn';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { updateTaskStatus, Task } from '@/store/slices/taskSlice';
import { TaskFormRef } from './TaskForm';

interface TaskBoardProps {
  taskFormRef: React.RefObject<TaskFormRef | null>;
}

export default function TaskBoard({ taskFormRef }: TaskBoardProps) {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks);

  // Memoize filtered tasks - only recalculate when tasks.tasks changes
  const todoTasks = useMemo(
    () => tasks.tasks.filter((task) => task.status === 'todo'),
    [tasks.tasks]
  );

  const inProgressTasks = useMemo(
    () => tasks.tasks.filter((task) => task.status === 'in-progress'),
    [tasks.tasks]
  );

  const doneTasks = useMemo(
    () => tasks.tasks.filter((task) => task.status === 'done'),
    [tasks.tasks]
  );

  const handleDragEnd = useCallback((result: DragEndEvent) => {
    const { active, over } = result;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as 'todo' | 'in-progress' | 'done';

    const task = tasks.tasks.find((task) => task.id === taskId);
    if (task && task.status !== newStatus) {
      dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
    }
  }, [dispatch, tasks.tasks]);

  const handleEditTask = useCallback((task: Task) => {
    taskFormRef.current?.openFormForEdit(task);
  }, [taskFormRef]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 w-full gap-4 p-4">
        {/* TODO Board */}
        <TaskColumn
          title="Todo"
          tasks={todoTasks}
          count={todoTasks.length}
          status="todo"
          onEdit={handleEditTask}
        />

        {/* In Progress Board */}
        <TaskColumn
          title="In Progress"
          tasks={inProgressTasks}
          count={inProgressTasks.length}
          status="in-progress"
          onEdit={handleEditTask}
        />

        {/* Done Board */}
        <TaskColumn
          title="Done"
          tasks={doneTasks}
          count={doneTasks.length}
          status="done"
          onEdit={handleEditTask}
        />
      </div>
    </DndContext>
  );
}
