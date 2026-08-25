import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Phone, 
  MessageCircle, 
  Compass, 
  ArrowUp,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FloatingActionsProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenSommelier: () => void;
  onOpenReservation: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenSommelier,
  onOpenReservation
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      
      {/* Back to Top */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-3 rounded-full bg-[#050505] hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-white/10 hover:border-[#D4AF37] shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* AI Sommelier Button */}
      <button
        id="floating-sommelier-btn"
        onClick={onOpenSommelier}
        className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 bg-black/80 hover:bg-black text-[#f5e6a8] border border-[#D4AF37]/50 hover:border-[#D4AF37] shadow-xl backdrop-blur-md hover:scale-105 transition-all group"
        title="AI Royal Sommelier Pairing"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
        <span className="text-[11px] font-bold tracking-widest uppercase">
          AI Sommelier
        </span>
      </button>

      {/* WhatsApp Sleek Button */}
      <a
        id="floating-whatsapp-btn"
        href={`https://wa.me/${whatsappNumber}?text=Hello%20Royal%20Spice%20Restaurant%2C%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation%20%2F%20menu.`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg cursor-pointer transform hover:scale-110 transition-transform"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.185-.573c.948.517 2.033.811 3.141.812 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.763-5.766zm3.375 8.203c-.144.405-.833.748-1.144.795-.285.043-.656.063-1.037-.062-.232-.077-.522-.175-.966-.369-1.891-.83-3.115-2.783-3.21-2.908-.094-.125-.769-.993-.769-1.914 0-.92.481-1.371.652-1.558.172-.187.375-.234.5-.234h.359c.115 0 .261.002.391.292.144.331.481 1.201.527 1.292.047.091.078.197.016.321-.063.125-.094.203-.188.312-.094.109-.197.243-.282.328-.094.093-.193.194-.083.38.11.187.487.804 1.044 1.298.718.639 1.32.837 1.508.93.188.093.297.078.406-.047.11-.125.469-.546.594-.733.125-.187.25-.156.422-.094.172.062 1.094.515 1.281.609s.312.141.359.219c.047.078.047.452-.097.857z"/>
        </svg>
      </a>

      {/* Floating Cart Pill (when items exist) */}
      {cartCount > 0 && (
        <button
          id="floating-cart-btn"
          onClick={onOpenCart}
          className="pointer-events-auto flex items-center gap-3 px-5 py-3 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-98 transition-all"
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-black text-[#D4AF37] text-[10px] flex items-center justify-center font-bold">
              {cartCount}
            </span>
          </div>
          <span>View Order • ₹{cartTotal}</span>
        </button>
      )}

    </div>
  );
};
