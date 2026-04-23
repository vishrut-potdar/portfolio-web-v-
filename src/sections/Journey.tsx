import { motion } from 'motion/react';
import { GraduationCap, Target, BookOpen, Star, Trophy } from 'lucide-react';

export function Journey() {
  const steps = [
    {
      period: '2026',
      title: 'Class XII — CBSE',
      subtitle: 'Board Examinations Completion',
      description: 'Senior secondary education focused on Physics, Chemistry and Mathematics. Integrating core science with high-fidelity creative tech.',
      icon: GraduationCap,
      align: 'left'
    },
    {
      period: '2024 — 2026',
      title: 'Entrance Examination Preparation',
      subtitle: 'JEE • MHT-CET • CUET',
      description: 'A two-year focus on national engineering entrances — balancing complex physics problems with modern architectural 3D theory.',
      icon: Target,
      align: 'right'
    },
    {
      period: '2024 — 2026',
      title: 'Senior Secondary — Science Stream',
      subtitle: 'PCM Specialization',
      description: 'Deep foundations in Calculus and Classical Mechanics. Science is the engine; technology is the craft.',
      icon: BookOpen,
      align: 'left'
    }
  ];

  const milestones = [
    {
      title: 'Championship 2026',
      org: 'Regional Tech Finals',
      year: '2026',
      type: 'Competition',
      icon: Trophy
    },
    {
      title: 'Product Internship',
      org: 'Stealth Startup',
      year: '2026',
      type: 'Internship',
      icon: Star
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 mb-32 items-end">
           <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-8">
              02 / Journey
            </span>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Education & <span className="italic text-brand-gold">exam prep</span>
            </h2>
          </div>
          <p className="text-xl text-brand-ink/60 font-sans leading-relaxed max-w-sm">
            A structured, rotating workflow — concept mastery in the morning, timed mocks by afternoon, error journals at night.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mb-32">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-brand-ink/10 hidden md:block" />
          
          <div className="space-y-24 relative">
             {steps.map((step, i) => (
               <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-12 ${step.align === 'right' ? 'md:flex-row-reverse' : ''}`}
               >
                 <div className="flex-1 text-center md:text-left">
                   <div className={`flex flex-col ${step.align === 'right' ? 'md:items-end md:text-right' : ''}`}>
                      <span className="text-xs font-mono text-brand-ink/40 tracking-[0.4em] mb-4">{step.period}</span>
                      <h3 className="text-3xl font-serif mb-2">{step.title}</h3>
                      <span className="text-brand-gold font-medium mb-6 block">{step.subtitle}</span>
                      <p className="text-brand-ink/60 leading-relaxed max-w-md">{step.description}</p>
                   </div>
                 </div>

                 <div className="relative z-10 w-16 h-16 bg-brand-bg border border-brand-ink/5 rounded-full flex items-center justify-center shadow-lg text-brand-gold group shrink-0">
                    <step.icon size={24} className="group-hover:scale-110 transition-transform" />
                 </div>

                 <div className="flex-1 hidden md:block" />
               </motion.div>
             ))}
          </div>
        </div>

        {/* Milestones Card Grid */}
        <div className="mt-40">
           <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-12">
            07 / Milestones
          </span>
          <div className="grid md:grid-cols-2 gap-8">
            {milestones.map((ms, i) => (
              <motion.div
                key={ms.title}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-brand-bg p-12 rounded-[40px] border border-brand-ink/5 shadow-sm group hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="p-4 bg-white rounded-2xl border border-brand-ink/5 text-brand-gold">
                    <ms.icon size={24} />
                  </div>
                  <span className="px-4 py-1 rounded-full border border-brand-ink/10 text-[10px] uppercase tracking-[0.2em] font-mono text-brand-ink/40">
                    {ms.type}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4 text-brand-ink/40 font-mono text-xs uppercase tracking-widest">
                  <span>{ms.org}</span>
                  <div className="w-1 h-1 rounded-full bg-brand-gold/30" />
                  <span>{ms.year}</span>
                </div>
                <h3 className="text-4xl font-serif mb-6 group-hover:translate-x-2 transition-transform duration-500">{ms.title}</h3>
                <p className="text-brand-ink/60 leading-relaxed max-w-sm">
                  {ms.type === 'Internship' 
                    ? 'Working on user-centered design systems and 3D architectural visualizations for next-generation products.'
                    : ms.title === 'Championship 2026'
                    ? 'Secured top rank in the regional finals for focus-driven development and creative problem solving.'
                    : ms.title === 'Young Innovators Program' 
                    ? 'Selected for a cohort-based program mentoring high-school builders in product thinking and applied tech.'
                    : "Participated in Google's prompt-engineering competition."}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
