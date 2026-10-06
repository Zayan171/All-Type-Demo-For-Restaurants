import React from 'react';
import { restaurantConfig } from '../data/restaurant';
import { ImageWithFallback } from './ImageWithFallback';
import { Quote } from 'lucide-react';

export const About: React.FC = () => {
  const { chef, fullStory, stats, philosophy } = restaurantConfig;

  return (
    <section id="about" className="py-24 bg-stone-900/30 border-t border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid: Story & Chef Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-3">
              <span>Our Philosophy</span>
              <span aria-hidden="true" className="text-stone-700">·</span>
              <span className="text-stone-400">Culinary Craft</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-stone-100 font-normal tracking-tight mb-6 leading-tight">
              An unhurried devotion to flavor, hearth, and hospitality.
            </h2>

            <p className="text-base sm:text-lg text-amber-200/90 font-light italic mb-8 leading-relaxed">
              "{philosophy}"
            </p>

            <div className="space-y-4 text-sm sm:text-base text-stone-300 font-light leading-relaxed mb-8">
              {fullStory.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Chef Quote Card */}
            <div className="p-5 sm:p-6 bg-stone-900/80 border border-stone-800 rounded-xl relative">
              <Quote className="w-8 h-8 text-amber-500/20 absolute top-4 right-4" />
              <blockquote className="text-stone-300 italic text-sm mb-4 relative z-10">
                "{chef.quote}"
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center font-serif text-amber-400 font-medium">
                  {chef.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-stone-200 text-sm">{chef.name}</div>
                  <div className="text-xs text-stone-400">{chef.role}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Kitchen & Chef Imagery */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="aspect-4/3 sm:aspect-4/3 rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-stone-900">
                <ImageWithFallback
                  src={chef.image}
                  alt={`Executive Chef ${chef.name} in the open hearth kitchen`}
                  fallbackText={`${chef.name} – Executive Chef`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Subtle Frame Offset */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full rounded-2xl border border-amber-500/20 -z-10 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Statistics Strip */}
        <div className="border-t border-stone-800 pt-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-6 bg-stone-900/50 border border-stone-800/80 rounded-xl"
              >
                <div className="font-serif text-3xl sm:text-4xl text-amber-400 font-normal tracking-tight mb-1 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-stone-200 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-stone-400 font-light">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
