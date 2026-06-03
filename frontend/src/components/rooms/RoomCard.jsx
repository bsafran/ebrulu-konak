import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';

const RoomCard = ({ room }) => {
  const firstImage = room.images?.[0];
  const fallbackImage = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop';
  const imageUrl = firstImage?.url || fallbackImage;

  return (
    <Link to={`/rooms/${room.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <style>{`
        .room-card .card-inner {
          position: relative;
          width: 100%;
          height: 300px;
          background: #fff;
          border-radius: 20px;
          border-bottom-right-radius: 0;
          overflow: hidden;
        }
        .room-card .box {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 20px;
          overflow: hidden;
        }
        .room-card .imgBox {
          position: absolute;
          inset: 0;
        }
        .room-card .imgBox img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .room-card:hover .imgBox img {
          transform: scale(1.06);
        }
        .room-card .room-icon {
          position: absolute;
          bottom: -6px;
          right: -6px;
          width: 96px;
          height: 96px;
          background: #fff;
          border-top-left-radius: 50%;
          z-index: 1;
        }
        .room-card .room-icon::before {
          position: absolute;
          content: "";
          bottom: 6px;
          left: -20px;
          background: transparent;
          width: 20px;
          height: 20px;
          border-bottom-right-radius: 20px;
          box-shadow: 5px 5px 0 5px #fff;
        }
        .room-card .room-icon::after {
          position: absolute;
          content: "";
          top: -20px;
          right: 6px;
          background: transparent;
          width: 20px;
          height: 20px;
          border-bottom-right-radius: 20px;
          box-shadow: 5px 5px 0 5px #fff;
        }
        .room-card .iconBox {
          position: absolute;
          inset: 10px;
          background: #9c714b;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.3s ease, background 0.2s ease;
        }
        .room-card:hover .iconBox {
          transform: scale(1.1);
          background: #8a6140;
        }
        .room-card .content {
          padding: 16px 4px 8px;
        }
        .room-card .content h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 8px 0;
        }
        .room-card .content p {
          color: #565656;
          font-size: 14px;
          line-height: 1.5;
          margin: 0 0 14px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .room-card ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .room-card ul li {
          background: #f3efea;
          color: #a67c52;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 5px 10px;
          border-radius: 4px;
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="room-card">
        <div className="card-inner">
          <div className="box">
            <div className="imgBox">
              <img src={imageUrl} alt={room.title} />
            </div>
            <div className="room-icon">
              <span className="iconBox">
                <FiArrowUpRight style={{ color: '#fff', width: '22px', height: '22px' }} />
              </span>
            </div>
          </div>
        </div>

        <div className="content">
          <h3>{room.title}</h3>
          <p>{room.description || 'Konforlu ve modern tasarımlı oda'}</p>
          {room.features && room.features.length > 0 && (
            <ul>
              {room.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
