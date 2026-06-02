import React from 'react';
import RestaurantCard from './RestaurantCard';
import Loading from '../common/Loading';
import useApi from '../../hooks/useApi';
import { getRestaurants, formatRestaurantData } from '../../services/strapiService';

const RestaurantList = () => {
  const { data, loading, error } = useApi(() => getRestaurants());

  const restaurants = data?.data?.map(formatRestaurantData) || [];

  return (
    <div>
      <h2 className="text-2xl font-bold text-primary-dark mb-8">Tüm Restoranlar</h2>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 font-semibold">Restoranlar yüklenemedi</p>
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Henüz restoran eklenmemiş</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
