---
name: 00-engineering-principles
description: Herhangi bir yazılım projesi için geçerli evrensel mühendislik standartları, mantık çerçeveleri ve teknik mükemmeliyet rehberi.
---


# 📜 Mühendislik Prensipleri (Engineering OS)

Sistemin tartışılmaz Teknik Anayasasıdır. Tüm mimarlar ve mühendisler ürün türünden bağımsız olarak buna uyar.

## 1. Mantık Kodun Önündedir (Logic Over Syntax)
- **Önce Problem, Sonra Kod:** Kod yazılmadan önce mantık tamamen haritalanır.
- **Bilişsel Yük:** Kod kolay okunup anlaşılmalıdır; karmaşıklık bir hatadır.
- **Öngörülebilirlik:** Aynı girdi her zaman aynı, öngörülebilir çıktıyı üretir.

## 2. Yapısal Bütünlük (Structural Integrity)
- **Decoupling:** Her modül bağımsız test edilebilir ve değiştirilebilir olmalıdır.
- **Tek Doğruluk Kaynağı:** Veri ve durum tek bir sahibe aittir; kopya yoktur.
- **Standart Arayüzler:** Sistemler arası iletişim katı, belgeli protokoller izler.

## 3. Derinlemesine Savunma (Defense-in-Depth)
- **Sıfır Güven:** Dışarıdan gelen hiçbir veriye güvenilmez; her şey doğrulanır (tip + çalışma zamanı).
- **Zarif Hata:** Sistemler güvenli şekilde başarısız olur; zincirleme hatalar olmaz.
- **Denetlenebilirlik:** Her kritik durum değişimi izlenebilirdir (audit trail).

## 4. Kaynak Bilinci (Resource Stewardship)
- **Verimlilik:** CPU/bellek/ağ yalnızca gerektiği yerde optimize edilir, asla israf edilmez.
- **Docker İlk:** Geliştirme, staging ve üretim tutarlılığı zorunludur.
- **Taşınabilirlik:** Satıcı kilitlenmesinden kaçınılır; çekirdek mantık altyapı sağlayıcısından bağımsızdır.

## 5. Bakım Bir Özelliktir (Maintenance as a Feature)
- **Açık İsimlendirme:** Adlar amaç anlatır, uygulamayı değil.
- **Kendini Belgeleyen Kod:** Kod "nasıl"ı, yorumlar (gerekirse) "neden"i söyler.
- **Ölü Kod Yok:** Kullanılmayan hiçbir şey var olmamalı; Knip ile düzenli denetlenir.

## Teknik Çerçeveler
- **Temiz Felsefe:** SOLID (yüksek uyum, düşük bağ), DRY, KISS.
- **Ölçeklenebilirlik:** Asenkron düşünme (kuyruk + arka plan işleri), önbellek stratejisi, veritabanı hijyeni (indeks, normalizasyon, UUID birincil anahtarlar).
- **DX:** Tutarlı lint/format/type-check; hızlı geri bildirim döngüleri.

## Uygulama Bariyerleri
1. Katı tipler: `any` yasak; discriminated union ve generics kullan.
2. Katmanlı doğrulama: Edge (API) + Domain (iş mantığı) + Persistence (DB).
3. Immutability: performans gerektirmedikçe değişmez veri yapıları.
4. Ortam farkındalığı: sırlar/ortam değerleri asla sabit kodlanmaz (`.env`).

## Misyon
"5 yıl sonra tek toplantı yapmadan, başka bir mühendisin sorunsuz sürdürebileceği kadar iyi yapılandırılmış ve mantıksal olarak sağlam yazılım üret."
