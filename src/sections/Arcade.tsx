import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Trophy, RotateCcw, Gamepad2, Brain, Grid, Rocket, LayoutGrid } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from '../hooks/useSound';
import { SnakeGame } from '../components/SnakeGame';
import { TicTacToe } from '../components/TicTacToe';
import { TetrisGame as BlockFall } from '../components/BlockFall';
import { SpaceStrike } from '../components/SpaceStrike';

export function Arcade() {
  const { play } = useSound();
  const [gameState, setGameState] = useState<'intro' | 'snake' | 'memory' | 'tictactoe' | 'blocks' | 'strike'>('intro');
  const [score, setScore] = useState(0);
  const [items, setItems] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);

  useEffect(() => {
    if (gameState !== 'intro') {
      const handleScrollPrevent = (e: KeyboardEvent) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
          e.preventDefault();
        }
      };
      window.addEventListener('keydown', handleScrollPrevent);
      return () => window.removeEventListener('keydown', handleScrollPrevent);
    }
  }, [gameState]);

  useEffect(() => {
    const symbols = Array.from({ length: 8 }, (_, i) => i);
    const pairGrid = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
    setItems(pairGrid);
  }, [gameState]);

  const resetMemory = () => {
    const symbols = Array.from({ length: 8 }, (_, i) => i);
    setItems([...symbols, ...symbols].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setSolved([]);
    setScore(0);
  };

  const handleFlip = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || solved.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);
    play('click');

    if (newFlipped.length === 2) {
      if (items[newFlipped[0]] === items[newFlipped[1]]) {
        setSolved([...solved, ...newFlipped]);
        setFlipped([]);
        setScore(s => s + 10);
        play('success');
        if (solved.length + 2 === items.length) {
          confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-ink text-brand-bg p-6 md:p-12 font-sans relative overflow-hidden flex flex-col">
       {/* Background Glow */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-brand-gold/10 blur-[150px] rounded-full" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-brand-gold/5 blur-[150px] rounded-full" />
       </div>

       <div className="max-w-4xl mx-auto relative z-10 w-full flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-16">
            <Link to="/" className="flex items-center gap-3 text-brand-bg/60 hover:text-brand-bg transition-colors group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-[10px] uppercase tracking-widest">Exit Arcade</span>
            </Link>
            {gameState !== 'intro' && (
              <button 
                onClick={() => setGameState('intro')}
                className="font-mono text-[10px] uppercase tracking-widest text-brand-bg/40 hover:text-brand-bg px-4 py-2 border border-white/5 rounded-lg transition-all"
               >
                Change Game
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {gameState === 'intro' ? (
              <motion.div 
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 rounded-full mb-8 border border-brand-gold/20">
                  <Sparkles size={14} className="text-brand-gold" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold">Secret Stage Unlocked</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-serif mb-8 italic">Chapter: <span className="not-italic">Arcade</span></h1>
                <p className="text-brand-bg/40 text-lg max-w-lg mb-16 leading-relaxed">
                  A digital playground for the moments between deep work. Classic mechanics, modern focus.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
                  <button 
                    onClick={() => { setGameState('snake'); play('click'); }}
                    className="group bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-brand-gold transition-all duration-500 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-brand-ink/10">
                      <Gamepad2 className="text-brand-gold group-hover:text-brand-ink" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-ink">Zen Snake</h3>
                    <p className="text-brand-bg/40 text-xs group-hover:text-brand-ink/60 leading-relaxed italic font-serif">Original focus. Stay long.</p>
                  </button>

                  <button 
                    onClick={() => { setGameState('blocks'); play('click'); }}
                    className="group bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-brand-gold transition-all duration-500 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-brand-ink/10">
                      <LayoutGrid className="text-brand-gold group-hover:text-brand-ink" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-ink">Block Fall</h3>
                    <p className="text-brand-bg/40 text-xs group-hover:text-brand-ink/60 leading-relaxed italic font-serif">Gravity is the only law. Clear the lines.</p>
                  </button>

                  <button 
                    onClick={() => { setGameState('strike'); play('click'); }}
                    className="group bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-brand-gold transition-all duration-500 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-brand-ink/10">
                      <Rocket className="text-brand-gold group-hover:text-brand-ink" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-ink">Space Strike</h3>
                    <p className="text-brand-bg/40 text-xs group-hover:text-brand-ink/60 leading-relaxed italic font-serif">A minimal orbit. Defend the line.</p>
                  </button>

                  <button 
                    onClick={() => { setGameState('tictactoe'); play('click'); }}
                    className="group bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-brand-gold transition-all duration-500 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-brand-ink/10">
                      <Grid className="text-brand-gold group-hover:text-brand-ink" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-ink">Void Grid</h3>
                    <p className="text-brand-bg/40 text-xs group-hover:text-brand-ink/60 leading-relaxed italic font-serif">The simple game of X and O. No distractions.</p>
                  </button>

                  <button 
                    onClick={() => { setGameState('memory'); play('click'); }}
                    className="group bg-white/5 border border-white/10 p-8 rounded-[32px] hover:bg-brand-gold transition-all duration-500 text-left"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-brand-ink/10">
                      <Brain className="text-brand-gold group-hover:text-brand-ink" />
                    </div>
                    <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-ink">Memory Matrix</h3>
                    <p className="text-brand-bg/40 text-xs group-hover:text-brand-ink/60 leading-relaxed italic font-serif">Find the pairs in the silence.</p>
                  </button>
                </div>
              </motion.div>
            ) : gameState === 'snake' ? (
              <motion.div 
                key="snake"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center py-12"
              >
                <div className="mb-12 text-center">
                   <h2 className="text-4xl font-serif mb-4">Zen Snake</h2>
                   <p className="text-brand-bg/40 font-mono text-[10px] uppercase tracking-widest leading-relaxed">Continuous Movement • Infinite Growth</p>
                </div>
                <SnakeGame />
              </motion.div>
            ) : gameState === 'tictactoe' ? (
              <motion.div key="tictactoe" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 py-12">
                <div className="mb-12 text-center text-brand-gold">
                   <h2 className="text-4xl font-serif mb-4 text-brand-bg">Void Grid</h2>
                   <p className="font-mono text-[10px] uppercase tracking-widest">Tic-Tac-Toe • Zero Context</p>
                </div>
                <TicTacToe />
              </motion.div>
            ) : gameState === 'blocks' ? (
              <motion.div key="blocks" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 py-12">
                <div className="mb-12 text-center">
                   <h2 className="text-4xl font-serif mb-4">Block Fall</h2>
                   <p className="text-brand-bg/40 font-mono text-[10px] uppercase tracking-widest">Nokia Legacy • Structural Harmony</p>
                </div>
                <BlockFall />
              </motion.div>
            ) : gameState === 'strike' ? (
              <motion.div key="strike" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 py-12">
                <div className="mb-12 text-center">
                   <h2 className="text-4xl font-serif mb-4">Space Strike</h2>
                   <p className="text-brand-bg/40 font-mono text-[10px] uppercase tracking-widest">Orbital Defense • Minimal Impact</p>
                </div>
                <SpaceStrike />
              </motion.div>
            ) : (
              <motion.div 
                key="memory"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1"
              >
                <div className="mb-12 text-center">
                   <h2 className="text-4xl font-serif mb-4">Memory Matrix</h2>
                   <div className="flex items-center justify-center gap-8 font-mono text-[10px] uppercase tracking-widest text-brand-bg/40">
                      <span>Score: {score}</span>
                      <button onClick={resetMemory} className="hover:text-brand-gold flex items-center gap-2">
                        <RotateCcw size={12} /> Reset
                      </button>
                   </div>
                </div>
                <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mb-12">
                   {items.map((item, i) => {
                     const isFlipped = flipped.includes(i) || solved.includes(i);
                     return (
                       <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleFlip(i)}
                        className={`aspect-square rounded-2xl cursor-pointer transition-all duration-500 transform-gpu preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
                       >
                         <div className={`absolute inset-0 w-full h-full bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backface-hidden ${isFlipped ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="w-1 h-1 rounded-full bg-brand-gold/20" />
                         </div>
                         <div className={`absolute inset-0 w-full h-full bg-brand-gold rounded-2xl flex items-center justify-center backface-hidden rotate-y-180 ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="text-3xl filter invert">
                              {['✦', '✺', '❈', '⦿', '⬡', '◇', '◎', '◈'][item]}
                            </span>
                         </div>
                       </motion.div>
                     );
                   })}
                </div>
                {solved.length === items.length && solved.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                     <h3 className="text-2xl font-serif mb-6">Board Cleared.</h3>
                     <button 
                      onClick={resetMemory}
                      className="px-8 py-3 bg-white text-brand-ink rounded-full font-medium hover:scale-105 active:scale-95 transition-transform"
                     >
                       Focus Again
                     </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
       </div>
    </div>
  );
}
