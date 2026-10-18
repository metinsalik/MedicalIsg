# Architecture — Medical ISG: Entegre Tesis Yönetim Sistemi

| Alan | Değer |
|---|---|
| Sürüm | 1.0 |
| Tarih | 18 Ekim 2026 |
| Kapsam | Uygulama yapısı, sistemler arası bağlantı, veri modeli, altyapı |
| İlişkili | `PRD.md` (nelik), `Design-System.md` (görsel kurallar), `AGENTS.md` (çalışma kuralları) |

---

## 1. Genel Bakış

Medical ISG; **modüler, çok kiracılı (multi-tenant) bir SaaS** uygulamasıdır. Tek bir kod tabanından; **web** (Vite + React + TypeScript) ve **mobil** (Faz 2: Expo/React Native) istemciler, **aynı REST API** üzerinden hizmet alır. Arka uç; **NestJS (Node.js/TypeScript) + Prisma ORM** ile kurulur; her kiracı için **ayrı PostgreSQL veritabanı** (tenant-per-DB) kullanılır; dosya içeriği **MinIO**'da, asenkron işler **Redis + BullMQ** üzerinde yürür; bildirimler **Telegram Bot API ve SMTP (e-posta)** ile gönderilir.

```
┌───────────────────────────┐      ┌───────────────────────────┐
│  Web (Vite + React + TS)  │      │  Mobile — Faz 2 (Expo/RN) │
└─────────────┬─────────────┘      └─────────────┬─────────────┘
              │  HTTPS (REST + JSON)             │
              ▼                                  ▼
┌─────────────────────────────────────────────────────────────┐
│              NGINX — Reverse Proxy + TLS + Rate Limit        │
└────────────────────────────┬────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                  NestJS API (modüler monolit)               │
│  Auth/JWT/2FA · Tenant · Modüller · Entegrasyon · Rapor     │
└───────┬──────────────┬───────────────┬───────────────┬──────┘
        ▼              ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────────┐
│ PostgreSQL  │ │    Redis    │ │    MinIO    │ │ RabbitMQ yok │
│ tenant DB'  │ │ BullMQ kuy. │ │  (S3)       │ │ (BullMQ yeter)│
│ + template  │ │  cache      │ │ presigned   │ └──────────────┘
└─────────────┘ └─────────────┘ └─────────────┘
        │                          │
        ▼                          ▼
┌──────────────────────────────────────────────┐
│  Bildirimler: Telegram Bot API · SMTP Mail   │
│  Janitor (günlük temizlik) · Migration-runner│
└──────────────────────────────────────────────┘
```

**Neden bu mimari?** (özet):
- **Modüler monolit (feature-based):** Başlangıçta tek deploy edilebilir, ancak modüller servis olarak ayrışmaya hazır sınırlarla yazılır — modül bağımsızlığı gereksinimini (PRD §5.3) karşılar.
- **NestJS:** Modül/guard/dekoratör yapısı; RBAC+ABAC, 2FA ve tenant izolasyonunu sistematik uygulamak için Express'ten üstündür.
- **Tenant-per-DB:** En yüksek izolasyon; KVKK offboarding'de tam silme (`DROP DATABASE`).
- **MinIO presigned URL akışı:** Dosyalar web sunucusundan geçmeden doğrudan istemci ↔ MinIO; ölçeklenebilir ve hızlı.

---

## 2. Monorepo Yapısı

```
MedicalIsg/                        (Git monorepo)
├── apps/
│   ├── web/                        Vite + React + TS (yalnızca frontend)
│   └── backend/                    NestJS API (uygulamanın beyni)
├── packages/
│   └── shared/                     @isg/shared — tipler (DTO'lar), sabitler, skalar
├── infra/
│   ├── docker/                     docker-compose.yml + hizmet konfigleri (pg, redis, minio, nginx)
│   └── nginx/                      reverse proxy, TLS, rate limit
├── .agents/skills/                 Antigravity skill ordusu (38 skill)
├── .github/workflows/              CI/CD (build, test, docker push, deploy)
├── AGENTS.md                       bu depoya giren AI ajanın el kitabı
├── PRD.md · Architecture.md · Design-System.md · BRANDING.md
```

İlkeler:
- `packages/shared` — **tipler tek kaynak**: DTO'lar backend'den export edilir, web ve mobil import eder. API yüzeyi değişince türler tek noktadan güncellenir.
- `apps/backend` dışa kapalı Node paketi değildir; NestJS workspace paketidir.
- Yapı **monorepo tool'u** (TurboRepo/PNPM workspace veya Nx) ile yönetilir — tercih implementasyonda netleşir; ilke bir workspace manager'ın kullanılmasıdır.

