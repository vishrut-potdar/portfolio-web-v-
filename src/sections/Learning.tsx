import { motion, AnimatePresence } from 'motion/react';
import { Star, Trophy, Camera } from 'lucide-react';
import { useState } from 'react';
import { useSound } from '../hooks/useSound';

export function Learning() {
  const { play } = useSound();
  const [activeEffect, setActiveEffect] = useState<'camera' | 'code' | null>(null);

  const handleEffect = (type: 'camera' | 'code') => {
    setActiveEffect(type);
    if (type === 'camera') play('shutter');
    if (type === 'code') play('matrix');
    
    setTimeout(() => setActiveEffect(null), type === 'code' ? 4000 : 2500);
  };
  const cards = [
    {
      title: 'Advanced Photography',
      description: 'Learning to read light like a language — exposure triangles, composition, colour science, post-processing.',
      tags: ['Manual exposure', 'Portraiture', 'Colour grading', 'Storytelling through frame'],
      image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?q=80&w=2058&auto=format&fit=crop',
      id: '01'
    },
    {
      title: 'Coding with Animation & 3D',
      description: 'Building interactive visuals with Three.js, Blender and creative code — where engineering meets cinema.',
      tags: ['Three.js', 'Blender basics', 'Shader intuition', 'Motion design'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
      id: '02'
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
      <AnimatePresence>
        {activeEffect === 'camera' && (
          <motion.div 
            key="camera-flash-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.4, 0.6, 0.8, 1], delay: 0.8 }}
            className="fixed inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
        {activeEffect === 'camera' && (
          <motion.div
            key="camera-bounce-icon"
            initial={{ y: '100vh', x: '-50%', opacity: 1, scale: 0.8 }}
            animate={{ 
              y: ['100vh', '50vh', '50vh', '150vh'],
              scale: [0.8, 1, 1.2, 1],
              opacity: [1, 1, 1, 0]
            }}
            transition={{ 
              duration: 2.2, 
              times: [0, 0.3, 0.7, 1],
              ease: "easeInOut" 
            }}
            className="fixed top-0 left-1/2 z-[101] pointer-events-none"
          >
            <Camera size={160} className="text-brand-ink drop-shadow-2xl" />
          </motion.div>
        )}
        {activeEffect === 'code' && (
          <div key="code-rain-container" className="fixed inset-0 z-[100] pointer-events-none flex font-mono text-[10px] justify-between p-0 overflow-hidden bg-black/10">
             {Array.from({ length: 120 }).map((_, i) => (
               <motion.div
                key={`rain-col-${i}`}
                initial={{ y: -window.innerHeight }}
                animate={{ y: window.innerHeight * 1.5 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5 + Math.random() * 2.5,
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                className="text-green-500/60 whitespace-pre leading-none"
               >
                 {Array.from({ length: 30 }).map(() => String.fromCharCode(Math.random() * 95 + 33)).join('\n')}
               </motion.div>
             ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-8">
              04 / Learning
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Currently <span className="italic text-brand-gold">learning.</span>
            </h2>
          </div>
          <p className="max-w-sm text-brand-ink/60 text-lg leading-relaxed font-sans">
            Two quiet obsessions running alongside exam prep — one teaches me to see, the other teaches me to build what I see.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.02)] border border-brand-ink/5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-500"
            >
              <div className="relative h-[300px] overflow-hidden">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
              </div>

              <div className="p-10 -mt-20 relative z-10">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 border border-brand-ink/5">
                   <div className="w-2 h-2 rounded-full bg-brand-gold" />
                </div>
                <h3 className="text-3xl font-serif mb-4">
                  {card.id === '01' ? (
                    <>
                      Advanced <span 
                        className="cursor-pointer hover:text-brand-gold transition-colors inline-block hover:scale-105 active:scale-95"
                        onClick={() => handleEffect('camera')}
                      >Photography</span>
                    </>
                  ) : (
                    <>
                      <span 
                        className="cursor-pointer hover:text-brand-gold transition-colors inline-block hover:scale-105 active:scale-95"
                        onClick={() => handleEffect('code')}
                      >Coding</span> with Animation & 3D
                    </>
                  )}
                </h3>
                <p className="text-brand-ink/60 leading-relaxed mb-8 font-sans">
                  {card.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-brand-accent/40 rounded-full text-xs font-mono uppercase tracking-wider text-brand-ink/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Milestones Grid */}
        <div className="mt-40">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-8">
                  Milestones
                </span>
                <h2 className="text-4xl md:text-6xl font-serif leading-tight">
                  Recent <span className="italic text-brand-gold">achievements.</span>
                </h2>
              </div>
           </div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[40px] border border-brand-ink/5 shadow-sm group hover:shadow-xl transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-brand-bg rounded-2xl border border-brand-ink/5 text-brand-gold">
                  <Trophy size={24} />
                </div>
                <span className="px-4 py-1 rounded-full border border-brand-ink/10 text-[10px] uppercase tracking-[0.2em] font-mono text-brand-ink/40">
                  Competition
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4 text-brand-ink/40 font-mono text-xs uppercase tracking-widest">
                <span>Google Prompt Wars</span>
                <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
                <span>Finalist</span>
              </div>
              <h3 className="text-4xl font-serif mb-6 group-hover:translate-x-2 transition-transform duration-500">Google AI Finalist</h3>
              <p className="text-brand-ink/60 leading-relaxed max-w-sm">
                Participated in Google&apos;s prompt-engineering competition, focusing on strategic AI interactions and creative logic.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-[40px] border border-brand-ink/5 shadow-sm group hover:shadow-xl transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-brand-bg rounded-2xl border border-brand-ink/5 text-brand-gold">
                  <Star size={24} />
                </div>
                <span className="px-4 py-1 rounded-full border border-brand-ink/10 text-[10px] uppercase tracking-[0.2em] font-mono text-brand-ink/40">
                  Program
                </span>
              </div>
              <div className="flex items-center gap-4 mb-4 text-brand-ink/40 font-mono text-xs uppercase tracking-widest">
                <span>Scaler YIP</span>
                <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
                <span>Cohort</span>
              </div>
              <h3 className="text-4xl font-serif mb-6 group-hover:translate-x-2 transition-transform duration-500">Young Innovators</h3>
              <p className="text-brand-ink/60 leading-relaxed max-w-sm">
                Selected for a cohort-based program mentoring high-school builders in product thinking and applied tech.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
