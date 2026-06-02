# Strapi Content Types Setup Guide

Bu dokument, Ebrulu Konak projektesi için gerekli olan Strapi content types'ı adım adım oluşturmayı anlatır.

## Başlangıç

1. Strapi admin paneline gidin: `http://localhost:1337/admin`
2. Eğer ilk kez açıyorsanız, bir admin hesabı oluşturun
3. Sol menu'den **Content Manager** sekmesine gidin

## 1. Room (Oda) Content Type'ı Oluşturma

### Adım 1: Yeni Collection Type Oluştur
1. **Content Manager** → **Create new collection type**
2. Display name: `Room`
3. API ID: `room` (auto-fill olacak)
4. **Continue**

### Adım 2: Alanları Ekle

#### 1.1 Title Alanı
- **+ Add another field**
- **Text** seçin
- Name: `title`
- **Advanced settings:**
  - Required field ✓
  - This field can have a default value ve placeholder
  - Description: "Oda adı veya süit türü"
- **Finish**

#### 1.2 Description Alanı
- **+ Add another field**
- **Rich Text** seçin
- Name: `description`
- **Finish**

#### 1.3 Price Alanı
- **+ Add another field**
- **Number** seçin
- Name: `price`
- **Advanced settings:**
  - Type: Integer
  - Description: "Gece başına fiyat (₺)"
- **Finish**

#### 1.4 MaxGuests Alanı
- **+ Add another field**
- **Number** seçin
- Name: `maxGuests`
- **Advanced settings:**
  - Type: Integer
  - Description: "Maksimum misafir sayısı"
- **Finish**

#### 1.5 Features Alanı
- **+ Add another field**
- **JSON** seçin
- Name: `features`
- **Advanced settings:**
  - Description: "Özellikler listesi (JSON array)"
  - Example: `["WiFi", "Klima", "Çift kişilik yatak"]`
- **Finish**

#### 1.6 Images Alanı
- **+ Add another field**
- **Media** seçin
- Name: `images`
- **Advanced settings:**
  - Multiple files ✓
  - Description: "Oda fotoğrafları"
- **Finish**

### Adım 3: Kaydet ve Yayınla
- **Save**
- Sol menu'nde **Room**'a sağ tıklayın
- **Publish** seçin

---

## 2. Restaurant (Restoran) Content Type'ı Oluşturma

### Adım 1: Yeni Collection Type Oluştur
1. **Content Manager** → **Create new collection type**
2. Display name: `Restaurant`
3. API ID: `restaurant`
4. **Continue**

### Adım 2: Alanları Ekle

#### 2.1 Name Alanı
- **Text**
- Name: `name`
- Required: ✓
- Description: "Restoran adı"

#### 2.2 Description Alanı
- **Rich Text**
- Name: `description`

#### 2.3 Cuisine Alanı
- **Text**
- Name: `cuisine`
- Description: "Mutfak türü (Türk, Uluslararası, etc)"

#### 2.4 OpeningHours Alanı
- **Text**
- Name: `openingHours`
- Description: "Çalışma saatleri (ör: 10:00 - 23:00)"

#### 2.5 Images Alanı
- **Media**
- Name: `images`
- Multiple files: ✓

#### 2.6 Menu Alanı (Opsiyonel)
- **Media**
- Name: `menu`
- Multiple files: ✗ (single file)

### Adım 3: Kaydet ve Yayınla
- **Save**
- **Publish**

---

## 3. Reservation (Rezervasyon) Content Type'ı Oluşturma

### Adım 1: Yeni Collection Type Oluştur
1. **Content Manager** → **Create new collection type**
2. Display name: `Reservation`
3. API ID: `reservation`
4. **Continue**

### Adım 2: Alanları Ekle

#### 3.1 FullName Alanı
- **Text**
- Name: `fullName`
- Required: ✓

#### 3.2 Email Alanı
- **Email**
- Name: `email`
- Required: ✓

#### 3.3 Phone Alanı
- **Text**
- Name: `phone`
- Required: ✓

#### 3.4 CheckIn Alanı
- **Date**
- Name: `checkIn`
- Required: ✓

