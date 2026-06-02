# Ebrulu Konak - Frontend

Modern React + Vite tabanlı otel websitesi frontend'i.

## Teknoloji Stack

- **Vite** - Lightning fast build tool
- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **React Hook Form** - Form state management
- **Framer Motion** - Animations
- **React DatePicker** - Date selection

## Kurulum

```bash
npm install
npm run dev    # Development mode
npm run build  # Production build
npm run preview # Preview production build
```

### Environment Variables

`.env` dosyası oluşturun:

```
VITE_API_URL=http://localhost:1337/api
```

Production için:

```
VITE_API_URL=https://your-strapi-backend.com/api
```

## Klasör Yapısı

```
src/
├── components/
│   ├── common/              # Navbar, Footer, Button, Card, Loading, Layout
│   ├── home/               # HomePage bölümleri
│   ├── rooms/              # Room listing ve detail components
│   └── restaurants/        # Restaurant components
├── pages/                   # Page components
├── context/                # BookingContext global state
├── services/               # API integration
│   ├── api.js             # Axios configuration
│   └── strapiService.js   # Strapi API calls
├── hooks/                  # Custom hooks
│   ├── useApi.js          # Data fetching hook
│   └── useScrollAnimation.js
├── utils/                  # Utility functions
├── assets/                 # Static files
├── App.jsx                # Main app component
└── index.css              # Tailwind styles
```

## Sayfalar

- `/` - Ana sayfa
- `/rooms` - Odalar listesi
- `/rooms/:id` - Oda detayı
- `/restaurants` - Restoranlar listesi
- `/restaurants/:id` - Restoran detayı
- `/gallery` - Galeri
- `/reservation` - Rezervasyon formu

## Components

### Common Components
- **Button** - Variants: primary, secondary, ghost, danger
- **Card** - Glassmorphism effect
- **Navbar** - Sticky navigation with mobile menu
- **Footer** - Contact info & social links
- **Loading** - Spinner with optional fullscreen mode
- **Layout** - Navbar + children + Footer wrapper

### Home Components
- **VideoHero** - Full-screen video background
- **BookingStrip** - Reservation date & guest picker
- **IntroSection** - Welcome text
- **AboutSection** - About us section
- **RoomsPreview** - Featured rooms grid
- **RestaurantsPreview** - Featured restaurants
- **Gallery** - Image grid

### Room Components
- **RoomCard** - Room preview card
- **RoomList** - Rooms grid with filtering
- **RoomDetail** - Full room details with carousel

### Restaurant Components
- **RestaurantCard** - Restaurant preview
- **RestaurantList** - Restaurants grid
- **RestaurantDetail** - Restaurant details

## Hooks

### useApi
Data fetching hook with loading/error states.

```javascript
const { data, loading, error } = useApi(() => getRooms());
```

### useScrollAnimation
Trigger animations on scroll.

```javascript
const ref = useScrollAnimation({ threshold: 0.1 });
```

## Services

### strapiService.js
- `getSiteSettings()` - Get site configuration
- `getRooms()` - Get all rooms
- `getRoomById(id)` - Get specific room
- `getRestaurants()` - Get all restaurants
- `getRestaurantById(id)` - Get specific restaurant
- `getGallery()` - Get gallery images
- `createReservation(data)` - Create reservation
- `getMediaUrl(mediaData)` - Get full media URL
- `formatRoomData(room)` - Format room response
- `formatRestaurantData(restaurant)` - Format restaurant response

## Styling

### Tailwind Configuration

Custom colors defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    dark: '#23180c',    // Main dark color
    light: '#ece6d8',   // Light accent
    gold: '#d7c2a0',    // Gold accent
  },
  wood: {
    light: '#8a7a61',
    dark: '#8b6a42',
  }
}
```

### CSS Classes

- `.glass-effect` - Glassmorphism background
- `.container-custom` - Max width container
- `.gold-gradient` - Gold gradient background

## Forms & Validation

Using React Hook Form + Yup for validation.

Example in ReservationPage:

```javascript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(ReservationSchema),
});
```

## API Integration

### Axios Instance

```javascript
import api from './services/api';

// GET request
const response = await api.get('/rooms');

// POST request
const response = await api.post('/reservations', { data: {...} });
```

## State Management

### BookingContext

Global state for reservation details:

```javascript
const { booking, updateBooking } = useBooking();

// booking = {
//   checkIn: Date,
//   checkOut: Date,
//   guests: number,
//   selectedRoomId: string,
//   selectedRoom: object
// }
```

## Production Build

```bash
npm run build
```

Output: `dist/` directory

Deploy to:
- **Vercel**: `vercel`
- **Netlify**: Drag & drop `dist/` folder
- **Static Hosting**: Copy `dist/` contents to server

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimization

- Code splitting with React Router
- Lazy loading images
- Tailwind CSS purging
- Minified production build

## Troubleshooting

### API Connection Error
1. Check `.env` VITE_API_URL
2. Ensure Strapi backend is running
3. Check browser console for CORS errors

### Tailwind Styles Not Applied
1. Ensure `index.css` is imported in `main.jsx`
2. Rebuild with `npm run build`
3. Check `tailwind.config.js` content paths

### Images Not Loading
1. Check Strapi media library
2. Verify image URLs in API responses
3. Check browser console for 404 errors

## License

MIT License
