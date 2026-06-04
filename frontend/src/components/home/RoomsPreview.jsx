import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import Loading from '../common/Loading';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import useWindowSize from '../../hooks/useWindowSize';
import { getRooms, formatRoomData } from '../../services/strapiService';

const RoomsPreview = () => {
  const { data, loading, error } = useApi(() => getRooms());
  const windowWidth = useWindowSize();
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredRoomId, setHoveredRoomId] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const allRooms = data?.data || [];
  const itemsPerPage = windowWidth < 640 ? 1 : windowWidth < 1024 ? 2 : 3;
  const displayRooms = allRooms;

  // Max index to prevent scrolling past the last set of items
  const maxIndex = Math.max(0, displayRooms.length - itemsPerPage);

  // Calculate card width and slide fraction based on window width
  const cardWidth = windowWidth < 640
    ? 'calc(90% - 0.5rem)'
    : windowWidth < 1024
      ? 'calc(50% - 0.75rem)'
      : 'calc(33.333% - 1rem)';
  const slideFraction = windowWidth < 640 ? 90 : windowWidth < 1024 ? 50 : 33.333;

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
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
        handleNext();
      } else if (distance < -minSwipeDistance) {
        handlePrev();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="py-20" style={{ backgroundColor: '#f3efea' }}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-dark mb-4">Odalarımız</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Ebrulu Konak'ın zarif ve konforlu odaları, siz misafirlerimizin rahatı için tasarlanmıştır.
          </p>

          {/* Decorative Divider - Below Subtitle */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
            <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
          </div>
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
                disabled={currentIndex === 0}
                className="p-3 rounded-full transition-all hover:scale-110 flex-shrink-0"
                style={{
                  backgroundColor: '#9c714b',
                  color: 'white',
                  opacity: currentIndex === 0 ? 0.5 : 1,
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                }}
                aria-label="Önceki"
              >
                <FiChevronLeft className="w-6 h-6" />
              </button>

              {/* Rooms Grid */}
              <div
                className="flex-1 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  className="flex gap-6"
                  style={{
                    transform: `translateX(calc(-${currentIndex * slideFraction}% - ${currentIndex * 0.5}rem))`,
                    transition: 'transform 0.4s ease-out'
                  }}
                >
                  {displayRooms.map((room) => {
                    const formattedRoom = formatRoomData(room);
                    const firstImage = formattedRoom.images?.[0];
                    const isHovered = hoveredRoomId === room.id;

                    return (
                      <div
                        key={`${room.id}-${currentIndex}`}
                        className="flex-shrink-0 overflow-hidden"
                        style={{
                          width: cardWidth,
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          clipPath: 'inset(0 round 1rem)',
                        }}
                        onMouseEnter={() => setHoveredRoomId(room.id)}
                        onMouseLeave={() => setHoveredRoomId(null)}
                      >
                          <div
                            className="relative transition-all duration-300"
                            style={{
                              paddingBottom: '150%',
                              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                              transformOrigin: 'center',
                              willChange: 'transform',
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                          >
                            {/* Background Image */}
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                              style={{
                                backgroundImage: `url(${firstImage?.url || fallbackImage})`,
                                filter: isHovered
                                    ? 'brightness(1) saturate(1.3) contrast(1)'
                                    : hoveredRoomId !== null
                                    ? 'brightness(0.4) saturate(0.4) contrast(1.1) blur(15px)'
                                    : 'brightness(0.75) saturate(1.2) contrast(0.85)',
                              }}
                            />

                            {/* Content Overlay */}
                            <Link
                              to={`/rooms/${formattedRoom.slug}`}
                              className="absolute inset-0 flex flex-col items-start justify-end p-6 z-10 no-underline"
                            >
                              <h3
                                className="font-bold transition-colors duration-200 w-full"
                                style={{
                                  color: 'rgba(255,255,255,0.9)',
                                  fontSize: '1.75rem',
                                  lineHeight: '1.2',
                                  maxWidth: '200px',
                                  wordWrap: 'break-word',
                                  textShadow: '2px 2px 20px rgba(0,0,0,0.3)',
                                }}
                              >
                                {formattedRoom.title}
                              </h3>
                            </Link>

                            {/* Explore Button - Show on hover */}
                            <div
                              className="rooms-explore-btn absolute inset-0 flex items-center justify-center z-20 transition-all duration-300"
                              style={{
                                opacity: isHovered ? 1 : 0,
                              }}
                            >
                              <Link to={`/rooms/${formattedRoom.slug}`} className="no-underline">
                                <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full cursor-pointer hover:bg-white transition-colors">
                                  <span className="text-primary-dark font-semibold text-lg">
                                    Odayı İncele
                                  </span>
                                  <FiArrowRight className="w-5 h-5 text-primary-dark" />
                                </div>
                              </Link>
                            </div>
                          </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex}
                className="p-3 rounded-full transition-all hover:scale-110 flex-shrink-0"
                style={{
                  backgroundColor: '#9c714b',
                  color: 'white',
                  opacity: currentIndex === maxIndex ? 0.5 : 1,
                  cursor: currentIndex === maxIndex ? 'not-allowed' : 'pointer',
                }}
                aria-label="Sonraki"
              >
                <FiChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link to="/rooms" className="inline-block">
                <button
                  style={{
                    backgroundColor: '#f3efea',
                    color: '#9c714b',
                    padding: '12px 32px',
                    borderRadius: '8px',
                    border: '2px solid #9c714b',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#9c714b';
                    e.currentTarget.style.color = '#f3efea';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3efea';
                    e.currentTarget.style.color = '#9c714b';
                  }}
                >
                  Tüm Odaları Görüntüle
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RoomsPreview;
