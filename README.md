# TaskMaster 📝

TaskMaster is a lightweight task board built with **Next.js (App Router)**, **shadcn/ui**, **React drag and drop**, **Tailwind CSS**, and **Redux Toolkit** for state management.

The main idea:  
👉 Your tasks are **temporary** and live only for **12 hours** in the browser’s `localStorage`.  
After 12 hours, your data is automatically deleted, giving you a clean slate for short-term, focused work sessions.

---

## Features

- ✅ **Kanban-style board** (using React drag-and-drop)
- ✅ **Temporary task storage** with a **12-hour TTL** (time to live)
- ✅ **Local-only data** (no backend, everything stays in your browser)
- ✅ **Centralized state management** using **Redux Toolkit**
- ✅ **Modern UI** with shadcn/ui + Tailwind CSS
- ✅ Built on **Next.js App Router**

---

## How the 12-Hour Storage Works

- When you create or update tasks, TaskMaster saves:
  - The **task data** (via Redux state)
  - A **timestamp** indicating when it was last updated
- On **every app load**:
  - The app checks `localStorage` for saved data and the timestamp
  - If the saved timestamp is **older than 12 hours**, all stored tasks are **cleared**
  - If it’s still within 12 hours, the tasks are **restored** into Redux state and rendered on the board

This makes TaskMaster ideal for:

- Daily planning
- One-off work sessions
- Temporary to-do lists you don’t want to keep forever

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) + [React Redux](https://react-redux.js.org/)
- **UI Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Drag and Drop:** [`@dnd-kit`](https://dndkit.com/) (React drag-and-drop utilities)
- **Storage:** Browser `localStorage` with a 12-hour TTL

---

## Libraries & Dependencies

Core libraries we are going to use in this app:

- **React & Next.js**
  - `next`
  - `react`
  - `react-dom`
  - `typescript` (for type safety)
- **State Management**
  - `@reduxjs/toolkit`
  - `react-redux`
- **UI & Styling**
  - `tailwindcss`
  - `postcss`
  - `autoprefixer`
  - `@radix-ui/react-*` (via shadcn/ui, for accessible primitives)
  - `shadcn/ui` components (installed via the shadcn CLI)
- **Drag and Drop**
  - `@dnd-kit/core`
  - `@dnd-kit/sortable`
  - `@dnd-kit/utilities`
- **Utilities (likely)**
  - `class-variance-authority` (used by shadcn/ui)
  - `tailwind-merge` (for merging Tailwind classes)
  - `zod` or similar (optional, for schema validation if needed later)

> Note: Exact versions will be set in `package.json` when the project is initialized.

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **pnpm** / **yarn** / **npm**

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd taskmaster

# Install dependencies
pnpm install
# or
yarn install
# or
npm install
```

# Folder Structure

```bash
src/
├── app/
│   ├── providers.tsx        # Redux Provider, UI/theme providers
│   └── page.tsx             # Main TaskMaster page (App Router)
├── components/
│   ├── TaskBoard.tsx        # Main board with drag-and-drop
│   ├── TaskColumn.tsx       # Columns (e.g., Todo, In Progress, Done)
│   ├── TaskCard.tsx         # Individual task cards
│   └── TaskForm.tsx         # Create / edit task form
├── store/
│   ├── index.ts             # Redux store configuration (Redux Toolkit)
│   └── taskSlice.ts         # Task-related reducers, actions, and selectors
└── lib/
    └── storage.ts           # Helpers for localStorage + 12-hour TTL
```
