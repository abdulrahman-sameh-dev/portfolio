"use client"
import { FeaturedProjects } from '@/components/FeaturedProjects'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import StackGrid from '@/components/StackGrid'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

const page = () => {

  return (
    <section>
      <Hero />

      <FeaturedProjects />

      <Services />

      <StackGrid />

      <ContactForm />

      <Footer />
    </section>
  )
}

export default page