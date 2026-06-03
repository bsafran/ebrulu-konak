import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';
import { getGallery, getMediaUrl } from '../services/strapiService';

const GalleryPage = () => {
  const { data, loading, error } = useApi(() => getGallery());
  const [selectedImage, setSelectedImage] = useState(null);

  // Single type: data.data.photos[] (Strapi v5 direct array)
  const photos = data?.data?.photos || [];

  return (
    <Layout>
      <div className="container-custom py-16">
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#9c714b',
                margin: '0 0 16px 0',
              }}
            >
              Galeri
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#666',
                lineHeight: '1.6',
                margin: '0 0 24px 0',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Safranbolu'nun ruhunu yansıtan özgün detayları keşfedin.
            </p>
            {/* Decorative Divider */}
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
            {photos.map((photo) => {
              const imageUrl = getMediaUrl(photo);
              return (
                <div
                  key={photo.id}
                  className="rounded-lg overflow-hidden cursor-pointer group"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', transition: 'all 200ms linear' }}
                  onClick={() => setSelectedImage({ url: imageUrl })}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.14)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                >
                  <img
                    src={imageUrl}
                    alt="Galeri"
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.url}
              alt="Galeri"
              className="w-full rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-xl"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default GalleryPage;
