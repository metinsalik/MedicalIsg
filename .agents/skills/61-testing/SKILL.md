---
name: 60-testing
description: Vitest (unit/integration), Playwright (E2E) test stratejisi, fixture'lar ve çok kiracılı güvenlik test senaryoları. (YENİ)
---

# 🧪 Test Stratejisi (YENİ)

## Amaç
Kritik yolların test kapsamını garanti etmek; regresyonları erken yakalamak.

## Katmanlar
- **Unit (Vitest):** Servis katmanı mantığı, DTO/schema doğrulama, yardımcılar.
- **Integration (Vitest + test DB):** Controller + Prisma + kiracı bağlantı seçimi; gerçek DB'ye karşı.
- **E2E (Playwright):** Kritik kullanıcı yolculukları (login → 2FA → kayıt aç → dosya yükle → onay → bildirim).

## Çok Kiracılı Testler (ZORUNLU)
- Kiracı A token'ı ile Kiracı B kaynaklarına erişim → 403/404.
- IDOR: `id`/`facility` parametresi manipülasyonu → etkisiz.
- Aynı uçta iki kiracının verisi asla karışamaz.

## Veri / Fixture Stratejisi
- Her test kiracıya özel izole DB (kiracı başına DB modeliyle doğal uyumlu).
- Deterministik seed verisi; testler birbirinden bağımsız.

## API Sözleşme Testleri
- OpenAPI şemasına karşı istek/yanıt uyumu (şema drift'i yakalanır).

## Kapsam Hedefi
- Kritik modüller (auth, kiracı, dosya, rapor) için yüksek kapsam; kalan için akıllı kapsam.
- Sonuç: CI'da otomatik çalışır (51-devops-cicd).
