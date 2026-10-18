import sys,json,re,glob,os;sys.path.insert(0,'.');from tokens import *
B='/home/ubuntu/medical_isg_brand_v2'
HEAD='''<!doctype html><html><head><meta charset="utf-8"><script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=block" rel="stylesheet">
<style>.fd{font-family:"Plus Jakarta Sans",sans-serif}body{font-family:Inter,sans-serif}</style></head>'''
LOGO='logo.png'
def light(h): return lum(h)>0.36
# PALETTE
rows=''
for k,(tr,desc,vals) in P.items():
    sw=''
    for s,h in zip(STEPS,vals):
        fg='#0A0F17' if light(h) else '#FFFFFF'
        star=' ring-2 ring-offset-2 ring-neutral-900' if (k,s) in [('primary','600'),('secondary','900'),('accent','500')] else ''
        sw+=f'<div class="flex-1 h-[92px] rounded-[10px] flex flex-col justify-between p-2.5{star}" style="background:{h};color:{fg}"><span class="text-[13px] font-semibold opacity-90">{s}</span><span class="text-[12.5px] font-mono tracking-tight">{h[1:]}</span></div>'
    rows+=f'<div class="flex items-center gap-6"><div class="w-[230px] shrink-0"><div class="fd text-[21px] font-bold text-[#131B26]">{tr}</div><div class="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#0D7F79] mt-0.5">{k}</div><div class="text-[13px] text-[#677689] mt-1 leading-snug">{desc}</div></div><div class="flex gap-2 flex-1">{sw}</div></div>'
def semblock(t):
    m=SEM[t];dark=t=='dark'
    bg=ref(m['background']);sf=ref(m['surface-raised']);tx=ref(m['text']);mu=ref(m['text-muted']);bd=ref(m['border'])
    chips=''.join(f'<div class="flex items-center gap-2"><span class="w-5 h-5 rounded-md border" style="background:{ref(m[n])};border-color:{bd}"></span><span class="text-[13px] font-mono" style="color:{mu}">{n}</span></div>' for n in ['background','surface-raised','text','text-muted','border','brand','accent','success','warning','danger','info'])
    return f'''<div class="flex-1 rounded-2xl p-6 border" style="background:{bg};border-color:{bd}"><div class="flex items-center justify-between"><div class="fd text-[19px] font-bold" style="color:{tx}">{'Koyu tema' if dark else 'Açık tema'} — semantik tokenlar</div><span class="text-[12px] font-mono" style="color:{mu}">data-theme="{t}"</span></div>
<div class="mt-4 rounded-xl p-4 border flex items-center gap-3" style="background:{sf};border-color:{bd}"><button class="px-4 h-10 rounded-lg text-[14px] font-semibold" style="background:{ref(m['brand'])};color:{ref(m['brand-fg'])}">Risk analizi başlat</button><button class="px-4 h-10 rounded-lg text-[14px] font-semibold" style="background:{ref(m['accent'])};color:{ref(m['accent-fg'])}">Olay bildir</button><span class="px-2.5 py-1 rounded-full text-[12px] font-semibold" style="background:{ref(m['success-soft'])};color:{ref(m['success'])}">Uygun</span><span class="px-2.5 py-1 rounded-full text-[12px] font-semibold" style="background:{ref(m['danger-soft'])};color:{ref(m['danger'])}">Yüksek risk</span></div>
<div class="grid grid-cols-4 gap-x-4 gap-y-2.5 mt-4">{chips}</div></div>'''
pal=HEAD+f'''<body class="w-[1920px] h-[1440px] bg-white overflow-hidden"><div class="px-[72px] py-[56px] flex flex-col h-full">
<div class="flex items-end justify-between border-b border-[#E2E8EF] pb-7"><div><img src="{LOGO}" class="h-[150px] -ml-[52px] -my-7"></div><div class="text-right"><div class="fd text-[40px] font-extrabold tracking-tight text-[#131B26]">Renk Sistemi</div><div class="text-[16px] text-[#677689] mt-1">8 aile × 11 ton (50–950) · Klinik güven + endüstriyel güvenlik + kurumsal B2B</div></div></div>
<div class="flex flex-col gap-[18px] mt-8">{rows}</div>
<div class="flex gap-6 mt-8">{semblock('light')}{semblock('dark')}</div>
<div class="mt-auto pt-5 flex justify-between text-[13px] text-[#677689]"><span>Halka işaretli tonlar: marka çekirdeği — Primary 600 #0D7F79 · Secondary 900 #172A4A · Accent 500 #FF5A10</span><span>Medical ISG Brand Kit v2.0 · tokens/brand-tokens.css</span></div>
</div></body></html>'''
os.makedirs('html/cards',exist_ok=True)
open('html/cards/palette-card.html','w').write(pal)
# TYPOGRAPHY
scale=json.load(open(B+'/tokens/brand-tokens.json'))['typography']['scale']
srows=''
for k,(fs,lh,ls,w) in scale.items():
    fam='fd' if k.startswith(('display','h')) else ''
    sz=min(int(fs[:-2]),60)
    sample='Risk değerlendirmesi tamamlandı' if not k.startswith(('caption','overline')) else ('Son güncelleme: 18 Ekim 2026 · 14:32' if k=='caption' else 'SAHA DENETİMİ')
    srows+=f'<div class="flex items-baseline gap-6 py-[9px] border-b border-[#EEF2F6]"><div class="w-[150px] shrink-0 text-[13px] font-mono text-[#0D7F79] font-semibold">{k}</div><div class="w-[190px] shrink-0 text-[12.5px] font-mono text-[#677689]">{fs} / {lh} · {w}</div><div class="{fam} text-[#131B26] truncate" style="font-size:{sz}px;line-height:1.15;letter-spacing:{ls};font-weight:{w}">{sample}</div></div>'
