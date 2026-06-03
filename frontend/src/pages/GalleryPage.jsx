import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/common/Layout';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';
import { getGallery, getMediaUrl } from '../services/strapiService';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const GalleryPage = () => {
  const { data, loading, error } = useApi(() => getGallery());
  const [selectedIndex, setSelectedIndex] = useState(null);

  const photos = data?.data?.photos || [];

  const handlePrev = useCallback(() => {
    setSelectedIndex((i) => (i > 0 ? i - 1 : photos.length - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((i) => (i < photos.length - 1 ? i + 1 : 0));
  }, [photos.length]);

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

  return (
    <Layout>
      <div className="container-custom py-16">
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', color: '#9c714b', margin: '0 0 16px 0' }}>
              Galeri
            </h1>
            <p style={{ fontSize: '18px', color: '#666', lineHeight: '1.6', margin: '0 0 24px 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Safranbolu'nun ruhunu yansıtan özgün detayları keşfedin.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
              <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
            </div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Galeri yüklenemedi</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, idx) => (
              <div
                key={photo.id}
                className="rounded-lg overflow-hidden cursor-pointer group"
                style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 200ms linear' }}
                onClick={() => setSelectedIndex(idx)}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.14)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
              >
                <img
                  src={getMediaUrl(photo)}
                  alt="Galeri"
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && photos[selectedIndex] && (
        <div
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '16px' }}
          onClick={handleClose}
        >
          {/* Image */}
          <div style={{ position: 'relative', maxWidth: '900px', width: '100%' }} onClick={(e) => e.stopPropagation()}>
            <img
              src={getMediaUrl(photos[selectedIndex])}
              alt="Galeri"
              style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '12px', display: 'block' }}
            />

            {/* Counter */}
            <div style={{ position: 'absolute', bottom: '-36px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
              {selectedIndex + 1} / {photos.length}
            </div>
          </div>

          {/* Prev Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            style={{ position: 'fixed', left: '24px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms linear' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
          >
            <FiChevronLeft style={{ color: 'white', width: '28px', height: '28px' }} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            style={{ position: 'fixed', right: '24px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms linear' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
          >
            <FiChevronRight style={{ color: 'white', width: '28px', height: '28px' }} />
          </button>

          {/* Close Button */}
          <button
            onClick={handleClose}
            style={{ position: 'fixed', top: '24px', right: '24px', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 200ms linear' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
          >
            <FiX style={{ color: 'white', width: '22px', height: '22px' }} />
          </button>
        </div>
      )}
    </Layout>
  );
};

export default GalleryPage;
