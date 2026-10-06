import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, MessageSquare } from 'lucide-react';
import { restaurantConfig } from '../data/restaurant';
import { ContactFormData } from '../types/restaurant';

export const ContactSection: React.FC = () => {
  const { contact } = restaurantConfig;

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'General Dining Question',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide a message of at least 10 characters.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
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
        setSubmitError(data.message || 'Failed to deliver message. Please try again.');
        setIsSubmitting(false);
        return;
      }

      setSubmitSuccess(data.data);
      setIsSubmitting(false);
    } catch (err) {
      console.error('Contact submit error:', err);
      setSubmitError('Unable to send message at this time. Please call us directly.');
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitSuccess(null);
    setFormData({
      name: '',
      email: '',
      subject: 'General Dining Question',
      message: '',
    });
    setFieldErrors({});
  };

  return (
    <section id="contact" className="py-24 bg-stone-900/30 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest uppercase text-amber-500 mb-2">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Hospitality Concierge</span>
            <span aria-hidden="true" className="text-stone-700">·</span>
            <span className="text-stone-400">Direct Inquiries</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-stone-100 font-normal tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-stone-400 font-light leading-relaxed">
            Have questions regarding private celebrations, buyout dining, or dietary accommodations? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          {/* Left Column: Direct Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 bg-stone-900/80 border border-stone-800 rounded-2xl">
              <h3 className="font-serif text-xl text-stone-100 mb-4">
                Hospitality Concierge
              </h3>
              <p className="text-stone-400 text-sm font-light leading-relaxed mb-6">
                Our front-of-house team reviews all incoming inquiries promptly.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 mt-1" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-500 block">General Desk</span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-sm text-stone-200 hover:text-amber-400 transition-colors"
                    >
                      {contact.phoneFormatted}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 mt-1" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-500 block">Reservations & Events</span>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-stone-200 hover:text-amber-400 transition-colors break-all"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 mt-1" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-stone-500 block">Press & Partnerships</span>
                    <a
                      href={`mailto:${contact.pressEmail}`}
                      className="text-sm text-stone-200 hover:text-amber-400 transition-colors break-all"
                    >
                      {contact.pressEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-800 text-xs text-stone-500 leading-relaxed font-light">
                For urgent same-day seating changes, please phone our front desk directly during service hours for immediate assistance.
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-stone-900/60 border border-stone-800 rounded-2xl shadow-xl">
              {submitSuccess ? (
                <div className="text-center py-8 animate-in fade-in duration-300">
                  <div className="w-12 h-12 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-400/20">
                    <CheckCircle2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <h4 className="font-serif text-2xl text-stone-100 mb-2">Message Sent</h4>
                  <p className="text-sm text-stone-300 font-light mb-6">
                    Thank you, <span className="text-amber-300">{submitSuccess.name}</span>. Ticket #{submitSuccess.ticketId} has been logged. We will reach back out shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs sm:text-sm font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-3 text-red-200 text-sm">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                      }}
                      placeholder="e.g. Thomas Keller"
                      className={`w-full px-4 py-3 bg-stone-950 border rounded-lg text-sm text-stone-100 placeholder-stone-600 focus:outline-hidden transition-colors ${
                        fieldErrors.name ? 'border-red-500' : 'border-stone-800 focus:border-amber-400'
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
                      placeholder="e.g. thomas@example.com"
                      className={`w-full px-4 py-3 bg-stone-950 border rounded-lg text-sm text-stone-100 placeholder-stone-600 focus:outline-hidden transition-colors ${
                        fieldErrors.email ? 'border-red-500' : 'border-stone-800 focus:border-amber-400'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                      Topic
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-stone-950 border border-stone-800 rounded-lg text-sm text-stone-100 focus:outline-hidden focus:border-amber-400 transition-colors"
                    >
                      <option value="General Dining Question">General Dining Question</option>
                      <option value="Private Dining & Buyout Events">Private Dining & Buyout Events</option>
                      <option value="Dietary & Allergen Inquiries">Dietary & Allergen Inquiries</option>
                      <option value="Press & Media Relations">Press & Media Relations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium uppercase tracking-wider text-stone-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                      }}
                      placeholder="Share your inquiry or celebration details with our team..."
                      className={`w-full px-4 py-3 bg-stone-950 border rounded-lg text-sm text-stone-100 placeholder-stone-600 focus:outline-hidden transition-colors ${
                        fieldErrors.message ? 'border-red-500' : 'border-stone-800 focus:border-amber-400'
                      }`}
                    />
                    {fieldErrors.message && (
                      <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-stone-950 font-medium text-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-stone-950" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
