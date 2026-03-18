# junaidburke.com Portfolio + Blog Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Next.js portfolio and blog site at junaidburke.com with dark hacker/builder aesthetic, 6 product showcases with AI flow diagrams, MDX blog system, contact form via Resend, and full SEO.

**Architecture:** Next.js App Router with `src/` directory. Server components by default, client components only for theme toggle, contact form, tag filter, and inbox demo. MDX blog posts read from filesystem via `gray-matter` + `next-mdx-remote`. CSS variables for dark/light theming via `next-themes`.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, next-mdx-remote, gray-matter, reading-time, rehype-pretty-code, rehype-slug, rehype-autolink-headings, resend, zod, @vercel/analytics, @vercel/og, lucide-react, next-themes, clsx, tailwind-merge

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx                          # Root layout: fonts, ThemeProvider, Analytics, metadata
│   ├── page.tsx                            # Homepage: composes all section components
│   ├── blog/
│   │   ├── page.tsx                        # Blog listing with category/tag filters
│   │   └── [slug]/
│   │       └── page.tsx                    # Individual MDX blog post with TOC
│   ├── products/
│   │   └── [slug]/
│   │       └── page.tsx                    # Product "Coming Soon" placeholder
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts                    # Contact form handler (Resend)
│   │   └── og/
│   │       └── route.tsx                   # Dynamic OG image generation
│   ├── feed.xml/
│   │   └── route.ts                        # RSS feed
│   ├── sitemap.ts                          # Dynamic sitemap
│   └── robots.ts                           # Robots.txt
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                      # Fixed nav, section links, theme toggle
│   │   ├── Footer.tsx                      # Footer with social icons
│   │   └── ThemeProvider.tsx               # next-themes wrapper (client component)
│   ├── sections/
│   │   ├── Hero.tsx                        # Hero with gradient text, tech chips
│   │   ├── Products.tsx                    # Renders all ProductBlocks
│   │   ├── ProductBlock.tsx                # Two-column: intro + flow diagram
│   │   ├── FlowDiagram.tsx                 # Vertical timeline with dots/lines/LLM badges
│   │   ├── InboxShowcase.tsx               # Interactive mock inbox (client component)
│   │   ├── Consulting.tsx                  # 3 consulting service cards
│   │   ├── BurkesTire.tsx                  # Client showcase card
│   │   ├── Testimonial.tsx                 # Quote card
│   │   ├── BlogPreview.tsx                 # Latest 3 blog cards on homepage
│   │   ├── About.tsx                       # Two-column about + timeline + infra
│   │   └── Contact.tsx                     # Contact form + Calendly + socials
│   ├── blog/
│   │   ├── BlogCard.tsx                    # Blog post card for listing
│   │   ├── TagFilter.tsx                   # Category tabs + tag pills (client)
│   │   └── MDXComponents.tsx               # Custom MDX component overrides
│   └── ui/
│       ├── Badge.tsx                       # Status badges (live, beta, dev, new, skill)
│       ├── TechTag.tsx                     # Tech stack pill
│       ├── Button.tsx                      # CTA button
│       ├── SectionHeading.tsx              # Reusable section header
│       ├── FadeIn.tsx                      # Scroll fade-in animation (client)
│       └── ThemeToggle.tsx                 # Sun/moon toggle (client)
├── content/
│   └── blog/                               # MDX blog posts
│       ├── supabase-multi-schema-platform.mdx
│       ├── operator-to-architect-cowork.mdx
│       ├── feature-creep-killed-my-first-saas.mdx
│       ├── claude-code-tips-for-solo-founders.mdx
│       └── sms-ai-advisor-auto-shops.mdx
├── lib/
│   ├── blog.ts                             # getMdxFiles, parseFrontmatter, getAllPosts, getPostBySlug
│   ├── products.ts                         # Product data definitions
│   └── utils.ts                            # cn() helper
└── app/
    └── globals.css                         # Tailwind directives + CSS variables + grid/scanline (created by scaffold)
```

---

## Phase 1: Project Scaffold & Design System

### Task 1: Create Next.js Project & Install Dependencies

**Files:**
- Create: `package.json` (via create-next-app)
- Create: `tsconfig.json` (via create-next-app)
- Create: `tailwind.config.ts` (via create-next-app, then modify)
- Create: `.env.local`
- Create: `.gitignore`

- [ ] **Step 1: Scaffold Next.js project**

```bash
cd /Users/junaidburke/2025/projects-2025-2026/junaidburke.com
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Expected: Project scaffolded with `src/app/` structure.

- [ ] **Step 2: Install dependencies**

```bash
npm install next-mdx-remote gray-matter reading-time rehype-pretty-code rehype-slug rehype-autolink-headings resend zod @vercel/analytics @vercel/og lucide-react next-themes clsx tailwind-merge
```

- [ ] **Step 3: Create .env.local**

Write file `/.env.local` with contents:
```
RESEND_API_KEY=re_placeholder
NEXT_PUBLIC_SITE_URL=https://junaidburke.com
```

