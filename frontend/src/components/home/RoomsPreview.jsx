import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Loading from '../common/Loading';
import Button from '../common/Button';
import useApi from '../../hooks/useApi';
import { getRooms, getMediaUrl, formatRoomData } from '../../services/strapiService';

const RoomsPreview = () => {
  const { data, loading, error } = useApi(() => getRooms());
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';

  const rooms = data?.data?.slice(0, 3) || [];

  return (
    <section className="py-20 bg-primary-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-dark mb-4">Odalarımız</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Ebrulu Konak\'ın zarif ve konforlu odaları, siz misafirlerimizin rahatı için tasarlanmıştır.
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Odalar yüklenemedi</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {rooms.map((room) => {
                const formattedRoom = formatRoomData(room);
                const firstImage = formattedRoom.images?.[0];

                return (
                  <Link key={room.id} to={`/rooms/${room.id}`}>
                    <Card hover>
                      {/* Image */}
                      <img
                        src={firstImage?.url || fallbackImage}
                        alt={formattedRoom.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />

                      {/* Content */}
                      <h3 className="text-xl font-bold text-primary-dark mb-2">
                        {formattedRoom.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {formattedRoom.description || 'Konforlu ve modern tasarımlı oda'}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary-accent">
                          ₺{formattedRoom.price}
                        </span>
                        <span className="text-sm bg-primary-accent/20 text-primary-accent px-3 py-1 rounded-full">
                          {formattedRoom.maxGuests} Kişi
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {/* View All Button */}
            <div className="text-center">
              <Link to="/rooms">
                <Button variant="secondary" size="lg">
                  Tüm Odaları Görünt ü le
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RoomsPreview;
