import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  User, 
  Send, 
  CheckCircle2, 
  ChefHat,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EventInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceOrCombo?: string;
}

export const EventInquiryModal: React.FC<EventInquiryModalProps> = ({
  isOpen,
  onClose,
  initialServiceOrCombo
}) => {
  if (!isOpen) return null;

  const [eventType, setEventType] = useState(initialServiceOrCombo || 'Birthday Party');
  const [guestCount, setGuestCount] = useState('50 - 100 Guests');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cateringType, setCateringType] = useState('In-Restaurant Banquet');
  const [customNotes, setCustomNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    setIsSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#f5e6a8', '#ffffff']
      });
    } catch (e) {}
  };

  return (
    <div 
      id="event-inquiry-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="event-inquiry-content"
        className="w-full max-w-xl bg-[#121218] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8c887d] hover:text-white rounded-full bg-black/40 border border-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Inquiry Received
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                Thank You, {fullName}!
              </h3>
              <p className="text-xs text-[#a09c91] mt-2 max-w-md mx-auto leading-relaxed">
                Our Banquet & Catering Director has received your requirements for <strong>{eventType}</strong> ({guestCount}). We will contact you at <strong>{phone}</strong> within 2 hours with customized menu plans and royal tasting options.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="px-8 py-3 text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient rounded-xl shadow-lg"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1e1b13] border border-[#d4af37]/30 text-[#f5e6a8] text-[11px] uppercase tracking-widest mb-2">
                <ChefHat className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Bespoke Banquets & Outdoor Catering</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Plan Your <span className="text-gold-gradient">Celebration</span>
              </h3>
              <p className="text-xs text-[#a09c91] mt-0.5">
                From intimate 15-guest gatherings to grand 2,000-guest luxury wedding catering.
              </p>
            </div>

            {/* Event Type & Catering Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                  Occasion Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="Birthday Party Package">Birthday Party 🎂</option>
                  <option value="Anniversary Celebration">Anniversary Banquet 🌹</option>
                  <option value="Corporate / Office Event">Corporate Gala / Office Party 💼</option>
                  <option value="Wedding / Reception Catering">Grand Wedding / Sangeet 💍</option>
                  <option value="Family Gathering / Reunion">Family Gathering 👨‍👩‍👧‍👦</option>
                  <option value="Outdoor Live Tandoor Catering">Outdoor Catering & Live BBQ 🔥</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                  Setup Venue
                </label>
                <select
                  value={cateringType}
                  onChange={(e) => setCateringType(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="In-Restaurant Banquet Hall">In-Restaurant Banquet Hall</option>
                  <option value="Private VIP Dining Lounge">Private VIP Dining Lounge</option>
                  <option value="Outdoor Venue / Client Lawn">Outdoor Venue / Client Lawn</option>
                  <option value="Corporate Office Premises">Corporate Office Premises</option>
                </select>
              </div>
            </div>

            {/* Guests & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Expected Guests</span>
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                >
                  <option value="15 - 30 Guests">15 - 30 Guests</option>
                  <option value="30 - 50 Guests">30 - 50 Guests</option>
                  <option value="50 - 100 Guests">50 - 100 Guests</option>
                  <option value="100 - 250 Guests">100 - 250 Guests</option>
                  <option value="250 - 500 Guests">250 - 500 Guests</option>
                  <option value="500 - 1,500+ Guests">500 - 1,500+ Guests</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Tentative Date</span>
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Contact Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikramaditya Roy"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Phone / WhatsApp *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Custom Notes */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                Special Menu or Theme Preferences
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Live tandoor counter, Awadhi biryani focus, floral entrance decor..."
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-black bg-gold-gradient rounded-xl shadow-xl shadow-[#d4af37]/25 hover:scale-102 active:scale-98 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Send Event Request to Banquet Team</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
