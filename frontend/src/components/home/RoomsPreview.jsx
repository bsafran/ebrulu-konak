import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import Loading from '../common/Loading';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import { getRooms, formatRoomData } from '../../services/strapiService';

const RoomsPreview = () => {
  const { data, loading, error } = useApi(() => getRooms());
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [slideDirection, setSlideDirection] = useState(null);

  const allRooms = data?.data || [];
  const itemsPerPage = 3;

  // Create display rooms by duplicating to ensure at least 6 items
  let displayRooms = allRooms;
  if (allRooms.length > 0) {
    while (displayRooms.length < 6) {
      displayRooms = [...displayRooms, ...allRooms];
    }
    displayRooms = displayRooms.slice(0, 6);
  }

  const maxIndex = Math.max(0, displayRooms.length - itemsPerPage);

  const handlePrev = () => {
    if (maxIndex === 0) return;
    setSlideDirection('right');
    setTimeout(() => setSlideDirection(null), 500);
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1);
  };

  const handleNext = () => {
    if (maxIndex === 0) return;
    setSlideDirection('left');
    setTimeout(() => setSlideDirection(null), 500);
    setCurrentIndex(prev => prev === maxIndex ? 0 : prev + 1);
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX);

    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      const minSwipeDistance = 50;

      if (distance > minSwipeDistance) {
        // Swiped left -> show next
        handleNext();
      } else if (distance < -minSwipeDistance) {
        // Swiped right -> show previous
        handlePrev();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const visibleRooms = displayRooms.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section className="py-20" style={{ backgroundColor: '#f3efea' }}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">Odalarımız</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ebrulu Konak\'ın zarif ve konforlu odaları, siz misafirlerimizin rahatı için tasarlanmıştır.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Odalar yüklenemedi</p>
          </div>
        ) : (
          <>
            {/* Carousel */}
            <div className="flex items-center justify-between gap-4 mb-12">
              {/* Left Arrow */}
              <button
                onClick={handlePrev}
                disabled={maxIndex === 0}
                className="p-3 rounded-full transition-all hover:scale-110"
                style={{
                  backgroundColor: '#9c714b',
                  color: 'white',
                  opacity: maxIndex === 0 ? 0.5 : 1,
                  cursor: maxIndex === 0 ? 'not-allowed' : 'pointer',
                }}
                aria-label="Önceki"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              {/* Rooms Grid */}
              <div
                className="flex-1"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${
                    slideDirection === 'left'
                      ? 'animate-slideInLeft'
                      : slideDirection === 'right'
                      ? 'animate-slideInRight'
                      : ''
                  }`}
                >
                  {visibleRooms.map((room, index) => {
                    const formattedRoom = formatRoomData(room);
                    const firstImage = formattedRoom.images?.[0];
                    const isHovered = hoveredIndex === index;

                    console.log('Rendering room:', formattedRoom.title, 'slideDirection:', slideDirection);

                    return (
                      <div
                        key={`${room.id}-carousel`}
                        className={`${
                          slideDirection === 'left'
                            ? 'animate-slideInLeft'
                            : slideDirection === 'right'
                            ? 'animate-slideInRight'
                            : ''
                        }`}
                      >
                        <Link to={`/rooms/${room.id}`}>
                          <div
                            className="relative h-80 rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl"
                            style={{
                              border: isHovered ? '4px solid #9c714b' : '4px solid transparent',
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                          {/* Image Container */}
                          <div className="relative w-full h-full overflow-hidden bg-gray-200">
                            <img
                              src={firstImage?.url || fallbackImage}
                              alt={formattedRoom.title}
                              className={`w-full h-full object-cover transition-all duration-500 ${
                                isHovered ? 'blur-sm scale-105' : 'blur-0 scale-100'
                              }`}
                            />

                            {/* Overlay Gradient */}
                            <div
                              className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 z-10 ${
                                isHovered ? 'opacity-100' : 'opacity-50'
                              }`}
                            />

                            {/* Explore Button */}
                            <div
                              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                                isHovered ? 'opacity-100' : 'opacity-0'
                              }`}
                            >
                              <div className="text-center">
                                <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full hover:bg-white transition-all duration-300">
                                  <span className="text-primary-dark font-semibold text-lg">Odayı İncele</span>
                                  <FiArrowRight className="w-5 h-5 text-primary-dark" />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Room Title - Bottom */}
                          <div
                            className={`absolute bottom-0 left-0 right-0 px-6 py-6 transition-all duration-500 z-20 ${
                              isHovered ? 'translate-y-0' : 'translate-y-0'
                            }`}
                          >
                            <h3
                              className="text-2xl md:text-3xl font-bold text-white"
                              style={{
                                textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)',
                                letterSpacing: '-0.5px',
                              }}
                            >
                              {formattedRoom.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={maxIndex === 0}
                className="p-3 rounded-full transition-all hover:scale-110"
                style={{
                  backgroundColor: '#9c714b',
                  color: 'white',
                  opacity: maxIndex === 0 ? 0.5 : 1,
                  cursor: maxIndex === 0 ? 'not-allowed' : 'pointer',
                }}
                aria-label="Sonraki"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link to="/rooms">
                <Button variant="secondary" size="lg">
                  Tüm Odaları Görüntüle
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RoomsPreview;
