import React from 'react';
import { restaurantConfig } from '../data/restaurant';
import { MapPin, Phone, Mail, Instagram, Facebook, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-300 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-14 border-b border-stone-800/80">
          {/* Col 1 & 2: Brand & Story */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#home"
              className="font-serif text-3xl text-stone-100 hover:text-amber-400 transition-colors inline-block"
            >
              {restaurantConfig.name}
            </a>
            <p className="text-stone-400 text-sm font-light max-w-sm leading-relaxed">
              {restaurantConfig.shortDescription}
            </p>
            <div className="pt-2 flex items-center gap-3">
              {restaurantConfig.socialLinks.map((item) => (
                <a
                  key={item.platform}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
                  aria-label={item.platform}
                >
                  {getSocialIcon(item.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-stone-100 font-serif text-base mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm text-stone-400 font-light">
              <li>
                <a href="#home" className="hover:text-amber-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  Seasonal Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition-colors">
                  Our Story & Chef
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-amber-400 transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors">
                  Guest Reviews
                </a>
              </li>
              <li>
                <a href="#reserve" className="hover:text-amber-400 transition-colors">
                  Reserve a Table
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Opening Hours */}
          <div>
            <h4 className="text-stone-100 font-serif text-base mb-4">Hours</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400 font-light">
              {restaurantConfig.hours.map((h, i) => (
                <li key={i} className="pb-1.5 border-b border-stone-900 last:border-0">
                  <div className="text-stone-300 font-medium">{h.day}</div>
                  <div className="text-amber-400/90 tabular-nums">{h.hours}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact Info */}
          <div>
            <h4 className="text-stone-100 font-serif text-base mb-4">Contact</h4>
            <div className="space-y-3 text-xs sm:text-sm text-stone-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{restaurantConfig.address.street}, {restaurantConfig.address.cityStateZip}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${restaurantConfig.contact.phone}`}
                  className="hover:text-amber-400 transition-colors"
                >
                  {restaurantConfig.contact.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${restaurantConfig.contact.email}`}
                  className="hover:text-amber-400 transition-colors break-all"
                >
                  {restaurantConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Demo Template Notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <div>
            © {currentYear} {restaurantConfig.name}. All rights reserved.
          </div>
          <div className="text-center sm:text-right text-stone-500">
            <span>Modern Restaurant Website Demo Template · Clean Architecture & API Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
