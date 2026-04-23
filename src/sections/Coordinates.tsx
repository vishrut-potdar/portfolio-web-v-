import { useRef } from 'react';
import { motion } from 'motion/react';
import React from 'react';
import { PremiumGlobe } from '../components/PremiumGlobe';

export function Coordinates() {
  const trackRef = useRef<HTMLDivElement>(null);
  const locations = [
    { name: 'Home — India', coords: '20.59°, 78.96°' },
    { name: 'Scaler YIP', coords: '12.97°, 77.59°' },
    { name: 'Google Prompt Wars', coords: '37.42°, -122.08°' },
    { name: 'Future — IITs', coords: '28.55°, 77.19°' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/5 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-8">
              03 / Coordinates
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              An <span className="italic text-brand-gold">interactive</span> map of where I've been.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-24 items-center">
             <div className="space-y-12">
               <p className="text-xl text-brand-ink/60 font-sans leading-relaxed max-w-md">
                 Drag to rotate. Each pulse marks a place that shaped a chapter — home, a program, a competition, or a goal on the horizon.
               </p>
               
               <div className="space-y-6">
                 {locations.map((loc, i) => (
                   <motion.div 
                    key={loc.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center py-4 border-b border-brand-ink/10 group cursor-default"
                   >
                     <div className="flex items-center gap-4">
                       <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                       <span className="text-lg font-serif group-hover:translate-x-2 transition-transform duration-300">{loc.name}</span>
                     </div>
                     <span className="font-mono text-xs text-brand-ink/40 tracking-wider font-medium">{loc.coords}</span>
                   </motion.div>
                 ))}
               </div>
             </div>

              <div className="relative">
                 <div className="aspect-square bg-white/40 rounded-full backdrop-blur-3xl shadow-inner border border-white/20 overflow-hidden">
                   <div ref={trackRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
                   <PremiumGlobe track={trackRef} />
                 </div>
                 <div className="absolute inset-x-0 -bottom-8 text-center text-[10px] uppercase font-mono tracking-[0.4em] text-brand-ink/20 pointer-events-none">
                  Rotate 360°
                </div>
             </div>
          </div>
        </div>
    </section>
  );
}
