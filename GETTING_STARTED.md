# Getting Started - Ebrulu Konak Project

Tebrikler! Ebrulu Konak otel websitesi projesi başarıyla kuruldu. Bu dokument, sizi başlangıç adımlarında rehberlik edecek.

## Proje Özeti

**Ebrulu Konak**, modern ve lüks bir otel websitesi projesidir:

- ✅ **Frontend**: React 18 + Vite + Tailwind CSS
- ✅ **Backend**: Strapi v5 CMS
- ✅ **Database**: SQLite (dev), PostgreSQL (prod)
- ✅ **Responsive Design**: Mobil, tablet, desktop optimized
- ✅ **Multiple Pages**: Home, Rooms, Restaurants, Gallery, Reservation

## Proje Dosya Yapısı

```
Ebrulu/
├── backend/              # Strapi Backend
├── frontend/             # React Frontend
├── README.md             # Ana başlangıç rehberi
├── QUICKSTART.md         # 5 dakika hızlı başlangıç
├── STRAPI_SETUP.md       # Strapi content types kurulumu
├── DEPLOYMENT.md         # Production deployment
└── GETTING_STARTED.md    # Bu dosya
```

## Adım 1: Backend Kurulumu (5 dakika)

### 1.1 Strapi Başlatın

```bash
cd backend
npm install
npm run develop
```

**Çıktısı:**
```
[2026-06-03] server has started successfully
Admin: http://localhost:1337/admin
API: http://localhost:1337/api
```

### 1.2 Admin Hesabı Oluşturun

1. Tarayıcıda açın: `http://localhost:1337/admin`
2. Admin hesabı oluşturun:
   - Email: `admin@ebrulu.com` (veya istediğiniz email)
   - Password: `Güvenli bir şifre`
3. Panele giriş yapın

## Adım 2: Frontend Kurulumu (3 dakika)

### 2.1 Yeni Terminal Açın ve Frontend Başlatın

```bash
cd frontend
npm install
npm run dev
```

**Çıktısı:**
```
Local:   http://localhost:5173/
```

### 2.2 Tarayıcıda Açın

http://localhost:5173 adresine gidin ve hoş geldiniz sayfasını göreceksiniz.

## Adım 3: Strapi Content Types Oluşturun (10 dakika)

**ÖNEMLI:** Veritabanında verileri saklamak için content types oluşturmanız gerekir.

### 3.1 Hızlı Setup (Önerilen)

Detaylı talimatlar için: [STRAPI_SETUP.md](./STRAPI_SETUP.md)

**Minimum setup:**
1. Admin paneline gidin: `http://localhost:1337/admin`
2. Sol menüde **Content Manager** → **Create new collection type**
3. Aşağıdaki 5 content type'ı oluşturun:

#### Content Type 1: Room (Oda)
```
Fields:
- title (Text, Required)
- description (Rich Text)
- price (Number)
- maxGuests (Number)
- features (JSON)
- images (Media, Multiple)
```

#### Content Type 2: Restaurant (Restoran)
```
Fields:
- name (Text, Required)
- description (Rich Text)
- cuisine (Text)
- openingHours (Text)
- images (Media, Multiple)
- menu (Media, Single - optional)
```

#### Content Type 3: Gallery
```
Fields:
- title (Text)
- image (Media, Single, Required)
- category (Enumeration)
```

#### Content Type 4: Reservation
```
Fields:
- fullName (Text, Required)
- email (Email, Required)
- phone (Text, Required)
- checkIn (Date, Required)
- checkOut (Date, Required)
- guests (Number, Required)
- room (Relation - Room)
- specialRequests (Text Long)
- status (Enumeration: pending, confirmed, cancelled)
```

#### Content Type 5: Site Setting (Single Type)
```
Fields:
- heroTitle (Text)
- heroSubtitle (Text)
- heroVideo (Media, Single)
- welcomeTitle (Text)
- welcomeText (Rich Text)
- aboutTitle (Text)
- aboutText (Rich Text)
- logo (Media, Single)
- contactEmail (Email)
- contactPhone (Text)
- address (Text)
```

### 3.2 Her Content Type Oluşturduktan Sonra

1. **Save** edildikten sonra
2. Menüde content type'a sağ tıklayın
3. **Publish** seçin

## Adım 4: API İzinlerini Ayarlayın (3 dakika)

1. **Settings** → **Roles** → **Public**
2. Aşağıdakileri yapın:

```
Room:        find ✓, findOne ✓
Restaurant:  find ✓, findOne ✓
Gallery:     find ✓, findOne ✓
Site Setting: find ✓
Reservation: create ✓ (form submission için)
```

3. **Save** tıklayın

## Adım 5: Demo İçerik Ekleyin (5 dakika)

### 5.1 Bir Oda Ekleyin

1. Admin panel → **Room** → **+ Create new entry**
2. Bilgileri doldurun:
   - Title: `Deluxe Suite`
   - Price: `5000`
   - MaxGuests: `2`
   - Description: `Lüks süit oda, jakuzili`
   - Features: `["WiFi", "Klima", "Jakuzi", "Özel Banyo"]`
   - Images: Unsplash'tan otel odası resmi yükleyin

