import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Loading from '../common/Loading';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import { getRestaurants, getMediaUrl, formatRestaurantData } from '../../services/strapiService';

const RestaurantsPreview = () => {
  const { data, loading, error } = useApi(() => getRestaurants());
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const fallbackImage = 'https://images.unsplash.com/photo-1504674900769-570d79d20a1f?w=800&h=600&fit=crop';

  const restaurants = data?.data?.slice(0, 2) || [];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-bold text-primary-dark mb-4">Restoranlarımız</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Türk ve uluslararası mutfağından lezzetli yemekler, özel şef hizmetleriyle sunulmaktadır.
          </p>
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
                    className="relative overflow-hidden rounded-2xl transition-all duration-300"
                    style={{
                      paddingBottom: '100%',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
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

                    {/* Explore Button - Show on hover */}
                    <div
                      className="absolute inset-0 flex items-center justify-center z-20 transition-all duration-300"
                      style={{
                        opacity: isHovered ? 1 : 0,
                      }}
                    >
                      <Link to={`/restaurants/${restaurant.id}`} className="no-underline">
                        <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm px-8 py-4 rounded-full hover:bg-white transition-colors">
                          <span className="text-primary-dark font-semibold text-lg">
                            {formattedRes.name}'ı İncele
                          </span>
                          <FiArrowRight className="w-5 h-5 text-primary-dark" />
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link to="/restaurants">
                <Button variant="secondary" size="lg">
                  Tüm Restoranları Görüntüle
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RestaurantsPreview;
