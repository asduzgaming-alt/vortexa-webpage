import { Instagram, Twitter, Youtube, Music } from 'lucide-react';
import VortexaLogo from '../assets/images/Vortexa ISOTIPO.png';
import { useLanguage } from '../context/LanguageContext';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-obsidian py-16 border-t border-white/10 relative overflow-hidden">
      {/* Glowing V Logo Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-display font-black text-white/5 pointer-events-none select-none blur-sm">
        V
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0 text-center md:text-left flex flex-col items-center md:items-start">
          <img 
            src={VortexaLogo} 
            alt="VORTEXA" 
            className="h-12 md:h-16 mb-4 object-contain"
          />
          <p className="text-sm text-white/50 font-medium tracking-wide">
            LIMA, PERU &copy; {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex space-x-6 mb-8 md:mb-0">
          {[Instagram, Twitter, Youtube, Music].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-white/50 hover:text-magenta transition-colors duration-300 transform hover:scale-110"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>

        <div className="flex space-x-6 text-xs font-bold uppercase tracking-widest text-white/40">
          <a href="/shop" className="hover:text-white transition-colors">{t('nav.shop')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-white transition-colors">{t('footer.contact')}</a>
        </div>
      </div>
    </footer>
  );
};
