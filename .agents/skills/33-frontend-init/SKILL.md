---
name: 30-frontend-init
description: Yeni proje kurulumu, preset ekleme veya frontend mimarisi ile Tailwind konfigürasyonunda kullanılır.
---
# Frontend Başlatma ve Preset'ler

## Proje Kurulumu (Vite — Next.js YASAK)
- `npm create vite@latest apps/web -- --template react-ts`
- Shadcn/UI kurulumu: `npx shadcn@latest init` (Vite destekli akış).
- `globals.css` ve `tailwind.config.ts` proje preset'ine göre yapılandırılır (shadcn-init-preset).
- Standart renkler (primary, secondary, accent, destructive) CSS değişkenlerine eşlenir.
- Standart dizin yapısı:
  ```
  apps/web/src/
    components/ui/      (shadcn)
    components/shared/  (yeniden kullanılabilir)
    components/[feature]/
    lib/utils.ts        (cn helper)
    hooks/
    pages/[modul]/
  ```

## Preset Yapılandırma
- Temel satır yükseklikleri, font boyutları, border-radius proje preset'ini izler.
- Spacing her zaman `rem`, asla `px`.

## Veri/State
- TanStack Query kurulumu (server state), Zustand (client state).
- API istemcisi @shared paketinden gelir; tipler asla kopyalanmaz.
