import React from 'react';
import Layout from '../components/common/Layout';
import RoomList from '../components/rooms/RoomList';

const RoomsPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-primary-dark mb-4">Odalarımız</h1>
          <p className="text-gray-600 text-lg">
            Ebrulu Konak\'ın lüks ve konforlu odaları arasından seçim yapın
          </p>
        </div>
        <RoomList />
      </div>
    </Layout>
  );
};

export default RoomsPage;
