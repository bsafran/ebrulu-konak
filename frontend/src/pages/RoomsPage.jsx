import { useTranslation } from 'react-i18next';
import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import RoomList from '../components/rooms/RoomList';
import { useScrollRestoration } from '../hooks/useScrollRestoration';

const RoomsPage = () => {
  const { t } = useTranslation();
  useScrollRestoration();
  return (
    <Layout>
      <div className="container-custom py-16">
        <PageHeader
          title={t('rooms.pageTitle')}
          description={t('rooms.pageDesc')}
          marginBottom="120px"
        />

        {/* Room List */}
        <RoomList />
      </div>
    </Layout>
  );
};

export default RoomsPage;
