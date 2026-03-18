import { MapPin } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionHeading } from '@/components/ui/SectionHeading'

const LOCATIONS = ['Wilmington, DE', 'Newark, DE', 'Bear, DE'] as const

const STACK: [string, string][] = [
  ['Website', 'Next.js on Vercel'],
  ['AI Chat', 'Otto Agent'],
  ['Email', 'Zoho Mail'],
  ['Forms', 'Resend'],
  ['Domain', 'burkestire.com'],
  ['Live', 'burkes-tire.vercel.app'],
]

export function BurkesTire() {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Client Showcase" title="Burke's Tire & Auto Repair" />

        <FadeIn>
          <div className="bg-bg-card border border-border rounded-xl p-8 grid md:grid-cols-2 gap-8">
            {/* LEFT: Description + locations */}
            <div>
              <p className="text-text-mid mb-6">
                Three-location auto repair business in Delaware. Built their entire digital
                infrastructure from scratch — website, AI chat advisor, email system, and contact
                forms.
              </p>
              <div className="space-y-3">
                {LOCATIONS.map((loc) => (
                  <div key={loc} className="flex items-center gap-2 text-text-muted text-sm">
                    <MapPin className="w-4 h-4 text-green flex-shrink-0" />
                    {loc}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Delivered Stack */}
            <div>
              <h4 className="font-mono text-xs text-text-dim uppercase tracking-wider mb-4">
                Delivered Stack
              </h4>
              <div className="space-y-3">
                {STACK.map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-b border-border/50 pb-2"
                  >
                    <span className="font-mono text-xs text-text-muted">{label}</span>
                    <span className="text-sm text-text">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
