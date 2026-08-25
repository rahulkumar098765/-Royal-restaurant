import React from 'react';
import { 
  Users, 
  Sparkles, 
  Gift, 
  Heart, 
  Briefcase, 
  Smile, 
  ShoppingBag, 
  Check, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { MenuItem } from '../types';
import { MENU_ITEMS } from '../data/menuData';

interface FamilyCombosSectionProps {
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onOpenEventInquiry: (comboTitle?: string) => void;
}

export const FamilyCombosSection: React.FC<FamilyCombosSectionProps> = ({
  onAddToCart,
  onOpenEventInquiry
}) => {
  const combos = MENU_ITEMS.filter((item) => item.category === 'combos');

  const getPackageIcon = (name: string) => {
    if (name.includes('Couple')) return <Heart className="w-5 h-5 text-rose-400" />;
    if (name.includes('Family')) return <Users className="w-5 h-5 text-[#d4af37]" />;
    if (name.includes('Kids')) return <Smile className="w-5 h-5 text-amber-400" />;
    if (name.includes('Birthday')) return <Gift className="w-5 h-5 text-purple-400" />;
    if (name.includes('Anniversary')) return <Heart className="w-5 h-5 text-rose-500" />;
    if (name.includes('Office')) return <Briefcase className="w-5 h-5 text-blue-400" />;
    return <Sparkles className="w-5 h-5 text-[#d4af37]" />;
  };

  return (
    <section id="combos" className="py-20 bg-[#09090c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1912] border border-[#d4af37]/40 text-[#f5e6a8] text-xs uppercase tracking-widest mb-3">
            <Users className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Royal Banquets & Feasts</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Family Combos & <span className="text-gold-gradient">Special Packages</span>
          </h2>
          <p className="text-sm sm:text-base text-[#a8a397] font-light leading-relaxed">
            Thoughtfully curated feast bundles designed for intimate date nights, vibrant family gatherings, milestone birthdays, and executive office parties with generous savings.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => (
            <div
              key={combo.id}
              id={`combo-card-${combo.id}`}
              className="bg-[#121218] border border-[#d4af37]/25 hover:border-[#d4af37]/70 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#d4af37]/15 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top Banner Image */}
              <div className="relative h-52 w-full overflow-hidden bg-[#1a1a24]">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/40" />

                {/* Price & Portion Tag */}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#d4af37]/40 text-right">
                  <span className="text-lg font-bold text-gold-gradient font-display">
                    ₹{combo.price}
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white">
                    {getPackageIcon(combo.name)}
                  </span>
                  <span className="text-xs font-semibold text-[#f5e6a8] bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">
                    {combo.portionSize}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[#f5e6a8] transition-colors mb-2">
                    {combo.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b0aba0] leading-relaxed mb-4">
                    {combo.description}
                  </p>

                  {/* Highlights checklist */}
                  {combo.ingredients && combo.ingredients.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#d4af37] block mb-2">
                        Package Inclusions:
                      </span>
                      {combo.ingredients.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#cfcac0]">
                          <Check className="w-3.5 h-3.5 text-[#d4af37] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                  <button
                    id={`combo-add-btn-${combo.id}`}
                    onClick={() => onAddToCart(combo, 1)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#0b0b0e] bg-gold-gradient rounded-xl shadow-lg hover:scale-102 active:scale-98 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Order Combo</span>
                  </button>

                  <button
                    id={`combo-inquire-btn-${combo.id}`}
                    onClick={() => onOpenEventInquiry(combo.name)}
                    className="px-3 py-3 text-xs font-medium text-[#d4af37] hover:text-white bg-[#1a1a24] hover:bg-[#252535] border border-[#d4af37]/30 rounded-xl transition-colors"
                    title="Customize this package"
                  >
                    <span>Custom</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Custom Event Banner */}
        <div className="mt-12 bg-gradient-to-r from-[#17140f] via-[#1f1b13] to-[#17140f] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Royal Hospitality</span>
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              Planning a Grand Wedding or Corporate Banquet?
            </h3>
            <p className="text-xs sm:text-sm text-[#b8b3a5] max-w-2xl">
              We cater bespoke luxury feasts for 20 to 2,000 guests with live tandoor stations, mocktail bars, personalized menus, and full butler service.
            </p>
          </div>

          <button
            id="open-event-inquiry-btn"
            onClick={() => onOpenEventInquiry()}
            className="whitespace-nowrap flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0b0b0e] bg-gold-gradient rounded-full shadow-xl shadow-[#d4af37]/20 hover:scale-105 transition-all"
          >
            <span>Inquire for Catering / Party</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
