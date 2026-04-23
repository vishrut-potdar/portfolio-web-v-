import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '../hooks/useSound';

export function Firecrackers() {
  const { play } = useSound();
  const [fireworks, setFireworks] = useState<{ id: string; x: number; y: number; color: string }[]>([]);

  useEffect(() => {
    const triggerFirework = () => {
      const id = `${Date.now()}-${Math.random()}-${Math.random()}`; // Double entropy
      const x = Math.random() * (window.innerWidth - 100) + 50;
      const y = Math.random() * (window.innerHeight - 100) + 50;
      const colors = ['#FFD700', '#FF4500', '#FF1493', '#00BFFF', '#32CD32'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      setFireworks(prev => [...prev, { id, x, y, color }]);
      play('burst');

      setTimeout(() => {
        setFireworks(prev => prev.filter(p => p.id !== id));
      }, 1000);
    };

    // Burst multiple fireworks
    for (let i = 0; i < 12; i++) {
      setTimeout(triggerFirework, i * 150);
    }
  }, [play]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {fireworks.map((fw) => (
          <div key={fw.id} className="absolute" style={{ left: fw.x, top: fw.y }}>
            {Array.from({ length: 20 }).map((_, i) => {
              const angle = (i / 20) * Math.PI * 2;
              const velocity = 50 + Math.random() * 100;
              return (
                <motion.div
                  key={`particle-${fw.id}-${i}`}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{ 
                    x: Math.cos(angle) * velocity * 1.5, 
                    y: Math.sin(angle) * velocity * 1.5, 
                    opacity: 0,
                    scale: 0
                  }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: fw.color }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
