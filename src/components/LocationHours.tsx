import React from 'react';
import { MapPin, Clock, Phone, Mail, Navigation, Car } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';

export const LocationHours: React.FC = () => {
  const { address, hours, contact } = restaurantConfig;

  // Identify current day to highlight today's hours
  const todayIndex = new Date().getDay(); // 0 is Sunday, 1 Monday, etc.
  const isSunday = todayIndex === 0;
  const isMonday = todayIndex === 1;
  const isFriSat = todayIndex === 5 || todayIndex === 6;
  const isTueThu = todayIndex >= 2 && todayIndex <= 4;

  const isTodayMatching = (dayString: string) => {
    if (dayString.includes('Monday') && isMonday) return true;
    if (dayString.includes('Tuesday') && isTueThu) return true;
    if (dayString.includes('Friday') && isFriSat) return true;
    if (dayString.includes('Sunday') && isSunday) return true;
    return false;
  };

  return (
    <section id="location" className="py-24 bg-stone-900/30 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-2">
            <span>Find Us</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="text-stone-400">Hours & Directions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-tight mb-4">
            Join Us at The Table
          </h2>
          <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Nestled in the vibrant Downtown Arts District. Walk-ins warmly welcomed at the bar and chef's counter.
          </p>
        </div>

        {/* 2-Column Layout: Details on Left, Interactive Map on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Hours & Contact Information */}
          <div className="lg:col-span-5 space-y-8">
            {/* Hours Card */}
            <div className="p-6 sm:p-8 bg-stone-900/60 border border-stone-800 rounded-xl">
              <div className="flex items-center gap-2.5 text-stone-100 font-serif text-xl mb-6">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3>Hours of Service</h3>
              </div>

              <div className="space-y-4">
                {hours.map((item, idx) => {
                  const today = isTodayMatching(item.day);
                  return (
                    <div
                      key={idx}
                      className={`flex flex-col sm:flex-row sm:items-baseline justify-between py-2 border-b border-stone-800/60 last:border-0 ${
                        today ? 'bg-amber-400/5 -mx-3 px-3 rounded-lg border-amber-500/20' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${today ? 'font-semibold text-amber-300' : 'text-stone-300 font-medium'}`}>
                          {item.day}
                        </span>
                        {today && (
                          <span className="text-[10px] uppercase font-bold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">
                            Today
                          </span>
                        )}
                      </div>
                      <div className="text-right mt-1 sm:mt-0">
                        <span className={`text-sm tabular-nums ${today ? 'text-amber-200 font-medium' : 'text-stone-400'}`}>
                          {item.hours}
                        </span>
                        {item.note && (
                          <div className="text-[11px] text-stone-500">{item.note}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Quick Contacts */}
            <div className="p-6 sm:p-8 bg-stone-900/60 border border-stone-800 rounded-xl space-y-5">
              <div className="flex items-start gap-3.5">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-stone-200 text-sm font-medium mb-1">Our Location</h4>
                  <p className="text-stone-400 text-sm font-light leading-relaxed">
                    {address.street}<br />
                    {address.cityStateZip}<br />
                    <span className="text-stone-500 text-xs">{address.metroArea}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-stone-200 text-sm font-medium mb-1">Telephone Inquiries</h4>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-stone-300 hover:text-amber-400 text-sm font-light transition-colors"
                  >
                    {contact.phoneFormatted}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-stone-200 text-sm font-medium mb-1">Email Reservations</h4>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-stone-300 hover:text-amber-400 text-sm font-light transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 pt-2 border-t border-stone-800">
                <Car className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
                <p className="text-stone-400 text-xs font-light">
                  Complimentary valet parking is available at our Grand Boulevard portico every evening starting at 5:00 PM.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Embed Card */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="relative rounded-xl overflow-hidden border border-stone-800 shadow-xl bg-stone-950 flex-1 min-h-[420px]">
              {/* Google Maps Embed iframe */}
              <iframe
                title="Restaurant Location Map"
                src={address.mapEmbedUrl}
                className="w-full h-full min-h-[420px] border-0 filter grayscale invert contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Float Map Overlay Card with Directions CTA */}
              <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-stone-950/95 backdrop-blur-md border border-stone-800 p-4 rounded-xl shadow-2xl">
                <div className="font-serif text-stone-100 text-base mb-1">
                  {restaurantConfig.name}
                </div>
                <div className="text-xs text-stone-400 font-light mb-3">
                  {address.street}, {address.cityStateZip}
                </div>
                <a
                  href={address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-950 bg-amber-400 hover:bg-amber-300 px-3 py-1.5 rounded-md transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Driving Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
