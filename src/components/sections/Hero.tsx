import { FadeIn } from '@/components/ui/FadeIn'
import { TechTag } from '@/components/ui/TechTag'

const techStack = [
  'Next.js 14+',
  'TypeScript',
  'Supabase Multi-Schema',
  'Clerk',
  'Anthropic Claude API',
  'Twilio',
  'Stripe',
  'Vercel',
  'Tailwind/shadcn',
]

export function Hero() {
  return (
    <FadeIn>
      <section className="py-32 lg:py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Tagline */}
          <p className="font-mono text-text-muted uppercase text-sm tracking-[0.2em] mb-6">
            Solo Founder · Systems Engineer · AI Builder
          </p>

          {/* H1 with gradient text */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
            I build{' '}
            <span className="gradient-text">AI-powered tools</span>
            {' '}for service businesses.
          </h1>

          {/* Subtext */}
          <p className="text-text-mid text-lg max-w-2xl mx-auto mb-12">
            15+ years of IT systems engineering, now channeled into agentic AI workflows
            for auto repair, field service, and cleaning businesses. Built solo, evenings
            and weekends, on a unified Supabase multi-schema platform.
          </p>

          {/* Tech stack chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {techStack.map((tech, i) => (
              <FadeIn key={tech} delay={i * 50}>
                <TechTag>{tech}</TechTag>
              </FadeIn>
            ))}
          </div>

          {/* Subtle divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-md mx-auto" />
        </div>
      </section>
    </FadeIn>
  )
}
