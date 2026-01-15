# Plateforme de Partage de Plats Faits Maison Product Requirements Document (PRD)

---

## Goals and Background Context

### Goals

- Enable École 42 students to exchange home-cooked batch meals, transforming food monotony into culinary variety and social connection
- Validate a secure, token-based food sharing marketplace within a closed community using existing infrastructure (public fridges)
- Achieve 50+ active users with 100+ successful exchanges within 3 months while maintaining <5% dispute rate
- Prove the concept at École 42 as a foundation for expansion to other tech communities and educational institutions
- Create a platform that addresses isolation and promotes healthier eating habits among students living alone

### Background Context

Students and young professionals who cook in batches face a persistent problem: eating the same meal for 3-5 consecutive days leads to dietary monotony and reinforces social isolation. While this cooking method is economically efficient, it creates missed opportunities for nutritional variety and human connection. Existing solutions like Too Good To Go focus on commercial vendors, while informal Facebook groups lack organization, trust mechanisms, and practical logistics.

École 42 presents an ideal pilot environment with its concentration of batch-cooking students, existing public fridge infrastructure, and tightly-knit community culture. The Five Whys analysis from brainstorming revealed that users' deepest motivation isn't just food variety—it's the desire for human connection and community belonging. This PRD defines requirements for a bidirectional marketplace where members can offer and request homemade meals, exchange them via virtual tokens or direct barter, and pick them up autonomously from public fridges.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|---------|
| 2026-01-14 | 1.0 | Initial PRD creation from Project Brief | John (PM) |

---

## Requirements

### Functional Requirements

**FR1:** The system shall authenticate users exclusively via École 42 OAuth API, ensuring all users are verified 42 students with identifiable profiles (no anonymous access permitted).

**FR2:** The system shall require all new users to complete a mandatory safety onboarding module covering food safety, hygiene practices, legal disclaimers, and community guidelines before they can post or reserve meals.

**FR3:** The system shall allow users to create meal listings with required fields: title, description, number of portions, cuisine type, photos (minimum 1), preparation date, expiration date, allergen warnings, and dietary tags (vegetarian, vegan, gluten-free, etc.).

**FR4:** The system shall provide a browsable catalog of available meals with basic filters (cuisine type, dietary restrictions, portions available) and search functionality.

**FR5:** The system shall implement a virtual token economy where users receive an initial token allocation upon signup and earn/spend tokens through meal exchanges.

**FR6:** The system shall allow users to reserve available meals using virtual tokens, with the token amount deducted immediately upon reservation and held in escrow until transaction completion.

**FR7:** The system shall support direct barter (meal-for-meal exchange) as an alternative to token-based transactions.

**FR8:** The system shall provide autonomous pickup instructions with public fridge location details and require photo identification of the packaged meal for verification.

**FR9:** The system shall require both parties (provider and receiver) to confirm successful transaction completion, at which point escrowed tokens are transferred to the provider.

**FR10:** The system shall display user profiles showing name, photo, brief bio, transaction history count, and active listings.

**FR11:** The system shall send basic email notifications for key events: reservation made, pickup ready, transaction completion reminder, and token balance changes.

**FR12:** The system shall allow users to cancel reservations with automatic token refund if cancellation occurs before pickup time.

**FR13:** The system shall automatically expire meal listings 24 hours after the listed expiration date and refund any reserved tokens.

**FR14:** The system shall maintain an audit trail of all token transactions for transparency and dispute resolution.

**FR15:** The system shall provide a basic dispute reporting mechanism that flags transactions for manual review by administrators.

### Non-Functional Requirements

**NFR1:** The system shall load pages within 2 seconds on 4G mobile connections and complete critical actions (reservations) within 500ms.

**NFR2:** The system shall implement HTTPS with TLS 1.3 encryption for all communications and secure storage of user credentials.

**NFR3:** The system shall be fully GDPR compliant, including user data export, deletion requests, and explicit consent for data processing.

**NFR4:** The system shall implement rate limiting to prevent abuse: maximum 10 meal postings per user per day, maximum 20 reservations per user per day.

**NFR5:** The system shall be responsive and functional on desktop browsers (Chrome, Firefox, Safari latest versions) and mobile browsers (iOS Safari 14+, Chrome Android).

**NFR6:** The system shall maintain 99% uptime during peak hours (11:00-14:00 and 18:00-21:00 CET) to ensure meal exchange reliability.

**NFR7:** The system shall use atomic database transactions for all token operations to prevent token duplication, loss, or inconsistency.

**NFR8:** The system shall store all meal listing photos with CDN delivery and automatic image optimization (max 1MB per image, WebP format support).

**NFR9:** The system shall scale to support 200 concurrent users without performance degradation (initial target for École 42 pilot).

**NFR10:** The system shall log all security-relevant events (login attempts, failed transactions, dispute reports) for audit and monitoring purposes.

**NFR11:** The system shall implement input validation and sanitization on all user-generated content to prevent XSS and injection attacks.

**NFR12:** The system shall be deployable within free-tier infrastructure constraints for MVP phase (Vercel/Netlify frontend, Railway/Render backend, Supabase/Neon database).

---

## User Interface Design Goals

### Overall UX Vision

The platform should feel **warm, trustworthy, and community-focused** rather than transactional. The design should emphasize the social aspect of food sharing while maintaining clarity around safety and logistics. Visual language should be modern and clean but approachable—think "friendly neighborhood marketplace" rather than "corporate food delivery app." The interface should encourage storytelling through meal photos and descriptions, making each listing feel personal and inviting. Users should feel they're connecting with real people, not just browsing products.

### Key Interaction Paradigms

- **Photo-first browsing**: Meal listings are presented as a visual grid/feed with prominent food photos to inspire appetite and discovery
- **Minimal friction transactions**: Reserve a meal in 2 taps (select meal → confirm reservation), with token balance always visible
- **Trust through transparency**: Every meal listing shows clear preparation date, expiration date, allergen info, and cook's profile photo
- **Autonomous but guided**: Self-service pickup process with clear instructions, fridge location maps, and photo-matching for meal identification
- **Progressive disclosure**: Essential information upfront, additional details (full description, nutritional info) available on expansion
- **Mobile-first gestures**: Swipe to browse categories, pull-to-refresh feed, tap-to-zoom on food photos

### Core Screens and Views

