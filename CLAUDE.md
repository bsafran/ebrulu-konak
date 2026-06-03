# Claude Code - Ebrulu Konak Projesi Çalışma Kuralları

**Son Güncelleme:** 2026-06-03
**Proje:** Ebrulu Konak - Lüks Otel Website + Strapi CMS

---

## 🔐 #1 Öncelik: Güvenlik

Tüm görevlerde güvenlik ilk sırada gelir. Kod yazılmadan önce güvenlik tehditleri analiz edilir.

### OWASP Top 10 Kontrolleri

- **XSS (Cross-Site Scripting)**: Template literals'e güvenilmeyen veri girilmesin. `dangerouslySetInnerHTML` yasak.
- **SQL Injection**: Strapi'ye doğrudan user input gönderilmesin. Params encode edilir.
- **CSRF**: API çağrılarında CSRF token kontrolü (Strapi handles otomatik).
- **Authentication**: API tokens `.env`'de saklanır, client-side'da expose edilmez.
- **Sensitive Data**: Password, token, API key log'a yazılmaz. `console.error` bile kontrol edilir.
- **Dependency Security**: `npm audit` düzenli çalıştırılır.

### Güvenlik Checklist (Her Görev Sonunda)

- [ ] User input sanitization yapıldı mı?
- [ ] Sensitive data logging yoktu mı?
- [ ] API key/token expose edilmedi mi?
- [ ] HTTPS gerekli yerlerde enforced mı?
- [ ] Rate limiting gerekli mi?

---

## 🧠 Adım Öncesi Derin Planlama

Herhangi bir kod yazılmadan önce tasarım aşaması yapılır.

### EnterPlanMode Kuralı

**Şu durumlarda MUTLAKA plan mode'e girin:**
- Yeni feature ekleme (logout button bile plan gerektirir)
- Birden fazla dosya değişecekse (2+ file)
- Architecture decision gerekiyorsa
- Multiple valid approach'lar varsa

**Şu durumlarda plan MODE'e girmeyebilirsiniz:**
- Tek satır typo fix
- Basit CSS tweaks
- Açık requirements ile single component

### Planning Checklist

1. **Varsayım söyle**: "Anladığım kadarıyla X yapmalıyız çünkü Y"
2. **Kafa karışıklığı dışa çıkar**: Belirsiz noktaları AskUserQuestion'la soruştur
3. **Tradeoff'ları göster**: "Yaklaşım A: hızlı ama, Yaklaşım B: scaling ama"
4. **Başarı kriterleri tanımla**: "Bitti diye nasıl bileceğiz?"
5. **Critical files listele**: Hangi dosyalar touch edilecek

### Plan Yazarken

- Markdown formatında, adım adım
- Kod snippet'ler değil, kavramlar
- User approval'dan sonra implementasyon

---

## 📋 Post-Implementation Review

Kod yazıldıktan sonra herself review yapılır.

### Code Review Checklist

**Fonksiyonalite:**
- [ ] Requirement'ın tamamı implement edildi mi?
- [ ] Edge cases handle edildi mi?
- [ ] Error handling var mı?

**Kod Kalitesi:**
- [ ] Sadelik kuralına uydu mu (Min kod)?
- [ ] Cerrahi değişiklik yapıldı mı (sadece gerekli değişiklikler)?
- [ ] Naming conventions tutarlı mı?
- [ ] Dead code/commented code yokmu?

**Performance & UX:**
- [ ] Rendering performansı OKey?
- [ ] Loading states var mı?
- [ ] Error messages user-friendly mi?
- [ ] Mobile responsive mi?

**Testing:**
- [ ] Farklı scenarilerde test edildi mi?
- [ ] Browser'da test edildi mi?
- [ ] Console'da warning/error yokmu?

---

## 🎨 Frontend-Design Skill Zorunlu

Tüm UI/UX görevlerinde design skill uygulanır. Generic AI aesthetics yasak.

### Design Standartları

1. **Tutarlılık**: Ebrulu Konak brand'ına uygun (lüks, minimal, sade)
2. **Accessibility**: WCAG 2.1 AA standardı
3. **Responsive**: Mobile-first approach
4. **Performance**: 3G cihazlarda da kullanılabilir

### Color Palette (Tailwind Config'den)
```
primary-dark: #9c714b (kahverengi)
primary-light: #f3efea (broken white)
primary-accent: #a67c52
```

### Typography
- Font: Inter
- Heading: Bold, word-spacing: 100vw (break at each word)
- Body: Regular 16px
- Contrast ratio minimum 4.5:1

### Components
- Hover states: 200ms linear transition
- Blur effect: `brightness(0.5) saturate(0.5) contrast(1.2) blur(20px)`
- Border radius: `rounded-2xl` (default)
- Glassmorphism: `backdrop-blur-md`, `bg-white/90`

