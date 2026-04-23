import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Firecrackers } from './Firecrackers';
import { useSound } from '../hooks/useSound';

export function Navbar() {
  const { play } = useSound();
  const [clickCount, setClickCount] = useState(0);
  const [showFirecrackers, setShowFirecrackers] = useState(false);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 5) {
      setClickCount(0);
      setShowFirecrackers(true);
      play('secret');
      setTimeout(() => setShowFirecrackers(false), 5000);
    } else {
      setClickCount(newCount);
      play('click');
    }
  };

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Journey', href: '#journey' },
    { name: 'Stack', href: '#stack' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <AnimatePresence>
        {showFirecrackers && <Firecrackers />}
      </AnimatePresence>
      
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-12 py-8 bg-brand-bg/80 backdrop-blur-md border-b border-brand-ink/5"
      >
        <div 
          className="text-xl font-serif font-bold tracking-tighter cursor-pointer select-none hover:scale-110 active:scale-95 transition-transform"
          onClick={handleLogoClick}
        >
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
    </>
  );
}