typ=HEAD+f'''<body class="w-[1920px] h-[1400px] bg-white overflow-hidden"><div class="px-[72px] py-[56px] flex flex-col h-full">
<div class="flex items-end justify-between border-b border-[#E2E8EF] pb-7"><img src="{LOGO}" class="h-[150px] -ml-[52px] -my-7"><div class="text-right"><div class="fd text-[40px] font-extrabold tracking-tight text-[#131B26]">Tipografi</div><div class="text-[16px] text-[#677689] mt-1">İki aile · Plus Jakarta Sans (marka & başlık) + Inter (arayüz & gövde)</div></div></div>
<div class="grid grid-cols-2 gap-8 mt-9">
<div class="rounded-2xl bg-[#172A4A] p-9 text-white"><div class="text-[13px] uppercase tracking-[0.16em] text-[#72D5CB] font-semibold">Display · Logo · Başlık</div><div class="fd text-[64px] font-extrabold tracking-tight mt-3 leading-none">Plus Jakarta Sans</div><div class="fd text-[118px] font-extrabold leading-none mt-6 tracking-tight">Aa<span class="text-[#3DBAB0]">Ğğ</span>Şş</div><div class="fd text-[22px] mt-6 text-[#C1D3EB] leading-snug">ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ<br>abcçdefgğhıijklmnoöprsştuüvyz 0123456789</div><div class="flex gap-3 mt-6 fd text-[16px]"><span class="px-3 py-1.5 rounded-md bg-white/10 font-normal">Regular 400</span><span class="px-3 py-1.5 rounded-md bg-white/10 font-medium">Medium 500</span><span class="px-3 py-1.5 rounded-md bg-white/10 font-semibold">SemiBold 600</span><span class="px-3 py-1.5 rounded-md bg-white/10 font-bold">Bold 700</span><span class="px-3 py-1.5 rounded-md bg-[#FF5A10] text-[#0A0F17] font-extrabold">ExtraBold 800</span></div></div>
<div class="rounded-2xl bg-[#F7F9FB] border border-[#E2E8EF] p-9"><div class="text-[13px] uppercase tracking-[0.16em] text-[#0D7F79] font-semibold">Arayüz · Tablo · Form · Gövde</div><div class="text-[64px] font-bold tracking-tight mt-3 leading-none text-[#131B26]">Inter</div><div class="text-[118px] font-semibold leading-none mt-6 tracking-tight text-[#131B26]">Aa<span class="text-[#0D7F79]">Ğğ</span>Şş</div><div class="text-[22px] mt-6 text-[#4B596B] leading-snug">ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ<br>abcçdefgğhıijklmnoöprsştuüvyz <span style="font-feature-settings:'tnum'">0123456789</span></div><div class="flex gap-3 mt-6 text-[16px] text-[#222D3B]"><span class="px-3 py-1.5 rounded-md bg-white border border-[#E2E8EF] font-normal">Regular 400</span><span class="px-3 py-1.5 rounded-md bg-white border border-[#E2E8EF] font-medium">Medium 500</span><span class="px-3 py-1.5 rounded-md bg-white border border-[#E2E8EF] font-semibold">SemiBold 600</span><span class="px-3 py-1.5 rounded-md bg-white border border-[#E2E8EF] font-bold">Bold 700</span><span class="px-3 py-1.5 rounded-md bg-[#0D7F79] text-white font-medium">tnum · tablo rakamı</span></div></div></div>
<div class="mt-8"><div class="flex items-center justify-between mb-2"><div class="fd text-[22px] font-bold text-[#131B26]">Tip ölçeği (UI)</div><div class="text-[13px] text-[#677689]">Taban 16px · 4px ızgara · başlıklar Plus Jakarta Sans, diğerleri Inter</div></div>{srows}</div>
</div></body></html>'''
open('html/cards/typography-card.html','w').write(typ)
# ICONS OVERVIEW
man=json.load(open('/home/ubuntu/.tmp/icon_manifest.json'))
def svgin(p,color,size):
    s=open(p).read(); s=re.sub(r'<!--.*?-->','',s,flags=re.S).strip()
    s=re.sub(r'<svg ',f'<svg style="color:{color};width:{size}px;height:{size}px" ',s,1)
    s=re.sub(r'\swidth="24(px)?" height="24(px)?"','',s,1)
    return s
