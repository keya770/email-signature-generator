from PIL import Image, ImageDraw
import math
import os

OUT = os.path.join(os.path.dirname(__file__), '..', 'premium-gifs')
os.makedirs(OUT, exist_ok=True)

TEAL = (66, 217, 228)
NAVY = (11, 31, 58)
WHITE = (255, 255, 255)
GREEN = (37, 211, 102)


def save_gif(frames, name, duration=70):
    path = os.path.join(OUT, name)
    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=duration,
        loop=0,
        disposal=2,
        optimize=True,
    )
    print(name, frames[0].size, os.path.getsize(path))


def make_wave():
    frames = []
    for i in range(8):
        im = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
        d = ImageDraw.Draw(im)
        wobble = int(math.sin(i / 8 * math.pi * 2) * 3)
        cx, cy = 16, 18
        d.ellipse([cx - 8, cy - 10 + wobble, cx + 8, cy + 6 + wobble], fill=(255, 220, 185, 255))
        for fi, off in enumerate([-6, -2, 2, 6]):
            fy = cy - 14 + wobble + int(math.sin((i + fi) / 8 * math.pi * 2))
            d.ellipse([cx + off - 2, fy - 4, cx + off + 2, fy + 2], fill=(255, 220, 185, 255))
        d.rectangle([cx - 5, cy + 2 + wobble, cx + 5, cy + 10 + wobble], fill=(255, 220, 185, 255))
        d.rectangle([cx - 6, cy + 8 + wobble, cx + 6, cy + 11 + wobble], fill=TEAL + (255,))
        bg = Image.new('RGB', (32, 32), WHITE)
        bg.paste(im, mask=im.split()[-1])
        frames.append(bg)
    save_gif(frames, 'wave.gif', 80)


def make_icon(name, drawer, size=28, frames_n=10):
    frames = []
    for i in range(frames_n):
        im = Image.new('RGB', (size, size), WHITE)
        d = ImageDraw.Draw(im)
        pulse = 0.75 + 0.25 * math.sin(i / frames_n * math.pi * 2)
        pad = max(1, int(2 * (1.1 - pulse)))
        d.ellipse([pad, pad, size - 1 - pad, size - 1 - pad], outline=TEAL, width=2)
        fill = tuple(int(255 - (255 - c) * 0.14 * pulse) for c in TEAL)
        d.ellipse([4, 4, size - 5, size - 5], fill=fill)
        drawer(d, size, pulse)
        frames.append(im)
    save_gif(frames, name, 75)


def draw_phone(d, s, p):
    m = s // 2
    d.rounded_rectangle([m - 4, m - 7, m + 4, m + 7], radius=2, outline=NAVY, width=2)
    d.line([m - 2, m + 5, m + 2, m + 5], fill=NAVY, width=1)


def draw_email(d, s, p):
    m = s // 2
    d.rectangle([m - 7, m - 5, m + 7, m + 5], outline=NAVY, width=2)
    d.line([m - 7, m - 5, m, m + 1], fill=NAVY, width=1)
    d.line([m + 7, m - 5, m, m + 1], fill=NAVY, width=1)


def draw_web(d, s, p):
    m = s // 2
    r = 6
    d.ellipse([m - r, m - r, m + r, m + r], outline=NAVY, width=2)
    d.ellipse([m - 3, m - r, m + 3, m + r], outline=NAVY, width=1)
    d.line([m - r, m, m + r, m], fill=NAVY, width=1)


def make_pin():
    frames = []
    for i in range(10):
        im = Image.new('RGB', (28, 28), WHITE)
        d = ImageDraw.Draw(im)
        bounce = int(round(math.sin(i / 10 * math.pi * 2) * 2))
        m = 14
        y = bounce
        d.ellipse([m - 5, 6 + y, m + 5, 16 + y], outline=TEAL, width=2)
        d.polygon([(m, 22 + y), (m - 5, 14 + y), (m + 5, 14 + y)], fill=TEAL)
        d.ellipse([m - 2, 9 + y, m + 2, 13 + y], fill=WHITE)
        frames.append(im)
    save_gif(frames, 'pin.gif', 75)


