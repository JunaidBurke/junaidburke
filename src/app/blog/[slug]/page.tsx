import { getAllPosts, getPostBySlug } from '@/lib/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/components/blog/MDXComponents'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

interface Heading {
  level: 2 | 3
  text: string
  id: string
}

function extractHeadings(content: string): Heading[] {
  const matches = content.match(/^#{2,3}\s+(.+)$/gm)
  return (
    matches?.map((h) => ({
      level: (h.startsWith('### ') ? 3 : 2) as 2 | 3,
      text: h.replace(/^#{2,3}\s+/, ''),
      id: h
        .replace(/^#{2,3}\s+/, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, ''),
    })) ?? []
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const headings = extractHeadings(post.content)
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null

  return (
    <section className="py-20 px-6 pt-24">
      <div className="max-w-6xl mx-auto flex gap-12">
        {/* Main content */}
        <article className="max-w-3xl flex-1 min-w-0">
          <Link
            href="/blog"
            className="text-text-muted hover:text-green text-sm font-mono mb-8 inline-flex items-center gap-1 transition-colors"
          >
            ← Back to Blog
          </Link>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs bg-bg-flow border border-border px-2.5 py-1 rounded text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">{post.title}</h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-text-dim font-mono text-sm mb-12">
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          {/* MDX Content */}
          <div className="prose-custom">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  rehypePlugins: [
                    rehypeSlug,
                    [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                    [rehypePrettyCode, { theme: 'github-dark' }],
                  ],
                },
              }}
            />
          </div>

          {/* Prev / Next navigation */}
          {(prevPost || nextPost) && (
            <nav className="grid grid-cols-2 gap-4 mt-16 pt-8 border-t border-border">
              <div>
                {prevPost && (
                  <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col gap-1 hover:text-green transition-colors"
                  >
                    <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
                      ← Previous
                    </span>
                    <span className="text-sm text-text-muted group-hover:text-green transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                )}
              </div>
              <div className="text-right">
                {nextPost && (
                  <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col gap-1 items-end hover:text-green transition-colors"
                  >
                    <span className="font-mono text-xs text-text-dim uppercase tracking-wider">
                      Next →
                    </span>
                    <span className="text-sm text-text-muted group-hover:text-green transition-colors line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </nav>
          )}
        </article>

        {/* TOC Sidebar */}
        {headings.length > 0 && (
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h4 className="font-mono text-xs text-text-dim uppercase tracking-wider mb-4">
                On this page
              </h4>
              <nav className="space-y-2">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    className={cn(
                      'block text-sm hover:text-green transition-colors',
                      h.level === 3 ? 'pl-4 text-text-dim' : 'text-text-muted'
                    )}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}
