# 🚗 Velocity — Luxury Rent A Car Platform

Premium, futuristic full-stack rent-a-car platform. Monorepo with a Node.js/Express backend and a Next.js 14 + TypeScript frontend, designed around a swappable repository layer so you can ship today on mock data and flip a single env var to go live on MongoDB.

![tech](https://img.shields.io/badge/Next.js-14-black) ![tech](https://img.shields.io/badge/TypeScript-5-blue) ![tech](https://img.shields.io/badge/Express-4-green) ![tech](https://img.shields.io/badge/MongoDB-Ready-success)

## Highlights

- **11-section home page** — hero with reservation widget, categories, featured fleet, why-us, how-it-works, parallax showcase, stats, testimonials carousel, blog teaser, FAQ accordion, CTA banner
- **Full booking flow** — `/cars` listing with sidebar filters & pagination, `/cars/[slug]` detail with image gallery + sticky booking form, real-time price calculation, Zod-validated POST `/api/bookings` with concierge email (nodemailer)
- **Premium dark aesthetic** — Midnight + Royal Blue + Champagne Gold palette, Playfair Display + Inter + Bebas Neue typography, Framer Motion scroll/parallax, Lenis smooth scroll, TanStack Query data layer
- **Production discipline** — Helmet, rate-limiting, CORS allow-list, Zod request validation everywhere, repository pattern (mock ↔ Mongo), sitemap.ts + robots.ts, GDPR cookie banner, custom 404, SEO metadata template

## Stack

| Layer | Tech |
|---|---|
| **Frontend** | Next.js 14 App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis, TanStack Query, Axios, Lucide icons |
| **Backend** | Node.js + Express, Mongoose schemas, Zod validators, Nodemailer, Helmet, express-rate-limit |
| **Data** | Repository pattern: in-memory mock (default) ↔ MongoDB (zero controller changes) |

## Quick Start

```bash
# Backend
cd backend
cp .env.example .env
npm install
npm run dev          # http://localhost:5000  (mock data, instant)

# Frontend — second terminal
cd frontend
cp .env.local.example .env.local
npm install
npm run dev          # http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000). The frontend talks to the backend via `NEXT_PUBLIC_API_URL`.

## Project Structure

```
velocity/
├── backend/
│   ├── src/
│   │   ├── config/           # env, db
│   │   ├── controllers/      # thin Express handlers (6)
│   │   ├── services/         # business logic (6)
│   │   ├── repositories/     # mock + mongo impls behind one interface
│   │   ├── models/           # Mongoose schemas (6)
│   │   ├── routes/           # /api/{cars,categories,bookings,reviews,blogs,faqs}
│   │   ├── validators/       # Zod schemas
│   │   ├── middleware/       # validate, error, asyncHandler
│   │   ├── utils/            # ApiError, ApiResponse, sendEmail, logger
│   │   └── seeders/          # 12 cars, 6 categories, 8 reviews, 8 FAQs, 4 blog posts
│   └── server.js
└── frontend/
    ├── app/                  # Home + /cars, /cars/[slug], /about, /services,
    │                         # /contact, /blog, /blog/[slug], not-found, sitemap, robots
    ├── components/
    │   ├── layout/           # Navbar, Footer, FloatingButtons, CookieBanner
    │   ├── home/             # 11 sections
    │   ├── cars/             # CarCard, Filters, Gallery, BookingForm
    │   └── ui/               # Container, ScrollReveal, SectionHeading, Counter, Skeleton
    ├── hooks/                # useApi (TanStack Query wrappers)
    ├── lib/                  # api client, constants, utils, queryClient
    └── types/
```

## API Endpoints

| Method | Path | Notes |
|---|---|---|
| GET | `/api/health` | service heartbeat |
| GET | `/api/cars` | list + filter (`category`, `brand`, `minPrice`, `maxPrice`, `transmission`, `fuelType`, `year`, `featured`, `search`, `sort`, `page`, `limit`) |
| GET | `/api/cars/featured` | curated featured fleet |
| GET | `/api/cars/category/:slug` | filter by category |
| GET | `/api/cars/slug/:slug` | detail by slug |
| GET | `/api/cars/:id` | detail by id |
| POST · PUT · DELETE | `/api/cars` (admin) | CRUD with Zod validation |
| GET | `/api/categories` | with live `carCount` |
| GET · POST · PUT · DELETE | `/api/categories[/:id]` | CRUD |
| POST | `/api/bookings` | creates booking, calculates `totalPrice`, fires concierge email |
| GET · GET `:id` · PUT `:id/status` | `/api/bookings` | list / detail / status update |
| GET · GET `featured` · POST | `/api/reviews` | list / featured / create |
| GET · GET `:slug` · POST | `/api/blogs` | list / detail / create |
| GET · POST | `/api/faqs` | list / create |

All list endpoints return `{ success, data, meta: { total, page, limit, totalPages } }`.

## Switching Mock → MongoDB

In `backend/.env`:

```env
DATA_SOURCE=mongo
MONGO_URI=mongodb://localhost:27017/velocity
```

Then seed it:

```bash
cd backend
npm run seed:mongo
```

That's it — no controller, service or route changes required. The repository factory in `backend/src/repositories/index.js` selects the implementation at boot.

## Environment Reference

### `backend/.env`

| Var | Default | Purpose |
|---|---|---|
| `PORT` | `5000` | API port |
| `NODE_ENV` | `development` | |
| `DATA_SOURCE` | `mock` | `mock` or `mongo` |
| `MONGO_URI` | `mongodb://localhost:27017/velocity` | only used when `DATA_SOURCE=mongo` |
| `CORS_ORIGINS` | `http://localhost:3000` | comma-separated allow-list |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `BOOKING_NOTIFICATION_EMAIL` | — | optional; if any are missing, booking emails fall back to console logging in dev |

### `frontend/.env.local`

| Var | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Express base URL |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | used for sitemap/robots/canonical |
| `NEXT_PUBLIC_WHATSAPP` | `994501112233` | floating WhatsApp number (no `+`) |
| `NEXT_PUBLIC_PHONE` | `+994501112233` | floating call CTA |
| `NEXT_PUBLIC_EMAIL` | `concierge@velocity.az` | footer/contact |

## Production Build

```bash
# Backend
cd backend && NODE_ENV=production node server.js

# Frontend
cd frontend
npm run build
npm start                    # http://localhost:3000
```

## Deployment Notes

- **Frontend** → Vercel / Netlify (Next.js 14, App Router). Set `NEXT_PUBLIC_*` env vars.
- **Backend** → Render / Railway / Fly.io / a plain Node host. Set the env vars from the table above; switch `DATA_SOURCE=mongo` and provide a `MONGO_URI`.
- **Database** → MongoDB Atlas free tier works fine. Run `npm run seed:mongo` once after first deploy.
- Configure `CORS_ORIGINS` to your deployed frontend domain.

## Scripts

```bash
# backend/
npm run dev           # nodemon
npm start             # node server.js
npm run seed:mongo    # populate MongoDB

# frontend/
npm run dev           # Next dev server
npm run build         # production build
npm start             # serve production build
npm run lint          # eslint
```

## License

MIT — built with care for the Velocity concept.
