'use client';
import TaskForm, { TaskFormRef } from '@/components/TaskForm';
import TaskBoard from '@/components/TaskBoard';
import HeroPage from '@/components/HeroPage';
import { useAppSelector } from '@/store/hooks';
import { useRef, useEffect, useState } from 'react';
import { useTaskCleanup } from '@/hooks/useTaskCleanup';

export default function Home() {
  // All hooks must be called at the top level, before any conditional returns
  const [isClient, setIsClient] = useState(false);
  const tasks = useAppSelector((state) => state.tasks);
  const taskFormRef = useRef<TaskFormRef>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useTaskCleanup();

  const hasTasks = tasks.tasks && tasks.tasks.length > 0;

  const handleGetStarted = () => {
    // Trigger the task form to open
    taskFormRef.current?.openForm();
  };

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading TaskMaster...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Top bar - Always render TaskForm but hide button on hero page */}
      <div className={`p-2 sm:p-4 ${!hasTasks ? 'hidden' : ''}`}>
        <TaskForm ref={taskFormRef} />
      </div>

      {/* Conditional content */}
      {hasTasks ? (
        <TaskBoard taskFormRef={taskFormRef} />
      ) : (
        <HeroPage onGetStarted={handleGetStarted} />
      )}
    </div>
  );
}
