import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import { FiAward, FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

const CorporatePage = () => {
  useScrollRestoration();
  const hotelImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';

  const values = [
    {
      icon: FiAward,
      title: 'Kalite',
      description: 'Misafirlerimize sunduğumuz hizmetlerin her detayında en yüksek kaliteyi sağlamak',
    },
    {
      icon: FiHeart,
      title: 'Misafirperverlik',
      description: 'Ebrulu Konak\'ın temel değeri olan konuklara karşı samimi ve içten davranış',
    },
    {
      icon: FiUsers,
      title: 'Ekip Ruhu',
      description: 'Birlikte çalışan profesyonel ekibimizle mükemmelliğe ulaşmak',
    },
    {
      icon: FiTrendingUp,
      title: 'İnnovasyon',
      description: 'Otelcilik sektöründe en güncel ve yenilikçi yaklaşımları benimsemek',
    },
  ];

  return (
    <Layout showFooter={false}>
      <div className="container-custom py-16">
        <PageHeader
          title="Kurumsal"
          description="Ebrulu Konak hakkında bilgi edinin ve misyon, vizyon ve değerlerimizi keşfedin."
          marginBottom="120px"
        />

        {/* About Section - Centered Text */}
        <div className="max-w-4xl mx-auto mb-section text-center">
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p>
              Ebrulu Konak, Safranbolu'nun tarihi dokusunu ve Osmanlı mimarisinin zarafetini günümüz konfor anlayışıyla buluşturan özel bir konaklama tesisidir. Karabük'ün dünyaca ünlü tarihî ilçesi Safranbolu'da hizmet veren tesisimiz, misafirlerine yalnızca bir konaklama değil, kültürel mirasın içinde eşsiz bir yaşam deneyimi sunmaktadır.
            </p>
            <p>
              Toplam beş ayrı konaktan oluşan Ebrulu Konak, 38 odasıyla tarihî atmosferi koruyarak modern konfor standartlarını misafirleriyle buluşturmaktadır. Geleneksel Osmanlı mimarisinin özgün detaylarıyla özenle korunan konaklarımız, geçmişin estetik anlayışını günümüzün ihtiyaçlarıyla harmanlayarak huzurlu ve samimi bir ortam oluşturmaktadır.
            </p>
            <p>
              Safranbolu'nun UNESCO Dünya Mirası niteliğindeki tarihî dokusunun merkezinde yer alan tesisimiz, misafirlerine taş sokaklar, tarihî çarşılar ve kültürel değerlerle çevrili benzersiz bir konaklama imkânı sunmaktadır. Her biri kendine özgü karaktere sahip odalarımız, geleneksel mimariyi yaşatırken konforlu bir konaklama deneyimi sağlamaktadır.
            </p>
            <p>
              Ebrulu Konak, konaklama hizmetlerinin yanı sıra bölgenin öne çıkan gastronomi duraklarından biri olarak da misafirlerini ağırlamaktadır. Geleneksel Türk mutfağının seçkin lezzetlerini yaşatan ev yemekleri, yöresel tatlar ve özenle hazırlanan açık büfe menülerimiz; yerli ve yabancı misafirlerimiz tarafından büyük beğeni görmektedir.
            </p>
            <p>
              İki ayrı restoran alanımızda aynı anda toplam 100 kişiye yemek hizmeti sunabilmekte; tur grupları, özel organizasyonlar ve toplu yemek etkinlikleri için profesyonel çözümler üretmekteyiz. Kaliteli hizmet anlayışımız, zengin menü seçeneklerimiz ve geleneksel misafirperverliğimiz sayesinde yemek organizasyonlarında Safranbolu'nun tercih edilen işletmeleri arasında yer almaktayız.
            </p>
            <p>
              Misafir memnuniyetini ön planda tutan hizmet anlayışımız, güler yüzlü ekibimiz ve Safranbolu'nun eşsiz atmosferiyle Ebrulu Konak, yerli ve yabancı ziyaretçiler için bölgenin seçkin konaklama ve gastronomi merkezlerinden biri olmayı sürdürmektedir.
            </p>
            <p>
              Tarih, kültür, lezzet ve huzurun bir arada yaşandığı Ebrulu Konak'ta, geçmişin zarafetini hissederken unutulmaz anılar biriktirmeye davet ediyoruz.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-section">
          <div className="bg-primary-light rounded-card p-10 shadow-card">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              Misyon
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Safranbolu'yu ziyaret eden konuklarına, tarihi ve kültürel zenginliği yaşatırken, lüks ve konfor içinde unutulmaz anılar oluşturmak.
            </p>
          </div>

          <div className="bg-primary-light rounded-card p-10 shadow-card">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              Vizyon
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Safranbolu'nun en prestijli ve tercih edilen konaklama yerlerinden biri olmak, sürdürülebilir turizm ilkelerine uyarak bölgeye katkı sağlamak.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-section">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-16 text-center">
            Temel Değerlerimiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-primary-light rounded-card p-10 flex flex-col gap-4 text-center transition-all duration-300 shadow-card hover:-translate-y-2 hover:shadow-card-hover"
                >
                  <IconComponent className="w-10 h-10 text-primary-accent mx-auto" />
                  <h3 className="text-lg font-bold text-primary-dark">
                    {value.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default CorporatePage;
