import SisifuzImg from '../assets/images/Sisifuz Place Holder.png';
import Daniela1 from '../assets/images/Daniela 1.png';
import XimenaPortada from '../assets/images/Ximena Portada.png';
import Ximena1 from '../assets/images/Ximena 1.png';
import Ximena2 from '../assets/images/ximena 2.png';
import { useState, useRef } from 'react';
import PulseWade1 from '../assets/images/Pulse wade 1.png';
import PulseWade2 from '../assets/images/Pulse wade 2.jpeg';
import PulseWade3 from '../assets/images/Pulse wade 3.png';
import PulseWadeAudio from '../assets/mp3/pulsewade-fragment.mp3';
import Gonzalo1 from '../assets/images/Gonzalo1.jpeg';
import Gonzalo2 from '../assets/images/Gonzalo2.jpg';
import { motion, AnimatePresence } from 'motion/react';
import { VortexBackground } from '../components/VortexBackground';
import { Instagram, Music, X, Play, Pause, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Custom TikTok icon since Lucide doesn't have it
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const TALENT_LIST = [
  // Evento: SISIFUZ
  {
    id: 200,
    type: 'event',
    name: 'SISIFUZ',
    genre: 'Techno',
    nationality: 'Peruano',
    flag: '🇵🇪',
    images: [SisifuzImg],
    audioSrc: '',
    socials: {
      instagram: 'https://www.instagram.com/sisifuz/'
    }
  },
    // Influencer: Ximena Nevado (first)
    {
      id: 101,
      type: 'influencer',
      name: 'XIMENA NEVADO',
      genre: 'Lifestyle',
      nationality: 'Peruana',
      flag: '🇵🇪',
      images: [Ximena1, Ximena2],
      audioSrc: '',
      socials: {
        instagram: 'https://www.instagram.com/ximenevado/'
      }
    },
    // Influencer: Daniella Pinto (second)
    {
      id: 100,
      type: 'influencer',
      name: 'DANIELLA PINTO',
      genre: 'Lifestyle',
      nationality: 'Peruana',
      flag: '🇵🇪',
      images: [Daniela1],
      audioSrc: '',
      socials: {
        instagram: 'https://www.instagram.com/daniellapinto.02/',
        tiktok: 'https://www.tiktok.com/@daniellapinto07'
      }
    },
  // 1. Gonzalo Madariaga
  {
    id: 1,
    type: 'dj',
    name: 'GONZALO MADARIAGA',
    genre: 'Techno',
    nationality: 'Chileno',
    flag: '🇨🇱',
    images: [Gonzalo1, Gonzalo2],
    audioSrc: '',
    socials: { instagram: '', soundcloud: '', tiktok: '' }
  },
  // 2. Pulse Wade
  {
    id: 2,
    type: 'dj',
    name: 'PULSE WADE',
    genre: 'House',
    nationality: 'Peruano',
    flag: '🇵🇪',
    images: [PulseWade1, PulseWade2, PulseWade3],
    audioSrc: PulseWadeAudio,
    socials: {
      instagram: 'https://www.instagram.com/pulsewade.dj?igsh=eGt4dTE1dHd4NDBl&utm_source=qr',
      soundcloud: 'https://on.soundcloud.com/3KeTl6JhFE4GELtrdF',
      tiktok: 'https://www.tiktok.com/@pulsewade.dj?_r=1&_t=ZS-95HJN800xG8'
    }
  },
];

const AudioVisualizer = ({ isPlaying }: { isPlaying: boolean }) => {
  const bars = Array.from({ length: 24 });
  return (
    <div className="flex items-end justify-between h-12 w-full gap-0.5">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-full bg-cyan rounded-t-sm"
          animate={{
            height: isPlaying ? ['10%', `${Math.random() * 70 + 30}%`, '10%'] : '5%',
          }}
          transition={{
            duration: isPlaying ? Math.random() * 0.4 + 0.4 : 0.5,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut"
          }}
          style={{
            boxShadow: isPlaying ? '0 0 8px rgba(44,203,233,0.5)' : 'none'
          }}
        />
      ))}
    </div>
  );
};

