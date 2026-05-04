# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite)
- **Build:** `npm run build`
- **Lint:** `npm run lint` (ESLint for .js/.jsx, zero warnings allowed)
- **Preview production build:** `npm run preview`

No test framework is configured.

## Architecture

Tasker is a React 18 task management app built with Vite 7 and Tailwind CSS v4.

**State management:** All task state lives in `TaskBoard` via `useState`. There is no context, reducer, or external state library. `TaskBoard` owns the `tasks` array and passes callbacks down to child components.

**Component tree:**
```
App
├── Header
├── Hero
├── TaskBoard  (stateful — owns tasks[], showTaskModal, editTask)
│   ├── SearchTask
│   ├── TaskAction  (Add Task / Delete All buttons)
│   ├── TaskList    (renders task table rows)
│   └── TaskModal   (add/edit form, conditionally rendered)
└── Footer
```

**Styling:** Tailwind v4 via `@tailwindcss/vite` plugin (not PostCSS). CSS entry point is `src/index.css` with `@import "tailwindcss"`. Dark theme with `bg-[#191D26]` base set on `<body>` in `index.html`.

## Known incomplete features

- Search (SearchTask) is a static form with no filtering logic
- Delete button in TaskList has no handler wired up
- "Delete All" button in TaskAction has no handler
- Favorite toggle (star icon) is display-only, not interactive
- TaskModal receives `onTaskEdit` but TaskBoard passes the task object (not a function) — edit flow has a prop mismatch