cells=''
for it in man['primary']:
    nm=it['name'];lb=it['label'];sv=svgin(B+'/icons/primary-tabler/'+nm+'.svg','#172A4A',32)
    cells+=f'<div class="flex flex-col items-center justify-center gap-2.5 h-[118px] rounded-xl border border-[#E2E8EF] bg-white">{sv}<div class="text-[12.5px] font-medium text-[#4B596B] text-center leading-tight px-1">{lb}</div><div class="text-[10.5px] font-mono text-[#97A4B5] -mt-1.5">{nm}</div></div>'
darkrow=''.join('<div class="w-[64px] h-[64px] rounded-xl bg-[#131B26] border border-[#222D3B] flex items-center justify-center">'+svgin(B+'/icons/primary-tabler/'+n+'.svg',c,28)+'</div>' for n,c in [('dashboard','#EEF2F6'),('risk-assessment','#72D5CB'),('hazard','#FBBF24'),('camera','#EEF2F6'),('notification','#FF7B37'),('shield-security','#72D5CB'),('first-aid','#F87171'),('ppe-hard-hat','#FF7B37'),('workplace','#EEF2F6'),('file-pdf','#EEF2F6'),('compliance','#4ADE80'),('settings','#97A4B5')])
def altrow(folder,items,label,stroke):
    ic=''.join('<div class="w-[52px] h-[52px] rounded-lg bg-white border border-[#E2E8EF] flex items-center justify-center">'+svgin(B+'/icons/'+folder+'/'+it['name']+'.svg','#0E6662',26)+'</div>' for it in items[:22])
    return f'<div class="flex items-center gap-5"><div class="w-[200px] shrink-0"><div class="fd text-[16px] font-bold text-[#131B26]">{label}</div><div class="text-[12px] text-[#677689]">{len(items)} ikon · {stroke}</div></div><div class="flex gap-2 flex-wrap">{ic}</div></div>'
ico=HEAD+f'''<body class="w-[1920px] h-[1190px] bg-[#F7F9FB] overflow-hidden"><div class="px-[72px] py-[56px] flex flex-col h-full">
<div class="flex items-end justify-between border-b border-[#E2E8EF] pb-7"><img src="{LOGO}" class="h-[150px] -ml-[52px] -my-7"><div class="text-right"><div class="fd text-[40px] font-extrabold tracking-tight text-[#131B26]">UI İkon Sistemi</div><div class="text-[16px] text-[#677689] mt-1">Birincil set: Tabler Icons (MIT) · 24×24 ızgara · 2px iç boşluk · 1.75px kontur · round cap/join · currentColor</div></div></div>
<div class="grid grid-cols-[repeat(12,minmax(0,1fr))] gap-3 mt-8">{cells}</div>
<div class="flex gap-6 mt-7"><div class="rounded-2xl bg-[#0A0F17] p-6 flex-1"><div class="flex justify-between items-center mb-4"><div class="fd text-[17px] font-bold text-white">Koyu tema · semantik renklendirme</div><div class="text-[12px] font-mono text-[#97A4B5]">color: var(--mi-text) / --mi-warning / --mi-accent</div></div><div class="flex gap-3 flex-wrap">{darkrow}</div></div></div>
<div class="rounded-2xl bg-white border border-[#E2E8EF] p-6 mt-6 flex flex-col gap-4"><div class="fd text-[17px] font-bold text-[#131B26]">Alternatif setler <span class="font-medium text-[#677689] text-[14px]">— aynı ızgara; tek ekranda setleri karıştırmayın</span></div>
{altrow('alt-iconsax-linear',man['iconsax'],'Iconsax Linear','1.5px kontur · MIT')}{altrow('alt-iconly-light',man['iconly'],'Iconly Light','1.5px kontur · MIT')}</div>
</div></body></html>'''
open('html/cards/icons-overview.html','w').write(ico)
print('ok')
