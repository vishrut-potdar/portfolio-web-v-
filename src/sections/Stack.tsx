import { useRef } from 'react';
import { motion } from 'motion/react';
import { useSound } from '../hooks/useSound';
import { SkillSphere } from '../components/SkillSphere';

export function Stack() {
  const { play } = useSound();
  const skills = [
    'Python', 'JavaScript', 'Three.js', 'Blender', 'Photography', 'Lightroom', 'Figma', 'Sketching', 'Git', 'Linux', 'Physics', 'Calculus'
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-8">
            03 / Stack
          </span>
          <h2 className="text-5xl md:text-7xl font-serif leading-tight mb-8">
            My Creative <span className="italic text-brand-gold">Stack</span>
          </h2>
          <p className="text-xl text-brand-ink/60 leading-relaxed max-w-2xl">
             A collection of tools, languages and disciplines I'm currently balancing. Every tag is a doorway I'm still walking through.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {skills.map((skill, i) => (
            <motion.div 
              key={skill} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => play('hover')}
              className="px-8 py-6 bg-brand-bg border border-brand-ink/5 rounded-2xl font-medium text-brand-ink/80 flex flex-col items-center gap-4 hover:border-brand-gold/40 hover:shadow-xl hover:shadow-brand-gold/5 transition-all cursor-default group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-gold group-hover:scale-[2] transition-transform" />
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
