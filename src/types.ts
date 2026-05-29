export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  longDescription: string;
  price: number; // can be "starting from" base price
  priceText?: string; // e.g., "à partir de 8,50 €"
  rating: number;
  image: string;
  features: string[];
  scents: string[];
  colors?: string[];
  customizable: boolean;
  hasPreorderBadge: boolean;
  hasHandmadeBadge: boolean;
  weight?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'Facebook' | 'Messenger' | 'Client' | 'Google';
  avatar?: string;
}

export interface ScentRecommendation {
  family: string; // e.g., floral, gourmand, fruité, frais, doux, chaleureux
  description: string;
  title: string;
  suggestedProducts: string[]; // matching IDs
}
