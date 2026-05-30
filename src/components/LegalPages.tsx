import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Scale,
  FileText,
  Truck,
  ArrowRight,
  AlertCircle,
  Info,
  Building,
  Smartphone,
  Globe,
  Lock,
  ChevronDown,
  Clock,
  MapPin,
  CheckCircle,
  HelpCircle,
  PiggyBank,
  AlertTriangle,
  Heart,
  Undo2,
  FileSpreadsheet,
  Camera,
  MessageSquare,
} from "lucide-react";

interface LegalPagesProps {
  initialSubTab?: string;
  onNavigateToContact?: () => void;
}

// ==========================================
// REUSABLE LEGAL COMPONENTS
// ==========================================

export function LegalPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="max-w-[1000px] mx-auto text-left space-y-8"
      id="legal-layout-root"
    >
      {children}
    </div>
  );
}

export function LegalHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="border-b border-brand-pink/15 pb-6 space-y-2 text-left"
      id="legal-hero-section"
    >
      <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-cream tracking-tight leading-tight">
        {title}
      </h1>
      <p className="text-sm text-brand-text-muted font-light">{subtitle}</p>
    </div>
  );
}

export function LegalSection({
  id,
  title,
  children,
}: {
  id?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-24 space-y-3 pb-8 border-b border-brand-pink/10 last:border-b-0 pt-4 text-left"
    >
      <h3 className="font-serif font-bold text-lg text-brand-cream flex items-center gap-2">
        <span className="w-1.5 h-1.5 bg-brand-pink rounded-full shrink-0" />
        {title}
      </h3>
      <div className="text-xs md:text-sm text-brand-text-muted leading-relaxed font-light space-y-3 pl-3.5">
        {children}
      </div>
    </div>
  );
}

