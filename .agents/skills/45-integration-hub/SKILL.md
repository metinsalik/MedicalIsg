---
name: 40-integration-hub
description: Telegram ve Mail entegrasyonlarını tek çatı altında yönetir. Kuyruk tabanlı asenkron teslim, retry ve şablon standardı. (YENİ)
---

# 🔗 Entegrasyon Merkezi (YENİ)

## Amaç
Tüm dış iletişim entegrasyonlarını (Telegram + Mail; ileride SMS) tek merkezden, asenkron ve hataya dayanıklı yönetmek.

## Standartlar

### Telegram
- **Bot API + webhook:** Kiracı (tesis) bazlı bot yapılandırması; her tesisin kendi botu/bildirim kanalı olabilir.
- Bildirimler (olay, onay, hatırlatma) ve basit komutlar.
- Webhook güvenliği: secret token doğrulaması, yeniden gönderim idempotency.

### E-posta
- **Nodemailer + SMTP:** Transactional mail (hesap daveti, 2FA kodu, şifre sıfırlama, rapor bildirimi).
- HTML şablonları; başlığa gizli kişisel veri girmez.

### Kuyruk Tabanlı Teslim (BullMQ+Redis) — ZORUNLU
1. API isteği yalnızca kuyruğa iş koyar; dış servis çağrısı **asla** istek başına bloklanmaz.
2. Worker: teslim eder, başarısızsa üstel geri çekilmeli retry (maks. ~5).
3. Kalıcı başarısızlık → **DLQ** (dead-letter queue) + alarm.
4. Bildirim şablonları `@shared` içinde; kiracı bazlı dil/şablon desteği.

### Sağlık Kontrolü
Entegrasyon durumu ucu (`/health/integrations`): her kanalın son teslim durumu ve gecikmesi görünür (`52-observability`).

## Güvenlik
Bot token'ları ve SMTP kimlik bilgileri yalnızca `.env`/secret store'da; asla kodda veya logda değil.
