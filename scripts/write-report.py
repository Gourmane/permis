import sys,json,hashlib,re
from pathlib import Path
sys.path.insert(0,str(Path('.tools/python').resolve()))
from PIL import Image
sys.stdout.reconfigure(encoding='utf8')
qs=json.loads(Path('src/data/questions.generated.json').read_text(encoding='utf8'));series=json.loads(Path('src/data/series.generated.json').read_text(encoding='utf8'));merged=json.loads(Path('reports/merged-frames.json').read_text(encoding='utf8'));pending=[q for q in qs if q['needsReview']]
# Hashes guard verified decisions against accidental reuse with different videos.
verified=json.loads(Path('reports/verified-extraction.json').read_text(encoding='utf-8-sig'))
verified['sources']={str(s['number']):{'file':s['sourceVideo'],'sha256':hashlib.file_digest(open(Path('source-videos')/s['sourceVideo'],'rb'),'sha256').hexdigest()}for s in series}
Path('reports/verified-extraction.json').write_text(json.dumps(verified,ensure_ascii=False,indent=2),encoding='utf8')
# Conservative cross-series duplicate candidates from perceptual source-image fingerprints.
hashes=[];duplicates=[]
for q in qs:
 im=Image.open('public'+q['image']).convert('L').resize((17,16));px=list(im.getdata());bits=[px[y*17+x]>px[y*17+x+1]for y in range(16)for x in range(16)];value=sum(int(b)<<i for i,b in enumerate(bits))
 for prev,h in hashes:
  if prev['seriesId']!=q['seriesId'] and (value^h).bit_count()<=15:duplicates.append((prev['id'],q['id']))
 hashes.append((q,value))
lines=['# تقرير استخراج الأسئلة','',f'- الفيديوهات المعالجة: {len(series)}',f'- السلاسل: {len(series)}',f'- الأسئلة: {len(qs)}',f'- الأسئلة المؤكدة بصريًا: {len(qs)-len(pending)}',f'- الأسئلة التي تحتاج مراجعة: {len(pending)}',f'- انتقالات مكررة دُمجت: {len(merged)}','','## طريقة العمل','','جرى فحص جميع الفيديوهات محليًا عبر OpenCV، أخذ عينات كل ثانيتين، كشف تغيّر الشرائح، استخراج إطارات قبل التصحيح وإطارات التصحيح، ثم قراءة أرقام الإجابات المبرزة بصريًا في صور كل السلاسل. لا يُعتمد على ناتج قراءة الأرقام الآلية. سجل الإجابات المعتمد هو reports/verified-extraction.json.','', 'الوقت المسجل للسؤال هو وقت إطار نظيف قبل التصحيح، وليس ادعاءً بدقة بداية ظهوره. وقت الإجابة هو وقت إطار التصحيح الذي فُحص قرب نهاية العرض، وليس وقت بداية كشف الإجابة. دقة أخذ العينات ثانيتان. الثقة ٠٫٩٧ تقييم نوعي وليست احتمالًا إحصائيًا.','', 'السلسلة الأولى لا تبرز الإجابات بصريًا في الإطارات المستخرجة، لذلك لا تحتوي على إجابات معتمدة. يلزم سماع شرحها للتحقق اليدوي. لم تخمن الإجابات، ولم تخترع تفسيرات. تصنيف هذه الأسئلة «متنوعة».','', 'أزيل عمود أزرار المحاكي الفرنسي من صور التدريب. بقيت الصورة الأصلية ومحتواها وعلاماتها المائية. علامات الطريق وأسماء العلامات التجارية في الصورة ليست ترجمة للواجهة.','','## الأسئلة حسب السلسلة','','| السلسلة | الأسئلة | مؤكدة | مراجعة | الفيديو |','|---|---:|---:|---:|---|']
for s in series:
 ss=[q for q in qs if q['seriesId']==s['id']];p=sum(q['needsReview']for q in ss);lines.append(f"| {s['number']} | {len(ss)} | {len(ss)-p} | {p} | {s['sourceVideo']} |")
lines+=['','## الأسئلة غير المؤكدة','','يمكن مراجعتها في /review/ وهي مستبعدة من التدريب العادي.','','| السؤال | إطار السؤال بالثواني | السبب |','|---|---:|---|']
for q in pending:lines.append(f"| {q['id']} | {q['questionTimestamp']} | لا توجد إجابة بصرية موثوقة؛ تحقق من الصوت |")
lines+=['','## مرشحات تكرار بين السلاسل','','التشابه البصري لا يثبت التطابق. قد تختلف خيارات الإجابة أو نص السؤال رغم تشابه الصورة. لا يُحذف سؤال تلقائيًا.','']
for a,b in duplicates:lines.append(f'- {a} / {b}')
lines+=['','## الملفات التي تساعد في المراجعة','','- reports/verified-extraction.json: الإجابات المقروءة ودمج الانتقالات وبصمات الفيديوهات.','- reports/video-inventory.json: أسماء المصادر ومددها وأبعادها.','- reports/merged-frames.json: إطارات انتقالية دُمجت داخل السؤال نفسه.','- reports/contact-sheets/: لوحات الإطارات النظيفة والتصحيحية، محلية وغير منشورة.','- reports/frames/: صور الأدلة الكاملة، محلية وغير منشورة.','- src/data/questions.generated.json: بيانات الإنتاج.','','## حدود الاستخراج','','الشرح الصوتي لم يُحوّل إلى نص. الأسئلة ذات الإجابات المرئية نُقلت من الفيديو نفسه؛ لا يثبت ذلك مطابقة محتواه لأحدث القوانين. أي جواب غير ظاهر بوضوح يبقى للمراجعة. لا تحتوي نسخة الإنتاج على فيديوهات أو أدوات استخراج.']
Path('reports/extraction-report.md').write_text('\n'.join(lines)+'\n',encoding='utf8');Path('reports/duplicate-candidates.json').write_text(json.dumps(duplicates,indent=2),encoding='utf8');print(f'تقرير مكتمل: {len(duplicates)} مرشح تشابه بين السلاسل.')
