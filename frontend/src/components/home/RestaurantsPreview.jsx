import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Loading from '../common/Loading';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import { getRestaurants, getMediaUrl, formatRestaurantData } from '../../services/strapiService';

const RestaurantsPreview = () => {
  const { data, loading, error } = useApi(() => getRestaurants());

  const restaurants = data?.data?.slice(0, 2) || [];

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">Restoranlarımız</h2>
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
              {restaurants.map((restaurant) => {
                const formattedRes = formatRestaurantData(restaurant);
                const firstImage = formattedRes.images?.[0];

                return (
                  <Link key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                    <Card hover glassmorphism className="h-full">
                      <div className="grid grid-cols-3 gap-4 h-48 mb-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="rounded-lg overflow-hidden">
                            {formattedRes.images?.[i] ? (
                              <img
                                src={formattedRes.images[i].url}
                                alt={`${formattedRes.name} ${i + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-primary-gold to-primary-dark flex items-center justify-center">
                                <span className="text-white text-2xl">🍽️</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <h3 className="text-2xl font-bold text-primary-dark mb-2">
                        {formattedRes.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        <span className="font-semibold text-primary-gold">{formattedRes.cuisine}</span> Mutfağı
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {formattedRes.description || 'Özel şef hizmetleriyle sunulan lezzetli yemekler'}
                      </p>

                      <div className="text-sm text-gray-700">
                        <p>📍 {formattedRes.openingHours || '10:00 - 23:00'}</p>
                      </div>
                    </Card>
                  </Link>
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
