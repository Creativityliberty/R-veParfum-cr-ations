import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Leaf, 
  Calendar, 
  MessageSquare, 
  ShoppingBag, 
  Compass, 
  BookHeart, 
  Truck, 
  PhoneCall, 
  Clock, 
  Grid,
  Heart,
  Eye,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Award,
  ChevronRight,
  ChevronDown,
  Droplet,
  MapPin,
  HelpCircle,
  MessageCircle,
  X,
  Plus,
  ArrowUp
} from 'lucide-react';

import Header from './components/Header';
import ScentQuiz from './components/ScentQuiz';
import ScentGuideModal from './components/ScentGuideModal';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import EventsPage from './components/EventsPage';
import ReviewsPage from './components/ReviewsPage';
import HomeMeetingPage from './components/HomeMeetingPage';
import CustomizationPage from './components/CustomizationPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import LegalPages from './components/LegalPages';
import DeliveryPage from './components/DeliveryPage';
import LifestyleCarousel from './components/LifestyleCarousel';
import HomePage from './components/HomePage';
import ShopPage from './components/ShopPage';

import { PRODUCTS, CATEGORIES, SCENTS } from './data';
import { Product } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('accueil');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [showScentGuide, setShowScentGuide] = useState<boolean>(false);
  const [legalSubTab, setLegalSubTab] = useState<string>('mentions');
  
  // Boutique advanced state filters
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [scentFilter, setScentFilter] = useState<string>('Tous');
  const [maxPrice, setMaxPrice] = useState<number>(50);
  const [onlyCustomizable, setOnlyCustomizable] = useState<boolean>(false);
  const [occasionFilter, setOccasionFilter] = useState<string>('Tous');
  
  // Custom toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeMood, setActiveMood] = useState<string>('douceur');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Filter products beautifully
  const filteredProducts = PRODUCTS.filter(p => {
    // category filter
    const matchesCategory = selectedCategory === 'Tous' || p.category === selectedCategory || 
                            (selectedCategory === 'Bougies' && p.category === 'Bougies en pot');
    
    // search filter
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // scent family filter
    let matchesScent = scentFilter === 'Tous';
    if (!matchesScent) {
      matchesScent = p.scents.some(s => {
        const scentObj = SCENTS.find(sc => sc.name === s);
        return scentObj ? scentObj.family === scentFilter : false;
      });
    }

    // occasion filter
    let matchesOccasion = occasionFilter === 'Tous';
    if (!matchesOccasion) {
      if (occasionFilter === 'Cadeau') matchesOccasion = p.category === 'Coffrets cadeaux' || p.customizable;
      if (occasionFilter === 'Maison') matchesOccasion = p.category === 'Bougies en pot' || p.category === 'Bouquets parfumés' || p.category === 'Fondants' || p.category === 'Brumes' || p.category === 'Poudres aspirateur';
      if (occasionFilter === 'Mariage') matchesOccasion = p.customizable && (p.category === 'Bougies en pot' || p.category === 'Cadres parfumés' || p.category === 'Fondants');
      if (occasionFilter === 'Voiture') matchesOccasion = p.category === 'Suspensions voiture';
      if (occasionFilter === 'Détente') matchesOccasion = p.category === 'Bougies en pot' || p.category === 'Brumes' || p.category === 'Bouquets parfumés';
      if (occasionFilter === 'Événement') matchesOccasion = p.customizable;
    }

    // customizable filter
    const matchesCustomizable = !onlyCustomizable || p.customizable;

    // price filter
    const matchesPrice = p.price <= maxPrice;

    return matchesCategory && matchesSearch && matchesScent && matchesOccasion && matchesCustomizable && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-brand-bg text-brand-cream selection:bg-brand-pink selection:text-brand-bg overflow-x-hidden pt-24 md:pt-28 pb-12 font-sans relative">
      
      {/* Dynamic Background decorative warm ambient light globes */}
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-brand-pink/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute top-[80vh] left-0 w-[35rem] h-[35rem] bg-brand-purple/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[40rem] h-[40rem] bg-brand-wax/5 rounded-full filter blur-[140px] pointer-events-none" />

      {/* Floating Header Navigation */}
      <Header 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        openScentQuiz={() => {
          setShowQuizModal(true);
          // Auto-scroll to quiz area when opened on simple page layouts
          const quizEl = document.getElementById('scent-finder-anchor');
          if (quizEl) {
            quizEl.scrollIntoView({ behavior: 'smooth' });
          }
        }} 
        openScentGuide={() => setShowScentGuide(true)}
      />

      {/* Floating notification Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl bg-brand-depth border border-brand-pink/30 text-brand-pink font-medium text-sm shadow-2xl flex items-center gap-2"
          >
            <Sparkles className="w-5 h-5 animate-pulse text-amber-300" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full">
        <AnimatePresence mode="wait">
               {/* ==================== 1. ACCUEIL TAB ==================== */}
          {currentTab === 'accueil' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <HomePage
                setCurrentTab={setCurrentTab}
                setSelectedCategory={setSelectedCategory}
                setSelectedProduct={setSelectedProduct}
                setShowQuizModal={setShowQuizModal}
                allProducts={PRODUCTS}
              />
            </motion.div>
          )}

          {/* ==================== 2. BOUTIQUE CATALOGUE TAB ==================== */}
          {currentTab === 'boutique' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
              id="boutique-main-view"
            >
              <ShopPage
                setCurrentTab={setCurrentTab}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                scentFilter={scentFilter}
                setScentFilter={setScentFilter}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                onlyCustomizable={onlyCustomizable}
                setOnlyCustomizable={setOnlyCustomizable}
                occasionFilter={occasionFilter}
                setOccasionFilter={setOccasionFilter}
                setSelectedProduct={setSelectedProduct}
                filteredProducts={filteredProducts}
                openScentGuide={() => setShowScentGuide(true)}
              />
            </motion.div>
          )}

          {/* ==================== 3. EVENEMENTS TAB ==================== */}
          {currentTab === 'evenements' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <EventsPage />
            </motion.div>
          )}

          {/* ==================== 4. REUNIONS TAB ==================== */}
          {currentTab === 'reunions' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <HomeMeetingPage onShopClick={() => { setCurrentTab('boutique'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} onContactClick={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            </motion.div>
          )}

          {/* ==================== 5. AVIS CLIENTS TAB ==================== */}
          {currentTab === 'avis' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <ReviewsPage onShopClick={() => { setCurrentTab('boutique'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            </motion.div>
          )}

          {/* ==================== 6. LIVRAISON & INFORMATION TAB ==================== */}
          {currentTab === 'livraison' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <DeliveryPage 
                onNavigateToContact={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                onNavigateToBoutique={() => { setCurrentTab('boutique'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              />
            </motion.div>
          )}

          {/* ==================== 7. PERSONNALISATION TAB ==================== */}
          {currentTab === 'personnalisation' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <CustomizationPage onSuccess={(text) => triggerToast(text)} />
            </motion.div>
          )}

          {/* ==================== 8. À PROPOS TAB ==================== */}
          {currentTab === 'a-propos' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <AboutPage 
                onNavigateToBoutique={() => { setCurrentTab('boutique'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                onNavigateToContact={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              />
            </motion.div>
          )}

          {/* ==================== 9. CONTACT TAB ==================== */}
          {currentTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <ContactPage setCurrentTab={setCurrentTab} onSuccess={(text) => triggerToast(text)} />
            </motion.div>
          )}

          {/* ==================== 10. LEGAL PAGES SUB-TABS ==================== */}
          {currentTab === 'legals' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative"
            >
              <LegalPages 
                initialSubTab={legalSubTab} 
                onNavigateToContact={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ==================== INLINE CUSTOM CHEKOUT MODAL ==================== */}
      {selectedProduct && (
        <ProductDetailsModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* ==================== SCENT QUIZ MODAL ==================== */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 bg-brand-bg/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-brand-pink/20 shadow-2xl">
            <ScentQuiz 
              onSelectProduct={(p) => {
                setSelectedProduct(p);
                setShowQuizModal(false);
              }}
              onClose={() => setShowQuizModal(false)}
            />
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-brand-bg/85 border border-brand-pink/20 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-all duration-300 z-10 cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ==================== SCENT GUIDE CAROUSEL MODAL ==================== */}
      <ScentGuideModal 
        isOpen={showScentGuide} 
        onClose={() => setShowScentGuide(false)} 
      />

      {/* ==================== FOOTER ==================== */}
      <footer className="mt-28 border-t border-brand-pink/10 py-16 bg-brand-depth/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            
            {/* Column 1: Intro brand */}
            <div className="md:col-span-5 text-left space-y-4">
              <h3 className="text-2xl font-serif font-bold text-brand-pink tracking-wide">
                Rêve Parfumé <span className="font-light italic text-brand-purple">Création</span>
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-light">
                Des créations parfumées faites main, pensées pour offrir, décorer et parfumer avec douceur. Concepteur de douceurs parfumées saines et artisanales à base de pure cire végétale de soja et de véritables fleurs séchées locales.
              </p>
              <div className="pt-2 text-[11px] font-mono text-brand-pink/80 space-y-1">
                <div>Normandie, France · Co-géré par Christelle & Mélanie</div>
                <div className="text-[10px] text-brand-text-muted">
                  Tél Christelle : 06.68.83.08.03 &nbsp;·&nbsp; SIRET 828 471 920 00029<br />
                  Tél Mélanie : 07.81.71.09.85 &nbsp;·&nbsp; SIRET 992 363 911 00015
                </div>
              </div>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="md:col-span-4 text-left">
              <h4 className="text-xs uppercase font-mono tracking-widest text-brand-cream font-bold mb-4">L'Atelier Rêve</h4>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-brand-text-muted">
                <button onClick={() => { setCurrentTab('boutique'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors text-left">Boutique</button>
                <button onClick={() => { setCurrentTab('personnalisation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors text-left">Personnalisation</button>
                <button onClick={() => { setCurrentTab('evenements'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors text-left">Mariages & Événements</button>
                <button onClick={() => { setCurrentTab('reunions'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors text-left">Réunions à Domicile</button>
                <button onClick={() => { setCurrentTab('avis'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors text-left">Avis clients</button>
                <button onClick={() => { setCurrentTab('livraison'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors text-left">Livraison & Info</button>
                <button onClick={() => { setCurrentTab('a-propos'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors text-left">À Propos</button>
                <button onClick={() => { setCurrentTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors text-left">Contact</button>
              </div>
            </div>

            {/* Column 3: Social grids & Delivery */}
            <div className="md:col-span-3 text-left">
              <h4 className="text-xs uppercase font-mono tracking-widest text-brand-cream font-bold mb-4">Rejoignez-nous</h4>
              <p className="text-[11px] text-brand-text-muted leading-relaxed font-light mb-4">Suivez notre fabrication artisanale au jour le jour sur nos réseaux sociaux d'artistes.</p>
              {/* TODO: Replace with real Rêve Parfumé social URLs */}
              <div className="flex gap-4">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-brand-pink hover:text-brand-bg text-brand-text-muted transition-all font-mono text-xs cursor-pointer"
                >
                  Facebook
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-brand-pink hover:text-brand-bg text-brand-text-muted transition-all font-mono text-xs cursor-pointer"
                >
                  Instagram
                </a>
              </div>

              <div className="mt-8">
                <h4 className="text-xs uppercase font-mono tracking-widest text-brand-cream font-bold mb-4">Livraison de Confiance</h4>
                <div className="flex items-center justify-center p-3 rounded-xl bg-white/90 shadow-sm inline-flex">
                  <img src="https://www.mondialrelay.fr/media/126147/mondial-relay-by-inpostsvglogo.png" alt="Mondial Relay" className="h-5 object-contain" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

          </div>

          {/* Footer second raw for technical / legal links & copyright */}
          <div className="pt-10 border-t border-brand-pink/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-brand-text-muted">
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <button onClick={() => { setLegalSubTab('mentions'); setCurrentTab('legals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors">Mentions Légales</button>
              <button onClick={() => { setLegalSubTab('cgv'); setCurrentTab('legals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors">CGV</button>
              <button onClick={() => { setLegalSubTab('confidentialite'); setCurrentTab('legals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors">Politique de Confidentialité</button>
              <button onClick={() => { setLegalSubTab('livraison-retrait'); setCurrentTab('legals'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-brand-pink transition-colors">Politique Livraison / Retrait</button>
            </div>
            
            <div className="font-mono text-right">
              &copy; {new Date().getFullYear()} Rêve Parfumé · Fabriqué avec amour en France
            </div>
          </div>

        </div>
      </footer>

      {/* Permanent floating chat trigger speed dial for mobile / desktop layout */}
      <div className="fixed bottom-6 left-6 z-40">
        <a 
          href="https://wa.me/33781710985?text=Bonjour%20M%C3%A9lanie%20et%20Christelle%2C%20je%20souhaite%20me%20renseigner%20sur%20vos%20cr%C3%A9ations%20parfum%C3%A9es%20!" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 group p-4.5 bg-brand-pink text-brand-bg font-extrabold text-sm rounded-full shadow-2xl hover:bg-brand-pink-hover transition-all duration-300 scale-100 hover:scale-105"
          title="Parler sur WhatsApp"
        >
          <PhoneCall className="w-5 h-5 text-brand-bg" />
          <span className="hidden md:inline-block text-xs uppercase tracking-widest leading-none font-bold">Aide WhatsApp (Conseil)</span>
        </a>
      </div>

      {/* Scroll-to-top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-brand-depth border border-brand-pink/20 text-brand-pink hover:bg-brand-pink hover:text-brand-bg transition-colors shadow-2xl cursor-pointer"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
