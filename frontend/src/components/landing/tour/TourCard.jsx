const TourCard = ({ title, image, alt, position, isActive, onClick }) => {
  const cardPositions = [
    { transform: 'rotate(-8deg)', left: '7%', top: '60px' },
    { transform: 'rotate(-4deg)', left: '25%', top: '20px' },
    { transform: 'rotate(0deg)', left: '42.5%', top: '0px' },
    { transform: 'rotate(4deg)', left: '60%', top: '20px' },
    { transform: 'rotate(8deg)', left: '78%', top: '70px' },
  ];


  const style = cardPositions[position];
  
  return (
    <div
      className={`card bg-white w-[250px] min-h-[300px] absolute cursor-pointer shadow-lg rounded-[22px] transition-all duration-700 ease-out hover:scale-105 ${
        isActive ? 'z-20 scale-110' : 'z-10'
      }`}
      style={style}
      onClick={onClick}
    >
      <img src={image} alt={alt} className="w-full h-60 object-cover rounded-t-[22px]" />
      <div className="card-body p-4">
        <div className="card-title text-lg font-bold text-[#0b4a5a] mb-2">{title}</div>
        {isActive && (
          <button className="bg-[#0b4a5a] text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-[#0d5a6b] hover:scale-105">
            See More →
          </button>
        )}
        {!isActive && (
          <a href="#" className="see-more text-sm text-[#425a60] no-underline hover:underline">See More</a>
        )}
      </div>
    </div>
  );
};


export default TourCard;