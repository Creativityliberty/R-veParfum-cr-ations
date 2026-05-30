import bougiePotImg from '../assets/images/products/bougie_pot_artisanale.png';
import coffretImg from '../assets/images/products/coffret_cadeau_luxe.png';
import fondantsImg from '../assets/images/products/fondants_parfumes.png';
import atelierCoulageImg from '../assets/images/atelier/atelier_bougie_coulage.png';
import produitsMix1 from '../assets/images/products/produits_mix_1.jpeg';
import bouquetCompagnon1 from '../assets/images/products/bouquet_compagnon_1.jpeg';
import atelierCreatricesHero from '../assets/images/atelier/atelier_creatrices_hero.png';
import categoryBougiesImg from '../assets/images/categories/category_bougies.png';
import categoryFondantsImg from '../assets/images/categories/category_fondants.png';
import categoryBouquetsImg from '../assets/images/categories/category_bouquets.png';
import categoryCadeauxImg from '../assets/images/categories/category_cadeaux.png';

export const homePageConfig = {
  brand: {
    name: "Rêve Parfumé Création",
    shortName: "Rêve Parfumé",
    baseline: "Créations parfumées artisanales",
    locationLabel: "Atelier artisanal",
    whatsappNumber: "33781710985",
  },

  media: {
    heroVideoUrl: "", // Disabled to show the stunning background image directly
    heroPoster: atelierCreatricesHero,
    fallbackHeroImage: "/src/assets/images/atelier/atelier_creatrices_hero.png",
    craftVideoUrl: "https://player.vimeo.com/external/454583794.sd.mp4?s=d94eb3ed5b86a8ff35df17cfb6208bb42f4cfae9&profile_id=165&oauth2_token_id=57447761",
  },

  theme: {
    mode: "nocturnal-scent-atelier",
    radius: "1.25rem",
    colors: {
      background: "325 34% 6%",
      foreground: "38 38% 94%",
      mutedForeground: "35 20% 72%",
      card: "328 28% 9%",
      cardForeground: "38 38% 94%",
      primary: "334 45% 62%",
      primaryForeground: "330 35% 8%",
      secondary: "28 50% 74%",
      accent: "348 55% 72%",
      border: "330 20% 22%",
      ring: "334 45% 62%",
      cream: "#F8EFE4",
      blush: "#D9A4B4",
      prune: "#2B0D1D",
      roseGold: "#C9967E",
      wax: "#FFF1DC",
    },
  },

  typography: {
    displayFont: "Cormorant Garamond",
    bodyFont: "Inter",
    accentFont: "Instrument Serif",
    importStrategy: "Google Fonts",
  },

  nav: {
    links: [
      { label: "Accueil", target: "home" },
      { label: "Boutique", target: "shop" },
      { label: "Personnalisation", target: "custom" },
      { label: "Événements", target: "events" },
      { label: "Avis", target: "reviews" },
      { label: "Contact", target: "contact" }
    ],
    cta: {
      label: "Commander sur WhatsApp",
      target: "whatsapp",
      icon: "MessageCircle"
    }
  },

  hero: {
    eyebrow: "Confection Artisanale saine - Normandie",
    headlineLines: [
      "Arrêtez d'offrir",
      "des souvenirs toxiques."
    ],
    highlightedWords: ["toxiques.", "offrir"],
    subtitle: "Bougies sculptées, cadres fleuris et fondants coulés un à un à la main en Normandie. De la cire de soja 100% bio et du lin naturel de notre terroir pour figer vos moments précieux dans un sillage olfactif inoubliable.",
    primaryCta: {
      label: "Créer ma bougie unique",
      target: "custom",
      icon: "ArrowRight"
    },
    secondaryCta: {
      label: "Trouver ma senteur",
      target: "scentQuiz",
      icon: "Sparkles"
    },
    trustBadges: [
      "Fait main",
      "Cire de soja bio",
      "Senteurs de Grasse",
      "Personnalisable"
    ]
  },

  motion: {
    globalPreset: "perfume-mist",
    reduceMotionSafe: true,
    heroVideoFade: {
      enabled: true,
      fadeInMs: 500,
      fadeOutMs: 500,
      restartDelayMs: 100,
      endFadeThreshold: 0.55
    },
    textReveal: {
      type: "blur-word-rise",
      wordDelay: 0.075,
      duration: 0.72,
      blurFrom: 14,
      yFrom: 34,
      ease: [0.22, 1, 0.36, 1]
    },
    sectionReveal: {
      type: "fade-blur-up",
      duration: 0.7,
      y: 26,
      blur: 8,
      stagger: 0.12
    },
    cardHover: {
      y: -8,
      scale: 1.015,
      rotateX: 2,
      duration: 0.28
    },
    marquee: {
      speedSeconds: 26,
      pauseOnHover: true
    }
  },

  sections: {
    showScentWheel: true,
    showFeaturedProducts: true,
    showCraftStory: true,
    showOccasions: true,
    showQuizTeaser: true,
    showTestimonials: true,
    showFinalCTA: true
  },

  categories: [
    { label: "Bougies", description: "Pour créer une ambiance enveloppante", icon: "Flame", target: "shop?category=bougies", image: bougiePotImg },
    { label: "Fondants", description: "Pour changer de parfum au gré des envies", icon: "Sparkles", target: "shop?category=fondants", image: fondantsImg },
    { label: "Bouquets", description: "Un objet décoratif qui parfume délicatement", icon: "Flower2", target: "shop?category=bouquets", image: bouquetCompagnon1 },
    { label: "Cadeaux", description: "Des coffrets doux et personnalisables", icon: "Gift", target: "shop?category=coffrets", image: coffretImg }
  ],

  featuredProducts: [
    {
      name: "Bougie artisanale en pot",
      tag: "Best-seller",
      description: "Une création douce pour parfumer la maison avec élégance.",
      image: bougiePotImg,
      target: "shop",
      priceText: "À partir de 18,50 €"
    },
    {
      name: "Bouquet de tiges de rotin",
      tag: "Décoratif",
      description: "Une pièce parfumée qui habille une pièce autant qu’elle l’embaume.",
      image: bouquetCompagnon1,
      target: "shop",
      priceText: "À partir de 24,00 €"
    },
    {
      name: "Coffret personnalisé Rêve",
      tag: "Cadeau",
      description: "Une attention sur mesure pour anniversaire, mariage ou remerciement.",
      image: coffretImg,
      target: "custom",
      priceText: "Sur devis gratuit"
    }
  ],

  olfactoryFamilies: [
    { name: "Floral", mood: "Romantique, doux, féminin", color: "#EFC6D2" },
    { name: "Gourmand", mood: "Chaleureux, réconfortant, enveloppant", color: "#E8D3B0" },
    { name: "Frais", mood: "Pur, léger, lumineux", color: "#FFF7F1" },
    { name: "Boisé", mood: "Élégant, profond, apaisant", color: "#BFA4D8" }
  ],

  socialProof: {
    title: "Des créations pensées pour les petits et grands moments",
    stats: [
      { value: "100%", label: "fait main" },
      { value: "Grasse", label: "senteurs sélectionnées" },
      { value: "Sur mesure", label: "cadeaux & événements" }
    ],
    marqueeItems: [
      "Anniversaires chaleureux",
      "Mariages inoubliables",
      "Baptêmes de lumière",
      "Cadeaux maîtresse d'école",
      "Remerciements fleuris",
      "Maison cocooning & douce",
      "Réunions d'ateliers à domicile"
    ]
  },

  finalCta: {
    eyebrow: "Une idée précise ou juste une envie ?",
    title: "Parlez-nous de l’ambiance que vous voulez offrir.",
    description: "L’atelier vous guide vers la création, la senteur et le format les plus adaptés.",
    primaryCta: "Écrire à Mélanie & Christelle sur WhatsApp",
    secondaryCta: "Concevoir un projet sur-mesure"
  }
};
