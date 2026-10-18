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
│   ├── primary-tabler/         ← 46 ikon — BİRİNCİL UI seti (Tabler Icons, MIT)
│   ├── alt-iconsax-linear/     ← 32 ikon — alternatif set (Iconsax Linear, MIT)
│   ├── alt-iconly-light/       ← 32 ikon — alternatif set (Iconly Light, MIT)
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

#### Klinik Teal — `primary`

Klinik güven, sağlık, temizlik — markanın ana rengi.

| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |
|---|---|---|---|---:|---:|
| 50 | `#EEFBF9` | 238, 251, 249 | 5/0/1/2 | 1.06 | 18.11 ✓AA |
| 100 | `#D3F4EF` | 211, 244, 239 | 14/0/2/4 | 1.17 | 16.42 ✓AA |
| 200 | `#A9E8E0` | 169, 232, 224 | 27/0/3/9 | 1.37 | 14.0 ✓AA |
| 300 | `#72D5CB` | 114, 213, 203 | 46/0/5/16 | 1.74 | 11.06 ✓AA |
| 400 | `#3DBAB0` | 61, 186, 176 | 67/0/5/27 | 2.37 | 8.09 ✓AA |
| 500 | `#179E95` | 23, 158, 149 | 85/0/6/38 | 3.3 (büyük metin/UI) | 5.82 ✓AA |
| 600 | `#0D7F79` | 13, 127, 121 | 90/0/5/50 | 4.85 ✓AA | 3.96 (büyük metin/UI) |
| 700 | `#0E6662` | 14, 102, 98 | 86/0/4/60 | 6.78 ✓AA | 2.83 |
| 800 | `#10514F` | 16, 81, 79 | 80/0/2/68 | 9.08 ✓AA | 2.11 |
| 900 | `#0F4342` | 15, 67, 66 | 78/0/1/74 | 11.04 ✓AA | 1.74 |
| 950 | `#042827` | 4, 40, 39 | 90/0/2/84 | 15.7 ✓AA | 1.22 |

#### Kurumsal Lacivert — `secondary`

B2B güvenilirlik, otorite, ciddiyet.

| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |
|---|---|---|---|---:|---:|
| 50 | `#F0F5FB` | 240, 245, 251 | 4/2/0/2 | 1.1 | 17.52 ✓AA |
| 100 | `#DDE7F4` | 221, 231, 244 | 9/5/0/4 | 1.25 | 15.37 ✓AA |
| 200 | `#C1D3EB` | 193, 211, 235 | 18/10/0/8 | 1.52 | 12.6 ✓AA |
| 300 | `#97B6DD` | 151, 182, 221 | 32/18/0/13 | 2.09 | 9.19 ✓AA |
| 400 | `#6691CB` | 102, 145, 203 | 50/29/0/20 | 3.24 (büyük metin/UI) | 5.92 ✓AA |
| 500 | `#4472B8` | 68, 114, 184 | 63/38/0/28 | 4.83 ✓AA | 3.97 (büyük metin/UI) |
| 600 | `#34599B` | 52, 89, 155 | 66/43/0/39 | 6.89 ✓AA | 2.79 |
| 700 | `#2C477E` | 44, 71, 126 | 65/44/0/51 | 9.09 ✓AA | 2.11 |
| 800 | `#263C68` | 38, 60, 104 | 63/42/0/59 | 10.89 ✓AA | 1.76 |
| 900 | `#172A4A` | 23, 42, 74 | 69/43/0/71 | 14.32 ✓AA | 1.34 |
| 950 | `#0D1A30` | 13, 26, 48 | 73/46/0/81 | 17.39 ✓AA | 1.1 |

#### Hi-Vis Turuncu — `accent`

Endüstriyel güvenlik, farkındalık, KKD yeleği — vurgu ve CTA.

| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |
|---|---|---|---|---:|---:|
| 50 | `#FFF5ED` | 255, 245, 237 | 0/4/7/0 | 1.07 | 17.86 ✓AA |
| 100 | `#FFE8D4` | 255, 232, 212 | 0/9/17/0 | 1.18 | 16.23 ✓AA |
| 200 | `#FFCDA8` | 255, 205, 168 | 0/20/34/0 | 1.44 | 13.3 ✓AA |
| 300 | `#FFA970` | 255, 169, 112 | 0/34/56/0 | 1.88 | 10.21 ✓AA |
| 400 | `#FF7B37` | 255, 123, 55 | 0/52/78/0 | 2.58 | 7.44 ✓AA |
| 500 | `#FF5A10` | 255, 90, 16 | 0/65/94/0 | 3.12 (büyük metin/UI) | 6.15 ✓AA |
| 600 | `#F03F06` | 240, 63, 6 | 0/74/98/6 | 3.88 (büyük metin/UI) | 4.95 ✓AA |
| 700 | `#C72D07` | 199, 45, 7 | 0/77/96/22 | 5.52 ✓AA | 3.48 (büyük metin/UI) |
| 800 | `#9E250E` | 158, 37, 14 | 0/77/91/38 | 7.71 ✓AA | 2.49 |
| 900 | `#7F220F` | 127, 34, 15 | 0/73/88/50 | 9.82 ✓AA | 1.96 |
| 950 | `#450D05` | 69, 13, 5 | 0/81/93/73 | 16.0 ✓AA | 1.2 |

#### Uygun Yeşil — `success`

Uygunluk, tamamlanan görev, düşük risk.

| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |
|---|---|---|---|---:|---:|
| 50 | `#F0FDF4` | 240, 253, 244 | 5/0/4/1 | 1.05 | 18.34 ✓AA |
| 100 | `#DCFCE7` | 220, 252, 231 | 13/0/8/1 | 1.1 | 17.48 ✓AA |
| 200 | `#BBF7D0` | 187, 247, 208 | 24/0/16/3 | 1.21 | 15.84 ✓AA |
| 300 | `#86EFAC` | 134, 239, 172 | 44/0/28/6 | 1.4 | 13.68 ✓AA |
| 400 | `#4ADE80` | 74, 222, 128 | 67/0/42/13 | 1.74 | 11.02 ✓AA |
| 500 | `#22C55E` | 34, 197, 94 | 83/0/52/23 | 2.28 | 8.43 ✓AA |
| 600 | `#16A34A` | 22, 163, 74 | 87/0/55/36 | 3.3 (büyük metin/UI) | 5.83 ✓AA |
| 700 | `#15803D` | 21, 128, 61 | 84/0/52/50 | 5.02 ✓AA | 3.83 (büyük metin/UI) |
| 800 | `#166534` | 22, 101, 52 | 78/0/49/60 | 7.13 ✓AA | 2.69 |
| 900 | `#14532D` | 20, 83, 45 | 76/0/46/67 | 9.11 ✓AA | 2.11 |
| 950 | `#052E16` | 5, 46, 22 | 89/0/52/82 | 14.91 ✓AA | 1.29 |

#### Dikkat Amber — `warning`

Orta risk, yaklaşan son tarih, eksik belge.

| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |
|---|---|---|---|---:|---:|
| 50 | `#FFFBEB` | 255, 251, 235 | 0/2/8/0 | 1.04 | 18.52 ✓AA |
| 100 | `#FEF3C7` | 254, 243, 199 | 0/4/22/0 | 1.11 | 17.24 ✓AA |
| 200 | `#FDE68A` | 253, 230, 138 | 0/9/45/1 | 1.25 | 15.42 ✓AA |
| 300 | `#FCD34D` | 252, 211, 77 | 0/16/69/1 | 1.44 | 13.32 ✓AA |
| 400 | `#FBBF24` | 251, 191, 36 | 0/24/86/2 | 1.67 | 11.5 ✓AA |
| 500 | `#F59E0B` | 245, 158, 11 | 0/36/96/4 | 2.15 | 8.94 ✓AA |
| 600 | `#D97706` | 217, 119, 6 | 0/45/97/15 | 3.19 (büyük metin/UI) | 6.03 ✓AA |
| 700 | `#B45309` | 180, 83, 9 | 0/54/95/29 | 5.02 ✓AA | 3.82 (büyük metin/UI) |
| 800 | `#92400E` | 146, 64, 14 | 0/56/90/43 | 7.09 ✓AA | 2.71 |
| 900 | `#78350F` | 120, 53, 15 | 0/56/88/53 | 9.07 ✓AA | 2.12 |
| 950 | `#451A03` | 69, 26, 3 | 0/62/96/73 | 14.98 ✓AA | 1.28 |

#### Kritik Kırmızı — `danger`

Yüksek risk, kaza/olay, hata, silme.

| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |
|---|---|---|---|---:|---:|
| 50 | `#FEF2F2` | 254, 242, 242 | 0/5/5/0 | 1.09 | 17.55 ✓AA |
| 100 | `#FEE2E2` | 254, 226, 226 | 0/11/11/0 | 1.22 | 15.72 ✓AA |
| 200 | `#FECACA` | 254, 202, 202 | 0/20/20/0 | 1.45 | 13.27 ✓AA |
| 300 | `#FCA5A5` | 252, 165, 165 | 0/35/35/1 | 1.9 | 10.12 ✓AA |
| 400 | `#F87171` | 248, 113, 113 | 0/54/54/3 | 2.77 | 6.94 ✓AA |
| 500 | `#EF4444` | 239, 68, 68 | 0/72/72/6 | 3.76 (büyük metin/UI) | 5.1 ✓AA |
| 600 | `#DC2626` | 220, 38, 38 | 0/83/83/14 | 4.83 ✓AA | 3.98 (büyük metin/UI) |
| 700 | `#B91C1C` | 185, 28, 28 | 0/85/85/27 | 6.47 ✓AA | 2.97 |
| 800 | `#991B1B` | 153, 27, 27 | 0/82/82/40 | 8.31 ✓AA | 2.31 |
| 900 | `#7F1D1D` | 127, 29, 29 | 0/77/77/50 | 10.02 ✓AA | 1.92 |
| 950 | `#450A0A` | 69, 10, 10 | 0/86/86/73 | 16.14 ✓AA | 1.19 |

#### Bilgi Mavi — `info`

Bilgilendirme, sistem mesajı, bağlantı.

| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |
|---|---|---|---|---:|---:|
| 50 | `#EFF8FF` | 239, 248, 255 | 6/3/0/0 | 1.07 | 17.87 ✓AA |
| 100 | `#DBEEFE` | 219, 238, 254 | 14/6/0/0 | 1.19 | 16.16 ✓AA |
| 200 | `#BFE2FE` | 191, 226, 254 | 25/11/0/0 | 1.35 | 14.2 ✓AA |
| 300 | `#93D0FD` | 147, 208, 253 | 42/18/0/1 | 1.66 | 11.6 ✓AA |
| 400 | `#60B5FA` | 96, 181, 250 | 62/28/0/2 | 2.21 | 8.68 ✓AA |
| 500 | `#3B96F6` | 59, 150, 246 | 76/39/0/4 | 3.05 (büyük metin/UI) | 6.29 ✓AA |
| 600 | `#2577EB` | 37, 119, 235 | 84/49/0/8 | 4.27 (büyük metin/UI) | 4.5 ✓AA |
| 700 | `#1D61D8` | 29, 97, 216 | 87/55/0/15 | 5.59 ✓AA | 3.43 (büyük metin/UI) |
| 800 | `#1E4FAF` | 30, 79, 175 | 83/55/0/31 | 7.52 ✓AA | 2.55 |
| 900 | `#1E448A` | 30, 68, 138 | 78/51/0/46 | 9.34 ✓AA | 2.06 |
| 950 | `#172B54` | 23, 43, 84 | 73/49/0/67 | 13.91 ✓AA | 1.38 |

#### Arduvaz Nötr — `neutral`

Metin, zemin, anahat — hafif soğuk, klinik.

| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |
|---|---|---|---|---:|---:|
| 50 | `#F7F9FB` | 247, 249, 251 | 2/1/0/2 | 1.06 | 18.19 ✓AA |
| 100 | `#EEF2F6` | 238, 242, 246 | 3/2/0/4 | 1.12 | 17.07 ✓AA |
| 200 | `#E2E8EF` | 226, 232, 239 | 5/3/0/6 | 1.23 | 15.57 ✓AA |
| 300 | `#CBD4DF` | 203, 212, 223 | 9/5/0/13 | 1.5 | 12.82 ✓AA |
| 400 | `#97A4B5` | 151, 164, 181 | 17/9/0/29 | 2.53 | 7.58 ✓AA |
| 500 | `#677689` | 103, 118, 137 | 25/14/0/46 | 4.64 ✓AA | 4.14 (büyük metin/UI) |
| 600 | `#4B596B` | 75, 89, 107 | 30/17/0/58 | 7.14 ✓AA | 2.69 |
| 700 | `#374456` | 55, 68, 86 | 36/21/0/66 | 9.89 ✓AA | 1.94 |
| 800 | `#222D3B` | 34, 45, 59 | 42/24/0/77 | 13.94 ✓AA | 1.38 |
| 900 | `#131B26` | 19, 27, 38 | 50/29/0/85 | 17.32 ✓AA | 1.11 |
| 950 | `#0A0F17` | 10, 15, 23 | 57/35/0/91 | 19.2 ✓AA | 1.0 |


