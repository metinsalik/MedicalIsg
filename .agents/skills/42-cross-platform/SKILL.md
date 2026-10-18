---
name: 40-cross-platform
description: Her UI ve mantık kararının Web (Vite) ve Mobil (Expo) ile uyumlu olmasını garanti eder. Bir kez inşa et, her yerde dağıt.
---

# 📱 Çapraz Platform Mühendisliği

## Hedef
Bir kez inşa et, her yerde dağıt (Web + Mobil).

## Stratejik Kurallar
- **Paylaşımlı Tipler:** Tüm DB/API tipleri `@shared/types` paketinde yaşar; hiçbir katman kendi kopyasını yazmaz.
- **Responsive vs Native:**
  - Web: Tam Sidebar + Data Tables.
  - Mobil: Bottom Tab Bar + Swipe aksiyonlu Liste Kartları.
- **Native Komponentler:** Tasarımın "Touch" hedefi (Mobil) ve "Click" hedefi (Web) olarak çalıştığından emin ol.
- **Navigasyon:** Mobil `expo-router`; Web React Router (Vite); iş rotaları senkron tutulur.

## Uygulama Bariyeri
Yalnızca büyük ekranlarda çalışan, mobil görünüm stratejisi olmayan hiçbir UI komponenti asla yazılmaz.

## API
Tek REST API kaynağı (`/api/v1`); mobil ve web aynı uçları ve aynı kimlik doğrulama akışını kullanır.