- [ ] **Step 4: Initialize git and commit**

```bash
git init
git add -A
git commit -m "chore: scaffold next.js project with dependencies"
```

---

### Task 2: Design System — Global Styles & Tailwind Config

**Files:**
- Modify: `src/styles/globals.css` (or `src/app/globals.css` depending on scaffold)
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Set up CSS variables and global styles**

Create `src/app/globals.css` with:
- Tailwind directives (`@tailwind base/components/utilities`)
- `:root` (dark mode default) CSS variables for all color tokens
- `.light` class overrides for light mode tokens (matches `attribute="class"` in ThemeProvider)
- Grid background overlay (72px, 3% opacity via repeating-linear-gradient)
- Scanline effect (subtle horizontal lines, <2% opacity)
- Smooth scroll behavior
- Base typography reset

Dark mode tokens:
```css
:root {
  --bg: #07070c;
  --bg-card: #111119;
  --bg-card-hover: #171722;
  --bg-flow: #0d0d16;
  --border: #1e1e30;
  --border-hi: #2d2d48;
  --text: #eeedf6;
  --text-mid: #b0aec8;
  --text-muted: #8785a3;
  --text-dim: #5f5d7c;
  --green: #00ffaa;
  --purple: #8b7aff;
  --orange: #ff9a5c;
  --red: #ff5f78;
  --cyan: #3ee8ff;
}

.light {
  --bg: #f8f9fc;
  --bg-card: #ffffff;
  --bg-card-hover: #f1f3f9;
  --bg-flow: #f4f5fa;
  --border: #e2e4ec;
  --border-hi: #d0d3de;
  --text: #0f1729;
  --text-mid: #3d4559;
  --text-muted: #64697e;
  --text-dim: #8e92a6;
  --green: #00b377;
  --purple: #6c5ce7;
  --orange: #e07830;
  --red: #e5384b;
  --cyan: #0ea5c2;
}
```

- [ ] **Step 2: Configure Tailwind to use CSS variables**

Update `tailwind.config.ts`:
- Extend colors to reference CSS variables (e.g., `bg: 'var(--bg)'`)
- Map all tokens: bg, bg-card, bg-card-hover, bg-flow, border, border-hi, text, text-mid, text-muted, text-dim, green, purple, orange, red, cyan
- Set `darkMode: 'class'` for next-themes compatibility (theming is via CSS variables, not Tailwind `dark:` utilities — this setting is only for next-themes class toggling)
- Add font families: `outfit` and `jetbrains` referencing CSS variables

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css tailwind.config.ts
git commit -m "feat: design system — CSS variables, Tailwind config, grid/scanline overlays"
```

---

### Task 3: Root Layout — Fonts, ThemeProvider, Analytics

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/layout/ThemeProvider.tsx`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create cn() utility**

`src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 2: Create ThemeProvider**

`src/components/layout/ThemeProvider.tsx`:
```typescript
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

- [ ] **Step 3: Set up root layout**

`src/app/layout.tsx`:
- Import Outfit and JetBrains Mono via `next/font/google`
- Wrap children in ThemeProvider
- Add `<Analytics />` from `@vercel/analytics/react`
- Set default metadata (title, description, openGraph defaults)
- Apply font CSS variables to `<html>` element
- Add gradient blob divs (fixed position, pointer-events-none, z-0):
  - Green blob: top-[-200px] left-[-200px], w-[600px] h-[600px], bg-green/5, blur-[120px], rounded-full
  - Purple blob: top-[40%] right-[-300px], w-[500px] h-[500px], bg-purple/5, blur-[120px], rounded-full
  - Orange blob: bottom-[-200px] left-[20%], w-[400px] h-[400px], bg-orange/3, blur-[100px], rounded-full
- Main content gets `relative z-10` to sit above blobs
- Add noise texture overlay: pseudo-element with `background-image: url("data:image/svg+xml,...")` grain pattern at 3% opacity, pointer-events-none, covering full viewport

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```

Open http://localhost:3000 — should see dark background with gradient blobs.

- [ ] **Step 5: Commit**

```bash
git add src/lib/utils.ts src/components/layout/ThemeProvider.tsx src/app/layout.tsx
git commit -m "feat: root layout with Outfit/JetBrains Mono fonts, ThemeProvider, analytics"
```

---

### Task 4: UI Primitives — Badge, TechTag, Button, SectionHeading, FadeIn, ThemeToggle

**Files:**
- Create: `src/components/ui/Badge.tsx`
- Create: `src/components/ui/TechTag.tsx`
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/FadeIn.tsx`
- Create: `src/components/ui/ThemeToggle.tsx`

- [ ] **Step 1: Create Badge component**

Server component. Props: `variant: 'live' | 'beta' | 'dev' | 'new' | 'skill'`, `children: string`.
- `live` → green bg/border + subtle green pulse animation (box-shadow keyframe)
- `beta` → purple bg/border
- `dev` → orange bg/border
- `new` → red bg/border
- `skill` → cyan bg/border
- Font: mono (JetBrains), uppercase, text-xs, rounded-full, 1px border
- All badges: 10% opacity background with matching border color, letter-spacing: 0.05em

