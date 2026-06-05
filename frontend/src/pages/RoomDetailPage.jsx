import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/common/Layout';
import RoomDetail from '../components/rooms/RoomDetail';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

import { getRoomById, formatRoomData } from '../services/strapiService';

const RoomDetailPage = () => {
  const { t } = useTranslation();
  useScrollRestoration();
  const { id } = useParams();
  const { data, loading, error } = useApi(() => getRoomById(id), [id]);

  const room = data?.data ? formatRoomData(data.data) : null;

  return (
    <Layout>
      <div className="container-custom py-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <Link to="/" className="text-primary-accent hover:underline">
            {t('nav.home')}
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/rooms" className="text-primary-accent hover:underline">
            {t('nav.rooms')}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{room?.title || t('rooms.defaultTitle')}</span>
        </div>

        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold mb-4">{t('rooms.loadError')}</p>
            <Link to="/rooms" className="text-primary-accent hover:underline">
              {t('rooms.backToRooms')}
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
