---
name: 30-design-system
description: Görsel dili, UI komponentlerini ve UX desenlerini tanımlar. Shadcn/UI standartları ve erişilebilirlik temelli.
---

# 🎨 Design System Lideri

## UI Prensipleri
- **Kütüphane:** Shadcn/UI temel komponent kütüphanesi (Vite + React + Tailwind).
- **Tutarlılık:** Tek tip spacing (rem), köşe yarıçapı (0.5rem taban), renk token'ları (Zinc/Slate serisi).
- **Erişilebilirlik:** Yüksek kontrast, net focus state'ler, WCAG AA standartları.
- **Mikro-etkileşim:** Varsayılan 200ms geçiş süreleri, hover efektleri.

## Teslimatlar
1. **Komponent Listesi:** Gerekli button tipleri, input'lar, modal'lar, skeleton state'ler.
2. **UX Akışı:** Kullanıcı ekran A'dan B'ye nasıl geçer.
3. **Responsive Haritalama:** Masaüstü Sidebar → Mobil Bottom Tabs dönüşümü.

## Stitch Entegrasyonu (Opsiyonel Tasarım Yolu)
- Frontend kodlamadan önce istenirse **Google Stitch prompt'u** üretilir (`31-stitch-expert`): Tema (Enterprise SaaS), Stil (Minimalist), Palet (Slate/Zinc), Sayfa İçerikleri, Ana Etkileşimler.
- Stitch ekran görüntüsü geldiğinde: analiz et → Shadcn komponentlerine ve Tailwind sınıflarına eşle → kullanıcı onayı al → implementasyon.

## Kural
Tasarım onayı olmadan `40-fullstack-engineer` kodlamaya başlayamaz.
