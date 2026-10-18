import sys,os;sys.path.insert(0,'.');from svgparts import *
N900='#172A4A';T600='#0D7F79';T400='#3DBAB0';T300='#72D5CB'
FONT='<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=block" rel="stylesheet">'
def mark(theme='light',mono=None,uid='m'):
    if mono:
        L=R=mono; X='transparent'
        cross_mode='knock'
    elif theme=='light': L,R,X=N900,T600,'#FFFFFF'
    else: L,R,X='#FFFFFF',T400,N900
    c='transform="translate(12 11.35) scale(0.5) translate(-12 -12)"'
    P=f'<g fill="none" stroke-width="4.4" stroke-linecap="round" {c}>{PLUS}</g>'
    if mono:
        return f'<svg viewBox="2.3 1.8 19.4 19.6" width="100%" height="100%"><defs><mask id="k{uid}"><rect x="0" y="0" width="24" height="24" fill="#fff"/><g stroke="#000">{P}</g></mask></defs><g fill="{mono}" mask="url(#k{uid})">{SHIELD}</g></svg>'
    return f'<svg viewBox="2.3 1.8 19.4 19.6" width="100%" height="100%"><defs><clipPath id="r{uid}"><rect x="12" y="0" width="12" height="24"/></clipPath></defs><g fill="{L}">{SHIELD}</g><g fill="{R}" clip-path="url(#r{uid})">{SHIELD}</g><g stroke="{X}">{P}</g></svg>'
def colors(theme,mono):
    if mono: return mono,mono,mono
    return (N900,T600,'#677689') if theme=='light' else ('#FFFFFF',T400,'#CBD4DF')
def page(w,h,body,bg='transparent'):
    return f'<!doctype html><html><head><meta charset="utf-8">{FONT}<style>html,body{{margin:0;padding:0}}body{{width:{w}px;height:{h}px;background:{bg};font-family:"Plus Jakarta Sans",sans-serif;overflow:hidden;display:flex;align-items:center;justify-content:center}}.wm{{letter-spacing:-0.025em;line-height:1;white-space:nowrap}}.tg{{text-transform:uppercase;font-weight:600;white-space:nowrap;line-height:1}}</style></head><body>{body}</body></html>'
def horizontal(theme='light',mono=None,bg='transparent'):
    a,b,t=colors(theme,mono)
    body=f'''<div style="display:flex;align-items:center;gap:40px">
<div style="width:196px;height:198px">{mark(theme,mono,'h')}</div>
<div style="display:flex;flex-direction:column;gap:22px">
<div class="wm" style="font-size:112px"><span style="font-weight:500;color:{a}">Medical</span><span style="font-weight:800;color:{b};margin-left:24px">ISG</span></div>
<div class="tg" style="font-size:27.5px;letter-spacing:0.235em;color:{t};padding-left:4px">İş Sağlığı ve Güvenliği</div></div></div>'''
    return page(1200,400,body,bg)
def stacked(theme='light',mono=None,bg='transparent'):
    a,b,t=colors(theme,mono)
    body=f'''<div style="display:flex;flex-direction:column;align-items:center">
<div style="width:380px;height:384px">{mark(theme,mono,'s')}</div>
<div class="wm" style="font-size:132px;margin-top:56px"><span style="font-weight:500;color:{a}">Medical</span><span style="font-weight:800;color:{b};margin-left:28px">ISG</span></div>
<div class="tg" style="font-size:31px;letter-spacing:0.25em;color:{t};margin-top:30px;padding-left:8px">İş Sağlığı ve Güvenliği</div></div>'''
    return page(1000,1000,body,bg)
def icon(theme='light',mono=None,bg='transparent',pad=0.08,size=1024,radius=0):
    inner=int(size*(1-2*pad))
    if bg!='transparent':
        body=f'<div style="width:{size}px;height:{size}px;background:{bg};border-radius:{radius}px;display:flex;align-items:center;justify-content:center"><div style="width:{inner}px;height:{inner}px">{mark(theme,mono,"i")}</div></div>'
        return page(size,size,body,'transparent')
    return page(size,size,f'<div style="width:{inner}px;height:{inner}px">{mark(theme,mono,"i")}</div>')
os.makedirs('html/logos',exist_ok=True)
V={
'medical-isg-horizontal-light':horizontal('light'),
'medical-isg-horizontal-dark':horizontal('dark'),
'medical-isg-horizontal-mono-black':horizontal(mono='#0A0F17'),
'medical-isg-horizontal-mono-white':horizontal(mono='#FFFFFF'),
'medical-isg-stacked-light':stacked('light'),
'medical-isg-stacked-dark':stacked('dark'),
'medical-isg-icon-light':icon('light'),
'medical-isg-icon-dark':icon('dark'),
'medical-isg-icon-mono-black':icon(mono='#0A0F17'),
'medical-isg-icon-mono-white':icon(mono='#FFFFFF'),
'app-icon-light':icon('light',bg='#FFFFFF',pad=0.17),
'app-icon-dark':icon('dark',bg='#0D1A30',pad=0.17),
'favicon-mark':icon('light',pad=0.02),
}
for k,v in V.items(): open(f'html/logos/{k}.html','w').write(v)
# previews on backgrounds (for export_design_asset viewing)
open('html/logos/_preview.html','w').write(f'''<!doctype html><html><head><meta charset="utf-8">{FONT}</head><body style="margin:0;width:1600px;height:1000px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr">
<div style="background:#fff;display:flex;align-items:center;justify-content:center"><iframe src="medical-isg-horizontal-light.html" style="border:0;width:1200px;height:400px;transform:scale(.62)"></iframe></div>
<div style="background:#0D1A30;display:flex;align-items:center;justify-content:center"><iframe src="medical-isg-horizontal-dark.html" style="border:0;width:1200px;height:400px;transform:scale(.62)"></iframe></div>
<div style="background:#F7F9FB;display:flex;align-items:center;justify-content:center"><iframe src="medical-isg-stacked-light.html" style="border:0;width:1000px;height:1000px;transform:scale(.45)"></iframe></div>
<div style="background:#131B26;display:flex;align-items:center;justify-content:center;gap:40px"><iframe src="medical-isg-stacked-dark.html" style="border:0;width:1000px;height:1000px;transform:scale(.45);margin:-275px"></iframe></div>
</body></html>''')
print(len(V))
