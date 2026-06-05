import React from 'react';
import { useTranslation } from 'react-i18next';
import safranImage from '../../assets/safranbolupng.png';

const AboutSection = () => {
  const { t } = useTranslation();

  const renderParagraphs = (text) => {
    return text.split('\n\n').map((para, idx) => {
      // Handle **text** format to bold
      const parts = para.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="text-base md:text-lg text-gray-700 leading-relaxed">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={i} style={{ color: '#9c714b', fontWeight: 'bold' }}>
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="space-y-12">
          {/* Top Intro Section with Dividers */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Top Divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
              <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
            </div>

            {/* Intro Text */}
            <div className="space-y-6">
              {renderParagraphs(t('about.intro'))}
            </div>

            {/* Title and Subtitle (bold, centered) */}
            <div className="space-y-1">
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#000', margin: 0 }}>
                {t('about.title')}
              </h3>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#000', margin: 0 }}>
                {t('about.subtitle')}
              </p>
            </div>

            {/* Bottom Divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
              <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
            </div>
          </div>

          {/* Main Section - Ebrulu Konak */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 style={{ fontSize: '48px', fontWeight: 'bold', color: '#000', margin: '0 0 16px 0' }}>
                Ebrulu Konak
              </h2>
              <p style={{ fontSize: '16px', color: '#9c714b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>→</span>
                <span style={{ fontWeight: '600' }}>{t('about.subtitle')}</span>
              </p>
            </div>

            {/* Long Description */}
            <div className="space-y-6">
              {renderParagraphs(t('about.description'))}
            </div>
          </div>

          {/* Image */}
          <div className="mt-12 w-full">
            <img
              src={safranImage}
              alt="Safranbolu - Ebrulu Konak"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
