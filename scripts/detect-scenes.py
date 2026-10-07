import sys,json,re,concurrent.futures
from pathlib import Path
sys.path.insert(0,str(Path('.tools/python').resolve()))
import cv2,numpy as np
from PIL import Image,ImageDraw
sys.stdout.reconfigure(encoding='utf-8')
meta=json.loads(Path('reports/video-inventory.json').read_text(encoding='utf-8-sig'))
Path('reports/frames').mkdir(parents=True,exist_ok=True)
def process(v):
 n=v['series'];p=Path('source-videos')/v['file'];c=cv2.VideoCapture(str(p));segments=[];last=None;start=None
 # Road scene and question text are stable; small answer highlighting does not split scenes.
 for t in range(42 if n==1 else 24,int(v['duration']),2):
  c.set(cv2.CAP_PROP_POS_MSEC,t*1000);ok,f=c.read()
  if not ok:continue
  sample=cv2.resize(f[20:470,5:740],(160,100))
  difference=100 if last is None else np.abs(sample.astype(float)-last.astype(float)).mean()
  if difference>14:
   if start is not None:segments[-1]['end']=t-2
   start=t;last=sample;segments.append({'start':t,'end':t,'delta':round(float(difference),2)})
  else:segments[-1]['end']=t
 # Drop very short overlays/transitions. Keep long static question displays.
 segments=[s for s in segments if s['end']-s['start']>=12]
 folder=Path(f'reports/frames/s{n:02}');folder.mkdir(exist_ok=True)
 for j,s in enumerate(segments,1):
  for kind,t in [('clean',s['start']+2),('answer',max(s['start']+2,s['end']-2))]:
   c.set(cv2.CAP_PROP_POS_MSEC,t*1000);ok,f=c.read()
   if ok:cv2.imwrite(str(folder/f'{j:03}-{kind}.jpg'),f)
  s['number']=j
 c.release();Path(f'reports/frames/s{n:02}.json').write_text(json.dumps(segments,indent=2),encoding='utf8')
 cols=4;w=320;h=204
 for batch in range(0,len(segments),20):
  subset=segments[batch:batch+20];canvas=Image.new('RGB',(cols*w,((len(subset)+cols-1)//cols)*h),'white');draw=ImageDraw.Draw(canvas)
  for k,s in enumerate(subset):
   im=Image.open(folder/f"{s['number']:03}-answer.jpg");im.thumbnail((320,180));x=k%cols*w;y=k//cols*h;canvas.paste(im,(x,y+24));draw.text((x+4,y+4),f"S{n:02} Q{s['number']:03} {s['start']}-{s['end']}",fill='black')
  canvas.save(f'reports/contact-sheets/s{n:02}-answers-{batch//20+1}.jpg',quality=94)
 return n,len(segments)
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
 for n,count in pool.map(process,meta):print(f'S{n:02}: {count} candidates',flush=True)
