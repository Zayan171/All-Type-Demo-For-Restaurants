# The Table – Premium Restaurant Website Demo & Sales Template

A modern, high-end, fully responsive restaurant website template engineered with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Vercel-compatible serverless backend API endpoints**.

Designed as a **white-label sales demo** for web agencies and freelancers to sell custom websites to restaurants, bistros, and hospitality groups.

---

## Key Features

- **100% Centralized Client Configuration (`src/data/restaurant.ts`)**: Rebrand the entire website for a new restaurant client in under 30 minutes without modifying component code.
- **Editorial Design Aesthetics**: Warm, refined typography pairing (*Playfair Display* + *Plus Jakarta Sans*), zero-pill metadata discipline, and high-contrast accessibility.
- **12 Production-Ready Sections**:
  1. **Navbar**: Brand wordmark, smooth navigation links, direct telephone action, table reservation CTA, and responsive mobile drawer.
  2. **Hero**: Cinematic food photography backdrop, balanced headline, CTA buttons, and subtle trust markers.
  3. **Featured Menu**: 6 chef's showcase dishes with dietary tags, prices in tabular numerals, and direct reservation triggers.
  4. **About**: Culinary origin story, executive chef spotlight, philosophy, and trust statistics (*10+ Years*, *50+ Dishes*, *4.9 Rating*, *100% Local*).
  5. **Complete Menu**: Interactive category filter (*Starters*, *Main Course*, *Burgers*, *Desserts*, *Drinks*), real-time dish search, and dietary preference filter.
  6. **Interactive Gallery**: Responsive masonry layout with category tabs (*Dishes*, *Interior*, *Atmosphere*) and full-screen lightbox modal with keyboard navigation.
  7. **Customer Reviews**: Realistic verified diner praise with 5-star ratings, occasion tags, and attribution.
  8. **Location & Hours**: Dynamic opening hours table highlighting today's hours, address, direct phone dial, and Google Maps embed with directions link.
  9. **Reservation System**: Validated table booking form with party size, date/time picker, and live submission to `POST /api/reservations`.
  10. **Concierge Contact**: Inquiry form with field validation and live submission to `POST /api/contact`.
  11. **Final Call to Action**: Warm conversion banner to capture reservations.
  12. **Footer**: Social links, opening hours, contact details, and copyright.
- **Vercel Serverless Ready**: Native `/api/reservations.ts` and `/api/contact.ts` serverless handlers.
- **Resilient Image System**: Built-in fallback container preventing broken image frames.

---

## Project Structure

```text
├── api/
│   ├── reservations.ts       # POST /api/reservations (Vercel serverless function & Express handler)
│   └── contact.ts            # POST /api/contact (Vercel serverless function & Express handler)
├── src/
│   ├── assets/
│   │   └── images/           # High-resolution generated photography assets
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── FeaturedMenu.tsx
│   │   ├── About.tsx
│   │   ├── FullMenu.tsx
│   │   ├── Gallery.tsx
│   │   ├── Reviews.tsx
│   │   ├── LocationHours.tsx
│   │   ├── ReservationSection.tsx
│   │   ├── ContactSection.tsx
│   │   ├── FinalCta.tsx
│   │   ├── Footer.tsx
│   │   ├── ImageWithFallback.tsx
│   │   └── TemplateGuideModal.tsx
│   ├── data/
│   │   └── restaurant.ts     # SINGLE SOURCE OF TRUTH FOR CLIENT CUSTOMIZATION
│   ├── types/
│   │   └── restaurant.ts     # TypeScript interfaces and contracts
│   ├── App.tsx
│   ├── index.css             # Tailwind CSS v4 styling & Google Font variables
│   └── main.tsx
├── server.ts                 # Full-stack Express server with Vite middleware in dev
├── vercel.json               # Vercel deployment configuration & API rewrites
├── .env.example              # Environment variables template
├── index.html                # SEO meta tags, Google Fonts, and Schema.org structured data
├── package.json
└── tsconfig.json
```

