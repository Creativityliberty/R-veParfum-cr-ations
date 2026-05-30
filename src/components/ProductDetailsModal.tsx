import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  HandHeart,
  Send,
  Calendar,
  HelpCircle,
  Check,
  Info,
  Sparkles,
  Flower,
  Leaf,
  Home,
  Truck,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Product } from "../types";
import { SCENTS, COLORS } from "../data";
import ScentHoverCard from "./ScentHoverCard";

import atelierBourgogneImg from "../assets/images/atelier/atelier_bourgogne.png";
import atelierCoulageImg from "../assets/images/atelier/atelier_bougie_coulage.png";

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
}

const SCENT_NOTES: Record<string, { top: string; heart: string; base: string }> = {
  "Délice Interdit": {
    top: "Sucre caramélisé, Noisette grillée",
    heart: "Caramel au beurre salé, Praline dorée",
    base: "Gousse de vanille de Madagascar, Muscs chauds"
  },
  "Cerise Noire Explosive": {
    top: "Griotte sauvage, Amande amère",
    heart: "Cerise noire charnue, Accord liqueur",
    base: "Fève tonka, Bois de santal précieux"
  },
  "Pomme d'Amour": {
    top: "Pomme verte acidulée, Sève fraîche",
    heart: "Sucre d'orge craquant, Fruits rouges",
    base: "Vanille gourmande, Musc blanc aérien"
  },
  "Pêche": {
    top: "Sève de pêche, Feuille de menthe",
    heart: "Pêche blanche juteuse, Nectarine",
    base: "Abricot mûr, Sucre de canne blond"
  },
  "Fruits Rouges": {
    top: "Fraise des bois, Framboise sauvage",
    heart: "Mûre de ronce, Griotte acidulée",
    base: "Muscs fruités, Gousse de vanille"
  },
  "Agrumes": {
    top: "Citron vert, Mandarine zestée",
    heart: "Pamplemousse rose, Orange douce",
    base: "Verveine odorante, Cèdre blanc"
  },
  "Clémentine Monoï": {
    top: "Écorce de clémentine, Bergamote",
    heart: "Fleur de tiaré, Jasmin d'Égypte",
    base: "Lait de coco, Sable chaud, Vanille douce"
  },
  "Fleur de Coton": {
    top: "Lait d'amande, Rose poudrée",
    heart: "Fleur de coton, Lin immaculé",
    base: "Cèdre blanc, Muscs cotonneux fins"
  },
  "Lilas": {
    top: "Rosée du matin, Accord sève verte",
    heart: "Lilas en fleur, Muguet printanier",
    base: "Héliotrope poudré, Musc floral doux"
  },
  "Monoï": {
    top: "Noix de coco fraîche, Fleur d'oranger",
    heart: "Tiaré de Tahiti, Ylang-ylang exotique",
    base: "Vanille de gousse, Ambre solaire doux"
  }
};

