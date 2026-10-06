import React, { useState } from 'react';
import { Sparkles, X, Code2, Server, Check, Copy, ArrowUpRight } from 'lucide-react';

export const TemplateGuideModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  return (
    <>
      {/* Floating Demo Badge */}
      <aside aria-label="Demo template guide" className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-2.5 bg-stone-900/90 hover:bg-stone-800 text-stone-200 border border-amber-500/40 hover:border-amber-400 rounded-full shadow-2xl backdrop-blur-md transition-all duration-200 text-xs font-medium cursor-pointer"
        >
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Agency Demo Guide</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition-transform" />
        </button>
      </aside>

      {/* Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close guide modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agency Sales & Customization Guide</span>
            </div>
            <h3 className="font-serif text-2xl text-stone-100 font-normal mb-3">
              How to White-Label for Restaurant Clients
            </h3>
            <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">
              This demo is engineered with a strict centralized data architecture. You can re-skin and launch a new client restaurant website in under 30 minutes.
            </p>

            {/* Step-by-Step Customization Cards */}
            <div className="space-y-4">
              {/* Card 1: Single Source of Truth */}
              <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-stone-200 font-medium text-sm">
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span>1. Replace Client Content in 1 File</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard('src/data/restaurant.ts')}
                    className="flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300"
                  >
                    {copiedPath === 'src/data/restaurant.ts' ? (
                      <>
                        <Check className="w-3 h-3 text-green-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy path</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-stone-400 font-light mb-2">
                  Edit <code className="text-amber-300 bg-stone-900 px-1.5 py-0.5 rounded">src/data/restaurant.ts</code> to update restaurant name, tagline, address, hours, menu dishes, prices, reviews, and gallery photos. No component code changes needed.
                </p>
              </div>

              {/* Card 2: Backend Endpoints */}
              <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-stone-200 font-medium text-sm">
                    <Server className="w-4 h-4 text-amber-400" />
                    <span>2. Production-Ready Backend APIs</span>
                  </div>
                </div>
                <p className="text-xs text-stone-400 font-light mb-2">
                  Endpoints already built and validated with error handling:
                </p>
                <div className="space-y-1 font-mono text-[11px] text-stone-300">
                  <div className="bg-stone-900 px-2 py-1 rounded flex justify-between">
                    <span>POST /api/reservations</span>
                    <span className="text-amber-400">Validated</span>
                  </div>
                  <div className="bg-stone-900 px-2 py-1 rounded flex justify-between">
                    <span>POST /api/contact</span>
                    <span className="text-amber-400">Validated</span>
                  </div>
                </div>
                <p className="text-xs text-stone-500 font-light mt-2">
                  Ready to link with Resend/SendGrid, Supabase/Neon PostgreSQL, or Google Calendar using <code className="text-amber-300">.env</code>.
                </p>
              </div>

              {/* Card 3: Vercel Deploy */}
              <div className="p-4 bg-stone-950/80 border border-stone-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-stone-200 font-medium text-sm">
                    <ArrowUpRight className="w-4 h-4 text-amber-400" />
                    <span>3. Deploy to Vercel in 1-Click</span>
                  </div>
                </div>
                <p className="text-xs text-stone-400 font-light">
                  Includes pre-configured <code className="text-amber-300 bg-stone-900 px-1.5 py-0.5 rounded">vercel.json</code> and serverless functions in <code className="text-amber-300 bg-stone-900 px-1.5 py-0.5 rounded">/api</code>. Push to GitHub and deploy straight to Vercel.
                </p>
              </div>
            </div>

            {/* Footer action */}
            <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-medium text-xs rounded-lg transition-colors cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
