# Ebrulu Konak Projesi - Kurallar & Best Practice Index

**Son Güncelleme:** 2026-06-03

---

## 📑 Hızlı Index

### 🔐 Güvenlik Kuralları
1. [XSS Prevention](#xss-prevention)
2. [API Security](#api-security)
3. [Data Privacy](#data-privacy)
4. [Dependency Management](#dependency-management)

### 💻 Kod Kuralları
5. [Component Naming](#component-naming)
6. [Folder Structure](#folder-structure)
7. [State Management](#state-management)
8. [API Integration](#api-integration)

### 🎨 Design & Styling
9. [Color Palette](#color-palette)
10. [Typography](#typography)
11. [Responsive Design](#responsive-design)
12. [Hover & Animations](#hover--animations)

### 🔧 Frontend Stack
13. [React Best Practices](#react-best-practices)
14. [Tailwind CSS](#tailwind-css)
15. [React Icons](#react-icons)

### 📱 Backend (Strapi)
16. [Content Type Naming](#content-type-naming)
17. [API Permissions](#api-permissions)
18. [Media Management](#media-management)

### 🧪 Testing & QA
19. [Testing Checklist](#testing-checklist)
20. [Performance Targets](#performance-targets)

### 📝 Git & Versioning
21. [Commit Guidelines](#commit-guidelines)
22. [Branch Naming](#branch-naming)

---

## 🔐 Güvenlik Kuralları

### XSS Prevention

**RULE:** User input'a hiçbir zaman güvenilmesin. Template literals'de sanitization yap.

```javascript
// ❌ BAD - XSS açıksa
const html = `<div>${userInput}</div>`;
elem.innerHTML = html;

// ✅ GOOD - React otomatik escape eder
return <div>{userInput}</div>;

// ❌ BAD - dangerouslySetInnerHTML
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ GOOD - Sanitize library kullan (DOMPurify)
import DOMPurify from 'dompurify';
const safe = DOMPurify.sanitize(userInput);
<div dangerouslySetInnerHTML={{ __html: safe }} />
```

**Kaynaklar:**
- [React Security](https://react.dev/learn/security)
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

---

### API Security

**RULE:** Sensitive data client-side'da expose edilmesin.

```javascript
// ❌ BAD - Token client'te
const token = "strapi_jwt_token_here";

// ✅ GOOD - Backend'de sakla, HTTP-only cookie yolla
// Backend: Set-Cookie: token=...; HttpOnly; Secure

// ❌ BAD - API key .env'de hard-code
const API_KEY = "pk_live_123456789";

// ✅ GOOD - Environment variable'dan oku
const API_KEY = import.meta.env.VITE_STRAPI_API_TOKEN;
// .env.local dosyasında sakla, .gitignore'a ekle
```

**Rules:**
- `.env` ve `.env.local` ASLA git'e commit'lenmesin
- API token sadece backend request'lerinde
- User auth'ı HTTP-only cookies veya secure token store

**Kaynaklar:**
- [Strapi Authentication](https://docs.strapi.io/dev-docs/guides/auth)
- [OWASP API Security](https://owasp.org/www-project-api-security/)

---

### Data Privacy

**RULE:** Logging'de sensitive data gösterilmesin.

```javascript
// ❌ BAD
console.log("User login:", user);  // Password expose olabilir
console.error("API Error:", error.response.data);  // Token olabilir

// ✅ GOOD
console.log("User login successful:", user.id);
console.error("API Error:", error.message);
```

**Rules:**
- Password, token, API key asla log'a yazılmaz
- User email/phone sadece gerekiyorsa log'a
- Production'da sensitive logs kaldırılır

---

### Dependency Management

**RULE:** Security updates düzenli kontrol edilir.

```bash
# Her ay çalıştır
npm audit
npm audit fix

# Outdated packages kontrol et
npm outdated

# Update candidates
npm update
```

**Rules:**
- Critical security issue → immediately fix
- Dependency'i npm'den doğrudan kur, CDN veya unofficial sources yok
- Lock file (`package-lock.json`) git'e commit'le

**Kaynaklar:**
- [npm Security](https://docs.npmjs.com/cli/v10/commands/npm-audit)

---

## 💻 Kod Kuralları

### Component Naming

**RULE:** PascalCase, anlamlı isim, "-Component" suffix'i yok

```javascript
// ✅ GOOD
RoomsPreview.jsx
RoomCard.jsx
BookingStrip.jsx
Loading.jsx

// ❌ BAD
roomsPreview.jsx (camelCase)
Rooms-Preview.jsx (kebab-case)
RoomsComponent.jsx (redundant suffix)
```

**Rules:**
- File adı = exported component adı
- Folder: lowercase, kebab-case (optional)
- `index.jsx` minimal kullan (only parent exports)

**Kaynaklar:**
- [React File Naming](https://react.dev/learn/your-first-component)

---

### Folder Structure

**RULE:** Feature-based folder structure

```
src/
├── components/
│   ├── common/          # Reusable komponentler
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── home/            # Ana sayfa feature
│   │   ├── RoomsPreview.jsx
│   │   ├── RestaurantsPreview.jsx
│   │   └── BookingStrip.jsx
│   ├── rooms/           # Rooms feature
│   │   ├── RoomCard.jsx
│   │   ├── RoomList.jsx
│   │   └── RoomDetail.jsx
│   └── layout/
│       └── Layout.jsx
├── pages/               # Route pages (1 page = 1 feature)
│   ├── HomePage.jsx
│   ├── RoomsPage.jsx
│   └── RestaurantsPage.jsx
├── hooks/               # Custom React hooks
│   ├── useApi.js
│   └── useScrollAnimation.js
├── services/            # API + business logic
│   ├── api.js           # Axios config
│   ├── strapiService.js # Strapi endpoints
│   └── bookingService.js
├── context/             # React Context
│   └── BookingContext.jsx
├── utils/               # Utility functions
│   ├── constants.js
│   └── helpers.js
├── assets/              # Static files
│   └── images/
├── styles/              # Global styles
│   └── index.css
├── App.jsx
└── main.jsx
```

**Rules:**
- Feature'a ait komponentler aynı folder'da
- Reusable → `common/`
- Page-specific → `pages/`
- Helper functions → `utils/`

---

### State Management

**RULE:** React Context + useState (Redux gerek yok)

```javascript
// ✅ GOOD - BookingContext.jsx
import { createContext, useState } from 'react';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);

  return (
    <BookingContext.Provider value={{
      selectedRoom, setSelectedRoom,
      checkIn, setCheckIn,
      checkOut, setCheckOut,
      guests, setGuests,
    }}>
      {children}
    </BookingContext.Provider>
  );
};

// App.jsx'de wrap et
<BookingProvider>
  <Routes>...</Routes>
</BookingProvider>
```

**Rules:**
- Local state → `useState`
- Global state (booking, user) → Context
- Redux/Zustand yok (overengineering)
- useContext hook'u ile consume et

---

### API Integration

**RULE:** Tüm API çağrıları `services/` dosyalarında

```javascript
// ✅ GOOD - services/strapiService.js
import api from './api';

export const getRooms = async () => {
  try {
    const response = await api.get('/rooms?populate=*');
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// Component'te
import { getRooms } from '../../services/strapiService';
import useApi from '../../hooks/useApi';

const { data, loading, error } = useApi(() => getRooms());
```

**Rules:**
- Direct `fetch` kullanma, `axios` instance kullan
- Base URL ve headers → `api.js`
- Error handling → service layer
- Components sadece hook/context'ten data oku

**Kaynaklar:**
- [Axios Docs](https://axios-http.com/)

---

## 🎨 Design & Styling

### Color Palette

**RULE:** tailwind.config.js'deki custom colors kullan

```javascript
// tailwind.config.js
theme: {
  colors: {
    white: '#ffffff',
    black: '#000000',
    primary: {
      dark: '#9c714b',    // Kahverengi
      light: '#f3efea',   // Broken white
      accent: '#a67c52',  // Warm accent
    },
    gray: {
      600: '#4b5563',
      // ... (tailwind defaults)
    },
  },
}
```

**Usage:**
```jsx
// ✅ GOOD
<div className="bg-primary-light text-primary-dark">

// ❌ BAD
<div style={{ backgroundColor: '#f3efea', color: '#9c714b' }}>
```

**Rules:**
- Tailwind utilities > inline styles
- Custom colors always in config
- Consistent color usage project-wide

---

### Typography

**RULE:** Font: Inter, responsive sizes

```css
/* Global */
html { font-family: 'Inter', sans-serif; }

/* Sizes */
h1, h2: 2rem (32px)
h3: 1.75rem (28px) or 1.5rem (24px)
body: 1rem (16px)
small: 0.875rem (14px)
```

**React Usage:**
```jsx
// ✅ GOOD
<h2 className="text-4xl font-bold text-primary-dark">
<h3 className="text-2xl font-semibold">
<p className="text-gray-600 text-sm">

// ❌ BAD
<h2 style={{ fontSize: '32px' }}>
```

**Rules:**
- Tailwind size classes > inline styles
- Contrast ratio minimum 4.5:1
- word-spacing: 100vw (her sözcük yeni satır) → title'lar için

---

### Responsive Design

**RULE:** Mobile-first, Tailwind breakpoints

```javascript
// tailwind.config.js (default)
sm: 640px    // Small phone
md: 768px    // Tablet
lg: 1024px   // Desktop
xl: 1280px   // Large desktop
```

**React Usage:**
```jsx
// ✅ GOOD - Mobile first
<div className="w-full md:w-1/2 lg:w-1/3">
  Content
</div>

// Test all breakpoints
// Mobile (375px), Tablet (768px), Desktop (1024px)
```

**Rules:**
- Mobile viewport'ta test (3G speed)
- Padding/spacing: responsive
- Images: responsive heights (aspect ratio maintain)

**Tools:**
- Chrome DevTools responsive mode
- [Responsively App](https://responsively.app/)

---

### Hover & Animations

**RULE:** Subtle, 200ms transitions

```jsx
// Room Card Hover - STANDARD
<div
  style={{
    transform: isHovered ? 'scale(1.05) translateZ(0)' : 'scale(1) translateZ(0)',
    filter: isHovered
      ? 'brightness(1) saturate(1.3) contrast(0.9)'
      : 'brightness(0.75) saturate(1.2) contrast(0.85)',
    transition: 'filter 200ms linear, transform 200ms linear',
  }}
>
```

**Rules:**
- Transition duration: 200ms (fast, smooth)
- Timing function: linear (or ease-in-out)
- Transform origin: center
- Scale max: 1.1 (too much looks bad)
- Blur: brightness(0.5) + blur(20px) for unfocused cards

**Kaynaklar:**
- [CSS Transitions](https://developer.mozilla.org/en-US/docs/Web/CSS/transition)

---

## 🔧 Frontend Stack

### React Best Practices

**RULE:** Functional components, hooks, composition

```javascript
// ✅ GOOD
const RoomsPreview = () => {
  const { data, loading, error } = useApi(() => getRooms());
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section>
      {loading && <Loading />}
      {error && <ErrorMessage />}
      {data && <RoomList rooms={data.data} />}
    </section>
  );
};

// ❌ BAD - Class components (avoid)
// ❌ BAD - Mixed functional + class
```

**Rules:**
- Functional components (hooks)
- useEffect minimal (mounts/data fetch)
- Destructuring props
- Conditional rendering: `&&`, ternary, not `if`

**Kaynaklar:**
- [React Hooks](https://react.dev/reference/react)
- [React Best Practices](https://react.dev/learn)

---

### Tailwind CSS

**RULE:** Utility-first, minimal inline styles

```jsx
// ✅ GOOD
<button className="px-6 py-2 rounded-lg bg-primary-dark text-white hover:opacity-80 transition-opacity">

// ❌ BAD
<button style={{
  padding: '12px 24px',
  borderRadius: '8px',
  backgroundColor: '#9c714b'
}}>
```

**Common Classes:**
```
Spacing: p-* m-* gap-*
Sizing: w-* h-* min-w-* max-w-*
Colors: bg-* text-* border-*
Flexbox: flex items-center justify-between
Grid: grid grid-cols-* gap-*
Responsive: md:* lg:* lg:w-1/2
```

**Rules:**
- `@apply` yok (inline utilities > CSS class)
- Tailwind config'den custom colors
- Responsive classes: mobile-first

**Kaynaklar:**
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind UI Patterns](https://tailwindui.com/)

---

### React Icons

**RULE:** Feather icons (react-icons/fi)

```javascript
// ✅ GOOD
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';

<FiChevronLeft className="w-6 h-6" />

// ❌ BAD
import { ChevronLeft } from 'lucide-react'; // Different library
// ❌ BAD
<FiChevronLeft style={{ width: '24px' }} /> // Use className
```

**Rules:**
- Consistent icon library (Feather)
- Size: className (w-4, w-5, w-6)
- Color: inherit or text-primary-dark

---

## 📱 Backend (Strapi)

### Content Type Naming

**RULE:** Singular names, snake_case fields

```
Content Types:
- Room (not Rooms)
- Restaurant (not Restaurants)
- Reservation (not Reservations)
- Gallery (not Galleries)

Fields:
- title (not Title or room_title)
- maxGuests (camelCase in JSON, snake_case in REST)
- openingHours
- createdAt, updatedAt (Strapi auto)
```

**Rules:**
- Singular untuk collection
- camelCase atau snake_case consistent
- Field naming: descriptive, not prefixed

**Kaynaklar:**
- [Strapi Naming Conventions](https://docs.strapi.io/dev-docs/backend-customization/models)

---

### API Permissions

**RULE:** Public role: find & findOne, Auth required: create

```
Settings → Roles → Public:
✅ find (list all)
✅ findOne (detail)
❌ create, update, delete (protected)

Settings → Authenticated:
✅ create (reservations)
❌ update, delete (own data only)
```

**Kaynaklar:**
- [Strapi Permissions](https://docs.strapi.io/dev-docs/deployment/security/rbac)

---

### Media Management

**RULE:** Strapi Media Library, optimize images

```
Upload:
- Max size: 100MB
- Format: JPG (95% quality), PNG (rgba)
- Responsive images: multiple sizes

Access:
- Localhost: http://localhost:1337/uploads/...
- Production: CDN URL
```

**Rules:**
- WebP format preferred (fallback JPG)
- Width: 800px minimum
- Alt text: always include

---

## 🧪 Testing & QA

### Testing Checklist

**Before Push:**
- [ ] Functionality: All requirements met?
- [ ] Edge cases: Empty state, errors, loading?
- [ ] Responsive: Mobile (375px), Tablet (768px), Desktop (1024px)?
- [ ] Browser: Chrome, Firefox, Safari tested?
- [ ] Performance: Console has no errors/warnings?
- [ ] Accessibility: Keyboard navigation, screen reader?
- [ ] Security: No XSS, no hardcoded secrets?

**Code Quality:**
- [ ] Naming consistent?
- [ ] Comments added (only "why", not "what")?
- [ ] Unused imports/variables removed?
- [ ] No console.log (production)?

---

### Performance Targets

**RULE:** Lighthouse 90+ score

```
Performance:    90+
Accessibility:  95+
Best Practice:  90+
SEO:            90+
```

**Optimization:**
- Code splitting (React.lazy)
- Image lazy loading
- CSS minification (Tailwind handles)
- Bundle analysis (`npm run build`)

**Tools:**
- Lighthouse (Chrome DevTools)
- WebPageTest
- GTmetrix

---

## 📝 Git & Versioning

### Commit Guidelines

**Format:**
```
[CATEGORY] Brief description

Optional detailed explanation

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

**CATEGORY:**
```
feat     → New feature
fix      → Bug fix
refactor → Code structure (no behavior change)
style    → CSS/styling only
chore    → Build, deps, config
docs     → Documentation
test     → Tests
perf     → Performance optimization
```

**Examples:**
```
[feat] Add room card hover animations

[fix] Fix carousel scroll calculation for responsive widths

[style] Update button colors to primary-dark (#9c714b)

[docs] Update CLAUDE.md with security guidelines
```

**Rules:**
- Imperative mood ("Add", not "Added")
- Lowercase (except proper nouns)
- No period at end
- 50 chars max for title

**Kaynaklar:**
- [Conventional Commits](https://www.conventionalcommits.org/)

---

### Branch Naming

**RULE:** kebab-case, descriptive

```
feature/carousel-animations
feature/room-detail-page
fix/carousel-scroll-bug
docs/update-readme
refactor/api-service-layer
```

**Rules:**
- No underscores or CamelCase
- Prefix: feature/, fix/, docs/, refactor/
- Keep it short but descriptive

---

## 📋 Görev Başlama Checklist

**Her yeni görev başında:**

1. [ ] CLAUDE.md'ı oku
2. [ ] memory/MEMORY.md ilgili bölümü oku
3. [ ] Güvenlik analizi yap
4. [ ] Varsayımı söyle: "Anladığım kadarıyla..."
5. [ ] Kafa karışıklığını soruştur (AskUserQuestion)
6. [ ] Tradeoff'ları göster
7. [ ] EnterPlanMode (2+ file veya complex)
8. [ ] User confirmation al
9. [ ] Implementasyon başla (minimum kod)
10. [ ] Post-implementation review
11. [ ] Console kontrol (no errors)
12. [ ] Git commit proper message
13. [ ] Done!

---

**Sorular? Update?** → Soruştur, kuralları geliştir!

*Last updated: 2026-06-03*
