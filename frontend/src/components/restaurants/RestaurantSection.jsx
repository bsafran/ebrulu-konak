import { useState } from 'react';

const RestaurantSection = ({ restaurant, reversed = false }) => {
  const [hoveredImageIndex, setHoveredImageIndex] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const fallbackImage = 'https://images.unsplash.com/photo-1504674900769-e71fada305e0?w=800&h=600&fit=crop';

  const images = restaurant.images && restaurant.images.length > 0
    ? restaurant.images
    : [
        { url: fallbackImage, alt: 'Restaurant' },
        { url: fallbackImage, alt: 'Restaurant' },
        { url: fallbackImage, alt: 'Restaurant' },
      ];

  const textPanel = (
    <div
      style={{
        padding: '64px',
        backgroundColor: '#f3efea',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '32px',
        height: '100%',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Restaurant Name - Small Caps */}
      <div>
        <p
          style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#a67c52',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            margin: 0,
            marginBottom: '16px',
          }}
        >
          {restaurant.name}
        </p>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: '20px',
          lineHeight: '1.8',
          color: '#555',
          margin: 0,
          fontWeight: '400',
        }}
      >
        {restaurant.description}
      </p>

      {/* Tags/Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '16px' }}>
        {restaurant.cuisine && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#9c714b',
              backgroundColor: 'rgba(166, 124, 82, 0.1)',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(166, 124, 82, 0.2)',
            }}
          >
            {restaurant.cuisine} Mutfağı
          </span>
        )}
        {restaurant.openingHours && (
          <span
            style={{
              fontSize: '12px',
              fontWeight: '500',
              color: '#9c714b',
              backgroundColor: 'rgba(166, 124, 82, 0.1)',
              padding: '8px 16px',
              borderRadius: '20px',
              border: '1px solid rgba(166, 124, 82, 0.2)',
            }}
          >
            {restaurant.openingHours}
          </span>
        )}
      </div>

    </div>
  );

  const imagePanel = (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px',
        height: '100%',
      }}
    >
      {/* Left Column - Tall Image */}
      <div
        style={{
          gridRow: '1 / 3',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#f3efea',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHoveredImageIndex(0)}
        onMouseLeave={() => setHoveredImageIndex(null)}
        onClick={() => setSelectedImageIndex(0)}
      >
        <img
          src={images[0]?.url || fallbackImage}
          alt={images[0]?.alt || 'Restaurant'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hoveredImageIndex === 0 ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 300ms ease-out',
          }}
        />
      </div>

      {/* Right Column - Top Image */}
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#f3efea',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHoveredImageIndex(1)}
        onMouseLeave={() => setHoveredImageIndex(null)}
        onClick={() => setSelectedImageIndex(1)}
      >
        <img
          src={images[1]?.url || fallbackImage}
          alt={images[1]?.alt || 'Restaurant'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hoveredImageIndex === 1 ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 300ms ease-out',
          }}
        />
      </div>

      {/* Right Column - Bottom Image */}
      <div
        style={{
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#f3efea',
          cursor: 'pointer',
        }}
        onMouseEnter={() => setHoveredImageIndex(2)}
        onMouseLeave={() => setHoveredImageIndex(null)}
        onClick={() => setSelectedImageIndex(2)}
      >
        <img
          src={images[2]?.url || fallbackImage}
          alt={images[2]?.alt || 'Restaurant'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hoveredImageIndex === 2 ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 300ms ease-out',
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      className="restaurant-section"
      style={{
        display: 'flex',
        flexDirection: reversed ? 'row-reverse' : 'row',
        gap: '64px',
        alignItems: 'center',
        marginBottom: '120px',
      }}
    >
      {/* For smaller screens, use flexbox with media query */}
      <style>{`
        @media (max-width: 768px) {
          .restaurant-section {
            flex-direction: column !important;
            gap: 32px !important;
            margin-bottom: 48px !important;
          }
          .restaurant-images {
            min-height: 400px !important;
          }
        }
      `}</style>

      <div
        className="restaurant-text"
        style={{
          flex: 1,
          minWidth: 0,
        }}
      >
        {textPanel}
      </div>
      <div
        className="restaurant-images"
        style={{
          flex: 1,
          minHeight: '700px',
          minWidth: 0,
        }}
      >
        {imagePanel}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '16px',
          }}
          onClick={() => setSelectedImageIndex(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '900px',
              width: '100%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedImageIndex]?.url || fallbackImage}
              alt={images[selectedImageIndex]?.alt || 'Restaurant'}
              style={{
                width: '100%',
                borderRadius: '8px',
              }}
            />

            {/* Previous Button */}
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                style={{
                  position: 'absolute',
                  left: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ‹
              </button>
            )}

            {/* Next Button */}
            {selectedImageIndex < images.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                style={{
                  position: 'absolute',
                  right: '-60px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                ›
              </button>
            )}

            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            {/* Image Counter */}
            <p
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255, 255, 255, 0.9)',
                margin: 0,
                fontSize: '14px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                padding: '8px 16px',
                borderRadius: '20px',
              }}
            >
              {selectedImageIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantSection;
