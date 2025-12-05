'use client';

import React, { useState, memo } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

interface SubTaskListProps {
  value?: SubTask[];
  onChange?: (subtasks: SubTask[]) => void;
}

const SubTaskList = memo(function SubTaskList({ value = [], onChange }: SubTaskListProps) {
  const subtasks = value;

  const addSubtask = () => {
    const newSubtasks = [...subtasks, { id: crypto.randomUUID(), text: '', completed: false }];
    onChange?.(newSubtasks);
  };

  const removeSubtask = (id: string) => {
    const newSubtasks = subtasks.filter((subtask) => subtask.id !== id);
    onChange?.(newSubtasks);
  };

  const updateSubtask = (id: string, updatedSubtask: Partial<SubTask>) => {
    const newSubtasks = subtasks.map((subtask) =>
      subtask.id === id ? { ...subtask, ...updatedSubtask } : subtask
    );
    onChange?.(newSubtasks);
  };

  return (
    <div className="space-y-3">
      <div className="space-y-2">
        {subtasks.map((subtask) => (
          <div key={subtask.id} className="flex items-center gap-2 rounded-md border px-2 py-1">
            <Checkbox
              checked={subtask.completed}
              onCheckedChange={(checked) =>
                updateSubtask(subtask.id, { completed: Boolean(checked) })
              }
            />
            <Input
              value={subtask.text}
              placeholder="Subtask title"
              onChange={(e) => updateSubtask(subtask.id, { text: e.target.value })}
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => removeSubtask(subtask.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addSubtask}>
        + Add subtask
      </Button>
    </div>
  );
});

export default SubTaskList;
