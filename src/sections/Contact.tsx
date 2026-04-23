import { motion } from 'motion/react';
import { Mail, Send } from 'lucide-react';

export function Contact() {
  return (
    <section className="py-32 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-brand-gold block mb-8">
              06 / Reach Out
            </span>
            <h2 className="text-7xl md:text-9xl font-serif leading-tight mb-12">
              Let's start a <span className="italic text-brand-gold block">conversation.</span>
            </h2>
            <p className="text-2xl text-brand-ink/60 leading-relaxed mb-12 max-w-lg">
              For opportunities, mentorship, collaborations or a simple hello — drop a note. I usually reply within a day or two, between study blocks.
            </p>
            
            <a href="mailto:hello@vishrut.dev" className="flex items-center gap-4 text-2xl font-serif group hover:text-brand-gold transition-colors">
               <Mail className="text-brand-gold group-hover:scale-110 transition-transform" />
               <span>hello@vishrut.dev</span>
            </a>
          </div>

          <div className="bg-brand-bg p-8 md:p-12 rounded-[50px] border border-brand-ink/5 shadow-2xl relative">
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-brand-ink/40">Name</label>
                  <input 
                    type="text" 
                    placeholder="Your name"
                    className="w-full bg-white border border-brand-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-gold transition-colors font-sans text-brand-ink"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-brand-ink/40">Email</label>
                  <input 
                    type="email" 
                    placeholder="you@domain.com"
                    className="w-full bg-white border border-brand-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-gold transition-colors font-sans text-brand-ink"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-mono uppercase tracking-widest text-brand-ink/40">Message</label>
                <textarea 
                  rows={6}
                  placeholder="Tell me a little about what you have in mind..."
                  className="w-full bg-white border border-brand-ink/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-gold transition-colors font-sans text-brand-ink resize-none"
                />
              </div>
              <button 
                className="w-full md:w-auto px-12 py-5 bg-brand-ink text-brand-bg rounded-2xl font-medium flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-xl transition-all"
              >
                <span>Send message</span>
                <Send size={18} />
              </button>
            </form>
            <p className="mt-8 text-[11px] font-mono text-brand-ink/30 italic">
              * Messages currently saved locally — live email delivery coming soon.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
