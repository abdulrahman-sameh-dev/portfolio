"use client"
import { FeaturedProjects } from '@/components/FeaturedProjects'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import StackGrid from '@/components/StackGrid'
import Certifications from '@/components/Certifications'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

const page = () => {

  return (
    <section>
      <Hero />

      <FeaturedProjects />

      <Services />

      <StackGrid />

      <Certifications />

      <ContactForm />

      <Footer />
    </section>
  )
}

export default page