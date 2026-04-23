/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Journey } from './sections/Journey';
import { Coordinates } from './sections/Coordinates';
import { Hobbies } from './sections/Hobbies';
import { Stack } from './sections/Stack';
import { Learning } from './sections/Learning';
import { Contact } from './sections/Contact';
import { Arcade } from './sections/Arcade';
import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function GlobalShortcuts() {
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Shortcut: Ctrl + Shift + A (Harden with preventDefault and stopPropagation)
      if (e.ctrlKey && e.shiftKey && (e.key.toLowerCase() === 'a' || e.code === 'KeyA')) {
        e.preventDefault();
        e.stopPropagation();
        navigate('/arcade');
      }
    };
    // Use capture phase to beat potential other listeners
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [navigate]);
  return null;
}

function MainPortfolio() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-brand-bg">
      <CustomCursor />
      <Navbar />
      <Hero />
      <div id="about"><About /></div>
      <div id="journey"><Journey /></div>
      <Coordinates />
      <div id="stack"><Stack /></div>
      <Learning />
      <Hobbies />
      <div id="contact"><Contact /></div>
      
      {/* Global Unified WebGL Layer - Optimized for interaction and visibility */}
      <Canvas 
        className="fixed inset-0"
        style={{ zIndex: 45, pointerEvents: 'none' }}
        eventSource={containerRef as any}
        shadows
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5] }}
      >
        <View.Port />
      </Canvas>

      <footer className="py-12 px-6 border-t border-brand-ink/10 text-center relative z-10">
        <p className="text-sm text-brand-ink/60 mb-4 font-mono uppercase tracking-widest">
          Crafted with focus • 2026
        </p>
        <Link to="/arcade" className="text-brand-gold hover:underline font-serif italic text-lg transition-all duration-300">
          Bored with portfolio? Try Arcade →
        </Link>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <GlobalShortcuts />
      <Routes>
        <Route path="/" element={<MainPortfolio />} />
        <Route path="/arcade" element={<Arcade />} />
      </Routes>
    </Router>
  );
}