#### 3.5 CheckOut Alanı
- **Date**
- Name: `checkOut`
- Required: ✓

#### 3.6 Guests Alanı
- **Number**
- Name: `guests`
- Type: Integer
- Required: ✓

#### 3.7 Room Alanı (Relation)
- **Relation**
- Name: `room`
- Select collection: **Room**
- Relation type: **One to Many** (her oda birçok rezervasyon olabilir)
- Display name for Room side: `reservations`

#### 3.8 SpecialRequests Alanı
- **Text (Long)**
- Name: `specialRequests`

#### 3.9 Status Alanı
- **Enumeration**
- Name: `status`
- Enum values:
  - `pending` (Bekleme)
  - `confirmed` (Onaylandı)
  - `cancelled` (İptal edildi)
- Default value: `pending`

### Adım 3: Kaydet ve Yayınla
- **Save**
- **Publish**

---

## 4. Gallery (Galeri) Content Type'ı Oluşturma

### Adım 1: Yeni Collection Type Oluştur
1. **Content Manager** → **Create new collection type**
2. Display name: `Gallery`
3. API ID: `gallery`
4. **Continue**

### Adım 2: Alanları Ekle

#### 4.1 Title Alanı (Opsiyonel)
- **Text**
- Name: `title`

#### 4.2 Image Alanı
- **Media**
- Name: `image`
- Multiple files: ✗ (single file)
- Required: ✓

#### 4.3 Category Alanı
- **Enumeration**
- Name: `category`
- Enum values:
  - `rooms` (Odalar)
  - `restaurant` (Restoranlar)
  - `exterior` (Dış cephe)
  - `other` (Diğer)

### Adım 3: Kaydet ve Yayınla
- **Save**
- **Publish**

---

## 5. Site Settings (Tek Sayfa) Content Type'ı Oluşturma

### Adım 1: Yeni Single Type Oluştur
1. **Content Manager** → **Create new single type**
2. Display name: `Site Setting`
3. API ID: `site-setting`
4. **Continue**

### Adım 2: Alanları Ekle

#### 5.1 HeroTitle
- **Text**
- Name: `heroTitle`
- Description: "Ana sayfa başlığı"

#### 5.2 HeroSubtitle
- **Text**
- Name: `heroSubtitle`
- Description: "Ana sayfa alt başlığı"

#### 5.3 HeroVideo
- **Media**
- Name: `heroVideo`
- Multiple files: ✗
- Description: "Ana sayfa video dosyası (MP4)"

#### 5.4 WelcomeTitle
- **Text**
- Name: `welcomeTitle`

#### 5.5 WelcomeText
- **Rich Text**
- Name: `welcomeText`

#### 5.6 AboutTitle
- **Text**
- Name: `aboutTitle`

#### 5.7 AboutText
- **Rich Text**
- Name: `aboutText`

#### 5.8 Logo
- **Media**
- Name: `logo`
- Multiple files: ✗
- Description: "Otel logosu"

#### 5.9 ContactEmail
- **Email**
- Name: `contactEmail`

#### 5.10 ContactPhone
- **Text**
- Name: `contactPhone`

#### 5.11 Address
- **Text (Long)**
- Name: `address`

### Adım 3: Kaydet ve Yayınla
- **Save**
- **Publish**

---

## API Permissions Ayarı

### Adım 1: Roles'a Gir
1. **Settings** → **Roles**
2. **Public** rolünü seçin

### Adım 2: İzinleri Konfigüre Et

#### Room İzinleri
- [ ] create
- [x] find
- [x] findOne
- [ ] update
- [ ] delete
- [ ] count

#### Restaurant İzinleri
- [ ] create
- [x] find
- [x] findOne
- [ ] update
- [ ] delete
- [ ] count

#### Gallery İzinleri
- [ ] create
- [x] find
- [x] findOne
- [ ] update
- [ ] delete
- [ ] count

#### Site Setting İzinleri
- [ ] create
- [x] find
- [ ] update
- [ ] delete

