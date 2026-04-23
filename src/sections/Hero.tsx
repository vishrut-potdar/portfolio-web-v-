import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { useSound } from '../hooks/useSound';

export function Hero() {
  const { play } = useSound();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden bg-brand-bg">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] opacity-[0.03] pointer-events-none select-none">
        <div className="w-full h-full border-[1px] border-brand-ink grid grid-cols-12 grid-rows-12">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border-[0.5px] border-brand-ink/20" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="flex items-center gap-2 mb-8"
        >
          <span className="w-4 h-[1px] bg-brand-gold" />
          <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-brand-gold">
            Portfolio • Class of 2026
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_500px] gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif leading-[0.9] tracking-tight mb-8">
              Building with <span className="italic block ml-4 lg:ml-12 text-brand-gold/60">focus,</span>
              creating with care.
            </h1>
            
            <p className="max-w-xl text-lg md:text-xl text-brand-ink/70 leading-relaxed font-sans mb-10">
              I'm a seventeen-year-old builder stepping into the next chapter—engineering entrances, advanced photography, and sculpting ideas in 3D. 
              This is the quiet, deliberate work of becoming.
            </p>

            <div className="flex flex-wrap gap-4">
               <button 
                onClick={() => play('click')}
                className="px-8 py-4 bg-brand-ink text-brand-bg rounded-full font-medium hover:bg-brand-ink/90 transition-all active:scale-95"
               >
                Read my story
               </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="flex justify-center w-full relative h-[400px] md:h-[500px]"
          >
            <div className="w-full h-full max-w-[500px] border border-brand-ink/5 rounded-[40px] bg-white/50 backdrop-blur-sm shadow-xl flex items-center justify-center overflow-hidden group">
               <div className="text-center p-12">
                  <div className="text-brand-gold text-6xl mb-6 font-serif opacity-20 group-hover:opacity-100 transition-opacity duration-700">V</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-brand-ink/40">Portfolio 2026</div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-ink/30 cursor-pointer"
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
          play('click');
        }}
      >
        <ArrowDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
}
