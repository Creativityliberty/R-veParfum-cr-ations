import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { homeMeetingPageConfig, MeetingFormState, GuestRange, MeetingMood } from '../config/homeMeetingPageConfig';

const DynamicIcon = ({ name, className = 'w-5 h-5' }: { name: string; className?: string }) => {
  const IconComp = (Icons as any)[name];
  if (!IconComp) return <Icons.Sparkles className={className} />;
  return <IconComp className={className} />;
};

const buildMeetingWhatsappMessage = (
    formState: MeetingFormState,
    config: typeof homeMeetingPageConfig
  ) => {
    const guestRange = config.guestRanges.find(item => item.id === formState.guestRange);
    const mood = config.meetingMoods.find(item => item.id === formState.meetingMood);
  
    const products = formState.interestedProducts
      .map(id => config.productInterests.find(item => item.id === id)?.label)
      .filter(Boolean)
      .join(", ");
  
    return `
Bonjour, je souhaite organiser une réunion à domicile avec ${config.brand.name}.

• Prénom : ${formState.hostName || "Non précisé"}
• Téléphone : ${formState.hostPhone || "Non précisé"}
• Ville / secteur : ${formState.city || "À préciser"}
• Date souhaitée : ${formState.preferredDate || "À définir"}
• Autre date possible : ${formState.alternativeDate || "À définir"}
• Nombre d’invités : ${guestRange?.label || "À définir"}
• Ambiance souhaitée : ${mood?.label || "À définir"}
• Créations à présenter : ${products || "À définir avec l’atelier"}
• Infos sur le lieu : ${formState.addressDetails || "Non précisées"}
• Détails / questions : ${formState.extraDetails || "Aucun pour le moment"}

Pouvez-vous me dire si une réunion est possible et quelles sont les conditions ?
  `.trim();
};

