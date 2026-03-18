import { Hero } from '@/components/sections/Hero'
import { Products } from '@/components/sections/Products'
import { Testimonial } from '@/components/sections/Testimonial'
import { Consulting } from '@/components/sections/Consulting'
import { BurkesTire } from '@/components/sections/BurkesTire'
import { About } from '@/components/sections/About'

export default function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Testimonial />
      {/* Blog preview will be added by Task 20 */}
      <Consulting />
      <BurkesTire />
      <About />
      {/* Contact section will be added by Task 14 */}
    </>
  )
}
