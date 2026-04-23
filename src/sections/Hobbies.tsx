import { motion } from 'motion/react';
import { Camera, Box, Palette, Music, Sword } from 'lucide-react';

export function Hobbies() {
  const hobbies = [
    {
      id: '01',
      title: 'Art',
      description: 'Pencil, ink, and watercolor — a space to explore texture and form beyond pixels.',
      icon: Palette,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop',
      sound: 'brush'
    },
    {
      id: '02',
      title: 'Instruments',
      description: 'Keyboard and acoustic — slow, deliberate practice focused on rhythm and resonance.',
      icon: Music,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop',
       sound: 'piano'
    },
    {
      id: '03',
      title: 'Martial Arts',
      description: 'Discipline over spectacle. The mat is where I learn that focus is a choice.',
      icon: Sword,
      image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2073&auto=format&fit=crop',
       sound: 'dojo'
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-8">
            04 / Off the page
          </span>
          <h2 className="text-5xl md:text-7xl font-serif leading-tight">
            Hobbies that <span className="italic text-brand-gold">sharpen</span> the mind.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative h-[600px] overflow-hidden rounded-3xl cursor-pointer"
            >
              <img 
                src={hobby.image} 
                alt={hobby.title}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/90 via-brand-ink/20 to-transparent" />
              
              <div className="absolute top-6 left-6 p-3 bg-brand-ink/40 backdrop-blur-md rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <hobby.icon className="text-brand-gold" size={24} />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-4">
                  {hobby.id}
                </span>
                <h3 className="text-3xl font-serif text-white mb-4">{hobby.title}</h3>
                <p className="text-white/60 leading-relaxed font-sans transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {hobby.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
