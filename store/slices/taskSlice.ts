import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: SubTask[];
  status: 'todo' | 'in-progress' | 'done';
  startTime?: string;
  endTime?: string;
  createdAt?: string;
  lastUpdatedAt?: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const getTimestamp = () => new Date().toISOString();

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const now = getTimestamp();
      state.tasks.push({
        ...action.payload,
        createdAt: action.payload.createdAt ?? now,
        lastUpdatedAt: action.payload.lastUpdatedAt ?? now,
      });
    },
    // Add to taskSlice.ts reducers:
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        const now = getTimestamp();
        const previous = state.tasks[index];
        state.tasks[index] = {
          ...action.payload,
          createdAt: previous.createdAt ?? action.payload.createdAt ?? now,
          lastUpdatedAt: now,
        };
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: 'todo' | 'in-progress' | 'done' }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    resetTasks: (state) => {
      state.tasks = [];
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask, updateTask, resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
