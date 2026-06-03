import React from 'react';

const IntroSection = ({ title = 'Hoş Geldiniz', text = '' }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {text ||
              `Ebrulu Konak, Yunak bölgesinin en lüks ve konforlu otel hizmetini sunmaktan gurur duyar.
              İçerisinde barındırdığı tarihi mimarisi, zarif tasarımı ve ender bulunan hizmet standartları
              ile misafirlerimize unutulmaz bir deneyim yaşatmayı amaçlıyoruz.`}
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
