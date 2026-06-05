import roomsTr from '../data/rooms.json';
import roomsEn from '../data/rooms.en.json';
import roomsDe from '../data/rooms.de.json';
import roomsAr from '../data/rooms.ar.json';
import restaurantsTr from '../data/restaurants.json';
import restaurantsEn from '../data/restaurants.en.json';
import restaurantsDe from '../data/restaurants.de.json';
import restaurantsAr from '../data/restaurants.ar.json';
import galleriesData from '../data/galleries.json';

// Populate all nested relations and media
const POPULATE = '*';

// Site Settings
export const getSiteSettings = async (locale = 'tr') => {
  return {
    data: {
      id: 1,
      title: 'Ebrulu Konak',
      description: 'Safranbolu\'da Osmanlı mimarisinin eşsiz bir örneği',
      heroTitle: '',
      heroSubtitle: '',
      heroVideo: '/images/HomeVideo/ebrulu.mp4',
      welcomeTitle: '',
      welcomeText: 'Tarih sadece anlatılan bir hikâye değildir; hissedilen, yaşanan ve yeniden keşfedilen bir yolculuktur.\nEbrulu Konak\'ta, Osmanlı\'nın zarif mimarisi ve Safranbolu\'nun eşsiz kültürel mirası arasında geçmiş yeniden hayat buluyor. Her odada bir hatıra, her konakta yüzyılların izleri saklı.\nSafranbolu\'da tarihin içinde yürümeye, geleneksel misafirperverliğin sıcaklığını yaşamaya ve unutulmaz anılar biriktirmeye davetlisiniz.\n\n**Ebrulu Konak**\n**Reviling history in Safranbolu**',
      aboutTitle: '',
      aboutText: '',
    }
  };
};

// Helper - Format room for display
const formatRoomDisplay = (room) => ({
  id: room.id,
  documentId: room.documentId,
  slug: room.slug,
  title: room.title,
  description: room.description,
  price: room.price,
  maxGuests: room.maxGuests,
  features: room.features ? (Array.isArray(room.features) ? room.features : room.features.split(',').map(f => f.trim()).filter(f => f)) : [],
  isStandart: room.isStandart || false,
  isComfort: room.isComfort || false,
  isAile: room.isAile || false,
  images: (room.images || []).map((url, idx) => ({
    id: idx + 1,
    url: url,
    alt: `${room.title} - ${idx + 1}`,
    alternativeText: `${room.title} - ${idx + 1}`
  }))
});

// Helper - Format restaurant for display
const formatRestaurantDisplay = (restaurant) => ({
  id: restaurant.id,
  documentId: restaurant.documentId,
  name: restaurant.name,
  description: restaurant.description,
  cuisine: restaurant.cuisine,
  openingHours: restaurant.openingHours,
  images: (restaurant.images || []).map((url, idx) => ({
    id: idx + 1,
    url: url,
    alt: `${restaurant.name} - ${idx + 1}`,
    alternativeText: `${restaurant.name} - ${idx + 1}`
  }))
});

// Helper - Get language-specific data
const getRoomsDataByLanguage = (locale = 'tr') => {
  const roomsMap = {
    'en': roomsEn,
    'de': roomsDe,
    'ar': roomsAr,
    'tr': roomsTr,
  };
  return roomsMap[locale] || roomsTr;
};

const getRestaurantsDataByLanguage = (locale = 'tr') => {
  const restaurantsMap = {
    'en': restaurantsEn,
    'de': restaurantsDe,
    'ar': restaurantsAr,
    'tr': restaurantsTr,
  };
  return restaurantsMap[locale] || restaurantsTr;
};

// Rooms - Using local data with language support
export const getRooms = async (locale = 'tr') => {
  const roomsData = getRoomsDataByLanguage(locale);
  return { data: roomsData.map(formatRoomDisplay) };
};

