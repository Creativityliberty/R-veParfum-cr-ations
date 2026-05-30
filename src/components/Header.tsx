import React, { useState } from 'react';
import { Menu, X, Instagram, Facebook, MessageSquare, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openScentQuiz: () => void;
  openScentGuide?: () => void;
}

export default function Header({ currentTab, setCurrentTab, openScentQuiz, openScentGuide }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Boutique', id: 'boutique' },
    { label: 'Personnalisation', id: 'personnalisation' },
    { label: 'Événements', id: 'evenements' },
    { label: 'Livraison', id: 'livraison' },
    { label: 'Contact', id: 'contact' }
  ];

  const mobileNavItems = [
    { label: 'Accueil', id: 'accueil' },
    { label: 'Boutique', id: 'boutique' },
    { label: 'Personnalisation', id: 'personnalisation' },
    { label: 'Événements', id: 'evenements' },
    { label: 'Réunions à Domicile', id: 'reunions' },
    { label: 'Avis', id: 'avis' },
    { label: 'Livraison & Info', id: 'livraison' },
    { label: 'À Propos de nous', id: 'a-propos' },
    { label: 'Contact', id: 'contact' }
  ];

  const handleTabClick = (id: string) => {
    setCurrentTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 pb-2 md:px-8">
      {/* Floating Capsule Container */}
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-brand-bg/85 border border-brand-pink/20 rounded-full px-4 sm:px-6 py-2 shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <button 
            onClick={() => handleTabClick('accueil')} 
            className="flex flex-col gap-0.5 group cursor-pointer text-left focus:outline-none"
          >
            <span className="text-sm sm:text-base md:text-lg font-serif font-black tracking-widest uppercase text-brand-cream drop-shadow-sm group-hover:text-brand-pink transition-colors whitespace-nowrap leading-none">
              RÊVE PARFUMÉ
            </span>
            <span className="text-[9px] font-mono tracking-widest text-brand-pink uppercase leading-none pl-0.5 block">
              création
            </span>
          </button>

          {/* Nav Items (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                  currentTab === item.id 
                    ? 'bg-brand-pink text-brand-bg shadow-sm' 
                    : 'text-brand-text-muted hover:text-brand-cream hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Socials & CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            {openScentGuide && (
              <button 
                onClick={openScentGuide}
                className="px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-depth border border-brand-pink/20 hover:border-brand-pink text-brand-pink transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Carte Senteurs
              </button>
            )}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-text-muted hover:text-brand-pink transition-colors p-1"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-brand-text-muted hover:text-brand-pink transition-colors p-1"
              title="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <button 
              onClick={() => handleTabClick('boutique')}
              className="px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-pink text-brand-bg hover:bg-brand-pink-hover transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Commander
            </button>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => handleTabClick('boutique')}
              className="px-3 py-1.5 rounded-full bg-brand-pink text-brand-bg hover:bg-brand-pink-hover font-mono text-[9px] sm:text-[10px] uppercase font-black tracking-wider flex items-center gap-1 shadow-md transition-all cursor-pointer"
              title="Boutique"
            >
              <ShoppingBag className="w-3 h-3 text-brand-bg" />
              Boutique
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-full text-brand-text-muted hover:text-brand-cream transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-20 left-4 right-4 z-40 bg-brand-depth bg-opacity-95 backdrop-blur-lg border border-brand-pink/15 rounded-3xl p-6 shadow-2xl block lg:hidden"
          >
            <nav className="flex flex-col gap-3">
              {mobileNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full text-left px-5 py-3 rounded-xl text-base font-medium transition-all ${
                    currentTab === item.id 
                      ? 'bg-brand-pink text-brand-bg' 
                      : 'text-brand-text-muted hover:text-brand-cream hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="h-px bg-brand-pink/10 my-3" />
              
              <div className="flex justify-between items-center px-4">
                <span className="text-xs text-brand-text-muted uppercase tracking-wider font-mono">Suivez-nous :</span>
                <div className="flex items-center gap-4">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-text-muted hover:text-brand-pink transition-colors p-2"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-text-muted hover:text-brand-pink transition-colors p-2"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsOpen(false);
                  openScentQuiz();
                }}
                className="w-full mt-2 py-3 rounded-full text-sm font-semibold tracking-wide bg-brand-purple text-brand-bg hover:bg-brand-cream hover:text-brand-bg transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Lancer le guide senteur
              </button>

              {openScentGuide && (
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    openScentGuide();
                  }}
                  className="w-full mt-2 py-3 rounded-full text-sm font-semibold tracking-wide bg-brand-depth border border-brand-pink/20 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" /> Carte des Senteurs (Grasse)
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
