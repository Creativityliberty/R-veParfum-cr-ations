export type ScentFamilyKey =
  | "Tous"
  | "Floral"
  | "Gourmand"
  | "Fruite"
  | "Frais"
  | "Poudre"
  | "Boise";

export const shopPageConfig = {
  brand: {
    name: "Rêve Parfumé Création",
    whatsappNumber: "33600000000",
  },

  page: {
    eyebrow: "Boutique parfumée",
    title: "Explorez les créations de l’atelier.",
    highlightedTitleWords: ["créations", "atelier"],
    subtitle:
      "Bougies, fondants, bouquets, brumes et cadeaux parfumés faits main — choisissez par envie, senteur ou occasion.",
    helperText:
      "Pas de panier impersonnel : chaque commande peut être guidée et confirmée directement avec l’atelier.",
  },

  hero: {
    media: {
      fallbackImage: "https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?auto=format&fit=crop&w=1200&q=80",
    },
    primaryCta: {
      label: "Voir les créations",
      target: "productsGrid",
    },
    secondaryCta: {
      label: "Besoin d’un conseil ?",
      target: "whatsapp",
    },
    badges: [
      "Fait main en Bourgogne",
      "Cire 100% Soja",
      "Huiles de Grasse certifiées",
      "Éco-responsable",
    ],
    floatingCard: {
      title: "Atmosphères Olfactives",
      description: "Chaque création est coulée avec soin pour éveiller vos sens.",
      scents: ["Fleur de Coton", "Caramel Beurre Salé", "Monoï Absolu", "Fleur de Cerisier"],
    }
  },

  filters: {
    searchPlaceholder: "Rechercher une bougie, une senteur, une occasion...",
    labels: {
      all: "Toutes les créations",
      category: "Catégorie d'objet",
      scentFamily: "Famille olfactive",
      occasion: "Pour quelle occasion ?",
      budget: "Budget maximum",
      customizable: "Personnalisable uniquement",
      sort: "Trier l'atelier",
    },
    // Map with icons
    categories: [
      { id: "Tous", label: "Tout voir", icon: "Sparkles" },
      { id: "Bougies en pot", label: "Bougies en Pot", icon: "Flame" },
      { id: "Fondants", label: "Fondants", icon: "Gem" },
      { id: "Bouquets parfumés", label: "Bouquets Parfumés", icon: "Flower2" },
      { id: "Cadres parfumés", label: "Cadres & Tablettes", icon: "Image" },
      { id: "Brumes", label: "Brumes d'Ambiance", icon: "Cloud" },
      { id: "Poudres aspirateur", label: "Poudres Aspirateur", icon: "Wind" },
      { id: "Suspensions voiture", label: "Suspensions Voiture", icon: "Car" },
      { id: "Coffrets cadeaux", label: "Coffrets Cadeaux", icon: "Gift" },
    ],
    scentFamilies: [
      { id: "Tous", label: "Toutes les fragrances", icon: "Sparkles", color: "#EFC6D2" },
      { id: "Floral", label: "Floral", mood: "Doux & romantique", icon: "Flower2", color: "#BFA4D8" },
      { id: "Gourmand", label: "Gourmand", mood: "Chaleureux & réconfortant", icon: "Flame", color: "#E8D3B0" },
      { id: "Fruité", label: "Fruité", mood: "Joyeux & pétillant", icon: "Sun", color: "#F8DDE6" },
      { id: "Frais", label: "Frais & Tonique", mood: "Pur & lumineux", icon: "Wind", color: "#A7F3D0" },
      { id: "Doux / Poudré", label: "Poudré & Cocon", mood: "Délicat & protecteur", icon: "Cloud", color: "#E2E8F0" },
      { id: "Chaleureux / Boisé", label: "Chaleureux & Boisé", mood: "Élégant & enveloppant", icon: "Trees", color: "#F59E0B" },
    ],
    occasions: [
      { id: "Tous", label: "Toutes les occasions", icon: "Calendar" },
      { id: "Cadeau", label: "Idée Cadeau Précieux", icon: "Gift" },
      { id: "Maison", label: "Ambiance Maison", icon: "Home" },
      { id: "Mariage", label: "Mariage & Événements", icon: "Heart" },
      { id: "Voiture", label: "Aide au Voyage", icon: "Car" },
      { id: "Détente", label: "Détente & Soin", icon: "Compass" },
    ],
    sortOptions: [
      { id: "featured", label: "Sélection de Mélanie & Christelle" },
      { id: "priceAsc", label: "Tarif : croissant" },
      { id: "priceDesc", label: "Tarif : décroissant" },
      { id: "rating", label: "Les mieux notés" },
    ],
  },

  productCard: {
    showQuickView: true,
    showWhatsappShortcut: true,
    imageRatio: "aspect-[4/5]",
  },

  guidanceBanner: {
    title: "Vous hésitez entre plusieurs senteurs ?",
    description: "Dites-nous l'ambiance recherchée : cocooning, fraîche, fleurie, gourmande ou élégante. Christelle et Mélanie vous conseillent personnellement sur WhatsApp sous 24h.",
    primaryCta: "Demander conseil",
    whatsappMessage: "Bonjour Mélanie et Christelle ! Je visite la boutique en ligne mais j'hésite entre plusieurs senteurs. Pourriez-vous m'accompagner en fonction de mes goûts ?",
  },

  emptyState: {
    title: "Aucune création ne correspond à vos filtres.",
    description: "L'atelier déborde d'idées ! Essayez d'élargir votre recherche ou demandez-nous directement conseil par message.",
    cta: "Réinitialiser les filtres",
    whatsappCta: "Parler à l'atelier",
  },

  finalCta: {
    eyebrow: "Un sur-mesure d'exception",
    title: "L'atelier s'adapte à chacun de vos événements.",
    description: "Couleur de cire, parfum de Grasse sur-mesure, contenant spécifique ou étiquettes dorées personnalisées : offrez un souvenir olfactif inoubliable à vos invités.",
    primaryCta: "Créer un devis sur-mesure",
    secondaryCta: "Nous écrire",
  },
};
