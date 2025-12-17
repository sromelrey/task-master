'use client';

import React, { memo } from 'react';
import { X, Clock } from 'lucide-react';
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

const SubTaskList = memo(function SubTaskList({
  value = [],
  onChange,
  status,
  editable = false,
}: SubTaskListProps) {
  const subtasks = value;

  const stopPropagation = (event: React.SyntheticEvent) => {
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

  const completedCount = subtasks.filter((st) => st.completed).length;
  const totalCount = subtasks.length;

  return (
    <div className="space-y-2 sm:space-y-3">
      {totalCount > 0 && (
        <div className="flex items-center justify-between">
          <span
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-medium ${
              completedCount === totalCount && totalCount > 0
                ? 'text-green-600 dark:text-green-500'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            {completedCount} of {totalCount} complete
          </span>
        </div>
      )}
      <div className="space-y-1.5 sm:space-y-2">
        {subtasks.map((subtask) => (
          <div
            key={subtask.id}
            className="flex items-center gap-1.5 sm:gap-2 rounded-md   px-1.5 sm:px-2 py-1 sm:py-1"
          >
            <Checkbox
              checked={subtask.completed}
              disabled={!editable && status !== 'in-progress'}
              onPointerDown={stopPropagation}
              onTouchStart={stopPropagation}
              onCheckedChange={(checked) =>
                updateSubtask(subtask.id, { completed: Boolean(checked) })
              }
              className="shrink-0"
            />
            {editable ? (
              <Input
                value={subtask.text}
                placeholder="Subtask title"
                onPointerDown={stopPropagation}
                onTouchStart={stopPropagation}
                onChange={(e) => updateSubtask(subtask.id, { text: e.target.value })}
                className="text-xs sm:text-sm h-7 sm:h-8"
              />
            ) : (
              <span
                onClick={() => {
                  if (editable || status === 'in-progress') {
                    updateSubtask(subtask.id, { completed: !subtask.completed });
                  }
                }}
                className={`text-xs sm:text-sm flex-1 ${
                  subtask.completed
                    ? 'line-through text-gray-500'
                    : 'text-gray-700 dark:text-gray-300'
                } ${
                  editable || status === 'in-progress'
                    ? 'cursor-pointer hover:text-gray-900 dark:hover:text-gray-100 transition-colors'
                    : ''
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
                onTouchStart={stopPropagation}
                onClick={() => removeSubtask(subtask.id)}
                className="shrink-0 h-6 w-6 sm:h-8 sm:w-8"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {editable && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onPointerDown={stopPropagation}
          onTouchStart={stopPropagation}
          onClick={addSubtask}
          className="w-full sm:w-auto text-xs sm:text-sm"
        >
          + Add subtask
        </Button>
      )}
    </div>
  );
});

export default SubTaskList;
