import Layout from '../components/common/Layout';
import RoomList from '../components/rooms/RoomList';

const RoomsPage = () => {
  return (
    <Layout>
      <div className="container-custom py-16">
        {/* Page Header */}
        <div
          style={{
            marginBottom: '48px',
            paddingBottom: '32px',
            borderBottom: '2px solid #a67c52',
            position: 'relative',
          }}
        >
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#9c714b',
              marginBottom: '16px',
              margin: '0 0 16px 0',
              wordSpacing: '100vw',
            }}
          >
            Odalarımız
          </h1>
          <p
            style={{
              color: '#666',
              fontSize: '18px',
              lineHeight: '1.6',
              margin: 0,
              maxWidth: '600px',
            }}
          >
            Ebrulu Konak'ın lüks ve konforlu odaları arasından seçim yapın. Her oda, rahatınız ve konforunuz için özenle tasarlanmıştır.
          </p>
        </div>

        {/* Room List */}
        <RoomList />
      </div>
    </Layout>
  );
};

export default RoomsPage;
