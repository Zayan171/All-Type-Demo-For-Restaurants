import React from 'react';
import { Star, Quote } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

export const Reviews: React.FC = () => {
  const { reviews } = restaurantConfig;

  return (
    <section id="reviews" className="py-24 bg-stone-950 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-2">
            <span>Guest Voices</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="text-stone-400">Verified Diners</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-tight mb-4">
            Cherished Moments & Praise
          </h2>
          <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            From anniversary milestones to intimate weekday suppers, hear what our guests have shared.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between p-6 bg-stone-900/40 hover:bg-stone-900/70 border border-stone-800 rounded-xl transition-all duration-200"
            >
              <div>
                {/* Star Rating Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400" aria-label={`${rev.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-700" />
                </div>

                {/* Review Text */}
                <p className="text-stone-300 text-sm font-light leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-stone-800/80">
                <div className="font-medium text-stone-100 text-sm">
                  {rev.author}
                </div>
                <div className="text-xs text-amber-400/90 font-light">
                  {rev.occasion}
                </div>
                <div className="flex items-center justify-between text-[11px] text-stone-500 mt-1">
                  <span>{rev.source}</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate Ratings Callout */}
        <div className="mt-14 max-w-xl mx-auto p-6 bg-stone-900/30 border border-stone-800/80 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 text-amber-400 text-base font-serif font-medium mb-1">
            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            <span>4.9 Average Rating across 1,200+ Reviews</span>
          </div>
          <p className="text-xs text-stone-400 font-light">
            Recognized by OpenTable Diners’ Choice and regional culinary guides.
          </p>
        </div>
      </div>
    </section>
  );
};
