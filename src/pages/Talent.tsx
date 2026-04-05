import { useState, useRef } from 'react';
import PulseWade1 from '../assets/images/Pulse wade 1.png';
import PulseWade2 from '../assets/images/Pulse wade 2.jpeg';
import PulseWade3 from '../assets/images/Pulse wade 3.png';
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
  { 
    id: 1, 
    type: 'dj',
    name: 'AMELIE LENS', 
    genre: 'Techno', 
    nationality: 'Belgian',
    flag: '🇧🇪',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop'
    ], 
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    socials: { 
      instagram: 'https://instagram.com/amelielens', 
      soundcloud: 'https://soundcloud.com/amelielens', 
      tiktok: 'https://tiktok.com/@amelielens' 
    }
  },
  { 
    id: 2, 
    type: 'dj',
    name: 'KAVINSKY', 
    genre: 'Synthwave', 
    nationality: 'French',
    flag: '🇫🇷',
    images: [
      'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550029402-226115b7c579?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2070&auto=format&fit=crop'
    ], 
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    socials: { 
      instagram: 'https://instagram.com/kavinsky', 
      soundcloud: 'https://soundcloud.com/kavinsky', 
      tiktok: 'https://tiktok.com/@kavinsky' 
    }
  },
  { 
    id: 3, 
    type: 'dj',
    name: 'I HATE MODELS', 
    genre: 'Industrial Techno', 
    nationality: 'French',
    flag: '🇫🇷',
    images: [
      'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2076&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop'
    ], 
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    socials: { 
      instagram: 'https://instagram.com/ihatemodels', 
      soundcloud: 'https://soundcloud.com/ihatemodels', 
      tiktok: 'https://tiktok.com/@ihatemodels' 
    }
  },
  { 
    id: 4, 
    type: 'dj',
    name: 'CHARLOTTE DE WITTE', 
    genre: 'Acid Techno', 
    nationality: 'Belgian',
    flag: '🇧🇪',
    images: [
      'https://images.unsplash.com/photo-1520483601560-389dff434fdf?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop'
    ], 
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    socials: { 
      instagram: 'https://instagram.com/charlottedewittemusic', 
      soundcloud: 'https://soundcloud.com/charlottedewitte', 
      tiktok: 'https://tiktok.com/@charlottedewitte' 
    }
  },
  { 
    id: 5, 
    type: 'dj',
    name: 'PEGGY GOU', 
    genre: 'House', 
    nationality: 'South Korean',
    flag: '🇰🇷',
    images: [
      'https://images.unsplash.com/photo-1516280440502-62b8110b64d0?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1974&auto=format&fit=crop'
    ], 
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    socials: { 
      instagram: 'https://instagram.com/peggygou_', 
      soundcloud: 'https://soundcloud.com/peggygou', 
      tiktok: 'https://tiktok.com/@peggygou' 
    }
  },
  { 
    id: 6, 
    type: 'dj',
    name: 'PULSE WADE', 
    genre: 'House', 
    nationality: 'Peruvian',
    flag: '🇵🇪',
    images: [
      PulseWade1,
      PulseWade2,
      PulseWade3
    ],
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    socials: { 
      instagram: 'https://instagram.com/pulsewave_pe', 
      soundcloud: 'https://soundcloud.com/pulsewave', 
      tiktok: 'https://tiktok.com/@pulsewave' 
    }
  },
  { 
    id: 7, 
    type: 'influencer',
    name: 'NEON QUEEN', 
    genre: 'Cyberpunk Fashion', 
    nationality: 'Japanese',
    flag: '🇯🇵',
    images: [
      'https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop'
    ], 
    audioSrc: '',
    socials: { 
      instagram: 'https://instagram.com/neonqueen', 
      soundcloud: '', 
      tiktok: 'https://tiktok.com/@neonqueen' 
    }
  },
  { 
    id: 8, 
    type: 'influencer',
    name: 'RAVE EXPLORER', 
    genre: 'Festival Vlogger', 
    nationality: 'British',
    flag: '🇬🇧',
    images: [
      'https://images.unsplash.com/photo-1525926477800-7a3afafbeaf3?q=80&w=2069&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533174000255-16134b28c8e6?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop'
    ], 
    audioSrc: '',
    socials: { 
      instagram: 'https://instagram.com/raveexplorer', 
      soundcloud: '', 
      tiktok: 'https://tiktok.com/@raveexplorer' 
    }
  },
  { 
    id: 9, 
    type: 'influencer',
    name: 'TECH WEAR GURU', 
    genre: 'Techwear Style', 
    nationality: 'German',
    flag: '🇩🇪',
    images: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=2070&auto=format&fit=crop'
    ], 
    audioSrc: '',
    socials: { 
      instagram: 'https://instagram.com/techwearguru', 
      soundcloud: '', 
      tiktok: 'https://tiktok.com/@techwearguru' 
    }
  }
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
  const [activeTab, setActiveTab] = useState<'dj' | 'influencer'>('dj');
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
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{artist.flag}</span>
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

                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{selectedTalent.flag}</span>
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
                  <a href={selectedTalent.socials.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-bold uppercase tracking-widest text-xs">
                    <Instagram size={16} />
                    <span>Instagram</span>
                  </a>
                  <a href={selectedTalent.socials.soundcloud} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-bold uppercase tracking-widest text-xs">
                    <Music size={16} />
                    <span>SoundCloud</span>
                  </a>
                  <a href={selectedTalent.socials.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-bold uppercase tracking-widest text-xs">
                    <TikTokIcon size={16} />
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
