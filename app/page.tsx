"use client"
import { FeaturedProjects } from '@/components/FeaturedProjects'
import Hero from '@/components/Hero'
import StackGrid from '@/components/StackGrid'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

const page = () => {

  return (
    <section>
      <Hero />

      <FeaturedProjects />

      <StackGrid />

      <ContactForm />

      <Footer />
    </section>
  )
}

export default page