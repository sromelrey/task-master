import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
}

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload)
        },
        updateTaskStatus: (state, action: PayloadAction<{ id: string; status: 'todo' | 'in-progress' | 'done' }>) => {
            const task = state.tasks.find(t => t.id === action.payload.id);
            if (task) {
                task.status = action.payload.status;
            }
        }
    }
})

export const { addTask, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
