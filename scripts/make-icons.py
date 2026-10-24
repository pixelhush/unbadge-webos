"""Draws the Unbadge icons (original artwork, stdlib only).

Matte black tile with a warm glow, champagne-gold viewfinder corners framing a
rounded play button: a clean, uncluttered picture.
usage: python3 scripts/make-icons.py src [preview.png]
"""
import math
import struct
import sys
import zlib

SS = 4  # supersampling per axis

BG_CENTER = (30, 28, 34)
BG_EDGE = (6, 6, 9)
GLOW = (201, 162, 74)
GOLD = [(250, 236, 190), (226, 192, 110), (176, 134, 58), (226, 192, 110)]  # top -> bottom


def lerp(a, b, t):
    return tuple(a[k] + (b[k] - a[k]) * t for k in range(3))


def gold(v):
    """Metallic champagne gold: light top, deep middle band, lift at the bottom."""
    stops = [0.0, 0.42, 0.72, 1.0]
    v = min(max(v, 0.0), 1.0)
    for i in range(len(stops) - 1):
        if v <= stops[i + 1]:
            return lerp(GOLD[i], GOLD[i + 1], (v - stops[i]) / (stops[i + 1] - stops[i]))
    return GOLD[-1]


def sd_round_rect(x, y, x0, y0, x1, y1, r):
    cx, cy, hx, hy = (x0 + x1) / 2, (y0 + y1) / 2, (x1 - x0) / 2 - r, (y1 - y0) / 2 - r
    qx, qy = abs(x - cx) - hx, abs(y - cy) - hy
    return math.hypot(max(qx, 0), max(qy, 0)) + min(max(qx, qy), 0) - r


def sd_segment(x, y, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    t = max(0.0, min(1.0, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)))
    return math.hypot(x - (ax + t * dx), y - (ay + t * dy))


def sd_triangle(x, y, pts):
    """Signed distance to a triangle (negative inside)."""
    d = min(sd_segment(x, y, *pts[i], *pts[(i + 1) % 3]) for i in range(3))
    s = [((pts[(i + 1) % 3][0] - pts[i][0]) * (y - pts[i][1])
          - (pts[(i + 1) % 3][1] - pts[i][1]) * (x - pts[i][0])) for i in range(3)]
    inside = all(v >= 0 for v in s) or all(v <= 0 for v in s)
    return -d if inside else d


# viewfinder corners: L-shapes around the square [A, B]
A, B, ARM, STROKE = 0.24, 0.76, 0.13, 0.026
CORNERS = [
    ((A, A + ARM), (A, A), (A + ARM, A)),
    ((B - ARM, A), (B, A), (B, A + ARM)),
    ((A, B - ARM), (A, B), (A + ARM, B)),
    ((B - ARM, B), (B, B), (B, B - ARM)),
]
# play button, nudged right for optical centring, rounded by PLAY_R
PLAY = ((0.445, 0.385), (0.445, 0.615), (0.640, 0.500))
PLAY_R = 0.03


def shade(u, v):
    """RGBA for a point in unit coords, or None outside the tile."""
    tile = sd_round_rect(u, v, 0, 0, 1, 1, 0.22)
    if tile > 0:
        return None
    # background: radial vignette plus a faint warm glow behind the play button
    r = math.hypot(u - 0.5, v - 0.46) / 0.72
    bg = lerp(BG_CENTER, BG_EDGE, min(r, 1.0) ** 1.3)
    glow = max(0.0, 1 - math.hypot(u - 0.52, v - 0.5) / 0.34) ** 2 * 0.16
    bg = lerp(bg, GLOW, glow)
    # hairline highlight along the top edge of the tile
    if tile > -0.012 and v < 0.5:
        bg = lerp(bg, (255, 255, 255), 0.10 * (1 - v * 2))

    for a, corner, b in CORNERS:
        if min(sd_segment(u, v, *a, *corner), sd_segment(u, v, *corner, *b)) <= STROKE / 2:
            return gold((v - A) / (B - A))
    if sd_triangle(u, v, PLAY) <= PLAY_R:
        return gold((v - 0.36) / 0.28)
    return bg


def render(n):
    rows = []
    for y in range(n):
        row = bytearray([0])
        for x in range(n):
            acc = [0.0, 0.0, 0.0]
            hits = 0
            for sy in range(SS):
                for sx in range(SS):
                    c = shade((x + (sx + 0.5) / SS) / n, (y + (sy + 0.5) / SS) / n)
                    if c is not None:
                        for k in range(3):
                            acc[k] += c[k]
                        hits += 1
            rgb = [round(acc[k] / hits) if hits else 0 for k in range(3)]
            row += bytes(rgb + [round(hits / (SS * SS) * 255)])
        rows.append(bytes(row))
    return rows


def write_png(path, n):
    raw = zlib.compress(b''.join(render(n)), 9)

    def chunk(t, d):
        return struct.pack('>I', len(d)) + t + d + struct.pack('>I', zlib.crc32(t + d) & 0xffffffff)

    with open(path, 'wb') as f:
        f.write(b'\x89PNG\r\n\x1a\n')
        f.write(chunk(b'IHDR', struct.pack('>IIBBBBB', n, n, 8, 6, 0, 0, 0)))
        f.write(chunk(b'IDAT', raw))
        f.write(chunk(b'IEND', b''))


if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else 'src'
    write_png(f'{out}/icon.png', 80)
    write_png(f'{out}/largeIcon.png', 130)
    if len(sys.argv) > 2:
        write_png(sys.argv[2], 400)
