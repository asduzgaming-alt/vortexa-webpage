import VortexaLogo from '../assets/images/Vortexa ISOTIPO.png';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Automatically complete after the loading bar animation
  const handleComplete = () => {
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
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              onAnimationComplete={handleComplete}
              className="h-full bg-cyan shadow-[0_0_10px_rgba(44,203,233,0.8)]"
            />
          </div>
          <div className="mt-8 h-12 flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-cyan font-sans text-xs uppercase tracking-widest"
            >
              Initializing System...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
