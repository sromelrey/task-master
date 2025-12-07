'use client';
import React, { memo, useCallback } from 'react';
import { Task } from '@/store/slices/taskSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '@/store/slices/taskSlice';
import { Trash2, Edit } from 'lucide-react';
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

  const stopPropagation = (event: React.PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      dispatch(deleteTask(task.id));
    }
  }, [dispatch, task.id, task.title]);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(task);
  }, [onEdit, task]);

  const handleSubtasksChange = useCallback((subtasks: Task['subtasks']) => {
    dispatch(updateTask({ ...task, subtasks }));
  }, [dispatch, task]);

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

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
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex-1">{task.title}</CardTitle>
            <div
              className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onPointerDown={(event) => event.stopPropagation()}
            >
            <Button
              variant="ghost"
              size="sm"
                type="button"
              onClick={handleEdit}
                onPointerDown={stopPropagation}
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
                disabled={isDragging}
              className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
        {task.subtasks && task.subtasks.length > 0 && (
          <div className="mb-3">
            <SubTaskList value={task.subtasks} onChange={handleSubtasksChange} status={task.status} />
          </div>
        )}
        {(task.startTime || task.endTime) && (
          <div className="flex gap-2 text-xs text-gray-500">
            {task.startTime && (
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">
                Start: {task.startTime}
              </span>
            )}
            {task.endTime && (
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded">
                End: {task.endTime}
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
});
