import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedMenu } from './components/FeaturedMenu';
import { About } from './components/About';
import { FullMenu } from './components/FullMenu';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { LocationHours } from './components/LocationHours';
import { ReservationSection } from './components/ReservationSection';
import { ContactSection } from './components/ContactSection';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { TemplateGuideModal } from './components/TemplateGuideModal';

export default function App() {
  const [reservationDishNote, setReservationDishNote] = useState<string>('');

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleReserveClick = useCallback(() => {
    scrollToSection('reserve');
  }, [scrollToSection]);

  const handleViewMenuClick = useCallback(() => {
    scrollToSection('menu');
  }, [scrollToSection]);

  const handleReserveSpecificDish = useCallback(
    (dishName: string) => {
      setReservationDishNote(`Requested tasting: ${dishName}`);
      scrollToSection('reserve');
    },
    [scrollToSection]
  );

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Navbar */}
      <Navbar onReserveClick={handleReserveClick} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onReserveClick={handleReserveClick}
          onViewMenuClick={handleViewMenuClick}
        />

        {/* 3. Featured Menu (6 Highlights) */}
        <FeaturedMenu
          onExploreFullMenu={handleViewMenuClick}
          onReserveDish={handleReserveSpecificDish}
        />

        {/* 4. About & Culinary Story */}
        <About />

        {/* 5. Complete Menu with Categories & Filters */}
        <FullMenu onReserveDish={handleReserveSpecificDish} />

        {/* 6. Photo Gallery & Lightbox */}
        <Gallery />

        {/* 7. Guest Reviews */}
        <Reviews />

        {/* 8. Location & Operating Hours */}
        <LocationHours />

        {/* 9. Table Reservation Form & API Integration */}
        <ReservationSection initialRequest={reservationDishNote} />

        {/* 10. Contact & Event Inquiries */}
        <ContactSection />

        {/* 11. Final Call to Action */}
        <FinalCta onReserveClick={handleReserveClick} />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Template Sales / Customization Guide Drawer */}
      <TemplateGuideModal />
    </div>
  );
}
