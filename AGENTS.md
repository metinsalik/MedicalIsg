# AGENTS.md — Medical ISG Projesi AI Ajan El Kitabı

Bu dosya, bu depoda çalışan **AI kodlama ajanına** (ve insan geliştiricilere) projeyi nasıl anlaması ve üzerinde nasıl çalışması gerektiğini söyler. İşe başlamadan önce oku.

---

## 1. Proje Nedir?

**Medical ISG** — çok kiracılı (multi-tenant), modüler bir **Entegre Tesis Yönetim Sistemi (ETYS)**. Sağlık sistemlerine entegre, Türkiye'de kurumsal müşterilere (A Grup A.Ş. gibi) hizmet veren B2B SaaS.

- Modüller (her biri **bağımsız** çalışır): Operasyon Yönetimi, İş Güvenliği, İş Sağlığı, Varlık Envanteri, Taşeron Yönetimi, Atık Yönetimi.
- **0. Katman (Platform Çekirdeği):** Grup→Tesis hiyerarşisi, kullanıcı/rol, modül erişim ayarları, e-posta/Telegram/bildirim ayarları, departman ve kategori tanımları. **Tüm modülleri etkiler.**

Detay: `PRD.md`.

---

## 2. Başlamadan Önce Zorunlu Okuma

Bir göreve başlamadan önce (görevin kapsamına göre) şu dosyaları oku:

| Dosya | Ne verir |
|---|---|
| `PRD.md` | Ürünün **neyi, kimi, neden**; modül gereksinimleri ve kabul kriterleri |
| `Architecture.md` | **Nasıl yapılandırıldığı**; monorepo, modüller, DB/tenant modeli, depolama, kuyruk, dağıtım |
| `Design-System.md` | Renk, tipografi, boşluk, radius, gölge, bileşen kuralları (shadcn/ui + token) |
| `BRANDING.md` | Logo kullanımı, marka token kaynağı |
| `.agents/skills/` | İlgili göreve uygun **skill klasörü** varsa onu oku ve kurallarına uy (bkz. §8) |

> Kural: Hiçbir kod değişikliğine bu dokümanların ilgili bölümünü görmeden başlama. "Bilmiyorum, kabataslak mantığım" ile değişiklik yazma.

---

## 3. Teknoloji Yığını (Sabit Kararlar)

| Katman | Teknoloji | Kural |
|---|---|---|
| Frontend | **Vite + React + TypeScript** | **Next.js KESİNLİKLE YASAK.** SSR/SSG gerektiren özellikler istenirse müşteriye sor, ekleme |
| Backend | **Node.js + NestJS + Prisma** | Express kullanılmaz; NestJS modül/guard yapısı zorunlu |
| Veritabanı | **PostgreSQL** | Kiracı başına ayrı DB (model A); asla paylaşımlı iş verisi |
| Depolama | **MinIO (S3) + Sharp** | Presigned URL akışı; foto ≤10MB, PDF ≤25MB; TIFF/RAW red |
| Kuyruk | **Redis + BullMQ** | Asenkron işler; retry + DLQ; `setInterval`/`while(true)` YASAK |
| Bildirim | **Telegram Bot API + SMTP** | 0. Katman tetikleyici ayarlarından beslenir |
| Kimlik | 2FA TOTP · JWT (15dk) · Argon2id · RBAC+ABAC | Ayrıcalıklı rollerde 2FA zorunlu |
| Mobil | Faz 2: **Expo/React Native** | Web ile aynı REST API + `@shared/types` |
| Altyapı | Docker Compose + Nginx | Kod yalnızca Docker ortamında çalışır (`localhost` çalıştırma yok) |
| Sürüm | GitHub · Conventional Commits · SemVer · PR · CI/CD | Doğrudan main'e push yok |

---

## 4. Depo Düzeni

```
MedicalIsg/
├── apps/web/            → Vite frontend (features/<modul>/)
├── apps/backend/        → NestJS API (platform/ + modules/<modul>/)
├── packages/shared/     → @isg/shared: DTO'lar, sabitler, türler — tek kaynak
├── infra/               → docker-compose.yml, nginx conf, migration-runner
├── .agents/skills/      → Antigravity skill ordusu (38 skill)
├── PRD.md · Architecture.md · Design-System.md · BRANDING.md · AGENTS.md
```