---

## 3. Backend Mimarisi (NestJS)

### 3.1 Modül Düzeni

NestJS modülleri "platform planı" ile birebir eşlenir:

```
backend/src/
├── main.ts
├── app.module.ts                     (kök: tüm modülleri bağlar)
├── common/                           (global yardımcı: guards, pipes, filters, decorators, logger)
├── config/                           (env şemaları — Zod/Joi, ConfigModule)
├── platform/                         ← 0. KATMAN
│   ├── tenant/                       grup & tesis yönetimi, provisioning
│   ├── iam/                          kullanıcı, rol (RBAC), yetki (ABAC), 2FA
│   ├── settings/                     e-posta, telegram, bildirim, departman, kategori, dil
│   └── licensing/                    modül erişim/lisans aktivasyonu
├── modules/                          ← BAĞIMSIZ İŞ MODÜLLERİ
│   ├── operations/                   operasyon yönetimi
│   ├── safety/                       iş güvenliği
│   ├── health/                       iş sağlığı
│   ├── assets/                       varlık envanteri
│   ├── contractor/                   taşeron yönetimi
│   └── waste/                        atık yönetimi
├── integrations/                     telegram, smtp, (ileride hazırlayıcılar)
├── storage/                          minio presigned, sharp, janitor
├── queue/                            bullmq kurulumu + iş tanımları
└── reports/                          rapor motoru (PDF/Excel üretimi)
```

Her iş modülü kendi içinde `controller / service / repository (prisma service) / dto / entities / events / tests` taşır. **Modül dışından başka modülün service'ine doğrudan erişim yoktur**; sadece `ModuleRef` üzerinden servis arayüzü veya domain event (RabbitMQ değil, Nest EventEmitter + gerekirse BullMQ event job'ı) kullanılır.

### 3.2 Global Katmanlar

| Katman | Görev |
|---|---|
| `JwtAuthGuard` + `TenantGuard` | Her istekte: token doğrula; `X-Tenant-ID` / `X-Tesis-ID` bağlamını (context) kur |
| `RolesGuard` (RBAC) | `@Roles('ISG_UZMANI', 'ADMIN')` dekoratörüyle rol kontrolü |
| `AbacGuard` (politika) | Şart tabanlı yetki: rol + tesis + kayıt sahibi + durum (ör. sağlık raporu yalnızca hekim) |
| `TwoFactorGuard` (opsiyonel zorunlu) | Ayrıcalıklı rollerde 2FA doğrulamadan yazma işlemi engeli (TOTP) |
| `AuditInterceptor` | Kritik yazma işlemlerini audit tablosuna yaz (kim/ne/ne zaman/önceki değer) |
| `HttpExceptionFilter` + `ZodValidationPipe` | Tutarlı hata formatı, tip güvenli giriş doğrulama |

### 3.3 Kimlik ve Yetkilendirme (IAN)

- **Parola:** Argon2id (OIN), parametreler ortamda; asla düz metin saklanmaz.
- **Oturum:** JWT **access 15 dk** (kısa ömür) + **rotasyonlu refresh** (her yenilemede yeni token; eski geçersiz; cihaz listesi).
- **2FA:** TOTP (RFC 6238); kurulum akışı QR + yedek kodlar; **ayrıcalıklı rollerde zorunlu** (admin, İSG uzmanı, hekim, tesis yöneticisi).
- **RBAC+ABAC:** rollere statik izinler (RBAC) + kaynak/bağlam koşulları (ABAC: tesis, departman, veri sahibi, durum). İzin adları `modul:eylem` (örn. `safety:incident:create`, `assets:item:read`).
- **Çoklu kiracı oturum:** kullanıcı birden çok gruba aitse **aktif kiracı değiştirme**; erişim yalnızca üyelikle sınırlı.

### 3.4 Çok Kiracılılık (Multi-Tenancy) — Model A: Kiracı Başına Veritabanı

**Karar:** Paylaşımlı DB + RLS **reddedildi**; **kiracı başına ayrı PostgreSQL DB** (model A).

Gerekçeler (eleştirel değerlendirme):
- **Sızıntı yarıçapı:** Paylaşımlı DB'de sızan tek bağlantı/yanlış filtre = tüm kiracıların verisi; ayrı DB'de sızıntı = tek kiracı.
- **KVKK uyumu:** Müşteri çıkışında kurumsal verinin tamamen silinmesi şart olabiliyor; ayrı DB'de veri silme = `DROP DATABASE` (deterministik ve denetlenebilir).
- **Ölçek farkı:** Büyük kiracı, küçük kiracıyı etkilemez (resource contention yok, backup boyutu kiracı bazlı).

