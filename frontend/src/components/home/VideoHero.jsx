import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';

const VideoHero = ({ videoUrl, title = 'Ebrulu Konak\'a Hoş Geldiniz', subtitle = 'Lüksün ve Konforun Buluştuğu Yer' }) => {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: '100vh', marginTop: '-80px', paddingTop: '80px' }}>
      {/* Video Background */}
      {videoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div className="absolute inset-0 bg-primary-dark"></div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-xl sm:text-2xl drop-shadow-md">
            {subtitle}
          </p>
          <div className="pt-8 space-x-4">
            <Link
              to="/rooms"
              className="inline-block bg-primary-accent text-primary-dark px-8 py-4 rounded-lg font-semibold hover:bg-opacity-80 transition-all duration-200"
            >
              Odaları Keşfet
            </Link>
            <Link
              to="/reservation"
              className="inline-block border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-primary-dark transition-all duration-200"
            >
              Şimdi Rezervasyon Yap
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8">
          <FiChevronDown className="w-8 h-8 text-white opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default VideoHero;
