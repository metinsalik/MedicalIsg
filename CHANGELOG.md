# Changelog — Medical ISG

Tüm önemli değişiklikler, bu dosyada [Semantic Versioning](https://semver.org/) ve [Conventional Commits](https://www.conventionalcommits.org/) standartlarına uygun olarak belgelenir.

---

## [v0.0.1] - 18 Ekim 2026

### 🚀 İlk Temel Kurulum (Foundation & Infrastructure)
- **Docker-First Mimari:**
  - `infra/docker/docker-compose.dev.yml` ile PostgreSQL 16 (`medical_isg_platform` + `isg_tenant_template`), Redis 7, MinIO S3 ve Nginx SPA (`isg_web`) container kümesi kuruldu.
  - Kod tamamen Docker ortamına taşındı; tek komutla ayağa kalkacak Nginx ters proxy entegrasyonu tamamlandı.
- **Monorepo & Altyapı:**
  - PNPM Workspaces ve Turborepo (`turbo.json`) konfigürasyonu sağlandı.
  - `packages/shared`: RBAC rolleri (`UserRole`), Modüller (`PlatformModule`), Zod doğrulama şemaları TypeScript strict ile derlendi.
- **Çift Prisma Şeması:**
  - `platform.prisma`: Platform Core (TenantGroup, Facility, User, 2FA/TOTP, ModuleLicense).
  - `tenant-template.prisma`: Tesis izole iş verileri şablonu (Department, WorkCategory, OperationTicket, TenantAuditLog).
- **Enterprise Design System & UI (Vite + React + Tailwind + shadcn/ui):**
  - `Design-System.md` kurallarına tam uyumlu; `#0f766e` Klinik Teal primary, `slate-50` zemin, minimal dot-grid dokusu ve radial degrade uygulandı.
  - Resmi shadcn/ui `b3ZMTpzVUO` preset bileşenleri (`Button`, `Card`, `Input`, `Label`, `Badge`, `Dialog`, `Separator`) entegre edildi.
  - Açık/Koyu modda yüksek kontrast ve okunabilirlik garantilendi.
- **Akıllı Giriş & Super Admin Konsolu:**
  - Sıfır tesis açmazını çözen Super Admin (Platform Sahibi) onboarding konsolu (Grup ve Tesis ekleme modalları).
  - E-posta/şifre ile rolü ve tesisi otomatik tanıyan kurumsal giriş akışı.
