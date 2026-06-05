import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

const ReservationPage = () => {
  const { t } = useTranslation();
  useScrollRestoration();

  return (
    <Layout>
      <div className="container-custom py-16">
        <PageHeader
          title={t('reservation.pageTitle')}
          description={t('reservation.pageDesc')}
          marginBottom="48px"
        />
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src="https://ebrulu-konak.hmshotel.net/"
            width="100%"
            height="800px"
            frameBorder="0"
            title="HMS Rezervasyon Sistemi"
            style={{ display: 'block' }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default ReservationPage;
