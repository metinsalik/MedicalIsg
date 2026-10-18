# PRD — Medical ISG: Entegre Tesis Yönetim Sistemi (ETYS)

| Alan | Değer |
|---|---|
| Ürün | Medical ISG — Entegre Tesis Yönetim Sistemi |
| Sürüm | 1.0 (Taslak) |
| Tarih | 18 Ekim 2026 |
| Durum | Yoruma açık (draft) |
| Doküman Sahibi | Ürün Yönetimi |

---

## 1. Özet (Executive Summary)

**Medical ISG**, birden fazla kurumsal müşteriye (kiracı/tenant) hizmet veren, **modüler, çok kullanıcılı bir Entegre Tesis Yönetim Sistemi (ETYS)**dir. Sistem; **Varlık Envanter Yönetimi, Taşeron Yönetimi, İş Sağlığı ve Güvenliği Yönetimi (İSG), Atık Yönetimi ve Operasyon Yönetimi** modüllerini tek bir platform üzerinde birleştirir. Her modül kendi içinde bağımsız çalışabilir; modüller arası veri paylaşımı açık ve kontrollü bir bütünleşme modeliyle yapılır.

Sistemin en kritik organizasyonel özelliği **iki seviyeli kiracı hiyerarşisidir**: önce ana grup (ör. *A Grup A.Ş.*, *B Grup A.Ş.*) açılır; grubun altına tesisler (ör. *A Tesisi*, *B Tesisi*, *C Tesisi*) eklenir. **0. Katman (Platform Çekirdeği)** olarak adlandırılan yapı; e-posta ayarları, kullanıcı ve rol yönetimi, modül erişim ayarları, Telegram entegrasyonu, uygulama bildirim ayarları, departman ve kategori tanımları gibi **tüm modülleri etkileyen** merkezi kurulumu barındırır.

Bu PRD, ürünün **neyi, kimin için, neden ve nasıl** geliştireceğini eleştirel bir gözle tanımlar; öncelik sırası, kabul kriterleri, riskler ve yol haritası dahil olmak üzere geliştirme ekibine ve ilgili paydaşlara tek kaynak görevi görür.

---

## 2. Arka Plan ve Problem

### 2.1 Mevcut Durum (Problem Trüpü)

İşletmelerin tesis yönetimi süreçleri geleneksel olarak **birbirinden kopuk araçlarda** yürütülür:

- İSG kayıtları Excel tablolarında, kağıt formlarda veya tek kullanıcılı yerel yazılımlarda tutulur.
- Varlık envanteri ve bakım takibi ayrı bir sistemde, taşeron sözleşme ve belgeleri başka bir yerde durur.
- Atık yönetimi kayıtları genellikle mevzuatın istediği süreler boyunca saklanmaz veya dağınıktır.
- Operasyonel görevler (ariza bildirimi, periyodik kontrol, vardiya işleri) sözlü veya kağıt üzerinde ilerler; **izlenebilirlik** yoktur.
- Grup şirketleri (holding) için her tesiste aynı kurulumun **yeniden yapılması** gerekir; merkezi politika uygulamak zordur.

### 2.2 Sonuçları

- Denetimlerde (çalışma ve sosyal güvenlik bakanlığı iş müfettişleri, çevre denetimleri, ISO 45001/9001 denetimleri) veri toparlama günler alır.
- Risk değerlendirmesi ve kaza/olay kayıtları güncel değildir; **önleyici aksiyon** kültürü gelişmez.
- Delil niteliği taşıyan fotoğraf ve belgeler silinir veya kaybolur (KVKK ve yasal saklama yükümlülüğü ihlali).
- Taşeron personelinin saha giriş yetkisi, eğitimi ve sağlık raporu takibi sürdürülemez — ciddi hukuki risk.

### 2.3 Neden Şimdi?

Çok sayıda tesisi olan kurumlar (sağlık grupları, üretim holdingleri, lojistik firmaları) hem **mevzuat baskısı** hem de **sigorta/maliyet baskısı** altında. Riskleri tek panelde gören, modüller arası entegre bir tesis yönetim platformu, hem uyumluluk hem operasyonel verimlilik anlamında net geri dönüş sağlar.

---

## 3. Amaç, Hedef Olmayanlar ve Değer Önerisi

### 3.1 Ürün Vizyonu

> Tesis yönetimindeki tüm kritik süreçleri (güvenlik, sağlık, varlık, taşeron, atık, operasyon) **tek platformda, kiracı düzeyinde izole ve modüler** olarak yönetilebilir kılan, sağlık sistemleriyle entegre, kurumsal düzeyde bir SaaS çözümü olmak.

### 3.2 Stratejik Amaçlar (Goals)