- [ ] **Step 2: Create TechTag component**

Server component. Props: `children: string`.
- Mono font, text-xs, bg-card with border, rounded-md, px-2 py-0.5
- text-muted color

- [ ] **Step 3: Create Button component**

Server component (renders `<a>` for links or `<button>`).
Props: `variant: 'primary' | 'secondary'`, `href?: string`, `children`, standard button props.
- Primary: green bg, dark text, hover brightness, transition-all 200ms, subtle shadow-green glow on hover (`box-shadow: 0 0 20px var(--green)/20%`)
- Secondary: transparent with border, text color, hover bg-card, border transitions to border-hi on hover
- Both: rounded-lg, px-5 py-2.5, font-medium, min-h-[44px] for touch targets

- [ ] **Step 4: Create SectionHeading component**

Server component. Props: `label: string` (mono tag above heading), `title: string`, `description?: string`.
- Label in mono/green/uppercase/text-xs
- Title in text-3xl/font-bold
- Description in text-muted

- [ ] **Step 5: Create FadeIn component (client)**

`'use client'` — uses IntersectionObserver.
- Wraps children in a div that starts `opacity-0 translate-y-6`
- On intersection, transitions to `opacity-100 translate-y-0` with `ease-out` over 600ms
- Accepts `delay?: number` for staggered animations (use `transitionDelay` style)
- `threshold: 0.15` — triggers slightly before element is fully visible
- Only triggers once (unobserve after first intersection)

- [ ] **Step 6: Create ThemeToggle component (client)**

`'use client'` — uses `useTheme()` from next-themes.
- Sun icon (light) / Moon icon (dark) from lucide-react
- Mounted check to avoid hydration mismatch
- Button with hover state

- [ ] **Step 7: Commit**

```bash
git add src/components/ui/
git commit -m "feat: UI primitives — Badge, TechTag, Button, SectionHeading, FadeIn, ThemeToggle"
```

---

## Phase 2: Layout & Homepage Sections

### Task 5: Navbar & Footer

**Files:**
- Create: `src/components/layout/Navbar.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/app/layout.tsx` (add Navbar + Footer)

- [ ] **Step 1: Create Navbar**

Client component (needs ThemeToggle + mobile menu toggle + scroll state).
- Fixed position, `backdrop-blur-xl backdrop-saturate-150`, `bg-bg/80` (semi-transparent), border-bottom border-border/50
- Transitions: border becomes more visible after scrolling (track `scrollY > 20` with useState + useEffect)
- Logo: "junaidburke" in mono font, green dot before it (dot is 6px circle, `bg-green`, inline-block)
- Nav links: Products, Blog, About, Contact (smooth scroll anchors for homepage sections)
  - Active link detection via IntersectionObserver on sections (highlight current section)
  - Hover: text transitions to text color from text-muted, with 150ms ease
- ThemeToggle on the right
- Mobile: hamburger icon (Menu/X from lucide-react), slide-down nav with `transition-all 300ms ease`, backdrop-blur on mobile menu panel
- z-50 to stay above content

- [ ] **Step 2: Create Footer**

Server component.
- Container with border-top
- Left: "© 2026 Junaid Burke" + "junaidburke.com"
- Right: Social icon links (X, LinkedIn, GitHub) as inline SVGs or lucide-react icons
- text-muted, small text

- [ ] **Step 3: Add Navbar + Footer to root layout**

Wrap page content between `<Navbar />` and `<Footer />` in layout.tsx. Add top padding to `<main>` to account for fixed navbar.

- [ ] **Step 4: Verify in browser**

Nav should be fixed at top, footer at bottom. Theme toggle should switch dark/light.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Navbar.tsx src/components/layout/Footer.tsx src/app/layout.tsx
git commit -m "feat: Navbar with theme toggle and Footer with social links"
```

---

### Task 6: Hero Section

**Files:**
- Create: `src/components/sections/Hero.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Hero component**

Server component (wrap in FadeIn for entrance animation).
- Tagline: "Solo Founder • Systems Engineer • AI Builder" in mono/text-muted/uppercase/tracking-[0.2em]/text-sm
- H1: "I build " + gradient span "AI-powered tools" + " for service businesses."
  - Gradient: `bg-gradient-to-r from-[var(--green)] via-[var(--cyan)] to-[var(--purple)]` with `bg-clip-text text-transparent`
  - H1 size: text-5xl md:text-6xl lg:text-7xl, font-bold, leading-tight
- Subtext paragraph about 15+ years, agentic AI, monorepo, evenings/weekends. text-mid, text-lg, max-w-2xl
- Tech stack row: flex-wrap gap-2 of TechTag components, stagger FadeIn delays (50ms increments)
- Centered layout, py-32 lg:py-40, max-w-4xl mx-auto
- Below tech chips: subtle horizontal divider line (1px, gradient from transparent → border → transparent)

