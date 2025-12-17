'use client';
import { useEffect, useState } from 'react';
import { Label } from './ui/label';
import { Input } from './ui/input';

interface TaskTimeProps {
  initialStartTime?: string;
  initialEndTime?: string;
  onTimeChange?: (times: { startTime: string; endTime: string }) => void;
}

function TaskTime({ initialStartTime, initialEndTime, onTimeChange }: TaskTimeProps) {
  // For editing existing tasks, use provided times; for new tasks, use current time
  const [startTime, setStartTime] = useState<string>(
    () =>
      initialStartTime ||
      new Date().toLocaleTimeString('en-GB', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      })
  );

  const [endTime, setEndTime] = useState<string>(() => initialEndTime || startTime);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = e.target.value;
    setStartTime(newStart);
    // Ensure end time is not earlier than start time
    if (endTime && newStart > endTime) {
      setEndTime(newStart);
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = e.target.value;
    // Only allow end time >= start time
    if (newEnd >= startTime) {
      setEndTime(newEnd);
    } else {
      setEndTime(startTime);
    }
  };

  useEffect(() => {
    onTimeChange?.({ startTime, endTime });
  }, [startTime, endTime, onTimeChange]);

  return (
    <div className="flex flex-row w-full justify-evenly gap-4">
      <div className="flex flex-col gap-3 w-full">
        <Label htmlFor="time-picker-start">Start Time</Label>
        <Input
          type="time"
          name="time-picker-start"
          id="time-picker-start"
          step="1"
          value={startTime}
          onChange={handleStartChange}
          className="bg-background w-full appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Label htmlFor="time-picker-end">End Time</Label>
        <Input
          type="time"
          id="time-picker-end"
          name="time-picker-end"
          step="1"
          value={endTime}
          onChange={handleEndChange}
          className="bg-background w-full appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}

export default TaskTime;
