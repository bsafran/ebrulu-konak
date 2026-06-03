import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../common/Loading';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import { getRestaurants, formatRestaurantData } from '../../services/strapiService';

const RestaurantsPreview = () => {
  const { data, loading, error } = useApi(() => getRestaurants());
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
              {restaurants.map((restaurant) => {
                const formattedRes = formatRestaurantData(restaurant);
                const firstImage = formattedRes.images?.[0];

                return (
                  <div
                    key={restaurant.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
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
                      <h3 className="text-2xl font-bold text-primary-dark">
                        {formattedRes.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        <span className="font-semibold text-primary-accent">{formattedRes.cuisine}</span> Mutfağı
                      </p>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {formattedRes.description || 'Özel şef hizmetleriyle sunulan lezzetli yemekler'}
                      </p>

                      {/* Explore Button */}
                      <Link to={`/restaurants/${restaurant.id}`} className="inline-block">
                        <Button variant="secondary" size="md">
                          {formattedRes.name}'ı İncele
                        </Button>
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
