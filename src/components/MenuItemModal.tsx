import React, { useState } from 'react';
import { 
  X, 
  Flame, 
  Clock, 
  Zap, 
  ShoppingBag, 
  ShieldCheck, 
  Heart, 
  Share2, 
  Plus, 
  Minus,
  Sparkles,
  Check
} from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, instructions?: string) => void;
}

export const MenuItemModal: React.FC<MenuItemModalProps> = ({
  item,
  onClose,
  onAddToCart
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [instructions, setInstructions] = useState('');
  const [copied, setCopied] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(item, quantity, instructions);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${item.name} - Royal Spice Restaurant`,
        text: `Check out ${item.name} at Royal Spice Restaurant!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${item.name} at Royal Spice Restaurant: ₹${item.price}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      id="menu-item-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="menu-item-modal-content"
        className="relative w-full max-w-2xl bg-[#121217] border border-[#d4af37]/40 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-item-modal"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#e8e4db] bg-black/60 hover:bg-[#d4af37] hover:text-[#0b0b0e] rounded-full backdrop-blur-md transition-all"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#1c1c24]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121217] via-transparent to-black/40" />

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {/* Dietary Badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md ${
              item.dietary === 'veg' 
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40' 
                : item.dietary === 'egg'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/40'
                : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                item.dietary === 'veg' ? 'bg-emerald-400' : item.dietary === 'egg' ? 'bg-amber-400' : 'bg-rose-400'
              }`} />
              <span>{item.dietary === 'veg' ? 'Pure Vegetarian' : item.dietary === 'egg' ? 'Egg' : 'Non-Vegetarian'}</span>
            </span>

            {item.isChefSpecial && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#d4af37]/90 text-[#0b0b0e] shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Chef Special</span>
              </span>
            )}
          </div>

          <button
            onClick={handleShare}
            className="absolute bottom-4 right-4 p-2.5 bg-black/60 hover:bg-[#d4af37] text-white hover:text-black rounded-full backdrop-blur-md border border-white/10 transition-colors"
            title="Share Dish"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d4af37]/20 pb-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-medium block">
                {item.categoryName}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mt-0.5">
                {item.name}
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-2xl sm:text-3xl font-bold text-gold-gradient font-display">
                ₹{item.price}
              </span>
              <span className="text-xs text-[#a09c91] block">Taxes included</span>
            </div>
          </div>

          <p className="text-sm sm:text-base text-[#cfcac0] leading-relaxed">
            {item.description}
          </p>

          {/* Quick Metrics (Spice, Prep Time, Calories, Portion) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#191922] p-4 rounded-2xl border border-white/5">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#8c887d] uppercase tracking-wider">Spice Level</span>
              <div className="flex items-center gap-1 mt-1">
                {item.spiceLevel === 0 ? (
                  <span className="text-xs text-[#b8b3a5]">Mild / Non-Spicy</span>
                ) : (
                  Array.from({ length: item.spiceLevel }).map((_, i) => (
                    <Flame key={i} className="w-4 h-4 text-rose-500 fill-rose-500" />
                  ))
                )}
              </div>
            </div>

            {item.preparationTime && (
              <div className="flex flex-col">
                <span className="text-[11px] text-[#8c887d] uppercase tracking-wider">Prep Time</span>
                <div className="flex items-center gap-1 mt-1 text-xs text-white">
                  <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{item.preparationTime}</span>
                </div>
              </div>
            )}

            {item.calories && (
              <div className="flex flex-col">
                <span className="text-[11px] text-[#8c887d] uppercase tracking-wider">Energy</span>
                <div className="flex items-center gap-1 mt-1 text-xs text-white">
                  <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{item.calories} kcal</span>
                </div>
              </div>
            )}

            {item.portionSize && (
              <div className="flex flex-col">
                <span className="text-[11px] text-[#8c887d] uppercase tracking-wider">Serving</span>
                <span className="text-xs text-white mt-1">{item.portionSize}</span>
              </div>
            )}
          </div>

          {/* Ingredients List */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Key Ingredients & Spices</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="px-2.5 py-1 text-xs bg-[#20202b] text-[#d4af37] rounded-lg border border-white/5"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Customization & Cooking Notes */}
          <div>
            <label 
              htmlFor="special-instruction-input"
              className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-2"
            >
              Special Cooking Instructions (Optional)
            </label>
            <input
              id="special-instruction-input"
              type="text"
              placeholder="e.g. Less spicy, extra onions, no coriander, cutlery needed..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
            />
          </div>

          {/* Footer Quantity and Add Button */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#d4af37]/20">
            {/* Quantity Selector */}
            <div className="flex items-center bg-[#191924] border border-[#d4af37]/30 rounded-xl p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 text-[#d4af37] hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-white text-base">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 text-[#d4af37] hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              id="modal-add-to-cart-btn"
              onClick={handleAdd}
              disabled={addedNotice}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold tracking-wider uppercase text-[#0b0b0e] bg-gold-gradient rounded-xl shadow-xl shadow-[#d4af37]/20 hover:shadow-[#d4af37]/40 active:scale-98 transition-all disabled:opacity-80"
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order • ₹{item.price * quantity}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
