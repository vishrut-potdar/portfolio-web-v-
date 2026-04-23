import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export function CustomCursor() {
  const cursorX = useSpring(0, { damping: 20, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 300 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.classList.contains('cursor-pointer')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 border border-brand-gold rounded-full pointer-events-none z-[10000] hidden md:block"
      style={{
        x: cursorX,
        y: cursorY,
        scale: hovering ? 2.5 : 1,
        backgroundColor: hovering ? 'rgba(199, 155, 92, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
    />
  );
}
