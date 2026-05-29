import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Camera,
  Info,
  Home,
  Gift,
} from "lucide-react";

interface LifestyleSlide {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  context: string;
  quote: string;
  accentNote?: string;
}

const LIFESTYLE_SLIDES: LifestyleSlide[] = [
  {
    id: 1,
    title: "Cadeaux d'Invités & Événements d'Amour",
    category: "Mariages & Célébrations",
    description:
      "De délicates mini bougies en pots céramiques, fleuries et gravées au prénom de vos convives pour laisser un sillage impérissable de votre plus belle journée.",
    image:
      "https://images.unsplash.com/photo-1519225495810-7512c696505a?auto=format&fit=crop&w=1200&q=80",
    context:
      "Mis en situation : Une réception bohème en plein air, sous les tonnelles en lin.",
    quote:
      '"Chaque convive est reparti ému, emportant avec lui l\'odeur divine de notre union." — Camille (Mariée 2025)',
    accentNote: "Inspiration : Lin brut & Fleur de Coton",
  },
  {
    id: 2,
    title: "Le Cocon de Lecture",
    category: "Intérieurs Chaleureux",
    description:
      "Harmonisez vos moments de pause. Un sillage léger de Fleur de Coton pour envelopper votre bibliothèque ou votre pièce de vie favorite d'une douceur infinie.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    context:
      "Mis en situation : Un après-midi pluvieux de Bourgogne, éclairé par la lueur ambrée d'un pot d'apothicaire.",
    quote:
      "\"La bougie crépite doucement à côté d'un thé fumant. Ma maison est un havre d'apaisement.\" — Mélissa",
    accentNote: "Inspiration : Cosy & Fleur de Coton",
  },
  {
    id: 3,
    title: "La Table Raffinée en Fête",
    category: "Inspiration de Table",
    description:
      "Ajoutez une touche d'or et de cire dure florale. Nos cadres parfumés suspendus ou posés ornent les serviettes de vos invités, servant à la fois de marque-place poétique et de sachet souvenir parfumant.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80",
    context:
      "Mis en situation : Une table de fête de Fêtes de fin d'année, entre cire de soja parfumée, branches de pin et verres cristallins.",
    quote:
      '"Le parfum de cassis et cannelle s\'est mêlé au rire de nos repas de famille." — Christelle & Mélanie',
    accentNote: "Inspiration : Cannelle & Cire d'Orfèvre",
  },
  {
    id: 4,
    title: "L'Heure du Soin Rituel",
    category: "Fraîcheur & Bain d'Énergie",
    description:
      "Un bouquet aux tiges de rotin diffusant en continu de l'Eucalyptus et de la Menthe sauvage. Une respiration pure et détoxifiante pour recharger vos énergies dès le matin.",
    image:
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
    context:
      "Mis en situation : Une salle d'eau épurée à l'ambiance spa scandinave.",
    quote:
      '"Un geste simple de diffusion naturelle qui transforme chaque douche en rituel de thalasso." — Pierre-Antoine',
    accentNote: "Inspiration : Eucalyptus & Lin Blanc",
  },
  {
    id: 5,
    title: "L'Âme de l'Atelier",
    category: "Coulées d'Émotion",
    description:
      "Découvrez notre quotidien artisanal. Christelle et Mélanie sélectionnent les brassées de lavandes régionales et coulent la cire veloutée à température parfaite pour garantir un brûlage homogène.",
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80",
    context:
      "Mis en situation : Les comptoirs fleuris de notre atelier bourguignon baigné du soleil matinal.",
    quote:
      '"Rien ne remplace la main humaine pour lier le parfum à sa matière." — Christelle',
    accentNote: "Inspiration : Cueillette locale & Cire pure",
  },
];

