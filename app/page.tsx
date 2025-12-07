'use client';
import TaskForm, { TaskFormRef } from '@/components/TaskForm';
import TaskBoard from '@/components/TaskBoard';
import HeroPage from '@/components/HeroPage';
import { useAppSelector } from '@/store/hooks';
import { useRef, useEffect, useState } from 'react';
import { useTaskCleanup } from '@/hooks/useTaskCleanup';

export default function Home() {
  // Prevent hydration mismatch by ensuring client-side only rendering
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const tasks = useAppSelector((state) => state.tasks);
  const taskFormRef = useRef<TaskFormRef>(null);
  useTaskCleanup();

  const hasTasks = tasks.tasks && tasks.tasks.length > 0;

  const handleGetStarted = () => {
    // Trigger the task form to open
    taskFormRef.current?.openForm();
  };

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
  const tasks = useAppSelector((state) => state.tasks);
  const taskFormRef = useRef<TaskFormRef>(null);
  useTaskCleanup();

  const hasTasks = tasks.tasks && tasks.tasks.length > 0;

  const handleGetStarted = () => {
    // Trigger the task form to open
    taskFormRef.current?.openForm();
  };

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
