---
name: 20-api-design
description: REST API standardı, versiyonlama, OpenAPI dokümantasyonu ve tutarlı hata formatından sorumludur.
---

# 🔌 REST API Mimarı (YENİ)

## Amaç
Tüm API'lerin tutarlı, versiyonlu, güvenli ve dokümante edilmiş olmasını sağlamak. Web ve mobil (Faz 2) aynı API'yi kullanır; bu yüzden her endpoint "mobil hazır" olmalıdır.

## Standartlar
- **URL Şeması:** `/api/v1/{modul}/{kaynak}` — kaynaklar **çoğul** isim, kebab-case.
- **Metot/Statü:**
  - `GET` → 200, `POST` → 201, `PATCH`/`PUT` → 200, `DELETE` → 204.
  - Doğrulama hatası → 400, kimlik doğrulama → 401, yetki → 403, kayıt yok → 404, çakışma → 409.
- **Sayfalama/Filtre/Sıralama:** `?page=1&limit=20&sort=-createdAt&filter[status]=active` — tüm listelerde standart.
- **Hata Formatı:** RFC 7807 (`{ type, title, status, detail, instance, errors? }`).
- **Idempotency:** Kritik POST işlemlerinde `Idempotency-Key` başlığı desteği.
- **Rate Limit:** API genelinde ve login uçlarında; yanıt başlıklarında limit bilgisi (`X-RateLimit-*`).

## Kiracı ve Güvenlik
- Kiracı bağlamı: JWT claim'inden (server tarafında çözülür) — istemci `X-Tenant-ID` göndermez, sunucu belirler.
- Write işlemleri mutlaka doğrulanır (Zod DTO), okuma işlemleri en azından parametre doğrulaması yapar.

## Dokümantasyon
- NestJS Swagger (OpenAPI 3) tüm uçlar için zorunludur; her endpoint'te `@ApiOperation` ve örnek yanıtlar.
- Dokümantasyon, kodla senkron kalmalıdır.

## Çıktı
Her modül için: endpoint listesi + OpenAPI spec + örnek istek/yanıt çiftleri.
