export type ReviewSource =
  | "facebook"
  | "messenger"
  | "whatsapp"
  | "client"
  | "site"
  | "google";

export type ReviewProductType =
  | "bougie"
  | "fondants"
  | "bouquet"
  | "coffret"
  | "personnalisation"
  | "evenement"
  | "reunion"
  | "autre";

export type CustomerReview = {
  id: string;
  customerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  source: ReviewSource;
  productType: ReviewProductType;
  title?: string;
  text: string;
  dateLabel?: string;
  verified?: boolean;
  featured?: boolean;
  productLabel?: string;
};

export type ReviewFormState = {
  customerName: string;
  rating: number;
  source: ReviewSource | "";
  productType: ReviewProductType | "";
  title: string;
  text: string;
  allowDisplay: boolean;
};

export const reviewsPageConfig = {
  brand: {
    name: "Rêve Parfumé Création",
    shortName: "Rêve Parfumé",
    whatsappNumber: "33781710985",
  },

  page: {
    eyebrow: "Avis clients",
    title: "Des créations qui laissent un souvenir.",
    highlightedWords: ["créations", "souvenir"],
    subtitle:
      "Retrouvez les retours de clientes qui ont offert, personnalisé ou choisi une création parfumée de l’atelier.",
    helper:
      "Les avis permettent de partager une expérience, une senteur préférée, une attention réussie ou un accompagnement apprécié.",
  },

  hero: {
    media: {
      videoUrl: "/videos/reviews-soft-scent-wall.mp4",
      poster: "/images/reviews-hero-poster.jpg",
      fallbackImage:
        "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200",
    },
    badges: [
      "Créations faites main",
      "Conseil personnalisé",
      "Cadeaux appréciés",
      "Retours clients",
    ],
    primaryCta: {
      label: "Lire les avis",
      target: "reviewsGrid",
      icon: "Star",
    },
    secondaryCta: {
      label: "Laisser un avis",
      target: "reviewForm",
      icon: "PenLine",
    },
  },

  stats: {
    title: "La confiance se construit dans les détails.",
    items: [
      {
        value: "5/5",
        label: "note moyenne",
        helper: "Basée sur l'ensemble de nos retours réels",
        icon: "Star",
      },
      {
        value: "100%",
        label: "Fait main",
        helper: "Moulé et versé avec amour en Normandie",
        icon: "HandHeart",
      },
      {
        value: "Sur mesure",
        label: "Accompagnement",
        helper: "Senteurs, coloris et rubans personnalisés",
        icon: "Wand2",
      },
    ],
  },

  filters: {
    searchPlaceholder: "Rechercher un parfum, un produit, un souvenir...",
    labels: {
      all: "Tous les avis",
      rating: "Note",
      source: "Source",
      productType: "Création",
      featured: "Mis en avant",
      reset: "Réinitialiser les filtres",
    },
    ratingOptions: [
      { id: "all", label: "Toutes les notes" },
      { id: "5", label: "5 étoiles uniquement" },
      { id: "4", label: "4 étoiles et +" },
    ],
    sources: [
      { id: "all", label: "Toutes les sources", icon: "Stars" },
      { id: "facebook", label: "Facebook", icon: "Facebook" },
      { id: "messenger", label: "Messenger", icon: "MessagesSquare" },
      { id: "whatsapp", label: "WhatsApp", icon: "MessageSquare" },
      { id: "google", label: "Google", icon: "Search" },
      { id: "client", label: "Retour direct", icon: "UserRound" },
      { id: "site", label: "Site internet", icon: "Globe" },
    ],
    productTypes: [
      { id: "all", label: "Toutes les créations" },
      { id: "bougie", label: "Bougies" },
      { id: "fondants", label: "Fondants & Galets" },
      { id: "bouquet", label: "Bouquets" },
      { id: "coffret", label: "Coffrets Cadeaux" },
      { id: "personnalisation", label: "Personnalisations" },
      { id: "evenement", label: "Événements (Mariages...)" },
      { id: "reunion", label: "Réunions & Ateliers" },
      { id: "autre", label: "Autres créations" },
    ],
  },

  reviews: [
    {
      id: "review-001",
      customerName: "Sophie Dumont",
      rating: 5,
      source: "facebook",
      productType: "bougie",
      title: "Une merveille fleurie",
      text: "Une merveille ! La Déesse Chandelle au Lilas embellit mon salon. L'odeur reste tout aussi délicate même sans l'allumer. Je recommande à 100% Christelle et Mélanie !",
      dateLabel: "14 Mai 2026",
      verified: true,
      featured: true,
      productLabel: "Déesse Chandelle (Lilas)",
    },
    {
      id: "review-002",
      customerName: "Jean-Baptiste L.",
      rating: 5,
      source: "messenger",
      productType: "fondants",
      title: "Expédition impeccable !",
      text: "J'ai commandé le Gros Pot 18 Fondants au Caramel Beurre Salé et à la Pêche pour les offrir. Emballage impeccable, expédition Mondial Relay très rapide avec un suivi.",
      dateLabel: "2 Mai 2026",
      verified: true,
      featured: true,
      productLabel: "Gros Pot 18 Fondants",
    },
    {
      id: "review-003",
      customerName: "Mireille Roussel",
      rating: 5,
      source: "google",
      productType: "coffret",
      title: "Véritable coup de cœur",
      text: "La bougie cadre parfumé est un véritable coup de cœur esthétique et olfactif. Une très belle idée cadeau pour la fête des mères.",
      dateLabel: "18 Avril 2026",
      verified: true,
      featured: true,
      productLabel: "Bougie Cadre Parfumé",
    },
    {
      id: "review-004",
      customerName: "Elodie Bertin",
      rating: 5,
      source: "facebook",
      productType: "personnalisation",
      title: "Réactive et à l'écoute !",
      text: "J'ai personnalisé le Pot Bouquet de Fondants pour l'anniversaire de ma sœur. Christelle a été adorable, réactive et à l'écoute des moindres détails pour correspondre aux couleurs. Tout le monde a adoré !",
      dateLabel: "28 Mars 2026",
      verified: true,
      featured: false,
      productLabel: "Pot Bouquet de Fondants",
    },
  ] as CustomerReview[],

  reviewCard: {
    showSource: true,
    showProductType: true,
    showVerifiedBadge: true,
    showDate: true,
    maxTextLengthBeforeClamp: 220,
  },

  form: {
    title: "Partager votre expérience",
    subtitle:
      "Votre avis aide l’atelier à faire découvrir ses créations parfumées et à rassurer les prochaines clientes.",
    fields: {
      customerName: "Votre prénom",
      rating: "Votre note",
      source: "Où avez-vous échangé avec l’atelier ?",
      productType: "Création concernée",
      title: "Titre de votre avis",
      text: "Votre message",
      allowDisplay:
        "J’accepte que mon avis puisse être affiché sur le site avec mon prénom.",
    },
    placeholders: {
      customerName: "Ex : Julie, Sophie...",
      title: "Ex : Un cadeau magnifique, senteurs divines...",
      text: "Partagez votre retour d'expérience : l'intensité de la senteur, la beauté de la présentation fait main, l'accueil pour les conseils ou le succès de votre cadeau...",
    },
    submitLabel: "Préparer mon avis",
    whatsappLabel: "Envoyer mon avis sur WhatsApp",
    helper:
      "En cliquant sur ce bouton, votre avis sera pré-rempli dans un message WhatsApp pour que nous puissions le valider d'un simple clic.",
  },

  emptyState: {
    title: "Aucun avis ne correspond à ces filtres.",
    description:
      "Essayez d’élargir votre recherche, de changer les filtres thématiques ou de consulter l'ensemble des retours.",
    cta: "Réinitialiser tous les filtres",
  },

  finalCta: {
    eyebrow: "Vous hésitez avant de commander ?",
    title: "L’atelier peut vous guider avant de choisir.",
    description:
      "Expliquez l’occasion, l’ambiance ou la personne à qui vous souhaitez offrir une création parfumée. Nous composerons le cadeau idéal.",
    primaryCta: "Demander conseil sur WhatsApp",
    secondaryCta: "Découvrir la boutique",
  },

  whatsapp: {
    reviewMessageIntro:
      "Bonjour, je souhaite partager un avis pour Rêve Parfumé Création.",
    adviceMessage:
      "Bonjour, je découvre les avis Rêve Parfumé Création et j’aimerais être conseillé(e) pour choisir une création.",
  },

  motion: {
    sectionReveal: {
      duration: 0.7,
      y: 26,
      blur: 8,
      stagger: 0.1,
    },
    cardHover: {
      y: -8,
      scale: 1.015,
      duration: 0.25,
    },
    gridStagger: {
      stagger: 0.08,
      duration: 0.55,
    },
  },
};
