import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles, MapPin, ZoomIn, Search, Filter, BookOpen, Layers } from 'lucide-react';

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

// Complete rich fragrance database for the interactive index view
const GRASSE_SCENTS_DATABASE = [
  {
    name: "Cerise Noire Explosive",
    family: "Gourmand / Fruitée",
    notes: { tete: "Griotte sauvage", coeur: "Amande amère", fond: "Fève Tonka" },
    desc: "Un sillage fruité intense aux accents d'amande douce et de fruits rouges mûrs. Évoque la cueillette d'été.",
    color: "#EFC6D2",
    popular: true
  },
  {
    name: "Pomme d'Amour",
    family: "Gourmand",
    notes: { tete: "Pomme rouge, Sucre cuit", coeur: "Caramel chaud", fond: "Vanille de Madagascar" },
    desc: "L'odeur nostalgique et irrésistible des fêtes foraines et de la pomme caramélisée.",
    color: "#E8D3B0",
    popular: true
  },
  {
    name: "Délice Interdit",
    family: "Gourmand",
    notes: { tete: "Sucre roux", coeur: "Caramel au beurre salé", fond: "Lait concentré" },
    desc: "Une douceur gourmande absolue, réconfortante et délicatement lactée. Coulée pour le réconfort.",
    color: "#FFF7F1",
    popular: true
  },
  {
    name: "Fleur de Coton",
    family: "Floral / Poudré",
    notes: { tete: "Lin propre", coeur: "Fleur de coton, Rose blanche", fond: "Poudre d'iris, Musc" },
    desc: "Une senteur pure, légère et rassurante de linge propre séché au grand air.",
    color: "#BFA4D8",
    popular: true
  },
  {
    name: "Monoï des Îles",
    family: "Chaleureux / Boisé",
    notes: { tete: "Ylang-Ylang", coeur: "Fleur de Tiaré, Coco", fond: "Vanille des îles" },
    desc: "Une invitation au voyage évoquant le sable chaud et le sillage ensoleillé de l'été.",
    color: "#FFF7F1",
    popular: false
  },
  {
    name: "Lilas d'Atelier",
    family: "Floral",
    notes: { tete: "Sève verte", coeur: "Lilas en fleur, Jasmin", fond: "Héliotrope" },
    desc: "La poésie d'un bouquet fraîchement cueilli au printemps dans les jardins de Bourgogne.",
    color: "#EFC6D2",
    popular: false
  },
  {
    name: "Clémentine Monoï",
    family: "Fruitée",
    notes: { tete: "Zeste de clémentine, Orange", coeur: "Fleur de tiaré", fond: "Musc doux" },
    desc: "Un accord pétillant et fruité, mêlant la fraîcheur de l'agrume au sillage solaire du monoï.",
    color: "#E8D3B0",
    popular: false
  },
  {
    name: "Pêche Mignonne",
    family: "Fruitée",
    notes: { tete: "Pêche juteuse", coeur: "Nectarine, Abricot", fond: "Sucre roux" },
    desc: "Une fragrance veloutée, douce et sucrée rappelant le fruit mûr sous le soleil.",
    color: "#FFF7F1",
    popular: false
  },
  {
    name: "Fruits Rouges des Bois",
    family: "Fruitée",
    notes: { tete: "Fraise des bois", coeur: "Mûre sauvage", fond: "Framboise juteuse" },
    desc: "Une explosion fruitée pétillante et gourmande, riche en baies sauvages parfumées.",
    color: "#EFC6D2",
    popular: false
  },
  {
    name: "Agrumes Pressés",
    family: "Fruitée",
    notes: { tete: "Citron vert, Pamplemousse", coeur: "Mandarine", fond: "Cèdre blanc" },
    desc: "Un cocktail vif et tonique de notes acidulées pour dynamiser et rafraîchir l'atmosphère.",
    color: "#BFA4D8",
    popular: false
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

  const [activeTab, setActiveTab] = useState<'interactive' | 'planches'>('interactive');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [familyFilter, setFamilyFilter] = useState('Tous');
  
  // Lightbox Zoom state for screenshots
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Filter interactive scents beautifully
  const filteredScents = useMemo(() => {
    return GRASSE_SCENTS_DATABASE.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.notes.tete.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.notes.coeur.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.notes.fond.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFamily = familyFilter === 'Tous' || s.family.includes(familyFilter);
      return matchesSearch && matchesFamily;
    });
  }, [searchQuery, familyFilter]);

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
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-pink/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.94, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-brand-depth border border-brand-pink/20 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl p-5 sm:p-8 flex flex-col justify-between overflow-hidden my-4 max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-brand-pink/10 pb-4">
              <div className="text-left space-y-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-brand-pink font-bold flex items-center gap-1.5 leading-none">
                  <Sparkles className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
                  Maison de Parfum · Cire Végétale
                </span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-brand-cream tracking-tight">
                  Carte des Senteurs de Grasse
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 sm:p-2.5 rounded-full bg-brand-bg/85 border border-brand-pink/25 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-all cursor-pointer leading-none"
                aria-label="Fermer"
              >
                <X className="w-4 sm:w-5 h-4 sm:h-5" />
              </button>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex bg-brand-bg/80 border border-brand-pink/10 p-1 rounded-xl mb-6 self-start gap-1">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wide uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'interactive'
                    ? 'bg-brand-pink text-brand-bg font-extrabold shadow'
                    : 'text-brand-text-muted hover:text-brand-cream'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Index Interactif
              </button>
              <button
                onClick={() => setActiveTab('planches')}
                className={`px-4 py-2 rounded-lg text-xs font-mono tracking-wide uppercase transition-all flex items-center gap-2 cursor-pointer ${
                  activeTab === 'planches'
                    ? 'bg-brand-pink text-brand-bg font-extrabold shadow'
                    : 'text-brand-text-muted hover:text-brand-cream'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                Planches d'Atelier
              </button>
            </div>

            {/* TAB CONTENT */}
            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-brand-pink/20 min-h-[350px] max-h-[55vh]">
              {activeTab === 'interactive' ? (
                /* ================= INTERACTIVE VIEW ================= */
                <div className="space-y-6">
                  {/* Filters / Search Bar */}
                  <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                    {/* Search bar */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-pink" />
                      <input
                        type="text"
                        placeholder="Rechercher une note (ex: Amande, Coco, Lilas...)"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-8 py-2.5 bg-brand-bg/50 border border-brand-pink/10 rounded-xl text-xs text-brand-cream placeholder-gray-500 focus:outline-none focus:border-brand-pink/30 focus:ring-1 focus:ring-brand-pink/10 transition-all"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-pink cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Scent family filter */}
                    <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none shrink-0">
                      {['Tous', 'Gourmand', 'Fruitée', 'Floral', 'Boisé'].map(fam => {
                        const label = fam === 'Tous' ? 'Tous' : fam === 'Fruitée' ? 'Fruités' : fam + 's';
                        const isActive = familyFilter === fam;
                        return (
                          <button
                            key={fam}
                            onClick={() => setFamilyFilter(fam)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono tracking-wide uppercase whitespace-nowrap cursor-pointer transition-all ${
                              isActive
                                ? 'bg-brand-purple/20 border border-brand-pink/30 text-brand-pink font-bold'
                                : 'bg-brand-bg/20 text-brand-text-muted border border-brand-pink/5 hover:border-brand-pink/15 hover:text-brand-cream'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scents Grid */}
                  {filteredScents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredScents.map((scent, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl bg-brand-bg/40 border border-brand-pink/10 hover:border-brand-pink/25 transition-all text-left flex flex-col justify-between space-y-4 shadow relative overflow-hidden group"
                        >
                          {/* Scent background color splash */}
                          <div 
                            className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none group-hover:opacity-15 transition-opacity" 
                            style={{ backgroundColor: scent.color }}
                          />

                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-serif font-black text-lg text-brand-cream group-hover:text-brand-pink transition-colors">
                                {scent.name}
                              </h4>
                              <div className="flex items-center gap-1.5">
                                {scent.popular && (
                                  <span className="px-2 py-0.5 rounded bg-brand-pink/10 border border-brand-pink/20 text-[8px] font-mono text-brand-pink uppercase tracking-widest font-black shrink-0">
                                    Coup de cœur
                                  </span>
                                )}
                                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[8px] font-mono text-brand-text-muted uppercase tracking-wider shrink-0">
                                  {scent.family}
                                </span>
                              </div>
                            </div>
                            <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                              {scent.desc}
                            </p>
                          </div>

                          {/* Olfactive Notes Pyramid block */}
                          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-brand-pink/5 font-mono text-[9px]">
                            <div className="p-2 rounded bg-brand-bg/60 border border-brand-pink/5 text-center flex flex-col justify-center">
                              <span className="text-[7.5px] uppercase text-brand-pink font-bold block mb-0.5 leading-none">Tête</span>
                              <span className="text-brand-cream/90 font-medium truncate" title={scent.notes.tete}>{scent.notes.tete}</span>
                            </div>
                            <div className="p-2 rounded bg-brand-bg/60 border border-brand-pink/5 text-center flex flex-col justify-center">
                              <span className="text-[7.5px] uppercase text-[#E8D3B0] font-bold block mb-0.5 leading-none">Cœur</span>
                              <span className="text-brand-cream/90 font-medium truncate" title={scent.notes.coeur}>{scent.notes.coeur}</span>
                            </div>
                            <div className="p-2 rounded bg-brand-bg/60 border border-brand-pink/5 text-center flex flex-col justify-center">
                              <span className="text-[7.5px] uppercase text-brand-purple font-bold block mb-0.5 leading-none">Fond</span>
                              <span className="text-brand-cream/90 font-medium truncate" title={scent.notes.fond}>{scent.notes.fond}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-brand-text-muted font-mono text-xs">
                      Aucune note trouvée pour votre recherche. Essayez un autre mot clé.
                    </div>
                  )}
                </div>
              ) : (
                /* ================= PLANCHES D'ATELIER VIEW ================= */
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] md:aspect-[4/3] max-w-2xl mx-auto rounded-2xl overflow-hidden border border-brand-pink/15 bg-brand-bg shadow-2xl flex items-center justify-center group">
                    <img
                      src={images[currentIndex].img}
                      alt={images[currentIndex].title}
                      className="w-full h-full object-contain filter brightness-[97%]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Magnifying Glass overlay trigger */}
                    <button
                      onClick={() => setZoomImage(images[currentIndex].img)}
                      className="absolute top-4 right-4 p-2.5 rounded-full bg-brand-bg/80 border border-brand-pink/25 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-all cursor-pointer shadow-lg z-20"
                      title="Agrandir la fiche"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>

                    {/* Slide details overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-brand-bg via-brand-bg/85 to-transparent p-5 text-center select-none z-10">
                      <span className="inline-block px-3 py-1 rounded-full bg-brand-depth/90 border border-brand-pink/10 text-[9px] font-mono text-brand-pink uppercase tracking-widest mb-1">
                        Fiche {currentIndex + 1} / {images.length}
                      </span>
                      <h4 className="font-serif font-black text-sm sm:text-base text-brand-cream">
                        {images[currentIndex].title}
                      </h4>
                      <p className="text-[9.5px] text-brand-text-muted mt-0.5 font-light">
                        Cliquez sur la loupe pour lire en plein écran haute résolution.
                      </p>
                    </div>

                    {/* Prev / Next controls */}
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 p-2.5 rounded-full bg-brand-depth/85 border border-brand-pink/15 text-brand-cream hover:bg-brand-pink hover:text-brand-bg transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg z-20"
                      aria-label="Précédent"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 p-2.5 rounded-full bg-brand-depth/85 border border-brand-pink/15 text-brand-cream hover:bg-brand-pink hover:text-brand-bg transition-all opacity-80 group-hover:opacity-100 cursor-pointer shadow-lg z-20"
                      aria-label="Suivant"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>

                  {/* Indicators */}
                  <div className="flex justify-center gap-1.5 py-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                          currentIndex === idx ? 'bg-brand-pink w-6 shadow-sm' : 'bg-brand-pink/20 hover:bg-brand-pink/40'
                        }`}
                        aria-label={`Aller à la page ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls / Indicator Dots */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-brand-pink/10">
              <div className="flex items-center gap-2 text-[10px] font-mono text-brand-text-muted/70 uppercase">
                <MapPin className="w-3.5 h-3.5 text-brand-pink animate-pulse" />
                Fragrances artisanales curées à Grasse, France
              </div>
              <div className="text-[10px] font-mono text-brand-pink/80">
                Cire 100% soja · Sans CMR, sans phtalates
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
              className="absolute top-4 right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-50"
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
                alt="Zoom de la carte olfactive"
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
