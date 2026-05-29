import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  Send, 
  Check, 
  User, 
  Gift, 
  Flower, 
  Flame, 
  Cake, 
  Apple, 
  Leaf, 
  Cloud, 
  Home, 
  Bed, 
  Bath, 
  Car, 
  Wind, 
  Zap 
} from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS, SCENTS } from '../data';

const getOptionIcon = (iconName: string) => {
  switch (iconName) {
    case 'user': return <User className="w-5 h-5 text-brand-pink" />;
    case 'gift': return <Gift className="w-5 h-5 text-brand-pink" />;
    case 'flower': return <Flower className="w-5 h-5 text-brand-pink" />;
    case 'cake': return <Cake className="w-5 h-5 text-brand-pink" />;
    case 'apple': return <Apple className="w-5 h-5 text-brand-pink" />;
    case 'leaf': return <Leaf className="w-5 h-5 text-brand-pink" />;
    case 'cloud': return <Cloud className="w-5 h-5 text-brand-pink" />;
    case 'flame': return <Flame className="w-5 h-5 text-brand-pink" />;
    case 'candle': return <Flame className="w-5 h-5 text-brand-pink" />;
    case 'home': return <Home className="w-5 h-5 text-brand-pink" />;
    case 'bed': return <Bed className="w-5 h-5 text-brand-pink" />;
    case 'bath': return <Bath className="w-5 h-5 text-brand-pink" />;
    case 'car': return <Car className="w-5 h-5 text-brand-pink" />;
    case 'wind': return <Wind className="w-5 h-5 text-brand-pink" />;
    case 'zap': return <Zap className="w-5 h-5 text-brand-pink" />;
    default: return <Sparkles className="w-5 h-5 text-brand-pink" />;
  }
};

interface ScentQuizProps {
  onSelectProduct: (product: Product) => void;
  onClose?: () => void;
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: {
    label: string;
    value: string;
    icon: string;
    family?: string; // Links to Olfactory scent family if applicable
    category?: string; // Links to category matching
  }[];
}

