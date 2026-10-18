# Medical ISG — Marka Kılavuzu v2.0

> **Medical ISG**, Türkiye'de sağlık sistemleriyle entegre çalışan, kiracı başına ayrı veritabanı mimarisine sahip İş Sağlığı ve Güvenliği SaaS platformudur. Bu kılavuz; logonun, renk sisteminin, tipografinin ve UI ikonlarının web uygulamasında (Vite + React + TypeScript) ve tüm kurumsal materyallerde tutarlı kullanımını tanımlar.

**Marka özü:** Klinik güven (Teal) × Kurumsal otorite (Lacivert) × Saha farkındalığı (Hi-Vis Turuncu).

---

## 0. Paket yapısı

```
Medical_ISG_Brand_Kit_v2/
├── BRANDING.md                 ← bu doküman
├── logos/
│   ├── svg/                    ← birincil vektör dosyalar (yatay, stacked, ikon; açık/koyu/mono)
│   ├── png/                    ← 1x/2x raster (1200×400, 2400×800, 512, 256, 128, 1024)
│   └── webp/                   ← PNG'lerin WebP (q95) karşılıkları
├── favicon/                    ← 16/32/48 PNG, favicon.ico, favicon.svg, apple-touch 180, android 192/512, site.webmanifest
├── icons/
│   ├── primary-tabler/         ← {{N_PRIMARY}} ikon — BİRİNCİL UI seti (Tabler Icons, MIT)
│   ├── alt-iconsax-linear/     ← {{N_IX}} ikon — alternatif set (Iconsax Linear, MIT)
│   ├── alt-iconly-light/       ← {{N_IL}} ikon — alternatif set (Iconly Light, MIT)
│   └── icons-overview.png      ← toplu önizleme sayfası
├── tokens/
│   ├── brand-tokens.css        ← CSS değişkenleri (ölçekler + açık/koyu semantik)
│   ├── tailwind.brand.js       ← Tailwind CSS 3 preset
│   └── brand-tokens.json       ← tüm tokenlar + ikon envanteri (Style Dictionary/Figma Tokens uyumlu yapı)
├── cards/                      ← renk paleti ve tipografi kartları (PNG + SVG)
└── source/                     ← üretim kaynakları (HTML şablonları, Python üreticiler, master PNG'ler, ham ikon SVG'leri)
```

---

## 1. Logo

### 1.1 Yapı

Logo iki parçadan oluşur: **işaret (kalkan)** ve **logotype**.

- **İşaret:** Tabler Icons'un `shield-filled` kalkan formu, dikey eksende ikiye bölünmüştür — sol yarı **Kurumsal Lacivert** (`#172A4A`, güvenlik/otorite), sağ yarı **Klinik Teal** (`#0D7F79`, sağlık). Merkezde Tabler `plus` çizgisinden türetilen, yuvarlak uçlu kalın **beyaz sağlık artısı** yer alır. Kalkan + artı = "sağlığı koruyan güvenlik".
- **Logotype:** *Plus Jakarta Sans*. "Medical" Medium 500 / lacivert, "ISG" ExtraBold 800 / teal. Ağırlık kontrastı ürün adını (ISG) öne çıkarır. Harf aralığı −2.5%.
- **Slogan (opsiyonel):** "İŞ SAĞLIĞI VE GÜVENLİĞİ" — Plus Jakarta Sans SemiBold 600, büyük harf, +23% harf aralığı, Nötr 500 (`#677689`).

> Kaynak: İşaretteki kalkan ve artı formları elle çizilmemiş, **Tabler Icons (MIT)** kütüphanesinin gerçek SVG path'lerinden kompoze edilmiştir (`source/svgparts.py`, ham dosyalar `source/raw/logo/`).

### 1.2 Varyantlar

