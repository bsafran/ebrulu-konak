import { useTranslation } from 'react-i18next';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import { FiAward, FiUsers, FiTrendingUp, FiHeart } from 'react-icons/fi';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

const CorporatePage = () => {
  const { t } = useTranslation();
  useScrollRestoration();
  const hotelImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';

  const values = [
    {
      icon: FiAward,
      title: t('corporate.value1'),
      description: t('corporate.value1Desc'),
    },
    {
      icon: FiHeart,
      title: t('corporate.value2'),
      description: t('corporate.value2Desc'),
    },
    {
      icon: FiUsers,
      title: t('corporate.value3'),
      description: t('corporate.value3Desc'),
    },
    {
      icon: FiTrendingUp,
      title: t('corporate.value4'),
      description: t('corporate.value4Desc'),
    },
  ];

  return (
    <Layout showFooter={false}>
      <div className="container-custom py-16">
        <PageHeader
          title={t('corporate.pageTitle')}
          description={t('corporate.pageDesc')}
          marginBottom="120px"
        />

        {/* About Section - Centered Text */}
        <div className="max-w-4xl mx-auto mb-section text-center">
          <div className="space-y-5 text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t('corporate.about').replace(/\n/g, '</p><p>').split('</p>').map((p, i) => i % 2 === 0 ? `<p>${p}</p>` : p).join('') }} />
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-section">
          <div className="bg-primary-light rounded-card p-10 shadow-card">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              {t('corporate.mission')}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t('corporate.missionText')}
            </p>
          </div>

          <div className="bg-primary-light rounded-card p-10 shadow-card">
            <h3 className="text-2xl font-bold text-primary-dark mb-4">
              {t('corporate.vision')}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {t('corporate.visionText')}
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-section">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-16 text-center">
            {t('corporate.valuesTitle')}
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
