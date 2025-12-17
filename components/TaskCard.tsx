'use client';
import React, { memo, useCallback } from 'react';
import { Task } from '@/store/slices/taskSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '@/store/slices/taskSlice';
import { Trash2, Edit, GripVertical, Clock4 } from 'lucide-react';
import SubTaskList from './SubTaskList';

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export default memo(function TaskCard({ task, onEdit }: TaskCardProps) {
  const dispatch = useDispatch();
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const stopPropagation = (event: React.SyntheticEvent) => {
    event.stopPropagation();
  };

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
        dispatch(deleteTask(task.id));
      }
    },
    [dispatch, task.id, task.title]
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onEdit?.(task);
    },
    [onEdit, task]
  );

  const handleSubtasksChange = useCallback(
    (subtasks: Task['subtasks']) => {
      dispatch(updateTask({ ...task, subtasks }));
    },
    [dispatch, task]
  );

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.slice(0, 5).split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`group hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 rotate-2 shadow-lg' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-base sm:text-md flex pr-2 flex-row items-center gap-2">
            <GripVertical className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 shrink-0 group-hover:bg-gray-200 dark:group-hover:bg-gray-700 rounded p-0.5 transition-colors" />
            <span className="flex-1">{task.title}</span>
          </CardTitle>
          <div
            className="flex gap-1 ml-1 sm:ml-2 opacity-0 group-hover:opacity-100 max-sm:opacity-100 transition-opacity shrink-0"
            onPointerDown={(event) => event.stopPropagation()}
            onTouchStart={(event) => event.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={handleEdit}
              onPointerDown={stopPropagation}
              onTouchStart={stopPropagation}
              disabled={isDragging}
              className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              onClick={handleDelete}
              onPointerDown={stopPropagation}
              onTouchStart={stopPropagation}
              disabled={isDragging}
              className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2">
          {task.description}
        </p>
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mb-2 sm:mb-3">
            <SubTaskList
              value={task.subtasks}
              onChange={handleSubtasksChange}
              status={task.status}
            />
          </div>
        )}
        {(task.startTime || task.endTime) && (
          <div className="flex flex-row gap-1 sm:gap-2 text-xs text-gray-500 border-t-2 items-center">
            <Clock4 className="h-4 w-4 mt-2" />
            {task.startTime && (
              <span className="bg-blue-400/30 font-bold mt-2  dark:bg-blue-400/30 text-blue-500 dark:text-blue-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs">
                Start: {formatTime(task.startTime)}
              </span>
            )}
            {task.endTime && (
              <span className="bg-violet-400/30 font-bold mt-2 dark:bg-violet-400/30 text-violet-500 dark:text-violet-400 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs">
                End: {formatTime(task.endTime)}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});
