import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { Trophy, RotateCcw, Pause, Play } from 'lucide-react';
import { useSound } from '../hooks/useSound';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;

type Point = { x: number; y: number };

export function SnakeGame() {
  const { play } = useSound();
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 1, y: 0 });
  const [isPaused, setIsPaused] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopRef = useRef<NodeJS.Timeout|null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const isColliding = currentSnake.some(segment => segment.x === newFood?.x && segment.y === newFood?.y);
      if (!isColliding) break;
    }
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      // Check self-collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        play('secret');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
        play('success');
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameOver, isPaused, generateFood, play]);

  useEffect(() => {
    gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction.y === 0) setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown': if (direction.y === 0) setDirection({ x: 0, y: 1 }); break;
        case 'ArrowLeft': if (direction.x === 0) setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (direction.x === 0) setDirection({ x: 1, y: 0 }); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [direction]);

  const reset = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-12 mb-8 bg-white/5 px-8 py-4 rounded-2xl border border-white/10">
        <div className="flex items-center gap-2">
          <Trophy size={18} className="text-brand-gold" />
          <span className="font-mono text-sm tracking-widest uppercase">Score: {score}</span>
        </div>
        <div className="flex gap-4">
           <button onClick={() => setIsPaused(!isPaused)} className="text-white/40 hover:text-white transition-colors">
             {isPaused ? <Play size={20} /> : <Pause size={20} />}
           </button>
           <button onClick={reset} className="text-white/40 hover:text-white transition-colors">
             <RotateCcw size={20} />
           </button>
        </div>
      </div>

      <div className="relative p-2 bg-brand-gold/10 rounded-xl border border-brand-gold/20">
        <div 
          className="grid gap-[1px] bg-brand-ink"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1.5rem)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1.5rem)` 
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
            const x = i % GRID_SIZE;
            const y = Math.floor(i / GRID_SIZE);
            const isSnake = snake.some(s => s.x === x && s.y === y);
            const isHead = snake[0].x === x && snake[0].y === y;
            const isFood = food.x === x && food.y === y;

            return (
              <div 
                key={i} 
                className={`w-full h-full rounded-sm transition-all duration-200 ${
                  isHead ? 'bg-brand-gold scale-110 z-10' : 
                  isSnake ? 'bg-brand-gold/60' : 
                  isFood ? 'bg-white animate-pulse' : 'bg-white/5'
                }`}
              />
            );
          })}
        </div>

        {gameOver && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-ink/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center rounded-xl z-20"
          >
            <h3 className="text-3xl font-serif mb-2">Game Over</h3>
            <p className="text-white/60 font-mono text-sm mb-8">Score: {score}</p>
            <button 
              onClick={reset}
              className="px-8 py-3 bg-brand-gold text-brand-ink rounded-full font-medium hover:scale-105 active:scale-95 transition-transform"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2 md:hidden">
        <div />
        <button onClick={() => direction.y === 0 && setDirection({ x: 0, y: -1 })} className="p-4 bg-white/5 rounded-xl border border-white/10 active:bg-white/10">↑</button>
        <div />
        <button onClick={() => direction.x === 0 && setDirection({ x: -1, y: 0 })} className="p-4 bg-white/5 rounded-xl border border-white/10 active:bg-white/10">←</button>
        <button onClick={() => direction.y === 0 && setDirection({ x: 0, y: 1 })} className="p-4 bg-white/5 rounded-xl border border-white/10 active:bg-white/10">↓</button>
        <button onClick={() => direction.x === 0 && setDirection({ x: 1, y: 0 })} className="p-4 bg-white/5 rounded-xl border border-white/10 active:bg-white/10">→</button>
      </div>
      
      <p className="hidden md:block mt-8 text-[10px] font-mono text-brand-bg/20 uppercase tracking-[0.3em]">
        Use Arrow Keys to Navigate
      </p>
    </div>
  );
}
