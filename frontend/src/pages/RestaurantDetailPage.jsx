import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import RestaurantDetail from '../components/restaurants/RestaurantDetail';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';

import { getRestaurantById, formatRestaurantData } from '../services/strapiService';

const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useApi(() => getRestaurantById(id), [id]);

  const restaurant = data?.data ? formatRestaurantData(data.data) : null;

  return (
    <Layout>
      <div className="container-custom py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/" className="text-primary-accent hover:underline">
            Ana Sayfa
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/restaurants" className="text-primary-accent hover:underline">
            Restoranlar
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{restaurant?.name || 'Restoran'}</span>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold mb-4">Restoran yüklenemedi</p>
            <Link to="/restaurants" className="text-primary-accent hover:underline">
              Restoranlar sayfasına dön
            </Link>
          </div>
        ) : (
          <RestaurantDetail restaurant={restaurant} loading={loading} />
        )}
      </div>
    </Layout>
  );
};

export default RestaurantDetailPage;
