# Quick Start Guide - Ebrulu Konak

5 dakika içinde projeyi ayağa kaldırın!

## Gereklilikler
- Node.js v16+
- npm veya yarn

## 1. Başlat (2 dakika)

### Backend
```bash
cd backend
npm install
npm run develop
```

Açılacak URL'ler:
- Admin Panel: `http://localhost:1337/admin`
- API: `http://localhost:1337/api`

### Frontend (Yeni terminal açın)
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## 2. Strapi Admin Panelini Ayarla (2 dakika)

1. Admin paneline gidin: `http://localhost:1337/admin`
2. Admin hesabı oluşturun (email + şifre)
3. Dashboard'a giriş yapın

## 3. Content Types Oluştur (1 dakika)

Detaylı talimatlar için: [STRAPI_SETUP.md](./STRAPI_SETUP.md)

**Minimum Setup (Quick Create):**

### Oda Eklemek
1. **Content Manager** → **+ Create new collection type**
2. Name: `Room`
3. Add fields:
   - `title` (Text, Required)
   - `price` (Number)
   - `maxGuests` (Number)
   - `images` (Media, Multiple)
4. **Publish**

### Restoran Eklemek
1. **Content Manager** → **+ Create new collection type**
2. Name: `Restaurant`
3. Add fields:
   - `name` (Text, Required)
   - `cuisine` (Text)
   - `images` (Media, Multiple)
4. **Publish**

### Galeri Eklemek
1. **Content Manager** → **+ Create new collection type**
2. Name: `Gallery`
3. Add fields:
   - `image` (Media, Single, Required)
   - `title` (Text)
4. **Publish**

## 4. API İzinlerini Ayarla (1 dakika)

1. **Settings** → **Roles** → **Public**
2. Aşağıdakiler için izinleri aç:
   - `room`: find ✓, findOne ✓
   - `restaurant`: find ✓, findOne ✓
   - `gallery`: find ✓, findOne ✓
3. Reservation için `create` ✓ iznini aç
4. **Save**

## 5. Demo İçerik Ekle (1 dakika)

### Oda Eklemek
1. **Content Manager** → **Room** → **+ Create new entry**
2. Alanları doldurun:
   - Title: "Deluxe Suite"
   - Price: 5000
   - MaxGuests: 2
   - Upload images
3. **Publish**

### Test Et
- Frontend'e gidin: `http://localhost:5173`
- Odaları görebilmeniz gerekir!

## Komut Özeti

```bash
# Backend başlat
cd backend && npm run develop

# Frontend başlat (yeni terminal)
cd frontend && npm run dev

# Backend production build
cd backend && npm run build && npm start

# Frontend production build
cd frontend && npm run build
```

## API Test Et

```bash
# Oda listesini al
curl http://localhost:1337/api/rooms

# Restoran listesini al
curl http://localhost:1337/api/restaurants

# Galeriyi al
curl http://localhost:1337/api/galleries

# Rezervasyon oluştur
curl -X POST http://localhost:1337/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "fullName": "John Doe",
      "email": "john@example.com",
      "phone": "+905551234567",
      "checkIn": "2024-06-15",
      "checkOut": "2024-06-17",
      "guests": 2,
      "status": "pending"
    }
  }'
```

## Yan Kontroller

### Port Hatası?
```bash
# Port 1337'yi kullanan işlemi bul
lsof -i :1337
kill -9 <PID>
```

### Strapi Admin'e Giremiyor?
- Cache'i temizleyin: Ctrl+Shift+Delete
- Farklı tarayıcı deneyin
- Backend'in çalışıp çalışmadığını kontrol edin

### Frontend API'ye Bağlanamıyor?
- `.env` kontrol edin: `VITE_API_URL=http://localhost:1337/api`
- CORS hatası varsa, Strapi config'i kontrol edin

## Sonraki Adımlar

1. ✓ Tüm content types'ı oluşturun [STRAPI_SETUP.md](./STRAPI_SETUP.md)
2. ✓ Daha fazla oda, restoran, galeri ekleyin
3. ✓ Site Settings'i doldurun (logo, video, etc)
4. ✓ İçeriği özelleştirin ve tasarımı uyarlayın
5. ✓ Production'a deploy edin

## Deployment

**Frontend:**
```bash
cd frontend
npm run build
# dist/ klasörü Vercel, Netlify, etc'e deploy edin
```

**Backend:**
- Railway: https://railway.app
- Heroku: https://heroku.com
- DigitalOcean: https://digitalocean.com

---

**İhtiyacınız olan şey STRAPI_SETUP.md dosyasında açıklanmıştır!**