3. **Save** → **Publish**

### 5.2 Bir Restoran Ekleyin

1. Admin panel → **Restaurant** → **+ Create new entry**
2. Bilgileri doldurun:
   - Name: `Fine Dining`
   - Cuisine: `Türk & Uluslararası`
   - OpeningHours: `10:00 - 23:00`
   - Description: `Özel şef hizmetleriyle sunulan lezzetli yemekler`
   - Images: Restoran resmi yükleyin

3. **Save** → **Publish**

### 5.3 Galeri Fotoğrafı Ekleyin

1. Admin panel → **Gallery** → **+ Create new entry**
2. Bilgileri doldurun:
   - Title: `Otel Girişi`
   - Image: Bir fotoğraf upload edin
   - Category: `exterior`

3. **Save** → **Publish**

## Adım 6: Test Edin (2 dakika)

### 6.1 Frontend'de Odaları Görebiliyor mu?

1. http://localhost:5173 adresine gidin
2. Ana sayfa → "Odalarımız" bölümünü scroll edin
3. Eklediğiniz oda görünmeli

### 6.2 API'yi Test Edin

```bash
# Terminal'de çalıştırın
curl http://localhost:1337/api/rooms

# JSON yanıtı almalısınız
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Deluxe Suite",
        "price": 5000,
        ...
      }
    }
  ]
}
```

## Şimdi Ne Yapabilirsiniz?

### 1. İçerik Özelleştirme
- [ ] Daha fazla oda ekleyin
- [ ] Daha fazla restoran ekleyin
- [ ] Galeri fotoğraflarını yükleyin
- [ ] Site Settings'i doldurun (logo, video, etc)

### 2. Tasarım Özelleştirme
- [ ] `frontend/src/tailwind.config.js` içinde renkleri değiştirin
- [ ] Logo'yu değiştirin
- [ ] Yazı fontlarını değiştirin

### 3. Production'a Deploy
- [ ] [DEPLOYMENT.md](./DEPLOYMENT.md) rehberine bakın
- [ ] Frontend'i Vercel/Netlify'a deploy edin
- [ ] Backend'i Railway/Heroku'ya deploy edin

### 4. İleri Geliştirmeler
- [ ] Email notifications ekleyin
- [ ] Payment integration (Stripe, PayPal)
- [ ] Multi-language support
- [ ] Admin analytics
- [ ] Advanced search & filtering

## Dosya Referans

| Dosya | Açıklama |
|-------|----------|
| `README.md` | Detaylı proje bilgileri |
| `QUICKSTART.md` | 5 dakika hızlı başlangıç |
| `STRAPI_SETUP.md` | Strapi setup detaylı talimatlar |
| `DEPLOYMENT.md` | Production deployment rehberi |
| `frontend/FRONTEND_README.md` | Frontend dokümantasyonu |
| `backend/README.md` | Backend dokümantasyonu |

## Sık Sorulan Sorular

### S: Backend çalışmıyor
**C:**
```bash
# Port 1337 zaten kullanımda mı?
lsof -i :1337
kill -9 <PID>

# Tekrar başlatın
npm run develop
```

### S: Frontend API'ye bağlanamıyor
**C:**
- `.env` dosyasında `VITE_API_URL=http://localhost:1337/api` kontrol edin
- Backend'in çalışıp çalışmadığını kontrol edin

### S: Strapi admin paneline giremiyorum
**C:**
- Tarayıcı cache'ini temizleyin: `Ctrl+Shift+Delete`
- Farklı tarayıcıda deneyin
- Backend logs'unda hataları kontrol edin

### S: Eklediğim oda frontend'de görünmüyor
**C:**
- Content'i publish ettiniz mi? (Publish düğmesine tıklayın)
- API izinlerini kontrol edin (Public role: find ✓)
- Browser console'da hataları kontrol edin

## Kontrol Listesi

- [ ] Backend başlatıldı (`npm run develop`)
- [ ] Frontend başlatıldı (`npm run dev`)
- [ ] Admin hesabı oluşturuldu
- [ ] 5 Content Type oluşturuldu
- [ ] API izinleri ayarlandı
- [ ] En az 1 oda eklenildi
- [ ] Frontend'de oda görünüyor
- [ ] Rezervasyon formu test edildi

## Sonraki Adımlar

1. **[STRAPI_SETUP.md](./STRAPI_SETUP.md)** ile tüm content types'ı oluşturun
2. **[README.md](./README.md)** ile teknik detayları öğrenin
3. **[DEPLOYMENT.md](./DEPLOYMENT.md)** ile production'a deploy edin

## İletişim & Destek

- 📧 Sorularınız veya sorunlarınız için issue açınız
- 📚 Dokümantasyonları dikkatlice okuyun
- 🐛 Hataları console'da kontrol edin

## Başarı!

Ebrulu Konak websitesi artık tamamen fonksiyonel ve hazır. Keyifli çalışmalar! 🎉

---

**Başlangıç için:** Yukarıdaki 6 adımı sırasıyla takip edin.
**Daha detaylı bilgi için:** Diğer dokümantasyon dosyalarını okuyun.
**Production hazırlamak için:** DEPLOYMENT.md rehberine bakın.
