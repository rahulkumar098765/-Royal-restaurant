import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  SlidersHorizontal, 
  LayoutGrid, 
  ListFilter, 
  Plus, 
  Minus, 
  Eye, 
  ShoppingBag, 
  Check, 
  X,
  Info,
  Clock
} from 'lucide-react';
import { CategoryId, DietaryType, MenuItem, SpiceLevel } from '../types';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { MenuItemModal } from './MenuItemModal';

interface MenuSectionProps {
  onAddToCart: (item: MenuItem, quantity: number, instructions?: string) => void;
  cartItemIds: Record<string, number>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onAddToCart,
  cartItemIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'veg' | 'non-veg' | 'egg' | 'chef-special'>('all');
  const [spiceFilter, setSpiceFilter] = useState<'all' | 0 | 1 | 2 | 3>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'calories'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'book'>('grid');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Filter and Sort items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesCategory = item.categoryName.toLowerCase().includes(q);
        const matchesIngredients = item.ingredients?.some(i => i.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesIngredients) {
          return false;
        }
      }

      // Dietary check
      if (dietaryFilter === 'veg' && item.dietary !== 'veg') return false;
      if (dietaryFilter === 'non-veg' && item.dietary !== 'non-veg') return false;
      if (dietaryFilter === 'egg' && item.dietary !== 'egg') return false;
      if (dietaryFilter === 'chef-special' && !item.isChefSpecial) return false;

      // Spice check
      if (spiceFilter !== 'all' && item.spiceLevel !== spiceFilter) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'calories') return (a.calories || 0) - (b.calories || 0);
      // Default: Chef Specials and Popular first
      if (a.isChefSpecial && !b.isChefSpecial) return -1;
      if (!a.isChefSpecial && b.isChefSpecial) return 1;
      if (a.isPopular && !b.isPopular) return -1;
      if (!a.isPopular && b.isPopular) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, dietaryFilter, spiceFilter, sortBy]);

  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(item, 1);
    setQuickAddedId(item.id);
    setTimeout(() => {
      setQuickAddedId(null);
    }, 800);
  };

  const currentCategoryObj = MENU_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <section id="menu" className="relative py-20 bg-[#050505] text-[#e5e5e5]">
      {/* Background Ambience Lines */}
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs font-semibold mb-3 block">
            Masterpiece Gastronomy
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight mb-4">
            The <span className="text-[#D4AF37] italic font-normal">Royal Spice</span> Menu
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
            From heirloom slow-simmered Awadhi gravies and char-grilled tandoor tikkas to artisan stone-baked pizzas and velvety desserts, explore our 150+ gourmet creations.
          </p>
        </div>

        {/* Search & Main Controls Bar */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-4 sm:p-5 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
              <input
                id="menu-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, ingredients (e.g. Paneer, Biryani, Pizza)..."
                className="w-full pl-10 pr-9 py-2.5 bg-black/40 border border-white/10 text-xs sm:text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#D4AF37] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Dietary Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
              <button
                onClick={() => setDietaryFilter('all')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  dietaryFilter === 'all'
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'bg-white/5 text-gray-300 hover:text-white border border-white/10'
                }`}
              >
                All Diets
              </button>
              <button
                onClick={() => setDietaryFilter('veg')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  dietaryFilter === 'veg'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white/5 text-emerald-400 hover:bg-emerald-950/40 border border-emerald-900/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Pure Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('non-veg')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  dietaryFilter === 'non-veg'
                    ? 'bg-rose-600 text-white shadow-md'
                    : 'bg-white/5 text-rose-400 hover:bg-rose-950/40 border border-rose-900/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-rose-400" />
                <span>Non-Veg</span>
              </button>
              <button
                onClick={() => setDietaryFilter('chef-special')}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  dietaryFilter === 'chef-special'
                    ? 'bg-[#D4AF37] text-black shadow-md'
                    : 'bg-white/5 text-[#f5e6a8] hover:bg-[#282315] border border-[#D4AF37]/30'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Chef Specials</span>
              </button>
            </div>

            {/* Sort & View Mode Controls */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <select
                id="menu-sort-select"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-black/40 border border-white/10 px-3 py-2 text-xs text-[#e5e5e5] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="calories">Calorie: Low to High</option>
              </select>

              <div className="flex items-center bg-black/40 border border-white/10 p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 transition-colors ${
                    viewMode === 'grid' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Grid Cards View"
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('book')}
                  className={`p-1.5 transition-colors ${
                    viewMode === 'book' ? 'bg-[#D4AF37] text-black' : 'text-gray-400 hover:text-white'
                  }`}
                  title="Royal Menu Book List View"
                  aria-label="List View"
                >
                  <ListFilter className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Spice Level Quick Filter */}
          <div className="flex items-center gap-2 pt-2 border-t border-white/5 text-xs text-gray-400">
            <span className="font-medium text-[#D4AF37] uppercase tracking-wider text-[10px]">Spice Tolerance:</span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { label: 'All Spices', value: 'all' },
                { label: 'Mild / None', value: 0 },
                { label: 'Medium 🌶️', value: 1 },
                { label: 'Spicy 🌶️🌶️', value: 2 },
                { label: 'Fiery Royal 🌶️🌶️🌶️', value: 3 },
              ].map((sp) => (
                <button
                  key={sp.label}
                  onClick={() => setSpiceFilter(sp.value as any)}
                  className={`px-2.5 py-1 text-[10px] uppercase tracking-wider font-medium transition-colors ${
                    spiceFilter === sp.value
                      ? 'bg-[#D4AF37]/20 text-[#f5e6a8] border border-[#D4AF37]'
                      : 'bg-white/5 text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="overflow-x-auto pb-4 mb-8 no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {MENU_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? MENU_ITEMS.length 
                : MENU_ITEMS.filter(i => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  id={`cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-widest font-semibold transition-all ${
                    isActive
                      ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/10'
                      : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 ${
                    isActive ? 'bg-black/20 text-black' : 'bg-black/40 text-[#D4AF37]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Description Banner if selected */}
        {currentCategoryObj && selectedCategory !== 'all' && (
          <div className="mb-6 p-4 bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-lg font-bold text-white">
                {currentCategoryObj.label}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {currentCategoryObj.description}
              </p>
            </div>
            <span className="text-xs font-semibold text-[#D4AF37] bg-black/40 px-3 py-1 border border-[#D4AF37]/30">
              {filteredItems.length} Offerings
            </span>
          </div>
        )}

        {/* Results Info Counter */}
        <div className="flex items-center justify-between text-xs text-gray-400 mb-6">
          <span>Showing <strong className="text-white">{filteredItems.length}</strong> delicious royal items</span>
          {(searchQuery || dietaryFilter !== 'all' || spiceFilter !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setSpiceFilter('all');
                setSelectedCategory('all');
              }}
              className="text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
            >
              <X className="w-3 h-3" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 px-4 bg-white/5 border border-white/10 my-8">
            <div className="w-14 h-14 border border-[#D4AF37] rotate-45 flex items-center justify-center mx-auto mb-6">
              <Search className="w-6 h-6 text-[#D4AF37] -rotate-45" />
            </div>
            <h3 className="font-serif text-xl font-bold text-white mb-2">No Royal Delicacies Found</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
              We could not find any menu items matching your search criteria. Try adjusting your dietary preferences, spice filters, or search term.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                setSpiceFilter('all');
                setSelectedCategory('all');
              }}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-black bg-[#D4AF37] hover:bg-[#e8c453]"
            >
              View Full Menu
            </button>
          </div>
        )}

        {/* VIEW MODE 1: GRID VIEW */}
        {viewMode === 'grid' && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const inCartQty = cartItemIds[item.id] || 0;
              const isJustAdded = quickAddedId === item.id;

              return (
                <div
                  key={item.id}
                  id={`menu-card-${item.id}`}
                  onClick={() => setSelectedItemForModal(item)}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col cursor-pointer"
                >
                  {/* Dish Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-black">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />

                    {/* Veg / Non-Veg Indicator Icon */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className={`w-4 h-4 flex items-center justify-center p-[2px] bg-black/80 border ${
                        item.dietary === 'veg' 
                          ? 'border-emerald-500' 
                          : item.dietary === 'egg'
                          ? 'border-amber-500'
                          : 'border-rose-500'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          item.dietary === 'veg' 
                            ? 'bg-emerald-500' 
                            : item.dietary === 'egg'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`} />
                      </span>

                      {item.isChefSpecial && (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-[#D4AF37] text-black">
                          Special
                        </span>
                      )}
                    </div>

                    {/* Quick View Icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-2 bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black border border-white/10 transition-colors flex items-center justify-center">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Preparation Time / Spice on Thumbnail bottom */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-gray-300">
                      <div className="flex items-center gap-1 bg-black/70 px-2 py-0.5 border border-white/10">
                        {item.spiceLevel === 0 ? (
                          <span className="text-[10px] text-gray-400">Mild</span>
                        ) : (
                          Array.from({ length: item.spiceLevel }).map((_, i) => (
                            <Flame key={i} className="w-3 h-3 text-rose-500 fill-rose-500" />
                          ))
                        )}
                      </div>
                      {item.preparationTime && (
                        <div className="flex items-center gap-1 bg-black/70 px-2 py-0.5 border border-white/10">
                          <Clock className="w-3 h-3 text-[#D4AF37]" />
                          <span>{item.preparationTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-serif text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
                          {item.name}
                        </h4>
                        <span className="text-base font-serif font-bold text-[#D4AF37] whitespace-nowrap">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider text-gray-500">
                        {item.categoryName}
                      </span>

                      {/* Add Button in Sleek Style */}
                      <button
                        id={`quick-add-${item.id}`}
                        onClick={(e) => handleQuickAdd(item, e)}
                        className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                          isJustAdded
                            ? 'bg-emerald-500 text-white'
                            : inCartQty > 0
                            ? 'bg-black text-[#f5e6a8] border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
                            : 'bg-[#D4AF37] text-black hover:bg-[#e8c453]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : inCartQty > 0 ? (
                          <>
                            <span>In Cart ({inCartQty})</span>
                            <Plus className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 2: ROYAL MENU BOOK / CLASSIC LIST VIEW */}
        {viewMode === 'book' && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 sm:p-10 border border-white/10 backdrop-blur-xl">
            {filteredItems.map((item) => {
              const inCartQty = cartItemIds[item.id] || 0;
              const isJustAdded = quickAddedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItemForModal(item)}
                  className="group flex items-start gap-4 p-3 hover:bg-white/5 transition-colors border-b border-white/10 cursor-pointer pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover flex-shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-3 h-3 flex items-center justify-center p-[1px] border ${
                          item.dietary === 'veg' ? 'border-emerald-500' : 'border-rose-500'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            item.dietary === 'veg' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`} />
                        </span>
                        <h4 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-[#D4AF37] truncate">
                          {item.name}
                        </h4>
                      </div>
                      <span className="font-serif font-bold text-[#D4AF37] whitespace-nowrap text-sm sm:text-base">
                        ₹{item.price}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-[11px] text-gray-500">
                        {item.calories && <span>{item.calories} cal</span>}
                        {item.preparationTime && <span>• {item.preparationTime}</span>}
                      </div>

                      <button
                        onClick={(e) => handleQuickAdd(item, e)}
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                          isJustAdded
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#D4AF37] text-black hover:bg-[#e8c453]'
                        }`}
                      >
                        {isJustAdded ? 'Added' : inCartQty > 0 ? `+1 (${inCartQty})` : '+ Add'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Detail Modal */}
      {selectedItemForModal && (
        <MenuItemModal
          item={selectedItemForModal}
          onClose={() => setSelectedItemForModal(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
};
