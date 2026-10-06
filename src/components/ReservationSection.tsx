import React, { useState } from 'react';
import { Calendar, Clock, Users, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { ReservationFormData } from '../types/restaurant';

interface ReservationSectionProps {
  initialRequest?: string;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ initialRequest = '' }) => {
  const { reservationSettings } = restaurantConfig;

  // Format today's date as YYYY-MM-DD for min date
  const todayString = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    email: '',
    phone: '',
    date: todayString,
    time: reservationSettings.availableTimeSlots[2] || '6:00 PM',
    guests: 2,
    seatingPreference: 'Main Dining Room',
    specialRequest: initialRequest,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync if initialRequest changes (e.g. clicked "Reserve to taste" on a dish)
  React.useEffect(() => {
    if (initialRequest) {
      setFormData((prev) => ({
        ...prev,
        specialRequest: prev.specialRequest ? `${prev.specialRequest}; ${initialRequest}` : initialRequest,
      }));
    }
  }, [initialRequest]);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim() || phoneDigits.length < 7) {
      errors.phone = 'Please provide a valid telephone number.';
    }

    if (!formData.date) {
      errors.date = 'Please select a date.';
    }

    if (!formData.time) {
      errors.time = 'Please select a seating time.';
    }

    if (!formData.guests || formData.guests < 1) {
      errors.guests = 'Please select the number of guests.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        setSubmitError(data.message || 'Failed to complete reservation. Please review and try again.');
        setIsSubmitting(false);
        return;
      }

      // Success
      setSubmitSuccess(data.data);
      setIsSubmitting(false);
    } catch (err: any) {
      console.error('Reservation submit error:', err);
      setSubmitError('Unable to reach the reservation server. Please check your network or telephone us directly.');
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setSubmitSuccess(null);
    setFieldErrors({});
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: todayString,
      time: reservationSettings.availableTimeSlots[2] || '6:00 PM',
      guests: 2,
      seatingPreference: 'Main Dining Room',
      specialRequest: '',
    });
  };

  return (
    <section id="reserve" className="py-24 bg-stone-950 border-t border-stone-800 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Table Bookings</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="text-stone-400">Instant Confirmation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-tight mb-4">
            Reserve a Table
          </h2>
          <p className="text-sm sm:text-base text-stone-400 font-light max-w-xl mx-auto leading-relaxed">
            Reserve your evening in our dining room, intimate chef's counter, or heated terrace.
          </p>
        </div>

        {/* Success View */}
        {submitSuccess ? (
          <div className="bg-stone-900/80 border border-amber-500/30 rounded-2xl p-8 sm:p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-14 h-14 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-amber-400" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-normal mb-2">
                Table Reserved Successfully
              </h3>
              <p className="text-stone-300 text-sm mb-6 font-light">
                We look forward to welcoming you, <span className="text-amber-300 font-medium">{submitSuccess.name}</span>. A booking confirmation has been dispatched to{' '}
                <span className="text-amber-300">{submitSuccess.email}</span>.
              </p>

              {/* Booking Details Card */}
              <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 text-left mb-8 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-stone-800/80">
                  <span className="text-stone-400">Confirmation ID</span>
                  <span className="font-mono font-bold text-amber-400">{submitSuccess.reservationId}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/80">
                  <span className="text-stone-400">Date & Time</span>
                  <span className="text-stone-200 font-medium">{submitSuccess.date} at {submitSuccess.time}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/80">
                  <span className="text-stone-400">Party Size</span>
                  <span className="text-stone-200 font-medium">{submitSuccess.guests} Guest{submitSuccess.guests > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/80">
                  <span className="text-stone-400">Seating Area</span>
                  <span className="text-stone-200 font-medium">{submitSuccess.seatingPreference}</span>
                </div>
                {submitSuccess.specialRequest && (
                  <div className="py-1">
                    <span className="text-stone-400 block mb-1">Special Requests</span>
                    <span className="text-stone-300 italic">{submitSuccess.specialRequest}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={handleBookAnother}
                  className="w-full sm:w-auto px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-sm rounded-lg transition-colors cursor-pointer"
                >
                  Make Another Reservation
                </button>
                <a
                  href={`tel:${restaurantConfig.contact.phone}`}
                  className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-300 text-sm rounded-lg transition-colors"
                >
                  Call Reception
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Form View */
          <div className="bg-stone-900/60 border border-stone-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-3 text-red-200 text-sm">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>{submitError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                    }}
                    placeholder="e.g. Eleanor Vance"
                    className={`w-full px-4 py-3 bg-stone-950 border rounded-lg text-sm text-stone-100 placeholder-stone-600 focus:outline-hidden transition-colors ${
                      fieldErrors.name ? 'border-red-500 focus:border-red-400' : 'border-stone-800 focus:border-amber-400'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                    }}
                    placeholder="e.g. eleanor@example.com"
                    className={`w-full px-4 py-3 bg-stone-950 border rounded-lg text-sm text-stone-100 placeholder-stone-600 focus:outline-hidden transition-colors ${
                      fieldErrors.email ? 'border-red-500 focus:border-red-400' : 'border-stone-800 focus:border-amber-400'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                    Telephone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (fieldErrors.phone) setFieldErrors({ ...fieldErrors, phone: '' });
                    }}
                    placeholder="e.g. (555) 019-2834"
                    className={`w-full px-4 py-3 bg-stone-950 border rounded-lg text-sm text-stone-100 placeholder-stone-600 focus:outline-hidden transition-colors ${
                      fieldErrors.phone ? 'border-red-500 focus:border-red-400' : 'border-stone-800 focus:border-amber-400'
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                      className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                    >
                      {reservationSettings.guestRange.map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 3: Date, Time & Seating Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                    Date *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayString}
                      required
                      value={formData.date}
                      onChange={(e) => {
                        setFormData({ ...formData, date: e.target.value });
                        if (fieldErrors.date) setFieldErrors({ ...fieldErrors, date: '' });
                      }}
                      className={`w-full px-4 py-3 bg-stone-950 border rounded-lg text-sm text-stone-100 focus:outline-hidden transition-colors ${
                        fieldErrors.date ? 'border-red-500 focus:border-red-400' : 'border-stone-800 focus:border-amber-400'
                      }`}
                    />
                  </div>
                  {fieldErrors.date && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.date}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                    Seating Time *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                    >
                      {reservationSettings.availableTimeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                    Seating Area
                  </label>
                  <select
                    value={formData.seatingPreference}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        seatingPreference: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                  >
                    <option value="Main Dining Room">Main Dining Room</option>
                    <option value="Chef's Counter">Chef's Hearth Counter</option>
                    <option value="Covered Terrace">Covered Terrace</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                  Special Requests / Dietary Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.specialRequest}
                  onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                  placeholder="Anniversary celebration, dietary restrictions, quiet table preference..."
                  className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-100 placeholder-stone-600 focus:outline-hidden focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Policy Notes */}
              <div className="p-4 bg-stone-950/60 border border-stone-800/80 rounded-xl text-xs text-stone-400 font-light space-y-1">
                <p>✦ {reservationSettings.notice}</p>
                <p>✦ {reservationSettings.cancellationPolicy}</p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-stone-950 font-medium text-sm sm:text-base rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-stone-950" />
                    <span>Confirming Table Availability...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5 text-stone-950" />
                    <span>Confirm Table Reservation</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
