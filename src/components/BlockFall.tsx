import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '../hooks/useSound';

const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 25;

const SHAPES = {
  I: [[1, 1, 1, 1]],
  J: [[1, 0, 0], [1, 1, 1]],
  L: [[0, 0, 1], [1, 1, 1]],
  O: [[1, 1], [1, 1]],
  S: [[0, 1, 1], [1, 1, 0]],
  T: [[0, 1, 0], [1, 1, 1]],
  Z: [[1, 1, 0], [0, 1, 1]],
};

const COLORS = ['#c79b5c', '#ffffff', '#e5e1da', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563'];

export function TetrisGame() {
  const { play } = useSound();
  const [grid, setGrid] = useState<string[][]>(Array(ROWS).fill(null).map(() => Array(COLS).fill('')));
  const [activePiece, setActivePiece] = useState<{ pos: { x: number, y: number }, shape: number[][], color: string } | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const gameLoop = useRef<number | null>(null);

  const spawnPiece = useCallback(() => {
    const keys = Object.keys(SHAPES);
    const shape = SHAPES[keys[Math.floor(Math.random() * keys.length)] as keyof typeof SHAPES];
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const pos = { x: Math.floor(COLS / 2) - Math.floor(shape[0].length / 2), y: 0 };
    
    if (checkCollision(pos, shape, grid)) {
      setGameOver(true);
      play('secret');
      return;
    }
    setActivePiece({ pos, shape, color });
  }, [grid, play]);

  function checkCollision(pos: { x: number, y: number }, shape: number[][], currentGrid: string[][]) {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newX = pos.x + x;
          const newY = pos.y + y;
          if (newX < 0 || newX >= COLS || newY >= ROWS || (newY >= 0 && currentGrid[newY][newX])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  const moveDown = useCallback(() => {
    if (!activePiece || gameOver || isPaused) return;
    const newPos = { ...activePiece.pos, y: activePiece.pos.y + 1 };
    if (checkCollision(newPos, activePiece.shape, grid)) {
      lockPiece();
    } else {
      setActivePiece({ ...activePiece, pos: newPos });
    }
  }, [activePiece, gameOver, isPaused, grid]);

  const lockPiece = () => {
    if (!activePiece) return;
    const newGrid = grid.map(row => [...row]);
    activePiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value && activePiece.pos.y + y >= 0) {
          newGrid[activePiece.pos.y + y][activePiece.pos.x + x] = activePiece.color;
        }
      });
    });

    let linesCleared = 0;
    const finalGrid = newGrid.filter(row => {
      const isFull = row.every(cell => cell !== '');
      if (isFull) linesCleared++;
      return !isFull;
    });

    while (finalGrid.length < ROWS) {
      finalGrid.unshift(Array(COLS).fill(''));
    }

    if (linesCleared > 0) {
      setScore(s => s + linesCleared * 100);
      play('success');
    }
    setGrid(finalGrid);
    spawnPiece();
  };

  const moveLeft = () => {
    if (!activePiece || isPaused) return;
    const newPos = { ...activePiece.pos, x: activePiece.pos.x - 1 };
    if (!checkCollision(newPos, activePiece.shape, grid)) setActivePiece({ ...activePiece, pos: newPos });
  };

  const moveRight = () => {
    if (!activePiece || isPaused) return;
    const newPos = { ...activePiece.pos, x: activePiece.pos.x + 1 };
    if (!checkCollision(newPos, activePiece.shape, grid)) setActivePiece({ ...activePiece, pos: newPos });
  };

  const rotate = () => {
    if (!activePiece || isPaused) return;
    const newShape = activePiece.shape[0].map((_, i) => activePiece.shape.map(row => row[i]).reverse());
    if (!checkCollision(activePiece.pos, newShape, grid)) setActivePiece({ ...activePiece, shape: newShape });
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
      if (e.key === 'ArrowDown') moveDown();
      if (e.key === 'ArrowUp') rotate();
      if (e.key === ' ') setIsPaused(p => !p);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activePiece, gameOver, grid, moveDown]);

  useEffect(() => {
    if (!activePiece && !gameOver) spawnPiece();
    const interval = isPaused || gameOver ? null : window.setInterval(moveDown, 800 - Math.min(score / 5, 500));
    return () => { if (interval) clearInterval(interval); };
  }, [activePiece, gameOver, isPaused, moveDown, spawnPiece, score]);

  const reset = () => {
    setGrid(Array(ROWS).fill(null).map(() => Array(COLS).fill('')));
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setActivePiece(null);
    play('click');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex justify-between w-full max-w-[250px] font-mono text-[10px] uppercase tracking-widest text-brand-bg/40">
        <span>Score: {score}</span>
        <button onClick={() => setIsPaused(p => !p)}>{isPaused ? 'Resume' : 'Pause'}</button>
      </div>

      <div 
        className="relative border border-white/10 bg-white/5 rounded-xl overflow-hidden shadow-2xl"
        style={{ width: COLS * BLOCK_SIZE, height: ROWS * BLOCK_SIZE }}
      >
        {grid.map((row, y) => row.map((cell, x) => (
          cell && (
            <div 
              key={`${x}-${y}`}
              className="absolute border border-brand-ink/20 rounded-sm"
              style={{ 
                left: x * BLOCK_SIZE, 
                top: y * BLOCK_SIZE, 
                width: BLOCK_SIZE, 
                height: BLOCK_SIZE, 
                backgroundColor: cell 
              }}
            />
          )
        )))}
        
        {activePiece && activePiece.shape.map((row, y) => row.map((value, x) => (
          value && (
            <div 
              key={`active-${x}-${y}`}
              className="absolute border border-brand-ink/20 rounded-sm"
              style={{ 
                left: (activePiece.pos.x + x) * BLOCK_SIZE, 
                top: (activePiece.pos.y + y) * BLOCK_SIZE, 
                width: BLOCK_SIZE, 
                height: BLOCK_SIZE, 
                backgroundColor: activePiece.color 
              }}
            />
          )
        )))}

        <AnimatePresence>
          {gameOver && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-brand-ink/90 flex flex-col items-center justify-center text-center p-6"
            >
              <h3 className="text-3xl font-serif mb-4">Gravity Wins.</h3>
              <p className="text-brand-bg/40 font-mono text-xs mb-8">Score: {score}</p>
              <button onClick={reset} className="px-8 py-3 bg-brand-gold text-brand-ink rounded-full font-medium">Try Again</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="mt-8 grid grid-cols-3 gap-2 w-full max-w-[250px]">
        <div />
        <button onClick={rotate} className="p-4 bg-white/5 rounded-xl hover:bg-white/10">↑</button>
        <div />
        <button onClick={moveLeft} className="p-4 bg-white/5 rounded-xl hover:bg-white/10">←</button>
        <button onClick={moveDown} className="p-4 bg-white/5 rounded-xl hover:bg-white/10">↓</button>
        <button onClick={moveRight} className="p-4 bg-white/5 rounded-xl hover:bg-white/10">→</button>
      </div>
    </div>
  );
}
