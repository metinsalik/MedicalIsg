# Design-System — Medical ISG

| Alan | Değer |
|---|---|
| Sürüm | 1.0 |
| Tarih | 18 Ekim 2026 |
| Çerçeve | Vite + React + TypeScript · Tailwind CSS · **shadcn/ui** (Radix primitives) |
| Kaynak | `Medical_ISG_Brand_Kit_v2` → `BRANDING.md` + `tokens/` (bu doküman o tokenların uygulama kuralıdır) |

Bu doküman, platformun tüm ekranlarında **renk, tipografi, boşluk, radius, gölge ve bileşen** kullanımını sabitler. Amaç: tasarımda hiçbir şeyin rastgele görünmemesi. Uygulama kodu üretmez; UI geliştiricisinin (insan veya AI ajan) uyması gereken **tek kaynak**tır.

---

## 1. Token Mimarisi

Tokenlar üç katmanda tutulur ve **asla ham hex ile doğrudan bileşene** yazılmaz:

```
marka düzeyi  →  scales (50–950) + marka semantic  →  BRANDING.md
uygulama düzeyi →  shadcn/tailwind eşlemeleri (--background, --primary, ...) → tailwind.brand.js
bileşen düzeyi →  yalnızca Tailwind sınıfları / shadcn değişken kullanımı
```

