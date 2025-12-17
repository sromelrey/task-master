import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import TaskCard from './TaskCard';
import { Task } from '@/store/slices/taskSlice';
import { useMemo } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Layout, LayoutList } from 'lucide-react';

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

  const statusBadge = {
    todo: 'bg-gray-500 dark:bg-gray-700',
    'in-progress': 'bg-blue-500 dark:bg-blue-700',
    done: 'bg-green-500 dark:bg-green-700',
  };

  const statusBackground = {
    todo: 'text-gray-500 bg-gray-200 dark:bg-gray-700',
    'in-progress': 'text-blue-500 bg-blue-200 dark:bg-blue-700',
    done: 'text-green-500 bg-green-200 dark:bg-green-700',
  };

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
      className={`flex-1 flex flex-col bg-[#F3F4F6] dark:bg-gray-800 transition-colors h-full ${
        isOver ? 'ring-2 ring-blue-400 bg-gray-200 dark:bg-gray-700' : ''
      }`}
    >
      <CardHeader className="pb-2 sm:pb-4 flex flex-row justify-between items-center">
        <CardTitle className="text-lg sm:text-xl flex flex-row items-center gap-2">
          <div className={`w-4 h-4 rounded-full ${statusBadge[status]}`}></div>
          {title}
        </CardTitle>
        <p
          className={`text-md font-bold sm:text-sm text-center  ${statusBackground[status]} px-2 py-1 rounded-lg`}
        >
          {count} tasks
        </p>
      </CardHeader>
      <CardContent className="flex-1 px-2 sm:px-6 pb-2 sm:pb-6">
        <div className="space-y-2 sm:space-y-3">
          {sortedTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
          {tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center border-4 border-dashed rounded-lg p-6">
              <LayoutList className="h-12 w-12 sm:h-12 sm:w-12 text-gray-400 mb-2" />
              <p className="text-center text-gray-400 text-sm mb-1">No tasks yet</p>
              <p className="text-center text-gray-400 text-xs">Drag tasks here or add a new one</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
