---
name: 50-devops-cicd
description: GitHub Actions ile otomatik test/build/deploy pipeline'ı, ortam yönetimi, sürüm tetikleyicileri ve rollback stratejisi. (YENİ)
---

# 🚀 CI/CD ve Dağıtım (YENİ)

## Amaç
GitHub Actions üzerinde tam otomatik, güvenli, tekrarlanabilir build → test → deploy zinciri. Tüm versiyonlama GitHub üzerinden (`90-versioning-git` ile birlikte).

## CI (Pull Request Tetikleyicili)
Her PR açıldığında:
1. `pnpm lint` + `pnpm typecheck`
2. `pnpm test` (unit + integration; kiracı sızıntı testleri dahil)
3. `pnpm build` (Vite frontend + NestJS backend)
4. **Migration doğrulaması:** Şema değişikliği varsa önce **şablon DB'de** uygula ve doğrula (`21-database-architect`) — asla doğrudan kiracı DB'sine değil.
5. Commit mesajı kontrolü (Commitlint — Conventional Commits).

## CD (main'e merge tetikleyicili)
1. Sürüm belirle (SemVer; BREAKING CHANGE varsa major) + CHANGELOG + tag + GitHub Release.
2. Docker imajlarını build + push.
3. Deploy: staging (otomatik) → production (onay veya otomatik, repo ayarına göre).
4. **Migration Runner:** Onaylı migration'ı tüm kiracı DB'lerine sırayla uygula; başarısızda dur ve rollback.
5. Deploy sonrası: `/health` kontrolü; başarısızsa önceki sürüme otomatik rollback.

## Ortam Yönetimi
- `.env.production`/`.env.staging` şablonları; gerçek sırlar GitHub **Secrets**'ta (Actions içinde `${{ secrets.X }}`).
- Sırlar asla workflow dosyalarına yazılmaz, loglanmaz.

## Çıktı
Çalışan pipeline yapılandırması + deploy dokümantasyonu + rollback runbook'u.
