import React, { useState, useEffect } from 'react';
import { 
  UtensilsCrossed, 
  ShoppingBag, 
  Calendar, 
  Phone, 
  Menu as MenuIcon, 
  X, 
  QrCode, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenQrModal: () => void;
  onOpenSommelier: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservation,
  onOpenQrModal,
  onOpenSommelier
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Royal Menu', href: '#menu' },
    { label: 'Family Combos', href: '#combos' },
    { label: 'Chef & Story', href: '#about' },
    { label: 'Services & Facilities', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location & Contact', href: '#contact' },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl py-3.5' 
          : 'bg-[#050505]/60 backdrop-blur-sm border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Sleek Diamond Brand Logo */}
          <a 
            id="nav-logo"
            href="#home" 
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 border-2 border-[#D4AF37] rotate-45 flex items-center justify-center group-hover:scale-105 transition-transform bg-[#050505]">
              <span className="-rotate-45 text-xs font-bold text-[#D4AF37] font-serif">RS</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg lg:text-xl tracking-[0.2em] font-serif font-bold text-[#D4AF37] leading-tight">
                ROYAL SPICE
              </span>
              <span className="text-[8px] tracking-[0.4em] uppercase text-gray-400 font-medium">
                Fine Dining Experience
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className="text-[11px] uppercase tracking-[0.15em] text-gray-300 hover:text-[#D4AF37] font-medium transition-colors relative py-1 hover:border-b hover:border-[#D4AF37]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* AI Sommelier Button */}
            <button
              id="nav-sommelier-btn"
              onClick={onOpenSommelier}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium text-[#f5e6a8] bg-white/5 border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all group"
              title="Royal Culinary Concierge"
            >
              <Sparkles className="w-3 h-3 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span>AI Concierge</span>
            </button>

            {/* QR Menu Button */}
            <button
              id="nav-qr-btn"
              onClick={onOpenQrModal}
              className="p-2 text-[#D4AF37] bg-white/5 hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37]/50 transition-all"
              title="Scan Table QR Menu"
            >
              <QrCode className="w-4 h-4" />
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-[#e5e5e5] bg-white/5 hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37]/50 transition-all"
              title="View Cart / Order Online"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Sleek Reserve Table CTA */}
            <button
              id="nav-reserve-btn"
              onClick={onOpenReservation}
              className="px-5 py-2 border border-[#D4AF37] text-[#D4AF37] text-xs uppercase tracking-widest font-semibold hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              Book a Table
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              id="mobile-cart-btn"
              onClick={onOpenCart}
              className="relative p-2 text-[#f5e6a8] bg-[#14141a] border border-[#d4af37]/30 rounded-full"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#d4af37] text-[#0b0b0e] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#e8e4db] hover:text-[#d4af37] focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#0e0e13]/98 backdrop-blur-2xl border-b border-[#d4af37]/30 px-6 py-6 shadow-2xl transition-all animate-in slide-in-from-top-4 duration-300"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#d4af37]/15">
              <div className="text-xs text-[#a09c91] flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Open: 11:00 AM – 11:30 PM</span>
              </div>
              <a 
                href={RESTAURANT_INFO.phoneCallUrl}
                className="text-xs text-[#d4af37] flex items-center gap-1 font-medium"
              >
                <Phone className="w-3 h-3" />
                <span>Call Us</span>
              </a>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm uppercase tracking-widest text-[#e8e4db] hover:text-[#d4af37] py-1.5 transition-colors border-b border-white/5"
              >
                {link.label}
              </a>
            ))}

            <div className="grid grid-cols-2 gap-3 pt-3">
              <button
                id="mobile-drawer-reserve-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold uppercase text-[#0b0b0e] bg-gold-gradient rounded-xl shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Table</span>
              </button>

              <button
                id="mobile-drawer-concierge-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSommelier();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-[#f5e6a8] bg-[#1d1a14] border border-[#d4af37]/50 rounded-xl"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>AI Sommelier</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                id="mobile-drawer-qr-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQrModal();
                }}
                className="text-xs text-[#d4af37] hover:underline flex items-center gap-1.5"
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>Scan Digital Table QR</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
