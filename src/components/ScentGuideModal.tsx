import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles, MapPin, ZoomIn, Eye, Layers, Search, Heart } from 'lucide-react';

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

// Complete rich fragrance database, categorized for a "menu" layout
const SCENT_COLLECTIONS = [
  {
    title: "Senteurs Gourmandes & Sucrées",
    description: "Des notes réconfortantes, enveloppantes et irrésistiblement délicieuses.",
    scents: [
      {
        name: "Cerise Noire Explosive",
        notes: "Griotte sauvage, Amande amère, Fève Tonka",
        desc: "Un sillage fruité intense aux accents d'amande douce et de fruits rouges mûrs.",
        popular: true
      },
      {
        name: "Pomme d'Amour",
        notes: "Pomme rouge, Sucre cuit, Caramel chaud, Vanille",
        desc: "L'odeur nostalgique et irrésistible des fêtes foraines et de la pomme caramélisée.",
        popular: true
      },
      {
        name: "Délice Interdit",
        notes: "Sucre roux, Caramel au beurre salé, Lait concentré",
        desc: "Une douceur gourmande absolue, réconfortante et délicatement lactée.",
        popular: false
      }
    ]
  },
  {
    title: "Sillages Floraux & Poudrés",
    description: "La délicatesse des fleurs fraîchement cueillies et la pureté des notes poudrées.",
    scents: [
      {
        name: "Fleur de Coton",
        notes: "Lin propre, Fleur de coton, Rose blanche, Musc",
        desc: "Une senteur pure, légère et rassurante de linge propre séché au grand air.",
        popular: true
      },
      {
        name: "Lilas d'Atelier",
        notes: "Sève verte, Lilas en fleur, Jasmin, Héliotrope",
        desc: "La poésie d'un bouquet fraîchement cueilli au printemps dans les jardins de Bourgogne.",
        popular: false
      }
    ]
  },
  {
    title: "Échappées Solaires & Fruitées",
    description: "Des fragrances lumineuses, pétillantes et gorgées de soleil.",
    scents: [
      {
        name: "Monoï des Îles",
        notes: "Ylang-Ylang, Fleur de Tiaré, Coco, Vanille",
        desc: "Une invitation au voyage évoquant le sable chaud et le sillage ensoleillé de l'été.",
        popular: false
      },
      {
        name: "Clémentine Monoï",
        notes: "Zeste de clémentine, Orange, Fleur de tiaré",
        desc: "Un accord pétillant et fruité, mêlant la fraîcheur de l'agrume au sillage solaire.",
        popular: false
      },
      {
        name: "Pêche Mignonne",
        notes: "Pêche juteuse, Nectarine, Abricot, Sucre roux",
        desc: "Une fragrance veloutée, douce et sucrée rappelant le fruit mûr sous le soleil.",
        popular: false
      }
    ]
  },
  {
    title: "Écorces & Fraîcheur Végétale",
    description: "Des notes vivifiantes, boisées et toniques pour purifier l'atmosphère.",
    scents: [
      {
        name: "Fruits Rouges des Bois",
        notes: "Fraise des bois, Mûre sauvage, Framboise",
        desc: "Une explosion fruitée pétillante et gourmande, riche en baies sauvages parfumées.",
        popular: false
      },
      {
        name: "Agrumes Pressés",
        notes: "Citron vert, Pamplemousse, Mandarine, Cèdre blanc",
        desc: "Un cocktail vif et tonique de notes acidulées pour dynamiser et rafraîchir l'atmosphère.",
        popular: false
      }
    ]
  }
];

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

  const [activeTab, setActiveTab] = useState<'screenshots' | 'interactive'>('screenshots');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Filter collections by search term
  const filteredCollections = useMemo(() => {
    if (!searchTerm.trim()) return SCENT_COLLECTIONS;
    
    return SCENT_COLLECTIONS.map(col => {
      const matchingScents = col.scents.filter(scent => 
        scent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scent.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scent.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return matchingScents.length > 0 ? { ...col, scents: matchingScents } : null;
    }).filter(Boolean) as typeof SCENT_COLLECTIONS;
  }, [searchTerm]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-brand-bg/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
        >
          {/* Decorative ambient blobs */}
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-brand-pink/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-brand-purple/10 rounded-full blur-[120px]" />
          </div>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.96, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 15, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-[#1A1518] border border-brand-pink/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col z-10"
          >
            {/* Header */}
            <div className="relative pt-8 pb-4 px-6 sm:px-12 text-center border-b border-brand-pink/10 bg-gradient-to-b from-brand-bg to-transparent">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-brand-text-muted hover:text-brand-cream hover:bg-white/10 transition-all cursor-pointer z-20"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex justify-center mb-2">
                <Sparkles className="w-5 h-5 text-brand-pink opacity-80" />
              </div>
              <span className="text-[9px] uppercase font-mono tracking-[0.3em] text-brand-pink font-light block mb-1">
                L'Artisanat d'Art Olfactif
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-brand-cream tracking-wide font-light">
                La Carte des Senteurs
              </h3>

              {/* Luxury Tab Switcher */}
              <div className="flex justify-center mt-6">
                <div className="bg-brand-bg/85 border border-brand-pink/20 p-1 rounded-xl flex gap-1 shadow-lg">
                  <button
                    onClick={() => setActiveTab('screenshots')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'screenshots'
                        ? 'bg-brand-pink text-brand-bg font-extrabold shadow-sm'
                        : 'text-brand-text-muted hover:text-brand-cream'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Planches Grasse ({images.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('interactive')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      activeTab === 'interactive'
                        ? 'bg-brand-pink text-brand-bg font-extrabold shadow-sm'
                        : 'text-brand-text-muted hover:text-brand-cream'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    Menu interactif
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 sm:py-8 scrollbar-thin scrollbar-thumb-brand-pink/20">
              <AnimatePresence mode="wait">
                
                {/* 1. SCREENSHOTS TAB (Carousel) */}
                {activeTab === 'screenshots' && (
                  <motion.div
                    key="screenshots"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-2xl mx-auto space-y-6"
                  >
                    <p className="text-xs text-brand-text-muted text-center font-light leading-relaxed max-w-md mx-auto">
                      Feuilletez nos fiches olfactives créées à l'atelier. Cliquez sur le bouton loupe pour les afficher en grand format.
                    </p>

                    {/* Carousel */}
                    <div className="relative aspect-[3/4] sm:aspect-[4/3.2] max-w-xl mx-auto rounded-2xl overflow-hidden border border-brand-pink/15 bg-brand-bg shadow-2xl flex items-center justify-center group">
                      <img
                        src={images[currentIndex].img}
                        alt={images[currentIndex].title}
                        className="w-full h-full object-contain filter brightness-[97%]"
                        referrerPolicy="no-referrer"
                      />

                      {/* Zoom Lightbox Trigger */}
                      <button
                        onClick={() => setZoomImage(images[currentIndex].img)}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-brand-bg/90 border border-brand-pink/20 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-all cursor-pointer shadow-lg z-20"
                        title="Agrandir la fiche"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>

                      {/* Detail Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-bg via-brand-bg/85 to-transparent p-5 text-center select-none z-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-brand-depth/90 border border-brand-pink/10 text-[9px] font-mono text-brand-pink uppercase tracking-widest mb-1.5">
                          Fiche {currentIndex + 1} / {images.length}
                        </span>
                        <h4 className="font-serif font-black text-sm text-brand-cream">
                          {images[currentIndex].title}
                        </h4>
                      </div>

                      {/* Carousel Buttons */}
                      <button
                        onClick={handlePrev}
                        className="absolute left-4 p-2.5 rounded-full bg-brand-depth/80 border border-brand-pink/15 text-brand-cream hover:bg-brand-pink hover:text-brand-bg transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg z-20"
                        aria-label="Précédent"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="absolute right-4 p-2.5 rounded-full bg-brand-depth/80 border border-brand-pink/15 text-brand-cream hover:bg-brand-pink hover:text-brand-bg transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg z-20"
                        aria-label="Suivant"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Progress indicators dots */}
                    <div className="flex justify-center flex-wrap gap-1.5 py-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                            currentIndex === idx ? 'bg-brand-pink w-6 shadow-sm' : 'bg-brand-pink/20 hover:bg-brand-pink/40'
                          }`}
                          aria-label={`Fiche ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* 2. INTERACTIVE TAB (Searchable structured restaurant menu) */}
                {activeTab === 'interactive' && (
                  <motion.div
                    key="interactive"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-4xl mx-auto space-y-8"
                  >
                    {/* Scent Search Bar */}
                    <div className="relative max-w-md mx-auto">
                      <input
                        type="text"
                        placeholder="Rechercher une note (ex: vanille, coton, cerise)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-brand-depth border border-brand-pink/25 rounded-xl px-4 py-2.5 pl-10 text-xs text-brand-cream placeholder:text-brand-text-muted/50 focus:outline-none focus:border-brand-pink transition-all font-mono shadow-inner"
                      />
                      <Search className="absolute left-3.5 top-3 w-4 h-4 text-brand-text-muted/60" />
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')} 
                          className="absolute right-3 top-2.5 text-xs text-brand-pink hover:text-brand-cream transition-colors cursor-pointer"
                        >
                          Effacer
                        </button>
                      )}
                    </div>

                    {filteredCollections.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 pt-4">
                        {filteredCollections.map((collection, idx) => (
                          <div key={idx} className="relative">
                            {/* Collection Header */}
                            <div className="text-center mb-6">
                              <h4 className="font-serif text-lg text-brand-cream tracking-wider mb-1 font-bold">
                                {collection.title}
                              </h4>
                              <p className="text-[10px] font-mono text-brand-text-muted uppercase tracking-widest px-4 leading-relaxed">
                                {collection.description}
                              </p>
                              <div className="w-8 h-px bg-brand-pink/20 mx-auto mt-3" />
                            </div>

                            {/* Scents list in Michelin star restaurant style */}
                            <div className="space-y-6 relative">
                              {collection.scents.map((scent, sIdx) => (
                                <div key={sIdx} className="relative bg-[#1A1518] z-10 text-center px-4">
                                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                                    <h5 className="font-serif text-base text-brand-cream font-medium tracking-wide">
                                      {scent.name}
                                    </h5>
                                    {scent.popular && (
                                      <span className="inline-block w-1 h-1 rounded-full bg-brand-pink animate-pulse" title="Coup de cœur des clientes" />
                                    )}
                                  </div>
                                  <p className="text-[9px] font-mono text-brand-pink/80 uppercase tracking-wider mb-1.5 leading-relaxed max-w-xs mx-auto">
                                    {scent.notes}
                                  </p>
                                  <p className="text-xs text-brand-text-muted font-light italic leading-relaxed max-w-sm mx-auto">
                                    "{scent.desc}"
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-12 text-center text-brand-text-muted font-mono text-xs border border-brand-pink/5 rounded-2xl bg-black/10">
                        Aucune senteur correspondante à votre recherche.
                      </div>
                    )}
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Bottom Bar info */}
            <div className="py-4 px-6 bg-black/45 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-brand-text-muted/60 uppercase">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-pink/80" />
                Ingrédients sourcés à Grasse, France
              </div>
              <div className="text-[9px] font-mono text-brand-pink/70">
                100% Cire végétale de Soja · Non toxique
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* FULL SCREEN ZOOM LIGHTBOX */}
      <AnimatePresence>
        {zoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6"
          >
            <button
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-[160]"
              aria-label="Fermer le zoom"
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full h-[85vh] flex items-center justify-center rounded-2xl overflow-hidden bg-brand-bg/40 p-1 relative"
            >
              <img
                src={zoomImage}
                alt="Fiche olfactive zoom"
                className="w-full h-full object-contain select-none"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
