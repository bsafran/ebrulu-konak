import React from 'react';
import { useTranslation } from 'react-i18next';
import safranImage from '../../assets/safranbolupng.png';

const AboutSection = () => {
  const { t } = useTranslation();

  const renderParagraphs = (text, isIntro = false) => {
    return text.split('\n\n').map((para, idx) => {
      // Handle **text** format to bold
      const parts = para.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} style={{ fontSize: isIntro ? '16px' : '16px', lineHeight: '1.8', color: '#333', margin: 0 }}>
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
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Top Divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
              <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
            </div>

            {/* Intro Text with Bold Title/Subtitle at End */}
            <div className="space-y-3">
              {renderParagraphs(t('about.intro'), true)}
            </div>

            {/* Bottom Divider */}
            <div className="flex items-center justify-center gap-3">
              <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
              <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
              <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
            </div>
          </div>

          {/* Main Section - Ebrulu Konak */}
          <div className="space-y-6">
            <div>
              <h2 style={{ fontSize: '56px', fontWeight: 'bold', color: '#000', margin: '0 0 8px 0', textAlign: 'left', lineHeight: '1.2' }}>
                Ebrulu Konak
              </h2>
              <p style={{ fontSize: '16px', color: '#9c714b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', textAlign: 'left', fontWeight: '500' }}>
                <span>→</span>
                <span>{t('about.subtitle')}</span>
              </p>
            </div>

            {/* Long Description */}
            <div className="space-y-3" style={{ maxWidth: '4xl' }}>
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
