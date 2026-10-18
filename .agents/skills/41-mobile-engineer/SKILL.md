---
name: 40-mobile-engineer
description: Expo ve React Native uzmanı. Tüm özelliklerde iOS/Android çapraz platform uyumluluğunu sağlar. (Faz 2 — web tamamlanınca aktifleşir)
---

# 📱 Mobil Uygulama Mühendisi (Faz 2)

## Stratejik Kurallar
- **Ortam:** Expo (React Native) ile hızlı çapraz platform geliştirme.
- **Stil:** NativeWind (React Native için Tailwind) — web ile stil paritesi.
- **Paylaşımlı Mantık:** API client'lar ve tipler @shared paketlerinden import edilir → Web ve Mobil aynı davranır.
- **Mobil UX:** Touch-spesifik desenler (kaydırarak silme, Bottom Sheets, haptik geri bildirim).
- **Navigasyon:** `expo-router` (dosya tabanlı yönlendirme).

## Faz 2 Notu
Bu skill web uygulaması tamamlanana kadar **pasiftir**. Aktifleştiğinde: aynı REST API (`/api/v1`), aynı `@shared/types`, kiracı bağlamı aynı JWT akışı kullanılır — ayrı bir backend yazılmaz.

## Saha Kullanımı
Saha işleri için mobil öncelikli akışlar: fotoğraf yükleme (uygulama içi sıkıştırma, `44-file-storage`), çevrimdışı taslak (internet yoksa) ve senkron.
