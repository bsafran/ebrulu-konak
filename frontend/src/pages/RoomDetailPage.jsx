import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import RoomDetail from '../components/rooms/RoomDetail';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';
import { useScrollRestoration } from '../hooks/useScrollRestoration';
import { getRoomById, formatRoomData } from '../services/strapiService';

const RoomDetailPage = () => {
  useScrollRestoration();
  const { id } = useParams();
  const { data, loading, error } = useApi(() => getRoomById(id), [id]);

  const room = data?.data && data.data.length > 0 ? formatRoomData(data.data[0]) : null;

  return (
    <Layout>
      <div className="container-custom py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/" className="text-primary-accent hover:underline">
            Ana Sayfa
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/rooms" className="text-primary-accent hover:underline">
            Odalar
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{room?.title || 'Oda'}</span>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold mb-4">Oda yüklenemedi</p>
            <Link to="/rooms" className="text-primary-accent hover:underline">
              Odalar sayfasına dön
            </Link>
          </div>
        ) : (
          <RoomDetail room={room} loading={loading} />
        )}
      </div>
    </Layout>
  );
};

export default RoomDetailPage;
