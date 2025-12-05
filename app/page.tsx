'use client';
import TaskForm from '@/components/TaskForm';
import TaskBoard from '@/components/TaskBoard';
import HeroPage from '@/components/HeroPage';
import { useAppSelector } from '@/store/hooks';
import { useRef } from 'react';

export default function Home() {
  const tasks = useAppSelector((state) => state.tasks);
  const taskFormRef = useRef<{ openForm: () => void }>(null);

  const hasTasks = tasks.tasks && tasks.tasks.length > 0;

  const handleGetStarted = () => {
    // Trigger the task form to open
    taskFormRef.current?.openForm();
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Top bar - Always render TaskForm but hide button on hero page */}
      <div className={`p-4 ${!hasTasks ? 'hidden' : ''}`}>
        <TaskForm ref={taskFormRef} />
      </div>

      {/* Conditional content */}
      {hasTasks ? <TaskBoard /> : <HeroPage onGetStarted={handleGetStarted} />}
    </div>
  );
}
