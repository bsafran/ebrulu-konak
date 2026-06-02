# Ebrulu Konak - Otel Websitesi + Admin Panel

Modern ve lüks bir otel websitesi projesi. **İki ayrı sistem:**
- **Frontend (React)** → Müşterilerin gördüğü website (ebrulukonak.com)
- **Backend (Strapi CMS)** → Admin panel + API (ebrulukonak.com/admin)

## Teknoloji Stack'i

### Frontend
- **Framework:** Vite + React 18
- **Styling:** Tailwind CSS (glasmorphism, responsive design)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Form Validation:** React Hook Form + Yup
- **Date Picker:** react-datepicker
- **Icons:** React Icons

### Backend
- **CMS:** Strapi v5 (Self-Hosted, ÜCRETSİZ)
- **Database:** SQLite (development), PostgreSQL (production)
- **Authentication:** Strapi built-in admin panel
- **Media Library:** Strapi Media Library

## Hızlı Başlangıç

### 1. Gerekli Yazılımlar
- Node.js (v16 veya üzeri)
- npm veya yarn

### 2. Backend Kurulumu

```bash
cd backend
npm install
npm run develop
```

Strapi admin panel otomatik olarak açılır: `http://localhost:1337/admin`

**İlk Admin Kullanıcısı Oluşturma:**
1. Tarayıcıda `http://localhost:1337/admin` açılır
2. İlk admin kullanıcısını oluştur (email + şifre)
3. Dashboard'a giriş yap

### 3. Frontend Kurulumu

```bash
cd frontend
npm install
npm run dev
```

Frontend başlayacak: `http://localhost:5173`

## Strapi İçerik Türleri (Content Types) Oluşturma

### 3.1 Room (Oda)

**Admin Panel → Content Manager → Create new collection type**

**Alanlar:**
- `title` (Text) - Oda adı - **Required**
- `description` (Rich Text) - Oda açıklaması
- `price` (Number) - Oda fiyatı
- `maxGuests` (Number) - Maksimum misafir sayısı
- `features` (JSON) - Özellikler listesi
- `images` (Media - Multiple files) - Oda fotoğrafları

**Örnek JSON Features:**
```json
[
  "WiFi Ücretsiz",
  "Klima",
  "Çift kişilik yatak",
  "Özel banyo",
  "Kablo TV",
  "Minibar"
]
```

### 3.2 Restaurant (Restoran)

**Alanlar:**
- `name` (Text) - Restoran adı - **Required**
- `description` (Rich Text) - Restoran açıklaması
- `cuisine` (Text) - Mutfak türü (ör: "Türk", "Uluslararası")
- `openingHours` (Text) - Çalışma saatleri (ör: "10:00 - 23:00")
- `images` (Media - Multiple files) - Restoran fotoğrafları
- `menu` (Media - Single file) - Menü PDF

### 3.3 Reservation (Rezervasyon)

**Alanlar:**
- `fullName` (Text) - Müşteri adı - **Required**
- `email` (Email) - Email adresi - **Required**
- `phone` (Text) - Telefon numarası - **Required**
- `checkIn` (Date) - Giriş tarihi - **Required**
- `checkOut` (Date) - Çıkış tarihi - **Required**
- `guests` (Number) - Misafir sayısı - **Required**
- `room` (Relation - Room) - Seçilen oda
- `specialRequests` (Text Long) - Özel istekler
- `status` (Enumeration) - Enum: `pending`, `confirmed`, `cancelled`

### 3.4 Gallery (Galeri)

**Alanlar:**
- `title` (Text) - Resim başlığı
- `image` (Media - Single file) - Resim - **Required**
- `category` (Enumeration) - `rooms`, `restaurant`, `exterior`, `other`

### 3.5 Site Settings (Singleton)

**Admin Panel → Content Manager → Create new single type**

**Alanlar:**
- `heroTitle` (Text) - Hero başlığı
- `heroSubtitle` (Text) - Hero alt başlığı
- `heroVideo` (Media - Single file) - Ana sayfa videosu
- `welcomeTitle` (Text) - Hoşgeldiniz başlığı
- `welcomeText` (Rich Text) - Hoşgeldiniz metni
- `aboutTitle` (Text) - Hakkımızda başlığı
- `aboutText` (Rich Text) - Hakkımızda metni
- `logo` (Media - Single file) - Logo
- `contactEmail` (Email) - İletişim email
- `contactPhone` (Text) - İletişim telefon
- `address` (Text) - Otel adresi

## API Permissions Ayarları

### Public İzinleri Etkinleştirme

1. **Admin Panel → Settings → Roles → Public**
2. Aşağıdaki content types için **find** ve **findOne** izinlerini aç:
   - `Room`
   - `Restaurant`
   - `Gallery`
   - `Site Settings`

3. **Reservation** için **create** iznini aç (form submission için)

### Örnek Permission Ayarları

