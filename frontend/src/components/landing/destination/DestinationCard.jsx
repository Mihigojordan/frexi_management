// components/DestinationCard.jsx
export default function DestinationCard({ destination, isActive }) {
  return (
    <div
      className={`relative flex-shrink-0 w-1/3 px-4 transition-transform duration-500 ease-in-out ${
        isActive ? 'scale-110 z-20' : 'scale-90 opacity-60'
      }`}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute bottom-5 left-5 text-white">
          <h3 className="text-xl font-bold">{destination.title}</h3>
          <p className="text-sm opacity-80">{destination.listings} Listing</p>
        </div>
        <button className="absolute bottom-5 right-5 px-4 py-1 border border-white rounded-full text-sm backdrop-blur-sm bg-white/20 hover:bg-white/30">
          View All
        </button>
      </div>
    </div>
  );
}
