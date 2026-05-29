import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { eventsPageConfig, EventFormState } from '../config/eventsPageConfig';
import * as Icons from 'lucide-react';

// Reusable dynamic icon helper
const DynamicIcon = ({ name, className = 'w-5 h-5' }: { name: string; className?: string }) => {
  const IconComp = (Icons as any)[name];
  if (!IconComp) {
    return <Icons.Sparkles className={className} />;
  }
  return <IconComp className={className} />;
};

const EventsHero = ({ onStart }: { onStart: () => void }) => {
    const config = eventsPageConfig;
    return (
        <section className="relative min-h-[95svh] lg:min-h-[100svh] -mt-24 md:-mt-28 flex flex-col justify-center overflow-hidden bg-brand-bg text-brand-cream border-b border-brand-pink/10">
            <div className="absolute inset-0 z-0">
                <img src={config.hero.media.fallbackImage} alt="Event hero" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/40 to-transparent" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pt-[20svh] pb-16 lg:pb-24">
                <div className="space-y-6">
                    <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">{config.page.eyebrow}</span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black leading-[0.9] tracking-tight text-brand-cream max-w-4xl">
                        {config.page.title.split(config.page.highlightedWords[0])[0]}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-wax font-light italic">{config.page.highlightedWords[0]}</span>
                        {config.page.title.split(config.page.highlightedWords[0])[1].split(config.page.highlightedWords[1])[0]}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-wax font-light italic">{config.page.highlightedWords[1]}</span>
                        {config.page.title.split(config.page.highlightedWords[1])[1]}
                    </h1>
                    <p className="max-w-2xl text-lg text-brand-text-muted leading-relaxed font-light">{config.page.subtitle}</p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <button onClick={onStart} className="px-8 py-3.5 bg-brand-pink text-brand-bg font-bold text-xs uppercase rounded-full tracking-wide hover:bg-brand-pink-hover transition-colors shadow-lg flex items-center gap-2">
                            <DynamicIcon name={config.hero.primaryCta.icon} className="w-4 h-4" />
                            {config.hero.primaryCta.label}
                        </button>
                        <a href={`https://wa.me/${config.brand.whatsappNumber}?text=${encodeURIComponent("Bonjour, je souhaite vous contacter pour un événement.")}`} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-brand-depth/80 border border-brand-pink/20 hover:border-brand-pink/50 text-brand-cream font-bold text-xs uppercase rounded-full tracking-wide transition-colors flex items-center gap-2 backdrop-blur-sm">
                            <DynamicIcon name={config.hero.secondaryCta.icon} className="w-4 h-4" />
                            {config.hero.secondaryCta.label}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

const EventTypeShowcase = ({ onSelectEventType }: { onSelectEventType: (id: string) => void }) => {
    const config = eventsPageConfig;
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-cream tracking-tight">
                    Chaque événement peut avoir sa signature parfumée.
                </h2>
                <p className="text-brand-text-muted">Choisissez votre moment, l’atelier vous aide à trouver le bon format.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {config.eventTypes.map((type) => (
                    <motion.div 
                        key={type.id} 
                        onClick={() => onSelectEventType(type.id)}
                        className="p-8 rounded-[2rem] bg-brand-depth/40 border border-brand-pink/10 backdrop-blur-sm hover:border-brand-pink/30 hover:bg-brand-depth/60 transition-all cursor-pointer group" 
                        whileHover={{ y: -4, scale: 1.01 }}
                    >
                        <div className="w-14 h-14 rounded-full bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <DynamicIcon name={type.icon} className="w-6 h-6 text-brand-pink" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-brand-cream mb-3">{type.label}</h3>
                        <p className="text-sm text-brand-text-muted mb-6 leading-relaxed line-clamp-2">{type.description}</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {type.recommendedCreations.map(c => {
                             const creation = config.creationTypes.find(cr => cr.id === c);
                             return creation ? (
                                <span key={c} className="text-[10px] uppercase tracking-wider font-mono text-brand-pink bg-brand-pink/10 px-2.5 py-1 rounded-full border border-brand-pink/20">{creation.label}</span>
                             ) : null;
                          })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const EventProcessTimeline = () => {
    const config = eventsPageConfig;
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-brand-pink/10">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-cream tracking-tight">
                    Comment se déroule une demande événement ?
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand-pink/0 via-brand-pink/20 to-brand-pink/0" />
                {config.process.map((step, idx) => (
                    <div key={idx} className="relative z-10 p-6 bg-brand-depth/40 border border-brand-pink/10 rounded-3xl text-center backdrop-blur-sm hover:border-brand-pink/30 transition-colors">
                        <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-pink/10 border border-brand-pink/20 flex items-center justify-center text-brand-pink">
                            <DynamicIcon name={step.icon} className="w-5 h-5" />
                        </div>
                        <div className="text-xs font-mono text-brand-pink mb-2">Étape {idx + 1}</div>
                        <h3 className="font-serif font-bold text-brand-cream text-lg">{step.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

const EventsFAQ = () => {
    const config = eventsPageConfig;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-cream tracking-tight">
                    Questions fréquentes
                </h2>
            </div>
            <div className="space-y-4">
                {config.faq.map((item, idx) => (
                    <div key={idx} className="border border-brand-pink/10 rounded-2xl bg-brand-depth/30 backdrop-blur-sm overflow-hidden">
                        <button 
                            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                            className="w-full text-left px-6 py-5 flex items-center justify-between font-serif font-bold text-brand-cream"
                        >
                            {item.q}
                            <Icons.ChevronDown className={`w-5 h-5 text-brand-pink transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }} 
                                    animate={{ height: "auto", opacity: 1 }} 
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-6 pb-5 text-sm text-brand-text-muted leading-relaxed"
                                >
                                    {item.a}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default function EventsPage() {
  const config = eventsPageConfig;
  const composerRef = useRef<HTMLDivElement>(null);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<EventFormState>({
    eventType: "",
    eventDate: "",
    guestCount: "",
    creationType: "",
    scentMood: "",
    colorTheme: "",
    eventTheme: "",
    personalizationText: "",
    budgetIdea: "",
    deliveryPreference: "",
    customerName: "",
    customerPhone: "",
    extraDetails: "",
  });

  const handleSelectEventType = (id: string) => {
      setFormState(prev => ({ ...prev, eventType: id as EventFormState['eventType'] }));
      composerRef.current?.scrollIntoView({ behavior: 'smooth' });
      setCurrentStep(1); // Go to next step if starting from showcase
  };

  const getCompletionScore = () => {
    let score = 0;
    if (formState.eventType) score += 15;
    if (formState.eventDate) score += 15;
    if (formState.guestCount) score += 15;
    if (formState.creationType) score += 15;
    if (formState.scentMood) score += 10;
    if (formState.colorTheme || formState.eventTheme) score += 15;
    if (formState.customerName || formState.customerPhone) score += 15;
    return score;
  };

  const score = getCompletionScore();

  const buildWhatsappMessage = () => {
    const eventType = config.eventTypes.find(item => item.id === formState.eventType);
    const creation = config.creationTypes.find(item => item.id === formState.creationType);
    const scent = config.scentMoods.find(item => item.id === formState.scentMood);
    const imageUrl = creation?.image ? `\n• Aperçu : ${creation.image}` : '';

    return `Bonjour, je souhaite faire une demande pour un événement chez ${config.brand.name}.

• Type d'événement : ${eventType?.label || "À définir"}
• Date de l'événement : ${formState.eventDate || "À préciser"}
• Nombre d'invités / quantité : ${formState.guestCount || "À préciser"}
• Type de création souhaitée : ${creation?.label || "À définir"}${imageUrl}
• Ambiance olfactive : ${scent?.label || "À définir"}
• Couleurs souhaitées : ${formState.colorTheme || "À définir"}
• Thème / ambiance : ${formState.eventTheme || "À définir"}
• Texte de personnalisation : ${formState.personalizationText || "Non défini"}
• Budget : ${formState.budgetIdea || "À définir"}
• Retrait/Livraison : ${formState.deliveryPreference || "À définir"}
• Détails : ${formState.extraDetails || "R.A.S."}

Mes coordonnées :
• Prénom : ${formState.customerName || "Non précisé"}
• Téléphone : ${formState.customerPhone || "Non précisé"}

Pouvez-vous me conseiller et m'indiquer ce qui est possible ?`.trim();
  };

  const handleSendWhatsapp = () => {
      const msg = buildWhatsappMessage();
      const url = `https://wa.me/${config.brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noreferrer,noopener');
  };

  const stepLabels = ["Type d'événement", "Création", "Ambiance", "Détails", "Contact"];

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream">
      <EventsHero onStart={() => composerRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <EventTypeShowcase onSelectEventType={handleSelectEventType} />
      
      {/* Event Quote Composer */}
      <section ref={composerRef} className="max-w-7xl mx-auto px-6 py-24 scroll-mt-12">
        <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif font-black text-brand-cream tracking-tight">Préparer ma demande événement</h2>
            <p className="text-brand-text-muted">L'atelier vous guide étape par étape pour affiner votre devis.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-brand-depth/40 border border-brand-pink/10 rounded-[2.5rem] p-6 md:p-10 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-[-10%] w-64 h-64 bg-brand-pink/10 rounded-full blur-[80px] pointer-events-none" />
                
                {/* Stepper */}
                <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 border-b border-brand-pink/10 pb-4">
                    {stepLabels.map((lbl, i) => (
                        <button 
                            key={i} 
                            onClick={() => setCurrentStep(i)}
                            className={`flex whitespace-nowrap items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${currentStep === i ? 'bg-brand-pink text-brand-bg' : 'text-brand-text-muted hover:text-brand-cream hover:bg-brand-depth'}`}
                        >
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${currentStep === i ? 'bg-brand-bg text-brand-pink' : 'border border-brand-pink/30 text-brand-pink'}`}>
                                {i + 1}
                            </span>
                            {lbl}
                        </button>
                    ))}
                </div>

                {/* Form Content */}
                <div className="min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Step 1: Event Type */}
                            {currentStep === 0 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-serif font-bold">Pour quelle occasion ?</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {config.eventTypes.map(type => (
                                            <button 
                                                key={type.id}
                                                onClick={() => setFormState(s => ({...s, eventType: type.id as any}))}
                                                className={`p-5 rounded-2xl border text-left transition-all ${formState.eventType === type.id ? 'bg-brand-pink/10 border-brand-pink shadow-[0_0_20px_rgba(255,182,193,0.1)]' : 'bg-brand-depth/40 border-brand-pink/10 hover:border-brand-pink/30'}`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${formState.eventType === type.id ? 'bg-brand-pink text-brand-bg' : 'bg-brand-pink/10 text-brand-pink'}`}>
                                                        <DynamicIcon name={type.icon} />
                                                    </div>
                                                    <div>
                                                        <span className="font-serif font-bold text-lg block">{type.label}</span>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Creation Type */}
                            {currentStep === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-serif font-bold">Quel format de création ?</h3>
                                    {formState.eventType && (
                                        <div className="mb-4 text-xs text-brand-pink flex items-center gap-2 bg-brand-pink/5 p-3 rounded-xl border border-brand-pink/10">
                                            <Icons.Sparkles className="w-4 h-4" />
                                            Certaines créations sont particulièrement adaptées pour un(e) {config.eventTypes.find(e => e.id === formState.eventType)?.label}.
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {config.creationTypes.map(c => {
                                            const isRecommended = formState.eventType && config.eventTypes.find(e => e.id === formState.eventType)?.recommendedCreations.includes(c.id);
                                            return (
                                                <button 
                                                    key={c.id}
                                                    onClick={() => setFormState(s => ({...s, creationType: c.id as any}))}
                                                    className={`p-5 rounded-2xl border text-left transition-all relative ${formState.creationType === c.id ? 'bg-brand-pink/10 border-brand-pink shadow-[0_0_20px_rgba(255,182,193,0.1)]' : 'bg-brand-depth/40 border-brand-pink/10 hover:border-brand-pink/30'}`}
                                                >
                                                    {isRecommended && (
                                                        <span className="absolute -top-3 -right-2 bg-brand-pink text-brand-bg text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full shadow-md">Recommandé</span>
                                                    )}
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <DynamicIcon name={c.icon} className={`w-5 h-5 ${formState.creationType === c.id ? 'text-brand-pink' : 'text-brand-text-muted'}`} />
                                                        <span className="font-serif font-bold text-lg">{c.label}</span>
                                                    </div>
                                                    <p className="text-xs text-brand-text-muted line-clamp-2">{c.description}</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Scent & Theme */}
                            {currentStep === 2 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-serif font-bold">Ambiance olfactive & Couleurs</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        {config.scentMoods.map(sm => (
                                            <button 
                                                key={sm.id}
                                                onClick={() => setFormState(s => ({...s, scentMood: sm.id as any}))}
                                                className={`p-4 rounded-xl border text-center transition-all ${formState.scentMood === sm.id ? 'bg-brand-pink text-brand-bg border-brand-pink font-bold' : 'bg-brand-depth/40 border-brand-pink/10 text-brand-text-muted hover:text-brand-cream hover:border-brand-pink/30'}`}
                                            >
                                                <span className="text-sm">{sm.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-4 mt-8">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Thème Visuel / Ambiance</label>
                                            <input 
                                                type="text" 
                                                placeholder={config.placeholders.eventTheme}
                                                value={formState.eventTheme}
                                                onChange={e => setFormState(s => ({...s, eventTheme: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Couleurs Souhaitées</label>
                                            <input 
                                                type="text" 
                                                placeholder={config.placeholders.colorTheme}
                                                value={formState.colorTheme}
                                                onChange={e => setFormState(s => ({...s, colorTheme: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 4: Details */}
                            {currentStep === 3 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-serif font-bold">Détails de l'événement</h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Date de l'événement</label>
                                            <input 
                                                type="text" 
                                                placeholder={config.placeholders.eventDate}
                                                value={formState.eventDate}
                                                onChange={e => setFormState(s => ({...s, eventDate: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Quantité / Invités</label>
                                            <input 
                                                type="text" 
                                                placeholder={config.placeholders.guestCount}
                                                value={formState.guestCount}
                                                onChange={e => setFormState(s => ({...s, guestCount: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Texte de personnalisation</label>
                                            <input 
                                                type="text" 
                                                placeholder={config.placeholders.personalizationText}
                                                value={formState.personalizationText}
                                                onChange={e => setFormState(s => ({...s, personalizationText: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Budget global envisagé</label>
                                            <input 
                                                type="text" 
                                                placeholder={config.placeholders.budgetIdea}
                                                value={formState.budgetIdea}
                                                onChange={e => setFormState(s => ({...s, budgetIdea: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                        <div className="sm:col-span-2">
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Retrait / Livraison</label>
                                            <input 
                                                type="text" 
                                                placeholder={config.placeholders.deliveryPreference}
                                                value={formState.deliveryPreference}
                                                onChange={e => setFormState(s => ({...s, deliveryPreference: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Step 5: Contact */}
                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-serif font-bold">Vos coordonnées</h3>
                                    <p className="text-sm text-brand-text-muted">Ces informations nous permettent de vous recontacter via WhatsApp pour discuter de votre devis.</p>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Votre nom/prénom</label>
                                            <input 
                                                type="text" 
                                                placeholder={config.placeholders.customerName}
                                                value={formState.customerName}
                                                onChange={e => setFormState(s => ({...s, customerName: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2 tracking-wider">Numéro de téléphone</label>
                                            <input 
                                                type="tel" 
                                                placeholder={config.placeholders.customerPhone}
                                                value={formState.customerPhone}
                                                onChange={e => setFormState(s => ({...s, customerPhone: e.target.value}))}
                                                className="w-full bg-brand-depth/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="bg-brand-pink/5 border border-brand-pink/20 p-5 rounded-2xl mt-6">
                                        <h4 className="text-xs font-mono text-brand-pink uppercase font-bold tracking-wider mb-2">Message WhatsApp prêt :</h4>
                                        <p className="text-sm text-brand-text-muted mb-4 italic">"{buildWhatsappMessage().substring(0, 100)}..."</p>
                                        <button 
                                            onClick={handleSendWhatsapp}
                                            className="w-full px-6 py-4 bg-brand-pink hover:bg-brand-pink-hover transition-colors text-brand-bg rounded-xl font-bold uppercase tracking-wider text-xs flex justify-center items-center gap-2 shadow-lg"
                                        >
                                            <Icons.MessageCircle className="w-5 h-5" />
                                            {score < 50 ? "Envoyer une première idée" : "Envoyer ma demande événement"}
                                        </button>
                                        <p className="text-center text-[10px] text-brand-text-muted mt-3 uppercase tracking-widest font-mono">Sans engagement, devis par la suite</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Nav */}
                <div className="mt-8 pt-6 border-t border-brand-pink/10 flex justify-between items-center">
                    <button 
                        onClick={() => setCurrentStep(c => Math.max(0, c - 1))}
                        disabled={currentStep === 0}
                        className={`text-sm font-semibold flex items-center gap-2 px-4 py-2 rounded-full ${currentStep === 0 ? 'opacity-30 cursor-not-allowed text-brand-text-muted' : 'text-brand-cream hover:bg-brand-depth/50'}`}
                    >
                        <Icons.ArrowLeft className="w-4 h-4" /> Précédent
                    </button>
                    {currentStep < 4 && (
                        <button 
                            onClick={() => setCurrentStep(c => Math.min(4, c + 1))}
                            className="bg-brand-bg border border-brand-pink text-brand-pink px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-brand-pink hover:text-brand-bg transition-colors flex items-center gap-2"
                        >
                            Suivant <Icons.ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Sticky Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 self-start">
                <div className="bg-brand-depth/40 border border-brand-pink/20 rounded-[2.5rem] p-6 lg:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full blur-[50px] pointer-events-none" />
                    
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-brand-pink/10">
                        <h3 className="font-serif font-bold text-lg text-brand-cream flex items-center gap-2">
                            <Icons.ClipboardList className="w-5 h-5 text-brand-pink" />
                            Votre demande
                        </h3>
                        <span className="text-[10px] font-mono text-brand-bg bg-brand-pink px-2 py-1 rounded-full font-bold">{score}%</span>
                    </div>

                    {score === 0 ? (
                        <div className="py-8 text-center space-y-3 opacity-60">
                            <Icons.FileEdit className="w-8 h-8 mx-auto text-brand-pink" />
                            <p className="text-sm font-mono uppercase tracking-wider text-brand-pink">Devis en cours</p>
                            <p className="text-xs text-brand-text-muted">Remplissez les informations à gauche pour voir apparaître votre récapitulatif.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {formState.eventType && (
                                <div className="flex justify-between items-center py-2 border-b border-brand-pink/5">
                                    <span className="text-xs font-mono uppercase text-brand-text-muted">Événement</span>
                                    <span className="text-sm font-bold text-brand-cream">{config.eventTypes.find(e => e.id === formState.eventType)?.label}</span>
                                </div>
                            )}
                            {formState.creationType && (
                                <div className="flex justify-between items-center py-2 border-b border-brand-pink/5">
                                    <span className="text-xs font-mono uppercase text-brand-text-muted">Format</span>
                                    <span className="text-sm font-bold text-brand-cream">{config.creationTypes.find(e => e.id === formState.creationType)?.label}</span>
                                </div>
                            )}
                            {formState.eventDate && (
                                <div className="flex justify-between items-center py-2 border-b border-brand-pink/5">
                                    <span className="text-xs font-mono uppercase text-brand-text-muted">Date</span>
                                    <span className="text-sm font-bold text-brand-cream">{formState.eventDate}</span>
                                </div>
                            )}
                            {formState.guestCount && (
                                <div className="flex justify-between items-center py-2 border-b border-brand-pink/5">
                                    <span className="text-xs font-mono uppercase text-brand-text-muted">Quantité</span>
                                    <span className="text-sm font-bold text-brand-cream">{formState.guestCount}</span>
                                </div>
                            )}
                            {formState.scentMood && (
                                <div className="flex justify-between items-center py-2 border-b border-brand-pink/5">
                                    <span className="text-xs font-mono uppercase text-brand-text-muted">Senteur</span>
                                    <span className="text-sm font-bold text-brand-cream">{config.scentMoods.find(e => e.id === formState.scentMood)?.label}</span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 space-y-2">
                        {config.summary.reassurance.map((r, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-brand-text-muted">
                                <Icons.CheckCircle2 className="w-4 h-4 text-brand-pink/50" />
                                {r}
                            </div>
                        ))}
                    </div>

                    <button 
                        onClick={handleSendWhatsapp}
                        className="w-full mt-6 py-3 border border-brand-pink/30 hover:border-brand-pink hover:bg-brand-pink/10 transition-colors text-brand-cream rounded-xl text-xs font-mono uppercase tracking-wider flex justify-center items-center gap-2"
                    >
                        <Icons.MessageCircle className="w-4 h-4" /> {config.whatsapp.submitLabel}
                    </button>
                </div>
            </div>
        </div>
      </section>

      <EventProcessTimeline />
      <EventsFAQ />
    </div>
  );
}

