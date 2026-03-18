import { getAllPosts } from '@/lib/blog'
import { BlogCard } from '@/components/blog/BlogCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { FadeIn } from '@/components/ui/FadeIn'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3)

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeading label="Blog" title="Latest Posts" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={i * 100}>
              <BlogCard post={post} />
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={400}>
          <div className="mt-8 text-center">
            <Link href="/blog" className="inline-flex items-center gap-2 text-green font-mono text-sm hover:underline">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
