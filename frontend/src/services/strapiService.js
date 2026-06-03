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

export const getRoomById = async (slugOrId) => {
  try {
    // Support both slug and documentId/id for backwards compatibility
    const response = await api.get(`/rooms?filters[slug][$eq]=${slugOrId}&populate=${POPULATE}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching room ${slugOrId}:`, error);
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

// Gallery (single type)
export const getGallery = async () => {
  try {
    const response = await api.get(`/gallery?populate=${POPULATE}`);
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
    features: data.features,
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
