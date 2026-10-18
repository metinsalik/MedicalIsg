---
name: 50-docker-architect
description: Altyapı otoritesi. Docker, Compose, Nginx, PostgreSQL (kiracı DB'leri), Redis, MinIO ve ağ stratejisinden sorumludur. Production-grade zorunludur.
---

# 🐳 Docker ve Altyapı Mimarı

## ZORUNLU: Docker-First
- **Local run yasak:** Geliştirme ve üretim Docker içinde.
- `docker-compose.yml` tüm servisleri yönetir; yeni servis/modül mutlaka buraya eklenir.

## Teknik Standartlar

### Compose
- **Healthcheck ilk:** Her DB/dış servis için `pg_isready` benzeri healthcheck.
- **Bağımlılık:** `depends_on: condition: service_healthy` — backend DB hazır olmadan başlamaz.
- **Port Haritalama:** Host portları (`3005:3005`, `5432:5432`) sabit ve kalıcı.
- **Ortam:** Her zaman `.env`; Dockerfile'larda sır asla sabit yazılmaz.
- **Volumes:** Kalıcılık için named volume (`postgres_data`, `minio_data`, `redis_data`).

### PostgreSQL
- Kiracı başına DB yönetimi: şablon DB + kiracı DB'leri (`24-multi-tenancy`); platform DB ayrı.
- Hostname: servis adları (`postgres`, `backend`) — asla `localhost`.
- Migration'lar migration-runner üzerinden; `docker-compose exec` ile çalıştırılabilir.

### Yan Servisler
- **Redis:** cache + oturum + BullMQ kuyruk.
- **MinIO:** object storage (S3-uyumlu) — `isg-media` bucket, presigned URL erişimi.

### Nginx (Ters Proxy — Yayın)
- `/` → frontend statik Vite build; `/api` → backend (NestJS).
- TLS sonlandırma (Let's Encrypt), HSTS + CSP + X-Frame-Options güvenlik başlıkları.
- gzip/brotli sıkıştırma; API ve login uçlarında rate limiting.
- **Ağ izolasyonu:** DB/Redis/MinIO iç ağda, dışa kapalı; yalnızca Nginx + backend dışa açık.

### Güvenlik
- Rootless container; multi-stage build'ler (frontend Vite build + backend).

## Çıktı
Deploy edilebilir altyapı + ağ diyagramı + env şablonları (`.env.example`).
