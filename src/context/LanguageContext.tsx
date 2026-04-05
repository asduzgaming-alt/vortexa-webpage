import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.talent': 'Talent',
    'nav.events': 'Events',
    'nav.shop': 'Shop',
    'nav.currentEvents': 'Current Events',
    'hero.join': 'Join Vortexa',
    'hero.cta': 'Current Events',
    'shop.title': 'Vortexa Gear',
    'shop.subtitle': 'Elevate your rave experience.',
    'shop.product.name': 'Raver Sunglasses',
    'shop.product.desc': 'High-performance, UV-protected eyewear designed for the most intense light shows and longest nights.',
    'shop.product.cta': 'Buy via WhatsApp',
    'vibe.title': 'Vibe Check',
    'vibe.subtitle': 'Find your frequency.',
    'vibe.house': 'House',
    'vibe.techno': 'Techno',
    'vibe.minimal': 'Minimal',
    'vibe.0.name': 'House',
    'vibe.0.desc': 'Deep, rhythmic grooves and infectious energy for the dancefloor.',
    'vibe.1.name': 'Techno',
    'vibe.1.desc': 'Driving beats, industrial synths, and relentless high-BPM energy.',
    'vibe.2.name': 'Minimal',
    'vibe.2.desc': 'Stripped-back, hypnotic rhythms focused on subtle sonic textures.',
    'events.title': 'Upcoming Raves',
    'events.subtitle': 'Secure your spot in Vortexa.',
    'events.viewAll': 'View All',
    'events.status.soldOut': 'Sold Out',
    'events.status.sellingFast': 'Selling Fast',
    'events.status.available': 'Available',
    'events.btn.waitlist': 'Join Waitlist',
    'events.btn.tickets': 'Get Tickets',
    'talent.title': 'Our Talent',
    'talent.subtitle': 'The architects of Vortexa.',
    'talent.previewTrack': 'Preview Track',
    'talent.1.bio': 'A leading figure in the modern techno scene, known for her relentless, high-BPM sets and dark, industrial soundscapes.',
    'talent.2.bio': 'The pioneer of synthwave. His cinematic, 80s-inspired electronic beats transport you to a neon-lit retro future.',
    'talent.3.bio': 'Breaking the boundaries of industrial techno with emotional, trance-infused melodies and punishing kicks.',
    'talent.4.bio': 'The undisputed queen of acid techno, delivering stripped-back, uncompromising underground anthems.',
    'talent.5.bio': 'Blending house, disco, and techno with a unique cultural flair, creating irresistible dancefloor grooves.',
    'talent.6.bio': 'Pulse Wave is a Peruvian DJ and producer who has taken the house scene by storm with his deep, rhythmic grooves and infectious energy.',
    'footer.terms': 'Terms',
    'footer.privacy': 'Privacy',
    'footer.contact': 'Contact',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.talent': 'Talento',
    'nav.events': 'Eventos',
    'nav.shop': 'Tienda',
    'nav.currentEvents': 'Eventos Actuales',
    'hero.join': 'Únete a Vortexa',
    'hero.cta': 'Eventos Actuales',
    'shop.title': 'Equipo Vortexa',
    'shop.subtitle': 'Eleva tu experiencia rave.',
    'shop.product.name': 'Lentes Raver',
    'shop.product.desc': 'Gafas de alto rendimiento con protección UV diseñadas para los espectáculos de luces más intensos y las noches más largas.',
    'shop.product.cta': 'Comprar por WhatsApp',
    'vibe.title': 'Sintoniza tu Ritmo',
    'vibe.subtitle': 'Encuentra tu frecuencia.',
    'vibe.house': 'House',
    'vibe.techno': 'Techno',
    'vibe.minimal': 'Minimal',
    'vibe.0.name': 'House',
    'vibe.0.desc': 'Grooves profundos y rítmicos con una energía contagiosa para la pista de baile.',
    'vibe.1.name': 'Techno',
    'vibe.1.desc': 'Ritmos contundentes, sintetizadores industriales y energía implacable de alto BPM.',
    'vibe.2.name': 'Minimal',
    'vibe.2.desc': 'Ritmos hipnóticos y minimalistas enfocados en texturas sonoras sutiles.',
    'events.title': 'Próximos Raves',
    'events.subtitle': 'Asegura tu lugar en Vortexa.',
    'events.viewAll': 'Ver Todos',
    'events.status.soldOut': 'Agotado',
    'events.status.sellingFast': 'Últimas Entradas',
    'events.status.available': 'Disponible',
    'events.btn.waitlist': 'Lista de Espera',
    'events.btn.tickets': 'Comprar Entradas',
    'talent.title': 'Nuestro Talento',
    'talent.subtitle': 'Los arquitectos de Vortexa.',
    'talent.previewTrack': 'Escuchar Pista',
    'talent.1.bio': 'Una figura líder en la escena techno moderna, conocida por sus sets implacables de alto BPM y paisajes sonoros oscuros e industriales.',
    'talent.2.bio': 'El pionero del synthwave. Sus ritmos electrónicos cinematográficos inspirados en los 80 te transportan a un futuro retro iluminado por neón.',
    'talent.3.bio': 'Rompiendo los límites del techno industrial con melodías emocionales infundidas de trance y bombos castigadores.',
    'talent.4.bio': 'La reina indiscutible del acid techno, entregando himnos underground crudos e intransigentes.',
    'talent.5.bio': 'Mezclando house, disco y techno con un estilo cultural único, creando ritmos irresistibles para la pista de baile.',
    'talent.6.bio': 'Pulse Wave es un DJ y productor peruano que ha irrumpido en la escena house con sus grooves profundos y rítmicos y su energía contagiosa.',
    'footer.terms': 'Términos',
    'footer.privacy': 'Privacidad',
    'footer.contact': 'Contacto',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es'); // Default to Spanish as requested

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
