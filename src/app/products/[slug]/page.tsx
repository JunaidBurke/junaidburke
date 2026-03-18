import { products } from '@/lib/products'
import { Badge } from '@/components/ui/Badge'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ProductSignup } from './ProductSignup'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  return { title: product.name, description: product.intro }
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const oneLiner = product.intro.split('.')[0] + '.'

  return (
    <main className="min-h-screen px-4 py-16">
      <div className="max-w-lg mx-auto mt-24">
        <div className="rounded-2xl border border-white/10 bg-bg-card p-8 flex flex-col gap-6">
          <Badge variant={product.badge.variant}>{product.badge.text}</Badge>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-text-primary">{product.name}</h1>
            <p className="text-text-secondary leading-relaxed">{oneLiner}</p>
          </div>

          <p className="font-mono text-sm text-text-dim tracking-widest uppercase">
            Coming Soon
          </p>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-text-secondary mb-4">
              Get notified when {product.name} launches.
            </p>
            <ProductSignup productName={product.name} />
          </div>

          <Link
            href="/"
            className="text-sm text-text-dim hover:text-text-secondary transition-colors inline-flex items-center gap-1 mt-2"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
