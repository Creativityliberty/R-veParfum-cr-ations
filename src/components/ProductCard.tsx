import React from 'react';
import { Eye, HandHeart, Calendar, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: React.Key | string | number;
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div 
      className="group relative bg-brand-depth border border-brand-pink/10 border-beam-active rounded-3xl p-5 hover:border-brand-pink/40 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
      id={`card-${product.id}`}
    >
      {/* Decorative gradient glowing backing on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 via-transparent to-brand-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        {/* Rounded Image Container */}
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-brand-pink/10 mb-4 bg-brand-bg">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Badges layer */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.hasHandmadeBadge && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-brand-bg/85 backdrop-blur-sm text-brand-pink border border-brand-pink/10">
                <HandHeart className="w-3 h-3 text-brand-pink" />
                Atelier Fait Main
              </span>
            )}
            {product.hasPreorderBadge && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-brand-purple/90 backdrop-blur-sm text-brand-bg font-extrabold">
                <Calendar className="w-3 h-3 text-brand-bg" />
                Précommande
              </span>
            )}
          </div>

          {/* Weight label at bottom-right of image */}
          {product.weight && (
            <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-brand-bg/90 backdrop-blur-xs text-brand-text-muted text-[10px] font-mono border border-brand-pink/5">
              {product.weight}
            </span>
          )}
        </div>

        {/* Title & Desc */}
        <div className="mb-4">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-xl font-serif font-bold text-brand-cream group-hover:text-brand-pink transition-colors line-clamp-1">
              {product.name}
            </h3>
            <span className="text-xs text-brand-text-muted mt-1 shrink-0 font-light hover:text-brand-purple">
              {product.category}
            </span>
          </div>
          <p className="text-sm text-brand-text-muted line-clamp-2 italic leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="flex items-center justify-between pt-4 border-t border-brand-pink/10">
        <div>
          <span className="block text-[10px] font-mono text-brand-text-muted uppercase tracking-widest leading-none mb-1">tarif</span>
          <span className="font-mono text-base text-brand-pink font-semibold">
            {product.priceText || `${product.price.toFixed(2)} €`}
          </span>
        </div>

        <button
          onClick={() => onSelect(product)}
          className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs font-semibold tracking-wide bg-brand-pink/10 text-brand-pink border border-brand-pink/20 hover:bg-brand-pink hover:text-brand-bg transition-all cursor-pointer shadow-sm group-hover:scale-[1.03]"
        >
          <Eye className="w-4 h-4" />
          Découvrir
        </button>
      </div>
    </div>
  );
}
