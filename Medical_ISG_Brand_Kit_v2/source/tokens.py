import json
STEPS=['50','100','200','300','400','500','600','700','800','900','950']
P={
'primary':('Klinik Teal','Klinik güven, sağlık, temizlik — markanın ana rengi',['#EEFBF9','#D3F4EF','#A9E8E0','#72D5CB','#3DBAB0','#179E95','#0D7F79','#0E6662','#10514F','#0F4342','#042827']),
'secondary':('Kurumsal Lacivert','B2B güvenilirlik, otorite, ciddiyet',['#F0F5FB','#DDE7F4','#C1D3EB','#97B6DD','#6691CB','#4472B8','#34599B','#2C477E','#263C68','#172A4A','#0D1A30']),
'accent':('Hi-Vis Turuncu','Endüstriyel güvenlik, farkındalık, KKD yeleği — vurgu ve CTA',['#FFF5ED','#FFE8D4','#FFCDA8','#FFA970','#FF7B37','#FF5A10','#F03F06','#C72D07','#9E250E','#7F220F','#450D05']),
'success':('Uygun Yeşil','Uygunluk, tamamlanan görev, düşük risk',['#F0FDF4','#DCFCE7','#BBF7D0','#86EFAC','#4ADE80','#22C55E','#16A34A','#15803D','#166534','#14532D','#052E16']),
'warning':('Dikkat Amber','Orta risk, yaklaşan son tarih, eksik belge',['#FFFBEB','#FEF3C7','#FDE68A','#FCD34D','#FBBF24','#F59E0B','#D97706','#B45309','#92400E','#78350F','#451A03']),
'danger':('Kritik Kırmızı','Yüksek risk, kaza/olay, hata, silme',['#FEF2F2','#FEE2E2','#FECACA','#FCA5A5','#F87171','#EF4444','#DC2626','#B91C1C','#991B1B','#7F1D1D','#450A0A']),
'info':('Bilgi Mavi','Bilgilendirme, sistem mesajı, bağlantı',['#EFF8FF','#DBEEFE','#BFE2FE','#93D0FD','#60B5FA','#3B96F6','#2577EB','#1D61D8','#1E4FAF','#1E448A','#172B54']),
'neutral':('Arduvaz Nötr','Metin, zemin, anahat — hafif soğuk, klinik',['#F7F9FB','#EEF2F6','#E2E8EF','#CBD4DF','#97A4B5','#677689','#4B596B','#374456','#222D3B','#131B26','#0A0F17']),
}
def rgb(h): h=h.lstrip('#'); return tuple(int(h[i:i+2],16) for i in (0,2,4))
def cmyk(h):
    r,g,b=[x/255 for x in rgb(h)];k=1-max(r,g,b)
    if k>=1: return (0,0,0,100)
    return tuple(round(v*100) for v in ((1-r-k)/(1-k),(1-g-k)/(1-k),(1-b-k)/(1-k),k))
def lum(h):
    def c(v):
        v/=255; return v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
    r,g,b=rgb(h);return 0.2126*c(r)+0.7152*c(g)+0.0722*c(b)
def cr(a,b):
    l1,l2=sorted([lum(a),lum(b)],reverse=True);return round((l1+0.05)/(l2+0.05),2)
SC={k:dict(zip(STEPS,v[2])) for k,v in P.items()}
def ref(s):
    if s.startswith('#'): return s
    a,b=s.split('.'); return SC[a][b]
SEM={
'light':{
 'background':'#FFFFFF','background-subtle':'neutral.50','surface':'#FFFFFF','surface-raised':'#FFFFFF','surface-sunken':'neutral.100','surface-inverse':'secondary.900',
 'text':'neutral.900','text-muted':'neutral.600','text-subtle':'neutral.500','text-inverse':'#FFFFFF','text-brand':'primary.700','text-link':'info.700',
 'border':'neutral.200','border-strong':'neutral.300','border-focus':'primary.500',
 'brand':'primary.600','brand-hover':'primary.700','brand-fg':'#FFFFFF','brand-soft':'primary.50',
 'accent':'accent.500','accent-hover':'accent.400','accent-fg':'neutral.950','accent-text':'accent.700',
 'success':'success.700','success-soft':'success.50','warning':'warning.500','warning-fg':'neutral.950','warning-soft':'warning.50','danger':'danger.600','danger-soft':'danger.50','info':'info.700','info-soft':'info.50'},
'dark':{
 'background':'neutral.950','background-subtle':'neutral.900','surface':'neutral.900','surface-raised':'neutral.800','surface-sunken':'#06090E','surface-inverse':'neutral.50',
 'text':'neutral.50','text-muted':'neutral.300','text-subtle':'neutral.400','text-inverse':'neutral.900','text-brand':'primary.300','text-link':'info.300',
 'border':'neutral.800','border-strong':'neutral.700','border-focus':'primary.400',
 'brand':'primary.400','brand-hover':'primary.300','brand-fg':'primary.950','brand-soft':'#0B2E2C',
 'accent':'accent.400','accent-hover':'accent.300','accent-fg':'neutral.950','accent-text':'accent.300',
 'success':'success.400','success-soft':'#0C2A17','warning':'warning.400','warning-fg':'neutral.950','warning-soft':'#2E2108','danger':'danger.400','danger-soft':'#3A1212','info':'info.400','info-soft':'#0F2440'}}