- [ ] **Step 2: Add Hero to homepage**

`src/app/page.tsx`: Import and render `<Hero />` as first section.

- [ ] **Step 3: Verify in browser**

Gradient text should be visible. Tech chips should wrap on mobile.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx src/app/page.tsx
git commit -m "feat: Hero section with gradient text and tech stack chips"
```

---

### Task 7: Product Data & FlowDiagram Component

**Files:**
- Create: `src/lib/products.ts`
- Create: `src/components/sections/FlowDiagram.tsx`

- [ ] **Step 1: Define product data types and content**

`src/lib/products.ts`:
```typescript
interface FlowStep {
  label: string
  sublabel?: string
  type: 'input' | 'process' | 'llm' | 'data' | 'gate' | 'output'
}

interface Product {
  slug: string
  name: string
  badge: { text: string; variant: 'live' | 'beta' | 'dev' | 'new' | 'skill' }
  intro: string
  howItWorks: string
  flow: FlowStep[]
  tech: string[]
  cta: { label: string; href: string }
}
```

Define all 6 products inline:

1. **OttoManagerPro** — slug: `ottomanagerpro`, badge: `{ text: 'A2P Approved · Launch Ready', variant: 'live' }`, intro: SMS-based AI service advisor for auto repair shops, flow: Customer SMS → Twilio Webhook → Intent Classification (LLM: Claude) → Context Retrieval (Supabase) → Response Generation (LLM) → Confidence Gate → SMS Delivered, tech: [Twilio SMS, Anthropic Claude, Supabase (otto_v2), Next.js API Routes, Clerk Auth, Stripe Billing]

2. **Inbox Command Center** — slug: `inbox-command-center`, badge: `{ text: 'Claude Cowork Skill', variant: 'skill' }`, intro: AI email triage with action buttons, flow (horizontal): Fetch Gmail API → Claude classifies urgency → Render dashboard + actions, tech: [Claude Cowork, Gmail API, AI Triage, Action Buttons, Scheduled Automation]

3. **TireManagerPro** — slug: `tiremanagerpro`, badge: `{ text: 'V2 · Pre-Launch', variant: 'beta' }`, intro: Auto repair shop management — ground-up rebuild after V1 feature creep, flow: Clerk Auth → Role-Based Views → Supabase RLS (public.is_org_member) → Zod Validation → Real-Time Sync, tech: [Next.js 14+, Supabase RLS (tire_v2), Clerk RBAC, Zod, Tailwind/shadcn]

4. **FieldAgent AI** — slug: `fieldagent-ai`, badge: `{ text: 'PRD Complete', variant: 'dev' }`, intro: AI dispatches right technician to right job, flow: 6-agent parallel — Intake (NLP), Matching (Scoring), Routing (Geo), Scheduling (Conflicts), Notification, Feedback (Reinforcement), tech: [Multi-Agent Architecture, Anthropic Claude, Supabase (fieldagent_ai), Parallel Dispatch, Next.js]

5. **CleanBuddyPro** — slug: `cleanbuddypro`, badge: `{ text: 'In Development', variant: 'dev' }`, intro: Cleaning business management from pain-point gap analysis, flow: Shared Supabase Platform (6 schemas) → Job Scheduler → Crew Dispatch → Invoice Generation, tech: [Next.js, Supabase (cleanbuddy), Recurring Scheduler, Stripe Invoicing, Crew Management]

6. **FrameIt** — slug: `frameit`, badge: `{ text: 'New Concept · PRD Complete', variant: 'new' }`, intro: AI-generated photo layouts for life events — photos stay untouched, flow: Event Config → Theme Asset Generation (AI: Image Gen) → Layout Engine (AI: Layout Algorithm) → Photo Placement & Export, tech: [AI Layout Generation, Image Gen Models, Next.js, Supabase Storage, Drag & Drop UX]

- [ ] **Step 2: Create FlowDiagram component**

Server component. Props: `steps: FlowStep[]`, `orientation?: 'vertical' | 'horizontal'`.
- Vertical timeline: dots connected by dashed lines (border-dashed, 1px, border-hi)
- Each step: colored dot (12px, rounded-full, based on type) + label (text-sm, font-medium) + optional sublabel (text-xs, text-dim)
- Type colors: input=cyan, process=text-muted, llm=purple (with "LLM" badge), data=orange, gate=red, output=green
- LLM steps get a small pill badge: `bg-purple/10 border-purple/30 text-purple text-[10px] font-mono` saying "LLM: Claude"
- Dots have a subtle matching-color glow: `box-shadow: 0 0 8px var(--color)/40%`
- bg-flow background, rounded-xl, p-6, border
- Connector lines: thin vertical dashed lines between dots (2px wide, border-hi color)
- For horizontal orientation (Inbox Command Center): flex-row with horizontal dashed lines between steps, each step has dot above and label below
- Wrap each step in FadeIn with staggered delays for scroll-triggered reveal

- [ ] **Step 3: Commit**

```bash
git add src/lib/products.ts src/components/sections/FlowDiagram.tsx
git commit -m "feat: product data definitions and FlowDiagram component"
```

---

### Task 8: ProductBlock & Products Section

**Files:**
- Create: `src/components/sections/ProductBlock.tsx`
- Create: `src/components/sections/Products.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create ProductBlock**

