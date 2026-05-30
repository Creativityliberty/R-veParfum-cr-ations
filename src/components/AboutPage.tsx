import React from "react";
import atelierCoulageImg from '../assets/images/atelier/atelier_bougie_coulage.png';
import atelierBourgogneImg from '../assets/images/atelier/atelier_bourgogne.png';
import bougiePotImg from '../assets/images/products/bougie_pot_artisanale.png';
import cadreImg from '../assets/images/products/cadre_cire_fleurs.png';
import photoDeNousImg from '../assets/images/atelier/photo_de_nous.jpeg';
import accueil1Img from '../assets/images/atelier/accueil_1.jpeg';
import accueil2Img from '../assets/images/atelier/accueil_2.jpeg';
import accueil3Img from '../assets/images/atelier/accueil_3.jpeg';
import accueil4Img from '../assets/images/atelier/accueil_4.jpeg';
import { motion } from "motion/react";
import {
  Heart,
  Sparkles,
  MessageSquare,
  ArrowRight,
  Check,
  Award,
  Flame,
  Droplet,
  Compass,
  Leaf,
  ShieldCheck,
  PenTool,
  PackageOpen,
  Camera,
  Users,
} from "lucide-react";

interface AboutPageProps {
  onNavigateToBoutique?: () => void;
  onNavigateToContact?: () => void;
}

