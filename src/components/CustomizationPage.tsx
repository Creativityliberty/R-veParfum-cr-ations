import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import {
  personalizationPageConfig,
  PersonalizationFormState,
} from "../config/personalizationPageConfig";

// Reusable dynamic icon helper
const DynamicIcon = ({
  name,
  className = "w-5 h-5",
}: {
  name: string;
  className?: string;
}) => {
  const IconComp = (Icons as any)[name];
  if (!IconComp) {
    return <Icons.Sparkles className={className} />;
  }
  return <IconComp className={className} />;
};

// Custom toast / validation trigger prop callback
interface CustomizationPageProps {
  onSuccess: (msg: string) => void;
  initialProductType?: string; // Allow pre-selecting from boutique
}

export default function CustomizationPage({
  onSuccess,
  initialProductType = "",
}: CustomizationPageProps) {
  const config = personalizationPageConfig;
  const composerRef = useRef<HTMLDivElement>(null);

  // Form State
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<PersonalizationFormState>({
    creationType: initialProductType || "",
    occasion: "",
    scentMood: "",
    colorMood: "",
    quantity: "",
    desiredDate: "",
    recipientName: "",
    customMessage: "",
    themeDetails: "",
    customerName: "",
    customerPhone: "",
  });

  // Track copied status for pre-filled message
  const [copied, setCopied] = useState(false);
  // FAQ active indexes
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // If initialProductType is updated via props, apply it
  useEffect(() => {
    if (initialProductType) {
      setFormState((prev) => ({ ...prev, creationType: initialProductType }));
    }
  }, [initialProductType]);

  // Derived values for completion score
  const getCompletionScore = () => {
    let score = 0;
    if (formState.creationType) score += 20;
    if (formState.occasion) score += 20;
    if (formState.scentMood) score += 20;
    if (formState.colorMood) score += 15;
    if (
      formState.quantity ||
      formState.desiredDate ||
      formState.recipientName ||
      formState.customMessage ||
      formState.themeDetails
    ) {
      score += 15;
    }
    if (formState.customerName || formState.customerPhone) score += 10;
    return score;
  };

  const score = getCompletionScore();

  // Selected config items for live atelier summary
  const selectedCreation = config.creationTypes.find(
    (it) => it.id === formState.creationType,
  );
  const selectedOccasion = config.occasions.find(
    (it) => it.id === formState.occasion,
  );
  const selectedScentMood = config.scentMoods.find(
    (it) => it.id === formState.scentMood,
  );
  const selectedColorMood = config.colorMoods.find(
    (it) => it.id === formState.colorMood,
  );

  // WhatsApp Message Builder helper
  const buildWhatsappMessage = () => {
    let imageUrl = "";
    if (formState.creationType) {
      // Find matching image URL from config (if it's one of the event config items or customisation items with images)
      // Note: Personalization config doesn't have an `image` right now, so we can use a generic brand image if none is present
      imageUrl = `\n• Aperçu : https://reve-parfume.fr/images/bougie.jpg`;
    }

    return `Bonjour, je souhaite créer une demande personnalisée chez ${config.brand.name}.

• Type de création : ${selectedCreation?.label || "À définir ensemble"}${imageUrl}
• Occasion : ${selectedOccasion?.label || "À définir ensemble"}
• Ambiance olfactive : ${selectedScentMood?.label || "À définir ensemble"}
• Couleurs / style : ${selectedColorMood?.label || "À définir ensemble"}
• Quantité souhaitée : ${formState.quantity || "À préciser de vive voix"}
• Date souhaitée : ${formState.desiredDate || "À préciser"}
• Destinataire : ${formState.recipientName || "Non spécifié"}
• Message à intégrer : ${formState.customMessage || "Aucun pour le moment"}
• Détails / thème : ${formState.themeDetails || "À définir ensemble"}

Mes coordonnées :
• Prénom / Nom : ${formState.customerName || "Non précisé"}
• Téléphone : ${formState.customerPhone || "Non précisé"}

Pouvez-vous me conseiller et me confirmer ce qui est possible ?`.trim();
  };

  const currentMessage = buildWhatsappMessage();
  const encodedMessage = encodeURIComponent(currentMessage);
  const whatsappUrl = `https://wa.me/${config.brand.whatsappNumber}?text=${encodedMessage}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    onSuccess(
      "Message copié dans le presse-papiers ! Vous pouvez le coller sur WhatsApp.",
    );
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendRequest = () => {
    onSuccess(
      "Préparation de votre fiche atelier... Redirection vers WhatsApp.",
    );
    window.open(whatsappUrl, "_blank", "noreferrer,noopener");
  };

  // Scroll smoothly to composer
  const scrollToComposer = () => {
    if (composerRef.current) {
      composerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Step transitions config
  const stepTransition = {
    initial: { opacity: 0, x: 20, filter: "blur(4px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -20, filter: "blur(4px)" },
    transition: { duration: 0.35, ease: "easeOut" },
  };

  return (
    <div className="pb-16" id="personalization-view-root">
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative min-h-[50svh] lg:min-h-[75svh] -mt-24 md:-mt-28 flex flex-col justify-center overflow-hidden bg-brand-bg pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-brand-pink/10">
        {/* Background Visual Assets */}
        <div className="absolute inset-0 z-0">
          <img
            src={config.hero.media.fallbackImage}
            alt="Atelier perfume art setup"
            className="w-full h-full object-cover opacity-20 filter saturate-[0.80]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/50 to-brand-bg/85" />
          <div className="absolute top-[30%] left-[20%] w-[25rem] h-[25rem] bg-brand-pink/10 rounded-full filter blur-[100px] pointer-events-none animate-pulse" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12 md:mt-16">
          {/* Hero Left Content Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-pink animate-ping" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-pink font-bold">
                {config.page.eyebrow}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black text-brand-cream leading-[1.1] tracking-tight">
              Composez une{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink via-brand-wax to-brand-pink font-light italic">
                création parfumée
              </span>{" "}
              qui vous ressemble.
            </h1>

            <p className="text-sm md:text-base text-brand-text-muted leading-relaxed max-w-xl font-light">
              {config.page.subtitle}
            </p>

            <p className="text-xs font-mono text-brand-pink/80 flex items-center gap-2">
              <Icons.ShieldCheck className="w-4 h-4 text-brand-pink shrink-0" />
              {config.page.helperText}
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={scrollToComposer}
                className="px-8 py-3.5 bg-brand-pink text-brand-bg font-bold text-xs tracking-wider uppercase rounded-full hover:bg-brand-pink-hover transition-all duration-300 shadow-xl cursor-pointer"
              >
                {config.hero.primaryCta.label}
              </button>
              <a
                href={`https://wa.me/${config.brand.whatsappNumber}?text=Bonjour, je souhaite parler d'une création sur mesure avec l'atelier.`}
                target="_blank"
                rel="noreferrer noopener"
                className="px-6 py-3.5 rounded-full bg-brand-depth border border-brand-pink/20 text-brand-cream hover:border-brand-pink transition-all text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Icons.MessageCircle className="w-4 h-4 text-brand-pink" />
                {config.hero.secondaryCta.label}
              </a>
            </div>

            {/* Badges bar */}
            <div className="pt-8 border-t border-brand-pink/10 flex flex-wrap gap-x-6 gap-y-3">
              {config.hero.badges.map((badge, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-brand-text-muted"
                >
                  <span className="w-1 h-1 rounded-full bg-brand-pink" />
                  <span className="font-mono">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Right Floating Card Column (Desktop Only) */}
          <div className="hidden lg:col-span-5 lg:flex justify-end">
            <div className="p-8 w-full max-w-sm rounded-[2rem] bg-brand-depth/80 border border-brand-pink/15 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-pink/5 rounded-full filter blur-xl" />

              <div className="flex justify-between items-center">
                <h3 className="text-xs uppercase tracking-wider text-brand-pink font-mono font-bold">
                  {config.hero.floatingCard.title}
                </h3>
                <span className="p-2 bg-brand-bg/60 rounded-full border border-brand-pink/10">
                  <Icons.Palette className="w-4 h-4 text-brand-pink" />
                </span>
              </div>

              <div className="space-y-4">
                {config.hero.floatingCard.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-bg/80 border border-brand-pink/15 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0" />
                    </div>
                    <span className="text-xs text-brand-cream font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-brand-pink/5 flex items-center gap-2 text-[10px] font-mono text-brand-text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Atelier ouvert aux demandes locales</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        {/* ==================== 2. COMPOSER INTRO ==================== */}
        <section className="text-center max-w-5xl mx-auto space-y-10">
          <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-cream tracking-tight">
            {config.composerIntro.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.composerIntro.cards.map((card, i) => (
              <div
                key={i}
                className="p-8 bg-brand-depth/50 border border-brand-pink/10 rounded-[2rem] text-center space-y-4 hover:border-brand-pink/35 transition-all duration-300 backdrop-blur-sm group"
              >
                <div className="mx-auto w-12 h-12 rounded-full bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center group-hover:bg-brand-pink/20 transition-all duration-300">
                  <DynamicIcon
                    name={card.icon}
                    className="w-5 h-5 text-brand-pink"
                  />
                </div>
                <h3 className="font-serif font-bold text-lg text-brand-cream">
                  {card.title}
                </h3>
                <p className="text-xs text-brand-text-muted leading-relaxed font-light">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 3. PERSONALIZATION COMPOSER ==================== */}
        <section
          ref={composerRef}
          className="scroll-mt-28 space-y-6"
          id="personalization-composer"
        >
          {/* Step Stepper Header (Timeline View) */}
          <div className="max-w-4xl mx-auto px-4 py-8 mb-4">
            <div className="relative flex items-center justify-between w-full">
              {/* Connecting Line background */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-brand-pink/10 z-0" />
              
              {/* Progress Line */}
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-brand-pink z-0 transition-all duration-500 ease-out" 
                style={{ width: `${(currentStep / (config.steps.length - 1)) * 100}%` }}
              />

              {config.steps.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentStep(idx)}
                    className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
                  >
                    {/* Circle Indicator */}
                    <div 
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-350 text-xs font-mono font-bold shadow-md ${
                        isActive 
                          ? "bg-brand-pink border-brand-pink text-brand-bg scale-[1.08]" 
                          : isCompleted 
                            ? "bg-brand-depth border-brand-pink text-brand-pink"
                            : "bg-brand-depth border-brand-pink/20 text-brand-text-muted hover:border-brand-pink/55"
                      }`}
                    >
                      {isCompleted ? <Icons.Check className="w-4 h-4" /> : idx + 1}
                    </div>
                    {/* Text Label (Hidden on small mobile screens to save space) */}
                    <span 
                      className={`absolute top-11 text-[9px] font-mono uppercase tracking-widest font-semibold whitespace-nowrap transition-all hidden sm:block ${
                        isActive ? "text-brand-pink font-extrabold" : "text-brand-text-muted group-hover:text-brand-cream"
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Layout Grid */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Panel: Active Step Form */}
            <div className="lg:col-span-8 p-6 md:p-8 rounded-[2rem] bg-brand-depth/50 border border-brand-pink/10 min-h-[500px] flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-[-2%] right-[-5%] w-48 h-48 bg-brand-pink/5 rounded-full filter blur-3xl pointer-events-none" />

              <div className="space-y-6">
                {/* Active Step Indicator */}
                <div className="flex justify-between items-center border-b border-brand-pink/5 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-brand-pink uppercase tracking-widest font-bold">
                      Étape {currentStep + 1} sur {config.steps.length}
                    </span>
                    <p className="text-lg font-serif font-bold text-brand-cream">
                      {config.steps[currentStep].desc}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-brand-text-muted">
                      Progression
                    </span>
                    <div className="w-32 bg-brand-bg h-1.5 rounded-full overflow-hidden mt-1.5 border border-brand-pink/5">
                      <div
                        className="bg-brand-pink h-full transition-all duration-500 ease-out"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Step Forms */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    variants={stepTransition}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6 pt-2"
                  >
                    {/* STEP 1: CREATION TYPE SELECTOR */}
                    {currentStep === 0 && (
                      <div className="space-y-4">
                        <p className="text-xs text-brand-text-muted">
                          Choisissez le socle de votre projet olfactif. Ces
                          bases seront adaptées à votre goût.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {config.creationTypes.map((type) => {
                            const isSelected =
                              formState.creationType === type.id;
                            return (
                              <button
                                key={type.id}
                                onClick={() =>
                                  setFormState((prev) => ({
                                    ...prev,
                                    creationType: type.id,
                                  }))
                                }
                                className={`p-5 rounded-2xl flex flex-col text-left transition-all duration-300 relative border overflow-hidden cursor-pointer ${
                                  isSelected
                                    ? "bg-brand-pink text-brand-bg border-brand-pink scale-[1.01] shadow-lg"
                                    : "bg-brand-bg/40 text-brand-cream border-brand-pink/10 hover:border-brand-pink/30 hover:bg-brand-bg/60"
                                }`}
                              >
                                <div className="flex items-center justify-between w-full mb-3">
                                  <div
                                    className={`p-3.5 rounded-full ${isSelected ? "bg-brand-bg/25 text-brand-bg" : "bg-brand-pink/10 text-brand-pink"}`}
                                  >
                                    <DynamicIcon
                                      name={type.icon}
                                      className="w-5 h-5"
                                    />
                                  </div>
                                  {isSelected && (
                                    <div className="bg-brand-bg rounded-full p-1 text-brand-pink shadow-md">
                                      <Icons.Check className="w-3.5 h-3.5" />
                                    </div>
                                  )}
                                </div>
                                <span className="font-serif font-bold text-base block mb-1">
                                  {type.label}
                                </span>
                                <span
                                  className={`text-xs font-light leading-relaxed ${isSelected ? "text-brand-bg/85" : "text-brand-text-muted"}`}
                                >
                                  {type.desc}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: OCCASION SELECTOR */}
                    {currentStep === 1 && (
                      <div className="space-y-4">
                        <p className="text-xs text-brand-text-muted">
                          Le contexte idéal nous aide à imaginer le thème, les
                          finitions artistiques et la décoration florale
                          adéquate.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {config.occasions.map((occ) => {
                            const isSelected = formState.occasion === occ.id;
                            return (
                              <button
                                key={occ.id}
                                onClick={() =>
                                  setFormState((prev) => ({
                                    ...prev,
                                    occasion: occ.id,
                                  }))
                                }
                                className={`p-4 rounded-xl flex items-center gap-3.5 text-left transition-all duration-300 border cursor-pointer ${
                                  isSelected
                                    ? "bg-brand-pink text-brand-bg border-brand-pink scale-[1.01] shadow-lg"
                                    : "bg-brand-bg/40 text-brand-cream border-brand-pink/10 hover:border-brand-pink/30 hover:bg-brand-bg/60"
                                }`}
                              >
                                <div
                                  className={`p-2.5 rounded-full ${isSelected ? "bg-brand-bg/25 text-brand-bg" : "bg-brand-pink/10 text-brand-pink"}`}
                                >
                                  <DynamicIcon
                                    name={occ.icon}
                                    className="w-4 h-4"
                                  />
                                </div>
                                <span className="font-serif font-bold text-sm">
                                  {occ.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Event Context Box */}
                        {(formState.occasion === "mariage" ||
                          formState.occasion === "bapteme") && (
                          <div className="p-4 rounded-xl bg-brand-pink/5 border border-brand-pink/20 text-xs text-brand-pink/95 flex gap-3.5 items-start">
                            <Icons.Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold uppercase block mb-0.5 tracking-wider">
                                Un Événement Approchant ?
                              </span>
                              Pour les quantités importantes ou les célébrations
                              à date cible impérative, l'atelier pourra vous
                              proposer un devis dégressif clair et vous guider
                              sur les dragées fleuries.
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* STEP 3: SCENT MOOD */}
                    {currentStep === 2 && (
                      <div className="space-y-4">
                        <p className="text-xs text-brand-text-muted">
                          Quelle atmosphère olfactive souhaitez-vous diffuser ?
                          C'est le point d'ancrage émotionnel de votre création.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {config.scentMoods.map((scent) => {
                            const isSelected = formState.scentMood === scent.id;
                            return (
                              <button
                                key={scent.id}
                                onClick={() =>
                                  setFormState((prev) => ({
                                    ...prev,
                                    scentMood: scent.id,
                                  }))
                                }
                                className={`p-5 rounded-2xl flex flex-col text-left transition-all duration-300 border relative cursor-pointer ${
                                  isSelected
                                    ? "bg-brand-pink text-brand-bg border-brand-pink scale-[1.01] shadow-lg"
                                    : "bg-brand-bg/40 text-brand-cream border-brand-pink/10 hover:border-brand-pink/30 hover:bg-brand-bg/60"
                                }`}
                              >
                                <div className="flex items-center justify-between w-full mb-2">
                                  <span
                                    className={`text-[10px] font-mono uppercase tracking-widest font-bold ${isSelected ? "text-brand-bg/80" : "text-brand-pink"}`}
                                  >
                                    {scent.mood}
                                  </span>
                                  {isSelected && (
                                    <Icons.Check className="w-4 h-4 text-brand-bg" />
                                  )}
                                </div>
                                <span className="font-serif font-extrabold text-base block mb-1">
                                  {scent.label}
                                </span>
                                <span
                                  className={`text-xs font-light leading-relaxed ${isSelected ? "text-brand-bg/85" : "text-brand-text-muted"}`}
                                >
                                  {scent.desc}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* STEP 4: STYLE & DETAILS FORM */}
                    {currentStep === 3 && (
                      <div className="space-y-6">
                        <p className="text-xs text-brand-text-muted">
                          Sélectionnez une première palette chromatique et
                          déterminez vos souhaits d'ajustements esthétiques
                          (rubans de lin, mots gravés...).
                        </p>

                        {/* Color swatch selector */}
                        <div className="space-y-2">
                          <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider">
                            Univers de Couleurs Souhaité
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {config.colorMoods.map((col) => {
                              const isSelected = formState.colorMood === col.id;
                              return (
                                <button
                                  key={col.id}
                                  type="button"
                                  onClick={() =>
                                    setFormState((prev) => ({
                                      ...prev,
                                      colorMood: col.id,
                                    }))
                                  }
                                  className={`p-3 rounded-xl border flex items-center gap-3 transition-all text-left cursor-pointer ${
                                    isSelected
                                      ? "border-brand-pink bg-brand-pink/10 text-brand-cream font-medium"
                                      : "border-brand-pink/10 bg-brand-bg/30 text-brand-text-muted hover:border-brand-pink/30 hover:text-brand-cream"
                                  }`}
                                >
                                  {col.hex ? (
                                    <div
                                      className="w-5 h-5 rounded-full border border-brand-pink/15 shrink-0 shadow-inner"
                                      style={{ backgroundColor: col.hex }}
                                    />
                                  ) : (
                                    <div
                                      className={`w-5 h-5 rounded-full shrink-0 shadow-inner ${col.gradient}`}
                                    />
                                  )}
                                  <span className="text-xs truncate">
                                    {col.label}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Inputs grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-2">
                              Quantité souhaitée (Approximatif)
                            </label>
                            <input
                              type="text"
                              placeholder="Ex: 1 pièce, ou 45 suspensions d'invités..."
                              value={formState.quantity}
                              onChange={(e) =>
                                setFormState((prev) => ({
                                  ...prev,
                                  quantity: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream placeholder-gray-600 focus:outline-none focus:border-brand-pink transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-2">
                              Date d'événement souhaitée
                            </label>
                            <input
                              type="text"
                              placeholder="Ex: Courant Juillet, ou avant le 15.08"
                              value={formState.desiredDate}
                              onChange={(e) =>
                                setFormState((prev) => ({
                                  ...prev,
                                  desiredDate: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream placeholder-gray-600 focus:outline-none focus:border-brand-pink transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-2">
                              Destinataire du Cadeau (Optionnel)
                            </label>
                            <input
                              type="text"
                              placeholder="Ex: Ma maman Chantal, ou Pour moi-même"
                              value={formState.recipientName}
                              onChange={(e) =>
                                setFormState((prev) => ({
                                  ...prev,
                                  recipientName: e.target.value,
                                }))
                              }
                              className="w-full px-4 py-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream placeholder-gray-600 focus:outline-none focus:border-brand-pink transition-colors"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-2">
                            Message à imprimer sur l'étiquette (Optionnel)
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: 'Baptême de Maël - 14 Juin 2026', ou un doux Merci..."
                            value={formState.customMessage}
                            onChange={(e) =>
                              setFormState((prev) => ({
                                ...prev,
                                customMessage: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream placeholder-gray-600 focus:outline-none focus:border-brand-pink transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-2">
                            Précisez vos directives esthétiques ou thèmes requis
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Ex: Thème champêtre fleuri blanc/or, ruban de lin fin marbré d'or, suspensions cœurs à la cire et boutons de roses..."
                            value={formState.themeDetails}
                            onChange={(e) =>
                              setFormState((prev) => ({
                                ...prev,
                                themeDetails: e.target.value,
                              }))
                            }
                            className="w-full px-4 py-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream placeholder-gray-600 focus:outline-none focus:border-brand-pink transition-colors resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* STEP 5: CUSTOMER INFORMATION */}
                    {currentStep === 4 && (
                      <div className="space-y-6">
                        <p className="text-xs text-brand-text-muted">
                          Indiquez vos cordonnées pour que Christelle et Mélanie
                          puissent facilement relire votre fiche atelier et vous
                          répondre avec attention.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-2">
                              Votre Nom &amp; Prénom
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-pink/40">
                                <Icons.User className="w-4 h-4" />
                              </span>
                              <input
                                type="text"
                                placeholder="Ex: Isabelle Martin"
                                value={formState.customerName}
                                onChange={(e) =>
                                  setFormState((prev) => ({
                                    ...prev,
                                    customerName: e.target.value,
                                  }))
                                }
                                className="w-full pl-11 pr-4 py-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream placeholder-gray-600 focus:outline-none focus:border-brand-pink transition-colors"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-2">
                              Votre Numéro de Téléphone
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-pink/40">
                                <Icons.Phone className="w-4 h-4" />
                              </span>
                              <input
                                type="tel"
                                placeholder="Ex: 06 12 34 56 78"
                                value={formState.customerPhone}
                                onChange={(e) =>
                                  setFormState((prev) => ({
                                    ...prev,
                                    customerPhone: e.target.value,
                                  }))
                                }
                                className="w-full pl-11 pr-4 py-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream placeholder-gray-600 focus:outline-none focus:border-brand-pink transition-colors"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Prefilled message preview panel */}
                        <div className="p-5 rounded-2xl bg-brand-bg/60 border border-brand-pink/10 space-y-3">
                          <div className="flex justify-between items-center border-b border-brand-pink/5 pb-2">
                            <span className="text-xs font-mono text-brand-pink uppercase font-bold">
                              Message préparé pour l'Atelier
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyMessage}
                              className="text-xs text-brand-text-muted hover:text-brand-pink transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              {copied ? (
                                <>
                                  <Icons.Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400 font-bold">
                                    Copié
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Icons.Copy className="w-3.5 h-3.5" />
                                  <span>Copier le texte</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-[10px] md:text-xs text-brand-text-muted leading-relaxed font-mono whitespace-pre-wrap select-all max-h-48 overflow-y-auto pr-2">
                            {currentMessage}
                          </pre>
                        </div>

                        {/* WhatsApp Final action */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={handleSendRequest}
                            className="w-full py-4 bg-brand-pink text-brand-bg font-extrabold text-xs tracking-widest uppercase rounded-full hover:bg-brand-pink-hover transition-all duration-300 flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                          >
                            <Icons.MessageCircle className="w-5 h-5" />
                            <span>Envoyer ma demande sur WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Form Footer Navigation Actions */}
              <div className="flex justify-between items-center pt-8 border-t border-brand-pink/5 mt-8">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentStep((current) => Math.max(0, current - 1))
                  }
                  disabled={currentStep === 0}
                  className={`px-5 py-2.5 rounded-full border border-brand-pink/10 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    currentStep === 0
                      ? "opacity-40 pointer-events-none"
                      : "bg-brand-bg/40 text-brand-cream hover:border-brand-pink/40"
                  }`}
                >
                  <Icons.ChevronLeft className="w-4 h-4" />
                  <span>Précédent</span>
                </button>

                {currentStep < config.steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentStep((current) =>
                        Math.min(config.steps.length - 1, current + 1),
                      )
                    }
                    className="px-6 py-2.5 bg-brand-pink text-brand-bg font-bold text-xs tracking-wider uppercase rounded-full hover:bg-brand-pink-hover transition-all cursor-pointer flex items-center gap-2"
                  >
                    <span>Suivant</span>
                    <Icons.ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">
                    ✓ Formulaire complété
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel: Sticky Live Atelier Summary Details */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="p-6 rounded-[2rem] bg-brand-depth/75 border border-brand-pink/15 space-y-6 shadow-xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-20 h-20 bg-brand-pink/5 rounded-full filter blur-xl" />

                <div className="flex justify-between items-center border-b border-brand-pink/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Icons.Layers className="w-4 h-4 text-brand-pink" />
                    <h3 className="font-serif font-bold text-base text-brand-cream">
                      {config.liveSummary.title}
                    </h3>
                  </div>
                  {score > 0 && (
                    <span className="text-xs font-mono font-bold text-brand-pink uppercase tracking-widest bg-brand-pink/10 px-2.5 py-1 rounded-full border border-brand-pink/15">
                      {score}%
                    </span>
                  )}
                </div>

                {/* Completion ring preview or empty warning */}
                {score === 0 ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full border border-dashed border-brand-pink/25 flex items-center justify-center mx-auto text-brand-pink/40">
                      <Icons.Palette className="w-5 h-5 animate-pulse" />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-brand-cream">
                      {config.liveSummary.emptyTitle}
                    </h4>
                    <p className="text-xs text-brand-text-muted leading-relaxed font-light">
                      {config.liveSummary.emptyDescription}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Creation format row */}
                    {formState.creationType && (
                      <div className="flex justify-between items-start text-xs border-b border-brand-pink/5 pb-3">
                        <span className="text-brand-text-muted font-mono uppercase">
                          Format
                        </span>
                        <div className="text-right">
                          <span className="text-brand-cream font-bold block">
                            {selectedCreation?.label}
                          </span>
                          <button
                            onClick={() => setCurrentStep(0)}
                            className="text-[10px] py-0.5 text-brand-pink hover:underline tracking-wider uppercase font-mono cursor-pointer"
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Occasion context row */}
                    {formState.occasion && (
                      <div className="flex justify-between items-start text-xs border-b border-brand-pink/5 pb-3">
                        <span className="text-brand-text-muted font-mono uppercase">
                          Occasion
                        </span>
                        <div className="text-right">
                          <span className="text-brand-cream font-bold block">
                            {selectedOccasion?.label}
                          </span>
                          <button
                            onClick={() => setCurrentStep(1)}
                            className="text-[10px] py-0.5 text-brand-pink hover:underline tracking-wider uppercase font-mono cursor-pointer"
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Scent Mood row */}
                    {formState.scentMood && (
                      <div className="flex justify-between items-start text-xs border-b border-brand-pink/5 pb-3">
                        <span className="text-brand-text-muted font-mono uppercase">
                          Senteur
                        </span>
                        <div className="text-right">
                          <span className="text-brand-cream font-bold block">
                            {selectedScentMood?.label}
                          </span>
                          <span className="text-[10px] text-brand-pink block font-mono">
                            {selectedScentMood?.mood}
                          </span>
                          <button
                            onClick={() => setCurrentStep(2)}
                            className="text-[10px] py-0.5 text-brand-pink hover:underline tracking-wider uppercase font-mono cursor-pointer mt-0.5"
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Color Swatch mood row */}
                    {formState.colorMood && (
                      <div className="flex justify-between items-start text-xs border-b border-brand-pink/5 pb-3">
                        <span className="text-brand-text-muted font-mono uppercase">
                          Style/Couleur
                        </span>
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 justify-end">
                            {selectedColorMood?.hex ? (
                              <div
                                className="w-3 h-3 rounded-full border border-brand-pink/15 shadow-inner"
                                style={{
                                  backgroundColor: selectedColorMood.hex,
                                }}
                              />
                            ) : (
                              <div
                                className={`w-3 h-3 rounded-full shadow-inner ${selectedColorMood?.gradient}`}
                              />
                            )}
                            <span className="text-brand-cream font-bold block text-right">
                              {selectedColorMood?.label}
                            </span>
                          </div>
                          <button
                            onClick={() => setCurrentStep(3)}
                            className="text-[10px] py-0.5 text-brand-pink hover:underline tracking-wider uppercase font-mono cursor-pointer"
                          >
                            Modifier
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Details summary parameters row */}
                    {(formState.quantity ||
                      formState.desiredDate ||
                      formState.recipientName) && (
                      <div className="space-y-2 border-b border-brand-pink/5 pb-3">
                        <span className="text-brand-text-muted font-mono uppercase text-xs block">
                          Paramètres de Commande
                        </span>
                        <div className="p-3 bg-brand-bg/40 rounded-xl space-y-1.5 text-xs text-brand-text-muted font-light">
                          {formState.quantity && (
                            <div className="flex justify-between">
                              <span>Quantité :</span>
                              <span className="text-brand-cream font-semibold">
                                {formState.quantity}
                              </span>
                            </div>
                          )}
                          {formState.desiredDate && (
                            <div className="flex justify-between">
                              <span>Cible :</span>
                              <span className="text-brand-cream font-semibold">
                                {formState.desiredDate}
                              </span>
                            </div>
                          )}
                          {formState.recipientName && (
                            <div className="flex justify-between">
                              <span>Destinataire :</span>
                              <span className="text-brand-cream font-semibold">
                                {formState.recipientName}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => setCurrentStep(3)}
                            className="text-[10px] py-0.5 text-brand-pink hover:underline tracking-wider uppercase font-mono cursor-pointer"
                          >
                            Ajuster les fiches
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Prefilled trigger button preview */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleSendRequest}
                        className="w-full py-3 bg-brand-pink text-brand-bg font-extrabold text-[11px] tracking-wider uppercase rounded-full hover:bg-brand-pink-hover transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      >
                        <Icons.MessageCircle className="w-4 h-4" />
                        <span>
                          {score < 60
                            ? "Envoyer une première idée"
                            : "Envoyer ma demande"}
                        </span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Atelier reassurance chips */}
                <div className="pt-4 border-t border-brand-pink/5 grid grid-cols-1 gap-2 text-[10px] font-mono text-brand-text-muted">
                  <div className="flex items-center gap-2">
                    <Icons.Check className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                    <span>Réponse personnalisée sous 24h/48h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.Check className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                    <span>Conseils cire et senteurs gratuits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icons.Check className="w-3.5 h-3.5 text-brand-pink shrink-0" />
                    <span>Validation visuelle avant emballage</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 4. PERSONALIZATION PROCESS SECTION ==================== */}
        <section className="bg-brand-depth/20 border-y border-brand-pink/10 py-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
                Un Accompagnement Local &amp; Artisanal
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-cream tracking-tight">
                {config.process.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {config.process.steps.map((pStep, i) => (
                <div
                  key={i}
                  className="bg-brand-depth/40 border border-brand-pink/5 hover:border-brand-pink/15 p-6 rounded-2xl space-y-4 relative group backdrop-blur-sm"
                >
                  <span className="absolute top-4 right-4 text-3xl font-serif font-black text-brand-pink/10 group-hover:text-brand-pink/25 transition-colors">
                    0{i + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-brand-pink block animate-pulse" />
                  <h3 className="font-serif font-bold text-base text-brand-cream">
                    {pStep.title}
                  </h3>
                  <p className="text-xs text-brand-text-muted leading-relaxed font-light">
                    {pStep.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 5. PERSONALIZATION FAQ ==================== */}
        <section className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
              Lever vos doutes
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-black text-brand-cream tracking-tight">
              {config.faqs.title}
            </h2>
          </div>

          <div className="space-y-4">
            {config.faqs.questions.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-brand-depth/40 border border-brand-pink/5 hover:border-brand-pink/15 transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left cursor-pointer text-brand-cream"
                  >
                    <span className="font-serif font-bold text-base">
                      {faq.q}
                    </span>
                    <span className="p-1 bg-brand-bg/50 rounded-full border border-brand-pink/10 text-brand-pink shrink-0">
                      {isOpen ? (
                        <Icons.ChevronUp className="w-4 h-4" />
                      ) : (
                        <Icons.ChevronDown className="w-4 h-4" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-sm text-brand-text-muted leading-relaxed font-light border-t border-brand-pink/5 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================== 6. FINAL PERSONALIZATION CTA ==================== */}
        <section className="text-center max-w-4xl mx-auto py-12 px-6 rounded-[2.5rem] bg-brand-depth/60 border border-brand-pink/15 relative overflow-hidden shadow-2xl backdrop-blur-md">
          <div className="absolute top-[-40%] left-[20%] w-[35rem] h-[35rem] bg-brand-pink/5 rounded-full filter blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <Icons.Wand2 className="w-10 h-10 text-brand-pink mx-auto animate-pulse" />

            <h2 className="text-2xl md:text-4xl font-serif font-black text-brand-cream tracking-tight">
              {config.finalCta.title}
            </h2>

            <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
              {config.finalCta.description}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={scrollToComposer}
                className="px-8 py-3.5 bg-brand-pink text-brand-bg font-extrabold text-xs tracking-widest uppercase rounded-full hover:bg-brand-pink-hover transition-colors shadow-lg cursor-pointer"
              >
                Créer un projet sur mesure
              </button>
              <a
                href={`https://wa.me/${config.brand.whatsappNumber}?text=Bonjour, j'ai une idée de création parfumée personnalisée et j'aimerais recevoir vos conseils.`}
                target="_blank"
                rel="noreferrer noopener"
                className="px-6 py-3.5 rounded-full bg-brand-bg border border-brand-pink/15 text-brand-cream hover:border-brand-pink transition-colors text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Icons.MessageCircle className="w-4 h-4 text-brand-pink" />
                <span>Parler sur WhatsApp</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
