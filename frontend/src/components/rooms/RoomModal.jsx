import { useState } from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../common/Button';

const RoomModal = ({ room, isOpen, onClose, onBook }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen || !room) return null;

  const images = room.images || [];
  const currentImage = images[currentImageIndex];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '20px',
        animation: 'fadeIn 200ms ease-out',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .room-modal-content {
          animation: slideUp 300ms ease-out;
        }
      `}</style>

      <div
        className="room-modal-content bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close Button */}
        <div style={{ position: 'relative' }}>
          {/* Main Image */}
          <div style={{ position: 'relative', paddingBottom: '66.66%', backgroundColor: '#f3efea' }}>
            {currentImage && (
              <img
                src={currentImage.url}
                alt={room.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                zIndex: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#9c714b',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 200ms linear',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgb(255, 255, 255)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)')}
            >
              <FiX size={24} />
            </button>

            {/* Image Navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#9c714b',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 200ms linear',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(-50%)')}
                >
                  <FiChevronLeft size={24} />
                </button>

                <button
                  onClick={handleNextImage}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    color: '#9c714b',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 200ms linear',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(-50%)')}
                >
                  <FiChevronRight size={24} />
                </button>

                {/* Image Indicators */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '8px',
                  }}
                >
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      style={{
                        width: idx === currentImageIndex ? '32px' : '10px',
                        height: '10px',
                        borderRadius: '5px',
                        backgroundColor: idx === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 200ms linear',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '40px 32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#9c714b', marginBottom: '12px' }}>
            {room.title}
          </h2>

          <div style={{ fontSize: '16px', color: '#666', lineHeight: '1.8', marginBottom: '32px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
            {room.description}
          </div>

          {/* Features */}
          {room.features && room.features.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#9c714b', marginBottom: '16px' }}>
                Özellikler
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                {room.features.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 0',
                    }}
                  >
                    <div
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#a67c52',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: '#333', fontSize: '14px' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price & Booking */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '24px',
              borderTop: '1px solid #e5e5e5',
              marginTop: '32px',
            }}
          >
            <div>
              <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>Gece başına</p>
              <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#a67c52' }}>₺{room.price}</p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <Button variant="secondary" onClick={onClose} size="lg">
                Kapat
              </Button>
              <Button variant="primary" onClick={() => onBook(room)} size="lg">
                Rezervasyon Yap
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
