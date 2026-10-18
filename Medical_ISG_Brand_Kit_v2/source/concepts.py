import sys;sys.path.insert(0,'.');from svgparts import *
T600='#0D7F79';T800='#10514F';T700='#0E6662';T500='#179E95';N900='#172A4A';OR='#FF5A10'
def mark(kind,size=220):
    c=f'transform="translate(12 11.4) scale(0.44) translate(-12 -12)"'
    if kind=='A':
        body=f'<defs><clipPath id="r{kind}"><rect x="12" y="0" width="12" height="24"/></clipPath></defs><g fill="{T600}">{SHIELD}</g><g fill="{T800}" clip-path="url(#r{kind})">{SHIELD}</g><g fill="#fff" {c}>{CROSS}</g>'
    if kind=='B':
        body=f'<g fill="{N900}">{SHIELD}</g><g fill="{T500}" {c}>{CROSS}</g><circle cx="17.6" cy="6.2" r="1.25" fill="{OR}"/>'
    if kind=='C':
        body=f'<defs><clipPath id="r{kind}"><rect x="12" y="0" width="12" height="24"/></clipPath></defs><g fill="{T600}">{SHIELD}</g><g fill="{T800}" clip-path="url(#r{kind})">{SHIELD}</g><g fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" transform="translate(12 11.6) scale(0.62) translate(-12 -12)">{PULSE}</g>'
    if kind=='D':
        body=f'<defs><clipPath id="r{kind}"><rect x="12" y="0" width="12" height="24"/></clipPath></defs><g fill="{N900}">{SHIELD}</g><g fill="{T600}" clip-path="url(#r{kind})">{SHIELD}</g><g fill="#fff" {c}>{CROSS}</g>'
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24">{body}</svg>'
html='''<!doctype html><html><head><meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=block" rel="stylesheet"><style>body{margin:0;width:1600px;height:520px;background:#F7F9FB;font-family:'Plus Jakarta Sans';display:flex;gap:30px;padding:40px;box-sizing:border-box}.c{background:#fff;border-radius:20px;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;border:1px solid #E2E8EF}.l{font-weight:700;color:#374456}</style></head><body>'''
for k in 'ABCD': html+=f'<div class="c">{mark(k)}<div class="l">Konsept {k}</div></div>'
html+='</body></html>'
open('html/concepts.html','w').write(html)
