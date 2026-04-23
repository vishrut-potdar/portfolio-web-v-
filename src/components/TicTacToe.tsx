import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Circle, RotateCcw } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import confetti from 'canvas-confetti';

type Player = 'X' | 'O' | null;

export function TicTacToe() {
  const { play } = useSound();
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<{ player: Player; pattern: number[] | null }>( { player: null, pattern: null });

  const calculateWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], pattern: lines[i] };
      }
    }
    if (!squares.includes(null)) return { player: 'Draw' as any, pattern: null };
    return { player: null, pattern: null };
  };

  const handleClick = (i: number) => {
    if (board[i] || winner.player) return;
    
    const newBoard = [...board];
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    play('click');

    const result = calculateWinner(newBoard);
    if (result.player) {
      setWinner(result);
      if (result.player !== 'Draw') {
        play('success');
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#c79b5c', '#ffffff'] });
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner({ player: null, pattern: null });
    play('click');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 flex items-center justify-between w-full max-w-[300px] font-mono text-[10px] uppercase tracking-widest text-brand-bg/40">
        <div className={`flex items-center gap-2 transition-colors ${isXNext && !winner.player ? 'text-brand-gold' : ''}`}>
          <X size={14} /> Next
        </div>
        <button onClick={resetGame} className="hover:text-brand-bg transition-colors flex items-center gap-2">
          <RotateCcw size={12} /> Reset
        </button>
        <div className={`flex items-center gap-2 transition-colors ${!isXNext && !winner.player ? 'text-brand-gold' : ''}`}>
          Next <Circle size={14} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-white/5 p-3 rounded-3xl border border-white/10 shadow-2xl">
        {board.map((square, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center text-3xl transition-colors duration-300 ${
              winner.pattern?.includes(i) ? 'bg-brand-gold text-brand-ink' : 'bg-white/5 hover:bg-white/10 text-brand-bg'
            }`}
          >
            <AnimatePresence mode="wait">
              {square === 'X' && (
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <X size={40} strokeWidth={1.5} />
                </motion.div>
              )}
              {square === 'O' && (
                <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <Circle size={40} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {winner.player && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <h3 className="text-3xl font-serif mb-4">
              {winner.player === ('Draw' as any) ? 'Neutral Ground.' : `${winner.player} Dominates.`}
            </h3>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-brand-gold text-brand-ink rounded-full font-medium hover:scale-105 transition-transform"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