Maliyeti: schema değişikliği N veritabanına uygulanmalı → aşağıdaki migration stratejisi zorunludur.

**Çalışma modeli:**

| Bileşen | Açıklama |
|---|---|
| `template-db` | Yalnızca schema (şablon). Migration'lar burada doğrulanır |
| `provisioner` | Kiracı açılınca: şablon DB klonlanır/yeni DB oluşturulur + migration'lar uygulanır + env/tenant kaydı |
| `migration-runner` | Migration zincirini sırayla tüm tenant DB'lerine uygular; her DB'de durum tablosu (`_migrations`) tutar; hata olursa **o DB'de durur, diğerlerine devam etmez** (veri tutarlılığı) |
| `tenant registry` | PostgreSQL'de **merkezi meta-DB** yalnızca: tenant_id, db_url (şifreli), durum, sürüm — iş verisi YOK |
| `offboarding` | Durum → `quiesced` → son yedek → `DROP DATABASE` → kayıt `deleted` (KVKK delil: silme sertifikası log) |

**Veri erişimi:** NestJS'te Prisma `datasource` URL'si istek bağlamındaki tenant'a göre seçilir (Prisma dynamic datasource / ayrı client havuzu per-tenant — uygulama sırasında netleştirilecek kilit teknik karar). Tenant context bir `AsyncLocalStorage` içinde global olarak erişilir.

**İstisna:** 0. Katman'ın **meta verisi** (kiracı kayıtları, lisanslar) merkezi meta-DB'de; tüm iş verisi kiracı DB'sinde.

### 3.5 Hata Yönetimi ve Loglama

- NestJS `Logger` (pino transport) — yapılandırılmış JSON log; `request_id` tüm istek zincirinde.
- Hata formatı: `{ statusCode, message, code, requestId, path }`; motor bilgisi iç üretir, istemciye sızmaz.
- Kuyruk işleri: retry + **DLQ** (dead-letter queue); başarısız işler inceleme kuyruğunda, alert.

---

## 4. Frontend Mimarisi (Vite + React + TS)

### 4.1 İlkeler

- **Vite** tabanlı (Next.js **kesinlikle kullanılmaz** — performans ve bileşen kuralı).
- **REST üzerine**: API istemcisi (fetch/axios + Zod doğrulama) `packages/shared`'dan türleri alır.
- Veri katmanı: React Query (server state) + Zustand (client state: seçimler, tema). **Formlar:** react-hook-form + zod.
- Stil: Tailwind + shadcn/ui + `tokens/` (Design-System.md).
- Yönlendirme: React Router (app shell: sidebar, tenant switcher).

### 4.2 Klasör Düzeni (apps/web)

```
apps/web/src/
├── app/               (router yapısı: platform, tesise bağlı görünümler)
├── components/        ui/ (shadcn), feature/ (modül bazlı)
├── features/          (operasyon, isg, varlik, ...) — her biri bağımsız sayfa grubu
├── lib/               api, auth (token renewal), tenant context
├── stores/            zustand
└── styles/            tailwind.css, brand-tokens.css
```

- Modül ekranları `features/<modul>/` altında; 0. Katman ekranları `features/platform/`.
- Kullanıcı deneyimi çoklu kiracı: üst bar altında "Grup ▾ / Tesis ▾" seçici (PRD §5.1).

---

## 5. Veri Modeli (PostgreSQL)

### 5.1 Çekirdek Şema (her kiracı DB'sinde)

```
Grup(tenant) — 1 — n — Tesis — 1 — n — Departman
                    │
                    ├─ n — Çalışan (kimlik: kullanıcı ise user_id bağlantılı)
                    ├─ n — Varlık
                    ├─ n — KategoriListesi (merkezi tanımlar)
                    └─ n — BildirimTetikleyiciConfig
```

Önemli kurallar:
- **Tüm iş kayıtları tesis_id taşır** (tesis bazlı ABAC ve raporlama için).
- **Merkezi tanımlar tablosu** `category` — tür (`ASSET_TYPE | WASTE_TYPE | HAZARD_TYPE | DOCUMENT_TYPE | ...`) + kod + sıralama + aktiflik; modüller buradan beslenir (0. Katman).
- Personel kimlik verisi ayrı tabloda; **İş Sağlığı verileri ayrı ve kısıtlı tabloda** (health_exam, health_report — erişim ABAC+audit).
- Silme politikası: iş kayıtları **soft-delete** (deleted_at) — denetim için; yalnızca tesis/grup silme (offboarding) fiziksel.
- Akış örneği (risk değerlendirme):

