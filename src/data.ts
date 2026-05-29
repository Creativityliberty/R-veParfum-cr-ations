import { Product, Review } from "./types";
import arrosoirImg from './assets/images/products/arrosoir.jpeg';
import deesseChouchoute1Img from './assets/images/products/deesse_chouchoute_1.jpeg';
import deesseChouchoute2Img from './assets/images/products/deesse_chouchoute_2.jpeg';
import deesseChutImg from './assets/images/products/deesse_chut.jpeg';
import busteClassicImg from './assets/images/products/buste_classic.jpeg';
import design1Img from './assets/images/products/design_1.jpeg';
import design2Img from './assets/images/products/design_2.jpeg';
import pot10FondantsImg from './assets/images/products/pot_10_fondants.jpeg';
import bouquet18Fondants1Img from './assets/images/products/bouquet_18_fondants_1.jpeg';
import bouquet18Fondants2Img from './assets/images/products/bouquet_18_fondants_2.jpeg';
import bouquetCompagnon1Img from './assets/images/products/bouquet_compagnon_1.jpeg';
import bouquetCompagnon2Img from './assets/images/products/bouquet_compagnon_2.jpeg';
import bouquetCompagnon3Img from './assets/images/products/bouquet_compagnon_3.jpeg';
import bouquetCompagnon4Img from './assets/images/products/bouquet_compagnon_4.jpeg';
import petitCadre1Img from './assets/images/products/petit_cadre_1.jpeg';
import petitCadre2Img from './assets/images/products/petit_cadre_2.jpeg';
import grandCadre1Img from './assets/images/products/grand_cadre_1.jpeg';
import grandCadre2Img from './assets/images/products/grand_cadre_2.jpeg';
import grandCadre3Img from './assets/images/products/grand_cadre_3.jpeg';
import produitsMix1Img from './assets/images/products/produits_mix_1.jpeg';
import produitsMix2Img from './assets/images/products/produits_mix_2.jpeg';

export const CATEGORIES = [
  "Tous",
  "Bougies moulées et pots",
  "Cadres et fondants",
];

export const SCENT_FAMILIES = {
  Gourmand: "Sucré, délicieux et envoûtant",
  Fruité: "Pétillant, joyeux et gorgé de soleil",
  Floral: "Doux, printanier et poétique",
  "Chaleureux / Boisé": "Soleil, exotisme et chaleur",
};

export const SCENTS = [
  { name: "Délice Interdit", family: "Gourmand", icon: "cake" },
  { name: "Cerise Noire Explosive", family: "Gourmand", icon: "cherry" },
  { name: "Pomme d'Amour", family: "Gourmand", icon: "heart" },
  { name: "Pêche", family: "Fruité", icon: "fruit" },
  { name: "Fruits Rouges", family: "Fruité", icon: "berry" },
  { name: "Agrumes", family: "Fruité", icon: "sun" },
  { name: "Clémentine Monoï", family: "Fruité", icon: "sparkles" },
  { name: "Fleur de Coton", family: "Floral", icon: "cloud" },
  { name: "Lilas", family: "Floral", icon: "flower" },
  { name: "Monoï", family: "Chaleureux / Boisé", icon: "sunset" },
];

export const COLORS = [
  "Rose / Blanc",
  "Violet / Rose / Blanc",
  "Bleu / Blanc",
  "Orange / Blanc",
  "Vert / Blanc",
  "Marron / Beige / Blanc",
  "Jaune / Blanc",
  "Rouge / Blanc",
];

