import React from 'react';
import { useTranslation } from 'react-i18next';
import safranImage from '../../assets/safranbolupng.png';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="space-y-8">
          {/* Header and Subtitle */}
          <div className="space-y-2">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black">
              {t('about.title')}
            </h2>

            {/* Subtitle with arrow */}
            <p className="text-lg text-gray-700 flex items-center gap-3">
              <span className="text-2xl">→</span>
              <span className="font-display text-primary-dark">{t('about.subtitle')}</span>
            </p>
          </div>

          {/* Text Content */}
          <div className="space-y-8">
            <p className="max-w-4xl text-base md:text-xl text-gray-700 leading-relaxed preserve-whitespace">
              {t('about.content')}
            </p>
          </div>

          {/* Image - direct, no card wrapper */}
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
