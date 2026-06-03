import React from 'react';

const IntroSection = ({ title = 'Hoş Geldiniz', text = '' }) => {
  const displayText = text || `Ebrulu Konak, Yunak bölgesinin en lüks ve konforlu otel hizmetini sunmaktan gurur duyar.
              İçerisinde barındırdığı tarihi mimarisi, zarif tasarımı ve ender bulunan hizmet standartları
              ile misafirlerimize unutulmaz bir deneyim yaşatmayı amaçlıyoruz.`;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-primary-dark text-lg">→</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold text-primary-dark">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed preserve-whitespace">
            {displayText}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
