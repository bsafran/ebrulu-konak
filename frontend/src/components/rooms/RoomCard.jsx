import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const RoomCard = ({ room, onClick }) => {
  const firstImage = room.images?.[0];
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';

  return (
    <Link to={`/rooms/${room.id}`} onClick={onClick}>
      <Card hover>
        {/* Image */}
        {firstImage ? (
          <img
            src={firstImage.url}
            alt={room.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        ) : (
          <img
            src={fallbackImage}
            alt={room.title}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
        )}

        {/* Content */}
        <div className="space-y-3">
          <h3 className="text-2xl font-bold text-primary-dark">{room.title}</h3>

          <p className="text-gray-600 line-clamp-2 text-sm">
            {room.description || 'Konforlu ve modern tasarımlı oda'}
          </p>

          {/* Features */}
          {room.features && (
            <div className="flex flex-wrap gap-2 py-2">
              {room.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-primary-gold/20 text-primary-gold px-3 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="text-3xl font-bold text-primary-gold">₺{room.price}</div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Kapasite</p>
              <p className="text-lg font-semibold text-primary-dark">{room.maxGuests} Kişi</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default RoomCard;
