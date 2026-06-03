import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { useBooking } from '../../context/BookingContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const RoomDetail = ({ room, loading }) => {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) return <Loading fullScreen />;

  if (!room) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-semibold">Oda bulunamadı</p>
      </div>
    );
  }

  const images = room.images || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBookNow = () => {
    updateBooking({ selectedRoomId: room.id, selectedRoom: room });
    navigate('/reservation');
  };

  return (
    <div className="space-y-8">
      {/* Image Carousel */}
      {images.length > 0 && (
        <div className="relative">
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden group">
            <img
              src={images[currentImageIndex].url}
              alt={images[currentImageIndex].alt}
              className="w-full h-full object-cover"
            />

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                >
                  <FiChevronLeft className="w-6 h-6 text-primary-dark" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                >
                  <FiChevronRight className="w-6 h-6 text-primary-dark" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? 'border-primary-accent' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Room Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary-dark mb-4">{room.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{room.description}</p>
          </div>

          {/* Features */}
          {room.features && room.features.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Özellikler</h3>
              <div className="grid grid-cols-2 gap-3">
                {room.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-accent"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Card */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-primary-dark rounded-2xl p-8 text-white space-y-6">
            <div>
              <p className="text-primary-accent text-sm font-semibold mb-2">Oda Ücreti</p>
              <p className="text-4xl font-bold">₺{room.price}</p>
              <p className="text-sm text-primary-light/80">Gece başına</p>
            </div>

            <div className="border-t border-primary-accent/20 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span>Kapasite:</span>
                <span className="font-semibold">{room.maxGuests} Kişi</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleBookNow}
            >
              Şimdi Rezervasyon Yap
            </Button>

            <p className="text-xs text-primary-light/80 text-center">
              Ödeme sayfasında tüm ödeme yöntemlerini göreceksiniz
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;
