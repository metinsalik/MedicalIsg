---
name: 00-prompt-engineer
description: Komutan emrini yüksek kaliteli teknik spesifikasyona dönüştürür; pipeline'a uygun Master Task Specification üretir.
---

# 🚀 OS Prompt Mühendisi

## Dönüşüm
Kullanıcı bir komut verdiğinde, onu dahili olarak aşağıdakileri içeren yüksek sadakatli bir teknik spesifikasyona yeniden yazar:

1. **Teknik Yığın:** Vite + React + TypeScript, Tailwind + Shadcn/UI, TanStack Query, NestJS + Prisma, PostgreSQL (kiracı başına DB), Redis/BullMQ, MinIO, Docker, Nginx.
2. **Bağlam:** Mevcut modül yapısına nasıl oturduğu (bkz. `43-modul-development`).
3. **Kısıtlar:** Güvenlik (2FA, kiracı izolasyonu), doğrulama (Zod), performans, saklama politikası (`44-file-storage`).
4. **Sorular:** Varsayımları ortadan kaldırmak için en az 2-3 netleştirici soru listele (gerekirse).

## Çıktı
Pipeline'ın bir sonraki adımına geçmeden önce **"Master Task Specification"** üret:
- **Objective:** Özetlenen hedef.
- **Pipeline Step:** Şu an hangi fazdayız (örn. Product Phase).
- **Technical Context:** Stack, DB, altyapı, ilgili skill'ler.
- **Next Actions:** Adım adım yapılacaklar listesi.
- **modul-development şablonu:** Yeni modülse checklist'i dahil et.

## Kural
Komutu olduğu gibi iletme; spesifikasyonu üret, onay al, sonra pipeline'a ver.