if __name__=='__main__':
    import sys
    B='/home/ubuntu/medical_isg_brand_v2/tokens/'
    # JSON
    J={'name':'Medical ISG Brand Tokens','version':'2.0.0','colors':{},'semantic':{},'typography':{},'radius':{},'shadow':{},'spacing_base':'4px','icons':json.load(open('/home/ubuntu/.tmp/icon_manifest.json'))}
    for k,(tr,desc,vals) in P.items():
        J['colors'][k]={'name_tr':tr,'description':desc,'scale':{s:{'hex':h,'rgb':'rgb(%d, %d, %d)'%rgb(h),'cmyk':'%d/%d/%d/%d'%cmyk(h),'contrast_on_white':cr(h,'#FFFFFF'),'contrast_on_neutral_950':cr(h,'#0A0F17')} for s,h in zip(STEPS,vals)}}
    for t,m in SEM.items(): J['semantic'][t]={k:{'ref':v,'hex':ref(v)} for k,v in m.items()}
    J['typography']={'families':{'display':"'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",'body':"'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",'mono':"'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace"},
     'scale':{'display-2xl':['60px','68px','-0.025em',800],'display-xl':['48px','56px','-0.025em',800],'display-lg':['36px','44px','-0.02em',700],'h1':['30px','38px','-0.02em',700],'h2':['24px','32px','-0.015em',700],'h3':['20px','28px','-0.01em',600],'h4':['18px','26px','-0.005em',600],'body-lg':['18px','28px','0',400],'body':['16px','24px','0',400],'body-sm':['14px','20px','0',400],'caption':['12px','16px','0.01em',500],'overline':['12px','16px','0.12em',600]}}
    J['radius']={'none':'0','sm':'6px','md':'8px','lg':'12px','xl':'16px','2xl':'24px','full':'9999px'}
    J['shadow']={'xs':'0 1px 2px rgba(10,15,23,.06)','sm':'0 1px 3px rgba(10,15,23,.08), 0 1px 2px rgba(10,15,23,.04)','md':'0 4px 12px -2px rgba(10,15,23,.10), 0 2px 4px -2px rgba(10,15,23,.06)','lg':'0 12px 32px -8px rgba(10,15,23,.16)','focus':'0 0 0 3px rgba(23,158,149,.35)'}
    json.dump(J,open(B+'brand-tokens.json','w'),ensure_ascii=False,indent=2)
    # CSS
    L=['/* Medical ISG — Brand Tokens v2.0.0\n * Kaynak: tokens/brand-tokens.json  |  Kullanım: import "./brand-tokens.css";\n * Ölçek değerleri RGB kanal olarak da verilir: rgb(var(--mi-primary-600-rgb) / 0.5)\n */',':root {']
    for k in P:
        L.append(f'  /* {k} — {P[k][0]} */')
        for s,h in SC[k].items(): L.append(f'  --mi-{k}-{s}: {h};  --mi-{k}-{s}-rgb: %d %d %d;'%rgb(h))
    L.append("\n  --mi-font-display: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;\n  --mi-font-body: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;\n  --mi-font-mono: 'JetBrains Mono', ui-monospace, Menlo, monospace;")
    for k,v in J['radius'].items(): L.append(f'  --mi-radius-{k}: {v};')
    for k,v in J['shadow'].items(): L.append(f'  --mi-shadow-{k}: {v};')
    L.append('}\n')
    def sem(m): return [f'  --mi-{k}: {ref(v)};' for k,v in m.items()]
    L+= [':root, [data-theme="light"] {','  color-scheme: light;']+sem(SEM['light'])+['}\n','[data-theme="dark"], .dark {','  color-scheme: dark;']+sem(SEM['dark'])+['}\n','@media (prefers-color-scheme: dark) {','  :root:not([data-theme="light"]) {','    color-scheme: dark;']+['  '+x for x in sem(SEM['dark'])]+['  }','}\n']
    open(B+'brand-tokens.css','w').write('\n'.join(L))
    # Tailwind
    cols={k:SC[k] for k in P}
    tw="""/** Medical ISG — Tailwind CSS 3 marka preset'i (v2.0.0)
 * Kullanım (tailwind.config.js):
 *   module.exports = { presets: [require('./tokens/tailwind.brand.js')], content: ['./index.html','./src/**' + '/*.{ts,tsx}'] }
 * Semantik renkler (bg-surface, text-muted, border-default ...) brand-tokens.css'teki CSS değişkenlerine bağlıdır;
 * koyu tema için <html data-theme="dark"> veya class="dark" kullanın.
 */
const scales = %s;

const v = (name) => `var(--mi-${name})`;

module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ...scales,
        brand: { DEFAULT: v('brand'), hover: v('brand-hover'), fg: v('brand-fg'), soft: v('brand-soft') },
        surface: { DEFAULT: v('surface'), raised: v('surface-raised'), sunken: v('surface-sunken'), inverse: v('surface-inverse') },
        background: { DEFAULT: v('background'), subtle: v('background-subtle') },
        content: { DEFAULT: v('text'), muted: v('text-muted'), subtle: v('text-subtle'), inverse: v('text-inverse'), brand: v('text-brand'), link: v('text-link') },
        line: { DEFAULT: v('border'), strong: v('border-strong'), focus: v('border-focus') },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: %s,
      borderRadius: { sm: '6px', DEFAULT: '8px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px' },
      boxShadow: %s,
      ringColor: { DEFAULT: '#179E95' },
    },
  },
};
"""%(json.dumps(cols,indent=2),json.dumps({k:[v[0],{'lineHeight':v[1],'letterSpacing':v[2],'fontWeight':str(v[3])}] for k,v in J['typography']['scale'].items()},indent=2),json.dumps(J['shadow'],indent=2))
    open(B+'tailwind.brand.js','w').write(tw)
    print('tokens ok')
