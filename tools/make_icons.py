"""Generates the PWA icons in icons/ (pure stdlib, no Pillow needed).

Run from the project root:  python tools/make_icons.py
Only needed if you want to change the icon look.
"""
import math
import os
import struct
import zlib

BG = (11, 15, 20)        # --bg
ACCENT = (53, 208, 127)  # --accent
SS = 4                   # supersampling factor for smooth edges

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "icons")


def dist_to_segment(px, py, ax, ay, bx, by):
    dx, dy = bx - ax, by - ay
    length2 = dx * dx + dy * dy
    t = 0.0 if length2 == 0 else max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / length2))
    return math.hypot(px - (ax + t * dx), py - (ay + t * dy))


def render(size, maskable):
    n = size * SS
    # Checkmark geometry, as fractions of the icon size.
    scale = 0.46 if maskable else 0.60
    cx = cy = n / 2.0
    pts = [(-0.42, 0.02), (-0.12, 0.32), (0.44, -0.34)]
    seg = [(cx + x * scale * n, cy + y * scale * n) for (x, y) in pts]
    stroke = (0.085 if maskable else 0.105) * n
    radius = 0.0 if maskable else 0.20 * n  # maskable icons are full-bleed

    acc = [[[0, 0, 0] for _ in range(size)] for _ in range(size)]
    for sy in range(n):
        y = sy + 0.5
        for sx in range(n):
            x = sx + 0.5
            # Rounded-square background mask.
            inside = True
            if radius:
                qx = max(radius - x, x - (n - radius), 0.0)
                qy = max(radius - y, y - (n - radius), 0.0)
                inside = math.hypot(qx, qy) <= radius
            if not inside:
                color = None
            else:
                d = min(dist_to_segment(x, y, seg[0][0], seg[0][1], seg[1][0], seg[1][1]),
                        dist_to_segment(x, y, seg[1][0], seg[1][1], seg[2][0], seg[2][1]))
                color = ACCENT if d <= stroke / 2 else BG
            cell = acc[sy // SS][sx // SS]
            if color is not None:
                cell[0] += color[0]
                cell[1] += color[1]
                cell[2] += color[2]
            # Outside the rounded square we accumulate the page background,
            # so the corners blend into the dark theme instead of going white.
            else:
                cell[0] += BG[0]
                cell[1] += BG[1]
                cell[2] += BG[2]

    rows = []
    per = SS * SS
    for row in acc:
        line = bytearray([0])  # PNG filter type 0
        for cell in row:
            line += bytes((cell[0] // per, cell[1] // per, cell[2] // per))
        rows.append(bytes(line))
    return b"".join(rows), size


def write_png(path, raw, size):
    def chunk(tag, data):
        body = tag + data
        return struct.pack(">I", len(data)) + body + struct.pack(">I", zlib.crc32(body) & 0xFFFFFFFF)

    header = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)  # 8-bit truecolour RGB
    png = (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", header) +
           chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))
    with open(path, "wb") as f:
        f.write(png)
    print("wrote %s (%d bytes)" % (path, len(png)))


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    for name, size, maskable in [("icon-192.png", 192, False),
                                 ("icon-512.png", 512, False),
                                 ("icon-maskable-512.png", 512, True)]:
        raw, s = render(size, maskable)
        write_png(os.path.join(OUT_DIR, name), raw, s)
