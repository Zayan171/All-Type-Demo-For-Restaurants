import React, { useState, useEffect, useCallback } from 'react';
import { restaurantConfig } from '../data/restaurant';
import { GalleryItem } from '../types/restaurant';
import { ImageWithFallback } from './ImageWithFallback';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Dishes' | 'Interior' | 'Atmosphere'>('All');
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const galleryItems = restaurantConfig.gallery;

  const categories: ('All' | 'Dishes' | 'Interior' | 'Atmosphere')[] = [
    'All',
    'Dishes',
    'Interior',
    'Atmosphere',
  ];

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const openLightbox = (item: GalleryItem) => {
    const idx = galleryItems.findIndex((g) => g.id === item.id);
    setSelectedPhotoIndex(idx >= 0 ? idx : 0);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const handleNext = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => ((prev! + 1) % galleryItems.length));
    }
  }, [selectedPhotoIndex, galleryItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prev) => ((prev! - 1 + galleryItems.length) % galleryItems.length));
    }
  }, [selectedPhotoIndex, galleryItems.length]);

  // Handle escape & arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handleNext, handlePrev]);

  const activePhoto = selectedPhotoIndex !== null ? galleryItems[selectedPhotoIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-stone-900/20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-2">
            <span>Visual Tour</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="text-stone-400">The Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-tight mb-4">
            Moments at The Table
          </h2>
          <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Step inside our dining room, open culinary pass, and bespoke cocktails crafted for candlelit conversations.
          </p>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-stone-950 font-semibold'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item)}
              className="group relative aspect-4/3 rounded-xl overflow-hidden bg-stone-900 border border-stone-800/80 cursor-pointer shadow-md"
            >
              <ImageWithFallback
                src={item.image}
                alt={item.title}
                fallbackText={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-amber-400 text-xs uppercase tracking-wider font-medium mb-1">
                  {item.category}
                </span>
                <h4 className="text-stone-100 font-serif text-lg font-normal mb-1">
                  {item.title}
                </h4>
                <p className="text-stone-300 text-xs font-light line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-300">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>View Full Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors z-20 cursor-pointer"
            aria-label="Close photo preview"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors z-20 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-stone-900/80 text-stone-300 hover:text-white border border-stone-700 transition-colors z-20 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="rounded-xl overflow-hidden border border-stone-800 shadow-2xl bg-black max-h-[70vh]">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="text-amber-400 text-xs font-medium uppercase tracking-wider">
                {activePhoto.category}
              </span>
              <h3 className="font-serif text-xl text-stone-100 font-normal mt-1">
                {activePhoto.title}
              </h3>
              <p className="text-stone-400 text-xs sm:text-sm font-light mt-1 max-w-xl mx-auto">
                {activePhoto.caption}
              </p>
              <div className="text-stone-600 text-xs mt-2">
                {selectedPhotoIndex! + 1} of {galleryItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
