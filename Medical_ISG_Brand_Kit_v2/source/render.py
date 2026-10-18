import asyncio,sys,os
from playwright.async_api import async_playwright
jobs=[l.split() for l in open(sys.argv[1]).read().strip().splitlines()]  # html w h scale out
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for html,w,h,sc,out in jobs:
            pg=await b.new_page(viewport={'width':int(w),'height':int(h)},device_scale_factor=float(sc))
            await pg.goto('file://'+os.path.abspath(html)); await pg.wait_for_load_state('networkidle'); await pg.evaluate('document.fonts.ready')
            await pg.wait_for_timeout(300)
            os.makedirs(os.path.dirname(out),exist_ok=True)
            await pg.screenshot(path=out,omit_background=True,full_page=False); await pg.close()
        await b.close()
asyncio.run(main())
