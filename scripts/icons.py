from PIL import Image,ImageDraw
for n in (192,512):
 im=Image.new('RGB',(n,n),'#185b84');d=ImageDraw.Draw(im);s=n/192
 d.line([(50*s,145*s),(81*s,43*s),(111*s,43*s),(142*s,145*s)],fill='white',width=int(10*s),joint='curve')
 for a,b in [(64,84),(99,121),(136,152)]:d.line([(96*s,a*s),(96*s,b*s)],fill='white',width=int(9*s))
 im.save(f'public/icon-{n}.png')