| Varyant | Dosya | Kullanım |
|---|---|---|
| Yatay — açık zemin | `logos/svg/medical-isg-horizontal-light.svg` | Uygulama üst barı, web sitesi header, e-posta imzası, rapor kapağı |
| Yatay — koyu zemin | `logos/svg/medical-isg-horizontal-dark.svg` | Koyu tema sidebar, footer, sunum kapağı |
| Yatay — mono siyah / beyaz | `…-horizontal-mono-black.svg`, `png/…-mono-white*.png` | Faks, damga, tek renk baskı, fotoğraf üstü |
| Stacked — açık / koyu | `logos/svg/medical-isg-stacked-{light,dark}.svg` | Giriş ekranı, kare alanlar, sosyal medya profili |
| Sadece ikon | `logos/svg/medical-isg-icon-{light,dark,mono-black}.svg` | Favicon, uygulama ikonu, daraltılmış sidebar, PDF filigranı |
| Uygulama ikonu (zeminli) | `logos/png/app-icon-{light,dark}-512.png` | PWA, mobil uygulama başlatıcı |

Koyu zemin varyantında işaretin sol yarısı **beyaz**, sağ yarısı **Teal 400** (`#3DBAB0`), artı **lacivert** olur; "ISG" Teal 400'e döner.

### 1.3 Boşluk payı (clear space)

Logonun çevresinde, **işaretin genişliğinin %50'si (= 0.5×)** kadar boş alan bırakılır. Bu ölçü "x" olarak adlandırılır ve kalkanın yarı genişliğine eşittir. Bu alana metin, görsel, kenar çizgisi veya başka logo giremez.

```
      ┌─────────── x ───────────┐
   x  │  [kalkan]  Medical ISG  │  x
      └─────────── x ───────────┘
```

### 1.4 Minimum boyut

| Varyant | Ekran | Baskı |
|---|---|---|
| Yatay (sloganlı) | 160 px genişlik | 40 mm |
| Yatay (slogansız kullanım gerekiyorsa sadece slogan çıkarılır) | 120 px | 30 mm |
| Stacked | 96 px genişlik | 25 mm |
| Sadece ikon | 16 px (favicon) — UI'da 24 px altı önerilmez | 6 mm |

Slogan 160 px'in altında okunaksızlaşır; daha küçük yerleşimlerde sloganı içermeyen kullanım için yalnızca ikon + "Medical ISG" metnini UI'da HTML olarak yazmayın — ikon varyantını tercih edin.

### 1.5 Yasak kullanımlar

