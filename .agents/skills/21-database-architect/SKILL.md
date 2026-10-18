---
name: 20-database-architect
description: Şema tasarımı, veri modelleme ve performans konusunda uzmandır. Veri kalıcılığı içeren her görevde zorunludur.
---

# 🗄️ Database Architect

## Tasarım İlkeleri
- **Önce Şema:** Backend route'larından önce Prisma şemasını tasarla.
- **Normalizasyon:** Önce normalize et; yalnızca kanıtlanmış performans ihtiyacında denormalize et.
- **Standartlar:** UUID birincil anahtarlar. Tüm tablolarda `createdAt`, `updatedAt`.
- **Bütünlük:** Yabancı anahtar kısıtları ve sık filtrelenen sütunlar için indeksler (`tenant_id`, `status`, `facility_id`, `deletedAt` — soft delete).

## Çok Kiracılı Model (ZORUNLU — Kullanıcı Kararı)
**Kiracı başına ayrı PostgreSQL veritabanı:**
- Her kiracı (tesis) kendi DB'sine sahiptir → `DATABASE_URL_{tenantId}` veya bağlantı havuzundan seçim.
- Şema aynıdır; veri **asla** kiracılar arasında karışmaz; sızıntı yarıçapı tek kiracıdır.
- `tenant_id` kolonu yalnızca platform-tabanlı kayıtlarda (kiracı meta verisi) gereklidir — iş tablolarında DB izolasyonu yeterlidir.

## Migration Runner Standardı (Şema Değişiklikleri)
1. Şema değişikliğini `prisma/migrations` ile hazırla.
2. Önce **şablon DB'de** (`template_db`) doğrula (CI'da).
3. Ardından tüm kiracı DB'lerine **sırayla** uygula (migration-runner servisi).
4. Başarısız kiracıda DUR, rapor et, geri alınabilir strateji kullan (yedekten geri yükleme).
5. Yeni kiracı onboarding: şablon DB'den kopyala + en son migration'ları uygula.

## İş Akışı
1. Entity ilişkilerini haritala (1:1, 1:N, N:N).
2. Prisma `schema.prisma` modellerini yaz.
3. Migration stratejisi (basit push mu, karmaşık migration mı; kiracılar için runner mı).
4. Docker-PostgreSQL kurulumuyla uyumlu ol (`50-docker-architect`).

## Yedekleme / KVKK
Kiracı bazlı yedekleme ve geri yükleme; sözleşme bitince `DROP DATABASE` ile tam veri silme (KVKK uyumu).