Server component. Props: `product: Product`, `reversed?: boolean`.
- Two-column grid (lg:grid-cols-2, stacks on mobile)
- LEFT column:
  - Badge at top
  - Product name as h3
  - Green-bordered callout box with intro text
  - "How the AI Works" paragraph
  - Tech tags row (flex-wrap of TechTag)
  - CTA Button
- RIGHT column:
  - FlowDiagram with product's flow steps
- `reversed` prop swaps column order on desktop for visual variety

- [ ] **Step 2: Create Products section**

Server component. Renders SectionHeading + maps over products array rendering ProductBlock for each. Alternates `reversed` prop.

- [ ] **Step 3: Add Products to homepage**

Add `<Products />` to `src/app/page.tsx` after Hero, wrapped in `id="products"` for anchor linking.

- [ ] **Step 4: Verify in browser**

All 6 products should render with flow diagrams. Check mobile stacking.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ProductBlock.tsx src/components/sections/Products.tsx src/app/page.tsx
git commit -m "feat: Products section with 6 product blocks and AI flow diagrams"
```

---

### Task 9: InboxShowcase Component

**Files:**
- Create: `src/components/sections/InboxShowcase.tsx`
- Modify: `src/components/sections/Products.tsx` (render InboxShowcase for Inbox Command Center)

- [ ] **Step 1: Create InboxShowcase (client component)**

`'use client'` — has interactive action buttons.
- Mock inbox UI with 4 email rows:
  1. Twilio: "A2P Registration Approved" — urgency: high (green badge) — actions: [View, Archive]
  2. Stripe: "Invoice Payment Failed" — urgency: critical (red badge) — actions: [Retry, Contact]
  3. GitHub: "PR #47 Review Requested" — urgency: medium (orange badge) — actions: [Review, Snooze]
  4. Vercel: "Deployment Succeeded" — urgency: low (text-dim) — actions: [View, Archive]
- Card with bg-card, border, rounded-xl
- Each row: sender icon/initial, subject, urgency badge, action buttons
- Action buttons are visual only (no real functionality) — on click, show a brief "Action triggered" state

- [ ] **Step 2: Integrate into Inbox Command Center product block**

In `ProductBlock.tsx`, add an optional `showcase?: ReactNode` prop. When provided, render it between the intro callout and the "How the AI Works" section. In `Products.tsx`, pass `<InboxShowcase />` as the `showcase` prop for the Inbox Command Center product only.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/InboxShowcase.tsx src/components/sections/Products.tsx
git commit -m "feat: InboxShowcase interactive demo for Inbox Command Center"
```

---

### Task 10: Testimonial Section

**Files:**
- Create: `src/components/sections/Testimonial.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Testimonial component**

Server component.
- Large quote icon (green, opacity-30) at top
- Quote text in text-lg/text-mid, italic
- Attribution: "— Burke's Tire & Auto Repair" + "3 Locations, Delaware" below
- Card styling: bg-card, border, rounded-xl, p-8, max-w-3xl centered
- Green left border (4px)

- [ ] **Step 2: Add to homepage after Products**

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Testimonial.tsx src/app/page.tsx
git commit -m "feat: Testimonial section with Burke's Tire quote"
```

---

### Task 11: Consulting Section

**Files:**
- Create: `src/components/sections/Consulting.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create Consulting component**

Server component. 3-column grid (stacks on mobile).

Card 1 — Starter Build:
- Title, bullet list of services
- Standard card styling

Card 2 — Pro Architecture (featured):
- Green border (2px), subtle green glow
- "Most Popular" badge or similar visual emphasis
- Title, bullet list of services

Card 3 — Skill Packs:
- Title, list of available packs (Auto Repair, Real Estate, Freelancer/Consultant, Inbox Command Center)
- Standard card styling

NO prices on any card.

- [ ] **Step 2: Add to homepage**

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Consulting.tsx src/app/page.tsx
git commit -m "feat: Consulting section with 3 service cards"
```

---

### Task 12: BurkesTire Client Showcase

**Files:**
- Create: `src/components/sections/BurkesTire.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create BurkesTire component**

Server component. Single card with 2-column grid.

LEFT:
- "Client Showcase" label
- "Burke's Tire & Auto Repair" title
- Description paragraph
- 3 location items with map-pin icons (Wilmington, Newark, Bear — all Delaware)

RIGHT:
- "Delivered Stack" table/grid:
  - Website: Next.js on Vercel
  - AI Chat: Otto Agent
  - Email: Zoho Mail
  - Forms: Resend
  - Domain: burkestire.com
  - Live: burkes-tire.vercel.app
- Each row: label (mono/muted) + value (text)

- [ ] **Step 2: Add to homepage**

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/BurkesTire.tsx src/app/page.tsx
git commit -m "feat: Burke's Tire client showcase section"
```

