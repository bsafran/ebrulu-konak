import { useMemo } from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import RestaurantSection from '../components/restaurants/RestaurantSection';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

import { getRestaurants, formatRestaurantData } from '../services/strapiService';

const RestaurantsPage = () => {
  useScrollRestoration();
  const { data, loading, error } = useApi(() => getRestaurants());

  const restaurants = useMemo(() => {
    return data?.data?.map(formatRestaurantData) || [];
  }, [data]);

  return (
    <Layout>
      <div className="container-custom py-16">
        <PageHeader
          title="Restoranlar"
          description="Ebrulu Konak'ın seçkin restoranlarında Türk ve uluslararası mutfağın en iyi örneklerini tadın."
          marginBottom="120px"
        />

        {loading && (
          <div className="flex justify-center py-20">
            <Loading />
          </div>
        )}

        {error && (
          <div className="text-center py-20">
            <p className="text-red-600 font-semibold text-base">
              Restoranlar yüklenemedi
            </p>
          </div>
        )}

        {!loading && !error && restaurants.length > 0 && (
          <div>
            {restaurants.map((restaurant, index) => (
              <RestaurantSection
                key={restaurant.id}
                restaurant={restaurant}
                reversed={index % 2 === 1}
              />
            ))}
          </div>
        )}

        {!loading && !error && restaurants.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-base">
              Henüz restoran eklenmemiş
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RestaurantsPage;
