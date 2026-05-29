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
    whatsappNumber: "33600000000",
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
    { id: "floral", label: "Ambiance Florale", desc: "Notes douces de fleurs fraîches et romantiques (Fleur de coton, cerisier).", mood: "Doux & romantique" },
    { id: "gourmand", label: "Ambiance Gourmande", desc: "Notes chaudes, sucrées et réconfortantes (Caramel beurre salé, vanille).", mood: "Chaleureux & réconfortant" },
    { id: "frais", label: "Ambiance Fraîche", desc: "Effluves purs, lumineux et herbacés (Eucalyptus, menthe glaciale).", mood: "Pur & lumineux" },
    { id: "boise", label: "Ambiance Boisée", desc: "Caractère élégant, profond et mystérieux (Ambre impérial, bois précieux).", mood: "Élégant & profond" },
    { id: "poudre", label: "Ambiance Poudrée", desc: "Notes délicates de maquillage rétro et de cocooning (Poudre de riz).", mood: "Délicat & cocooning" },
    { id: "fruite", label: "Ambiance Fruitée", desc: "Effluves joyeux, solaires et pétillants (Pêche veloutée, fruits rouges).", mood: "Joyeux & pétillant" },
    { id: "atelier_choice", label: "Je laisse choisir l'atelier", desc: "Faites confiance au nez de Christelle et Mélanie selon la saison.", mood: "Inspirant & mystérieux" },
  ] as ScentMoodOption[],

  colorMoods: [
    { id: "blanc", label: "Blanc Pur & Naturel", hex: "#FDFBF7" },
    { id: "rose", label: "Rose Dragée & Poudré", hex: "#FADADD" },
    { id: "vert", label: "Vert Sauge & Eucalyptus", hex: "#BCD4C4" },
    { id: "terracotta", label: "Terracotta & Ambre", hex: "#CD7F32" },
    { id: "bleu", label: "Bleu Brume & Brise", hex: "#B0C4DE" },
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
