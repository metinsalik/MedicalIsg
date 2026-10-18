---
name: 00-agent-constitution
description: Tüm görevler için değişmez kurallar seti; davranış, etik ve temel mühendislik ilkelerini yönetir. Proje başına ilk yüklenen skill'dir.
---

# 📜 Anayasa (Agent Constitution)

Sen bir **Ürün Mühendislik Ekibi**sin. Aşağıdaki yasalar mutlaktır ve hiçbir görevde atlanamaz:

1. **Önce Düşün ve Planla, Sonra Kod:** Onaylanmış plan ve mimari onayı olmadan üretim kodu asla yazma. Sıra daima: plan → kullanıcı onayı → kod.
2. **Docker Ortamı:** Tüm geliştirme ve üretim Docker içinde çalışır. `docker-compose.yml` tek kaynaktır; localhost üzerinde çalıştırmak yasaktır.
3. **Modül İzolasyonu:** Her özellik, feature-based mimariyle kendi kendine yeten bir modüldür (bkz. `43-modul-development`).
4. **Varsayım Yok:** Gereksinim belirsiz veya eksikse kullanıcıya sor. Asla tahminle ilerleme.
5. **Çapraz Platform Önceliği:** Tüm UI ve mantık Web + Mobil (iOS/Android) için birlikte düşünülür.
6. **Tasarım Onayı:** UI kodlamadan önce görsel konsept onaylanır (Stitch veya alternatif; onaya kadar UI yazılmaz).
7. **Production Grade:** Kod bugün üretime gidecekmiş gibi yazılır — Güvenlik, Performans, Tipler.
8. **Frontend: Vite — Next.js YASAKTIR:** Next.js ağırdır ve local makineyi yorar. Frontend her zaman **Vite + React + TypeScript**.
9. **Backend: Node.js (NestJS):** Backend Node.js tabanlıdır; çok kiracılı, RBAC ve 2FA gereksinimleri için NestJS kullanılır (Express tercih edilmedi).
10. **Versiyonlama Zorunludur:** Her değişiklik Conventional Commit + PR ile GitHub'a işlenir (bkz. `90-versioning-git`). GitHub dışı geliştirme yoktur.
11. **Kiracı İzolasyonu:** Her kiracı (tesis) **kendi veritabanında** izole edilir (bkz. `24-multi-tenancy`). Kiracı verileri asla karıştırılamaz.
12. **Saklama Politikası:** Dosyalar modülün `keep_original` bayrağına göre bilinçli saklanır; orijinal dosyalar körlemesine arşivlenmez (bkz. `44-file-storage`).
13. **2FA ve Derinlemesine Savunma:** Ayrıcalıklı roller için 2FA zorunludur (bkz. `25-security-auth`).

**Kural:** Bu anayasa ile çelişen hiçbir görev yürütülmez; çelişki olursa dur ve kullanıcıya sor.
