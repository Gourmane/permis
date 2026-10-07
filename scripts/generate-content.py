import sys,json,hashlib
from pathlib import Path
sys.path.insert(0,str(Path('.tools/python').resolve()))
import cv2,numpy as np
from PIL import Image,ImageDraw
sys.stdout.reconfigure(encoding='utf8')
meta=json.loads(Path('reports/video-inventory.json').read_text(encoding='utf-8-sig'));verified=json.loads(Path('reports/verified-extraction.json').read_text(encoding='utf-8-sig'))
allq=[];series=[];dupes=[]
for v in meta:
 n=v['series'];source=verified.get('sources',{}).get(str(n));actual=hashlib.file_digest(open(Path('source-videos')/v['file'],'rb'),'sha256').hexdigest()
 if source and (source['file']!=v['file'] or source['sha256']!=actual):raise RuntimeError('تغيّر مصدر السلسلة. يلزم إعادة التحقق البصري قبل اعتماد الإجابات.')
 segments=json.loads(Path(f'reports/frames/s{n:02}.json').read_text());groups=[]
 for s in segments:
  if s['number'] in verified['mergeIntoPrevious'].get(str(n),[]):groups[-1].append(s)
  else:groups.append([s])
 expected=40 if n<=7 else 20
 assert len(groups)==expected,(n,len(groups),expected)
 answers=verified['answers'].get(str(n),['']*expected);topics=verified['topics'].get(str(n),' '.join(['other']*expected)).split();assert len(answers)==len(topics)==expected,(n,len(answers),len(topics))
 folder=Path(f'public/questions/series-{n:02}');folder.mkdir(parents=True,exist_ok=True)
 for i,g in enumerate(groups,1):
  first,last=g[0],g[-1];question_time=verified.get('questionTimestampOverrides',{}).get(f's{n:02}-q{i:03}',first['start']+2);f=cv2.imread(f"reports/frames/s{n:02}/{first['number']:03}-clean.jpg");
  if question_time!=first['start']+2:
   cap=cv2.VideoCapture(str(Path('source-videos')/v['file']));cap.set(cv2.CAP_PROP_POS_MSEC,question_time*1000);ok,f=cap.read();cap.release()
   if not ok:raise RuntimeError(f'Cannot decode clean frame for series {n}, question {i}')
  hsv=cv2.cvtColor(f,cv2.COLOR_BGR2HSV)
  # Remove recorded simulator controls, preserving the full question panel.
  sidebar=755
  for x in range(690,800):
   if np.mean((hsv[255:465,x,0]>=100)&(hsv[255:465,x,0]<=135)&(hsv[255:465,x,1]>50))>.68:sidebar=x;break
  crop=f[:475,:max(700,sidebar-3)]
  im=Image.fromarray(cv2.cvtColor(crop,cv2.COLOR_BGR2RGB));im.save(folder/f'question-{i:03}.webp',quality=94,method=6)
  answer=list(map(int,answers[i-1]));q={'id':f's{n:02}-q{i:03}','seriesId':f'series-{n:02}','seriesNumber':n,'questionNumber':i,'image':f'/questions/series-{n:02}/question-{i:03}.webp','correctAnswers':answer,'topic':topics[i-1],'sourceVideo':v['file'],'questionTimestamp':question_time,'answerTimestamp':last['end']-2 if answer else None,'confidence':.97 if answer else 0,'needsReview':not bool(answer)}
  if not answer:q['notes']='لم تظهر إجابة محددة بصريًا في الفيديو. يلزم التحقق من الشرح الصوتي يدويًا. لم تُخمّن الإجابة أو تصنيف الموضوع.'
  allq.append(q)
  if len(g)>1:dupes.append({'questionId':q['id'],'mergedCandidates':[s['number']for s in g]})
 series.append({'id':f'series-{n:02}','number':n,'sourceVideo':v['file'],'questionCount':len(groups)})
Path('src/data/questions.generated.json').write_text(json.dumps(allq,ensure_ascii=False,indent=2),encoding='utf8');Path('src/data/series.generated.json').write_text(json.dumps(series,ensure_ascii=False,indent=2),encoding='utf8');Path('reports/merged-frames.json').write_text(json.dumps(dupes,indent=2),encoding='utf8')
# Side-by-side evidence for every source question, before disclosure and at the inspected correction frame.
for v in meta:
 n=v['series'];segs=json.loads(Path(f'reports/frames/s{n:02}.json').read_text());groups=[]
 for s in segs:
  if s['number'] in verified['mergeIntoPrevious'].get(str(n),[]):groups[-1].append(s)
  else:groups.append([s])
 for batch in range(0,len(groups),10):
  sub=groups[batch:batch+10];canvas=Image.new('RGB',(1520,len(sub)*130),'white');d=ImageDraw.Draw(canvas)
  for k,g in enumerate(sub):
   i=batch+k+1;q=next(q for q in allq if q['seriesNumber']==n and q['questionNumber']==i);y=k*130
   for j,(s,kind) in enumerate([(g[0],'clean'),(g[-1],'answer')]):
    im=Image.open(f"reports/frames/s{n:02}/{s['number']:03}-{kind}.jpg");im.thumbnail((680,110));canvas.paste(im,(j*760,y+20))
   d.text((6,y+2),f"S{n:02} Q{i:03}  before {q['questionTimestamp']}s",fill='black');d.text((765,y+2),f"S{n:02} Q{i:03} answer {q['correctAnswers']} at {q['answerTimestamp']}s",fill='black')
  canvas.save(f'reports/contact-sheets/s{n:02}-verified-{batch//10+1}.jpg',quality=95)
print(f'Generated {len(allq)} questions; {sum(q["needsReview"]for q in allq)} need review; {len(dupes)} merged transitions.')