---

## 1. How to Install Dependencies

```bash
npm install
```

---

## 2. How to Run Locally

Start the full-stack server (runs Express with Vite dev middleware on port 3000):

```bash
npm run dev
```

Open your browser to:
`http://localhost:3000`

---

## 3. How to Test the Backend APIs

Both API endpoints are accessible locally and in production.

### Test POST `/api/reservations`

```bash
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Eleanor Vance",
    "email": "eleanor@example.com",
    "phone": "(555) 234-5678",
    "date": "2026-10-15",
    "time": "7:00 PM",
    "guests": 4,
    "seatingPreference": "Main Dining Room",
    "specialRequest": "Anniversary dinner by the window"
  }'
```

**Expected JSON Response (201 Created)**:
```json
{
  "success": true,
  "message": "Reservation confirmed for Eleanor Vance. A confirmation email will be delivered to eleanor@example.com.",
  "data": {
    "reservationId": "RES-...",
    "name": "Eleanor Vance",
    "email": "eleanor@example.com",
    "status": "Confirmed"
  }
}
```

### Test POST `/api/contact`

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Julian Miller",
    "email": "julian@example.com",
    "subject": "Private Dining & Buyout Events",
    "message": "Interested in booking the dining room for a private corporate dinner of 24 guests next month."
  }'
```

**Expected JSON Response (200 OK)**:
```json
{
  "success": true,
  "message": "Thank you, Julian Miller. Your message has been received.",
  "data": {
    "ticketId": "MSG-...",
    "status": "Received"
  }
}
```

---

## 4. How to Build for Production

Compile TypeScript and generate optimized production bundle into `dist/`:

```bash
npm run build
```

---

## 5. How to Deploy to Vercel

This repository is pre-configured for Vercel with zero additional configuration needed.

### Method A: Deploy via Vercel CLI

1. Install Vercel CLI (if not already installed):
   ```bash
   npm i -g vercel
   ```
2. Run deployment:
   ```bash
   vercel
   ```
3. For production deployment:
   ```bash
   vercel --prod
   ```

### Method B: Deploy via GitHub & Vercel Dashboard

1. Push this repository to GitHub or GitLab.
2. In the [Vercel Dashboard](https://vercel.com), click **Add New Project** and select the repository.
3. Vercel automatically detects the framework as **Vite**.
4. The included `vercel.json` ensures `/api/*` routes are executed as serverless functions and all other paths serve `dist/index.html`.
5. Click **Deploy**.

---

## 6. How to Customize for a New Restaurant Client

When onboarding a new restaurant client, you only need to edit **one single file**:

### `src/data/restaurant.ts`

In this file, update:
- `name`: Change `"The Table"` to the client's restaurant name.
- `tagline`: The client's brand motto (e.g., *"Farm-to-Table French Bistro"*).
- `address`: Street, city, state, zip code, and Google Maps embed URL.
- `contact`: Telephone number, reservations email, and general email.
- `hours`: Monday through Sunday operating hours and service notes.
- `chef`: Executive chef name, photo, and biographical quote.
- `stats`: Key accolades (*Years*, *Dishes*, *Rating*, *Sourcing*).
- `menuCategories` & `menuItems`: Complete list of dishes, categories, dietary badges, and prices.
- `reviews`: Real or sample customer reviews and publications.
- `gallery`: Visual photos of the venue and dishes.
- `reservationSettings`: Available seating times and party size limits.

### Optional: Connecting a Real Database or Email Provider

In `api/reservations.ts` and `api/contact.ts`, integration hooks are already stubbed for:
- **Resend / SendGrid**: To send automatic confirmation emails to diners and SMS/email alerts to the restaurant manager.
- **Supabase / Neon / PostgreSQL**: To persist reservations to an SQL database.
- **Google Calendar API**: To synchronize table reservations with the restaurant's operational calendar.

Set the keys in `.env` (refer to `.env.example`).
