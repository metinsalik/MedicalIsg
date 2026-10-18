---
name: 90-versioning-git
description: Git/GitHub sürüm kontrolü, Conventional Commits, Semantic Versioning, PR akışı ve GitHub Actions entegrasyonu. Ordu hafızası — her iş versiyonlanır. (YENİ — Kullanıcının Ana İsteği)
---

> 📁 Kayıt Yolu: `.agents/skills/90-versioning-git/SKILL.md`

# 🔖 Sürüm Kontrol ve GitHub (YENİ)

## Amaç
Tüm kod, konfigürasyon ve dokümantasyonun GitHub üzerinde tutarlı, izlenebilir ve otomatik versiyonlanması. **Bu orduya hafıza kazandırır: her değişiklik geri alınabilir ve belgelenebilir.**

## A. Dal (Branch) Stratejisi
- `main` — her zaman çalışır, üretime hazır (korumalı, doğrudan push yasak).
- `develop` — entegrasyon dalı (GitFlow istenirse).
- `feature/{modul}-{kisa-aciklama}` — kısa ömürlü özellik dalları.
- `fix/{konu}` , `hotfix/{konu}` — düzeltme dalları.
- `release/{surum}` — sürüm hazırlık dalı (SemVer).

## B. Commit Konvansiyonu (Conventional Commits)
```
feat(risk): yeni risk kaydı akışı
fix(olay): onay döngüsü düzeltildi
docs: mimari güncelleme
refactor(rapor): sorgu optimizasyonu
test(auth): 2FA testleri eklendi
chore: bakım
```
- Format: `tip(kapsam): açıklama` + gövde (neden) + `BREAKING CHANGE` (varsa).
- Commit mesajları **Commitlint** ile CI'da kontrol edilir (`51-devops-cicd`).

## C. Sürümleme (Semantic Versioning)
- `MAJOR.MINOR.PATCH` (örn. `1.4.2`).
- Commit mesajlarından otomatik sürüm çıkarımı (Changesets / semantic-release).
- `CHANGELOG.md` otomatik üretilir.
- Her sürüm: Git tag + GitHub Release (notlarla).

## D. Pull Request Akışı (Zorunlu)
- Her değişiklik PR ile gelir; doğrudan `main`'e push YOKTUR.
- PR şablonu: ne değişti, neden, test edildi mi, ekran görüntüsü (UI varsa).
- En az bir inceleme (`63-reviewer`) onayı.
- CI yeşil olmadan merge yok. Merge: squash (temiz geçmiş).

## E. GitHub Actions Entegrasyonu
- PR'da: lint + typecheck + test + build + migration doğrulama (şablon DB).
- `main` merge'inde: otomatik sürüm + tag + release + deploy (`51-devops-cicd`).

## F. .gitignore ve Sır Yönetimi
- `.env`, `node_modules`, `dist`, `coverage`, MinIO verileri, backup'lar hariç.
- Sırlar asla commit edilmez; yalnızca `.env.example` şablonu tutulur.
- Yanlışlıkla commit edilen sır → derhal rotate et (log/geçmişten silmek yetmez).

## G. SKILL DOSYALARI DA VERSİYONLANIR
Bu ordunun kendi skill'leri de sürüm kontrolündedir: skill değişiklikleri kendi PR'larıyla gelir ve sürümlenir — ordu kendini de geliştirir.

## Çıktı
Her geliştirme adımının sonunda **"Version Status"** raporu:
`dal` → işlenen commit'ler → açık PR'lar → CI durumu → son sürüm → tag durumu.
