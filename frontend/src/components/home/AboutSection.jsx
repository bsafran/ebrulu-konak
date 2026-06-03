import React from 'react';

const AboutSection = ({ title = 'Hakkımızda', description = '' }) => {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop"
              alt="Ebrulu Konak"
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-primary-dark">{title}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {description ||
                `Ebrulu Konak, Yunak bölgesinin tarihi ve doğal güzellikleri içinde yer alan,
                modern amenities ile klasik mimarisini harmanlayan benzersiz bir otel işletmesidir.
                Her oda, el sanatları ile dekore edilmiş ve misafirlerimizin konforunu en üst
                düzeyde tutacak şekilde tasarlanmıştır.`}
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                '🏨 Lüks Odalar',
                '🍽️ Fine Dining',
                '🧖 Spa Hizmetleri',
                '📍 Eşsiz Lokasyon',
                '👨‍💼 24/7 Hizmet',
                '🎵 Uydu TV & WiFi',
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <div className="w-3 h-3 rounded-full bg-primary-accent"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