export function LegalInfoList({
  items,
}: {
  items: { label: string; value: string | React.ReactNode }[];
}) {
  return (
    <ul className="space-y-2 mt-2 font-mono text-[11px] md:text-xs bg-brand-bg/60 border border-brand-pink/5 p-4 rounded-xl">
      {items.map((it, idx) => (
        <li
          key={idx}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-brand-pink/5 last:border-b-0 pb-1.5 last:pb-0"
        >
          <span className="text-brand-text-muted font-medium">
            {it.label} :
          </span>
          <span className="text-brand-pink font-semibold text-right">
            {it.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function LegalNoticeBox({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "success";
}) {
  const styles = {
    info: "bg-brand-pink/5 border-brand-pink/20 text-brand-cream",
    warning: "bg-brand-purple/5 border-brand-purple/25 text-brand-cream",
    success: "bg-emerald-500/5 border-emerald-500/20 text-emerald-100",
  };

  const icons = {
    info: <Info className="w-4 h-4 text-brand-pink shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-brand-purple shrink-0" />,
    success: <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />,
  };

  return (
    <div
      className={`p-4 border rounded-2xl flex gap-3 text-xs leading-relaxed font-light ${styles[type]}`}
    >
      {icons[type]}
      <div>{children}</div>
    </div>
  );
}

// ==========================================
// CORE LEGAL PAGES EXPORT
// ==========================================

export default function LegalPages({
  initialSubTab = "mentions",
  onNavigateToContact,
}: LegalPagesProps) {
  const [subTab, setSubTab] = useState<string>(initialSubTab);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  useEffect(() => {
    setSubTab(initialSubTab);
  }, [initialSubTab]);

  const tabs = [
    {
      id: "mentions",
      label: "Mentions Légales",
      icon: <Scale className="w-4 h-4" />,
    },
    {
      id: "cgv",
      label: "Conditions Générales (CGV)",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "confidentialite",
      label: "Confidentialité",
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      id: "livraison-retrait",
      label: "Livraison & Retrait",
      icon: <Truck className="w-4 h-4" />,
    },
  ];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cgvSections = [
    { id: "cgv-1", num: "1", title: "Objet" },
    { id: "cgv-2", num: "2", title: "Produits" },
    { id: "cgv-3", num: "3", title: "Commandes" },
    { id: "cgv-4", num: "4", title: "Tarifs & Prix" },
    { id: "cgv-5", num: "5", title: "Modalités de Paiement" },
    { id: "cgv-6", num: "6", title: "Précommande & Délais" },
    { id: "cgv-7", num: "7", title: "Livraison & Retrait physique" },
    { id: "cgv-8", num: "8", title: "Droit de rétractation" },
    { id: "cgv-9", num: "9", title: "Produits endommagés" },
    { id: "cgv-10", num: "10", title: "Litiges & Droit" },
  ];

  return (
    <div className="space-y-10 pb-12 pt-28 md:pt-32" id="legal-pages-view">
      {/* Tab Navigation header */}
      <div className="flex flex-wrap justify-center gap-2 border-b border-brand-pink/10 pb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setSubTab(tab.id);
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            className={`px-4 md:px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide flex items-center gap-2 transition-all cursor-pointer ${
              subTab === tab.id
                ? "bg-brand-pink text-brand-bg shadow-md"
                : "bg-brand-depth/60 text-brand-text-muted border border-brand-pink/5 hover:border-brand-pink/30 hover:text-brand-cream"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Container */}
      <div className="max-w-5xl mx-auto">
        <LegalPageLayout>
          {/* ==========================================
              TAB 1 : MENTIONS LÉGALES
              ========================================== */}
          {subTab === "mentions" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-depth border border-brand-pink/10 rounded-3xl p-6 md:p-10 shadow-xl space-y-6"
            >
              <LegalHero
                title="Mentions légales"
                subtitle="Informations relatives à l’éditeur, à l’hébergement et à l’utilisation du site."
              />

              <LegalSection title="1. Éditeur de l'Atelier">
                <p>
                  Ce site internet est l’enseigne collective de présentation de
                  notre manufacture artisanale. Ses activités commerciales d'art
                  et vente assistée de bougies et fondants sont représentées
                  individuellement par :
                </p>
                <div className="space-y-4">
                  <LegalInfoList
                    items={[
                      {
                        label: "Nom de l'Enseigne",
                        value: "Rêve Parfumé Création",
                      },
                    ]}
                  />
                  <div className="bg-brand-bg/40 border border-brand-pink/10 rounded-xl p-4 text-xs font-light">
                    <h4 className="font-bold font-serif text-brand-cream text-sm mb-2">
                      Christelle BONNET-GIRARD
                    </h4>
                    <p className="text-brand-text-muted mb-1">
                      1 lotissement les prés vert
                    </p>
                    <p className="text-brand-text-muted mb-2">
                      76730 Saint-Ouen-le-Mauger
                    </p>
                    <p className="text-brand-cream font-mono">
                      SIRET : 828 471 920 00029
                    </p>
                    <p className="text-brand-cream font-mono">
                      Tél : 06.68.83.08.03
                    </p>
                  </div>
                  <div className="bg-brand-bg/40 border border-brand-pink/10 rounded-xl p-4 text-xs font-light">
                    <h4 className="font-bold font-serif text-brand-cream text-sm mb-2">
                      Mélanie TAUPIN
                    </h4>
                    <p className="text-brand-text-muted mb-1">
                      1 Impasse des chênes
                    </p>
                    <p className="text-brand-text-muted mb-2">
                      76890 Saint-Pierre-Bénouville
                    </p>
                    <p className="text-brand-cream font-mono">
                      SIRET : 992 363 911 00015
                    </p>
                    <p className="text-brand-cream font-mono">
                      Tél : 07.81.71.09.85
                    </p>
                  </div>
                </div>
              </LegalSection>

              <LegalSection title="2. Responsable de la Publication">
                <p>
                  Le pilotage éditorial, la curation des photographies et la
                  conformité sémantique de notre catalogue de cire florale sont
                  assurés par :
                </p>
                <LegalInfoList
                  items={[
                    {
                      label: "Nom du directeur de publication",
                      value: "[À compléter]",
                    },
                    {
                      label: "Adresse de contact direct",
                      value: "[À compléter]",
                    },
                  ]}
                />
              </LegalSection>

              <LegalSection title="3. Hébergement du Domaine">
                <p>
                  Le sillage technique et les flux visuels du site sont
                  conservés de manière écologique auprès de :
                </p>
                <LegalInfoList
                  items={[
                    { label: "Nom de l'Hébergeur", value: "[À compléter]" },
                    {
                      label: "Adresse physique postale",
                      value: "[À compléter]",
                    },
                    { label: "Site internet officiel", value: "[À compléter]" },
                  ]}
                />
              </LegalSection>

              <LegalSection title="4. Propriété Intellectuelle">
                <p className="font-light">
                  Les contenus du site, textes, photos, créations, visuels et
                  éléments graphiques sont protégés. Toute reproduction non
                  autorisée est interdite.
                </p>
                <p className="text-[11px] italic text-brand-text-muted/80">
                  Chaque ornement de fleurs séchées, chaque moulin céramique
                  d'art, et chaque sillage de mots décrivant les essences
                  aromatiques sont nés sous les doigts des créatrices et sont
                  régis par le droit de la propriété littéraire et artistique.
                </p>
              </LegalSection>

              <LegalSection title="5. Responsabilité">
                <p className="font-light">
                  Les informations présentes sur le site peuvent évoluer. Les
                  commandes, prix finaux, frais de livraison et délais sont
                  confirmés avant paiement.
                </p>
                <LegalNoticeBox type="info">
                  <strong>Validation Humaine Obligatoire :</strong> Rêve Parfumé
                  Création ne réalise aucun encaissement automatique ou
                  transaction bancaire brute sans discussion et conseil assisté
                  en amont.
                </LegalNoticeBox>
              </LegalSection>

              <div className="pt-6 border-t border-brand-pink/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-xs text-brand-text-muted/80 font-light">
                  Besoin de clarifier un point légal ou d'obtenir un reçu pour
                  vos cadeaux corporatifs ?
                </p>
                <button
                  onClick={onNavigateToContact}
                  className="px-5 py-2.5 rounded-full bg-brand-pink/10 hover:bg-brand-pink text-brand-pink hover:text-brand-bg text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 shrink-0"
                >
                  Nous contacter
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ==========================================
              TAB 2 : CONDITIONS GÉNÉRALES DE VENTRE (CGV)
              ========================================== */}
          {subTab === "cgv" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Sticky Sidebar (Sommaire) for CGV Desktop / Compact for Mobile */}
              <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
                <div className="bg-brand-depth border border-brand-pink/10 rounded-[24px] p-5 space-y-4">
                  <h3 className="font-serif font-bold text-sm text-brand-cream border-b border-brand-pink/5 pb-2">
                    Sommaire des CGV
                  </h3>
                  <div className="flex flex-col gap-1.5 text-xs">
                    {cgvSections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => handleScrollToSection(sec.id)}
                        className="py-1.5 px-2.5 rounded-lg text-left text-brand-text-muted hover:text-brand-pink hover:bg-brand-pink/5 transition-all flex items-center gap-2 font-mono text-[11px]"
                      >
                        <span className="text-brand-pink font-bold w-4 shrink-0">
                          {sec.num}.
                        </span>
                        <span>{sec.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-brand-pink/5 border border-brand-pink/10 rounded-2xl text-[11px] text-brand-text-muted leading-relaxed font-light text-left flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                  <div>
                    <strong>Dialogue d'atelier :</strong> Nos ventes se font de
                    gré à gré après validation de vos goûts sur WhatsApp. Les
                    CGV servent à garantir un cadre sécurisant pour vous et pour
                    nous !
                  </div>
                </div>
              </div>

              {/* Main CGV Content Cards */}
              <div className="lg:col-span-8 bg-brand-depth border border-brand-pink/10 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                <LegalHero
                  title="Conditions Générales de Vente"
                  subtitle="Les présentes conditions encadrent les commandes passées auprès de Rêve Parfumé Création."
                />

                {/* Section 1 */}
                <LegalSection id="cgv-1" title="1. Objet">
                  <p>
                    Les présentes Conditions Générales de Vente (CGV) encadrent
                    en exclusivité la vente de créations parfumées végétales
                    artisanales et de contenants d'art en Normandie, proposées
                    sous l'enseigne commune{" "}
                    <strong className="text-brand-cream">
                      Rêve Parfumé Création
                    </strong>{" "}
                    par Christelle L. et Mélanie G.
                  </p>
                  <p>
                    Toute passation de projet ou validation de cire suppose
                    l'acceptation entière et sans réserve des présentes
                    conditions, qui régissent au mieux notre relation de
                    confiance de gré à gré.
                  </p>
                </LegalSection>

                {/* Section 2 */}
                <LegalSection id="cgv-2" title="2. Produits &amp; Artisanat">
                  <p>
                    Chacun de nos articles est une œuvre d'origine humaine faite
                    main. Nous fabriquons des bougies, fondants, bouquets
                    parfumés, cadres suspendus, suspensions, brumes et poudres,
                    principalement à base de cire pure de soja saine et de
                    fleurs d'atelier.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-1 text-[11px] md:text-xs">
                    <li>
                      <strong>Variations Possibles :</strong> Du fait de notre
                      procédé non automatisé, de légères différences de teintes,
                      d'épaisseur de grès ou d'agencement floraux botaniques
                      surviennent à chaque coulage.
                    </li>
                    <li>
                      <strong>Photos Non-Contractuelles :</strong> Les photos du
                      site sont présentées de la manière la plus digne mais ne
                      garantissent pas un aspect identique à 100 %.
                    </li>
                    <li>
                      <strong>Personnalisations :</strong> Elles sont soumises à
                      la faisabilité technique et aux stocks de matières
                      botaniques de saison.
                    </li>
                  </ul>
                </LegalSection>

                {/* Section 3 */}
                <LegalSection id="cgv-3" title="3. Commandes">
                  <p>
                    Conformément au positionnement humain de l'atelier, la
                    validation s'effectue par messagerie instantanée (WhatsApp)
                    ou par formulaire de contact d'écriture :
                  </p>
                  <ul className="list-decimal pl-5 space-y-1 mt-1 text-[11px] md:text-xs">
                    <li>
                      Prise de contact de l'acheteur avec formulation de ses
                      envies spécifiques.
                    </li>
                    <li>
                      Échange direct sur les essences parfumées de Grasse
                      adaptées à son projet d'intérieur.
                    </li>
                    <li>
                      Délivrance d'un récapitulatif détaillé d'atelier valider
                      d'un commun accord.
                    </li>
                    <li>
                      La commande est considérée ferme dès accord mutuel et
                      validation du montant d'attention, avec mise en production
                      du coulage.
                    </li>
                  </ul>
                </LegalSection>

                {/* Section 4 */}
                <LegalSection id="cgv-4" title="4. Tarifs &amp; Prix">
                  <p>
                    Les prix de nos créations de cire saine et suspensions sont
                    exprimés en Euros (€) et sont nets. TVA non applicable, en
                    vertu de l’article 293 B du Code Général des Impôts (régime
                    micro-entreprises).
                  </p>
                  <p>
                    Les frais de livraison et d'emballage postal amortis sont
                    facturés en supplément à prix coûtant selon le mode
                    d'expédition (Colissimo, Mondial Relay) convenu. Les devis
                    événements (mariages, commémorations) proposent des tarifs
                    dégressifs selon les volumes.
                  </p>
                </LegalSection>

                {/* Section 5 */}
                <LegalSection id="cgv-5" title="5. Modalités de Paiement">
                  <p>
                    Le règlement de vos créations s'effectue à l'aide des
                    passerelles désignées lors de l'échange amiable :
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-1">
                    <li>
                      <strong>PayPal :</strong> Transfert sécurisé de fonds
                      entre particuliers ou professionnels.
                    </li>
                    <li>
                      <strong>Wero / Paylib / Virement immédiat :</strong>{" "}
                      Solution directe sans frais pour nos clients.
                    </li>
                  </ul>
                  <LegalNoticeBox type="warning">
                    <strong>Règle d'Atelier :</strong>{" "}
                    <code>
                      [Préciser acompte ou paiement total avant fabrication]
                    </code>
                    . Par défaut, pour les séries de fêtes ou cadeaux
                    personnalisés d'invités, un paiement complet ou d'acompte de
                    50% est requis avant l'incorporation des huiles de Grasse et
                    le coulage décoratif des cires de soja.
                  </LegalNoticeBox>
                </LegalSection>

                {/* Section 6 */}
                <LegalSection id="cgv-6" title="6. Précommande &amp; Délais">
                  <p>
                    Afin d'offrir la plus saine et fraîche des expériences
                    d'effluves, nous ne conservons pas d'important stock
                    industriel. Les produits sont fabriqués ou préparés sur
                    commande.
                  </p>
                  <p>
                    Le délai moyen d'exécution d’environ deux semaines est à
                    prévoir pour le séchage lent. Lors des fêtes de fin d'année
                    ou des cérémonies rituelles d'été, ce sillage de fabrication
                    artisanale peut être prolongé.
                  </p>
                </LegalSection>

                {/* Section 7 */}
                <LegalSection
                  id="cgv-7"
                  title="7. Livraison &amp; Retrait physique"
                >
                  <p>
                    Les expéditions se coordonnent avec grand soin. Nos
                    conditions logistiques précisent :
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-[11px] md:text-xs">
                    <li>
                      <strong>Période Postale :</strong> Les colis d'envois ne
                      circulent que de d'<strong>octobre à mars</strong> pour
                      protéger la cire naturelle à basse fusion des fortes
                      températures estivales.
                    </li>
                    <li>
                      <strong>Retrait sur Rendez-vous :</strong> Durant les
                      périodes chaudes d'avril à septembre (ou toute l'année
                      pour les voisins), le retrait direct et gracieux à
                      l'atelier bourguignon est vivement recommandé.
                    </li>
                  </ul>
                </LegalSection>

                {/* Section 8 */}
                <LegalSection id="cgv-8" title="8. Droit de rétractation">
                  <p>
                    Conformément aux directives de l'article L221-18 du Code de
                    la consommation, l'acheteur dispose d'un droit de 14 jours
                    pour retourner une création ordinaire, à ses frais
                    exclusifs, dans son état de scellé originel de cire.
                  </p>
                  <LegalNoticeBox type="warning">
                    <strong>Exception légale importante :</strong> Les produits
                    personnalisés ou fabriqués selon les spécifications claires
                    du client (étiquettes d'événement, inscriptions gravées,
                    mélanges exclusifs de fleurs) sont exclus de tout droit de
                    rétractation et d'échange, sauf anomalie due à l'atelier.
                    Cette section est fournie sous réserve de validation
                    juridique réciproque.
                  </LegalNoticeBox>
                </LegalSection>

                {/* Section 9 */}
                <LegalSection id="cgv-9" title="9. Produits endommagés">
                  <p>
                    À la réception, si votre contenant en céramique d'art ou
                    votre cadre de cire solide a subi des heurts postaux :
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      Prendre des photos nettes et immédiates du colis ouvert
                      ainsi que des dégradations de la pièce.
                    </li>
                    <li>Nous transmettre le dossier sous 48h sur WhatsApp.</li>
                    <li>
                      Chaque incident fera l'objet d'une analyse amicale au cas
                      par cas pour un remplacement de sillage ou un
                      remboursement.
                    </li>
                  </ul>
                </LegalSection>

                {/* Section 10 */}
                <LegalSection
                  id="cgv-10"
                  title="10. Litiges &amp; Droit applicable"
                >
                  <p>
                    Les présentes CGV d'artisanat sont régies par la loi
                    française. En cas de discorde ou d'insatisfaction :
                  </p>
                  <p>
                    Une solution amiable et respectueuse est toujours
                    privilégiée en premier ressort. À défaut d'accord direct, le
                    litige sera soumis à la médiation ou porté devant les
                    tribunaux compétents de la juridiction de l'atelier du
                    vendeur.
                  </p>
                </LegalSection>

                {/* Interactive CTA */}
                <div className="pt-6 border-t border-brand-pink/10 flex flex-col md:flex-row justify-between items-center gap-4 text-left">
                  <div className="space-y-1 text-xs">
                    <p className="text-brand-cream font-serif font-bold">
                      Un projet spécial en Normandie ?
                    </p>
                    <p className="text-brand-text-muted font-light leading-relaxed">
                      Les commandes de mariages exigent au moins un mois
                      d'anticipation avant la date.
                    </p>
                  </div>
                  <button
                    onClick={onNavigateToContact}
                    className="px-6 py-3 rounded-full bg-brand-pink text-brand-bg hover:bg-brand-pink-hover font-bold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer shadow hover:-translate-y-0.5 shrink-0"
                  >
                    Nous écrire sur WhatsApp
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==========================================
              TAB 3 : POLITIQUE DE CONFIDENTIALITÉ
              ========================================== */}
          {subTab === "confidentialite" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-depth border border-brand-pink/10 rounded-3xl p-6 md:p-10 shadow-xl space-y-6"
            >
              <LegalHero
                title="Politique de confidentialité"
                subtitle="Cette page explique comment vos données sont utilisées dans le cadre des demandes, commandes et échanges avec Rêve Parfumé Création."
              />

              <LegalSection title="1. Données collectées de bon usage">
                <p>
                  Dans le cadre strict de l'organisation artisanale de
                  l'Atelier, nous ne collectons que les informations
                  indispensables pour élaborer votre sillage parfumé de cire
                  bio. Ces données incluent :
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  <div className="p-4 bg-brand-bg/50 border border-brand-pink/5 rounded-xl text-xs space-y-1">
                    <strong className="text-brand-cream">
                      Données Civiles :
                    </strong>
                    <p className="text-[11px] text-brand-text-muted">
                      Nom, prénom et coordonnées de contact choisis pour
                      formuler votre nom sur les colis.
                    </p>
                  </div>
                  <div className="p-4 bg-brand-bg/50 border border-brand-pink/5 rounded-xl text-xs space-y-1">
                    <strong className="text-brand-cream">
                      Sillage Postal :
                    </strong>
                    <p className="text-[11px] text-brand-text-muted">
                      Adresse postale de votre demeure pour générer les
                      bordereaux Colissimo ou Mondial Relay.
                    </p>
                  </div>
                  <div className="p-4 bg-brand-bg/50 border border-brand-pink/5 rounded-xl text-xs space-y-1">
                    <strong className="text-brand-cream">
                      Dialogue d'Atelier :
                    </strong>
                    <p className="text-[11px] text-brand-text-muted">
                      Notes de nos échanges de personnalisation et de sélections
                      aromatiques sur WhatsApp.
                    </p>
                  </div>
                  <div className="p-4 bg-brand-bg/50 border border-brand-pink/5 rounded-xl text-xs space-y-1">
                    <strong className="text-brand-cream">
                      Coordonnées de Facturation :
                    </strong>
                    <p className="text-[11px] text-brand-text-muted">
                      Détails des règlements confirmés (historique d'acompte,
                      dates, types de soutien).
                    </p>
                  </div>
                </div>
              </LegalSection>

              <LegalSection title="2. Finalités du Traitement">
                <p>
                  Les données que vous choisissez de nous confier sont traitées
                  aux fins uniques de :
                </p>
                <ol className="list-decimal pl-5 space-y-1 mt-1 text-[11px] md:text-xs">
                  <li>
                    Répondre chaleureusement à vos interrogations de fragrances
                    et fabriquer vos cires de soja sur-mesure ;
                  </li>
                  <li>
                    Préparer les colis et assurer le sillage postal de livraison
                    ou de retrait à notre domicile de Normandie ;
                  </li>
                  <li>
                    Émettre les devis événementiels ou d'ateliers à domicile ;
                  </li>
                  <li>
                    Conserver l'historique commercial nécessaire aux obligations
                    comptables de nos micro-entreprises.
                  </li>
                </ol>
              </LegalSection>

              <LegalSection title="3. Services Tiers &amp; Partenaires">
                <p>
                  Pour donner vie à notre sillage en ligne, nous utilisons des
                  outils de confiance. Voici les prestataires qui peuvent avoir
                  accès à un fragment d'information :
                </p>
                <LegalInfoList
                  items={[
                    {
                      label: "Canal Échanges",
                      value: "WhatsApp (Meta Platforms, Inc.) - [À confirmer]",
                    },
                    {
                      label: "Paiement direct",
                      value: "PayPal de gré à gré / Paylib pour le virement",
                    },
                    {
                      label: "Flux Logistiques",
                      value: "La Poste / Colissimo et Mondial Relay",
                    },
                    {
                      label: "Hébergement",
                      value:
                        "Cloud Run / Services d'atelier d'art [À confirmer]",
                    },
                  ]}
                />
              </LegalSection>

              <LegalSection title="4. Engagement de Non-Cession">
                <p className="font-semibold text-brand-cream">
                  Vos données ne sont jamais revendues, louées, ni cédées à des
                  fins mercantiles à des entreprises de publicité.
                </p>
                <p>
                  Elles sont gardées précieusement au sein de nos messageries de
                  manière confidentielle et ne circulent que pour matérialiser
                  vos commandes de fondants et céramiques.
                </p>
              </LegalSection>

              <LegalSection title="5. Droits RGPD de la Clientèle">
                <p>
                  En conformité avec le Règlement Général sur la Protection des
                  Données (RGPD), vous disposez à tout moment de droits de
                  regard souverains sur vos informations :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[11px] md:text-xs">
                  <li>
                    Droit d'accès et d'obtention de la copie de vos échanges ;
                  </li>
                  <li>
                    Droit de modification ou de rectification des adresses
                    erronées ;
                  </li>
                  <li>
                    Droit de suppression de vos données de contact de notre
                    répertoire d'atelier ;
                  </li>
                  <li>Droit de limitation de nos discussions.</li>
                </ul>
                <p className="mt-2 text-[11px]">
                  Pour exercer ces droits, vous pouvez nous écrire de façon
                  fraternelle à notre email RGPD :{" "}
                  <strong className="text-brand-pink">
                    contact@reveparfume.fr
                  </strong>{" "}
                  ou via notre fil WhatsApp d'atelier.
                </p>
              </LegalSection>

              <LegalSection title="6. Gestion des Cookies">
                <p>
                  Le site utilise uniquement les cookies nécessaires à son
                  fonctionnement. Aucun cookie publicitaire intrusif n’est
                  disposé en arrière-plan.
                </p>
                <LegalNoticeBox type="info">
                  <strong>Mesures d’audience :</strong> Si un module d'analyse
                  d'audience (type Google Analytics) venait à être branché sur
                  notre vitrine artisanale, un bandeau de consentement conforme
                  et gracieux verra le jour afin de recueillir respectueusement
                  vos choix.
                </LegalNoticeBox>
              </LegalSection>

              <div className="pt-6 border-t border-brand-pink/10 text-center">
                <p className="text-[11px] text-brand-text-muted italic">
                  Dernière mise à jour de notre sillage de confidentialité faite
                  avec amour : 28 mai 2026.
                </p>
              </div>
            </motion.div>
          )}

          {/* ==========================================
              TAB 4 : POLITIQUE LIVRAISON / RETRAIT
              ========================================== */}
          {subTab === "livraison-retrait" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-depth border border-brand-pink/10 rounded-3xl p-6 md:p-10 shadow-xl space-y-6"
            >
              <LegalHero
                title="Politique de livraison et de retrait"
                subtitle="Retrouvez les conditions de préparation, d’envoi et de retrait des créations Rêve Parfumé Création."
              />

              {/* 1. Préparation des commandes */}
              <LegalSection title="1. Préparation exigeante des commandes">
                <p>
                  La fabrication d'une bougie ou d'un cadre suspendu à l'atelier
                  est un geste lent qui s'élabore à la commande. Après coulage
                  et incrustation de fleurs séchées, la cire de soja bio exige
                  une période de cure d'environ deux semaines pour lier les
                  fragrances végétales de Grasse.
                </p>
                <p>
                  Il convient donc de prendre en compte ce délai moyen d'environ
                  deux semaines de cure avant de planifier la remise de vos
                  cadeaux ou décorations de tables.
                </p>
              </LegalSection>

              {/* 2. Envois */}
              <LegalSection title="2. Envois postaux saisonniers (Octobre à Mars)">
                <p>
                  Notre cire pure de soja ne contient pas d'additif paraffineux
                  pétrochimique dur. Elle a donc un point de fusion bas, ce qui
                  la rend sensible à la chaleur estivale des camions postaux.
                </p>
                <p className="font-semibold text-brand-cream">
                  Afin de préserver l'élégance de nos herbiers botaniques et des
                  reliefs de cire, les colis d'expédition ne sont pris en charge
                  que d'octobre à mars.
                </p>
                <p>
                  Les envois se font en France métropolitaine selon faisabilité.
                  Les boîtes sont expédiées garnies de capitonnage biodégradable
                  afin qu'aucun flacon de verre ou bord de grès céramique ne
                  souffre de l'acheminement.
                </p>
              </LegalSection>

              {/* 3. Retrait à domicile */}
              <LegalSection title="3. Retrait physique à notre Atelier en Normandie">
                <p>
                  Durant les périodes d'ensoleillement d'avril à septembre
                  (hors-envois postaux) ou à tout moment pour les clients
                  voisins, nous privilégions la convivialité du retrait direct.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Sur Rendez-vous :</strong> Le créneau d'accueil est
                    convenu souplement avec vous via WhatsApp ;
                  </li>
                  <li>
                    <strong>Précision Géographique :</strong> Notre adresse
                    professionnelle est partagée chaleureusement lors du
                    récapitulatif de commande ;
                  </li>
                  <li>
                    <strong>Préférence estivale :</strong> Le retrait direct est
                    le meilleur moyen d'obtenir vos bouquets suspendus d'été en
                    parfait état.
                  </li>
                </ul>
              </LegalSection>

              {/* 4. Frais de livraison (Cost Table Matching prompt requirements) */}
              <LegalSection title="4. Frais de livraison (Mondial Relay - Lockers)">
                <p>
                  Les commandes sont expédiées via le réseau Mondial Relay
                  (Lockers). Les frais sont transparents et calculés sur une
                  base forfaitaire par type de création pour une expédition en
                  France métropolitaine :
                </p>

                <div className="overflow-x-auto rounded-2xl border border-brand-pink/15 bg-brand-bg/40 mt-3">
                  <table className="w-full text-left font-mono text-[11px] leading-relaxed">
                    <thead>
                      <tr className="bg-brand-pink/10 text-brand-pink border-b border-brand-pink/15">
                        <th className="p-3.5 font-bold uppercase tracking-wider font-sans">
                          Créations incluses
                        </th>
                        <th className="p-3.5 font-bold uppercase tracking-wider font-sans">
                          Transporteur
                        </th>
                        <th className="p-3.5 font-bold uppercase tracking-wider font-sans">
                          Frais de port
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-pink/5 text-brand-text-muted">
                      <tr className="hover:bg-brand-pink/5 transition-colors">
                        <td className="p-3.5 font-semibold text-brand-cream">
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Arrosoir</li>
                            <li>Déesse chandelle</li>
                            <li>Déesse buste</li>
                            <li>Buste</li>
                            <li>Design</li>
                            <li>Pot rayure</li>
                          </ul>
                        </td>
                        <td className="p-3.5">Mondial Relay Lockers</td>
                        <td className="p-3.5 text-brand-pink font-bold">
                          5,99 €
                        </td>
                      </tr>
                      <tr className="hover:bg-brand-pink/5 transition-colors">
                        <td className="p-3.5 font-semibold text-brand-cream">
                          <ul className="list-disc pl-4 space-y-1">
                            <li>Cadre</li>
                            <li>Grand cadre</li>
                            <li>Pot (bouquet de fondants)</li>
                            <li>Gros pot 18 fondants</li>
                          </ul>
                        </td>
                        <td className="p-3.5">Mondial Relay Lockers</td>
                        <td className="p-3.5 text-brand-pink font-bold">
                          7,99 €
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </LegalSection>

              {/* 5. Délais transporteur */}
              <LegalSection title="5. Délais transporteur indicatifs">
                <p>
                  Les délais d'acheminement à partir de la remise postale
                  (généralement 48h à 72h ouvrés pour Colissimo et 3 à 5 jours
                  pour Mondial Relay) ne dépendent pas de Rêve Parfumé Création.
                  Bien que nous suivions chaque envoi, nous ne pouvons être
                  tenues pour responsables des lenteurs internes des services
                  postaux.
                </p>
              </LegalSection>

              {/* 6. En cas de colis abîmé */}
              <LegalSection title="6. Procédure pour colis ou verre abîmé">
                <p>
                  Si votre flacon ambré ou contenant céramique arrivait brisé
                  malgré la qualité de notre double matelassage :
                </p>
                <div className="space-y-3 mt-2 bg-brand-bg/60 border border-brand-pink/10 p-4 rounded-xl text-xs font-light">
                  <p className="flex items-start gap-2">
                    <Camera className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>
                      <strong>Étape 1 :</strong> Photographiez immédiatement
                      l'étiquette d'envoi et les bris à l'intérieur de la boîte
                      avant déballage complet.
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>
                      <strong>Étape 2 :</strong> Alertez-nous sous 48 heures
                      maximum sur notre fil WhatsApp avec ces pièces
                      d'illustration.
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Heart className="w-4 h-4 text-brand-pink shrink-0 mt-0.5" />
                    <span>
                      <strong>Étape 3 :</strong> Nous étudierons de façon
                      amicale un recoulage s'il s'agit d'une pièce personnalisée
                      ou un remboursement s'il y a lieu.
                    </span>
                  </p>
                </div>
              </LegalSection>

              {/* 7. Responsabilité transport */}
              <LegalSection title="7. Responsabilité transport &amp; Suivi">
                <p>
                  Rêve Parfumé Création prépare chaque colis de cire saine avec
                  le plus grand soin et conserve des captures ou courts
                  enregistrements d'atelier lors du scellage pour écarter tout
                  litige d'oubli d'étiquette. Une fois le colis remis au bureau
                  de poste, les incidents liés à la manutention sont couverts et
                  étudiés selon les conditions générales de vente du
                  transporteur concerné.
                </p>
              </LegalSection>

              <div className="pt-6 border-t border-brand-pink/10 text-center">
                <button
                  onClick={onNavigateToContact}
                  className="px-6 py-3 rounded-full bg-brand-pink text-brand-bg hover:bg-brand-pink-hover font-bold text-xs tracking-wider uppercase transition-all inline-flex items-center gap-1.5 cursor-pointer shadow hover:-translate-y-0.5"
                >
                  Contacter l’atelier pour d'autres questions
                  <ArrowRight className="w-3.5 h-3.5 text-brand-bg" />
                </button>
              </div>
            </motion.div>
          )}
        </LegalPageLayout>
      </div>
    </div>
  );
}
