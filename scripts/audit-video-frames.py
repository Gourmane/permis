"""Fresh audit frames from original sources; Video 1 is never opened."""
import sys,json
from pathlib import Path
sys.stdout.reconfigure(encoding='utf8')
ROOT=Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'.tools/python'))
import cv2
from PIL import Image,ImageDraw
questions=json.loads((ROOT/'src/data/questions.generated.json').read_text(encoding='utf-8-sig'))
out=ROOT/'reports/answer-audit-evidence';out.mkdir(exist_ok=True)
def frame(cap,t):
 cap.set(cv2.CAP_PROP_POS_MSEC,t*1000);ok,f=cap.read()
 if not ok:raise RuntimeError(f'Cannot decode at {t}s')
 return Image.fromarray(cv2.cvtColor(f,cv2.COLOR_BGR2RGB))
if '--intro' in sys.argv:
 q=next(q for q in questions if q['seriesNumber']==2)
 cap=cv2.VideoCapture(str(ROOT/'source-videos'/q['sourceVideo']))
 times=[26,50,80,100,108,114,145,172,182,200,206,214]
 canvas=Image.new('RGB',(1708,6*504),'white');d=ImageDraw.Draw(canvas)
 for i,t in enumerate(times):
  x,y=i%2*854,i//2*504;canvas.paste(frame(cap,t),(x,y+24));d.text((x+8,y+5),f'Video 2 / {t}s',fill='black')
 canvas.save(out/'reveal-convention.jpg',quality=95);cap.release();print(out/'reveal-convention.jpg')
else:
 for n in range(2,15):
  qs=[q for q in questions if q['seriesNumber']==n]
  cap=cv2.VideoCapture(str(ROOT/'source-videos'/qs[0]['sourceVideo']))
  for batch in range(0,len(qs),5):
   canvas=Image.new('RGB',(1708,504*5),'white');d=ImageDraw.Draw(canvas)
   for i,q in enumerate(qs[batch:batch+5]):
    y=i*504
    im=frame(cap,q['questionTimestamp']);im.save(out/f"{q['id']}-question.jpg",quality=96);canvas.paste(im,(0,y+24))
    im=frame(cap,q['answerTimestamp']);im.save(out/f"{q['id']}-correction.jpg",quality=96);canvas.paste(im,(854,y+24))
    d.text((8,y+5),f"{q['id']} question {q['questionTimestamp']}s",fill='black');d.text((862,y+5),f"{q['id']} correction {q['answerTimestamp']}s",fill='black')
   canvas.save(out/f's{n:02}-page-{batch//5+1:02}.jpg',quality=96)
  cap.release();print(f'Series {n}: {len(qs)} fresh question/correction pairs',flush=True)
