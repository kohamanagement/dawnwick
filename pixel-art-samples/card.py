import sys, math, random; sys.path.insert(0,'/home/claude/px')
from px import *
random.seed(3)
# ---- motif: "Cut" (Ashen Duelist), 64x48
W,H=64,48
M=Layer(W,H)
for y in range(H):
    for x in range(W): M.set(x,y,ramp_band(['k1','k2','e0','e1'],(y/H)*.8+(x/W)*.25,x,y,.35))
for _ in range(40):
    M.set(random.randrange(W),random.randrange(H),random.choice(['w0','k3','w0']))
# the slash: a crescent arc, hot core, cooling edges
cx,cy,R=14,52,40
for y in range(H):
    for x in range(W):
        d=math.hypot(x+.5-cx,y+.5-cy); a=math.degrees(math.atan2(cy-(y+.5),x+.5-cx))
        if 14<a<84:
            k=(a-14)/70                        # 0 at tail, 1 at head
            th=.4+4.2*k**1.4
            off=abs(d-R)
            if off<th*.35: M.set(x,y,'e6')
            elif off<th*.7: M.set(x,y,'e4')
            elif off<th: M.set(x,y,'e3' if (off-th*.7)/(th*.3)<bayer(x,y)+.3 else 'e2')
# rapier: blade from hilt to tip
S=Layer(W,H)
S.ellipse(16.5,40.5,3,3,'b2',shade=lambda x,y,dx,dy:'b3' if dx+dy<-.4 else ('b1' if dx+dy>.5 else 'b2'))  # cup guard
S.line(16,43,15,47,'d1',2)
S.outline('k0')
M.over(S)
M.line(17,38,21,5,'n2'); M.line(18,38,22,6,'n0')   # blade drawn last, no outline
for x,y in ((24,4),(27,7),(30,3),(26,11),(33,6),(23,1)): M.set(x,y,random.choice(['e4','e5','e3']))
M.img().save('cut.png'); M.img(6).save('cut_x6.png')
# same motif, frost tint: how one illustration serves an ice card
FROST={'e0':'f0','e1':'f0','e2':'f1','e3':'f1','e4':'f2','e5':'f3','e6':'n2','w0':'f1','b1':'n0','b2':'n1','b3':'n2'}
F=M.recolor(FROST); F.img().save('cut_frost.png'); F.img(6).save('cut_frost_x6.png')
# ---- card frame 72x100 (art window at 4,14 size 64x48)
CW,CH=72,100
C=Layer(CW,CH)
C.rect(0,0,CW-1,CH-1,'b1')
C.rect(1,1,CW-2,CH-2,'b2')
for x in range(1,CW-1): C.set(x,1,'b3')
for y in range(1,CH-1): C.set(1,y,'b3')
C.rect(3,3,CW-4,CH-4,'k2')          # inner
C.rect(3,3,CW-4,12,'d1'); C.rect(3,12,CW-4,12,'b0')   # name plate
C.rect(3,13,CW-4,62,'k0')             # art bezel
C.over(M,4,14)
C.rect(3,63,CW-4,63,'b0')
C.rect(5,66,CW-6,CH-6,'w2'); C.rect(5,66,CW-6,66,'w3'); C.rect(5,CH-6,CW-6,CH-6,'w1')  # text box parchment
C.rect(26,62,45,66,'d1'); C.rect(27,63,44,65,'e1')   # type ribbon
# cost gem
C.ellipse(7.5,7.5,5.5,5.5,'e2',shade=lambda x,y,dx,dy:'e5' if dx+dy<-.9 else ('e4' if dx+dy<-.2 else ('e1' if dx+dy>.7 else 'e3')))
G=Layer(CW,CH); G.ellipse(7.5,7.5,5.5,5.5,'x'); 
for y in range(16):
    for x in range(16):
        if G.get(x,y) is None and any(G.get(x+a,y+b) for a,b in ((1,0),(-1,0),(0,1),(0,-1))): C.set(x,y,'k0')
C.img().save('card_cut.png'); C.img(5).save('card_cut_x5.png')
