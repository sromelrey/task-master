'use client';

import React, { memo } from 'react';
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
  status?: 'todo' | 'in-progress' | 'done';
  editable?: boolean;
}

const SubTaskList = memo(function SubTaskList({ value = [], onChange, status, editable = false }: SubTaskListProps) {
  const subtasks = value;

  const stopPropagation = (event: React.PointerEvent<HTMLElement>) => {
    event.stopPropagation();
  };

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
              disabled={!editable && status !== 'in-progress'}
              onPointerDown={stopPropagation}
              onCheckedChange={(checked) =>
                updateSubtask(subtask.id, { completed: Boolean(checked) })
              }
            />
            {editable ? (
              <Input
                value={subtask.text}
                placeholder="Subtask title"
                onPointerDown={stopPropagation}
                onChange={(e) => updateSubtask(subtask.id, { text: e.target.value })}
              />
            ) : (
              <span
                className={`text-sm flex-1 ${
                  subtask.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {subtask.text}
              </span>
            )}
            {editable && (
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onPointerDown={stopPropagation}
                onClick={() => removeSubtask(subtask.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {editable && (
        <Button type="button" variant="outline" size="sm" onPointerDown={stopPropagation} onClick={addSubtask}>
          + Add subtask
        </Button>
      )}
    </div>
  );
});

export default SubTaskList;
