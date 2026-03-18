import { products } from '@/lib/products'
import { ProductBlock } from './ProductBlock'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/ui/FadeIn'
import { InboxShowcase } from './InboxShowcase'

export function Products() {
  return (
    <section id="products" className="py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Products"
          title="Products & AI Flows"
          description="Each product runs on the shared Supabase multi-schema platform."
        />
        <div className="space-y-24">
          {products.map((product, i) => (
            <FadeIn key={product.slug}>
              <ProductBlock
                product={product}
                reversed={i % 2 === 1}
                showcase={product.slug === 'inbox-command-center' ? <InboxShowcase /> : undefined}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
