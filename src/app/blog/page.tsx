import { getAllPosts, getAllCategories, getAllTags } from '@/lib/blog'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TagFilter } from '@/components/blog/TagFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical deep-dives, founder journey, AI experiments, and tooling reviews by Junaid Burke.',
}

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const tags = getAllTags()

  return (
    <section className="py-20 px-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          label="Blog"
          title="Writing & Thinking"
          description="Technical deep-dives, founder journey, AI experiments, and industry insights."
        />
        <TagFilter categories={categories} tags={tags} posts={posts} />
      </div>
    </section>
  )
}
