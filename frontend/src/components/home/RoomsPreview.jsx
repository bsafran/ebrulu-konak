import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../common/Loading';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import { getRooms, formatRoomData } from '../../services/strapiService';

const RoomsPreview = () => {
  const { data, loading, error } = useApi(() => getRooms());
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [slideDirection, setSlideDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

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
    setSlideDirection(-1); // Soldan sağa
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1);
  };

  const handleNext = () => {
    if (maxIndex === 0) return;
    setSlideDirection(1); // Sağdan sola
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
        handleNext();
      } else if (distance < -minSwipeDistance) {
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
          <h2 className="text-6xl md:text-7xl font-bold text-primary-dark mb-4">Odalarımız</h2>
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
                disabled={maxIndex === 0}
                className="p-3 rounded-full transition-all hover:scale-110 flex-shrink-0"
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
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="wait">
                    {visibleRooms.map((room, index) => {
                      const formattedRoom = formatRoomData(room);
                      const firstImage = formattedRoom.images?.[0];
                      const isHovered = hoveredIndex === index;

                      return (
                        <motion.div
                          key={`${room.id}-carousel`}
                          initial={{ x: slideDirection > 0 ? -300 : 300 }}
                          animate={{ x: 0 }}
                          exit={{ x: slideDirection > 0 ? 300 : -300 }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                          <div
                            className="relative overflow-hidden rounded-2xl transition-all duration-300"
                            style={{
                              paddingBottom: '150%',
                              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                              transformOrigin: 'center',
                              willChange: 'transform',
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                          >
                            {/* Background Image */}
                            <div
                              className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                              style={{
                                backgroundImage: `url(${firstImage?.url || fallbackImage})`,
                                filter:
                                  hoveredIndex !== null && !isHovered
                                    ? 'brightness(0.5) saturate(0.5) contrast(1.2) blur(20px)'
                                    : 'brightness(0.75) saturate(1.2) contrast(0.85)',
                              }}
                            />

                            {/* Content Overlay */}
                            <Link
                              to={`/rooms/${room.id}`}
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
                              className="absolute inset-0 flex items-center justify-center z-20 transition-all duration-300"
                              style={{
                                opacity: isHovered ? 1 : 0,
                              }}
                            >
                              <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full">
                                <span className="text-primary-dark font-semibold text-lg">
                                  Odayı İncele
                                </span>
                                <FiArrowRight className="w-5 h-5 text-primary-dark" />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={maxIndex === 0}
                className="p-3 rounded-full transition-all hover:scale-110 flex-shrink-0"
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
