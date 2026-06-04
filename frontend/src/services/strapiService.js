import api from './api';
import roomsData from '../data/rooms.json';
import restaurantsData from '../data/restaurants.json';

// Populate all nested relations and media
const POPULATE = '*';

// Site Settings
export const getSiteSettings = async (locale = 'tr') => {
  try {
    const response = await api.get(`/site-setting?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    throw new Error('Site ayarları yüklenemedi. Lütfen daha sonra tekrar deneyin.');
  }
};

// Rooms - Using local data
export const getRooms = async (locale = 'tr') => {
  return roomsData;
};

export const getRoomById = async (slugOrId, locale = 'tr') => {
  try {
    // Search by slug or id in local data
    const room = roomsData.find(r => r.slug === slugOrId || r.id.toString() === slugOrId);
    return room ? { data: room } : { data: null };
  } catch (error) {
    console.error(`Error fetching room ${slugOrId}:`, error);
    throw new Error('Oda bilgileri yüklenemedi. Lütfen daha sonra tekrar deneyin.');
  }
};

// Restaurants - Using local data
export const getRestaurants = async (locale = 'tr') => {
  return restaurantsData;
};

export const getRestaurantById = async (id, locale = 'tr') => {
  const restaurant = restaurantsData.find(r => r.id.toString() === id.toString());
  return restaurant ? { data: restaurant } : { data: null };
};

// Gallery - Using local data (fallback to empty array)
export const getGallery = async (locale = 'tr') => {
  return { images: [] };
};

// Reservations
export const createReservation = async (reservationData) => {
  try {
    const response = await api.post('/reservations', {
      data: reservationData,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating reservation:', error);
    throw new Error('Rezervasyon oluşturulamadı. Lütfen daha sonra tekrar deneyin.');
  }
};

export const getReservations = async () => {
  try {
    const response = await api.get(`/reservations?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw new Error('Rezervasyonlar yüklenemedi. Lütfen daha sonra tekrar deneyin.');
  }
};

// Helper function to get full media URL
export const getMediaUrl = (mediaData) => {
  if (!mediaData) return null;

  // Handle different Strapi response formats
  if (mediaData.url) {
    return mediaData.url.startsWith('http')
      ? mediaData.url
      : `http://localhost:1337${mediaData.url}`;
  }

  if (mediaData.data?.attributes?.url) {
    const url = mediaData.data.attributes.url;
    return url.startsWith('http') ? url : `http://localhost:1337${url}`;
  }

  return null;
};

// Helper function to format room data
export const formatRoomData = (room) => {
  // Handle both old format (with attributes) and new Strapi v5 format (direct properties)
  const data = room.attributes || room;

  // Handle images array - support both v4 and v5 Strapi formats
  let images = [];
  if (data.images) {
    // Strapi v4 format: images.data[].attributes
    if (Array.isArray(data.images.data)) {
      images = data.images.data.map(img => ({
        id: img.id,
        url: getMediaUrl(img.attributes || img),
        alt: img.attributes?.alternativeText || img.alternativeText || 'Room image',
      }));
    }
    // Strapi v5 format: images[] direct
    else if (Array.isArray(data.images)) {
      images = data.images.map(img => ({
        id: img.id,
        url: getMediaUrl(img),
        alt: img.alternativeText || 'Room image',
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
      ? data.features.split(',').map(f => f.trim()).filter(f => f)
      : [],
    isStandart: data.isStandart || false,
    isComfort: data.isComfort || false,
    isAile: data.isAile || false,
    images: images,
  };
};

// Helper function to format restaurant data
export const formatRestaurantData = (restaurant) => {
  // Handle both old format (with attributes) and new Strapi v5 format (direct properties)
  const data = restaurant.attributes || restaurant;

  // Handle images array - support both v4 and v5 Strapi formats
  let images = [];
  if (data.images) {
    // Strapi v4 format: images.data[].attributes
    if (Array.isArray(data.images.data)) {
      images = data.images.data.map(img => ({
        id: img.id,
        url: getMediaUrl(img.attributes || img),
        alt: img.attributes?.alternativeText || img.alternativeText || 'Restaurant image',
      }));
    }
    // Strapi v5 format: images[] direct
    else if (Array.isArray(data.images)) {
      images = data.images.map(img => ({
        id: img.id,
        url: getMediaUrl(img),
        alt: img.alternativeText || 'Restaurant image',
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
    menu: data.menu?.data
      ? getMediaUrl(data.menu.data)
      : null,
  };
};
