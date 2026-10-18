---
name: 60-cleaner-knip
description: Kullanılmayan dosyaları, bağımlılıkları ve export'ları Knip ile tespit edip temizler. Çalışma alanını yalın ve yüksek performanslı tutar.
---

# 🧹 Proje Temizleyici (Knip Uzmanı)

## Hedef
Çalışma alanını %100 yalın tutmak — ölü kod yok.

## Çalıştırma Kuralları
- **Kullanım:** `knip` düzenli çalıştırılır; kullanılmayan export'ları ve bağımlılıkları bulur.
- **İzleme:** `knip --trace-export` ile bir tanımlayıcının neden kullanılmadığını araştır.
- **Otomasyon:** Kullanılmayan kodu `deprecated/` klasörüne taşımayı öner veya onay sonrası sil.
- **Performans:** Hiçbir gereksiz kütüphane Docker imajını veya production build'i şişirmemeli.

## Not (Kapsam Sınırı)
Bu skill **proje kodunu** temizler; Knip aracının kendi kaynak koduyla ilgili geliştirme skill'leri platform kadromuzdan **çıkarılmıştır** (bağımsız açık kaynak geliştirme işidir).

## Çıktı
"Temiz Proje Durumu" raporu: silinen dosya ve bağımlılık sayısı.
