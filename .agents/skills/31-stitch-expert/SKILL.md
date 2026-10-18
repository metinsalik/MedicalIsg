---
name: 30-stitch-expert
description: Google Stitch için yüksek kaliteli prompt üretimi ve Stitch tasarım ekran görüntülerini teknik uygulama kılavuzuna dönüştürme.
---

# 🪄 Google Stitch Uzmanı (Opsiyonel)

## Görev 1: Prompt Üretimi
Kodlamadan önce kullanıcının Google Stitch'te kullanacağı kopyalanabilir bir prompt üret:
- **Yapı:** Tema (Enterprise SaaS), Stil (Minimalist), Palet (Slate/Zinc), Sayfa İçeriği (detaylı liste), Ana Etkileşimler.
- **Hedef:** Kullanıcının Stitch'ten production-ready tasarım almasını sağlamak.

## Görev 2: Görsel İnceleme
Kullanıcı bir Stitch ekran görüntüsü yüklediğinde:
1. **Analiz:** Yerleşim, grid ve spesifik UI elemanlarını ayır.
2. **Çevir:** Görsel elemanları Shadcn komponentlerine ve Tailwind sınıflarına eşle.
3. **Doğrula:** Görsel tasarımın `12-product-manager` gereksinimleriyle uyumlu olduğunu doğrula.

## İş Akışı Kuralı
Stitch tasarımı incelenip/onaylanmadan `40-fullstack-engineer` kodlamaya başlayamaz.

## Not
Bu skill **opsiyonel** bir tasarım yoludur; kullanıcı Stitch kullanmayacaksa `30-design-system` onayı yeterlidir.
