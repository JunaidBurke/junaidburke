'use client'

import { useState } from 'react'
import { type BlogPost } from '@/lib/blog'
import { BlogCard } from './BlogCard'
import { cn } from '@/lib/utils'

interface TagFilterProps {
  categories: string[]
  tags: string[]
  posts: BlogPost[]
}

export function TagFilter({ categories, tags, posts }: TagFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory && post.category !== selectedCategory) return false
    if (selectedTags.length > 0 && !selectedTags.some((tag) => post.tags.includes(tag))) return false
    return true
  })

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex gap-4 border-b border-border overflow-x-auto pb-px">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'font-mono text-sm pb-2 px-1 transition-colors whitespace-nowrap',
            selectedCategory === null
              ? 'text-green border-b-2 border-green'
              : 'text-text-muted hover:text-text'
          )}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              'font-mono text-sm pb-2 px-1 transition-colors whitespace-nowrap',
              selectedCategory === category
                ? 'text-green border-b-2 border-green'
                : 'text-text-muted hover:text-text'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tag pills */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                'font-mono text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-all',
                selectedTags.includes(tag)
                  ? 'bg-green/10 border-green/30 text-green'
                  : 'bg-bg-card border-border text-text-muted hover:border-border-hi'
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Filtered posts grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => <BlogCard key={post.slug} post={post} />)
        ) : (
          <p className="text-text-muted font-mono text-sm col-span-full">
            No posts match the selected filters.
          </p>
        )}
      </div>
    </div>
  )
}
