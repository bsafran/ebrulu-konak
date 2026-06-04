import React from 'react';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

const ReservationPage = () => {
  useScrollRestoration();
  return (
    <Layout>
      <div className="container-custom py-16">
        <PageHeader
          title="Otel Rezervasyonu"
          description="Tarihlerinizi ve misafir sayısını seçerek rezervasyonunuzu tamamlayın."
          marginBottom="48px"
        />
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <iframe
            src="http://ebrulu-konak.hmshotel.net/"
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
