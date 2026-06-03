# Ebrulu Konak Projesi - Süreklilik Rehberi

Eğer Claude hesabınızın aboneliği biterse, bu dokümanda verilen adımları izleyerek projeyi yeni bir hesap ile devam ettirebilirsiniz.

## 1. Mevcut Durum

### Repository Bilgileri
- **GitHub Repository:** https://github.com/bsafran/ebrulu-konak
- **Repository Sahibi:** bsafran
- **Main Branch:** main
- **Tüm Commit History:** GitHub'da saklanmış ve geri alınabilir

### Proje Yapısı
```
ebrulu-konak/
├── frontend/              # React website
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── backend/               # Strapi CMS (opsiyonel - local setup)
├── .git/                  # Git history (tüm commitler kayıtlı)
└── git push origin main   # Her değişiklik GitHub'da saklanır

```

## 2. Projeyi Çekmek ve Devam Ettirmek

### Adım 1: Repository'yi Klonla
Yeni bir klasöre projeyi çek:

```bash
cd ~/Desktop
git clone https://github.com/bsafran/ebrulu-konak.git
cd ebrulu-konak
```

Bu komut:
- Tüm dosyaları indirir
- Tam commit history'yi indirir
- Git konfigürasyonunu ayarlar

### Adım 2: Bağımlılıkları Yükle

**Frontend için:**
```bash
cd frontend
npm install
```

**Backend için (Strapi - isteğe bağlı):**
```bash
cd ../backend
npm install
```

### Adım 3: Strapi CMS Ayarla (Backend)

Eğer backend'i yerel olarak çalıştıracaksanız:

```bash
cd backend
npm run develop
```

Admin paneline şuradan erişin: `http://localhost:1337/admin`

**Strapi Ayarlarındaki Önemli Noktalar:**
- Database: `.env` dosyasında ayarlanmıştır
- Media uploads: `public/uploads/` klasöründe saklanır
- API endpoint: `http://localhost:1337/api`

### Adım 4: Frontend'i Başlat

```bash
cd frontend
npm run dev
```

Websitesi şuradan açılır: `http://localhost:5173`

## 3. GitHub'dan Bilmemeniz Gereken Şeyler

### Yüklü Olmayan Dosyalar
Bu dosyalar `.gitignore` içinde olduğu için GitHub'da **YOKtur**:

```
node_modules/          # npm install ile indirilir
.env                   # Sensible bilgiler (kendi oluşturmanız gerek)
dist/                  # Build output
.DS_Store             # MacOS system files
```

### `.env` Dosyasını Oluşturmak

**Backend için (`backend/.env`):**
```env
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db
JWT_SECRET=your-secret-key-here
API_TOKEN_SALT=your-salt-here
ADMIN_JWT_SECRET=your-admin-secret
```

**Frontend için (`frontend/.env` - isteğe bağlı):**
```env
VITE_API_URL=http://localhost:1337/api
```

## 4. Geliştirmeye Devam Etmek

### Yeni Bir Commit Yapma

```bash
# Değişiklikleri gör
git status

# Dosyaları stage'e ekle
git add .

# Commit yap (açıklayıcı mesaj yaz)
git commit -m "[feat] Yeni özellik açıklaması"

# GitHub'a push et
git push origin main
```

### Git Logunu Kontrol Etme

Önceki tüm değişiklikleri görmek için:

```bash
git log --oneline
# veya
git log --all --decorate --oneline --graph
```

### Belirli Bir Commit'e Dönmek

Eğer eski bir sürüme dönmek istersen:

```bash
git checkout <commit-hash>

# Geri dönmek için:
git checkout main
```

## 5. Proje Konfigürasyonu

### Strapi CMS Content Types
Mevcut content types'lar (model tanımları):
- **Room** - Oda bilgileri
- **Restaurant** - Restoran bilgileri
- **Reservation** - Müşteri rezervasyonları
- **Gallery** - Galeri fotoğrafları
- **Site Settings** - Genel ayarlar

Bu modeller Strapi admin panelinde bulunur ve ihtiyaca göre değiştirilebilir.

### Frontend API Bağlantıları
API çağrıları bu dosyada tanımlanmıştır:
```
frontend/src/services/strapiService.js
```

Strapi API'nin temel URL'si: `http://localhost:1337/api`

## 6. Başka Bir Hesapla Devam Etmek

Eğer GitHub hesabı değişirse:

### Seçenek 1: Repo'yu Fork Etmek
```bash
# GitHub web arayüzünde fork butonuna tıkla
# Yeni URL: https://github.com/new-username/ebrulu-konak

# Local'de remote'u güncelle
git remote set-url origin https://github.com/new-username/ebrulu-konak.git
git push origin main
```

### Seçenek 2: Depo Sahibini Değiştirmek
GitHub settings'inde:
1. Repository → Settings → Transfer ownership
2. Yeni hesabı seç ve transfer et

## 7. Önemli Noktalar

✅ **GitHub'da Saklanmış Olanlar:**
- Tüm kaynak kod
- Tüm commit history
- `.gitignore` dosyası
- package.json dosyaları

❌ **GitHub'da Saklanmayan Olanlar:**
- `node_modules/` (npm install ile indirilir)
- `.env` dosyaları (güvenlik sebebiyle)
- Strapi database (local `.tmp/data.db`)
- Upload edilen medya dosyaları (production'da S3 gibi external storage kullan)

## 8. Production Hazırlığı İçin

### Frontend Deploy (Vercel/Netlify)
```bash
cd frontend
npm run build
# dist/ klasörü production için hazırdır
```

### Backend Deploy (DigitalOcean/Railway)
Strapi production deployment için:
- Database: SQLite → PostgreSQL
- File uploads: Local → AWS S3 veya CloudStorage
- Node version: 18+ gerekli

## 9. Destek ve Sorular

Sorun yaşanırsa kontrol et:

1. **npm install hatası:** Node.js versiyonunu kontrol et (18+ gerekli)
2. **Strapi başlamazsa:** `.env` dosyasını kontrol et, `npm run build` çalıştır
3. **API bağlantı hatası:** Strapi çalışıyor mu? Port 1337 açık mı?
4. **Git push hatası:** GitHub hesabında yazma izni var mı?

## 10. Checklist - Yeni Hesapla Başlarken

- [ ] Repository klonlandı: `git clone https://github.com/bsafran/ebrulu-konak.git`
- [ ] Frontend dependencies yüklendi: `cd frontend && npm install`
- [ ] Backend dependencies yüklendi (isteğe bağlı): `cd backend && npm install`
- [ ] `.env` dosyaları oluşturuldu
- [ ] Frontend başlatıldı: `npm run dev`
- [ ] Backend başlatıldı (isteğe bağlı): `npm run develop`
- [ ] Strapi admin paneline giriş yapıldı
- [ ] İlk commit testi yapıldı ve GitHub'a push edildi

---

**Not:** Bu dokümantasyon, projenin bağımsız olarak devam ettirilebilmesini sağlamak için hazırlanmıştır. Herhangi bir sorun yaşanırsa, GitHub repository'nin issues bölümünü kullanabilir veya README.md dosyasını güncelleyebilirsiniz.

Last Updated: 2026-06-03