```
risk_assessment(tesis_id, durum, revizyon)
  └── risk_item(tehlike, olasilik, siddet, puan, mevcut_durum)
        └── action(akisyon, sahip_id, son_tarih, durum)
              └── risk_audit(kim, zaman, degisliklik)
```

### 5.2 Depolama (MinIO + Sharp)

| Öğe | Kural |
|---|---|
| Yükleme limitleri | Foto: **10 MB**, PDF: **25 MB**; TIFF/RAW red |
| İşleme kamerası | Sharp: WebP (q80) thumb (≤512) / medium (≤2048) / large (orijinal boyut, q85); istersen AVIF |
| Saklama politikası | Rutin fotoğraf → orijinal SİL (thumb/medium/large kalır) · Delil fotoğrafı → `keep_original=true` (orijinal SAKLA) · PDF → orijinal SAKLA + optimize (Ghostscript) + önizleme görseli |
| Akış | İstemci presigned URL alır → doğrudan MinIO'ya yükler → backend işleme kuyruğuna atar (BullMQ) → Sharp işler → sonuç DB'ye işlenir |
| Janitor | Günde bir; "silinecek" işaretli originalleri 24 saat sonra kalıcı temizler |
| KVKK / hukuk | Delil zinciri: dosya hash (SHA-256) ve meta (kim/yükleme zamanı) kayıt altında |

### 5.3 Asenkron ve Bildirim (Redis + BullMQ)

- **Kuyrukçuklar:** `storage:process`, `notification:email`, `notification:telegram`, `report:generate`, `janitor`.
- Her iş: retry (üstel geri çekilme) + **DLQ**; telemetri: iş sayısı, bekleme süresi, başarı/başarısızlık.
- **Bildirim motoru:** olay → kural eşleşmesi (0. Katman tetikleyici konfig) → `notification` işi (e-posta ve/veya Telegram). Kural örnekleri: "kritik kaza→ tüm ilgili amirlere Telegram", "eksik belge → sahibine e-posta".
- **Telegram:** Bot API (kiracı başına bot/token veya tek bot + sohbet eşlemesi — 0. Katman ayarı); mesaj şablonları markdown.
- **E-posta:** SMTP (kiracı bazlı); başlık/önmanzara marka & logosu; rapor teslimi eklenti olarak PDF.
- **Rapor motoru:** PDF (rapor şablonları — HTML→PDF) ve Excel dışa aktarma; raporlar kuyrukta üretilir, tamamlanınca depolanır ve bildirilir.

---

## 6. API Yüzeyi ve Sözleşmeler

- **REST** (JSON); önek `http://api.../v1`.
- Kimlik: `Authorization: Bearer <access>`; kiracı: `X-Tenant-Id` başlığı (veya URL path — netleştirilecek tek karar).
- OpenAPI (Swagger) otomatik; tüm DTO'lar `packages/shared` içinde; her uç tanımlı `@ApiTags` ile bölümlenir (modül adı).
- Sayfalama: `?page=&limit=&sort=&filter=` (limit ≤ 100); büyük listeler cursor (v1 sonrası).
- Versiyonlama: path `/v1`; breaking değişiklik → `/v2`.

---

## 7. Altyapı ve Dağıtım

### 7.1 Docker Compose (yerel + ilk canlı)

```
services:
  postgres:        (meta + template; kiracı DB'leri aynı sunucu veya ayrı instance)
  redis:           (cache + BullMQ)
  minio:           (S3 uyumlu; bucket: kiracı başına prefix)
  backend:         (nestjs; healthcheck)
  web:             (vite build çıktısı statik — nginx servis eder)
  nginx:           (reverse proxy: /api → backend; / → web; TLS; rate limit)
  migration-runner: (tek seferlik job — deploy anında)
  janitor:         (cron — günlük)
```

