# Deployment Guide

Ebrulu Konak projesini production'a deploy etmek için adım adım talimatlar.

## Deployment Architecture

```
┌─────────────────────┐
│   Frontend          │
│  (Vercel/Netlify)   │
│  ebrulukonak.com    │
└──────────┬──────────┘
           │ API calls
           ▼
┌─────────────────────┐
│   Backend           │
│ (Railway/Heroku)    │
│ api.ebrulukonak.com │
└─────────────────────┘
           │
           ▼
┌─────────────────────┐
│   PostgreSQL DB     │
│  (Production)       │
└─────────────────────┘
```

## Pre-Deployment Checklist

- [ ] Tüm environment variables ayarlandı
- [ ] API'nin production URL'si ayarlandı
- [ ] Veritabanı backup'ı alındı
- [ ] SSL sertifikası kontrol edildi
- [ ] CORS ayarları yapıldı
- [ ] Media files upload edildi
- [ ] Frontend production build test edildi
- [ ] Backend production test edildi

## Frontend Deployment

### Seçenek 1: Vercel (Önerilen)

#### 1.1 Vercel Hesabı Oluşturun
- https://vercel.com
- GitHub hesabınızla giriş yapın

#### 1.2 Proje Setup
```bash
npm i -g vercel
cd frontend
vercel
```

Sorular:
- Scope: `Your-name`
- Project name: `ebrulu-konak-frontend`
- Link to existing project: `No`
- Root directory: `./` (current)

#### 1.3 Environment Variables
1. Vercel dashboard'a gidin
2. Settings → Environment Variables
3. Ekleyin:
   ```
   VITE_API_URL=https://api.ebrulukonak.com/api
   ```

#### 1.4 Deploy
```bash
vercel --prod
```

### Seçenek 2: Netlify

#### 2.1 Netlify Hesabı Oluşturun
- https://netlify.com
- GitHub hesabınızla giriş yapın

#### 2.2 Build & Deploy
1. New site from Git
2. Repository seçin
3. Build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`

#### 2.3 Environment Variables
- Site settings → Build & deploy → Environment
- Ekleyin:
  ```
  VITE_API_URL=https://api.ebrulukonak.com/api
  ```

#### 2.4 Deploy
```bash
cd frontend
npm run build
```

### Custom Domain Setup

#### 2.1 Domain Satın Alın
- GoDaddy, Namecheap, etc.

#### 2.2 DNS Records Ayarlayın

**Vercel için:**
```
CNAME: ebrulukonak.com → cname.vercel-dns.com.
```

**Netlify için:**
```
CNAME: ebrulukonak.com → [your-netlify-domain].netlify.app
```

#### 2.3 SSL Certificate
- Vercel/Netlify otomatik olarak SSL sağlar
- Let's Encrypt ile ücretsiz

## Backend Deployment

### Seçenek 1: Railway.app (Önerilen)

#### 1.1 Railway Hesabı Oluşturun
- https://railway.app
- GitHub hesabınızla giriş yapın

#### 1.2 Yeni Proje Oluşturun
1. Dashboard → New Project
2. Deploy from GitHub
3. Repository seçin (`Ebrulu` repo)

#### 1.3 PostgreSQL Database Kurması
1. + Add service
2. PostgreSQL seçin
3. Create

#### 1.4 Environment Variables
Railway dashboard'da:
1. backend service → Variables
2. Ekleyin:

```
HOST=0.0.0.0
PORT=3000
APP_KEYS=your-secret-key-here
API_TOKEN_SALT=your-salt-here
ADMIN_JWT_SECRET=your-secret-here
TRANSFER_TOKEN_SALT=your-transfer-salt
DATABASE_CLIENT=postgres
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_USERNAME=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
NODE_ENV=production
```

#### 1.5 Secrets Generate
```bash
# Güvenli secretler generate et
node -e "console.log(require('crypto').randomBytes(16).toString('base64'))"
```

#### 1.6 Deploy
```bash
git push origin main
```

Railway otomatik olarak deploy eder.

#### 1.7 Domain Bağlayın
1. Railway dashboard → backend service
2. Settings → Custom domain
3. Domain girin: `api.ebrulukonak.com`

### Seçenek 2: Heroku

#### 2.1 Heroku Hesabı Oluşturun
- https://heroku.com

#### 2.2 Heroku CLI Yükleyin
```bash
brew tap heroku/brew && brew install heroku
# veya
npm install -g heroku
```

#### 2.3 Giriş Yapın
```bash
heroku login
```

#### 2.4 App Oluşturun
```bash
cd backend
heroku create ebrulu-konak-backend
```

#### 2.5 PostgreSQL Add-on Ekleyin
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

#### 2.5 Environment Variables Ayarlayın
```bash
heroku config:set \
  APP_KEYS="your-secret" \
  API_TOKEN_SALT="your-salt" \
  ADMIN_JWT_SECRET="your-secret" \
  TRANSFER_TOKEN_SALT="your-salt" \
  NODE_ENV="production"
