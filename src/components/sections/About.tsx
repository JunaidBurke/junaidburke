import { Server, Monitor, Laptop } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'

const TIMELINE = [
  { period: '2024 – Present', role: 'Founder & Solo Engineer' },
  { period: '2023', role: 'Full-Stack Web Development' },
  { period: '2018 – 2023', role: 'Auto Workshop Operations' },
  { period: '15+ years', role: 'IT Systems Engineering' },
] as const

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* LEFT: Narrative */}
        <FadeIn>
          <div>
            <SectionHeading label="About" title="Systems Engineer Turned Solo Founder" />

            <div className="space-y-4 text-text-mid">
              <p>
                After 15+ years building enterprise IT infrastructure, I started building software
                for the industries I know best — auto repair, field service, and cleaning businesses.
              </p>
              <p>
                Every product I build is validated against a live, multi-location business. Not in
                theory, not with surveys — with real operators, real customers, and real revenue
                pressure.
              </p>
              <p>
                I work evenings and weekends, shipping on a unified Supabase platform that powers
                six products from a single monorepo. MVP discipline is non-negotiable — if it
                doesn&apos;t solve a problem someone will pay for today, it doesn&apos;t get built.
              </p>
            </div>

            {/* Philosophy callout */}
            <div className="mt-8 border-l-4 border-green bg-green/5 rounded-r-lg p-6">
              <p className="text-text italic">
                &ldquo;Build systems, not features. Ship fast, validate faster. Every product earns
                its place by solving a problem someone is willing to pay for — today, not
                someday.&rdquo;
              </p>
            </div>
          </div>
        </FadeIn>

        {/* RIGHT: Timeline + Infrastructure */}
        <FadeIn delay={200}>
          <div className="space-y-8">
            {/* Career Timeline */}
            <div>
              <h4 className="font-mono text-xs text-green uppercase tracking-wider mb-4">
                Timeline
              </h4>
              <div className="space-y-0">
                {TIMELINE.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 py-3 border-l-2 border-border-hi pl-4 relative"
                  >
                    <div className="absolute left-[-5px] top-4 w-2 h-2 rounded-full bg-green" />
                    <div>
                      <span className="font-mono text-xs text-text-dim block">{item.period}</span>
                      <span className="text-text text-sm">{item.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Infrastructure */}
            <div>
              <h4 className="font-mono text-xs text-green uppercase tracking-wider mb-4">
                AI Infrastructure
              </h4>
              <div className="space-y-3">
                <div className="bg-bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Server className="w-4 h-4 text-cyan" />
                    <span className="font-mono text-sm text-text">CortexClaw</span>
                  </div>
                  <p className="text-xs text-text-dim">Mac Mini M4 · Claude API · MLX</p>
                </div>
                <div className="bg-bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Monitor className="w-4 h-4 text-purple" />
                    <span className="font-mono text-sm text-text">Vanguard</span>
                  </div>
                  <p className="text-xs text-text-dim">Hetzner VPS · Kimi K2.5 · Tailscale</p>
                </div>
                <div className="bg-bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Laptop className="w-4 h-4 text-orange" />
                    <span className="font-mono text-sm text-text">Dev Machine</span>
                  </div>
                  <p className="text-xs text-text-dim">MacBook Pro 16&quot; M2 Pro</p>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
