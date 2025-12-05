'use client'
import { forwardRef, useImperativeHandle, useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

import SubTaskList from "./SubTaskList";
import TaskTime from "./TaskTime";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { addTask, Task } from "@/store/slices/taskSlice";
import { SubTask } from "@/store/slices/taskSlice";

export interface TaskFormRef {
  openForm: () => void;
}

const TaskForm = forwardRef<TaskFormRef>((props, ref) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);

  // Expose openForm method to parent
  useImperativeHandle(ref, () => ({
    openForm: () => setOpen(true),
  }));

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      subtasks: subtasks, // Use state instead of FormData
      status: 'todo',
      startTime: formData.get('time-picker-start') as string | undefined,
      endTime: formData.get('time-picker-end') as string | undefined,
    };
    dispatch(addTask(newTask));
    setOpen(false); // Close the sheet after adding task
    setSubtasks([]); // Reset subtasks after submission
  }


  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Button at the top (wherever you place <TaskForm /> in the page) */}
      <SheetTrigger asChild>
        <Button>Add task</Button>
      </SheetTrigger>

      {/* Sheet sliding from the top */}
      <SheetContent side='top' className='max-h-[70vh] overflow-y-auto'>
        <form onSubmit={handleAddTask} >
          <div className='mx-auto w-full max-w-md'>
            <SheetHeader>
              <SheetTitle>Add a new task</SheetTitle>
              <SheetDescription>
                Create a quick task for your board. Tasks will live for 12 hours.
              </SheetDescription>
            </SheetHeader>

            {/* Simple placeholder form */}
            <div className='space-y-4 px-4 pb-4 pt-4'>
              <div className='space-y-2'>
                <Label htmlFor='title'>Title</Label>
                <Input id='title' name="title" placeholder='e.g. Fix login bug' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='status'>Status</Label>
                <Input
                  id='status'
                  name="status"
                  value={"todo"}
                  disabled={true}
                  placeholder='todo'
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='status'>Status</Label>
                <SubTaskList value={subtasks} onChange={setSubtasks} />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name="description"
                  placeholder='Description or more details about the task'
                />
              </div>
              <TaskTime />
            </div>

            <SheetFooter className='px-4 pb-4'>
              <SheetClose asChild>
                <Button type='submit' className=" cursor-pointer">Save task</Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant='outline'>Cancel</Button>
              </SheetClose>
            </SheetFooter>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
});

TaskForm.displayName = 'TaskForm';

export default TaskForm;

