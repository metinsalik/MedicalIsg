---
name: 50-observability
description: Yapılandırılmış loglama, audit trail, sağlık kontrolü, metrikler ve hata izleme. Sistemin üretimde görünür olmasını sağlar. (YENİ)
---

# 🔍 İzleme ve Loglama (YENİ)

## Amaç
Üretimde "ne oluyor" sorusuna anında cevap verebilmek; her kritik değişikliği izlenebilir kılmak.

## Standartlar

### Yapılandırılmış Loglama
- JSON formatında, seviye alanıyla (`debug/info/warn/error`).
- Her istek **trace ID** taşır (`X-Request-ID`); loglarda kiracı bağlamı (`tenant`) ve kullanıcı ID yer alır.
- Sır asla loglanmaz (şifre, token, dosya içeriği).

### Audit Trail (Denetim İzi)
- Kritik eylemler (giriş, 2FA, yetki değişikliği, silme, sürüm geçişleri) `audit_log` tablosuna: kim, ne, ne zaman, hangi kiracı, IP, request ID.
- Geri alınabilirlik: audit kaydı silinemez/degistirilemez (append-only).

### Sağlık ve Metrikler
- `GET /health` (liveness) + `GET /health/ready` (readiness: DB, Redis, MinIO, entegrasyonlar).
- Temel metrikler: istek süresi, hata oranı, kuyruk derinliği (BullMQ), depolama kullanımı.
- Hata izleme (Sentry tipi) kurulabilir; istemci + sunucu hataları tek panele akar.

## Çıktı
Standart log/izleme kurulumu + audit şeması + sağlık uçları, her modülle uyumlu.
