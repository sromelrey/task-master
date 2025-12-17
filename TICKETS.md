# Ticket: TaskMaster Core Setup (v1)

## 🔥 What to Do Next (Prioritized)

### **IMMEDIATE (High Priority - Core Functionality)**

1. ✅ **Implement Drag-and-Drop** (Phase 2) - COMPLETED: dnd-kit integrated in TaskBoard.tsx for cross-column dragging
2. ✅ **Add Missing Redux Actions** (Phase 3) - COMPLETED: `deleteTask`, `updateTask`, `updateTaskStatus` actions implemented
3. ✅ **Implement 8-Hour TTL** (Phase 4) - COMPLETED: Tasks automatically deleted after 8 hours via useTaskCleanup hook

### **SOON (Medium Priority - Enhanced UX)**

4. ✅ **Add useCallback Optimizations** (Phase 5) - COMPLETED: useCallback applied to all event handlers in TaskBoard and TaskCard

### **FUTURE (Low Priority - Polish)**

6. ✅ **Add Task Editing** - COMPLETED: TaskForm supports editing via `openFormForEdit` method
7. ✅ **Add Task Deletion** - COMPLETED: Delete buttons with confirmation dialogs in TaskCard

### **BONUS FEATURES (Implemented Beyond Original Scope)**

8. ✅ **SubTask Management** - COMPLETED: Full subtask CRUD functionality with status-based checkbox controls
9. ✅ **Time-based Task Scheduling** - COMPLETED: TaskTime component with start/end time selection and overlap validation
10. ✅ **Advanced Drag Interactions** - COMPLETED: Smart drag handling with event propagation fixes for interactive elements

---

## Tasks

| Phase | Task                                                    | Description                                                                                        | Priority | Estimate | Status |
| ----- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------- | -------- | ------ |
| 1     | Initialize Next.js app & UI toolkit                     | Create a Next.js (App Router) project and set up Tailwind CSS and shadcn/ui for the base UI layer. | High     | 2h       | Done   |
| 1     | Install and configure Redux Toolkit & dnd-kit           | Add Redux Toolkit and React Redux for state management, plus @dnd-kit for drag-and-drop support.   | High     | 2h       | Done   |
| 2     | Implement TaskBoard layout with columns and cards       | Build `TaskBoard`, `TaskColumn`, and `TaskCard` using static data and drag-and-drop interactions.  | High     | 4h       | Done   |
| 3     | Add Redux task slice and wire state to the UI           | Create a `taskSlice` and connect it to the board so tasks are managed via Redux state.             | High     | 3h       | Done   |
| 4     | Implement localStorage persistence with 8-hour TTL      | Save tasks + timestamp to localStorage and auto-delete tasks after 8-hour time-to-live rule.       | High     | 3h       | Done   |
| 5     | Optimize callbacks and components with useCallback/memo | Use `useCallback` and `React.memo` to reduce unnecessary re-renders in child components.           | Medium   | 3h       | done   |
| +     | SubTask Management System                               | Full CRUD operations for subtasks with status-based permissions and visual feedback.               | Bonus    | 4h       | Done   |
| +     | Time-based Scheduling & Validation                      | TaskTime component with overlap detection and time range selection.                                | Bonus    | 3h       | Done   |

---

### Checklist – Initialize Next.js app & UI toolkit (Phase 1)

<details>
<summary>Show checklist</summary>

- [x] Create a new Next.js project with the App Router enabled
- [x] Configure TypeScript in the project
- [x] Install and configure Tailwind CSS
- [x] Initialize shadcn/ui and generate a basic component (e.g., Button)
- [x] Verify a sample page renders correctly with Tailwind + shadcn styles
- [x] Commit initial setup to version control

</details>

---

### Checklist – Install and configure Redux Toolkit & dnd-kit (Phase 1)

<details>
<summary>Show checklist</summary>

- [x] Install `@reduxjs/toolkit` and `react-redux`
- [x] Create a basic `store/index.ts` and hook it into the Next.js App Router via a `providers.tsx`
- [x] Install `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities`
- [x] Verify Redux store is accessible in a test component (e.g., simple counter)
- [x] Set up redux-persist for localStorage persistence
- [ ] Verify dnd-kit is working in a minimal example (dragging a single item)
- [ ] Commit dependency setup and basic wiring

</details>

---

### Checklist – Implement TaskBoard layout with columns and cards (Phase 2)

<details>
<summary>Show checklist</summary>

- [x] Create `TaskBoard` component with a basic layout (e.g., columns side by side)
- [x] Create `TaskColumn` component to represent a single column (e.g., Todo, In Progress, Done)
- [x] Create `TaskCard` component to represent a single task card
- [x] Integrate dnd-kit into `TaskBoard` and `TaskColumn` for drag-and-drop behavior
- [x] Use mock/static task data to render the board for now (Replaced with Redux state)
- [x] Ensure drag-and-drop updates the visual order of cards within and across columns
- [x] Commit initial UI + drag-and-drop implementation

