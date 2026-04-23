import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '../hooks/useSound';

const WIDTH = 300;
const HEIGHT = 400;

export function SpaceStrike() {
  const { play } = useSound();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [playerX, setPlayerX] = useState(WIDTH / 2);
  const [bullets, setBullets] = useState<{ x: number, y: number, id: number }[]>([]);
  const [enemies, setEnemies] = useState<{ x: number, y: number, id: number, type: number }[]>([]);
  const lastFire = useRef(0);
  const nextEnemy = useRef(0);
  const bulletId = useRef(0);
  const enemyId = useRef(0);

  const reset = () => {
    setScore(0);
    setGameOver(false);
    setBullets([]);
    setEnemies([]);
    play('click');
  };

  useEffect(() => {
    if (gameOver) return;
    
    const interval = setInterval(() => {
      setBullets(prevB => {
        const nextB = prevB.map(b => ({ ...b, y: b.y - 7 })).filter(b => b.y > 0);
        
        let hitMade = false;
        const filteredBullets = nextB.filter(b => {
          let bulletIntercepted = false;
          
          setEnemies(prevE => {
            const index = prevE.findIndex(e => 
              Math.abs(e.x - b.x) < 20 && Math.abs(e.y - b.y) < 20
            );
            if (index !== -1) {
              bulletIntercepted = true;
              hitMade = true;
              play('click');
              const nextE = [...prevE];
              nextE.splice(index, 1);
              return nextE;
            }
            return prevE;
          });
          
          return !bulletIntercepted;
        });

        if (hitMade) setScore(s => s + 10);
        return filteredBullets;
      });

      setEnemies(prevE => {
        const nextE = prevE.map(e => ({ ...e, y: e.y + 1 }));
        if (nextE.some(e => e.y > HEIGHT - 20)) {
           setGameOver(true);
           play('secret');
        }
        return nextE;
      });

      // Spawn enemies
      if (Date.now() > nextEnemy.current) {
        setEnemies(prev => [...prev, { 
          x: Math.random() * (WIDTH - 40) + 20, 
          y: -20, 
          id: enemyId.current++,
          type: Math.floor(Math.random() * 3)
        }]);
        nextEnemy.current = Date.now() + Math.max(1000 - score / 2, 400);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [gameOver, score, play]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (gameOver) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    setPlayerX(Math.max(20, Math.min(WIDTH - 20, x)));
    
    if (Date.now() > lastFire.current + 250) {
      setBullets(prev => [...prev, { x, y: HEIGHT - 60, id: bulletId.current++ }]);
      lastFire.current = Date.now();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 flex justify-between w-full max-w-[300px] font-mono text-[10px] uppercase tracking-widest text-brand-bg/40">
        <span>Score: {score}</span>
        <span>Space Strike</span>
      </div>

      <div 
        className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-crosshair touch-none shadow-2xl"
        style={{ width: WIDTH, height: HEIGHT }}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* Bullets */}
        {bullets.map(b => (
          <div key={b.id} className="absolute w-1 h-3 bg-brand-gold rounded-full" style={{ left: b.x - 2, top: b.y }} />
        ))}

        {/* Enemies */}
        {enemies.map(e => (
          <div 
            key={e.id} 
            className="absolute flex items-center justify-center text-xl text-white/40"
            style={{ left: e.x - 10, top: e.y, width: 20, height: 20 }}
          >
            {['✧', '✦', '✢'][e.type]}
          </div>
        ))}

        {/* Player */}
        <div 
          className="absolute flex flex-col items-center transition-all duration-75"
          style={{ left: playerX - 15, top: HEIGHT - 50 }}
        >
          <div className="w-1 h-3 bg-brand-gold rounded-full mb-1" />
          <div className="w-8 h-4 bg-brand-bg rounded-lg border border-white/10" />
        </div>

        <AnimatePresence>
          {gameOver && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-brand-ink/90 flex flex-col items-center justify-center text-center p-6"
            >
               <h3 className="text-3xl font-serif mb-4">Signals Lost.</h3>
               <p className="text-brand-bg/40 font-mono text-xs mb-8">Final Score: {score}</p>
               <button onClick={reset} className="px-8 py-3 bg-brand-gold text-brand-ink rounded-full font-medium">Re-Initialize</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <p className="mt-8 text-[10px] font-mono uppercase tracking-[0.2em] text-brand-bg/20">Move mouse or touch to strike</p>
    </div>
  );
}
