# TaskMaster 📝

TaskMaster is a modern, lightweight Kanban task board built with **Next.js (App Router)**, **shadcn/ui**, **React drag-and-drop**, **Tailwind CSS**, and **Redux Toolkit** for state management.

The main idea:  
👉 Your tasks are **temporary** and live only for **8 hours** in the browser's `localStorage`.  
After 8 hours, your data is automatically cleaned up, giving you a fresh slate for focused work sessions.

---

## Features

### Core Features

- ✅ **Kanban-style board** with smooth drag-and-drop between columns
- ✅ **Full CRUD operations** - Create, read, update, and delete tasks
- ✅ **Automatic cleanup** with **8-hour TTL** (time to live)
- ✅ **Local-only storage** (no backend, everything stays in your browser)
- ✅ **Centralized state management** using **Redux Toolkit**
- ✅ **Modern UI** with shadcn/ui + Tailwind CSS
- ✅ Built on **Next.js App Router**

### Advanced Features

- ✅ **Subtask management** with status-based checkbox controls
- ✅ **Time scheduling** with start/end times and overlap validation
- ✅ **Performance optimized** with React.memo and useCallback
- ✅ **Advanced drag interactions** with proper event handling
- ✅ **Responsive design** that works on all devices

---

## How the 8-Hour TTL Works

- **Automatic Persistence**: Tasks are automatically saved to `localStorage` via Redux persist
- **Smart Cleanup**: A background hook checks task timestamps and automatically deletes tasks older than 8 hours
- **Timestamp Tracking**: Each task tracks both `createdAt` and `lastUpdatedAt` timestamps
- **Session-Based Cleanup**: Cleanup runs once per app session for optimal performance

This makes TaskMaster perfect for:

- **Daily planning** - Plan your day, tasks auto-clean next morning
- **Focused work sessions** - Temporary lists that don't clutter your workspace
- **Meeting agendas** - Create, complete, and forget
- **Quick to-do lists** - Short-term tasks that clean themselves up

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/) + [redux-persist](https://github.com/rt2zz/redux-persist)
- **UI Library:** [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Drag and Drop:** [`@dnd-kit`](https://dndkit.com/) (React drag-and-drop utilities)
- **Storage:** Browser `localStorage` with custom 8-hour TTL logic
- **Performance:** React.memo, useCallback, useMemo optimizations

---

## Libraries & Dependencies

Core libraries used in this implementation:

- **React & Next.js**
  - `next` - App Router framework
  - `react` & `react-dom` - React framework
  - `typescript` - Type safety and development experience
- **State Management**
  - `@reduxjs/toolkit` - Redux with simplified setup
  - `react-redux` - React bindings for Redux
  - `redux-persist` - Automatic localStorage persistence
- **UI & Styling**
  - `tailwindcss` - Utility-first CSS framework
  - `postcss` & `autoprefixer` - CSS processing
  - `@radix-ui/react-*` - Accessible UI primitives (via shadcn/ui)
  - `lucide-react` - Beautiful icon library
- **Drag and Drop**
  - `@dnd-kit/core` - Drag-and-drop framework
  - `@dnd-kit/sortable` - Sortable list functionality
  - `@dnd-kit/utilities` - Helper utilities
- **Performance & Utilities**
  - `class-variance-authority` - Component variant management
  - `clsx` & `tailwind-merge` - Conditional class merging
  - `date-fns` - Date utilities (if used in time handling)

> Note: Exact versions will be set in `package.json` when the project is initialized.

---

## Key Components

### TaskBoard

- **Purpose**: Main Kanban board orchestrating drag-and-drop functionality
- **Features**: useMemo for filtered tasks, useCallback for stable handlers
- **Performance**: Optimized with React.memo child components

### TaskCard

- **Purpose**: Individual task display with editing capabilities
- **Features**: Subtask management, drag handle, edit/delete actions
- **Performance**: React.memo with useCallback event handlers

### SubTaskList

- **Purpose**: Manages subtasks with different modes (view/edit)
- **Features**: Status-based checkbox controls, CRUD operations
- **Modes**: Read-only (cards) vs. editable (forms)

### TaskForm

- **Purpose**: Create and edit tasks with full validation
- **Features**: Subtask management, time scheduling, overlap detection
- **Validation**: Time conflict prevention, required field checks

---

## Usage

1. **Add Tasks**: Click "Add task" to create new tasks with titles, descriptions, and time slots
2. **Manage Subtasks**: Add subtasks to break down complex tasks into manageable pieces
3. **Drag & Drop**: Move tasks between Todo → In Progress → Done columns seamlessly
4. **Time Scheduling**: Set start/end times with automatic overlap detection and validation
5. **Automatic Cleanup**: Tasks are automatically deleted after 8 hours for a fresh start

## Development Features

This project implements modern React development practices:

- **Performance**: React.memo, useCallback, and useMemo optimizations prevent unnecessary re-renders
- **Type Safety**: Full TypeScript implementation with strict type checking
- **Accessibility**: Built on Radix UI primitives for accessible components
- **State Management**: Redux Toolkit with automatic localStorage persistence
- **Component Architecture**: Modular, reusable components with clear separation of concerns

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **pnpm** / **yarn** / **npm**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd task-master

# Install dependencies
pnpm install
# or
yarn install
# or
npm install

# Run development server
pnpm dev
# or
yarn dev
# or
npm run dev
```

Visit `http://localhost:3000` to see TaskMaster in action!

---

## Philosophy

**TaskMaster** was built with the philosophy that productivity tools should be:

- **Simple**: Clean, intuitive interface without overwhelming features
- **Focused**: Purpose-built for short-term task management
- **Performant**: Optimized for smooth user experience
- **Self-managing**: Automatic cleanup prevents digital clutter
- **Privacy-first**: Everything stays in your browser, no data collection

Perfect for daily planning, focused work sessions, meeting agendas, or any temporary task management needs! 🚀

## Project Structure

```
task-master/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main TaskMaster page
│   └── providers.tsx        # Redux Provider setup
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── TaskBoard.tsx        # Main board with drag-and-drop logic
│   ├── TaskColumn.tsx       # Kanban columns (Todo, In Progress, Done)
│   ├── TaskCard.tsx         # Individual draggable task cards
│   ├── TaskForm.tsx         # Create/edit task form with subtasks
│   ├── TaskTime.tsx         # Time picker component with validation
│   ├── SubTaskList.tsx      # Subtask management component
│   └── HeroPage.tsx         # Landing page component
├── hooks/
│   └── useTaskCleanup.ts    # 8-hour TTL cleanup logic
├── store/
│   ├── index.ts             # Redux store with persistence
│   └── slices/
│       └── taskSlice.ts     # Task state management
├── lib/
│   └── utils.ts             # Utility functions
└── public/                  # Static assets
```