export default function LifestyleCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % LIFESTYLE_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + LIFESTYLE_SLIDES.length) % LIFESTYLE_SLIDES.length,
    );
  };

  const activeSlide = LIFESTYLE_SLIDES[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <div className="space-y-6" id="lifestyle-carousel-wrapper">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-5xl mx-auto">
        <div className="text-left space-y-1.5">
          <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold flex items-center gap-1.5">
            <Camera className="w-4 h-4 text-brand-pink" />
            Galerie d'Inspirations &amp; Mises en Contexte
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream leading-tight">
            Le Parfum prend Vie
          </h3>
          <p className="text-xs text-brand-text-muted max-w-xl font-light leading-relaxed">
            Parcourez nos suggestions d'ambiances et découvrez comment
            Christelle et Mélanie intègrent leurs créations dans vos pièces à
            vivre et lors de vos plus beaux rituels familiaux.
          </p>
        </div>

        {/* Carousel buttons */}
        <div className="flex items-center gap-2 self-start">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-brand-bg/90 border border-brand-pink/15 text-brand-text-muted hover:text-brand-cream hover:bg-brand-pink/20 flex items-center justify-center transition-all cursor-pointer shadow"
            title="Précédent"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <span className="font-mono text-xs text-brand-pink/90 px-3 bg-brand-depth/40 py-1.5 rounded-full border border-brand-pink/5">
            {currentIndex + 1} / {LIFESTYLE_SLIDES.length}
          </span>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-brand-bg/90 border border-brand-pink/15 text-brand-text-muted hover:text-brand-cream hover:bg-brand-pink/20 flex items-center justify-center transition-all cursor-pointer shadow"
            title="Suivant"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Showcase Plate with "Touch of White" highlights */}
      <div className="max-w-5xl mx-auto relative overflow-hidden bg-brand-depth/85 border border-brand-pink/15 rounded-3xl md:rounded-[2.5rem] shadow-2xl p-4 md:p-6">
        {/* Absolute decorative glowing circles */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/5 rounded-full filter blur-[80px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-purple/5 rounded-full filter blur-[80px] pointer-events-none" />

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Image slide area (Col span 7) */}
          <div className="lg:col-span-7 relative h-64 sm:h-[400px] rounded-2xl md:rounded-3xl overflow-hidden border border-brand-pink/15 bg-brand-bg select-none">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentIndex}
                src={activeSlide.image}
                alt={activeSlide.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* In-context light floating tag overlay ('Touch of White' look) */}
            <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 backdrop-blur-md bg-white/95 text-brand-bg border border-white/40 p-3 rounded-xl flex items-center justify-between shadow-lg">
              <span className="text-[10px] font-mono text-brand-bg/85 break-words uppercase tracking-wider font-semibold flex items-center gap-1.5 leading-none">
                <Info className="w-3.5 h-3.5 text-brand-bg/80 shrink-0" />
                {activeSlide.context}
              </span>
              {activeSlide.accentNote && (
                <span className="hidden sm:inline-block font-mono text-[9px] bg-brand-bg text-brand-pink rounded-full px-2 py-1 font-semibold leading-none">
                  {activeSlide.accentNote}
                </span>
              )}
            </div>

            {/* Premium Category Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-brand-pink text-brand-bg font-extrabold shadow-md">
                <Sparkles className="w-3 h-3 text-brand-bg animate-pulse" />
                {activeSlide.category}
              </span>
            </div>
          </div>

          {/* Description & Quotes Panel (Col span 5 with dynamic content) */}
          <div className="lg:col-span-5 text-left flex flex-col justify-between py-2 space-y-6 pl-0 lg:pl-4 relative z-10">
            <div className="space-y-4">
              {/* Premium Crisp White Callout tag - "Touch of White" styling indicator */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-white text-xs font-mono font-bold text-brand-bg uppercase tracking-wide shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                Mise en Situation active
              </div>

              <h4 className="text-xl md:text-2xl font-serif font-black text-brand-cream leading-tight">
                {activeSlide.title}
              </h4>

              <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
                {activeSlide.description}
              </p>
            </div>

            {/* User testimonial section */}
            <div className="p-4 bg-brand-bg/70 border border-brand-pink/15 rounded-xl space-y-2 relative shadow-inner">
              <span className="text-[9px] font-mono text-brand-pink uppercase tracking-widest font-semibold block">
                Retour de Cire
              </span>
              <p className="text-xs text-brand-cream italic font-serif leading-relaxed">
                {activeSlide.quote}
              </p>
            </div>

            {/* Small Quick-Guide CTA inside slide to customized options on site */}
            <div className="pt-2 border-t border-brand-pink/5 flex items-center justify-between text-xs font-mono">
              <span className="text-brand-text-muted font-light">
                Intégrable à l'Atelier
              </span>
              <span className="text-brand-pink font-semibold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 inline text-brand-pink hover:scale-110 transition-transform" />
                Personnalisable à 100%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dots indicators for ease navigations */}
      <div className="flex justify-center gap-1.5 pt-2">
        {LIFESTYLE_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > currentIndex ? 1 : -1);
              setCurrentIndex(i);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? "w-6 bg-brand-pink"
                : "w-2 bg-brand-pink/20 hover:bg-brand-pink/50"
            }`}
            title={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
