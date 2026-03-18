import Link from 'next/link'
import { type BlogPost } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <div className="bg-bg-card border border-border rounded-xl p-6 hover:bg-bg-card-hover hover:border-border-hi transition-all duration-200">
        <div className="flex items-start justify-between mb-3">
          <span className="font-mono text-xs text-green uppercase tracking-wider">{post.category}</span>
        </div>

        <h3 className="text-lg font-bold text-text mb-2 group-hover:text-green transition-colors">
          {post.title}
        </h3>

        <p className="text-text-muted text-sm line-clamp-2 mb-4">{post.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-text-dim font-mono text-xs">
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex gap-1.5">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-text-dim bg-bg-flow px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