- Kaynak token dosyaları: `tokens/brand-tokens.css`, `tokens/tailwind.brand.js`, `tokens/brand-tokens.json`.
- Yeni renk/ölçü ihtiyacı: önce paletten scale alınır; **palette dışı renk eklemek yasaktır** (istisna yalnızca tasarım ekibi onayıyla ve önce token'a işlenerek).

---

## 2. Renk Sistemi

### 2.1 Marka Paleti (50–950 ölçekleri)

Ölçekler Tailwind tarzı 50→950'dir; her rengin `--color-<ad>-<basamak>` CSS değişkeni vardır. Ana renkler:

#### Klinik Teal — Birincil (sağlık güveni)

| Adım | Hex | Kullanım |
|---|---|---|
| 50 | `#EEFBF9` | Çok açık zeminler, seçili satır arkası |
| 100 | `#D3F4EF` | Badge arkası (soft), hover zemin |
| 200 | `#A9E8E0` | İstek/onay vurgu zeminleri |
| 300 | `#72D5CB` | Koyu temada brand text |
| 400 | `#3DBAB0` | Koyu temada brand, link hover |
| 500 | `#179E95` | Focus halkası (ring), grafik orta ton |
| **600** | `#0D7F79` | **Birincil buton/brand** (açık tema) |
| 700 | `#0E6662` | Buton hover, brand text (açık) |
| 800 | `#10514F` | Basılı buton, koyu zemin üstü |
| 900 | `#0F4342` | Koyu zemin üstü başlıklar |
| 950 | `#042827` | En koyu varyant (dark gradient) |

#### Kurumsal Lacivert — İkincil (otorite/ciddiyet)

| Adım | Hex | Kullanım |
|---|---|---|
| 50–500 | `#F0F5FB` → `#4472B8` | Açık tonlar: nav hover zemin, mavi bağlantılar |
| 600 | `#34599B` | İkincil buton varsayılanı |
| **700** | `#2C477E` | İkincil hover |
| 800 | `#263C68` | Basılı, koyu modda yüzey vurgu |
| **900** | `#172A4A` | **Surface-inverse**, üst bar, sidebar (açık tema), logo sol yarı |
| 950 | `#0D1A30` | En koyu tema yüzeyi (opsiyonel) |

#### Hi-Vis Turuncu — Aksan (saha farkındalığı / uyarı CTA)

| Adım | Hex | Kullanım |
|---|---|---|
| 50 | `#FFF5ED` | Aksan soft zemin |
| 200 | `#FFCDA8` | Banner arka planı (yumuşak) |
| 400 | `#FF7B37` | Koyu temada aksan ve aksan hover |
| **500** | `#FF5A10` | **Aksan / kritik CTA** (örn. "Acil durum", uyarı banner'ı) |
| 600 | `#F03F06` | Aksan hover (açık tema) |
| 700 | `#C72D07` | Aksan metin (açık tema, kontrast) |
| 900 | `#7F220F` | Aksan metin koyu tonlar |

> Kurallar: Hi-Vis Turuncu **yüksek önem ve aksiyon** için saklanır; normal CTA'larda değil. Turuncu zemin üzerinde metin `neutral.950` (`#0A0F17`) veya beyaz — kontrast oranına göre (bkz. §2.4).

### 2.2 Durum Renkleri (Semantik)

| Durum | Açık tema (hex) | Koyu tema (hex) | Kullanım alanı |
|---|---|---|---|
| **Success** (uygun) | `#15803D` (700) | `#4ADE80` (400) | Tamamlanmış görev, uygun, düşük risk, olumlu doğrulama |
| **Warning** (dikkat) | `#F59E0B` (500) · zemin metni `neutral.950` | `#FBBF24` (400) | Orta risk, yaklaşan tarih, eksik belge |
| **Danger** (kritik) | `#DC2626` (600) | `#F87171` (400) | Yüksek risk, kaza/olay, hata, kalıcı silme |
| **Info** (bilgi) | `#1D61D8` (700) | `#60B5FA` (400) | Bilgilendirme, sistem mesajı, link |
| **Neutral** (tarafsız) | `neutral.600` `#4B596B` | `neutral.300` `#CBD4DF` | Bilgilendirici metin, ikincil |

Her durum rengi için **soft zemin** varyantları: `success-50` (`#F0FDF4`), `warning-50` (`#FFFBEB`), `danger-50` (`#FEF2F2`), `info-50` (`#EFF8FF`) — badge/tag arka planı olarak; koyu temada bunların koyu karşılıkları (`#0C2A17`, `#2E2108`, `#3A1212`, `#0F2440`) kullanılır.

**Risk düzeyi → renk eşlemesi (İSG):**

| Risk düzeyi | Renk | Örnek UI |
|---|---|---|
| Düşük | success | Badge yeşil |
| Orta | warning | Badge amber |
| Yüksek | danger | Badge kırmızı |
| Kritik | danger + aksan ikon | Badge kırmızı + ünlem/triangle ikonu, shimmer yok |

### 2.3 Nötr Ölçek — Arduvaz (metin/zemin/anahat)

| Adım | Hex | Kullanım |
|---|---|---|
| 50 | `#F7F9FB` | Arka plan subtle (background-subtle) |
| 100 | `#EEF2F6` | Sunken yüzey, tablo bandı |
| 200 | `#E2E8EF` | **Border** (v1) |
| 300 | `#CBD4DF` | Border-strong; koyu temada muted text |
| 400 | `#97A4B5` | Disabled, ikon (koyu temada) |
| 500 | `#677689` | Text-subtle, placeholder |
| 600 | `#4B596B` | **Text-muted** (açık tema) |
| 700 | `#374456` | Koyu temada border-strong |
| 800 | `#222D3B` | Koyu temada surface-raised |
| **900** | `#131B26` | **Text** (açık tema); koyu temada surface |
| 950 | `#0A0F17` | Koyu temada background; gölge rengi |

### 2.4 Erişilebilirlik ve Kontrast

- Metin için WCAG **AA (4.5:1)**, büyük metin/UI elemanı için **3:1** hedefi. Token dosyasında her scale basamağının beyaz ve `neutral.950` üzerine kontrastı hesaplanmıştır (`brand-tokens.json`).
- Aksan (turuncu) birincil CTA olarak kullanılıyorsa **metin rengi** `neutral.950` tercih edilir (kontrast daha yüksek).
- Beyaz zemin üstünde `primary.600` (`#0D7F79`) üzerine beyaz metin: kontrast 4.85:1 → AA ✓. Bacak: `primary.500` üzerine beyaz yazmak kontrast 3.3:1 ile **AA (normal metin) geçmez** — sadece büyük UI/ikon için.
- Focus halkası: `border-focus` `primary.500` + 3px `rgba(23,158,149,.35)` gölge (klavye kullanıcıları için zorunlu).

### 2.5 Açık / Koyu Tema Eşlemeleri (shadcn değişkenlerine)

**Açık tema:**

| shadcn değişkeni | Değer | Kaynak |
|---|---|---|
| `--background` | `#FFFFFF` | background |
| `--foreground` | `#131B26` | neutral.900 |
| `--card` / `--popover` | `#FFFFFF` | surface |
| `--card-foreground` / `--popover-foreground` | `#131B26` | text |
| `--primary` | `#0D7F79` | primary.600 |
| `--primary-foreground` | `#FFFFFF` | brand-fg |
| `--secondary` | `#172A4A` | secondary.900 |
| `--secondary-foreground` | `#FFFFFF` | — |
| `--muted` | `#EEF2F6` | neutral.100 |
| `--muted-foreground` | `#4B596B` | text-muted |
| `--accent` | `#EEFBF9` | primary.50 |
| `--accent-foreground` | `#0E6662` | primary.700 |
| `--destructive` | `#DC2626` | danger.600 |
| `--destructive-foreground` | `#FFFFFF` | — |
| `--border` | `#E2E8EF` | neutral.200 |
| `--input` | `#CBD4DF` | neutral.300 |
| `--ring` | `#179E95` | border-focus (primary.500) |
| `--radius` | `0.5rem` (8px) | radius.md |

**Koyu tema:**

| shadcn değişkeni | Değer | Kaynak |
|---|---|---|
| `--background` | `#0A0F17` | neutral.950 |
| `--foreground` | `#F7F9FB` | neutral.50 |
| `--card` / `--popover` | `#131B26` | surface (neutral.900) |
| `--card-foreground` | `#F7F9FB` | text |
| `--primary` | `#3DBAB0` | primary.400 |
| `--primary-foreground` | `#042827` | primary.950 |
| `--secondary` | `#222D3B` | neutral.800 (surface-raised) |
| `--secondary-foreground` | `#F7F9FB` | text |
| `--muted` | `#222D3B` | neutral.800 |
| `--muted-foreground` | `#CBD4DF` | neutral.300 |
| `--accent` | `#0B2E2C` | brand-soft dark |
| `--accent-foreground` | `#72D5CB` | primary.300 |
| `--destructive` | `#F87171` | danger.400 |
| `--destructive-foreground` | `#450A0A` | danger.950 |
| `--border` | `#222D3B` | neutral.800 |
| `--input` | `#374456` | neutral.700 |
| `--ring` | `#3DBAB0` | primary.400 |

> Tema anahtarı: `dark` class (Tailwind). Hem açık hem koyu gece/gündüz aynı bileşenler test edilir.

---

## 3. Tipografi

### 3.1 Font Aileleri

| Aile | Kullanım | Ağırlıklar | Kaynak |
|---|---|---|---|
| **Plus Jakarta Sans** | Başlıklar (display, H1–H4), logo, KPI rakamları | 500, 600, 700, 800 | Google Fonts OFL |
| **Inter** | Gövde metni, tablo, form, bildirim, etiket | 400, 500, 600, 700 | Google Fonts OFL |
| **JetBrains Mono** (ops.) | Kayıt numarası, log kodları, monospace alanlar | 400 | Google Fonts OFL |

Türkçe karakter seti (Ç Ğ İ Ö Ş Ü ı) iki ana aile tarafından desteklenir. Tablolarda `tabular-nums` (Inter tnum) kullanılır.

Yükleme (Vite `index.html`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

KVKK/çevrimdışı dağıtım: `@fontsource/inter` + `@fontsource/plus-jakarta-sans` self-host.

### 3.2 Tipografi Skalası

| Token | Boyut / Satır (px) | Harf aralığı | Ağırlık | Aile |
|---|---|---|---|---|
| `display-2xl` | 60 / 68 | −2.5% | 800 | Plus Jakarta Sans |
| `display-xl` | 48 / 56 | −2.5% | 800 | Plus Jakarta Sans |
| `display-lg` | 36 / 44 | −2% | 700 | Plus Jakarta Sans |
| `h1` | 30 / 38 | −2% | 700 | Plus Jakarta Sans |
| `h2` | 24 / 32 | −1.5% | 700 | Plus Jakarta Sans |
| `h3` | 20 / 28 | −1% | 600 | Plus Jakarta Sans |
| `h4` | 18 / 26 | −0.5% | 600 | Plus Jakarta Sans |
| `body-lg` | 18 / 28 | 0 | 400 | Inter |
| `body` | 16 / 24 | 0 | 400 | Inter |
| `body-sm` | 14 / 20 | 0 | 400 | Inter |
| `caption` | 12 / 16 | +1% | 500 | Inter |
| `overline` | 12 / 16 | +12% | 600 | Inter |

### 3.3 Tipografi Kuralları

- Sayfa başlığı: `h1`; bölüm başlığı `h2`; kart başlığı `h3`. Bir seviye atlanmaz (h1→h3 geçilmez).
- KPI/sayı vurguları: `display-lg`–`display-xl`, Plus Jakarta Sans 800 + `tabular-nums`.
- Uzun gövde metinleri Inter; satır uzunluğu 60–80 karakter.
- `overline` yalnızca bölüm üst etiketi/slogan için (büyük harf, geniş harf aralığı).
- Paragraf ardı boşluğu: 16px (spacing-4).

---

## 4. Boşluk (Spacing), Radius, Gölge

### 4.1 Boşluk Sistemi

Taban: **4px**. Tailwind spacing ile birebir.

| Token | px | Kullanım |
|---|---|---|
| `space-1` | 4 | İkon içi, kompakt öğe arası |
| `space-2` | 8 | Buton içi ikon-başlık, liste öğesi içi |
| `space-3` | 12 | Input içi, kart içi küçük bloklar |
| `space-4` | 16 | Kart içi bloklar, satır arası (standart) |
| `space-6` | 24 | Kart arası, form bölümleri |
| `space-8` | 32 | Sayfa bölümleri, modal padding |
| `space-12` | 48 | Sayfa yan boşlukları (geniş ekran) |
| `space-16` | 64 | Maksimum ayırıcı (hero) |

Kurallar:
- Kart iç yatay boşluğu **space-6 (24px)**, dikey **space-4 (16px)** standardı.
- Form input'ları arası dikey **space-4**; aynı satırda grid gap **space-3**–**space-4**.
- Table hücreleri: yatay **space-4**, dikey **space-3**.
- Oran mantığı: iç elemanların boşlukları dış boşluklardan küçük olmalı (`4 < 8 < 16 < 24 < 32`).

### 4.2 Radius

| Token | Değer | Kullanım |
|---|---|---|
| `radius-sm` | 6px | Badge, küçük kontroller, input |
| `radius-md` | **8px** | Buton, input, kart, tablo hücre vurgusu (**varsayılan**) |
| `radius-lg` | 12px | Kart, modal, dropdown, form container |
| `radius-xl` | 16px | Dialog geniş alan, sayfa kartı hero |
| `radius-2xl` | 24px | Özel büyük yüzeyler (progress, sayı bloğu) |
| `radius-full` | 9999px | Pill badge, avatar, ikon butonu (kare değil) |

Tutarlılık: aynı bileşen aynı radius kullanır; örn. tüm kartlar `lg`, tüm butonlar `md`, tüm inputlar `md`, tüm badge'ler `full` (pill).

### 4.3 Gölgeler

| Token | Değer | Kullanım |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(10,15,23,.06)` | Alt çizgi vurgusu |
| `shadow-sm` | `0 1px 3px rgba(10,15,23,.08), 0 1px 2px rgba(10,15,23,.04)` | Kart varsayılanı |
| `shadow-md` | `0 4px 12px -2px rgba(10,15,23,.10), 0 2px 4px -2px rgba(10,15,23,.06)` | Dropdown, popover |
| `shadow-lg` | `0 12px 32px -8px rgba(10,15,23,.16)` | Modal, drawer, float action |
| `shadow-focus` | `0 0 0 3px rgba(23,158,149,.35)` | Klavye odak halkası (yalnız) |

---

## 5. İkonografi

- **Birincil UI seti:** Tabler Icons (MIT) — 46 ikon `icons/primary-tabler/` altında; stroke temelli, tümü 24×24 grid, 2px boşluk.
- **Alternatif setler:** Iconsax Linear (32) ve Iconly Light (32) — aynı 24px grid; tema kapsamında set karıştırılmaz.
- İkon kullanım kuralları:
  - Varsayılan: 20px (UI) / 24px (boş durum, sayfa ikonu) / 16px (kompakt, tablo).
  - Tek renk: `currentColor`; zemin kontrastına göre `text-muted` (`neutral.600`) veya `text-primary`.
  - Anlamlı ikon eşlemesi (ürün dilinde sabit): risk → `gauge`/`alert-triangle`; kaza → `ambulance`; KKD → `hard-hat` (lucide); delil fotoğrafı → `camera`; görev → `clipboard-check`; atık → `flame`/`recycle`; rapor → `report`; 2FA → `shield-lock`.
  - Ikonlar dekorasyon için değil, **anlam iletmek için** kullanılır; her ikonun alt metni/araç ipucu olmazsa ikon kullanılmaz.
- İkon envanteri: `tokens/brand-tokens.json` → `"icons"`.

---

## 6. Bileşen Kuralları (shadcn/ui)

Aşağıdaki shadcn/ui bileşenleri proje standartlarıdır; özelleştirme yalnızca token üzerinden (renk, radius, spacing) yapılır, davranış/API değiştirilmez.

### 6.1 Form

| Bileşen | Not |
|---|---|
| `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `Slider` | Varsayılan shadcn; `Select` tenant ayarlarında "---" boş seçenek gösterir |
| `Label` | `body-sm`, muted; zorunlu alan `*` danger rengi |
| `Form` (react-hook-form + zod) | Doğrulama iki katmanlı: alan bazlı + form bazlı hata mesajları `danger` |
| `DatePicker` (Calendar + Popover) | Tarih formatı `DD.MM.YYYY` (TR) |
| `FileUpload` (custom) | Foto ≤ 10MB, PDF ≤ 25MB; sürükle-bırak; ilerleme çubuğu; TIFF/RAW red (uyarı banner'ı) |
| `Badge` | Durum etiketleri: success/warning/danger/info; pill radius |

### 6.2 Navigasyon ve Yapı

| Bileşen | Not |
|---|---|
| `Sidebar` (custom) | Açık tema: `surface-inverse` (secondary.900) zemin, beyaz metin; daraltılabilir; ikon+grup başlıkları |
| `Breadcrumb` | 2. seviyeden sonra; son öğe kalın `h4` |
| `Tabs` | Modül içi alt modüller arası geçiş (radix variant) |
| `Accordion`, `Collapsible` | Uzun form bölümleri / denetim bulguları |
| `DropdownMenu` | Eylem menüleri; `shadow-md` |
| `Sheet` | Mobil menü ve detay panelleri (sağdan) |
| `Command` (komut paleti) | Global arama (v1 sonrası) |

### 6.3 Veri Gösterimi

| Bileşen | Not |
|---|---|
| `Table` | Sabit header; `tabular-nums` sayılar; satır hover `neutral.50`/`100`; seçili satır `primary.50` + sol akçaağaç şerit yok (sadelik) |
| `DataTable` (TanStack) | Filtre, sıralama, sayfalama (sayfa başına 25/50/100); CSV dışa aktarma |
| `Card` | `radius-lg`, `shadow-sm`, iç padding `space-6/4`; başlık `h3` |
| `StatCard` (custom) | KPI: değer `display-lg` PJS 800 + `tabular-nums`, etiket `body-sm` muted, delta ikon trend |
| `Badge` durumları | Risk/uygunluk göstergeleri için §2.2 renkleri |
| `Progress` | Onay işlemi, anket tamamlama; `primary` dolu bar |
| `Alert` | `success`/`warning`/`danger`/`info` variantları; icon + başlık + metin |

### 6.4 Geri Bildirim ve Overlay

| Bileşen | Not |
|---|---|
| `Button` | Variants: `default` (primary.600), `secondary` (secondary.900), `destructive` (danger.600), `outline` (border), `ghost`, `link`; boyutlar `sm`/`default`/`lg`/`icon`; ikon+label uyumu; loading state (spinner) |
| `Dialog` | Varsayılan onay formları; `shadow-lg`, `radius-xl`; erişilebilir focus trap (radix) |
| `AlertDialog` | **Silme** ve geri döndürülemez işlemler için; danger buton onayı |
| `Toast` | Kısa geri bildirim (sağ üst); `success` (onay), `error` (hata), `info` |
| `Tooltip` | İkonların anlamı; gecikme 300ms |
| `Skeleton` | Veri yüklenirken; `neutral.100`/`200` yumuşak nabız |

### 6.5 ISG'ye Özel Bileşenler

| Bileşen | Açıklama |
|---|---|
| `RiskMatrix` (custom) | 5×5 olasılık×şiddet matrisi; hücre renkleri success→danger; seçili hücre net vurgulu; hover tooltip "olasılık x şiddet – sonuç puanı" |
| `EvidenceGallery` (custom) | Delil fotoğrafları: tam ekran lightbox, EXIF/konum/tarih üstü bilgi çubuğu, "orijinal saklandı" rozeti |
| `SignaturePad` (custom) | Denetim/onay imza alanı; e-imza görseli + zaman damgası |
| `AuditTrailTimeline` (custom) | Kayıt değişim geçmişi (kim/ne/ne zaman); geçerli olay zinciri görünümü |
| `ChecklistRunner` (custom) | Kontrol listesi doldurma: evet/hayır/NA, bulgu ekleme, fotoğraf eki, ilerleme çubuğu, imza onayı |
| `TenantSettingsForm` (custom) | 0. Katman ayar grupları (e-posta/telegram/bildirim/bölüm/kategori); bölüm tab'ları; kaydet ÖNCE canlı önizleme |

### 6.6 Bileşen Geliştirme İlkeleri

1. Yeni bileşen önce bu dokümanda tanımlanır, sonra `components/ui/` altında kurulur.
2. Stil token'ları dışına çıkılmaz; bileşen içine ham hex/spacing yazılmaz.
3. Tüm etkileşimli bileşenler klavye ile tam kullanılabilir (tab, enter, escape) ve `aria` uyumludur.
4. Tekil sorumluluk: bileşenler veri çekmez; props ile beslenir (server components ayrışması v1'de client tarafı).
5. Yükleme, boş durum, hata durumu her veri bileşeninde zorunludur.

---

## 7. Ekran Düzeni Kuralları (Layout)

- **Uygulama iskeleti:** Sol sidebar (daraltılabilir) + üst bar (arama, bildirim çanı, kullanıcı menüsü) + içerik alanı.
- İçerik maksimum genişlik: 1440px; sayfa yan padding `space-8` (mobil `space-4`).
- Mobil (Faz 2 uyumu): 640px altında sidebar `Sheet`'e dönüşür; tablolar kart görünümüne (responsive data table) geçebilir — v1'de yatay kaydırma kabul edilebilir.
- Boş durumlar: orta sayfada `space-8` içinde ikon (48px), başlık `h3`, açıklama `body-sm` muted, aksiyon butonu.
- Form iki sütunlu grid (640px üzeri), mobil tek sütun; zorunlu alan işareti `*` danger.

---

## 8. Koyu Tema İlkeleri

- Tema, `dark` class ile; geçiş `localStorage` + sistem tercihi (ilk açılış).
- Koyu temada brand `primary.400`, aksan `accent.400`, durum renkleri yukarıdaki eşlemede (daha parlak tonlar).
- Koyu zeminde gölge yerine **kenarlık ayrımı** önceliklidir (`border-neutral-800`).
- Hiçbir yerde tam siyah (#000) kullanılmaz; en koyu `neutral.950` (`#0A0F17`).

---

## 9. Kural Olgunu (Do's & Don'ts)

**Do:**
- Renk, tipografi, spacing, radius, icon — her zaman token üzerinden.
- Risk/önem bilgisini renk + ikon + metin ile birlikte ver (renk tek başına değil).
- Tablolarda `tabular-nums`, tarihlerde TR formatı.
- Odak halkasını her zaman koru (klavye erişim).

**Don't:**
- Palette dışı hex, yeni font, yeni radius tanımlama (onaysız).
- Aksan turuncuyu normal CTA'larda kullanma.
- Aynı bileşen farklı ekranda farklı görünmesin (stil varyantı ekleme).
- İkon olmadan yalnız ikon dekoru; ikon alt metinsiz bırakma.
- `danger` rengini onay gerektiren geri dönülemez işlemler dışında silme butonuna koymamak/koymak kurallara aykırı.

---

## 10. Onay ve Değişiklik

| Tarih | Sürüm | Değişiklik |
|---|---|---|
| 2026-10-18 | 1.0 | İlk sürüm (BRANDING.md v2 tokenlarına dayalı) |

Bu dokümandaki tüm token değerleri `Medical_ISG_Brand_Kit_v2` paketiyle senklidir; paket güncellenirse buradaki eşlemeler de gözden geçirilir.
