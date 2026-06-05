import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import RestaurantSection from '../components/restaurants/RestaurantSection';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

import { getRestaurants, formatRestaurantData } from '../services/strapiService';

const RestaurantsPage = () => {
  const { t, i18n } = useTranslation();
  useScrollRestoration();
  const { data, loading, error } = useApi(() => getRestaurants(i18n.language), [i18n.language]);

  const restaurants = useMemo(() => {
    return data?.data?.map(formatRestaurantData) || [];
  }, [data]);

  return (
    <Layout>
      <div className="container-custom py-16">
        <PageHeader
          title={t('restaurants.pageTitle')}
          description={t('restaurants.pageDesc')}
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
              {t('restaurants.loadError')}
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