export default function ScentQuiz({ onSelectProduct, onClose }: ScentQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      title: "À qui est destinée cette création parfumée ?",
      subtitle: "Pour que nous adaptions le style et l'attention du coffret",
      options: [
        { label: "C'est pour me faire plaisir", value: "moi", icon: "user" },
        { label: "C'est un cadeau unique à offrir", value: "cadeau", icon: "gift" }
      ]
    },
    {
      id: 2,
      title: "Quelle est ton atmosphère olfactive idéale ?",
      subtitle: "Sélectionne l'univers sensoriel qui te fait vibrer",
      options: [
        { label: "Floral & Printanier", value: "Floral", icon: "flower", family: "Floral" },
        { label: "Sucre d'enfance & Gourmandise", value: "Gourmand", icon: "cake", family: "Gourmand" },
        { label: "Fruité, Juteux & Ensoleillé", value: "Fruité", icon: "apple", family: "Fruité" },
        { label: "Bouffée d'air frais & Propreté", value: "Frais", icon: "leaf", family: "Frais" },
        { label: "Doux, Poudré & Cocooning", value: "Doux / Poudré", icon: "cloud", family: "Doux / Poudré" },
        { label: "Ambré, Boisé & Chaleureux", value: "Chaleureux / Boisé", icon: "flame", family: "Chaleureux / Boisé" }
      ]
    },
    {
      id: 3,
      title: "Pour quelle pièce ou quel usage principal ?",
      subtitle: "Chaque espace a besoin d'une intensité de diffusion adaptée",
      options: [
        { label: "Le grand salon lumineux", value: "salon", icon: "home" },
        { label: "La chambre à coucher apaisante", value: "chambre", icon: "bed" },
        { label: "La salle de bain ou l'entrée accueillante", value: "bain", icon: "bath" },
        { label: "Sur le pouce / Dans ma voiture", value: "nomade", icon: "car" }
      ]
    },
    {
      id: 4,
      title: "Quelle gestuelle de diffusion t'attire le plus ?",
      subtitle: "L'art de parfumer dépend de l'interaction avec le parfum",
      options: [
        { label: "Lente & poétique (Rotins de bois)", value: "Bouquets parfumés", icon: "wind", category: "Bouquets parfumés" },
        { label: "Immédiate & envoûtante (Cire fondante)", value: "Fondants", icon: "zap", category: "Fondants" },
        { label: "Chaleur de flamme & crépitement (Bougies)", value: "Bougies en pot", icon: "candle", category: "Bougies en pot" },
        { label: "Geste instantané & textile (Brumes)", value: "Brumes", icon: "wind", category: "Brumes" }
      ]
    }
  ];

  const handleSelectOption = (value: string) => {
    setAnswers({ ...answers, [currentStep]: value });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Recommendation engine based on results
  const getRecommendations = (): Product[] => {
    const targetFamily = answers[1]; // Olfactory family clicked
    const targetCategory = answers[3]; // Gestuelle preferred

    // Filter products
    let scoringProducts = PRODUCTS.map(p => {
      let score = 0;
      // Weight 1: Category match
      if (p.category === targetCategory) {
        score += 5;
      }
      
      // Weight 2: Scents from that olfactory family
      const matchingScents = p.scents.filter(scName => {
        const foundScentObj = SCENTS.find(s => s.name === scName);
        return foundScentObj?.family === targetFamily;
      });

      score += matchingScents.length * 3;
      return { product: p, score };
    });

    // Sort by descending score
    scoringProducts.sort((a, b) => b.score - a.score);

    // Return top 2 matching
    return scoringProducts.slice(0, 2).map(item => item.product);
  };

  const currentQuestion = questions[currentStep];
  const selectedValue = answers[currentStep];

  const handleSendToWhatsApp = () => {
    const recommended = getRecommendations();
    const targetFamilyName = answers[1] || "Non spécifié";
    const forWhoName = answers[0] === "moi" ? "Me faire plaisir" : "Offrir en cadeau";
    const targetPiece = answers[2] || "Non spécifié";
    const recommendedNames = recommended.map(p => p.name).join(' et ');
    const firstImageUrl = recommended[0] && recommended[0].image ? (recommended[0].image.startsWith('http') ? recommended[0].image : `https://reve-parfume.fr${recommended[0].image}`) : 'https://reve-parfume.fr/images/scent-guide.jpg';

    const text = `Bonjour Mélanie et Christelle !\nJ'ai fait votre Guide Senteur sur le site et j'ai adoré !\n\n• Aperçu : ${firstImageUrl}\n\nVoici mon profil parfum :\n- Destinataire : ${forWhoName}\n- Ambiance préférée : ${targetFamilyName}\n- Espace de vie : ${targetPiece}\n- Création recommandée : ${recommendedNames}\n\nJ'aimerais beaucoup en discuter avec vous et commander ces senteurs ! Réveillez mes sens.`;
    
    const encoded = encodeURIComponent(text);
    // Open whatsapp with Christelle and Mélanie team context
    window.open(`https://wa.me/33600000000?text=${encoded}`, '_blank');
  };

  return (
    <div className="bg-brand-depth border border-brand-pink/20 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
      {/* Absolute decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-purple/5 rounded-full filter blur-3xl pointer-events-none" />

      {!quizFinished ? (
        <div>
          {/* Quiz Header Progress */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Sparkles className="text-brand-pink w-5 h-5 animate-pulse" />
              <span className="text-xs font-mono text-brand-pink uppercase tracking-widest">Guide Senteur Interactif</span>
            </div>
            <span className="text-sm font-mono text-brand-text-muted">
              Étape {currentStep + 1} / {questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-brand-bg/55 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-brand-pink to-brand-purple transition-all duration-300" 
              style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-[280px]"
            >
              <h3 className="text-2xl md:text-3xl font-serif font-semibold text-brand-cream mb-2 leading-tight">
                {currentQuestion.title}
              </h3>
              <p className="text-sm text-brand-text-muted mb-8 italic">
                {currentQuestion.subtitle}
              </p>

              {/* Grid Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedValue === opt.value || selectedValue === opt.category;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => handleSelectOption(opt.family ? opt.family : opt.category ? opt.category : opt.value)}
                      className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-brand-pink/15 border-brand-pink shadow-md' 
                          : 'bg-brand-bg/40 border-brand-pink/10 hover:border-brand-pink/40 hover:bg-brand-bg/60'
                      }`}
                    >
                      <span className="w-12 h-12 flex items-center justify-center rounded-xl shadow-inner border border-brand-pink/10 bg-brand-bg/85 shrink-0">
                        {getOptionIcon(opt.icon)}
                      </span>
                      <div className="flex-1">
                        <span className="block font-medium text-brand-cream text-base">
                          {opt.label}
                        </span>
                        {opt.family && (
                          <span className="block text-xs text-brand-text-muted mt-0.5">
                            Ambition : {opt.family}
                          </span>
                        )}
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-brand-pink border-brand-pink' : 'border-brand-pink/30'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 text-brand-bg stroke-[4]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action buttons footer */}
          <div className="flex justify-between items-center mt-10 pt-6 border-t border-brand-pink/10">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer ${
                currentStep === 0 
                  ? 'text-gray-600 cursor-not-allowed opacity-20' 
                  : 'text-brand-text-muted hover:text-brand-cream hover:bg-white/5'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>

            <button
              onClick={handleNext}
              disabled={!selectedValue}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all ${
                selectedValue
                  ? 'bg-brand-pink text-brand-bg hover:bg-brand-pink-hover shadow-md cursor-pointer'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentStep === questions.length - 1 ? "Voir mon profil" : "Continuer"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-brand-pink/10 border border-brand-pink/20 text-brand-pink rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Sparkles className="w-10 h-10" />
          </div>

          <h3 className="text-3xl font-serif text-brand-cream font-bold mb-3">
            Senteurs prêtes, l'atelier s'agite !
          </h3>
          <p className="max-w-md mx-auto text-brand-text-muted text-sm mb-8 leading-relaxed">
            Mélanie & Christelle ont analysé tes réponses. Voici les créations qui s'harmonisent le mieux avec tes envies d'ambiance 
            <span className="text-brand-pink font-semibold"> {answers[1]}</span> :
          </p>

          {/* Core Matching Products Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10 text-left">
            {getRecommendations().map((product) => (
              <div 
                key={product.id}
                className="bg-brand-bg/60 border border-brand-pink/15 rounded-2xl p-5 flex flex-col justify-between hover:border-brand-pink/40 transition-all pointer-events-auto"
              >
                <div>
                  <div className="relative mb-3 h-32 rounded-lg overflow-hidden border border-brand-pink/10">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 right-2 px-2.5 py-1 rounded bg-brand-bg/90 text-brand-pink text-[10px] font-mono tracking-widest uppercase">
                      Recommandé
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-semibold text-brand-cream">{product.name}</h4>
                  <p className="text-xs text-brand-text-muted mb-3 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-pink/10">
                  <span className="font-mono text-xs text-brand-pink font-semibold">{product.priceText || `${product.price} €`}</span>
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-purple/20 text-brand-purple border border-brand-purple/30 hover:bg-brand-purple hover:text-brand-bg transition-all cursor-pointer"
                  >
                    Sélectionner
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Call for WhatsApp integration */}
          <div className="bg-brand-bg/40 border border-brand-pink/10 rounded-2xl p-6 max-w-xl mx-auto mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-xs font-mono text-brand-purple uppercase tracking-wider block mb-1">Assistance par Mélanie & Christelle</span>
              <h5 className="font-serif text-lg font-semibold text-brand-cream">Valider ton profil sur WhatsApp ?</h5>
              <p className="text-xs text-brand-text-muted">Un message pré-rempli sera généré pour configurer tes senteurs et finitions.</p>
            </div>
            <button
              onClick={handleSendToWhatsApp}
              className="px-6 py-3 bg-brand-pink text-brand-bg font-bold text-sm rounded-full hover:bg-brand-pink-hover transition-colors flex items-center gap-2 shadow-lg shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4 fill-brand-bg text-brand-bg" />
              Discuter senteur
            </button>
          </div>

          <button
            onClick={() => {
              setAnswers({});
              setCurrentStep(0);
              setQuizFinished(false);
            }}
            className="text-xs text-brand-text-muted hover:text-brand-pink underline transition-colors cursor-pointer"
          >
            Recommencer le test
          </button>
        </motion.div>
      )}
    </div>
  );
}
