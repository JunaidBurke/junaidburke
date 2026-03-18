import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'

export function Consulting() {
  return (
    <section id="consulting" className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Services"
          title="Cowork Consulting"
          description="AI workflow architecture for solo founders and small teams."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1: Starter Build */}
          <FadeIn>
            <div className="bg-bg-card border border-border rounded-xl p-6 h-full">
              <h3 className="text-lg font-bold text-text mb-4">Starter Build</h3>
              <ul className="space-y-2 text-text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  Done-for-you 5-layer architecture
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  3 custom skills
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  Gmail/Calendar connector
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  Walkthrough call
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Card 2: Pro Architecture (featured) */}
          <FadeIn delay={100}>
            <div className="bg-bg-card border-2 border-green rounded-xl p-6 h-full relative shadow-[0_0_30px_rgba(0,255,170,0.08)]">
              <Badge variant="live">Popular</Badge>
              <h3 className="text-lg font-bold text-text mb-4 mt-3">Pro Architecture</h3>
              <ul className="space-y-2 text-text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  Full 5-layer build
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  10+ custom skills
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  Scheduled automations
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  All connectors
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">▸</span>
                  30-day retainer
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Card 3: Skill Packs */}
          <FadeIn delay={200}>
            <div className="bg-bg-card border border-border rounded-xl p-6 h-full">
              <h3 className="text-lg font-bold text-text mb-4">Skill Packs</h3>
              <ul className="space-y-2 text-text-muted text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-cyan mt-1">▸</span>
                  Auto Repair
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan mt-1">▸</span>
                  Real Estate
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan mt-1">▸</span>
                  Freelancer/Consultant
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan mt-1">▸</span>
                  Inbox Command Center
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
