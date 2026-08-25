import React, { useState } from 'react';
import { 
  X, 
  QrCode, 
  Smartphone, 
  Sparkles, 
  Download, 
  Share2, 
  Check, 
  Utensils,
  Wifi
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface DigitalQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMenu: () => void;
}

export const DigitalQrModal: React.FC<DigitalQrModalProps> = ({
  isOpen,
  onClose,
  onOpenMenu
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      id="qr-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div 
        id="qr-modal-content"
        className="w-full max-w-md bg-[#121218] border border-[#d4af37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8c887d] hover:text-white rounded-full bg-black/40 border border-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <div className="w-12 h-12 rounded-full bg-gold-gradient text-black flex items-center justify-center mx-auto mb-3">
            <QrCode className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
            Contactless Table Ordering
          </span>
          <h3 className="font-display text-2xl font-bold text-white mt-1">
            Scan for Digital Menu
          </h3>
          <p className="text-xs text-[#a09c91] mt-1 max-w-xs mx-auto">
            Scan this QR with your camera to view all dishes, allergen guides, live customization, and place table orders.
          </p>
        </div>

        {/* QR Code Graphic Frame */}
        <div className="bg-white p-6 rounded-2xl shadow-xl inline-block border-4 border-[#d4af37]/50 relative group">
          {/* Stylized QR representation */}
          <div className="w-48 h-48 sm:w-56 sm:h-56 bg-[#f8f9fa] rounded-xl flex flex-col items-center justify-center p-2 relative overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-full h-full text-black">
              {/* Corner position markers */}
              <rect x="5" y="5" width="25" height="25" fill="#111" rx="2" />
              <rect x="9" y="9" width="17" height="17" fill="#fff" rx="1" />
              <rect x="13" y="13" width="9" height="9" fill="#d4af37" />

              <rect x="70" y="5" width="25" height="25" fill="#111" rx="2" />
              <rect x="74" y="9" width="17" height="17" fill="#fff" rx="1" />
              <rect x="78" y="13" width="9" height="9" fill="#d4af37" />

              <rect x="5" y="70" width="25" height="25" fill="#111" rx="2" />
              <rect x="9" y="74" width="17" height="17" fill="#fff" rx="1" />
              <rect x="13" y="78" width="9" height="9" fill="#d4af37" />

              {/* Data pattern squares */}
              <rect x="35" y="10" width="5" height="5" fill="#222" />
              <rect x="45" y="10" width="15" height="5" fill="#222" />
              <rect x="35" y="20" width="10" height="5" fill="#222" />
              <rect x="55" y="20" width="8" height="5" fill="#222" />

              <rect x="10" y="35" width="20" height="5" fill="#222" />
              <rect x="35" y="35" width="10" height="10" fill="#d4af37" />
              <rect x="50" y="35" width="15" height="5" fill="#222" />
              <rect x="70" y="35" width="12" height="8" fill="#222" />

              <rect x="10" y="45" width="15" height="5" fill="#222" />
              <rect x="30" y="50" width="15" height="5" fill="#222" />
              <rect x="50" y="48" width="12" height="10" fill="#222" />
              <rect x="70" y="48" width="15" height="5" fill="#222" />

              <rect x="35" y="65" width="12" height="8" fill="#222" />
              <rect x="52" y="65" width="8" height="5" fill="#222" />
              <rect x="65" y="65" width="20" height="8" fill="#222" />

              <rect x="35" y="78" width="15" height="12" fill="#222" />
              <rect x="55" y="78" width="10" height="5" fill="#222" />
              <rect x="70" y="78" width="15" height="12" fill="#d4af37" />
            </svg>

            {/* Center Royal Spice Logo Emblem */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-11 h-11 rounded-full bg-[#0b0b0e] border-2 border-[#d4af37] flex items-center justify-center shadow-lg">
                <Utensils className="w-5 h-5 text-[#f5e6a8]" />
              </div>
            </div>
          </div>
          
          <div className="text-center mt-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#121218]">
              Table Dine-In • Royal Spice
            </span>
          </div>
        </div>

        {/* Free Wi-Fi Info */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#a09c91] bg-[#1a1a24] py-2 px-4 rounded-xl border border-white/5">
          <Wifi className="w-4 h-4 text-[#d4af37]" />
          <span>Complimentary Wi-Fi: <strong>RoyalSpice_Guest</strong> (Password: <strong>royal2026</strong>)</span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-[#1a1a24] border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copied ? 'Link Copied!' : 'Copy Menu URL'}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenMenu();
            }}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient rounded-xl shadow-md hover:scale-102 transition-all"
          >
            <Smartphone className="w-4 h-4" />
            <span>Open Menu Now</span>
          </button>
        </div>

      </div>
    </div>
  );
};
