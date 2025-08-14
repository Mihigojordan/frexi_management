const TourCard = ({ category, isActive = false }) => {
  return (
    <div className="w-1/3 flex-shrink-0 px-4">
      <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Image Container */}
        <div className="relative h-72 overflow-hidden rounded-3xl">
          {/* Background image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${category.bgImage}")` }}
          ></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content positioned at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 className="text-2xl font-bold mb-3 text-white">
            {category.title}
          </h3>
          <button className="text-sm text-gray-200 hover:text-white transition-colors duration-300 font-normal">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard