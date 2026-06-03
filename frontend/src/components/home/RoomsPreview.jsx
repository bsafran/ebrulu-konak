import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Card from '../common/Card';
import Loading from '../common/Loading';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import { getRooms, formatRoomData } from '../../services/strapiService';

const RoomsPreview = () => {
  const { data, loading, error } = useApi(() => getRooms());
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';
  const [currentIndex, setCurrentIndex] = useState(0);

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
    if (maxIndex === 0) return; // No carousel needed
    setCurrentIndex(prev => prev === 0 ? maxIndex : prev - 1);
  };

  const handleNext = () => {
    if (maxIndex === 0) return; // No carousel needed
    setCurrentIndex(prev => prev === maxIndex ? 0 : prev + 1);
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
                className="p-3 rounded-full transition-all"
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
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {visibleRooms.map((room) => {
                    const formattedRoom = formatRoomData(room);
                    const firstImage = formattedRoom.images?.[0];

                    return (
                      <Link key={`${room.id}-${Math.random()}`} to={`/rooms/${room.id}`}>
                        <Card hover>
                          {/* Image */}
                          <img
                            src={firstImage?.url || fallbackImage}
                            alt={formattedRoom.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />

                          {/* Content */}
                          <h3 className="text-2xl font-bold text-primary-dark mb-3">
                            {formattedRoom.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                            {formattedRoom.description || 'Konforlu ve modern tasarımlı oda'}
                          </p>

                          {/* Price */}
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-primary-accent">
                              ₺{formattedRoom.price}
                            </span>
                            <span className="text-sm bg-primary-accent/20 text-primary-accent px-3 py-1 rounded-full">
                              {formattedRoom.maxGuests} Kişi
                            </span>
                          </div>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNext}
                disabled={maxIndex === 0}
                className="p-3 rounded-full transition-all"
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
