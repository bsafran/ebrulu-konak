import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const RoomCard = ({ room, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const firstImage = room.images?.[0];
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';
  const imageUrl = firstImage?.url || fallbackImage;

  return (
    <div
      style={{
        cursor: 'pointer',
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: 'white',
        border: '1px solid #f0f0f0',
        transition: 'all 200ms linear',
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isHovered ? '0 12px 32px rgba(0, 0, 0, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.04)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container */}
      <div
        style={{
          position: 'relative',
          paddingBottom: '75%',
          overflow: 'hidden',
          backgroundColor: '#f3efea',
        }}
      >
        {/* Image */}
        <img
          src={imageUrl}
          alt={room.title}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 200ms linear',
          }}
        />

        {/* Overlay Backdrop */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 200ms linear',
            pointerEvents: 'none',
          }}
        />

        {/* Explore Button - Show on hover */}
        <Link
          to={`/rooms/${room.slug}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 200ms linear',
            pointerEvents: isHovered ? 'auto' : 'none',
            textDecoration: 'none',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              padding: '12px 28px',
              borderRadius: '9999px',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            }}
          >
            <span
              style={{
                color: '#9c714b',
                fontWeight: '600',
                fontSize: '14px',
              }}
            >
              Detayları Gör
            </span>
            <FiArrowRight style={{ color: '#9c714b', width: '18px', height: '18px' }} />
          </div>
        </Link>
      </div>

      {/* Content */}
      <div style={{ padding: '24px' }}>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#9c714b',
            marginBottom: '12px',
            margin: 0,
          }}
        >
          {room.title}
        </h3>

        <p
          style={{
            color: '#666',
            fontSize: '13px',
            lineHeight: '1.5',
            marginBottom: '16px',
            margin: '0 0 16px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            minHeight: '26px',
          }}
        >
          {room.description || 'Konforlu ve modern tasarımlı oda'}
        </p>

        {/* Features */}
        {room.features && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {room.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                style={{
                  fontSize: '12px',
                  backgroundColor: '#f3efea',
                  color: '#a67c52',
                  padding: '6px 12px',
                  borderRadius: '20px',
                }}
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid #f0f0f0',
            marginTop: '16px',
          }}
        >
          <div style={{ color: '#a67c52', fontSize: '24px', fontWeight: 'bold' }}>
            ₺{room.price}
          </div>
          <div style={{ textAlign: 'right', fontSize: '12px' }}>
            <p style={{ color: '#999', margin: '0 0 4px 0' }}>Kapasite</p>
            <p style={{ color: '#9c714b', fontWeight: '600', margin: 0 }}>
              {room.maxGuests} Kişi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
