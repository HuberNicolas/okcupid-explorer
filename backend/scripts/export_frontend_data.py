"""Export the profiles and reference results for the in-browser engine of the frontend.

Writes
- frontend/src/data/profiles.json: the 842 cleaned profiles from src/okcupid.sqlite
- frontend/src/engine/__fixtures__/reference.json: responses of the Flask API for fixed answers,
  which the TypeScript tests compare against

Run from the backend folder:  uv run python scripts/export_frontend_data.py
"""

import copy
import json
import sqlite3
import sys
from pathlib import Path

import numpy as np
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

BACKEND = Path(__file__).resolve().parent.parent
FRONTEND = BACKEND.parent / "frontend"
sys.path.insert(0, str(BACKEND / "src"))

import app as server  # noqa: E402

CASES = [
    {
        "name": "similar",
        "threshold": 0.6,
        "mode": 1,
        "data": {
            "age": 29,
            "sex": "f",
            "height": 66,
            "orientation": "straight",
            "body_type": "athletic",
            "diet": "anything",
            "diet_modifier": "mostly",
            "drinks": "socially",
            "smokes": "no",
            "drugs": "never",
            "sign": "leo",
            "sign_modifier": "no specified sign modifier",
            "income": 80000.0,
            "job": "science / tech / engineering",
            "status": "single",
            "education_status": "graduated from",
            "education_institution": "college/university",
            "offspring_status": "doesn't have kids",
            "offspring_future": "might want",
            "pets_cats": "likes cats",
            "pets_dogs": "likes dogs",
            "religion_type": "agnosticism",
            "religion_modifier": "not too serious about it",
            "ethnicities": ["white", "asian"],
            "speaks": ["english", "german", "french"],
        },
    },
    {
        "name": "opposite",
        "threshold": 0.3,
        "mode": 0,
        "data": {
            "age": 52,
            "sex": "m",
            "height": 72,
            "orientation": "gay",
            "body_type": "a little extra",
            "diet": "vegetarian",
            "diet_modifier": "strictly",
            "drinks": "rarely",
            "smokes": "sometimes",
            "drugs": "sometimes",
            "sign": "pisces",
            "sign_modifier": "and it matters a lot",
            "income": 150000.0,
            "job": "artistic / musical / writer",
            "status": "single",
            "education_status": "working on",
            "education_institution": "ph.d program",
            "offspring_status": "has kids",
            "offspring_future": "doesn't want",
            "pets_cats": "has cats",
            "pets_dogs": "has dogs",
            "religion_type": "buddhism",
            "religion_modifier": "very serious about it",
            "ethnicities": ["hispanic / latin"],
            "speaks": ["english", "spanish"],
        },
    },
]


def export_profiles():
    with sqlite3.connect(BACKEND / "src" / "okcupid.sqlite") as conn:
        cursor = conn.execute("SELECT * FROM okcupid_clean")
        columns = [d[0] for d in cursor.description]
        rows = cursor.fetchall()
    target = FRONTEND / "src" / "data" / "profiles.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps({"columns": columns, "rows": rows}, separators=(",", ":")))
    print(f"{target.relative_to(BACKEND.parent)}: {len(rows)} profiles, {len(columns)} columns")


def export_reference():
    """Responses of the API, plus PCA and k-means recomputed with scikit-learn.

    The API's user row carries the coordinates of profile 0 (pandas aligns the appended row by its
    index 0), so the coordinates are recomputed from the same input: the encoded rows plus the label.
    """
    client = server.app.test_client()
    columns = server.continuous_cols + server.categorical_cols + server.ethnities_cols + server.speaks_cols
    cases = []
    for case in CASES:
        body = {k: case[k] for k in ("threshold", "mode", "data")}
        users = client.post("/api/post/users/std", json=copy.deepcopy(body)).get_json(force=True)
        profiles = client.post("/api/post/users/nonstd", json=copy.deepcopy(body)).get_json(force=True)
        (you,) = client.post("/api/post/user/std", json=copy.deepcopy(body)).get_json(force=True)
        pca_input = np.array([[row[c] for c in columns] + [row["lables"]] for row in users])
        scores = PCA(n_components=4).fit_transform(pca_input)
        kmeans = KMeans(n_clusters=4, init="k-means++", n_init=10, random_state=420).fit(scores)
        cases.append(
            {
                **case,
                "encoded": you,
                "labels": [row["Label"] for row in profiles],
                "scores": scores.tolist(),
                "inertia": float(kmeans.inertia_),
            }
        )
    target = FRONTEND / "src" / "engine" / "__fixtures__" / "reference.json"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(json.dumps({"cases": cases}, separators=(",", ":")))
    print(f"{target.relative_to(BACKEND.parent)}: {len(cases)} cases")


def main():
    export_profiles()
    export_reference()


if __name__ == "__main__":
    main()
