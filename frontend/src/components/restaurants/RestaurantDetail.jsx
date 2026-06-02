import React, { useState } from 'react';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const RestaurantDetail = ({ restaurant, loading }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (loading) return <Loading fullScreen />;

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-semibold">Restoran bulunamadı</p>
      </div>
    );
  }

  const images = restaurant.images || [];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
                    idx === currentImageIndex ? 'border-primary-gold' : 'border-transparent'
                  }`}
                >
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Restaurant Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Info */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-primary-dark mb-2">{restaurant.name}</h1>
            <p className="text-primary-gold font-semibold text-lg mb-4">
              {restaurant.cuisine} Mutfağı
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">{restaurant.description}</p>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-2xl font-bold text-primary-dark mb-4">Çalışma Saatleri</h3>
            <p className="text-gray-700 text-lg">{restaurant.openingHours || '10:00 - 23:00'}</p>
          </div>

          {/* Menu */}
          {restaurant.menu && (
            <div>
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Menü</h3>
              <a
                href={restaurant.menu}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary-gold text-primary-dark px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
              >
                📄 Menüyü İndir
              </a>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="md:col-span-1">
          <div className="sticky top-24 bg-primary-dark rounded-2xl p-8 text-white space-y-6">
            <div>
              <p className="text-primary-gold text-sm font-semibold mb-2">Bilgiler</p>
              <div className="space-y-3">
                <div>
                  <p className="text-primary-light/80 text-sm">Tür</p>
                  <p className="font-semibold">{restaurant.cuisine} Restoranı</p>
                </div>
                <div>
                  <p className="text-primary-light/80 text-sm">Saatler</p>
                  <p className="font-semibold">{restaurant.openingHours || '10:00 - 23:00'}</p>
                </div>
              </div>
            </div>

            <Button variant="primary" size="lg" className="w-full">
              Rezervasyon Yap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
