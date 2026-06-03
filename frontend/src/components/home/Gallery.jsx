import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Loading from '../common/Loading';
import useApi from '../../hooks/useApi';
import { getGallery, getMediaUrl } from '../../services/strapiService';

const Gallery = () => {
  const { data, loading, error } = useApi(() => getGallery());

  const galleryItems = data?.data?.slice(0, 8) || [];

  return (
    <section className="py-20" style={{ backgroundColor: '#f3efea' }}>
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-bold text-primary-dark mb-4">Galeri</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
            Safranbolu'nun ruhunu yansıtan özgün detayları keşfedin.
          </p>

          {/* Decorative Divider - Below Subtitle */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
            <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 font-semibold">Galeri yüklenemedi</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
              {galleryItems.map((item) => {
                const imageUrl = item.attributes?.image?.data
                  ? getMediaUrl(item.attributes.image.data?.attributes)
                  : null;

                return (
                  <div
                    key={item.id}
                    className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
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

            {/* View All Gallery */}
            <div className="text-center">
              <Link to="/gallery">
                <Button variant="secondary" size="lg">
                  Tam Galeriyi Görüntüle
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Gallery;
