'use client';
import { forwardRef, useImperativeHandle, useState, FormEvent } from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { Plus, ClipboardList } from 'lucide-react';

import SubTaskList from './SubTaskList';
import TaskTime from './TaskTime';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addTask, updateTask, Task, SubTask } from '@/store/slices/taskSlice';
import tasksReducer from '@/store/slices/taskSlice';
import { checkTimeOverlap } from '@/lib/utils';

export interface TaskFormRef {
  openForm: () => void;
  openFormForEdit: (task: Task) => void;
}

const TaskForm = forwardRef<TaskFormRef>((props, ref) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [open, setOpen] = useState(false);
  const [subtasks, setSubtasks] = useState<SubTask[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const clearOverlapError = () => {
    if (error) {
      setError(null);
    }
  };

  // Reset form state to initial values
  const resetFormState = () => {
    setSubtasks([]);
    setEditingTask(null);
    setError(null);
    setTitle('');
    setDescription('');
  };

  // Expose openForm methods to parent
  useImperativeHandle(ref, () => ({
    openForm: () => {
      resetFormState();
      setOpen(true);
    },
    openFormForEdit: (task: Task) => {
      setEditingTask(task);
      setSubtasks(task.subtasks);
      setTitle(task.title);
      setDescription(task.description);
      setError(null);
      setOpen(true);
    },
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const now = new Date().toISOString();
    setError(null);

    // Validate required fields
    if (!title.trim()) {
      toast.error('Title is required', {
        description: 'Please enter a title for your task.',
      });
      return;
    }

    const startTime = (formData.get('time-picker-start') as string) || undefined;
    const endTime = (formData.get('time-picker-end') as string) || undefined;

    const overlaps = tasks.some((task) => {
      if (editingTask && task.id === editingTask.id) {
        return false;
      }

      return checkTimeOverlap(startTime, endTime, task.startTime, task.endTime);
    });

    if (overlaps) {
      toast.error('Time slot already taken', {
        description: 'Tasks may not overlap. Please pick a different time range.',
      });
      return;
    }

    if (editingTask) {
      // Update existing task
      const updatedTask: Task = {
        ...editingTask,
        title: title,
        description: description,
        subtasks: subtasks,
        startTime,
        endTime,
        lastUpdatedAt: now,
      };
      dispatch(updateTask(updatedTask));
      toast.success('Task updated successfully', {
        description: `"${title}" has been updated.`,
      });
    } else {
      // Create new task
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: title,
        description: description,
        subtasks: subtasks,
        status: 'todo',
        startTime,
        endTime,
        createdAt: now,
        lastUpdatedAt: now,
      };
      dispatch(addTask(newTask));
      toast.success('Task created successfully', {
        description: `"${title}" has been added to your board.`,
      });
    }

    setOpen(false);
    resetFormState();
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset form state when sheet closes
      resetFormState();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      {/* Button at the top (wherever you place <TaskForm /> in the page) */}
      <SheetTrigger asChild>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="mr-2 h-6 w-6  from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" />
            <p>Task Master</p>
          </div>
          <Button className="cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-32">
            <Plus className="mr-2 h-4 w-4" />
            Add task
          </Button>
        </div>
      </SheetTrigger>

      {/* Sheet sliding from the top */}
      <SheetContent side="top" className="max-h-[80vh] sm:max-h-[70vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto w-full max-w-md px-4 sm:px-0">
            <SheetHeader>
              <SheetTitle>{editingTask ? 'Edit task' : 'Add a new task'}</SheetTitle>
              <SheetDescription>
                {editingTask
                  ? 'Update your task details.'
                  : 'Create a quick task for your board. Tasks will live for 8 hours.'}
              </SheetDescription>
            </SheetHeader>

            {/* Simple placeholder form */}
            <div className="space-y-3 sm:space-y-4 pb-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Fix login bug"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Input
                  id="status"
                  name="status"
                  value={editingTask?.status || 'todo'}
                  disabled={true}
                  placeholder="todo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtasks">Subtasks</Label>
                <SubTaskList value={subtasks} onChange={setSubtasks} editable={true} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Description or more details about the task"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <TaskTime
                initialStartTime={editingTask?.startTime}
                initialEndTime={editingTask?.endTime}
                onTimeChange={clearOverlapError}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
            </div>

            <SheetFooter className="px-4 pb-4">
              <Button type="submit" className=" cursor-pointer">
                Save task
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Cancel</Button>
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
