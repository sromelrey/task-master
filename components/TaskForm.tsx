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
import SubTaskList from "./SubTaskList";
import { Textarea } from "./ui/textarea";

function TaskForm() {
  return (
    <Sheet>
      {/* Button at the top (wherever you place <TaskForm /> in the page) */}
      <SheetTrigger asChild>
        <Button>Add task</Button>
      </SheetTrigger>

      {/* Sheet sliding from the top */}
      <SheetContent side='top' className='max-h-[70vh] overflow-y-auto'>
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
              <Input id='title' placeholder='e.g. Fix login bug' />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Input
                id='status'
                value={"Todo"}
                disabled={true}
                placeholder='Todo'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <SubTaskList />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='status'>Status</Label>
              <Textarea
                id='description'
                placeholder='Description or more details about the task'
              />
            </div>
          </div>

          <SheetFooter className='px-4 pb-4'>
            <Button type='submit'>Save task</Button>
            <SheetClose asChild>
              <Button variant='outline'>Cancel</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default TaskForm;