---

## 🔍 Best Practice + Sektör Standardı Araştırması

Yeni teknoloji/pattern kullanılmadan önce araştırma yapılır.

### Araştırma Kuralı

1. **Web/docs'tan (2026 güncel)**
2. **Industry leaders**: Yunak.com, benzer lüks oteller nasıl yapıyor?
3. **Performance**: Lighthouse score hedef 90+
4. **Security**: CWE-7 hazırda override yapmayan best practice
5. **Documentation**: Official docs kullan, Stack Overflow'u validate et

### Update Döngüsü

- React/Vite/Tailwind: Quarterly check
- Strapi: Monthly security updates
- Dependencies: `npm outdated` düzenli kontrol

---

## 📖 LLM Davranış Kuralları

### 1️⃣ Kodlamadan Önce Düşün

```
❌ DON'T: "Şu component'i yazarım" → kod yaz
✅ DO: "Anladığım kadarıyla X yapmak için Y gerekiyor, Z kontrol et"
```

- Varsayımı sesli söyle
- Kafa karışıklığını gizleme, soruştur
- Tradeoff'ları şeffaf yüzeye çıkar
- Confirmation al gerekiyorsa

### 2️⃣ Önce Sadelik

```
❌ DON'T: Hazır utilities, abstractions, future-proofing
✅ DO: Sorunu çözen minimum kod, speculation yok
```

- Three lines of code > premature abstraction
- Error handling sadece system boundary'de (user input, external API)
- Comments sadece "why" açıklansa, "what" code'dan anlaşılıyorsa yok
- Feature flags değil doğrudan değişiklik

### 3️⃣ Cerrahi Değişiklik

```
❌ DON'T: Temiz kod için file'ı refactor et, docstring ekle
✅ DO: Sadece dokunman gerekene dokun
```

- Çevredeki kod'a dokunma
- Sadece kendi yarattığın artığı temizle (unused variables, imports)
- Backward-compat hacks'i kaldır (unused `_vars`, removed code comments)
- Rename işlemi yapılacaksa file tüm occurrences update edilir

### 4️⃣ Hedef Odaklı Yürütme

```
SUCCESS = Tanımlanmış hedefin başarısı
```

- **Başarı kriteri tanımla**: Bitti diye ne olacak bilirsin
- **Doğrulanana kadar döngü**: Test et, broke mi kontrol et
- **Partial completion yok**: Task seçiliyorsa tamamlanır
- **Context budget yönet**: Efficient communication, precise instructions

---

## 📝 Commit Mesajları

### Format
```
[CATEGORY] Basit açıklama

Detaylı açıklama (opsiyonel)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

### CATEGORY
- `feat`: Yeni feature
- `fix`: Bug fix
- `refactor`: Kod yapısı (davranış change yok)
- `style`: CSS/styling
- `chore`: Build, deps, config
- `docs`: Dokumentasyon

### Örnekler
```
[feat] Add hover effects to room cards

[fix] Fix carousel scroll calculation for responsive widths

[style] Update button colors to kahverengi #9c714b

[docs] Update CLAUDE.md with security guidelines
```

---

## 🎯 Başarı Kriterleri Örnekleri

### Carousel Feature
- ✅ 3 kart görünüyor
- ✅ Sağ/sol ok'la 1 kart kaydırılıyor
- ✅ Hover: image zoom (1.05) + filter change + button fade
- ✅ Touch/swipe support
- ✅ Responsive (mobile breakpoint test)
- ✅ Console warning/error yok

### Güvenlik Görevinde
- ✅ OWASP Top 10 checklist pass
- ✅ Input sanitization test
- ✅ API key expose kontrol
- ✅ Code audit (eslint) pass

---

## 📞 Pratik Flow

### Görev Alınca (Her Zaman)
1. `memory/MEMORY.md` kuralları oku
2. Güvenlik analizi yap
3. Varsayım söyle, kafa karışıklığını açıkla
4. `EnterPlanMode` (2+ file veya complex task)
5. User confirmation al

### Implementasyon
1. Minimum kod yazı
2. Sadece dokunman gerekene dokun
3. Inline comments çok nadir (why only)
4. Test et (browser, responsive, edge cases)

### Completion
1. Post-implementation review
2. Console'da error/warning kontrol
3. Git commit with proper message
4. User'a sonuç bildir

---

## 🔗 Referanslar

Tüm kurallar ve best practice'ler `memory/MEMORY.md`'de detaylı listelenmiştir.

**Bu dosya kuralların özetidir. Detaylı bilgi için `MEMORY.md`'yi oku.**

---

**Sorular? Kural update?** → Soruştur ve güncelleyelim!
