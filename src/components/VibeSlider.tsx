import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Play, Pause } from 'lucide-react';

const VIBES = [
  {
    id: 0,
    color: 'from-obsidian via-gray-900 to-black',
    accent: 'text-gray-400',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: 1,
    color: 'from-obsidian via-purple-900 to-magenta/20',
    accent: 'text-magenta',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: 2,
    color: 'from-obsidian via-pink-900/50 to-orange-900/30',
    accent: 'text-pink',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

interface VibeSliderProps {
  activeVibeIndex: number;
  setActiveVibeIndex: (index: number) => void;
}

export const VibeSlider = ({ activeVibeIndex, setActiveVibeIndex }: VibeSliderProps) => {
  const { t } = useLanguage();
  const currentVibe = VIBES[activeVibeIndex];
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [activeVibeIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={`relative py-32 transition-colors duration-1000 bg-gradient-to-b ${currentVibe.color}`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter mb-4 text-glitch-hover">
            {t('vibe.title')}
          </h2>
          <p className="text-xl text-white/60 font-medium tracking-wide">
            {t('vibe.subtitle')}
          </p>
        </div>

        {/* Slider Container */}
        <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-2xl relative overflow-hidden">
          {/* Animated Background Glow */}
          <motion.div
            className="absolute -inset-10 bg-gradient-to-r from-magenta/20 to-cyan/20 blur-3xl opacity-50"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />

          <div className="relative z-10 flex flex-col items-center">
            <audio 
              ref={audioRef} 
              src={currentVibe.audioSrc} 
              loop 
              autoPlay
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
            />
            
            {/* Vibe Display */}
            <motion.div
              key={activeVibeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 h-32 flex flex-col items-center"
            >
              <div className="flex items-center justify-center space-x-4 mb-4">
                <h3 className={`text-3xl md:text-5xl font-display font-bold uppercase tracking-tight ${currentVibe.accent} text-glitch-hover`}>
                  {t(`vibe.${activeVibeIndex}.name`)}
                </h3>
                <button
                  onClick={togglePlay}
                  className={`p-3 rounded-full border border-white/20 hover:bg-white/10 transition-colors ${currentVibe.accent}`}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
              </div>
              <p className="text-lg text-white/80 max-w-xl mx-auto">
                {t(`vibe.${activeVibeIndex}.desc`)}
              </p>
            </motion.div>

            {/* Custom Range Input */}
            <div className="w-full relative py-4">
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={activeVibeIndex}
                onChange={(e) => setActiveVibeIndex(parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-magenta/50"
                style={{
                  background: `linear-gradient(to right, var(--color-magenta) ${(activeVibeIndex / 2) * 100}%, rgba(255,255,255,0.2) ${(activeVibeIndex / 2) * 100}%)`
                }}
              />
              
              <div className="flex justify-between w-full px-2 mt-4 text-xs font-bold uppercase tracking-widest text-white/40">
                <span>{t('vibe.house')}</span>
                <span>{t('vibe.techno')}</span>
                <span>{t('vibe.minimal')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
