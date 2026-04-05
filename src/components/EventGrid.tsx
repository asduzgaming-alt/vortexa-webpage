import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const EVENTS = [
  // Vibe 0: Techno
  {
    id: 1,
    vibe: 0,
    title: 'VORTEX: ORIGIN',
    dj: 'AMELIE LENS',
    date: 'OCT 28',
    time: '22:00 - 06:00',
    location: 'Main Arena',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop',
    status: 'Selling Fast',
  },
  {
    id: 3,
    vibe: 0,
    title: 'INDUSTRIAL DECAY',
    dj: 'I HATE MODELS',
    date: 'DEC 02',
    time: '23:00 - 08:00',
    location: 'Underground Warehouse',
    image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?q=80&w=2076&auto=format&fit=crop',
    status: 'Sold Out',
  },
  {
    id: 4,
    vibe: 0,
    title: 'ACID RAIN',
    dj: 'CHARLOTTE DE WITTE',
    date: 'JAN 15',
    time: '22:00 - 05:00',
    location: 'Industrial Factory',
    image: 'https://images.unsplash.com/photo-1520483601560-389dff434fdf?q=80&w=1974&auto=format&fit=crop',
    status: 'Available',
  },
  // Vibe 1: Synthwave
  {
    id: 2,
    vibe: 1,
    title: 'NEON NIGHTS',
    dj: 'KAVINSKY',
    date: 'NOV 15',
    time: '20:00 - 04:00',
    location: 'Skyline Rooftop',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=2079&auto=format&fit=crop',
    status: 'Available',
  },
  {
    id: 5,
    vibe: 1,
    title: 'CYBERPUNK 2077',
    dj: 'PERTURBATOR',
    date: 'DEC 10',
    time: '21:00 - 03:00',
    location: 'Neon Club',
    image: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?q=80&w=1974&auto=format&fit=crop',
    status: 'Selling Fast',
  },
  // Vibe 2: Sunset House
  {
    id: 6,
    vibe: 2,
    title: 'COASTAL GROOVES',
    dj: 'PEGGY GOU',
    date: 'NOV 22',
    time: '16:00 - 00:00',
    location: 'Beach Club',
    image: 'https://images.unsplash.com/photo-1516280440502-62b8110b64d0?q=80&w=2070&auto=format&fit=crop',
    status: 'Available',
  },
  {
    id: 7,
    vibe: 2,
    title: 'AFTERGLOW',
    dj: 'TALE OF US',
    date: 'DEC 28',
    time: '18:00 - 02:00',
    location: 'Coastal Stage',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=2070&auto=format&fit=crop',
    status: 'Sold Out',
  },
];

interface EventGridProps {
  activeVibeIndex: number;
}

export const EventGrid = ({ activeVibeIndex }: EventGridProps) => {
  const { t } = useLanguage();
  const filteredEvents = EVENTS.filter(event => event.vibe === activeVibeIndex);

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
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full ${
                      event.status === 'Sold Out' ? 'bg-red-500/80 text-white' :
                      event.status === 'Selling Fast' ? 'bg-orange-500/80 text-white animate-pulse' :
                      'bg-green-500/80 text-white'
                    }`}>
                      {getStatusTranslation(event.status)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  {/* Glitch Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-1 text-magenta group-hover:text-white transition-colors text-glitch-hover">
                      {event.title}
                    </h3>
                    <p className="text-3xl font-display font-black uppercase tracking-tighter mb-6 text-white text-glitch-hover">
                      {event.dj}
                    </p>

                    <div className="space-y-3 text-sm text-white/70 font-medium tracking-wide">
                      <div className="flex items-center space-x-3">
                        <Calendar size={16} className="text-cyan" />
                        <span>{event.date}</span>
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

                    <button className={`w-full mt-8 py-3 font-bold uppercase tracking-widest text-sm transition-all duration-300 ${
                      event.status === 'Sold Out' 
                        ? 'bg-white/10 text-white/40 cursor-not-allowed'
                        : 'bg-magenta/10 border border-magenta text-magenta hover:bg-magenta hover:text-obsidian box-glitch-hover'
                    }`}>
                      {event.status === 'Sold Out' ? t('events.btn.waitlist') : t('events.btn.tickets')}
                    </button>
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