export const Talent = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'dj' | 'influencer' | 'event'>('dj');
  const [selectedTalent, setSelectedTalent] = useState<typeof TALENT_LIST[0] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const closeModal = () => {
    setSelectedTalent(null);
    setIsPlaying(false);
    setActiveImageIndex(0);
  };

  const filteredTalent = TALENT_LIST.filter(artist => artist.type === activeTab);

  return (
    <div className="min-h-screen bg-obsidian pt-32 pb-20 relative overflow-hidden">
      {/* Subtle Vortex Background for Talent Page */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none mix-blend-screen">
        <VortexBackground />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4 text-glitch-hover text-transparent bg-clip-text bg-gradient-to-r from-white via-pink to-magenta">
            {t('talent.title')}
          </h1>
          <p className="text-xl text-white/60 font-medium tracking-wide">
            {t('talent.subtitle')}
          </p>
        </motion.div>

        <div className="flex justify-center space-x-4 mb-12">
          <button 
            onClick={() => setActiveTab('dj')}
            className={`px-8 py-3 rounded-full uppercase tracking-widest font-bold text-sm transition-all duration-300 ${
              activeTab === 'dj' 
                ? 'bg-magenta text-white shadow-[0_0_20px_rgba(214,73,230,0.5)]' 
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            DJs
          </button>
          <button 
            onClick={() => setActiveTab('influencer')}
            className={`px-8 py-3 rounded-full uppercase tracking-widest font-bold text-sm transition-all duration-300 ${
              activeTab === 'influencer' 
                ? 'bg-cyan text-obsidian shadow-[0_0_20px_rgba(44,203,233,0.5)]' 
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
            }`}
          >
            Influencers
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTalent.map((artist, index) => (
            <motion.div
              key={artist.id}
              onClick={() => setSelectedTalent(artist)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl glass box-glitch-hover aspect-[3/4] cursor-pointer"
            >
              <img 
                src={artist.images[0]} 
                alt={artist.name} 
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              
              <div className="absolute inset-x-0 bottom-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="mb-2">
                  <p className="text-cyan font-bold uppercase tracking-widest text-xs">{artist.nationality}</p>
                </div>
                <p className="text-white/60 font-bold uppercase tracking-widest text-[10px] mb-1">{artist.genre}</p>
                <h3 className="text-3xl font-display font-black uppercase tracking-tighter text-white mb-4 text-glitch-hover">
                  {artist.name}
                </h3>
                <div className="flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <a href={artist.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-magenta text-white rounded-full transition-colors backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                    <Instagram size={20} />
                  </a>
                  <a href={artist.socials.soundcloud} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-magenta text-white rounded-full transition-colors backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                    <Music size={20} />
                  </a>
                  <a href={artist.socials.tiktok} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/10 hover:bg-magenta text-white rounded-full transition-colors backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                    <TikTokIcon size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Talent Modal */}
      <AnimatePresence>
        {selectedTalent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-obsidian border border-white/10 rounded-2xl max-w-5xl w-full overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(214,73,230,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side - Gallery */}
              <div className="w-full md:w-1/2 h-80 md:h-auto relative group">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeImageIndex}
                    src={selectedTalent.images[activeImageIndex]} 
                    alt={selectedTalent.name} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover" 
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent md:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-obsidian hidden md:block" />
                
                {/* Gallery Controls */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {selectedTalent.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        activeImageIndex === i ? 'bg-magenta w-8' : 'bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                <button onClick={closeModal} className="absolute top-6 right-6 text-white/50 hover:text-magenta transition-colors">
                  <X size={24} />
                </button>

                <div className="mb-2">
                  <p className="text-cyan font-bold uppercase tracking-widest text-sm">{selectedTalent.nationality}</p>
                </div>
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs mb-1">{selectedTalent.genre}</p>
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white mb-6 text-glitch-hover">
                  {selectedTalent.name}
                </h2>

                <p className="text-white/70 leading-relaxed mb-8">
                  {t(`talent.${selectedTalent.id}.bio`)}
                </p>

                {/* Audio Player - Only for DJs */}
                {selectedTalent.type === 'dj' && (
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 mb-8">
                    <button
                      onClick={togglePlay}
                      className="p-4 bg-magenta text-white rounded-full hover:bg-pink transition-colors shadow-[0_0_15px_rgba(214,73,230,0.4)] shrink-0"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2">
                        {t('talent.previewTrack')}
                      </div>
                      <AudioVisualizer isPlaying={isPlaying} />
                    </div>
                    <audio
                      ref={audioRef}
                      autoPlay
                      src={selectedTalent.audioSrc}
                      onEnded={() => setIsPlaying(false)}
                      onPause={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                    />
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  {selectedTalent.socials.instagram && (
                    <a href={selectedTalent.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-bold uppercase tracking-widest text-xs">
                      <Instagram size={16} />
                      <span>Instagram</span>
                    </a>
                  )}
                  {selectedTalent.socials.tiktok && (
                    <a href={selectedTalent.socials.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-bold uppercase tracking-widest text-xs">
                      <TikTokIcon size={16} />
                      <span>TikTok</span>
                    </a>
                  )}
                  {/* Only show SoundCloud for talents that have it (not Daniella) */}
                  {selectedTalent.socials.soundcloud && selectedTalent.socials.soundcloud !== '' && (
                    <a href={selectedTalent.socials.soundcloud} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-bold uppercase tracking-widest text-xs">
                      <Music size={16} />
                      <span>SoundCloud</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
