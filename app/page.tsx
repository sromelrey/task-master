import TaskForm from "@/components/TaskForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black'>
      {/* Top bar */}
      <div className='p-4'>
        <TaskForm />
      </div>

      {/* Boards area */}
      <div className='flex flex-1 w-full gap-4 p-4'>
        {/* TODO Board */}
        <Card className='flex-1 flex flex-col'>
          <CardHeader>
            <CardTitle className='flex justify-center text-2xl'>
              Todo Board
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1'>
            {/* Todo tasks will go here */}
          </CardContent>
        </Card>

        {/* In Progress Board */}
        <Card className='flex-1 flex flex-col'>
          <CardHeader>
            <CardTitle className='flex justify-center text-2xl'>
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent className='flex-1'>
            {/* In-progress tasks will go here */}
          </CardContent>
        </Card>

        {/* Done Board */}
        <Card className='flex-1 flex flex-col'>
          <CardHeader>
            <CardTitle className='flex justify-center text-2xl'>Done</CardTitle>
          </CardHeader>
          <CardContent className='flex-1'>
            {/* Done tasks will go here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
