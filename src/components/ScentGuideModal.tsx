import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Sparkles, MapPin, ZoomIn, Eye, Layers, Search, ArrowLeft, Heart } from 'lucide-react';

// Import newly renamed, luxury descriptive asset images
import ceriseNoireImg from '../assets/images/grasse/cerise_noire_explosive.png';
import pommesAmourImg from '../assets/images/grasse/pommes_amour.png';
import deliceInterditImg from '../assets/images/grasse/delice_interdit.png';
import fleurDeCottonImg from '../assets/images/grasse/fleur_de_cotton.png';
import lilasAtelierImg from '../assets/images/grasse/lilas_atelier.png';
import monoiIlesImg from '../assets/images/grasse/monoi_iles.png';
import clementineMonoiImg from '../assets/images/grasse/clementine_monoi.png';
import pecheMignonneImg from '../assets/images/grasse/peche_mignonne.png';
import fruitsRougesBoisImg from '../assets/images/grasse/fruits_rouges_bois.png';
import agrumesPressesImg from '../assets/images/grasse/agrumes_presses.png';

interface ScentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Complete rich fragrance database with structured olfactory notes matching the custom fiches
const SCENT_COLLECTIONS = [
  {
    title: "Senteurs Gourmandes & Sucrées",
    description: "Des notes réconfortantes, enveloppantes et irrésistiblement délicieuses.",
    scents: [
      {
        name: "Cerise Noire Explosive",
        family: "Fruité, gourmand",
        notes: "Griotte sauvage, Amande amère, Fève Tonka",
        tête: "Amande, frangipane",
        coeur: "Cerise",
        fond: "Vanille, accord gourmand",
        desc: "Un parfum dynamique et gourmand, qui encapsule la riche profondeur des cerises noires. La douceur de l'amande et la frangipane en tête s'ouvre sur un cœur juteux de cerise, soutenu par une base vanillée, ajoutant une touche gourmande à cette expérience olfactive explosive.",
        img: ceriseNoireImg,
        popular: true
      },
      {
        name: "Pommes d'Amour",
        family: "Fruité, caramel",
        notes: "Fraise, pêche, Pomme, caramel, Musc, vanille",
        tête: "Fraise, pêche",
        coeur: "Pomme, caramel",
        fond: "Musc, vanille",
        desc: "Une fragrance gourmande et réconfortante qui évoque toute la magie des pommes d'amour et la nostalgie des fêtes foraines. Les notes fruitées de fraise et de pêche ouvrent la composition, avant de révéler un cœur fondant de pomme et de caramel, prolongé par un fond doux de musc et de vanille.",
        img: pommesAmourImg,
        popular: true
      },
      {
        name: "Délice Interdit",
        family: "Gourmand doux, sucré & envoûtant",
        notes: "Cranberry, fruits des bois, baies sauvages, confit de framboise, musc blanc",
        tête: "Cranberry, baies sauvages",
        coeur: "Fruits des bois, confit de framboise",
        fond: "Musc blanc, sucre caramélisé",
        desc: "Une fragrance gourmande, douce, sucrée et hautement addictive qui éveille vos sens et laisse un sillage irrésistible de cranberry acidulée, fruits des bois juteux, baies sauvages et confit de framboise onctueux.",
        img: deliceInterditImg,
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
        family: "Floral, poudré frais",
        notes: "Rose, ylang-ylang, jasmin, fleur de coton, musc blanc",
        tête: "Rose, ylang-ylang",
        coeur: "Jasmin, fleur de coton",
        fond: "Musc blanc, poudre d'iris",
        desc: "Évoquant la douceur rassurante d'un linge frais, ce parfum s'ouvre sur des notes douces de rose et d'ylang-ylang, dévoilant ensuite un cœur floral de jasmin et de fleur de coton, avant de s'évanouir sur un sillage poudré de muscs blancs.",
        img: fleurDeCottonImg,
        popular: true
      },
      {
        name: "Lilas d'Atelier",
        family: "Floral, vert printanier",
        notes: "Citron, oeillet, muguet, lilas en fleur, jasmin",
        tête: "Citron, oeillet, muguet",
        coeur: "Lilas en fleur, jasmin",
        fond: "Héliotrope, cèdre doux",
        desc: "Laissez-vous transporter dans un jardin en fleur avec Lilas, une fragrance florale et verte qui évoque le renouveau du printemps. Les notes de tête révèlent un mélange frais de citron, d'œillet et de muguet, invitant à une promenade poétique parmi les fleurs.",
        img: lilasAtelierImg,
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
        family: "Fleuri, fruité, coco, vanillé",
        notes: "Pêche, fleur d'oranger, tiaré, rose, vanille, noix de coco",
        tête: "Pêche, fleur d'oranger",
        coeur: "Tiaré, rose",
        fond: "Vanille, noix de coco",
        desc: "Embarquez pour un voyage tropical avec cette fragrance qui mêle des notes de pêche et de fleur d'oranger. Le cœur fleuri de tiaré et de rose se fond dans un fond chaleureux de vanille et de noix de coco, évoquant une plage paradisiaque baignée de soleil.",
        img: monoiIlesImg,
        popular: false
      },
      {
        name: "Clémentine Monoï",
        family: "Hespéridé, floral",
        notes: "Orange, cyclamen, clémentine, monoï, musc, vanille",
        tête: "Orange, cyclamen",
        coeur: "Clémentine, monoï",
        fond: "Musc, vanille",
        desc: "Un voyage tropical capturé dans une fragrance, où la fraîcheur de la clémentine rencontre la douceur florale du monoï. Les notes de tête d'orange et de cyclamen révèlent un cœur fruité et floral, soutenu par une base douce de musc et de vanille, offrant une évasion olfactive ensoleillée.",
        img: clementineMonoiImg,
        popular: false
      },
      {
        name: "Pêche Mignonne",
        family: "Fruité, vert, gourmand",
        notes: "Framboise, accord vert, pêche juteuse, noix de coco",
        tête: "Framboise, accord vert",
        coeur: "Pêche juteuse, nectarine",
        fond: "Noix de coco, accord gourmand",
        desc: "Une fragrance fruitée et lumineuse où l'éclat de la framboise et d'un accord vert ouvre la composition. Son cœur révèle une pêche juteuse et veloutée, prolongée par un fond doux de noix de coco et d'accord gourmand.",
        img: pecheMignonneImg,
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
        family: "Fruité, hespéridé frais",
        notes: "Citron, néroli, fraise, framboise, vanille, crème",
        tête: "Citron, néroli",
        coeur: "Fraise, framboise",
        fond: "Vanille, crème",
        desc: "Imprégnez-vous de la richesse des fruits rouges, mariée aux notes pétillantes de citron et de néroli. Un cœur juteux de fraise et de framboise vous entraîne vers une finale crémeuse de vanille et de crème gourmande.",
        img: fruitsRougesBoisImg,
        popular: false
      },
      {
        name: "Agrumes Pressés",
        family: "Agrumes, hespéridé frais",
        notes: "Citron vert, orange, mandarine mûre, cèdre blanc, musc",
        tête: "Citron vert, orange",
        coeur: "Mandarine, fleur d'oranger",
        fond: "Cèdre blanc, musc",
        desc: "Éveillez vos sens avec ce parfum « Agrumes ». Une fragrance tonique et pétillante aux notes acidulées et rafraîchissantes de citron vert, d'orange juteuse et de mandarine, reposant sur un fond pur de cèdre et de musc.",
        img: agrumesPressesImg,
        popular: false
      }
    ]
  }
];

