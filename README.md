# SOC Analyst L1 - Learning Platform

Professional interactive training platform for SOC Analyst Level 1 certification.

## Features

- ✅ 18 Complete Modules (Fundamentals to Advanced Incident Scenarios)
- ✅ Interactive Learning Units & Micro-lessons
- ✅ Animated Visual Diagrams & Incident Flowcharts
- ✅ Knowledge Checks with Instant Feedback & Explanations
- ✅ Investigation Scenarios & Threat Analysis
- ✅ XP & Leveling System with Real-Time Calculations
- ✅ Automated Achievement Badges
- ✅ Progress Tracking with Local & Persistent Storage
- ✅ Admin Dashboard with User Management & Analytics
- ✅ Global Content Search (⌘K / Ctrl+K)
- ✅ Light Professional Theme Design
- ✅ External Lab Integration Framework

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Database**: PostgreSQL + Prisma ORM (with transparent local JSON fallback)
- **Authentication**: NextAuth.js (Credentials Provider with bcryptjs)
- **Styling**: Tailwind CSS & CSS Variables
- **UI Components**: shadcn/ui & Radix UI primitives
- **Animations**: Framer Motion
- **State Management**: Zustand (with localStorage persistence)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (or automatic fallback store)

### Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local

# Configure your database URL in .env.local
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/soc_platform"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Push database schema
npx prisma db push

# Seed database
npx prisma db seed

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Default Users

**Student Account:**
- Email: `student@socplatform.com`
- Password: `password123`

**Admin Account:**
- Email: `admin@socplatform.com`
- Password: `password123`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Main student dashboard & modules
│   │   ├── modules/       # 18 training modules & topics
│   │   ├── profile/       # User profile, badges & progress
│   │   ├── progress/      # Overall curriculum progression
│   │   ├── loading.tsx    # Dashboard loading state
│   │   ├── error.tsx      # Dashboard error boundary
│   │   └── not-found.tsx  # 404 page
│   ├── (admin)/           # Admin management panel
│   │   └── admin/         # Users, modules, analytics, badges
│   └── api/               # API routes (auth, progress, xp, admin)
├── components/            # React components
│   ├── ui/               # Base UI components (dialog, toast, cards, etc.)
│   ├── layout/           # Header, sidebar, global search
│   ├── learning/         # Module learning, knowledge checks, visuals
│   └── admin/            # Admin widgets & data tables
├── lib/                   # Database client, auth, and utilities
├── store/                # Zustand progress & state store
├── types/                # TypeScript type definitions
└── data/                 # Course content & module curricula

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Seed data

public/
└── assets/              # Static assets & diagrams
```

## Development

```bash
# Run dev server
npm run dev

# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Database management
npx prisma studio
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project into Vercel
3. Configure environment variables (`DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`)
4. Deploy

### Database

Use Vercel Postgres, Supabase, Neon, or any PostgreSQL provider.

## License

Proprietary - All Rights Reserved

## Support

For support, contact: support@socplatform.com