### 2.3 Semantik tokenlar (açık / koyu tema)

UI kodunda **ham ölçek renkleri yerine semantik tokenlar** kullanılır; tema değişince yalnızca bu eşlemeler değişir.

| Token (CSS: `--mi-…`) | Açık tema | Koyu tema |
|---|---|---|
| `background` | `#FFFFFF` → `#FFFFFF` | `neutral.950` → `#0A0F17` |
| `background-subtle` | `neutral.50` → `#F7F9FB` | `neutral.900` → `#131B26` |
| `surface` | `#FFFFFF` → `#FFFFFF` | `neutral.900` → `#131B26` |
| `surface-raised` | `#FFFFFF` → `#FFFFFF` | `neutral.800` → `#222D3B` |
| `surface-sunken` | `neutral.100` → `#EEF2F6` | `#06090E` → `#06090E` |
| `surface-inverse` | `secondary.900` → `#172A4A` | `neutral.50` → `#F7F9FB` |
| `text` | `neutral.900` → `#131B26` | `neutral.50` → `#F7F9FB` |
| `text-muted` | `neutral.600` → `#4B596B` | `neutral.300` → `#CBD4DF` |
| `text-subtle` | `neutral.500` → `#677689` | `neutral.400` → `#97A4B5` |
| `text-inverse` | `#FFFFFF` → `#FFFFFF` | `neutral.900` → `#131B26` |
| `text-brand` | `primary.700` → `#0E6662` | `primary.300` → `#72D5CB` |
| `text-link` | `info.700` → `#1D61D8` | `info.300` → `#93D0FD` |
| `border` | `neutral.200` → `#E2E8EF` | `neutral.800` → `#222D3B` |
| `border-strong` | `neutral.300` → `#CBD4DF` | `neutral.700` → `#374456` |
| `border-focus` | `primary.500` → `#179E95` | `primary.400` → `#3DBAB0` |
| `brand` | `primary.600` → `#0D7F79` | `primary.400` → `#3DBAB0` |
| `brand-hover` | `primary.700` → `#0E6662` | `primary.300` → `#72D5CB` |
| `brand-fg` | `#FFFFFF` → `#FFFFFF` | `primary.950` → `#042827` |
| `brand-soft` | `primary.50` → `#EEFBF9` | `#0B2E2C` → `#0B2E2C` |
| `accent` | `accent.500` → `#FF5A10` | `accent.400` → `#FF7B37` |
| `accent-hover` | `accent.400` → `#FF7B37` | `accent.300` → `#FFA970` |
| `accent-fg` | `neutral.950` → `#0A0F17` | `neutral.950` → `#0A0F17` |
| `accent-text` | `accent.700` → `#C72D07` | `accent.300` → `#FFA970` |
| `success` | `success.700` → `#15803D` | `success.400` → `#4ADE80` |
| `success-soft` | `success.50` → `#F0FDF4` | `#0C2A17` → `#0C2A17` |
| `warning` | `warning.500` → `#F59E0B` | `warning.400` → `#FBBF24` |
| `warning-fg` | `neutral.950` → `#0A0F17` | `neutral.950` → `#0A0F17` |
| `warning-soft` | `warning.50` → `#FFFBEB` | `#2E2108` → `#2E2108` |
| `danger` | `danger.600` → `#DC2626` | `danger.400` → `#F87171` |
| `danger-soft` | `danger.50` → `#FEF2F2` | `#3A1212` → `#3A1212` |
| `info` | `info.700` → `#1D61D8` | `info.400` → `#60B5FA` |
| `info-soft` | `info.50` → `#EFF8FF` | `#0F2440` → `#0F2440` |

### 2.4 Doğrulanmış kontrast eşleşmeleri

