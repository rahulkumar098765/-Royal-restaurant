import React, { useState } from 'react';
import { 
  Star, 
  Sparkles, 
  Quote, 
  CheckCircle2, 
  Plus, 
  X, 
  MessageSquare,
  ThumbsUp
} from 'lucide-react';
import { REVIEWS_LIST } from '../data/restaurantData';
import { ReviewItem } from '../types';

export const TestimonialsSection: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(REVIEWS_LIST);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newDish, setNewDish] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: ReviewItem = {
      id: 'rev-user-' + Date.now(),
      author: newAuthor,
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      dishRecommended: newDish || 'Chef Special Assortment',
      verifiedGuest: true
    };

    setReviews([newRev, ...reviews]);
    setIsModalOpen(false);
    setNewAuthor('');
    setNewComment('');
    setNewDish('');
  };

  return (
    <section id="reviews" className="py-24 bg-[#0c0c11] relative text-[#e8e4db]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#1c170f] border border-[#d4af37]/40 text-[#f5e6a8] text-xs uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5 text-[#d4af37] fill-[#d4af37]" />
            <span>4.9 / 5.0 Star Rated (2,400+ Reviews)</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Words of <span className="text-gold-gradient">Praise</span>
          </h2>
          <p className="text-sm sm:text-base text-[#a09c91] font-light leading-relaxed">
            Read firsthand accounts from esteemed patrons who have celebrated their life milestones and everyday dining memories at Royal Spice.
          </p>
        </div>

        {/* Rating Breakdown Bento Box */}
        <div className="bg-[#14141d] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Overall Score */}
            <div className="md:col-span-4 text-center md:border-r border-white/10 md:pr-8">
              <span className="font-display text-6xl font-extrabold text-gold-gradient">
                4.9
              </span>
              <div className="flex items-center justify-center gap-1 my-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                ))}
              </div>
              <span className="text-xs text-[#a09c91] block">
                Based on 2,480+ verified Google & Dineout ratings
              </span>

              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient hover:scale-105 transition-all shadow-lg"
              >
                <Plus className="w-4 h-4" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Metric Bars */}
            <div className="md:col-span-8 space-y-3">
              {[
                { label: 'Food Taste & Presentation', score: '4.9 / 5.0', pct: '98%' },
                { label: 'Ambience & Royal Decor', score: '4.9 / 5.0', pct: '98%' },
                { label: 'Staff Hospitality & Speed', score: '4.8 / 5.0', pct: '96%' },
                { label: 'Hygiene & Cleanliness', score: '5.0 / 5.0', pct: '100%' },
              ].map((m) => (
                <div key={m.label} className="space-y-1">
                  <div className="flex justify-between text-xs font-medium text-[#cfcac0]">
                    <span>{m.label}</span>
                    <span className="text-[#f5e6a8] font-bold">{m.score}</span>
                  </div>
                  <div className="w-full h-2 bg-[#20202e] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gold-gradient rounded-full"
                      style={{ width: m.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121218] border border-[#d4af37]/20 hover:border-[#d4af37]/60 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                {/* Rating Stars & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#6d695f]">{rev.date}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#cfcac0] leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Recommended Dish */}
              <div className="pt-4 mt-4 border-t border-white/5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-white group-hover:text-[#f5e6a8] transition-colors">
                    {rev.author}
                  </span>
                  {rev.verifiedGuest && (
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-800/30">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Guest</span>
                    </span>
                  )}
                </div>

                {rev.dishRecommended && (
                  <div className="text-[11px] text-[#8c887d]">
                    <span className="text-[#d4af37]">Recommended: </span>
                    <span>{rev.dishRecommended}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {isModalOpen && (
        <div 
          id="review-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            id="review-modal-content"
            className="w-full max-w-md bg-[#14141d] border border-[#d4af37]/40 rounded-3xl p-6 shadow-2xl text-left space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-3">
              <h3 className="font-display text-xl font-bold text-white">
                Share Your <span className="text-gold-gradient">Royal Review</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-[#8c887d] hover:text-white rounded-full bg-black/40"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="p-1 text-2xl focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${
                        (hoverRating || newRating) >= star 
                          ? 'text-[#d4af37] fill-[#d4af37]' 
                          : 'text-[#444]'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohini Sen"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                  Favorite Dish Tried
                </label>
                <input
                  type="text"
                  placeholder="e.g. Awadhi Mutton Biryani & Shahi Paneer"
                  value={newDish}
                  onChange={(e) => setNewDish(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#a09c91] font-medium block mb-1">
                  Your Dining Experience *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Tell us about the flavor, service, and ambiance..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1a1a24] border border-[#d4af37]/30 rounded-xl text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 text-xs font-bold uppercase tracking-wider text-black bg-gold-gradient rounded-xl shadow-lg"
              >
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