export const getRoomById = async (slugOrId, locale = 'tr') => {
  const roomsData = getRoomsDataByLanguage(locale);
  const room = roomsData.find(r => r.slug === slugOrId || r.id.toString() === slugOrId);
  return room ? { data: room } : { data: null };
};

// Restaurants - Using local data with language support
export const getRestaurants = async (locale = 'tr') => {
  const restaurantsData = getRestaurantsDataByLanguage(locale);
  return { data: restaurantsData };
};

// Gallery - Using local data
export const getGallery = async (locale = 'tr') => {
  const photos = galleriesData.map(img => ({
    id: img.id,
    url: img.url,
    alt: img.alt,
    alternativeText: img.alternativeText
  }));
  return { data: { photos } };
};

// Reservations
export const createReservation = async (reservationData) => {
  console.log('Reservation created:', reservationData);
  return { data: reservationData };
};

export const getReservations = async () => {
  return { data: [] };
};

// Helper function to get full media URL
export const getMediaUrl = (mediaData) => {
  if (!mediaData) return null;

  // If it's a simple URL string (from our local data)
  if (typeof mediaData === 'string') {
    return mediaData;
  }

  // Handle direct url property
  if (mediaData.url) {
    return mediaData.url.startsWith('http')
      ? mediaData.url
      : `${mediaData.url}`;
  }

  // Handle Strapi format
  if (mediaData.data?.attributes?.url) {
    const url = mediaData.data.attributes.url;
    return url.startsWith('http') ? url : url;
  }

  return null;
};

// Helper function to format room data
export const formatRoomData = (room) => {
  const data = room.attributes || room;
  let images = [];

  if (data.images) {
    if (Array.isArray(data.images)) {
      images = data.images.map((img, idx) => {
        if (typeof img === 'string') {
          return {
            id: idx + 1,
            url: img,
            alt: `${data.title} - ${idx + 1}`,
          };
        }
        return {
          id: img.id || idx + 1,
          url: getMediaUrl(img),
          alt: img.alternativeText || img.alt || 'Room image',
        };
      });
    } else if (data.images.data) {
      images = (Array.isArray(data.images.data) ? data.images.data : [data.images.data]).map(img => ({
        id: img.id,
        url: getMediaUrl(img.attributes || img),
        alt: img.attributes?.alternativeText || img.alternativeText || 'Room image',
      }));
    }
  }

  return {
    id: room.id,
    documentId: room.documentId,
    slug: data.slug,
    title: data.title,
    description: data.description,
    price: data.price,
    maxGuests: data.maxGuests,
    features: data.features
      ? (typeof data.features === 'string' ? data.features.split(',').map(f => f.trim()).filter(f => f) : data.features)
      : [],
    isStandart: data.isStandart || false,
    isComfort: data.isComfort || false,
    isAile: data.isAile || false,
    images: images,
  };
};

// Helper function to format restaurant data
export const formatRestaurantData = (restaurant) => {
  const data = restaurant.attributes || restaurant;
  let images = [];

  if (data.images) {
    if (Array.isArray(data.images)) {
      images = data.images.map((img, idx) => {
        if (typeof img === 'string') {
          return {
            id: idx + 1,
            url: img,
            alt: `${data.name} - ${idx + 1}`,
          };
        }
        return {
          id: img.id || idx + 1,
          url: getMediaUrl(img),
          alt: img.alternativeText || img.alt || 'Restaurant image',
        };
      });
    } else if (data.images.data) {
      images = (Array.isArray(data.images.data) ? data.images.data : [data.images.data]).map(img => ({
        id: img.id,
        url: getMediaUrl(img.attributes || img),
        alt: img.attributes?.alternativeText || img.alternativeText || 'Restaurant image',
      }));
    }
  }

  return {
    id: restaurant.id,
    documentId: restaurant.documentId,
    name: data.name,
    description: data.description,
    cuisine: data.cuisine,
    openingHours: data.openingHours,
    images: images,
  };
};
