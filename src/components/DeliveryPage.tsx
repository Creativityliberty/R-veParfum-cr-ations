import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Truck,
  Clock,
  MapPin,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  Coins,
  MessageSquare,
  ArrowRight,
  CalendarSearch,
  CheckCircle,
  FileText,
  Camera,
  Layers,
  Sparkles,
} from "lucide-react";

import retraitColisImg from "../assets/images/retrait_colis.png";

interface DeliveryPageProps {
  onNavigateToContact?: () => void;
  onNavigateToBoutique?: () => void;
}

export default function DeliveryPage({
  onNavigateToContact,
  onNavigateToBoutique,
}: DeliveryPageProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const steps = [
    {
      num: "01",
      title: "Prise de contact amicale",
      desc: "Vous formulez votre projet (sélection, personnalisations de cires ou parfums) directement sur notre WhatsApp assisté.",
    },
    {
      num: "02",
      title: "Validation de la commande",
      desc: "Mélanie et Christelle étudient les volumes, finalisent le devis et fixent le délai exact de création.",
    },
    {
      num: "03",
      title: "Soin de la fabrication",
      desc: "Chaque cire végétale bio est coulée individuellement à la main dans notre atelier de Bourgogne (deux semaines en moyenne).",
    },
    {
      num: "04",
      title: "Emballage & Expédition",
      desc: "Vos créations sont emballées sous haute protection. Nous fixons un rendez-vous pour le retrait ou expédions le colis.",
    },
  ];

  const seasonalMonths = [
    {
      title: "Envoi à prix coûtant (Octobre à Mars)",
      desc: "Durant l'automne et l'hiver, profitez d'envois sans risque de fonte. Nous expédions vers toute la France métropolitaine via nos transporteurs agréés.",
      active: true,
      sub: "Recommandé pour les commandes de bougies et fondants fins.",
    },
    {
      title: "Retrait Atelier privilégié (Avril à Septembre)",
      desc: "Durant les fortes chaleurs estivales, nous encourageons chaleureusement le retrait gratuit directement en Bourgogne afin de préserver l'intégrité de la cire de soja.",
      active: false,
      sub: "Les envois restent possibles mais font l'objet d'une validation spécifique.",
    },
  ];

  const carriers = [
    {
      name: "La Poste / Colissimo",
      speed: "48h à 72h à domicile",
      desc: "L'expédition de confiance directement dans votre boîte aux lettres, idéale pour les colis d'un poids moyen.",
    },
    {
      name: "Mondial Relay",
      speed: "3 à 5 jours ouvrés en Point Relais",
      desc: "Solution économique de retrait de proximité, idéale pour récupérer souplement vos bouquets et fondants.",
    },
    {
      name: "Chronopost Express",
      speed: "24h chez vous",
      desc: "Pour les cadeaux urgents ou les animations de mariages dont la date approche rapidement.",
    },
  ];

  const faqs = [
    {
      q: "Dans quel délai vais-je recevoir mes créations parfumées ?",
      a: "Chaque contenant céramique ou suspension en cire est façonné et coulé de façon artisanale à la commande. Notre cycle moyen de fabrication et de séchage de la cire naturelle de soja est de deux semaines. Ce temps est indispensable pour que les essences de Grasse saturent la cire de façon saine.",
    },
    {
      q: "Pourquoi favorisez-vous le retrait direct durant l'été ?",
      a: "La pure cire de soja que nous utilisons fond à basse température (environ 50 degrés), ce qui garantit sa pureté végétale. Cependant, dans les camions de transport ou les boîtes aux lettres en plein soleil d'été, ces températures sont vite atteintes. Pour éviter de déformer vos jolis décors ou vos fleurs séchées incrustées, nous privilégions le retrait ou attendons un créneau météo doux.",
    },
    {
      q: "Combien coûtent réellement les frais de livraison ?",
      a: "Nous ne générons aucune marge commerciale sur le transport. Les frais de port vous sont facturés au tarif réel selon la grille d'expédition officielle du transporteur que vous choisissez, déterminée par le poids total théorique de vos cires et emballages.",
    },
    {
      q: "Comment garantissez-vous que le colis n'arrive pas détruit ?",
      a: "Vos produits parfumés sont de véritables œuvres délicates. Pour les protéger, nous doublons les colis de calages écologiques amortisseurs. Avant de sceller le carton d'expédition, nous réalisons systématiquement une capture photo de contrôle pour garder une trace qualitative de notre soin de préparation.",
    },
    {
      q: "Où se situe l'atelier pour le retrait gratuit en Bourgogne ?",
      a: "Notre atelier de création se situe à proximité de Chalon-sur-Saône, en Bourgogne. Les coordonnées GPS exactes ou notre adresse vous seront amicalement indiquées par WhatsApp une fois vos produits assemblés.",
    },
    {
      q: "Que faire si un amoncellement de produits arrive cassé ?",
      a: "Dès réception, inspectez l'état de la boîte. En cas de choc visible occasionné par le transporteur, prenez des photos sous plusieurs angles avant même l'allumage des mèches. Contactez-nous immédiatement via notre ligne WhatsApp pour que nous trouvions une solution réjouissante pour vous.",
    },
  ];

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      "Bonjour Christelle et Mélanie, je souhaite me renseigner sur les formalités d'expédition ou de retrait à l'atelier d'une création Rêve Parfumé !",
    );
    window.open(
      `https://wa.me/33781710985?text=${text}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="pb-12 text-left">
      {/* 1. HERO EXPÉDITION */}
      <section className="relative min-h-[50svh] -mt-24 md:-mt-28 flex flex-col justify-center overflow-hidden bg-brand-bg pt-32 pb-16 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto mt-12 md:mt-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-mono font-bold uppercase tracking-widest leading-none">
            <Truck className="w-4 h-4 text-brand-pink" />
            Précommande &amp; Retrait Bourgogne
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-cream tracking-tight leading-none">
            Livraison, retrait et{" "}
            <span className="font-light italic text-brand-purple">
              confection
            </span>
          </h1>

          <p className="text-sm md:text-base text-brand-text-muted leading-relaxed font-light">
            Chaque création parfumée de l'atelier fait l'objet d'un coulage
            dédié à la commande. Nous prenons le temps nécessaire pour parfaire
            chaque finition.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleWhatsAppContact}
              className="px-6 py-3.5 rounded-full bg-brand-pink text-brand-bg hover:bg-brand-pink-hover font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Poser une question livraison
            </button>
            <button
              onClick={onNavigateToBoutique}
              className="px-6 py-3.5 rounded-full bg-brand-depth text-brand-pink hover:bg-white/5 border border-brand-pink/20 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Voir la boutique
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <div className="space-y-20 pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. BLOC PROCESSUS PRÉCOMMANDE */}
        <section className="space-y-8 bg-brand-depth/40 border border-brand-pink/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-[90px] pointer-events-none" />

          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono text-brand-pink tracking-widest uppercase font-semibold">
              Méthodologie d'Atelier
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
              Chaque création parfumée est façonnée à la main
            </h2>
            <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
              Pour conserver toute l'intensité de nos huiles et fleurs séchées,
              nous ne stockons aucun produit fini de longue durée dans un hangar
              froid. Christelle et Mélanie lancent les fabrications une fois
              votre commande assistée validée.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-6 bg-brand-depth border border-brand-pink/5 rounded-2xl space-y-3 flex flex-col justify-between hover:border-brand-pink/20 transition-all"
              >
                <div className="space-y-2">
                  <span className="block text-2xl font-mono text-brand-pink font-bold border-b border-brand-pink/10 pb-2">
                    {st.num}
                  </span>
                  <h3 className="font-serif font-bold text-sm text-brand-cream tracking-wide">
                    {st.title}
                  </h3>
                  <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                    {st.desc}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-mono text-brand-pink/70 pt-2">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Validé par l'Atelier
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. TIMELINE SIMPLIFIÉE */}
        <section className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
              Délai d'acheminement moyen
            </h2>
            <p className="text-xs text-brand-text-muted max-w-lg mx-auto leading-relaxed">
              Un processus paisible et transparent pour une cire d'une qualité
              aromatique irréprochable.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative pl-6 sm:pl-0">
            {/* Vertical central path on desktop */}
            <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 w-px bg-brand-pink/15 -translate-x-1/2" />
            {/* Vertical side path on mobile */}
            <div className="sm:hidden absolute left-2.5 top-2 bottom-2 w-px bg-brand-pink/15" />

            <div className="space-y-12 relative">
              {/* Timeline item 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="sm:text-right sm:pr-8 space-y-1.5 relative">
                  <div className="absolute left-[-21px] sm:left-auto sm:right-[-29px] top-1.5 w-4 h-4 rounded-full bg-brand-pink border border-brand-bg shadow-sm" />
                  <span className="text-[10px] uppercase tracking-widest font-mono text-brand-pink font-bold">
                    Jour J
                  </span>
                  <h4 className="font-serif font-bold text-sm text-brand-cream">
                    Validation de commande
                  </h4>
                  <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                    L'accord est scellé par WhatsApp avec la réception de vos
                    choix décoratifs et d'essences de Grasse.
                  </p>
                </div>
                <div className="hidden sm:block" />
              </div>

              {/* Timeline item 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="hidden sm:block" />
                <div className="sm:pl-8 space-y-1.5 relative">
                  <div className="absolute left-[-21px] sm:left-[-11px] top-1.5 w-4 h-4 rounded-full bg-brand-purple border border-brand-bg shadow-sm" />
                  <span className="text-[10px] uppercase tracking-widest font-mono text-brand-purple font-bold">
                    Semaine 1
                  </span>
                  <h4 className="font-serif font-bold text-sm text-brand-cream font-medium">
                    Préparation &amp; Moulage
                  </h4>
                  <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                    Coulage individuel à basse température de la cire de soja,
                    ornementation florale et cristallisation à l'abri des
                    variations d'air.
                  </p>
                </div>
              </div>

              {/* Timeline item 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="sm:text-right sm:pr-8 space-y-1.5 relative">
                  <div className="absolute left-[-21px] sm:left-auto sm:right-[-29px] top-1.5 w-4 h-4 rounded-full bg-brand-pink border border-brand-bg shadow-sm" />
                  <span className="text-[10px] uppercase tracking-widest font-mono text-brand-pink font-bold">
                    Semaine 2
                  </span>
                  <h4 className="font-serif font-bold text-sm text-brand-cream">
                    Séchage &amp; Contrôle esthétique
                  </h4>
                  <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                    La cire acquiert sa fermeté de cire dure. Nous contrôlons
                    l'harmonie des motifs floraux et le comportement des mèches
                    de coton ou de bois.
                  </p>
                </div>
                <div className="hidden sm:block" />
              </div>

              {/* Timeline item 4 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="hidden sm:block" />
                <div className="sm:pl-8 space-y-1.5 relative">
                  <div className="absolute left-[-21px] sm:left-[-11px] top-1.5 w-4 h-4 rounded-full bg-brand-purple border border-brand-bg shadow-sm" />
                  <span className="text-[10px] uppercase tracking-widest font-mono text-brand-purple font-bold">
                    Jour J+14
                  </span>
                  <h4 className="font-serif font-bold text-sm text-brand-cream font-medium">
                    Prise en charge postale
                  </h4>
                  <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                    Enveloppement sous carton double cannelure et remise au
                    transporteur de votre région.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PÉRIODES D'ENVOI SAISONNIER */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono text-brand-pink tracking-widest uppercase font-semibold">
              Thermodynamique de la Cire
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream mt-1">
              Périodes d'envois adaptées à la météo
            </h2>
            <p className="text-xs text-brand-text-muted leading-relaxed font-light">
              La cire de soja naturelle est particulièrement sensible aux fortes
              chaleurs d'été lors du parcours de transit postal. Nous avons mis
              en place des créneaux clairs pour parer à tout désagrément.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {seasonalMonths.map((month, i) => (
              <div
                key={i}
                className={`p-6 bg-brand-depth border rounded-2xl text-left space-y-4 hover:shadow-2xl transition-all duration-300 ${
                  month.active
                    ? "border-brand-pink/25 bg-brand-depth/60"
                    : "border-brand-pink/10 opacity-80"
                }`}
              >
                <div className="flex items-center gap-2 border-b border-brand-pink/5 pb-2">
                  <CalendarSearch
                    className={`w-5 h-5 ${month.active ? "text-brand-pink" : "text-brand-purple"}`}
                  />
                  <h3 className="font-serif font-bold text-base text-brand-cream">
                    {month.title}
                  </h3>
                </div>
                <p className="text-xs text-brand-text-muted leading-relaxed font-light">
                  {month.desc}
                </p>
                <div className="text-[11px] text-brand-pink font-mono leading-tight pl-2 border-l-2 border-brand-pink/20">
                  {month.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. TRANSPORTEURS DISPONIBLES */}
        <section className="space-y-6">
          <h3 className="text-xl font-serif font-bold text-brand-cream border-b border-brand-pink/10 pb-3">
            Transporteurs &amp; Acheminements du quotidien
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {carriers.map((c, i) => (
              <div
                key={i}
                className="p-5 bg-brand-depth border border-brand-pink/10 rounded-2xl text-left space-y-3 hover:border-brand-pink/20 transition-all"
              >
                <span className="text-xs font-mono font-bold text-brand-pink uppercase bg-brand-pink/5 px-2.5 py-1 rounded-md border border-brand-pink/10 inline-block">
                  {c.name}
                </span>
                <p className="text-xs font-bold text-brand-cream">{c.speed}</p>
                <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. FRAIS DE LIVRAISON ESTIMÉS */}
        <section className="space-y-6">
          <div className="p-6 bg-brand-depth/40 border border-brand-pink/10 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 border-b border-brand-pink/5 pb-3">
              <Coins className="w-5 h-5 text-brand-pink" />
              <h4 className="font-serif font-semibold text-lg text-brand-cream">
                Calcul amical des frais de livraison
              </h4>
            </div>
            <p className="text-xs text-brand-text-muted leading-relaxed font-light">
              Le coût de l'envoi postal dépend strictement du poids global
              pondéré de vos créations (cire + poids du carton et
              intercalaires). Les tarifs d'expédition vous seront validés à prix
              coûtant, sans aucune marge, lors de notre chiffrage amical sur
              WhatsApp.
            </p>

            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs font-mono text-brand-text-muted">
                <thead>
                  <tr className="border-b border-brand-pink/15 text-[10px] text-brand-pink tracking-widest uppercase">
                    <th className="py-2.5 px-3">Catégorie de colis</th>
                    <th className="py-2.5 px-3">Poids estimé</th>
                    <th className="py-2.5 px-3 text-right">
                      Tarifs indicatifs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-pink/5">
                  <tr>
                    <td className="py-3 px-3 text-brand-cream font-medium">
                      Arrosoir, Déesse chandelle, Déesse buste, Buste, Design,
                      Pot rayure
                    </td>
                    <td className="py-3 px-3">Mondial Relay Lockers</td>
                    <td className="py-3 px-3 text-right text-brand-pink font-bold">
                      5,99 €
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 text-brand-cream font-medium">
                      Cadre, Grand cadre, Pot (bouquet de fondants), Gros pot 18
                      fondants
                    </td>
                    <td className="py-3 px-3">Mondial Relay Lockers</td>
                    <td className="py-3 px-3 text-right text-brand-pink font-bold">
                      7,99 €
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7. RETRAIT À DOMICILE DIRECT & LOCKERS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch bg-brand-depth/25 p-6 md:p-8 rounded-3xl border border-brand-pink/10 relative overflow-hidden">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-brand-pink/10 text-brand-pink text-[10px] font-mono uppercase tracking-wider font-bold">
              <MapPin className="w-3.5 h-3.5" />
              Retrait Colis & Atelier
            </span>
            <h3 className="text-xl font-serif font-bold text-brand-cream">
              Retrait en Point Relais ou à l'Atelier
            </h3>
            <p className="text-xs text-brand-text-muted leading-relaxed font-light">
              Pour récupérer vos colis, nous vous proposons la livraison sécurisée via Mondial Relay (en point relais ou Lockers) ou le retrait gratuit en main propre à notre atelier de Bourgogne. 
            </p>
            <ul className="space-y-2 text-[11px] font-mono text-brand-text-muted">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-pink shrink-0" />
                Retrait Atelier 100% gratuit
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-brand-pink shrink-0" />
                Réseau Mondial Relay disponible partout en France
              </li>
            </ul>
          </div>

          <div className="relative p-6 bg-brand-bg rounded-2xl border border-brand-pink/5 flex flex-col justify-center items-center text-center space-y-4 shadow-inner min-h-[200px] overflow-hidden group">
            {/* Espace de présentation élégant de la consigne automatique */}
            <div className="absolute inset-0 bg-brand-depth/40 z-0">
              <img 
                src={retraitColisImg} 
                alt="Mondial Relay Consigne Locker 24/7" 
                className="w-full h-full object-cover opacity-35 group-hover:opacity-45 transition-all duration-500 scale-100 group-hover:scale-105"
              />
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex justify-center mb-3 bg-white px-4 py-2 rounded-xl shadow-md border border-zinc-100">
                {/* Clean, high-fidelity inline SVG logo for Mondial Relay */}
                <svg className="h-6 w-auto" viewBox="0 0 320 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.5 56.4V22.2H32.7L43.8 45.4L54.9 22.2H65.1V56.4H56.9V33.6L46.8 54.4H40.8L30.7 33.6V56.4H22.5Z" fill="#CE0058" />
                  <path d="M72.2 44.5C72.2 36.7 78.3 30.6 86.1 30.6C93.9 30.6 100 36.7 100 44.5C100 52.3 93.9 58.4 86.1 58.4C78.3 58.4 72.2 52.3 72.2 44.5ZM91.8 44.5C91.8 41.3 89.2 38.7 86.1 38.7C83 38.7 80.4 41.3 80.4 44.5C80.4 47.7 83 50.3 86.1 50.3C89.2 50.3 91.8 47.7 91.8 44.5Z" fill="#CE0058" />
                  <path d="M106.6 56.4V31.8H114.2V36.2C116.1 32.8 119.5 30.6 123.6 30.6C130.6 30.6 134.7 35.3 134.7 42.6V56.4H126.9V43.8C126.9 39.7 124.6 37.4 120.9 37.4C117.2 37.4 114.4 39.8 114.4 44.3V56.4H106.6Z" fill="#CE0058" />
                  <path d="M157.1 56.4H149.5V52.1C147.6 55.4 144.2 57.6 140.1 57.6C133.1 57.6 129 52.9 129 45.6C129 38.3 133.1 33.6 140.1 33.6C144.2 33.6 147.6 35.8 149.5 39.1V22.2H157.1V56.4ZM149.5 45.6C149.5 41.1 146.7 38.7 143 38.7C139.3 38.7 136.6 41.1 136.6 45.6C136.6 50.1 139.3 52.5 143 52.5C146.7 52.5 149.5 50.1 149.5 45.6Z" fill="#CE0058" />
                  <path d="M165.7 25.6C165.7 23.2 167.6 21.3 170 21.3C172.4 21.3 174.3 23.2 174.3 25.6C174.3 28 172.4 29.9 170 29.9C167.6 29.9 165.7 28 165.7 25.6ZM166.1 56.4V31.8H173.9V56.4H166.1Z" fill="#CE0058" />
                  <path d="M194.2 56.4H186.6V52.1C184.7 55.4 181.3 57.6 177.2 57.6C170.2 57.6 166.1 52.9 166.1 45.6C166.1 38.3 170.2 33.6 177.2 33.6C181.3 33.6 184.7 35.8 186.6 39.1V31.8H194.2V56.4ZM186.6 45.6C186.6 41.1 183.8 38.7 180.1 38.7C176.4 38.7 173.7 41.1 173.7 45.6C173.7 50.1 176.4 52.5 180.1 52.5C183.8 52.5 186.6 50.1 186.6 45.6Z" fill="#CE0058" />
                  <path d="M201.2 56.4V22.2H209V56.4H201.2Z" fill="#CE0058" />
                  <path d="M228.3 22.2H236.1V48C236.1 53 238.4 55.2 242.1 55.2C245.8 55.2 248.1 53 248.1 48V22.2H255.9V47.5C255.9 57.9 249.7 61.8 242.1 61.8C234.5 61.8 228.3 57.9 228.3 47.5V22.2Z" fill="#CE0058" />
                  <circle cx="282" cy="40" r="18" fill="#1C2D5A" />
                  <path d="M275 35H289M275 40H289M278 45H286" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
              <p className="text-xs text-brand-cream font-serif italic max-w-[200px] bg-black/40 px-3 py-2 rounded-lg backdrop-blur-sm border border-brand-pink/20">
                "Une occasion parfaite de récupérer vos cires au vert, ou au Locker le plus proche."
              </p>
            </div>
          </div>
        </section>

        {/* 8. PROTECTION DES COLIS */}
        <section className="p-6 bg-brand-depth border border-brand-pink/10 rounded-2xl text-left space-y-4">
          <div className="flex items-center gap-2 border-b border-brand-pink/5 pb-3">
            <ShieldCheck className="w-5 h-5 text-brand-pink" />
            <h4 className="font-serif font-bold text-base text-brand-cream">
              Soin des enveloppements &amp; protections
            </h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-brand-text-muted font-light leading-relaxed">
            <div className="space-y-1.5">
              <div className="p-2 bg-brand-bg rounded-lg w-fit text-brand-pink">
                <Layers className="w-4 h-4" />
              </div>
              <h5 className="font-semibold text-brand-cream font-serif text-sm">
                Matelassage double couche
              </h5>
              <p className="text-[11px]">
                Nous enveloppons à l'unité chaque pot de cire afin de garantir
                un amorti total face aux torsions postales.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="p-2 bg-brand-bg rounded-lg w-fit text-brand-pink">
                <Camera className="w-4 h-4" />
              </div>
              <h5 className="font-semibold text-brand-cream font-serif text-sm">
                Archivage photo de contrôle
              </h5>
              <p className="text-[11px]">
                Une photographie de l'aménagement du colis est archivée en
                atelier avant dépôt du paquet.
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="p-2 bg-brand-bg rounded-lg w-fit text-brand-pink">
                <FileText className="w-4 h-4" />
              </div>
              <h5 className="font-semibold text-brand-cream font-serif text-sm">
                Suivi temps réel
              </h5>
              <p className="text-[11px]">
                Un numéro de traçage colis vous est transmis dès dépose du
                carton chez le transporteur.
              </p>
            </div>
          </div>
        </section>

        {/* 9. FAQ ACCORDEON */}
        <section className="space-y-8">
          <div className="text-left">
            <span className="text-xs font-mono text-brand-pink tracking-widest uppercase font-semibold">
              Des doutes encore ?
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream mt-1">
              Foire aux questions expéditions
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-brand-depth/40 border border-brand-pink/10 hover:border-brand-pink/25 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4 text-xs font-semibold text-brand-cream font-serif tracking-wide focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-brand-pink shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-pink transition-transform duration-300 shrink-0 ${activeFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
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
