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
  cta: { label: string; href: string }
}

export const products: Product[] = [
  {
    slug: 'ottomanagerpro',
    name: 'OttoManagerPro',
    badge: { text: 'A2P Approved · Launch Ready', variant: 'live' },
    intro:
      'SMS-based AI service advisor for auto repair shops. Customers text in, Claude classifies intent, retrieves shop context from Supabase, generates a response, and gates on confidence before sending.',
    howItWorks:
      'Inbound SMS hits a Twilio webhook, which triggers an intent classification pass through Claude. The system pulls customer history and shop context from Supabase, generates a contextual response, runs it through a confidence gate, and delivers via SMS — all in under 3 seconds.',
    flow: [
      { label: 'Customer SMS', type: 'input' },
      { label: 'Twilio Webhook', type: 'process' },
      { label: 'Intent Classification', sublabel: 'LLM: Claude', type: 'llm' },
      { label: 'Context Retrieval', sublabel: 'Supabase', type: 'data' },
      { label: 'Response Generation', sublabel: 'LLM: Claude', type: 'llm' },
      { label: 'Confidence Gate', type: 'gate' },
      { label: 'SMS Delivered', type: 'output' },
    ],
    tech: [
      'Twilio SMS',
      'Anthropic Claude',
      'Supabase (otto_v2)',
      'Next.js API Routes',
      'Clerk Auth',
      'Stripe Billing',
    ],
    cta: { label: 'View Product', href: '/products/ottomanagerpro' },
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
    slug: 'tiremanagerpro',
    name: 'TireManagerPro',
    badge: { text: 'V2 · Pre-Launch', variant: 'beta' },
    intro:
      'Full-stack auto repair shop management — rebuilt from the ground up after V1 died to feature creep. V2 ships with RLS-enforced multi-tenancy and role-based views.',
    howItWorks:
      'Clerk handles auth and org-level RBAC. Every database query passes through Supabase RLS policies using public.is_org_member(org_id). All mutations are Zod-validated before touching the database.',
    flow: [
      { label: 'Clerk Auth', type: 'input' },
      { label: 'Role-Based Views', type: 'process' },
      { label: 'Supabase RLS', sublabel: 'is_org_member(org_id)', type: 'data' },
      { label: 'Zod Validation', type: 'gate' },
      { label: 'Real-Time Sync', type: 'output' },
    ],
    tech: [
      'Next.js 14+',
      'Supabase RLS (tire_v2)',
      'Clerk RBAC',
      'Zod',
      'Tailwind/shadcn',
    ],
    cta: { label: 'View Product', href: '/products/tiremanagerpro' },
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
    slug: 'cleanbuddypro',
    name: 'CleanBuddyPro',
    badge: { text: 'In Development', variant: 'dev' },
    intro:
      'Cleaning business management built from real pain-point gap analysis. Job scheduling, crew dispatch, and automated invoicing on the shared Supabase platform.',
    howItWorks:
      'Runs on the shared 6-schema Supabase platform. A recurring job scheduler triggers crew dispatch based on availability and location, then auto-generates invoices via Stripe.',
    flow: [
      { label: 'Shared Supabase Platform', sublabel: '6 schemas', type: 'data' },
      { label: 'Job Scheduler', type: 'process' },
      { label: 'Crew Dispatch', type: 'process' },
      { label: 'Invoice Generation', type: 'output' },
    ],
    tech: [
      'Next.js',
      'Supabase (cleanbuddy)',
      'Recurring Scheduler',
      'Stripe Invoicing',
      'Crew Management',
    ],
    cta: { label: 'View Product', href: '/products/cleanbuddypro' },
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
