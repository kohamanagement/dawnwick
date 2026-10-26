# Strip the document skeleton from dist-single/index.html so the artifact host can wrap it.
# Usage: python3 scripts/strip-for-artifact.py dist-single/index.html riposte-play.html
# Patterns match whole tags only: a bare </?head[^>]*> would also eat <header> tags (the v0.5 "stuck" bug).
import re, sys
s = open(sys.argv[1]).read()
for pat in [r'<!doctype html>', r'</?html(\s[^>]*)?>', r'</?head(\s[^>]*)?>', r'</?body(\s[^>]*)?>', r'<meta[^>]*charset[^>]*>', r'<meta[^>]*name="viewport"[^>]*>']:
    s = re.sub(pat, '', s, flags=re.I)
open(sys.argv[2], 'w').write(s.strip() + '\n')
