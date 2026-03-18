import { FadeIn } from '@/components/ui/FadeIn'

export function Testimonial() {
  return (
    <section className="py-20 px-6">
      <FadeIn>
        <div className="max-w-3xl mx-auto bg-bg-card border border-border rounded-xl p-8 md:p-12 border-l-4 border-l-green relative">
          <span
            className="absolute top-6 left-6 text-green/20 text-6xl font-serif leading-none select-none"
            aria-hidden="true"
          >
            "
          </span>

          <blockquote className="text-lg md:text-xl text-text-mid italic leading-relaxed mb-6 relative z-10 pl-4">
            Junaid built our entire web presence from scratch — the website, our AI chat assistant Otto,
            email migration, everything. He understands the auto repair business because he&apos;s been
            in it. The technology he&apos;s building for shops like ours doesn&apos;t exist anywhere else.
          </blockquote>

          <div className="pl-4">
            <p className="text-text font-medium">Burke&apos;s Tire &amp; Auto Repair</p>
            <p className="text-text-dim text-sm font-mono">3 Locations · Delaware</p>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