1. **G1 — Modülerlik:** Her modül bağımsız kurulur, bağımsız çalışır, bağımsız lisanslanır; aynı veri çekirdeğini paylaşır.
2. **G2 — Çoklu Kiracı Güvenliği:** Grup ve tesis hiyerarşisinde veri izolasyonu tartışmasız gibidir (bkz. Architecture: kiracı başına veritabanı).
3. **G3 — İzlenebilirlik:** Kaza, ramak kala, arıza, atık çıkışı, bakım gibi tüm olaylar denetim izi (audit trail) ile kayıt altında.
4. **G4 — Mevzuat Uyumu:** 6331 sayılı İSG Kanunu, Atık Yönetimi Yönetmeliği, KVKK ve sektörel gereklere uygun veri modeli ve saklama politikaları.
5. **G5 — Verimlilik:** Denetim/raporlama sürelerini %70+ kısaltmak; doküman kayıplarını sıfıra yaklaştırmak.

### 3.3 Hedef Olmayanlar (Non-Goals — v1)

- İnsan kaynakları bordro/maaş modülü (entegrasyon için sadece personel kimlik verisi giriş kapısı).
- Muhasebe/finans, e-fatura süreçleri (atık modülünde yasal formlara link verilir, muhasebeye girilmez).
- Genel amaçlı bir CMMS/EAM olmak; bakım modülü bağımsız bir CMMS'in yerini hedeflemez, tesis operasyonuna hizmet eden kapsamdadır.
- IoT/SCADA veri toplama (v1'de; API altyapısı geleceğe hazır bırakılır).
- Mobil uygulama (Faz 2; web önce gelir, aynı REST API kullanılır).

### 3.4 Değer Önerisi

| Paydaş | Değer |
|---|---|
| Grup yönetimi (A Grup A.Ş.) | Tüm tesisleri tek panelden görür, merkezi politika uygular, kiracı izolasyonuyla risk yönetir |
| Tesis yöneticisi | Tüm süreçleri tek platformda yönetir, denetime hazır veriye anında erişir |
| İSG uzmanı | Risk değerlendirmesi, kaza/olay, eğitim, KKD takibi için disiplinli bir iş akışı kazanır |
| Saha personeli | Tehlike bildirimi, kontrol listesi, arıza bildirimi birkaç tıkla yapılır (mobil uygulama ile saha önceliği) |
| Taşeron yetkilisi | Belge/eğitim/izin akışı dijitalleşir; sahaya giriş yetkileri şeffaf |
| Denetçi (iç/dış) | Kanıt zinciri korunmuş, zaman damgalı, eksiksiz kayıtlar |

---

## 4. Kişilikler ve Kullanım Senaryoları

### 4.1 Kişilikler (Personas)

| Kişilik | Rol | Temel İhtiyaç | Ürün Beklentisi |
|---|---|---|---|
| **P1** | Grup İSG Müdürü (A Grup) | Tüm tesislerin İSG performansını izleme | Şirket bazlı dashboard, karşılaştırmalı raporlar, merkezi politika şablonları |
| **P2** | Tesis Yöneticisi | Günlük saha operasyonunu yürütme | Görev/onay akışları, tesis bazlı takvim, modül erişim yönetimi |
| **P3** | İSG Uzmanı (İş Güvenliği) | Risk, kaza, ramak kala, eğitim, KKD, kontrol listeleri | Hızlı veri girişi, otomatik kontroller, yasal raporlar |
| **P4** | İşyeri Hekimi / İş Sağlığı Sorumlusu | Periyodik muayene, sağlık raporları, meslek hastalığı | Çalışan bazlı sağlık takvimi, rapor arşivi, gizlilik |
| **P5** | Bakım/Varlık Sorumlusu | Envanter, kalibrasyon, periyodik bakım | QR/barkod ile hızlı sorgulama, bakım planı, zimmet devri |
| **P6** | Taşeron Firma Yetkilisi | Firma belgelerini ve personelini yönetme; saha izni alma | Kısıtlı portal, belge yükleme, eğitim takibi |
| **P7** | Saha Çalışanı | Tehlike bildirmek, kontrol listesi doldurmak | Basit, mobil uyumlu, minimal arayüz (Faz 2'de mobil) |
| **P8** | Sistem Yöneticisi (Platform) | Kiracı/sistem kurulumu, ayarlar | 0. Katman yönetimi, kiracı provisioning |

### 4.2 Örnek Senaryolar

- **S1 (Kaza kaydı):** Bir işçi A Tesisi'nde düşme yaşar → İSG uzmanı kaza kaydı açar (delil fotoğrafları ile), kök neden analizi tetiklenir, ilgili ekip üyeleri Telegram üzerinden bilgilendirilir, aksiyon planı atanır ve takip edilir.
- **S2 (Denetim):** Grup İSG müdürü, B Tesisi'nde aylık denetim yapar; denetim bulguları aksiyon görevlerine dönüşür; açık bulgular dashboard'da takip edilir.
- **S3 (Taşeron girişi):** Taşeron firma yeni personelini sisteme yükler (kimlik, sağlık raporu, oryantasyon eğitimi). Sistem eksik belgeleri kırmızı gösterir; eksik personel saha giriş izni alamaz.
- **S4 (Varlık/müdahale):** Jeneratörde arıza → Varlık Envanteri'nden QR okutulur, arıza kaydı açılır, bakım ekibine görev atanır, bakım geçmişi güncellenir.
- **S5 (Atık):** Tıbbi atık çıkışı; atık türü, miktarı, lisanslı firma, taşıma formu numarası kaydedilir; periyodik rapor hazırlanır.

---

## 5. Sistem Organizasyonu: Çok Kiracılı Hiyerarşi ve 0. Katman

### 5.1 Hiyerarşi Modeli

```
PLATFORM (SaaS)
│
├── [0. Katman] Grup A A.Ş.          ← ANA KİRACI (tenant)
│     ├── Tesis A-1
│     ├── Tesis A-2
│     └── ...
├── [0. Katman] Grup B A.Ş.          ← ANA KİRACI (tenant)
│     ├── Tesis B-1
│     └── ...
```

- **Grup (tenant):** İzolasyon birimi. Veritabanı, depolama alanı ve ayar takımı grup düzeyinde ayrılır.
- **Tesis:** Grubun altında yer alan operasyonel birim. Departman, lokasyon, varlık, görev gibi kayıtlar tesise bağlanır.
- Kullanıcılar bir gruba ve (opsiyonel) tesise atanır; yetki modeli RBAC + ABAC (bkz. Architecture) ile hiyerarşiyi yansıtır.

### 5.2 0. Katman (Platform Çekirdeği) — Tüm Modülleri Etkileyen Merkez

0. Katman bir "modül" değil, **platformun kurulum/temel katmanıdır**; diğer tüm modüller bunun üzerine oturur ve şu merkezi ayarlara bağımlıdır:

| Alan | Açıklama | Kapsam |
|---|---|---|
| **Grup & Tesis yönetimi** | Grup ve tesis açma/kapama, hiyerarşi, tesis bilgileri (adres, SGK sicil, sektör) | Tüm kayıtlara etki |
| **Kullanıcı & Rol yönetimi** | Kullanıcı tanımı, e-posta/telefon, roller (RBAC), tesise göre yetki (ABAC), 2FA zorunluluğu | Tüm modüllerin erişimi |
| **Modül erişim ayarları** | Hangi modülün hangi tesiste/kullanıcı grubunda aktif olduğu; lisans aktivasyonu | Modül aktivasyonu |
| **E-posta ayarları** | SMTP yapılandırması, gönderici adı, şablon seçimi, test gönderimi | Bildirimler, rapor teslimi |
| **Telegram ayarları** | Bot token, sohbet/grup eşleşmeleri, hangi olayların Telegram'a düşeceği | Saha bildirimleri, acil durum |
| **Uygulama bildirim ayarları** | Bildirim türü (e-posta/Telegram/push), kanal tercihleri, saat kısıtları, sessiz saatler | Tüm olay/tetikleyici tipleri |
| **Departman ayarları** | Departman ağacı (teknik, idari, sağlık, güvenlik…) | Varlık, görev, izin, eğitim atamaları |
| **Kategori ayarları** | Varlık kategorileri, atık türleri, tehlike tipleri, doküman türleri gibi **sanal listeler** | Tüm modüllerin açılır menüleri (merkezi tanım) |
| **Dil & bölge** | Türkçe varsayılan; dil, para birimi, tarih/saat formatları | Tüm arayüz ve raporlar |

> **Tasarım ilkesi:** 0. Katmandaki her ayar değişikliği, etkilediği modüllerde **anında ve tutarlı** yansımalıdır (ör. "Departman sil" işlemi ilgili kayıtlarda engellenecekse bunu sistem reddetmeli, sessizce veri bozulmamalı).

### 5.3 Modül Bağımsızlığı Kuralı

- Her modül kendi veri modeli, servisleri ve ekranlarına sahiptir.
- Bir modül kapalıysa diğerleri çalışmaya devam eder (graceful degradation).
- Modüller arası etkileşim yalnızca **açık tanımlanmış entegrasyon noktaları** (servis arayüzleri / domain event'ler) üzerinden olur.
- Modüllere tekil yetki verilir: ör. "Çalışan" kaydının sahibi kimlik modülüdür; İSG modülü çalışanı referans alır, kendi kopyasını yaratmaz.

---

## 6. Modül Gereksinimleri

Modüllerin her biri için: **Amaç → Ana Kullanıcılar → Temel Özellikler (M=Sahip olmalı, S=Olmalı) → Alt Modüller → Veri İlişkileri → Kabul Kriterleri** verilmiştir.

### 6.1 Operasyon Yönetimi Modülü

**Amaç:** Tesisin günlük operasyonlarını (görev, vardiya, periyodik işler, saha event'leri) dijital, izlenebilir ve raporlanabilir hale getirmek.

**Ana kullanıcılar:** Tesis yöneticisi, vardiya amiri, bakım personeli, güvenlik personeli.

**Temel özellikler:**

- Saha görevleri / iş emirleri: oluşturma, atama, öncelik, son tarih, onay/teslim akışı, durum (yeni → atandı → sürüyor → kapandı).
- Vardiya ve takvim yönetimi (personel vardiya planı, ekipman boşlukları).
- Periyodik işler: ör. haftalık rutin kontroller (otomatik tekrarlayan görev üretici).
- Arıza/öneri/şikayet bildirim kanalı (sahadan hızlı bildirim; görsel ve konum eklenebilir).
- Ekipman durumu ve operasyonel log (müdahale geçmişi).
- Saha event iş akışı şablonları (yapılandırılabilir).

**Alt modüller (öneri):** İş Emri Yönetimi; Vardiya Planlama; Periyodik Görevler; Saha Bildirimleri (Arıza/Öneri).

**Veri ilişkileri:** Çalışan, departman (0. Katman), varlık (Envanter), olaylar (İSG — çapraz raporlama).

**Kabul kriterleri:** Görev oluşturmadan kapatmaya kadar süreç ayrıntılı kayıt altında olmalı; geciken görevler otomatik uyarı üretmeli.

---

### 6.2 İş Güvenliği Modülü

**Amaç:** 6331 sayılı Kanun gerekliliklerine uygun, önleyici ve izlenebilir iş güvenliği yönetimi.

**Ana kullanıcılar:** İSG uzmanı (C/B/A sınıfı), İSG müdürü, saha personeli (bildirim yönü).

**Temel özellikler:**

- **Risk Değerlendirmesi:** Risk kaydı (tehlike, risk, olasılık×şiddet matrisi, mevcut durum, aksiyon), risk sahibi, gözden geçirme takvimi, doküman eki; risk düzeyi renkli (düşük→kritik) etiketleme.
- **Tehlike Bildirimi (ramak kala):** Sahadan hızlı bildirim (fotoğraf + konum), değerlendirme akışı, önleyici aksiyon; anonimlik seçeneği.
- **Kaza / Olay Kaydı:** Olay detayı, yaralanma tipi, delil fotoğrafları (orijinali saklanır, bkz. Depolama Politikası), kök neden analizi (5-Neden / balık kılçığı), düzeltici önleyici aksiyon (DÖF) takibi, yasal bildirim kontrolleri (kaza ile ilgili SGK/ÇSGB bildirimini hatırlatma).
- **Periyodik Kontroller & Kontrol Listeleri:** Kontrol listesi şablonları, cihaz/ekipman periyodik kontrolleri (test tarihleri, kalibrasyon), bulgu→aksiyon dönüşümü.
- **KKD (Kişisel Koruyucu Donanım) Takibi:** KKD türleri, teslimat/zimmet, değişim süreleri, eksik uyarısı (baret, eldiven, gözlük…).
- **Eğitim Yönetimi:** Eğitim şablonları, katılımcı listesi, sınav sonucu, periyot takibi (yenileme eğitimleri), sertifika/geçerlilik.
- **Acil Durum Yönetimi:** Acil durum planları, tatbikat kayıtları, tahliye ekipleri (yangın, ilk yardım), acil durum ekipman kontrolü (yangın söndürücü son kullanma).
- **Denetim (İç Denetim):** Denetim şablonları (bulgu puanlama), denetim takvimi, bulgu → aksiyon kapanış.

**Alt modüller (öneri):** Risk Değerlendirme; Kaza/Olay & DÖF; Ramak Kala & Tehlike Bildirimi; Kontrol Listeleri; KKD; Eğitim; Acil Durum; Denetim.

**Veri ilişkileri:** Çalışan, departman, tesis; varlık (ekipman kontrolleri); doküman arşivi.

**Kabul kriterleri:** Her kaza kaydının delil fotoğrafı varsa orijinali korunmalı; açık aksiyon sayısı gerçek zamanlı raporlanmalı; yasal saklama süreleri gözetilmeli (kaza kayıtları uzun süre, ramak kala örn. 5 yıl+ — hukuk onayı alınmalı).

---

### 6.3 İş Sağlığı Modülü

**Amaç:** Çalışan sağlığının mesleki gözetimini (periyodik muayene, rapor, meslek hastalığı) gizlilik ve mevzuat çerçevesinde yönetmek.

**Ana kullanıcılar:** İşyeri hekimi, iş sağlığı hemşire/sorumlusu, İSG uzmanı.

**Temel özellikler:**

- **Periyodik Muayene Takibi:** Muayene türleri (işe giriş, periyodik, işten ayrılış), zamanlama ve hatırlatmalar, muayene sonucu (uygun/koşullu/uygun değil), rapor arşivi.
- **Sağlık Raporu & Belge Yönetimi:** Aile hekimliği/OSGB raporları, sonuç belgeleri (PDF), geçerlilik tarihi; yalnızca yetkili roller erişir (gizlilik).
- **Meslek Hastalığı Şüphesi/Kaydı:** Şüpheli vaka, sevk, tanı, sonuç; yasal bildirim hatırlatmaları; uzun dönem takip.
- **Riskli Çalışan Grupları:** Gebe/emziren, genç, engelli, vardiyalı çalışanlar; ek gözetim gereksinimi etiketleri.
- **Aşı Takibi** (kurum politikasında varsa): Aşı türü, doz tarihleri, hatırlatma.
- **Psikososyal & Ergonomi:** Anket/değerlendirme şablonları (örn. stres anketi), ergonomik risk değerlendirmesi, önlem kaydı.
- **Sağlık Verisi Gizlilik Ekranı:** Ayrıcalıklı erişim, audit log, KVKK kapsamında veri minimizasyonu (sağlık raporu içeriği yalnızca hekim görebilir; İSG uzmanı yalnızca "uygun/muaf" durumu).

**Alt modüller (öneri):** Muayene Takibi; Rapor Arşivi; Meslek Hastalığı; Riskli Grup Takibi; Anketler.

**Veri ilişkileri:** Çalışan (kimlik modülü — sağlık verisi ayrı, kısıtlı alan).

**Kabul kriterleri:** Sağlık verisine erişim rol ve ABAC ile sınırlandırılmalı; her erişim denetim izinde; muayene gecikmeleri listelenebilmeli.

---

### 6.4 Varlık Envanter Yönetim Sistemi (VEYS) Modülü

**Amaç:** Tüm demirbaş, ekipman, makine ve medikal cihazların tek kaynaktan yönetimi: kayıt, etiketleme, hareket, bakım, kalibrasyon ve zimmet.

**Ana kullanıcılar:** Varlık/bakım sorumlusu, idari işler, saha amirleri.

**Temel özellikler:**

- **Varlık Kaydı:** Varlık tipi, kategori (0. Katman), seri no, marka/model, satın alma tarihi, maliyet, tesis/yerleşim, kritiklik seviyesi, fotoğraf ve belge ekleri.
- **Etiketleme:** Barkod/QR üretimi ve basılabilir etiket çıktısı; QR okutarak hızlı sorgulama (web/mobil).
- **Lokasyon ve Hareket Takibi:** Varlığın tesis/departman/oda hareketleri, devir (zimmet) kayıtları (personel→personel), geçmiş raporu.
- **Bakım & Kalibrasyon Yönetimi:** Periyodik bakım planları (gün/hafta/ay/km/sayaç), kalibrasyon zamanlaması (medikal ölçüm cihazları kritik), bakım geçmişi, talimat (checklist) eki, sonraki tarih otomasyonu.
- **Arıza & Durum:** Varlık durumu (aktif/bakımda/hurda), arıza kaydı, onarım maliyeti, ayrılan süre, raporlama.
- **Envanter Sayımı (Stock Count):** Sayım listesi, sayım farkları, düzeltme onayı, dönem sayım raporu.
- **Hurda/Satış/Silinme:** Kullanım dışı akışı, onay zinciri, kayıt saklama (silinmez, kapatılır).

**Alt modüller (öneri):** Envanter; Etiketleme; Bakım/Kalibrasyon; Zimmet/Devir; Sayım; Hurda.

**Veri ilişkileri:** Departman/lokasyon, çalışan (zimmet), iş emirleri (Operasyon), kontroller (İş Güvenliği), atık (hurda).

**Kabul kriterleri:** Her varlık tek benzersiz koda sahip olmalı; bakım/kalibrasyon tarihi geçen varlıklar otomatik uyarı üretmeli; zimmet kayıtları zaman damgalı olmalı.

---

### 6.5 Taşeron Yönetimi Modülü

**Amaç:** Dış firma ve taşeron personelinin tesis güvenliği ve mevzuat gerekliliklerine uygun biçimde yönetilmesi; sahaya girişin kontrolü.

**Ana kullanıcılar:** Tesis yöneticisi, satın alma/idari işler, İSG uzmanı, taşeron firma yetkilisi (kısıtlı portal).

**Temel özellikler:**

- **Firma Yönetimi:** Firma kaydı (vergi no, adres, iletişim), sözleşme ve ekleri, faaliyet alanı, lisans/belge arşivi (mesleki yeterlilik, SGK ilişkisizlik belgesi takibi).
- **Taşeron Personel Kartı:** Kimlik, medeni durum bilgileri (gerekli alanlar), ehliyet/yeterlilik belgeleri, sağlık raporu, kayıt tarihi; belge geçerlilik takibi (kırmızı/sarı/yeşil durum).
- **Oryantasyon & Eğitim Takibi:** Oryantasyon eğitimine katılım, İSG eğitimleri (link: İş Güvenliği Modülü eğitim), sınav durumu; eğitimi eksik personelin sistem tarafından "sahaya çıkış yok" statüsüne alınması.
- **Saha Giriş-Çıkış Kayıtları:** Günlük giriş kaydı, tesise özel geçiş izinleri (tarih aralığı, alan kısıtı), yoklama, çıkış.
- **KKD Teslimi (Taşeron):** Taşeron personeline verilen KKD kaydı (İş Güvenliği modülüyle ortak tanım).
- **Uygunluk/Performans Değerlendirmesi:** Periyodik değerlendirme formu, olay/aksiyon geçmişi ile ilişkilendirme, "uygunluk notu".

**Alt modüller (öneri):** Firma Yönetimi; Personel Ve Belgeler; Oryantasyon; Giriş-İzin; Değerlendirme.

**Veri ilişkileri:** İş Güvenliği (eğitim, KKD, olay), Operasyon (görev), İş Sağlığı (rapor durumu — kısıtlı).

**Kabul kriterleri:** Zorunlu belgesi eksik taşeron personeli için sistem izin vermemeli; belge süresi dolan personel otomatik "izinsiz" durumuna geçmeli ve ilgili amir bilgilendirilmeli.

---

### 6.6 Atık Yönetimi Modülü

**Amaç:** Atık üretiminden bertarafa kadarki sürecin mevzuata uygun kayıt altına alınması (Çevre Kanunu, Atık Yönetimi Yönetmeliği ve tıbbi atık yönetmeliği dahil).

**Ana kullanıcılar:** Atık sorumlusu / çevre görevlisi, tesis yöneticisi, idari işler.

**Temel özellikler:**

- **Atık Türleri & Kodlar:** Merkezi kategori tanımı (0. Katman) + yasal kodlar (ör. 18-01-xx tıbbi atık Avrupa Atık Kataloğu/EWC kodları, tehlikeli atık kodları).
- **Üretim/Biriktirme Kayıtları:** Atık üreten nokta, geçici depolama alanı, kap/torba etiketlemesi, miktar (kg).
- **Toplama & Çıkış:** Tesis içi toplama rotası/kaydı; tesis dışı çıkış: lisanslı firma, taşıma formu (UF/ATF) numarası, aracı plakası, tarih, tartım fişi.
- **Lisanslı Firma Yönetimi:** Firma lisans/izin belgeleri ve geçerlilik tarihi, taşıma lisansları, servis sağlayıcı arşivi.
- **Raporlama:** Aylık/yıllık atık miktarı raporu (tür bazlı, tesis bazlı), mevzuat dönem raporlarına hazır veri çıktısı, bertaraf/geri kazanım dağılımı.
- **Komisyon/Yetki Akışı:** Atık beyanı onay zinciri (yetkili imza), düzeltme geçmişi.

**Alt modüller (öneri):** Tank/Kap Takibi; Çıkış & Taşıma; Firma Belge Takibi; Raporlama.

**Veri ilişkileri:** Varlık (atık ekipmanı — konteyner), tesis/departman, doküman arşivi.

**Kabul kriterleri:** Atık çıkış kaydı olmadan miktar raporu tutarsız olamamalı; lisansı dolan firma ile çıkış kaydı açılamamalı; raporlar tür/tarih aralığında dışa aktarılabilmeli (PDF/Excel).

---

## 7. Önceliklendirme (MoSCoW)

| Gereksinim | Öncelik | Gerekçe |
|---|---|---|
| 0. Katman: Grup/Tesis kurulumu, kullanıcı-rol, modül erişim | **M** | Tüm sistemin temeli |
| İş Güvenliği: kaza/olay + DÖF, risk değerlendirme, kontrol listeleri, eğitim, KKD | **M** | Yasal zorunluluk + en yüksek değer |
| Operasyon: iş emri ve periyodik görevler | **M** | Modül bağımsızlığının ilk kanıtı |
| Varlık Envanteri: kayıt, QR, zimmet, bakım planı | **M** | Envanter = çapraz bağlantının iskeleti |
| Taşeron: firma+personel+belge takibi, giriş izni | **M** | Yüksek hukuki risk, denetim odağı |
| İş Sağlığı: muayene takibi, rapor arşivi | **S** | Gizlilik/mevzuat; İSG sonrası ikinci dalga |
| Atık: çıkış, firma, raporlama | **S** | Sektör talebine göre erken devreye alınabilir |
| Telegram bildirimleri (0. Katman) | **S** | İlk ay v1'de; acil durumlar için değerli |
| 2FA zorunluluğu (ayrıcalıklı roller) | **M** | KVKK/güvenlik |
| Raporlama (genel rapor motoru, PDF/Excel çıktı) | **M** | Denetimlere hazırlık animasyonu |
| Mobil uygulama (Faz 2) | **C** | Web tamamlandıktan sonra |
| IoT entegrasyonu, e-fatura, muhasebe | **C** | Kapsam dışı v1 |

**M** = Must, **S** = Should, **C** = Could (v1 sonrası).

---

## 8. Fonksiyonel Olmayan Gereksinimler (NFR)

### 8.1 Güvenlik

- **NFR-G1:** Tüm veri trafiği TLS 1.2+; JWT access token 15 dk, rotasyonlu refresh; parola Argon2id ile hash'lenir.
- **NFR-G2:** Ayrıcalıklı roller (admin, İSG uzmanı C/B/A, hekim) için **2FA TOTP zorunlu**.
- **NFR-G3:** Kiracı izolasyonu: her tenant'ın ayrı veritabanı; bir tenant'ın verisine diğerinden erişilememesi (model A — bkz. Architecture).
- **NFR-G4:** Sağlık verisi (İş Sağlığı modülü) gizli alan; rol+ABAC ile erişim; her okuma/aktarım audit log'unda.
- **NFR-G5:** Denetim izi: kritik tüm yazma işlemlerinde kim, ne, ne zaman, ne değişti.
- **NFR-G6:** Dosya yükleme tür/boyut sınırları (foto 10 MB, PDF 25 MB) ve tehlikeli tür reddi (TIFF/RAW).

### 8.2 Performans ve Ölçeklenebilirlik

- **NFR-P1:** Sayfa yükleme (web) p50 < 2 sn, p95 < 4 sn (DDOS dışı normal yük).
- **NFR-P2:** API p50 < 250 ms (basit okuma), p95 < 800 ms; kuyruk işlemleri (bildirim) asenkron.
- **NFR-P3:** 10.000 tesis kaydında, 1.000.000 varlık satırında listeleme/filtre p95 < 2 sn (pagination + index + arama).
- **NFR-P4:** Yatay ölçeklenebilir: backend instance sayısı artırılabilir (stateless); Redis/BullMQ kuyruğu merkezi.

### 8.3 Uyumluluk ve Veri Yaşam Döngüsü

- **KVKK:** Veri minimizasyonu, saklama süreleri, silme (kiracı çıkışında tüm verinin silinmesi — bkz. offboarding), şifreli depolama.
- **6331 sayılı İSG Kanunu ve bağlı yönetmelikler:** kaza/olay bildirim akışları, kontrol listeleri, eğitim ve risk değerlendirmesi periyotları ile uyumlu veri modeli (hukuk onayı ile kesinleşir).
- **Atık mevzuatı:** Atık kodu (EWC), taşıma formu numarası, lisanslı firma zorunluluğu alanları.
- **Veri saklama politikası:** delil ve rapor dosyalarının orijinali saklanır; rutin fotoğraflar optimize edilir (bkz. Depolama Bölümü).

### 8.4 Kullanılabilirlik ve Yedekleme

- **NFR-ND1:** Çalışma saatlerinde %99,5 erişilebilirlik hedefi; planlı bakım penceresi duyurulur.
- **NFR-ND2:** Yedekleme: günlük tam + saatlik artımlı; RPO ≤ 24 saat (günlük yedek), RTO ≤ 4 saat; yedekler ayrı tesiste/şifreli.
- **NFR-ND3:** Janitor (temizlik) işleri yalnızca kuyruk üzerinde; veri bozucu işlemler onaylı.

### 8.5 Mobil (Faz 2)

- **NFR-M1:** Web ile aynı REST API ve @shared/types; eksik çevrimdışı mod (öncelik: bildirim görüntüleme ve fotoğraf yükleme kuyruğu).

---

## 9. Başarı Metrikleri (KPI)

| Metrik | Hedef (12 ay) | Kaynak |
|---|---|---|
| Modül başına aktif tesis sayısı | En az 2 modülü aktif 10+ tesis | Platform dashboard |
| Denetim hazırlık süresi | ≤ 1 saat | Müşteri geri bildirimi |
| Gecikmiş görev oranı | < %5 | Operasyon modülü |
| Kayıt dışı kaza/ramak kala | 0 (rapotlanan eksik yok) | İSG modülü audit |
| Açık DÖF ortalama yaşı | < 30 gün | İSG dashboard |
| Çalışan başına aylık aktif kullanım | ≥ %60 (modülü aktif tesislerde) | Session analitiği |
| NPS (müşteri memnuniyeti) | ≥ 40 | Anket |

---

## 10. Riskler ve Açık Sorular

| # | Risk / Açık Soru | Olasılık | Etki | Azaltma / Karar İhtiyacı |
|---|---|---|---|---|
| R1 | Kiracı başına DB: schema değişikliği N veritabanına uygulanmalı | Orta | Yüksek | Template DB + migration-runner (bkz. Architecture); migration'lar otomatize ve doğrulanmış |
| R2 | Modül bağımsızlığı vs. çapraz entegrasyon dengesi | Orta | Orta | Domain event tanımı; entegrasyon haritası dokümanı |
| R3 | Sağlık verisi gizliliği (KVKK) ihlal riski | Düşük | Çok yüksek | Ayrı alan, ABAC, audit, erişim ekranı; hukuk onayı |
| R4 | Mevzuat takibi (periyot/saklama süreleri) üründe güncel kalmalı | Orta | Yüksek | Mevzuat takip alanı (config'li periyotlar); hukuk danışmanı süreç ortağı |
| R5 | Taşeron belge sahteciliği / eksik belge ile giriş | Orta | Yüksek | Belge doğrulama akışı, otomatik engelleme, fotoğraflı kimlik eşleşmesi |
| R6 | Kullanıcı kabulü (saha personeli) — kaçınılmaz direnç | Yüksek | Orta | Basit arayüz, eğitim, mobil öncelikli saha akışları |
| R7 | Atık kodları / rapor formatları bölgesel değişebilir | Orta | Orta | Kategori + rapor şablonu yapılandırılabilirliği |
| A1 | Telegram'da hangi olay tiplerinin zorunlu bildirileceği (kaza → acil) | — | — | 0. Katman'da eşikler tanımlanmalı (ör. "kritik kaza → tüm amirler + 2FA zinciri") |
| A2 | İSG periyotları kurumdan kuruma farklı mı, merkezi mi yönetilecek? | — | — | Grup düzeyinde şablon + tesis düzeyinde özelleştirme (0. Katman ayarı) |

---

## 11. Kabul Kriterleri (Genel Çerçeve — Örnekler)

- **K1 (0. Katman):** Grup ve tesis açma-kapama; ayarların (e-posta, Telegram, bildirim, departman, kategori) ilgili modüllerde anında geçerli olması test edilmiştir.
- **K2 (İSG):** Bir kaza kaydı; delil fotoğrafı + kök neden analizi + DÖF açılıp takip edilebiliyor; açık DÖF sayısı dashboard'da görünüyor.
- **K3 (Taşeron):** Belgesi eksik personelin giriş izni sistemce reddediliyor; süresi dolan belge otomatik uyarı üretiyor.
- **K4 (Veri izolasyonu):** A grubunun kullanıcısının B grubunun verisine erişim denemesi başarısız (güvenlik testi).
- **K5 (Yük testi):** 500 eşzamanlı kullanıcıda p95 API süresi hedefin altında (yük testi raporu).

---

## 12. Yol Haritası (Önerilen Fazlama)

| Faz | Kapsam | Çıktı |
|---|---|---|
| **Faz 0** | Monorepo iskeleti + Docker Compose (Postgres/Redis/MinIO/Nginx) + 0. Katman çekirdeği (tenant/tesis, kullanıcı-rol, modül erişim, ayar merkezi) | Çalışan çekirdek + CI/CD boru hattı |
| **Faz 1** | İş Güvenliği Modülü (kaza/DÖF, risk, kontrol, eğitim, KKD) + Operasyon (iş emri, periyodik) | İlk müşteriye pilot (tek tesis, tek modül seti) |
| **Faz 2** | Varlık Envanteri + Taşeron; rapor motoru genişletme; Telegram/e-posta son hal | Çok modüllü canlı kullanım |
| **Faz 3** | İş Sağlığı + Atık; gelişmiş dashboardlar; denetim şablonları | Tam modül kapsamı |
| **Faz 4** | Mobil uygulama (Expo/RN — aynı API), offline mod, çevrimdışı fotoğraf kuyruğu | Saha personeli mobil deneyimi |

> Faz geçişleri kullanıcı onayıyla; her fazın sonunda demoda görülebilir bir çıktı.

---

## 13. Değişiklik Geçmişi ve Onay

| Tarih | Sürüm | Değişiklik | Onaylayan |
|---|---|---|---|
| 2026-10-18 | 1.0 | İlk taslak PRD | — |

**Açık kararlar:** R7/A1/A2 maddeleri hukuk ve müşteri görüşmeleriyle netleştirilecek.
