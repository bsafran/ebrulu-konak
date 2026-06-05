import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiChevronDown } from 'react-icons/fi';

const VideoHero = ({ videoUrl, title, subtitle }) => {
  const { t } = useTranslation();
  const defaultTitle = title || t('hero.title');
  const defaultSubtitle = subtitle || t('hero.subtitle');
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
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg">
            {defaultTitle}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl drop-shadow-md">
            {defaultSubtitle}
          </p>
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
