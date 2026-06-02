import React, { useState } from 'react';
import RoomCard from './RoomCard';
import Loading from '../common/Loading';
import useApi from '../../hooks/useApi';
import { getRooms, formatRoomData } from '../../services/strapiService';

const RoomList = () => {
  const { data, loading, error } = useApi(() => getRooms());
  const [filterPrice, setFilterPrice] = useState('all');

  const rooms = data?.data?.map(formatRoomData) || [];

  const filteredRooms = rooms.filter((room) => {
    if (filterPrice === 'all') return true;
    if (filterPrice === 'budget') return room.price < 2000;
    if (filterPrice === 'standard') return room.price >= 2000 && room.price < 4000;
    if (filterPrice === 'luxury') return room.price >= 4000;
    return true;
  });

  return (
    <div>
      {/* Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-2xl font-bold text-primary-dark">Tüm Odalar</h2>
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Tümü' },
            { value: 'budget', label: 'Ekonomik' },
            { value: 'standard', label: 'Standart' },
            { value: 'luxury', label: 'Lüks' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterPrice(filter.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filterPrice === filter.value
                  ? 'bg-primary-gold text-primary-dark'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 font-semibold">Odalar yüklenemedi</p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Bu fiyat aralığında oda bulunamadı</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
