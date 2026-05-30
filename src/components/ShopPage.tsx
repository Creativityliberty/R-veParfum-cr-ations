import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Flame,
  Gem,
  Flower2,
  Image as ImageIcon,
  Cloud,
  Wind,
  Car,
  Gift,
  Compass,
  Home,
  Heart,
  Sun,
  Trees,
  Calendar,
  Search,
  SlidersHorizontal,
  X,
  ArrowRight,
  ChevronDown,
  MessageCircle,
  Check,
  Star,
  Info,
  Clock,
} from "lucide-react";

import { shopPageConfig } from "../config/shopPageConfig";
import { Product } from "../types";
import { SCENTS } from "../data";

interface ShopPageProps {
  setCurrentTab: (tab: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  scentFilter: string;
  setScentFilter: (scent: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  onlyCustomizable: boolean;
  setOnlyCustomizable: (val: boolean) => void;
  occasionFilter: string;
  setOccasionFilter: (occ: string) => void;
  setSelectedProduct: (p: Product | null) => void;
  filteredProducts: Product[];
  openScentGuide?: () => void;
}

// Icon mapper helper
const getFilterIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case "Sparkles":
      return <Sparkles className={className} />;
    case "Flame":
      return <Flame className={className} />;
    case "Gem":
      return <Gem className={className} />;
    case "Flower2":
      return <Flower2 className={className} />;
    case "Image":
      return <ImageIcon className={className} />;
    case "Cloud":
      return <Cloud className={className} />;
    case "Wind":
      return <Wind className={className} />;
    case "Car":
      return <Car className={className} />;
    case "Gift":
      return <Gift className={className} />;
    case "Home":
      return <Home className={className} />;
    case "Heart":
      return <Heart className={className} />;
    case "Calendar":
      return <Calendar className={className} />;
    case "Compass":
      return <Compass className={className} />;
    case "Sun":
      return <Sun className={className} />;
    case "Trees":
      return <Trees className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};

export default function ShopPage({
  setCurrentTab,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  scentFilter,
  setScentFilter,
  maxPrice,
  setMaxPrice,
  onlyCustomizable,
  setOnlyCustomizable,
  occasionFilter,
  setOccasionFilter,
  setSelectedProduct,
  filteredProducts,
  openScentGuide,
}: ShopPageProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  // Dynamic sensory glow color based on selected scent family
  const activeScentFamily = useMemo(() => {
    return shopPageConfig.filters.scentFamilies.find((f) => f.id === scentFilter);
  }, [scentFilter]);
  const scentGlowColor = activeScentFamily?.color || "#EFC6D2";

  // Compute active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "Tous") count++;
    if (searchQuery !== "") count++;
    if (scentFilter !== "Tous") count++;
    if (maxPrice !== 50) count++;
    if (onlyCustomizable) count++;
    if (occasionFilter !== "Tous") count++;
    return count;
  }, [
    selectedCategory,
    searchQuery,
    scentFilter,
    maxPrice,
    onlyCustomizable,
    occasionFilter,
  ]);

  // Handle resets
  const handleResetAll = () => {
    setSelectedCategory("Tous");
    setSearchQuery("");
    setScentFilter("Tous");
    setMaxPrice(50);
    setOnlyCustomizable(false);
    setOccasionFilter("Tous");
    setSortBy("featured");
  };

  // Sort products
  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    if (sortBy === "priceAsc") {
      return products.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "priceDesc") {
      return products.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return products.sort((a, b) => b.rating - a.rating);
    }
    // featured: Keep custom ordering as in list
    return products;
  }, [filteredProducts, sortBy]);

  // Generate customized WhatsApp URL
  const getWhatsappUrl = (product: Product) => {
    const number = shopPageConfig.brand.whatsappNumber;
    const imageUrl = product.image.startsWith("http")
      ? product.image
      : `https://reve-parfume.fr${product.image}`;
    const template = `Bonjour Mélanie et Christelle ! Je suis très intéressé(e) par votre création "${product.name}" (${product.priceText || `${product.price} €`}) vue sur votre boutique. J'aimerais en savoir plus, connaître la disponibilité ou lancer une commande. Merci beaucoup !\n\n• Aperçu : ${imageUrl}`;
    return `https://wa.me/${number}?text=${encodeURIComponent(template)}`;
  };

  // Scent quiz floating anchor navigation helper
  const handleScrollToQuiz = () => {
    const quizEl = document.getElementById("scent-finder-anchor");
    if (quizEl) {
      quizEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="pb-12" id="shop-root">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[50svh] lg:min-h-[75svh] -mt-24 md:-mt-28 flex flex-col justify-center overflow-hidden bg-brand-bg pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-brand-pink/10">
        {/* Abstract Dynamic Sensory Glow Overlays (Aura Sensorielle) */}
        <div 
          className="absolute top-0 right-0 w-[35rem] h-[35rem] rounded-full filter blur-[120px] pointer-events-none transition-all duration-[1200ms] ease-out" 
          style={{ backgroundColor: `${scentGlowColor}15` }}
        />
        <div 
          className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] rounded-full filter blur-[100px] pointer-events-none transition-all duration-[1200ms] ease-out" 
          style={{ backgroundColor: `${scentGlowColor}10` }}
        />

        {/* Soft floating particles / fragrance droplets effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-brand-pink/20 animate-pulse"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Content Box */}
        <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 mt-12 md:mt-16">
          <div className="lg:col-span-8 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-mono uppercase tracking-widest font-semibold">
              <Sparkles className="w-3 h-3 text-brand-pink animate-spin-slow" />
              {shopPageConfig.page.eyebrow}
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-semibold tracking-tight leading-none text-brand-cream">
              {shopPageConfig.page.title.split(" ").map((word, index) => {
                const cleanedWord = word.replace(
                  /[.,\/#!$%\^&\*;:{}=\-_`~()]/g,
                  "",
                );
                const shouldHighlight =
                  shopPageConfig.page.highlightedTitleWords.includes(
                    cleanedWord.toLowerCase(),
                  );
                return (
                  <span
                    key={index}
                    className={
                      shouldHighlight
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-pink-hover to-brand-purple italic font-light drop-shadow-md"
                        : ""
                    }
                  >
                    {word}{" "}
                  </span>
                );
              })}
            </h1>

            <p className="text-sm md:text-base text-brand-text-muted leading-relaxed max-w-2xl font-light">
              {shopPageConfig.page.subtitle}
            </p>

            {/* Quick Badges Row */}
            <div className="flex flex-wrap gap-2 pt-2">
              {shopPageConfig.hero.badges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase text-brand-cream/80 bg-white/5 border border-white/10"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-3">
              <button
                onClick={() => {
                  const target = document.getElementById(
                    "products-grid-section",
                  );
                  if (target)
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                }}
                className="px-6 py-3 bg-brand-pink text-brand-bg font-bold font-mono text-xs uppercase tracking-wider rounded-full hover:bg-brand-pink-hover transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:-translate-y-0.5"
              >
                {shopPageConfig.hero.primaryCta.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  window.open(
                    `https://wa.me/${shopPageConfig.brand.whatsappNumber}?text=${encodeURIComponent(shopPageConfig.guidanceBanner.whatsappMessage)}`,
                    "_blank",
                  );
                }}
                className="px-6 py-3 bg-brand-depth hover:bg-white/5 border border-brand-pink/20 text-brand-pink hover:text-brand-cream text-xs font-bold font-mono uppercase tracking-wider rounded-full transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                {shopPageConfig.hero.secondaryCta.label}
              </button>
            </div>
          </div>

          {/* Desktop Scent Atmosphere Preview Card */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="backdrop-blur-md bg-brand-bg/85 border border-brand-pink/15 p-6 rounded-[2rem] text-left space-y-4 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-pink/5 rounded-full filter blur-xl" />
              <div className="flex items-center gap-2 text-brand-pink">
                <Compass className="w-5 h-5 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest font-semibold">
                  {shopPageConfig.hero.floatingCard.title}
                </span>
              </div>
              <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                {shopPageConfig.hero.floatingCard.description}
              </p>
              <div className="space-y-2 pt-1 border-t border-brand-pink/5">
                {shopPageConfig.hero.floatingCard.scents.map((scent) => (
                  <div
                    key={scent}
                    className="flex items-center justify-between text-[11px] font-mono text-brand-cream"
                  >
                    <span>{scent}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 relative z-10">
        {/* 2. DYNAMIC CONTROL FILTER PANEL */}
        <section
          className="sticky top-20 z-30 transition-all duration-300"
          id="products-grid-section"
        >
          <div className="backdrop-blur-xl bg-brand-depth/90 border border-brand-pink/15 rounded-[2rem] p-4 shadow-2xl gap-4 flex flex-col md:flex-row items-center justify-between">
            {/* Left: Search input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-pink" />
              <input
                type="text"
                placeholder={shopPageConfig.filters.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3 bg-brand-bg/60 border border-brand-pink/10 rounded-full text-xs text-brand-cream placeholder-gray-500 focus:outline-none focus:border-brand-pink/40 focus:ring-1 focus:ring-brand-pink/20 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-pink transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Center: Desktop Filters quick trigger or list */}
            <div className="hidden lg:flex items-center gap-3 overflow-x-auto w-full max-w-[50%] px-2 py-1 scrollbar-none">
              {shopPageConfig.filters.categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                      isActive
                        ? "bg-brand-pink text-brand-bg font-extrabold shadow-md"
                        : "bg-brand-bg/40 text-brand-text-muted border border-brand-pink/5 hover:border-brand-pink/20 hover:text-brand-cream"
                    }`}
                  >
                    {getFilterIcon(cat.icon, "w-3.5 h-3.5")}
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Quick actions for dropdowns and mobile filter trigger */}
            <div className="grid grid-cols-2 gap-2 w-full lg:flex lg:items-center lg:gap-2 lg:justify-end lg:w-auto">
              {/* Sort Dropdown */}
              <div className="relative w-full lg:w-auto">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none pr-8 pl-4 py-2.5 bg-brand-bg/60 border border-brand-pink/10 rounded-full text-xs text-brand-cream font-mono cursor-pointer focus:outline-none focus:border-brand-pink/30 hover:border-brand-pink/20 transition-colors"
                >
                  {shopPageConfig.filters.sortOptions.map((opt) => (
                    <option
                      key={opt.id}
                      value={opt.id}
                      className="bg-brand-depth text-brand-cream text-xs"
                    >
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-pink pointer-events-none" />
              </div>

              {/* Mobile filter panel button */}
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="w-full justify-center lg:w-auto px-4 py-2.5 rounded-full bg-brand-bg/60 border border-brand-pink/10 hover:border-brand-pink/30 hover:text-brand-cream text-xs text-brand-pink font-mono tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-brand-pink" />
                Filtres
                {activeFiltersCount > 0 && (
                  <span className="w-4.5 h-4.5 rounded-full bg-brand-pink text-brand-bg text-[9px] font-extrabold flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 3. DENSE SCENTS, OCCASIONS & BUDGET FILTER WRAPPERS ON DESKTOP */}
        <section className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-[2rem] bg-brand-depth/40 border border-brand-pink/5">
            {/* Scent Families Row */}
            <div className="text-left space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-brand-text-muted uppercase tracking-widest block font-semibold">
                  {shopPageConfig.filters.labels.scentFamily}
                </span>
                {openScentGuide && (
                  <button
                    onClick={openScentGuide}
                    className="text-[10px] font-mono text-brand-pink hover:text-brand-pink-hover underline transition-colors cursor-pointer"
                  >
                    Voir la Carte des Senteurs
                  </button>
                )}
              </div>
              <div className="relative">
                <select
                  value={scentFilter}
                  onChange={(e) => setScentFilter(e.target.value)}
                  className="w-full appearance-none pr-8 pl-4 py-3 bg-brand-bg/50 border border-brand-pink/10 rounded-2xl text-xs text-brand-cream cursor-pointer focus:outline-none focus:border-brand-pink/30 transition-colors"
                >
                  {shopPageConfig.filters.scentFamilies.map((fam) => (
                    <option
                      key={fam.id}
                      value={fam.id}
                      className="bg-brand-depth text-brand-cream text-xs"
                    >
                      {fam.label} {fam.mood ? `— ${fam.mood}` : ""}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-pink pointer-events-none" />
              </div>
            </div>

            {/* Occasion Column */}
            <div className="text-left space-y-2.5">
              <span className="text-[10px] font-mono text-brand-text-muted uppercase tracking-widest block font-semibold">
                {shopPageConfig.filters.labels.occasion}
              </span>
              <div className="relative">
                <select
                  value={occasionFilter}
                  onChange={(e) => setOccasionFilter(e.target.value)}
                  className="w-full appearance-none pr-8 pl-4 py-3 bg-brand-bg/50 border border-brand-pink/10 rounded-2xl text-xs text-brand-cream cursor-pointer focus:outline-none focus:border-brand-pink/30 transition-colors"
                >
                  {shopPageConfig.filters.occasions.map((occ) => (
                    <option
                      key={occ.id}
                      value={occ.id}
                      className="bg-brand-depth text-brand-cream text-xs"
                    >
                      {occ.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-pink pointer-events-none" />
              </div>
            </div>

            {/* Budget / Custom Row combined */}
            <div className="text-left justify-between flex flex-col md:flex-row gap-6 items-center">
              {/* Price Slider */}
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-widest text-brand-text-muted">
                  <span>{shopPageConfig.filters.labels.budget}</span>
                  <span className="text-brand-pink font-bold">
                    {maxPrice} €
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="2.5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full bg-brand-bg rounded-lg appearance-none h-1 cursor-pointer accent-brand-pink border-none"
                />
              </div>

              {/* Custom Only Toggle */}
              <button
                onClick={() => setOnlyCustomizable(!onlyCustomizable)}
                className={`px-4 py-3 rounded-2xl border transition-all text-xs font-mono font-medium tracking-wider uppercase shrink-0 w-full md:w-auto h-11 flex items-center justify-center gap-2 cursor-pointer ${
                  onlyCustomizable
                    ? "bg-brand-pink/15 text-brand-pink border-brand-pink/35 shadow-sm"
                    : "bg-brand-bg/40 border-brand-pink/5 hover:border-brand-pink/20 text-brand-text-muted hover:text-brand-cream"
                }`}
              >
                <Check
                  className={`w-3.5 h-3.5 shrink-0 transition-opacity ${onlyCustomizable ? "opacity-100" : "opacity-20"}`}
                />
                Sur-mesure
              </button>
            </div>
          </div>
        </section>

        {/* 4. ACTIVE REMOVABLE FILTER BADGES */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 px-2 py-1 text-left">
            <span className="text-[10px] font-mono text-brand-text-muted uppercase tracking-widest mr-2">
              Filtres actifs :
            </span>

            {selectedCategory !== "Tous" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/25 text-xs text-brand-cream">
                Catégorie : {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("Tous")}
                  className="p-0.5 hover:text-brand-pink transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery !== "" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/25 text-xs text-brand-cream">
                Texte : "{searchQuery}"
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-0.5 hover:text-brand-pink transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {scentFilter !== "Tous" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/25 text-xs text-brand-cream">
                Senteur : {scentFilter}
                <button
                  onClick={() => setScentFilter("Tous")}
                  className="p-0.5 hover:text-brand-pink transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {occasionFilter !== "Tous" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/25 text-xs text-brand-cream">
                Occasion : {occasionFilter}
                <button
                  onClick={() => setOccasionFilter("Tous")}
                  className="p-0.5 hover:text-brand-pink transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {maxPrice !== 50 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/25 text-xs text-brand-cream">
                Prix max : {maxPrice} €
                <button
                  onClick={() => setMaxPrice(50)}
                  className="p-0.5 hover:text-brand-pink transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {onlyCustomizable && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/25 text-xs text-brand-cream">
                Personnalisable uniquement
                <button
                  onClick={() => setOnlyCustomizable(false)}
                  className="p-0.5 hover:text-brand-pink transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={handleResetAll}
              className="text-[10px] font-mono text-brand-pink border border-brand-pink/20 hover:border-brand-pink bg-brand-pink/5 hover:bg-brand-pink hover:text-brand-bg transition-all px-3 py-1 rounded-full cursor-pointer ml-auto"
            >
              Effacer tout ({activeFiltersCount})
            </button>
          </div>
        )}

        {/* 5. PRODUCT DISCOVERY GALLERY GRID */}
        <section className="space-y-6">
          <div className="flex justify-between items-center px-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-brand-text-muted">
              Sélection : {sortedProducts.length}{" "}
              {sortedProducts.length > 1
                ? "créations trouvées"
                : "création trouvée"}
            </span>
            {activeFiltersCount > 0 && sortedProducts.length === 0 && (
              <span
                className="text-xs text-brand-pink underline cursor-pointer"
                onClick={handleResetAll}
              >
                Voir tout le catalogue
              </span>
            )}
          </div>

          {sortedProducts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {sortedProducts.map((product) => (
                  <motion.article
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35 }}
                    key={product.id}
                    className="group relative backdrop-blur-md bg-brand-depth/45 border border-brand-pink/10 hover:border-brand-pink/30 rounded-[2rem] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-lg"
                  >
                    {/* Image container & Badges */}
                    <div className="relative aspect-[4/5] overflow-hidden shrink-0 bg-brand-bg border-b border-brand-pink/5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                      />

                      {/* Hover Liquid Glow Layer */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/75 via-brand-bg/5 to-transparent opacity-60 pointer-events-none" />

                      {/* Preorder badge */}
                      {product.hasPreorderBadge && (
                        <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-brand-bg/90 backdrop-blur-md border border-brand-pink/20 font-mono text-[9px] uppercase tracking-wider text-brand-pink font-semibold flex items-center gap-1.5 shadow-md">
                          <Clock className="w-3 h-3 text-brand-pink" />
                          Précommande
                        </span>
                      )}

                      {/* Handmade Tag */}
                      {!product.hasPreorderBadge &&
                        product.hasHandmadeBadge && (
                          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-brand-bg/90 backdrop-blur-md border border-brand-pink/15 font-mono text-[9px] uppercase tracking-wider text-amber-300 font-semibold flex items-center gap-1 shadow-md">
                            <Sparkles className="w-3 h-3 text-amber-300" />
                            Atelier main
                          </span>
                        )}

                      {/* Customizable badge */}
                      {product.customizable && (
                        <span className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-brand-pink text-brand-bg font-mono text-[9px] uppercase tracking-widest font-extrabold shadow-md">
                          Personnalisable
                        </span>
                      )}
                    </div>

                    {/* Text Details Area */}
                    <div className="p-6 flex-1 flex flex-col justify-between text-left space-y-4">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-pink block font-semibold">
                          {product.category}
                        </span>
                        <h3 className="font-serif text-xl font-bold text-brand-cream group-hover:text-brand-pink transition-colors leading-snug">
                          {product.name}
                        </h3>
                        <p className="text-xs text-brand-text-muted font-light leading-relaxed line-clamp-2">
                          {product.description}
                        </p>

                        {/* Display scents in small pill wraps */}
                        {product.scents && product.scents.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {product.scents.slice(0, 3).map((s) => (
                              <span
                                key={s}
                                className="px-2 py-0.5 rounded bg-brand-pink/5 border border-brand-pink/10 text-[9px] font-mono text-brand-cream/80"
                              >
                                {s}
                              </span>
                            ))}
                            {product.scents.length > 3 && (
                              <span className="text-[9px] font-mono text-brand-pink self-center">
                                +{product.scents.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Price, Action controls */}
                      <div className="pt-4 border-t border-brand-pink/5 flex items-center justify-between gap-2 shrink-0">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-brand-text-muted block">
                            Tarif
                          </span>
                          <span className="font-serif text-base font-bold text-brand-cream block leading-tight">
                            {product.priceText || `${product.price} €`}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          {/* Quick View Button */}
                          <button
                            onClick={() => setSelectedProduct(product)}
                            className="w-10 h-10 rounded-full border border-brand-pink/15 flex items-center justify-center text-brand-pink hover:bg-brand-pink/15 hover:border-brand-pink/45 hover:text-brand-cream transition-all cursor-pointer shadow-md"
                            title="Fiche produit détaillée"
                          >
                            <Info className="w-4 h-4" />
                          </button>

                          {/* WhatsApp CTA Button */}
                          <a
                            href={getWhatsappUrl(product)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full bg-brand-pink text-brand-bg flex items-center justify-center hover:bg-brand-pink-hover transition-all cursor-pointer shadow-md"
                            title="Commander par WhatsApp"
                          >
                            <MessageCircle className="w-4.5 h-4.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            /* EMPTY STATE */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-md bg-brand-depth/40 border border-brand-pink/10 p-12 md:p-16 rounded-[2.5rem] text-center max-w-xl mx-auto space-y-6 shadow-xl"
            >
              <div className="w-16 h-16 rounded-3xl bg-brand-pink/10 border border-brand-pink/15 flex items-center justify-center mx-auto text-brand-pink">
                <Sparkles className="w-8 h-8 animate-pulse text-brand-pink" />
              </div>

              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-brand-cream">
                  {shopPageConfig.emptyState.title}
                </h3>
                <p className="text-sm text-brand-text-muted max-w-sm mx-auto font-light leading-relaxed">
                  {shopPageConfig.emptyState.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleResetAll}
                  className="px-6 py-3 rounded-full bg-brand-pink text-brand-bg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md hover:bg-brand-pink-hover"
                >
                  {shopPageConfig.emptyState.cta}
                </button>

                <a
                  href={`https://wa.me/${shopPageConfig.brand.whatsappNumber}?text=${encodeURIComponent(shopPageConfig.guidanceBanner.whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-brand-depth border border-brand-pink/20 hover:border-brand-pink/40 text-brand-pink text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  {shopPageConfig.emptyState.whatsappCta}
                </a>
              </div>
            </motion.div>
          )}
        </section>

        {/* 6. SENSORY GUIDANCE BANNER */}
        <section className="relative overflow-hidden p-8 md:p-12 rounded-[2.5rem] bg-brand-depth/45 border border-brand-pink/15 shadow-2xl text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/5 rounded-full filter blur-[70px] pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-brand-purple/5 rounded-full filter blur-[70px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-pink font-semibold block">
                Atmosphère & Conseils
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-cream leading-tight">
                {shopPageConfig.guidanceBanner.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-muted font-light leading-relaxed max-w-3xl">
                {shopPageConfig.guidanceBanner.description}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch w-full">
              <a
                href={`https://wa.me/${shopPageConfig.brand.whatsappNumber}?text=${encodeURIComponent(shopPageConfig.guidanceBanner.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-brand-pink text-brand-bg text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer hover:bg-brand-pink-hover shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                {shopPageConfig.guidanceBanner.primaryCta}
              </a>

              <button
                onClick={handleScrollToQuiz}
                className="px-6 py-3 rounded-full bg-brand-depth border border-brand-pink/20 hover:border-brand-pink/45 text-brand-pink text-xs font-bold uppercase tracking-wider transition-all cursor-pointer hover:bg-white/5 flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Lancer le Guide Senteur
              </button>
            </div>
          </div>
        </section>

        {/* 7. MOBILES FILTERS DRAWER */}
        <AnimatePresence>
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
              {/* Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileFiltersOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />

              {/* Panel */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full max-w-sm bg-brand-bg border-l border-brand-pink/15 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto"
              >
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex justify-between items-center pb-4 border-b border-brand-pink/10">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-brand-pink" />
                      <h3 className="font-serif text-xl font-bold text-brand-cream">
                        Filtres de l'Atelier
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsMobileFiltersOpen(false)}
                      className="p-1 hover:text-brand-pink transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Filters details */}
                  <div className="space-y-6 text-left">
                    {/* Category Filter */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-brand-pink font-semibold">
                        {shopPageConfig.filters.labels.category}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {shopPageConfig.filters.categories.map((cat) => {
                          const isActive = selectedCategory === cat.id;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => setSelectedCategory(cat.id)}
                              className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                                isActive
                                  ? "bg-brand-pink text-brand-bg font-extrabold shadow-sm"
                                  : "bg-brand-depth/50 text-brand-text-muted border border-brand-pink/5 hover:border-brand-pink/20 hover:text-brand-cream"
                              }`}
                            >
                              {cat.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Scent Family Filter */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-brand-pink font-semibold">
                          {shopPageConfig.filters.labels.scentFamily}
                        </h4>
                        {openScentGuide && (
                          <button
                            onClick={() => {
                              setIsMobileFiltersOpen(false);
                              openScentGuide();
                            }}
                            className="text-[10px] font-mono text-brand-pink hover:text-brand-pink-hover underline cursor-pointer"
                          >
                            Carte des Senteurs
                          </button>
                        )}
                      </div>
                      <select
                        value={scentFilter}
                        onChange={(e) => setScentFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-depth border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-colors"
                      >
                        {shopPageConfig.filters.scentFamilies.map((fam) => (
                          <option key={fam.id} value={fam.id}>
                            {fam.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Occasion Filter */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-widest text-brand-pink font-semibold">
                        {shopPageConfig.filters.labels.occasion}
                      </h4>
                      <select
                        value={occasionFilter}
                        onChange={(e) => setOccasionFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-brand-depth border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-colors"
                      >
                        {shopPageConfig.filters.occasions.map((occ) => (
                          <option key={occ.id} value={occ.id}>
                            {occ.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Budget Slider */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-brand-pink font-semibold">
                          {shopPageConfig.filters.labels.budget}
                        </h4>
                        <span className="text-xs font-mono text-brand-pink font-bold">
                          {maxPrice} €
                        </span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        step="2.5"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full bg-brand-depth rounded-lg appearance-none h-1 cursor-pointer accent-brand-pink"
                      />
                    </div>

                    {/* Customizable Switch */}
                    <div className="pt-2">
                      <button
                        onClick={() => setOnlyCustomizable(!onlyCustomizable)}
                        className={`w-full px-4 py-3.5 rounded-xl border text-center transition-all text-xs font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer ${
                          onlyCustomizable
                            ? "bg-brand-pink/15 text-brand-pink border-brand-pink/30"
                            : "bg-brand-depth border-brand-pink/5 text-brand-text-muted hover:text-brand-cream hover:border-brand-pink/15"
                        }`}
                      >
                        <Check
                          className={`w-3.5 h-3.5 transition-opacity ${onlyCustomizable ? "opacity-100" : "opacity-25"}`}
                        />
                        Créations personnalisables uniquement
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reset/Apply Container */}
                <div className="pt-6 border-t border-brand-pink/10 flex gap-2">
                  <button
                    onClick={handleResetAll}
                    className="flex-1 py-3 border border-brand-pink/10 hover:border-brand-pink/25 text-brand-pink font-bold font-mono text-xs uppercase tracking-wider rounded-full transition-colors cursor-pointer"
                  >
                    Effacer tout
                  </button>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="flex-1 py-3 bg-brand-pink text-brand-bg font-extrabold font-mono text-xs uppercase tracking-wider rounded-full hover:bg-brand-pink-hover transition-colors cursor-pointer"
                  >
                    Voir ({sortedProducts.length})
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 8. SHOP FINAL CTA BLOCK */}
        <section
          className="bg-brand-depth/40 border-t border-brand-pink/10 py-16 rounded-[2.5rem]"
          id="shop-final-cta"
        >
          <div className="max-w-4xl mx-auto text-center space-y-6 px-6">
            <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold block">
              {shopPageConfig.finalCta.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream max-w-2xl mx-auto leading-tight">
              {shopPageConfig.finalCta.title}
            </h2>
            <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed font-light max-w-xl mx-auto">
              {shopPageConfig.finalCta.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-3">
              <button
                onClick={() => {
                  setCurrentTab("personnalisation");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-8 py-4 bg-brand-pink text-brand-bg font-bold font-mono text-xs uppercase tracking-wider rounded-full hover:bg-brand-pink-hover transition-all cursor-pointer shadow-lg hover:-translate-y-0.5"
              >
                {shopPageConfig.finalCta.primaryCta}
              </button>

              <a
                href={`https://wa.me/${shopPageConfig.brand.whatsappNumber}?text=${encodeURIComponent("Bonjour Mélanie et Christelle ! J'ai visité votre boutique de créations et je souhaite échanger avec vous pour réaliser une création parfumée sur-mesure pour un projet ou un cadeau.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-brand-depth text-brand-cream hover:bg-white/5 border border-brand-pink/20 transition-all text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4 text-brand-pink" />
                {shopPageConfig.finalCta.secondaryCta}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
