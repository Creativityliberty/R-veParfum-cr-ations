import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles, MapPin, ZoomIn } from 'lucide-react';

import parfum1 from '../assets/images/grasse/parfum_1.png';
import parfum2 from '../assets/images/grasse/parfum_2.png';
import parfum3 from '../assets/images/grasse/parfum_3.png';
import parfum4 from '../assets/images/grasse/parfum_4.png';
import parfum5 from '../assets/images/grasse/parfum_5.png';
import parfum6 from '../assets/images/grasse/parfum_6.png';
import parfum7 from '../assets/images/grasse/parfum_7.png';
import parfum8 from '../assets/images/grasse/parfum_8.png';
import parfum9 from '../assets/images/grasse/parfum_9.png';
import parfum10 from '../assets/images/grasse/parfum_10.png';

interface ScentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScentGuideModal({ isOpen, onClose }: ScentGuideModalProps) {
  const images = [
    { img: parfum1, title: "Senteurs Gourmandes & Fruitées" },
    { img: parfum2, title: "Senteurs Fleuries & Sucrées" },
    { img: parfum3, title: "Senteurs Envoûtantes" },
    { img: parfum4, title: "Les Authentiques de Grasse" },
    { img: parfum5, title: "Accords Rares" },
    { img: parfum6, title: "Sillages d'Exception" },
    { img: parfum7, title: "Sélection d'Atelier" },
    { img: parfum8, title: "Fraîcheur & Douceur" },
    { img: parfum9, title: "Créations Spéciales" },
    { img: parfum10, title: "Carte Complète des Senteurs" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          {/* Decorative ambient blobs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.93, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.93, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-brand-depth border border-brand-pink/20 rounded-[2.5rem] shadow-2xl p-6 md:p-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-brand-pink/10 pb-4">
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-pink font-bold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Guide de nos Parfums de Grasse
                </span>
                <h3 className="font-serif font-bold text-xl md:text-2xl text-brand-cream tracking-tight">
                  Notre Carte des Fragrances
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-brand-bg/85 border border-brand-pink/25 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-all cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Carousel Slider */}
            <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl overflow-hidden border border-brand-pink/15 bg-brand-bg shadow-inner flex items-center justify-center group">
              <img
                src={images[currentIndex].img}
                alt={images[currentIndex].title}
                className="w-full h-full object-contain filter brightness-[97%]"
                referrerPolicy="no-referrer"
              />

              {/* Slide overlay overlay info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-bg via-brand-bg/70 to-transparent p-6 text-center select-none">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-depth/90 border border-brand-pink/10 text-[10px] font-mono text-brand-pink uppercase tracking-widest mb-1.5">
                  Page {currentIndex + 1} / {images.length}
                </span>
                <h4 className="font-serif font-semibold text-sm text-brand-cream">
                  {images[currentIndex].title}
                </h4>
              </div>

              {/* Prev / Next controls */}
              <button
                onClick={handlePrev}
                className="absolute left-4 p-3 rounded-full bg-brand-depth/85 border border-brand-pink/15 text-brand-cream hover:bg-brand-pink hover:text-brand-bg transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg"
                aria-label="Précédent"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 p-3 rounded-full bg-brand-depth/85 border border-brand-pink/15 text-brand-cream hover:bg-brand-pink hover:text-brand-bg transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg"
                aria-label="Suivant"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Bottom Controls / Indicator Dots */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-brand-pink/10">
              <div className="flex gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx ? 'bg-brand-pink w-6 shadow-sm' : 'bg-brand-pink/20 hover:bg-brand-pink/40'
                    }`}
                    aria-label={`Aller à la page ${idx + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-brand-text-muted/70 uppercase">
                <MapPin className="w-3.5 h-3.5 text-brand-pink" />
                Huiles aromatiques curées à Grasse, France
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
