import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  Crown, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  Share2, 
  Phone, 
  Mail, 
  User, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ConfirmedReservation, DiningArea, ReservationRequest } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DINING_AREAS: { id: DiningArea; label: string; desc: string; icon: string }[] = [
  { id: 'Royal VIP Lounge', label: 'Royal VIP Lounge', desc: 'Private gold-trimmed suite with butler service', icon: 'Crown' },
  { id: 'Private Candlelight Booth', label: 'Candlelight Booth', desc: 'Intimate setting with soft romantic lighting', icon: 'Heart' },
  { id: 'Family Dining Hall', label: 'Family Dining Hall', desc: 'Spacious cushioned booths for family groups', icon: 'Users' },
  { id: 'Garden Terrace', label: 'Garden Terrace', desc: 'Open-air starlit dining with city views', icon: 'Sparkles' },
  { id: 'Main AC Banquet', label: 'Main Banquet Hall', desc: 'Grand royal ambience with live ghazals', icon: 'ShieldCheck' }
];

const TIME_SLOTS = [
  '11:30 AM', '12:30 PM', '01:30 PM', '02:30 PM', 
  '04:30 PM', '06:00 PM', '07:30 PM', '08:30 PM', 
  '09:30 PM', '10:30 PM'
];

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  // Form State
  const [formData, setFormData] = useState<ReservationRequest>({
    fullName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '07:30 PM',
    guestsCount: 2,
    diningArea: 'Royal VIP Lounge',
    occasion: 'Casual Dining',
    specialRequests: ''
  });

  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedReservation | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newBooking: ConfirmedReservation = {
        ...formData,
        bookingId: 'RS-' + Math.floor(100000 + Math.random() * 900000),
        bookingTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'Confirmed',
        tableAssigned: 'Table ' + (Math.floor(Math.random() * 25) + 1) + ' (' + formData.diningArea + ')'
      };

      setConfirmedBooking(newBooking);
      setIsSubmitting(false);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f5e6a8', '#ffffff', '#8c6d1f']
        });
      } catch (err) {}
    }, 600);
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div 
      id="reservation-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div 
        id="reservation-modal-container"
        className="relative w-full max-w-2xl bg-[#121218] border border-[#d4af37]/40 rounded-3xl overflow-hidden shadow-2xl my-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#1b1710] via-[#221d14] to-[#1b1710] p-6 sm:p-7 border-b border-[#d4af37]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-gradient text-[#0b0b0e] flex items-center justify-center font-bold">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Reserve a <span className="text-gold-gradient">Royal Table</span>
              </h3>
              <p className="text-xs text-[#a09c91] mt-0.5">
                Instant confirmation • Complimentary valet • Dedicated VIP butler
              </p>
            </div>
          </div>

          <button
            id="close-reservation-modal"
            onClick={onClose}
            className="p-2 text-[#b0aba0] hover:text-white bg-black/40 rounded-full border border-white/10 hover:border-[#d4af37] transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8">
          
          {/* STATE 1: BOOKING CONFIRMED PASS */}
          {confirmedBooking ? (
            <div className="space-y-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                  Reservation Confirmed
                </span>
                <h4 className="font-display text-2xl font-bold text-white mt-1">
                  We Await Your Royal Arrival, {confirmedBooking.fullName}!
                </h4>
                <p className="text-xs text-[#8c887d] mt-1">
                  A confirmation SMS & WhatsApp have been sent to {confirmedBooking.phone}.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-[#181824] border-2 border-dashed border-[#d4af37]/50 rounded-2xl p-6 text-left space-y-4 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
                  <div>
                    <span className="text-[10px] text-[#8c887d] uppercase tracking-wider">Booking Pass ID</span>
                    <span className="font-mono text-base font-bold text-gold-gradient block">
                      {confirmedBooking.bookingId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#8c887d] uppercase tracking-wider">Assigned Area</span>
                    <span className="text-xs font-semibold text-white block">
                      {confirmedBooking.tableAssigned}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[#8c887d] block text-[11px]">Date</span>
                    <strong className="text-white">{confirmedBooking.date}</strong>
                  </div>
                  <div>
                    <span className="text-[#8c887d] block text-[11px]">Time</span>
                    <strong className="text-white">{confirmedBooking.timeSlot}</strong>
                  </div>
                  <div>
                    <span className="text-[#8c887d] block text-[11px]">Guests</span>
                    <strong className="text-white">{confirmedBooking.guestsCount} People</strong>
                  </div>
                  <div>
                    <span className="text-[#8c887d] block text-[11px]">Occasion</span>
                    <strong className="text-white">{confirmedBooking.occasion}</strong>
                  </div>
                </div>

                {confirmedBooking.specialRequests && (
                  <div className="pt-2 border-t border-white/5 text-xs text-[#a09c91]">
                    <span className="text-[#d4af37] font-semibold">Special Request: </span>
                    {confirmedBooking.specialRequests}
                  </div>
                )}

                <div className="pt-2 text-[11px] text-[#7a766c] flex items-center justify-between">
                  <span>📍 {RESTAURANT_INFO.address}</span>
                  <span>📞 {RESTAURANT_INFO.phone}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1f1f2e] border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Print / Save Pass</span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#0b0b0e] bg-gold-gradient rounded-xl shadow-lg hover:scale-102 transition-all"
                >
                  <span>Done</span>
                </button>
              </div>
            </div>
          ) : (
            /* STATE 2: INTERACTIVE RESERVATION FORM */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Select Dining Area */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#d4af37] font-bold block mb-2.5">
                  1. Choose Preferred Dining Area
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DINING_AREAS.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, diningArea: area.id })}
                      className={`p-3 rounded-xl text-left border transition-all flex items-start gap-3 ${
                        formData.diningArea === area.id
                          ? 'bg-[#221e14] border-[#d4af37] shadow-md shadow-[#d4af37]/15'
                          : 'bg-[#181822] border-white/5 hover:border-white/20 text-[#a09c91]'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        formData.diningArea === area.id ? 'bg-[#d4af37] text-black' : 'bg-black/40 text-[#d4af37]'
                      }`}>
                        {area.id === 'Royal VIP Lounge' ? <Crown className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className={`text-xs font-bold ${
                          formData.diningArea === area.id ? 'text-white' : 'text-[#cfcac0]'
                        }`}>
                          {area.label}
                        </div>
                        <div className="text-[10px] text-[#7a766c] mt-0.5">
                          {area.desc}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Time & Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div>
                  <label htmlFor="res-date-input" className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Date</span>
                  </label>
                  <input
                    id="res-date-input"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full px-3.5 py-2.5 bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                {/* Time Slot */}
                <div>
                  <label htmlFor="res-time-select" className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Time Slot</span>
                  </label>
                  <select
                    id="res-time-select"
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label htmlFor="res-guests-select" className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1.5 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Guests</span>
                  </label>
                  <select
                    id="res-guests-select"
                    value={formData.guestsCount}
                    onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guest Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="res-name-input" className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1.5 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Full Name *</span>
                  </label>
                  <input
                    id="res-name-input"
                    type="text"
                    placeholder="e.g. Vikramaditya Roy"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-xs text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label htmlFor="res-phone-input" className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1.5 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Phone Number *</span>
                  </label>
                  <input
                    id="res-phone-input"
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-xs text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Occasion & Special Requests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="res-occasion-select" className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1.5">
                    Dining Occasion
                  </label>
                  <select
                    id="res-occasion-select"
                    value={formData.occasion}
                    onChange={(e: any) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
                  >
                    <option value="Casual Dining">Casual Dining</option>
                    <option value="Birthday Celebration">Birthday Celebration 🎂</option>
                    <option value="Anniversary">Anniversary Dinner 🌹</option>
                    <option value="Romantic Date">Romantic Date Night ✨</option>
                    <option value="Business Dinner">Business Dinner 💼</option>
                    <option value="Family Reunion">Family Reunion 👨‍👩‍👧‍👦</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="res-special-input" className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1.5 flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Special Notes / Requests</span>
                  </label>
                  <input
                    id="res-special-input"
                    type="text"
                    placeholder="e.g. High chair for baby, quiet corner..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-xs text-white placeholder:text-[#6e6a60] focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  id="confirm-reservation-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0b0b0e] bg-gold-gradient rounded-xl shadow-xl shadow-[#d4af37]/25 hover:shadow-[#d4af37]/45 hover:scale-102 active:scale-98 transition-all disabled:opacity-75"
                >
                  <Crown className="w-4 h-4" />
                  <span>{isSubmitting ? 'Confirming Your Royal Table...' : 'Confirm Table Reservation'}</span>
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
