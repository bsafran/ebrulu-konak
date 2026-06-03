import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../common/Button';
import Loading from '../common/Loading';
import { useBooking } from '../../context/BookingContext';

const RoomDetail = ({ room, loading }) => {
  const navigate = useNavigate();
  const { updateBooking } = useBooking();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';

  const images = room?.images && room.images.length > 0 ? room.images : [
    { url: fallbackImage, alt: 'Room' },
  ];

  const handlePrev = useCallback(() => setSelectedIndex((i) => (i > 0 ? i - 1 : images.length - 1)), [images.length]);
  const handleNext = useCallback(() => setSelectedIndex((i) => (i < images.length - 1 ? i + 1 : 0)), [images.length]);
  const handleClose = useCallback(() => setSelectedIndex(null), []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex, handlePrev, handleNext, handleClose]);

  if (loading) return <Loading fullScreen />;

  if (!room) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 20px' }}>
        <p style={{ color: '#d32f2f', fontWeight: '600' }}>Oda bulunamadı</p>
      </div>
    );
  }

  const handleBookNow = () => {
    updateBooking({ selectedRoomId: room.id, selectedRoom: room });
    navigate('/reservation');
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    cursor: 'pointer',
    transition: 'transform 300ms ease',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
      {/* Image Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: images.length === 1 ? '1fr' : '2fr 1fr',
            gridTemplateRows: images.length === 1 ? '1fr' : '1fr 1fr',
            gap: '24px',
            minHeight: '500px',
          }}
        >
          {/* Left - Big Image */}
          <div
            style={{
              gridRow: images.length === 1 ? '1' : '1 / 3',
              borderRadius: '16px',
              overflow: 'hidden',
              backgroundColor: '#f3efea',
              cursor: 'pointer'
            }}
            onClick={() => setSelectedIndex(0)}
            onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
            onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
          >
            <img src={images[0]?.url || fallbackImage} alt="Room" style={imgStyle} />
          </div>

          {/* Right Top */}
          {images.length > 1 && (
            <div
              style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#f3efea', cursor: 'pointer' }}
              onClick={() => setSelectedIndex(1)}
              onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <img src={images[1]?.url} alt="Room" style={imgStyle} />
            </div>
          )}

          {/* Right Bottom */}
          {images.length > 2 && (
            <div
              style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#f3efea', cursor: 'pointer' }}
              onClick={() => setSelectedIndex(2)}
              onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.04)'}
              onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
            >
              <img src={images[2]?.url} alt="Room" style={imgStyle} />
            </div>
          )}
        </div>

        {/* Additional Images */}
        {images.length > 3 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
            {images.slice(3).map((image, idx) => (
              <div
                key={idx + 3}
                style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f3efea', aspectRatio: '1', cursor: 'pointer' }}
                onClick={() => setSelectedIndex(idx + 3)}
              >
                <img src={image?.url || fallbackImage} alt="Room" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '48px', alignItems: 'flex-start' }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#9c714b', margin: '0 0 16px 0' }}>
              {room.title}
            </h1>
            <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#666', margin: 0 }}>
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
          {room.features && room.features.length > 0 && (
            <div>
              <p style={{ fontSize: '12px', fontWeight: '600', color: '#a67c52', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px 0' }}>
                Oda Özellikleri
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
                {room.features.map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#a67c52', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: '13px', color: '#555', lineHeight: '1.4' }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ height: '1px', backgroundColor: '#e5d4c4' }} />

          <Button
            variant="primary"
            size="lg"
            onClick={handleBookNow}
            style={{ width: '100%', backgroundColor: '#9c714b', color: '#f3efea', padding: '14px 24px', fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'all 200ms linear' }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#8a6140'; e.target.style.transform = 'scale(0.98)'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = '#9c714b'; e.target.style.transform = 'scale(1)'; }}
          >
            Şimdi Rezervasyon Yap
          </Button>

          <p style={{ fontSize: '12px', color: '#999', textAlign: 'center', margin: 0 }}>
            Ödeme sayfasında tüm ödeme yöntemlerini göreceksiniz
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '24px' }}
          onClick={handleClose}
        >
          <div style={{ position: 'relative', maxWidth: '1200px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            <button
              onClick={handleClose}
              style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms linear' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
            >
              <FiX style={{ color: 'white', width: '20px', height: '20px' }} />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms linear' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
            >
              <FiChevronLeft style={{ color: 'white', width: '24px', height: '24px' }} />
            </button>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms linear' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
            >
              <FiChevronRight style={{ color: 'white', width: '24px', height: '24px' }} />
            </button>

            <img
              src={images[selectedIndex]?.url || fallbackImage}
              alt="Room"
              style={{ width: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '12px', display: 'block' }}
            />

            {/* Counter */}
            <div style={{ textAlign: 'center', marginTop: '12px', color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .room-layout { grid-template-columns: 1fr !important; }
          .booking-card { position: static !important; }
        }
      `}</style>
    </div>
  );
};

export default RoomDetail;
