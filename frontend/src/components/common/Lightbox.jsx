import React from 'react';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Lightbox = ({ images, selectedIndex, onClose, onPrev, onNext, fallbackImage = null }) => {
  if (selectedIndex === null) return null;

  const currentImage = images[selectedIndex];
  const imageUrl = currentImage?.url || fallbackImage;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        padding: '48px 24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: '900px',
          width: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 200ms linear',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)')}
          aria-label="Kapat"
        >
          <FiX style={{ color: 'white', width: '20px', height: '20px' }} />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 200ms linear',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)')}
          aria-label="Önceki resim"
        >
          <FiChevronLeft style={{ color: 'white', width: '24px', height: '24px' }} />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 200ms linear',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.65)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)')}
          aria-label="Sonraki resim"
        >
          <FiChevronRight style={{ color: 'white', width: '24px', height: '24px' }} />
        </button>

        {/* Image */}
        <img
          src={imageUrl}
          alt="Büyütülmüş görüntü"
          style={{
            width: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: '12px',
            display: 'block',
          }}
        />

        {/* Counter */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '12px',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '14px',
          }}
        >
          {selectedIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default Lightbox;
