# Tiny pixel-art toolkit: palette, layers, shapes, Bayer dither, auto-outline.
import math, random
from PIL import Image

PAL = {
 'k0':'#0b0a0c','k1':'#17141a','k2':'#241f26','k3':'#352c31',
 'g0':'#11211a','g1':'#1b3326','g2':'#2a4a35','g3':'#3e6647','g4':'#5d8a5e',
 'e0':'#3a1a0e','e1':'#6b2a12','e2':'#a8461a','e3':'#e07a2a','e4':'#ffb84d','e5':'#ffe9a8','e6':'#fffbe8',
 'w0':'#6e5a48','w1':'#a68e70','w2':'#d6c3a0','w3':'#efe2c6',
 'b0':'#4a3215','b1':'#7d5a24','b2':'#b8893a','b3':'#e6c16a',
 'd0':'#24160f','d1':'#4a2e1c','d2':'#6e4a2c',
 'r0':'#4a1018','r1':'#8a1f26','r2':'#c8423a',
 'f0':'#1d2c4a','f1':'#3a5f8a','f2':'#79a8d0','f3':'#cfe8f5',
 'm0':'#2e3a1c','m1':'#55692e','m2':'#8aa046',
 'n0':'#8c8378','n1':'#c9c0b0','n2':'#ece6da',
}
BAYER = [[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]]
def bayer(x,y): return (BAYER[y%4][x%4]+.5)/16

class Layer:
    def __init__(s,w,h): s.w,s.h=w,h; s.p=[[None]*w for _ in range(h)]
    def set(s,x,y,c):
        x,y=int(round(x)),int(round(y))
        if 0<=x<s.w and 0<=y<s.h: s.p[y][x]=c
    def get(s,x,y): return s.p[y][x] if 0<=x<s.w and 0<=y<s.h else None
    def fill(s,c):
        for y in range(s.h):
            for x in range(s.w): s.p[y][x]=c
    def rect(s,x0,y0,x1,y1,c):
        for y in range(y0,y1+1):
            for x in range(x0,x1+1): s.set(x,y,c)
    def ellipse(s,cx,cy,rx,ry,c,shade=None):
        for y in range(s.h):
            for x in range(s.w):
                dx,dy=(x+.5-cx)/max(rx,.01),(y+.5-cy)/max(ry,.01)
                if dx*dx+dy*dy<=1: s.set(x,y,shade(x,y,dx,dy) if shade else c)
    def line(s,x0,y0,x1,y1,c,t=1):
        n=int(max(abs(x1-x0),abs(y1-y0))*2)+1
        for i in range(n+1):
            x=x0+(x1-x0)*i/n; y=y0+(y1-y0)*i/n
            if t==1: s.set(x,y,c)
            else:
                for oy in range(t):
                    for ox in range(t): s.set(x+ox-t//2,y+oy-t//2,c)
    def poly(s,pts,c,shade=None):
        for y in range(s.h):
            xs=[]
            yy=y+.5
            for i in range(len(pts)):
                (ax,ay),(bx,by)=pts[i],pts[(i+1)%len(pts)]
                if (ay<=yy<by) or (by<=yy<ay):
                    xs.append(ax+(yy-ay)*(bx-ax)/(by-ay))
            xs.sort()
            for i in range(0,len(xs)-1,2):
                for x in range(int(math.ceil(xs[i]-.5)),int(math.floor(xs[i+1]-.5))+1):
                    s.set(x,y,shade(x,y) if shade else c)
    def outline(s,c,diag=False):
        add=[]
        for y in range(s.h):
            for x in range(s.w):
                if s.p[y][x] is None:
                    nb=[(1,0),(-1,0),(0,1),(0,-1)]+([(1,1),(-1,-1),(1,-1),(-1,1)] if diag else [])
                    if any(s.get(x+a,y+b) not in (None,c) for a,b in nb): add.append((x,y))
        for x,y in add: s.p[y][x]=c
    def over(s,o,dx=0,dy=0):
        for y in range(o.h):
            for x in range(o.w):
                if o.p[y][x] is not None: s.set(x+dx,y+dy,o.p[y][x])
    def recolor(s,m):
        L=Layer(s.w,s.h)
        for y in range(s.h):
            for x in range(s.w):
                c=s.p[y][x]; L.p[y][x]=m.get(c,c) if c else None
        return L
    def img(s,scale=1):
        im=Image.new('RGBA',(s.w,s.h),(0,0,0,0)); px=im.load()
        for y in range(s.h):
            for x in range(s.w):
                c=s.p[y][x]
                if c: h=PAL[c]; px[x,y]=(int(h[1:3],16),int(h[3:5],16),int(h[5:7],16),255)
        return im.resize((s.w*scale,s.h*scale),Image.NEAREST) if scale>1 else im

def ramp_pick(ramp,t,x,y):
    """t in 0..1 across ramp; dither between neighbouring steps."""
    t=min(max(t,0),.9999)*(len(ramp)-1); i=int(t); f=t-i
    return ramp[i+1] if f>bayer(x,y) and i+1<len(ramp) else ramp[i]

def glow(L,cx,cy,rings,base=None):
    """rings: list of (radius,color) from outermost to innermost; dithered edges."""
    for y in range(L.h):
        for x in range(L.w):
            d=math.hypot(x+.5-cx,(y+.5-cy)*1.1)
            col=None
            for r,c in rings:
                edge=(r-d)/3.0+.5  # soft 3px band
                if edge>=1 or (edge>0 and edge>bayer(x,y)): col=c
            if col: L.p[y][x]=col

def grid(rows,key):
    L=Layer(len(rows[0]),len(rows))
    for y,r in enumerate(rows):
        for x,ch in enumerate(r):
            if ch!='.': L.p[y][x]=key[ch]
    return L

def ramp_band(ramp,t,x,y,soft=.18):
    """Flat bands, dithered only in a thin seam between steps."""
    t=min(max(t,0),.9999)*(len(ramp)-1); i=int(t); f=t-i
    if i+1<len(ramp) and f>1-soft: return ramp[i+1] if (f-(1-soft))/soft>bayer(x,y) else ramp[i]
    return ramp[i]
