import { motion } from 'motion/react';

export function About() {
  const stats = [
    { label: 'Entrance Exams in prep', value: '03' },
    { label: 'Disciplines practised', value: '05+' },
    { label: 'National programs', value: '02' },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 md:gap-24 mb-32">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="text-5xl font-serif text-brand-gold mb-4 group-hover:translate-x-2 transition-transform duration-500">
                {stat.value}
              </div>
              <div className="text-xs font-mono uppercase tracking-widest text-brand-ink/40 max-w-[120px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
             <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-8">
              01 / About
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight text-balance">
              A quiet studio of <span className="italic text-brand-gold">many disciplines</span>
            </h2>
          </div>
          
          <div className="space-y-8 text-xl text-brand-ink/70 leading-relaxed font-sans pt-12">
            <p>
              My school years taught me that focus is a craft — the same one that shapes a brushstroke, a guitar note, or a clean line of code.
            </p>
            <p>
              I'm currently preparing for JEE, MHT-CET and CUET, while sharpening a second track of skills: advanced photography, animation, and creative coding in 3D.
            </p>
            <p>
              I love building things that feel both precise and human — the intersection where engineering meets cinema.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