def make_whatsapp():
    frames = []
    for i in range(10):
        im = Image.new('RGB', (28, 28), WHITE)
        d = ImageDraw.Draw(im)
        pulse = 0.85 + 0.15 * math.sin(i / 10 * math.pi * 2)
        pad = int(3 * (1.2 - pulse))
        d.ellipse([pad, pad, 27 - pad, 27 - pad], fill=GREEN)
        d.ellipse([9, 9, 19, 19], outline=WHITE, width=2)
        d.line([11, 16, 17, 12], fill=WHITE, width=2)
        frames.append(im)
    save_gif(frames, 'whatsapp.gif', 80)


def make_online():
    frames = []
    for i in range(12):
        im = Image.new('RGB', (118, 22), WHITE)
        d = ImageDraw.Draw(im)
        d.rounded_rectangle([0, 0, 117, 21], radius=11, fill=(232, 252, 240))
        pulse = 0.5 + 0.5 * ((math.sin(i / 12 * math.pi * 2) + 1) / 2)
        r = int(3 + pulse * 2)
        cx, cy = 12, 11
        d.ellipse([cx - r - 2, cy - r - 2, cx + r + 2, cy + r + 2], fill=(180, 245, 200))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=GREEN)
        d.text((24, 5), 'Available Online', fill=(22, 101, 52))
        frames.append(im)
    save_gif(frames, 'online.gif', 90)


def make_divider():
    w, h = 320, 8
    frames = []
    for i in range(20):
        im = Image.new('RGB', (w, h), WHITE)
        d = ImageDraw.Draw(im)
        shine = int((i / 20.0) * w)
        for x in range(w):
            dist = abs(x - shine)
            boost = max(0, 1 - dist / 40)
            s = 0.55 + 0.45 * boost
            edge = min(x, w - 1 - x) / 20
            edge = min(1, edge)
            s *= 0.3 + 0.7 * edge
            col = tuple(int(255 - (255 - c) * s) for c in TEAL)
            d.point((x, 3), fill=col)
            d.point((x, 4), fill=col)
        frames.append(im)
    save_gif(frames, 'divider.gif', 55)


def make_cta():
    w, h = 200, 36
    frames = []
    for i in range(16):
        im = Image.new('RGB', (w, h), TEAL)
        shine = int((i / 16.0) * (w + 40)) - 20
        for x in range(w):
            dist = abs(x - shine)
            if dist < 28:
                b = 1 - dist / 28
                col = tuple(min(255, int(c + b * 55)) for c in TEAL)
                for y in range(h):
                    im.putpixel((x, y), col)
        frames.append(im)
    save_gif(frames, 'cta.gif', 60)


def make_thanks():
    w, h = 320, 28
    frames = []
    for i in range(14):
        im = Image.new('RGB', (w, h), WHITE)
        d = ImageDraw.Draw(im)
        d.rounded_rectangle([0, 0, w - 1, h - 1], radius=6, outline=(226, 238, 240), width=1)
        for k in range(3):
            x = 40 + ((i * 6 + k * 30) % (w - 80))
            d.ellipse([x, 12, x + 4, 16], fill=TEAL)
        d.text((112, 8), 'Thank You', fill=NAVY)
        frames.append(im)
    save_gif(frames, 'thanks.gif', 80)


def make_connect():
    w, h = 320, 30
    frames = []
    for i in range(14):
        im = Image.new('RGB', (w, h), NAVY)
        d = ImageDraw.Draw(im)
        shine = int((i / 14.0) * w)
        for x in range(max(0, shine - 30), min(w, shine + 30)):
            b = 1 - abs(x - shine) / 30
            col = (
                min(255, int(11 + b * 40)),
                min(255, int(31 + b * 50)),
                min(255, int(58 + b * 80)),
            )
            for y in range(h):
                im.putpixel((x, y), col)
        for x in range(w):
            im.putpixel((x, h - 2), TEAL)
            im.putpixel((x, h - 1), TEAL)
        d.text((98, 8), "Let's Connect", fill=WHITE)
        frames.append(im)
    save_gif(frames, 'connect.gif', 70)


if __name__ == '__main__':
    make_wave()
    make_icon('phone.gif', draw_phone)
    make_icon('email.gif', draw_email)
    make_icon('web.gif', draw_web)
    make_pin()
    make_whatsapp()
    make_online()
    make_divider()
    make_cta()
    make_thanks()
    make_connect()
    print('done')
