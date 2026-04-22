
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SisifuzImg from '../assets/images/Sisifuz Place Holder.png';

const EVENTS = [
  // Vibe 0: House (Coming Soon only)
  {
    id: 2001,
    vibe: 0,
    title: 'COMING SOON',
    dj: '',
    date: '',
    time: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=2080&auto=format&fit=crop',
    status: 'Coming Soon',
    comingSoon: true
  },
  // Vibe 1: Techno (SISIFUZ only)
  {
    id: 1001,
    vibe: 1,
    title: 'SISIFUZ',
    dj: 'HARD TECHNO',
    date: '22 ABR',
    time: '10:00 - 04:00',
    location: 'Miraflores',
    image: SisifuzImg,
    status: 'Available',
    instagram: 'https://www.instagram.com/sisifuz/'
  },
  // Vibe 2: Minimal (Coming Soon only)
  {
    id: 3001,
    vibe: 2,
    title: 'COMING SOON',
    dj: '',
    date: '',
    time: '',
    location: '',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2080&auto=format&fit=crop',
    status: 'Coming Soon',
    comingSoon: true
  },
];

interface EventGridProps {
  activeVibeIndex: number;
}

export const EventGrid = ({ activeVibeIndex }: EventGridProps) => {
  const { t } = useLanguage();
  const filteredEvents = EVENTS.filter(event => event.vibe === activeVibeIndex);

  // Helper: If event is SISIFUZ, show 'MIÉRCOLES' if today is not April 22, 2026
  const getEventDate = (event) => {
    if (event.title === 'SISIFUZ') {
      const today = new Date();
      // 2026-04-22 is the launch date
      const launchDate = new Date('2026-04-22');
      if (
        today.getFullYear() > 2026 ||
        (today.getFullYear() === 2026 && today.getMonth() > 3) ||
        (today.getFullYear() === 2026 && today.getMonth() === 3 && today.getDate() > 22)
      ) {
        return 'MIÉRCOLES';
      }
    }
    return event.date;
  };

  const getStatusTranslation = (status: string) => {
    switch(status) {
      case 'Sold Out': return t('events.status.soldOut');
      case 'Selling Fast': return t('events.status.sellingFast');
      default: return t('events.status.available');
    }
  };

  return (
    <section id="lineup" className="py-32 bg-obsidian relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4 text-glitch-hover">
              {t('events.title')}
            </h2>
            <p className="text-xl text-white/60 font-medium tracking-wide">
              {t('events.subtitle')}
            </p>
          </div>
          <button className="mt-8 md:mt-0 px-6 py-2 border border-white/20 text-white/80 hover:bg-white hover:text-obsidian transition-colors font-bold uppercase tracking-widest text-sm">
            {t('events.viewAll')}
          </button>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event, index) => (
              <motion.div
                layout
                key={event.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group glass rounded-xl overflow-hidden relative box-glitch-hover"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-magenta/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <img
                    src={event.image}
                    alt={event.title}
                    className={`w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out${event.comingSoon ? ' blur-md' : ''}`}
                    referrerPolicy="no-referrer"
                  />
                  {/* Status Badge or Coming Soon */}
                  <div className="absolute top-4 right-4 z-20">
                    {event.comingSoon ? (
                      <span className="px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-gray-700/80 text-white animate-pulse">Coming Soon</span>
                    ) : (
                      <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${
                        event.status === 'Sold Out' ? 'bg-red-500/80 text-white' :
                        event.status === 'Selling Fast' ? 'bg-orange-500/80 text-white animate-pulse' :
                        'bg-green-500/80 text-white'
                      }`}>
                        {getStatusTranslation(event.status)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  {/* Glitch Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10 flex flex-col items-center justify-center min-h-[120px]">
                    {event.comingSoon ? (
                      <>
                        <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-1 text-magenta group-hover:text-white transition-colors text-glitch-hover">Coming Soon</h3>
                        <p className="text-lg font-medium text-white/70">Próximamente nuevos eventos en esta categoría.</p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-1 text-magenta group-hover:text-white transition-colors text-glitch-hover">
                          {event.dj}
                        </h3>
                        <p className="text-3xl font-display font-black uppercase tracking-tighter mb-6 text-white text-glitch-hover">
                          {event.title}
                        </p>

                        <div className="space-y-3 text-sm text-white/70 font-medium tracking-wide">
                          <div className="flex items-center space-x-3">
                            <Calendar size={16} className="text-cyan" />
                            <span>{getEventDate(event)}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Clock size={16} className="text-cyan" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <MapPin size={16} className="text-cyan" />
                            <span>{event.location}</span>
                          </div>
                        </div>

                        {event.status === 'Sold Out' ? (
                          <button className={`w-full mt-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-white/10 text-white/40 cursor-not-allowed`}>
                            {t('events.btn.waitlist')}
                          </button>
                        ) : (
                          <a
                            href={event.instagram || '#'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full block mt-8"
                          >
                            <button
                              className="w-full py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 bg-magenta/10 border border-magenta text-magenta hover:bg-magenta hover:text-obsidian box-glitch-hover"
                            >
                              {t('events.btn.tickets')}
                            </button>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
