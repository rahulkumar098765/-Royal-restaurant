import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { FamilyCombosSection } from './components/FamilyCombosSection';
import { AboutStory } from './components/AboutStory';
import { ServicesFacilitiesSection } from './components/ServicesFacilitiesSection';
import { AmbienceGallery } from './components/AmbienceGallery';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { Footer } from './components/Footer';
import { ReservationModal } from './components/ReservationModal';
import { CartDrawer } from './components/CartDrawer';
import { DigitalQrModal } from './components/DigitalQrModal';
import { RoyalSommelierModal } from './components/RoyalSommelierModal';
import { EventInquiryModal } from './components/EventInquiryModal';
import { FloatingActions } from './components/FloatingActions';
import { CartItem, MenuItem } from './types';

export function App() {
  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Modals Visibility
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [isEventInquiryOpen, setIsEventInquiryOpen] = useState(false);
  const [inquiryInitialPackage, setInquiryInitialPackage] = useState<string | undefined>(undefined);

  // Cart operations
  const handleAddToCart = (item: MenuItem, quantity: number = 1, instructions?: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.menuItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
          specialInstructions: instructions || updated[existingIndex].specialInstructions
        };
        return updated;
      }
      return [
        ...prev,
        {
          menuItem: item,
          quantity,
          specialInstructions: instructions
        }
      ];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.menuItem.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.menuItem.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Cart quick dictionary { [itemId]: quantity }
  const cartItemIds = useMemo(() => {
    const map: Record<string, number> = {};
    cartItems.forEach((ci) => {
      map[ci.menuItem.id] = ci.quantity;
    });
    return map;
  }, [cartItems]);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + i.quantity, 0);
  }, [cartItems]);

  const totalCartValue = useMemo(() => {
    return cartItems.reduce((sum, i) => sum + i.menuItem.price * i.quantity, 0);
  }, [cartItems]);

  const handleOpenEventInquiry = (packageName?: string) => {
    setInquiryInitialPackage(packageName);
    setIsEventInquiryOpen(true);
  };

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#e8e4db] font-sans selection:bg-[#d4af37] selection:text-black">
      
      {/* 1. Header & Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
      />

      <main>
        {/* 2. Hero Carousel & Quick Action Section */}
        <Hero
          onOpenReservation={() => setIsReservationOpen(true)}
          onExploreMenu={() => handleScrollToSection('menu')}
          onOpenSommelier={() => setIsSommelierOpen(true)}
          onOpenQrModal={() => setIsQrModalOpen(true)}
        />

        {/* 3. Masterpiece Royal Menu Section */}
        <MenuSection
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
        />

        {/* 4. Family Combos & Banquets Section */}
        <FamilyCombosSection
          onAddToCart={handleAddToCart}
          onOpenEventInquiry={handleOpenEventInquiry}
        />

        {/* 5. About Story & Master Chef Ranveer Kapoor Section */}
        <AboutStory
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* 6. Royal Services & 5-Star Facilities Section */}
        <ServicesFacilitiesSection
          onOpenReservation={() => setIsReservationOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenEventInquiry={handleOpenEventInquiry}
          onOpenQrModal={() => setIsQrModalOpen(true)}
        />

        {/* 7. Ambience & Fine Dining Gallery with Lightbox */}
        <AmbienceGallery />

        {/* 8. Patron Testimonials & Reviews Breakdown */}
        <TestimonialsSection />

        {/* 9. Location, Heritage Map & Contact Section */}
        <ContactLocationSection />
      </main>

      {/* 10. Comprehensive Luxury Footer */}
      <Footer
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenMenu={() => handleScrollToSection('menu')}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
      />

      {/* Floating Action Buttons (WhatsApp, AI Sommelier, Cart, Back to Top) */}
      <FloatingActions
        cartCount={totalCartCount}
        cartTotal={totalCartValue}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSommelier={() => setIsSommelierOpen(true)}
        onOpenReservation={() => setIsReservationOpen(true)}
      />

      {/* Modals and Drawers */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <DigitalQrModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        onOpenMenu={() => handleScrollToSection('menu')}
      />

      <RoyalSommelierModal
        isOpen={isSommelierOpen}
        onClose={() => setIsSommelierOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <EventInquiryModal
        isOpen={isEventInquiryOpen}
        onClose={() => setIsEventInquiryOpen(false)}
        initialServiceOrCombo={inquiryInitialPackage}
      />

    </div>
  );
}

export default App;
