import Layout from '../components/common/Layout';
import RoomList from '../components/rooms/RoomList';

const RoomsPage = () => {
  return (
    <Layout>
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
              Odalarımız
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
              Ebrulu Konak'ın lüks ve konforlu odaları arasından seçim yapın. Her oda, rahatınız ve konforunuz için özenle tasarlanmıştır.
            </p>
            {/* Decorative Divider */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
              <span style={{ color: '#9c714b', fontSize: '20px' }}>✧</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#9c714b' }}></div>
            </div>
          </div>
        </div>

        {/* Room List */}
        <RoomList />
      </div>
    </Layout>
  );
};

export default RoomsPage;
