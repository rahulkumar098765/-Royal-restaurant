import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Flame, 
  Crown, 
  ShoppingBag, 
  Check, 
  Utensils, 
  Heart, 
  RefreshCw,
  Compass
} from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface RoyalSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export const RoyalSommelierModal: React.FC<RoyalSommelierModalProps> = ({
  isOpen,
  onClose,
  onAddToCart
}) => {
  if (!isOpen) return null;

  const [mood, setMood] = useState<'imperial' | 'comfort' | 'romantic' | 'protein' | 'dessert'>('imperial');
  const [diet, setDiet] = useState<'any' | 'veg' | 'non-veg'>('any');
  const [spice, setSpice] = useState<'mild' | 'medium' | 'spicy'>('medium');
  const [allAdded, setAllAdded] = useState(false);

  // Generate recommended 3 or 4 item royal pairing
  const recommendedPairing = React.useMemo(() => {
    let pool = MENU_ITEMS;

    if (diet === 'veg') pool = pool.filter(i => i.dietary === 'veg');
    if (diet === 'non-veg') pool = pool.filter(i => i.dietary === 'non-veg');

    let starter: MenuItem | undefined;
    let mainCourse: MenuItem | undefined;
    let breadOrRice: MenuItem | undefined;
    let dessertOrDrink: MenuItem | undefined;

    if (mood === 'imperial') {
      starter = pool.find(i => i.category === 'tandoor') || pool[0];
      mainCourse = pool.find(i => (i.category === 'indian' && (i.name.includes('Biryani') || i.name.includes('Shahi') || i.name.includes('Butter')))) || pool[1];
      breadOrRice = MENU_ITEMS.find(i => i.name.includes('Jeera Rice') || i.name.includes('Pulao')) || pool[2];
      dessertOrDrink = MENU_ITEMS.find(i => i.category === 'desserts' || i.category === 'beverages') || pool[3];
    } else if (mood === 'romantic') {
      starter = pool.find(i => i.category === 'pasta' || i.category === 'tandoor') || pool[0];
      mainCourse = pool.find(i => i.category === 'pizza' || i.name.includes('Paneer Tikka') || i.name.includes('Butter Chicken')) || pool[1];
      breadOrRice = pool.find(i => i.category === 'desserts' && i.name.includes('Lava')) || pool[2];
      dessertOrDrink = MENU_ITEMS.find(i => i.name.includes('Mojito') || i.name.includes('Shake')) || pool[3];
    } else if (mood === 'protein') {
      starter = pool.find(i => i.name.includes('Tikka') || i.name.includes('Salad')) || pool[0];
      mainCourse = pool.find(i => i.name.includes('Tandoori') || i.name.includes('Egg') || i.name.includes('Paneer Tikka')) || pool[1];
      breadOrRice = MENU_ITEMS.find(i => i.category === 'salads') || pool[2];
      dessertOrDrink = MENU_ITEMS.find(i => i.name.includes('Fresh Lime') || i.name.includes('Water')) || pool[3];
    } else if (mood === 'comfort') {
      starter = pool.find(i => i.category === 'fast-food' || i.name.includes('Chaat') || i.name.includes('Samosa')) || pool[0];
      mainCourse = pool.find(i => i.name.includes('Dal') || i.name.includes('Rajma') || i.name.includes('Chole')) || pool[1];
      breadOrRice = MENU_ITEMS.find(i => i.name.includes('Jeera Rice') || i.name.includes('Bhature')) || pool[2];
      dessertOrDrink = MENU_ITEMS.find(i => i.category === 'beverages' && i.name.includes('Lassi')) || pool[3];
    } else {
      starter = MENU_ITEMS.find(i => i.category === 'desserts') || pool[0];
      mainCourse = MENU_ITEMS.find(i => i.name.includes('Gulab') || i.name.includes('Brownie')) || pool[1];
      breadOrRice = MENU_ITEMS.find(i => i.name.includes('Shake')) || pool[2];
      dessertOrDrink = MENU_ITEMS.find(i => i.name.includes('Ice Cream')) || pool[3];
    }

    const items = [starter, mainCourse, breadOrRice, dessertOrDrink].filter(Boolean) as MenuItem[];
    // Remove duplicates
    return Array.from(new Set(items));
  }, [mood, diet, spice]);

  const totalPairingPrice = recommendedPairing.reduce((sum, item) => sum + item.price, 0);

  const handleAddAll = () => {
    recommendedPairing.forEach(item => onAddToCart(item, 1));
    setAllAdded(true);
    setTimeout(() => {
      setAllAdded(false);
      onClose();
    }, 1000);
  };

  return (
    <div 
      id="sommelier-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="sommelier-modal-content"
        className="w-full max-w-2xl bg-[#121218] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8c887d] hover:text-white rounded-full bg-black/40 border border-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-gold-gradient text-black flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
              AI Culinary Concierge
            </span>
            <h3 className="font-display text-2xl font-bold text-white">
              Royal Sommelier <span className="text-gold-gradient">Pairing Guide</span>
            </h3>
          </div>
        </div>

        {/* Form Selectors */}
        <div className="space-y-4 mb-6">
          {/* Mood */}
          <div>
            <label className="text-xs uppercase tracking-wider text-[#a09c91] font-semibold block mb-2">
              1. What is your dining mood today?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'imperial', label: 'Grand Imperial Feast 👑' },
                { id: 'romantic', label: 'Romantic Date Night 🌹' },
                { id: 'comfort', label: 'Desi Soul Food 🍛' },
                { id: 'protein', label: 'Fitness & High Protein 💪' },
                { id: 'dessert', label: 'Sweet Tooth Indulgence 🍨' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMood(m.id as any)}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left border transition-all ${
                    mood === m.id
                      ? 'bg-[#221d13] border-[#d4af37] text-white shadow-md'
                      : 'bg-[#181824] border-white/5 text-[#8c887d] hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Diet & Spice */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a09c91] font-semibold block mb-2">
                2. Dietary Preference
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'any', label: 'Any / All' },
                  { id: 'veg', label: 'Pure Veg 🟢' },
                  { id: 'non-veg', label: 'Non-Veg 🔴' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDiet(d.id as any)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      diet === d.id
                        ? 'bg-[#d4af37] text-black font-bold'
                        : 'bg-[#181824] border-white/5 text-[#8c887d]'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-[#a09c91] font-semibold block mb-2">
                3. Desired Spice Level
              </label>
              <div className="flex gap-2">
                {[
                  { id: 'mild', label: 'Mild' },
                  { id: 'medium', label: 'Medium 🌶️' },
                  { id: 'spicy', label: 'Fiery 🌶️🌶️' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSpice(s.id as any)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                      spice === s.id
                        ? 'bg-[#d4af37] text-black font-bold'
                        : 'bg-[#181824] border-white/5 text-[#8c887d]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Pairing Output Card */}
        <div className="bg-[#181824] border border-[#d4af37]/40 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs uppercase tracking-widest text-[#f5e6a8] font-bold">
                Chef's Handpicked Harmony ({recommendedPairing.length} Courses)
              </span>
            </div>
            <span className="text-sm font-bold text-gold-gradient font-display">
              Total: ₹{totalPairingPrice}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedPairing.map((item, idx) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#121219] border border-white/5"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-[#d4af37]/20"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-[#d4af37] uppercase tracking-wider block">
                    Course {idx + 1} • {item.categoryName}
                  </span>
                  <h4 className="text-xs font-bold text-white truncate">
                    {item.name}
                  </h4>
                  <span className="text-xs text-gold-gradient font-semibold">
                    ₹{item.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action to Add All to Cart */}
          <div className="pt-2">
            <button
              onClick={handleAddAll}
              disabled={allAdded}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient rounded-xl shadow-lg hover:scale-102 transition-all disabled:opacity-80"
            >
              {allAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>All Dishes Added to Your Order!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Complete Royal Pairing to Order (₹{totalPairingPrice})</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
