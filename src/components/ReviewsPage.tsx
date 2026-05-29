import React, { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Star,
  Check,
  CheckCircle2,
  MessageCircle,
  PenLine,
  Wand2,
  HandHeart,
  Globe,
  Search,
  X,
  ShoppingBag,
  Sparkles,
  Facebook,
  MessagesSquare,
  UserRound,
  Inbox,
  ArrowRight,
  Filter,
  CheckSquare,
  ZoomIn,
} from "lucide-react";
import {
  reviewsPageConfig,
  ReviewFormState,
  CustomerReview,
  ReviewSource,
  ReviewProductType,
} from "../config/reviewsPageConfig";

import avis1Img from '../assets/images/reviews/avis_1.png';
import avis2Img from '../assets/images/reviews/avis_2.jpeg';
import avis3Img from '../assets/images/reviews/avis_3.jpeg';
import avis4Img from '../assets/images/reviews/avis_4.jpeg';
import avis5Img from '../assets/images/reviews/avis_5.jpeg';
import avis6Img from '../assets/images/reviews/avis_6.jpeg';
import avis7Img from '../assets/images/reviews/avis_7.jpeg';
import avis8Img from '../assets/images/reviews/avis_8.jpeg';

// Centralized Framer Motion settings
export const reviewsMotion = {
  sectionReveal: (delay = 0) => ({
    initial: { opacity: 0, y: 26, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),

  gridContainer: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  },

  reviewCard: {
    hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  },

  cardHover: {
    rest: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.015 },
    tap: { scale: 0.985 },
  },
};

// WhatsApp Message Builder Helper
export const buildReviewWhatsappMessage = (
  formState: ReviewFormState,
  config: typeof reviewsPageConfig,
) => {
  const source = config.filters.sources.find(
    (item) => item.id === formState.source,
  );
  const productType = config.filters.productTypes.find(
    (item) => item.id === formState.productType,
  );

  return `
Bonjour, je souhaite partager un avis pour ${config.brand.name}.

• Prénom : ${formState.customerName || "Non précisé"}
• Note : ${formState.rating || "Non précisée"} / 5
• Source / échange : ${source?.label || "Non précisé"}
• Création concernée : ${productType?.label || "Non précisée"}
• Titre : ${formState.title || "Non précisé"}
• Avis :
${formState.text || "Non précisé"}

Autorisation d’affichage avec mon prénom : ${formState.allowDisplay ? "Oui" : "Non"}
`.trim();
};

// Icon Selector Map
const sourceIconMap: Record<ReviewSource, React.ComponentType<any>> = {
  facebook: Facebook,
  messenger: MessagesSquare,
  whatsapp: MessageCircle,
  client: UserRound,
  site: Globe,
  google: Search,
};

const SourceIcon = ({
  source,
  className = "w-4 h-4",
}: {
  source: ReviewSource;
  className?: string;
}) => {
  const IconComponent = sourceIconMap[source] || Sparkles;
  return <IconComponent className={className} />;
};

// Helper for dynamic stats icons
const statIconMap: Record<string, React.ComponentType<any>> = {
  Star: Star,
  HandHeart: HandHeart,
  Wand2: Wand2,
};

const StatIcon = ({
  iconName,
  className = "w-6 h-6",
}: {
  iconName: string;
  className?: string;
}) => {
  const IconComponent = statIconMap[iconName] || Sparkles;
  return <IconComponent className={className} />;
};

