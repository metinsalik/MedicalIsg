---
name: 30-frontend-design
description: Frontend geliştirme için uzman UI/UX kuralları. Komponent tasarımı, yerleşim ve stil seçimlerinde kullanılır.
---

# Frontend Tasarım Uzmanı Kuralları

Her UI görevinde şu üst düzey ilkeler izlenir:

## Görsel Dil
- **Minimalizm:** Beyaz alanı etkili kullan; kalabalıktan kaçın.
- **Mikro-etkileşim:** Hover ve durum değişimleri için ince animasyonlar (0.2s-0.3s).
- **Tutarlılık:** Tek tip padding, köşe yarıçapı (shadcn default), font ağırlıkları.

## UI En İyi Uygulamaları
- Saf siyah (`#000`) kullanma; `slate-900` veya `zinc-900` kullan.
- Ekran başına maksimum 2-3 mantıksal bölüm (bilişsel yük).
- Butonlarda net focus state ve gerektiğinde loading göstergesi.
- Tipografi: başlıklarda `tracking-tight`, gövdede `leading-relaxed`.

## Responsive Kural
Her tasarım masaüstü (sidebar + tablo) ve mobil (bottom tabs + kart listeleri) için birlikte düşünülür — yalnızca büyük ekranlara uyan UI yazılmaz.
