import sys,subprocess,json,hashlib
from pathlib import Path
sys.stdout.reconfigure(encoding='utf8')
root=Path(__file__).resolve().parent.parent
for step in ['scan-videos.py','detect-scenes.py','generate-content.py','write-report.py']:
 print('تشغيل:',step,flush=True)
 subprocess.run([sys.executable,str(root/'scripts'/step)],cwd=root,check=True)
print('اكتمل الاستخراج. راجع الأسئلة غير المؤكدة ثم شغّل npm run validate-content.')
