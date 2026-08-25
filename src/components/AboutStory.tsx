import React from 'react';
import { 
  Sparkles, 
  Award, 
  Flame, 
  ShieldCheck, 
  HeartHandshake, 
  Clock,
  Crown
} from 'lucide-react';
import { CHEF_PHILOSOPHY, RESTAURANT_INFO } from '../data/restaurantData';

interface AboutStoryProps {
  onOpenReservation: () => void;
}

export const AboutStory: React.FC<AboutStoryProps> = ({ onOpenReservation }) => {
  return (
    <section id="about" className="py-24 bg-[#0a0a0d] relative overflow-hidden text-[#e8e4db]">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial-glow opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1810] border border-[#d4af37]/40 text-[#f5e6a8] text-xs uppercase tracking-widest mb-3">
            <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Legacy of Culinary Royalty</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            The Soul of <span className="text-gold-gradient">Royal Spice</span>
          </h2>
          <p className="text-sm sm:text-base text-[#a09c91] font-light leading-relaxed">
            Born from an unwavering devotion to India’s imperial gastronomy and the finest world cuisines, where ancient culinary wisdom meets contemporary fine dining finesse.
          </p>
        </div>

        {/* Chef Profile & Philosophy Two-Column Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#121218] border border-[#d4af37]/25 rounded-3xl p-6 sm:p-12 shadow-2xl">
          
          {/* Chef Image Column with Luxury Borders */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4af37]/40 shadow-2xl group">
              <img
                src={CHEF_PHILOSOPHY.portrait}
                alt={CHEF_PHILOSOPHY.name}
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20" />
              
              {/* Bottom Badge inside Image */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-[#d4af37]/30">
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
                  {CHEF_PHILOSOPHY.title}
                </span>
                <h4 className="font-display text-lg font-bold text-white mt-0.5">
                  {CHEF_PHILOSOPHY.name}
                </h4>
                <span className="text-[11px] text-[#a09c91] flex items-center gap-1 mt-1">
                  <Award className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>{CHEF_PHILOSOPHY.experience}</span>
                </span>
              </div>
            </div>

            {/* Decorative Gold Accent Corner */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37] pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37] pointer-events-none" />
          </div>

          {/* Chef Story & Philosophy Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-2 border-[#d4af37] pl-4 italic text-[#f5e6a8] font-cormorant text-xl sm:text-2xl leading-relaxed">
              {CHEF_PHILOSOPHY.quote}
            </div>

            <p className="text-sm sm:text-base text-[#cfcac0] leading-relaxed">
              {CHEF_PHILOSOPHY.bio}
            </p>

            {/* Quality Pillars Checklist */}
            <div className="space-y-3 pt-2">
              <span className="text-xs uppercase tracking-wider text-[#d4af37] font-bold block">
                Our Royal Culinary Standards:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CHEF_PHILOSOPHY.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 bg-[#171722] p-3 rounded-xl border border-white/5">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[#b8b3a5] leading-snug">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                id="about-book-table-btn"
                onClick={onOpenReservation}
                className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#0b0b0e] bg-gold-gradient rounded-full shadow-lg shadow-[#d4af37]/20 hover:scale-105 transition-all"
              >
                Experience the Ambiance
              </button>
              <span className="text-xs text-[#8c887d]">
                Open for Lunch, High Tea & Dinner
              </span>
            </div>

          </div>

        </div>

        {/* 4 Feature Highlights Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: Flame,
              title: 'Authentic Clay Tandoors',
              desc: 'Smoked over live coals for that unmistakable earthen aroma and juicy tenderness.'
            },
            {
              icon: Sparkles,
              title: '21 Heirlooms Secret Spices',
              desc: 'Hand-roasted Awadhi masalas sourced from royal spice estates across India.'
            },
            {
              icon: Crown,
              title: 'Butler Dining Suites',
              desc: 'Tailored VIP suites with soundproofing and personalized sommelier service.'
            },
            {
              icon: ShieldCheck,
              title: '5-Star Hygiene Standards',
              desc: 'Open glass kitchen adhering to ISO 22000 hygiene and strict sanitization protocols.'
            }
          ].map((feat, i) => (
            <div
              key={feat.title}
              className="bg-[#13131b] border border-[#d4af37]/15 hover:border-[#d4af37]/50 rounded-2xl p-6 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#201d16] text-[#d4af37] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#d4af37] group-hover:text-black transition-all">
                <feat.icon className="w-6 h-6" />
              </div>
              <h4 className="font-display text-base font-bold text-white mb-2">
                {feat.title}
              </h4>
              <p className="text-xs text-[#8c887d] leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
