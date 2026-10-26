import sys, math, random; sys.path.insert(0,'/home/claude/px')
from px import *
random.seed(7)
W=H=64
L=Layer(W,H)
for y in range(H):
    for x in range(W): L.set(x,y,ramp_band(['k1','k2','g0','g1'],y/68,x,y,.35))
# far trunks
for tx,tw,c in ((4,3,'k2'),(13,2,'g0'),(50,4,'k2'),(59,3,'g0'),(44,2,'g0')):
    L.rect(tx,0,tx+tw-1,63,c)
# low fog
for y in range(46,58):
    for x in range(W):
        f=1-abs(y-52)/6
        if f>bayer(x,y)+.15: L.set(x,y,'k3')
# a cold glint: eyes are the only warm light
S=Layer(W,H)
# body / cloak of bark and moss
def cloak(x,y):
    t=(x-12)/40
    c=ramp_pick(['d2','d1','d1','d0'],abs(t-.35)*1.6,x,y)
    if y<52 and ((x*7+y*3)%11<3 or (x+y*5)%13==0): c='m1' if t<.55 else 'm0'
    return c
S.poly([(20,44),(44,44),(55,50),(59,64),(5,64),(9,50)],'d1',shade=lambda x,y:ramp_band(['d2','d1','d1','d0'],(x-6)/54+ (y-44)/80,x,y,.3))
for fx,sl in ((16,-.25),(25,-.1),(39,.1),(48,.25)):
    S.line(fx,52,fx+sl*12,63,'d0')
    S.line(fx-1,53,fx-1+sl*12,63,'d2' if fx<32 else 'd1')
# moss mantle over shoulders
S.ellipse(32,45,17,4.5,'m1',shade=lambda x,y,dx,dy:'m2' if dy<-.2 and dx<.2 else ('m0' if dx>.45 else 'm1'))
for x,n in ((17,3),(20,5),(24,2),(28,4),(33,3),(37,5),(41,2),(45,4)):
    for i in range(n): S.set(x,48+i,'m1' if x<36 else 'm0')
# neck
S.rect(29,36,35,42,'n0')
# head: long stag skull, light from upper left
def bone(x,y,dx,dy): return 'n2' if dx<-.35 and dy<0 else ('n0' if dx>.45 or dy>.6 else 'n1')
S.ellipse(32,27,7.5,7,'n1',shade=bone)
S.poly([(26,29),(38,29),(35,40),(29,40)],'n1',shade=lambda x,y:'n0' if x>=34 else ('n2' if x<=28 and y<34 else 'n1'))
S.rect(30,39,34,40,'k2')   # nostrils/snout tip
S.set(31,39,'k1'); S.set(33,39,'k1')
# ears
S.poly([(24,24),(19,21),(23,27)],'n0'); S.poly([(40,24),(45,21),(41,27)],'n0')
# eye sockets
S.rect(27,27,29,29,'k0'); S.rect(35,27,37,29,'k0')
# antlers (bone ramp), branching
def antler(sgn):
    cx=32
    pts=[(cx-5*sgn,21),(cx-10*sgn,17),(cx-14*sgn,12),(cx-15*sgn,6),(cx-13*sgn,1)]
    main='n1' if sgn>0 else 'n0'
    for (a,b),(c,d) in zip(pts,pts[1:]): S.line(a,b,c,d,main,2)
    for (a,b,c,d) in ((cx-10*sgn,17,cx-11*sgn,10),(cx-14*sgn,12,cx-22*sgn,10),(cx-15*sgn,7,cx-21*sgn,3)):
        S.line(a,b,c,d,main,1)
    S.line(cx-14*sgn,12,cx-21*sgn,10,'n2' if sgn>0 else 'n1',1)
antler(1); antler(-1)
# crown band woven at the brow
for x in range(26,39): S.set(x,21,'b2')
for x in (27,30,32,34,37): S.set(x,20,'b3')
S.set(32,19,'b3')
# hanging moss from antlers
for x,y,n in ((18,10,4),(23,14,3),(42,12,5),(46,9,3),(13,9,2),(50,6,3)):
    for i in range(n): S.set(x,y+i,'m2' if i<n-1 else 'm1')
S.outline('k0')
L.over(S)
# eyes glow (warm) with halo
for ex in (28,36):
    for dx,dy in ((-1,0),(1,0),(0,-1),(0,1)): L.set(ex+dx,28+dy,'e2')
    L.set(ex,28,'e5')
L.img().save('/home/claude/px/antlered_king.png'); L.img(8).save('/home/claude/px/antlered_king_x8.png')
