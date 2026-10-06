import React from 'react';
import { ArrowDown, Calendar, Sparkles } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroProps {
  onReserveClick: () => void;
  onViewMenuClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick, onViewMenuClick }) => {
  const { hero } = restaurantConfig;

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Layered Radial & Gradient Scrims for WCAG Contrast */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src={hero.image}
          alt="The Table ambient dining experience"
          className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/50 to-stone-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
        {/* Subtle Eyebrow Metadata (Zero-Pill Discipline) */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-medium tracking-widest uppercase text-amber-400 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{hero.eyebrow}</span>
          <span aria-hidden="true" className="text-stone-600">·</span>
          <span className="text-stone-300">Downtown Arts District</span>
        </div>

        {/* Display Headline with balanced wrapping */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-stone-100 tracking-tight leading-[1.12] mb-6 max-w-4xl mx-auto [text-wrap:balance]">
          {hero.headline}
        </h1>

        {/* Body Description */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300/90 font-light max-w-2xl mx-auto mb-10 leading-relaxed [text-wrap:balance]">
          {hero.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-medium text-stone-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-xl shadow-amber-950/30 transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>Reserve a Table</span>
          </button>

          <button
            onClick={onViewMenuClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-stone-200 hover:text-white bg-stone-900/80 hover:bg-stone-800/90 border border-stone-700/80 hover:border-stone-500 rounded-lg backdrop-blur-xs transition-all duration-200 cursor-pointer"
          >
            <span>View Full Menu</span>
            <ArrowDown className="w-4 h-4 text-stone-400" />
          </button>
        </div>

        {/* Editorial Trust Markers */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 sm:gap-x-6 text-xs text-stone-400 border-t border-stone-800/80 pt-8 max-w-3xl mx-auto">
          <span>Seasonal Farm-to-Table</span>
          <span aria-hidden="true" className="text-stone-700">/</span>
          <span>Artisanal Craft Cocktails</span>
          <span aria-hidden="true" className="text-stone-700">/</span>
          <span>Open Kitchen Fire Cooking</span>
          <span aria-hidden="true" className="text-stone-700">/</span>
          <span>Complimentary Valet Service</span>
        </div>
      </div>
    </section>
  );
};
