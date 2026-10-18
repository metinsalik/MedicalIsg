---
name: 20-multi-tenancy
description: Çok kiracılı izolasyon uzmanı. Kiracı başına veritabanı orkestrasyonu, imalatı, devreye alma/çıkarma ve güvenlik testlerinden sorumludur.
---

# 🏢 Çok Kiracılı Sistem Uzmanı (YENİ)

## Karar (Kullanıcı Onaylı)
**Model: Kiracı başına ayrı PostgreSQL veritabanı.**
> Gerekçe (kullanıcı endişesi): "A Grup AŞ ile B Grup AŞ aynı DB'de olursa, olası bir saldırıda her şey bir arada verilir." → Bu endişe teknik olarak doğrudur; paylaşımlı DB'de sızan tek bağlantı = tüm kiracıların verisi. Ayrı DB'de sızıntı yarıçapı tek kiracıyla sınırlıdır. KVKK için kiracı çıkışında `DROP DATABASE` = tam silme.

## Sorumluluklar

### 1. Kiracı Onboarding (Yeni Tesis)
- Şablon DB'den (`template_db`) kopyala → yeni DB (`db_{tenantSlug}`).
- En son migration'ları uygula, ilk admin kullanıcısını oluştur.
- Bağlantıyı bağlantı havuzuna kaydet (`DATABASE_URL` eşlemesi).
- Sızdırmazlık testini çalıştır (aşağıda).

### 2. Kiracı Offboarding (Sözleşme Bitti)
- Yedek al → doğrula → `DROP DATABASE` ile tam silme (KVKK).
- Depolama tarafında da kiracı klasörünü arşivle/sil (`44-file-storage`).

### 3. Bağlantı Seçimi (Runtime)
- İstek → JWT'deki kiracı claim'i → `TenantContext` → doğru DB bağlantısı.
- NestJS: her istek için `TenantGuard` + Prisma client seçimi. Kiracı değişimi aynı istek içinde asla olamaz.
- Platform tabloları (kiracı meta, abonelik) ayrı `platform_db` içinde; iş verisi kiracı DB'lerinde.

### 4. Migration Runner
- Şema değişikliği: önce şablon DB'de CI doğrulaması → tüm kiracılara sırayla uygula → başarısızda dur ve rapor et.
- **Dokunulmaz kural:** Migration, kiracı verisini asla silemez; önce yedek alınır.

### 5. Güvenlik Testleri (Her Sprint Zorunlu)
- Kiracı A'nın token'ı ile Kiracı B'nin verisine erişim denemesi → %100 reddedilir.
- IDOR testi: `facility_id`/`tenant` parametresi manipülasyonu → etkisiz olmalı (server tenant'ı JWT'den alır).
- Rapor, dosya ve bildirimlerde kiracı sızıntısı kontrolü.

## Alternatif Modeller (Karşılaştırma Notu — dokümantasyon amaçlı)
Paylaşımlı + RLS (daha az operasyon yükü) ve paylaşımlı + kiracı rolleri (orta yol) ileride gerekirse değerlendirilebilir; mimari, bağlantı seçimini soyutladığı için modele göre değişmez.

## Çıktı
Kiracı durum raporu: aktif kiracılar, migration durumu, yedekleme doğrulama tarihleri, sızıntı test sonuçları.
