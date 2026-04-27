"use client"
import { FeaturedProjects } from '@/components/FeaturedProjects'
import Hero from '@/components/Hero'
import StackGrid from '@/components/StackGrid'
import ContactForm from '@/components/ContactForm'

const page = () => {

  return (
    <section>
      <Hero />

      <FeaturedProjects />

      <StackGrid />

      <ContactForm />
    </section>
  )
}

export default page