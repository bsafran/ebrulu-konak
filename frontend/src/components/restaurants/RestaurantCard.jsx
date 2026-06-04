import React from 'react';
import Card from '../common/Card';

const RestaurantCard = ({ restaurant }) => {
  const firstImage = restaurant.images?.[0];

  return (
    <Card hover>
        {/* Image Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4 rounded-lg overflow-hidden h-32">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200">
              {restaurant.images?.[i] ? (
                <img
                  src={restaurant.images[i].url}
                  alt={`${restaurant.name} ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary-light flex items-center justify-center">
                  <span className="text-white text-xl">🍽️</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-primary-dark">{restaurant.name}</h3>
          <p className="text-sm text-primary-accent font-semibold">{restaurant.cuisine} Mutfağı</p>
          <p className="text-gray-600 text-sm line-clamp-2">
            {restaurant.description || 'Özel şef hizmetleriyle sunulan lezzetli yemekler'}
          </p>
          <p className="text-xs text-gray-500 pt-2">
            🕐 {restaurant.openingHours || '10:00 - 23:00'}
          </p>
        </div>
      </Card>
  );
};

export default RestaurantCard;
