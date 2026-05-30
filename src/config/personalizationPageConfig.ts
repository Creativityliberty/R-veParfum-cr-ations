export type CreationType = {
  id: string;
  label: string;
  desc: string;
  icon: string;
};

export type OccasionOption = {
  id: string;
  label: string;
  icon: string;
};

export type ScentMoodOption = {
  id: string;
  label: string;
  desc: string;
  mood: string;
};

export type ColorMoodOption = {
  id: string;
  label: string;
  hex?: string;
  gradient?: string;
};

export type PersonalizationFormState = {
  creationType: string;
  occasion: string;
  scentMood: string;
  colorMood: string;
  quantity: string;
  desiredDate: string;
  recipientName: string;
  customMessage: string;
  themeDetails: string;
  customerName: string;
  customerPhone: string;
};

export const personalizationPageConfig = {
  brand: {
    name: "Rêve Parfumé Création",
    whatsappNumber: "33781710985",
  },

  page: {
    eyebrow: "Création sur mesure",
    title: "Composez une création parfumée qui vous ressemble.",
    highlightedTitleWords: ["création", "parfumée"],
    subtitle:
      "Choisissez l’occasion, l’ambiance, la senteur, les couleurs et les détails. L’atelier reçoit votre demande et vous conseille ensuite sur WhatsApp.",
    helperText:
      "Aucun paiement automatique : chaque demande est relue pour vous proposer une création adaptée.",
  },

  hero: {
    media: {
      videoUrl: "/videos/atelier-composer.mp4",
      poster: "/images/atelier-hero-poster.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200",
    },
    primaryCta: {
      label: "Commencer ma demande",
      target: "personalization-composer",
    },
    secondaryCta: {
      label: "Demander conseil",
      target: "whatsapp",
    },
    badges: [
      "Sur mesure",
      "Conseil atelier",
      "Cadeaux personnalisés",
      "Événements possibles",
    ],
    floatingCard: {
      title: "Votre fiche atelier",
      items: ["Format", "Senteur", "Couleurs", "Message"],
    },
  },

  composerIntro: {
    title: "Une demande claire, une création plus juste.",
    cards: [
      {
        title: "Vous choisissez l’intention",
        desc: "Sélectionnez vos préférences émotionnelles de forme, d'arôme et d'esthétique.",
        icon: "Heart",
      },
      {
        title: "L’atelier affine la faisabilité",
        desc: "Nous vérifions nos matières, herbiers séchés et fioles en stock pour votre date.",
        icon: "Wand2",
      },
      {
        title: "La création est validée",
        desc: "Aucune fabrication sans votre feu vert esthétique et notre devis sur WhatsApp.",
        icon: "CheckCircle2",
      },
    ],
  },

  steps: [
    { title: "Format", desc: "Modèle de création" },
    { title: "Occasion", desc: "Contexte du projet" },
    { title: "Ambiance", desc: "Atmosphère olfactive" },
    { title: "Style & Finitions", desc: "Teintes et messages" },
    { title: "Contact", desc: "Vos coordonnées" },
  ],

  creationTypes: [
    { id: "bougie", label: "Bougie parfumée", desc: "Coulée sur mesure dans un joli contenant en verre ou céramique.", icon: "Flame" },
    { id: "fondants", label: "Fondants parfumés", desc: "Sachet de pièces de cire parfumée à disposer sur un brûleur.", icon: "Gem" },
    { id: "bouquet", label: "Bouquet d'ambiance", desc: "Diffuseur à bâtonnets capillaires pour encenser vos pièces de vie.", icon: "Flower2" },
    { id: "cadre", label: "Cadre ciré suspendu", desc: "Plaque décorative à suspendre fleurie aux pétales séchés.", icon: "Image" },
    { id: "coffret", label: "Coffret sur mesure", desc: "Assortiment poétique selon vos événements et moments rituels.", icon: "Gift" },
  ] as CreationType[],

  occasions: [
    { id: "cadeau", label: "Cadeau précieux", icon: "Gift" },
    { id: "mariage", label: "Mariage & Union", icon: "Heart" },
    { id: "bapteme", label: "Baptême ou Communion", icon: "Droplet" },
    { id: "maison", label: "Pour mon Intérieur", icon: "Home" },
    { id: "maitresse", label: "Merci Maîtresse / ATSEM", icon: "Award" },
    { id: "autre", label: "Autre Belle Célébration", icon: "Sparkles" },
  ] as OccasionOption[],

  scentMoods: [
    { id: "delice-interdit", label: "Délice Interdit", desc: "Une note sensuelle et mystérieuse, idéale pour les intérieurs cocooning.", mood: "Cocooning & Sensuel" },
    { id: "cerise-noire", label: "Cerise Noire explosive", desc: "Un parfum fruité intense et pétillant qui éveille les sens.", mood: "Intense & Fruité" },
    { id: "pomme-amour", label: "Pomme d'Amour", desc: "Une fragrance douce et sucrée rappelant les fêtes foraines de notre enfance.", mood: "Doux & Réconfortant" },
    { id: "monoi", label: "Monoï", desc: "Un parfum solaire et estival, idéal pour s'évader dans les îles.", mood: "Solaire & Exotique" },
    { id: "clementine-monoi", label: "Clémentine Monoï", desc: "Une fraîcheur hespéridée mariée à la sensualité du Monoï.", mood: "Frais & Solaire" },
    { id: "peche", label: "Pêche", desc: "Une senteur douce, juteuse et veloutée de pêche de vigne.", mood: "Doux & Velouté" },
    { id: "fleur-coton", label: "Fleur de coton", desc: "Une fragrance pure, poudrée et réconfortante.", mood: "Pur, Poudré & Propre" },
    { id: "fruit-rouge", label: "Fruit Rouge", desc: "Une explosion de baies sauvages, acidulée et joyeuse.", mood: "Joyeux & Acidulé" },
    { id: "agrume", label: "Agrume", desc: "Un sillage hespéridé énergisant et pétillant.", mood: "Énergisant & Pétillant" },
    { id: "lilas", label: "Lilas", desc: "Une senteur fleurie et délicate, typique du printemps.", mood: "Fleuri & Printanier" },
    { id: "atelier_choice", label: "Je laisse choisir l'atelier", desc: "Faites confiance au nez de Christelle et Mélanie selon la saison.", mood: "Inspirant & mystérieux" },
  ] as ScentMoodOption[],

  colorMoods: [
    { id: "rose-blanc", label: "Rose / Blanc", hex: "#F5C3C8" },
    { id: "violet-rose-blanc", label: "Violet / Rose / Blanc", hex: "#D4B2D8" },
    { id: "bleu-blanc", label: "Bleu / Blanc", hex: "#B4CBEA" },
    { id: "orange-blanc", label: "Orange / Blanc", hex: "#FED2A9" },
    { id: "vert-blanc", label: "Vert / Blanc", hex: "#CCE4D2" },
    { id: "marron-beige-blanc", label: "Marron / Beige / Blanc", hex: "#D3C2B0" },
    { id: "jaune-blanc", label: "Jaune / Blanc", hex: "#FFEFA6" },
    { id: "rouge-blanc", label: "Rouge / Blanc", hex: "#FFAAAA" },
    { id: "ensemble", label: "À définir ensemble", gradient: "bg-gradient-to-r from-brand-pink via-brand-purple to-brand-pink" },
  ] as ColorMoodOption[],

  liveSummary: {
    title: "Votre fiche atelier",
    emptyTitle: "La fiche est vierge...",
    emptyDescription: "Sélectionnez les premières options à gauche pour voir votre fiche de création s'illuminer.",
  },

  process: {
    title: "Comment se passe une création sur mesure ?",
    steps: [
      { title: "Vous envoyez votre idée", desc: "Le formulaire génère un récapitulatif WhatsApp à envoyer en un clic." },
      { title: "L’atelier vérifie", desc: "Nous discutons de vos détails préférés et délais de fabrication." },
      { title: "Vous validez les détails", desc: "Nous fixons le tarif transparent et la date de livraison." },
      { title: "La création est coulée", desc: "Préparée minutieusement à la main, fignolée et livrée décorée." },
    ],
  },

  faqs: {
    title: "Questions avant de personnaliser",
    questions: [
      {
        q: "Puis-je choisir la senteur exacte ?",
        a: "Oui, tout à fait ! Lors de notre échange sur WhatsApp, nous vous listerons l'entièreté de nos parfums artisanaux de Grasse actuellement en stock dans l'atelier.",
      },
      {
        q: "Puis-je choisir les couleurs ?",
        a: "Oui. Nos colorants sont d'origine naturelle (minéraux) pour conserver un côté sain. Nous marierons les teintes et les fleurs séchées incrustées selon vos directives.",
      },
      {
        q: "Combien de temps faut-il prévoir ?",
        a: "Il faut généralement compter deux semaines à compter de la validation du projet pour la préparation de vos pièces personnalisées, car tout est coulé manuellement.",
      },
      {
        q: "Peut-on faire une grande quantité pour un événement ?",
        a: "C'est notre spécialité ! Nous réalisons de magnifiques lots de suspensions rétro ou de bougies en verre pour les mariages, baptêmes et naissances. Contactez-nous le plus tôt possible pour réserver votre créneau dans l'agenda.",
      },
      {
        q: "Est-ce que la demande m’engage à acheter ?",
        a: "Absolument pas. L'envoi de la fiche atelier lance simplement une douce discussion sur WhatsApp pour voir ce qui est possible de faire ensemble.",
      },
    ],
  },

  finalCta: {
    title: "Une idée floue suffit pour commencer.",
    description:
      "Décrivez l’ambiance, l’occasion ou la personne. L’atelier vous aide à transformer l’idée en création parfumée.",
  },
};
