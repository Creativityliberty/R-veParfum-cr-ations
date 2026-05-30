import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers } from 'lucide-react';

interface ScentDetails {
  name: string;
  family: string;
  tête: string;
  coeur: string;
  fond: string;
  desc: string;
  intensity: number; // 1 to 5
}

const SCENT_DATABASE: Record<string, ScentDetails> = {
  "cerise noire explosive": {
    name: "Cerise Noire Explosive",
    family: "Fruité, gourmand",
    tête: "Amande, frangipane",
    coeur: "Cerise",
    fond: "Vanille, accord gourmand",
    desc: "Un parfum dynamique et gourmand, encapsulant la richesse des cerises noires sur un sillage de vanille.",
    intensity: 5
  },
  "pomme d'amour": {
    name: "Pomme d'Amour",
    family: "Fruité, caramel",
    tête: "Fraise, pêche",
    coeur: "Pomme, caramel",
    fond: "Musc, vanille",
    desc: "Évoque la magie des pommes d'amour et la nostalgie festive. Caramel fondant et pomme juteuse.",
    intensity: 4
  },
  "pommes d'amour": {
    name: "Pomme d'Amour",
    family: "Fruité, caramel",
    tête: "Fraise, pêche",
    coeur: "Pomme, caramel",
    fond: "Musc, vanille",
    desc: "Évoque la magie des pommes d'amour et la nostalgie festive. Caramel fondant et pomme juteuse.",
    intensity: 4
  },
  "délice interdit": {
    name: "Délice Interdit",
    family: "Fruité, Gourmand",
    tête: "Poire fondante",
    coeur: "Cranberry, fruits des bois, baies sauvages",
    fond: "Musc blanc, confit de framboise",
    desc: "Une fragrance fruitée et gourmande, délicieusement sucrée et envoûtante, laissant un sillage irrésistible.",
    intensity: 4
  },
  "fleur de coton": {
    name: "Fleur de Coton",
    family: "Florale, Douceur",
    tête: "Rose, ylang-ylang",
    coeur: "Fleur de coton, jasmin",
    fond: "Musc, fève tonka",
    desc: "Évoquant la douceur d'un linge propre et d'un cocon apaisant. Floral, aérien et réconfortant.",
    intensity: 3
  },
  "fleurs de coton": {
    name: "Fleur de Coton",
    family: "Florale, Douceur",
    tête: "Rose, ylang-ylang",
    coeur: "Fleur de coton, jasmin",
    fond: "Musc, fève tonka",
    desc: "Évoquant la douceur d'un linge propre et d'un cocon apaisant. Floral, aérien et réconfortant.",
    intensity: 3
  },
  "lilas": {
    name: "Lilas",
    family: "Floral, vert",
    tête: "Citron, œillet, muguet",
    coeur: "Lilas, rose, héliotrope",
    fond: "Jacinthe",
    desc: "Balade poétique dans un jardin printanier en fleurs, frais et divinement vert.",
    intensity: 3
  },
  "monoï": {
    name: "Monoï des Îles",
    family: "Solaire, Boisé",
    tête: "Pêche, fleur d'oranger",
    coeur: "Tiaré, rose",
    fond: "Vanille, noix de coco",
    desc: "Une échappée tropicale ensoleillée mêlant fleur de tiaré, douceur vanillée et noix de coco exotique.",
    intensity: 5
  },
  "clémentine monoï": {
    name: "Clémentine Monoï",
    family: "Hespéridé, floral",
    tête: "Orange, cyclamen",
    coeur: "Clémentine, monoï",
    fond: "Musc, vanille",
    desc: "La fraîcheur acidulée de la clémentine mariée à l'exotisme solaire du monoï.",
    intensity: 4
  },
  "pêche": {
    name: "Pêche Mignonne",
    family: "Fruité, Solaire",
    tête: "Framboise, accord vert",
    coeur: "Pêche",
    fond: "Noix de coco, accord gourmand",
    desc: "Une pêche juteuse et veloutée sublimée par la framboise et une touche lactée de coco.",
    intensity: 3
  },
  "fruits rouges": {
    name: "Fruits Rouges & Bois",
    family: "Fruité, Tonique",
    tête: "Citron, néroli",
    coeur: "Fraise, framboise",
    fond: "Vanille, crème brûlée",
    desc: "Un panier de baies rouges sauvages marié à l'onctuosité gourmande d'une crème brûlée.",
    intensity: 4
  },
  "agrumes": {
    name: "Agrumes Pressés",
    family: "Hespéridée, Fraîcheur",
    tête: "Eucalyptus",
    coeur: "Orange, limette",
    fond: "Citronnelle",
    desc: "Une explosion de fraîcheur acidulée et tonique pour purifier et dynamiser l'atmosphère.",
    intensity: 4
  }
};

interface ScentHoverCardProps {
  scentName: string;
  children: React.ReactNode;
  className?: string;
}

export default function ScentHoverCard({ scentName, children, className = "relative inline-block" }: ScentHoverCardProps) {
  const [hovered, setHovered] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  const key = scentName.toLowerCase().trim();
  const details = SCENT_DATABASE[key];

  if (!details) return <div className={className}>{children}</div>;

  return (
    <div 
      ref={triggerRef}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-72 p-5 rounded-3xl bg-brand-depth/95 backdrop-blur-xl border border-brand-pink/20 shadow-2xl text-left pointer-events-none"
            style={{ originX: 0.5, originY: 1 }}
          >
            {/* Ambient subtle glow inside card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/5 to-brand-purple/5 rounded-3xl pointer-events-none" />

            <div className="relative z-10 space-y-3">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-serif font-bold text-brand-cream leading-tight">
                    {details.name}
                  </h4>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-pink font-semibold">
                    {details.family}
                  </span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full ${
                        i < details.intensity ? 'bg-brand-pink' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] font-light text-brand-text-muted leading-relaxed">
                {details.desc}
              </p>

              {/* Pyramide Olfactive Details */}
              <div className="pt-2 border-t border-white/5 space-y-1.5 font-mono text-[9px] uppercase tracking-wider text-brand-cream/80">
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 font-bold w-12 shrink-0">Tête :</span>
                  <span className="text-brand-pink text-[9px] normal-case leading-normal truncate">{details.tête}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 font-bold w-12 shrink-0">Cœur :</span>
                  <span className="text-brand-purple text-[9px] normal-case leading-normal truncate">{details.coeur}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-zinc-500 font-bold w-12 shrink-0">Fond :</span>
                  <span className="text-amber-200 text-[9px] normal-case leading-normal truncate">{details.fond}</span>
                </div>
              </div>

              {/* Artisan Note */}
              <div className="flex items-center gap-1 pt-1.5 text-[8px] font-mono tracking-widest text-zinc-500 uppercase">
                <Sparkles className="w-2.5 h-2.5 text-brand-pink shrink-0" />
                <span>Parfum de Grasse Garanti</span>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 bg-brand-depth border-r border-b border-brand-pink/20 rotate-45" style={{ marginTop: "-6px" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