---

### Task 13: About Section

**Files:**
- Create: `src/components/sections/About.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create About component**

Server component. Two-column grid.

LEFT:
- SectionHeading with "About" label
- 2-3 narrative paragraphs (systems engineer → solo founder, 15+ years, products validated against real business, MVP philosophy)
- Green-bordered callout box with philosophy quote: "Build systems, not features. Ship fast, validate faster. Every product earns its place by solving a problem someone is willing to pay for — today, not someday."

RIGHT:
- Career timeline (vertical, with dots):
  - Founder & Solo Engineer (2024–Present)
  - Full-Stack Web Development (2023)
  - Auto Workshop Operations
  - IT Systems Engineering (15+ years)
- AI Infrastructure cards:
  - CortexClaw: Mac Mini M4, Claude API, MLX
  - Vanguard: Hetzner VPS, Kimi K2.5, Tailscale
- Dev Machine: MacBook Pro 16" M2 Pro

Cards use bg-card, border, rounded-lg, mono labels.

- [ ] **Step 2: Add to homepage with `id="about"`**

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx src/app/page.tsx
git commit -m "feat: About section with timeline and infrastructure cards"
```

---

### Task 14: Contact Section

**Files:**
- Create: `src/components/sections/Contact.tsx`
- Create: `src/app/api/contact/route.ts`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create contact API route**

`src/app/api/contact/route.ts`:
- POST handler
- Zod validation: name (string, min 1), email (string, email), message (string, min 10), honeypot field (must be empty)
- Send email via Resend to junaidburke@gmail.com
- Return JSON success/error response
- Guard: check RESEND_API_KEY exists

```typescript
import { Resend } from 'resend'
import { z } from 'zod'
import { NextResponse } from 'next/server'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(10),
  honeypot: z.string().max(0),
})
```

Zod is installed in Task 1, Step 2. Implement the route with Zod validation.

- [ ] **Step 2: Create Contact component (client)**

