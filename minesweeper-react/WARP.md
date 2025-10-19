# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project: Vite + React + TypeScript Minesweeper

Commands

Use npm (package-lock.json is present).
- Install dependencies
  - npm ci
- Start dev server (Vite)
  - npm run dev
- Build (type-check + bundle)
  - npm run build
- Preview local production build
  - npm run preview
- Lint entire project
  - npm run lint
- Lint a single file
  - npx eslint src/components/Minesweeper.tsx
- Auto-fix lint issues where possible
  - npx eslint . --fix
- Type-check only (no emit)
  - npx tsc -b

Tests

- No test runner or scripts are configured in package.json. Single-test execution is not applicable.

Architecture overview

Toolchain
- Vite 7 with @vitejs/plugin-react and the React Compiler enabled via the babel-plugin-react-compiler (see vite.config.ts)
- React 19 (react, react-dom)
- TypeScript 5 in bundler mode with strict settings (tsconfig.app.json, tsconfig.node.json referenced by tsconfig.json)
- ESLint 9 flat config using:
  - @eslint/js recommended
  - typescript-eslint recommended
  - eslint-plugin-react-hooks recommended-latest
  - eslint-plugin-react-refresh vite config

Entry and app skeleton
- index.html declares a root element. src/main.tsx bootstraps React: createRoot(...).render(<App/>) under StrictMode.
- src/App.tsx is a thin wrapper that renders a page title and the Minesweeper component with default props rows=10, cols=10, mines=15.

Minesweeper component (core game logic and UI)
- Location: src/components/Minesweeper.tsx
- State model
  - board: Cell[][], where Cell = { x, y, isMine, isRevealed, isFlagged, neighborMines }
  - status: 'ready' | 'playing' | 'won' | 'lost'
- Board lifecycle
  - makeEmptyBoard(rows, cols): initializes an empty grid
  - plantMines(board, mines): randomly assigns mines, then computes neighborMines counts using neighbors(x,y)
  - reset(): rebuilds the board and sets status to 'playing' (invoked on mount and when rows/cols/mines props change)
- Interaction
  - Left click on a cell: if a mine, reveal all mines and set status='lost'; otherwise call revealFlood(next, x, y) to reveal connected zero-adjacent regions and bordering numbered cells; check allSafeRevealed(next) to set status='won' when appropriate.
  - Right click (context menu): toggles cell.isFlagged unless the cell is revealed.
- Algorithms/utilities
  - neighbors(x,y,rows,cols): enumerates valid adjacent coordinates (8-way)
  - revealFlood(board,x,y): non-recursive flood-fill using a stack and a visited Set to reveal contiguous empty regions safely
  - countFlags(board) and allSafeRevealed(board) support UI counters and win detection
- Rendering
  - Grid layout via inline CSS gridTemplateColumns based on cols
  - Class names (cell, revealed, mine, flagged) control visuals; content shows '💣' for mines, '🚩' for flags, or neighborMines numbers for revealed safe cells

ESLint notes
- The flat config targets TS/TSX files and ignores dist. It currently uses recommended (non type-aware) rules. The README includes an example of enabling type-aware linting if needed by adding parserOptions.project and switching to typescript-eslint type-checked configs.
