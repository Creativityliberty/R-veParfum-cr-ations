import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Flame,
  Flower2,
  Gift,
  ArrowRight,
  ChevronRight,
  Leaf,
  Droplet,
  Heart,
  MessageCircle,
  Wand2,
  Star,
  Compass,
  CheckCircle2,
  LockKeyhole,
  PhoneCall,
  Calendar,
  HelpCircle,
} from "lucide-react";
import { homePageConfig } from "../config/homePageConfig";
import { motionPresets } from "../lib/motion";
import HeroVideo from "./HeroVideo";
import AnimatedHeadline from "./AnimatedHeadline";
import LifestyleCarousel from "./LifestyleCarousel";
import { Product } from "../types";
import atelierBourgogneImg from "../assets/images/atelier/atelier_bourgogne.png";

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  setSelectedCategory: (cat: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setShowQuizModal: (show: boolean) => void;
  allProducts: Product[];
}

export default function HomePage({
  setCurrentTab,
  setSelectedCategory,
  setSelectedProduct,
  setShowQuizModal,
  allProducts,
}: HomePageProps) {
  const [activeMood, setActiveMood] = useState<string>("Floral");

  // Unified router target resolver
  const navigateTo = (target: string) => {
    if (target === "shop" || target.startsWith("shop")) {
      setSelectedCategory("Tous");
      setCurrentTab("boutique");
      setTimeout(() => {
        document
          .getElementById("boutique-main-view")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    } else if (target === "custom") {
      setCurrentTab("personnalisation");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    } else if (target === "events") {
      setCurrentTab("evenements");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    } else if (target === "reviews") {
      setCurrentTab("avis");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    } else if (target === "contact") {
      setCurrentTab("contact");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    } else if (target === "scentQuiz") {
      setShowQuizModal(true);
      setTimeout(() => {
        document
          .getElementById("scent-finder-anchor")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else if (target === "whatsapp") {
      const msg =
        "Bonjour Christelle et Mélanie, je découvre Rêve Parfumé Création et j’aimerais être guidé(e) pour choisir une pièce ou passer commande.";
      window.open(
        `https://wa.me/${homePageConfig.brand.whatsappNumber}?text=${encodeURIComponent(msg)}`,
        "_blank",
      );
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Flame":
        return <Flame className="w-6 h-6 text-brand-pink" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-brand-purple" />;
      case "Flower2":
        return <Flower2 className="w-6 h-6 text-emerald-400" />;
      case "Gift":
        return <Gift className="w-6 h-6 text-brand-wax" />;
      default:
        return <Sparkles className="w-6 h-6 text-brand-pink" />;
    }
  };

  return (
    <div className="space-y-24 pb-16 relative z-10 perfume-noise">
      {/* ================= HERO SECTION ================= */}
      <section
        className="relative min-h-[95svh] lg:min-h-[100svh] -mt-24 md:-mt-28 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden"
        id="section-hero"
      >
        {/* Cinematic atmospheric backdrop element */}
        <HeroVideo />

        {/* Floating background petals / embers layer */}
        <div className="absolute inset-x-0 top-0 h-[45rem] overflow-hidden pointer-events-none z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-brand-pink/15 rounded-full filter blur-[1px]"
              style={{
                width: `${Math.random() * 5 + 4}px`,
                height: `${Math.random() * 5 + 4}px`,
                left: `${15 + Math.random() * 70}%`,
              }}
              initial={{ y: -20, opacity: 0 }}
              animate={{
                y: 800,
                opacity: [0, 0.5, 0.5, 0],
                x: [0, Math.sin(i) * 35, -Math.sin(i) * 20],
              }}
              transition={{
                duration: Math.random() * 12 + 12,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear",
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20 pt-16 md:pt-24 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 space-y-8 text-left">
              {/* Premium Glow Eyebrow */}
              <motion.div
                {...motionPresets.fadeBlurUp(0.1)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass border border-brand-pink/20 text-brand-pink text-xs font-mono uppercase tracking-widest font-extrabold"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse text-brand-pink" />
                {homePageConfig.hero.eyebrow}
              </motion.div>

              {/* Typographic Splendour Title */}
              <AnimatedHeadline />

              {/* Description */}
              <motion.p
                {...motionPresets.fadeBlurUp(0.4)}
                className="text-sm md:text-base text-brand-text-muted leading-relaxed max-w-xl font-light"
              >
                {homePageConfig.hero.subtitle}
              </motion.p>

              {/* Responsive Elegant CTAs button rows with subtle gloss overlays (Nocturnal glow) */}
              <motion.div
                {...motionPresets.fadeBlurUp(0.55)}
                className="flex flex-col sm:flex-row gap-4 pt-2"
              >
                <button
                  onClick={() =>
                    navigateTo(homePageConfig.hero.primaryCta.target)
                  }
                  className="px-8 py-4 bg-brand-pink text-brand-bg font-black text-xs tracking-wider uppercase rounded-full hover:bg-brand-pink-hover transition-all flex items-center justify-center gap-2 shadow-2xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <Flame className="w-4 h-4 text-brand-bg fill-brand-bg animate-pulse" />
                  {homePageConfig.hero.primaryCta.label}
                </button>

                <button
                  onClick={() =>
                    navigateTo(homePageConfig.hero.secondaryCta.target)
                  }
                  className="px-8 py-4 rounded-full liquid-glass text-brand-pink hover:bg-white/5 border border-brand-pink/15 transition-all text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
                  {homePageConfig.hero.secondaryCta.label}
                </button>
              </motion.div>

              {/* Horizontal Trust Markers */}
              <motion.div
                {...motionPresets.fadeBlurUp(0.7)}
                className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-brand-pink/10 max-w-xl"
              >
                {homePageConfig.hero.trustBadges.map((badge, idx) => (
                  <div key={idx} className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-brand-pink uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-pink inline-block animate-pulse" />
                      {badge}
                    </span>
                    <p className="text-[9px] text-brand-text-muted leading-tight font-light">
                      {idx === 0 && "100% fait main à l'atelier"}
                      {idx === 1 && "Sans OGM, sans paraffine"}
                      {idx === 2 && "Sélection noble de Grasse"}
                      {idx === 3 && "Étiquettes & créas sur-mesure"}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Luxury Float Card (Visible on lg and up) */}
            <div className="hidden lg:col-span-5 relative lg:flex justify-end p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: -2 }}
                transition={{
                  duration: 0.9,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  rotate: 0,
                  y: -6,
                  transition: { duration: 0.28 },
                }}
                className="w-[380px] rounded-[2.5rem] p-6 text-left liquid-glass-strong cursor-pointer border border-brand-pink/15 shadow-2xl relative"
                onClick={() => navigateTo("shop")}
              >
                {/* Floating highlight note sticker */}
                <div className="absolute -bottom-5 -left-5 p-3 px-4 bg-white text-zinc-950 font-mono text-[10px] uppercase font-black rounded-xl border border-white shadow-xl flex items-center gap-1.5 transform rotate-3">
                  <Wand2 className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" />
                  Personnalisable à 100%
                </div>

                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-brand-pink/10 bg-brand-bg">
                    <img
                      src={homePageConfig.media.heroPoster}
                      alt="Artisanat coulée de cire"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2 px-3 py-1 bg-brand-pink/90 text-brand-bg rounded-full text-[9px] font-mono tracking-wider uppercase font-black">
                      Séduction Cire
                    </div>
                  </div>

                  <span className="block text-[10px] font-mono uppercase tracking-widest text-[#E8D3B0] font-bold">
                    Sélection atelier
                  </span>
                  <h3 className="font-serif font-black text-2xl text-brand-cream leading-tight">
                    Cire végétale pure, huiles nobles de Grasse &amp; rituels
                    parfumés.
                  </h3>
                  <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                    Chaque bougie est versée à température optimale en petite
                    série, scellée de l'étiquette Rêve Parfumé pour embaumer
                    durablement vos plus beaux décors d'intérieurs.
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-brand-pink">
                    <span className="hover:underline">
                      Parcourir la boutique
                    </span>
                    <ArrowRight className="w-4 h-4 text-brand-pink" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Pinned Occasions Marquee */}
        <div className="mt-8 border-t border-brand-pink/5 pt-6 pb-6 relative z-20 bg-brand-bg/60 backdrop-blur-sm px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
            <span className="text-xs font-mono text-brand-pink/80 uppercase tracking-widest font-black whitespace-nowrap md:border-r md:border-brand-pink/15 md:pr-4">
              Pour offrir, décorer, remercier
            </span>
            <div className="w-full overflow-hidden relative">
              <div className="flex animate-marquee hover:pause-on-hover whitespace-nowrap gap-8 py-1 select-none">
                {homePageConfig.socialProof.marqueeItems
                  .concat(homePageConfig.socialProof.marqueeItems)
                  .map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-2 text-xs font-mono text-brand-cream/80 tracking-wide"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                      {item}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CATEGORY PORTAL GRID ================= */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20 space-y-12"
        id="category-explorer"
      >
        <div className="text-left max-w-xl space-y-3">
          <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold block">
            Choisir par envie
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-cream leading-none">
            Une création pour chaque sillage.
          </h2>
          <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
            {homePageConfig.hero.subtitle.replace(
              "Bougies, fondants, bouquets",
              "Explorez au-delà des mots notre sélection de contenants et formats coulés en Bourgogne.",
            )}
          </p>
        </div>

        {/* Elegant Bourgonian Workshop Banner above Categories Grid */}
        <div className="relative rounded-[2rem] overflow-hidden aspect-[21/9] md:aspect-[3/1] border border-brand-pink/15 shadow-2xl group">
          <img
            src={atelierBourgogneImg}
            alt="Mises en contexte et fabrication à l'atelier"
            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/95 via-brand-bg/20 to-transparent md:bg-gradient-to-r md:from-brand-bg/90 md:via-brand-bg/25 md:to-transparent" />
          
          <div className="absolute bottom-6 left-6 md:left-12 max-w-lg text-left space-y-2">
            <span className="text-[10px] font-mono text-brand-pink uppercase tracking-widest font-bold block">
              Savoir-Faire Artisanal
            </span>
            <h3 className="font-serif font-bold text-2xl md:text-3xl text-brand-cream leading-tight">
              Façonné à la main en Bourgogne
            </h3>
            <p className="hidden md:block text-xs text-brand-text-muted leading-relaxed font-light">
              Mélanie & Christelle conçoivent vos bougies, fondants, suspensions et bouquets avec de pures matières végétales et locales.
            </p>
          </div>
        </div>

        {/* Dynamic portal Grid with Asymmetric alignment offsets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {homePageConfig.categories.map((cat, idx) => {
            // Apply asymmetric displacement offset
            const styleOffset =
              idx === 1
                ? "lg:translate-y-6"
                : idx === 3
                  ? "lg:-translate-y-4"
                  : "";
            return (
              <motion.div
                key={idx}
                onClick={() => {
                  let mappedCategory = "Tous";
                  if (cat.label === "Bougies")
                    mappedCategory = "Bougies en pot";
                  if (cat.label === "Fondants") mappedCategory = "Fondants";
                  if (cat.label === "Bouquets")
                    mappedCategory = "Bouquets parfumés";
                  if (cat.label === "Cadeaux")
                    mappedCategory = "Coffrets cadeaux";
                  setSelectedCategory(mappedCategory);
                  setCurrentTab("boutique");
                  setTimeout(() => {
                    document
                      .getElementById("boutique-main-view")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 80);
                }}
                {...motionPresets.fadeBlurUp(idx * 0.1)}
                whileHover={{ y: -6, transition: { duration: 0.22 } }}
                className={`group liquid-glass p-6 rounded-[2rem] flex flex-col justify-between hover:border-brand-pink/30 hover:bg-brand-bg/50 transition-all cursor-pointer shadow-lg min-h-[220px] relative overflow-hidden ${styleOffset}`}
              >
                {/* Category background image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent" />
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-brand-bg/80 border border-brand-pink/15 flex items-center justify-center group-hover:bg-brand-pink group-hover:text-brand-bg transition-colors">
                    {getIcon(cat.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-brand-cream">
                      {cat.label}
                    </h3>
                    <p className="text-xs text-brand-text-muted mt-1 leading-relaxed font-light">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-brand-pink/5 flex items-center justify-between text-xs font-mono text-brand-pink relative z-10">
                  <span>Explorer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= EDITORIAL FEATURED PRODUCTS ================= */}
      {homePageConfig.sections.showFeaturedProducts && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 relative z-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-brand-pink/10 pb-6">
            <div className="space-y-2 text-left">
              <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
                Sélection d'Atelier
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-cream leading-tight">
                Les pièces incontournables
              </h2>
            </div>
            <button
              onClick={() => navigateTo("shop")}
              className="text-brand-pink font-mono text-xs hover:text-brand-cream hover:underline flex items-center gap-1 cursor-pointer self-start"
            >
              Parcourir le catalogue complet{" "}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Large editorial 3-card layout composition as requested */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Big Featured (Col span 7) */}
            <motion.div
              {...motionPresets.fadeBlurUp(0.15)}
              className="lg:col-span-7 rounded-[2.5rem] overflow-hidden liquid-glass flex flex-col justify-between p-6 md:p-8 min-h-[420px] group relative hover:border-brand-pink/30 transition-all border border-brand-pink/15"
            >
              <div className="absolute inset-0 z-0">
                <img
                  src={homePageConfig.featuredProducts[0].image}
                  alt={homePageConfig.featuredProducts[0].name}
                  className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-transparent" />
              </div>

              <div className="relative z-10 self-start">
                <span className="px-3 py-1 bg-white text-zinc-950 text-[10px] font-mono uppercase font-black rounded-full shadow-sm">
                  {homePageConfig.featuredProducts[0].tag}
                </span>
              </div>

              <div className="relative z-10 text-left space-y-4 pt-12">
                <h3 className="font-serif font-black text-3xl md:text-4xl text-brand-cream">
                  {homePageConfig.featuredProducts[0].name}
                </h3>
                <p className="text-xs md:text-sm text-brand-text-muted font-light max-w-xl">
                  {homePageConfig.featuredProducts[0].description} Nos bougies
                  sont de véritables créations de cire naturelle, décorées de
                  fleurs séchées précieuses.
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-brand-pink/10">
                  <span className="text-xs font-mono text-brand-pink font-semibold">
                    {homePageConfig.featuredProducts[0].priceText}
                  </span>
                  <button
                    onClick={() => navigateTo("shop")}
                    className="px-5 py-2 rounded-full bg-brand-pink text-brand-bg text-[10px] font-mono tracking-wider uppercase font-extrabold cursor-pointer hover:bg-white transition-colors"
                  >
                    Voir l'offre
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Stacked Two columns (Col span 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {homePageConfig.featuredProducts.slice(1).map((prod, pIdx) => (
                <motion.div
                  key={pIdx}
                  {...motionPresets.fadeBlurUp(0.25 + pIdx * 0.1)}
                  className="rounded-[2rem] overflow-hidden liquid-glass-strong p-5 flex gap-4 text-left hover:border-brand-pink/30 transition-all relative group flex-1"
                >
                  <div className="w-1/3 rounded-xl overflow-hidden bg-brand-bg shrink-0">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-brand-pink font-bold block">
                        {prod.tag}
                      </span>
                      <h4 className="font-serif font-black text-lg text-brand-cream">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-brand-text-muted leading-relaxed font-light line-clamp-2">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-brand-pink/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-[#E8D3B0] font-bold">
                        {prod.priceText}
                      </span>
                      <button
                        onClick={() => navigateTo(prod.target)}
                        className="text-[10px] font-mono font-semibold text-brand-pink hover:underline"
                      >
                        En savoir plus →
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================= INTERACTIVE SCENT WHEEL TEASER ================= */}
      {homePageConfig.sections.showScentWheel && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
          <div className="liquid-glass-strong p-6 md:p-12 rounded-[2.5rem] border border-brand-pink/15">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-5 text-left space-y-6">
                <span className="text-xs font-mono text-brand-pink/85 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-brand-purple" />
                  Guide olfactif interactif
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-black text-brand-cream leading-tight">
                  {homePageConfig.olfactoryFamilies.length > 0
                    ? "Quelle senteur décrit votre humeur ?"
                    : "Quelle senteur raconte votre moment ?"}
                </h3>
                <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
                  Chaque ingrédient de nos cires est une histoire. Choisissez
                  votre humeur et laissez-nous illuminer votre intérieur de
                  senteurs saines et durables.
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => navigateTo("scentQuiz")}
                    className="px-6 py-3 rounded-full bg-brand-pink text-brand-bg text-xs font-mono tracking-wider uppercase font-black hover:bg-white transition-colors cursor-pointer"
                  >
                    Trouver ma senteur idéale
                  </button>
                  <button
                    onClick={() => navigateTo("shop")}
                    className="px-6 py-3 rounded-full border border-brand-pink/20 text-brand-cream text-xs font-mono tracking-wider uppercase font-semibold hover:bg-white/5 transition-colors"
                  >
                    Voir le catalogue
                  </button>
                </div>
              </div>

              {/* Right Scent Familes Grid emitting colorful glow as requested */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {homePageConfig.olfactoryFamilies.map((fam, idx) => {
                  const isActive = activeMood === fam.name;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveMood(fam.name)}
                      onClick={() => setActiveMood(fam.name)}
                      style={{
                        boxShadow: isActive
                          ? `0 0 35px -10px ${fam.color}40`
                          : "none",
                        borderColor: isActive
                          ? fam.color
                          : "rgba(255, 255, 255, 0.05)",
                      }}
                      className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                        isActive
                          ? "bg-brand-bg/80 translate-y-[-2px]"
                          : "bg-brand-depth/40 hover:bg-brand-depth/70"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10"
                          style={{
                            backgroundColor: `${fam.color}15`,
                            color: fam.color,
                          }}
                        >
                          {fam.name === "Floral" && (
                            <Flower2 className="w-5 h-5" />
                          )}
                          {fam.name === "Gourmand" && (
                            <Star className="w-5 h-5" />
                          )}
                          {fam.name === "Frais" && <Leaf className="w-5 h-5" />}
                          {fam.name === "Boisé" && (
                            <Droplet className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-lg text-brand-cream">
                            {fam.name}
                          </h4>
                          <span className="text-[10px] font-mono text-brand-text-muted uppercase tracking-wider block">
                            {fam.mood}
                          </span>
                        </div>
                      </div>

                      {/* Display small matching sample items inside each mood */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-3 border-t border-brand-pink/5 overflow-hidden"
                          >
                            <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                              {fam.name === "Floral" &&
                                "Parfums d'excellence : Fleur de Coton, Lilas printanier et délicatesse."}
                              {fam.name === "Gourmand" &&
                                "Fragrances chaleureuses : Cerise Noire Explosive, Pomme d'Amour."}
                              {fam.name === "Fruité" &&
                                "Essences vibrantes : Clémentine Monoï, Fruits Rouges."}
                              {fam.name === "Boisé" &&
                                "Parfums complexes : Ambre doré de Perse, Bois de Santal, cire sauvage des sous-bois."}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= CRAFT STORY SPLIT STORY ================= */}
      {homePageConfig.sections.showCraftStory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Story Content */}
            <div className="lg:col-span-6 text-left space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold block">
                  Le Geste d'Art
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-cream leading-none">
                  Un atelier bourguignon où chaque détail compte.
                </h2>
                <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
                  Mélanie et Christelle coulent à la main de nobles matières
                  premières. De l'incorporation lente des huiles parfumées au
                  liage naturel des fleurs séchées locales, découvrez le
                  parcours minutieux d'une pièce façonnée à l'Atelier.
                </p>
              </div>

              {/* Craft Pillars using liquid-glass rows */}
              <div className="space-y-4">
                {[
                  {
                    title: "Moulage & Finitions Main",
                    desc: "La cire biodégradable 100% soja est coulée à température optimale pour de jolis pots ronds.",
                    icon: <CheckCircle2 className="w-5 h-5 text-brand-pink" />,
                  },
                  {
                    title: "Fleurissement Régional",
                    desc: "Chaque tablette est parsemée de lavande de notre jardin ou de fleurs locales bourguignonnes.",
                    icon: <Heart className="w-5 h-5 text-[#E8D3B0]" />,
                  },
                  {
                    title: "Emballage en Lin & Papier d'Art",
                    desc: "Vos commandes sont emmaillotées de feuilles de lin brut et de ficelles végétales.",
                    icon: <Wand2 className="w-5 h-5 text-brand-purple" />,
                  },
                ].map((pil, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-4 rounded-xl bg-brand-depth/40 border border-brand-pink/5 flex gap-4 items-start hover:border-brand-pink/15 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-bg flex items-center justify-center shrink-0 border border-white/5">
                      {pil.icon}
                    </div>
                    <div>
                      <h4 className="font-serif font-black text-sm text-brand-cream">
                        {pil.title}
                      </h4>
                      <p className="text-xs text-brand-text-muted leading-relaxed font-light mt-0.5">
                        {pil.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Video/Image with formulations overlay */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/10 to-brand-purple/10 rounded-[2rem] filter blur-xl opacity-60 pointer-events-none" />

              <div className="relative rounded-[2rem] overflow-hidden border border-brand-pink/15 bg-brand-depth shadow-2xl aspect-video lg:aspect-square">
                {/* Fallback frame image showing hands pouring cire */}
                <iframe
                  src="https://www.youtube.com/embed/z6_n8bM97d8?autoplay=1&mute=1&playlist=z6_n8bM97d8&loop=1&controls=0&showinfo=0"
                  title="Artisanat coulée de cire vidéo"
                  className="w-full h-full object-cover select-none pointer-events-none opacity-30 border-none scale-110"
                  aria-hidden="true"
                />
                <img
                  src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80"
                  alt="Processus artisan Rêve Parfumé"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none mix-blend-screen"
                  referrerPolicy="no-referrer"
                />

                {/* Formulation vertical checklist note details */}
                <div className="absolute top-4 left-4 p-4 rounded-xl bg-white text-zinc-950 font-mono text-[10px] uppercase font-black border border-white shadow-lg space-y-2 max-w-[200px] text-left transform -rotate-1">
                  <span className="text-[9px] text-zinc-500 tracking-wider">
                    Formulation cire
                  </span>
                  <div className="space-y-1 font-mono text-[9px] text-zinc-800">
                    <div className="flex justify-between border-b pb-0.5">
                      <span>Cire Soja:</span>{" "}
                      <span className="text-emerald-650">100%</span>
                    </div>
                    <div className="flex justify-between border-b pb-0.5">
                      <span>Parfum Grasse:</span>{" "}
                      <span className="text-indigo-650">10% max</span>
                    </div>
                    <div className="flex justify-between border-b pb-0.5">
                      <span>Fleurs Bour:</span>{" "}
                      <span className="text-zinc-600">Cueillette</span>
                    </div>
                    <div className="flex justify-between pt-0.5">
                      <span>Cure sillage:</span>{" "}
                      <span className="text-brand-pink-hover font-bold">
                        14j
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= GORGEOUS HOME LIFESTYLE CAROUSEL ================= */}
      <section className="py-12 border-t border-brand-pink/5">
        <LifestyleCarousel />
      </section>

      {/* ================= CONVERSATIONAL QUIZ TEASER ================= */}
      {homePageConfig.sections.showQuizTeaser && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
          <div className="liquid-glass-strong p-8 md:p-12 rounded-[2.5rem] border border-brand-pink/15 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full filter blur-[100px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Text */}
              <div className="lg:col-span-7 text-left space-y-6">
                <span className="text-xs font-mono text-[#E8D3B0] uppercase tracking-widest font-extrabold block">
                  Élixir Senteur personnalisé
                </span>
                <h3 className="text-3xl md:text-5xl font-serif font-black text-brand-cream leading-tight">
                  {homePageConfig.finalCta.eyebrow} Laissez-nous vous guider.
                </h3>
                <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
                  Répondez à notre questionnaire olfactif en 3 clics simples.
                  Christelle et Mélanie vous suggèrent en temps réel la
                  fragrance cire et le format de cadeau le plus adapté à votre
                  projet de décoration ou cadeau d'invités.
                </p>

                <button
                  onClick={() => navigateTo("scentQuiz")}
                  className="px-8 py-4 rounded-full bg-brand-pink text-brand-bg font-mono text-xs uppercase font-extrabold tracking-wider hover:bg-white transition-colors cursor-pointer flex items-center gap-2 shadow"
                >
                  <Sparkles className="w-4 h-4 text-brand-bg fill-brand-bg animate-bounce" />
                  Lancer le guide senteur interactif
                </button>
              </div>

              {/* Right Columns: Animated Fake quiz interaction mockup with "White Accent" */}
              <div className="lg:col-span-5">
                <div className="p-6 bg-white rounded-2xl border border-brand-pink/20 text-zinc-900 shadow-2xl space-y-4 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-2 font-mono text-[9px] uppercase tracking-wider bg-zinc-900 text-brand-pink font-extrabold rounded-bl-xl leading-none">
                    Preview Interactive
                  </div>
                  <div className="flex items-center gap-2 pb-2 border-b">
                    <span className="w-4 h-4 rounded-full bg-emerald-500 block animate-pulse shrink-0" />
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest font-extrabold">
                      Étape 01 de notre guide
                    </span>
                  </div>
                  <h4 className="font-serif font-black text-lg text-zinc-950">
                    Intensité ou intimité ?
                  </h4>
                  <p className="text-xs text-zinc-600 leading-normal font-light">
                    Où désirez-vous introduire ce nouveau sillage délicat ?
                  </p>

                  <div className="space-y-2 pt-2 text-xs font-mono">
                    <button
                      onClick={() => navigateTo("scentQuiz")}
                      className="w-full p-3 rounded-lg border border-brand-pink hover:border-zinc-950 hover:bg-zinc-50 flex justify-between items-center text-left transition-all cursor-pointer font-semibold text-zinc-900 text-[11px]"
                    >
                      <span>Le Nid Cosy (Chambre à coucher)</span>
                      <span className="text-brand-pink font-extrabold">
                        Fleur de Coton →
                      </span>
                    </button>
                    <button
                      onClick={() => navigateTo("scentQuiz")}
                      className="w-full p-3 rounded-lg border border-zinc-100 bg-zinc-50/50 hover:bg-zinc-50 flex justify-between items-center text-left transition-all cursor-pointer text-zinc-500 text-[11px] font-normal"
                    >
                      <span>La Table Gourmande (Séjour/Cuisine)</span>
                      <span>Pomme d'Amour →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= SOCIAL PROOF TESTIMONIALS STRIP ================= */}
      {homePageConfig.sections.showTestimonials && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
              Partage d'Amour clients
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-cream">
              Le sillage du bonheur
            </h2>
            <p className="text-xs text-brand-text-muted">
              Découvrez les retours de notre aimable clientèle séduite par le
              raffinement de l'Atelier.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                author: "Marie-Laure D.",
                date: "12 Avril 2026",
                note: "Mariage en Provence",
                excerpt:
                  "Un sans faute absolu ! Christelle nous a confectionné 120 mini-bougies fleur de cérisier en céramique personnalisées pour nos convives. Tous sont repartis émerveillés et parfumés d'émotions.",
                icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
              },
              {
                author: "Frédéric G.",
                date: "15 Mai 2026",
                note: "Cadeau Hôtesse",
                excerpt:
                  "L'atelier à domicile est extraordinaire ! Mélanie est arrivée chez nous avec sa malle aromatique remplie d'explications et d'entrain. Une après-midi cocooning mémorable à renouveler absolument.",
                icon: <Sparkles className="w-5 h-5 text-brand-purple" />,
              },
              {
                author: "Stéphanie P.",
                date: "24 Mai 2026",
                note: "Commande Boutique",
                excerpt:
                  "Les fondants au caramel beurre salé parfument ma bibliothèque pour plusieurs journées sans aucune lourdeur. Le paquet est soigné, scellé d'un délicat brin de paille séchée. Je recommande les yeux fermés.",
                icon: <Heart className="w-5 h-5 text-brand-pink" />,
              },
            ].map((test, tIdx) => (
              <motion.div
                key={tIdx}
                {...motionPresets.fadeBlurUp(tIdx * 0.1)}
                className="p-6 rounded-2xl liquid-glass text-left space-y-4 hover:border-brand-pink/20 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    {[...Array(5)].map((_, starI) => (
                      <Star
                        key={starI}
                        className="w-3.5 h-3.5 fill-amber-300"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-brand-cream font-serif italic leading-relaxed">
                    "{test.excerpt}"
                  </p>
                </div>

                <div className="pt-4 border-t border-brand-pink/5 flex items-center justify-between text-[11px]">
                  <div className="text-left">
                    <span className="font-bold text-brand-cream block">
                      {test.author}
                    </span>
                    <span className="text-[9px] text-brand-text-muted font-mono">
                      {test.note}
                    </span>
                  </div>
                  <span className="text-[9px] text-brand-pink font-mono">
                    {test.date}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ================= FINAL WHATSAPP DIRECT HIGH-LIAISON CTA ================= */}
      {homePageConfig.sections.showFinalCTA && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-20">
          <div className="liquid-glass-strong rounded-[2.5rem] p-8 md:p-16 border border-brand-pink/15 relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-b from-brand-pink/5 to-brand-purple/5 pointer-events-none" />

            <div className="max-w-xl mx-auto space-y-6 relative z-10">
              <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-extrabold flex items-center justify-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                Contact Direct Christelle &amp; Mélanie
              </span>
              <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-cream leading-tight">
                {homePageConfig.finalCta.title}
              </h2>
              <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
                {homePageConfig.finalCta.description} Christelle et Mélanie
                répondent sous 24h ouvrées pour concevoir des souvenirs
                précieux.
              </p>

              {/* Direct Touch of White card in footer inside CTA block */}
              <div className="bg-white rounded-2xl border border-brand-pink/20 p-4 text-zinc-900 shadow-xl text-left max-w-lg mx-auto space-y-2">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-mono font-bold text-zinc-950 uppercase tracking-widest">
                    Une Charte de Confiance Totale
                  </span>
                </div>
                <p className="text-[11px] text-zinc-650 leading-relaxed font-light">
                  Aucun paiement n’est requis en ligne. Votre commande fleurs et
                  ciment, après validation sur WhatsApp avec les créatrices,
                  vous est préparée et sécurisée. Retrait atelier (gratuit, 21)
                  ou livraison solide !
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <button
                  onClick={() => navigateTo("whatsapp")}
                  className="px-8 py-4 bg-brand-pink text-brand-bg font-black text-xs tracking-wider uppercase rounded-full hover:bg-brand-pink-hover transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-brand-bg fill-brand-bg" />
                  {homePageConfig.finalCta.primaryCta}
                </button>

                <button
                  onClick={() => navigateTo("custom")}
                  className="px-8 py-4 rounded-full border border-brand-pink/20 hover:bg-white/5 text-brand-cream text-xs font-mono tracking-wider uppercase font-extrabold transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Wand2 className="w-3.5 h-3.5 text-brand-purple" />
                  {homePageConfig.finalCta.secondaryCta}
                </button>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center justify-center font-mono text-[9px] text-brand-text-muted">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-brand-pink" /> Réponse humaine rapide
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-brand-pink" /> Devis gratuit sans obligation
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-brand-pink" /> Fabrication artisanale bourguignonne
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
