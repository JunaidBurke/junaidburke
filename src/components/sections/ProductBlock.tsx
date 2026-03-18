import { type ReactNode } from 'react'
import { type Product } from '@/lib/products'
import { Badge } from '@/components/ui/Badge'
import { TechTag } from '@/components/ui/TechTag'
import { Button } from '@/components/ui/Button'
import { FlowDiagram } from '@/components/sections/FlowDiagram'

interface ProductBlockProps {
  product: Product
  reversed?: boolean
  showcase?: ReactNode
}

export function ProductBlock({ product, reversed = false, showcase }: ProductBlockProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left column — content */}
      <div className={reversed ? 'lg:order-2' : 'lg:order-1'}>
        <Badge variant={product.badge.variant}>{product.badge.text}</Badge>

        <h3 className="text-2xl font-bold text-text mt-4 mb-2">{product.name}</h3>

        <div className="border-l-4 border-green bg-green/5 rounded-r-lg p-4 my-4">
          <p className="text-text-mid text-sm">{product.intro}</p>
        </div>

        {showcase}

        <p className="font-mono text-xs text-text-dim uppercase tracking-wider mb-2">
          How the AI Works
        </p>
        <p className="text-text-muted text-sm">{product.howItWorks}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          {product.tech.map((tag) => (
            <TechTag key={tag}>{tag}</TechTag>
          ))}
        </div>

        <div className="mt-6">
          <Button href={product.cta.href} variant="secondary">
            {product.cta.label}
          </Button>
        </div>
      </div>

      {/* Right column — flow diagram */}
      <div className={reversed ? 'lg:order-1' : 'lg:order-2'}>
        <FlowDiagram
          steps={product.flow}
          orientation={product.flowOrientation ?? 'vertical'}
        />
      </div>
    </div>
  )
}
