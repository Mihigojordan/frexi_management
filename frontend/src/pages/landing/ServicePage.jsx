import React from 'react'
import HeaderBanner from '../../components/landing/HeaderBanner'
import ServicesSection from '../../components/landing/ServiceSection'

const ServicePage = () => {
  return (
    <div>
        <HeaderBanner title={"Services"} />
        <ServicesSection />
    </div>
  )
}

export default ServicePage