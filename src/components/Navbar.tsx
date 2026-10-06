import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

interface NavbarProps {
  onReserveClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReserveClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Menu', href: '#menu' },
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-stone-950/60 backdrop-blur-xs border-b border-stone-800/40 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Single text element brand wordmark */}
          <a
            href="#home"
            className="font-serif text-2xl sm:text-3xl tracking-tight text-stone-100 hover:text-amber-400 transition-colors duration-200"
          >
            {restaurantConfig.name}
          </a>

          {/* Zone 2: Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-amber-400 transition-colors duration-150 py-1 border-b border-transparent hover:border-amber-400/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary action button + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${restaurantConfig.contact.phone}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 mr-2 py-2"
              title="Call Restaurant"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{restaurantConfig.contact.phoneFormatted}</span>
            </a>

            <button
              onClick={onReserveClick}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-stone-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-sm transition-all duration-200 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Reserve a Table</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-300 hover:text-white rounded-lg hover:bg-stone-800/60 focus:outline-hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-stone-950/98 border-b border-stone-800 px-6 py-6 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium text-stone-200">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="py-2 border-b border-stone-800/60 hover:text-amber-400 hover:border-amber-500/30 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`tel:${restaurantConfig.contact.phone}`}
                className="flex items-center gap-2 text-stone-300 py-1 text-sm"
              >
                <Phone className="w-4 h-4 text-amber-500" />
                <span>{restaurantConfig.contact.phoneFormatted}</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReserveClick();
                }}
                className="w-full mt-2 py-3 px-4 text-center text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg font-medium text-sm transition-colors cursor-pointer"
              >
                Reserve a Table
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