`'use client'` — has form state management.
- Two-column grid
- LEFT:
  - CTA heading + subtext
  - Contact form: name, email, message fields + honeypot (hidden)
  - Submit button with loading state
  - Success/error message display
  - Calendly booking card (green gradient border, link to https://calendly.com/junaidburke)
  - Email card (junaidburke@gmail.com)
- RIGHT:
  - Social links as full-width cards with SVG icons:
    - X (x.com/JunaidBurke)
    - LinkedIn (linkedin.com/in/junaidburke)
    - GitHub (github.com/JunaidBurke)

- [ ] **Step 3: Add to homepage with `id="contact"`**

- [ ] **Step 4: Verify form submits** (will fail without real Resend key, but should handle gracefully)

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/Contact.tsx src/app/api/contact/route.ts src/app/page.tsx
git commit -m "feat: Contact section with Resend form, Calendly, and social links"
```

---

## Phase 3: Blog System

### Task 15: Blog Utilities

**Files:**
- Create: `src/lib/blog.ts`

- [ ] **Step 1: Create blog utility functions**

`src/lib/blog.ts`:
```typescript
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  published: boolean
  readingTime: string  // Use readingTime(content).text to get the string value
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

export function getAllPosts(): BlogPost[] { ... }
export function getPostBySlug(slug: string): BlogPost | null { ... }
export function getAllTags(): string[] { ... }
export function getAllCategories(): string[] { ... }
```

- Read MDX files from `src/content/blog/`
- Parse frontmatter with gray-matter
- Calculate reading time
- Sort by date descending
- Filter out `published: false`

- [ ] **Step 2: Commit**

```bash
git add src/lib/blog.ts
git commit -m "feat: blog utility functions for MDX parsing"
```

---

### Task 16: Blog MDX Content

**Files:**
- Create: `src/content/blog/supabase-multi-schema-platform.mdx`
- Create: `src/content/blog/operator-to-architect-cowork.mdx`
- Create: `src/content/blog/feature-creep-killed-my-first-saas.mdx`
- Create: `src/content/blog/claude-code-tips-for-solo-founders.mdx`
- Create: `src/content/blog/sms-ai-advisor-auto-shops.mdx`

- [ ] **Step 1: Create all 5 blog posts**

Each post: proper frontmatter (title, description, date, tags, category, published: true) + 200-300 words of placeholder content with headings, code blocks, and technical language appropriate to the topic.

Dates staggered: March 20, March 15, March 10, March 5, March 1 (2026).

- [ ] **Step 2: Commit**

```bash
git add src/content/blog/
git commit -m "feat: 5 starter blog posts with MDX content"
```

---

### Task 17: Blog Card & Tag Filter Components

**Files:**
- Create: `src/components/blog/BlogCard.tsx`
- Create: `src/components/blog/TagFilter.tsx`

- [ ] **Step 1: Create BlogCard**

Server component. Props: `post: BlogPost`.
- Card with bg-card, border, rounded-xl, hover:bg-card-hover transition
- Title (h3, link to /blog/[slug])
- Description (text-muted, 2 lines max)
- Bottom row: date (mono, text-dim) + reading time (mono, text-dim) + tags (small pills)
- Category badge in top-right corner

- [ ] **Step 2: Create TagFilter (client component)**

`'use client'` — manages filter state.
Props: `categories: string[]`, `tags: string[]`, `posts: BlogPost[]`.
- Category tabs (horizontal row, active = green underline)
- Tag pills (flex-wrap, clickable, active = green bg)
- Uses URL search params or local state for filter state
- Renders filtered BlogCard list

- [ ] **Step 3: Commit**

```bash
git add src/components/blog/BlogCard.tsx src/components/blog/TagFilter.tsx
git commit -m "feat: BlogCard and TagFilter components"
```

---

### Task 18: Blog Listing Page

**Files:**
- Create: `src/app/blog/page.tsx`

- [ ] **Step 1: Create blog listing page**

Server component that fetches all posts, categories, tags.
- Metadata: title "Blog | Junaid Burke", description
- SectionHeading
- Passes data to TagFilter (client) which renders BlogCards
- Sorted by date descending

- [ ] **Step 2: Verify in browser at /blog**

Should show 5 posts with filter bar.

- [ ] **Step 3: Commit**

```bash
git add src/app/blog/page.tsx
git commit -m "feat: blog listing page with category/tag filters"
```

---

### Task 19: Blog Post Page (MDX Rendering)

**Files:**
- Create: `src/app/blog/[slug]/page.tsx`
- Create: `src/components/blog/MDXComponents.tsx`

- [ ] **Step 1: Create MDX component overrides**

`src/components/blog/MDXComponents.tsx`:
- Custom `pre`/`code` blocks (styled for the dark theme, rounded corners, bg-flow)
- Custom `h1`-`h6` with anchor links (via rehype-slug + rehype-autolink-headings)
- Custom `blockquote` as callout box (green left border)
- Custom `a` with green color and hover underline
- Custom `img` wrapper using next/image if applicable

- [ ] **Step 2: Create blog post page**

`src/app/blog/[slug]/page.tsx`:
- `generateStaticParams()` to pre-generate all slugs
- `generateMetadata()` for dynamic SEO (title, description, OG image via /api/og)
- Fetch post by slug
- Render with `MDXRemote` from next-mdx-remote/rsc (for server-side MDX)
- Layout: max-w-3xl centered
  - "Back to Blog" link at top
  - Tags row
  - Title (h1)
  - Date + reading time (mono, text-muted)
  - MDX content
  - Next/prev post navigation at bottom
- Table of contents sidebar:
  - Extract headings from MDX content (regex or rehype plugin)
  - Sticky sidebar on lg screens, hidden on mobile
  - Links to heading anchors

Note: Use `next-mdx-remote/rsc` for App Router server component rendering. Pass rehype plugins to MDXRemote options:
- `rehype-pretty-code` with `{ theme: 'github-dark' }` for dark-theme syntax highlighting
- `rehype-slug` for heading IDs
- `rehype-autolink-headings` for clickable heading links

TOC extraction: Use regex on raw MDX content before rendering to extract headings:
```typescript
const headings = content.match(/^#{2,3}\s+(.+)$/gm)?.map(h => ({
  level: h.startsWith('### ') ? 3 : 2,
  text: h.replace(/^#{2,3}\s+/, ''),
  id: h.replace(/^#{2,3}\s+/, '').toLowerCase().replace(/\s+/g, '-'),
})) ?? []
```

- [ ] **Step 3: Verify by visiting /blog/supabase-multi-schema-platform**

Code blocks should have syntax highlighting. TOC should be visible on desktop.

- [ ] **Step 4: Commit**

```bash
git add src/app/blog/\[slug\]/page.tsx src/components/blog/MDXComponents.tsx
git commit -m "feat: blog post page with MDX rendering, syntax highlighting, and TOC"
```

---

### Task 20: Blog Preview on Homepage

**Files:**
- Create: `src/components/sections/BlogPreview.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Create BlogPreview component**

Server component.
- SectionHeading with "Blog" label
- Renders latest 3 posts as BlogCards in a 3-column grid (stacks on mobile)
- "View All Posts →" link to /blog (green text, arrow icon)

- [ ] **Step 2: Add to homepage between Testimonial and Consulting**

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/BlogPreview.tsx src/app/page.tsx
git commit -m "feat: blog preview section on homepage showing latest 3 posts"
```

---

## Phase 4: Product Pages, SEO & Infrastructure

### Task 21: Product Coming Soon Pages

**Files:**
- Create: `src/app/products/[slug]/page.tsx`

- [ ] **Step 1: Create product placeholder page**

Server component.
- `generateStaticParams()` for all 6 product slugs
- `generateMetadata()` with product name
- Lookup product data from `src/lib/products.ts`
- Centered card (max-w-lg):
  - Product badge
  - Product name (h1)
  - One-liner description
  - "Coming Soon" text
  - Email signup form (name + email input, connects to /api/contact with subject "Product Interest: {name}")
  - Back to homepage link

- [ ] **Step 2: Verify /products/ottomanagerpro loads**

- [ ] **Step 3: Commit**

```bash
git add src/app/products/\[slug\]/page.tsx
git commit -m "feat: product coming soon placeholder pages with email signup"
```

---

### Task 22: Dynamic OG Image Generation

**Files:**
- Create: `src/app/api/og/route.tsx`

- [ ] **Step 1: Create OG image route**

`src/app/api/og/route.tsx`:
- Uses `ImageResponse` from `next/og` (Next.js 14+ re-exports from @vercel/og)
- Query param: `title` (string)
- Renders: dark background (#07070c), green accent line, "junaidburke.com" branding, title text in Outfit font
- Size: 1200x630

- [ ] **Step 2: Commit**

```bash
git add src/app/api/og/route.tsx
git commit -m "feat: dynamic OG image generation with @vercel/og"
```

---

### Task 23: RSS Feed

**Files:**
- Create: `src/app/feed.xml/route.ts`

- [ ] **Step 1: Create RSS feed route**

```typescript
import { getAllPosts } from '@/lib/blog'

export async function GET() {
  const posts = getAllPosts()
  const xml = generateRssXml(posts) // Build RSS 2.0 XML string
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}
```

Generate valid RSS 2.0 XML with channel info and item entries for each post.

- [ ] **Step 2: Verify /feed.xml returns valid XML**

- [ ] **Step 3: Commit**

```bash
git add src/app/feed.xml/route.ts
git commit -m "feat: RSS feed at /feed.xml"
```

---

### Task 24: Sitemap & Robots

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create sitemap**

```typescript
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const blogUrls = posts.map(post => ({
    url: `https://junaidburke.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))
  return [
    { url: 'https://junaidburke.com', lastModified: new Date() },
    { url: 'https://junaidburke.com/blog', lastModified: new Date() },
    ...blogUrls,
    // Product pages
    ...['ottomanagerpro', 'inbox-command-center', 'tiremanagerpro', 'fieldagent-ai', 'cleanbuddypro', 'frameit'].map(slug => ({
      url: `https://junaidburke.com/products/${slug}`,
      lastModified: new Date(),
    })),
  ]
}
```

- [ ] **Step 2: Create robots.ts**

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://junaidburke.com/sitemap.xml',
  }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts
git commit -m "feat: dynamic sitemap and robots.txt"
```