export default function ProductDetailsModal({
  product,
  onClose,
}: ProductDetailsModalProps) {
  const [selectedScent, setSelectedScent] = useState(
    product.scents[0] || "Fleur de Coton",
  );
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState("");
  const [deliveryMode, setDeliveryMode] = useState("Retrait à l'Atelier");
  const [clientName, setClientName] = useState("");
  const [activeNoteLayer, setActiveNoteLayer] = useState<'top' | 'heart' | 'base' | null>('heart');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Dynamic image collection (Lifestyle + actual)
  const productImages = [
    product.image,
    atelierCoulageImg,
    atelierBourgogneImg
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  // Scent info lookup
  const currentScentObj = SCENTS.find((s) => s.name === selectedScent);

  const colorsOption = COLORS;

  const notes = SCENT_NOTES[selectedScent] || SCENT_NOTES["Fleur de Coton"];

  const renderPyramid = () => {
    return (
      <div className="space-y-4 pt-6 border-t border-brand-pink/10 text-left">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-pink flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Pyramide Olfactive Interactive
        </h4>
        <p className="text-[10px] text-brand-text-muted leading-tight font-light">
          Survolez ou cliquez sur les strates pour révéler l'architecture du sillage de la fragrance <strong className="text-brand-pink font-semibold">{selectedScent}</strong>.
        </p>

        <div className="flex flex-col gap-4 mt-2">
          {/* Visual Pyramid Block Representation */}
          <div className="relative w-full max-w-[280px] mx-auto aspect-[4/3] flex flex-col justify-between items-center group/pyramid">
            {/* Top Note Segment */}
            <button
              type="button"
              onMouseEnter={() => setActiveNoteLayer('top')}
              onClick={() => setActiveNoteLayer('top')}
              className={`w-[45%] h-[28%] bg-brand-pink/10 border border-brand-pink/20 hover:border-brand-pink/60 rounded-t-full transition-all duration-350 flex flex-col items-center justify-center cursor-pointer shadow-md ${activeNoteLayer === 'top' ? 'bg-brand-pink/25 border-brand-pink scale-[1.03]' : ''}`}
            >
              <span className="text-[9px] font-mono font-extrabold text-brand-cream/80">TÊTE</span>
              <span className="text-[8px] text-brand-pink font-light uppercase tracking-widest mt-0.5">Envolée</span>
            </button>

            {/* Heart Note Segment */}
            <button
              type="button"
              onMouseEnter={() => setActiveNoteLayer('heart')}
              onClick={() => setActiveNoteLayer('heart')}
              className={`w-[70%] h-[30%] bg-brand-pink/10 border border-brand-pink/15 hover:border-brand-pink/50 transition-all duration-350 flex flex-col items-center justify-center cursor-pointer shadow-md ${activeNoteLayer === 'heart' ? 'bg-brand-pink/25 border-brand-pink scale-[1.03]' : ''}`}
            >
              <span className="text-[9px] font-mono font-extrabold text-brand-cream/80">CŒUR</span>
              <span className="text-[8px] text-brand-purple font-light uppercase tracking-widest mt-0.5">Personnalité</span>
            </button>

            {/* Base Note Segment */}
            <button
              type="button"
              onMouseEnter={() => setActiveNoteLayer('base')}
              onClick={() => setActiveNoteLayer('base')}
              className={`w-[95%] h-[32%] bg-brand-pink/10 border border-brand-pink/15 hover:border-brand-pink/50 transition-all duration-350 flex flex-col items-center justify-center cursor-pointer shadow-md ${activeNoteLayer === 'base' ? 'bg-brand-pink/25 border-brand-pink scale-[1.03]' : ''}`}
            >
              <span className="text-[9px] font-mono font-extrabold text-brand-cream/80">FOND</span>
              <span className="text-[8px] text-brand-wax font-light uppercase tracking-widest mt-0.5">Sillage Durable</span>
            </button>
          </div>

          {/* Dynamic details overlay block */}
          <div className="p-4 rounded-xl bg-brand-bg/50 border border-brand-pink/10 min-h-[90px] flex flex-col justify-center transition-all duration-300">
            {activeNoteLayer === 'top' && (
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-pink block">Note de Tête — Les 15 premières minutes</span>
                <p className="text-xs text-brand-cream font-medium">{notes.top}</p>
                <p className="text-[9px] text-brand-text-muted leading-tight font-light">L'envolée première du parfum, légère et pétillante, qui s'éveille dès la diffusion de la cire.</p>
              </div>
            )}
            {activeNoteLayer === 'heart' && (
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-purple block">Note de Cœur — Présente pendant plusieurs heures</span>
                <p className="text-xs text-brand-cream font-medium">{notes.heart}</p>
                <p className="text-[9px] text-brand-text-muted leading-tight font-light">La véritable âme de la fragrance, voluptueuse et signée, qui définit l'atmosphère olfactive de votre pièce.</p>
              </div>
            )}
            {activeNoteLayer === 'base' && (
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-wax block">Note de Fond — Le sillage persistant</span>
                <p className="text-xs text-brand-cream font-medium">{notes.base}</p>
                <p className="text-[9px] text-brand-text-muted leading-tight font-light">L'accord solide et enveloppant de fin de sillage, retenant intensément les huiles de Grasse dans la matière.</p>
              </div>
            )}
            {!activeNoteLayer && (
              <p className="text-xs text-brand-text-muted italic text-center">Survolez une couche de la pyramide pour découvrir ses secrets.</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert(
        "S'il vous plaît, saisissez votre nom pour que Christelle et Mélanie puissent vous adresser.",
      );
      return;
    }

    const imageUrl = product.image.startsWith("http")
      ? product.image
      : `https://reve-parfume.fr${product.image}`;

    // Build precisely formatted message matching requirements
    const msg =
      `Bonjour Mélanie et Christelle, je souhaite initier une commande d'artisanat :

[ COMMANDE BOUTIQUE - RÊVE PARFUMÉ ]
* Produit : ${product.name}
* Aperçu : ${imageUrl}
* Catégorie d'Art : ${product.category}
* Fragrance Sélectionnée : ${selectedScent || "Authentique / À convenir"}
* Teinte / Teintier de Cire : ${selectedColor || "Brut épuré"}
* Quantité Demandée : ${quantity || "1"} pièce(s)

[ PERSONNALISATION DEMANDÉE ]
* Étiquette / Option : ${personalization ? personalization : "Modèle Original Rêve Parfumé"}

[ LIVRAISON & COORDONNÉES ]
* Service retenu : ${deliveryMode || "Retrait à l'Atelier (Normandie)"}
* Nom du Bénéficiaire : ${clientName}

Merci infiniment ! Au plaisir d'échanger sur la préparation de mon paquet fleuri.`.trim();

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/33781710985?text=${encoded}`, "_blank");
  };

  const handleWhatsAppInquiry = () => {
    const inquiryMsg = `Bonjour, je m'intéresse à votre création ${product.name} et je souhaite vous poser une question à son sujet.`;
    const encoded = encodeURIComponent(inquiryMsg);
    window.open(`https://wa.me/33781710985?text=${encoded}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md bg-black/60">
      <div className="relative w-full max-w-5xl bg-brand-bg border border-brand-pink/20 rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-40 w-10 h-10 rounded-full bg-brand-bg/85 border border-brand-pink/15 text-brand-text-muted hover:text-brand-pink flex items-center justify-center transition-colors cursor-pointer"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Visual Scroll Column (Left) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 bg-brand-depth flex flex-col justify-start border-r border-brand-pink/10 overflow-y-auto max-h-[45vh] md:max-h-[92vh]">
          <div>
            {/* Gallery Slide Carousel Container */}
            <div className="relative rounded-2xl overflow-hidden border border-brand-pink/15 mb-3 aspect-square bg-brand-bg group/gallery">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  src={productImages[activeImageIndex]}
                  alt={`${product.name} - Vue ${activeImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Gallery Arrow Controls */}
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-bg/85 border border-brand-pink/15 text-brand-pink hover:bg-brand-pink hover:text-brand-bg flex items-center justify-center transition-all opacity-0 group-hover/gallery:opacity-100 cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-bg/85 border border-brand-pink/15 text-brand-pink hover:bg-brand-pink hover:text-brand-bg flex items-center justify-center transition-all opacity-0 group-hover/gallery:opacity-100 cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slide Count Indicator Badge */}
              <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-brand-bg/80 border border-brand-pink/10 font-mono text-[9px] uppercase tracking-widest text-brand-pink font-semibold">
                {activeImageIndex + 1} / {productImages.length}
              </span>
            </div>

            {/* Carousel Vignettes / Thumbnails Navigation Strip */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1.5 scrollbar-thin">
              {productImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                    activeImageIndex === i
                      ? "border-brand-pink scale-[1.03] shadow-md"
                      : "border-brand-pink/10 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Vignette ${i + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-pink/15 font-mono text-[10px] text-brand-pink uppercase tracking-widest font-semibold">
                  {product.category}
                </span>
                {product.hasHandmadeBadge && (
                  <span className="px-3 py-1 rounded-full bg-brand-cream/5 font-mono text-[10px] text-brand-cream/85 uppercase tracking-widest border border-brand-pink/10 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                    Atelier Fait Main
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-serif font-bold text-brand-cream leading-tight">
                {product.name}
              </h2>

              <p className="text-sm text-brand-text-muted italic leading-relaxed">
                {product.longDescription}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-brand-pink">
                  Notre Charte Révieuse
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-brand-bg/40 border border-brand-pink/5 text-left text-xs space-y-1 flex flex-col justify-start">
                    <span className="text-brand-pink font-semibold flex items-center gap-1.5">
                      <Leaf className="w-3.5 h-3.5" />
                      Cire de soja
                    </span>
                    <p className="text-[10px] text-brand-text-muted leading-tight">
                      Cire 100% soja végétale biodégradable sans fumée toxique.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-brand-bg/40 border border-brand-pink/5 text-left text-xs space-y-1 flex flex-col justify-start">
                    <span className="text-brand-pink font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Parfums de Grasse
                    </span>
                    <p className="text-[10px] text-brand-text-muted leading-tight">
                      Huiles parfumées rigoureusement sans CMR ni phtalates.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-brand-bg/40 border border-brand-pink/5 text-left text-xs space-y-1 flex flex-col justify-start">
                    <span className="text-brand-pink font-semibold flex items-center gap-1.5">
                      <HandHeart className="w-3.5 h-3.5" />
                      Fait main
                    </span>
                    <p className="text-[10px] text-brand-text-muted leading-tight">
                      Confectionnée artisanalement avec précaution en Bourgogne.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-brand-bg/40 border border-brand-pink/5 text-left text-xs space-y-1 flex flex-col justify-start">
                    <span className="text-brand-pink font-semibold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Précommande
                    </span>
                    <p className="text-[10px] text-brand-text-muted leading-tight">
                      Environ deux semaines de fabrication pour soigner la cure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Shipping / Delivery product block */}
              <div className="p-4 rounded-xl bg-brand-purple/5 border border-brand-purple/10 text-xs text-brand-text-muted space-y-2">
                <span className="font-semibold text-brand-purple uppercase tracking-wider font-mono text-[10px] flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  Expéditions & Acheminements
                </span>
                <p className="text-[11px] leading-relaxed">
                  <strong>Les frais d’envoi</strong> sont confirmés avant
                  paiement selon le poids, le volume et le transporteur choisi.
                </p>
                <p className="text-[11px] leading-relaxed italic text-brand-purple font-light flex items-center gap-1">
                  Envois d’octobre à mars ; Retrait gratuit à domicile possible
                  et chaleureusement encouragé toute l'année !
                </p>
              </div>

              {/* Interactive Scent Note Pyramid */}
              {product.scents && product.scents.length > 0 && renderPyramid()}
            </div>
          </div>
        </div>

        {/* Configurations Forms Column (Right) */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto max-h-[50vh] md:max-h-[92vh] space-y-6">
          <div className="border-b border-brand-pink/15 pb-4">
            <span className="text-[11px] font-mono text-brand-pink uppercase tracking-widest">
              Choix de vos douceurs
            </span>
            <h3 className="text-xl font-serif font-bold text-brand-cream">
              Senteurs &amp; options artisanales
            </h3>
          </div>

          <form onSubmit={handleWhatsAppCheckout} className="space-y-6">
            {/* Scents Selection */}
            <div>
              <span className="text-xs font-mono font-bold text-brand-text-muted uppercase tracking-widest">
                SÉLECTION PARFUMÉE DES INGRÉDIENTS
              </span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {product.scents.map((scentName) => (
                  <ScentHoverCard key={scentName} scentName={scentName} className="w-full relative inline-block">
                    <button
                      type="button"
                      onClick={() => setSelectedScent(scentName)}
                      className={`w-full p-3 text-left rounded-xl text-xs font-medium border transition-colors cursor-pointer flex items-center gap-2 ${
                        selectedScent === scentName
                          ? "bg-brand-pink/15 border-brand-pink text-brand-pink font-bold"
                          : "bg-brand-depth/60 border-brand-pink/5 text-brand-text-muted hover:border-brand-pink/40"
                      }`}
                    >
                      <Flower className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                      {scentName}
                    </button>
                  </ScentHoverCard>
                ))}
              </div>
              {currentScentObj && (
                <div className="mt-2 text-[11px] font-mono text-brand-purple italic">
                  Note : Senteur {currentScentObj.family} (
                  {currentScentObj.family === "Gourmand"
                    ? "gourmande & sucrée"
                    : currentScentObj.family === "Floral"
                      ? "fleurie cocooning"
                      : "fraîcheur douce"}
                  )
                </div>
              )}
            </div>

            {/* Colors */}
            <div>
              <span className="text-xs font-mono font-bold text-brand-text-muted uppercase tracking-widest">
                COULEUR INDIVIDUALISÉE DE LA CIRE
              </span>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full mt-2 p-3 bg-brand-depth border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-colors"
              >
                {colorsOption.map((co) => (
                  <option key={co} value={co}>
                    {co}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity and Delivery Mode */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/3">
                <span className="text-xs font-mono font-bold text-brand-text-muted uppercase tracking-widest">
                  QUANTITÉ
                </span>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full mt-2 p-3 bg-brand-depth border border-brand-pink/15 rounded-xl text-center text-sm font-semibold text-brand-cream focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>

              <div className="w-full sm:w-2/3">
                <span className="text-xs font-mono font-bold text-brand-text-muted uppercase tracking-widest">
                  ACHEMINEMENT
                </span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setDeliveryMode("Retrait gratuit à l'Atelier")
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      deliveryMode === "Retrait gratuit à l'Atelier"
                        ? "bg-brand-pink/15 border-brand-pink text-brand-pink font-semibold"
                        : "bg-brand-depth/60 border-brand-pink/5 text-brand-text-muted"
                    }`}
                  >
                    <Home className="w-3.5 h-3.5 text-brand-pink" />
                    Retrait Atelier
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setDeliveryMode("Envoi Mondial Relay - Lockers")
                    }
                    className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      deliveryMode === "Envoi Mondial Relay - Lockers"
                        ? "bg-brand-pink/15 border-brand-pink text-brand-pink font-semibold"
                        : "bg-brand-depth/60 border-brand-pink/5 text-brand-text-muted"
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5 text-brand-pink" />
                    Mondial Relay
                  </button>
                </div>
              </div>
            </div>

            {/* Personalization text */}
            {product.customizable && (
              <div>
                <span className="text-xs font-mono font-bold text-brand-text-muted uppercase tracking-widest flex items-center justify-between">
                  <span>PERSONNALISATION DE L'ÉTIQUETTE</span>
                  <span className="text-[10px] text-brand-purple italic">
                    Optionnelle
                  </span>
                </span>
                <textarea
                  placeholder="Inclusions de prénoms, dates pour vos cadeaux d'invités (ex : 'Jeanne & Pierre 24.06.26'), rubans colorés ou décors spécifiques..."
                  value={personalization}
                  onChange={(e) => setPersonalization(e.target.value)}
                  className="w-full mt-2 p-3 bg-brand-depth border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-colors min-h-[70px]"
                />
              </div>
            )}

            {/* Disclaimer notice immediately pointing to options confirmation */}
            <div className="p-3 bg-brand-pink/5 border border-brand-pink/10 rounded-xl text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-brand-pink shrink-0 animate-pulse" />
              <p className="text-[11px] text-brand-pink font-light italic">
                Les options sont confirmées avec vous sur WhatsApp avant
                paiement.
              </p>
            </div>

            {/* Client name input (Mandatory) */}
            <div>
              <span className="text-xs font-mono font-bold text-brand-pink uppercase tracking-widest">
                NOTRE CONVERSATION - VOTRE NOM *
              </span>
              <input
                type="text"
                required
                placeholder="Renseignez votre Nom & Prénom..."
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full mt-2 p-3 bg-brand-depth border border-brand-pink/30 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
              />
            </div>

            {/* Pricing Details */}
            <div className="p-4 rounded-xl bg-brand-depth/50 border border-brand-pink/10 space-y-1">
              <div className="flex justify-between items-center text-xs text-brand-text-muted">
                <span>Prix de base de la formule :</span>
                <span>
                  {product.priceText || `${product.price.toFixed(2)} €`}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-semibold text-brand-cream">
                <span>Sous-total estimatif :</span>
                <span className="text-brand-pink font-mono text-base font-bold">
                  {(product.price * quantity).toFixed(2)} €
                </span>
              </div>
            </div>

            {/* Dual CTAs: Primary whatsapp checkout and secondary pos-questions */}
            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full py-3.5 bg-brand-pink text-brand-bg font-extrabold text-xs tracking-wider uppercase rounded-full hover:bg-brand-pink-hover transition-colors flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <Send className="w-4 h-4 text-brand-bg fill-brand-bg" />
                Commander ce produit sur WhatsApp
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="w-full py-3 bg-brand-depth text-brand-pink border border-brand-pink/20 font-bold text-xs tracking-wider uppercase rounded-full hover:bg-white/5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-brand-pink" />
                Poser une question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
