import { useMemo } from 'react';
import Layout from '../components/common/Layout';
import RestaurantSection from '../components/restaurants/RestaurantSection';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';
import { getRestaurants, formatRestaurantData } from '../services/strapiService';

const RestaurantsPage = () => {
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
          {/* Page Header */}
          <div style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#9c714b',
                  margin: '0 0 16px 0',
                }}
              >
                Restoranlar
              </h1>
              <p
                style={{
                  fontSize: '18px',
                  color: '#666',
                  lineHeight: '1.6',
                  margin: '0 0 24px 0',
                  maxWidth: '600px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                Ebrulu Konak'ın seçkin restoranlarında Türk ve uluslararası mutfağın en iyi örneklerini tadın.
              </p>
              {/* Decorative Divider */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
                <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
                <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
              </div>
            </div>
          </div>

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
