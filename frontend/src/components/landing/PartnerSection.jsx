import { useEffect, useState } from "react";
import { MapPin, ExternalLink, Building2 } from "lucide-react";
import partnerService from "../../services/partnerService";


// Loading skeleton component
const PartnerSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
    <div className="w-full h-32 bg-slate-200 rounded-xl mb-4"></div>
    <div className="h-4 bg-slate-200 rounded mb-2"></div>
    <div className="h-3 bg-slate-200 rounded w-3/4"></div>
  </div>
);

export default function PartnersSection() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartners = async () => {
            setLoading(true);
            try {
                // Replace with your actual partnerService
                const response = await partnerService.findAll();
                setPartners(response);
            } catch (error) {
                console.error("Error fetching partners:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    return (
        <section className="py-20 px-4 md:px-8 lg:px-16 min-h-[60vh]">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-teal-800 rounded-full mb-6 shadow-lg">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg md:text-xl text-slate-600 font-light italic mb-3 tracking-wide">
                        Trusted Network
                    </p>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-4">
                        Our Partners
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        We collaborate with industry leaders and innovative companies to deliver exceptional results
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-teal-300 mx-auto rounded-full mt-6"></div>
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        // Loading skeletons
                        Array.from({ length: 6 }).map((_, index) => (
                            <PartnerSkeleton key={index} />
                        ))
                    ) : partners.length > 0 ? (
                        partners.map((partner, index) => (
                            <div
                                key={partner.id}
                                className="group relative flex bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image Container */}
                                <div className="relative w-1/3 rounded-es-2xl min-h-20 overflow-hidden bg-slate-100">
                                    <img
                                        src={partnerService.getImageUrl(partner)}
                                        alt={partner.name}
                                        className="w-full h-full object-cover transition-transform duration-700"
                                        onError={(e) => {
                                            e.target.src = `https://via.placeholder.com/300x200/e2e8f0/64748b?text=${encodeURIComponent(partner.name)}`;
                                        }}
                                    />
                                    
                                   
                                        <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors duration-200">
                                            <ExternalLink className="w-4 h-4 text-slate-700" />
                                        </button>
                                  
                                </div>

                                {/* Content */}
                                <div className="p-6 w-2/3">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-slate-700 transition-colors duration-300">
                                        {partner.name}
                                    </h3>
                                    
                                    {partner.address && (
                                        <div className="flex items-center text-slate-600 mb-4">
                                            <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                                            <span className="text-sm">{partner.address}</span>
                                        </div>
                                    )}

                                </div>


                                {/* Shimmer Effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div>
                            </div>
                        ))
                    ) : (
                        // Empty State
                        <div className="col-span-full">
                            <div className="text-center py-16">
                                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Building2 className="w-12 h-12 text-slate-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-slate-700 mb-2">No Partners Yet</h3>
                                <p className="text-slate-500 max-w-md mx-auto">
                                    We're actively building partnerships with amazing companies. Check back soon!
                                </p>
                               
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary-500/5 to-teal-300/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-slate-400/5 to-primary-300/5 rounded-full blur-3xl"></div>
        </section>
    );
}