```
Room:
  ✓ find
  ✓ findOne

Restaurant:
  ✓ find
  ✓ findOne

Gallery:
  ✓ find
  ✓ findOne

Site Settings:
  ✓ find

Reservation:
  ✓ create
  ✗ find (admin-only)
  ✗ findOne
  ✗ update
  ✗ delete
```

## Site Yapısı

### Sayfalar
- `/` - Ana sayfa (VideoHero, BookingStrip, RoomsPreview, RestaurantsPreview, Gallery)
- `/rooms` - Tüm odalar listesi
- `/rooms/:id` - Oda detay sayfası
- `/restaurants` - Tüm restoranlar listesi
- `/restaurants/:id` - Restoran detay sayfası
- `/gallery` - Tam galeri sayfası
- `/reservation` - Rezervasyon formu

### Renkler (Tailwind Config)
```javascript
primary: {
  dark: '#23180c',    // Koyu kahverengi zemin
  light: '#ece6d8',   // Açık bej
  gold: '#d7c2a0',    // Altın ton
},
wood: {
  light: '#8a7a61',
  dark: '#8b6a42',
}
```

## Çalıştırma

### Development Modunda

**Terminal 1 - Backend:**
```bash
cd backend
npm run develop
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:1337`
- Admin Panel: `http://localhost:1337/admin`
- API: `http://localhost:1337/api`

### Production Build

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

`dist/` klasöründe production build oluşur.

## Deployment Seçenekleri

### Frontend Deployment (Vercel/Netlify)

**Vercel'e Deploy:**
```bash
npm i -g vercel
cd frontend
vercel
```

**Netlify'a Deploy:**
```bash
cd frontend
npm run build
# dist/ klasörünü Netlify'a drag & drop yapın
```

### Backend Deployment

**Seçenek 1: Railway.app**
1. Railway'e giriş yapın
2. Yeni proje oluşturun
3. GitHub repo bağlayın
4. Environment variables ayarlayın
5. Deploy edin

**Seçenek 2: Heroku**
```bash
heroku login
heroku create your-app-name
git push heroku main
```

**Seçenek 3: DigitalOcean Droplet**
1. Ubuntu droplet oluşturun
2. Node.js yükleyin
3. PostgreSQL kurun
4. Strapi deploy edin

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:1337/api
```

### Backend (.env)
```
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-secret-keys
API_TOKEN_SALT=your-salt
ADMIN_JWT_SECRET=your-secret
TRANSFER_TOKEN_SALT=your-salt
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
```

## Demoya İçerik Ekleme

### Örnek Oda

1. Admin Panel → Room → Create New Entry
2. Bilgileri doldurun:
   - Title: "Deluxe Suite"
   - Description: "Lüks süit oda"
   - Price: 5000
   - maxGuests: 2
   - Features: ["WiFi", "Klima", "Jacuzzi"]
   - Images: Unsplash'tan oda fotoğrafları

### Örnek Restoran

1. Admin Panel → Restaurant → Create New Entry
2. Bilgileri doldurun:
   - Name: "Fine Dining"
   - Description: "Uluslararası mutfak"
   - Cuisine: "Uluslararası"
   - openingHours: "18:00 - 23:00"
   - Images: Restoran fotoğrafları

## Sorun Giderme

### Port Zaten Kullanımda
```bash
# Port 1337'yi kullanan processi bul
lsof -i :1337
# Process'i kapat
kill -9 <PID>
```

### API Bağlantı Hatası
- `.env` dosyasında `VITE_API_URL` kontrol edin
- Strapi backend'in çalışıp çalışmadığını kontrol edin
- CORS hataları için Strapi config'ini kontrol edin

### Strapi Admin Paneline Erişemiyor
- `http://localhost:1337/admin` adresine gidin
- Tarayıcı cache'ini temizleyin (Ctrl+Shift+Delete)
- Tarayıcı konsolunda hataları kontrol edin

## Proje Yapısı

```
ebrulu-konak/
├── backend/                # Strapi Backend
│   ├── config/
│   ├── src/
│   │   ├── api/           # Content types (auto-generated)
│   │   └── extensions/
│   ├── public/
│   ├── database/
│   └── package.json
│
└── frontend/              # React Website
    ├── src/
    │   ├── components/
    │   │   ├── common/    # Navbar, Footer, Button, etc
    │   │   ├── home/      # Home page sections
    │   │   ├── rooms/     # Room components
    │   │   └── restaurants/ # Restaurant components
    │   ├── pages/         # Page components
    │   ├── context/       # BookingContext
    │   ├── services/      # API services
    │   ├── hooks/         # Custom hooks
    │   ├── assets/
    │   ├── index.css
    │   ├── App.jsx
    │   └── main.jsx
    ├── public/
    ├── package.json
    └── vite.config.js
```

## Lisans

MIT License

## Destek

Sorularınız veya sorunlarınız için lütfen bir issue açınız.
