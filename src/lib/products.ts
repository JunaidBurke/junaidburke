export interface FlowStep {
  label: string
  sublabel?: string
  type: 'input' | 'process' | 'llm' | 'data' | 'gate' | 'output'
}

export interface Product {
  slug: string
  name: string
  badge: { text: string; variant: 'live' | 'beta' | 'dev' | 'new' | 'skill' }
  intro: string
  howItWorks: string
  flow: FlowStep[]
  flowOrientation?: 'vertical' | 'horizontal'
  tech: string[]
  mascot?: { src: string; alt: string }
  cta: { label: string; href: string }
}

export const products: Product[] = [
  {
    slug: 'ottomanagerpro',
    name: 'OttoManagerPro',
    badge: { text: 'A2P Approved · Live', variant: 'live' },
    intro:
      'AI shop manager that books appointments via website chat, sends smart SMS reminders when vehicles are due for service, and tracks customer retention — so shop owners can focus on turning wrenches.',
    howItWorks:
      'Connect your customer and vehicle data. Otto monitors service histories and calculates when each vehicle is due. Smart SMS reminders go out automatically — customers reply to book, and the appointment lands on your calendar.',
    flow: [
      { label: 'Customer Data Import', type: 'input' },
      { label: 'Otto Monitors & Tracks', type: 'process' },
      { label: 'AI Calculates Due Dates', sublabel: 'LLM: Claude', type: 'llm' },
      { label: 'Smart SMS Reminders', type: 'output' },
      { label: 'Customer Replies', type: 'input' },
      { label: 'Appointment Booked', type: 'output' },
    ],
    tech: [
      'Twilio SMS',
      'Anthropic Claude',
      'Supabase',
      'Next.js',
      'Clerk Auth',
      'Stripe Billing',
      'AI Website Chat',
    ],
    mascot: { src: '/images/otto-otto.png', alt: 'Otto — the AI shop manager mascot' },
    cta: { label: 'Visit OttoManagerPro', href: 'https://www.ottomanagerpro.com' },
  },
  {
    slug: 'tiremanagerpro',
    name: 'TireManagerPro',
    badge: { text: 'V2 · Live', variant: 'live' },
    intro:
      'Production SaaS for tire shops — POS, used & new tire inventory, purchasing pipeline with dealer/distributor management, analytics, and multi-tenant team management with role-based access.',
    howItWorks:
      'Daily operations flow from point-of-sale transactions through inventory updates across used and new tire catalogs, into purchasing workflows with dealers and distributors, and close out with EOD reconciliation and analytics reporting.',
    flow: [
      { label: 'Point of Sale', type: 'input' },
      { label: 'Inventory Management', sublabel: 'Used & New Catalogs', type: 'process' },
      { label: 'Purchasing Pipeline', sublabel: 'Dealers & Distributors', type: 'process' },
      { label: 'Analytics & Reporting', type: 'data' },
      { label: 'Clerk Auth + RBAC', sublabel: 'Team & Roles', type: 'gate' },
      { label: 'Real-Time Multi-Tenant', type: 'output' },
    ],
    tech: [
      'Next.js 16',
      'Supabase RLS',
      'Clerk RBAC',
      'Zod',
      'shadcn/ui',
      'Stripe Billing',
    ],
    cta: { label: 'Visit TireManagerPro', href: 'https://www.tiremanagerpro.com' },
  },
  {
    slug: 'cleanbuddypro',
    name: 'CleanBuddyPro',
    badge: { text: 'Live', variant: 'live' },
    intro:
      'All-in-one business management for specialty cleaning pros — estimates, invoicing, Stripe payments, expense tracking, a branded customer portal with magic-link access, and team management with RBAC.',
    howItWorks:
      'Create estimates from service templates, send via branded portal. Customers accept and pay online 24/7. Accepted estimates auto-convert to invoices with configurable payment reminders. Recurring clients get auto-generated invoices on schedule. Track expenses, generate P&L and tax reports.',
    flow: [
      { label: 'Estimates & Templates', type: 'input' },
      { label: 'Customer Portal', sublabel: 'Magic-Link Access', type: 'process' },
      { label: 'Invoicing & Payments', sublabel: 'Stripe + Auto-Reminders', type: 'process' },
      { label: 'Expense Tracking', sublabel: 'COGS & Overhead', type: 'data' },
      { label: 'Team RBAC', sublabel: 'Role-Based Access', type: 'gate' },
      { label: 'P&L & Tax Reports', type: 'output' },
    ],
    tech: [
      'Next.js',
      'Supabase',
      'Clerk Auth',
      'Stripe Billing',
      'Customer Portal',
      'Automated Reminders',
    ],
    cta: { label: 'Visit CleanBuddyPro', href: 'https://www.cleanbuddypro.com' },
  },
  {
    slug: 'inbox-command-center',
    name: 'Inbox Command Center',
    badge: { text: 'Claude Cowork Skill', variant: 'skill' },
    intro:
      'AI-powered email triage that classifies urgency, surfaces actionable items, and renders a dashboard with one-click actions. Built as a Claude Cowork skill.',
    howItWorks:
      'Fetches unread emails via Gmail API, pipes each through Claude for urgency classification and action extraction, then renders a prioritized dashboard with contextual action buttons.',
    flow: [
      { label: 'Fetch Gmail API', type: 'input' },
      { label: 'Claude Classifies Urgency', sublabel: 'LLM: Claude', type: 'llm' },
      { label: 'Render Dashboard + Actions', type: 'output' },
    ],
    flowOrientation: 'horizontal',
    tech: [
      'Claude Cowork',
      'Gmail API',
      'AI Triage',
      'Action Buttons',
      'Scheduled Automation',
    ],
    cta: { label: 'View Product', href: '/products/inbox-command-center' },
  },
  {
    slug: 'fieldagent-ai',
    name: 'FieldAgent AI',
    badge: { text: 'PRD Complete', variant: 'dev' },
    intro:
      'Multi-agent dispatch system that matches the right technician to the right job using parallel AI agents for intake, scoring, routing, scheduling, notification, and feedback.',
    howItWorks:
      'Six specialized agents run in parallel: Intake parses the job via NLP, Matching scores technician fit, Routing optimizes geography, Scheduling resolves conflicts, Notification alerts the tech, and Feedback reinforces the model.',
    flow: [
      { label: 'Intake Agent', sublabel: 'NLP', type: 'llm' },
      { label: 'Matching Agent', sublabel: 'Scoring', type: 'process' },
      { label: 'Routing Agent', sublabel: 'Geo', type: 'data' },
      { label: 'Scheduling Agent', sublabel: 'Conflicts', type: 'gate' },
      { label: 'Notification Agent', type: 'output' },
      { label: 'Feedback Agent', sublabel: 'Reinforcement', type: 'llm' },
    ],
    tech: [
      'Multi-Agent Architecture',
      'Anthropic Claude',
      'Supabase (fieldagent_ai)',
      'Parallel Dispatch',
      'Next.js',
    ],
    cta: { label: 'View Product', href: '/products/fieldagent-ai' },
  },
  {
    slug: 'frameit',
    name: 'FrameIt',
    badge: { text: 'New Concept · PRD Complete', variant: 'new' },
    intro:
      'AI-generated photo layouts for life events. You pick the event and theme — AI generates layout assets and arranges your photos. Photos stay untouched.',
    howItWorks:
      'User configures an event and selects a theme. AI generates decorative theme assets, then a layout algorithm arranges uploaded photos with the generated assets. Export as print-ready output.',
    flow: [
      { label: 'Event Config', type: 'input' },
      { label: 'Theme Asset Generation', sublabel: 'AI: Image Gen', type: 'llm' },
      { label: 'Layout Engine', sublabel: 'AI: Layout Algorithm', type: 'llm' },
      { label: 'Photo Placement & Export', type: 'output' },
    ],
    tech: [
      'AI Layout Generation',
      'Image Gen Models',
      'Next.js',
      'Supabase Storage',
      'Drag & Drop UX',
    ],
    cta: { label: 'View Product', href: '/products/frameit' },
  },
]
