import sys, math; sys.path.insert(0,'/home/claude/px')
from px import *
def new(): return Layer(16,16)
def shield(main,light,dark,rim):
    I=new()
    I.poly([(2,1),(14,1),(14,8),(8,15),(2,8)],rim)
    I.poly([(4,3),(12,3),(12,8),(8,12.5),(4,8)],main,shade=lambda x,y:light if x<7 else (dark if x>9 else main))
    return I
icons={}
I=shield('n1','n2','n0','b2'); I.set(8,6,'b3'); I.set(7,6,'b2'); I.outline('k0'); icons['Guard']=I
I=shield('r1','r2','r0','n0')
for x,y in ((9,3),(8,4),(8,5),(7,6),(8,7),(9,8),(8,9),(8,10)): I.set(x,y,'k0')
I.outline('k0'); icons['Exposed']=I
I=new(); I.line(7,1,7,10,'n2'); I.line(8,1,8,10,'n0'); I.set(7,0,'n2')
I.rect(4,10,11,11,'b2'); I.rect(4,11,11,11,'b1'); I.rect(7,12,8,13,'d1'); I.rect(7,14,8,14,'b3')
I.outline('k0')
for x,y,c in ((12,3,'e4'),(13,2,'e5'),(11,2,'e3'),(13,4,'e3'),(3,5,'e4'),(2,4,'e3')): I.set(x,y,c)
icons['Edge']=I
I=new(); I.rect(3,2,12,14,'w2'); I.rect(3,2,4,14,'w3'); I.rect(11,2,12,14,'w1')
for y in range(2,7):
    for x in range(8,13):
        if (x-8)>(y-2): I.p[y][x]=None
for y in range(2,7):
    for x in range(8,13):
        if (x-8)<=(y-2) and x>=8+ (y-2) - 0 and (x-8)==(y-2): I.set(x,y,'w1')
I.poly([(8,2),(8,6.9),(12.9,6.9)],'w1'); I.line(8,3,11,6,'w0')
I.set(7,9,'r1'); I.set(6,10,'r1'); I.set(7,10,'r2'); I.set(8,10,'r1'); I.set(7,11,'r1')
I.outline('k0'); icons['Fold']=I
I=new()
pts=[(7.5+math.cos(t)*t*.52, 7.5+math.sin(t)*t*.52) for t in [i*.08 for i in range(8,160)]]
for x,y in pts: I.set(x,y,'f2')
for x,y in pts[-30:]: I.set(x,y,'f3')
I.outline('k0'); icons['Shaken']=I
I=new()
def fl(cx,tip,bot,r,c):
    pk=bot-3
    for y in range(tip,bot+1):
        rr=r*((y-tip)/max(1,pk-tip))**.8 if y<=pk else r*math.sqrt(max(0,1-((y-pk)/(bot-pk+.01))**2))
        for x in range(16):
            if abs(x+.5-cx)<=rr: I.set(x,y,c)
fl(8,1,14,5.2,'e2'); fl(8,4,14,3.6,'e3'); fl(8,7,13,2.3,'e4'); fl(8,10,13,1.1,'e5')
I.outline('k0'); icons['Blaze']=I
I=new()
for a in range(0,180,60):
    dx,dy=math.cos(math.radians(a))*6.5,math.sin(math.radians(a))*6.5
    I.line(8-dx,8-dy,8+dx,8+dy,'f2')
for a in range(0,360,60):
    bx,by=8+math.cos(math.radians(a))*4.5,8+math.sin(math.radians(a))*4.5
    for s in (-1,1):
        I.set(bx+math.cos(math.radians(a+s*55))*1.6, by+math.sin(math.radians(a+s*55))*1.6,'f3')
I.set(8,8,'f3'); I.outline('k0'); icons['Frost']=I
I=new(); I.ellipse(8,8,6.5,6.5,'b1')
I.ellipse(8,8,5.5,5.5,'b2',shade=lambda x,y,dx,dy:'b3' if (dx<-.3 and dy<-.3) else 'b2')
I.ellipse(8,8,3.2,3.2,'b1'); I.ellipse(8,8,2.2,2.2,'b2')
I.set(5,4,'n2'); I.outline('k0'); icons['Gold']=I
order=['Guard','Edge','Exposed','Shaken','Fold','Blaze','Frost','Gold']
for n in order: icons[n].img().save(f'icon_{n.lower()}.png'); icons[n].img(6).save(f'icon_{n.lower()}_x6.png')
# contact sheet on felt for a quick look
S=Layer(16*8+18,20); S.fill('g1')
for i,n in enumerate(order): S.over(icons[n],2+i*18,2)
S.img(6).save('icons_sheet.png')
