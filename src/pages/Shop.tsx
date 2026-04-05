import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { VortexBackground } from '../components/VortexBackground';

export const Shop = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-obsidian pt-32 pb-20 relative overflow-hidden">
      {/* Subtle Vortex Background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen">
        <VortexBackground />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4 text-glitch-hover text-transparent bg-clip-text bg-gradient-to-r from-white via-pink to-magenta">
            {t('shop.title')}
          </h1>
          <p className="text-xl text-white/60 font-medium tracking-wide">
            {t('shop.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="col-span-2 aspect-video rounded-2xl overflow-hidden glass border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1511499767390-a7335958beba?q=80&w=2080&auto=format&fit=crop" 
                alt="Raver Sunglasses" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden glass border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop" 
                alt="Raver Sunglasses Detail" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden glass border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=2070&auto=format&fit=crop" 
                alt="Raver Sunglasses Lifestyle" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8">
              <ShoppingBag className="text-magenta/20 w-32 h-32 rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="inline-block px-4 py-1 bg-magenta/20 border border-magenta/40 rounded-full text-magenta text-xs font-bold uppercase tracking-widest mb-6">
                New Arrival
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter text-white mb-6">
                {t('shop.product.name')}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed mb-10">
                {t('shop.product.desc')}
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <div className="w-3 h-3 rounded-full bg-cyan animate-pulse" />
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase tracking-widest text-sm">UV400 Protection</p>
                    <p className="text-white/40 text-xs">Maximum eye safety</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <div className="w-3 h-3 rounded-full bg-magenta animate-pulse" />
                  </div>
                  <div>
                    <p className="text-white font-bold uppercase tracking-widest text-sm">Glow-in-the-dark Frame</p>
                    <p className="text-white/40 text-xs">Stand out in the crowd</p>
                  </div>
                </div>
              </div>

              <a 
                href="https://wa.me/yournumber" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-3 w-full py-5 bg-gradient-to-r from-magenta to-pink text-white font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_30px_rgba(214,73,230,0.5)] transition-all duration-300 group"
              >
                <MessageCircle className="group-hover:scale-110 transition-transform" />
                <span>{t('shop.product.cta')}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
