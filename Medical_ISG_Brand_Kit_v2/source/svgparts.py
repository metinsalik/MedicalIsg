import re
RAW='/home/ubuntu/design_assets/raw'
def inner(path):
    s=open(path).read()
    s=re.sub(r'<!--.*?-->','',s,flags=re.S)
    i=re.search(r'<svg[^>]*>(.*)</svg>',s,re.S).group(1)
    i=re.sub(r'<path stroke="none" d="M0 0h24v24H0z" fill="none"\s*/>','',i)
    return re.sub(r'\s+',' ',i).strip()
SHIELD=inner(f'{RAW}/logo/shield-filled.svg').replace('fill="currentColor" ','')
CROSS=inner(f'{RAW}/logo/medical-cross-filled.svg')
PULSE=inner(f'{RAW}/logo/activity-heartbeat.svg')
SHIELD_OUT=inner(f'{RAW}/logo/shield.svg')

PLUS=inner(f'{RAW}/logo/plus.svg')
