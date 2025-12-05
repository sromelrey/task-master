# Ticket: TaskMaster Core Setup (v1)

## 🔥 What to Do Next (Prioritized)

### **IMMEDIATE (High Priority - Core Functionality)**

1. **Implement Drag-and-Drop** (Phase 2) - Add dnd-kit to TaskBoard.tsx to make cards draggable between columns
2. **Add Missing Redux Actions** (Phase 3) - Add `deleteTask`, `updateTask`, and `moveTask` actions to taskSlice
3. **Implement 12-Hour TTL** (Phase 4) - Add timestamp logic to localStorage persistence

### **SOON (Medium Priority - Enhanced UX)**

4. **Add Task Filters UI** (Phase 5) - Create filter controls for status/priority/date filtering
5. **Add useCallback Optimizations** (Phase 5) - Wrap event handlers in useCallback for better performance

### **FUTURE (Low Priority - Polish)**

6. **Add Task Editing** - Allow editing existing tasks (update form)
7. **Add Task Deletion** - Add delete buttons and confirmation dialogs

---

## Tasks

| Phase | Task                                                    | Description                                                                                        | Priority | Estimate | Status      |
| ----- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | -------- | -------- | ----------- |
| 1     | Initialize Next.js app & UI toolkit                     | Create a Next.js (App Router) project and set up Tailwind CSS and shadcn/ui for the base UI layer. | High     | 2h       | Done        |
| 1     | Install and configure Redux Toolkit & dnd-kit           | Add Redux Toolkit and React Redux for state management, plus @dnd-kit for drag-and-drop support.   | High     | 2h       | Done        |
| 2     | Implement TaskBoard layout with columns and cards       | Build `TaskBoard`, `TaskColumn`, and `TaskCard` using static data and drag-and-drop interactions.  | High     | 4h       | Done        |
| 3     | Add Redux task slice and wire state to the UI           | Create a `taskSlice` and connect it to the board so tasks are managed via Redux state.             | High     | 3h       | In Progress |
| 4     | Implement localStorage persistence with 12-hour TTL     | Save tasks + timestamp to localStorage and clear/restore based on a 12-hour time-to-live rule.     | High     | 3h       | In Progress |
| 5     | Add filters and derived data using useMemo              | Implement basic filters (e.g., status/priority) and memoized derived task lists with `useMemo`.    | Medium   | 3h       | In Progress |
| 5     | Optimize callbacks and components with useCallback/memo | Use `useCallback` and `React.memo` to reduce unnecessary re-renders in child components.           | Medium   | 3h       | In Progress |

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

- [x] Define a `Task` type (id, title, status, priority, timestamps, etc.)
- [x] Create `taskSlice` with actions: addTask, updateTaskStatus
- [ ] Add missing actions: deleteTask, updateTask, moveTask
- [x] Replace static mock data in `TaskBoard` with Redux state from `taskSlice`
- [x] Dispatch actions from drag-and-drop handler to update task status/order
- [x] Dispatch actions from form components (e.g., `TaskForm`) to add/edit tasks
- [x] Confirm UI updates correctly when Redux state changes
- [x] Commit Redux integration for tasks

</details>

---

### Checklist – Implement localStorage persistence with 12-hour TTL (Phase 4)

<details>
<summary>Show checklist</summary>

- [x] Set up redux-persist for automatic localStorage persistence
- [ ] Create custom storage configuration to save tasks + timestamp to `localStorage`
- [ ] On app load, read tasks + timestamp from `localStorage`
- [ ] Implement a function to check whether stored data is older than 12 hours
- [ ] If data is **fresh**, hydrate Redux state from `localStorage`
- [ ] If data is **expired**, clear `localStorage` and start with an empty/default state
- [ ] Add a `useEffect` or store subscription to persist Redux state changes back to `localStorage`
- [ ] Verify behavior by changing system time or using test data (before/after 12 hours)
- [ ] Commit persistence + TTL logic

</details>

---

### Checklist – Add filters and derived data using useMemo (Phase 5)

<details>
<summary>Show checklist</summary>

- [ ] Add basic filter state (e.g., selected status, priority) to Redux or local component state
- [ ] Create a `TaskFilters` component with dropdowns/buttons for filter selection
- [x] In `TaskBoard`, use `useMemo` to compute derived lists of tasks based on filters (e.g., filteredTasks)
- [x] Ensure `useMemo` dependencies are correctly set (tasks, filter state)
- [ ] Optionally add “Today” / “Overdue” views based on due dates using memoized computations
- [ ] Verify that filters update the UI without unnecessary recalculation of unrelated data
- [ ] Commit filter + `useMemo` integration

</details>

---

### Checklist – Optimize callbacks and components with useCallback/memo (Phase 5)

<details>
<summary>Show checklist</summary>

- [ ] Identify event handlers that are passed down to child components (e.g., onAddTask, onUpdateTask, onDeleteTask, onDragEnd)
- [ ] Wrap those handlers in `useCallback` in the parent component (e.g., `TaskBoard` or page component)
- [x] Apply `React.memo` to presentational components like `TaskCard` and possibly `TaskColumn`
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
    - Used for handlers like `handleAddTask`, `handleUpdateTask`, `handleDeleteTask`, and `handleDragEnd` that are passed down to child components.
    - Keeps function references stable, which works well with `React.memo` in children.

  - Passes memoized data and callbacks down to `TaskColumn` and `TaskCard` to minimize unnecessary re-renders.

---

### `TaskColumn`

- **Role:** Represents a single column in the board (e.g., Todo, In Progress, Done) and renders a list of `TaskCard` components.
- **Optimizations:**
  - **`React.memo`**
    - Wraps `TaskColumn` in `React.memo` so it only re-renders when its props (e.g., column title, list of tasks, column-specific handlers) change.
    - Especially useful when there are multiple columns; changing one column’s tasks shouldn’t re-render all others unnecessarily.

  - Receives memoized task arrays (from `TaskBoard`'s `useMemo`) and functions (from `useCallback`) to keep prop references stable.

---

### `TaskCard`

- **Role:** Displays a single task’s information and handles interactions (e.g., edit, delete, drag handle).
- **Optimizations:**
  - **`React.memo`**
    - Ensures that a `TaskCard` re-renders only when its specific `task` prop or callbacks change.
    - Important when there are many cards; updating one task shouldn’t cause all cards to re-render.

  - Benefits directly from:
    - Stable `task` objects (if derived via `useMemo` at a higher level).
    - Stable callback references from `useCallback` in the parent.

---

### `TaskFilters`

- **Role:** UI for selecting filters such as status, priority, or date-based views.
- **Optimizations:**
  - **`useCallback`**
    - Used for onChange handlers that update filter state (e.g., `handleStatusChange`, `handlePriorityChange`).
    - Prevents new handler functions from being created on every render, which helps when `TaskFilters` is memoized or when handlers are passed further down.

  - **`React.memo`** (optional)
    - Can be wrapped in `React.memo` if it receives stable props and should only re-render when filter options or current filter values change.

---

### Root Page / App Entry (`app/page.tsx` or equivalent)

- **Role:** Coordinates providers (Redux, theme), renders `TaskBoard`, and wires high-level app logic.
- **Optimizations:**
  - Light use of hooks here; most logic should live in `TaskBoard` and lower components.
  - Might use `useEffect` for side effects such as initial hydration from `localStorage` or global app-level behaviors.
  - Delegates actual performance-critical logic down into the board and task components to keep the entry component simple.
