import React from 'react';
import safranImage from '../../assets/safranbolupng.png';

const AboutSection = () => {
  const content = `2004 yılında Safranbolu'nun tarihsel dokusunu koruyan, 5 adet tarihi konaktan oluşan ve 38 odasını barındıran Ebrulu Konak, her köşesinde geçmişin izlerini taşıyarak misafirlerine unutulmaz bir deneyim sunmaktadır.

İçerisinde barındırdığı tarihi mimarisi, zarif tasarımı ve ender bulunan hizmet standartları ile misafirlerimize unutulmaz bir deneyim yaşatmayı amaçlıyoruz.

Restoran hizmetlerimizde, geleneksel Safranbolu lezzetlerini modern sunuş şekli ile birleştirerek, misafirlerimizin damak zevkine hitap eden bir menü sunmaktayız.

Kalite ve misafir memnuniyeti ilkelerine bağlı kalmak, hizmet anlayışımızın temel taşıdır. Her detayda mükemmelliği arayarak, misafirlerimizin beklentilerini aşmayı hedefliyoruz.

Ebrulu Konak olarak, Safranbolu'nun tarihi ve kültürel zenginliğini yaşatmak, bu mirası gelecek kuşaklara aktarmak misyonumuz.`;

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="space-y-8">
          {/* Header */}
          <h2 className="text-6xl md:text-7xl font-bold text-primary-dark">
            Ebrulu Konak
          </h2>

          {/* Decorative Divider - Below Heading */}
          <div className="flex items-center justify-center gap-2">
            <span style={{ color: '#9c714b', fontSize: '18px' }}>·</span>
            <span style={{ color: '#9c714b', fontSize: '18px' }}>·</span>
            <span style={{ color: '#9c714b', fontSize: '24px' }}>◆</span>
            <span style={{ color: '#9c714b', fontSize: '18px' }}>·</span>
            <span style={{ color: '#9c714b', fontSize: '18px' }}>·</span>
          </div>

          {/* Subtitle with arrow */}
          <p className="text-lg text-gray-700 flex items-center gap-3">
            <span className="text-2xl">→</span>
            <span className="font-display text-primary-dark">Safranbolu'da Tarihi Yeniden Yaşayın</span>
          </p>

          {/* Text Content */}
          <div className="space-y-8">
            <p className="max-w-4xl text-xl text-gray-700 leading-relaxed preserve-whitespace">
              {content}
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

          {/* Decorative Divider - End of Section */}
          <div className="flex items-center justify-center gap-2 mt-12">
            <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
            <span style={{ color: '#9c714b', fontSize: '18px' }}>·</span>
            <span style={{ color: '#9c714b', fontSize: '24px' }}>◆</span>
            <span style={{ color: '#9c714b', fontSize: '18px' }}>·</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
