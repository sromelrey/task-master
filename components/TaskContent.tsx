'use client'
import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Checkbox } from './ui/checkbox';
import TaskCard from './TaskCard';


export default function TaskContent() {
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

    return (
        <div className='flex flex-1 w-full gap-4 p-4'>
            {/* TODO Board */}
            <Card className='flex-1 flex flex-col bg-blue-50/50 dark:bg-blue-950/20'>
                <CardHeader>
                    <CardTitle className='flex justify-center text-2xl'>
                        Todo Board
                    </CardTitle>
                    <p className='text-sm text-center text-gray-500'>{todoTasks.length} tasks</p>
                </CardHeader>
                <CardContent className='flex-1'>
                    <div className='space-y-3'>
                        {todoTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        {todoTasks.length === 0 && (
                            <p className='text-center text-gray-400 py-8'>No tasks yet</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* In Progress Board */}
            <Card className='flex-1 flex flex-col bg-amber-50/50 dark:bg-amber-950/20'>
                <CardHeader>
                    <CardTitle className='flex justify-center text-2xl'>
                        In Progress
                    </CardTitle>
                    <p className='text-sm text-center text-gray-500'>{inProgressTasks.length} tasks</p>
                </CardHeader>
                <CardContent className='flex-1'>
                    <div className='space-y-3'>
                        {inProgressTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        {inProgressTasks.length === 0 && (
                            <p className='text-center text-gray-400 py-8'>No tasks yet</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Done Board */}
            <Card className='flex-1 flex flex-col bg-green-50/50 dark:bg-green-950/20'>
                <CardHeader>
                    <CardTitle className='flex justify-center text-2xl'>
                        Done
                    </CardTitle>
                    <p className='text-sm text-center text-gray-500'>{doneTasks.length} tasks</p>
                </CardHeader>
                <CardContent className='flex-1'>
                    <div className='space-y-3'>
                        {doneTasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                        {doneTasks.length === 0 && (
                            <p className='text-center text-gray-400 py-8'>No tasks yet</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}