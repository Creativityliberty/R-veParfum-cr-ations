import mariage1Img from '../assets/images/events/mariage_1.jpeg';
import mariage2Img from '../assets/images/events/mariage_2.jpeg';
import bapteme1Img from '../assets/images/events/bapteme_1.jpeg';
import bapteme2Img from '../assets/images/events/bapteme_2.jpeg';
import bapteme3Img from '../assets/images/events/bapteme_3.jpeg';
import bapteme5Img from '../assets/images/events/bapteme_5.jpeg';

export type EventType =
  | "mariage"
  | "bapteme"
  | "anniversaire"
  | "baby-shower"
  | "communion"
  | "remerciement"
  | "professionnel"
  | "autre";

export type EventCreationType =
  | "cadeaux-invites"
  | "bougies"
  | "fondants"
  | "bouquets"
  | "cadres"
  | "coffrets"
  | "suspensions"
  | "sur-mesure";

export type EventScentMood =
  | "floral"
  | "gourmand"
  | "frais"
  | "poudre"
  | "boise"
  | "surprise";

export type EventFormState = {
  eventType: EventType | "";
  eventDate: string;
  guestCount: string;
  creationType: EventCreationType | "";
  scentMood: EventScentMood | "";
  colorTheme: string;
  eventTheme: string;
  personalizationText: string;
  budgetIdea: string;
  deliveryPreference: string;
  customerName: string;
  customerPhone: string;
  extraDetails: string;
};