#### Reservation İzinleri
- [x] create (müşteriler form gönderebilsin)
- [ ] find (müşteriler listeyi göremesin)
- [ ] findOne
- [ ] update
- [ ] delete
- [ ] count

### Adım 3: Kaydet
- **Save** düğmesine tıklayın

---

## Demo İçerik Ekleme

### 1. Örnek Oda Eklemek

1. **Content Manager** → **Room**
2. **+ Create new entry**
3. Aşağıdaki bilgileri doldurun:

```
Title: Deluxe Suite
Description: Lüks süit odamız, dikkatli tasarımı ve zarif dekorasyonuyla misafirlerimize unutulmaz bir deneyim sunmaktadır.
Price: 5000
MaxGuests: 2
Features: ["WiFi Ücretsiz", "Klima", "Çift Kişilik Yatak", "Özel Banyo", "Kablo TV", "Minibar"]
Images: Unsplash'tan oda fotoğrafları indirin ve upload edin
```

4. **Save**
5. **Publish**

### 2. Örnek Restoran Eklemek

1. **Content Manager** → **Restaurant**
2. **+ Create new entry**
3. Bilgileri doldurun:

```
Name: Bahar Restaurant
Description: Saraç özel şef tarafından hazırlanan Türk ve uluslararası mutfaktan lezzetli yemekler sunmaktadır.
Cuisine: Türk & Uluslararası
OpeningHours: 10:00 - 23:00
Images: Restoran fotoğrafları
```

4. **Save**
5. **Publish**

### 3. Galeri Resmi Eklemek

1. **Content Manager** → **Gallery**
2. **+ Create new entry**
3. Bilgileri doldurun:

```
Title: Otel Girişi
Image: Unsplash'tan bir fotoğraf
Category: exterior
```

4. **Save**
5. **Publish**

### 4. Site Ayarlarını Doldurmak

1. **Content Manager** → **Site Setting**
2. Eğer entry yoksa **+ Create new entry** tıklayın
3. Tüm alanları doldurun
4. **Save**
5. **Publish**

---

## Strapi API Endpoint'leri

Frontend'in kullanacağı API endpoint'leri:

```
GET  /api/site-setting
GET  /api/rooms
GET  /api/rooms/:id
GET  /api/restaurants
GET  /api/restaurants/:id
GET  /api/galleries
POST /api/reservations
GET  /api/reservations (admin only)
```

**Media URL'leri:** Tüm media dosyaları `/uploads/` klasöründe saklanır ve URL'leri otomatik olarak döndürülür.

---

## İpuçları

### 1. Media Upload Hızı
- Büyük dosya yükleniyorsa, şu dosyaları sıkıştırın:
  - Video: Handbrake ile 720p'ye dönüştürün
  - Resim: TinyPNG ile sıkıştırın

### 2. JSON Formatı
- Features alanında JSON kullanırken, geçerli JSON syntax'ı kontrol edin
- Örnek:
```json
["WiFi", "Klima", "Minibar"]
```

### 3. Rich Text Editor
- **Description** ve **Text** alanlarında formatting yapabilirsiniz
- Bold, Italic, Lists, Links vs. desteklenmiştir

### 4. Relationları Anlamak
- **Room** ← Reservation → Bu, bir odanın birçok rezervasyonu olabileceğini anlam
- Frontend'de bu ilişkiler populate edilerek getirilir (`populate=*`)

---

## Sorun Giderme

### Problem: Content Type'ı yayınlayamıyorum
- **Solution:** Tüm required alanları doldurduğunuzdan emin olun

### Problem: API'de veri görünmüyor
- **Solution:** Content'i yayınladığınızdan emin olun (Publish düğmesine tıklayın)

### Problem: Medya yükleme yavaş
- **Solution:** Dosya boyutunu küçültün ve bir CDN kullanmayı düşünün

---

## Sonraki Adımlar

1. ✓ Content Types oluşturun
2. ✓ API Permissions ayarlayın
3. ✓ Demo içerik ekleyin
4. Frontend'in API'ye erişip erişmediğini test edin:
   ```bash
   curl http://localhost:1337/api/rooms
   ```