</details>

---

### Checklist – Add Redux task slice and wire state to the UI (Phase 3)

<details>
<summary>Show checklist</summary>

- [x] Define a `Task` type (id, title, status, priority, timestamps, etc.) + SubTask type
- [x] Create `taskSlice` with actions: addTask, updateTaskStatus
- [x] Add missing actions: deleteTask, updateTask
- [x] Replace static mock data in `TaskBoard` with Redux state from `taskSlice`
- [x] Dispatch actions from drag-and-drop handler to update task status/order
- [x] Dispatch actions from form components (e.g., `TaskForm`) to add/edit tasks
- [x] Confirm UI updates correctly when Redux state changes
- [x] Commit Redux integration for tasks

</details>

---

### Checklist – Implement localStorage persistence with 8-hour TTL (Phase 4)

<details>
<summary>Show checklist</summary>

- [x] Set up redux-persist for automatic localStorage persistence
- [x] Create `useTaskCleanup` hook to automatically delete tasks older than 8 hours
- [x] Integrate `useTaskCleanup` hook in main page component
- [x] Tasks are automatically removed after 8 hours based on `lastUpdatedAt` or `createdAt` timestamp
- [x] TTL runs once per app session to avoid performance issues
- [x] Verified 8-hour expiration logic works correctly

</details>

---

---

### Checklist – Optimize callbacks and components with useCallback/memo (Phase 5)

<details>
<summary>Show checklist</summary>

- [x] Identify event handlers that are passed down to child components (e.g., onAddTask, onUpdateTask, onDeleteTask, onDragEnd)
- [x] Wrap those handlers in `useCallback` in the parent component (e.g., `TaskBoard` or page component)
- [x] Apply `React.memo` to presentational components like `TaskCard`, `TaskColumn`, and `SubTaskList`
- [ ] Confirm that components only re-render when their relevant props actually change
- [ ] (Optional) Use React DevTools Profiler to compare render counts before vs after optimization
- [ ] Document how and why `useCallback` and `React.memo` were applied in this project
- [ ] Commit performance optimization changes

</details>

---

## Component Notes – React Optimizations

### `TaskBoard`

- **Role:** Top-level board that orchestrates columns, drag-and-drop logic, and filtering.
- **Optimizations:**
  - **`useMemo`**
    - Used to compute derived data such as `filteredTasks` or grouped tasks per column (e.g., `tasksByStatus`), based on raw task list + filters.
    - Prevents re-running filter/sort logic on every render when inputs haven’t changed.

  - **`useCallback`**
    - Used for handlers like `handleDragEnd` and `handleEditTask` that are passed down to child components.
    - Keeps function references stable, which works well with `React.memo` in children.

  - Passes memoized data and callbacks down to `TaskColumn` and `TaskCard` to minimize unnecessary re-renders.

---

### `TaskColumn`

- **Role:** Represents a single column in the board (e.g., Todo, In Progress, Done) and renders a list of `TaskCard` components.
- **Optimizations:**
  - **`React.memo`**
    - Wraps `TaskColumn` in `React.memo` so it only re-renders when its props (e.g., column title, list of tasks, column-specific handlers) change.
    - Especially useful when there are multiple columns; changing one column's tasks shouldn't re-render all others unnecessarily.

  - **`useMemo`**
    - Used in `TaskBoard` parent to memoize filtered task arrays per status before passing to `TaskColumn`

  - Receives memoized task arrays (from `TaskBoard`'s `useMemo`) and functions (from `useCallback`) to keep prop references stable.

---

### `TaskCard`

- **Role:** Displays a single task’s information and handles interactions (e.g., edit, delete, drag handle).
- **Optimizations:**
  - **`React.memo`**
    - Ensures that a `TaskCard` re-renders only when its specific `task` prop or callbacks change.
    - Important when there are many cards; updating one task shouldn't cause all cards to re-render.

  - **`useCallback`**
    - Used for `handleDelete`, `handleEdit`, and `handleSubtasksChange` event handlers.
    - Prevents unnecessary re-renders of child components when parent re-renders.

  - Benefits directly from:
    - Stable `task` objects (if derived via `useMemo` at a higher level).
    - Stable callback references from `useCallback` in the parent.

---

### `SubTaskList`

- **Role:** Displays and manages subtasks within tasks, with different modes for viewing vs editing.
- **Optimizations:**
  - **`React.memo`**
    - Prevents unnecessary re-renders when subtask data hasn't changed
    - Includes conditional rendering based on `editable` prop for different UI modes

---

### Root Page / App Entry (`app/page.tsx` or equivalent)

- **Role:** Coordinates providers (Redux, theme), renders `TaskBoard`, and wires high-level app logic.
- **Optimizations:**
  - Light use of hooks here; most logic should live in `TaskBoard` and lower components.
  - Might use `useEffect` for side effects such as initial hydration from `localStorage` or global app-level behaviors.
  - Delegates actual performance-critical logic down into the board and task components to keep the entry component simple.
