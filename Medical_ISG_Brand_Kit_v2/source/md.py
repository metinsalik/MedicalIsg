import sys,json;sys.path.insert(0,'.');from tokens import *
man=json.load(open('/home/ubuntu/.tmp/icon_manifest.json'))
def scale_table(k):
    tr,desc,vals=P[k]
    o=[f'#### {tr} — `{k}`\n\n{desc}.\n','| Ton | HEX | RGB | CMYK | Beyaz üzerinde | Koyu (#0A0F17) üzerinde |','|---|---|---|---|---:|---:|']
    for s,h in zip(STEPS,vals):
        a=cr(h,'#FFFFFF');b=cr(h,'#0A0F17')
        tag=lambda x:f'{x} ✓AA' if x>=4.5 else (f'{x} (büyük metin/UI)' if x>=3 else f'{x}')
        o.append(f'| {s} | `{h}` | {", ".join(map(str,rgb(h)))} | {"/".join(map(str,cmyk(h)))} | {tag(a)} | {tag(b)} |')
    return '\n'.join(o)+'\n'
def sem_table():
    o=['| Token (CSS: `--mi-…`) | Açık tema | Koyu tema |','|---|---|---|']
    for k in SEM['light']:
        o.append(f"| `{k}` | `{SEM['light'][k]}` → `{ref(SEM['light'][k])}` | `{SEM['dark'][k]}` → `{ref(SEM['dark'][k])}` |")
    return '\n'.join(o)
def pairs():
    o=['| Kombinasyon | Tema | Kontrast | WCAG 2.1 |','|---|---|---:|---|']
    for t in ['light','dark']:
        m=SEM[t]
        for fg,b,lbl in [('text','background','Ana metin / zemin'),('text-muted','background','İkincil metin / zemin'),('text-subtle','background','Yardımcı metin / zemin'),('text-brand','background','Marka metni / zemin'),('text-link','background','Bağlantı / zemin'),('brand-fg','brand','Birincil buton metni'),('accent-fg','accent','Vurgu (CTA) buton metni'),('accent-text','background','Turuncu metin / zemin'),('success','background','Başarı metni'),('danger','background','Hata metni'),('info','background','Bilgi metni'),('warning-fg','warning','Uyarı rozeti metni')]:
            c=cr(ref(m[fg]),ref(m[b]));g='AAA' if c>=7 else ('AA' if c>=4.5 else 'AA büyük metin')
            o.append(f'| {lbl} | {"Açık" if t=="light" else "Koyu"} | {c}:1 | {g} |')
    return '\n'.join(o)
icon_rows='\n'.join(f"| `{i['name']}` | {i['label']} | `{i['source']}` |" for i in man['primary'])
scales='\n'.join(scale_table(k) for k in P)
md=open('BRANDING.template.md').read().replace('{{SCALES}}',scales).replace('{{SEMANTIC}}',sem_table()).replace('{{PAIRS}}',pairs()).replace('{{ICONS}}',icon_rows).replace('{{N_PRIMARY}}',str(len(man['primary']))).replace('{{N_IX}}',str(len(man['iconsax']))).replace('{{N_IL}}',str(len(man['iconly'])))
open('/home/ubuntu/medical_isg_brand_v2/BRANDING.md','w').write(md)
print(len(md))
