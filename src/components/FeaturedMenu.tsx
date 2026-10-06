import React from 'react';
import { ArrowRight } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface FeaturedMenuProps {
  onExploreFullMenu: () => void;
  onReserveDish: (dishName: string) => void;
}

export const FeaturedMenu: React.FC<FeaturedMenuProps> = ({
  onExploreFullMenu,
  onReserveDish,
}) => {
  // Grab the 6 featured dishes from config
  const featuredDishes = restaurantConfig.menuItems
    .filter((item) => item.featured)
    .slice(0, 6);

  return (
    <section id="featured" className="py-24 bg-stone-950 border-t border-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-2">
              <span>Chef's Highlights</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="text-stone-400">Seasonal Tasting</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-100 font-normal tracking-tight">
              Featured Selections
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-400 max-w-md font-light leading-relaxed">
            A curated glimpse into our kitchen's current rotation — prepared fresh daily using heirloom harvests and artisanal cuts.
          </p>
        </div>

        {/* 6-Dish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDishes.map((dish) => (
            <div
              key={dish.id}
              className="group flex flex-col bg-stone-900/40 hover:bg-stone-900/70 border border-stone-800/80 hover:border-amber-500/40 rounded-xl overflow-hidden transition-all duration-300"
            >
              {/* Dish Image */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-stone-900">
                <ImageWithFallback
                  src={dish.image}
                  alt={dish.name}
                  fallbackText={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Dish Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {/* Category & Dietary metadata as clean unboxed text */}
                  <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                    <span className="uppercase tracking-wider text-amber-400/90 font-medium">
                      {dish.category}
                    </span>
                    {dish.dietary && dish.dietary.length > 0 && (
                      <span className="text-stone-500">
                        {dish.dietary.join(' · ')}
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-baseline justify-between gap-4 mb-3">
                    <h3 className="font-serif text-xl text-stone-100 font-normal group-hover:text-amber-300 transition-colors">
                      {dish.name}
                    </h3>
                    <span className="font-sans font-medium text-lg text-amber-400 tabular-nums shrink-0">
                      ${dish.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-stone-400 font-light leading-relaxed line-clamp-2 mb-4">
                    {dish.description}
                  </p>

                  {dish.pairing && (
                    <p className="text-xs text-stone-400 italic mb-4">
                      {dish.pairing}
                    </p>
                  )}
                </div>

                {/* Card Action */}
                <div className="pt-3 border-t border-stone-800/60 flex items-center justify-between">
                  <span className="text-xs text-stone-400">Fresh daily</span>
                  <button
                    onClick={() => onReserveDish(dish.name)}
                    className="text-xs font-medium text-amber-400 hover:text-amber-300 inline-flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>Reserve to Taste</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Bottom Link */}
        <div className="mt-14 text-center">
          <button
            onClick={onExploreFullMenu}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-stone-200 hover:text-white bg-stone-900 border border-stone-700 hover:border-amber-500/60 rounded-lg transition-all duration-200 cursor-pointer"
          >
            <span>Explore Complete Restaurant Menu</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
