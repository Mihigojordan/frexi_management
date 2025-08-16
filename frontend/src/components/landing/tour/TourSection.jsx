import { useState, useEffect, useRef } from 'react';

const tourData = [
  { title: "Wildlife", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=600", alt: "Wildlife" },
  { title: "Walking", image: "https://images.unsplash.com/photo-1482192505345-5655af888cc4?q=80&w=600", alt: "Walking" },
  { title: "Cruises", image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600", alt: "Cruises" },
  { title: "Hiking", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=600", alt: "Hiking" },
  { title: "Airbirds", image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=600", alt: "Airbirds" },
  { title: "Mountain", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600", alt: "Mountain" },
  { title: "Beach", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600", alt: "Beach" },
  { title: "Forest", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=600", alt: "Forest" },
  { title: "Desert", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=600", alt: "Desert" },
];

const TourCard = ({ title, image, alt, position, isActive, onClick, isSliding, slideDirection }) => {
  // Circular arrangement positions - exactly like the reference image
  const cardPositions = [
    // Left side
    { 
      transform: 'rotate(-15deg)', 
      left: '7%', 
      top: '120px',
      zIndex: 5
    },
    // Left-center
    { 
      transform: 'rotate(-7deg)', 
      left: '25%', 
      top: '40px',
      zIndex: 8
    },
    // Center (active)
    { 
      transform: 'rotate(0deg)', 
      left: '50%', 
      top: '0px',
      zIndex: 10,
      marginLeft: '-125px' // Center the card
    },
    // Right-center
    { 
      transform: 'rotate(7deg)', 
      left: '75%', 
      top: '40px',
      zIndex: 8,
      marginLeft: '-250px'
    },
    // Right side
    { 
      transform: 'rotate(15deg)', 
      left: '95%', 
      top: '120px',
      zIndex: 5,
      marginLeft: '-250px'
    },
  ];

  let style = { ...cardPositions[position] };
  
  // Handle sliding animations with proper directions
  if (isSliding) {
    if (slideDirection === 'out-left') {
      // Card sliding out to the left
      style = {
        ...style,
        transform: `${cardPositions[position].transform} translateX(-300px) translateY(50px)`,
        opacity: 0
      };
    } else if (slideDirection === 'out-right') {
      // Card sliding out to the right
      style = {
        ...style,
        transform: `${cardPositions[position].transform} translateX(300px) translateY(50px)`,
        opacity: 0
      };
    } else if (slideDirection === 'in-left') {
      // New card sliding in from the left
      style = {
        ...style,
        transform: `${cardPositions[position].transform} translateX(-300px) translateY(50px)`,
        opacity: 0
      };
    } else if (slideDirection === 'in-right') {
      // New card sliding in from the right
      style = {
        ...style,
        transform: `${cardPositions[position].transform} translateX(300px) translateY(50px)`,
        opacity: 0
      };
    }
  }
  
  return (
    <div
      className={`card  w-[250px] min-h-[320px] absolute cursor-pointer  rounded-[20px] transition-all duration-500 ease-linear hover:scale-105 ${
        isActive ? ' scale-110' : ' scale-95'
      } ${isSliding ? 'transition-all duration-700 ease-in-out' : ''}`}
      style={style}
      onClick={onClick}
    >
      <img src={image} alt={alt} className="w-full h-48 object-cover  rounded-[20px]" />
      <div className="card-body p-4 text-center">
        <div className="card-title text-xl font-bold text-primary-500 mb-3">{title}</div>
        <button className="text-[#6b7280] text-sm hover:text-primary-500 transition-colors">
          See More
        </button>
      </div>
    </div>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slidingCards, setSlidingCards] = useState(new Map());

  // Get the current 5 visible cards
  const getVisibleCards = () => {
    const visible = [];
    for (let i = 0; i < 5; i++) {
      visible.push((currentIndex + i) % tourData.length);
    }
    return visible;
  };

  const slideNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Mark the first card as sliding out to the left
    const firstCardIndex = currentIndex;
    setSlidingCards(new Map([[firstCardIndex, 'out-left']]));
    
    setTimeout(() => {
      // Move to next set of cards
      const newIndex = (currentIndex + 1) % tourData.length;
      setCurrentIndex(newIndex);
      
      // Mark the new last card as sliding in from the right (correct direction)
      const newLastCardIndex = (newIndex + 4) % tourData.length;
      setSlidingCards(new Map([[newLastCardIndex, 'in-right']]));
      
      setTimeout(() => {
        setSlidingCards(new Map());
        setIsAnimating(false);
      }, 400);
    }, 300);
  };

  const slidePrev = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Mark the last card as sliding out to the right
    const lastCardIndex = (currentIndex + 4) % tourData.length;
    setSlidingCards(new Map([[lastCardIndex, 'out-right']]));
    
    setTimeout(() => {
      // Move to previous set of cards
      const newIndex = (currentIndex - 1 + tourData.length) % tourData.length;
      setCurrentIndex(newIndex);
      
      // Mark the new first card as sliding in from the left (correct direction)
      const newFirstCardIndex = newIndex;
      setSlidingCards(new Map([[newFirstCardIndex, 'in-left']]));
      
      setTimeout(() => {
        setSlidingCards(new Map());
        setIsAnimating(false);
      }, 400);
    }, 300);
  };

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      slideNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [isAnimating]);

  const handleCardClick = (dataIndex) => {
    if (isAnimating) return;
    
    const visibleCards = getVisibleCards();
    const clickedPosition = visibleCards.indexOf(dataIndex);
    
    if (clickedPosition === 2) return; // Already active (center position)
    
    // Calculate how many steps to move to center the clicked card
    const stepsToCenter = clickedPosition - 2;
    
    if (stepsToCenter < 0) {
      // Move backwards
      for (let i = 0; i < Math.abs(stepsToCenter); i++) {
        setTimeout(() => slidePrev(), i * 400);
      }
    } else {
      // Move forwards
      for (let i = 0; i < stepsToCenter; i++) {
        setTimeout(() => slideNext(), i * 400);
      }
    }
  };

  const handleDotClick = (dotIndex) => {
    if (isAnimating) return;
    
    const visibleCards = getVisibleCards();
    const targetDataIndex = visibleCards[dotIndex];
    
    // If clicking the center dot, do nothing
    if (dotIndex === 2) return;
    
    // Calculate steps needed to center the clicked card
    const stepsToCenter = dotIndex - 2;
    
    if (stepsToCenter < 0) {
      // Need to move left (previous)
      for (let i = 0; i < Math.abs(stepsToCenter); i++) {
        setTimeout(() => slidePrev(), i * 450);
      }
    } else {
      // Need to move right (next)
      for (let i = 0; i < stepsToCenter; i++) {
        setTimeout(() => slideNext(), i * 450);
      }
    }
  };

  return (
    <section className="text-center bg-white py-20 px-5 bg-gradient-to-br min-h-[80vh] font-[system-ui,sans-serif] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-300"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-cyan-300"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 rounded-full bg-blue-400"></div>
      </div>
      
      {/* Header */}
      <div className="relative z-10 mb-20">
        <h4 className="text-primary-500 text-2xl mb-4 font-light italic">
          Wonderful Place For You
        </h4>
        <h1 className="text-[#1f2937] text-5xl font-bold tracking-tight">Tour Categories</h1>
      </div>
      
      {/* Cards Container */}
      <div className="cards relative h-[450px] mx-auto w-11/12 overflow-hidden flex items-center justify-center">
        {getVisibleCards().map((dataIndex, position) => {
          const tour = tourData[dataIndex];
          const isActive = position === 2; // Center card is active
          const slideDirection = slidingCards.get(dataIndex);
          const isSliding = slidingCards.has(dataIndex); 
          
          return (
            <TourCard
              key={`${dataIndex}-${currentIndex}`} // Updated key to force re-render
              title={tour.title}
              image={tour.image}
              alt={tour.alt}
              position={position}
              isActive={isActive}
              onClick={() => handleCardClick(dataIndex)}
              isSliding={isSliding}
              slideDirection={slideDirection}
            />
          );
        })}
      </div>

      {/* Navigation Dots - styled like the reference
      <div className="flex justify-center mt-16 space-x-4">
        {getVisibleCards().map((dataIndex, i) => (
          <button
            key={`dot-${dataIndex}-${i}`}
            className={`transition-all duration-300 rounded-full border-2 hover:scale-110 cursor-pointer ${
              i === 2 
                ? 'w-4 h-4 bg-primary-500 border-primary-500' 
                : 'w-4 h-4 bg-transparent border-gray-300 hover:border-primary-500 hover:bg-primary-500/20'
            } ${isAnimating ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={() => handleDotClick(i)}
            disabled={isAnimating}
            aria-label={`Go to ${tourData[dataIndex].title} tour`}
            title={`${tourData[dataIndex].title} - Position ${i + 1}`}
          />
        ))}
      </div> */}

      {/* Manual Navigation Controls */}
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={slidePrev}
          disabled={isAnimating}
          className={`px-8 py-3 bg-primary-500 text-white rounded-full font-medium transition-all duration-300 hover:bg-[#1e3a8a] hover:scale-105 ${
            isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
          aria-label="Previous tour"
        >
          ← Previous
        </button>
        <button
          onClick={slideNext}
          disabled={isAnimating}
          className={`px-8 py-3 bg-primary-500 text-white rounded-full font-medium transition-all duration-300 hover:bg-[#1e3a8a] hover:scale-105 ${
            isAnimating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
          }`}
          aria-label="Next tour"
        >
          Next →
        </button>
      </div>

      {/* Progress indicator */}
      <div className="flex justify-center mt-6">
        <span className="text-sm text-[#6b7280] bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">
          Showing {currentIndex + 1}-{((currentIndex + 4) % tourData.length) + 1} of {tourData.length} tours
        </span>
      </div>
    </section>
  );
};

export default App;