- **Nginx:** TLS sonlandırma, `proxy_pass` rule'ları, body size limiti (26MB), rate limit (rota bazlı: auth, bot).
- **Health:** `/healthz` (liveness), `/readyz` (dependency'ler: pg, redis, minio) — orchestrasyon ve nginx healthcheck kullanır.

### 7.2 CI/CD (GitHub Actions)

| Aşama | İçerik |
|---|---|
| lint / typecheck / unit test | push + PR (örnek: `pnpm lint`, `pnpm typecheck`, `pnpm test`) |
| e2e (önemli akış) | tenant→login→modül akışı (docker compose üzerinde) |
| build & docker push | main'e merge'de imaj build + registry push |
| migration doğrulama | template DB'ye migration uygula, integrity kontrol |
| deploy | hedef ortama (staging → prod onaylı); kiracı DB'lerine migration-runner tetikle |

Commit kuralları: **Conventional Commits**, **SemVer**, **PR** zorunlu (doğrudan main'e push yok) — bkz. AGENTS.md ve `90-versioning-git` skill.

---

## 8. Gözlenebilirlik ve Güvenlik (Yatay)

| Alan | Yaklaşım |
|---|---|
| Loglama | Yapılandırılmış JSON; correlation `requestId`; kiracı/tesis alanlarında PII loglanmaz |
| Metrikler | Prometheus formatında (HTTP latency, kuyruk derinliği, DB bağlantı, hata oranı) |
| İzleme | OpenTelemetry (opsiyonel; ilk adımda log+metrik yeterli) |
| Hata takibi | Sentry (veya eşdeğeri) — backend + frontend |
| Uyarılar | Kritik hata oranı eşiği → Telegram/e-posta |
| Güvenlik | TenantGuard tüm modüllerde; yükleme sahtecilik taraması (mimetype magic bytes); CORS whitelist; rate limit; helmet; aralık istekleri (`Range`) sınırlı |
| Yedekleme | pg_dump günlük tam + saatlik artımlı; MinIO replication; RPO ≤ 24s, RTO ≤ 4s |

---

## 9. Veri Akışı Örnekleri

### 9.1 Fotoğraf Yükleme (Delil)

```
İstemci → POST /v1/storage/presign {tesisId, tip, name, size}
Backend → izin kontrolü (modul:create + tenant) → MinIO presigned URL → döner
İstemci → PUT (doğrudan MinIO)
İstemci → POST /v1/incidents/{id}/photos {objectKey, keepOriginal:true}
Backend → stol:process kuyruğu → Sharp thumb/medium/large → orijinal saklanır → DB güncel
Janitor → eski/aday originalleri temizle (24 saat sonra, keep_original=false ise)
```

### 9.2 Kaza Kaydı ve Bildirim

```
POST /v1/safety/incidents (JWT + tenant + RBAC) 
  → olay (kaza) audit kaydı
  → domain event "incident.created" 
      → bildirim kuralı eşleşmesi (tetikleyici: critical)
      → BullMQ job → Telegram (ilgili amir grubu) + e-posta (grup İSG müdürü)
```

### 9.3 Kiracı Açılışı (Provisioning)

```
Platform admin → POST /v1/platform/tenants {grupBilgileri, modülliste}
Provisioner → template-DB klon → migration uygula → tenant kaydı (meta-DB) → 
              varsayılan ayarlar (e-posta/Telegram/bildirim/departman/kategori) kopyala
İlk yönetici kullanıcı + geçici parola → 2FA kurulum zorunluluğu
```

---

## 10. Açık Teknik Kararlar (netleştirilecek)

| # | Karar | Öneri | Gerekçe |
|---|---|---|---|
| T1 | Kiracı belirleme | `X-Tenant-Id` başlığı | URL temiz; proxy'de loglanabilir |
| T2 | Prisma çoklu datasource stratejisi | Tenant başına client havuzu (lazy) | Prisma dynamic datasource desteğinin sürüm kontrolü gerekir |
| T3 | Workspace manager | PNPM workspaces + TurboRepo | Hızlı, yaygın |
| T4 | ABAC motoru | İlk sürümde kod içi politika fonksiyonları (casbin opsiyonel) | Küçük başla; kurallar config'e geçebilir |
| T5 | Rapor PDF motoru | HTML şablon + Chromium (puppeteer/playwright) | Branding/logo kolay |
| T6 | E-posta alt yapısı | nodemailer + Nodemailer SMTP pool | Basit, olgun |

---

## 11. Başarı Kriterleri (Mimari)

- Modül bağımsızlığı: bir modülün testi diğerlerini başlatmadan çalışır (unit) — e2e'de module kapsamı izole.
- Tenant izolasyon testi: çapraz tenant erişim denemesi %100 red (otomatik güvenlik testi CI'da).
- Migration-runner: N kiracı DB'sine aynı migration'ı sırayla uygular; betiği bozuk sürümde hiçbir DB yarıda kalmaz.
- Yük testi: 500 eşzamanlı kullanıcı, p95 API < hedef (PRD §8.2).
- Yükleme/indirme zinciri: 10 MB fotoğraf yükleme p95 < 5 sn (presigned akış üzerinden).
