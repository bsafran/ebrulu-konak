import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { useBooking } from '../../context/BookingContext';

const RoomDetail = ({ room, loading }) => {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';

  if (loading) return <Loading fullScreen />;

  if (!room) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px' }}>
        <p style={{ color: '#d32f2f', fontWeight: '600' }}>Oda bulunamadı</p>
      </div>
    );
  }

  const images = room.images && room.images.length > 0 ? room.images : [
    { url: fallbackImage, alt: 'Room' },
    { url: fallbackImage, alt: 'Room' },
    { url: fallbackImage, alt: 'Room' },
  ];

  const handleBookNow = () => {
    updateBooking({ selectedRoomId: room.id, selectedRoom: room });
    navigate('/reservation');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
      {/* Image Grid - Airbnb style */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '24px',
          minHeight: '500px',
          borderRadius: '24px',
          overflow: 'hidden',
        }}
      >
        {/* Left - Big Image */}
        <div
          style={{
            gridRow: '1 / 3',
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#f3efea',
          }}
        >
          <img
            src={images[0]?.url || fallbackImage}
            alt={images[0]?.alt || 'Room'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Right Top */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#f3efea',
          }}
        >
          <img
            src={images[1]?.url || fallbackImage}
            alt={images[1]?.alt || 'Room'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Right Bottom */}
        <div
          style={{
            borderRadius: '16px',
            overflow: 'hidden',
            backgroundColor: '#f3efea',
          }}
        >
          <img
            src={images[2]?.url || fallbackImage}
            alt={images[2]?.alt || 'Room'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Content Section - 2 Col Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '48px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left - Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Title & Description */}
          <div>
            <h1
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#9c714b',
                margin: '0 0 16px 0',
              }}
            >
              {room.title}
            </h1>
            <p
              style={{
                fontSize: '18px',
                lineHeight: '1.8',
                color: '#666',
                margin: 0,
              }}
            >
              {room.description}
            </p>
          </div>
        </div>

        {/* Right - Sticky Booking Card */}
        <div
          style={{
            position: 'sticky',
            top: '120px',
            backgroundColor: '#f3efea',
            borderRadius: '24px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Features Section */}
          {room.features && room.features.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#a67c52',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 16px 0',
                }}
              >
                Oda Özellikleri
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px 16px',
                }}
              >
                {room.features.map((feature, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#a67c52',
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: '#555',
                        lineHeight: '1.4',
                      }}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: '#e5d4c4' }} />

          {/* Booking Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={handleBookNow}
            style={{
              width: '100%',
              backgroundColor: '#9c714b',
              color: '#f3efea',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 200ms linear',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#8a6140';
              e.target.style.transform = 'scale(0.98)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#9c714b';
              e.target.style.transform = 'scale(1)';
            }}
          >
            Şimdi Rezervasyon Yap
          </Button>

          {/* Payment Note */}
          <p
            style={{
              fontSize: '12px',
              color: '#999',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Ödeme sayfasında tüm ödeme yöntemlerini göreceksiniz
          </p>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .room-grid {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto auto;
          }
          .room-grid > div:first-child {
            grid-row: 1 / 3;
          }
        }
        @media (max-width: 768px) {
          .room-layout {
            grid-template-columns: 1fr !important;
          }
          .booking-card {
            position: static !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RoomDetail;
