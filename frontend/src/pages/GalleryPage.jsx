import React, { useState, useEffect, useCallback } from 'react';
import Layout from '../components/common/Layout';
import Loading from '../components/common/Loading';
import Lightbox from '../components/common/Lightbox';
import useApi from '../hooks/useApi';
import { getGallery, getMediaUrl } from '../services/strapiService';

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
      <Lightbox
        images={photos.map(photo => ({ ...photo, url: getMediaUrl(photo) }))}
        selectedIndex={selectedIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </Layout>
  );
};

export default GalleryPage;
