'use client';
import React, { memo } from 'react';
import { Task } from '@/store/slices/taskSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useDraggable } from '@dnd-kit/core';

interface TaskCardProps {
  task: Task;
}
export default memo(function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 rotate-2 shadow-lg' : ''
      }`}
      {...listeners}
      {...attributes}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
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
