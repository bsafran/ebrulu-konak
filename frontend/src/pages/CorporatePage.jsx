import Layout from '../components/common/Layout';
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
        {/* Page Header */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h1
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#9c714b',
                margin: '0 0 16px 0',
              }}
            >
              Kurumsal
            </h1>
            <p
              style={{
                fontSize: '18px',
                color: '#666',
                lineHeight: '1.6',
                margin: '0 0 24px 0',
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Ebrulu Konak hakkında bilgi edinin ve misyon, vizyon ve değerlerimizi keşfedin.
            </p>
            {/* Decorative Divider */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
              <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
            marginBottom: '120px',
          }}
        >
          {/* Left - Photo */}
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              height: '500px',
              backgroundColor: '#f3efea',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src={hotelImage}
              alt="Ebrulu Konak"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Right - Text */}
          <div>
            <h2
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#9c714b',
                margin: '0 0 24px 0',
              }}
            >
              Hakkımızda
            </h2>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                color: '#555',
                lineHeight: '1.8',
              }}
            >
              <p style={{ margin: 0, fontSize: '16px' }}>
                Ebrulu Konak, Safranbolu'nun tarihi dokusunu modern konfor ile birleştiren, özgün bir otel işletmesidir. 1980'lerde yapılan binada, geleneksel mimarinin zarif tasarımı ve günümüz lüks hizmetleri bir araya gelir.
              </p>
              <p style={{ margin: 0, fontSize: '16px' }}>
                Misafirlerimize sadece bir otel değil, Safranbolu'nun ve Karabük bölgesinin engin tarihine bir köprü olmayı amaçlıyoruz. Her oda, her restoran, her hizmet ayrıntısı, unutulmaz bir deneyim yaratmak üzere tasarlanmıştır.
              </p>
              <p style={{ margin: 0, fontSize: '16px' }}>
                Deneyimli ekibimiz, siz misafirlerimizin her ihtiyacını önceden tahmin etmek ve karşılamak için tutkuyla çalışmaktadır. Ebrulu Konak'ı seçtiğiniz için teşekkür ederiz.
              </p>
            </div>
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
