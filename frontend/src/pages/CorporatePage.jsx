import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import { FiAward, FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi';

const CorporatePage = () => {
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
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto 120px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              color: '#555',
              lineHeight: '1.9',
            }}
          >
            <p style={{ margin: 0, fontSize: '16px' }}>
              Ebrulu Konak, Safranbolu'nun tarihi dokusunu ve Osmanlı mimarisinin zarafetini günümüz konfor anlayışıyla buluşturan özel bir konaklama tesisidir. Karabük'ün dünyaca ünlü tarihî ilçesi Safranbolu'da hizmet veren tesisimiz, misafirlerine yalnızca bir konaklama değil, kültürel mirasın içinde eşsiz bir yaşam deneyimi sunmaktadır.
            </p>
            <p style={{ margin: 0, fontSize: '16px' }}>
              Toplam beş ayrı konaktan oluşan Ebrulu Konak, 38 odasıyla tarihî atmosferi koruyarak modern konfor standartlarını misafirleriyle buluşturmaktadır. Geleneksel Osmanlı mimarisinin özgün detaylarıyla özenle korunan konaklarımız, geçmişin estetik anlayışını günümüzün ihtiyaçlarıyla harmanlayarak huzurlu ve samimi bir ortam oluşturmaktadır.
            </p>
            <p style={{ margin: 0, fontSize: '16px' }}>
              Safranbolu'nun UNESCO Dünya Mirası niteliğindeki tarihî dokusunun merkezinde yer alan tesisimiz, misafirlerine taş sokaklar, tarihî çarşılar ve kültürel değerlerle çevrili benzersiz bir konaklama imkânı sunmaktadır. Her biri kendine özgü karaktere sahip odalarımız, geleneksel mimariyi yaşatırken konforlu bir konaklama deneyimi sağlamaktadır.
            </p>
            <p style={{ margin: 0, fontSize: '16px' }}>
              Ebrulu Konak, konaklama hizmetlerinin yanı sıra bölgenin öne çıkan gastronomi duraklarından biri olarak da misafirlerini ağırlamaktadır. Geleneksel Türk mutfağının seçkin lezzetlerini yaşatan ev yemekleri, yöresel tatlar ve özenle hazırlanan açık büfe menülerimiz; yerli ve yabancı misafirlerimiz tarafından büyük beğeni görmektedir.
            </p>
            <p style={{ margin: 0, fontSize: '16px' }}>
              İki ayrı restoran alanımızda aynı anda toplam 100 kişiye yemek hizmeti sunabilmekte; tur grupları, özel organizasyonlar ve toplu yemek etkinlikleri için profesyonel çözümler üretmekteyiz. Kaliteli hizmet anlayışımız, zengin menü seçeneklerimiz ve geleneksel misafirperverliğimiz sayesinde yemek organizasyonlarında Safranbolu'nun tercih edilen işletmeleri arasında yer almaktayız.
            </p>
            <p style={{ margin: 0, fontSize: '16px' }}>
              Misafir memnuniyetini ön planda tutan hizmet anlayışımız, güler yüzlü ekibimiz ve Safranbolu'nun eşsiz atmosferiyle Ebrulu Konak, yerli ve yabancı ziyaretçiler için bölgenin seçkin konaklama ve gastronomi merkezlerinden biri olmayı sürdürmektedir.
            </p>
            <p style={{ margin: 0, fontSize: '16px' }}>
              Tarih, kültür, lezzet ve huzurun bir arada yaşandığı Ebrulu Konak'ta, geçmişin zarafetini hissederken unutulmaz anılar biriktirmeye davet ediyoruz.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            marginBottom: '120px',
          }}
        >
          <div
            style={{
              backgroundColor: '#f3efea',
              borderRadius: '24px',
              padding: '48px 40px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#9c714b',
                margin: '0 0 16px 0',
              }}
            >
              Misyon
            </h3>
            <p
              style={{
                color: '#555',
                lineHeight: '1.8',
                fontSize: '15px',
                margin: 0,
              }}
            >
              Safranbolu'yu ziyaret eden konuklarına, tarihi ve kültürel zenginliği yaşatırken, lüks ve konfor içinde unutulmaz anılar oluşturmak.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#f3efea',
              borderRadius: '24px',
              padding: '48px 40px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <h3
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#9c714b',
                margin: '0 0 16px 0',
              }}
            >
              Vizyon
            </h3>
            <p
              style={{
                color: '#555',
                lineHeight: '1.8',
                fontSize: '15px',
                margin: 0,
              }}
            >
              Safranbolu'nun en prestijli ve tercih edilen konaklama yerlerinden biri olmak, sürdürülebilir turizm ilkelerine uyarak bölgeye katkı sağlamak.
            </p>
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: '120px' }}>
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#9c714b',
              margin: '0 0 60px 0',
              textAlign: 'center',
            }}
          >
            Temel Değerlerimiz
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '32px',
            }}
          >
            {values.map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: '#f3efea',
                    borderRadius: '24px',
                    padding: '40px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    textAlign: 'center',
                    transition: 'all 300ms ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <IconComponent style={{ width: '40px', height: '40px', color: '#a67c52', margin: '0 auto' }} />
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#9c714b',
                      margin: 0,
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '14px',
                      color: '#666',
                      lineHeight: '1.6',
                      margin: 0,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Responsive Styles */}
        <style>{`
          @media (max-width: 768px) {
            .corporate-grid {
              grid-template-columns: 1fr !important;
            }
            .corporate-photo {
              height: 400px !important;
            }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default CorporatePage;
