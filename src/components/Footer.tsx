import React from 'react';
import { 
  Crown, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube, 
  Award, 
  ShieldCheck,
  ArrowUp
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenMenu: () => void;
  onOpenQrModal: () => void;
  onOpenSommelier: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenReservation,
  onOpenMenu,
  onOpenQrModal,
  onOpenSommelier
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-[#e5e5e5] pt-16 pb-12 relative overflow-hidden">
      
      {/* Top Banner Newsletter Hook with Sleek Glass Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 hover:border-[#D4AF37]/40 transition-all">
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold flex items-center justify-center lg:justify-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              <span>Privileges Club</span>
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              Join the Royal Spice Connoisseurs
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Subscribe for invitations to seasonal chef tasting menus, complimentary dessert vouchers on birthdays, and exclusive VIP banquet privileges.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-5 py-3.5 bg-black/50 border border-white/15 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-[#D4AF37] min-w-[260px]"
            />
            <button
              onClick={() => alert('Thank you for subscribing to the Royal Spice Connoisseurs Club!')}
              className="px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-[#e8c453] transition-all whitespace-nowrap shadow-lg"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        
        {/* Column 1: Brand & Philosophy */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center bg-[#050505]">
              <span className="-rotate-45 text-[11px] font-bold text-[#D4AF37] font-serif">RS</span>
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-[0.2em] text-[#D4AF37] block">
                ROYAL SPICE
              </span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-gray-400 block font-medium">
                Fine Dining Experience
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed">
            {RESTAURANT_INFO.tagline}. An imperial sanctuary of authentic Awadhi royal recipes, clay-oven tandoor craft, and modern continental culinary luxury.
          </p>

          {/* Social Badges in Sleek Circular Pill Style */}
          <div className="flex items-center gap-2.5 pt-2">
            {[
              { label: 'IG', href: '#' },
              { label: 'FB', href: '#' },
              { label: 'TW', href: '#' },
              { label: 'YT', href: '#' },
            ].map((soc, i) => (
              <a
                key={i}
                href={soc.href}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-gray-300 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                aria-label={`Social ${soc.label}`}
              >
                {soc.label}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Quick Explorations
          </h4>
          <ul className="space-y-2 text-xs text-gray-300">
            <li>
              <a href="#menu" onClick={onOpenMenu} className="hover:text-[#D4AF37] transition-colors">
                Royal Gastronomy Menu
              </a>
            </li>
            <li>
              <button onClick={onOpenReservation} className="hover:text-[#D4AF37] transition-colors text-left">
                Table Reservation & VIP Lounge
              </button>
            </li>
            <li>
              <a href="#combos" className="hover:text-[#D4AF37] transition-colors">
                Family Packs & Party Packages
              </a>
            </li>
            <li>
              <button onClick={onOpenSommelier} className="hover:text-[#D4AF37] transition-colors text-left flex items-center gap-1.5">
                <span>AI Royal Sommelier Pairing</span>
                <span className="text-[9px] border border-[#D4AF37]/40 text-[#f5e6a8] px-1.5 py-0.2 font-bold">AI</span>
              </button>
            </li>
            <li>
              <button onClick={onOpenQrModal} className="hover:text-[#D4AF37] transition-colors text-left">
                Contactless Digital QR Menu
              </button>
            </li>
            <li>
              <a href="#gallery" className="hover:text-[#D4AF37] transition-colors">
                Ambience & Dining Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Cuisines Served */}
        <div className="space-y-3">
          <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Our Cuisines
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {RESTAURANT_INFO.cuisines.map((c) => (
              <span
                key={c}
                className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-white/5 text-gray-300 border border-white/10"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="pt-2">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold block mb-1">
              Certifications & Hygiene:
            </span>
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>FSSAI Certified 10019011005824</span>
            </div>
          </div>
        </div>

        {/* Column 4: Contact & Hours */}
        <div className="space-y-3">
          <h4 className="font-serif text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Visit Royal Spice
          </h4>
          <div className="space-y-2 text-xs text-gray-400">
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Location</span>
              <span className="text-gray-300">{RESTAURANT_INFO.address}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Contact</span>
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-gray-300 hover:text-[#D4AF37] transition-colors">{RESTAURANT_INFO.phone}</a>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-0.5">Opening Hours</span>
              <span className="text-gray-300">{RESTAURANT_INFO.openingHours}</span>
            </div>
            <p className="text-[11px] text-emerald-400 font-semibold pt-1">
              ● Dine-in, Takeaway & Delivery 7 Days a Week
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Back to Top in Sleek Backdrop Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
        <p className="tracking-wide">
          © {new Date().getFullYear()} Royal Spice. All Rights Reserved. Fine Dining Experience.
        </p>

        <div className="flex items-center gap-6">
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          <span className="text-white/10">•</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="text-white/10">•</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#D4AF37] hover:underline font-semibold uppercase tracking-wider text-[11px]"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>

    </footer>
  );
};