**Kritik lokasyon bilgisi:**
- API DTO'ları `packages/shared` içinde tanımlanır; backend ve frontend oradan import eder. **Aynı tipi iki yerde yeniden yazma.**
- Backend modül yapısı: `src/platform/{tenant,iam,settings,licensing}` (0. Katman) ve `src/modules/{operations,safety,health,assets,contractor,waste}`.
- Frontend modül ekranları: `src/features/<modul>/`.

---

## 5. Çalışma Kuralları (Zorunlu)

1. **Önce plan:** Bir değişiklik birden fazla dosyayı etkiliyorsa (veya schema değişikliği içeriyorsa) önce kısa bir plan yaz/yürüt; mimariyi atlayarak üretken kod yazma.
2. **Modül izolasyonu:** Bir modülün içinden başka modülün service'ine doğrudan erişme; servis arayüzü veya domain event kullan. Modül eklerken mevcut modülleri değiştirme (yalnızca gerekiyorsa ve açıkça onaylı).
3. **Tenant farkındalığı:** Yeni sorgu/endpoint yazarken **tenant + tesis** filtresini asla unutma. Kiracı izni = savunmanın en kritik hattı. Test: çapraz tenant erişim denemesi.
4. **Tip güvenliği:** TypeScript strict; DTO'lara Zod doğrulama; `any` kullanma (zorunlu durumda yorumla).
5. **Hata işleme:** Servis hatalarını yakala ve tutarlı formatta döndür (`{statusCode, message, code, requestId, path}`). Motor hata detayını istemciye sızdırma.
6. **Loglama:** Kritik işlemlerde yapılandırılmış log; PII (KVKK) loglamaya. Audit için `AuditInterceptor`'dan geçen yazma işlemlerini koru.
7. **Async işler:** Yavaş iş (e-posta, Telegram, rapor, görsel işleme) **kesinlikle kuyruğa (BullMQ)** atılır; istek içinde senkron yapma.
8. **Dosya sınırları:** Yükleme tür/boyut kurallarını (foto 10MB, PDF 25MB, TIFF/RAW red) her giriş noktasında uygula.
9. **İzin kontrolü:** Her endpoint için RBAC (`@Roles`) ve gereken yerlerde ABAC koşulunu ekle; 2FA zorunlu rolleri koru.
10. **UI kuralları:** Yalnızca Design-System.md token'larını kullan; ham hex/spacing yazma; mevcut shadcn/ui bileşenlerini yeniden icat etme.

### 5.1 Kesin Yapma Listesi

- ❌ Next.js' öner (kod, konfigürasyon, doküman).
- ❌ Express tabanlı yeni servis yaz.
- ❌ Paylaşımlı veri tabanı kullan (iş verisi için).
- ❌ `while(true)` / `setInterval` ile arka plan döngüsü kur (kron/BullMQ kullan).
- ❌ Gizli bilgileri (parola, token, DB URL) koda/kayıt dosyasına yaz — `.env` + secret yönetimi.
- ❌ Sağlık verisi içeren tabloyu genel sorguya açar; erişim hep kısıtlı.
- ❌ "Büyük temizlik" refactor'u kapsam dışı dosyalarda yap (küçük, hedefli değişiklik).
- ❌ `packages/shared`'daki türleri vue/duplicate et.

---

## 6. Yaygın Komutlar (referans — kök dizinde)

```bash
# (PACKAGE_MANAGER: workspace manager — kurulumdan sonra netleşir; PNPM önerilir)

pnpm install                 # bağımlılıklar
pnpm dev:web                 # vite dev (web)
pnpm dev:backend             # nest start --watch (backend)
pnpm typecheck               # tüm workspace
pnpm lint                    # eslint
pnpm test                    # unit testler
pnpm e2e                     # uçtan uca (docker compose üzerinde)
pnpm build                   # web + backend üretim
pnpm prisma:migrate:template # şablon DB'ye migration uygula + doğrula
pnpm prisma:migrate:tenants  # migration-runner — tüm kiracı DB'lerine uygula
docker compose up -d         # infra kaldırma (postgres/redis/minio/nginx...)
```

