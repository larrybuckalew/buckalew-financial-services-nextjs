import { useCallback, useEffect, useMemo, useState } from 'react';
function makeEmptyBoard(rows, cols) {
    return Array.from({ length: rows }, (_, y) => Array.from({ length: cols }, (_, x) => ({
        x,
        y,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        neighborMines: 0,
    })));
}
function neighbors(x, y, rows, cols) {
    const deltas = [-1, 0, 1];
    const res = [];
    for (const dy of deltas) {
        for (const dx of deltas) {
            if (dx === 0 && dy === 0)
                continue;
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows)
                res.push([nx, ny]);
        }
    }
    return res;
}
function plantMines(board, mines) {
    const rows = board.length;
    const cols = board[0].length;
    let planted = 0;
    while (planted < mines) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        if (!board[y][x].isMine) {
            board[y][x].isMine = true;
            planted++;
        }
    }
    // compute neighbor counts
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (board[y][x].isMine)
                continue;
            let count = 0;
            for (const [nx, ny] of neighbors(x, y, rows, cols)) {
                if (board[ny][nx].isMine)
                    count++;
            }
            board[y][x].neighborMines = count;
        }
    }
}
function cloneBoard(board) {
    return board.map((row) => row.map((c) => ({ ...c })));
}
function revealFlood(board, x, y) {
    const rows = board.length;
    const cols = board[0].length;
    const stack = [[x, y]];
    const visited = new Set();
    const key = (a, b) => `${a},${b}`;
    while (stack.length) {
        const [cx, cy] = stack.pop();
        const k = key(cx, cy);
        if (visited.has(k))
            continue;
        visited.add(k);
        const cell = board[cy][cx];
        if (cell.isRevealed || cell.isFlagged)
            continue;
        cell.isRevealed = true;
        if (cell.neighborMines === 0 && !cell.isMine) {
            for (const [nx, ny] of neighbors(cx, cy, rows, cols)) {
                const ncell = board[ny][nx];
                if (!ncell.isRevealed && !ncell.isFlagged && !ncell.isMine) {
                    stack.push([nx, ny]);
                }
            }
        }
    }
}
function countFlags(board) {
    return board.flat().filter((c) => c.isFlagged).length;
}
function allSafeRevealed(board) {
    return board.flat().every((c) => c.isMine || c.isRevealed);
}
export default function Minesweeper({ rows = 10, cols = 10, mines = 15 }) {
    const [board, setBoard] = useState(() => makeEmptyBoard(rows, cols));
    const [status, setStatus] = useState('ready');
    const flagsPlaced = useMemo(() => countFlags(board), [board]);
    const reset = useCallback(() => {
        const fresh = makeEmptyBoard(rows, cols);
        plantMines(fresh, mines);
        setBoard(fresh);
        setStatus('playing');
    }, [rows, cols, mines]);
    useEffect(() => {
        reset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows, cols, mines]);
    const onCellClick = useCallback((x, y) => {
        if (status !== 'playing')
            return;
        setBoard((prev) => {
            const next = cloneBoard(prev);
            const cell = next[y][x];
            if (cell.isFlagged || cell.isRevealed)
                return prev;
            if (cell.isMine) {
                // reveal all mines
                for (const c of next.flat()) {
                    if (c.isMine)
                        c.isRevealed = true;
                }
                setStatus('lost');
                return next;
            }
            revealFlood(next, x, y);
            if (allSafeRevealed(next))
                setStatus('won');
            return next;
        });
    }, [status]);
    const onCellRightClick = useCallback((x, y) => {
        if (status !== 'playing')
            return;
        setBoard((prev) => {
            const next = cloneBoard(prev);
            const cell = next[y][x];
            if (cell.isRevealed)
                return prev;
            cell.isFlagged = !cell.isFlagged;
            return next;
        });
    }, [status]);
    const gridStyle = useMemo(() => ({ gridTemplateColumns: `repeat(${cols}, 34px)` }), [cols]);
    return (<div>
      <div className="controls">
        <button onClick={reset}>Reset</button>
        <div className="status">
          {status === 'playing' && 'Keep going!'}
          {status === 'won' && 'You win! 🎉'}
          {status === 'lost' && 'Boom! 💥'}
        </div>
        <div>Mines: {mines} | Flags: {flagsPlaced}</div>
      </div>
      <div className="board" style={gridStyle}>
        {board.map((row, y) => (<div className="row" key={y}>
            {row.map((cell) => {
                const classNames = ['cell'];
                if (cell.isRevealed)
                    classNames.push('revealed');
                if (cell.isMine && status === 'lost')
                    classNames.push('mine');
                if (cell.isFlagged && !cell.isRevealed)
                    classNames.push('flagged');
                return (<div key={`${cell.x}-${cell.y}`} className={classNames.join(' ')} onClick={() => onCellClick(cell.x, cell.y)} onContextMenu={(e) => {
                        e.preventDefault();
                        onCellRightClick(cell.x, cell.y);
                    }}>
                  {cell.isRevealed
                        ? cell.isMine
                            ? '💣'
                            : cell.neighborMines || ''
                        : cell.isFlagged
                            ? '🚩'
                            : ''}
                </div>);
            })}
          </div>))}
      </div>
    </div>);
}
