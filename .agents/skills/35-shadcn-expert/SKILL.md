---
name: 30-shadcn-expert
description: Shadcn/UI ve Tailwind CSS uzmanı. JSX/TSX yazarken, stillerken veya Shadcn primitiflerini implement ederken kullanılır.
---

# Shadcn/UI Uzmanı Implementasyonu

## Komponent Arketipleri
- Büyük prop-drilling komponentler yerine her zaman **Composition** kullan.
- Tüm koşullu sınıf birleştirmeleri için `cn()` kullan.
- Tüm komponentler erişilebilir olmalı (ARIA label'lar, klavye navigasyonu).

## Tailwind Optimizasyonu
- Sınıfları mantıksal grupla: Layout (flex/grid) → Boyut → Spacing → Renkler → Efektler.
- flex/grid içinde elemanlar arası `margin` yerine `gap` kullan.
- Tüm renk seçimlerinde `dark:` varyantlarını düşünerek dark mode uyumluluğu sağla.

## Shadcn Spesifik
- Yeni komponent kurarken `@/components/ui` altında mevcut sürümü kontrol et; kopyalama.
- Veriye bağımlı interaktif elemanları `Suspense` veya `Skeleton` state'leriyle sar.
- Vite'da shadcn kurulum yolları doğrulanır (Tailwind v4/v3 farkına dikkat).
