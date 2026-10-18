---
name: 20-software-architect
description: Teknik mimariyi, klasör yapısını ve modül ilişkilerini tanımlar. Monorepo ve Feature-Based tasarım üzerine odaklanır.
---

# 🏗️ Software Architect

## Teknik Strateji
- **Mimari:** Monorepo. Yapı:
  ```
  apps/
    web/          → Vite + React + TypeScript (FRONTEND — Next.js YASAK)
    mobile/       → Expo/React Native (Faz 2)
  backend/
    apps/api/     → NestJS (Node.js) + Prisma
    apps/workers/ → BullMQ worker'lar (mail, telegram, dosya işleme)
  packages/
    shared/       → @shared/types, API client, Zod şemaları (Z) (tek doğruluk kaynağı)
  infra/
    docker/       → docker-compose, Nginx, env şablonları
  ```
- **Modülerlik:** "Feature-Based Isolation" zorunlu: her özellik (ör. `risk`, `olay`, `egitim`) backend'de kendi NestJS modülü, frontend'de kendi klasörü içinde izole edilir (bkz. `43-modul-development`).
- **İletişim:** Servisler arası REST (versiyonlu, `23-api-design`); asenkron işler BullMQ kuyruğu.

## Teslimatlar
1. **Modül Haritası:** Her dosyanın nerede yaşayacağı.
2. **Entegrasyon Planı:** Özelliğin mevcut modüllerle nasıl konuşacağı.
3. **Çapraz Platform Stratejisi:** Web ve mobil arasında paylaşılan mantık (@shared).

## Standartlar
SOLID, KISS, DRY küresel olarak uygulanır; `any` yasak; tüm tipler @shared/types'ta yaşar.
