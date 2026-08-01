#!/usr/bin/env python3
"""Run lightweight checks for the static WSI Labs site."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
import sys
import xml.etree.ElementTree as ET

ROOT = Path(__file__).parent
HTML_FILES = sorted(ROOT.rglob("*.html"))


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.images = []
        self.tags = set()

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.add(tag)
        if tag == "a" and attrs.get("href"):
            self.links.append(attrs["href"])
        if tag in {"img", "script", "link"}:
            value = attrs.get("src") or attrs.get("href")
            if value:
                self.images.append((tag, value, attrs.get("alt")))


def resolve_local(page, value):
    parsed = urlparse(value)
    if parsed.scheme or parsed.netloc or value.startswith("#"):
        return None
    target = (page.parent / parsed.path).resolve()
    if parsed.path.endswith("/"):
        target /= "index.html"
    return target


errors = []
for page in HTML_FILES:
    parser = PageParser()
    try:
        parser.feed(page.read_text(encoding="utf-8"))
    except Exception as exc:
        errors.append(f"{page}: HTML parse failed: {exc}")
        continue

    for tag, value, alt in parser.images:
        target = resolve_local(page, value)
        if target and not target.is_file():
            errors.append(f"{page}: missing {tag} target: {value}")
        if tag == "img" and alt is None:
            errors.append(f"{page}: image is missing alt text: {value}")

    for value in parser.links:
        target = resolve_local(page, value)
        if target and not target.is_file():
            errors.append(f"{page}: missing link target: {value}")

    text = page.read_text(encoding="utf-8")
    for required in ("<title>", 'name="description"', 'rel="canonical"'):
        if required not in text:
            errors.append(f"{page}: missing {required}")

try:
    ET.parse(ROOT / "sitemap.xml")
except Exception as exc:
    errors.append(f"sitemap.xml: XML parse failed: {exc}")

if errors:
    print("\n".join(errors), file=sys.stderr)
    sys.exit(1)

print(f"Checked {len(HTML_FILES)} HTML pages and sitemap.xml")
