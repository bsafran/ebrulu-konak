import api from './api';

// Populate all nested relations and media
const POPULATE = '*';

// Site Settings
export const getSiteSettings = async () => {
  try {
    const response = await api.get(`/site-setting?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    throw error;
  }
};

// Rooms
export const getRooms = async () => {
  try {
    const response = await api.get(`/rooms?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

export const getRoomById = async (id) => {
  try {
    const response = await api.get(`/rooms/${id}?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching room ${id}:`, error);
    throw error;
  }
};

// Restaurants
export const getRestaurants = async () => {
  try {
    const response = await api.get(`/restaurants?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const getRestaurantById = async (id) => {
  try {
    const response = await api.get(`/restaurants/${id}?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching restaurant ${id}:`, error);
    throw error;
  }
};

// Gallery
export const getGallery = async () => {
  try {
    const response = await api.get(`/galleries?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    throw error;
  }
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
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const response = await api.get(`/reservations?populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
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
  return {
    id: room.id,
    ...room.attributes,
    images: room.attributes?.images?.data?.map(img => ({
      id: img.id,
      url: getMediaUrl(img.attributes),
      alt: img.attributes?.alternativeText || 'Room image',
    })) || [],
  };
};

// Helper function to format restaurant data
export const formatRestaurantData = (restaurant) => {
  return {
    id: restaurant.id,
    ...restaurant.attributes,
    images: restaurant.attributes?.images?.data?.map(img => ({
      id: img.id,
      url: getMediaUrl(img.attributes),
      alt: img.attributes?.alternativeText || 'Restaurant image',
    })) || [],
    menu: restaurant.attributes?.menu?.data
      ? getMediaUrl(restaurant.attributes.menu.data)
      : null,
  };
};
