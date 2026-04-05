import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VortexBackground } from './VortexBackground';
import { useLanguage } from '../context/LanguageContext';

const HERO_EVENTS = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop',
    title: 'VORTEX: ORIGIN',
    date: 'OCT 28'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop',
    title: 'NEON NIGHTS',
    date: 'NOV 15'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2076&auto=format&fit=crop',
    title: 'INDUSTRIAL DECAY',
    date: 'DEC 02'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=2070&auto=format&fit=crop',
    title: 'COASTAL GROOVES',
    date: 'NOV 22'
  }
];

export const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_EVENTS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian">
      {/* Full-bleed Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={HERO_EVENTS[currentIndex].image}
              alt={HERO_EVENTS[currentIndex].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlay to ensure text readability and blend with the dark theme */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/40 to-obsidian" />
      </div>

      {/* 3D Vortex Overlay */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
        <VortexBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 w-full max-w-5xl mx-auto">
        <motion.img
          src="https://storage.googleapis.com/aistudio-janus-prod-appspot-com/user_data/asduzgaming%40gmail.com/1741909680-image.png"
          alt="VORTEXA"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="w-56 md:w-[28rem] mb-8 drop-shadow-[0_0_25px_rgba(255,0,127,0.3)]"
        />

        {/* Event Info linked to the background */}
        <div className="h-32 md:h-40 flex flex-col justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-cyan font-bold uppercase tracking-widest text-sm md:text-lg mb-2 drop-shadow-md">
                {HERO_EVENTS[currentIndex].date}
              </p>
              <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter text-white drop-shadow-lg">
                {HERO_EVENTS[currentIndex].title}
              </h2>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-lg md:text-xl font-medium tracking-widest text-white/80 uppercase"
          >
            {t('hero.join')}
          </motion.p>

          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
            className="px-8 py-4 bg-magenta text-obsidian font-display font-bold text-sm md:text-lg uppercase tracking-widest hover:bg-pink transition-colors box-glitch-hover animate-heartbeat relative group overflow-hidden"
          >
            <span className="relative z-10">{t('hero.cta')}</span>
            <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out" />
          </motion.button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {HERO_EVENTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'w-10 bg-magenta shadow-[0_0_15px_rgba(214,73,230,0.8)]' : 'w-3 bg-white/40 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 z-20"
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
};
