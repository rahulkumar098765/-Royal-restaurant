import React, { useState } from 'react';
import { 
  Utensils, 
  Smartphone, 
  Truck, 
  ShoppingBag, 
  CalendarCheck, 
  Gift, 
  Heart, 
  Briefcase, 
  ChefHat, 
  Flame, 
  Crown, 
  Music, 
  Wifi, 
  Accessibility, 
  Car, 
  Wind, 
  Users, 
  ShieldCheck, 
  Smile, 
  CheckCircle2, 
  Tablet, 
  QrCode, 
  CreditCard, 
  Eye, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FACILITIES_LIST, SERVICES_LIST } from '../data/restaurantData';

interface ServicesFacilitiesSectionProps {
  onOpenReservation: () => void;
  onOpenCart: () => void;
  onOpenEventInquiry: (serviceName?: string) => void;
  onOpenQrModal: () => void;
}

export const ServicesFacilitiesSection: React.FC<ServicesFacilitiesSectionProps> = ({
  onOpenReservation,
  onOpenCart,
  onOpenEventInquiry,
  onOpenQrModal
}) => {
  const [activeTab, setActiveTab] = useState<'services' | 'facilities'>('services');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'CalendarCheck': return <CalendarCheck className="w-5 h-5" />;
      case 'Gift': return <Gift className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'ChefHat': return <ChefHat className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Crown': return <Crown className="w-5 h-5" />;
      case 'Music': return <Music className="w-5 h-5" />;
      case 'Wifi': return <Wifi className="w-5 h-5" />;
      case 'Accessibility': return <Accessibility className="w-5 h-5" />;
      case 'Car': return <Car className="w-5 h-5" />;
      case 'Wind': return <Wind className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      case 'Tablet': return <Tablet className="w-5 h-5" />;
      case 'QrCode': return <QrCode className="w-5 h-5" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5" />;
      case 'Eye': return <Eye className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  const handleServiceClick = (serviceId: string, name: string) => {
    if (serviceId === 'srv-1' || serviceId === 'srv-5' || serviceId === 'srv-11') {
      onOpenReservation();
    } else if (serviceId === 'srv-2' || serviceId === 'srv-3' || serviceId === 'srv-4') {
      onOpenCart();
    } else if (serviceId === 'srv-6' || serviceId === 'srv-7' || serviceId === 'srv-8' || serviceId === 'srv-9' || serviceId === 'srv-10') {
      onOpenEventInquiry(name);
    } else {
      onOpenReservation();
    }
  };

  const handleFacilityClick = (facId: string) => {
    if (facId === 'fac-7' || facId === 'fac-6') {
      onOpenQrModal();
    } else if (facId === 'fac-3' || facId === 'fac-1' || facId === 'fac-2') {
      onOpenReservation();
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0c0c11] relative text-[#e8e4db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1b1710] border border-[#d4af37]/40 text-[#f5e6a8] text-xs uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>World-Class Hospitality</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Services & <span className="text-gold-gradient">5-Star Facilities</span>
          </h2>
          <p className="text-sm sm:text-base text-[#a09c91] font-light leading-relaxed">
            Every convenience designed for your supreme dining delight, from high-speed digital menus and private dining suites to outdoor live tandoor catering and secure valet parking.
          </p>

          {/* Toggle Tabs */}
          <div className="inline-flex p-1.5 bg-[#171722] border border-[#d4af37]/30 rounded-2xl mt-8">
            <button
              onClick={() => setActiveTab('services')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === 'services'
                  ? 'bg-gold-gradient text-black shadow-lg shadow-[#d4af37]/20'
                  : 'text-[#8c887d] hover:text-white'
              }`}
            >
              Royal Services ({SERVICES_LIST.length})
            </button>
            <button
              onClick={() => setActiveTab('facilities')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === 'facilities'
                  ? 'bg-gold-gradient text-black shadow-lg shadow-[#d4af37]/20'
                  : 'text-[#8c887d] hover:text-white'
              }`}
            >
              Luxury Facilities ({FACILITIES_LIST.length})
            </button>
          </div>
        </div>

        {/* TAB 1: SERVICES GRID */}
        {activeTab === 'services' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {SERVICES_LIST.map((srv) => (
              <div
                key={srv.id}
                id={`service-card-${srv.id}`}
                onClick={() => handleServiceClick(srv.id, srv.name)}
                className="bg-[#14141d] border border-[#d4af37]/20 hover:border-[#d4af37]/70 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-[#d4af37]/10 hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#201c14] border border-[#d4af37]/30 text-[#d4af37] flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-black transition-colors">
                      {getServiceIcon(srv.iconName)}
                    </div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#d4af37]/80 group-hover:text-[#f5e6a8] flex items-center gap-1">
                      <span>{srv.actionLabel || 'Explore'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>

                  <h4 className="font-display text-lg font-bold text-white group-hover:text-[#f5e6a8] transition-colors mb-2">
                    {srv.name}
                  </h4>
                  <p className="text-xs text-[#a09c91] leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#6e6a60]">
                  <span>Royal Standard</span>
                  <span className="text-emerald-400">Available</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: FACILITIES GRID */}
        {activeTab === 'facilities' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {FACILITIES_LIST.map((fac) => (
              <div
                key={fac.id}
                id={`facility-card-${fac.id}`}
                onClick={() => handleFacilityClick(fac.id)}
                className="bg-[#14141d] border border-[#d4af37]/20 hover:border-[#d4af37]/70 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-[#d4af37]/10 hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1e1c28] border border-[#d4af37]/30 text-[#f5e6a8] flex items-center justify-center group-hover:bg-gold-gradient group-hover:text-black transition-colors">
                      {getServiceIcon(fac.iconName)}
                    </div>
                    {fac.badge && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#d4af37]/15 text-[#f5e6a8] border border-[#d4af37]/30">
                        {fac.badge}
                      </span>
                    )}
                  </div>

                  <h4 className="font-display text-lg font-bold text-white group-hover:text-[#f5e6a8] transition-colors mb-2">
                    {fac.name}
                  </h4>
                  <p className="text-xs text-[#a09c91] leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-[#6e6a60]">
                  <span>On-Site Amenity</span>
                  <span className="text-emerald-400">Active Daily</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
