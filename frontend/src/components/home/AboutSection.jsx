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
        <div className="space-y-12">
          {/* Header Section */}
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-primary-dark">
              Hakkımızda
            </h2>
            <p className="text-xl text-primary-dark font-display">
              Safranbolu'da Tarihi Yeniden Yaşayın
            </p>
          </div>

          {/* Content and Image Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed preserve-whitespace">
                {content}
              </p>
              <div className="pt-4">
                <p className="text-lg font-display text-primary-dark">
                  <span className="font-bold">Ebrulu Konak</span> - Reliving History in Safranbolu
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={safranImage}
                alt="Safranbolu - Ebrulu Konak"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
