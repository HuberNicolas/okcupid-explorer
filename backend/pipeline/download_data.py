"""Download the raw OkCupid profiles (profiles_revised.csv) into backend/data/.

The notebooks read ../data/profiles_revised.csv. The file is not part of this
repository; it comes from Kim & Escobedo-Land (2015), revised in 2021:
https://github.com/rudeboybert/JSE_OkCupid

Run from the backend folder:  uv run python pipeline/download_data.py
"""

import hashlib
import io
import urllib.request
import zipfile
from pathlib import Path

URL = "https://github.com/rudeboybert/JSE_OkCupid/raw/master/profiles_revised.csv.zip"
FILENAME = "profiles_revised.csv"
SHA256 = "450f73706a45868911415f284a4bc249650fe2a5f9ab24f7ee2caf468e8f422b"
DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def main():
    target = DATA_DIR / FILENAME
    if target.exists():
        print(f"{target} already exists")
        return

    print(f"Downloading {URL}")
    with urllib.request.urlopen(URL) as response:
        archive = zipfile.ZipFile(io.BytesIO(response.read()))
    content = archive.read(FILENAME)

    digest = hashlib.sha256(content).hexdigest()
    if digest != SHA256:
        raise SystemExit(f"Checksum mismatch: expected {SHA256}, got {digest}")

    DATA_DIR.mkdir(exist_ok=True)
    target.write_bytes(content)
    print(f"Saved {target} ({len(content) / 1e6:.1f} MB)")


if __name__ == "__main__":
    main()
