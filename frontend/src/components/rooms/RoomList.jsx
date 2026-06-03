import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomCard from './RoomCard';
import RoomModal from './RoomModal';
import Loading from '../common/Loading';
import useApi from '../../hooks/useApi';
import { getRooms, formatRoomData } from '../../services/strapiService';

const RoomList = () => {
  const { data, loading, error } = useApi(() => getRooms());
  const navigate = useNavigate();
  const [filterPrice, setFilterPrice] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rooms = data?.data?.map(formatRoomData) || [];

  const filteredRooms = rooms.filter((room) => {
    if (filterPrice === 'all') return true;
    if (filterPrice === 'budget') return room.price < 2000;
    if (filterPrice === 'standard') return room.price >= 2000 && room.price < 4000;
    if (filterPrice === 'luxury') return room.price >= 4000;
    return true;
  });

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const getFilterTitle = () => {
    const filterLabels = {
      all: 'Tüm Odalar',
      budget: 'Ekonomik Odalar',
      standard: 'Standart Odalar',
      luxury: 'Lüks Odalar',
    };
    return filterLabels[filterPrice] || 'Tüm Odalar';
  };

  const handleBookNow = (room) => {
    setIsModalOpen(false);
    navigate('/reservation', { state: { selectedRoomId: room.id, selectedRoom: room } });
  };

  return (
    <>
      {/* Filter Section */}
      <div
        style={{
          marginBottom: '40px',
          paddingBottom: '24px',
          borderBottom: '1px solid #e5e5e5',
          display: 'flex',
          flexDirection: 'row',
          gap: '24px',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#9c714b', margin: 0 }}>
          {getFilterTitle()}
        </h2>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { value: 'all', label: 'Tümü' },
            { value: 'budget', label: 'Ekonomik' },
            { value: 'standard', label: 'Standart' },
            { value: 'luxury', label: 'Lüks' },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setFilterPrice(filter.value)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                fontWeight: '500',
                fontSize: '14px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 200ms linear',
                backgroundColor: filterPrice === filter.value ? '#a67c52' : '#f0f0f0',
                color: filterPrice === filter.value ? 'white' : '#666',
              }}
              onMouseEnter={(e) => {
                if (filterPrice !== filter.value) {
                  e.currentTarget.style.backgroundColor = '#e5e5e5';
                }
              }}
              onMouseLeave={(e) => {
                if (filterPrice !== filter.value) {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                }
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <p style={{ color: '#d32f2f', fontWeight: '600' }}>Odalar yüklenemedi</p>
        </div>
      ) : filteredRooms.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '48px 20px' }}>
          <p style={{ color: '#666', fontSize: '16px' }}>Bu fiyat aralığında oda bulunamadı</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '32px',
          }}
        >
          {filteredRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
            />
          ))}
        </div>
      )}

      {/* Room Modal */}
      <RoomModal
        room={selectedRoom}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBook={handleBookNow}
      />
    </>
  );
};

export default RoomList;