> `apps/backend` ve `apps/web` ayrı ayrı çalıştırılır; üretimde Nginx `web` statik dosyalarını ve `/api` → backend proxy'sini verir.

---

## 7. Git ve Sürüm Kuralları

- **Conventional Commits:** `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`, `perf:`, `ci:` … İngilizce geleneği: `feat(safety): incident export`.
- **PR zorunlu:** Özellik/bugfix → branch (`feat/...`, `fix/...`) → PR → review → merge (squash). Main'e doğrudan push yok.
- **SemVer:** `X.Y.Z`; breaking → major. Release etiketlenir.
- **CI yeşil olmadan merge yok:** lint / typecheck / test / build geçmeli; migration doğrulaması yapılmalı.
- Schema değişikliklerinde: `prisma migrate` + template doğrulaması + migration-runner'ı PR açıklamasında belirt.

İlgili skill: `.agents/skills/90-versioning-git/SKILL.md`.

---

## 8. Skill Ordusu Kullanımı

`/home/ubuntu/isg_skill_ordusu/.agents/skills/` içinde (projede: `.agents/skills/`) **38 skill** vardır. Görevin niteliğine göre ilgili skill dosyasını oku ve gerekliliklerini uygula:

| Görev türü | Skill katmanı |
|---|---|
| Muhakeme/plan | `00-thinking-mode`, `04-workflow-orchestrator` |
| Ürün/paydaş | `10-product-manager`, `11-business-analyst` |
| Mimari/veri | `20-software-architect`, `21-database-architect`, `23-api-design`, `24-multi-tenancy`, `25-security-auth` |
| UI öncesi | `31-stitch-expert`, `30-design-system` |
| Frontend/backend kod | `40-fullstack-engineer`, `43-modul-development` |
| Dosya depolama | `44-file-storage` |
| Entegrasyon | `45-integration-hub` |
| Altyapı | `50-docker-architect`, `51-devops-cicd`, `52-observability` |
| Kalite | `60-quality-assurance`, `61-testing`, `63-reviewer`, `64-retrospective` |

Kural: Göreve uyan skill varsa, o skill'in kurallarına uy; skill yoksa genel bu dokümandaki kurallar geçerlidir.

---

## 9. Görev Yürütme Şablonu (AI Ajan İçin Önerilen Adımlar)

1. **Anla:** Görevi oku; belirsizse PRD ilgili bölümüne bak. Açık değilse **kullanıcıya sor** (varsayım yapma).
2. **Konteksti kur:** İlgili dokümanları gözden geçir; mevcut koda bak (kodun güncel haline bak — asla eski bilgiyle).
3. **Planla:** Değişecek dosyalar; schema ise migration planı; test planı.
4. **Uygula:** Küçük, hedefli değişiklikler; commit'leri anlamlı parçalara böl.
5. **Doğrula:** `typecheck` + `lint` + ilgili testler; **başarı iddia etmeden önce çıktıyı kendin gör** (log, test sonucu, tarayıcı ekranı).
6. **Temiz bırak:** Çalışmayan/yarım dosya bırakma; TODOs'u açıkça listele.

---

## 10. Başarısızlık ve Engel Yönetimi

- Bir şey 2 kez başarısız olduysa aynı yolu tekrar deneME; dur, neyi yanlış yaptığını yeniden teşhis et, gerekiyorsa kullanıcıdan bilgi iste.
- Dış servis (Telegram, SMTP, MinIO) bağlanamıyorsa: engeli raporla; sessizce "tamam" deme.
- Güvenlikle ilgili belirsizlikte (tenant filtresi, yetki, PII): mimari dokümanı yeniden oku; hala emin değilsen sor.

---

## 11. Sürüm Notu

| Tarih | Sürüm | Değişiklik |
|---|---|---|
| 2026-10-18 | 1.0 | İlk sürüm — PRD/Architecture/Design-System ile uyumlu |
