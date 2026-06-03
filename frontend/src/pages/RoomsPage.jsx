import Layout from '../components/common/Layout';
import PageHeader from '../components/common/PageHeader';
import RoomList from '../components/rooms/RoomList';


const RoomsPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        <PageHeader
          title="Odalar"
          description="Ebrulu Konak'ın lüks ve konforlu odaları arasından seçim yapın. Her oda, rahatınız ve konforunuz için özenle tasarlanmıştır."
          marginBottom="120px"
        />

        {/* Room List */}
        <RoomList />
      </div>
    </Layout>
  );
};

export default RoomsPage;