/* --- HERO SECTION --- */
const ReviewsHero = ({
  onScrollToReviews,
  onScrollToForm,
}: {
  onScrollToReviews: () => void;
  onScrollToForm: () => void;
}) => {
  const config = reviewsPageConfig;
  const featuredReview = config.reviews[0];

  return (
    <section className="relative min-h-[85svh] lg:min-h-[90svh] -mt-24 md:-mt-28 flex flex-col justify-center overflow-hidden bg-brand-bg pt-32 pb-16 border-b border-brand-pink/10">
      {/* Immersive background decoration */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={config.hero.media.fallbackImage}
          alt="Atmosphère parfumée artisanale"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        {/* Soft wax/prune gradients and overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/90 to-brand-bg/50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-pink/5 rounded-full blur-[110px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-brand-wax/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left column: Editorial & value highlights */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-pink/20 bg-brand-pink/5 text-[10px] uppercase font-mono text-brand-pink tracking-[0.2em] font-bold shadow-lg">
            {config.page.eyebrow}
          </span>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-serif font-black text-brand-cream tracking-tight leading-[1.05]">
            Des créations qui laissent un{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-wax to-brand-pink italic font-light font-serif">
              souvenir
            </span>
            .
          </h1>

          <p className="max-w-2xl text-base md:text-lg text-brand-text-muted font-light leading-relaxed">
            {config.page.subtitle}
          </p>

          <p className="max-w-xl text-xs md:text-sm text-brand-text-muted/60 font-mono italic">
            " {config.page.helper} "
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap gap-2.5 pt-4">
            {config.hero.badges.map((badge, idx) => (
              <span
                key={idx}
                className="text-[10px] px-3 py-1 rounded-full bg-brand-depth/40 border border-brand-pink/5 text-brand-wax uppercase font-mono tracking-wider flex items-center gap-1.5"
              >
                <Sparkles className="w-2.5 h-2.5 text-brand-pink" />
                {badge}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <button
              onClick={onScrollToReviews}
              className="px-8 py-4 bg-brand-pink text-brand-bg hover:bg-brand-pink-hover active:scale-95 transition-all rounded-full font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-xl cursor-pointer"
            >
              <Star className="w-4 h-4 fill-brand-bg text-brand-bg" />
              {config.hero.primaryCta.label}
            </button>
            <button
              onClick={onScrollToForm}
              className="px-8 py-4 bg-brand-depth/80 border border-brand-pink/20 hover:border-brand-pink/50 hover:bg-brand-depth transition-all rounded-full font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer text-brand-cream"
            >
              <PenLine className="w-4 h-4 text-brand-pink" />
              {config.hero.secondaryCta.label}
            </button>
          </div>
        </div>

        {/* Right column: floating workshop testimonial summary (desktop only) */}
        <div className="lg:col-span-5 hidden lg:flex justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="liquid-glass-strong rounded-[2.5rem] p-8 max-w-sm w-full relative shadow-3xl border border-brand-pink/15 group hover:border-brand-pink/30 transition-all duration-300"
          >
            <div className="absolute top-4 right-4 text-brand-pink/10 font-serif text-[8rem] select-none pointer-events-none font-bold leading-none">
              “
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] uppercase font-mono tracking-widest text-brand-pink font-extrabold px-2 py-0.5 rounded bg-brand-pink/10">
                ⭐ Retours d’atelier
              </span>
            </div>

            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-brand-wax text-brand-wax"
                />
              ))}
            </div>

            <p className="text-brand-cream font-serif italic text-base leading-relaxed mb-6">
              "{featuredReview?.text}"
            </p>

            <div className="border-t border-brand-pink/10 pt-4 flex items-center justify-between">
              <div>
                <span className="block font-bold text-sm text-brand-cream">
                  {featuredReview?.customerName}
                </span>
                <span className="block text-[11px] text-brand-text-muted/70">
                  {featuredReview?.productLabel}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-brand-text-muted/60 font-mono">
                <SourceIcon
                  source={featuredReview?.source}
                  className="w-3.5 h-3.5 text-brand-pink"
                />
                {featuredReview?.source.toUpperCase()}
              </div>
            </div>

            <p className="text-[9px] text-zinc-500 font-mono text-center mt-6">
              * Véritable avis extrait de nos réseaux d'échanges direct.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* --- REVIEW STATS SECTION --- */
const ReviewStatsSection = () => {
  const config = reviewsPageConfig;
  return (
    <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto relative z-20">
      <div className="bg-brand-depth/40 backdrop-blur-md border border-brand-pink/15 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px]" />

        <h2 className="text-center font-serif text-lg sm:text-2xl text-brand-wax mb-10 max-w-xl mx-auto tracking-normal font-medium">
          {config.stats.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-brand-pink/10">
          {config.stats.items.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center pt-8 md:pt-0 px-4 first:pt-0"
            >
              <div className="w-12 h-12 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink mb-4 shadow-inner">
                <StatIcon
                  iconName={stat.icon}
                  className="w-5 h-5 text-brand-pink"
                />
              </div>
              <div className="text-3xl lg:text-4xl font-serif font-black text-brand-cream mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs uppercase font-mono tracking-wider text-brand-pink font-bold mb-2">
                {stat.label}
              </div>
              <p className="text-xs text-brand-text-muted/70 font-light max-w-[200px]">
                {stat.helper}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --- FEATURED REVIEWS SECTION --- */
const FeaturedReviewsSection = () => {
  const config = reviewsPageConfig;
  const featured = useMemo(
    () => config.reviews.filter((r) => r.featured),
    [config.reviews],
  );

  if (featured.length === 0) return null;

  return (
    <section className="py-10 px-6 max-w-7xl mx-auto">
      <div className="text-center md:text-left mb-8 flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-brand-pink font-bold block mb-2">
            Confidence Atelier
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-brand-cream">
            Avis coups de cœur de la communauté
          </h2>
        </div>
        <div className="text-xs text-brand-wax/70 font-mono hidden md:block">
          Authenticité certifiée • Échanges réels
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featured.slice(0, 3).map((review, idx) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`rounded-[2rem] p-6 lg:p-8 flex flex-col justify-between border relative overflow-hidden transition-all duration-300 ${
              idx === 0
                ? "bg-gradient-to-br from-brand-depth/80 to-brand-bg border-brand-pink/20 lg:col-span-1 shadow-xl"
                : "bg-brand-depth/40 border-brand-pink/10 shadow-lg hover:border-brand-pink/20"
            }`}
          >
            {/* Elegant Background quote mark */}
            <div className="absolute top-2 right-4 text-brand-pink/5 font-serif text-[10rem] pointer-events-none select-none font-bold italic leading-none">
              “
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 relative z-10">
                <div className="flex space-x-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-brand-pink text-brand-pink"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-bg/50 border border-brand-pink/15 text-[10px] font-mono font-medium text-brand-text-muted uppercase">
                  <SourceIcon
                    source={review.source}
                    className="w-3 h-3 text-brand-pink"
                  />
                  {review.source}
                </div>
              </div>

              {review.title && (
                <h3 className="text-base font-serif font-bold text-brand-cream mb-2 relative z-10">
              {review.title}
                </h3>
              )}

              <p className="text-xs md:text-sm text-brand-text-muted/95 italic leading-relaxed mb-6 font-light relative z-10">
                "{review.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-brand-pink/10 flex items-center justify-between h-10">
              <div>
                <span className="block font-bold text-xs text-brand-cream">
                  {review.customerName}
                </span>
                {review.productLabel && (
                  <span className="block text-[10px] text-brand-pink font-mono">
                    {review.productLabel}
                  </span>
                )}
              </div>
              <div className="text-[9px] bg-brand-pink/5 text-brand-pink border border-brand-pink/10 px-2 py-0.5 rounded uppercase font-mono tracking-wider font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Vérifié
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

/* --- SCREENSHOT REVIEWS GALLERY COMPONENT --- */
const ScreenshotReviewsGallery = () => {
  const screenshots = [
    { img: avis1Img, title: "Avis Commande", source: "Facebook", type: "Commande réussie" },
    { img: avis2Img, title: "Retour Parfumé", source: "WhatsApp", type: "Bougie Arrosoir" },
    { img: avis3Img, title: "Cadeau Invités", source: "Messenger", type: "Mariage d'Emma" },
    { img: avis4Img, title: "Douceur Reçue", source: "WhatsApp", type: "Galets de Grasse" },
    { img: avis5Img, title: "Émotion Déballage", source: "Facebook", type: "Fête des Mères" },
    { img: avis6Img, title: "Fait Main Sensation", source: "WhatsApp", type: "Buste de Déesse" },
    { img: avis7Img, title: "Qualité Olfactive", source: "Messenger", type: "Fleur de Coton" },
    { img: avis8Img, title: "Parfaite Attention", source: "WhatsApp", type: "Coffret Cadeau" },
  ];

  const [activeImg, setActiveImg] = useState<string | null>(null);

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto border-t border-brand-pink/10">
      <div className="text-center md:text-left mb-8 flex flex-col md:flex-row justify-between items-baseline gap-4">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-brand-pink font-bold block mb-2">
            Mur de la confiance
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-brand-cream">
            Leurs captures &amp; mots doux authentiques
          </h2>
          <p className="text-xs text-brand-text-muted mt-1">
            Parce que les plus beaux compliments viennent directement de nos conversations privées. Cliquez pour zoomer.
          </p>
        </div>
        <div className="text-xs text-brand-wax/70 font-mono hidden md:block">
          Captures d'échanges réels • 100% Sincère
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {screenshots.map((s, idx) => (
          <motion.div
            key={idx}
            onClick={() => setActiveImg(s.img)}
            className="group relative rounded-[2rem] overflow-hidden border border-brand-pink/10 bg-brand-depth/40 hover:border-brand-pink/30 hover:bg-brand-depth/60 transition-all duration-300 shadow-md cursor-zoom-in aspect-[3/4]"
            whileHover={{ y: -6 }}
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-full h-full object-cover filter brightness-[85%] group-hover:brightness-[100%] transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-bg/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left">
              <span className="text-[9px] font-mono uppercase tracking-widest text-brand-pink font-bold block mb-1">
                {s.source}
              </span>
              <h4 className="font-serif font-bold text-xs text-brand-cream leading-tight">
                {s.title}
              </h4>
              <p className="text-[10px] text-brand-text-muted mt-1">{s.type}</p>
              <div className="mt-3 flex items-center gap-1 text-[9px] font-mono text-brand-pink/70 uppercase">
                <ZoomIn className="w-3.5 h-3.5" />
                Zoomer
              </div>
            </div>
            
            {/* Soft badge indicating source */}
            <div className="absolute top-3 right-3 bg-brand-depth/85 border border-brand-pink/15 px-2 py-0.5 rounded text-[8px] font-mono text-brand-text-muted group-hover:opacity-0 transition-opacity uppercase">
              {s.source}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {activeImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImg(null)}
            className="fixed inset-0 z-50 bg-brand-bg/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              className="relative max-w-lg w-full max-h-[85vh] rounded-[2rem] overflow-hidden border border-brand-pink/20 bg-brand-depth p-1 shadow-2xl flex items-center justify-center"
            >
              <img
                src={activeImg}
                alt="Avis client zoomé"
                className="w-full h-auto max-h-[80vh] object-contain rounded-[1.8rem]"
              />
              <button
                onClick={() => setActiveImg(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-brand-bg/80 border border-brand-pink/20 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

/* --- STAR RATING COMPONENT --- */
const StarRating = ({
  rating,
  className = "w-4 h-4",
  spacing = "space-x-0.5",
}: {
  rating: number;
  className?: string;
  spacing?: string;
}) => {
  return (
    <div className={`flex ${spacing}`}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${className} ${
            i < rating
              ? "fill-brand-pink text-brand-pink font-semibold"
              : "text-zinc-600"
          }`}
        />
      ))}
    </div>
  );
};

/* --- REVIEW CARD --- */
const ReviewCard = ({ review }: { review: CustomerReview; key?: string }) => {
  const config = reviewsPageConfig;
  const [isExpanded, setIsExpanded] = useState(false);

  const textThreshold = config.reviewCard.maxTextLengthBeforeClamp || 220;
  const isLong = review.text.length > textThreshold;
  const displayedText =
    isLong && !isExpanded
      ? `${review.text.substring(0, textThreshold)}...`
      : review.text;

  return (
    <motion.div
      variants={reviewsMotion.reviewCard}
      whileHover={reviewsMotion.cardHover.hover}
      className="bg-brand-depth/40 hover:bg-brand-depth/60 border border-brand-pink/5 hover:border-brand-pink/20 rounded-3xl p-6 flex flex-col h-full transition-all group shadow-md"
    >
      <div className="flex justify-between items-start mb-4">
        <StarRating rating={review.rating} />

        {config.reviewCard.showSource && (
          <div
            className="flex items-center gap-1 text-[9px] uppercase font-mono tracking-widest text-brand-pink/80 bg-brand-pink/5 border border-brand-pink/10 px-2.5 py-1 rounded-full cursor-default"
            title={`Source: ${review.source}`}
          >
            <SourceIcon
              source={review.source}
              className="w-3 h-3 text-brand-pink"
            />
            <span>{review.source}</span>
          </div>
        )}
      </div>

      {review.title && (
        <h4 className="font-serif font-black text-brand-cream text-base mb-2 group-hover:text-brand-pink transition-colors tracking-tight">
          {review.title}
        </h4>
      )}

      <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light mb-4 flex-grow transition-all">
        "{displayedText}"
      </p>

      {isLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-[10px] font-mono uppercase tracking-wider text-brand-pink hover:text-brand-pink-hover font-black mb-4 flex items-center gap-1 cursor-pointer transition-colors"
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Réduire" : "Lire l'avis en entier"}
          <ArrowRight
            className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`}
          />
        </button>
      )}

      <div className="mt-auto pt-4 border-t border-brand-pink/5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 focus:outline-none">
            <span className="font-bold text-xs text-brand-cream">
              {review.customerName}
            </span>
            {config.reviewCard.showVerifiedBadge && review.verified && (
              <CheckCircle2
                className="w-3.5 h-3.5 text-brand-wax"
                title="Auteur vérifié"
              />
            )}
          </div>
          {config.reviewCard.showProductType && review.productLabel && (
            <span className="text-[10px] text-brand-text-muted/60 bg-white/5 px-2 py-0.5 rounded mt-1 inline-block block font-mono">
              🔑 {review.productLabel}
            </span>
          )}
        </div>

        {config.reviewCard.showDate && review.dateLabel && (
          <span className="text-[9px] uppercase font-mono text-brand-text-muted/40 font-semibold self-end">
            {review.dateLabel}
          </span>
        )}
      </div>
    </motion.div>
  );
};

/* --- EMPTY STATE --- */
const EmptyReviewsState = ({ onReset }: { onReset: () => void }) => {
  const config = reviewsPageConfig;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-16 px-6 bg-brand-depth/20 rounded-[2rem] border border-brand-pink/5 max-w-lg mx-auto"
    >
      <Inbox className="w-12 h-12 mx-auto text-brand-pink/30 mb-4" />
      <h3 className="text-lg font-serif font-bold text-brand-cream mb-2">
        {config.emptyState.title}
      </h3>
      <p className="text-xs text-brand-text-muted/80 mb-6 max-w-md mx-auto leading-relaxed">
        {config.emptyState.description}
      </p>
      <button
        onClick={onReset}
        className="px-6 py-3 bg-brand-pink text-brand-bg rounded-xl text-xs font-mono font-bold uppercase tracking-wider hover:bg-brand-pink-hover transition-colors shadow-lg cursor-pointer"
      >
        {config.emptyState.cta}
      </button>
    </motion.div>
  );
};

/* --- REVIEWS CONTROL PANEL & MASONRY GRID --- */
const ReviewsGridSection = React.forwardRef<
  HTMLDivElement,
  { onScrollToForm: () => void }
>((props, ref) => {
  const config = reviewsPageConfig;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedProductType, setSelectedProductType] = useState("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Filter handlers
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedRating("all");
    setSelectedSource("all");
    setSelectedProductType("all");
    setFeaturedOnly(false);
  };

  const filteredReviews = useMemo(() => {
    return config.reviews.filter((review) => {
      // Search text query matching
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = review.customerName.toLowerCase().includes(query);
        const matchesTitle =
          review.title?.toLowerCase().includes(query) || false;
        const matchesText = review.text.toLowerCase().includes(query);
        const matchesProductLabel =
          review.productLabel?.toLowerCase().includes(query) || false;
        if (
          !matchesName &&
          !matchesTitle &&
          !matchesText &&
          !matchesProductLabel
        ) {
          return false;
        }
      }

      // Rating filter matching
      if (selectedRating !== "all") {
        if (selectedRating === "5" && review.rating !== 5) return false;
        if (selectedRating === "4" && review.rating < 4) return false;
      }

      // Source filter matching
      if (selectedSource !== "all" && review.source !== selectedSource)
        return false;

      // Product Type filter matching
      if (
        selectedProductType !== "all" &&
        review.productType !== selectedProductType
      )
        return false;

      // Featured only toggle matching
      if (featuredOnly && !review.featured) return false;

      return true;
    });
  }, [
    searchQuery,
    selectedRating,
    selectedSource,
    selectedProductType,
    featuredOnly,
    config.reviews,
  ]);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedRating !== "all") count++;
    if (selectedSource !== "all") count++;
    if (selectedProductType !== "all") count++;
    if (featuredOnly) count++;
    return count;
  }, [
    searchQuery,
    selectedRating,
    selectedSource,
    selectedProductType,
    featuredOnly,
  ]);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 max-w-7xl mx-auto scroll-mt-24"
      id="reviewsGrid"
    >
      {/* Title & Stats Summary */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-[10px] uppercase font-mono tracking-widest text-brand-pink font-bold inline-block mb-2">
          Social Proof Wall
        </span>
        <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-cream max-w-lg mx-auto tracking-tight leading-tight mb-4">
          Un mot doux, un cadeau réussi
        </h2>
        <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
          Découvrez la totalité de nos retours vérifiés. Utilisez les filtres
          thématiques pour naviguer à travers nos différentes séries de
          créations en cire.
        </p>
      </div>

      {/* STICKY CONTROL PANEL */}
      <div className="sticky top-20 z-40 bg-brand-bg/85 backdrop-blur-xl border border-brand-pink/10 rounded-3xl p-5 mb-10 shadow-xl relative">
        <div className="flex flex-col gap-4">
          {/* First row: Search & Featured Toggle */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-grow">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-brand-pink/40">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={config.filters.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full flex-grow bg-brand-depth/50 border border-brand-pink/10 rounded-xl pl-10 pr-9 py-2.5 text-xs text-brand-cream placeholder-brand-text-muted/40 font-light focus:outline-none focus:border-brand-pink focus:bg-brand-depth/80 transition-all"
                aria-label={config.filters.searchPlaceholder}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-text-muted/60 hover:text-brand-pink transition-colors cursor-pointer"
                  aria-label="Effacer la recherche"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Featured Only Checker */}
            <button
              onClick={() => setFeaturedOnly(!featuredOnly)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-mono font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                featuredOnly
                  ? "bg-brand-pink/15 border-brand-pink text-brand-pink"
                  : "bg-brand-depth/30 border-brand-pink/10 text-brand-text-muted hover:border-brand-pink/20"
              }`}
            >
              <CheckSquare
                className={`w-3.5 h-3.5 transition-colors ${featuredOnly ? "text-brand-pink" : "text-brand-text-muted/30"}`}
              />
              <span>{config.filters.labels.featured}</span>
            </button>

            {/* Reset filters button */}
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-mono font-black uppercase text-brand-pink hover:text-brand-pink-hover transition-colors flex items-center justify-center gap-1 cursor-pointer self-center"
              >
                <X className="w-3 h-3" />
                {config.filters.labels.reset}
              </button>
            )}
          </div>

          {/* Second row: Quick selectors pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Creation selector drop */}
            <div>
              <label className="block text-[9px] font-mono text-brand-text-muted/50 uppercase tracking-widest mb-1 pl-1">
                {config.filters.labels.productType}
              </label>
              <select
                value={selectedProductType}
                onChange={(e) => setSelectedProductType(e.target.value)}
                className="w-full bg-brand-depth/60 border border-brand-pink/10 rounded-xl px-3 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-all font-light"
              >
                {config.filters.productTypes.map((pt) => (
                  <option
                    key={pt.id}
                    value={pt.id}
                    className="bg-brand-depth text-brand-cream text-xs"
                  >
                    {pt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Source filter drop */}
            <div>
              <label className="block text-[9px] font-mono text-brand-text-muted/50 uppercase tracking-widest mb-1 pl-1">
                {config.filters.labels.source}
              </label>
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full bg-brand-depth/60 border border-brand-pink/10 rounded-xl px-3 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-all font-light"
              >
                {config.filters.sources.map((src) => (
                  <option
                    key={src.id}
                    value={src.id}
                    className="bg-brand-depth text-brand-cream text-xs"
                  >
                    {src.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Star Filter */}
            <div>
              <label className="block text-[9px] font-mono text-brand-text-muted/50 uppercase tracking-widest mb-1 pl-1">
                {config.filters.labels.rating}
              </label>
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full bg-brand-depth/60 border border-brand-pink/10 rounded-xl px-3 py-2 text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-all font-light"
              >
                {config.filters.ratingOptions.map((ro) => (
                  <option
                    key={ro.id}
                    value={ro.id}
                    className="bg-brand-depth text-brand-cream text-xs"
                  >
                    {ro.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Filters Summary / Indicator tag */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-brand-pink/5 text-[10px] font-mono text-brand-text-muted/60">
          <span>
            {filteredReviews.length} avis filtré
            {filteredReviews.length > 1 ? "s" : ""} sur {config.reviews.length}{" "}
            disponibles
          </span>
          {activeFiltersCount > 0 && (
            <span className="text-brand-pink font-semibold">
              {activeFiltersCount} filtre{activeFiltersCount > 1 ? "s" : ""}{" "}
              actif{activeFiltersCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* FILTERED REVIEWS MASONRY GRID */}
      <AnimatePresence mode="popLayout">
        {filteredReviews.length === 0 ? (
          <EmptyReviewsState onReset={handleResetFilters} />
        ) : (
          <motion.div
            variants={reviewsMotion.gridContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-12 text-center">
        <p className="text-xs text-brand-text-muted/60 italic mb-3">
          Vous souhaitez témoigner de votre dernière expérience d'achat ?
        </p>
        <button
          onClick={props.onScrollToForm}
          className="text-xs font-mono uppercase tracking-widest text-brand-pink font-extrabold underline underline-offset-4 hover:text-brand-pink-hover transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <PenLine className="w-3 h-3" />
          Ajouter ma pierre à l'édifice
        </button>
      </div>
    </section>
  );
});
ReviewsGridSection.displayName = "ReviewsGridSection";

/* --- LEAVE REVIEW / FORM SECTION --- */
const LeaveReviewSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const config = reviewsPageConfig;
  const [formState, setFormState] = useState<ReviewFormState>({
    customerName: "",
    rating: 5,
    source: "site", // Default source
    productType: "bougie", // Default product type
    title: "",
    text: "",
    allowDisplay: true,
  });

  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [messageError, setMessageError] = useState("");

  const handleRatingClick = (rate: number) => {
    setFormState((prev) => ({ ...prev, rating: rate }));
  };

  const handleStarKeyDown = (e: React.KeyboardEvent, rate: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRatingClick(rate);
    }
  };

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.customerName.trim()) {
      setMessageError(
        "Veuillez indiquer au moins votre prénom pour que l'avis soit exploitable.",
      );
      return;
    }
    if (!formState.text.trim()) {
      setMessageError(
        "Ajoutez quelques mots concernant votre expérience avant de l'envoyer à l’atelier.",
      );
      return;
    }
    setMessageError("");

    const message = buildReviewWhatsappMessage(formState, config);
    const whatsappUrl = `https://wa.me/${config.brand.whatsappNumber}?text=${encodeURIComponent(message)}`;

    // Open in a safe frame-compliant way
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      ref={ref}
      className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24"
      id="reviewForm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Reassurance & Instructions */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-pink/20 bg-brand-pink/5 text-[10px] uppercase font-mono text-brand-pink tracking-[0.2em] font-bold">
            Témoigner
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-cream tracking-tight leading-tight">
            {config.form.title}
          </h2>
          <p className="text-brand-text-muted font-light text-sm leading-relaxed">
            {config.form.subtitle}
          </p>

          <div className="space-y-4 pt-4 text-xs text-brand-text-muted/80">
            <div className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink mt-0.5 shrink-0">
                1
              </span>
              <div>
                <strong className="block text-brand-cream mb-0.5">
                  Complétez le formulaire
                </strong>
                Renseignez la note associée à la cire et le canal par lequel
                vous avez acquis le produit.
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink mt-0.5 shrink-0">
                2
              </span>
              <div>
                <strong className="block text-brand-cream mb-0.5">
                  Appuyez sur "Envoi sur WhatsApp"
                </strong>
                Un message pré-saisi s'ouvrira sur votre application WhatsApp.
                Il vous suffit de nous l'envoyer.
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <span className="w-5 h-5 rounded-full bg-brand-pink/10 flex items-center justify-center text-brand-pink mt-0.5 shrink-0">
                3
              </span>
              <div>
                <strong className="block text-brand-cream mb-0.5">
                  Validation manuelle rapide
                </strong>
                Nous validons votre commentaire en atelier, et il apparaît sur
                le site internet !
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form Card */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSendToWhatsApp}
            className="bg-brand-depth/50 border border-brand-pink/15 rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px]" />

            {messageError && (
              <div className="mb-6 p-4 bg-brand-pink/10 border border-brand-pink/30 rounded-2xl text-xs text-brand-pink">
                ⚠️ {messageError}
              </div>
            )}

            <div className="space-y-6 relative z-10 text-left">
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="formName"
                    className="block text-[10px] font-mono uppercase text-brand-pink mb-2 tracking-wider"
                  >
                    {config.form.fields.customerName}{" "}
                    <span className="text-brand-wax">*</span>
                  </label>
                  <input
                    id="formName"
                    type="text"
                    placeholder={config.form.placeholders.customerName}
                    value={formState.customerName}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        customerName: e.target.value,
                      }))
                    }
                    className="w-full bg-brand-bg/60 border border-brand-pink/20 rounded-xl px-4 py-3 text-xs focus:border-brand-pink outline-none text-brand-cream font-light transition-all"
                    required
                  />
                </div>

                {/* Stars Selector */}
                <div>
                  <label className="block text-[10px] font-mono uppercase text-brand-pink mb-2 tracking-wider">
                    {config.form.fields.rating}
                  </label>
                  <div
                    className="flex gap-1.5 py-1"
                    role="radiogroup"
                    aria-label="Choisir la note de 1 à 5 étoiles"
                  >
                    {[1, 2, 3, 4, 5].map((starValue) => {
                      const isActive =
                        hoveredStar !== null
                          ? starValue <= hoveredStar
                          : starValue <= formState.rating;
                      return (
                        <button
                          key={starValue}
                          type="button"
                          role="radio"
                          aria-checked={formState.rating === starValue}
                          aria-label={`${starValue} étoiles`}
                          onClick={() => handleRatingClick(starValue)}
                          onMouseEnter={() => setHoveredStar(starValue)}
                          onMouseLeave={() => setHoveredStar(null)}
                          onKeyDown={(e) => handleStarKeyDown(e, starValue)}
                          className="p-1 transition-transform active:scale-95 focus:outline-none focus:ring-1 focus:ring-brand-pink rounded-lg cursor-pointer"
                        >
                          <Star
                            className={`w-8 h-8 transition-colors duration-150 ${
                              isActive
                                ? "fill-brand-wax text-brand-wax drop-shadow-[0_0_8px_rgba(232,211,176,0.4)]"
                                : "text-zinc-700 hover:text-zinc-600"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Source Selection */}
                <div>
                  <label
                    htmlFor="formSource"
                    className="block text-[10px] font-mono uppercase text-brand-pink mb-2 tracking-wider"
                  >
                    {config.form.fields.source}
                  </label>
                  <select
                    id="formSource"
                    value={formState.source}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        source: e.target.value as ReviewSource,
                      }))
                    }
                    className="w-full bg-brand-bg/60 border border-brand-pink/20 rounded-xl px-4 py-3 text-xs focus:border-brand-pink outline-none text-brand-cream font-light transition-all"
                  >
                    {config.filters.sources
                      .filter((item) => item.id !== "all")
                      .map((item) => (
                        <option
                          key={item.id}
                          value={item.id}
                          className="bg-brand-depth text-brand-cream"
                        >
                          {item.label}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Product Type Selection */}
                <div>
                  <label
                    htmlFor="formProduct"
                    className="block text-[10px] font-mono uppercase text-brand-pink mb-2 tracking-wider"
                  >
                    {config.form.fields.productType}
                  </label>
                  <select
                    id="formProduct"
                    value={formState.productType}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        productType: e.target.value as ReviewProductType,
                      }))
                    }
                    className="w-full bg-brand-bg/60 border border-brand-pink/20 rounded-xl px-4 py-3 text-xs focus:border-brand-pink outline-none text-brand-cream font-light transition-all"
                  >
                    {config.filters.productTypes
                      .filter((item) => item.id !== "all")
                      .map((item) => (
                        <option
                          key={item.id}
                          value={item.id}
                          className="bg-brand-depth text-brand-cream"
                        >
                          {item.label}
                        </option>
                      ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label
                  htmlFor="formTitle"
                  className="block text-[10px] font-mono uppercase text-brand-pink mb-2 tracking-wider"
                >
                  {config.form.fields.title}
                </label>
                <input
                  id="formTitle"
                  type="text"
                  placeholder={config.form.placeholders.title}
                  value={formState.title}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, title: e.target.value }))
                  }
                  className="w-full bg-brand-bg/60 border border-brand-pink/20 rounded-xl px-4 py-3 text-xs focus:border-brand-pink outline-none text-brand-cream font-light transition-all"
                />
              </div>

              {/* Review Text */}
              <div>
                <label
                  htmlFor="formText"
                  className="block text-[10px] font-mono uppercase text-brand-pink mb-2 tracking-wider"
                >
                  {config.form.fields.text}{" "}
                  <span className="text-brand-wax">*</span>
                </label>
                <textarea
                  id="formText"
                  rows={4}
                  placeholder={config.form.placeholders.text}
                  value={formState.text}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, text: e.target.value }))
                  }
                  className="w-full bg-brand-bg/60 border border-brand-pink/20 rounded-xl px-4 py-3 text-xs focus:border-brand-pink outline-none text-brand-cream resize-none font-light transition-all"
                  required
                />
              </div>

              {/* Allow Display Checkbox */}
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setFormState((s) => ({
                      ...s,
                      allowDisplay: !s.allowDisplay,
                    }))
                  }
                  className={`mt-1 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-all ${
                    formState.allowDisplay
                      ? "bg-brand-pink border-brand-pink shadow-md"
                      : "border-brand-pink/30 hover:border-brand-pink/60"
                  }`}
                  aria-label="Autoriser l'affichage de mon prénom"
                >
                  {formState.allowDisplay && (
                    <Check className="w-3.5 h-3.5 text-brand-bg stroke-[3]" />
                  )}
                </button>
                <span className="text-xs text-brand-text-muted mt-0.5 leading-relaxed font-light">
                  {config.form.fields.allowDisplay}
                </span>
              </div>

              {/* Submit Action */}
              <div className="pt-6 border-t border-brand-pink/10">
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-brand-pink text-brand-bg hover:bg-brand-pink-hover active:scale-95 transition-all rounded-xl font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 stroke-[2]" />
                  {config.form.whatsappLabel}
                </button>
                <p className="text-center text-[10px] uppercase font-mono text-brand-text-muted/50 mt-4 leading-normal">
                  💡 {config.form.helper}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
});
LeaveReviewSection.displayName = "LeaveReviewSection";

/* --- FINAL CTA SECTION --- */
const FinalReviewsCTA = ({ onShopClick }: { onShopClick: () => void }) => {
  const config = reviewsPageConfig;
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto rounded-[3rem] p-8 md:p-16 text-center bg-brand-depth border border-brand-pink/20 shadow-2xl overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-wax/5 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px]" />

        <div className="relative z-10 space-y-6">
          <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-black block">
            {config.finalCta.eyebrow}
          </span>
          <h2 className="text-2xl md:text-5xl font-serif font-black text-brand-cream max-w-2xl mx-auto leading-tight">
            {config.finalCta.title}
          </h2>
          <p className="text-xs md:text-sm text-brand-text-muted max-w-xl mx-auto leading-relaxed font-light">
            {config.finalCta.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
            <a
              href={`https://wa.me/${config.brand.whatsappNumber}?text=${encodeURIComponent(config.whatsapp.adviceMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-brand-pink text-brand-bg font-extrabold text-xs uppercase rounded-full tracking-wider hover:bg-brand-pink-hover transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-brand-bg text-brand-bg" />
              {config.finalCta.primaryCta}
            </a>
            <button
              onClick={onShopClick}
              className="px-8 py-3.5 bg-brand-depth/80 border border-brand-pink/30 hover:border-brand-pink text-brand-cream font-extrabold text-xs uppercase rounded-full tracking-wider transition-colors flex items-center justify-center gap-2 backdrop-blur-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-brand-pink" />
              {config.finalCta.secondaryCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* --- MAIN PAGE EXPORT --- */
export default function ReviewsPage({
  onShopClick,
}: {
  onShopClick: () => void;
}) {
  const gridRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToGrid = () =>
    gridRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToForm = () =>
    formRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bg-brand-bg text-brand-cream min-h-screen relative overflow-x-hidden">
      {/* Decorative ambient scent dots representing atomized perfume oil droplets */}
      <div className="absolute top-1/3 left-10 w-2.5 h-2.5 bg-brand-pink/20 rounded-full blur-[1px] animate-pulse" />
      <div className="absolute top-2/3 right-12 w-3 h-3 bg-brand-wax/20 rounded-full blur-[1px] animate-pulse duration-1000" />
      <div className="absolute top-[80%] left-[15%] w-2 h-2 bg-brand-pink/15 rounded-full blur-[1px] animate-pulse duration-700" />

      {/* Hero */}
      <ReviewsHero
        onScrollToReviews={scrollToGrid}
        onScrollToForm={scrollToForm}
      />

      {/* Highlights & stats */}
      <ReviewStatsSection />

      {/* Selected Featured/Testimonial row */}
      <FeaturedReviewsSection />

      {/* Screenshot Reviews Gallery */}
      <ScreenshotReviewsGallery />

      {/* Core social proof filter grid */}
      <ReviewsGridSection ref={gridRef} onScrollToForm={scrollToForm} />

      {/* Review creator composer form */}
      <LeaveReviewSection ref={formRef} />

      {/* Direct Contact Close recommendation block */}
      <FinalReviewsCTA onShopClick={onShopClick} />
    </div>
  );
}

