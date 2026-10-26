# Hi-bit pixel icon toolkit for Dawnwick: one shared palette, 16x16 grids, auto outline.
# Icons are drawn as character grids (one char = one palette colour, '.' = clear) or with the
# small shape helpers below, then packed into one sprite sheet by build_icons.py.
import math
from PIL import Image

# One character per colour. Kept to ~45 colours shared by every icon.
KEY = {
    '0': '#17141a', '1': '#241f26', '2': '#352c31', '3': '#8c8378', '4': '#c9c0b0', '5': '#ece6da',
    '6': '#6e5a48', '7': '#a68e70', '8': '#d6c3a0', '9': '#efe2c6',
    'a': '#3a1a0e', 'b': '#6b2a12', 'c': '#a8461a', 'd': '#e07a2a', 'e': '#ffb84d', 'f': '#ffe9a8', 'F': '#fffbe8',
    'g': '#2a4a35', 'h': '#3e6647', 'i': '#5d8a5e', 'j': '#55692e', 'J': '#8aa046', 'G': '#7fd16a',
    'k': '#4a3215', 'l': '#7d5a24', 'm': '#b8893a', 'n': '#e6c16a', 'H': '#ffe066',
    'o': '#24160f', 'p': '#4a2e1c', 'q': '#6e4a2c',
    'r': '#4a1018', 's': '#8a1f26', 't': '#c8423a', 'D': '#f05a4a', 'C': '#e87aa0',
    'u': '#1d2c4a', 'v': '#3a5f8a', 'w': '#79a8d0', 'x': '#cfe8f5', 'I': '#4fb3ff', 'L': '#8ff0ff', 'E': '#2f8f8a',
    'y': '#3b2560', 'z': '#6b46a8', 'A': '#b48cff', 'B': '#e2ccff',
}
OUTLINE = '#0b0a0c'
N = 16


class Icon:
    def __init__(s):
        s.p = [[None] * N for _ in range(N)]

    def set(s, x, y, c):
        x, y = int(round(x)), int(round(y))
        if 0 <= x < N and 0 <= y < N:
            s.p[y][x] = c

    def get(s, x, y):
        return s.p[y][x] if 0 <= x < N and 0 <= y < N else None

    def rect(s, x0, y0, x1, y1, c):
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                s.set(x, y, c)

    def disc(s, cx, cy, r, c, shade=None, ry=None):
        ry = ry or r
        for y in range(N):
            for x in range(N):
                dx, dy = (x + .5 - cx) / r, (y + .5 - cy) / ry
                if dx * dx + dy * dy <= 1:
                    s.set(x, y, shade(dx, dy) if shade else c)

    def line(s, x0, y0, x1, y1, c):
        n = int(max(abs(x1 - x0), abs(y1 - y0)) * 2) + 1
        for i in range(n + 1):
            s.set(x0 + (x1 - x0) * i / n, y0 + (y1 - y0) * i / n, c)

    def grid(s, rows, dx=0, dy=0):
        for y, r in enumerate(rows):
            for x, ch in enumerate(r):
                if ch != '.':
                    s.set(x + dx, y + dy, ch)
        return s

    def outline(s):
        add = []
        for y in range(N):
            for x in range(N):
                if s.p[y][x] is None and any(s.get(x + a, y + b) not in (None, 'K') for a, b in ((1, 0), (-1, 0), (0, 1), (0, -1))):
                    add.append((x, y))
        for x, y in add:
            s.p[y][x] = 'K'
        # v0.15.1: art that runs off the 16x16 cell gets its outline on the cell edge too, so no side is left
        # open (an open side read as a soft, cut-off edge next to the crisp ones).
        for i in range(N):
            for x, y in ((0, i), (N - 1, i), (i, 0), (i, N - 1)):
                if s.p[y][x] not in (None, 'K'):
                    s.p[y][x] = 'K'
        # Near-black bodies (top hat, crow, cat, bomb…) vanish into the dark table: give them a 1 px rim
        # where the light comes from (top and left), one step up the same grey ramp.
        rim = []
        for y in range(N):
            for x in range(N):
                if s.p[y][x] in ('0', '1') and (s.get(x - 1, y) in (None, 'K') or s.get(x, y - 1) in (None, 'K')):
                    rim.append((x, y))
        for x, y in rim:
            s.p[y][x] = '2'
        return s

    def image(s):
        im = Image.new('RGBA', (N, N), (0, 0, 0, 0))
        px = im.load()
        for y in range(N):
            for x in range(N):
                c = s.p[y][x]
                if c:
                    h = OUTLINE if c == 'K' else KEY[c]
                    px[x, y] = (int(h[1:3], 16), int(h[3:5], 16), int(h[5:7], 16), 255)
        return im


def parse(art):
    rows = [r for r in art.strip('\n').split('\n')]
    rows = [r.strip() for r in rows]
    # Grids may be written shorter than 16 rows; centre them vertically.
    for r in rows:
        if len(r) > N:
            raise ValueError(f'row too long ({len(r)}): {r}')
        for ch in r:
            if ch != '.' and ch != 'K' and ch not in KEY:
                raise ValueError(f'unknown colour {ch!r} in {r}')
    top = max(0, (N - len(rows)) // 2)
    w = max(len(r) for r in rows)
    left = max(0, (N - w) // 2) if w < N - 1 else 0
    return rows, left, top


ICONS = {}    # name -> Icon
EMOJI = {}    # glyph -> name


def icon(name, glyphs, art=None, draw=None, outline=True, center=True):
    if name in ICONS:
        raise ValueError(f'duplicate icon {name}')
    I = Icon()
    if art:
        rows, left, top = parse(art)
        I.grid(rows, left if center else 0, top if center else 0)
    if draw:
        draw(I)
    if outline:
        I.outline()
    ICONS[name] = I
    for g in glyphs.split():
        if g in EMOJI:
            raise ValueError(f'glyph {g} mapped twice ({EMOJI[g]}, {name})')
        EMOJI[g] = name
    return I


def alias(name, glyphs):
    for g in glyphs.split():
        if g in EMOJI:
            raise ValueError(f'glyph {g} mapped twice ({EMOJI[g]}, {name})')
        EMOJI[g] = name


def orb(ramp):
    """Shade function for a lit sphere: ramp from dark rim to highlight (light from top-left)."""
    def f(dx, dy):
        t = 1 - math.hypot(dx + .35, dy + .35) / 1.5
        t = min(max(t, 0), .999)
        return ramp[int(t * len(ramp))]
    return f
