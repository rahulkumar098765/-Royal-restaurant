import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  ShoppingBag, 
  ChevronRight, 
  Clock, 
  ShieldCheck,
  Flame,
  Utensils
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
  onOpenSommelier?: () => void;
  onOpenQrModal?: () => void;
}

const HERO_BACKGROUNDS = [
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1920&q=80'
];

export const Hero: React.FC<HeroProps> = ({
  onOpenReservation,
  onExploreMenu,
  onOpenSommelier,
  onOpenQrModal
}) => {
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const featureCards = [
    {
      num: '01.',
      title: 'Tandoor Specials',
      desc: 'Afghani Chicken, Paneer Tikka, and Haryali Delights char-grilled to perfection.',
      tag: 'Clay-Oven Craft'
    },
    {
      num: '02.',
      title: 'Royal Biryani',
      desc: 'Fragrant saffron rice and authentic slow-claypot Awadhi Mutton & Chicken Dum Biryani.',
      tag: 'Awadhi Heritage'
    },
    {
      num: '03.',
      title: 'Artisan Pizzas & Pasta',
      desc: 'Stone-baked Farmhouse pies, BBQ Chicken Supreme, and creamy hand-tossed Fettuccine.',
      tag: 'Wood-Fired'
    },
    {
      num: '04.',
      title: 'Dessert Lounge',
      desc: 'Classic Venetian Tiramisu, warm saffron Gulab Jamun, and artisanal Sizzling Brownies.',
      tag: 'Sweet Indulgence'
    }
  ];

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#050505]"
    >
      {/* Background Image Carousel with Sleek Dark Overlays */}
      {HERO_BACKGROUNDS.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === bgIndex ? 'opacity-25 scale-105 transition-transform duration-[6000ms]' : 'opacity-0 scale-100'
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Sleek Radial Gradient Overlays */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(26,26,26,0.8) 0%, rgba(5,5,5,0.95) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 py-6">
          
          {/* Left Column: Sleek Hero Content */}
          <div className="w-full lg:w-5/12 text-left">
            <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-semibold mb-4 block animate-fade-in flex items-center gap-2">
              <span className="w-2 h-[1px] bg-[#D4AF37]" />
              <span>Exquisite Flavors</span>
              <span className="w-2 h-[1px] bg-[#D4AF37]" />
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.08] mb-6 tracking-tight">
              Where Every <br />
              <span className="italic text-[#D4AF37] font-normal">Bite</span> Becomes <br />
              a Memory.
            </h1>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 pr-0 lg:pr-6 max-w-xl">
              Experience the royalty of Indian and Continental cuisine in an atmosphere of refined elegance. From our signature Tandoor specials to artisanal Italian creations.
            </p>

            {/* Cuisine Badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['North Indian', 'Awadhi Biryani', 'Tandoori', 'Artisanal Pizza', 'Continental'].map((c) => (
                <span 
                  key={c}
                  className="px-2.5 py-1 text-[10px] uppercase tracking-widest text-gray-300 bg-white/5 border border-white/10"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Action Buttons in Sleek Style */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="bg-[#D4AF37] text-black px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#e8c453] hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                Explore Menu
              </button>

              <button
                id="hero-reserve-btn"
                onClick={onOpenReservation}
                className="bg-white/5 border border-white/10 px-7 py-3.5 text-xs font-bold uppercase tracking-widest text-white hover:bg-white/10 hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all"
              >
                Book a Table
              </button>

              {onOpenSommelier && (
                <button
                  id="hero-sommelier-btn"
                  onClick={onOpenSommelier}
                  className="px-4 py-3.5 text-xs uppercase tracking-wider text-[#f5e6a8] hover:text-[#D4AF37] flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>AI Sommelier</span>
                </button>
              )}
            </div>

            {/* Micro Live Indicator */}
            <div className="mt-8 flex items-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-gray-300 font-medium">Open Daily: 11:00 AM – 11:30 PM</span>
              </div>
              <span className="text-white/20">•</span>
              <span>Free Valet Parking</span>
            </div>

          </div>

          {/* Right Column: Sleek 4 Bento Cards Showcase */}
          <div className="w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {featureCards.map((card, i) => (
              <div
                key={card.num}
                className={`bg-white/5 backdrop-blur-xl border border-white/10 p-6 flex flex-col justify-between group hover:border-[#D4AF37]/60 hover:bg-white/[0.08] transition-all duration-300 ${
                  i === 1 ? 'sm:mt-6' : i === 2 ? 'sm:-mt-6' : ''
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[#D4AF37] text-2xl font-serif font-bold">
                    {card.num}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-medium px-2 py-0.5 border border-white/10">
                    {card.tag}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-serif mb-2 uppercase tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* 4 Stats Grid in Sleek Minimalist Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10">
          {RESTAURANT_INFO.stats.map((stat) => (
            <div 
              key={stat.label}
              className="p-4 border-l border-[#D4AF37]/30 bg-white/[0.02]"
            >
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4AF37] mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-[11px] text-gray-400 uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom subtle divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
    </section>
  );
};

