import React from 'react';
import { useTranslation } from 'react-i18next';
import safranImage from '../../assets/safranbolupng.png';

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="space-y-8">
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
