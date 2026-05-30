import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Facebook, 
  Instagram, 
  MessageSquare, 
  Send, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag, 
  Palette, 
  HelpCircle, 
  Truck, 
  Calendar,
  Lock,
  ChevronDown,
  Clock,
  MapPin,
  CheckCircle,
  Smartphone
} from 'lucide-react';

interface ContactPageProps {
  setCurrentTab: (tab: string) => void;
  onSuccess: (text: string) => void;
}

export default function ContactPage({ setCurrentTab, onSuccess }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'Commande',
    message: ''
  });
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [isHoveredHero, setIsHoveredHero] = useState(false);

  const quickMessages = {
    order: "Bonjour, je souhaite passer une commande Rêve Parfumé Création. Produit souhaité :",
    custom: "Bonjour, je souhaite une création personnalisée. Type de produit, couleurs, senteur et occasion :",
    event: "Bonjour, je souhaite un devis pour un événement. Type d’événement, date et quantité :",
    meeting: "Bonjour, je souhaite organiser une réunion à domicile. Ville, nombre d’invités et date souhaitée :",
    delivery: "Bonjour, j’ai une question concernant la livraison ou le retrait :"
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppAction = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/33781710985?text=${encoded}`, '_blank', 'noreferrer,noopener');
    onSuccess("L'envoi vers notre ligne WhatsApp d'atelier a été initié.");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      onSuccess("Veuillez remplir votre nom et votre précieux message.");
      return;
    }

    const text = `--- ATELIER RÊVE PARFUMÉ ---
FICHE DE CONSULTATION PRIVÉE

Client : ${formData.name}
Téléphone : ${formData.phone ? formData.phone : "Non spécifié"}
Sujet : ${formData.subject}

Demande :
"${formData.message}"

Je souhaite par cette demande initier un accompagnement avec l'atelier pour donner vie à ce projet olfactif.`;

    handleWhatsAppAction(text);
  };

  const contactFaqs = [
    {
      q: "Quel est le meilleur moyen de vous contacter ?",
      a: "Pour obtenir un conseil rapide ou personnaliser vos couleurs et parfums de Grasse, notre ligne WhatsApp est le canal le plus réactif. Vous parlez directement avec Mélanie et Christelle, sans intermédiaire, ce qui nous permet d'étudier vos croquis ensemble s'il le faut."
    },
    {
      q: "Peut-on demander une création entièrement personnalisée ?",
      a: "Absolument ! Qu'il s'agisse d'un contenant en grès céramique patiné d'un prénom en doré, d'étiquettes sur-mesure pour un baptême ou baptêmes, ou d'inclusions spécifiques de bruyères ou pivoines de saison, tout est envisageable."
    },
    {
      q: "Quand faut-il idéalement commander ?",
      a: "Parce que nos coulages exigent environ deux semaines de séchage pour retenir intensément les parfums, et que la demande est forte, nous vous suggérons de prendre contact au moins 3 à 4 semaines avant la date de votre événement ou moment d'offrir."
    },
    {
      q: "Comment se passe le paiement des créations préparées ?",
      a: "Une fois que nous avons validé les volumes et les frais de livraison à prix coûtant sur WhatsApp, nous vous envoyons un devis récapitulatif. Le règlement se fait sereinement par virement instantané Wero, Paylib ou via un lien PayPal sécurisé."
    }
  ];

  return (
    <div className="pb-12 text-left" id="contact-page-root">
      
      {/* 1. HERO CONTACT */}
      <section 
        className="relative min-h-[50svh] -mt-24 md:-mt-28 flex flex-col justify-center overflow-hidden bg-brand-bg pt-32 pb-16 px-4"
        onMouseEnter={() => setIsHoveredHero(true)}
        onMouseLeave={() => setIsHoveredHero(false)}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto mt-12 md:mt-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-mono font-bold uppercase tracking-widest leading-none mx-auto">
            <Smartphone className="w-3.5 h-3.5 fill-brand-pink/20 text-brand-pink animate-pulse" />
            Contact Direct
          </div>
  
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-cream max-w-3xl mx-auto tracking-tight leading-tight">
            Une question ou une <span className="font-light italic text-brand-purple">envie particulière</span> ?
          </h1>
  
          <p className="text-sm md:text-base text-brand-text-muted leading-relaxed max-w-xl mx-auto font-light">
            Contactez-nous sereinement pour commander, demander une personnalisation fleurie, un devis d'événement sur-mesure ou réserver votre réunion à domicile.
          </p>
  
          <div className="pt-4 flex justify-center">
            <button
              onClick={() => handleWhatsAppAction("Bonjour Christelle et Mélanie, je souhaite me renseigner concernant l'atelier d'artisanat Rêve Parfumé Création.")}
              className="px-8 py-3.5 rounded-full bg-brand-pink text-brand-bg hover:bg-brand-pink-hover font-bold text-xs tracking-wider uppercase transition-all shadow-md inline-flex items-center gap-2 cursor-pointer hover:scale-[1.03]"
            >
              <MessageSquare className="w-4 h-4" />
              Écrire sur notre WhatsApp d'Atelier
            </button>
          </div>
  
          {/* Decorative bubbles represent direct messaging */}
          <div className="hidden sm:block absolute top-12 left-0 lg:-left-12 p-3 bg-brand-bg/80 border border-brand-pink/10 rounded-2xl text-[10px] text-brand-pink font-mono tracking-wide backdrop-blur-md flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-brand-pink" />
            Ligne directe en Bourgogne
          </div>
          <div className="hidden sm:block absolute bottom-0 right-0 lg:-right-12 p-3 bg-brand-bg/80 border border-brand-pink/10 rounded-2xl text-[10px] text-brand-purple font-mono tracking-wide backdrop-blur-md flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-purple" />
            Réponse rapide sous 24h
          </div>
        </div>
      </section>

      <div className="space-y-20 pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 2. CARTES DE CONTACT RAPIDE (5 INSTANT INLETS) */}
      <section className="space-y-6">
        <h2 className="font-serif font-bold text-xl text-brand-cream border-b border-brand-pink/10 pb-3">
          Entrées de contact instantanées
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Order */}
          <div className="bg-brand-depth/40 border border-brand-pink/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-brand-pink/30 hover:-translate-y-1 transition-all group">
            <div className="space-y-2">
              <div className="p-2.5 bg-brand-pink/10 text-brand-pink rounded-xl w-fit">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-semibold text-xs tracking-wide text-brand-cream">1. Commander un produit</h3>
              <p className="text-[10px] text-brand-text-muted leading-relaxed font-light">Discutez en direct de nos créations en pot ou en suspension disponibles.</p>
            </div>
            <button
              onClick={() => handleWhatsAppAction(quickMessages.order)}
              className="w-full py-2 rounded-full border border-brand-pink/25 text-brand-pink hover:bg-brand-pink hover:text-brand-bg text-[10px] font-bold tracking-wider uppercase transition-colors"
            >
              Écrire
            </button>
          </div>

          {/* Card 2: Custom */}
          <div className="bg-brand-depth/40 border border-brand-pink/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-brand-pink/30 hover:-translate-y-1 transition-all group">
            <div className="space-y-2">
              <div className="p-2.5 bg-brand-pink/10 text-brand-pink rounded-xl w-fit">
                <Palette className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-semibold text-xs tracking-wide text-brand-cream">2. Personnalisation</h3>
              <p className="text-[10px] text-brand-text-muted leading-relaxed font-light">Choix d'étiquette, de décors floraux uniques et de cires parfumées saines.</p>
            </div>
            <button
              onClick={() => handleWhatsAppAction(quickMessages.custom)}
              className="w-full py-2 rounded-full border border-brand-pink/25 text-brand-pink hover:bg-brand-pink hover:text-brand-bg text-[10px] font-bold tracking-wider uppercase transition-colors"
            >
              Écrire
            </button>
          </div>

          {/* Card 3: Events */}
          <div className="bg-brand-depth/40 border border-brand-pink/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-brand-pink/30 hover:-translate-y-1 transition-all group">
            <div className="space-y-2">
              <div className="p-2.5 bg-brand-pink/10 text-brand-pink rounded-xl w-fit">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-semibold text-xs tracking-wide text-brand-cream">3. Devis Événementiel</h3>
              <p className="text-[10px] text-brand-text-muted leading-relaxed font-light">Cadeaux d'invités fleuris pour vos somptueux mariages, baptêmes ou anniversaires.</p>
            </div>
            <button
              onClick={() => handleWhatsAppAction(quickMessages.event)}
              className="w-full py-2 rounded-full border border-brand-pink/25 text-brand-pink hover:bg-brand-pink hover:text-brand-bg text-[10px] font-bold tracking-wider uppercase transition-colors"
            >
              Écrire
            </button>
          </div>

          {/* Card 4: Meeting */}
          <div className="bg-brand-depth/40 border border-brand-pink/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-brand-pink/30 hover:-translate-y-1 transition-all group">
            <div className="space-y-2">
              <div className="p-2.5 bg-brand-pink/10 text-brand-pink rounded-xl w-fit">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-semibold text-xs tracking-wide text-brand-cream">4. Réunion à domicile</h3>
              <p className="text-[10px] text-brand-text-muted leading-relaxed font-light">Accueillez un atelier parfumé convivial entre proches autour de nos essences.</p>
            </div>
            <button
              onClick={() => handleWhatsAppAction(quickMessages.meeting)}
              className="w-full py-2 rounded-full border border-brand-pink/25 text-brand-pink hover:bg-brand-pink hover:text-brand-bg text-[10px] font-bold tracking-wider uppercase transition-colors"
            >
              Écrire
            </button>
          </div>

          {/* Card 5: Delivery */}
          <div className="bg-brand-depth/40 border border-brand-pink/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-brand-pink/30 hover:-translate-y-1 transition-all group">
            <div className="space-y-2">
              <div className="p-2.5 bg-brand-pink/10 text-brand-pink rounded-xl w-fit">
                <Truck className="w-4 h-4" />
              </div>
              <h3 className="font-serif font-semibold text-xs tracking-wide text-brand-cream">5. Question livraison</h3>
              <p className="text-[10px] text-brand-text-muted leading-relaxed font-light">Informations sur nos emballages d'atelier, les transporteurs et le retrait direct.</p>
            </div>
            <button
              onClick={() => handleWhatsAppAction(quickMessages.delivery)}
              className="w-full py-2 rounded-full border border-brand-pink/25 text-brand-pink hover:bg-brand-pink hover:text-brand-bg text-[10px] font-bold tracking-wider uppercase transition-colors"
            >
              Écrire
            </button>
          </div>

        </div>
      </section>

      {/* 3. FORMULAIRE GÉNÉRAL - CARD LIQUID-STRONG & INFOS PRATIQUES */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Form central card liquid-strong */}
        <div className="lg:col-span-7 liquid-strong p-6 md:p-8 rounded-[32px] space-y-6">
          <div className="space-y-1.5 text-left border-b border-brand-pink/10 pb-4">
            <span className="text-[10px] font-mono font-bold text-brand-pink uppercase tracking-widest">Atelier de cire d'art</span>
            <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-cream">L'expérience d'une écriture libre</h3>
            <p className="text-xs text-brand-text-muted font-light leading-relaxed">
              Formulez votre demande ci-dessous. Au clic, votre sillage de texte est fidèlement encodé pour s'ouvrir sur votre fil WhatsApp personnel.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono text-brand-text-muted uppercase tracking-wider mb-1.5">Votre Prénom / Nom *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Ex : Sophie"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-brand-depth/80 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-brand-text-muted uppercase tracking-wider mb-1.5">Votre Téléphone (Optionnel)</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Ex : 0600000000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-brand-depth/80 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-brand-text-muted uppercase tracking-wider mb-1.5">Objet de votre message d'attention</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-brand-depth/80 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-colors"
              >
                <option value="Commande">Demande de Commande boutique</option>
                <option value="Personnalisation">Projet de Personnalisation sur-mesure</option>
                <option value="Événement">Devis Événementiel (Mariages, Comités d'entreprise)</option>
                <option value="Réunion à domicile">Organisation d'une Réunion Parfumée</option>
                <option value="Livraison">Question de livraison ou de retrait</option>
                <option value="Autre">Autre demande artistique</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-brand-text-muted uppercase tracking-wider mb-1.5">Votre demande détaillée *</label>
              <textarea 
                name="message"
                required
                rows={4}
                placeholder="Décrivez-nous vos préférences décoratives, les contenants céramiques qui vous charment ou les senteurs de Grasse que vous préférez..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-brand-depth/80 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-brand-pink text-brand-bg font-extrabold text-xs tracking-wider uppercase rounded-full hover:bg-brand-pink-hover transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:scale-[1.01]"
            >
              <Send className="w-4 h-4 text-brand-bg fill-brand-bg" />
              Récupérer et envoyer sur WhatsApp
            </button>

            <span className="block text-[10px] text-center font-mono text-brand-text-muted/65 italic flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-pink" />
              Nous répondons avec attention dans la journée.
            </span>
          </form>
        </div>

        {/* 4. Column right: 4 INFOS PRATIQUES CORNER */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Card A: Preorder delay */}
          <div className="p-5 bg-brand-depth/50 border border-brand-pink/10 rounded-2xl text-left space-y-2">
            <div className="flex items-center gap-2 text-brand-pink font-semibold text-xs border-b border-brand-pink/5 pb-2">
              <Clock className="w-4 h-4" />
              Création à la commande
            </div>
            <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
              Toutes nos cires de soja sont coulées individuellement à la main. Le délai moyen est d’<strong>environ deux semaines</strong>, garantissant une sature aromatique irréprochable.
            </p>
          </div>

          {/* Card B: Delivery times */}
          <div className="p-5 bg-brand-depth/50 border border-brand-pink/10 rounded-2xl text-left space-y-2">
            <div className="flex items-center gap-2 text-brand-pink font-semibold text-xs border-b border-brand-pink/5 pb-2">
              <Truck className="w-4 h-4" />
              Période d'expéditions
            </div>
            <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
              Afin de conserver la plastique de nos décors botaniques, les colis sont prioritaires d'<strong>octobre à mars</strong>. En été, le retrait à l'atelier est de rigueur.
            </p>
          </div>

          {/* Card C: Appt pickup */}
          <div className="p-5 bg-brand-depth/50 border border-brand-pink/10 rounded-2xl text-left space-y-2">
            <div className="flex items-center gap-2 text-brand-pink font-semibold text-xs border-b border-brand-pink/5 pb-2">
              <MapPin className="w-4 h-4" />
              Retrait Atelier
            </div>
            <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
              Le retrait de vos créations s'effectue sur rendez-vous à notre atelier de Bourgogne. L'adresse précise vous est partagée dès solidification de la cire végétale.
            </p>
          </div>

          {/* Card D: Socials glass */}
          <div className="p-5 bg-brand-depth/50 border border-brand-pink/10 rounded-2xl text-left space-y-3">
            <span className="block text-[10px] font-mono text-brand-text-muted/60 uppercase font-bold tracking-wider">Trouvez-nous en direct</span>
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-brand-bg/60 hover:bg-brand-pink/10 border border-brand-pink/10 rounded-xl text-[10px] font-mono text-brand-cream hover:text-brand-pink flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
              >
                <Facebook className="w-3.5 h-3.5" />
                Facebook
              </a>
              <a 
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-brand-bg/60 hover:bg-brand-pink/10 border border-brand-pink/10 rounded-xl text-[10px] font-mono text-brand-cream hover:text-brand-pink flex items-center justify-center gap-1.5 transition-all cursor-pointer group"
              >
                <Instagram className="w-3.5 h-3.5" />
                Instagram
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 6. MINI FAQ CONTACT */}
      <section className="space-y-8">
        <div className="text-left">
          <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">Des Réponses Claires</span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
            Foire aux questions contact &amp; commandes
          </h2>
        </div>

        <div className="space-y-3 max-w-3xl">
          {contactFaqs.map((faq, idx) => (
            <div 
              key={idx}
              className="bg-brand-depth/40 border border-brand-pink/5 hover:border-brand-pink/15 rounded-2xl overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setActiveQuestion(activeQuestion === idx ? null : idx)}
                className="w-full p-5 text-left flex justify-between items-center gap-4 text-xs font-semibold text-brand-cream font-serif focus:outline-none cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-brand-pink shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={`w-4 h-4 text-brand-pink transition-transform duration-300 shrink-0 ${activeQuestion === idx ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {activeQuestion === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-1 text-xs text-brand-text-muted leading-relaxed font-light border-t border-brand-pink/5">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

    </div>
    </div>
  );
}
