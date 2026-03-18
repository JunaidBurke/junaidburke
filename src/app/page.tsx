import { Hero } from '@/components/sections/Hero'
import { Products } from '@/components/sections/Products'
import { Testimonial } from '@/components/sections/Testimonial'
import { BlogPreview } from '@/components/sections/BlogPreview'
import { Consulting } from '@/components/sections/Consulting'
import { BurkesTire } from '@/components/sections/BurkesTire'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Testimonial />
      <BlogPreview />
      <Consulting />
      <BurkesTire />
      <About />
      <Contact />
    </>
  )
}
