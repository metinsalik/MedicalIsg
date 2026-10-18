# Medical İSG — shadcn/ui Enterprise Tasarım Sistemi & UI Geliştirme Spesifikasyonu

Bu doküman, **Medical İSG (Entegre Tesis Yönetim & İSG Sistemi - ETYS)** platformunun arayüzlerini ve bağlı modüllerini geliştiren AI ajanları (Cursor, Claude, Copilot, v0 vb.) ve frontend geliştiriciler için kesin tasarım ve kodlama rehberidir.

---

## 1. Temel Vizyon & Tasarım Felsefesi

Medical İSG; multi-tenant (tenant-per-DB), yüksek güvenlikli (2FA, RBAC) ve modüler mimariye sahip bir kurumsal İSG ve tesis yönetim platformudur.

- **Tasarım Dili:** Modern **shadcn/ui** felsefesi (Radix UI + Tailwind CSS)
- **Hissiyat:** Temiz, kurumsal, güven verici, yüksek yoğunluklu (high information density), okunabilir ve minimalist enterprise SaaS.
- **Tipografi:** Sans-serif (Geist, Inter veya Plus Jakarta Sans), sıkı harf aralığı (`tracking-tight`), net hiyerarşi.
- **Arka Plan Dokusu:** Minimal dot-grid (noktalı kılavuz) deseni, hafif radyal degrade (subtle radial gradient glow) ve `slate-50`/`slate-950` zemin kontrastı.

---

## 2. Renk Paleti ve Tailwind Değişkenleri (Theme Tokens)

### CSS Variables / Tailwind Konfigürasyonu
```css
:root {
  /* Zemin & Yüzey */
  --background: 210 20% 98%;          /* #f8fafc slate-50 */
  --foreground: 222 47% 11%;          /* #0f172a slate-900 */
  --card: 0 0% 100%;                  /* #ffffff */
  --card-foreground: 222 47% 11%;
  --popover: 0 0% 100%;
  --popover-foreground: 222 47% 11%;

  /* Marka & Vurgu (Medical Teal / Emerald) */
  --primary: 173 80% 26%;             /* #0f766e teal-700 / kurumsal sağlık zümrütü */
  --primary-foreground: 210 40% 98%;  /* #f8fafc */
  --primary-hover: 174 84% 21%;       /* #115e59 teal-800 */

  /* İkincil & Nötr */
  --secondary: 210 40% 96.1%;         /* #f1f5f9 slate-100 */
  --secondary-foreground: 222 47% 11%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215 16% 47%;    /* #64748b slate-500 */
  --accent: 173 58% 95%;              /* #f0fdfa teal-50 */
  --accent-foreground: 173 80% 26%;

  /* Durum & Uyarı (İSG Standartları) */
  --destructive: 0 84% 60%;           /* #ef4444 red-500 - Yüksek Risk / Acil */
  --destructive-foreground: 210 40% 98%;
  --warning: 38 92% 50%;              /* #f59e0b amber-500 - Dikkat / Denetim Bekleyen */
  --success: 160 84% 39%;             /* #10b981 emerald-500 - Uygun / Güvenli */

  /* Kenarlıklar & Efektler */
  --border: 214 32% 91%;              /* #e2e8f0 slate-200 */
  --input: 214 32% 91%;
  --ring: 173 80% 26%;
  --radius: 0.625rem;                 /* 10px - modern yuvarlatılmış köşeler */
}

.dark {
  --background: 222 47% 7%;           /* #090d16 koyu lacivert/slate */
  --foreground: 210 40% 98%;
  --card: 222 47% 10%;                /* #0d1527 */
  --card-foreground: 210 40% 98%;
  --primary: 173 70% 38%;             /* #14b8a6 teal-500 */
  --primary-foreground: 222 47% 11%;
  --border: 217 33% 18%;
  --input: 217 33% 18%;
  --muted-foreground: 215 20% 65%;
}
```

---

## 3. UI Bileşen Kılavuzu (Component Standards)

### 3.1. Kartlar (`Card`, `CardHeader`, `CardContent`)
- **Stil:** `bg-card border border-border/70 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] backdrop-blur-sm`
- **Etkileşim:** Hover gerektiren kartlarda `hover:border-primary/40 hover:shadow-md transition-all duration-200`
- **İç Padding:** `p-6` standart, yoğun tablolarda `p-4`.

### 3.2. Butonlar (`Button`)
- **Primary:** `bg-[#0f766e] hover:bg-[#115e59] text-white font-medium shadow-sm transition-all h-10 px-4 rounded-lg`
- **Secondary / Outline:** `border border-border bg-background hover:bg-accent hover:text-accent-foreground text-foreground`
- **Hızlı Hesap / Quick-Action Kartları:** `flex items-center justify-between p-3.5 border border-border/80 rounded-lg hover:border-teal-600/40 hover:bg-teal-50/30 transition-colors cursor-pointer group`

### 3.3. Form Elemanları (`Input`, `Label`, `Select`)
- **Input:** `h-10 px-3.5 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary`
- **Etiketler (Label):** `text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5`

### 3.4. Rozetler & Çekirdek Göstergeler (`Badge`)
- **Platform Statüsü (0. Katman Platform Çekirdeği vb.):**
  `inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-teal-200/60 bg-teal-50/70 text-teal-800 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800`
  - Canlılık göstergesi: Yeşil yanıp sönen dot: `<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>`
