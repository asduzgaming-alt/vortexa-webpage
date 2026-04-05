import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showEnter, setShowEnter] = useState(false);

  const handleEnter = () => {
    setIsLoading(false);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] bg-obsidian flex flex-col items-center justify-center"
        >
          <motion.div
            animate={{ 
              opacity: [1, 0.5, 1, 0.2, 1],
              x: [0, -5, 5, -2, 2, 0]
            }}
            transition={{ 
              duration: 0.5, 
              repeat: Infinity,
              repeatType: "mirror" 
            }}
            className="relative"
          >
            <img 
              src="https://storage.googleapis.com/aistudio-janus-prod-appspot-com/user_data/asduzgaming%40gmail.com/1741909680-image.png" 
              alt="VORTEXA" 
              className="w-64 md:w-96 drop-shadow-[0_0_30px_rgba(214,73,230,0.8)]"
            />
            <div className="absolute inset-0 bg-magenta mix-blend-overlay opacity-50 animate-pulse" />
          </motion.div>
          
          <div className="mt-12 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              onAnimationComplete={() => setShowEnter(true)}
              className="h-full bg-cyan shadow-[0_0_10px_rgba(44,203,233,0.8)]"
            />
          </div>
          
          <div className="mt-8 h-12 flex items-center justify-center">
            {showEnter ? (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleEnter}
                className="px-8 py-3 bg-magenta text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-pink transition-colors shadow-[0_0_20px_rgba(214,73,230,0.5)]"
              >
                Enter Vortexa
              </motion.button>
            ) : (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-cyan font-sans text-xs uppercase tracking-widest"
              >
                Initializing System...
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