---

## Phase 5: Polish & Verification

### Task 25: Responsive & Mobile Polish

**Files:**
- Modify: Multiple component files as needed

- [ ] **Step 1: Test all pages at 375px, 768px, 1024px, 1440px widths**

Check:
- Navbar collapses to hamburger on mobile
- All grids stack properly on mobile
- Touch targets are minimum 44x44px
- Flow diagrams are readable on mobile
- Blog cards stack single-column on mobile
- Contact form is usable on mobile
- No horizontal overflow anywhere

- [ ] **Step 2: Fix any responsive issues found**

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix: responsive layout polish for mobile and tablet"
```

---

### Task 26: Build Verification

**Files:** None (verification only)

- [ ] **Step 1: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: No errors.

- [ ] **Step 2: Run ESLint**

```bash
npm run lint
```

Expected: No errors.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build succeeds. All pages pre-rendered. No warnings about missing images or broken imports.

- [ ] **Step 4: Test production build locally**

```bash
npm run start
```

Navigate to all routes: /, /blog, /blog/[each-slug], /products/ottomanagerpro, /feed.xml, /sitemap.xml, /robots.txt, /api/og?title=Test

- [ ] **Step 5: Fix any issues found**

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: build verification pass — all checks passing"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-4 | Project scaffold, design system, layout, UI primitives |
| 2 | 5-14 | Navbar, Footer, all homepage sections |
| 3 | 15-20 | Blog system (utilities, content, listing, post pages, preview) |
| 4 | 21-24 | Product pages, OG images, RSS, sitemap, robots |
| 5 | 25-26 | Responsive polish and build verification |

**Total: 26 tasks, ~130 steps**

**Dependencies:**
- Phase 1 must complete before Phase 2 (design system needed for all components)
- Tasks 6-14 within Phase 2 can be parallelized (sections are independent), EXCEPT Task 20 (BlogPreview) depends on Task 15 (blog utilities) and Task 17 (BlogCard) — so Task 20 must run after those
- Phase 3 Task 15 (blog utilities) must come before Tasks 16-20
- Phase 4 tasks are independent of each other
- Phase 5 must be last

**Parallelization opportunities:**
- Tasks 6-14 (homepage sections, excluding 20) can run in parallel after Task 5
- Tasks 21-24 (product pages, OG, RSS, sitemap) can run in parallel
- Task 16 (blog content) can run in parallel with Task 17 (blog components)