export const eventsPageConfig = {
  brand: {
    name: "Rêve Parfumé Création",
    shortName: "Rêve Parfumé",
    whatsappNumber: "33600000000",
  },

  page: {
    eyebrow: "Mariages & événements",
    title: "Une senteur pour marquer vos plus beaux moments.",
    highlightedWords: ["senteur", "moments"],
    subtitle:
      "Cadeaux invités, bougies personnalisées, fondants, bouquets parfumés ou coffrets : l’atelier imagine des créations parfumées adaptées à votre thème, vos couleurs et votre événement.",
    helper:
      "Chaque demande est étudiée selon la date, la quantité, les détails de personnalisation et les disponibilités de l’atelier.",
  },

  hero: {
    media: {
      videoUrl: "/videos/events-ceremony-scent.mp4",
      poster: "/images/events-hero-poster.jpg",
      fallbackImage: mariage1Img,
    },
    badges: [
      "Mariages",
      "Baptêmes",
      "Cadeaux invités",
      "Devis personnalisé",
    ],
    primaryCta: {
      label: "Créer ma demande événement",
      target: "eventQuote",
      icon: "CalendarHeart",
    },
    secondaryCta: {
      label: "Écrire à l’atelier",
      target: "whatsapp",
      icon: "MessageCircle",
    },
  },

  eventTypes: [
    {
      id: "mariage",
      label: "Mariage",
      description: "Cadeaux invités, bougies personnalisées, senteurs assorties au thème.",
      icon: "Heart",
      recommendedCreations: ["cadeaux-invites", "bougies", "fondants"],
      mood: "romantique",
    },
    {
      id: "bapteme",
      label: "Baptême",
      description: "Créations douces, délicates, personnalisées avec prénom ou date.",
      icon: "Sparkles",
      recommendedCreations: ["fondants", "cadres", "coffrets"],
      mood: "tendre",
    },
    {
      id: "anniversaire",
      label: "Anniversaire",
      description: "Coffrets, bougies ou petites attentions parfumées selon l’âge et l’ambiance.",
      icon: "Cake",
      recommendedCreations: ["coffrets", "bougies", "fondants"],
      mood: "festif",
    },
    {
      id: "baby-shower",
      label: "Baby shower",
      description: "Créations poudrées, douces et personnalisées pour une célébration tendre.",
      icon: "Baby",
      recommendedCreations: ["fondants", "cadres", "coffrets"],
      mood: "cocooning",
    },
    {
      id: "remerciement",
      label: "Remerciement",
      description: "Petites attentions parfumées pour maîtresse, ATSEM, témoins ou proches.",
      icon: "HandHeart",
      recommendedCreations: ["fondants", "coffrets", "suspensions"],
      mood: "gratitude",
    },
    {
      id: "professionnel",
      label: "Événement professionnel",
      description: "Cadeaux clients, collaborateurs, CE ou petites séries personnalisées.",
      icon: "BriefcaseBusiness",
      recommendedCreations: ["coffrets", "bougies", "sur-mesure"],
      mood: "élégant",
    },
  ],

  creationTypes: [
    {
      id: "cadeaux-invites",
      label: "Cadeaux invités",
      description: "Petites créations parfumées à offrir à chaque invité.",
      icon: "Gift",
      idealFor: ["mariage", "bapteme", "communion"],
      quantityHint: "Idéal pour 20 à 150 pièces.",
      image: bapteme1Img,
    },
    {
      id: "bougies",
      label: "Bougies personnalisées",
      description: "Une création élégante avec senteur, couleur ou étiquette personnalisée.",
      icon: "Flame",
      idealFor: ["mariage", "anniversaire", "professionnel"],
      quantityHint: "Possible en pièce unique ou petite série.",
      image: mariage2Img,
    },
    {
      id: "fondants",
      label: "Fondants parfumés",
      description: "Format accessible, délicat et facile à personnaliser.",
      icon: "Sparkles",
      idealFor: ["bapteme", "remerciement", "mariage"],
      quantityHint: "Très adapté aux cadeaux invités.",
      image: bapteme3Img,
    },
    {
      id: "coffrets",
      label: "Coffrets personnalisés",
      description: "Composition complète pour témoins, proches, clients ou invités spéciaux.",
      icon: "PackageHeart",
      idealFor: ["mariage", "professionnel", "anniversaire"],
      quantityHint: "Pour cadeaux plus complets.",
      image: bapteme5Img,
    },
  ],

  scentMoods: [
    { id: "floral", label: "Floral", description: "Romantique, doux, féminin." },
    { id: "gourmand", label: "Gourmand", description: "Chaleureux, réconfortant, généreux." },
    { id: "frais", label: "Frais", description: "Léger, propre, lumineux." },
    { id: "poudre", label: "Poudré", description: "Tendre, élégant, cocooning." },
    { id: "boise", label: "Boisé", description: "Chic, profond, raffiné." },
    { id: "surprise", label: "Je laisse choisir l’atelier", description: "L’atelier propose selon votre thème." },
  ],

  formLabels: {
    eventDate: "Date de l’événement",
    guestCount: "Nombre d’invités ou quantité",
    colorTheme: "Couleurs souhaitées",
    eventTheme: "Thème de l’événement",
    personalizationText: "Texte, prénom, date...",
    budgetIdea: "Budget approximatif",
    deliveryPreference: "Retrait ou livraison",
    customerName: "Votre prénom",
    customerPhone: "Votre téléphone",
    extraDetails: "Détails importants",
  },

  placeholders: {
    eventDate: "Ex : 21 septembre 2026",
    guestCount: "Ex : 50 invités...",
    colorTheme: "Ex : rose poudré, or...",
    eventTheme: "Ex : champêtre chic...",
    personalizationText: "Ex : Emma & Lucas...",
    budgetIdea: "Ex : à définir...",
    deliveryPreference: "Ex : retrait atelier...",
    customerName: "Votre prénom",
    customerPhone: "06...",
    extraDetails: "Ex : urgence, couleurs à éviter...",
  },

  process: [
    { title: "Vous décrivez l’événement", icon: "CalendarHeart" },
    { title: "L’atelier vérifie", icon: "ClipboardCheck" },
    { title: "Proposition", icon: "MessagesSquare" },
    { title: "Préparation", icon: "Sparkles" },
  ],

  faq: [
    { q: "Combien de temps faut-il prévoir ?", a: "Anticipez le plus possible." },
    { q: "Peut-on personnaliser ?", a: "Oui, selon faisabilité." },
  ],

  summary: {
    title: "Votre demande événement",
    emptyTitle: "Votre devis prend forme ici.",
    emptyDescription: "Ajoutez les détails de votre événement pour préparer un message clair à l’atelier.",
    reassurance: [
      "Devis personnalisé",
      "Conseil senteur",
      "Validation avant fabrication",
    ],
  },

  whatsapp: {
    defaultMessage: "Bonjour, je souhaite faire une demande pour un événement chez Rêve Parfumé Création.",
    submitLabel: "Envoyer ma demande événement",
    helper: "Le message sera préparé automatiquement. Vous pourrez le modifier avant l’envoi.",
  },
};