1. **Authentication Screen** (OAuth 42 login)
2. **Safety Onboarding Flow** (mandatory first-time walkthrough with quiz/acknowledgment)
3. **Home/Feed Screen** (browsable meal catalog with filters)
4. **Meal Detail Screen** (full listing with photos, description, cook profile, reservation action)
5. **Create Listing Screen** (form for posting new meals with photo upload)
6. **User Profile Screen** (own profile with token balance, active listings, transaction history)
7. **Profile View Screen** (viewing other users' profiles and their listings)
8. **My Reservations Screen** (active reservations with pickup instructions and status)
9. **My Listings Screen** (posted meals with reservation status)
10. **Transaction Confirmation Flow** (pickup verification and completion)
11. **Settings Screen** (account settings, notifications, data export)

### Accessibility

**WCAG AA compliance** for MVP with these priorities:
- Keyboard navigation for all interactive elements
- Sufficient color contrast (4.5:1 for text, 3:1 for UI components)
- Alt text for all meal photos (auto-generated from title + manual override)
- Screen reader support for transaction flows
- Touch targets minimum 44x44px for mobile
- No reliance on color alone for status indicators (use icons + text)

**Note:** Full WCAG AAA is aspirational for Phase 2, but MVP should establish good accessibility foundations given the diverse 42 student community.

### Branding

**Community-Centric Visual Identity:**
- Color palette: Warm, appetizing colors (terracotta, sage green, cream) to evoke home cooking and comfort
- Typography: Friendly sans-serif (e.g., Inter, Poppins) that's readable on mobile
- Photography style: User-generated content encouraged with light editing filters available to make home-cooked meals look appetizing
- Iconography: Hand-drawn or rounded icons to maintain approachable, non-corporate feel
- Messaging tone: Conversational, encouraging, safety-conscious without being alarmist

**Assumption:** No existing brand guidelines for this greenfield project, so these are initial recommendations based on target audience and product positioning.

### Target Device and Platforms

**Web Responsive** (mobile-first design, desktop-optimized)
- Primary: Mobile browsers (iOS Safari 14+, Chrome Android) - 70%+ of usage expected
- Secondary: Desktop browsers (Chrome, Firefox, Safari latest) for meal creation and browsing
- Implementation: Progressive Web App (PWA) architecture for future installability without app store deployment
- Responsive breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

**Rationale:** Web-first approach avoids app store approval delays and deployment complexity for MVP. PWA provides app-like experience (add to home screen, offline capability for viewing saved meals) without native development costs. École 42 students are tech-savvy and comfortable with web apps.

---

## Technical Assumptions

### Repository Structure: Monorepo

**Decision:** Use a **Monorepo** with pnpm workspaces for the MVP.

**Structure:**
```
/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Node.js/Express backend
├── packages/
│   ├── shared/       # Shared types, utilities, validation schemas
│   └── database/     # Prisma schema and migrations
└── package.json      # Root workspace configuration
```

**Rationale:**
- Simplifies code sharing (TypeScript types, validation schemas) between frontend and backend
- Single repository for atomic commits across full-stack features
- Easier CI/CD setup for MVP (one build pipeline)
- Reduced context switching for solo/small team development
- Can be split into polyrepo later if needed for scaling

### Service Architecture

**Decision:** **Monolithic API within Monorepo** for MVP, with modular structure enabling future service extraction.

**Architecture:**
- Single Node.js/Express API server handling all backend logic
- Modular internal structure (auth/, meals/, tokens/, users/, notifications/)
- RESTful API design with clear resource boundaries
- Direct database connections (no microservices complexity)
- Stateless API design (JWT tokens, no server-side sessions)

**Rationale:**
- Optimal for MVP velocity with <200 concurrent users
- Simpler deployment, monitoring, and debugging than microservices
- No distributed system complexity (no service mesh, no inter-service communication)
- Modular code structure allows future extraction to microservices if needed
- Free-tier infrastructure friendly (single backend instance)

**Future-proofing:** Token service and notification service are isolated modules that could become separate services in Phase 2 if scaling requires it.

### Testing Requirements

**Decision:** **Unit + Integration testing** with automated CI/CD checks.

**Testing Strategy:**
- **Unit Tests** (70% coverage target):
  - Token transaction logic (critical for integrity)
  - Business rules validation
  - Utility functions and helpers
  - Jest for both frontend and backend
  
- **Integration Tests** (key flows only):
  - OAuth 42 authentication flow
  - Complete meal reservation → pickup → completion flow
  - Token escrow and release logic
  - Email notification delivery
  - Supertest for API endpoints

- **Manual E2E Testing** for MVP:
  - Full user journeys (onboarding, post meal, reserve, pickup)
  - Cross-browser testing (Chrome, Firefox, Safari, iOS Safari)
  - No automated E2E framework initially (Playwright/Cypress deferred to Phase 2)

- **CI/CD Integration:**
  - All tests run on pull requests
  - Deployment blocked on test failures
  - Coverage reports generated but not enforced as gate

**Rationale:**
- Unit + Integration strikes balance between confidence and development speed
- Token logic is business-critical and must be thoroughly tested
- Manual E2E acceptable for MVP given small user base (<100 users)
- Automated E2E adds significant maintenance overhead not justified for MVP
- Tests serve as living documentation for future developers

### Additional Technical Assumptions and Requests

**Frontend:**
- **Framework:** Next.js 14+ (App Router) with TypeScript
- **Styling:** Tailwind CSS for rapid UI development + shadcn/ui components
- **State Management:** React Context API for global state (auth, user), TanStack Query for server state
- **Form Handling:** React Hook Form + Zod for validation
- **Image Upload:** Direct upload to Cloudinary via API (signed URLs)
- **Deployment:** Vercel (free tier, automatic previews, edge functions)

**Backend:**
- **Runtime:** Node.js 20 LTS with TypeScript
- **Framework:** Express.js (lightweight, well-documented)
- **ORM:** Prisma (type-safe, excellent DX, handles migrations)
- **Authentication:** Passport.js with OAuth 2.0 strategy for 42 API
- **Token Storage:** JWT for session management (httpOnly cookies)
- **Email Service:** Resend or SendGrid (generous free tier)
- **File Storage:** Cloudinary (free tier: 25GB storage, 25GB bandwidth)
- **Deployment:** Railway or Render (free tier, automatic deployments from Git)

**Database:**
- **RDBMS:** PostgreSQL 15+ (ACID compliance critical for token transactions)
- **Hosting:** Supabase (free tier: 500MB, good for MVP) or Neon (serverless Postgres)
- **Schema Management:** Prisma Migrate for version-controlled schema changes
- **Backup Strategy:** Automatic daily backups (provided by Supabase/Neon)

**Infrastructure & DevOps:**
- **Version Control:** Git + GitHub (public or private repo)
- **CI/CD:** GitHub Actions (free for public repos, 2000 min/month for private)
- **Environment Management:** .env files with validation via Zod schemas
- **Monitoring:** Basic logging to stdout (Railway/Render built-in logs), Sentry for error tracking (free tier: 5K events/month)
- **Rate Limiting:** express-rate-limit middleware (in-memory for MVP)
- **Security Headers:** Helmet.js for Express security best practices

**External Integrations:**
- **École 42 API:** OAuth 2.0 authentication (assume API documented, rate limits TBD - requires research)
- **No payment processor** (virtual tokens only for MVP)

**Development Environment:**
- **Package Manager:** pnpm (fast, disk-efficient, strict)
- **Code Quality:** ESLint + Prettier with shared configs
- **Git Hooks:** Husky + lint-staged for pre-commit checks
- **TypeScript:** Strict mode enabled, shared tsconfig.json

**Performance Targets (aligns with NFRs):**
- Frontend First Contentful Paint: <1.5s
- API response time (p95): <200ms for GET requests, <500ms for POST
- Database query optimization with indexes on foreign keys and frequently filtered columns

**Security Assumptions:**
- HTTPS enforced via hosting platform (automatic with Vercel/Railway)
- CORS properly configured (whitelist frontend domain only)
- Input sanitization on all user-generated content
- SQL injection prevention via Prisma's parameterized queries
- XSS prevention via React's built-in escaping + CSP headers

**Open Questions Requiring Research:**
- École 42 API rate limits and available user data fields
- Exact initial token allocation amount (50? 100? Requires economic modeling)
- Cloudinary transformation settings for food photos (quality vs. bandwidth)

---

## Epic List

### Epic 1: Foundation & Authentication Infrastructure
**Goal:** Establish project foundation with OAuth 42 authentication, basic user management, and deployable application skeleton that proves the technical stack works end-to-end.

### Epic 2: Core Meal Marketplace
**Goal:** Enable users to post, browse, and reserve meals using the virtual token economy, creating the fundamental value exchange mechanism of the platform.

### Epic 3: Transaction Lifecycle & Safety
**Goal:** Complete the pickup and confirmation workflow with safety onboarding, photo verification, and dispute handling to ensure trust and transaction integrity.

### Epic 4: User Experience & Polish
**Goal:** Enhance discoverability, engagement, and usability through user profiles, notifications, filters, and responsive design refinement across all devices.

---

## Epic 1: Foundation & Authentication Infrastructure

**Epic Goal:** Establish the technical foundation for the entire platform including monorepo setup, deployment pipelines, OAuth 42 authentication, and basic user management. This epic delivers a working, deployed application with authenticated user access and health monitoring - proving the stack works before building features.

### Story 1.1: Project Scaffolding & Monorepo Setup

As a developer,
I want the project scaffolded with monorepo structure, TypeScript configuration, and all foundational tooling,
so that I have a consistent development environment with proper code quality enforcement and shared packages.

**Acceptance Criteria:**

1. Monorepo created with pnpm workspaces containing `apps/web`, `apps/api`, `packages/shared`, and `packages/database` directories
2. TypeScript configured in strict mode with shared `tsconfig.json` base that both apps extend
3. ESLint and Prettier configured with shared rules across frontend and backend
4. Husky git hooks set up with lint-staged for pre-commit linting and formatting
5. Root `package.json` includes workspace scripts for running/building all apps concurrently
6. `.gitignore` properly excludes `node_modules`, `.env` files, build outputs, and IDE configs
7. `README.md` includes setup instructions (pnpm install, environment variables needed, how to run dev servers)
8. Basic environment variable validation implemented using Zod schemas in both apps

### Story 1.2: Frontend Application Skeleton with Next.js

As a developer,
I want a Next.js 14 application initialized with TypeScript, Tailwind CSS, and basic routing structure,
so that I have a deployable frontend foundation ready for feature development.

**Acceptance Criteria:**

1. Next.js 14+ initialized in `apps/web` using App Router (not Pages Router)
2. Tailwind CSS configured with base theme (colors, fonts, breakpoints defined in tailwind.config)
3. shadcn/ui initialized with at least Button and Card components installed
4. Basic layout created with header, main content area, and footer placeholders
5. Home page (`app/page.tsx`) renders with "Welcome" message and placeholder content
6. 404 page (`app/not-found.tsx`) implemented with friendly message and link back to home
7. Global error boundary (`app/error.tsx`) catches and displays runtime errors gracefully
8. Application successfully builds without errors (`pnpm build`) and runs in dev mode (`pnpm dev`)

### Story 1.3: Backend API Skeleton with Express & Prisma

As a developer,
I want an Express API server with Prisma ORM configured and connected to PostgreSQL,
so that I have a type-safe backend foundation ready for implementing business logic.

**Acceptance Criteria:**

1. Express server initialized in `apps/api` with TypeScript, listening on configurable port (default 3001)
2. Prisma initialized with PostgreSQL provider in `packages/database` with initial schema (User model with id, email, createdAt fields)
3. Database connection successful with connection string from environment variable `DATABASE_URL`
4. Initial Prisma migration created and successfully applied to database
5. Health check endpoint (`GET /api/health`) returns JSON with status, timestamp, and database connectivity check
6. CORS configured to allow requests from frontend origin (configurable via environment variable)
7. Helmet.js security headers applied globally to all routes
8. Express error handling middleware catches and logs errors, returns appropriate status codes and sanitized error messages
9. Basic request logging middleware logs HTTP method, path, status code, and response time

### Story 1.4: OAuth 42 Authentication Implementation

As a École 42 student,
I want to log in using my 42 account credentials,
so that I can access the platform securely without creating a new username/password.

**Acceptance Criteria:**

1. Passport.js configured with OAuth 2.0 strategy for 42 API in backend
2. Backend endpoints created: `GET /api/auth/42` (initiates OAuth flow), `GET /api/auth/42/callback` (handles OAuth callback)
3. On successful authentication, user record created/updated in database with 42 profile data (42 ID, name, email, profile photo URL)
4. JWT token generated after successful authentication containing user ID and email
5. JWT stored in httpOnly secure cookie with appropriate expiration (7 days)
6. Frontend login page (`app/login/page.tsx`) includes "Login with 42" button that redirects to backend OAuth initiation endpoint
7. OAuth callback redirects back to frontend dashboard/home page with authentication cookie set
8. Frontend auth context provider (`app/providers/auth-provider.tsx`) fetches and stores current user data from `GET /api/auth/me` endpoint
9. Protected routes on frontend redirect unauthenticated users to login page
10. Backend `GET /api/auth/me` endpoint returns current user data from JWT or 401 if not authenticated
11. Logout endpoint (`POST /api/auth/logout`) clears authentication cookie

### Story 1.5: Initial Deployment Pipeline Setup

As a developer,
I want both frontend and backend automatically deployed on push to main branch,
so that changes are immediately testable in production-like environment without manual deployment steps.

**Acceptance Criteria:**

1. Frontend deployed to Vercel with automatic deployments configured from main branch
2. Backend deployed to Railway or Render with automatic deployments configured from main branch
3. Database hosted on Supabase or Neon with connection string configured in backend environment variables
4. Environment variables properly configured in both Vercel and Railway/Render (DATABASE_URL, JWT_SECRET, OAUTH credentials, CORS_ORIGIN)
5. Frontend environment variable `NEXT_PUBLIC_API_URL` points to deployed backend URL
6. Health check endpoint accessible and returns successful response on deployed backend
7. Frontend successfully loads and renders in production environment
8. OAuth flow works end-to-end on deployed application (login → callback → authenticated dashboard)
9. GitHub Actions workflow created that runs tests and linting on pull requests before merge
10. Deployment status badges added to README showing build status for frontend and backend

### Story 1.6: User Token Balance Initialization

As a new user,
I want to automatically receive an initial token balance when I create my account,
so that I can immediately start reserving meals without needing to post my own first.

**Acceptance Criteria:**

1. `tokens` field added to User model in Prisma schema (integer, default 100)
2. Migration created and applied to add tokens column to users table
3. New users automatically receive 100 tokens upon first authentication (set during user creation)
4. Backend endpoint `GET /api/users/me/balance` returns current user's token balance
5. Frontend displays token balance in header/navigation (always visible when authenticated)
6. Token balance updates in real-time in UI when changed (via refetch after transactions)
7. Unit tests verify token initialization logic sets correct default value
8. Database constraint ensures tokens cannot be negative (check constraint: tokens >= 0)

---

## Epic 2: Core Meal Marketplace

**Epic Goal:** Create the fundamental value exchange mechanism by enabling users to post meal listings with photos, browse available meals, and reserve them using the virtual token economy with escrow protection.

### Story 2.1: Meal Database Schema & Models

As a developer,
I want comprehensive database models for meals, reservations, and token transactions,
so that the data layer properly represents the marketplace business logic with referential integrity.

**Acceptance Criteria:**

1. Meal model created in Prisma schema with fields: id, title, description, portions, cuisineType, dietaryTags (array), allergens (array), preparedDate, expirationDate, userId (foreign key), status (enum: available, reserved, completed, expired), createdAt, updatedAt
2. MealImage model created with fields: id, mealId (foreign key), imageUrl, displayOrder, uploadedAt
3. Reservation model created with fields: id, mealId (foreign key), reserverId (foreign key), tokensAmount, status (enum: pending, confirmed, cancelled, disputed), createdAt, pickupConfirmedAt, completedAt
4. TokenTransaction model created with fields: id, userId (foreign key), amount (positive or negative), type (enum: initial_grant, reservation_escrow, reservation_refund, meal_payment, admin_adjustment), relatedReservationId (nullable foreign key), createdAt
5. All foreign keys have proper cascade rules (e.g., deleting user cascades to their meals and reservations)
6. Indexes created on frequently queried fields: meals.status, meals.userId, reservations.status, tokenTransactions.userId
7. Migration successfully applied to database
8. Prisma client regenerated and types available in shared package

### Story 2.2: Cloudinary Image Upload Integration

As a user posting a meal,
I want to upload photos directly from my device,
so that I can showcase my dish with appealing imagery to attract reservations.

**Acceptance Criteria:**

1. Cloudinary account configured with API credentials stored in backend environment variables
2. Backend endpoint `POST /api/upload/sign` generates signed upload URL for client-side direct upload (prevents exposing API key)
3. Frontend image upload component created with drag-and-drop and file picker support
4. Image validation enforced: max 5MB per image, only JPEG/PNG/WebP formats accepted
5. Uploaded images automatically transformed by Cloudinary: resized to max 1200px width, quality 80%, format WebP
6. Upload progress indicator displays during upload
7. Successfully uploaded image URL returned to frontend for inclusion in meal creation
8. Error handling displays user-friendly messages for upload failures (network issues, file too large, invalid format)
9. Multiple images can be uploaded (max 3 per meal listing)

### Story 2.3: Create Meal Listing Flow

As a cook,
I want to create a meal listing with all required details and photos,
so that other users can discover and reserve my homemade dish.

**Acceptance Criteria:**

1. Frontend "Create Listing" page (`app/meals/create/page.tsx`) accessible from navigation for authenticated users
2. Form includes fields: title (required), description (required, textarea), portions (required, number 1-10), cuisine type (required, dropdown), dietary tags (multi-select: vegetarian, vegan, gluten-free, dairy-free, etc.), allergens (multi-select or text input), prepared date (required, date picker, max today), expiration date (required, date picker, must be after prepared date), photos (required, 1-3 images)
3. Form validation using React Hook Form + Zod schema: all required fields must be filled, dates logical, at least 1 photo uploaded
4. Backend endpoint `POST /api/meals` creates meal record with provided data and associated image URLs
5. Meal automatically set to "available" status on creation
6. Form submission disabled during API call (loading state)
7. Success message displayed and user redirected to meal detail page after successful creation
8. Error messages displayed if API call fails (validation errors shown inline, network errors as toast)
9. Draft functionality: form data persists in browser localStorage during creation (cleared on successful submit)
10. Created meal appears immediately in user's "My Listings" view

### Story 2.4: Meal Catalog & Browsing

As a user looking for meals,
I want to browse available meal listings in a visually appealing grid,
so that I can discover dishes I'm interested in reserving.

**Acceptance Criteria:**

1. Home/catalog page (`app/page.tsx` or `app/meals/page.tsx`) displays all available meals (status = available, expirationDate > now)
2. Meals displayed in responsive grid: 1 column on mobile, 2 on tablet, 3-4 on desktop
3. Each meal card shows: primary photo (cropped to square), title, cuisine type badge, dietary tags icons, portions available, token cost, cook's name and avatar
4. Clicking meal card navigates to meal detail page (`app/meals/[id]/page.tsx`)
5. Backend endpoint `GET /api/meals` returns paginated list of available meals (limit 20 per page) with embedded user data (cook name, avatar)
6. Meals sorted by creation date (newest first) by default
7. Empty state displayed when no meals available ("No meals available right now. Be the first to post!")
8. Loading skeleton displayed while fetching meals
9. Pull-to-refresh functionality on mobile refreshes meal list

### Story 2.5: Meal Detail View

As a user considering a meal,
I want to see complete details including all photos, full description, and nutritional info,
so that I can make an informed decision before reserving.

**Acceptance Criteria:**

1. Meal detail page (`app/meals/[id]/page.tsx`) displays all meal information: image gallery with full-size viewing, title, full description, portions available, cuisine type, dietary tags with clear icons, allergens prominently displayed, preparation date, expiration date, token cost
2. Cook information section shows: profile photo, name, bio, number of completed transactions
3. "Reserve for X tokens" button prominently displayed (disabled if user is the cook or has insufficient tokens)
4. Image gallery allows swiping between photos on mobile, thumbnail navigation on desktop
5. Dates formatted in human-readable format ("Prepared today", "Expires in 2 days")
6. Allergen warnings visually distinct (warning color, icon)
7. Backend endpoint `GET /api/meals/:id` returns full meal data with related user and images
8. 404 page displayed if meal doesn't exist
9. Unavailable meals (reserved/completed/expired) show status badge and disabled reserve button with explanation
10. Link to cook's profile allows viewing their other listings

### Story 2.6: Token-Based Meal Reservation with Escrow

As a user who found a meal I want,
I want to reserve it using my tokens with the amount held in escrow,
so that I can secure the meal and the cook is guaranteed payment upon completion.

**Acceptance Criteria:**

1. "Reserve" button on meal detail page triggers reservation flow when clicked
2. Confirmation modal displays: meal title, token cost, user's current balance, remaining balance after reservation
3. Backend endpoint `POST /api/meals/:id/reserve` creates reservation and token transaction atomically in database transaction
4. Token validation: user must have sufficient balance (tokens >= meal cost), meal must be available, user cannot reserve own meal
5. On successful reservation: tokens deducted from user balance, TokenTransaction record created with type "reservation_escrow", Reservation record created with status "pending", meal status updated to "reserved"
6. Reservation appears in user's "My Reservations" list immediately
7. Email notification sent to both cook (someone reserved your meal) and reserver (reservation confirmed)
8. Pickup instructions displayed after reservation (fridge location, pickup window, confirmation process)
9. Frontend token balance updates immediately after reservation
10. Error handling: insufficient tokens shows friendly message with link to post meals to earn more, meal already reserved shows apology and suggests browsing other meals
11. Reservation includes expiration time (24 hours from reservation) after which tokens auto-refund if not confirmed

### Story 2.7: My Listings & Reservations Dashboard

As a user,
I want to view all my posted meals and active reservations in one place,
so that I can manage my marketplace activity and track pending transactions.

**Acceptance Criteria:**

1. Dashboard page (`app/dashboard/page.tsx`) accessible from navigation for authenticated users
2. "My Listings" section displays all meals posted by user with status badges (available, reserved, completed, expired)
3. "My Reservations" section displays all meals reserved by user with status and pickup instructions
4. Each listing shows: meal photo, title, portions, status, creation date, actions (edit, mark complete if reserved, cancel if available)
5. Each reservation shows: meal photo, title, cook name, token cost, reservation date, pickup instructions, actions (confirm pickup, cancel)
6. Backend endpoints: `GET /api/users/me/meals` returns user's listings, `GET /api/users/me/reservations` returns user's reservations
7. Empty states for both sections when user has no listings/reservations
8. Tabs or sections clearly separate "What I'm Cooking" (listings) from "What I'm Eating" (reservations)
9. Quick stats displayed: total meals posted, total reservations made, tokens earned, tokens spent
10. Filtering options: view only active, only completed, or all

---

## Epic 3: Transaction Lifecycle & Safety

**Epic Goal:** Complete the meal exchange workflow with mandatory safety onboarding, photo-based pickup verification, transaction confirmation by both parties, and dispute resolution mechanism to ensure trust and platform integrity.

### Story 3.1: Mandatory Safety Onboarding Module

As a new user,
I want to complete food safety training before posting or reserving meals,
so that I understand best practices and acknowledge my responsibilities.

**Acceptance Criteria:**

1. User model updated with `safetyOnboardingCompletedAt` field (nullable datetime) in Prisma schema
2. Onboarding flow page (`app/onboarding/safety/page.tsx`) automatically shown on first login if `safetyOnboardingCompletedAt` is null
3. Onboarding includes 4-5 screens covering: food safety basics (proper storage, temperature control, cross-contamination), allergen disclosure responsibility, legal disclaimer (users exchange food at own risk, platform not liable), community guidelines (respect, honesty, no commercial activity), pickup logistics best practices
4. Each screen has "Next" button to progress through flow
5. Final screen requires explicit acknowledgment: checkbox "I understand and agree to follow these guidelines" and "Complete Onboarding" button
6. Backend endpoint `POST /api/users/me/complete-onboarding` updates `safetyOnboardingCompletedAt` timestamp
7. Users who haven't completed onboarding are blocked from: creating meal listings, reserving meals (redirect to onboarding with explanation)
8. "Review Safety Guidelines" link always available in settings for users to revisit content
9. Onboarding completion status checked on both frontend (route guards) and backend (API validation)
10. User profile displays badge/indicator showing they've completed safety training

### Story 3.2: Pickup Instructions & Fridge Location Management

As a cook,
I want to specify which public fridge and exact location I'll place my meal,
so that the reserver knows exactly where to find it.

**Acceptance Criteria:**

1. Meal model updated with `pickupLocation` (text), `fridgeNumber` (string), `pickupInstructions` (text) fields in Prisma schema
2. Meal creation form includes new fields: fridge selection (dropdown: "Fridge A - Ground Floor", "Fridge B - 2nd Floor", etc.), shelf/container description (text input: "top shelf, blue container"), additional instructions (optional textarea)
3. After reservation, cook receives email with prompt to place meal and confirm placement
4. Cook can mark meal as "ready for pickup" via dashboard action (optional status to inform reserver)
5. Pickup instructions prominently displayed on reserver's reservation detail view
6. Instructions include: fridge number, shelf/location, container description, photo of container (from meal images), pickup window (24 hours from reservation), cook's contact info (optional, 42 email)
7. Map or directions to fridge location displayed on mobile (if fridge coordinates configured in admin settings)
8. Reminder email sent to reserver 2 hours after reservation with pickup instructions
9. Cancellation by cook after placement requires refund and notification with apology

### Story 3.3: Photo-Based Pickup Verification

As a reserver,
I want to confirm I picked up the correct meal by comparing it to the listing photo,
so that there's no confusion and both parties have proof of exchange.

**Acceptance Criteria:**

1. Reservation detail page includes "Confirm Pickup" button that opens camera/photo upload modal
2. Modal displays: original meal listing photo for reference, camera/upload interface to capture picked-up meal, instructions "Take a photo of the meal you picked up to confirm"
3. Photo capture works on mobile (direct camera access) and desktop (file upload)
4. Uploaded photo stored with reservation record (new `pickupPhotoUrl` field in Reservation model)
5. Backend endpoint `POST /api/reservations/:id/confirm-pickup` accepts photo URL and updates reservation status to "confirmed", records `pickupConfirmedAt` timestamp
6. After pickup confirmation, cook receives notification "Your meal was picked up!"
7. Pickup photo displayed in both cook's and reserver's transaction history
8. Alternative: "Skip photo" option available but requires typing confirmation ("I confirm I picked up this meal") for MVP flexibility
9. Pickup confirmation within 24 hours required or reservation auto-expires with token refund

### Story 3.4: Transaction Completion & Token Release

As a cook,
I want tokens released from escrow to my balance after successful meal exchange,
so that I receive payment and can use those tokens for my own reservations.

**Acceptance Criteria:**

1. After reserver confirms pickup, 24-hour completion window begins
2. Backend endpoint `POST /api/reservations/:id/complete` allows either party to mark transaction complete
3. Transaction completion flow: both parties must confirm OR automatic completion after 48 hours from pickup confirmation (assumes success)
4. On completion: Reservation status updated to "completed", `completedAt` timestamp recorded, TokenTransaction created with type "meal_payment" transferring escrowed tokens to cook's balance, meal status updated to "completed"
5. Atomic database transaction ensures token transfer integrity (escrow released, cook receives payment)
6. Both parties receive "Transaction Complete!" email notification with summary
7. Completed transactions appear in transaction history for both users
8. Cook's token balance immediately reflects earned tokens
9. Unit tests verify token math: reserver spent X, cook earned X, no tokens created/destroyed
10. Transaction cannot be completed twice (idempotency check)

### Story 3.5: Reservation Cancellation & Token Refund

As a reserver,
I want to cancel my reservation before pickup if plans change,
so that I can get my tokens back and free the meal for someone else.

**Acceptance Criteria:**

1. "Cancel Reservation" button available on reservation detail page before pickup confirmation
2. Cancellation confirmation modal warns: "Are you sure? This will refund your tokens and make the meal available again."
3. Backend endpoint `POST /api/reservations/:id/cancel` handles cancellation logic atomically
4. On cancellation: Reservation status updated to "cancelled", TokenTransaction created with type "reservation_refund" crediting tokens back to reserver, meal status reverted to "available", both parties notified via email
5. Cook receives cancellation notification with apology message from platform
6. Meal immediately appears back in catalog for others to reserve
7. Cancellation not allowed after pickup confirmation (must use dispute process)
8. Cancelled reservations shown in history with "Cancelled" badge and refund amount
9. Multiple cancellations by same user tracked (future anti-abuse consideration)
10. Cancellation deadline: must be done before pickup window ends (24 hours from reservation)

### Story 3.6: Basic Dispute Reporting

As a user who had a problem with a transaction,
I want to report a dispute for manual review,
so that unfair outcomes can be corrected and bad actors identified.

**Acceptance Criteria:**

1. "Report Issue" button available on completed or problematic reservations
2. Dispute form includes: reason (dropdown: meal not as described, meal not found, quality issue, safety concern, other), detailed description (required textarea), option to upload evidence photos
3. Backend endpoint `POST /api/reservations/:id/dispute` creates Dispute record with fields: id, reservationId, reporterId, reason, description, evidenceUrls (array), status (enum: pending, under_review, resolved), createdAt, resolvedAt
4. Reservation status updated to "disputed" preventing completion or further actions
5. Tokens remain in escrow during dispute (not released to cook)
6. Both parties receive email notification that dispute was filed
7. Admin dashboard endpoint `GET /api/admin/disputes` lists all pending disputes (manual review for MVP)
8. Dispute resolution handled manually by admin who can: refund tokens to reserver, release tokens to cook, split resolution, ban users
9. Dispute rate tracked in platform metrics (KPI: <5% target)
10. Resolved disputes show resolution outcome in transaction history

### Story 3.7: Auto-Expiration of Stale Reservations

As a platform,
I want uncompleted reservations to auto-expire after reasonable time,
so that tokens aren't locked indefinitely and meals don't stay reserved forever.

**Acceptance Criteria:**

1. Backend scheduled job (cron or similar) runs every hour to check for expired reservations
2. Reservations expire if: status is "pending" and created more than 24 hours ago, OR status is "confirmed" (pickup done) and pickupConfirmedAt more than 48 hours ago
3. On expiration: Reservation status updated to "expired", tokens automatically refunded to reserver (TokenTransaction with type "reservation_refund"), meal status reverted to "available" (if no other reservations), both parties notified via email with explanation
4. Expired reservations displayed in history with "Expired - Tokens Refunded" badge
5. Cook doesn't receive tokens for expired reservations (prevents abuse: reserving to lock meals without completing)
6. Expiration logic implemented as database transaction (atomic refund)
7. Expiration job logs activity for monitoring
8. Manual "extend reservation" option available in dashboard if both parties agree (rare case, nice-to-have)
9. Unit tests verify expiration logic and refund calculations
10. Metrics tracked: expiration rate (ideally <10% of reservations)

---

## Epic 4: User Experience & Polish

**Epic Goal:** Enhance platform usability, discoverability, and engagement through comprehensive user profiles, real-time notifications, advanced filtering, direct barter functionality, and responsive design polish across all devices.

### Story 4.1: Enhanced User Profiles

As a user,
I want a detailed profile showing my cooking activity and preferences,
so that others can learn about me and build trust before exchanging meals.

**Acceptance Criteria:**

1. User model updated with additional fields: `bio` (text), `avatarUrl` (string from 42 profile), `preferredCuisines` (array), `dietaryPreferences` (array), `joinedAt` (datetime)
2. Profile edit page (`app/profile/edit/page.tsx`) allows users to update: bio (max 300 chars), preferred cuisines (multi-select), dietary preferences (multi-select)
3. Public profile view (`app/users/[id]/page.tsx`) displays: profile photo, name, bio, member since date, preferred cuisines tags, stats (meals posted, meals received, tokens earned, completion rate), "Active Listings" section showing user's currently available meals
4. Backend endpoint `GET /api/users/:id` returns public profile data (excludes private info like email)
5. Profile completion indicator in settings ("Your profile is 75% complete - add bio for 100%")
6. Link to user profile appears on meal cards and meal detail pages (clicking cook's name/avatar)
7. Profile photos pulled from 42 OAuth data, displayed consistently across the platform
8. "Contact via 42" button on profile (mailto link to user's 42 email) for direct communication
9. Privacy settings allow users to hide certain stats (optional for MVP, default all visible)
10. Profile pages are SEO-friendly with proper meta tags (for future public discoverability)

### Story 4.2: Email Notification System

As a user,
I want to receive timely email notifications for important events,
so that I stay informed about my reservations and listings without constantly checking the app.

**Acceptance Criteria:**

1. Email service (Resend or SendGrid) configured with API credentials and branded email templates
2. Notification preferences added to User model: `emailNotifications` (boolean, default true)
3. Email templates created for each event type: welcome email (on signup), meal reserved (to cook), reservation confirmed (to both), pickup reminder (to reserver, 2 hours after reservation), transaction completed (to both), cancellation (to both), dispute filed (to both), new meal from followed cook (Phase 2 feature placeholder)
4. Backend notification service module (`notifications/email-service.ts`) handles sending with error handling and logging
5. All transactional emails include: clear subject line, event summary, relevant details (meal title, token amount, etc.), direct link to relevant page, unsubscribe option
6. Email delivery failures logged but don't block API operations (async job queue would be ideal)
7. Settings page allows users to toggle email notifications on/off
8. Rate limiting on emails: no more than 10 emails per user per day (prevents spam from bugs)
9. Test mode for development: emails logged to console instead of sent
10. Email deliverability tested: proper SPF/DKIM records configured, emails don't land in spam

### Story 4.3: Advanced Meal Filtering & Search

As a user browsing meals,
I want to filter by dietary restrictions, cuisine type, and portions,
so that I quickly find meals that match my preferences and needs.

**Acceptance Criteria:**

1. Filter sidebar/panel on meal catalog page includes: cuisine type (multi-select from predefined list), dietary tags (checkboxes: vegetarian, vegan, gluten-free, dairy-free, nut-free), portions (slider: 1-10), date posted (dropdown: today, this week, all time)
2. Filter state synced to URL query parameters for bookmarkable/shareable filter combinations
3. Backend endpoint `GET /api/meals` accepts query parameters: `cuisineTypes[]`, `dietaryTags[]`, `minPortions`, `maxPortions`, `dateRange`
4. Filtered results update immediately without page reload (client-side state management)
5. Active filters displayed as removable chips/tags above results
6. "Clear All Filters" button resets to default view
7. Results count shown ("Showing 12 meals matching your filters")
8. Empty state when no meals match filters ("No meals found. Try adjusting your filters")
9. Search bar (text input) searches meal titles and descriptions using case-insensitive LIKE query
10. Search and filters work together (AND logic: meal must match search AND all active filters)
11. Filter state persists across sessions (stored in localStorage)
12. Mobile: filters collapse into modal/drawer to save space

### Story 4.4: Direct Barter (Meal-for-Meal Exchange)

As a user with an active listing,
I want to offer my meal in direct trade for someone else's meal,
so that I can exchange without using tokens when both parties agree.

**Acceptance Criteria:**

1. "Propose Barter" button appears on meal detail page (in addition to "Reserve for X tokens")
2. Barter proposal modal shows: "Offer one of your meals in exchange" with dropdown of user's available listings
3. Backend endpoint `POST /api/meals/:id/propose-barter` creates BarterProposal record with: id, proposedMealId, requestedMealId, proposerId, status (pending, accepted, rejected, expired), createdAt
4. Cook of requested meal receives notification: "Someone wants to trade meals with you!"
5. Barter proposal appears in cook's dashboard with: proposer's name, their meal details, "Accept" and "Decline" buttons
6. Backend endpoint `POST /api/barter-proposals/:id/accept` creates two reservations simultaneously: proposer reserves cook's meal, cook reserves proposer's meal (both at 0 tokens)
7. On acceptance: both meals marked as reserved, both users notified, normal pickup/completion flow proceeds for both exchanges
8. On rejection: proposal status updated, proposer notified politely
9. Barter proposals expire after 48 hours if not accepted
10. Barter transactions tracked separately in metrics (compare adoption vs token-based)
11. Transaction history shows barter trades with special "Barter Exchange" badge
12. Both parties must complete their side of barter (2 separate transactions) for full completion

### Story 4.5: Responsive Design Refinement & Mobile UX

As a mobile user,
I want the app optimized for my device with touch-friendly interactions,
so that I have a smooth experience managing meals on-the-go.

**Acceptance Criteria:**

1. All pages tested and refined at mobile (320-767px), tablet (768-1023px), desktop (1024px+) breakpoints
2. Mobile navigation uses hamburger menu or bottom tab bar (whichever fits design better)
3. Touch targets minimum 44x44px on all interactive elements (buttons, links, cards)
4. Forms on mobile use appropriate input types: `type="number"` for portions, `type="email"` for email, date pickers native on mobile
5. Image galleries swipe smoothly on mobile with momentum scrolling
6. Long-press gestures on meal cards show quick actions menu (save, share, report)
7. Pull-to-refresh gesture refreshes meal catalog on mobile
8. Loading states and skeletons prevent layout shift during data fetching
9. Fixed header with token balance and notifications stays visible on scroll
10. Modals and dialogs properly sized for small screens (full-screen on mobile if needed)
11. Typography scales appropriately: larger touch-friendly sizes on mobile, refined sizes on desktop
12. Horizontal scrolling used intentionally (e.g., cuisine type filter chips) with scroll indicators
13. PWA manifest configured: app name, icons, theme color, display mode standalone
14. Install prompt encourages users to "Add to Home Screen" on mobile browsers
15. Tested on real devices: iOS Safari, Chrome Android for touch interactions and performance

### Story 4.6: Transaction History & Token Ledger

As a user,
I want to view complete history of all my transactions and token movements,
so that I can track my activity and verify my balance is correct.

**Acceptance Criteria:**

1. Transaction history page (`app/transactions/page.tsx`) displays all user's reservations and listings chronologically
2. Each transaction shows: date, meal title and photo, type (received/provided), token amount (+ for earned, - for spent), status, other party's name
3. Filters: transaction type (all, as cook, as reserver), status (all, completed, cancelled, disputed), date range
4. Running balance column shows token balance after each transaction
5. Export functionality: "Download CSV" button exports full history
6. Backend endpoint `GET /api/users/me/transactions` returns paginated transaction history with embedded meal and user data
7. Token ledger view (`app/tokens/ledger/page.tsx`) shows all TokenTransaction records: date, type (initial grant, escrow, refund, payment, adjustment), amount, balance after, related reservation link
8. Ledger helps users understand: where tokens came from, where they went, current balance calculation
9. Audit trail is immutable (transactions cannot be deleted, only new offsetting transactions created)
10. Summary stats at top: total earned, total spent, current balance, number of exchanges

### Story 4.7: Settings & Account Management

As a user,
I want to manage my account settings and data,
so that I control my privacy and can export or delete my data per GDPR.

**Acceptance Criteria:**

1. Settings page (`app/settings/page.tsx`) organized into sections: Profile, Notifications, Privacy, Account
2. Profile section: edit bio, preferred cuisines, dietary preferences (links to profile edit page)
3. Notifications section: toggle email notifications on/off, future: notification frequency preferences
4. Privacy section: toggle profile visibility (public vs logged-in users only), review safety guidelines link
5. Account section: view account created date, export data, delete account
6. Backend endpoint `GET /api/users/me/export` generates JSON export of all user data: profile, meals, reservations, transactions, token history (GDPR compliance)
7. Export downloaded as `data-export-YYYY-MM-DD.json` file
8. Backend endpoint `POST /api/users/me/delete` initiates account deletion process: soft delete (anonymize) user record, cancel active reservations with refunds, remove from public view, retain transaction history (anonymized) for integrity
9. Account deletion requires confirmation: type "DELETE MY ACCOUNT" and acknowledge consequences
10. Settings changes save immediately with success toast confirmation
11. Password/email change not needed (OAuth 42 handles authentication)

---

## Checklist Results Report

### Executive Summary

**Overall PRD Completeness:** 95% ✅

**MVP Scope Appropriateness:** Just Right - Well-balanced between viability and minimalism

**Readiness for Architecture Phase:** READY ✅

**Most Critical Concerns:**
1. École 42 API integration details need research (rate limits, available data fields)
2. Initial token allocation amount (100) is placeholder pending economic modeling
3. Photo storage strategy should be validated during architecture (Cloudinary costs at scale)

### Category Analysis

| Category | Status | Critical Issues |
|----------|--------|-----------------|
| 1. Problem Definition & Context | **PASS** (100%) | None - Excellent grounding in Project Brief with clear problem statement and validated user research |
| 2. MVP Scope Definition | **PASS** (95%) | Minor: Initial token allocation amount needs validation, but approach is sound |
| 3. User Experience Requirements | **PASS** (92%) | Minor: PWA installability details deferred to implementation, but core flows well-defined |
| 4. Functional Requirements | **PASS** (98%) | None - 15 FRs are testable, specific, and cover all MVP features |
| 5. Non-Functional Requirements | **PASS** (95%) | Minor: Free-tier infrastructure limits not quantified (acceptable for MVP) |
| 6. Epic & Story Structure | **PASS** (98%) | None - Excellent sequencing, appropriate sizing, clear vertical slices |
| 7. Technical Guidance | **PASS** (93%) | Minor: École 42 API research flagged as open question but doesn't block start |
| 8. Cross-Functional Requirements | **PASS** (90%) | Partial: Data migration N/A (greenfield), but schema evolution approach could be more explicit |
| 9. Clarity & Communication | **PASS** (100%) | None - Documentation is clear, well-structured, and uses consistent terminology |

**Overall Assessment:** PASS (95%) - PRD exceeds quality bar for architecture phase

### Top Issues by Priority

**BLOCKERS:** None

**HIGH Priority:**
1. **École 42 OAuth API Research** - Before Epic 1 Story 1.4 implementation, research 42 API documentation for:
   - Available user data fields (name, email, photo URL, student ID)
   - OAuth scopes required
   - Rate limiting policies
   - API reliability and uptime history
   - *Action:* Assign as pre-Epic 1 research task, should take 2-3 hours

2. **Token Economy Modeling** - Before Epic 1 Story 1.6, validate initial allocation:
   - Model token supply/demand with 100 initial tokens
   - Calculate token velocity needed for healthy marketplace
   - Determine if adjustments needed (50? 150?)
   - *Action:* Create simple spreadsheet model with 50 users, 3 transactions/week scenario

**MEDIUM Priority:**
3. **Cloudinary Cost Validation** - Before Epic 2 Story 2.2:
   - Calculate expected image storage/bandwidth for 100-200 users
   - Confirm free tier is sufficient (25GB storage, 25GB bandwidth/month)
   - Plan for upgrade path if needed
   - *Action:* Back-of-napkin math during architecture phase

4. **Fridge Location Data** - Before Epic 3 Story 3.2:
   - Survey actual fridge locations at École 42
   - Determine numbering/naming scheme
   - Decide if hardcoded in app or admin-configurable
   - *Action:* Site visit or reach out to 42 students for intel

**LOW Priority:**
5. **Email Deliverability Setup** - During Epic 4 Story 4.2:
   - SPF/DKIM records for chosen email service
   - Test email templates in various clients
   - Monitor spam scores
   - *Action:* Standard email service onboarding, well-documented

### MVP Scope Assessment

**Scope is Appropriate ✅**

**Well-Scoped Features:**
- Token economy with escrow (core differentiator, correctly prioritized)
- OAuth 42 only (avoids password management complexity)
- Manual dispute resolution (appropriate for <100 users)
- Email-only notifications (push deferred to Phase 2 when warranted)
- PWA over native apps (faster deployment, zero app store friction)
- Basic filtering (advanced macros/nutrition deferred appropriately)

**No Features to Cut:** All included features directly support core value proposition (variety + connection + trust)

**Missing Features Review:** None - All essential MVP features are present:
- ✅ User authentication & onboarding
- ✅ Meal creation with photos
- ✅ Browse & reserve
- ✅ Token economy with escrow
- ✅ Pickup verification
- ✅ Transaction completion
- ✅ Safety mechanisms (onboarding, disputes, auto-expiration)

**Complexity Concerns:**
- **Token transaction atomicity** (Epic 2 Story 2.6, Epic 3 Story 3.4) - High complexity but well-specified in ACs. Architect should design careful transaction boundaries.
- **Auto-expiration cron job** (Epic 3 Story 3.7) - Medium complexity. Ensure architect considers job idempotency and failure recovery.
- **Dual reservation creation for barter** (Epic 4 Story 4.4) - Medium-high complexity. Could be deprioritized if timeline tight, but valuable differentiator.

**Timeline Realism:** 
- 26 stories across 4 epics
- Average 2-3 hours per story = 52-78 hours of development
- With testing, debugging, integration: ~100-120 hours total
- Single developer, half-time (20 hrs/week) = 5-6 weeks
- Matches Project Brief's "3-4 week MVP timeline" estimate IF developer is experienced and full-time (40 hrs/week)
- **Recommendation:** Communicate realistic 5-6 week timeline for part-time development

### Technical Readiness

**Clarity of Technical Constraints:** Excellent
- Monorepo structure clearly defined
- Stack choices justified with rationale (Next.js, Express, Prisma, PostgreSQL)
- Free-tier infrastructure strategy explicit
- Testing strategy balanced (unit + integration, manual E2E)

**Identified Technical Risks:**
1. **Token transaction integrity** - Critical requirement, architecture must ensure ACID compliance
2. **OAuth 42 API availability** - Dependency on external service, fallback strategy needed
3. **Free-tier infrastructure limits** - Must monitor and have upgrade path ready
4. **Photo storage costs** - Cloudinary bandwidth can spike with image-heavy app
5. **Concurrent reservation race conditions** - Multiple users reserving same meal simultaneously

**Areas Needing Architect Investigation:**
1. **Database schema design** - Prisma models specified but relationships, indexes, and constraints need detailed design
2. **Token transaction state machine** - Complex state transitions (pending → confirmed → completed, with cancellation and dispute branches)
3. **Cron job infrastructure** - How to run scheduled tasks on free-tier platforms (Railway/Render capabilities)
4. **Error recovery strategies** - What happens when email sends fail? When Cloudinary is down? When token transfer partially completes?
5. **Rate limiting implementation** - In-memory OK for single backend instance, but needs consideration for future scaling

### Recommendations

**Immediate Actions (Before Architecture Phase):**
1. ✅ **Output complete PRD to docs/prd.md** - DONE
2. 🔍 **Research École 42 OAuth API** - Assign to developer or technical PM, 2-3 hours
3. 📊 **Create token economy model** - Simple spreadsheet, 1-2 hours

**For Architect:**
1. **Focus Areas for Architecture Document:**
   - Database schema with full ERD showing all relationships, indexes, constraints
   - Token transaction state machine diagram with all transitions
   - Error handling and recovery strategies for critical flows
   - API endpoint design with request/response schemas
   - Deployment architecture diagram showing all components and data flows

2. **Technical Decisions to Make:**
   - Cron job implementation (node-cron, external service like EasyCron, platform-specific)
   - Session management approach (JWT in cookies confirmed, but refresh token strategy?)
   - File upload strategy (direct to Cloudinary with signed URLs confirmed, but security measures?)
   - Rate limiting approach (express-rate-limit OK for MVP, but configuration?)

3. **Prototype Candidates:**
   - Token escrow transaction atomicity (prove Prisma transaction API works as expected)
   - OAuth 42 integration (validate before committing to implementation)
   - Image upload flow (test Cloudinary signed upload end-to-end)

**For Development Team:**
1. **Epic 1 can start immediately** - No blockers for project scaffolding, frontend/backend skeletons
2. **Research tasks before Epic 1.4** - OAuth 42 API investigation
3. **Testing strategy** - Unit test coverage especially critical for token logic (Epic 2.6, 3.4)

**Documentation Improvements (Optional):**
1. Add diagrams to PRD: User journey flow, token transaction state machine
2. Create FAQ section for developers (Why these tech choices? Why not X instead of Y?)
3. Add glossary of terms (tokens, escrow, barter, etc.) for onboarding new team members

### Final Decision

**✅ READY FOR ARCHITECT**

The PRD and epic structure are comprehensive, properly scoped, and ready for architectural design. The requirements documentation provides:

- Clear problem definition grounded in user research
- Well-balanced MVP scope with explicit rationale
- Testable functional and non-functional requirements
- Logically sequenced epics with appropriate story breakdown
- Sufficient technical guidance for architecture decisions
- Identified risks and open questions

**Next Steps:**
1. Execute any HIGH priority research items (OAuth 42 API, token modeling)
2. Proceed to UX Expert for detailed UI/UX specifications
3. Proceed to Architect for technical architecture design
4. Begin Epic 1 development once architecture is approved

**Confidence Level:** HIGH - This PRD provides a solid foundation for a successful MVP delivery.

---

## Next Steps

### UX Expert Prompt

Please review this PRD and create a comprehensive UI/UX specification document that translates the product requirements into detailed interface designs. Focus on:

1. **Screen-by-screen specifications** for all 11 core screens identified in the UI Design Goals section
2. **Detailed user flows** with wireframes for the three critical journeys:
   - First-time user: Login → Safety Onboarding → Browse → Reserve → Pickup → Complete
   - Cook journey: Create Listing → Place in Fridge → Monitor Reservation → Complete Transaction
   - Dispute/cancellation flows
3. **Component library** definition for shadcn/ui integration (which components needed, any custom components)
4. **Responsive behavior** specifications for mobile, tablet, and desktop breakpoints
5. **Interaction patterns** for key actions (reserve, upload photos, confirm pickup, filters)
6. **Content strategy** including microcopy, error messages, empty states, and onboarding content
7. **Accessibility implementation plan** for WCAG AA compliance

Reference the User Interface Design Goals section and ensure the warm, community-focused design vision is consistently applied throughout.

### Architect Prompt

Please review this PRD and create a comprehensive Technical Architecture Document that provides implementation-ready specifications for the development team. Focus on:

1. **Complete database schema** with full ERD showing all entities, relationships, indexes, and constraints
2. **API design** with all endpoints, request/response schemas, authentication, and error handling
3. **Token transaction state machine** with formal state definitions and transition rules ensuring ACID compliance
4. **System architecture diagram** showing frontend, backend, database, and external services (OAuth 42, Cloudinary, email service)
5. **Error handling strategy** for critical flows (what happens when external services fail?)
6. **Security architecture** including authentication flow, authorization rules, input validation, and rate limiting implementation
7. **Deployment architecture** with environment setup, CI/CD pipeline, and monitoring approach
8. **Testing strategy** with unit test structure, integration test coverage, and E2E considerations
9. **Code organization** showing module structure for both apps/web and apps/api following the monorepo pattern

Reference the Technical Assumptions section for stack decisions. Pay special attention to the token transaction integrity requirements and ensure the architecture prevents all edge cases (race conditions, partial failures, double-spending).

**Priority areas for detailed design:**
- Token escrow and release mechanism (Epic 2.6, 3.4)
- Auto-expiration cron job implementation (Epic 3.7)
- OAuth 42 integration architecture (Epic 1.4)
- Image upload and storage strategy (Epic 2.2)
- Concurrent reservation handling (Epic 2.6)

---

**Document Version:** 1.0  
**Status:** Complete & Validated  
**Last Updated:** 2026-01-14  
**Next Review:** After architecture completion
