import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Calendar,
  Users,
  HeartHandshake,
  Info,
  ShieldCheck,
} from "lucide-react";
import LifestyleCarousel from "./LifestyleCarousel";

export default function EventQuoteBuilder() {
  const [eventType, setEventType] = useState("Mariage");
  const [productType, setProductType] = useState(
    "Bougies Parfumées Miniatures",
  );
  const [guestCount, setGuestCount] = useState(50);
  const [colorTheme, setColorTheme] = useState(
    "Pastel printannier (Blanc & Rose)",
  );
  const [scentChoice, setScentChoice] = useState("Fleur de Coton");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim()) {
      alert(
        "Veuillez saisir votre nom pour que Christelle et Mélanie étudient votre devis.",
      );
      return;
    }

    const textMsg = `Bonjour Mélanie et Christelle, je souhaiterais obtenir des informations et un devis personnalisé pour un événement :

[ DETAILS DE L'EVENEMENT ]
- Type d'événement : ${eventType}
- Date prévue : ${eventDate ? eventDate : "Non stipulée pour le moment"}
- Création parfumée souhaitée : ${productType}
- Quantité estimée (Invités) : ${guestCount} personnes
- Thème couleur désiré : ${colorTheme}
- Senteur privilégiée : ${scentChoice}

[ INFORMATIONS DE CONTACT ]
- Nom de contact : ${clientName}
- Téléphone : ${clientPhone ? clientPhone : "Non fourni"}

[ INSTRUCTIONS & SOUHAITS PARTICULIERS ]
- Détails : ${additionalDetails ? additionalDetails : "À convenir ensemble sur WhatsApp lors de notre échange"}

Merci d'avance pour votre aide précieuse, j'ai hâte de donner vie à notre projet !`;

    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/33781710985?text=${encoded}`, "_blank");
  };

  return (
    <div className="space-y-16" id="event-quote-builder-tab">
      {/* 1. Carousel d'Inspirations & Mises en situation */}
      <LifestyleCarousel />

      {/* 2. Core Configurator Section */}
      <div className="bg-brand-depth border border-brand-pink/15 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-pink/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="text-center max-w-xl mx-auto space-y-2">
          <HeartHandshake className="w-8 h-8 text-brand-pink mx-auto" />
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-brand-cream">
            Configurez votre cadeau invités unique
          </h3>
          <p className="text-sm text-brand-text-muted">
            Qu'il s'agisse d'un mariage, d'un baptême ou d'un événement
            d'entreprise, offrez une empreinte sensorielle inoubliable avec des
            créations sur-mesure !
          </p>
        </div>

        {/* Highlight Card: Touch of White (Touche de Blanc) for custom parameters */}
        <div className="max-w-3xl mx-auto p-5 bg-white border border-brand-pink/20 rounded-2xl text-zinc-900 shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-b from-brand-pink to-brand-purple" />

          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-purple shrink-0" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-zinc-900">
              Charte de l'Atelier Rêve
            </span>
          </div>
          <h4 className="font-serif font-bold text-base text-zinc-900">
            Une harmonie soignée sous deux semaines de cure
          </h4>
          <p className="text-xs text-zinc-650 leading-relaxed font-light">
            Pour assurer la perfection olfactive et la dépose des fleurs séchées
            locales, Christelle et Mélanie demandent un délai minimal de{" "}
            <strong>deux semaines de fabrication</strong>. Pour les grandes
            réceptions, la personnalisation est modulable et gratuite dès 40
            pièces !
          </p>
          <div className="pt-1 flex flex-wrap gap-4 text-[10px] font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              ✔ Devis gratuit sous 48h
            </span>
            <span className="flex items-center gap-1">
              ✔ Tarifs dégressifs volume
            </span>
            <span className="flex items-center gap-1">
              ✔ Échantillon senteur possible
            </span>
          </div>
        </div>

        <form
          onSubmit={handleQuoteSubmit}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-1">
                Type d'Événement
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full p-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink"
              >
                <option value="Mariage">Mariage</option>
                <option value="Baptême / Communion">Baptême / Communion</option>
                <option value="Anniversaire">Anniversaire</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Comité d'Entreprise / CE">
                  Comité d'Entreprise / CE
                </option>
                <option value="Autre événement festif">
                  Autre événement festif
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-1">
                Date estimée de l'Événement
              </label>
              <input
                type="text"
                placeholder="Ex : Juin 2027 ou Date exacte"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full p-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-1">
                Création parfumée choisie
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full p-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink"
              >
                <option value="Mini-Bougies en Pot Céramique">
                  Mini-Bougies en Pot Céramique
                </option>
                <option value="Mini-Tablettes Gravées Suspendues">
                  Mini-Tablettes Gravées Suspendues
                </option>
                <option value="Sachets Individuels de Fondants Coeurs">
                  Sachets Individuels de Fondants Coeurs
                </option>
                <option value="Fioles Mignonnes Elixir de fleurs">
                  Fioles Mignonnes Elixir de fleurs
                </option>
                <option value="Mini-Bouquets à rotin rustique">
                  Mini-Bouquets à rotin rustique
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-1 flex justify-between">
                <span>Nombre estimé d'invités</span>
                <span className="text-brand-pink font-semibold font-mono">
                  {guestCount} pers.
                </span>
              </label>
              <input
                type="range"
                min="15"
                max="500"
                step="5"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full mt-2 cursor-pointer accent-brand-pink"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-1">
                Thème & Harmonie de couleur
              </label>
              <input
                type="text"
                placeholder="Ex : Boho sauge & terracotta, blanc épuré, lin & paille..."
                value={colorTheme}
                onChange={(e) => setColorTheme(e.target.value)}
                className="w-full p-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-1">
                Senteur favorite projetée
              </label>
              <input
                type="text"
                placeholder="Ex : Fleur de Coton, Pomme d'Amour..."
                value={scentChoice}
                onChange={(e) => setScentChoice(e.target.value)}
                className="w-full p-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-1">
              Dites-nous en plus (Gravure, rubans, budget...)
            </label>
            <textarea
              placeholder="Ex: Nous souhaiterions inscrire 'M&G 12.08.2026' sur le pot. Nous désirons un devis avec des prix dégressifs, merci !"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="w-full p-3 bg-brand-bg/60 border border-brand-pink/15 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink min-h-[80px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-brand-bg/40 p-4 rounded-xl border border-brand-pink/10">
            <div>
              <label className="block text-xs font-mono text-brand-pink uppercase tracking-wider mb-1">
                Votre Nom *
              </label>
              <input
                required
                type="text"
                placeholder="Ex : Sophie Marceau"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-3 bg-brand-depth border border-brand-pink/20 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-brand-text-muted uppercase tracking-wider mb-1">
                Téléphone alternatif
              </label>
              <input
                type="text"
                placeholder="Ex : 06 12 34 56 78"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full p-3 bg-brand-depth border border-brand-pink/20 rounded-xl text-xs text-brand-cream focus:outline-none focus:border-brand-pink"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-brand-pink text-brand-bg font-extrabold text-xs tracking-wider uppercase rounded-full hover:bg-brand-pink-hover transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer animate-none"
          >
            <Send className="w-4 h-4 text-brand-bg fill-brand-bg" />
            Demander mon devis sur WhatsApp
          </button>

          <div className="text-center">
            <p className="text-[11px] text-brand-text-muted italic">
              Christelle et Mélanie étudient les faisabilités sous 48h. Les
              devis en grand volume bénéficient de prix dégressifs exclusifs !
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