```

#### 2.6 Deploy
```bash
git push heroku main
```

### Seçenek 3: DigitalOcean

#### 3.1 Droplet Oluşturun
- Ubuntu 22.04 LTS
- 2GB RAM (minimum)
- 50GB SSD

#### 3.2 SSH Bağlantısı
```bash
ssh root@your-droplet-ip
```

#### 3.3 Dependencies Yükleyin
```bash
# Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL
sudo apt-get install -y postgresql postgresql-contrib

# Nginx
sudo apt-get install -y nginx

# PM2 (process manager)
sudo npm install -g pm2
```

#### 3.4 Database Setup
```bash
sudo -u postgres createdb ebrulu_konak
sudo -u postgres createuser strapi_user
sudo -u postgres psql -c "ALTER ROLE strapi_user WITH PASSWORD 'your-password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE ebrulu_konak TO strapi_user;"
```

#### 3.5 Proje Deploy
```bash
git clone https://github.com/your-username/ebrulu-konak.git
cd ebrulu-konak/backend
npm install
npm run build
```

#### 3.6 Environment Variables
```bash
cat > .env << EOF
HOST=0.0.0.0
PORT=1337
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=ebrulu_konak
DATABASE_USERNAME=strapi_user
DATABASE_PASSWORD=your-password
NODE_ENV=production
APP_KEYS=your-secret-keys
API_TOKEN_SALT=your-salt
ADMIN_JWT_SECRET=your-secret
TRANSFER_TOKEN_SALT=your-salt
EOF
```

#### 3.7 PM2 ile Start
```bash
pm2 start "npm run start" --name "strapi"
pm2 save
pm2 startup
```

#### 3.8 Nginx Setup
```nginx
# /etc/nginx/sites-available/strapi
server {
    listen 80;
    server_name api.ebrulukonak.com;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

#### 3.9 Enable & Restart Nginx
```bash
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 3.10 SSL (Let's Encrypt)
```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.ebrulukonak.com
```

## Frontend-Backend Integration

### CORS Setup

**Strapi config/middlewares.ts:**

```javascript
export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://ebrulukonak.com',
        'https://www.ebrulukonak.com',
      ],
      credentials: true,
    },
  },
];
```

## SSL/HTTPS Setup

### Vercel/Netlify
- Otomatik olarak sağlanır

### Custom Domain
```bash
# Let's Encrypt ile
certbot certonly --standalone -d api.ebrulukonak.com

# Nginx config'e ekleyin
ssl_certificate /etc/letsencrypt/live/api.ebrulukonak.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/api.ebrulukonak.com/privkey.pem;
```

## Monitoring & Maintenance

### Log Monitoring

**Railway:**
```bash
railway logs backend
```

**Heroku:**
```bash
heroku logs --tail
```

**DigitalOcean:**
```bash
pm2 logs
```

### Database Backup

**PostgreSQL:**
```bash
pg_dump ebrulu_konak > backup.sql
```

**Restore:**
```bash
psql ebrulu_konak < backup.sql
```

## Performance Optimization

### Frontend
- [ ] Enable gzip compression
- [ ] Cache static assets
- [ ] Image optimization
- [ ] Code splitting
- [ ] CDN usage

### Backend
- [ ] Database indexing
- [ ] Query optimization
- [ ] Caching (Redis)
- [ ] Rate limiting
- [ ] Load balancing

## Monitoring Services

### Uptime Monitoring
- https://uptimerobot.com
- https://statuspage.io

### Error Tracking
- https://sentry.io
- https://bugsnag.com

### Performance Monitoring
- https://datadog.com
- https://newrelic.com

## Post-Deployment

1. ✓ Test tüm sayfaları
2. ✓ Test form submissions
3. ✓ Check API endpoints
4. ✓ Monitor logs
5. ✓ Set up backups
6. ✓ Configure domain emails
7. ✓ Create admin accounts
8. ✓ Document access credentials

## Troubleshooting

### CORS Error
- Check Strapi middleware config
- Verify frontend URL in CORS list

### Database Connection Error
- Check environment variables
- Verify database credentials
- Check network firewall rules

### Files Not Uploading
- Check storage permissions
- Verify upload folder exists
- Check file size limits

### Slow Performance
- Enable database caching
- Use CDN for static files
- Optimize images
- Enable gzip compression

## Rollback Plan

### Frontend
```bash
vercel --prod --from-import
# atau Netlify -> Deployments -> Rollback
```

### Backend
```bash
git revert <commit-hash>
git push origin main
```

---

**Sorular?** Documentation'ı kontrol edin veya issue açınız.