export default function AboutPage({
  onNavigateToBoutique,
  onNavigateToContact,
}: AboutPageProps) {
  const values = [
    {
      title: "Naturel",
      desc: "De la pure cire de soja végétale 100% biodégradable, exempte de dérivés pétrochimiques ou paraffine, et des mèches en coton non traité ou en bois crépitant.",
      icon: <Leaf className="w-5 h-5 text-brand-pink" />,
    },
    {
      title: "Fait Main",
      desc: "Chaque création est coulée, parée de botaniques et étiquetée manuellement par Christelle et Mélanie au cœur de la Bourgogne.",
      icon: <Award className="w-5 h-5 text-brand-pink" />,
    },
    {
      title: "Soin du Détail",
      desc: "Des étiquettes calligraphiées avec délicatesse, des rubans de lin véritable et une finition parfumée soignée pour un déballage inoubliable.",
      icon: <Sparkles className="w-5 h-5 text-brand-pink" />,
    },
    {
      title: "Personnalisation",
      desc: "Ajustez les harmonies chromatiques, sélectionnez vos fragrances préférées et gravez vos messages pour donner vie à un objet d'émotion.",
      icon: <Compass className="w-5 h-5 text-brand-pink" />,
    },
    {
      title: "Senteurs Durables",
      desc: "Une saine saturation en concentrés exclusifs de Grasse garantit une diffusion d'effluves prolongée et homogène durant plusieurs mois.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-pink" />,
    },
    {
      title: "Cadeau Émotionnel",
      desc: "Une invitation au ralentissement et à l'écorce des sens. Offrir nos cires, c'est offrir un fragment de douceur suspendu dans le temps.",
      icon: <Heart className="w-5 h-5 text-brand-pink" />,
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Curation olfactive",
      desc: "Sélection rigoureuse des plus nobles essences de Grasse. Les accords de tête, de cœur et de fond sont testés pour s'unir sans aucune substance CMR.",
      icon: <Droplet className="w-5 h-5 text-brand-pink" />,
    },
    {
      num: "2",
      title: "Coulage d'émotion",
      desc: "Chauffée à douce température, la cire pure de soja incorpore les parfums avant d'être versée lentement à la main dans des contenants exclusifs.",
      icon: <Flame className="w-5 h-5 text-brand-pink" />,
    },
    {
      num: "3",
      title: "Ornementation botanique",
      desc: "Avant que la cire ne se fige complètement, de véritables fleurs séchées, boutons de rose et herbiers locaux sont pincés un par un sur la surface.",
      icon: <PenTool className="w-5 h-5 text-brand-pink" />,
    },
    {
      num: "4",
      title: "Sceau et écrin",
      desc: "Chaque pièce sèche paisiblement pendant 48 heures minimum. Elle est ensuite vérifiée, polie, flanquée de lin et enveloppée soigneusement pour l'envoi.",
      icon: <PackageOpen className="w-5 h-5 text-brand-pink" />,
    },
  ];

  const handleWhatsAppStoryContact = () => {
    const textMsg = encodeURIComponent(
      "Bonjour Mélanie et Christelle, je viens de lire l'histoire de Rêve Parfumé Création et j'aimerais beaucoup commander une création artisanale !",
    );
    window.open(
      `https://wa.me/33781710985?text=${textMsg}`,
      "_blank",
      "noreferrer,noopener",
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="pb-16 text-left" id="about-page-root">
      {/* 1. HERO À PROPOS */}
      <section className="relative min-h-[50svh] -mt-24 md:-mt-28 flex flex-col justify-center overflow-hidden bg-brand-bg pt-32 pb-16 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-pink/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 text-center space-y-6 max-w-4xl mx-auto mt-12 md:mt-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/20 text-brand-pink text-xs font-mono font-bold uppercase tracking-widest leading-none">
            <Sparkles className="w-3.5 h-3.5" />
            Atelier Artisanal Bourgogne
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-cream tracking-tight leading-none">
            Derrière Rêve Parfumé Création, <br />
            <span className="font-light italic text-brand-purple">
              deux passionnées
            </span>{" "}
            du fait main
          </h1>

          <p className="text-sm md:text-base text-brand-text-muted leading-relaxed max-w-2xl mx-auto font-light">
            Mélanie et Christelle imaginent, conçoivent et fabriquent des
            créations parfumées poétiques, naturelles et entièrement
            personnalisables au gré de vos inspirations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onNavigateToBoutique}
              className="px-6 py-3.5 rounded-full bg-brand-pink text-brand-bg hover:bg-brand-pink-hover font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5"
            >
              Découvrir la boutique
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToContact}
              className="px-6 py-3.5 rounded-full bg-brand-depth text-brand-pink hover:bg-white/5 border border-brand-pink/20 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Nous contacter
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <div className="space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* 2. HISTOIRE DE LA MARQUE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Story details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
              Notre Genèse
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-cream">
              Une histoire de senteurs, de matières et de patience
            </h2>

            <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
              Bienvenue dans notre havre olfactif.{" "}
              <span className="text-brand-pink font-semibold">
                Rêve Parfumé Création
              </span>{" "}
              a éclos d'un rêve partagé par deux amies unies par le plaisir des
              textures et de l'harmonie florale. Notre ambition était humble
              mais essentielle : recréer des bougies et créations parfumées
              saines, sans fumées nocives ni artifices froids, qui subliment
              l'instant présent.
            </p>

            <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
              Chaque objet que nous expédions est pensé comme une délicate
              intention : à s'offrir pour un retour au calme chez soi, ou à
              partager lors de vos plus précieux mariages et fêtes de famille.
              Nous marions la noblesse de la{" "}
              <span className="text-brand-pink font-medium">
                cire de soja pure
              </span>{" "}
              à la créativité des poteries modelées à la main, pour que
              l'étincelle soit aussi belle éteinte qu'allumée.
            </p>

            <div className="p-5 bg-brand-depth/60 border border-brand-pink/10 rounded-2xl relative">
              <h4 className="font-serif italic font-bold text-brand-cream text-base">
                "Un geste artisanal lent qui célèbre le beau."
              </h4>
              <p className="text-[11px] text-brand-text-muted font-light mt-1.5 leading-relaxed">
                Nous n'achetons aucun produit industriel pré-moulé. De la fonte
                de la cire de soja jusqu'à la découpe délicate des herbiers de
                rose, nos doigts façonnent chaque détail pour parfaire l'émotion
                de vos cadeaux.
              </p>
            </div>
          </div>

          {/* Custom Visual (Not generic) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative">
            <div className="space-y-4">
              <div className="rounded-[28px] overflow-hidden border border-brand-pink/15 aspect-[4/5] bg-brand-depth/40 relative group shadow-lg">
                <img
                  src={atelierCoulageImg}
                  alt="Coulage manuel de la cire"
                  className="w-full h-full object-cover filter transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 to-transparent opacity-40" />
              </div>
              <div className="rounded-[24px] overflow-hidden border border-brand-pink/10 aspect-square bg-brand-depth/30 shadow-inner">
                <img
                  src={cadreImg}
                  alt="Arrangement délicat de fleurs séchées"
                  className="w-full h-full object-cover filter sepia-[15%]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="rounded-[24px] overflow-hidden border border-brand-pink/10 aspect-square bg-brand-depth/30 shadow-inner">
                <img
                  src={bougiePotImg}
                  alt="Poterie de contenu unique pour cire"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="rounded-[28px] overflow-hidden border border-brand-pink/15 aspect-[4/5] bg-brand-depth/40 relative group shadow-lg">
                <img
                  src={atelierBourgogneImg}
                  alt="Finition lin bio et emballage"
                  className="w-full h-full object-cover filter brightness-[90%]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 to-transparent opacity-40" />
              </div>
            </div>

            <div className="absolute -z-10 bg-brand-pink/5 filter blur-[50px] rounded-full inset-0 m-6 pointer-events-none" />
          </div>
        </section>

        {/* 3. PRÉSENTATION MÉLANIE & CHRISTELLE */}
        <section className="space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
              Portraits d'Atelier
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
              Vos créatrices en Normandie
            </h2>
            <p className="text-xs text-brand-text-muted max-w-sm mx-auto">
              Chaque commande passe directement entre nos quatre mains
              bienveillantes.
            </p>
          </div>

          <div className="bg-brand-depth/40 border border-brand-pink/15 rounded-[2.5rem] p-6 md:p-10 max-w-5xl mx-auto relative overflow-hidden group hover:border-brand-pink/30 hover:bg-brand-depth/65 transition-all duration-300">
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-pink/5 rounded-full blur-[90px] pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Vraie Photo Collective de Christelle & Mélanie */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-[2rem] overflow-hidden border border-brand-pink/20 bg-brand-bg shadow-xl aspect-square lg:aspect-[4/5]">
                  <img
                    src={photoDeNousImg}
                    alt="Christelle et Mélanie - Rêve Parfumé Création"
                    className="w-full h-full object-cover object-top filter brightness-[98%] contrast-[102%] transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 bg-brand-depth/90 backdrop-blur-md border border-brand-pink/10 p-3.5 rounded-2xl text-center">
                    <span className="text-[9px] uppercase tracking-widest font-mono text-brand-pink font-bold block">Créatrices & Artisanes</span>
                    <span className="text-xs font-serif font-bold text-brand-cream">Christelle &amp; Mélanie</span>
                  </div>
                </div>
              </div>

              {/* Le Duo Féminin & Leurs Rôles */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-brand-pink font-extrabold px-2.5 py-1 rounded bg-brand-pink/10 border border-brand-pink/20 inline-block">
                    Savoir-faire 100% Féminin
                  </span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
                    Quatre mains complices &amp; bienveillantes
                  </h3>
                  <p className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light">
                    Chez Rêve Parfumé Création, pas de production industrielle ni de machines froides. Tout est imaginé, coulé et fleuri à la main par **deux femmes passionnées**. Christelle et Mélanie incarnent cette minutie, cette sensibilité artistique et ce dévouement qui transforment chaque cire en un objet d'art olfactif.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-brand-pink/10">
                  {/* Portrait Mini Mélanie */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                      <h4 className="font-serif font-bold text-brand-cream text-base">Mélanie</h4>
                    </div>
                    <span className="text-[9px] text-brand-purple font-mono uppercase tracking-wider block">Harmonie olfactive &amp; Botanique</span>
                    <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                      Passionnée par le pouvoir insoupçonné des odeurs sur la mémoire, Mélanie étudie les équilibres d'accords aromatiques et sélectionne les plantes séchées. Elle s'assure que chaque création exhale un sillage d'une élégance absolue.
                    </p>
                    <div className="text-[9px] font-mono text-brand-pink/70 flex items-center gap-1">
                      <Check className="w-3 h-3 text-brand-pink" /> Signature : Fleur de Coton &amp; Pomme d'Amour
                    </div>
                  </div>

                  {/* Portrait Mini Christelle */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                      <h4 className="font-serif font-bold text-brand-cream text-base">Christelle</h4>
                    </div>
                    <span className="text-[9px] text-brand-purple font-mono uppercase tracking-wider block">Moulage &amp; Contenants</span>
                    <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                      Fascinée par la noblesse des matières brutes, Christelle prend soin de la préparation physique des supports. Du moulage de précision jusqu'à l'ornementation et au packaging protecteur, elle apporte la rigueur technique requise.
                    </p>
                    <div className="text-[9px] font-mono text-brand-pink/70 flex items-center gap-1">
                      <Check className="w-3 h-3 text-brand-pink" /> Signature : Cadre suspendu &amp; Délice Interdit
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. FABRICATION - LE PROCESS EN 4 ÉTAPES */}
        <section className="bg-brand-depth/25 border-y border-brand-pink/10 py-16 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-left max-w-2xl space-y-2">
              <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
                L'Art du Temps
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
                Le parcours d'une création parfumée
              </h2>
              <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                De l'intention brute à votre colis étincelant, chaque pièce
                nécessite un respect strict de notre rituel de fabrication
                artisanal.
              </p>
            </div>

            {/* Steps Timeline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
              {steps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-brand-depth border border-brand-pink/5 rounded-2xl space-y-4 hover:border-brand-pink/20 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-mono font-bold text-brand-pink/20 group-hover:text-brand-pink/40 transition-colors">
                        {st.num}
                      </span>
                      <span className="p-2 bg-brand-bg rounded-xl border border-brand-pink/10 flex items-center justify-center shrink-0">
                        {st.icon}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm text-brand-cream">
                      {st.title}
                    </h3>
                    <p className="text-[11px] text-brand-text-muted leading-relaxed font-light">
                      {st.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-brand-pink/5 text-[9px] font-mono text-brand-pink/60">
                    Étape indispensable
                  </div>
                </div>
              ))}
            </div>

            {/* Material Pills / Matières nobles */}
            <div className="p-6 bg-brand-depth/40 border border-brand-pink/10 rounded-2xl text-left space-y-4">
              <h4 className="font-serif font-semibold text-xs uppercase tracking-wider text-brand-cream">
                Nos matières de prédilection :
              </h4>
              <div className="flex flex-wrap gap-2.5">
                <span className="px-3.5 py-1.5 rounded-full bg-brand-bg border border-brand-pink/10 text-[10px] font-mono text-brand-text-muted flex items-center gap-1.5 shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-brand-pink" />
                  Pure Cire de Soja végétale biodégradable
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-brand-bg border border-brand-pink/10 text-[10px] font-mono text-brand-text-muted flex items-center gap-1.5 shadow-sm">
                  <Heart className="w-3.5 h-3.5 text-brand-pink" />
                  Véritables boutons de rose &amp; Lavande de Provence
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-brand-bg border border-brand-pink/10 text-[10px] font-mono text-brand-text-muted flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-brand-pink" />
                  Grès d'art &amp; céramiques tournées en Bourgogne
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-brand-bg border border-brand-pink/10 text-[10px] font-mono text-brand-text-muted flex items-center gap-1.5 shadow-sm">
                  <Droplet className="w-3.5 h-3.5 text-brand-pink" />
                  Huiles de Grasse garanties sans phtalates ni CMR
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-brand-bg border border-brand-pink/10 text-[10px] font-mono text-brand-text-muted flex items-center gap-1.5 shadow-sm">
                  <Flame className="w-3.5 h-3.5 text-brand-pink" />
                  Mèches de bois d'érable naturel crépitantes
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. VALEURS GRID (6 CARTES BENTO UNIQUE) */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
              Nos 6 piliers
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
              Engagées pour un art de vivre sincère
            </h2>
            <p className="text-xs text-brand-text-muted max-w-sm mx-auto leading-relaxed">
              En choisissant Rêve Parfumé Création, vous encouragez des
              engagements nobles, sains et respectueux de la santé de votre
              demeure.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {values.map((v, i) => {
              const bentoSpan = 
                i === 0 ? "md:col-span-2 bg-brand-depth/55 border-brand-pink/15" :
                i === 4 ? "md:col-span-2 bg-brand-depth/55 border-brand-pink/15" :
                "md:col-span-1";
              
              return (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`p-6 bg-brand-depth/40 border border-brand-pink/10 rounded-[2rem] hover:border-brand-pink/30 hover:bg-brand-depth/60 transition-all duration-300 text-left space-y-3 relative group overflow-hidden ${bentoSpan}`}
                >
                  {(i === 0 || i === 4) && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-pink/5 rounded-full filter blur-2xl pointer-events-none group-hover:bg-brand-pink/10 transition-colors" />
                  )}
                  <div className="w-10 h-10 rounded-xl bg-brand-pink/10 flex items-center justify-center border border-brand-pink/15">
                    {v.icon}
                  </div>
                  <h3 className="font-serif font-bold text-base text-brand-cream tracking-wide">
                    {v.title}
                  </h3>
                  <p className="text-xs text-brand-text-muted font-light leading-relaxed">
                    {v.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* 6. GALERIE DE L'ATELIER (ASYMETRIC GRID WITH CAPTIONS) */}
        <section className="space-y-8">
          <div className="text-left border-b border-brand-pink/10 pb-4">
            <span className="text-xs font-mono text-brand-pink uppercase tracking-widest font-bold">
              Instants d'Atelier
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
              Captures de notre quotidien créatif
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            <div className="md:col-span-4 rounded-3xl overflow-hidden border border-brand-pink/10 relative group h-80 shadow-md">
              <img
                src={accueil1Img}
                alt="Moulage des herbiers fleuris"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/40 to-transparent p-5 flex flex-col justify-end text-left">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-pink font-bold">
                  Inspiration
                </span>
                <h4 className="font-serif font-bold text-sm text-brand-cream">
                  Harmonie des fleurs séchées
                </h4>
              </div>
            </div>

            <div className="md:col-span-8 rounded-3xl overflow-hidden border border-brand-pink/10 relative group h-80 shadow-md">
              <img
                src={accueil2Img}
                alt="Modelage du grès céramique"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[95%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/40 to-transparent p-5 flex flex-col justify-end text-left">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-pink font-bold font-semibold">
                  Création
                </span>
                <h4 className="font-serif font-bold text-sm text-brand-cream">
                  Façonnage de nos contenants artisanaux
                </h4>
              </div>
            </div>

            <div className="md:col-span-8 rounded-3xl overflow-hidden border border-brand-pink/10 relative group h-80 shadow-md">
              <img
                src={accueil3Img}
                alt="Mesure méticuleuse des fragrances"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[90%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/40 to-transparent p-5 flex flex-col justify-end text-left">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-pink font-bold font-semibold">
                  Parfumerie
                </span>
                <h4 className="font-serif font-bold text-sm text-brand-cream">
                  Savoir-faire et fragrances de Grasse
                </h4>
              </div>
            </div>

            <div className="md:col-span-4 rounded-3xl overflow-hidden border border-brand-pink/10 relative group h-80 shadow-md">
              <img
                src={accueil4Img}
                alt="Finitions des étuis en tissu de lin"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter brightness-[95%]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/40 to-transparent p-5 flex flex-col justify-end text-left">
                <span className="text-[9px] font-mono uppercase tracking-widest text-brand-pink font-bold font-semibold">
                  Expédition
                </span>
                <h4 className="font-serif font-bold text-sm text-brand-cream">
                  Emballage soigné et lin de lin protecteur
                </h4>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CTA FINAL FOR ABOUT PAGE */}
        <section className="text-center bg-brand-depth/40 border border-brand-pink/10 rounded-3xl p-8 md:p-12 space-y-6 max-w-3xl mx-auto relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-pink/5 rounded-full blur-[90px] pointer-events-none" />
          <span className="text-[10px] uppercase tracking-widest font-mono text-brand-pink font-bold">
            Un voyage sensoriel unique
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
            Envie d’essayer vos premières senteurs ?
          </h3>
          <p className="text-xs text-brand-text-muted max-w-md mx-auto leading-relaxed">
            Que ce soit pour un coup de foudre en salon, une brume d'oreiller
            enveloppante ou des cadeaux marquants d'invités, Christelle et
            Mélanie sont à votre écoute.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onNavigateToBoutique}
              className="px-6 py-3 rounded-full bg-brand-pink text-brand-bg hover:bg-brand-pink-hover font-bold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center hover:-translate-y-0.5"
            >
              Découvrir le Catalogue
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleWhatsAppStoryContact}
              className="px-6 py-3 rounded-full bg-brand-depth text-brand-pink hover:bg-white/5 border border-brand-pink/20 font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center"
            >
              <MessageSquare className="w-4 h-4" />
              Commander sur WhatsApp
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
