import React from 'react'
import AboutSection from '../../components/landing/AboutSection'
import TestimonialsSection from '../../components/landing/testmonial/TestmonialSection'
import PartnersSection from '../../components/landing/PartnerSection'
import HeaderBanner from '../../components/landing/HeaderBanner'

const AboutPage = () => {
  return (
    <div>
        <HeaderBanner title={'About Us'} />
        <AboutSection  />
        <PartnersSection />
        <TestimonialsSection />
    </div>
  )
}

export default AboutPage