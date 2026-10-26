import sys, math; sys.path.insert(0,'/home/claude/px')
from px import *
W=H=64
L=Layer(W,H); L.fill('k1')
glow(L,32,15,[(34,'k2'),(26,'k3'),(19,'e0'),(12,'e1')])
# table edge and felt with a pool of light
L.rect(0,53,63,54,'d1'); L.rect(0,52,63,52,'d0')
for y in range(55,64):
    for x in range(64):
        d=math.hypot((x-32)/26,(y-55)/7)
        L.set(x,y,ramp_pick(['g3','g2','g1','g1','g0'],d*0.8,x,y))
L.ellipse(37,57,15,2.6,'g0')  # cast shadow, falls right-down from the flame

S=Layer(W,H)
# brass dish
S.ellipse(32,53,17,4.2,'b1',shade=lambda x,y,dx,dy:'b0' if dy>.45 else ('b3' if dy<-.55 and dx<.2 else 'b2' if dy<-.1 else 'b1'))
# candle body: lit from flame above, falls off to the right
def body(x,y):
    t=(x-22)/20
    side=abs(t-.38)*1.6
    top=max(0,(y-28)/24)*.35
    cols={22:'w1',23:'w1',24:'w2',25:'w2',26:'w2',27:'w2',28:'w3',29:'w3',30:'w3',31:'w3',32:'w3',33:'w3',34:'w3',35:'w2',36:'w2',37:'w2',38:'w2',39:'w1',40:'w1',41:'w0',42:'w0'}
    c=cols[x]
    if y>45 and c=='w3' and x in (28,34): c='w2'
    if y>48 and c=='w2' and x in (24,38): c='w1'
    return c
S.rect(22,27,42,51,'w2')
for y in range(27,52):
    for x in range(22,43): S.set(x,y,body(x,y))
S.ellipse(32.5,27,10.6,2.6,'w3',shade=lambda x,y,dx,dy:'e5' if dx*dx+dy*dy<.35 else 'w3')
# drips
for dx,ln,c in ((24,8,'w3'),(25,6,'w3'),(38,10,'w2'),(39,7,'w2'),(41,5,'w1')):
    for y in range(28,28+ln): S.set(dx,y,c)
# face
for ex in (27,36):
    S.rect(ex,37,ex+1,39,'k1'); S.set(ex,37,'e5')
S.set(26,35,'w0'); S.set(27,34,'w0'); S.set(38,35,'w0'); S.set(37,34,'w0')   # brows, a little worried
for x,y in ((30,42),(31,43),(32,43),(33,43),(34,42)): S.set(x,y,'d1')
for x in (25,26,38,39): S.set(x,41,'e3')
# stub arms waving
S.line(21,44,18,40,'w1',2); S.set(17,39,'w2')
S.line(43,45,45,47,'w1',2)
S.outline('d0')
L.over(S)
# wick and flame (no outline: flames are light)
L.rect(32,22,32,25,'k2')
def flame(cx,tip,bot,maxr,col,lean=1.2):
    pk=max(tip+1,bot-5)
    for y in range(tip,bot+1):
        r = maxr*((y-tip)/(pk-tip))**.75 if y<=pk else maxr*math.sqrt(max(0,1-((y-pk)/(bot-pk+.01))**2))
        off=lean*(1-(y-tip)/(bot-tip))**2
        for x in range(64):
            if abs(x+.5-(cx+off))<=r: L.set(x,y,col)
flame(32.5,3,24,6.2,'e3')
flame(32.5,7,23,4.3,'e4',1.0)
flame(32.5,12,22,2.4,'e5',.6)
flame(32.5,14,21,1.2,'e6',.3)
L.set(31,23,'f2'); L.set(33,23,'f2'); L.set(32,24,'f1')
for x,y in ((24,8),(41,5),(44,13),(20,15)): L.set(x,y,'e3')   # embers
L.img().save('/home/claude/px/wick.png'); L.img(8).save('/home/claude/px/wick_x8.png')
