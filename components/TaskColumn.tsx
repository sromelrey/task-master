import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import TaskCard from './TaskCard';
import { Task } from '@/store/slices/taskSlice';
import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  count: number;
  status: 'todo' | 'in-progress' | 'done';
  onEdit?: (task: Task) => void;
}

export default function TaskColumn({ title, tasks, count, status, onEdit }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  const sortedTasks = useMemo(() => {
    const getTimeValue = (time?: string) => {
      if (!time) {
        return Infinity;
      }
      const [hours = 0, minutes = 0, seconds = 0] = time.split(':').map((value) => Number(value));
      if (Number.isNaN(hours) || Number.isNaN(minutes) || Number.isNaN(seconds)) {
        return Infinity;
      }
      return hours * 3600 + minutes * 60 + seconds;
    };

    return [...tasks].sort((a, b) => {
      const aValue = getTimeValue(a.startTime);
      const bValue = getTimeValue(b.startTime);
      return aValue - bValue;
    });
  }, [tasks]);
  return (
    <Card
      ref={setNodeRef}
      className={`flex-1 flex flex-col bg-blue-50/50 dark:bg-blue-950/20 transition-colors ${
        isOver ? 'ring-2 ring-blue-400 bg-blue-100/50 dark:bg-blue-900/40' : ''
      }`}
    >
      <CardHeader>
        <CardTitle className="flex justify-center text-2xl">{title}</CardTitle>
        <p className="text-sm text-center text-gray-500">{count} tasks</p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
                {sortedTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onEdit={onEdit} />
                ))}
          {tasks.length === 0 && <p className="text-center text-gray-400 py-8">No tasks yet</p>}
        </div>
      </CardContent>
    </Card>
  );
}
