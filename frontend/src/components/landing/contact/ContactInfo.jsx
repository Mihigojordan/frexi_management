import React from 'react';

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Our Address",
      details: [
        "Makuza Peace Plaza 3rd Floor F3-28,",
        "KN 4 Ave, Kigali"
      ]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone Number",
      details: ["+250 782 379 122"]
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email Address",
      details: ["booking@frexi.rw"]
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-teal-600 text-lg mb-2 font-medium">Get In Touch</h3>
          <h2 className="text-4xl font-bold text-gray-900">Our Contact Information</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {contactDetails.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-full mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
              <div className="text-gray-600">
                {item.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="mb-1">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;