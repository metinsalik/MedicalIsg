---
name: 40-modul-development
description: isg_platform projesine yeni modül eklemenin adım adım kılavuzu. Riskler, olaylar, paneller gibi özellikler oluştururken kullanılır.
---

# Modül Geliştirme İş Akışı (ISG Platform)

Her yeni modül için şu adımlar **kesin sırayla** izlenir:

## 1. Veritabanı (Prisma)
- Modelleri `backend/apps/api/prisma/schema.prisma` içine ekle.
- İlişkileri ve foreign key'leri tanımla.
- Çalıştır: `npx prisma format`, migration oluştur, **kiracı şablon DB'sinde doğrula**, sonra migration-runner ile tüm kiracı DB'lerine uygula (`21-database-architect`).
- Not: Kiracı başına DB modelinde iş tablolarına `tenant_id` eklenmez; izolasyon DB katmanındadır.

## 2. Backend (NestJS)
- `apps/api/src/modules/[modul_adi]/` altında modül oluştur:
  - `[modul].module.ts`, `[modul].controller.ts`, `[modul].service.ts`, `[modul].dto.ts` (Zod/class-validator), `entities/[modul].entity.ts`.
- Modülü `AppModule`'a kaydet.
- Controller'a `TenantGuard` + `RolesGuard` middleware'lerini ekle (kiracı + yetki).
- Karmaşık mantık varsa servis katmanına taşı (asla controller'da iş mantığı yazma).
- Endpoint şeması: `/api/v1/[modul]` (`23-api-design`).

## 3. Frontend (Vite/React)
- **Sayfalar:** `apps/web/src/pages/[modul_adi]/` — asla kök `pages` altına koyma.
- **Komponentler:** `apps/web/src/components/[modul_adi]/` — modüle özel UI.
- **Routing:** `App.tsx`'e `<ProtectedRoute>` ile rota ekle.
- **Navigasyon:** Portal Page ve Sidebar'a giriş ekle.
- API çağrıları TanStack Query ile, tipler @shared/types'tan.

## Control Listesi
- [ ] Prisma şeması güncellendi ve migration runner çalıştı (tüm kiracılar).
- [ ] NestJS modülü oluşturuldu ve AppModule'a kayıtlı.
- [ ] TenantGuard + RolesGuard eklendi.
- [ ] Frontend sayfaları/komponentleri modül klasöründe izole.
- [ ] Rotlar App.tsx'te korumayla eklendi.
- [ ] Navigasyon Portal/Sidebar'da güncellendi.
- [ ] Testler eklendi (61-testing).
- [ ] Commit + PR (90-versioning-git).
