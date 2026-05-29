export type MeetingMood =
  | "cocooning"
  | "decouverte"
  | "cadeaux"
  | "entre-amies"
  | "atelier-conseil"
  | "autre";

export type GuestRange =
  | "moins-4"
  | "4-6"
  | "7-10"
  | "plus-10"
  | "a-definir";

export type MeetingFormState = {
  hostName: string;
  hostPhone: string;
  city: string;
  preferredDate: string;
  alternativeDate: string;
  guestRange: GuestRange | "";
  meetingMood: MeetingMood | "";
  interestedProducts: string[];
  addressDetails: string;
  extraDetails: string;
};

export const homeMeetingPageConfig = {
  brand: {
    name: "Rêve Parfumé Création",
    shortName: "Rêve Parfumé",
    whatsappNumber: "33600000000",
  },

  page: {
    eyebrow: "Réunions à domicile",
    title: "Invitez l’atelier parfumé chez vous.",
    highlightedWords: ["atelier", "chez vous"],
    subtitle:
      "Organisez un moment convivial autour des senteurs, des bougies, des fondants et des créations artisanales. L’atelier vous accompagne pour faire découvrir l’univers Rêve Parfumé à vos invitées.",
    helper:
      "La demande permet d’échanger sur la ville, la date, le nombre d’invités et les conditions d’organisation.",
  },

  hero: {
    media: {
      videoUrl: "/videos/home-meeting-scent-party.mp4",
      poster: "/images/home-meeting-poster.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1606114170889-1ded08ca06cc?q=80&w=1200", 
    },
    badges: [
      "Moment convivial",
      "Conseils senteurs",
      "Avantage hôtesse",
      "Commandes personnalisées",
    ],
    primaryCta: {
      label: "Organiser une réunion",
      target: "meetingRequest",
      icon: "CalendarHeart",
    },
    secondaryCta: {
      label: "Poser une question",
      target: "whatsapp",
      icon: "MessageCircle",
    },
  },

  hostBenefits: [
    {
      title: "Un atelier sensoriel chez vous",
      description:
        "Vos invitées découvrent les créations, les senteurs et les conseils de l’atelier dans une ambiance douce.",
      icon: "Home",
    },
    {
      title: "Des conseils personnalisés",
      description:
        "L’atelier guide chaque personne selon ses goûts, ses envies et ses idées cadeaux.",
      icon: "Sparkles",
    },
    {
      title: "Un avantage hôtesse",
      description:
        "L’hôtesse bénéficie d’un avantage défini avec l’atelier selon les commandes de la réunion.",
      icon: "Gift",
    },
  ],

  conditions: [
    {
      label: "Invités",
      value: "Minimum conseillé à définir avec l’atelier",
      icon: "Users",
    },
    {
      label: "Lieu",
      value: "Selon ville et zone de déplacement",
      icon: "MapPin",
    },
    {
      label: "Date",
      value: "À convenir selon disponibilité",
      icon: "CalendarDays",
    },
    {
      label: "Commandes",
      value: "Possibles pendant ou après la réunion",
      icon: "ShoppingBag",
    },
  ],

  meetingSteps: [
    {
      title: "Vous proposez une date",
      description:
        "Indiquez votre ville, vos disponibilités et le nombre approximatif d’invités.",
      icon: "CalendarHeart",
    },
    {
      title: "L’atelier confirme la faisabilité",
      description:
        "La zone, le créneau et les conditions sont validés ensemble.",
      icon: "ClipboardCheck",
    },
    {
      title: "Vous invitez vos proches",
      description:
        "L’atelier peut vous aider à présenter le concept simplement à vos invitées.",
      icon: "Send",
    },
    {
      title: "La réunion a lieu chez vous",
      description:
        "Découverte des créations, conseils senteurs, commandes et échanges conviviaux.",
      icon: "Sparkles",
    },
  ],

  guestRanges: [
    { id: "moins-4", label: "Moins de 4 personnes", helper: "À confirmer avec l’atelier" },
    { id: "4-6", label: "4 à 6 personnes", helper: "Format intime et convivial" },
    { id: "7-10", label: "7 à 10 personnes", helper: "Format idéal pour découvrir" },
    { id: "plus-10", label: "Plus de 10 personnes", helper: "À organiser selon espace et disponibilité" },
    { id: "a-definir", label: "Je ne sais pas encore", helper: "L’atelier vous aide à estimer" },
  ],

  meetingMoods: [
    {
      id: "cocooning",
      label: "Moment cocooning",
      description: "Une réunion douce autour de la maison, des bougies et des senteurs réconfortantes.",
      icon: "Flame",
    },
    {
      id: "decouverte",
      label: "Découverte senteurs",
      description: "Idéal pour présenter plusieurs familles olfactives et formats.",
      icon: "Sparkles",
    },
    {
      id: "cadeaux",
      label: "Idées cadeaux",
      description: "Parfait avant Noël, fêtes, anniversaires ou fin d’année scolaire.",
      icon: "Gift",
    },
    {
      id: "entre-amies",
      label: "Entre amies",
      description: "Une rencontre simple, chaleureuse et féminine.",
      icon: "Heart",
    },
    {
      id: "atelier-conseil",
      label: "Atelier conseil",
      description: "Pour aider chaque invitée à trouver sa senteur ou sa création.",
      icon: "MessageSquare",
    },
    {
      id: "autre",
      label: "Autre ambiance",
      description: "Décrivez votre idée, l’atelier vous accompagne.",
      icon: "Wand2",
    },
  ],

  productInterests: [
    { id: "bougies", label: "Bougies", icon: "Flame" },
    { id: "fondants", label: "Fondants", icon: "Sparkles" },
    { id: "bouquets", label: "Bouquets parfumés", icon: "Flower2" },
    { id: "coffrets", label: "Coffrets cadeaux", icon: "Gift" },
    { id: "brumes", label: "Brumes", icon: "Cloud" },
    { id: "poudres", label: "Poudres aspirateur", icon: "Wind" },
    { id: "personnalisation", label: "Personnalisation", icon: "Wand2" },
  ],

  formLabels: {
    hostName: "Votre prénom",
    hostPhone: "Votre téléphone",
    city: "Ville de la réunion",
    preferredDate: "Date souhaitée",
    alternativeDate: "Autre date possible",
    guestRange: "Nombre approximatif d’invités",
    meetingMood: "Ambiance souhaitée",
    interestedProducts: "Créations à présenter",
    addressDetails: "Informations utiles sur le lieu",
    extraDetails: "Détails ou questions",
  },

  placeholders: {
    hostName: "Ex : Mélanie",
    hostPhone: "Votre numéro pour échanger sur l’organisation",
    city: "Ex : ville ou secteur",
    preferredDate: "Ex : samedi 12 octobre après-midi",
    alternativeDate: "Ex : autre samedi possible, soirée en semaine...",
    addressDetails:
      "Ex : maison, appartement, accès, stationnement, espace disponible...",
    extraDetails:
      "Ex : nombre d’invitées approximatif, occasion particulière, envies de senteurs, questions...",
  },

  summary: {
    title: "Votre réunion parfumée",
    emptyTitle: "Votre projet de réunion prend forme ici.",
    emptyDescription:
      "Ajoutez votre ville, vos invitées et l’ambiance souhaitée pour préparer un message clair à l’atelier.",
    reassurance: [
      "Organisation guidée",
      "Conseils senteurs",
      "Validation ensemble",
    ],
  },

  whatsapp: {
    defaultMessage:
      "Bonjour, je souhaite organiser une réunion à domicile avec Rêve Parfumé Création.",
    submitLabel: "Envoyer ma demande de réunion",
    helper:
      "Le message WhatsApp sera préparé automatiquement. Vous pourrez le modifier avant l’envoi.",
  },

  faq: [
    {
      question: "Combien de personnes faut-il inviter ?",
      answer:
        "Le nombre minimum conseillé est à confirmer avec l’atelier selon la zone, la date et l’organisation. Vous pouvez envoyer une première idée même si le nombre n’est pas définitif.",
    },
    {
      question: "La réunion est-elle possible dans toutes les villes ?",
      answer:
        "La faisabilité dépend de la zone de déplacement de l’atelier. Indiquez votre ville pour recevoir une réponse adaptée.",
    },
    {
      question: "Les invitées doivent-elles commander obligatoirement ?",
      answer:
        "Non, la réunion permet surtout de découvrir les créations et les senteurs. Les commandes se font selon les envies.",
    },
    {
      question: "Peut-on choisir les produits présentés ?",
      answer:
        "Oui, vous pouvez indiquer les créations qui intéressent vos invitées : bougies, fondants, coffrets, personnalisation ou autres.",
    },
    {
      question: "Comment fonctionne l’avantage hôtesse ?",
      answer:
        "L’avantage hôtesse est confirmé avec l’atelier selon les conditions de la réunion et les commandes réalisées.",
    },
  ],

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
    summaryPulse: {
      scale: 1.015,
      duration: 0.22,
    },
  },
};
