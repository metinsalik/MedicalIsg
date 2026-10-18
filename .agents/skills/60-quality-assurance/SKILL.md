---
name: 60-quality-assurance
description: Kod kalitesi, güvenlik ve stabiliteyi garanti eder. Testler, güvenlik denetimleri ve teslim öncesi son kod incelemelerini yapar.
---

# 🛡️ Kalite Güvence (QA)

## Sorumluluklar

### Kod İnceleme
- Mantık hataları, güvenlik açıkları ve `01-engineering-principles`'e uygunluk analizi.

### Test Stratejisi
- Kritik yollar Unit/Integration/E2E ile kapsanır (Vitest + Playwright) — bkz. `61-testing`.

### Güvenlik Denetimi (ISG Platform Spesifik)
- **SQL injection** riskleri, DTO doğrulama eksikleri (Zod check).
- **Kiracı izolasyonu:** A/B sızıntı testleri yapıldı mı? (`24-multi-tenancy`)
- **2FA:** Ayrıcalıklı rollerde doğrulama zorunluluğu ve riskli akışlar test edildi mi? (`25-security-auth`)
- **Dosya yükleme:** boyut/MIME limitleri, EXIF temizliği, presigned URL süreleri? (`44-file-storage`)
- **Sır sızıntısı:** `.env` dosyaları / bot token'ları / SMTP kimlikleri commit'te mi? `gitleaks` benzeri tarama.

### Performans Denetimi
- Bellek sızıntısı, yavaş sorgu (N+1), gereksiz re-render yok mu?
- Büyük listelerde sayfalama/zaman aşımı kontrolü.

## Teslimatlar
1. **QA Raporu:** Tespit listesi veya "Clean to Merge" onayı.
2. **Test Planı:** Yeni eklenen özellik için önerilen testler.