| Kombinasyon | Tema | Kontrast | WCAG 2.1 |
|---|---|---:|---|
| Ana metin / zemin | Açık | 17.32:1 | AAA |
| İkincil metin / zemin | Açık | 7.14:1 | AAA |
| Yardımcı metin / zemin | Açık | 4.64:1 | AA |
| Marka metni / zemin | Açık | 6.78:1 | AA |
| Bağlantı / zemin | Açık | 5.59:1 | AA |
| Birincil buton metni | Açık | 4.85:1 | AA |
| Vurgu (CTA) buton metni | Açık | 6.15:1 | AA |
| Turuncu metin / zemin | Açık | 5.52:1 | AA |
| Başarı metni | Açık | 5.02:1 | AA |
| Hata metni | Açık | 4.83:1 | AA |
| Bilgi metni | Açık | 5.59:1 | AA |
| Uyarı rozeti metni | Açık | 8.94:1 | AAA |
| Ana metin / zemin | Koyu | 18.19:1 | AAA |
| İkincil metin / zemin | Koyu | 12.82:1 | AAA |
| Yardımcı metin / zemin | Koyu | 7.58:1 | AAA |
| Marka metni / zemin | Koyu | 11.06:1 | AAA |
| Bağlantı / zemin | Koyu | 11.6:1 | AAA |
| Birincil buton metni | Koyu | 6.61:1 | AA |
| Vurgu (CTA) buton metni | Koyu | 7.44:1 | AAA |
| Turuncu metin / zemin | Koyu | 10.21:1 | AAA |
| Başarı metni | Koyu | 11.02:1 | AAA |
| Hata metni | Koyu | 6.94:1 | AA |
| Bilgi metni | Koyu | 8.68:1 | AAA |
| Uyarı rozeti metni | Koyu | 11.5:1 | AAA |

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
| `dashboard` | Panel | `tabler:layout-dashboard` |
| `users` | Kullanıcılar | `tabler:users` |
| `roles` | Roller / Yetki | `tabler:user-shield` |
| `user-check` | Personel Onay | `tabler:user-check` |
| `risk-assessment` | Risk Değerlendirme | `tabler:gauge` |
| `hazard` | Tehlike / Uyarı | `tabler:alert-triangle` |
| `checklist` | Kontrol Listesi | `tabler:checklist` |
| `task` | Görev | `tabler:clipboard-check` |
| `report` | Rapor | `tabler:report` |
| `analytics` | Analitik Rapor | `tabler:report-analytics` |
| `file` | Dosya | `tabler:file-text` |
| `file-pdf` | PDF | `tabler:file-type-pdf` |
| `upload` | Yükleme | `tabler:cloud-upload` |
| `download` | İndirme | `tabler:download` |
| `camera` | Delil Fotoğrafı | `tabler:camera` |
| `notification` | Bildirim | `tabler:bell` |
| `shield-security` | Güvenlik / 2FA | `tabler:shield-lock` |
| `compliance` | Uygunluk | `tabler:shield-check` |
| `first-aid` | İlk Yardım | `tabler:first-aid-kit` |
| `health` | Sağlık Gözetimi | `tabler:heartbeat` |
| `medical-exam` | Muayene | `tabler:stethoscope` |
| `ambulance` | Acil Durum | `tabler:ambulance` |
| `ppe-hard-hat` | KKD / Baret | `lucide:hard-hat` |
| `fire` | Yangın Riski | `tabler:flame` |
| `fire-extinguisher` | Yangın Söndürücü | `tabler:fire-extinguisher` |
| `calendar` | Takvim | `tabler:calendar-event` |
| `search` | Arama | `tabler:search` |
| `settings` | Ayarlar | `tabler:settings` |
| `logout` | Çıkış | `tabler:logout` |
| `menu` | Menü | `tabler:menu-2` |
| `chevron-left` | Sol | `tabler:chevron-left` |
| `chevron-right` | Sağ | `tabler:chevron-right` |
| `chevron-up` | Yukarı | `tabler:chevron-up` |
| `chevron-down` | Aşağı | `tabler:chevron-down` |
| `filter` | Filtre | `tabler:filter` |
| `workplace` | İşletme / İşyeri | `tabler:building-factory-2` |
| `hospital` | Sağlık Kuruluşu | `tabler:building-hospital` |
| `location` | Konum / Saha | `tabler:map-pin` |
| `lock` | Kilit | `tabler:lock` |
| `refresh` | Yenile | `tabler:refresh` |
| `view` | Görüntüle | `tabler:eye` |
| `add` | Ekle | `tabler:plus` |
| `close` | Kapat | `tabler:x` |
| `check` | Onay | `tabler:check` |
| `edit` | Düzenle | `tabler:pencil` |
| `delete` | Sil | `tabler:trash` |

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
