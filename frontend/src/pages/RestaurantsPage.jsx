import React from 'react';
import Layout from '../components/common/Layout';
import RestaurantList from '../components/restaurants/RestaurantList';

const RestaurantsPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-primary-dark mb-4">Restoranlarımız</h1>
          <p className="text-gray-600 text-lg">
            Türk ve uluslararası mutfağının en iyi örnekleri
          </p>
        </div>
        <RestaurantList />
      </div>
    </Layout>
  );
};

export default RestaurantsPage;
