import React from 'react'
import WelcomePage from '../../components/homepage/WelcomePage'
import TourSection from '../../components/landing/tour/TourSection'
import DestinationSection from '../../components/landing/destination/DestinationSection'
import TestimonialsSection from '../../components/landing/testmonial/TestmonialSection'
import TravelDestinations from '../../components/landing/destination/DestinationSection'
const HomePage = () => {
  return (
    <div>
      <WelcomePage />
      <TourSection />
      <TravelDestinations/>
      <TestimonialsSection 
        autoAdvance={true}
        interval={6000}
      />
    </div>
  )
}

export default HomePage
