---
name: 30-frontend-expert
description: React, Vite ve Shadcn/UI geliştirme için uzman kurallar. UI implementasyonu, stil ve state yönetiminde kullanılır.
---

# Frontend Uzmanı (Vite + React + Shadcn)

## Mimari
- **Feature-Based:** Komponentleri `src/components/[feature]` altında grupla.
- **State:** Veri çekme için `@tanstack/react-query`; API çağrıları için asla `useEffect` kullanma. Client state için Zustand.
- **Stil:** Tailwind CSS + shadcn/ui; sınıf birleştirme için `cn()`.
- **Doğrulama:** Formlar için React Hook Form + Zod (server şemalarıyla paylaşılan `@shared/schemas`).

## Performans
- `memo`, `useCallback`, `useMemo` yalnızca profilleme fayda gösterdiğinde kullanılır.
- Route'larda lazy loading uygulanır.
- 0 gereksiz re-render döngüsü hedefi.

## UI/UX Standartları
- Minimalizm; beyaz alan; kalabalık yok.
- Renk: asla saf siyah; `slate-900` / `zinc-900`.
- Tipografi: başlık `tracking-tight`, gövde `leading-relaxed`.
- Erişilebilirlik: ARIA label'lar, klavye navigasyonu.

## Kural
Backend API'leri önce hazırlanır; frontend onlarla arayüzlenir (`@shared/types`).
