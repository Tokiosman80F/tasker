# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (ESLint for .js/.jsx, zero warnings allowed)
- **Preview production build:** `npm run preview`

No test framework is configured.

## Architecture

Tasker is a React 18 task management app built with Vite 7 and Tailwind CSS v4. Based on the "Learn with Sumit" Reactive Accelerator course.

**State management:** All task state lives in `TaskBoard` via `useState`. There is no context, reducer, or external state library. `TaskBoard` owns the `tasks` array, `searchTerm`, `showTaskModal`, and `editTask` state, passing callbacks down to child components.

**Component tree:**
```
App
├── Header
├── Hero
├── TaskBoard  (stateful — owns tasks[], searchTerm, showTaskModal, editTask)
│   ├── SearchTask       (controlled input, filters tasks by title)
│   ├── TaskAction       (Add Task / Delete All buttons)
│   ├── TaskList         (renders task table rows with edit/delete/fav actions)
│   ├── NoTaskFound      (shown when filtered task list is empty)
│   └── TaskModal        (add/edit form, conditionally rendered as overlay)
└── Footer
```

**Key patterns:**
- Task IDs generated via `crypto.randomUUID()`
- `TaskModal` handles both add and edit: receives the task object as `onTaskEdit` (null for add mode), determines mode via `isAdd = !onTaskEdit`
- `TaskModal` validates title and priority fields before saving; tags are comma-separated strings converted to arrays
- Search filters `tasks` array by case-insensitive title match before rendering

**Styling:** Tailwind v4 via `@tailwindcss/vite` plugin (not PostCSS). CSS entry point is `src/index.css` with `@import "tailwindcss"`. Dark theme with `bg-[#191D26]` base set on `<body>` in `index.html`.