1. Logoyu **gerdirmeyin / sıkıştırmayın** — oranı her zaman koruyun (`object-fit: contain`).
2. Kalkan renklerini **yer değiştirmeyin** (sol daima lacivert/beyaz, sağ daima teal) ve palet dışı renk kullanmayın.
3. Logoya **gölge, parlama, 3B, gradyan, kontur** eklemeyin.
4. "Medical" ve "ISG" ağırlıklarını **eşitlemeyin**, yazıtipini değiştirmeyin, "ISG"yi "İSG" olarak yazmayın (marka adı Latin ISG'dir; slogan Türkçe karakterlidir).
5. İşareti **döndürmeyin**, kırpmayın, içindeki artıyı başka sembolle (kalp, yıldız vb.) değiştirmeyin.
6. Açık varyantı koyu zemine, koyu varyantı açık zemine **koymayın**; karmaşık fotoğraf üzerinde yalnızca mono-beyaz varyantı yarı saydam koyu bir katman üzerinde kullanın.
7. Logoyu **cümle içinde kelime olarak** kullanmayın; metin içinde marka adı düz metin "Medical ISG" olarak yazılır.
8. Hi-Vis Turuncu **logoda kullanılmaz** — turuncu, arayüzde dikkat ve eylem rengidir.

---

## 2. Renk sistemi

### 2.1 Felsefe

| Rol | Renk | Neden |
|---|---|---|
| **Primary — Klinik Teal** `#0D7F79` | Sağlık, hijyen, sakinlik | Klasik "hastane yeşili"nden daha derin ve kurumsal; mavi-yeşil aralığı tıbbi güveni çağrıştırır, rakip ISG yazılımlarının doygun mavisinden ayrışır. |
| **Secondary — Kurumsal Lacivert** `#172A4A` | Otorite, ciddiyet, B2B güven | Holding/AŞ müşterilerine hitap eden ağır, güvenilir zemin; koyu tema ve sidebar'ın ana rengi. |
| **Accent — Hi-Vis Turuncu** `#FF5A10` | Saha güvenliği, farkındalık | Yüksek görünürlüklü iş güvenliği yeleklerinin rengi. **Az kullanılır**: birincil CTA ("Olay bildir"), dikkat çeken rozetler, aktif saha göstergeleri. |
| Success / Warning / Danger / Info | Durum renkleri | Risk seviyeleri (düşük/orta/yüksek), görev durumları, sistem mesajları. |
| Neutral — Arduvaz | Metin ve yüzey | Hafif soğuk (mavi alt tonlu) griler; teal ve lacivertle uyumlu, "klinik" temizlik hissi. |

**Oran kuralı (60-30-10):** %60 nötr yüzeyler · %30 lacivert + teal · %10'dan az turuncu ve durum renkleri.

### 2.2 Renk ölçekleri (50–950)

Kontrast değerleri WCAG 2.1 bağıl parlaklık formülüyle hesaplanmıştır. **✓AA** = normal metin için ≥ 4.5:1; "büyük metin/UI" = ≥ 3:1 (18.66px+ kalın / 24px+ metin, ikonlar, kenarlıklar). CMYK değerleri RGB'den matematiksel dönüşümdür; ofset baskıda matbaanın ICC profiliyle (ör. ISO Coated v2 / FOGRA39) prova alınmalıdır.

{{SCALES}}

### 2.3 Semantik tokenlar (açık / koyu tema)

UI kodunda **ham ölçek renkleri yerine semantik tokenlar** kullanılır; tema değişince yalnızca bu eşlemeler değişir.

{{SEMANTIC}}

### 2.4 Doğrulanmış kontrast eşleşmeleri

{{PAIRS}}

**Kritik kurallar**

- **Turuncu buton üzerinde beyaz metin kullanmayın** (Accent 500 + beyaz = 3.12:1, AA'yı geçmez). Hi-Vis estetiğine uygun olarak turuncu buton metni **koyu** (`--mi-accent-fg` = Nötr 950, 6.15:1) yazılır. Beyaz zemin üzerinde turuncu *metin* gerekiyorsa `accent.700` (`#C72D07`, 5.52:1) kullanılır.
- Yeşil metin için açık temada `success.700`, bilgi metni için `info.700` kullanılır (600 tonları 4.5:1'in altında).
- Durum yalnızca renkle anlatılmaz: risk rozetlerinde daima ikon + etiket birlikte kullanılır (renk körlüğü erişilebilirliği).

### 2.5 Risk seviyesi eşlemesi (ISG'ye özel)

| Seviye | Token | Rozet | İkon |
|---|---|---|---|
| Kabul edilebilir / Düşük | `success` | `success-soft` zemin + `success` metin | `compliance` |
| Orta / Dikkat | `warning` | `warning` zemin + `warning-fg` metin | `hazard` |
| Yüksek | `accent` (turuncu) | `accent` zemin + `accent-fg` metin | `hazard` |
| Kritik / Kabul edilemez | `danger` | `danger` zemin + beyaz metin | `fire` / `hazard` |
| Bilgi / Planlı | `info` | `info-soft` zemin + `info` metin | `calendar` |

---

## 3. Tipografi

| Aile | Rol | Ağırlıklar | Kaynak |
|---|---|---|---|
| **Plus Jakarta Sans** | Logo, display, H1–H4, KPI rakamları | 500, 600, 700, 800 | Google Fonts (OFL) |
| **Inter** | Tüm arayüz metni, tablo, form, gövde | 400, 500, 600, 700 | Google Fonts (OFL) |
| JetBrains Mono (opsiyonel) | Kod, kayıt numarası, log | 400 | Google Fonts (OFL) |

İki aile de Türkçe karakter setini (Ç Ğ İ Ö Ş Ü ı) tam destekler. Tablolarda Inter'in tabular rakamlarını açın: `font-feature-settings: "tnum"` (Tailwind: `tabular-nums`).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

KVKK/çevrimdışı dağıtım için fontları `@fontsource/inter` ve `@fontsource/plus-jakarta-sans` paketleriyle self-host edebilirsiniz.

### 3.1 Tip ölçeği

| Token | Boyut / Satır | Harf aralığı | Ağırlık | Aile |
|---|---|---|---|---|
| `display-2xl` | 60 / 68 px | −2.5% | 800 | Plus Jakarta Sans |
| `display-xl` | 48 / 56 px | −2.5% | 800 | Plus Jakarta Sans |
| `display-lg` | 36 / 44 px | −2% | 700 | Plus Jakarta Sans |
| `h1` | 30 / 38 px | −2% | 700 | Plus Jakarta Sans |
| `h2` | 24 / 32 px | −1.5% | 700 | Plus Jakarta Sans |
| `h3` | 20 / 28 px | −1% | 600 | Plus Jakarta Sans |
| `h4` | 18 / 26 px | −0.5% | 600 | Plus Jakarta Sans |
| `body-lg` | 18 / 28 px | 0 | 400 | Inter |
| `body` | 16 / 24 px | 0 | 400 | Inter |
| `body-sm` | 14 / 20 px | 0 | 400 | Inter |
| `caption` | 12 / 16 px | +1% | 500 | Inter |
| `overline` | 12 / 16 px | +12% | 600, BÜYÜK HARF | Inter |

Tailwind'de: `text-h1`, `text-body-sm`, `text-overline` … (`tailwind.brand.js` ile gelir). Yoğun veri tablolarında `body-sm` (14px) alt sınırdır; 12px yalnızca yardımcı etiketlerde kullanılır.

---

## 4. İkonografi

### 4.1 Sistem kuralları

| Kural | Değer |
|---|---|
| Birincil set | **Tabler Icons** (MIT) — 6.000+ ikonla gelecekteki modüllerin tamamını karşılar |
| Izgara | 24 × 24 px, 2 px iç boşluk (canlı alan 20 × 20) |
| Kontur | **1.75 px** (Tabler varsayılanı 2 px'ten marka için inceltildi), `stroke-linecap/linejoin: round` |
| Renk | Tek renk, `stroke="currentColor"` — rengi metin renginden/semantik tokendan alır |
| Boyutlar | 16 (yoğun tablo), 20 (buton/menü — varsayılan), 24 (başlık/boş durum), 32+ (illüstratif) |
| Dolgu | Kontur stil esastır; dolu (filled) varyant yalnızca **seçili/aktif** durumda kullanılır |
| Eksik ikon | Tabler'da bulunmayan **KKD / Baret** için aynı ızgara ve stil ailesindeki **Lucide** (ISC) `hard-hat` kullanıldı |

### 4.2 Birincil set (`icons/primary-tabler/`)

| Dosya | Anlam (TR) | Kaynak |
|---|---|---|
{{ICONS}}

### 4.3 Alternatif setler

`icons/alt-iconsax-linear/` (Iconsax Linear, 1.5 px, resmi `iconsax` npm verisinden) ve `icons/alt-iconly-light/` (Iconly Light, 1.5 px, resmi `react-iconly` bileşenlerinden render edildi) aynı semantik isimlerle sunulmuştur. **Bir ekranda yalnızca tek set kullanın**; alternatifler pazarlama sitesi, sunum veya ileride tercih değişikliği için yedektir.

### 4.4 React'te kullanım

Önerilen yol, aynı ikonları kod paketinden almak (tree-shaking + tip güvenliği):

```bash
npm i @tabler/icons-react
```

```tsx
import { IconLayoutDashboard, IconAlertTriangle } from '@tabler/icons-react';

<IconAlertTriangle size={20} stroke={1.75} className="text-[var(--mi-warning)]" aria-hidden />
```

Alternatif: `icons/primary-tabler/*.svg` dosyalarını `vite-plugin-svgr` ile bileşen olarak içe aktarın (`import Hazard from './icons/hazard.svg?react'`). Anlam taşıyan tek başına ikonlara `aria-label`, dekoratif ikonlara `aria-hidden` ekleyin.

### 4.5 Açık / koyu tema

İkonlar renk içermez; temaya uyum `currentColor` ile otomatiktir. Varsayılan ikon rengi `--mi-text-muted`, aktif/seçili `--mi-text-brand`, durum ikonları ilgili semantik token (`--mi-warning`, `--mi-danger` …). Koyu temada ikon kutusu zemini `--mi-surface-raised`.

---

## 5. Koyu / açık tema ilkeleri

1. **Tema anahtarı:** `<html data-theme="dark">` veya `class="dark"`. Hiçbiri yoksa `prefers-color-scheme` uygulanır (`brand-tokens.css`).
2. **Koyu tema saf siyah değildir:** zemin Nötr 950 `#0A0F17`, kartlar Nötr 900/800 — derinlik gölgeyle değil **yüzey tonu yükseltmesiyle** verilir.
3. **Marka rengi koyu temada açılır:** Teal 600 → Teal 400; buton metni koyu (Teal 950) olur.
4. **Doygunluk kontrolü:** Koyu temada durum renkleri 400 tonundan, "soft" zeminler düşük parlaklıklı özel tonlardan gelir — göz yormaz.
5. **Görseller:** Delil fotoğrafları ve PDF önizlemeleri her iki temada da beyaz/nötr çerçeveyle gösterilir; renk değiştirilmez (delil bütünlüğü).
6. **Logo:** Açık temada `*-light`, koyu temada `*-dark` varyantı. React'te: `<picture>` + `prefers-color-scheme` veya tema state'ine göre `src` seçimi.

---

## 6. Kurulum (Vite + React + TypeScript)

```bash
cp -r tokens/ src/styles/brand/
cp favicon/* public/
```

```css
/* src/index.css */
@import './styles/brand/brand-tokens.css';
@tailwind base; @tailwind components; @tailwind utilities;
body { background: var(--mi-background); color: var(--mi-text); font-family: var(--mi-font-body); }
```

```js
// tailwind.config.js
module.exports = {
  presets: [require('./src/styles/brand/tailwind.brand.js')],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
};
```

```html
<!-- index.html <head> -->
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#172A4A">
```

Örnek kullanım: `bg-brand text-brand-fg hover:bg-brand-hover`, `bg-surface border border-line`, `text-content-muted`, `bg-accent-500 text-neutral-950`, `ring-primary-500`.

---

## 7. Dosya formatları ve teknik notlar

- **SVG (birincil):** Logo ve kart SVG'leri, yüksek çözünürlüklü (2×) master render'lardan vektörleştirilmiştir ve renkleri marka hex değerlerine sabitlenmiştir. Logotype yazıtipleri path'e dönüştürülmüştür (font bağımlılığı yoktur).
- **UI ikon SVG'leri** kütüphanelerin orijinal path verisidir (yeniden çizim yok); her dosyanın başında kaynak ve lisans yorumu vardır.
- **PNG:** Şeffaf zemin (uygulama ikonları hariç). Yatay logo 1200×400 (1x) ve 2400×800 (2x).
- **WebP:** Kalite 95, şeffaflık korunur — web sitesinde PNG yerine tercih edin.
- **Kaynaklar:** `source/` klasöründeki Python üreticiler (`tokens.py`, `logo_gen.py`, `cards.py`) tüm token ve logo dosyalarını yeniden üretir; renk değişikliği tek noktadan (`tokens.py`) yapılır.

## 8. Lisanslar

| Varlık | Lisans |
|---|---|
| Tabler Icons (birincil ikonlar + logo işaretinin kalkan/artı formları) | MIT © Paweł Kuna |
| Lucide `hard-hat` | ISC © Lucide Contributors |
| Iconsax (alternatif set) | MIT © Vuesax |
| Iconly (alternatif set, react-iconly) | MIT |
| Plus Jakarta Sans, Inter | SIL Open Font License 1.1 |

MIT/ISC lisansları ticari kullanıma ve değişikliğe izin verir; lisans metinleri `source/LICENSES.md` dosyasındadır. Logo işareti açık kaynak formlardan kompoze edildiği için **tescil başvurusu öncesinde bir marka vekiliyle ayırt edicilik değerlendirmesi** yapılması önerilir.

---

*Medical ISG Brand Kit v2.0 · Ekim 2026*
