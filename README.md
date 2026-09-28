# SOC Analyst L1 Learning Platform

A dedicated, professional learning platform for training Level 1 Security Operations Center (SOC) Analysts. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Prisma ORM with PostgreSQL, NextAuth.js, and Zustand.

---

## 🚀 Key Features

- **18 Educational Modules (Module 00–17)**: Complete progressive pathway from computer/networking fundamentals to SIEM, EDR, log analysis, OT security, and final assessment.
- **Clean Light Theme**: Focused, high-contrast, professional learning interface without dark cyberpunk clutter.
- **Interactive Scenarios & Visuals**: Visual diagrams, log flow architectures, decision trees, and knowledge checks.
- **Gamification Engine**: Experience points (XP), streak tracking, analyst levels, and milestone security badges.
- **Admin Management Portal**: Administrative tools to inspect student enrollments, module availability, and cohort analytics.
- **Dedicated External Lab Notice**: Clear boundaries between theoretical learning/scenarios and external hands-on range environments.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS & tailwindcss-animate
- **Database & ORM**: PostgreSQL & Prisma ORM
- **Authentication**: NextAuth.js (Credentials Provider with bcryptjs)
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion

---

## 📁 Project Structure

```
soc-analyst-platform/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── modules/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [moduleId]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── [topicId]/
│   │   │   │           └── page.tsx
│   │   │   ├── progress/
│   │   │   │   └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   │       ├── layout.tsx
│   │   │       ├── page.tsx
│   │   │       ├── users/
│   │   │       │   └── page.tsx
│   │   │       ├── modules/
│   │   │       │   └── page.tsx
│   │   │       └── analytics/
│   │   │           └── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── modules/
│   │   │   │   └── route.ts
│   │   │   ├── progress/
│   │   │   │   └── route.ts
│   │   │   └── admin/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── progress.tsx
│   │   │   └── tabs.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   ├── learning/
│   │   │   ├── module-card.tsx
│   │   │   ├── topic-card.tsx
│   │   │   └── progress-ring.tsx
│   │   ├── visuals/
│   │   │   └── README.md
│   │   └── admin/
│   │       └── README.md
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── types/
│   │   └── index.ts
│   ├── data/
│   │   └── modules/
│   │       └── README.md
│   └── store/
│       └── progress-store.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   └── assets/
│       └── visuals/
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Ensure `.env.local` is present with valid PostgreSQL connection:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/soc_platform"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret"
```

### 3. Database Migration & Seed
```bash
# Generate the Prisma client
npx prisma generate

# Push schema to PostgreSQL
npx prisma db push

# Seed the 18 modules, badges, and test accounts
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the platform.

---

## 🔑 Test Accounts

| Role | Email | Password |
|---|---|---|
| **Administrator** | `admin@socplatform.com` | `password123` |
| **Student Analyst** | `student@socplatform.com` | `password123` |
