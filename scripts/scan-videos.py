import sys,json,re
sys.stdout.reconfigure(encoding='utf8')
from pathlib import Path
sys.path.insert(0,str(Path('.tools/python').resolve()))
import cv2
from PIL import Image,ImageDraw
root=Path('source-videos');videos=sorted([p for p in root.rglob('*') if p.is_file() and p.suffix.lower() in {'.mp4','.mov','.webm','.mkv'}],key=lambda p: (int(re.findall(r'رقم\s*(\d+)',p.name)[0]) if re.findall(r'رقم\s*(\d+)',p.name) else 9999, [int(x) if x.isdigit() else x.casefold() for x in re.split(r'(\d+)',str(p))]))
if not videos: raise RuntimeError('لا توجد فيديوهات داخل source-videos')
Path('reports/contact-sheets').mkdir(parents=True,exist_ok=True)
meta=[]
for i,p in enumerate(videos,1):
 c=cv2.VideoCapture(str(p));fps=c.get(cv2.CAP_PROP_FPS);total=c.get(cv2.CAP_PROP_FRAME_COUNT);d=total/fps if fps>0 else 0
 if d<=0:raise RuntimeError(f'تعذّر قراءة الفيديو: {p}')
 meta.append({'series':i,'file':str(p.relative_to(root)).replace('\\','/'),'duration':round(d,2),'fps':fps,'frames':total,'width':c.get(3),'height':c.get(4)})
 times=[5,15,25,35,45,55,65,75,85,95,105,115] if i==1 else [5,15,30,45,60,90]
 canvas=Image.new('RGB',(960,((len(times)+1)//2)*294),'white');draw=ImageDraw.Draw(canvas)
 for k,t in enumerate(times):
  c.set(cv2.CAP_PROP_POS_MSEC,t*1000);ok,f=c.read()
  if ok:
   im=Image.fromarray(cv2.cvtColor(f,cv2.COLOR_BGR2RGB));im.thumbnail((480,270));x=(k%2)*480;y=(k//2)*294;canvas.paste(im,(x,y+24));draw.text((x+8,y+4),f'S{i:02}  {t}s',fill='black')
 canvas.save(f'reports/contact-sheets/s{i:02}-sample.jpg',quality=90);c.release()
Path('reports/video-inventory.json').write_text(json.dumps(meta,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(meta,ensure_ascii=False,indent=2))


