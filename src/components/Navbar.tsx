import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export function Navbar() {
  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Stack', href: '#stack' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-8 bg-brand-bg/80 backdrop-blur-md border-b border-brand-ink/5"
    >
      <div className="text-xl font-serif font-bold tracking-tighter">
        V<span className="text-brand-gold">.</span>
      </div>
      
      <div className="flex gap-8 items-center">
        {navItems.map((item) => (
          <a 
            key={item.name} 
            href={item.href} 
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-brand-ink/40 hover:text-brand-gold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector(item.href);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {item.name}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
