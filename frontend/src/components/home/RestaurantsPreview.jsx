import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
import useApi from '../../hooks/useApi';
import { getRestaurants, formatRestaurantData } from '../../services/strapiService';

const RestaurantsPreview = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useApi(() => getRestaurants());
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const fallbackImage = 'https://images.unsplash.com/photo-1504674900769-570d79d20a1f?w=800&h=600&fit=crop';

  const restaurants = data?.data?.slice(0, 2) || [];

  const handleRestaurantClick = (index) => {
    navigate('/restaurants');
    setTimeout(() => {
      if (index === 0) {
        window.scrollTo(0, 0);
      } else if (index === 1) {
        window.scrollTo(0, document.body.scrollHeight);
      }
    }, 100);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-dark mb-4">Restoranlarımız</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Türk ve uluslararası mutfağından lezzetli yemekler, özel şef hizmetleriyle sunulmaktadır.
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
            <p className="text-red-600 font-semibold">Restoranlar yüklenemedi</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {restaurants.map((restaurant, index) => {
                const formattedRes = formatRestaurantData(restaurant);
                const firstImage = formattedRes.images?.[0];
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={restaurant.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{
                      filter:
                        hoveredIndex !== null && !isHovered
                          ? 'blur(8px)'
                          : 'blur(0px)',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center',
                      willChange: 'transform',
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Horizontal Image */}
                    <div className="w-full h-64 overflow-hidden rounded-t-2xl">
                      <img
                        src={firstImage?.url || fallbackImage}
                        alt={formattedRes.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-3xl font-bold text-primary-dark">
                          {formattedRes.name}
                        </h3>
                        <p className="text-gray-600 text-sm italic">
                          <span className="font-semibold text-primary-accent">{formattedRes.cuisine}</span> Mutfağı
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {formattedRes.description || 'Özel şef hizmetleriyle sunulan lezzetli yemekler'}
                      </p>

                      {/* Explore Button */}
                      <button
                        onClick={() => handleRestaurantClick(index)}
                        style={{
                          backgroundColor: '#f3efea',
                          color: '#9c714b',
                          padding: '10px 24px',
                          borderRadius: '8px',
                          border: '2px solid #9c714b',
                          fontWeight: '600',
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
                        {formattedRes.name}'ı İncele
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </>
        )}
      </div>
    </section>
  );
};

export default RestaurantsPreview;
