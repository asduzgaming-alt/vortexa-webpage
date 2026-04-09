import { useState, useEffect } from 'react';
import VortexaLogo from '../assets/images/Vortexa ISOTIPO.png';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={VortexaLogo} 
            alt="VORTEXA" 
            className="h-10 md:h-12 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors text-glitch-hover"
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/talent"
            className="text-sm font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors text-glitch-hover"
          >
            {t('nav.talent')}
          </Link>
          <Link
            to="/shop"
            className="text-sm font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors text-glitch-hover"
          >
            {t('nav.shop')}
          </Link>
          <a
            href="/#lineup"
            className="text-sm font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors text-glitch-hover"
          >
            {t('nav.events')}
          </a>
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-2 text-sm font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors"
          >
            <Globe size={16} />
            <span>{language.toUpperCase()}</span>
          </button>
          <button className="px-6 py-2 bg-magenta/20 border border-magenta text-magenta text-sm font-bold uppercase tracking-wider box-glitch-hover animate-heartbeat">
            {t('nav.currentEvents')}
          </button>
        </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button 
            onClick={toggleLanguage}
            className="text-white/80 hover:text-magenta transition-colors"
          >
            <Globe size={20} />
          </button>
          <button
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/10 p-6 flex flex-col space-y-4">
          <Link
            to="/"
            className="text-lg font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/talent"
            className="text-lg font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.talent')}
          </Link>
          <Link
            to="/shop"
            className="text-lg font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.shop')}
          </Link>
          <a
            href="/#lineup"
            className="text-lg font-medium uppercase tracking-wider text-white/80 hover:text-magenta transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.events')}
          </a>
          <button className="w-full px-6 py-3 bg-magenta/20 border border-magenta text-magenta text-sm font-bold uppercase tracking-wider box-glitch-hover">
            {t('nav.currentEvents')}
          </button>
        </div>
      )}
    </nav>
  );
};