const HomeMeetingHero = ({ onStart, onContact }: { onStart: () => void, onContact: () => void }) => {
    const config = homeMeetingPageConfig;
    return (
        <section className="relative min-h-[95svh] lg:min-h-[100svh] -mt-24 md:-mt-28 flex flex-col justify-center overflow-hidden bg-brand-bg text-brand-cream border-b border-brand-pink/10">
            <div className="absolute inset-0 z-0">
                <img src={config.hero.media.fallbackImage} alt="Home meeting" className="w-full h-full object-cover opacity-30 saturate-[0.80]" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
                <div className="absolute top-1/2 left-1/4 w-[30rem] h-[30rem] bg-brand-pink/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-[50vh] bg-gradient-to-t from-brand-depth to-transparent opacity-80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end pt-[20svh] pb-16 lg:pb-24">
                <div className="lg:col-span-8 space-y-8">
                    <span className="inline-block px-4 py-1.5 rounded-full border border-brand-pink/20 bg-brand-pink/5 text-[10px] uppercase font-mono text-brand-pink tracking-[0.2em] font-bold shadow-lg">
                        {config.page.eyebrow}
                    </span>
                    
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-black tracking-tight max-w-4xl leading-[0.95]">
                        {config.page.title.split(config.page.highlightedWords[0])[0]}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-wax italic font-light pr-2">
                            {config.page.highlightedWords[0]}
                        </span>
                        {config.page.title.split(config.page.highlightedWords[0])[1].split(config.page.highlightedWords[1])[0]}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-wax italic font-light pr-2">
                            {config.page.highlightedWords[1]}
                        </span>
                        {config.page.title.split(config.page.highlightedWords[1])[1]}
                    </h1>

                    <p className="max-w-xl text-lg text-brand-text-muted font-light leading-relaxed">
                        {config.page.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                        <button 
                            onClick={onStart}
                            className="px-8 py-4 bg-brand-pink text-brand-bg hover:bg-brand-pink-hover transition-colors rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-xl"
                        >
                            <DynamicIcon name={config.hero.primaryCta.icon} className="w-5 h-5" />
                            {config.hero.primaryCta.label}
                        </button>
                        <button 
                            onClick={onContact}
                            className="px-8 py-4 bg-brand-depth/80 border border-brand-pink/20 hover:border-brand-pink/50 text-brand-cream transition-colors rounded-full font-bold uppercase tracking-wider text-xs flex items-center gap-2 backdrop-blur-sm"
                        >
                            <DynamicIcon name={config.hero.secondaryCta.icon} className="w-4 h-4" />
                            {config.hero.secondaryCta.label}
                        </button>
                    </div>

                    <div className="pt-8 border-t border-brand-pink/10 flex flex-wrap gap-x-6 gap-y-3">
                        {config.hero.badges.map((badge, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-brand-text-muted">
                                <span className="w-1 h-1 rounded-full bg-brand-pink" />
                                <span className="font-mono">{badge}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:col-span-4 lg:flex justify-end">
                    <div className="p-8 w-full max-w-sm rounded-[2rem] bg-brand-depth/80 border border-brand-pink/15 shadow-xl space-y-6 relative overflow-hidden backdrop-blur-md">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full filter blur-xl" />
                        
                        <h3 className="font-serif text-2xl font-bold text-brand-cream leading-tight">
                            Une réunion douce, simple et guidée
                        </h3>

                        <div className="space-y-4">
                            {['Ville', 'Date', 'Invitées', 'Senteurs'].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-brand-bg/80 border border-brand-pink/15 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand-pink shrink-0" />
                                    </div>
                                    <span className="text-xs font-mono uppercase tracking-widest text-brand-cream">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-brand-pink/10 text-[10px] font-mono text-brand-text-muted uppercase tracking-wider">
                            L'atelier confirme les conditions avec vous.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HostBenefitsSection = () => {
    const config = homeMeetingPageConfig;
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-cream tracking-tight">
                    Pourquoi devenir hôtesse ?
                </h2>
                <p className="text-brand-text-muted max-w-2xl mx-auto font-light leading-relaxed">
                    Vous créez un moment chaleureux chez vous, l'atelier s'occupe de guider la découverte des créations.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {config.hostBenefits.map((benefit, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover="hover"
                        variants={config.motion.cardHover as any}
                        className="bg-brand-depth/40 border border-brand-pink/10 rounded-3xl p-8 hover:border-brand-pink/30 transition-colors relative overflow-hidden group"
                    >
                        <div className="absolute -inset-4 bg-brand-pink/0 group-hover:bg-brand-pink/5 blur-2xl transition-colors pointer-events-none" />
                        <div className="w-14 h-14 rounded-full bg-brand-bg border border-brand-pink/20 flex items-center justify-center text-brand-pink mb-6 group-hover:scale-110 transition-transform">
                            <DynamicIcon name={benefit.icon} className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-serif font-bold text-brand-cream mb-4">{benefit.title}</h3>
                        <p className="text-sm text-brand-text-muted leading-relaxed font-light">{benefit.description}</p>
                    </motion.div>
                ))}
            </div>
            
            <p className="text-center text-[10px] font-mono uppercase text-brand-text-muted/60 mt-12 tracking-widest">
                Les conditions et avantages sont confirmés directement avec l'atelier selon la réunion.
            </p>
        </section>
    );
};

const MeetingConditionsStrip = () => {
    const config = homeMeetingPageConfig;
    return (
        <section className="px-6 max-w-7xl mx-auto pb-24">
            <div className="bg-brand-depth/80 backdrop-blur-xl border border-brand-pink/20 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-brand-pink/5 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-brand-pink/10 relative z-10">
                    {config.conditions.map((cond, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center lg:px-4 pt-6 sm:pt-0 first:pt-0">
                            <DynamicIcon name={cond.icon} className="w-6 h-6 text-brand-pink mb-3" />
                            <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-brand-cream mb-2">{cond.label}</h4>
                            <p className="text-xs text-brand-text-muted font-light">{cond.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MeetingFlowTimeline = () => {
    const config = homeMeetingPageConfig;
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-brand-pink/10">
            <div className="text-center mb-20 space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-cream tracking-tight">
                    Comment se déroule une réunion ?
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {/* Connecting line (desktop) */}
                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-brand-pink/20" />
                
                {config.meetingSteps.map((step, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col pt-8 md:pt-0 items-center text-center">
                        <div className="w-16 h-16 rounded-full bg-brand-depth border border-brand-pink/30 flex items-center justify-center text-brand-cream text-xl font-serif font-black mb-6 shadow-xl relative">
                            <div className="absolute inset-0 rounded-full bg-brand-pink/10 blur-sm mix-blend-screen" />
                            {idx + 1}
                        </div>
                        <div className="bg-brand-depth/40 border border-brand-pink/10 rounded-2xl p-6 w-full h-full">
                            <DynamicIcon name={step.icon} className="w-5 h-5 text-brand-pink mx-auto mb-4" />
                            <h3 className="text-sm font-bold text-brand-cream mb-2 uppercase tracking-wide">{step.title}</h3>
                            <p className="text-xs text-brand-text-muted leading-relaxed">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const HomeMeetingRequestComposer = React.forwardRef<HTMLDivElement>((props, ref) => {
    const config = homeMeetingPageConfig;
    
    const [currentStep, setCurrentStep] = useState(0);
    const [formState, setFormState] = useState<MeetingFormState>({
        hostName: "",
        hostPhone: "",
        city: "",
        preferredDate: "",
        alternativeDate: "",
        guestRange: "",
        meetingMood: "",
        interestedProducts: [],
        addressDetails: "",
        extraDetails: "",
    });

    const completionScore = (() => {
        let score = 0;
        if (formState.hostName && formState.hostPhone) score += 20;
        if (formState.city) score += 15;
        if (formState.preferredDate || formState.alternativeDate) score += 15;
        if (formState.guestRange) score += 15;
        if (formState.meetingMood) score += 15;
        if (formState.interestedProducts.length > 0) score += 10;
        if (formState.addressDetails || formState.extraDetails) score += 10;
        return score;
    })();

    const toggleProduct = (id: string) => {
        setFormState(s => ({
            ...s,
            interestedProducts: s.interestedProducts.includes(id) 
                ? s.interestedProducts.filter(p => p !== id)
                : [...s.interestedProducts, id]
        }));
    };

    const handleSend = () => {
        const msg = buildMeetingWhatsappMessage(formState, config);
        const url = `https://wa.me/${config.brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank', 'noreferrer,noopener');
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    // Summary Card Component
    const SummaryCard = () => {
        const guestLabel = config.guestRanges.find(g => g.id === formState.guestRange)?.label;
        const moodLabel = config.meetingMoods.find(m => m.id === formState.meetingMood)?.label;
        
        return (
            <div className="sticky top-28 bg-brand-depth/80 backdrop-blur-xl border border-brand-pink/20 rounded-[2.5rem] p-8 shadow-2xl">
                <h3 className="font-serif text-2xl font-bold text-brand-cream mb-6">{config.summary.title}</h3>
                
                {/* Progress bar */}
                <div className="w-full bg-brand-bg rounded-full h-1.5 mb-8 overflow-hidden border border-brand-pink/10">
                    <div 
                        className="bg-brand-pink h-1.5 rounded-full transition-all duration-500 ease-out" 
                        style={{ width: `${completionScore}%` }}
                    />
                </div>

                {completionScore === 0 ? (
                    <div className="text-center py-8 opacity-60">
                        <Icons.FileText className="w-12 h-12 text-brand-pink mx-auto mb-4 opacity-50" />
                        <h4 className="text-sm font-bold text-brand-cream mb-2">{config.summary.emptyTitle}</h4>
                        <p className="text-xs text-brand-text-muted">{config.summary.emptyDescription}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {[
                            { icon: "User", val: formState.hostName || "Hôtesse à définir", setStep: 0 },
                            { icon: "MapPin", val: formState.city || "Ville à définir", setStep: 0 },
                            { icon: "CalendarDays", val: formState.preferredDate || "Date à convenir", setStep: 1 },
                            { icon: "Users", val: guestLabel || "Nombre d'invités à définir", setStep: 1 },
                            { icon: "Flame", val: moodLabel || "Ambiance à définir", setStep: 2 },
                            { icon: "Sparkles", val: formState.interestedProducts.length ? `${formState.interestedProducts.length} type(s) de créations` : "Créations à définir", setStep: 3 },
                        ].map((row, i) => (
                            <div key={i} className="flex justify-between items-center group cursor-pointer" onClick={() => setCurrentStep(row.setStep)}>
                                <div className="flex items-center gap-3 text-xs text-brand-text-muted">
                                    <DynamicIcon name={row.icon} className="w-4 h-4 text-brand-pink/60" />
                                    <span className="truncate max-w-[200px]">{row.val}</span>
                                </div>
                                <Icons.Edit2 className="w-3 h-3 text-brand-pink opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        ))}
                    </div>
                )}

                <div className="pt-8 mt-8 border-t border-brand-pink/10 space-y-4">
                    <button 
                        onClick={handleSend}
                        className="w-full py-3.5 bg-brand-pink text-brand-bg rounded-xl font-bold uppercase tracking-wider text-[10px] flex justify-center items-center gap-2 hover:bg-brand-pink-hover transition-colors shadow-lg"
                    >
                        <Icons.MessageCircle className="w-4 h-4" />
                        {completionScore < 50 ? "Envoyer une première idée" : config.whatsapp.submitLabel}
                    </button>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                        {config.summary.reassurance.map((badge, i) => (
                            <span key={i} className="text-[9px] font-mono uppercase text-brand-text-muted/70 bg-brand-bg/50 px-2 py-1 rounded">
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section ref={ref} className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl md:text-5xl font-serif font-black text-brand-cream tracking-tight">
                    Préparer ma réunion parfumée
                </h2>
                <p className="text-brand-text-muted max-w-2xl mx-auto">{config.page.helper}</p>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-12">
                
                {/* Left Composer Form */}
                <div className="bg-brand-depth border border-brand-pink/15 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden h-fit">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-[80px] pointer-events-none" />
                    
                    <div className="relative z-10 min-h-[400px]">
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-8"
                            >
                                {currentStep === 0 && (
                                    <div className="space-y-6">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-serif font-bold text-brand-cream mb-2">1. Coordonnées & Secteur</h3>
                                            <p className="text-sm text-brand-text-muted">Ces informations permettent simplement à l'atelier de vérifier la zone et de vous répondre.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2">{config.formLabels.hostName}</label>
                                                <input type="text" placeholder={config.placeholders.hostName} value={formState.hostName} onChange={e => setFormState(s => ({...s, hostName: e.target.value}))} className="w-full bg-brand-bg/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none text-brand-cream" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2">{config.formLabels.hostPhone}</label>
                                                <input type="tel" placeholder={config.placeholders.hostPhone} value={formState.hostPhone} onChange={e => setFormState(s => ({...s, hostPhone: e.target.value}))} className="w-full bg-brand-bg/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none text-brand-cream" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2">{config.formLabels.city}</label>
                                                <input type="text" placeholder={config.placeholders.city} value={formState.city} onChange={e => setFormState(s => ({...s, city: e.target.value}))} className="w-full bg-brand-bg/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none text-brand-cream" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-serif font-bold text-brand-cream mb-2">2. Date & Invitées</h3>
                                            <p className="text-sm text-brand-text-muted">Le nombre peut rester approximatif. Il sert à organiser le format de la réunion.</p>
                                        </div>
                                        
                                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2">{config.formLabels.preferredDate}</label>
                                                <input type="text" placeholder={config.placeholders.preferredDate} value={formState.preferredDate} onChange={e => setFormState(s => ({...s, preferredDate: e.target.value}))} className="w-full bg-brand-bg/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none text-brand-cream" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2">{config.formLabels.alternativeDate}</label>
                                                <input type="text" placeholder={config.placeholders.alternativeDate} value={formState.alternativeDate} onChange={e => setFormState(s => ({...s, alternativeDate: e.target.value}))} className="w-full bg-brand-bg/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none text-brand-cream" />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-mono uppercase text-brand-text-muted mb-4">{config.formLabels.guestRange}</label>
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                {config.guestRanges.map(range => (
                                                    <button 
                                                        key={range.id}
                                                        onClick={() => setFormState(s => ({...s, guestRange: range.id as any}))}
                                                        className={`p-4 rounded-xl border text-left transition-all ${formState.guestRange === range.id ? 'bg-brand-cream text-brand-depth border-brand-cream shadow-lg' : 'bg-brand-bg/40 border-brand-pink/20 text-brand-cream hover:border-brand-pink/50'}`}
                                                    >
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="font-bold text-sm">{range.label}</span>
                                                            {formState.guestRange === range.id && <Icons.CheckCircle2 className="w-4 h-4" />}
                                                        </div>
                                                        <span className={`text-[10px] ${formState.guestRange === range.id ? 'text-brand-depth/70' : 'text-brand-text-muted'}`}>{range.helper}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-6">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-serif font-bold text-brand-cream mb-2">3. Ambiance de la réunion</h3>
                                            <p className="text-sm text-brand-text-muted">L'ambiance aide l'atelier à préparer les senteurs et les créations à présenter.</p>
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {config.meetingMoods.map(mood => (
                                                <button 
                                                    key={mood.id}
                                                    onClick={() => setFormState(s => ({...s, meetingMood: mood.id as any}))}
                                                    className={`p-4 rounded-xl border text-left transition-all ${formState.meetingMood === mood.id ? 'bg-brand-cream text-brand-depth border-brand-cream shadow-lg' : 'bg-brand-bg/40 border-brand-pink/20 text-brand-cream hover:border-brand-pink/50'}`}
                                                >
                                                    <DynamicIcon name={mood.icon} className={`w-5 h-5 mb-2 ${formState.meetingMood === mood.id ? 'text-brand-depth' : 'text-brand-pink'}`} />
                                                    <div className="font-bold text-sm mb-1">{mood.label}</div>
                                                    <div className={`text-[10px] leading-relaxed ${formState.meetingMood === mood.id ? 'text-brand-depth/70' : 'text-brand-text-muted'}`}>{mood.description}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-serif font-bold text-brand-cream mb-2">4. Créations à présenter</h3>
                                            <p className="text-sm text-brand-text-muted">Vous pouvez choisir plusieurs familles ou laisser l'atelier proposer.</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {config.productInterests.map(prod => {
                                                const isSelected = formState.interestedProducts.includes(prod.id);
                                                return (
                                                    <button 
                                                        key={prod.id}
                                                        onClick={() => toggleProduct(prod.id)}
                                                        className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all flex items-center gap-2 ${isSelected ? 'bg-brand-cream text-brand-depth border-brand-cream' : 'bg-brand-bg/40 border-brand-pink/20 text-brand-cream hover:border-brand-pink/50'}`}
                                                    >
                                                        <DynamicIcon name={prod.icon} className="w-3.5 h-3.5" />
                                                        {prod.label}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="space-y-6">
                                        <div className="mb-8">
                                            <h3 className="text-xl font-serif font-bold text-brand-cream mb-2">5. Informations complémentaires</h3>
                                            <p className="text-sm text-brand-text-muted">Précisez les derniers détails avant d'envoyer votre demande.</p>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2">{config.formLabels.addressDetails}</label>
                                                <textarea rows={3} placeholder={config.placeholders.addressDetails} value={formState.addressDetails} onChange={e => setFormState(s => ({...s, addressDetails: e.target.value}))} className="w-full bg-brand-bg/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none text-brand-cream resize-none" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-mono uppercase text-brand-text-muted mb-2">{config.formLabels.extraDetails}</label>
                                                <textarea rows={3} placeholder={config.placeholders.extraDetails} value={formState.extraDetails} onChange={e => setFormState(s => ({...s, extraDetails: e.target.value}))} className="w-full bg-brand-bg/50 border border-brand-pink/20 rounded-xl px-4 py-3 text-sm focus:border-brand-pink outline-none text-brand-cream resize-none" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-8 pt-6 border-t border-brand-pink/10 flex justify-between items-center">
                        {currentStep > 0 ? (
                            <button onClick={prevStep} className="px-5 py-2.5 rounded-full border border-brand-pink/20 text-brand-cream text-xs uppercase font-bold tracking-wider hover:bg-white/5 transition-colors">Retour</button>
                        ) : <div />}
                        
                        {currentStep < 4 ? (
                            <button onClick={nextStep} className="px-5 py-2.5 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-brand-pink text-xs uppercase font-bold tracking-wider hover:bg-brand-pink/20 transition-colors">Suivant</button>
                        ) : (
                            <button onClick={handleSend} className="px-6 py-2.5 rounded-full bg-brand-pink text-brand-bg text-xs uppercase font-bold tracking-wider hover:bg-brand-pink-hover transition-colors shadow-lg flex items-center gap-2">
                                <Icons.Send className="w-3 h-3" />
                                Envoyer
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Sticky Summary */}
                <div className="hidden lg:block">
                    <SummaryCard />
                </div>
            </div>
            
            {/* Mobile Summary & CTA */}
            <div className="lg:hidden mt-8">
               <SummaryCard />
            </div>

        </section>
    );
});

const HomeMeetingFAQ = () => {
    const config = homeMeetingPageConfig;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-black text-brand-cream text-center mb-12">Des questions ?</h2>
            <div className="space-y-4">
                {config.faq.map((item, idx) => (
                    <div key={idx} className="bg-brand-depth/40 border border-brand-pink/10 rounded-2xl overflow-hidden">
                        <button 
                            className="w-full px-6 py-5 text-left flex justify-between items-center cursor-pointer"
                            onClick={() => setOpenIndex(prev => prev === idx ? null : idx)}
                        >
                            <span className="font-bold text-brand-cream pr-4">{item.question}</span>
                            <Icons.ChevronDown className={`w-5 h-5 text-brand-pink transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                            {openIndex === idx && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-5 pt-0 text-sm text-brand-text-muted leading-relaxed font-light">
                                        {item.answer}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

const FinalHomeMeetingCTA = ({ onStart, onShop }: { onStart: () => void, onShop: () => void }) => {
    const config = homeMeetingPageConfig;
    return (
        <section className="py-24 px-6 mx-auto">
            <div className="max-w-4xl mx-auto bg-brand-depth border border-brand-pink/20 p-10 md:p-16 rounded-[3rem] text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-brand-wax/5 to-transparent pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-brand-pink/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 space-y-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-brand-pink font-bold">Un moment convivial</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black text-brand-cream max-w-2xl mx-auto leading-tight">
                        Une date approximative suffit pour commencer.
                    </h2>
                    <p className="text-brand-text-muted font-light max-w-xl mx-auto">
                        Envoyez votre ville, votre idée et le nombre d'invitées. L'atelier vous répondra avec les possibilités.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                        <button onClick={onStart} className="px-8 py-4 bg-brand-pink text-brand-bg rounded-full uppercase tracking-wider text-xs font-bold shadow-lg hover:bg-brand-pink-hover transition-colors flex justify-center items-center gap-2">
                            <Icons.CalendarHeart className="w-4 h-4" />
                            Envoyer une première demande
                        </button>
                        <button onClick={onShop} className="px-8 py-4 bg-brand-bg/50 border border-brand-pink/20 hover:border-brand-pink/50 text-brand-cream rounded-full uppercase tracking-wider text-xs font-bold transition-colors flex justify-center items-center gap-2">
                            Voir la boutique
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function HomeMeetingPage({ onShopClick, onContactClick }: { onShopClick: () => void, onContactClick: () => void }) {
    const composerRef = useRef<HTMLDivElement>(null);
    const config = homeMeetingPageConfig;

    const scrollToComposer = () => {
        composerRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleWhatsAppContact = () => {
        window.open(`https://wa.me/${config.brand.whatsappNumber}?text=${encodeURIComponent("Bonjour Christelle et Mélanie, je me renseigne sur les réunions à domicile.")}`, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="bg-brand-bg text-brand-cream min-h-screen">
            <HomeMeetingHero onStart={scrollToComposer} onContact={handleWhatsAppContact} />
            <HostBenefitsSection />
            <MeetingConditionsStrip />
            <MeetingFlowTimeline />
            <HomeMeetingRequestComposer ref={composerRef} />
            <HomeMeetingFAQ />
            <FinalHomeMeetingCTA onStart={scrollToComposer} onShop={onShopClick} />
        </div>
    );
}