- **Sistem Mimarisi Kartları (Tenant-per-DB, 2FA & RBAC, Docker Stack):**
  `flex items-start gap-3 p-4 rounded-lg border border-border/60 bg-card/60 backdrop-blur-xs`

---

## 4. Sayfa Düzeni & Grid Mimarisi (Layout Architecture)

### 4.1. Auth / Login Ekranı Mimarisi (Mevcut Referans)
- **Split Hero Layout (2 Kolon):**
  - **Sol Kolon (Brand & System Trust):**
    - `0. Katman Platform Çekirdeği` rozeti
    - H1: `Tesislerinizi ve Güvenliğinizi Tek Merkezden Yönetin.` (font-bold, tracking-tight, 40-48px)
    - Açıklama: Tenant-per-DB mimarisi, modüler yapı ve veri izolasyonu vurgusu.
    - Alt mimari özellikleri: 3 sütunlu kompakt teknik kartlar (`Tenant-per-DB`, `2FA & RBAC`, `Docker Stack`).
  - **Sağ Kolon (Authentication Card):**
    - shadcn Card konteyneri içinde:
      - Başlık: `Kurumsal Giriş` + sağ üstte modern Sparkle/Security ikonu
      - Açıklama metni: "E-posta ve şifrenizle giriş yapın; sistem rolünüzü ve bağlı olduğunuz tesisi otomatik tanır."
      - Input alanları (E-Posta Adresi, Şifre + Şifremi Unuttum linki)
      - CTA: `Sisteme Giriş Yap` (`icon: LogIn`)
      - Ayırıcı & `HIZLI TEST HESAPLARI (TEK TIKLA DOLDUR):`
        - 👑 Super Admin: `superadmin@medicalisg.com`
        - 🏢 Holding Yöneticisi: `holding.admin@agrup.com.tr`
        - 🏥 Tesis Yöneticisi: `tesis.yonetici@agrup.com.tr`
- **Üst Bar (Header):**
  - Sol: Medical İSG logo & subtext (`İŞ SAĞLIĞI VE GÜVENLİĞİ`)
  - Orta: `0. Katman Platform Çekirdeği` rozeti
  - Sağ: Sürüm etiketi (`v4.2-enterprise`) ve Tema Geçiş Butonu (Sun/Moon).
- **Alt Bar (Footer):**
  - Sol: © 2026 Medical İSG Yazılım Çözümleri A.Ş. Tüm hakları saklıdır.
  - Sağ: KVKK ve Gizlilik • Hizmet Düzeyi (SLA) • Kurumsal Destek

---

## 5. Bağlı Sayfalar İçin Ekran Mimarisi & Şablon Kuralları

Tüm alt ekranlar aşağıdaki tutarlı kabuk (Shell) ve bileşen hiyerarşisine uymalıdır:

### 5.1. Navigasyon & Shell Standartları
- **Sol Sidebar (veya Üst Navigasyon):**
  - Logo ve Tesis/Tenant Değiştirici (`Select: Acıbadem Maslak, Şişli Memorial vb.`)
  - Menü Öğeleri:
    - 📊 **Genel Bakış (Dashboard)**
    - 🏢 **Tesisler & Lokasyonlar** (Tenant-per-DB sağlık durumu)
    - 🦺 **İSG & Risk Değerlendirme** (Ramak Kala, Olay Bildirimi, KKD Takibi)
    - 📋 **Periyodik Muayene & Sağlık Taramaları**
    - 👥 **Personel & Yetkilendirme (RBAC)**
    - ⚙️ **Sistem & Docker Stack Yönetimi**
  - Alt kısım: Aktif kullanıcı profili ve çıkış yap (`LogOut`).

### 5.2. Ekran Tasarım Şablonları (Prompt Template)
Geliştirme yapacak ajana her ekran için verilecek şablon talimatı:

```markdown
GÖREV: Medical İSG için [EKRAN ADI] sayfasını shadcn/ui bileşenleri ile kodla.
KURALLAR:
1. Palette: Slate zeminler + #0f766e (Teal-700) primary buton ve aktif durumlar.
2. Kartlar: rounded-xl, border-slate-200, bg-white/80 backdrop-blur, subtle shadow.
3. Tipografi: Inter/Geist, tracking-tight başlıklar, text-slate-500 yardımcı metinler.
4. Bileşenler: shadcn/ui Card, Table, Badge, Button, Input, DropdownMenu, Tabs.
5. Veri Yoğunluğu: Enterprise seviyede; filtreleme çubuğu, arama input'u, durum badge'leri ve aksiyon butonları içermelidir.
```

---

## 6. Geliştirici & AI Ajanı Uygulama Kontrol Listesi (Checklist)

- [ ] Tailwind konfigürasyonunda `primary: #0f766e` ve `slate` nötr tonları tanımlı mı?
- [ ] Lucide Icons (`lucide-react`) kütüphanesi tutarlı kullanılıyor mu? (Shield, Building2, User, Key, CheckCircle2 vb.)
- [ ] Form alanlarında focus ring `ring-[#0f766e]/20` ve `border-[#0f766e]` ayarlı mı?
- [ ] Responsive düzen: Mobilde tek sütun (`grid-cols-1`), desktop'ta 2 sütun (`lg:grid-cols-12`) dengesi korunuyor mu?
- [ ] Koyu mod (`dark:`) sınıfları tüm zemin, kenarlık ve metin renklerine uygulandı mı?