export const PRODUCTS: Product[] = [
  {
    id: "arrosoir",
    name: "Bougie Arrosoir",
    category: "Bougies moulées et pots",
    description: "Une magnifique création originale en forme d'arrosoir.",
    longDescription:
      "Une bougie coulée à la main avec passion, représentant un arrosoir détaillé. Parfait pour une décoration printanière ou pour offrir.",
    price: 15.0,
    priceText: "Tarif sur demande",
    rating: 5.0,
    image: arrosoirImg,
    features: [
      "Envoi Mondial Relay : 5,99 €",
      "Cire végétale premium",
      "Parfums de Grasse au choix",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Création Moulée",
  },
  {
    id: "deesse-chandelle",
    name: "Déesse Chandelle",
    category: "Bougies moulées et pots",
    description:
      "Bougie sculpturale en forme de chandelle rappelant la silhouette d'une déesse.",
    longDescription:
      "Apportez une touche d'élégance antique à votre intérieur avec cette chandelle élégamment sculptée. Coulée artisanalement.",
    price: 12.0,
    priceText: "Tarif sur demande",
    rating: 4.9,
    image: deesseChouchoute1Img,
    features: [
      "Envoi Mondial Relay : 5,99 €",
      "Cire végétale de qualité",
      "Personnalisation des couleurs",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Création Moulée",
  },
  {
    id: "deesse-buste",
    name: "Déesse Buste",
    category: "Bougies moulées et pots",
    description:
      "Impressionnant buste de déesse très détaillé, coulé à la main.",
    longDescription:
      "Véritable objet de décoration, ce buste de déesse sublimera votre espace tout en y diffusant un doux parfum, même éteinte.",
    price: 18.0,
    priceText: "Tarif sur demande",
    rating: 5.0,
    image: deesseChouchoute2Img,
    features: [
      "Envoi Mondial Relay : 5,99 €",
      "Design antique élégant",
      "Coulée main en Normandie",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Création Moulée",
  },
  {
    id: "buste",
    name: "Buste",
    category: "Bougies moulées et pots",
    description:
      "Création sculpturale de buste, idéale comme pièce maîtresse de décoration.",
    longDescription:
      "Chaque buste est réalisé sur mesure avec le parfum et la couleur de votre choix, pour s'intégrer parfaitement à votre intérieur.",
    price: 16.0,
    priceText: "Tarif sur demande",
    rating: 4.8,
    image: busteClassicImg,
    features: [
      "Envoi Mondial Relay : 5,99 €",
      "Belles finitions",
      "Parfum garanti longue durée",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Création Moulée",
  },
  {
    id: "design",
    name: "Design",
    category: "Bougies moulées et pots",
    description:
      "Une bougie géométrique et moderne qui apporte une touche contemporaine.",
    longDescription:
      "Alliez l'art contemporain et les parfums envoûtants de Grasse avec cette création aux lignes épurées et design modernes.",
    price: 14.0,
    priceText: "Tarif sur demande",
    rating: 4.7,
    image: design1Img,
    features: [
      "Envoi Mondial Relay : 5,99 €",
      "Lignes contemporaines",
      "Idée cadeau parfaite",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Création Moulée",
  },
  {
    id: "pot-rayure",
    name: "Pot Rayure",
    category: "Bougies moulées et pots",
    description:
      "Bougie présentée dans un pot raffiné à motifs de rayures, créant un éclairage texturé.",
    longDescription:
      "Laissez-vous envoûter par les reflets de la bougie à travers ce pot rayé. Chaque allumage est un voyage olfactif.",
    price: 22.0,
    priceText: "Tarif sur demande",
    rating: 4.9,
    image: design2Img,
    features: [
      "Envoi Mondial Relay : 5,99 €",
      "Contenant texturé élégant",
      "Combustion propre et douce",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Pot",
  },
  {
    id: "cadre",
    name: "Cadre",
    category: "Cadres et fondants",
    description:
      "Création en cire format cadre pour parfumer une pièce ou décorer.",
    longDescription:
      "Un cadre élégant en cire délicatement parfumée. Il s'accroche ou se pose pour libérer ses parfums en douceur.",
    price: 18.0,
    priceText: "Tarif sur demande",
    rating: 4.8,
    image: petitCadre1Img,
    features: [
      "Envoi Mondial Relay : 7,99 €",
      "Cire durcie spéciale suspens",
      "Création florale ou colorée",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Création Cire Dure",
  },
  {
    id: "grand-cadre",
    name: "Grand Cadre",
    category: "Cadres et fondants",
    description:
      "Grand format du cadre parfumé, avec davantage de détails et une présence olfactive puissante.",
    longDescription:
      "Véritable tableau en cire qui parfume durablement et de manière intense vos plus grand espaces.",
    price: 26.0,
    priceText: "Tarif sur demande",
    rating: 5.0,
    image: grandCadre1Img,
    features: [
      "Envoi Mondial Relay : 7,99 €",
      "Format généreux",
      "Idéal cadeau ou belle pièce maison",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Création Cire Dure XXL",
  },
  {
    id: "pot-bouquet-fondants",
    name: "Pot (Bouquet de Fondants)",
    category: "Cadres et fondants",
    description:
      "Un pot contenant un sublime bouquet de fondants prêts à être fondus.",
    longDescription:
      "Un joli pot façon bouquet regorgeant de nos meilleurs fondants. Offrez-le ou utilisez un galet à la fois dans votre brûle-parfum.",
    price: 24.0,
    priceText: "Tarif sur demande",
    rating: 5.0,
    image: bouquetCompagnon1Img,
    features: [
      "Envoi Mondial Relay : 7,99 €",
      "Assortiment de fondants",
      "Pot décoratif et réutilisable",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "Assortiment Fondants",
  },
  {
    id: "gros-pot-18",
    name: "Gros Pot 18 Fondants",
    category: "Cadres et fondants",
    description:
      "Le grand format idéal pour les amateurs de fondants : 18 fondants par pot.",
    longDescription:
      "Vous adorez changer d'odeur tous les jours ? Ce généreux pot contient 18 fondants délicieusement parfumés de vos senteurs préférées.",
    price: 32.0,
    priceText: "Tarif sur demande",
    rating: 4.9,
    image: bouquet18Fondants1Img,
    features: [
      "Envoi Mondial Relay : 7,99 €",
      "Assortiment généreux (18 pièces)",
      "Parfaits pour le brûle-parfum",
    ],
    scents: [
      "Délice Interdit",
      "Monoï",
      "Fleur de Coton",
      "Cerise Noire Explosive",
      "Pomme d'Amour",
      "Clémentine Monoï",
      "Pêche",
      "Fruits Rouges",
      "Agrumes",
      "Lilas",
    ],
    customizable: true,
    hasPreorderBadge: true,
    hasHandmadeBadge: true,
    weight: "18 Fondants",
  },
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Sophie Dumont",
    rating: 5,
    text: "Une merveille ! La Déesse Chandelle au Lilas embellit mon salon. L'odeur reste tout aussi délicate même sans l'allumer. Je recommande à 100% Christelle et Mélanie !",
    date: "14 Mai 2026",
    source: "Facebook",
  },
  {
    id: "rev-2",
    author: "Jean-Baptiste L.",
    rating: 5,
    text: "J'ai commandé le Gros Pot 18 Fondants au Caramel Beurre Salé et à la Pêche pour les offrir. Emballage impeccable, expédition Mondial Relay très rapide avec un suivi.",
    date: "2 Mai 2026",
    source: "Messenger",
  },
  {
    id: "rev-3",
    author: "Mireille Roussel",
    rating: 5,
    text: "La bougie cadre parfumé est un véritable coup de cœur esthétique et olfactif. Une très belle idée cadeau pour la fête des mères.",
    date: "18 Avril 2026",
    source: "Google",
  },
  {
    id: "rev-4",
    author: "Elodie Bertin",
    rating: 5,
    text: "J'ai personnalisé le Pot Bouquet de Fondants pour l'anniversaire de ma sœur. Christelle a été adorable, réactive et à l'écoute des moindres détails pour correspondre aux couleurs. Tout le monde a adoré !",
    date: "28 Mars 2026",
    source: "Facebook",
  },
];