export default function ScentGuideModal({ isOpen, onClose }: ScentGuideModalProps) {
  const images = [
    { img: ceriseNoireImg, title: "Cerise Noire Explosive" },
    { img: pommesAmourImg, title: "Pommes d'Amour" },
    { img: deliceInterditImg, title: "Délice Interdit" },
    { img: fleurDeCottonImg, title: "Fleur de Coton" },
    { img: lilasAtelierImg, title: "Lilas d'Atelier" },
    { img: monoiIlesImg, title: "Monoï des Îles" },
    { img: clementineMonoiImg, title: "Clémentine Monoï" },
    { img: pecheMignonneImg, title: "Pêche Mignonne" },
    { img: fruitsRougesBoisImg, title: "Fruits Rouges des Bois" },
    { img: agrumesPressesImg, title: "Agrumes Pressés" }
  ];

  const [activeTab, setActiveTab] = useState<'screenshots' | 'interactive'>('screenshots');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScent, setSelectedScent] = useState<any | null>(null);
  const [activePyramidLevel, setActivePyramidLevel] = useState<'tête' | 'coeur' | 'fond' | null>(null);

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
            className="relative max-w-4xl w-full bg-[#1A1518] border border-brand-pink/20 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col z-10 animate-glow"
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
                {selectedScent ? selectedScent.name : "La Carte des Senteurs"}
              </h3>

              {/* Luxury Tab Switcher (Only show if not in sub-scent detail view) */}
              {!selectedScent && (
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
              )}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-10 py-6 sm:py-8 scrollbar-thin scrollbar-thumb-brand-pink/20">
              <AnimatePresence mode="wait">
                
                {/* 1. SCENT DETAIL EXPANDED VIEW WITH INTERACTIVE PYRAMID AND BANNER ILLUSTRATION */}
                {selectedScent ? (
                  <motion.div
                    key="scent-detail"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-3xl mx-auto space-y-10"
                  >
                    {/* Back Button */}
                    <button
                      onClick={() => {
                        setSelectedScent(null);
                        setActivePyramidLevel(null);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-pink/15 text-xs text-brand-pink font-mono uppercase tracking-widest hover:bg-brand-pink hover:text-brand-bg transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Retour au menu
                    </button>

                    {/* Scent Pyramid Block */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
                      
                      {/* Left: The Olfactory Pyramid segment built in premium CSS clip-paths */}
                      <div className="md:col-span-6 flex flex-col items-center justify-center space-y-4">
                        <span className="text-[9px] uppercase font-mono tracking-widest text-brand-text-muted/60 mb-2">
                          Pyramide Olfactive Interactive (Survolez !)
                        </span>
                        
                        <div className="relative w-full max-w-[280px] aspect-[1/0.9] flex flex-col justify-between items-center z-10">
                          
                          {/* Segment 1: NOTES DE TÊTE (Triangle shape) */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            onHoverStart={() => setActivePyramidLevel('tête')}
                            onHoverEnd={() => setActivePyramidLevel(null)}
                            onClick={() => setActivePyramidLevel(activePyramidLevel === 'tête' ? null : 'tête')}
                            className={`h-[31%] w-[45%] flex items-center justify-center cursor-pointer transition-all duration-300 ${
                              activePyramidLevel === 'tête' 
                                ? 'bg-gradient-to-b from-brand-pink/35 to-brand-pink/25 border-brand-pink' 
                                : 'bg-[#2A2024]/80 border-brand-pink/20'
                            } border rounded-t-full shadow-lg relative`}
                            style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
                          >
                            <div className="absolute bottom-1 text-center select-none">
                              <span className="block font-mono text-[8px] uppercase tracking-wider text-brand-pink font-bold">Tête</span>
                              <span className="block text-[7.5px] font-sans text-brand-cream/80 truncate max-w-[50px]">{(selectedScent.tête || "").split(',')[0]}</span>
                            </div>
                          </motion.div>

                          {/* Segment 2: NOTES DE COEUR (Trapezoid shape) */}
                          <motion.div
                            whileHover={{ scale: 1.04 }}
                            onHoverStart={() => setActivePyramidLevel('coeur')}
                            onHoverEnd={() => setActivePyramidLevel(null)}
                            onClick={() => setActivePyramidLevel(activePyramidLevel === 'coeur' ? null : 'coeur')}
                            className={`h-[31%] w-[70%] flex items-center justify-center cursor-pointer transition-all duration-300 ${
                              activePyramidLevel === 'coeur' 
                                ? 'bg-gradient-to-b from-brand-pink/30 to-brand-pink/20 border-brand-pink' 
                                : 'bg-[#2A2024]/75 border-brand-pink/20'
                            } border shadow-lg relative`}
                            style={{ clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)' }}
                          >
                            <div className="absolute inset-0 flex flex-col justify-center items-center select-none pt-1">
                              <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-pink font-bold">Cœur</span>
                              <span className="block text-[8px] font-sans text-brand-cream/90 truncate max-w-[100px] mt-0.5">{selectedScent.coeur}</span>
                            </div>
                          </motion.div>

                          {/* Segment 3: NOTES DE FOND (Large base Trapezoid shape) */}
                          <motion.div
                            whileHover={{ scale: 1.03 }}
                            onHoverStart={() => setActivePyramidLevel('fond')}
                            onHoverEnd={() => setActivePyramidLevel(null)}
                            onClick={() => setActivePyramidLevel(activePyramidLevel === 'fond' ? null : 'fond')}
                            className={`h-[31%] w-[95%] flex items-center justify-center cursor-pointer transition-all duration-300 ${
                              activePyramidLevel === 'fond' 
                                ? 'bg-gradient-to-b from-brand-pink/25 to-brand-pink/15 border-brand-pink' 
                                : 'bg-[#2A2024]/70 border-brand-pink/20'
                            } border rounded-b-xl shadow-lg relative`}
                            style={{ clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)' }}
                          >
                            <div className="absolute inset-0 flex flex-col justify-center items-center select-none pt-1">
                              <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-pink font-bold">Fond</span>
                              <span className="block text-[8px] font-sans text-brand-cream/90 truncate max-w-[140px] mt-0.5">{selectedScent.fond}</span>
                            </div>
                          </motion.div>

                        </div>
                      </div>

                      {/* Right: Scent Information Details with luxury storytelling */}
                      <div className="md:col-span-6 text-left space-y-5">
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className="px-3 py-1 rounded bg-brand-pink/10 border border-brand-pink/20 text-[9px] font-mono text-brand-pink uppercase tracking-widest">
                            Famille : {selectedScent.family}
                          </span>
                          {selectedScent.popular && (
                            <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/30 text-[8px] font-mono text-amber-400 uppercase tracking-wider flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                              Coup de cœur
                            </span>
                          )}
                        </div>

                        {/* Storytelling notes */}
                        <p className="text-xs sm:text-sm text-brand-cream/90 font-serif leading-relaxed italic">
                          "{selectedScent.desc}"
                        </p>

                        <div className="w-10 h-px bg-brand-pink/25" />

                        {/* List of notes linked dynamically to active pyramid level */}
                        <div className="space-y-3 pt-1">
                          
                          {/* Note Tête */}
                          <div 
                            className={`p-3.5 rounded-xl border transition-all duration-300 ${
                              activePyramidLevel === 'tête' 
                                ? 'bg-brand-pink/10 border-brand-pink/40 translate-x-2' 
                                : 'bg-[#2A2024]/20 border-white/5'
                            }`}
                          >
                            <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-pink font-bold mb-1">
                              Notes de Tête (Volatilité haute)
                            </span>
                            <p className="text-xs text-brand-cream font-medium">
                              {selectedScent.tête}
                            </p>
                          </div>

                          {/* Note Cœur */}
                          <div 
                            className={`p-3.5 rounded-xl border transition-all duration-300 ${
                              activePyramidLevel === 'coeur' 
                                ? 'bg-brand-pink/10 border-brand-pink/40 translate-x-2' 
                                : 'bg-[#2A2024]/20 border-white/5'
                            }`}
                          >
                            <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-pink font-bold mb-1">
                              Notes de Cœur (Corps du parfum)
                            </span>
                            <p className="text-xs text-brand-cream font-medium">
                              {selectedScent.coeur}
                            </p>
                          </div>

                          {/* Note Fond */}
                          <div 
                            className={`p-3.5 rounded-xl border transition-all duration-300 ${
                              activePyramidLevel === 'fond' 
                                ? 'bg-brand-pink/10 border-brand-pink/40 translate-x-2' 
                                : 'bg-[#2A2024]/20 border-white/5'
                            }`}
                          >
                            <span className="block font-mono text-[9px] uppercase tracking-widest text-brand-pink font-bold mb-1">
                              Notes de Fond (Fixateur longue durée)
                            </span>
                            <p className="text-xs text-brand-cream font-medium">
                              {selectedScent.fond}
                            </p>
                          </div>

                        </div>
                      </div>

                    </div>

                    {/* NEW: The gorgeous illustrated brochure card displayed below the pyramid */}
                    {selectedScent.img && (
                      <div className="pt-8 border-t border-brand-pink/10 space-y-4">
                        <div className="text-center">
                          <span className="inline-block px-3 py-1 rounded-full bg-brand-depth/90 border border-brand-pink/10 text-[9px] font-mono text-brand-pink uppercase tracking-widest mb-1.5">
                            Fiche d'Artisanat d'Atelier
                          </span>
                          <h4 className="font-serif font-bold text-lg text-brand-cream">
                            La Brochure Olfactive
                          </h4>
                          <p className="text-[10px] text-brand-text-muted font-light">
                            Cliquez sur la loupe pour l'afficher en plein écran haute résolution.
                          </p>
                        </div>

                        <div className="relative aspect-[3/4] sm:aspect-[4/3.2] max-w-xl mx-auto rounded-2xl overflow-hidden border border-brand-pink/15 bg-brand-bg shadow-2xl flex items-center justify-center group">
                          <img
                            src={selectedScent.img}
                            alt={selectedScent.name}
                            className="w-full h-full object-contain filter brightness-[97%] group-hover:scale-102 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />

                          {/* Zoom Lightbox Trigger */}
                          <button
                            onClick={() => setZoomImage(selectedScent.img)}
                            className="absolute top-4 right-4 p-2.5 rounded-full bg-brand-bg/90 border border-brand-pink/20 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-all cursor-pointer shadow-lg z-20"
                            title="Agrandir la fiche"
                          >
                            <ZoomIn className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Footer Safe product mention */}
                    <div className="pt-4 text-[10px] text-brand-text-muted text-center font-light leading-relaxed max-w-lg mx-auto">
                      * Nos fragrances sont rigoureusement sélectionnées à Grasse, garanties **sans substances CMR** et **sans phtalates** pour préserver la santé et la pureté de votre intérieur.
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* 2. SCREENSHOTS TAB (Carousel) */}
                    {activeTab === 'screenshots' && (
                      <motion.div
                        key="screenshots"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="max-w-2xl mx-auto space-y-6"
                      >
                        <p className="text-xs text-brand-text-muted text-center font-light leading-relaxed max-w-md mx-auto">
                          Feuilletez nos fiches olfactives créées à l'atelier. Cliquez sur la loupe pour les afficher en grand format et les lire en haute résolution.
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

                    {/* 3. INTERACTIVE TAB (Searchable structured restaurant menu) */}
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
                                    <div 
                                      key={sIdx} 
                                      onClick={() => setSelectedScent(scent)}
                                      className="relative bg-[#1A1518] hover:bg-[#251D21]/45 p-3 rounded-xl border border-transparent hover:border-brand-pink/15 transition-all z-10 text-center px-4 cursor-pointer group"
                                    >
                                      <div className="flex items-center justify-center gap-1.5 mb-0.5">
                                        <h5 className="font-serif text-base text-brand-cream group-hover:text-brand-pink transition-colors font-medium tracking-wide">
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
                                      
                                      <span className="absolute bottom-1 right-2 text-[7.5px] font-mono text-brand-pink/0 group-hover:text-brand-pink/60 uppercase tracking-widest transition-all duration-300 flex items-center gap-0.5">
                                        Voir pyramide <ChevronRight className="w-2 h-2" />
                                      </span>
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
                  </>
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
