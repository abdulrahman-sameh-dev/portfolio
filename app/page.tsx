"use client"
import { FeaturedProjects } from '@/components/FeaturedProjects'
import Hero from '@/components/Hero'
import StackGrid from '@/components/StackGrid'

const page = () => {

  return (
    <section>
      <Hero />

      <FeaturedProjects />

      <StackGrid />

      
    </section>
  )
}

export default page