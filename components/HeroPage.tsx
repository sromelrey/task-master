'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, ListTodo, Sparkles } from "lucide-react";

interface HeroPageProps {
    onGetStarted: () => void;
}

export default function HeroPage({ onGetStarted }: HeroPageProps) {
    return (
        <div className='flex flex-1 items-center justify-center p-8'>
            <div className='max-w-4xl w-full space-y-8 text-center'>
                {/* Hero Section */}
                <div className='space-y-4'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium'>
                        <Sparkles className='w-4 h-4' />
                        Welcome to Task Master
                    </div>

                    <h1 className='text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent'>
                        Organize Your Day,
                        <br />
                        Accomplish Your Goals
                    </h1>

                    <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
                        A simple, beautiful task management app that helps you stay focused and productive.
                        No sign-up required, your data stays private in your browser.
                    </p>
                </div>

                {/* CTA Button */}
                <div className='flex justify-center gap-4'>
                    <Button
                        size='lg'
                        className='text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer'
                        onClick={onGetStarted}
                    >
                        <ListTodo className='w-5 h-5 mr-2' />
                        Create Your First Task
                    </Button>
                </div>

                {/* Features Grid */}
                <div className='grid md:grid-cols-3 gap-6 pt-8'>
                    <Card className='border-2 hover:border-blue-500 transition-colors duration-200'>
                        <CardContent className='pt-6 space-y-2'>
                            <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto'>
                                <ListTodo className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                            </div>
                            <h3 className='font-semibold text-lg'>Organize Tasks</h3>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                                Categorize tasks into Todo, In Progress, and Done columns
                            </p>
                        </CardContent>
                    </Card>

                    <Card className='border-2 hover:border-purple-500 transition-colors duration-200'>
                        <CardContent className='pt-6 space-y-2'>
                            <div className='w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto'>
                                <Clock className='w-6 h-6 text-purple-600 dark:text-purple-400' />
                            </div>
                            <h3 className='font-semibold text-lg'>Track Time</h3>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                                Set start and end times to manage your schedule effectively
                            </p>
                        </CardContent>
                    </Card>

                    <Card className='border-2 hover:border-green-500 transition-colors duration-200'>
                        <CardContent className='pt-6 space-y-2'>
                            <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto'>
                                <CheckCircle2 className='w-6 h-6 text-green-600 dark:text-green-400' />
                            </div>
                            <h3 className='font-semibold text-lg'>Stay Persistent</h3>
                            <p className='text-sm text-gray-600 dark:text-gray-400'>
                                Your tasks are saved locally and persist across sessions
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Privacy Note */}
                <div className='pt-4'>
                    <p className='text-sm text-gray-500 dark:text-gray-500'>
                        🔒 Your data is stored locally in your browser. No servers, no tracking, complete privacy.
                    </p>
                </div>
            </div>
        </div>
    );
}
