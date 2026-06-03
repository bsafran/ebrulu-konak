import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import Loading from '../components/common/Loading';
import useApi from '../hooks/useApi';
import { getGallery, getMediaUrl } from '../services/strapiService';

const GalleryPage = () => {
  const { data, loading, error } = useApi(() => getGallery());
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryItems = data?.data || [];

  return (
    <Layout>
      <div className="container-custom py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary-dark mb-4">Galeri</h1>
          <p className="text-gray-600 text-lg">
            Ebrulu Konak\'ın muhteşem görselleri
          </p>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Galeri yüklenemedi</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item) => {
              const imageUrl = item.attributes?.image?.data
                ? getMediaUrl(item.attributes.image.data?.attributes)
                : null;

              return (
                <div
                  key={item.id}
                  className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedImage({ url: imageUrl, title: item.attributes?.title })}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={item.attributes?.title || 'Galeri Resmi'}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-primary-light flex items-center justify-center">
                      <span className="text-white text-4xl">📷</span>
                    </div>
                  )}

                  {item.attributes?.title && (
                    <div className="p-3 bg-primary-dark text-primary-light">
                      <p className="text-sm font-semibold line-clamp-1">
                        {item.attributes.title}
                      </p>
                    </div>
                  )}
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
              alt={selectedImage.title}
              className="w-full rounded-lg"
            />
            {selectedImage.title && (
              <p className="text-white text-center mt-4">{selectedImage.title}</p>
            )}
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
