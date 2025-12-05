import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import TaskCard from './TaskCard';
import { Task } from '@/store/slices/taskSlice';
import { useDroppable } from '@dnd-kit/core';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  count: number;
  status: 'todo' | 'in-progress' | 'done';
}

export default function TaskColumn({ title, tasks, count, status }: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
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
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && <p className="text-center text-gray-400 py-8">No tasks yet</p>}
        </div>
      </CardContent>
    </Card>
  );
}
