import { motion } from 'motion/react';

export function Learning() {
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
    <section className="py-32 px-6 md:px-12 bg-brand-bg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
           <h2 className="text-5xl md:text-7xl font-serif leading-tight">
            Currently <span className="italic text-brand-gold">learning.</span>
          </h2>
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
                <h3 className="text-3xl font-serif mb-4">{card.title}</h3>
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
      </div>
    </section>
  );
}
