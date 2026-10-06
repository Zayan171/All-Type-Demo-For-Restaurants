import React, { useState, useMemo } from 'react';
import { MenuCategory, DietaryTag } from '../types/restaurant';
import { restaurantConfig } from '../data/restaurant';
import { Search, Sparkles } from 'lucide-react';

interface FullMenuProps {
  onReserveDish: (dishName: string) => void;
}

export const FullMenu: React.FC<FullMenuProps> = ({ onReserveDish }) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDietary, setSelectedDietary] = useState<string>('All');

  const categories = restaurantConfig.menuCategories;

  const dietaryFilters: ('All' | DietaryTag)[] = [
    'All',
    'Vegetarian',
    'Gluten-Free',
    "Chef's Selection",
    'Signature',
  ];

  const filteredItems = useMemo(() => {
    return restaurantConfig.menuItems.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;

      // Dietary match
      const matchesDietary =
        selectedDietary === 'All' ||
        (item.dietary && item.dietary.includes(selectedDietary as DietaryTag));

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      return matchesCategory && matchesDietary && matchesSearch;
    });
  }, [activeCategory, selectedDietary, searchQuery]);

  return (
    <section id="menu" className="py-24 bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Offerings</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="text-stone-400">Autumn & Winter</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-tight mb-4">
            The Complete Menu
          </h2>
          <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Every dish is prepared to order with sustainable ingredients from regional farmers and purveyors.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col gap-5 mb-12">
          {/* Category Tabs (Segmented Buttons) */}
          <div className="flex items-center justify-center overflow-x-auto pb-2 scrollbar-none">
            <div className="inline-flex p-1 bg-stone-900 border border-stone-800 rounded-xl max-w-full">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-amber-400 text-stone-950 shadow-sm'
                        : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Filter: Search & Dietary Preferences */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto w-full">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dish or ingredient..."
                className="w-full pl-9 pr-4 py-2 bg-stone-900/80 border border-stone-800 rounded-lg text-xs sm:text-sm text-stone-200 placeholder-stone-500 focus:outline-hidden focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-500 hover:text-stone-300"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dietary Tags Dropdown / Filter Bar */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <span className="text-xs text-stone-500 mr-1 hidden md:inline">Dietary:</span>
              {dietaryFilters.map((diet) => {
                const isSelected = selectedDietary === diet;
                return (
                  <button
                    key={diet}
                    onClick={() => setSelectedDietary(diet)}
                    className={`px-2.5 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-stone-800 text-amber-300 border border-amber-500/40'
                        : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent'
                    }`}
                  >
                    {diet}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Menu Items Layout: Two-Column Editorial Style */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-stone-900/30 border border-stone-800/80 rounded-xl p-8 max-w-xl mx-auto">
            <p className="text-stone-300 text-base mb-2">No menu items match your current filter.</p>
            <p className="text-stone-500 text-xs mb-4">Try clearing your search query or choosing another category.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
                setSelectedDietary('All');
              }}
              className="px-4 py-2 text-xs bg-amber-400 text-stone-950 font-medium rounded-lg hover:bg-amber-300"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group p-5 bg-stone-900/30 hover:bg-stone-900/60 border border-stone-800/60 hover:border-stone-700 rounded-xl transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Category & Dietary metadata as unboxed text */}
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
                    <span className="text-amber-500/90 font-medium tracking-wider uppercase text-[11px]">
                      {item.category}
                    </span>
                    {item.dietary && item.dietary.length > 0 && (
                      <span className="text-stone-400 text-[11px]">
                        {item.dietary.join(' · ')}
                      </span>
                    )}
                  </div>

                  {/* Header Row: Title and Price with dotted line aesthetic */}
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-serif text-lg sm:text-xl text-stone-100 font-normal group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <div className="h-px grow border-b border-dotted border-stone-700/60 mx-2 hidden sm:block" />
                    <span className="font-sans font-medium text-base sm:text-lg text-amber-400 tabular-nums shrink-0">
                      ${item.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-400 font-light leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {/* Wine / Cocktail Pairing Note */}
                  {item.pairing && (
                    <p className="text-xs text-amber-400/80 italic font-light mb-2">
                      ✦ {item.pairing}
                    </p>
                  )}
                </div>

                {/* Subtle reserve quick action */}
                <div className="pt-2 border-t border-stone-800/40 flex justify-end">
                  <button
                    onClick={() => onReserveDish(item.name)}
                    className="text-xs text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    Request for reservation table →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dietary Note at the Bottom */}
        <div className="mt-16 text-center text-xs text-stone-500 max-w-2xl mx-auto border-t border-stone-900 pt-6">
          <p>
            * Please inform your service captain of any severe allergies or dietary preferences before placing your order.
            Menu items and seasonal pricing are subject to daily market availability.
          </p>
        </div>
      </div>
    </section>
  );
};
