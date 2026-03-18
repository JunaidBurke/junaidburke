import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  category: string
  published: boolean
  readingTime: string
  content: string
}

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog')

function parseMdxFile(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: typeof data['title'] === 'string' ? data['title'] : '',
      description: typeof data['description'] === 'string' ? data['description'] : '',
      date: typeof data['date'] === 'string' ? data['date'] : String(data['date'] ?? ''),
      tags: Array.isArray(data['tags']) ? (data['tags'] as string[]) : [],
      category: typeof data['category'] === 'string' ? data['category'] : '',
      published: data['published'] !== false,
      readingTime: readingTime(content).text,
      content,
    }
  } catch {
    return null
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))

  return files
    .map((file) => parseMdxFile(path.basename(file, '.mdx')))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | null {
  if (!fs.existsSync(BLOG_DIR)) {
    return null
  }
  return parseMdxFile(slug)
}

export function getAllTags(): string[] {
  return [...new Set(getAllPosts().flatMap((post) => post.tags))].sort()
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPosts().map((post) => post.category).filter(Boolean))].sort()
}
