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
    const allRestaurants = data?.data?.map(formatRestaurantData) || [];
    return allRestaurants.slice(0, 2);
  }, [data]);

  return (
    <Layout>
      <div
        style={{
          backgroundColor: 'white',
          minHeight: '100vh',
          paddingTop: '64px',
          paddingBottom: '64px',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <PageHeader
            title="Restoranlar"
            description="Ebrulu Konak'ın seçkin restoranlarında Türk ve uluslararası mutfağın en iyi örneklerini tadın."
            marginBottom="120px"
          />

          {/* Loading State */}
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
              <Loading />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: '#d32f2f', fontWeight: '600', fontSize: '16px' }}>
                Restoranlar yüklenemedi
              </p>
            </div>
          )}

          {/* Restaurants Grid */}
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

          {/* Empty State */}
          {!loading && !error && restaurants.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: '#666', fontSize: '16px' }}>
                Henüz restoran eklenmemiş
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantsPage;
