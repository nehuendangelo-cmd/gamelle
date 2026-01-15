# January 🍳

**Plateforme de Partage de Plats Faits Maison** pour les étudiants de l'École 42.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL 15+ (ou compte Supabase/Neon)
- Application 42 OAuth configurée

### Installation

```bash
# Cloner le repo
git clone https://github.com/your-username/january.git
cd january

# Installer les dépendances
pnpm install

# Copier les variables d'environnement
cp .env.example .env
# Éditer .env avec vos credentials

# Générer le client Prisma
pnpm db:generate

# Appliquer le schema à la DB
pnpm db:push

# Lancer en développement
pnpm dev
```

### URLs de développement

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Prisma Studio:** `pnpm db:studio`

## 📁 Structure du Projet

```
january/
├── apps/
│   ├── web/          # Frontend Next.js 14
│   └── api/          # Backend Express.js
├── packages/
│   ├── shared/       # Types, schemas, utils partagés
│   └── database/     # Prisma client et schema
├── docs/             # Documentation
└── turbo.json        # Configuration Turborepo
```

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, TypeScript, Tailwind, shadcn/ui |
| Backend | Express.js, TypeScript, Prisma |
| Database | PostgreSQL (Supabase) |
| Auth | OAuth 42 + JWT |
| Images | Cloudinary |
| Email | Resend |

## 📜 Scripts Disponibles

```bash
pnpm dev          # Lancer frontend + backend en dev
pnpm build        # Build production
pnpm lint         # Linter
pnpm type-check   # Vérification TypeScript
pnpm db:generate  # Générer Prisma Client
pnpm db:push      # Push schema vers DB
pnpm db:migrate   # Créer migration
pnpm db:studio    # Ouvrir Prisma Studio
```

## 🔧 Configuration 42 OAuth

1. Créer une application sur https://profile.intra.42.fr/oauth/applications
2. Configurer le redirect URI: `http://localhost:3001/api/auth/42/callback`
3. Copier Client ID et Secret dans `.env`

## 📖 Documentation

- [PRD](docs/prd.md) - Product Requirements Document
- [Architecture](docs/architecture.md) - Architecture Technique
- [Frontend Spec](docs/front-end-spec.md) - Spécifications UI/UX

## 📄 License

MIT
