import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation, 
  Send, 
  CheckCircle2, 
  MessageCircle,
  Car,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const ContactLocationSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0e] relative text-[#e8e4db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c1810] border border-[#d4af37]/40 text-[#f5e6a8] text-xs uppercase tracking-widest mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Visit Us or Connect</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Location & <span className="text-gold-gradient">Reservations Desk</span>
          </h2>
          <p className="text-sm sm:text-base text-[#a09c91] font-light leading-relaxed">
            Located in the prestigious heart of Connaught Estate with complimentary valet parking and dedicated VIP dining suites.
          </p>
        </div>

        {/* 2-Column Layout: Details & Map vs Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Address Card */}
              <div className="bg-[#14141d] border border-[#d4af37]/20 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <MapPin className="w-5 h-5" />
                  <h4 className="font-display text-sm font-bold text-white">Our Heritage Address</h4>
                </div>
                <p className="text-xs text-[#cfcac0] leading-relaxed">
                  {RESTAURANT_INFO.address}
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-[#f5e6a8] hover:underline font-semibold pt-1"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Get Driving Directions</span>
                </a>
              </div>

              {/* Timing Card */}
              <div className="bg-[#14141d] border border-[#d4af37]/20 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Clock className="w-5 h-5" />
                  <h4 className="font-display text-sm font-bold text-white">Dining Hours</h4>
                </div>
                <p className="text-xs text-[#cfcac0] leading-relaxed">
                  {RESTAURANT_INFO.openingHours}
                </p>
                <span className="text-[10px] text-emerald-400 font-semibold block pt-1">
                  ● Kitchen open for Lunch & Dinner daily
                </span>
              </div>

              {/* Phone & WhatsApp Card */}
              <div className="bg-[#14141d] border border-[#d4af37]/20 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Phone className="w-5 h-5" />
                  <h4 className="font-display text-sm font-bold text-white">Direct Hotline</h4>
                </div>
                <p className="text-xs text-[#cfcac0]">
                  Phone: <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-white hover:text-[#d4af37] font-semibold">{RESTAURANT_INFO.phone}</a>
                </p>
                <p className="text-xs text-[#cfcac0]">
                  WhatsApp: <a href={`https://wa.me/${RESTAURANT_INFO.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">{RESTAURANT_INFO.whatsapp}</a>
                </p>
              </div>

              {/* Valet & Parking */}
              <div className="bg-[#14141d] border border-[#d4af37]/20 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Car className="w-5 h-5" />
                  <h4 className="font-display text-sm font-bold text-white">Valet & Amenities</h4>
                </div>
                <p className="text-xs text-[#cfcac0] leading-relaxed">
                  {RESTAURANT_INFO.parking}
                </p>
                <span className="text-[10px] text-[#8c887d] block pt-1">
                  Wheelchair ramp & elevator access available
                </span>
              </div>

            </div>

            {/* Interactive Map Embed Mockup with Live Frame */}
            <div className="relative h-64 sm:h-72 rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl bg-[#161622] group">
              <iframe
                title="Royal Spice Restaurant Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.114885834887!2d77.2159562!3d28.6324294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b0450897%3A0x69d3f56e9c60e32!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0 grayscale invert opacity-75 group-hover:opacity-95 transition-opacity"
                loading="lazy"
                allowFullScreen
              />
              
              {/* Map Floating Card */}
              <div className="absolute bottom-4 left-4 p-3 bg-black/80 backdrop-blur-md rounded-xl border border-[#d4af37]/40 text-left pointer-events-none">
                <span className="font-display text-xs font-bold text-gold-gradient block">
                  Royal Spice Restaurant
                </span>
                <span className="text-[10px] text-[#cfcac0] block">
                  108 Heritage Boulevard, Connaught Estate
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Inquiry Message Form */}
          <div className="lg:col-span-5 bg-[#14141d] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-display text-xl font-bold text-white">Message Delivered</h4>
                <p className="text-xs text-[#a09c91] max-w-xs mx-auto">
                  Thank you, {formData.name}. Our guest relations concierge will get back to your inquiry shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Send a <span className="text-gold-gradient">Direct Inquiry</span>
                  </h3>
                  <p className="text-xs text-[#a09c91] mt-1">
                    For feedback, custom chef menu requests, or corporate affiliations.
                  </p>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="General Inquiry">General Dining Inquiry</option>
                    <option value="Chef Tasting Request">Private Chef's Table Request</option>
                    <option value="Bespoke Banquet Catering">Bespoke Banquet Catering</option>
                    <option value="Corporate Tie-up">Corporate Partnership</option>
                    <option value="Patron Feedback">Patron Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How may we assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gold-gradient rounded-xl shadow-xl shadow-[#d4af37]/20 hover:scale-102 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
