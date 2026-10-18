---
name: 40-file-storage
description: Fotoğraf/PDF yükleme, MinIO entegrasyonu, WebP/AVIF sıkıştırma, thumbnail üretimi ve saklama politikası yönetimi. (YENİ)
---

# 📁 Dosya Depolama ve Medya (YENİ)

## Amaç
Fotoğraf ve PDF yüklemeleri güvenli, optimize ve "abluka" yaratmadan yönetmek. Kullanıcı kararı: **orijinal dosyalar körlemesine saklanmaz; modül tipine göre bilinçli saklama.**

## Yükleme Limiti (Kullanıcı Onaylı)
- Fotoğraf: **maks. 10MB** / görsel (client + server çift taraflı doğrulama).
- PDF: **maks. 25MB**.
- İzin verilen türler: JPEG, PNG, WebP, HEIC → **WebP'ye dönüştürülür**; TIFF/RAW **reddedilir** (100MB senaryosu daha baştan engellenir).

## Saklama Politikası (`keep_original` bayrağı)
| İçerik Türü | Orijinal | Saklanan Ürünler |
|-------------|----------|------------------|
| Rutin saha fotoğrafı | **SİL** (varsayılan) | WebP thumb (150px) + medium (800px) + large (1920px) |
| Delil/olay fotoğrafı | **SAKLA** | Orijinal + tüm boyutlar + EXIF temizleme (modül flag `keep_original=true`) |
| PDF/rapor/belge | **SAKLA** | Ghostscript ile optimize edilmiş PDF + ilk sayfa önizleme görseli (rapor kalitesi korunur) |
| Geçici dosyalar | — | 24 saat sonra temizle |

**Hesap:** 6MP fotoğraf ≈ 3-6MB; WebP q82 @1920px ≈ 200-400KB. 10.000 fotoğraf ≈ 2-4GB (~%90 tasarruf).

## Akış (Presigned URL — backend yükü sıfır)
1. İstemci → Backend: "şu dosyayı yükleyeceğim" (modül, tip, boyut).
2. Backend: doğrulama (MIME, boyut, izin) → MinIO'dan **presigned upload URL** üretir.
3. İstemci → MinIO: dosyayı **doğrudan** yükler.
4. İstemci → Backend: "bitti" → kayıt oluşturulur, BullMQ kuyruğuna iş atılır.
5. Worker → Sharp: WebP/AVIF dönüşümü, thumbnails, EXIF temizleme, PDF önizleme.

## Janitor Job (Günlük Arka Plan İşi)
- `keep_original=false` → orijinali işlendikten 24 saat sonra sil.
- Süresi dolan geçici dosyaları ve kırık yükleme kayıtlarını temizle.
- Kiracı çıkışında (offboarding) kiracı klasörünü arşivle/sil.

## Depolama Düzeni (MinIO bucket: `isg-media`)
```
/{tenantKey}/{modul}/{yil}/{ay}/{uuid}.{ext}
/{tenantKey}/{modul}/{yil}/{ay}/{uuid}_thumb.webp
```

## Güvenlik
İmzalı (presigned) URL'ler süreli; dosya erişimi yalnızca yetkili kullanıcılar için doğrulanır; EXIF ile konum/tarih meta verisi temizlenir; büyük yüklemeler için tus (devam ettirilebilir) desteği opsiyoneldir.

## Raporlar İçin Kalite
Raporlarda `large` sürümü veya orijinal (delil/PDF) kullanılır; görüntüleme hep sıkıştırılmış sürümden olur — kaliteden ödün verilmez.
