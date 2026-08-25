import React, { useState } from 'react';
import { 
  Sparkles, 
  Camera, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const AmbienceGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Ambience', 'Signature Dishes', 'VIP Dining', 'Kitchen & Tandoor', 'Events'];

  const filteredGallery = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-[#09090c] relative text-[#e8e4db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#181610] border border-[#d4af37]/40 text-[#f5e6a8] text-xs uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Visual Grandeur</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Ambience & <span className="text-gold-gradient">Gallery</span>
          </h2>
          <p className="text-sm sm:text-base text-[#a09c91] font-light leading-relaxed">
            Take a visual tour through our imperial gold-lit halls, private dining alcoves, master tandoor stations, and culinary masterworks.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-gold-gradient text-black shadow-lg shadow-[#d4af37]/20 font-bold'
                    : 'bg-[#15151e] text-[#8c887d] hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden cursor-pointer border border-[#d4af37]/20 hover:border-[#d4af37]/70 shadow-lg transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover Badge */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="p-2 bg-black/70 rounded-full text-white backdrop-blur-md flex items-center justify-center">
                  <Maximize2 className="w-3.5 h-3.5 text-[#d4af37]" />
                </span>
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold block">
                  {item.category}
                </span>
                <h4 className="font-display text-base font-bold text-white group-hover:text-[#f5e6a8] transition-colors mt-0.5">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#a09c91] line-clamp-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredGallery[lightboxIndex] && (
        <div 
          id="gallery-lightbox-backdrop"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-white bg-white/10 hover:bg-[#d4af37] hover:text-black rounded-full transition-colors z-20"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/60 hover:bg-[#d4af37] hover:text-black rounded-full transition-colors z-20"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white bg-black/60 hover:bg-[#d4af37] hover:text-black rounded-full transition-colors z-20"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredGallery[lightboxIndex].image}
              alt={filteredGallery[lightboxIndex].title}
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain border border-[#d4af37]/30 shadow-2xl"
            />
            <div>
              <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                {filteredGallery[lightboxIndex].category} ({lightboxIndex + 1}/{filteredGallery.length})
              </span>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mt-1">
                {filteredGallery[lightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#a09c91] max-w-lg mx-auto mt-1">
                {filteredGallery[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
