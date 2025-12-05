'use client'
import React, { memo } from 'react'
import { Task } from "@/store/slices/taskSlice";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default memo(function TaskCard({ task }: { task: Task }) {
    return (
        <Card className='hover:shadow-md transition-shadow duration-200'>
            <CardHeader className='pb-3'>
                <CardTitle className='text-lg'>{task.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-gray-600 dark:text-gray-400 mb-3'>
                    {task.description}
                </p>
                {(task.startTime || task.endTime) && (
                    <div className='flex gap-2 text-xs text-gray-500'>
                        {task.startTime && (
                            <span className='bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded'>
                                Start: {task.startTime}
                            </span>
                        )}
                        {task.endTime && (
                            <span className='bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded'>
                                End: {task.endTime}
                            </span>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
})