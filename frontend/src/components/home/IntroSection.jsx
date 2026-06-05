import React from 'react';
import { useTranslation } from 'react-i18next';

const IntroSection = ({ title, text }) => {
  const { t } = useTranslation();
  const displayTitle = title || t('intro.title');
  const displayText = text || t('intro.text');

  const renderText = () => {
    const lines = displayText.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={idx}>{line.slice(2, -2)}</strong>;
      }
      if (line.trim() === '') {
        return <br key={idx} />;
      }
      return <span key={idx}>{line}</span>;
    }).reduce((acc, el, idx, arr) => {
      if (idx < arr.length - 1) {
        return [...acc, el, <br key={`br-${idx}`} />];
      }
      return [...acc, el];
    }, []);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg text-gray-600 leading-relaxed preserve-whitespace">
            {displayText}
          </p>

          {/* Decorative Divider - Below Text */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
            <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#9c714b' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
