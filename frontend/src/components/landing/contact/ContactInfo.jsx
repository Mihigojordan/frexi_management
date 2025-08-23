import React from "react";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Our Address",
      details: ["Makuza Peace Plaza 3rd Floor F3-28,", "KN 4 Ave, Kigali"],
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
      title: "Phone Number",
      details: ["+250 782 379 122"],
    },
    {
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Email Address",
      details: ["booking@frexi.rw"],
    },
  ];

  return (
    <section className="py-24 px-4 md:px-4 lg:px-12 min-h-[80vh] bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-100 to-blue-100 px-6 py-3 rounded-full mb-6">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <p className="text-teal-700 font-semibold text-sm uppercase tracking-wider">
              Get In Touch
            </p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#113d48] via-teal-600 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
            Let's Start Your
            <br />
            <span className="text-slate-700">Adventure</span>
          </h1>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Have questions or ready to book your dream journey? Our expert team
            is here to help you create unforgettable memories in East Africa.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {contactDetails.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-14 h-14 bg-[#113d48] text-white rounded-full flex-shrink-0 shadow-md">
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col text-left">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed mt-1">
                  {item.details.map((detail, detailIndex) => (
                    <p key={detailIndex}>{detail}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
