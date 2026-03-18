import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { products } from '@/lib/products'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogUrls = posts.map((post) => ({
    url: `https://junaidburke.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  const productUrls = products.map((p) => ({
    url: `https://junaidburke.com/products/${p.slug}`,
    lastModified: new Date(),
  }))

  return [
    { url: 'https://junaidburke.com', lastModified: new Date() },
    { url: 'https://junaidburke.com/blog', lastModified: new Date() },
    ...blogUrls,
    ...productUrls,
  ]
}
