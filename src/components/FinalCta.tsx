import React from 'react';
import { Calendar, Phone } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { ImageWithFallback } from './ImageWithFallback';

interface FinalCtaProps {
  onReserveClick: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({ onReserveClick }) => {
  return (
    <section className="relative py-28 overflow-hidden bg-stone-950 border-t border-stone-800">
      {/* Background with Ambient Scrim */}
      <div className="absolute inset-0 z-0 opacity-25">
        <ImageWithFallback
          src={restaurantConfig.hero.image}
          alt="Restaurant table ready for dinner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-stone-950/85" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-3">
          <span>Evenings at {restaurantConfig.name}</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-stone-100 font-normal tracking-tight mb-6 [text-wrap:balance]">
          Your table is waiting.
        </h2>

        <p className="text-base sm:text-lg text-stone-300 font-light max-w-xl mx-auto mb-10 leading-relaxed [text-wrap:balance]">
          Join us tonight for handcrafted pastas, wood-fired cuts, and seasonal cocktails prepared by master hands.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm sm:text-base font-medium text-stone-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-xl shadow-amber-950/40 transition-all duration-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>Reserve a Table</span>
          </button>

          <a
            href={`tel:${restaurantConfig.contact.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm sm:text-base font-medium text-stone-200 hover:text-white bg-stone-900/90 border border-stone-700/80 hover:border-stone-500 rounded-lg transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call {restaurantConfig.contact.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
